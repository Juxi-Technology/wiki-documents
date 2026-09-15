---
title: "Jetson: análise GPS"
description: "Análise GPS no Jetson Orin — ler o módulo GPS e BeiDou pela porta USB, filtrar sentenças GNGGA e analisar latitude, longitude e altitude em Python."
---

# Jetson: análise GPS

**1. Objetivos de aprendizagem**

Nesta lição, vamos aprender principalmente a usar o Jetson Orin e o módulo GPS para ler e analisar informações de posição.

**2. Preparação prévia**

O módulo GPS utiliza comunicação UART ou comunicação USB; aqui tomamos a comunicação USB como exemplo.

![Imagem 1](../../../../../public/images/tutorials/sensors/gps/Jetson-GPS-Parsing/1.png)

Use um cabo type-c para conectar o Jetson Orin e o módulo GPS; execute o comando ls /dev | grep 'ttyUSB' , e pode ver que o módulo GPS foi reconhecido como USB0

![Imagem 2](../../../../../public/images/tutorials/sensors/gps/Jetson-GPS-Parsing/2.jpg) 

**3****. Programa**

Consulte o programa desta lição em: GPS.py

Inicializar o USB:

![Imagem 3](../../../../../public/images/tutorials/sensors/gps/Jetson-GPS-Parsing/3.jpg) 

Função de obtenção e análise das informações de posição; na figura abaixo, as informações de posição que começam com GNGGA são filtradas e, em seguida, os dados são analisados e armazenados em cada variável global.

![Imagem 4](../../../../../public/images/tutorials/sensors/gps/Jetson-GPS-Parsing/4.jpg) 

![Imagem 5](../../../../../public/images/tutorials/sensors/gps/Jetson-GPS-Parsing/5.jpg) 

Da mesma forma, foram obtidas e analisadas as informações de direção do GNVTG.

![Imagem 6](../../../../../public/images/tutorials/sensors/gps/Jetson-GPS-Parsing/6.jpg) 

Impressão cíclica dos dados analisados

![Imagem 7](../../../../../public/images/tutorials/sensors/gps/Jetson-GPS-Parsing/7.jpg) 

**4. Executar o programa**

No terminal, digite sudo python3 GPS.py para executar o programa.

**5.Fenómeno do experimento**

Após o módulo ser energizado, ele leva cerca de 32s para iniciar; depois disso, a luz de status da porta serial no módulo continuará piscando, momento em que os dados podem ser recebidos normalmente.

Após o programa iniciar, começa a inicialização do USB; se a inicialização for bem-sucedida, exibe “GPS Serial Opened! Baudrate=9600”, caso contrário exibe “GPS Serial Open Failed!”. Em caso de erro, é necessário verificar a fiação ou a porta USB; depois disso, as informações de posição e direção são impressas ciclicamente.

![Imagem 8](../../../../../public/images/tutorials/sensors/gps/Jetson-GPS-Parsing/8.jpg) 

Pressione Ctrl+C para sair da leitura das informações.

![Imagem 9](../../../../../public/images/tutorials/sensors/gps/Jetson-GPS-Parsing/9.jpg) 

Atenção: a antena do módulo precisa estar em ambiente externo, caso contrário pode não conseguir buscar o sinal de GPS; quando o sinal não for encontrado, imprime "GPS no found".

<RelatedProducts slugs="gps-beidou-module" />
