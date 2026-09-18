---
title: "Conhecer o LeRobot"
description: "O que é a inteligência incorporada e o LeRobot, o braço robótico SO-ARM 101 e as configurações de computador necessárias."
---

# Conhecer o LeRobot

## O que é inteligência incorporada?

Inteligência com um corpo. Ligar a IA a diversos corpos físicos de hardware, por exemplo:

Cães robôs quadrúpedes, robôs humanoides bípedes, robôs com rodas e pernas, drones, automóveis autónomos

## O que é o LeRobot?

O LeRobot é o `framework de software de robôs de inteligência incorporada` de código aberto do HuggingFace

Endereço do Github: https://github.com/huggingface/lerobot

Implementação de baixo limiar: **recolha de dados, treino de algoritmos e implementação de inferência** de aprendizagem por reforço e **aprendizagem por imitação (VLA)**, sendo o mais importante a **aprendizagem por imitação (VLA)**

- Que robôs podem ser desenvolvidos com o LeRobot?

Desde o braço robótico SO-ARM 101 de nível de milhares de yuan, o carrinho LeKiwi, até aos braços robóticos piper Songling de dezenas de milhares, o braço robótico StarAI Huaxinjing, a mão ágil Hope-JR, até ao robô humanoide Unitree G1 de mais de cem mil. O LeRobot tornou-se a norma da indústria da inteligência incorporada para a recolha de dados e o treino de algoritmos.

Também pode adaptar o seu próprio robô ao framework LeRobot.

- Conjuntos de dados e modelos do LeRobot

O LeRobot define o seu próprio formato de conjunto de dados de aprendizagem por imitação; pode consultar, utilizar, descarregar e treinar todos os conjuntos de dados e modelos públicos no HuggingFace, e também pode carregar os seus próprios conjuntos de dados para o HuggingFace

## O que é o braço robótico SO-ARM 101?

Este tutorial usa como exemplo o braço robótico SO-ARM 101, com peças estruturais impressas em 3D e servos Feetech, e o custo é muito baixo.

Este é um corpo de inteligência incorporada que até um estudante pobre consegue comprar, e é também um dos corpos oficialmente recomendados pelo LeRobot.

O braço robótico inclui dois braços: o braço líder (Leader) e o braço seguidor (Follower). Cada braço inclui 6 graus de liberdade (5 graus de liberdade articulares + 1 grau de liberdade da garra).

## Que configuração de computador preciso

Um portátil Windows comum consegue realizar todas as operações antes do treino

Um computador Mac comum consegue realizar todas as operações

Um computador Ubuntu com placa gráfica NVIDIA consegue realizar todas as operações

Neste tutorial, utiliza-se a [plataforma de GPU na nuvem](https://featurize.cn?s=d7ce99f842414bfcaea5662a97581bd1) para treinar modelos, não sendo necessário que o seu computador tenha uma configuração muito elevada

## O que é a **aprendizagem por imitação e VLA**?

Um humano arrasta o robô para o ensinar e recolher um conjunto de dados, formando um conjunto de dados. Depois, esse conjunto de dados é usado para treinar um algoritmo de aprendizagem por imitação, que por fim é implementado no robô, fazendo com que ele imite autonomamente as ações humanas e generalize para ambientes reais. Não é necessária teleoperação nem controlo remoto.

Por exemplo, no vídeo acima, um humano arrasta o braço robótico SO-ARM para apanhar um lagostim, mergulhá-lo no tempero e colocá-lo na panela de óleo quente, e por fim faz o braço robótico realizar essa ação de forma autónoma. Mesmo que apareça um novo lagostim, ele consegue reagir a qualquer momento e completar a ação.

A aprendizagem por imitação também tem um nome moderno e de ponta: VLA (grande modelo de Visão-Linguagem-Ação). Este é também o campo de investigação em inteligência incorporada que atualmente se desenvolve mais rapidamente, tem o investimento mais quente, a competição mais acirrada entre a China e os EUA, o ecossistema de código aberto mais próspero, a maior atenção dos media, e para o qual inúmeros mestrandos e doutorandos estão a correr para entrar.

O algoritmo principal para o qual o LeRobot é adaptado é a aprendizagem por imitação. Por exemplo, ACT, Diffusion Policy, SmolVLA, Pi0, Pi0.5, Wall-OSS, etc.

No tutorial, a aprendizagem por imitação é apenas VLA.

<RelatedProducts slugs="so-arm101" />
