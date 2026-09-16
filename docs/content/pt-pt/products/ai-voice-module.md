---
title: Módulo de interação por voz IA
category: accessory
description: Módulo de interação por voz IA da Juxi Technology (CI1302) — 110+ comandos de voz offline, taxa de reconhecimento de 99% a 5 metros, palavras de comando personalizadas em chinês e inglês, comunicação de porta série/IIC, compatível com Arduino/Jetson/RDK/Raspberry Pi/PC
keywords: [voz por ia, módulo de interação por voz, ci1302, reconhecimento de voz offline, palavra de ativação, palavras de comando, porta série, iic, ros1, ros2]
---

# Módulo de interação por voz IA

> **[Comprar no Taobao](https://item.taobao.com/item.htm?id=1055967142978)**

## Visão Geral

O módulo de interação por voz IA baseia-se no chip de voz inteligente com redes neuronais de elevado desempenho **CI1302** da Chipintelli, que integra o processador de rede neuronal cerebral BNPU V3 e suporta reconhecimento de voz offline em campo afastado; o **coprocessador STC8H** integrado na placa converte automaticamente os resultados do reconhecimento de voz em dados de porta série ou IIC, simplificando a comunicação com dispositivos controladores anfitriões externos. Todo o processo de reconhecimento é efetuado localmente no módulo, sem necessidade de ligação à rede.

**Principais recursos**:

- Reconhecimento de voz 100% offline, sem necessidade de internet (privacidade + baixa latência)
- **110+ comandos de voz** pré-definidos de fábrica; suporte para palavras de comando personalizadas em chinês e inglês (até cerca de 120)
- Palavra de ativação “你好，小犀”; modo de suspensão automático após 15 segundos sem comandos, bastando voltar a ativar para continuar a utilizar
- Altifalante de alta fidelidade e microfone de elevado desempenho integrados, com redução de ruído e cancelamento de eco; taxa de reconhecimento de até 99% num raio de 5 metros
- Coprocessador STC8H integrado na placa, que emite os resultados do reconhecimento como dados de porta série / IIC
- Dois modos de reprodução: reprodução ativa e reprodução passiva
- SDK para ROS1 / ROS2 e tutoriais de comunicação para Arduino / Jetson / RDK / Raspberry Pi / PC

---

## Especificações

| Categoria | Especificação |
|------|------|
| Chip de voz | Chipintelli CI1302 (processador de rede neuronal BNPU V3, frequência até 220MHz) |
| Armazenamento | 640KB SRAM + 2MB Flash |
| Comandos de voz | 110+ pré-definidos; palavras de comando personalizadas em chinês e inglês, até cerca de 120 |
| Ativação | Palavra de ativação “你好，小犀” (modificável) |
| Distância de reconhecimento | Até 5 metros (ambiente silencioso, taxa de reconhecimento de até 99%) |
| Áudio | Altifalante de alta fidelidade + microfone de elevado desempenho integrados (redução de ruído + cancelamento de eco) |
| Interface de comunicação | Porta série / IIC / Type-C (coprocessador STC8H integrado na placa) |
| Alimentação | 5V (Type-C) |
| Plataformas suportadas | Arduino, Jetson, RDK, Raspberry Pi, PC (MCU como STM32 / ESP32 / MSPM0) |
| Software | SDK ROS1 / ROS2, ferramenta de gravação de firmware, ferramenta Web para entradas personalizadas |

---

## Início Rápido

O firmware de reconhecimento de voz já vem gravado de fábrica — experimente de imediato sem gravar nada:

1. Alimente o módulo com um cabo de dados Type-C (5V)
2. Diga a palavra de ativação “你好，小犀”; depois de o módulo responder “我在”, pode dar comandos (por exemplo, “avançar”)
3. Se não for reconhecida nenhuma entrada de comando no prazo de 15 segundos, o módulo reproduz “我去休息了” e entra em modo de suspensão; para o voltar a utilizar, basta dizer novamente a palavra de ativação

Se precisar de adicionar outras entradas de reconhecimento, pode modificar as palavras de comando através da ferramenta Web para gerar um novo firmware e, em seguida, gravá-lo no módulo com o software de PC. Para mais detalhes, consulte [Gravação do firmware do módulo](/pt-pt/tutorials/accessories/ai-voice-module/Firmware-Flashing) e [Criação de entradas de protocolo personalizadas](/pt-pt/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries).

---

## Tutoriais completos

- [Início rápido — desempacotamento, palavra de ativação e reprodução](/pt-pt/tutorials/accessories/ai-voice-module/Quick-Start)
- [Informações do produto — características, princípio de funcionamento, precauções e interfaces de hardware](/pt-pt/tutorials/accessories/ai-voice-module/Product-Info)
- [Gravação do firmware do módulo](/pt-pt/tutorials/accessories/ai-voice-module/Firmware-Flashing)
- [Modificar a palavra de ativação e as palavras de comando](/pt-pt/tutorials/accessories/ai-voice-module/Wake-Word-Commands-Edit)
- [Criação de entradas de protocolo personalizadas](/pt-pt/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries)
- [Interação por voz ROS1](/pt-pt/tutorials/accessories/ai-voice-module/ROS1-Voice-Interaction) / [Interação por voz ROS2](/pt-pt/tutorials/accessories/ai-voice-module/ROS2-Voice-Interaction)
- [Protocolo de porta série](/pt-pt/tutorials/accessories/ai-voice-module/Serial-Protocol) / [Protocolo IIC](/pt-pt/tutorials/accessories/ai-voice-module/IIC-Protocol)
- [Comunicação PC](/pt-pt/tutorials/accessories/ai-voice-module/PC-Communication)
- Arduino: [Comunicação de porta série](/pt-pt/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication) / [Comunicação IIC](/pt-pt/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication)
- Jetson: [Comunicação de porta série](/pt-pt/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication) / [Comunicação IIC](/pt-pt/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication)
- RDK: [Comunicação de porta série](/pt-pt/tutorials/accessories/ai-voice-module/RDK-Serial-Communication) / [Comunicação IIC](/pt-pt/tutorials/accessories/ai-voice-module/RDK-IIC-Communication)
- Raspberry Pi: [Comunicação de porta série](/pt-pt/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication) / [Comunicação IIC](/pt-pt/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication)

---

## Aplicações

- Interação por voz e controlo por comandos para robôs (por exemplo, “avançar” e “parar”)
- Controlo por voz em casa inteligente (iluminação, eletrodomésticos)
- Produtos de voz para educação e brinquedos
- Controlo por voz de equipamentos industriais
- Diversos projetos DIY de interação por voz

---

## FAQ

**P: Precisa de ligação à internet?**

**R:** Não. O CI1302 é um chip de voz offline — o reconhecimento é efetuado localmente no módulo, sem necessidade de ligação à rede.

**P: Funciona logo de fábrica?**

**R:** Sim. O firmware de reconhecimento de voz já vem gravado de fábrica, pelo que funciona assim que for alimentado por Type-C; só é necessário regravar o firmware quando se adicionam palavras de comando personalizadas.

**P: Suporta comandos em inglês?**

**R:** Sim. Suporta palavras de comando personalizadas em chinês e inglês; modifique-as com a ferramenta Web, gere o firmware e grave-o no módulo.

**P: Como comunica com o controlador anfitrião?**

**R:** O coprocessador STC8H integrado na placa converte automaticamente os resultados do reconhecimento de voz em dados de porta série ou IIC; estão disponíveis tutoriais de comunicação para Arduino, Jetson, RDK, Raspberry Pi e PC, bem como SDK para ROS1 / ROS2.

**P: Qual é a distância de reconhecimento?**

**R:** Num ambiente silencioso, a taxa de reconhecimento pode atingir 99% até 5 metros; ambientes ruidosos afetam o desempenho do reconhecimento.

---

## Precauções

- Alimente o módulo com uma tensão de 5V; tensões superiores a 5V danificam o módulo
- O ambiente de utilização deve ser o mais silencioso possível; um ambiente ruidoso afeta o desempenho do reconhecimento
- Ao dizer uma entrada, a voz deve ser forte e o ritmo de fala não deve ser demasiado rápido; recomenda-se uma distância não superior a 5 metros do módulo

---

## Suporte

- 📧 E-mail: support@juxitech.com
- 🌐 Site: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Reportar problemas](https://github.com/Juxi-Technology/wiki-documents/issues)
