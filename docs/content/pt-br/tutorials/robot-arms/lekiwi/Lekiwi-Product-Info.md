---
title: Informações do produto
---

# Informações do produto

> **[Comprar na loja](https://www.juxitech.com/products/lekiwi-embodied-intelligence-mobile-robotic-car)**

## Visão geral do produto

O LeKiwi é desenvolvido sob a liderança da SIGRobotics-UIUC (o grupo de interesse em robótica da Universidade de Illinois em Urbana-Champaign). Ele oferece uma plataforma robótica de código aberto, de baixo custo e altamente flexível, que promove a difusão da tecnologia robótica na educação, na pesquisa e na automação industrial. Seu projeto de hardware (arquivos de impressão 3D), sua pilha de software (compatível com o framework LeRobot) e seus tutoriais são todos de código aberto, e ele suporta extensões definidas pelo usuário.

O LeKiwi é composto por uma plataforma móvel e um braço líder-seguidor. O braço líder-seguidor usa peças impressas em 3D como estrutura e 6 servos Feetech de 12V como juntas de acionamento. O braço líder fica sobre uma plataforma fixa, usa uma placa controladora de servos e se conecta a um computador via USB-C. O braço seguidor é montado na plataforma móvel, que é acionada por 3 servos Feetech de 12V; ele usa uma placa controladora de servos e é controlado via USB-C conectado a uma Raspberry Pi.

O LeKiwi integra profundamente o LeRobot (o framework de aprendizado de máquina para robótica de código aberto da Hugging Face), oferecendo suporte a aprendizado por imitação, coleta de dados e treinamento de políticas. Ele é implementado sobre PyTorch e inclui modelos pré-treinados, datasets e um ambiente de simulação, além de ser compatível com datasets de código aberto conhecidos, como o Stanford ALOHA. Ele usa o framework DORA (um mecanismo de fluxo de dados distribuído) para obter comunicação de baixa latência entre hardware e algoritmo (o desempenho em Python é 17 vezes mais rápido que o ROS2) e oferece suporte a recarga em tempo real (hot reload), de modo que o código pode ser ajustado em tempo real sem reiniciar.

O LeKiwi é muito adequado para educação e pesquisa de nível inicial: ensino introdutório de robótica, com tutoriais de ponta a ponta que abrangem desde a montagem e a programação até a implantação de políticas de IA; validação de pesquisa: oferece suporte à pesquisa em aprendizado por imitação (por exemplo, treinar um robô a partir de vídeos de operação humana gravados via VR), com o caso do robô polinizador Ready2, que aprende tarefas como dobrar roupas e inserir chaves após apenas 2 horas de treinamento com 50 vídeos de 15 segundos; prototipagem industrial: validação de baixo custo de soluções de automação (como movimentação de materiais e montagem de precisão).
