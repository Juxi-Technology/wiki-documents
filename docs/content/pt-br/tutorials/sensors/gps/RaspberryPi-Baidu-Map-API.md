---
title: "Raspberry Pi: API do Baidu Maps"
description: "API do Baidu Maps no Raspberry Pi — registrar a conta de desenvolvedor, obter a chave de acesso e converter o posicionamento do módulo GPS e BeiDou no mapa."
---

# Raspberry Pi: API do Baidu Maps

**1.** **Método de registro**

Acesse a plataforma aberta do Baidu Maps https://lbsyun.baidu.com/

Role até o final da página

Clique em Registrar agora

![Imagem 1](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/19.jpg) 

Recomenda-se escolher tornar-se desenvolvedor individual (porque pode ser usado no mesmo dia da solicitação)

Basta seguir as instruções passo a passo

![Imagem 2](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/20.jpg) 

**2. Obter a ak**

Usamos o 普通IP定位 do serviço web; a documentação pode ser consultada no link abaixo.

https://lbsyun.baidu.com/index.php?title=webapi/ip-api

Clique em Console, selecione Meus aplicativos, selecione Criar aplicativo.

![Imagem 3](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/21.jpg) 

Escolha qualquer nome para o aplicativo, selecione Servidor como tipo de aplicativo, ative o serviço e insira 0.0.0.0/0 na lista de permissões.

![Imagem 4](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/22.jpg) 

Clique em Enviar para gerar um aplicativo.

![Imagem 5](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/23.jpg) 

Copie o valor de ak do nosso aplicativo

![Imagem 6](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/24.jpg) 

Cole no programa e salve; assim, será possível ler as informações de posição através do Baidu Maps.

![Imagem 7](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/25.jpg)

<RelatedProducts slugs="gps-beidou-module" />
