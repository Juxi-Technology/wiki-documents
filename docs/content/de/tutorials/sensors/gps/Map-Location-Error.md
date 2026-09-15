---
title: "Kartenpositionsfehler"
description: "Die von Tencent und Amap verwendeten Koordinaten unterscheiden sich von den Koordinaten des Host-Computers. U…"
---



# Kartenpositionsfehler

[toc]

## Vorwort

Die von Tencent und Amap verwendeten Koordinaten unterscheiden sich von den Koordinaten des Host-Computers. Unser Host-Computer verwendet die API von Tianditu (WGS-84-Standard), daher kann es bei den umgerechneten Daten zu Abweichungen kommen. Nach dem Erhalt der GPS/BeiDou-Positionsinformationen müssen die GPS/BeiDou-Positionsinformationen zunächst in die Koordinaten von Tianditu (WGS-84-Standard) umgewandelt werden, bevor die weitere Umrechnung erfolgt.

## Vorstellung der gebräuchlichen Koordinatensysteme

    WGS-84(GPS)
    Internationaler Standard. Die von international standardisierten GPS-Geräten ermittelten Koordinaten sind in der Regel WGS-84; ebenso das von internationalen Kartenanbietern verwendete Koordinatensystem.
    
    GCJ-02
    Chinesischer Standard, ein von der nationalen Vermessungsbehörde im Jahr 2002 veröffentlichtes Koordinatensystem. Auch „Mars-Koordinaten“ genannt. In China muss die geografische Position mindestens einmal mit „GCJ-02“ verschlüsselt werden. Zum Beispiel verwenden Google China, Amap und Tencent dieses Koordinatensystem.
    
    BD-09
    Baidu-Standard, eine sekundäre Verschlüsselung auf Basis von „GCJ-02“.

![Abb. 1](../../../../../public/images/tutorials/sensors/gps/Map-Location-Error/1.png)

## Koordinaten des BeiDou-Positionierungssystems

Wer schon einmal mit einem BeiDou-Positionierungssystem gearbeitet hat, hat vielleicht ein Problem bemerkt: Die Längen- und Breitengrade der BeiDou-Koordinaten scheinen alle mit 100 multipliziert zu sein?

$GNRMC,083735.000,A,2429.53531,N,11810.78036,E,0.54,171.11,190621,A*7E

Dies sind die von unserem BeiDou-Positionierungssystem empfangenen Koordinatenwerte. Man erkennt: die nördliche Breite ist 2429.53531, die östliche Länge ist 11810.78036. Wenn wir diesen Längen- und Breitengrad direkt durch 100 teilen, erhalten wir die nördliche Breite 24.2953531 und die östliche Länge 118.1078036; in Baidu Maps oder Amap weicht die Koordinate dann stark ab.

Positionierung in Amap:
![Abb. 2](../../../../../public/images/tutorials/sensors/gps/Map-Location-Error/2.png)

Positionierung in Baidu Maps:

![Abb. 3](../../../../../public/images/tutorials/sensors/gps/Map-Location-Error/3.png)

Man erkennt, dass beide Entfernungen um mehrere zehn Kilometer abweichen. Der Grund dafür ist, dass in China sowohl Amap als auch Baidu verschlüsselte Längen- und Breitengradwerte verwenden und nicht die tatsächlichen GPS-Koordinaten direkt zur Positionierung nutzen. Wenn wir daher das Koordinatensystem des BeiDou-Positionierungssystems auf kommerziellen Karten verwenden möchten, müssen wir es zunächst einer entsprechenden Verschlüsselungs- und Umrechnungsverarbeitung unterziehen, um es korrekt zu verwenden.

## Gegenseitige Umrechnung der Koordinatensysteme

Zunächst sei betont, dass die Koordinatenwerte unserer BeiDou-Positionierung tatsächlich nicht einfach in einem 100-fachen Verhältnis stehen, sondern eine Umrechnung von Grad/Minuten/Sekunden erforderlich ist. Für die erhaltenen BeiDou-Koordinatenwerte, nördliche Breite 2429.53531, östliche Länge 11810.78036, ist folgende Berechnung durchzuführen: 24+（29.53531/60）≈ 24.49225517 118+（10.78036/60）≈118.17967267

Erst diese beiden Werte sind die Koordinatenwerte, die wir in die Umrechnungsformel einsetzen sollten. Wenn wir direkt die Werte im 100-fachen Verhältnis zur Umrechnung verwenden, weicht die Positionierung ebenfalls ab. Daher müssen sie zunächst in Koordinatenwerte des gps84-Standards umgewandelt werden.

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

Umrechnung von WGS-84 in GCJ-02:


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

Umrechnung von GCJ-02 in BD-09:

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

Weitere zwischengeschaltet benötigte Funktionen und Variablen:

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

Für Amap verwenden Sie bitte das Umrechnungsergebnis des GCJ-02-Koordinatensystems, für das Baidu-Koordinatensystem das Umrechnungsergebnis des BD-09-Koordinatensystems.

## Zusammenfassung

Google Maps und andere verwenden das WGS-84-Koordinatensystem. Die vom BeiDou-Positionierungssystem gelieferten Koordinatenwerte müssen einmal von Grad/Minuten/Sekunden umgerechnet werden; erst nach der Umrechnung erhält man 84-Koordinaten. Amap und andere verwenden das GCJ-02-„Mars“-Koordinatensystem, das heißt, es muss zuerst eine GCJ-02-Verschlüsselung erfolgen, damit das Koordinatensystem in Amap verwendet werden kann. Für Baidu Maps ist zusätzlich eine BD-09-Verschlüsselung erforderlich.

<RelatedProducts slugs="gps-beidou-module" />
