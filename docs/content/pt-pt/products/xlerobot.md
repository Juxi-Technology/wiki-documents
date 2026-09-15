---
title: Robô móvel de dois braços XLeRobot
category: robot
description: Robô móvel de dois braços XLeRobot da Juxi Technology — dois braços SO-ARM101 + chassis de rodas omnidirecionais + torre da câmara, duas placas de controlo dos servos com alimentação de 12V, ecossistema LeRobot, disponível em kit montado ou kit em peças
keywords: [xlerobot, robô de dois braços, robô móvel, ia incorporada, lerobot, so-arm101, chassis de rodas omnidirecionais]
---

# Robô móvel de dois braços XLeRobot

## Visão Geral

O XLeRobot é uma plataforma de robô móvel de dois braços: um carrinho com rodas omnidirecionais (universais) serve de base móvel e transporta, através da torre da câmara, dois braços seguidores SO-ARM101; em conjunto com duas placas de controlo dos servos, um host Raspberry Pi/Jetson e uma fonte de alimentação portátil PD, forma um robô open source de manipulação móvel, destinado à investigação em IA incorporada, a tarefas domésticas e ao desenvolvimento no ecossistema LeRobot.

**Principais recursos**:

- Manipulação com dois braços + base móvel omnidirecional, capaz de se deslocar e apanhar diversos objetos domésticos
- Baseado nos braços SO-ARM101, com servos de barramento Feetech STS3215-C018
- Torre da câmara + câmaras de pulso, com suporte a recolha de dados e aprendizagem por imitação
- Duas placas de controlo dos servos que acionam de forma independente os braços e o chassis, com alimentação de 12V
- Ecossistema de software LeRobot completo: configuração do ambiente, recolha de dados, treino e inferência
- Disponível em duas formas — kit montado e kit em peças; o kit em peças inclui a lista de acessórios completa
- Compatível com a base Lekiwi (quem já tem um Lekiwi pode reutilizar diretamente a base com rodas)

---

## Especificações

| Categoria | Especificação |
|------|------|
| Braços | Braços seguidores SO-ARM101 ×2 (servos de barramento Feetech STS3215-C018, IDs 1-6) |
| Chassis | Carrinho com rodas omnidirecionais (universais), 3 servos STS3215-C018 (IDs 7/8/9) |
| Torre da câmara | Base da torre da câmara + 2 servos STS3215-C018 (IDs 7/8) + câmara |
| Acionamento | Placas de controlo dos servos ×2 (cabos de dados USB-C para USB-A ligados ao host; cabos de alimentação PD para DC12V3A) |
| Alimentação | Fonte de alimentação portátil PD, versão de 12V (até 100W por porta, testada como suficiente para o funcionamento) |
| Host | Raspberry Pi (não incluído) / Jetson |
| Cabos | Cabos de extensão de servo de 90CM ×2 (carrinho e torre da câmara → placas de controlo dos servos) |
| Peso total | Aproximadamente 12kg (totalmente montado) |
| Software | Ecossistema LeRobot; configuração dos servos com o Bambot (Windows / macOS / Linux) |

---

## Início Rápido

### 1. Configurar o ambiente LeRobot

Escolha o tutorial de configuração do ambiente adequado ao seu sistema operativo (macOS / Ubuntu / Windows) e instale o LeRobot e as dependências.

### 2. Mover os ficheiros do XLeRobot

Mova os ficheiros do XLeRobot para o diretório correspondente para concluir a preparação do software.

### 3. Montar o robô

- **Kit montado**: instale diretamente o carrinho, a base da torre da câmara, os dois braços e a cablagem, de acordo com a lista de acessórios
- **Kit em peças**: configure primeiro os servos (utilize o [Bambot](https://bambot.org/feetech.js) para fazer a leitura e renomear os IDs) e, em seguida, monte pela ordem indicada o carrinho, a base com rodas, a base do braço robótico e a cablagem, colocando a bateria no fim

No kit em peças, recomenda-se ligar os cabos de alimentação por último; mantenha a alimentação desligada ao ligar ou desligar outros cabos, para proteger as placas de controlo dos servos.

---

## Tutoriais completos

- [Visão geral dos tutoriais XLeRobot](/pt-pt/tutorials/robot-arms/xlerobot/)
- [Configuração do ambiente (macOS)](/pt-pt/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS)
- [Configuração do ambiente (Ubuntu)](/pt-pt/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu)
- [Configuração do ambiente (Windows)](/pt-pt/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows)
- [Mover os ficheiros do XLeRobot](/pt-pt/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files)
- [Montagem do kit montado](/pt-pt/tutorials/robot-arms/xlerobot/03-Assembly-Assembled-Kit)
- [Montagem do kit em peças](/pt-pt/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit)

---

## Aplicações

- Investigação em IA incorporada e aprendizagem por imitação (tarefas domésticas, apanhar objetos)
- Desenvolvimento de algoritmos de manipulação móvel com dois braços (ecossistema LeRobot)
- Ensino e competições de robótica
- Validação de protótipos de robôs de serviço doméstico

---

## FAQ

**P: Qual é a diferença entre o kit montado e o kit em peças?**

**R:** O kit montado é o conjunto já montado de acordo com a lista de acessórios; o kit em peças requer montagem própria, começando pela configuração dos IDs dos servos com a ferramenta Bambot (braços 1-6, chassis 7/8/9, torre da câmara 7/8).

**P: Que outras peças preciso de adquirir à parte?**

**R:** A fonte de alimentação portátil, o Raspberry Pi e o cabo de alimentação PD 5V5A do Raspberry Pi têm de ser adquiridos à parte (como indicado no tutorial).

**P: Como se configuram os IDs dos servos?**

**R:** Depois de ligar os servos e a placa de controlo dos servos ao computador, utilize a [página de configuração de servos do Bambot](https://bambot.org/feetech.js) para fazer a leitura e renomear os IDs dos servos; o repositório oficial de código do LeRobot ainda não suporta configurações de servos para além do braço robótico, pelo que se utiliza o Bambot em alternativa.

**P: Depois de montado, posso empurrá-lo para o deslocar?**

**R:** Não. Depois de completamente montado, não empurre o XLeRobot como se fosse um carrinho, pois isso pode danificar as engrenagens dos servos; quando precisar de o mover manualmente, levante o robô (aproximadamente 12kg).

---

## Suporte

- 📧 E-mail: support@juxitech.com
- 🌐 Site: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Reportar problemas](https://github.com/Juxi-Technology/wiki-documents/issues)
