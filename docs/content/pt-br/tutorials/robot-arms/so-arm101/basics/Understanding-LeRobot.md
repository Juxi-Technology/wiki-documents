---
title: "Entendendo o LeRobot"
description: "Entenda o que é inteligência incorporada, o LeRobot, o braço SO-ARM101 e o aprendizado por imitação VLA, além da configuração de computador necessária."
---

# Entendendo o LeRobot

## O que é inteligência incorporada?

Inteligência com um corpo. Conectar a IA a diversos corpos físicos, como:

Cães robôs quadrúpedes, robôs humanoides bípedes, robôs com rodas e pernas, drones, carros autônomos

## O que é o LeRobot?

O LeRobot é o `framework de software de robôs de inteligência incorporada` de código aberto do HuggingFace

Endereço do Github: https://github.com/huggingface/lerobot

Implementação de baixa barreira: **coleta de dados, treinamento de algoritmos e implantação de inferência** em aprendizado por reforço e **aprendizado por imitação (VLA)**, sendo o mais importante o **aprendizado por imitação (VLA)**

- Quais robôs podem ser desenvolvidos com o LeRobot?

Do braço robótico SO-ARM 101 de nível de milhares de yuan, o carrinho LeKiwi, aos braços robóticos piper Songling de dezenas de milhares, o braço robótico StarAI Huaxinjing, a mão ágil Hope-JR, até o robô humanoide Unitree G1 de mais de cem mil. O LeRobot tornou-se o padrão da indústria de inteligência incorporada para coleta de dados e treinamento de algoritmos.

Você também pode adaptar seu próprio robô ao framework LeRobot.

- Conjuntos de dados e modelos do LeRobot

O LeRobot define seu próprio formato de conjunto de dados de aprendizado por imitação. Você pode visualizar, usar, baixar e treinar todos os conjuntos de dados e modelos públicos no HuggingFace, e também pode enviar seus próprios conjuntos de dados para o HuggingFace

## O que é o braço robótico SO-ARM 101?

Este tutorial usa o braço robótico SO-ARM 101 como exemplo, com peças estruturais impressas em 3D e servos Feetech, e o custo é muito baixo.

Este é um corpo de inteligência incorporada que até um estudante pobre consegue comprar, e também é um dos corpos oficialmente recomendados pelo LeRobot.

O braço robótico inclui dois braços: o braço líder (Leader) e o braço seguidor (Follower). Cada braço possui 6 graus de liberdade (5 graus de liberdade de juntas + 1 grau de liberdade da garra).

## Que configuração de computador eu preciso

Um laptop Windows comum consegue realizar todas as operações antes do treinamento

Um computador Mac comum consegue realizar todas as operações

Um computador Ubuntu com placa de vídeo NVIDIA consegue realizar todas as operações

Neste tutorial, usamos a [plataforma de GPU na nuvem](https://featurize.cn?s=d7ce99f842414bfcaea5662a97581bd1) para treinar modelos, e não é necessário que seu próprio computador tenha uma configuração muito alta

## O que é **aprendizado por imitação e VLA**?

Um humano arrasta o robô para ensiná-lo e coletar um conjunto de dados, formando um conjunto de dados. Depois, esse conjunto de dados é usado para treinar um algoritmo de aprendizado por imitação, que por fim é implantado no robô, fazendo com que ele imite autonomamente as ações humanas e generalize para ambientes reais. Não é necessária teleoperação nem controle remoto.

Por exemplo, no vídeo acima, um humano arrasta o braço robótico SO-ARM para pegar um lagostim, mergulhá-lo no tempero e colocá-lo na panela de óleo quente, e por fim faz o braço robótico realizar essa ação de forma autônoma. Mesmo que apareça um novo lagostim, ele consegue reagir a qualquer momento e completar a ação.

O aprendizado por imitação também tem um nome moderno e de ponta: VLA (grande modelo de Visão-Linguagem-Ação). Este também é o campo de pesquisa em inteligência incorporada que atualmente se desenvolve mais rapidamente, tem o investimento mais quente, a competição mais acirrada entre China e EUA, o ecossistema de código aberto mais próspero, a maior atenção da mídia, e para o qual inúmeros mestrandos e doutorandos estão correndo para entrar.

O algoritmo principal para o qual o LeRobot é adaptado é o aprendizado por imitação. Por exemplo, ACT, Diffusion Policy, SmolVLA, Pi0, Pi0.5, Wall-OSS, etc.

No tutorial, o aprendizado por imitação é apenas VLA.

<RelatedProducts slugs="so-arm101" />
