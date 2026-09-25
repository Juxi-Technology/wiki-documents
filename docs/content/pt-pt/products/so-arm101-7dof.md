---
title: Braço Robótico SO-ARM101 de 7 DOF
category: robot
description: "Braço robótico open source SO-ARM101 de 7 DOF da Juxi Technology — rotação do pulso de 90°, servos de barramento de 12V 30kg.cm, integração profunda com o LeRobot e montagem de fábrica, com uma série completa de tutoriais."
keywords: [so-arm101, 7-dof, 7 eixos, braço robótico, leRobot, teleoperação, aprendizagem por imitação]
---

# Braço Robótico SO-ARM101 de 7 DOF

> **[Comprar na loja](https://www.juxitech.com/products/so-arm101-open-source-7-dof-robotic-arm)**

## Visão Geral

O SO-ARM101 é um braço robótico open source profundamente otimizado a partir do SO-ARM100.
A nova passagem de cabos e as novas combinações de motor e redução eliminam o problema de
quebra dos cabos nas articulações, e as melhorias de desempenho suportam o seguimento
líder-seguidor em tempo real. **Esta é a versão de 7 DOF**: acrescenta um servo de rotação
do pulso (yaw) ao modelo de 6 eixos, proporcionando ao pulso uma liberdade de postura muito
maior, mais pontos alcançáveis e preensão de precisão em múltiplos ângulos.

É compatível com o toolkit **LeRobot** da Hugging Face e liga-se diretamente a modelos
PyTorch e a conjuntos de dados partilhados, pelo que é fácil pôr em prática a aprendizagem
por imitação e a aprendizagem por reforço. Inclui um tutorial de montagem completo e um kit
DIY — estudantes, investigadores e makers podem trabalhar com robótica inteligente para
aprendizagem, investigação e criação.

**Em resumo**: 7 DOF com rotação do pulso de 90° · servos de alto torque de 12V, 30kg.cm ·
garra flexível TPU opcional · recolha de dados com duas câmaras · inferência a bordo em
NVIDIA Jetson e D-Robotics RDK · montado de fábrica e pronto a usar · suporta o treino de
modelos ACT / SmolVLA / Pi0 / Pi0.5 / GR00T N1.5.

## Principais Vantagens

### 7 graus de liberdade com rotação do pulso de 90°

A versão de 7 DOF acrescenta um servo de rotação do pulso (yaw, esquerda/direita) ao design
de 6 eixos, pelo que o pulso se pode aproximar de um alvo a partir de muito mais ângulos e
alcançar mais pontos no espaço de trabalho. É essa liberdade extra que torna possível a
preensão fina em múltiplos ângulos.

### Teleoperação líder-seguidor e aprendizagem por imitação

O braço integra o framework de IA da Hugging Face. Teleopere o braço líder para gravar
movimentos de demonstração, treine um modelo de aprendizagem por imitação numa única
passagem e implante a política otimizada. Consegue assumir tarefas complexas e adaptar-se ao
seu ambiente, fechando o ciclo de automação de ponta a ponta.

### Cobertura global com duas câmaras

A câmara montada no braço captura a posição espacial, o ângulo e a textura da superfície do
alvo à curta distância, para uma recolha de dados com maior fidelidade, enquanto uma câmara
de cena numa base de secretária lê o ambiente de trabalho em tempo real. Em conjunto,
mantêm a operação precisa, respondem rapidamente a alterações e evitam deriva ou
encravamento.

### Servos de barramento de 12V e alto torque de 30kg.cm

O braço seguidor usa uniformemente 7 × Feetech STS3215-C018 (12V, 30kg.cm, 1:345) para
garantir torque de preensão suficiente sob carga de múltiplos eixos, enquanto o braço líder
se mantém a 7.4V para equilibrar a sensação de manuseamento com o custo. Um encoder
magnético de 12 bits proporciona uma precisão de 0.088° em todos os eixos.

### Suporte ao treino de múltiplos modelos

Treine e implante políticas ACT, SmolVLA, Pi0, Pi0.5 e GR00T N1.5 no mesmo hardware, e
reutilize modelos pré-treinados como `lerobot/smolvla_base`, `lerobot/pi0_base`,
`lerobot/pi05_base` e `lerobot/xvla-widowx` diretamente do hub de modelos do LeRobot.

### Inferência a bordo em NVIDIA e D-Robotics RDK

Ligue um único cabo a um controlador Raspberry Pi, D-Robotics RDK ou NVIDIA Jetson para
executar inferência no próprio braço, com controlo de motores e realimentação do encoder em
tempo real.

### Montado de fábrica, pronto a usar

Cada unidade é enviada montada, cablada e calibrada — basta ligar a alimentação e o USB e a
plataforma está pronta para teleoperação e recolha de dados.

### Garra flexível (upgrade)

A garra flexível é um upgrade da garra rígida padrão, impressa em 3D num material TPU
flexível. Utiliza um design oco com nervuras de reforço internas e funciona segundo o
princípio de uma garra de aletas: adapta-se à forma do objeto agarrado, reduzindo a força de
contacto aplicada — ideal para objetos macios ou facilmente danificados (fruta, objetos de
vidro, ovos, processamento alimentar) que uma garra rígida convencional não consegue
manipular com segurança.

## Especificações

| Categoria | Especificação |
|----------|------|
| Tipo | Braço robótico de teleoperação líder-seguidor |
| DOF | 7 (acrescenta um eixo de rotação do pulso / yaw ao modelo de 6 eixos) |
| Servos do braço seguidor | 7 × Feetech STS3215-C018 (12V, 30kg.cm, 1:345) |
| Servos do braço líder | 7 × 7.4V STS3215 — versão com amortecimento: 1 × C001 (1:345) + 2 × C044 (1:191) + 3 × C046 (1:147); versão sem amortecimento: 7 × C066 |
| Encoder | Encoder magnético de 12 bits (precisão de 0.088°) |
| Alimentação | Braço líder 5V6A / braço seguidor 12V5A |
| Host | PC (Linux) / Raspberry Pi / D-Robotics RDK / NVIDIA Jetson |
| Ecossistema | Hugging Face LeRobot (ACT / SmolVLA / Pi0 / Pi0.5 / GR00T N1.5) |
| Garra | PLA rígida (padrão) ou TPU flexível (upgrade) |
| Montagem | Montado, cablado e calibrado de fábrica |

*As configurações de servos e as opções de pacote disponíveis estão listadas na página da loja.*

## Tutoriais

- **[Tutorial do braço robótico SO-ARM101 de 7 eixos](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/)** — configuração do ambiente, substituição de ficheiros 7-DOF, calibração, teleoperação, recolha de dados, treino e inferência, passo a passo
- [Substituição de ficheiros 7-DOF (adaptar um clone oficial do lerobot)](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/02-Replace-Files-7DOF)
- [Tutorial do SO-ARM101 (6 eixos)](/pt-pt/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Guia de Seleção de Braços Robóticos](/pt-pt/tutorials/robot-arms/select-guide)
- [Introdução à IA Incorporada (LeRobot)](/pt-pt/topics/embodied-ai-intro)

## Suporte

- 📧 E-mail: support@juxitech.com
- 🌐 Site: [www.juxitech.com](https://www.juxitech.com)
