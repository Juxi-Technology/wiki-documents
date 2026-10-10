---
title: Informações do produto
---

# Informações do produto

> **[Comprar na loja](https://www.juxitech.com/products/lekiwi-embodied-intelligence-mobile-robotic-car)**

## Visão geral do produto

O LeKiwi é desenvolvido sob a liderança da SIGRobotics-UIUC (o grupo de interesse em robótica da Universidade de Illinois em Urbana-Champaign). Oferece uma plataforma robótica de código aberto, de baixo custo e altamente flexível, que promove a divulgação da tecnologia robótica na educação, na investigação e na automação industrial. O seu design de hardware (ficheiros de impressão 3D), o seu stack de software (compatível com o framework LeRobot) e os seus tutoriais são todos de código aberto, e suporta extensões definidas pelo utilizador.

O LeKiwi é composto por uma plataforma móvel e um braço líder-seguidor. O braço líder-seguidor utiliza peças impressas em 3D como estrutura e 6 servos Feetech de 12V como juntas de acionamento. O braço líder assenta numa plataforma fixa, utiliza uma placa controladora de servos e liga-se a um computador via USB-C. O braço seguidor está montado na plataforma móvel, que é acionada por 3 servos Feetech de 12V; utiliza uma placa controladora de servos e é controlado via USB-C ligado a uma Raspberry Pi.

O LeKiwi integra profundamente o LeRobot (o framework de aprendizagem automática para robótica de código aberto da Hugging Face), com suporte para aprendizagem por imitação, recolha de dados e treino de políticas. É implementado em PyTorch e inclui modelos pré-treinados, datasets e um ambiente de simulação, além de ser compatível com datasets de código aberto conhecidos, como o Stanford ALOHA. Utiliza o framework DORA (um motor de fluxo de dados distribuído) para obter comunicação de baixa latência entre hardware e algoritmo (o desempenho em Python é 17 vezes mais rápido do que o ROS2) e suporta recarregamento a quente (hot reload), pelo que o código pode ser ajustado em tempo real sem reiniciar.

O LeKiwi é muito adequado à educação e à investigação de nível inicial: ensino introdutório de robótica, com tutoriais de ponta a ponta que abrangem desde a montagem e a programação até à implementação de políticas de IA; validação de investigação: suporta investigação em aprendizagem por imitação (por exemplo, treinar um robot a partir de vídeos de operação humana gravados via VR), com o caso do robot polinizador Ready2, que aprende tarefas como dobrar roupa e inserir chaves após apenas 2 horas de treino com 50 vídeos de 15 segundos; prototipagem industrial: validação de baixo custo de soluções de automação (como movimentação de materiais e montagem de precisão).
