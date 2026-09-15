---
title: "Error de posicionamiento en el mapa"
description: "Las coordenadas que utilizan 腾讯 y 高德地图 no son las mismas que las del software de PC; nuestro software de PC l…"
---



# Error de posicionamiento en el mapa

[toc]

## Introducción

Las coordenadas que utilizan 腾讯 y 高德地图 no son las mismas que las del software de PC; nuestro software de PC llama a la API de 天地图 (estándar WGS-84), por lo que los datos convertidos presentarán diferencias. Una vez obtenida la información de posicionamiento GPS/BeiDou, es necesario convertir la información de posicionamiento GPS/BeiDou a las coordenadas de 天地图 (estándar WGS-84) antes de realizar la conversión.

## Introducción a los sistemas de coordenadas comunes

    WGS-84(GPS)
    Estándar internacional; por lo general, las coordenadas obtenidas de dispositivos GPS de estándar internacional son WGS-84, así como el sistema de coordenadas que utilizan los proveedores de mapas internacionales.
    
    GCJ-02
    Estándar chino, sistema de coordenadas publicado en 2002 por la Oficina Estatal de Topografía y Cartografía de China. También se conoce como "coordenadas Marte". En China, es obligatorio cifrar la ubicación geográfica al menos una vez con "GCJ-02". Por ejemplo, Google China, 高德 y 腾讯 utilizan este sistema de coordenadas.
    
    BD-09
    Estándar de 百度, cifrado por segunda vez sobre la base de "GCJ-02".

![Imagen 1](../../../../../public/images/tutorials/sensors/gps/Map-Location-Error/1.png)

## Coordenadas del sistema de posicionamiento BeiDou

Si alguna vez ha integrado el sistema de posicionamiento BeiDou, quizá haya notado un problema: ¿parece que la latitud y la longitud de las coordenadas BeiDou se han multiplicado por 100?

$GNRMC,083735.000,A,2429.53531,N,11810.78036,E,0.54,171.11,190621,A*7E

Este es el valor de coordenadas que recibe nuestro sistema de posicionamiento BeiDou; puede observarse que la latitud norte es 2429.53531 y la longitud este es 11810.78036. Si dividimos directamente esta latitud y longitud entre 100, la latitud norte sería 24.2953531 y la longitud este 118.1078036, y en 百度 o 高德地图 el desplazamiento de las coordenadas es desmesurado.

Posicionamiento en 高德地图:
![Imagen 2](../../../../../public/images/tutorials/sensors/gps/Map-Location-Error/2.png)

Posicionamiento en 百度地图:

![Imagen 3](../../../../../public/images/tutorials/sensors/gps/Map-Location-Error/3.png)

Puede observarse que en ambos casos la distancia se desvía varias decenas de kilómetros. La razón es que, en China, tanto 高德 como 百度 utilizan valores de latitud y longitud ya cifrados, en lugar de posicionarse directamente con la latitud y longitud reales del GPS; por lo tanto, si queremos utilizar el sistema de coordenadas del posicionamiento BeiDou en mapas comerciales, debemos someterlo al correspondiente procesamiento de conversión y cifrado para poder usarlo correctamente.

## Conversión mutua entre sistemas de coordenadas

En primer lugar, hay que destacar un punto: en realidad, el valor del sistema de coordenadas de nuestro posicionamiento BeiDou no guarda una simple relación de 100 veces, sino que requiere una conversión de grados, minutos y segundos. Así, los valores de coordenadas BeiDou que obtenemos, latitud norte 2429.53531 y longitud este 11810.78036, requieren el siguiente cálculo: 24+（29.53531/60）≈ 24.49225517 118+（10.78036/60）≈118.17967267

Estos dos valores son los que debemos introducir en la fórmula de conversión; si utilizamos directamente los valores de la relación de 100 veces para convertir, el posicionamiento también se desviará, por lo que primero hay que convertirlos a valores de coordenadas del estándar gps84.

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

Conversión de WGS-84 a GCJ-02:


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

Conversión de GCJ-02 a BD-09:

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

Otras funciones y variables intermedias necesarias:

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

Para 高德地图 utilice el resultado de la conversión al sistema de coordenadas GCJ-02; para el sistema de coordenadas de 百度 utilice el resultado de la conversión al sistema de coordenadas BD-09.

## Resumen

Mapas como 谷歌地图 utilizan el sistema de coordenadas WGS-84; el valor de coordenadas que proporciona el sistema de posicionamiento BeiDou debe someterse a una conversión de grados, minutos y segundos, y solo tras la conversión serán coordenadas 84. Mapas como 高德地图 utilizan el sistema de coordenadas Marte GCJ-02, lo que equivale a realizar primero un cifrado GCJ-02 para que el sistema de coordenadas pueda usarse en 高德地图; 百度地图 requiere además un cifrado BD-09 adicional.

<RelatedProducts slugs="gps-beidou-module" />
