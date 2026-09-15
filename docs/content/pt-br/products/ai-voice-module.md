---
title: Módulo de interação por voz IA
category: accessory
description: Módulo de interação por voz IA da Juxi Technology (CI1302) — 110+ comandos de voz offline, 99% de reconhecimento em 5 m, palavras de comando personalizadas em chinês e inglês, comunicação serial/IIC, compatível com Arduino/Jetson/RDK/Raspberry Pi/PC
keywords: [voz por ia, módulo de interação por voz, ci1302, reconhecimento de fala offline, palavra de ativação, palavras de comando, serial, iic, ros1, ros2]
---

# Módulo de interação por voz IA

## Visão Geral

O módulo de interação por voz IA é baseado no chip de voz inteligente com rede neural de alto desempenho **CI1302** da Chipintelli, que integra o processador de rede neural cerebral BNPU V3 e oferece suporte a reconhecimento de fala offline de campo distante; o **coprocessador STC8H** integrado na placa converte automaticamente os resultados do reconhecimento de fala em dados de porta serial ou IIC, simplificando a comunicação com dispositivos controladores externos. Todo o reconhecimento é concluído localmente no módulo, sem necessidade de conexão à internet.

**Principais recursos**:

- Reconhecimento de fala 100% offline, sem necessidade de internet (privacidade + baixa latência)
- **110+ comandos de voz** predefinidos de fábrica; suporte a palavras de comando personalizadas em chinês e inglês (até cerca de 120 entradas)
- Palavra de ativação “你好，小犀”; após 15 segundos sem comandos, entra automaticamente em suspensão — basta ativá-lo novamente para usar
- Alto-falante de alta fidelidade e microfone de alto desempenho integrados, com redução de ruído e cancelamento de eco; taxa de reconhecimento de até 99% em um raio de 5 m
- Coprocessador STC8H integrado na placa; os resultados do reconhecimento são enviados como dados de porta serial / IIC
- Dois modos de reprodução: reprodução ativa e reprodução passiva
- SDK para ROS1 / ROS2 e tutoriais de comunicação para Arduino / Jetson / RDK / Raspberry Pi / PC

---

## Especificações

| Categoria | Especificação |
|------|------|
| Chip de voz | CI1302 da Chipintelli (processador de rede neural BNPU V3, frequência principal de até 220MHz) |
| Armazenamento | 640KB SRAM + 2MB Flash |
| Comandos de voz | 110+ predefinidos; palavras de comando personalizadas em chinês e inglês, com até cerca de 120 entradas graváveis |
| Ativação | Palavra de ativação “你好，小犀” (personalizável) |
| Distância de reconhecimento | Dentro de 5 m (ambiente silencioso, taxa de reconhecimento de até 99%) |
| Áudio | Alto-falante de alta fidelidade + microfone de alto desempenho integrados (redução de ruído + cancelamento de eco) |
| Interfaces de comunicação | Porta serial / IIC / Type-C (coprocessador STC8H integrado na placa) |
| Alimentação | 5V (Type-C) |
| Plataformas suportadas | Arduino, Jetson, RDK, Raspberry Pi, PC (STM32 / ESP32 / MSPM0 e outros MCUs) |
| Software | SDK para ROS1 / ROS2, ferramenta de gravação de firmware, ferramenta web para entradas de comando personalizadas |

---

## Início Rápido

O firmware de reconhecimento de fala já vem gravado de fábrica — experimente rapidamente sem precisar gravá-lo:

1. Alimente o módulo com um cabo de dados Type-C (5V)
2. Diga a palavra de ativação “你好，小犀”; quando o módulo responder “我在”, dê um comando (por exemplo, “carrinho para frente”)
3. Se nenhuma entrada de comando for reconhecida em 15 segundos, o módulo reproduz “我去休息了” e entra em suspensão; quando quiser usá-lo novamente, basta dizer a palavra de ativação outra vez

Para adicionar outras entradas de reconhecimento, modifique as palavras de comando pela ferramenta web para gerar um novo firmware e grave-o no módulo com o software de PC; consulte [Gravação do firmware do módulo](/pt-br/tutorials/accessories/ai-voice-module/Firmware-Flashing) e [Criação de entradas de protocolo personalizadas](/pt-br/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries).

---

## Tutoriais completos

- [Início rápido — unboxing, ativação e reprodução](/pt-br/tutorials/accessories/ai-voice-module/Quick-Start)
- [Informações do produto — características, princípio de funcionamento, avisos e interfaces de hardware](/pt-br/tutorials/accessories/ai-voice-module/Product-Info)
- [Gravação do firmware do módulo](/pt-br/tutorials/accessories/ai-voice-module/Firmware-Flashing)
- [Modificar a palavra de ativação e as palavras de comando](/pt-br/tutorials/accessories/ai-voice-module/Wake-Word-Commands-Edit)
- [Criação de entradas de protocolo personalizadas](/pt-br/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries)
- [Interação de voz ROS1](/pt-br/tutorials/accessories/ai-voice-module/ROS1-Voice-Interaction) / [Interação de voz ROS2](/pt-br/tutorials/accessories/ai-voice-module/ROS2-Voice-Interaction)
- [Protocolo da porta serial](/pt-br/tutorials/accessories/ai-voice-module/Serial-Protocol) / [Protocolo IIC](/pt-br/tutorials/accessories/ai-voice-module/IIC-Protocol)
- [Comunicação com PC](/pt-br/tutorials/accessories/ai-voice-module/PC-Communication)
- Arduino: [Comunicação por porta serial](/pt-br/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication) / [Comunicação IIC](/pt-br/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication)
- Jetson: [Comunicação por porta serial](/pt-br/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication) / [Comunicação IIC](/pt-br/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication)
- RDK: [Comunicação por porta serial](/pt-br/tutorials/accessories/ai-voice-module/RDK-Serial-Communication) / [Comunicação IIC](/pt-br/tutorials/accessories/ai-voice-module/RDK-IIC-Communication)
- Raspberry Pi: [Comunicação por porta serial](/pt-br/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication) / [Comunicação IIC](/pt-br/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication)

---

## Aplicações

- Interação de voz e controle por comandos em robôs (como “carrinho para frente”, “parar”)
- Controle de voz em casa inteligente (iluminação, eletrodomésticos)
- Produtos de voz para educação e brinquedos
- Controle por voz de equipamentos industriais
- Projetos DIY de interação por voz

---

## FAQ

**P: Precisa de conexão à internet?**

**R:** Não. O CI1302 é um chip de voz offline — o reconhecimento é feito localmente no módulo, sem necessidade de conexão à rede.

**P: Funciona de fábrica?**

**R:** Sim. O firmware com a função de reconhecimento de fala já vem gravado de fábrica; basta alimentar via Type-C e dizer a palavra de ativação para experimentar. Só é preciso regravar o firmware ao adicionar entradas personalizadas.

**P: Suporta comandos em inglês?**

**R:** Sim. É possível personalizar palavras de comando em chinês e inglês; modifique-as pela ferramenta web, gere o firmware e grave-o no módulo.

**P: Como o módulo se comunica com o controlador host?**

**R:** O coprocessador STC8H integrado na placa converte automaticamente os resultados do reconhecimento de fala em dados de porta serial ou IIC; há tutoriais de comunicação para Arduino, Jetson, RDK, Raspberry Pi e PC, além de SDK para ROS1 / ROS2.

**P: Qual é a distância de reconhecimento?**

**R:** Em ambiente silencioso, a taxa de reconhecimento pode chegar a 99% em um raio de 5 m; ambientes barulhentos afetam o desempenho do reconhecimento.

---

## Avisos

- Use alimentação de 5V; ultrapassar 5V danificará o módulo
- O ambiente de uso deve ser silencioso; ambientes barulhentos afetam o desempenho de reconhecimento
- Ao falar uma entrada, a voz deve ser alta e a velocidade da fala não deve ser rápida demais; recomenda-se manter-se a menos de 5 metros do módulo

---

## Suporte

- 📧 E-mail: support@juxitech.com
- 🌐 Site: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Reportar problemas](https://github.com/Juxi-Technology/wiki-documents/issues)
