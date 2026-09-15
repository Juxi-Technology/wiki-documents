---
title: "地図測位の誤差"
description: "腾讯、高德地图が使用する座標と上位機の座標は異なります。私たちの上位機は天地图のAPI（WGS-84標準）を呼び出しているため、変換されたデータには差異が生じます。GPS/北斗の測位情報を取得した後、GPS/北斗の測位…"
---



# 地図測位の誤差

[toc]

## はじめに

腾讯、高德地图が使用する座標と上位機の座標は異なります。私たちの上位機は天地图のAPI（WGS-84標準）を呼び出しているため、変換されたデータには差異が生じます。GPS/北斗の測位情報を取得した後、GPS/北斗の測位情報を天地图（WGS-84標準）の座標に変換してから、さらに変換を行う必要があります。

## よく使われる座標系の紹介

    WGS-84(GPS)
    国際標準。一般に国際標準のGPS機器から取得する座標はWGS-84であり、国際的な地図プロバイダが使用する座標系です。
    
    GCJ-02
    中国標準。国測局が02年に発表した座標系です。別名「火星座標」とも呼ばれます。中国では、地理位置に対して少なくとも「GCJ-02」による初回の暗号化を行う必要があります。例えば谷歌中国、高德、腾讯などがこの座標系を使用しています。
    
    BD-09
    百度標準。「GCJ-02」をベースに二次暗号化を行います。

![図 1](../../../../../public/images/tutorials/sensors/gps/Map-Location-Error/1.png)

## 北斗測位システムの座標

北斗測位システムと連携したことがある方は、一つの問題に気づくかもしれません。北斗座標の緯度経度はすべて100倍されているように見えるのでは？

$GNRMC,083735.000,A,2429.53531,N,11810.78036,E,0.54,171.11,190621,A*7E

これが、私たちの北斗測位システムが受信した座標値です。北緯は2429.53531、東経は11810.78036であることがわかります。もしこの緯度経度をそのまま100で割ると、北緯24.2953531、東経118.1078036となり、百度あるいは高德地图では座標のずれがひどくなります。

高德地图の測位：
![図 2](../../../../../public/images/tutorials/sensors/gps/Map-Location-Error/2.png)

百度地图の測位：

![図 3](../../../../../public/images/tutorials/sensors/gps/Map-Location-Error/3.png)

両者の距離はいずれも数十キロずれていることがわかります。この原因は、国内では高德であれ百度であれ、それらが使用する緯度経度の値は暗号化された後の値であり、GPSの実際の緯度経度を直接用いて測位しているのではないことにあります。したがって、北斗測位システムの座標系を商業地図で使用したい場合には、対応する暗号化変換処理を行って初めて正しく使用できます。

## 座標系の相互変換

まず一点強調しておきます。実は私たちの北斗測位の座標系の値は単純な100倍の関係ではなく、一度度分秒の変換を行う必要があります。つまり、取得した北斗座標値、北緯2429.53531、東経11810.78036は、次のように計算する必要があります：24+（29.53531/60）≈ 24.49225517 118+（10.78036/60）≈118.17967267

この二つの値こそが私たちが変換式に代入すべき座標値です。もし100倍の関係の値を直接用いて変換すると、測位は同様にずれます。したがって、まずgps84標準の座標値に変換する必要があります。

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

WGS-84からGCJ-02への変換：


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

GCJ-02からBD-09への変換：

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

その他の中間で必要な関数と変数：

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

高德地图にはGCJ-02座標系の変換結果を使用し、百度座標系にはBD-09座標系の変換結果を使用してください。

## まとめ

谷歌地图などはWGS-84座標系を使用しているため、北斗測位システムから与えられた座標値は一度度分秒の変換を行う必要があり、変換後が84座標となります。高德地图などはGCJ-02火星座標系を使用しているため、まず一度GCJ-02の暗号化を行わないと座標系を高德地图で使用できません。百度地图の場合はさらに一度BD-09の暗号化を行う必要があります。

<RelatedProducts slugs="gps-beidou-module" />
