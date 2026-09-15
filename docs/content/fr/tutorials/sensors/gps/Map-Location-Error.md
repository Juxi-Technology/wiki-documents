---
title: "Erreur de positionnement sur la carte"
description: "Les coordonnées utilisées par Tencent et Amap diffèrent de celles de l'ordinateur hôte. Notre ordinateur hôte…"
---



# Erreur de positionnement sur la carte

[toc]

## Avant-propos

Les coordonnées utilisées par Tencent et Amap diffèrent de celles de l'ordinateur hôte. Notre ordinateur hôte utilise l'API de Tianditu (norme WGS-84), c'est pourquoi les données converties présentent des différences. Après avoir obtenu les informations de position GPS/BeiDou, il faut d'abord convertir les informations de position GPS/BeiDou en coordonnées de Tianditu (norme WGS-84), puis effectuer la conversion.

## Présentation des systèmes de coordonnées courants

    WGS-84(GPS)
    Norme internationale. Les coordonnées obtenues à partir d'appareils GPS conformes à la norme internationale sont généralement en WGS-84, ainsi que le système de coordonnées utilisé par les fournisseurs de cartes internationaux.
    
    GCJ-02
    Norme chinoise, système de coordonnées publié en 2002 par le bureau national de cartographie. Également appelé « coordonnées Mars ». En Chine, il faut au moins utiliser une première fois « GCJ-02 » pour chiffrer la position géographique. Par exemple, Google Chine, Amap et Tencent utilisent tous ce système de coordonnées.
    
    BD-09
    Norme Baidu, un deuxième chiffrement effectué sur la base de « GCJ-02 ».

![Image 1](../../../../../public/images/tutorials/sensors/gps/Map-Location-Error/1.png)

## Coordonnées du système de positionnement BeiDou

Les personnes qui ont déjà travaillé avec un système de positionnement BeiDou ont peut-être remarqué un problème : les latitudes et longitudes des coordonnées BeiDou semblent toutes multipliées par 100 ?

$GNRMC,083735.000,A,2429.53531,N,11810.78036,E,0.54,171.11,190621,A*7E

Ce sont les valeurs de coordonnées reçues par notre système de positionnement BeiDou ; on remarque que la latitude nord est 2429.53531 et la longitude est est 11810.78036. Si nous divisons directement cette latitude et cette longitude par 100, la latitude nord devient 24.2953531 et la longitude est 118.1078036 ; dans Baidu Maps ou Amap, la coordonnée est alors fortement décalée.

Positionnement dans Amap :
![Image 2](../../../../../public/images/tutorials/sensors/gps/Map-Location-Error/2.png)

Positionnement dans Baidu Maps :

![Image 3](../../../../../public/images/tutorials/sensors/gps/Map-Location-Error/3.png)

On remarque que les distances des deux sont décalées de plusieurs dizaines de kilomètres. La raison en est qu'en Chine, tant Amap que Baidu utilisent des valeurs de latitude et de longitude chiffrées, et non directement la latitude et la longitude réelles du GPS pour se positionner. Par conséquent, si nous voulons utiliser le système de coordonnées du système de positionnement BeiDou sur des cartes commerciales, nous devons d'abord lui appliquer le traitement de chiffrement et de conversion correspondant pour pouvoir l'utiliser correctement.

## Conversion mutuelle des systèmes de coordonnées

Tout d'abord, il faut souligner que les valeurs de coordonnées de notre positionnement BeiDou ne sont pas dans une simple relation de facteur 100, mais nécessitent une conversion degrés/minutes/secondes. Pour les valeurs de coordonnées BeiDou obtenues, latitude nord 2429.53531, longitude est 11810.78036, il faut effectuer le calcul suivant : 24+（29.53531/60）≈ 24.49225517 118+（10.78036/60）≈118.17967267

Ce sont ces deux valeurs que nous devons utiliser dans la formule de conversion. Si nous utilisons directement les valeurs dans une relation de facteur 100 pour la conversion, le positionnement sera également décalé ; il faut donc d'abord les convertir en valeurs de coordonnées conformes à la norme gps84.

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

Conversion de WGS-84 en GCJ-02 :


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

Conversion de GCJ-02 en BD-09 :

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

Autres fonctions et variables intermédiaires nécessaires :

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

Pour Amap, veuillez utiliser le résultat de conversion du système de coordonnées GCJ-02 ; pour le système de coordonnées Baidu, veuillez utiliser le résultat de conversion du système de coordonnées BD-09.

## Conclusion

Google Maps et d'autres utilisent le système de coordonnées WGS-84. Les valeurs de coordonnées fournies par le système de positionnement BeiDou doivent subir une conversion degrés/minutes/secondes ; ce n'est qu'après la conversion qu'il s'agit de coordonnées 84. Amap et d'autres utilisent le système de coordonnées « Mars » GCJ-02, ce qui signifie qu'il faut d'abord effectuer un chiffrement GCJ-02 pour que le système de coordonnées soit utilisable dans Amap ; Baidu Maps nécessite en plus un chiffrement BD-09.

<RelatedProducts slugs="gps-beidou-module" />
