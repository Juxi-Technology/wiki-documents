---
title: "Errore di posizione sulla mappa"
description: "Le coordinate utilizzate da 腾讯 e 高德地图 sono diverse da quelle del software di PC; il nostro software di PC ric…"
---



# Errore di posizione sulla mappa

[toc]

## Premessa

Le coordinate utilizzate da 腾讯 e 高德地图 sono diverse da quelle del software di PC; il nostro software di PC richiama l'API di 天地图 (standard WGS-84), per cui i dati convertiti presenteranno differenze. Dopo aver ottenuto le informazioni di posizionamento GPS/BeiDou, è necessario convertire le informazioni di posizionamento GPS/BeiDou nelle coordinate di 天地图 (standard WGS-84) prima di procedere alla conversione.

## Introduzione ai sistemi di coordinate comuni

    WGS-84(GPS)
    Standard internazionale; in genere le coordinate ottenute da dispositivi GPS di standard internazionale sono WGS-84, così come il sistema di coordinate utilizzato dai fornitori di mappe internazionali.
    
    GCJ-02
    Standard cinese, sistema di coordinate pubblicato nel 2002 dall'Ufficio statale di rilevamento e cartografia della Cina. È anche detto "coordinate Marte". In Cina è obbligatorio cifrare la posizione geografica almeno una volta con "GCJ-02". Ad esempio, Google Cina, 高德 e 腾讯 utilizzano questo sistema di coordinate.
    
    BD-09
    Standard di 百度, cifrato una seconda volta sulla base di "GCJ-02".

![Immagine 1](../../../../../public/images/tutorials/sensors/gps/Map-Location-Error/1.png)

## Coordinate del sistema di posizionamento BeiDou

Se avete mai integrato il sistema di posizionamento BeiDou, potreste aver notato un problema: sembra che latitudine e longitudine delle coordinate BeiDou siano state moltiplicate per 100?

$GNRMC,083735.000,A,2429.53531,N,11810.78036,E,0.54,171.11,190621,A*7E

Questo è il valore di coordinata ricevuto dal nostro sistema di posizionamento BeiDou; si può notare che la latitudine nord è 2429.53531 e la longitudine est è 11810.78036. Se dividiamo direttamente questa latitudine e longitudine per 100, la latitudine nord sarebbe 24.2953531 e la longitudine est 118.1078036, e in 百度 o 高德地图 lo spostamento delle coordinate è spropositato.

Posizionamento su 高德地图:
![Immagine 2](../../../../../public/images/tutorials/sensors/gps/Map-Location-Error/2.png)

Posizionamento su 百度地图:

![Immagine 3](../../../../../public/images/tutorials/sensors/gps/Map-Location-Error/3.png)

Si può notare che in entrambi i casi la distanza si discosta di alcune decine di chilometri. Il motivo è che, in Cina, sia 高德 sia 百度 utilizzano valori di latitudine e longitudine già cifrati, invece di posizionare direttamente con la latitudine e la longitudine reali del GPS; pertanto, se vogliamo utilizzare il sistema di coordinate del posizionamento BeiDou su mappe commerciali, dobbiamo sottoporlo alla corrispondente elaborazione di conversione e cifratura per poterlo usare correttamente.

## Conversione reciproca tra sistemi di coordinate

Innanzitutto va sottolineato un punto: in realtà il valore del sistema di coordinate del nostro posizionamento BeiDou non ha una semplice relazione di 100 volte, ma richiede una conversione di gradi, minuti e secondi. Pertanto, i valori di coordinata BeiDou che otteniamo, latitudine nord 2429.53531 e longitudine est 11810.78036, richiedono il seguente calcolo: 24+（29.53531/60）≈ 24.49225517 118+（10.78036/60）≈118.17967267

Questi due valori sono quelli che dobbiamo inserire nella formula di conversione; se utilizziamo direttamente i valori della relazione di 100 volte per convertire, anche il posizionamento risulterà spostato, per cui occorre prima convertirli in valori di coordinata dello standard gps84.

```python
def str_To_Gps84(self, in_data1, in_data2):
    len_data1 = len(in_data1)
    str_data2 = "%05d" % int(in_data2)
    temp_data = int(in_data1)
    symbol = 1
    if temp_data < 0:
        symbol = -1
    degree = int(temp_data / 100.0)
    str_decimal = str(in_data1[len_data1-2]) + str(in_data1[len_data1-1]) + '.' + str(str_data2)
    f_degree = float(str_decimal)/60.0
    # print("f_degree:", f_degree)
    if symbol > 0:
        result = degree + f_degree
	else:
		result = degree - f_degree
	return result
```

Conversione da WGS-84 a GCJ-02:


```python
def gps84_to_gcj02(self, lat, lon):
    if (self.outOfChina(lat, lon)):
        return [0, 0]
    dLat = self.transformLat(lon - 105.0, lat - 35.0)
    dLon = self.transformLon(lon - 105.0, lat - 35.0)
    radLat = lat / 180.0 * self.PI
    magic = math.sin(radLat)
    magic = 1 - self.EE * magic * magic
    sqrtMagic = math.sqrt(magic)
    dLat = (dLat * 180.0)/((self.A * (1 - self.EE))/(magic * sqrtMagic) * self.PI)
    dLon = (dLon * 180.0) / (self.A / sqrtMagic * math.cos(radLat) * self.PI)
    mgLat = lat + dLat
    mgLon = lon + dLon
    return [mgLat, mgLon]
```

Conversione da GCJ-02 a BD-09:

```python
def gcj02_to_bd09(self, gg_lat, gg_lon):
    x = gg_lon
    y = gg_lat
    z = math.sqrt(x * x + y * y) + 0.00002 * math.sin(y * self.PI)
    theta = math.atan2(y, x) + 0.000003 * math.cos(x * self.PI)
    bd_lon = z * math.cos(theta) + 0.0065
    bd_lat = z * math.sin(theta) + 0.006
    return [bd_lat, bd_lon]
```

Altre funzioni e variabili intermedie necessarie:

```python
self.PI = 3.1415926535897932384626
self.A = 6378245.0
self.EE = 0.00669342162296594323

def outOfChina(self, lat, lon):
    if (lon < 72.004 or lon > 137.8347):
        return True
    if (lat < 0.8293 or lat > 55.8271):
        return True
    return False
    
def transform(self, lat, lon):
    if (self.outOfChina(lat, lon)):
        return [lat, lon]
    dLat = self.transformLat(lon - 105.0, lat - 35.0)
    dLon = self.transformLon(lon - 105.0, lat - 35.0)
    radLat = lat / 180.0 * self.PI
    magic = math.sin(radLat)
    magic = 1 - self.EE * magic * magic
    sqrtMagic = math.sqrt(magic)
    dLat = (dLat * 180.0) / ((self.A * (1 - self.EE)) / (magic * sqrtMagic) *self.PI)
    dLon = (dLon * 180.0) / (self.A / sqrtMagic * math.cos(radLat) * self.PI)
    mgLat = lat + dLat
    mgLon = lon + dLon
    return [mgLat, mgLon]
    
def transformLat(self, x, y):
    ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * math.sqrt(abs(x))
    ret += (20.0 * math.sin(6.0 * x * self.PI) + 20.0 * math.sin(2.0 * x * self.PI)) * 2.0 / 3.0
    ret += (20.0 * math.sin(y * self.PI) + 40.0 * math.sin(y / 3.0 * self.PI)) * 2.0 / 3.0
    ret += (160.0 * math.sin(y / 12.0 * self.PI) + 320 * math.sin(y * self.PI / 30.0)) * 2.0 / 3.0
    return ret
    
def transformLon(self, x, y):
    ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * math.sqrt(abs(x))
    ret += (20.0 * math.sin(6.0 * x * self.PI) + 20.0 * math.sin(2.0 * x * self.PI)) * 2.0 / 3.0
    ret += (20.0 * math.sin(x * self.PI) + 40.0 * math.sin(x / 3.0 * self.PI)) * 2.0 / 3.0
    ret += (150.0 * math.sin(x / 12.0 * self.PI) + 300.0 * math.sin(x / 30.0 * self.PI)) * 2.0 / 3.0
    return ret
```

Per 高德地图 utilizzare il risultato della conversione al sistema di coordinate GCJ-02; per il sistema di coordinate di 百度 utilizzare il risultato della conversione al sistema di coordinate BD-09.

## Riepilogo

Mappe come 谷歌地图 utilizzano il sistema di coordinate WGS-84; il valore di coordinata fornito dal sistema di posizionamento BeiDou deve essere sottoposto a una conversione di gradi, minuti e secondi, e solo dopo la conversione saranno coordinate 84. Mappe come 高德地图 utilizzano il sistema di coordinate Marte GCJ-02, il che equivale a effettuare prima una cifratura GCJ-02 affinché il sistema di coordinate possa essere usato su 高德地图; 百度地图 richiede inoltre un'ulteriore cifratura BD-09.

<RelatedProducts slugs="gps-beidou-module" />
