---
title: "Jetson: API do Baidu Maps"
description: "Utilize a API do Baidu Maps no Jetson Orin: registo na plataforma de programadores, obtenção da chave de acesso e conversão das coordenadas GPS para o mapa."
---

# Jetson: API do Baidu Maps

**1.** **Método de registo**

Aceda à plataforma aberta do Baidu Maps https://lbsyun.baidu.com/

Deslize até ao fundo da página

Clique em Registar agora

![Imagem 1](../../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/18.jpg) 

Recomenda-se escolher tornar-se programador individual (porque pode ser utilizado no mesmo dia do pedido)

Basta seguir as instruções passo a passo

![Imagem 2](../../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/19.jpg) 

**2. Obter a ak**

Utilizamos o 普通IP定位 do serviço web; a documentação pode ser consultada na ligação abaixo.

https://lbsyun.baidu.com/index.php?title=webapi/ip-api

Clique em Consola, selecione As minhas aplicações, selecione Criar aplicação.

![Imagem 3](../../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/20.jpg) 

Escolha qualquer nome para a aplicação, selecione Servidor como tipo de aplicação, ative o serviço e insira 0.0.0.0/0 na lista de permissões.

![Imagem 4](../../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/21.jpg) 

Clique em Submeter para gerar uma aplicação.

![Imagem 5](../../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/22.jpg) 

Copie o valor de ak da nossa aplicação

![Imagem 6](../../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/23.jpg) 

Cole no programa e guarde; assim, será possível ler as informações de posição através do Baidu Maps.

![Imagem 7](../../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/24.jpg)

<RelatedProducts slugs="gps-beidou-module" />
