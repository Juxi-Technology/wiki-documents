---
title: Robô móvel de dois braços XLeRobot
category: robot
description: Robô móvel de dois braços XLeRobot da Juxi Technology — dois braços SO-ARM101 + chassi com rodas omnidirecionais + torre de câmeras, duas placas de driver de servo alimentadas em 12V, ecossistema LeRobot, disponível como kit montado ou kit em peças
keywords: [xlerobot, robô de dois braços, robô móvel, ia incorporada, lerobot, so-arm101, chassi com rodas omnidirecionais]
---

# Robô móvel de dois braços XLeRobot

## Visão Geral

O XLeRobot é uma plataforma de robô móvel de dois braços: um carrinho de chassi com rodas omnidirecionais (rodas universais) serve como base móvel; sobre ele, uma torre de câmeras sustenta dois braços seguidores SO-ARM101 e, com duas placas de driver de servo, Raspberry Pi/Jetson como controlador host e uma fonte de alimentação portátil PD, forma um robô open source capaz de se locomover e manipular objetos — voltado à pesquisa em IA incorporada, tarefas domésticas e desenvolvimento no ecossistema LeRobot.

**Principais recursos**:

- Manipulação com dois braços + chassi móvel omnidirecional, capaz de se locomover e agarrar diversos objetos domésticos
- Baseado em braços robóticos SO-ARM101, com servos de barramento Feetech STS3215-C018
- Torre de câmeras + câmera de pulso, prontas para coleta de dados e aprendizado por imitação
- Duas placas de driver de servo acionam braços e chassi de forma independente, com alimentação de 12V
- Ecossistema de software LeRobot completo: configuração de ambiente, coleta de dados, treinamento e inferência
- Disponível em duas formas — montagem do kit montado e montagem do kit em peças; o kit em peças inclui a lista completa de peças
- Compatível com a base Lekiwi (se você já tem um Lekiwi, pode reutilizar diretamente a base com rodas)

---

## Especificações

| Categoria | Especificação |
|------|------|
| Braços | 2 × braços seguidores SO-ARM101 (servos de barramento Feetech STS3215-C018, IDs 1-6) |
| Chassi | Carrinho de chassi com rodas omnidirecionais (universais), 3 servos STS3215-C018 (IDs 7/8/9) |
| Torre de câmeras | Base da torre de câmeras + 2 servos STS3215-C018 (IDs 7/8) + câmera |
| Acionamento | 2 × placas de driver de servo (cabo de dados USB-C para USB-A conectado ao controlador host; cabo de energia PD para DC 12V 3A) |
| Alimentação | Fonte de alimentação portátil PD, versão 12V (até 100W por porta; após testes, suficiente para suportar o funcionamento) |
| Controlador host | Raspberry Pi (não incluído) / Jetson |
| Cabos | 2 × cabos de extensão de servo de 90CM (carrinho do chassi e torre de câmeras → placa de driver de servo) |
| Peso total | Aproximadamente 12kg (totalmente montado) |
| Software | Ecossistema LeRobot; configuração dos servos com Bambot (Windows / macOS / Linux) |

---

## Início Rápido

### 1. Configurar o ambiente LeRobot

Escolha o tutorial de configuração de ambiente de acordo com o sistema operacional (macOS / Ubuntu / Windows) e instale o LeRobot e as dependências.

### 2. Mover os arquivos do XLeRobot

Mova os arquivos do XLeRobot para o diretório correspondente e conclua a preparação do software.

### 3. Montar o robô

- **Montagem do kit montado**: instale diretamente o carrinho do chassi, a base da torre de câmeras, os dois braços e a fiação, seguindo a lista de peças
- **Montagem do kit em peças**: primeiro configure os servos (use o [Bambot](https://bambot.org/feetech.js) para escanear e renomear os IDs), depois monte na ordem o carrinho de transporte, a base com rodas, a base do braço robótico e a fiação, e por fim posicione a bateria

Com o kit em peças, recomenda-se conectar os cabos de energia por último; mantenha a alimentação desconectada ao conectar ou desconectar outros cabos, para proteger as placas de driver de servo.

---

## Tutoriais completos

- [Visão geral dos tutoriais do XLeRobot](/pt-br/tutorials/robot-arms/xlerobot/)
- [Configuração (macOS)](/pt-br/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS)
- [Configuração (Ubuntu)](/pt-br/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu)
- [Configuração (Windows)](/pt-br/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows)
- [Mover arquivos do XLeRobot](/pt-br/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files)
- [Montagem do kit montado](/pt-br/tutorials/robot-arms/xlerobot/03-Assembly-Assembled-Kit)
- [Montagem do kit em peças](/pt-br/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit)

---

## Aplicações

- Pesquisa em IA incorporada e aprendizado por imitação (tarefas domésticas, agarrar objetos)
- Desenvolvimento de algoritmos de manipulação móvel com dois braços (ecossistema LeRobot)
- Ensino e competições de robótica
- Validação de protótipos de robôs de serviço doméstico

---

## FAQ

**P: Qual é a diferença entre o kit montado e o kit em peças?**

**R:** O kit montado é o conjunto já montado conforme a lista de peças; o kit em peças precisa ser montado pelo usuário, e os IDs dos servos devem ser configurados primeiro com a ferramenta Bambot (braços robóticos 1-6, chassi 7/8/9, torre de câmeras 7/8).

**P: Quais outros componentes precisam ser comprados separadamente?**

**R:** A fonte de alimentação portátil, o Raspberry Pi e o cabo de energia PD 5V5A para Raspberry Pi devem ser adquiridos separadamente (como indicado no tutorial).

**P: Como configurar os IDs dos servos?**

**R:** Conecte os servos à placa de driver de servo e a placa ao computador e, em seguida, use a [página de configuração de servos do Bambot](https://bambot.org/feetech.js) para escanear e renomear os IDs dos servos; o repositório de código oficial do LeRobot ainda não oferece suporte à configuração de servos além dos braços robóticos, por isso o Bambot é usado em seu lugar.

**P: Depois de montado, posso empurrar o robô para movê-lo?**

**R:** Não. Depois de totalmente montado, não empurre o XLeRobot como se fosse um carrinho de transporte — isso pode danificar as engrenagens dos servos; quando precisar movê-lo manualmente, levante o robô (cerca de 12kg).

---

## Suporte

- 📧 E-mail: support@juxitech.com
- 🌐 Site: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Reportar problemas](https://github.com/Juxi-Technology/wiki-documents/issues)
