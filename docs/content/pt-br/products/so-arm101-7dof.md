---
title: Braço Robótico SO-ARM101 7-DOF
category: robot
description: "Braço robótico open source SO-ARM101 7-DOF da Juxi Technology — guinada de 90° no punho, servos de barramento 12V 30kg.cm, integração profunda com LeRobot, montado de fábrica com série completa de tutoriais"
keywords: [so-arm101, 7-dof, 7-eixos, braço robótico, leRobot, teleoperação, aprendizado por imitação]
---

# Braço Robótico SO-ARM101 7-DOF

> **[Comprar na loja](https://www.juxitech.com/products/so-arm101-open-source-7-dof-robotic-arm)**

## Visão Geral

O SO-ARM101 é um braço robótico open source profundamente otimizado a partir do SO-ARM100.
O roteamento de cabos revisado e o novo pareamento de motores/reduções eliminam o problema
de rompimento dos cabos das articulações, e as melhorias de desempenho suportam o
acompanhamento líder-seguidor em tempo real. **Esta é a versão 7-DOF**: ela adiciona ao
modelo de 6 eixos um servo de guinada (yaw) do punho, dando ao punho muito mais
liberdade de postura, mais pontos alcançáveis e preensão de precisão em múltiplos ângulos.

Ele se adapta ao toolkit **LeRobot** da Hugging Face e se conecta diretamente a modelos
PyTorch e datasets compartilhados, tornando o aprendizado por imitação e o aprendizado por
reforço fáceis de colocar em prática. Acompanha tutorial completo de montagem e kit DIY —
estudantes, pesquisadores e makers podem trabalhar com robótica inteligente para
aprendizado, pesquisa e criação.

**Em resumo**: 7 DOF com guinada de 90° no punho · servos de alto torque de 12V a 30kg.cm ·
garra flexível TPU opcional · coleta de dados com visão dupla · inferência embarcada em
NVIDIA Jetson e D-Robotics RDK · montado de fábrica e pronto para uso · suporta treinamento
de modelos ACT / SmolVLA / Pi0 / Pi0.5 / GR00T N1.5.

## Principais Vantagens

### 7 graus de liberdade com guinada de 90° no punho

A versão 7-DOF adiciona ao design de 6 eixos um servo de guinada (rotação
esquerda/direita) do punho, de modo que o punho pode se aproximar do alvo por muito mais
ângulos e alcançar mais pontos no espaço de trabalho. É essa liberdade extra que torna
possível a preensão fina em múltiplos ângulos.

### Teleoperação líder-seguidor e aprendizado por imitação

O braço integra o framework de IA da Hugging Face. Teleopere o braço líder para gravar
movimentos de demonstração, treine um modelo de aprendizado por imitação em uma única
passagem e implante a política otimizada. Ele encara tarefas complexas e se adapta ao
ambiente, fechando o ciclo de automação de ponta a ponta.

### Cobertura global com visão dupla

A câmera montada no braço captura de perto a posição espacial, o ângulo e a textura da
superfície do alvo para uma coleta de dados de maior fidelidade, enquanto uma câmera de
cena em suporte de mesa lê o ambiente de trabalho em tempo real. Juntas, elas mantêm a
operação precisa, respondem rapidamente a mudanças e evitam desvios ou travamentos.

### Servos de barramento de 12V com alto torque de 30kg.cm

O braço seguidor é padronizado em 7 × Feetech STS3215-C018 (12V, 30kg.cm, 1:345) para
garantir torque de preensão suficiente sob carga em múltiplos eixos, enquanto o braço
líder permanece em 7.4V para equilibrar a sensação ao toque e o custo. Um encoder
magnético de 12 bits entrega precisão de 0.088° em cada eixo.

### Suporte a treinamento de múltiplos modelos

Treine e implante políticas ACT, SmolVLA, Pi0, Pi0.5 e GR00T N1.5 no mesmo hardware e
reutilize modelos pré-treinados como `lerobot/smolvla_base`, `lerobot/pi0_base`,
`lerobot/pi05_base` e `lerobot/xvla-widowx` diretamente do hub de modelos do LeRobot.

### Inferência embarcada em NVIDIA e D-Robotics RDK

Conecte um único cabo a um controlador Raspberry Pi, D-Robotics RDK ou NVIDIA Jetson para
executar a inferência no próprio braço, com controle de motor em tempo real e feedback do
encoder.

### Montado de fábrica, pronto para uso imediato

Cada unidade é enviada montada, cabeada e calibrada — conecte a alimentação e o USB e a
plataforma está pronta para teleoperação e coleta de dados.

### Garra flexível atualizável

A garra flexível é uma evolução da garra rígida padrão, impressa em 3D em material TPU
flexível. Ela usa um design oco com nervuras de reforço internas e funciona pelo princípio
de garra tipo aleta: adapta-se ao formato do objeto agarrado, reduzindo a força de contato
aplicada sobre ele — ideal para itens macios ou facilmente danificados (frutas, utensílios
de vidro, ovos, processamento de alimentos) que uma garra rígida convencional não consegue
manipular com segurança.

## Especificações

| Categoria | Especificação |
|----------|------|
| Tipo | Braço robótico de teleoperação líder-seguidor |
| DOF | 7 (adiciona ao modelo de 6 eixos um eixo de guinada / yaw do punho) |
| Servos do braço seguidor | 7 × Feetech STS3215-C018 (12V, 30kg.cm, 1:345) |
| Servos do braço líder | 7 × STS3215 de 7.4V — versão com amortecimento: 1 × C001 (1:345) + 2 × C044 (1:191) + 3 × C046 (1:147); versão sem amortecimento: 7 × C066 |
| Encoder | Encoder magnético de 12 bits (precisão de 0.088°) |
| Alimentação | Braço líder 5V6A / braço seguidor 12V5A |
| Host | PC (Linux) / Raspberry Pi / D-Robotics RDK / NVIDIA Jetson |
| Ecossistema | Hugging Face LeRobot (ACT / SmolVLA / Pi0 / Pi0.5 / GR00T N1.5) |
| Garra | PLA rígida (padrão) ou TPU flexível (upgrade) |
| Montagem | Montado de fábrica, cabeado e calibrado |

*Os layouts de servos e as configurações de pacote disponíveis estão listados na página da loja.*

## Tutoriais

- **[Curso completo do SO-ARM101 7-DOF](/tutorials/robot-arms/so-arm101/lerobot-7dof/)** — configuração do ambiente, substituição dos arquivos 7-DOF, calibração, teleoperação, coleta de dados, treinamento e inferência, passo a passo
- [Substituição de arquivos 7-DOF (adaptar um clone oficial do lerobot)](/tutorials/robot-arms/so-arm101/lerobot-7dof/02-Replace-Files-7DOF)
- [Tutorial do SO-ARM101 (6 eixos)](/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Guia de Seleção de Braços Robóticos](/tutorials/robot-arms/select-guide)
- [Introdução à IA Incorporada (LeRobot)](/topics/embodied-ai-intro)

## Suporte

- 📧 E-mail: support@juxitech.com
- 🌐 Site: [www.juxitech.com](https://www.juxitech.com)
