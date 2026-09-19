---
title: "Erro de localização no mapa"
description: "Compreenda o erro de localização no mapa: diferenças entre os sistemas de coordenadas WGS-84, GCJ-02 e BD-09 usados pelo GPS e pelos mapas, e a sua conversão."
---



# Erro de localização no mapa

[toc]

## Introdução

As coordenadas usadas pelo 腾讯 e pelo 高德地图 são diferentes das coordenadas do software de nível superior; o nosso software de nível superior chama a API do 天地图 (padrão WGS-84), portanto os dados convertidos apresentarão diferenças. Após obter as informações de posicionamento de GPS/BeiDou, é preciso converter as informações de posicionamento de GPS/BeiDou em coordenadas do 天地图 (padrão WGS-84) antes de realizar a conversão.

## Introdução aos sistemas de coordenadas comuns

    WGS-84(GPS)
    Padrão internacional; geralmente, as coordenadas obtidas de dispositivos GPS do padrão internacional são WGS-84, e é o sistema de coordenadas usado por fornecedores de mapas internacionais.
    
    GCJ-02
    Padrão chinês, sistema de coordenadas publicado em 2002 pelo Serviço Nacional de Cartografia da China. Também é chamado de “coordenadas de Marte”. Na China, é obrigatório utilizar pelo menos o “GCJ-02” para a primeira encriptação da localização geográfica. Por exemplo, 谷歌中国, 高德 e 腾讯 utilizam este sistema de coordenadas.
    
    BD-09
    Padrão 百度, realiza uma segunda encriptação com base no “GCJ-02”.

![Imagem 1](../../../../../public/images/tutorials/sensors/gps/Map-Location-Error/1.png)

## Coordenadas do sistema de posicionamento BeiDou

Se já integrou o sistema de posicionamento BeiDou, talvez tenha notado um problema: as coordenadas de latitude e longitude do BeiDou parecem estar multiplicadas por 100?

$GNRMC,083735.000,A,2429.53531,N,11810.78036,E,0.54,171.11,190621,A*7E

Este é o valor de coordenadas recebido pelo nosso sistema de posicionamento BeiDou; pode-se notar que a latitude norte é 2429.53531 e a longitude leste é 11810.78036. Se dividirmos diretamente essa latitude e longitude por 100, a latitude norte será 24.2953531 e a longitude leste será 118.1078036, e as coordenadas no 百度 ou 高德地图 ficarão absurdamente deslocadas.

Posicionamento no 高德地图:
![Imagem 2](../../../../../public/images/tutorials/sensors/gps/Map-Location-Error/2.png)

Posicionamento no Baidu Maps:

![Imagem 3](../../../../../public/images/tutorials/sensors/gps/Map-Location-Error/3.png)

Pode-se notar que a distância de ambos está deslocada em dezenas de quilómetros. A razão disso é que, no país, tanto o 高德 quanto o 百度 utilizam valores de latitude e longitude que já foram encriptados, e não a latitude e longitude reais do GPS diretamente para o posicionamento. Portanto, se quisermos usar o sistema de coordenadas do sistema de posicionamento BeiDou em mapas comerciais, é necessário submetê-lo ao processamento de conversão de encriptação correspondente para que possa ser usado corretamente.

## Conversão entre sistemas de coordenadas

Em primeiro lugar, é preciso enfatizar que, na verdade, o valor do sistema de coordenadas do nosso posicionamento BeiDou não é uma simples relação de 100 vezes, mas requer uma conversão de graus, minutos e segundos. Assim, os valores de coordenadas do BeiDou que obtemos, latitude norte 2429.53531 e longitude leste 11810.78036, precisam do seguinte cálculo: 24+（29.53531/60）≈ 24.49225517 118+（10.78036/60）≈118.17967267

Esses dois valores é que são as coordenadas que devemos inserir na fórmula de conversão. Se usarmos diretamente o valor da relação de 100 vezes para converter, o posicionamento também apresentará desvio; portanto, é preciso primeiro converter para o valor de coordenadas do padrão gps84.

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

Conversão de WGS-84 para GCJ-02:


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

Conversão de GCJ-02 para BD-09:

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

Outras funções e variáveis intermédias necessárias:

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

Para o 高德地图, use o resultado da conversão do sistema de coordenadas GCJ-02; para o sistema de coordenadas do 百度, use o resultado da conversão do sistema de coordenadas BD-09.

## Conclusão

Mapas como o 谷歌地图 utilizam o sistema de coordenadas WGS-84; o valor de coordenadas fornecido pelo sistema de posicionamento BeiDou tem de sofrer uma conversão de graus, minutos e segundos, e só após a conversão é que se obtém a coordenada 84. Mapas como o 高德地图 utilizam o sistema de coordenadas “Marte” GCJ-02, ou seja, é preciso primeiro fazer uma encriptação GCJ-02 para que o sistema de coordenadas possa ser usado no 高德地图; o Baidu Maps, por sua vez, precisa de mais uma encriptação BD-09.

<RelatedProducts slugs="gps-beidou-module" />
