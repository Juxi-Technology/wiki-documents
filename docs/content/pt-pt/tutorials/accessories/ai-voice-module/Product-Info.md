---
title: "Informações do produto"
description: "O CI1302 é um chip de voz inteligente de nova geração, de elevado desempenho e com redes neuronais, desenvolv…"
---

# Informações do produto

## 1. Introdução ao módulo de interação por voz

O CI1302 é um chip de voz inteligente de nova geração, de elevado desempenho e com redes neuronais, desenvolvido pela Chipintelli; integra o processador de rede neuronal cerebral BNPU V3, desenvolvido internamente pela Chipintelli, e um núcleo de CPU, com uma frequência de sistema que pode atingir 220MHz, 640KByte de SRAM integrada, uma unidade de gestão de energia PMU e um oscilador RC, bem como um Audio Codec de dois canais de elevado desempenho e baixo consumo e várias interfaces de controlo periférico como UART, IIC, IIS, PWM, GPIO e PDM. O chip necessita apenas de alguns componentes periféricos, como resistências e condensadores, para implementar soluções de hardware de todo o tipo de produtos de voz inteligente, com uma relação custo-benefício extremamente elevada.

Utiliza tecnologia BNPU de hardware de 3ª geração e suporta redes neuronais como DNN\\TDNN\\RNN\\CNN, bem como operações vetoriais paralelas, permitindo funcionalidades como reconhecimento de voz, reconhecimento de impressão vocal, autoaprendizagem de palavras de comando, deteção de voz e redução de ruído por aprendizagem profunda. Esta solução de chip suporta ainda várias línguas globais, como chinês, inglês e japonês, e pode ser amplamente aplicada em áreas como eletrodomésticos, iluminação, brinquedos, dispositivos vestíveis, indústria e automóveis, permitindo interação e controlo por voz e vários tipos de aplicações de soluções de voz inteligente.

O chip CI1302 possui um núcleo de processador de rede neuronal cerebral (BNPU), suporta computação acelerada por NN offline e aceleração por hardware para processamento de sinal de voz, tem uma frequência de CPU que pode atingir 220MHz, consegue efetuar reconhecimento de voz offline em campo afastado, tem 2MB de armazenamento FLASH integrado e pode suportar 300 palavras de comando.

## 2. Características do produto

- Pré-definição de 110+ comandos de voz, com suporte para palavras de comando personalizadas em chinês e inglês.

O utilizador pode modificar as palavras de comando através da página Web que fornecemos, gerar um novo ficheiro de firmware e gravar o firmware no módulo com o software de PC; o módulo passa então a reconhecer os novos comandos. Com 2M de espaço de armazenamento integrado, é possível gravar até cerca de 120 palavras de comando.

- Altifalante de alta fidelidade e microfone de elevado desempenho integrados.

Integra algoritmos avançados e tecnologia de redução de ruído ao nível do circuito, consegue filtrar eficazmente o ruído de fundo do ambiente e atinge uma taxa de reconhecimento de até 99% num raio de 5 metros, permitindo assim conversação natural e cancelamento de eco. Proporciona uma saída de áudio nítida e reproduz com precisão os detalhes da voz.

- Coprocessador integrado e interfaces IIC/porta série/Type-C.

Integra um chip STC8H, que converte automaticamente os dados de voz no formato de porta série ou de dados IIC, simplificando o processo de comunicação com dispositivos controladores anfitriões externos. Disponibiliza gratuitamente vários cabos de ligação, permitindo ao utilizador ligá-lo a placas de desenvolvimento MCU e a dispositivos controladores anfitriões incorporados, para comunicar e criar os seus próprios projetos DIY.

- Tutoriais de utilização baseados em diversas placas de desenvolvimento

Fornece informações sobre placas de desenvolvimento, como STM32, ESP32, MSPM0, Raspberry Pi, a série de placas de desenvolvimento Jetson, RDK, etc. Disponibiliza ainda ficheiros SDK para os sistemas ROS1 e ROS2.

## 3. Princípio de funcionamento

Este módulo adota o modo de ativação por comando: o utilizador tem de dizer a palavra de ativação configurada para ativar primeiro o módulo de interação por voz, e só depois da ativação é possível efetuar o reconhecimento de voz. A palavra-chave de ativação predefinida do firmware de fábrica é “你好，小犀”; se, após 15 segundos, não for reconhecida voz, o módulo entra em modo de suspensão e, para o voltar a utilizar, é necessário ativá-lo novamente.

Quando o chip CI1302 reconhece a entrada de voz correspondente, envia-a através da porta série ou da interface IIC e dá a resposta por reprodução; o chip IIC armazena o comando de voz recebido e envia-o através do protocolo de escravo IIC.

O módulo suporta a modificação da palavra de ativação, a modificação de palavras de comando e entradas personalizadas; pode aprender como o fazer nos tutoriais «[Modificar a palavra de ativação e as palavras de comando](https://juxitech.feishu.cn/wiki/Po6bw8OtLiDNonklg7ZcBbGknyc)» e «[Criação de entradas de protocolo personalizadas](https://juxitech.feishu.cn/wiki/CIHLwo8qNiVBtKkhuTtcZIeNnAb)».

## 4. Precauções

1、Alimentar com uma tensão de 5v; ultrapassar 5v danificará o módulo

2、O ambiente de utilização deve ser silencioso; um ambiente ruidoso afetará o desempenho do reconhecimento

3、Ao dizer uma entrada, a voz deve ser forte e o ritmo de fala não deve ser demasiado rápido; recomenda-se uma distância não superior a 5 metros do módulo

## 5. Descrição da interface de hardware

![Imagem 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Product-Info/1.png)

<RelatedProducts slugs="ai-voice-module" />
