---
title: "Jetson: posicionamento AGNSS"
description: "Posicionamento AGNSS no Jetson Orin — usar o servidor de assistência para acelerar o primeiro posicionamento do módulo GPS e BeiDou em sinal fraco."
---

# Jetson: posicionamento AGNSS

**1. Objetivos de aprendizagem**

Nesta lição, vamos aprender principalmente a usar o Jetson Orin, o módulo GPS e o servidor agnss para implementar a leitura e análise de informações de posição em condições de sinal fraco.

**2. Descrição do AGNSS**

2.1. **Por que usar AGNSS**

• As condições para o posicionamento de um receptor GNSS autônomo incluem:

- Capturar e rastrear os sinais de satélite e analisar o tempo

- Obter a mensagem de navegação dos satélites

• Em ambiente de sinal forte, um receptor GNSS autônomo pode realizar o posicionamento em arranque a frio em cerca de 30 segundos; porém, em ambiente de sinal fraco, o receptor sem assistência externa captura os satélites muito lentamente e tem dificuldade em obter a mensagem de navegação dos satélites, precisando de muito tempo para se posicionar, ou até sendo incapaz de se posicionar.

• O AGNSS pode fornecer ao receptor as informações auxiliares necessárias para o posicionamento, como a mensagem de navegação, a posição aproximada e o tempo. Seja em ambiente de sinal forte ou fraco, essas informações podem reduzir significativamente o tempo até o primeiro posicionamento.

2.2. **Solução AGNSS**

• O servidor AGNSS obtém e gerencia informações auxiliares AGNSS a partir de várias fontes de dados GNSS. O servidor monitora e responde a todo momento às solicitações AGNSS dos clientes (são necessários nome de usuário e senha).

• O usuário obtém informações auxiliares do servidor AGNSS através do protocolo TCP/IP; as informações auxiliares obtidas podem ser transmitidas diretamente ao receptor GNSS.

• O usuário também pode estabelecer seu próprio servidor proxy.

![Imagem 1](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/1.png) 

2.3. **Fluxo do AGNSS**

• Conectar ao servidor AGNSS

–O endereço do servidor é 121.41.40.95 (domínio: www.gnss-aide.com)

–O número da porta é 2621

• Enviar a solicitação AGNSS

–Instrução de solicitação: (os campos de nome de usuário e senha são obrigatórios)

–user=pm@juxi.com;pwd=juxi;cmd=full;gnss=gps+bd;lat=60.0;lon=55.0;alt=0;

• Obter informações auxiliares AGNSS

• Enviar as informações auxiliares AGNSS ao receptor

2.4. **Parâmetros da solicitação AGNSS**

• O cliente envia a solicitação ao servidor AGNSS; o formato da instrução de solicitação é o seguinte

–A instrução de solicitação é uma combinação de vários grupos key=value;, como: key=value;key=value;

• Exemplo: user=pm@juxi.com;pwd=juxi;cmd=full;gnss=gps+bd;lat=60.0;lon=55.0;alt=0;

• A definição específica de key e value é mostrada na tabela abaixo

| Palavra-chave (Key) | Valor (value) | Opcionalidade | Observações                                                  |
| ----------- | ----------- | ------ | ------------------------------------------------------------ |
| **user**    | String      | Obrigatório   | Nome de usuário. Recomenda-se fortemente que o nome de usuário seja um endereço de e-mail válido; informações importantes de manutenção do servidor AGNSS serão enviadas para esse e-mail. |
| **pwd**     | String      | Obrigatório   | Senha do usuário                                             |
| **gnss**    | String      | Opcional   | Lista de GNSS separada por vírgulas; atualmente suporta GPS. Os valores válidos são: gps,bds,glo. ”gnss=gps;” indica solicitar informações auxiliares de GPS; gnss=gps,bds;” indica solicitar informações auxiliares de GPS e BDS; |
| **cmd**     | String      | Opcional   | full: todas as informações, incluindo efemérides, tempo e posição estimados; eph: fornece apenas informações de efemérides; aid: informações auxiliares de tempo, posição, etc. Se este item não for preenchido, o padrão é full |
| **lat**     | Numérico        | Opcional   | Valor estimado da latitude da posição do usuário. Unidade da latitude: graus. Faixa de valores: -90 a 90 graus. Há dois formatos de auxílio de posição, o formato latitude-longitude-altitude e o formato ECEF; escolha um deles. O formato válido de auxílio de posição latitude-longitude-altitude é ”lat=30;lon=120.3;alt=100;”, e os três campos devem estar completos. |
| **lon**     | Numérico        | Opcional   | Valor estimado da longitude da posição do usuário. Unidade da longitude: graus. Faixa de valores: -180 a 180 graus. |
| **alt**     | Numérico        | Opcional   | Valor estimado da altitude da posição do usuário. Unidade: metros. |
| **x**       | Numérico        | Opcional   | Valor estimado da posição do usuário (X, Y, Z no sistema de coordenadas ECEF). Unidade: metros. O formato válido de auxílio de posição ECEF é ”x=30000;y=1111120.3;z=3345100;”, e os três campos devem estar completos. |
| **y**       | Numérico        | Opcional   | Valor estimado da posição do usuário (X, Y, Z no sistema de coordenadas ECEF). Unidade: metros. |
| **z**       | Numérico        | Opcional   | Valor estimado da posição do usuário (X, Y, Z no sistema de coordenadas ECEF). Unidade: metros. |
| **pacc**    | Numérico        | Opcional   | Precisão da posição do usuário. Unidade: metros. |

2.5. **Informações retornadas pelo servidor**

![Imagem 2](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/2.png) 

• Exemplo de dados retornados pelo servidor AGNSS: cabeçalho de dados + conteúdo dos dados auxiliares

• Os dados binários são os dados auxiliares necessários ao receptor GNSS, e esses dados binários já incluem a verificação de dados. O formato dos dados binários pode ser consultado na especificação de protocolo do receptor da 中科微.

• Se o cabeçalho de dados também for enviado ao receptor GNSS, isso não afetará o receptor GNSS.

2.6. **Comparação de desempenho do AGNSS**

• Em comparação com um receptor GNSS independente comum, o receptor AGNSS apresenta uma melhoria significativa no desempenho de TTFF, especialmente em condições de sinal fraco.

![Imagem 3](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/3.jpg) 

2.7. **Observações**

• O auxílio de posição aproximada precisa ser obtido pelo cliente por outros meios, como

–Módulos de comunicação GSM/GPRS/3G; esses módulos podem usar o método CELL ID para obter a posição aproximada atual

–Outros módulos sem fio, como WiFi, também podem realizar posicionamento aproximado

• A precisão da posição aproximada deve estar dentro de 15km; um auxílio de posição incorreto afetará o desempenho do receptor

• Se não for possível obter a posição aproximada, ignore os campos de posição (lat,lon,alt,x,y,z) na instrução de solicitação AGNSS; o receptor selecionará automaticamente a posição válida de um posicionamento histórico

• Não é necessário usar a posição que o próprio receptor GNSS produz como posição aproximada

2.8. **Quando o AGNSS é necessário**

• Não é necessário baixar do servidor toda vez que o dispositivo é ligado, economizando tráfego

–O chip da 中科微 possui SRAM de backup por bateria e FLASH de backup permanente internamente, que podem salvar automaticamente os dados de efemérides recebidos, etc.

–Durante o funcionamento normal, o chip baixa continuamente os dados de efemérides mais recentes dos satélites

• Ao consultar o status do receptor, decide-se se é necessário baixar dados AGNSS do servidor

–O receptor pode emitir uma instrução de status da mensagem de navegação (não é emitida por padrão; só é emitida após configuração)

2.9. **Introdução à instrução de status da mensagem de navegação**

![Imagem 4](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/4.png) 

![Imagem 5](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/5.jpg) 

• Esta instrução emite o tempo interno atual do receptor + o status da mensagem de navegação.

• Pode-se enviar o comando $PCAS03,,,,,,,,,,,1*1F para emitir a instrução de status da mensagem de navegação uma vez por segundo

• Pode-se enviar o comando $PCAS03,,,,,,,,,,,0*1E para parar de emitir a instrução de status da mensagem de navegação

• Atenção: cada instrução deve terminar com \r\n (0x0D,0x0A), e a instrução contém 11 vírgulas

• Se o indicador de tempo for válido (diferente de 0) e o número de efemérides válidas for grande (maior que 8), não é necessário baixar as efemérides AGNSS.

 

**3. Preparação prévia**

**3.1. Fiação**

O módulo GPS utiliza comunicação UART ou comunicação USB; aqui tomamos a comunicação USB como exemplo.

![Imagem 6](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/6.png)

Use um cabo type-c para conectar o Jetson Orin e o módulo GPS; execute o comando ls /dev | grep 'ttyUSB' , e pode ver que o módulo GPS foi reconhecido como USB0

![Imagem 7](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/7.jpg) 

**3.2. Solicitar a ak do 百度地图**

Consulte o documento [Tutorial de solicitação da api do 百度地图](./Jetson-Baidu-Map-API.md)

 

**4. Programa**

Consulte o programa desta lição em: GPS-agnss.py

Inicializar o USB:

![Imagem 8](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/8.jpg) 

A ak fornecida precisa ser preenchida com o valor de ak que você solicitou; assim, será possível obter as informações aproximadas de latitude e longitude atuais através do 百度地图

![Imagem 9](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/9.jpg) 

Aqui, as informações aproximadas de latitude e longitude obtidas do 百度地图 são enviadas ao servidor; a conta de login usada é a conta oficial da 钜犀, e, após a conclusão da obtenção, o pacote inteiro é enviado ao módulo

![Imagem 10](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/10.jpg) 

![Imagem 11](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/11.jpg) 

Função de obtenção e análise das informações de posição; na figura abaixo, as informações de posição que começam com GNGGA são filtradas e, em seguida, os dados são analisados e armazenados em cada variável global.

![Imagem 12](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/12.jpg) 

![Imagem 13](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/13.jpg) 

Da mesma forma, foram obtidas e analisadas as informações de direção do GNVTG.

![Imagem 14](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/14.jpg) 

Impressão cíclica dos dados analisados

![Imagem 15](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/15.jpg) 

**5.Executar o programa**

No terminal, digite sudo python2 GPS-agnss.py para executar o programa.

**6.Fenómeno do experimento**

**Atenção: no posicionamento assistido, o Jetson Orin deve estar conectado à internet.**

Após o módulo ser energizado com sinal fraco, inicia-se a inicialização do USB; se a inicialização for bem-sucedida, exibe “GPS Serial Opened! Baudrate=9600”, caso contrário exibe “GPS Serial Open Failed!”. Se houver erro, é necessário verificar a fiação ou a porta USB.

Depois disso, exibe "GPS Agnss start" e começa a enviar as informações de posicionamento assistido ao servidor; após a conclusão do envio, exibe "GPS Agnss success"

Durante um período após o envio, se o sinal de GPS ainda não tiver sido lido, exibe "GPS no found" e imprime as informações aproximadas de latitude e longitude lidas do 百度地图.

![Imagem 16](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/16.jpg) 

Após um período, quando o GPS é reconhecido, as informações de posição e direção são impressas ciclicamente.

![Imagem 17](../../../../../public/images/tutorials/sensors/gps/Jetson-AGNSS/17.jpg) 

Pressione Ctrl+C para sair da leitura das informações.

<RelatedProducts slugs="gps-beidou-module" />
