---
title: "Map Location Error"
description: "Map location error explained: why GPS/BeiDou coordinates are offset on Amap and Baidu maps, and how WGS-84, GCJ-02, and BD-09 systems convert."
---



# Map Location Error

[toc]

## Preface

The coordinates used by Tencent and Amap differ from those of our host computer. Our host computer calls the Tianditu API (WGS-84 standard), so the converted data will differ. After obtaining the GPS/BeiDou positioning information, the GPS/BeiDou positioning information must be converted into Tianditu (WGS-84 standard) coordinates before performing the conversion.

## Introduction to Common Coordinate Systems

    WGS-84(GPS)
    International standard. Generally, the coordinates obtained from international-standard GPS devices are all WGS-84, and it is the coordinate system used by international map providers.
    
    GCJ-02
    Chinese standard, released by the State Bureau of Surveying and Mapping in 2002. Also known as the "Mars coordinates". In China, "GCJ-02" must be used at least once to encrypt geographic locations. For example, Google China, Amap, and Tencent all use this coordinate system.
    
    BD-09
    Baidu standard, which performs a second encryption on top of "GCJ-02".

![Image 1](../../../../public/images/tutorials/sensors/gps/Map-Location-Error/1.png)

## BeiDou Positioning System Coordinates

If you have ever integrated a BeiDou positioning system, you may notice a problem: the BeiDou coordinate latitude and longitude seem to have been multiplied by 100?

$GNRMC,083735.000,A,2429.53531,N,11810.78036,E,0.54,171.11,190621,A*7E

This is the coordinate value received by our BeiDou positioning system. You can see that the latitude is 2429.53531 and the longitude is 11810.78036. If we directly divide this latitude and longitude by 100, the latitude is 24.2953531 and the longitude is 118.1078036, and the coordinate offset in Baidu or Amap maps is absurdly large.

Amap positioning:
![Image 2](../../../../public/images/tutorials/sensors/gps/Map-Location-Error/2.png)

Baidu Maps positioning:

![Image 3](../../../../public/images/tutorials/sensors/gps/Map-Location-Error/3.png)

As you can see, both are offset by dozens of kilometers. The reason is that in China, whether Amap or Baidu, the latitude and longitude values they use are all encrypted values, rather than being positioned directly using the actual GPS latitude and longitude. Therefore, if we want to use the coordinate system of the BeiDou positioning system on commercial maps, we need to process it through the corresponding encryption conversion before it can be used correctly.

## Mutual Conversion Between Coordinate Systems

First, it must be emphasized that the coordinate values of our BeiDou positioning are not simply a 100-times relationship; rather, a degree-minute-second conversion is required. So for the BeiDou coordinate values we obtained, latitude 2429.53531 and longitude 11810.78036, the following calculation is needed: 24+(29.53531/60)≈ 24.49225517 118+(10.78036/60)≈118.17967267

These two values are the coordinate values we should plug into the conversion formula. If you directly use the values in a 100-times relationship for conversion, the positioning will still be offset, so they need to be converted into GPS84-standard coordinate values first.

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

Converting WGS-84 to GCJ-02:


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

Converting GCJ-02 to BD-09:

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

Other intermediate functions and variables needed:

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

For Amap, use the GCJ-02 coordinate system conversion result; for the Baidu coordinate system, use the BD-09 coordinate system conversion result.

## Summary

Google Maps and the like use the WGS-84 coordinate system. The coordinate values given by the BeiDou positioning system need a degree-minute-second conversion, and only after conversion are they 84 coordinates. Amap and the like use the GCJ-02 Mars coordinate system, which means a GCJ-02 encryption must be done first before the coordinate system can be used in Amap. Baidu Maps, in turn, requires another BD-09 encryption.

<RelatedProducts slugs="gps-beidou-module" />
