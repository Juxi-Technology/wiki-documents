---
title: "Tutoriais do Braço Robótico SO-ARM101"
description: "Página inicial do tutorial do SO-ARM101: o que são inteligência incorporada e LeRobot, o braço, a configuração de computador necessária e o significado do aprendizado por imitação (VLA), com a navegação completa do curso."
---

# Tutoriais do Braço Robótico SO-ARM101

![image.png](../../../../../public/images/tutorials/robot-arms/so-arm101/so-arm101-index/d02-03.png)

## O que é inteligência incorporada?

Inteligência com um corpo. Ela conecta a IA a diversas entidades físicas de hardware, como:

Cães robôs quadrúpedes, robôs humanoides bípedes, robôs com rodas e pernas, drones, carros autônomos

## O que é o LeRobot?

O LeRobot é o `framework de software de robôs inteligentes incorporados` de código aberto da HuggingFace

Endereço no GitHub: https://github.com/huggingface/lerobot

Ele reduz a barreira para **coleta de dados, treinamento de algoritmos e implantação de inferência** em aprendizado por reforço e **aprendizado por imitação (VLA)**, com o **aprendizado por imitação (VLA)** como foco principal

- Quais robôs podem ser desenvolvidos com o LeRobot?

Do braço robótico SO-ARM 101, da faixa de mil yuans, e do carrinho LeKiwi, passando pelo braço AgileX piper, da faixa de dezenas de milhares de yuans, pelo braço Huaxinjing StarAI e pela mão hábil Hope-JR, até o robô humanoide Unitree G1, da faixa de centenas de milhares de yuans. O LeRobot se tornou o padrão para coleta de dados e treinamento de algoritmos na indústria da inteligência incorporada.

Você também pode adaptar o seu próprio robô ao framework LeRobot.

- Datasets e modelos do LeRobot

O LeRobot define seu próprio formato de dataset de aprendizado por imitação. Você pode visualizar, usar, baixar e treinar com todos os datasets e modelos públicos no HuggingFace, e também pode enviar seus próprios datasets para o HuggingFace.

## O que é o braço robótico SO-ARM 101?

Este tutorial usa o braço robótico SO-ARM 101 como exemplo; ele utiliza peças estruturais impressas em 3D e servos Feetech, a um custo muito baixo.

Este é um corpo de inteligência incorporada que até um estudante sem dinheiro pode pagar, e é um dos corpos oficialmente recomendados pelo LeRobot.

O braço é composto por dois braços: um braço Leader e um braço Follower. Cada braço tem 5 graus de liberdade mais 1 grau de liberdade da garra.

## Qual configuração de computador eu preciso

Um notebook Windows comum dá conta de tudo até o treinamento.

Um Mac comum dá conta de tudo.

Uma máquina Ubuntu com GPU NVIDIA dá conta de tudo.

Neste tutorial usamos uma [plataforma de GPU na nuvem](https://featurize.cn?s=d7ce99f842414bfcaea5662a97581bd1) para treinar os modelos, então o seu próprio computador não precisa de uma configuração topo de linha.

## O que é **aprendizado por imitação e VLA**?

Uma pessoa arrasta o robô para demonstrar e coletar um dataset. Esse dataset é então usado para treinar um algoritmo de aprendizado por imitação, que por fim é implantado no robô, permitindo que ele imite as ações humanas de forma autônoma e generalize para o ambiente real. Não é preciso teleoperação nem controle remoto.

Por exemplo, no vídeo acima, uma pessoa arrasta o braço robótico SO-ARM para pegar um lagostim, mergulhá-lo no tempero e soltá-lo no óleo quente, e o braço acaba executando essa ação sozinho. Mesmo com um lagostim novo, ele consegue reagir e concluir a ação a qualquer momento.

O aprendizado por imitação também tem um nome moderno e de ponta: VLA (modelo grande de Visão-Linguagem-Ação). Esse também é o campo de pesquisa em inteligência incorporada que se desenvolve mais rápido hoje, atrai o investimento mais quente, tem a competição China-EUA mais acirrada, desfruta do ecossistema de código aberto mais próspero, atrai intensa atenção da mídia e atrai incontáveis estudantes de mestrado e doutorado.

Os algoritmos que o LeRobot adapta principalmente são de aprendizado por imitação, como ACT, Diffusion Policy, SmolVLA, Pi0, Pi0.5, Wall-OSS e outros.

O aprendizado por imitação neste tutorial é exclusivamente VLA.


## Navegação dos tutoriais

### Cursos completos

- [Curso completo LeRobot](/pt-br/tutorials/robot-arms/so-arm101/lerobot/)
- [Tutorial do braço robótico SO-ARM101 de 7 eixos](/pt-br/tutorials/robot-arms/so-arm101/lerobot-7dof/)

### Tutoriais de montagem e expansão

- [Tutorial do Braço Robótico LeRobot](/pt-br/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Guia de Montagem do Braço Robótico Lerobot](/pt-br/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [Instalação do Suporte de Braço e Kit de Câmera SO-ARM100&101](/pt-br/tutorials/robot-arms/so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation)
- [Instalação da Câmera Superior](/pt-br/tutorials/robot-arms/so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation)
- [Tutorial de instalação da garra de dedos paralelos](/pt-br/tutorials/robot-arms/so-arm101/Parallel-Finger-Gripper-Installation)
- [Tutorial de dois braços (dois seguidores) do SO-ARM101](/pt-br/tutorials/robot-arms/so-arm101/SO-ARM101-Bi-Arm-Tutorial)
- [Teleoperação sem fio do SO-ARM101 (versão ESP32-NanoCam)](/pt-br/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop)
- [Solução de problemas de teleoperação](/pt-br/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Troubleshooting)
- [Tutorial de uso da ferramenta de calibração de servos da série SoARM](/pt-br/tutorials/robot-arms/so-arm101/SO-ARM101-Servo-Calibration-Tool)
- [Controle de simulação ROS2](/pt-br/tutorials/robot-arms/so-arm101/ROS2-Simulation-Control)
- [Compatibilidade PyTorch no Jetson Orin](/pt-br/tutorials/robot-arms/so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility)

### Conhecimentos básicos

- [Entendendo o LeRobot](/pt-br/tutorials/robot-arms/so-arm101/basics/Understanding-LeRobot)
- [Conjuntos de dados LeRobot no Hugging Face](/pt-br/tutorials/robot-arms/so-arm101/basics/HF-Datasets)
- [Materiais para treinamento de modelos](/pt-br/tutorials/robot-arms/so-arm101/basics/Training-Resources)
- [Arquivos oficiais de impressão 3D do SO-ARM 100](/pt-br/tutorials/robot-arms/so-arm101/basics/Official-3D-Print-Files)
- [Arquivos URDF e materiais de referência](/pt-br/tutorials/robot-arms/so-arm101/basics/URDF-Reference)
- [Brackets e suportes de câmera recomendados](/pt-br/tutorials/robot-arms/so-arm101/basics/Camera-Mounts-Recommended)

### Tutorial do LeLab

- [1 · Visão geral](/pt-br/tutorials/robot-arms/so-arm101/lelab/01-Overview)
- [2 · Instalar e executar](/pt-br/tutorials/robot-arms/so-arm101/lelab/02-Install)
- [3 · Conectar e calibrar](/pt-br/tutorials/robot-arms/so-arm101/lelab/03-Calibration)
- [4 · Teleoperação](/pt-br/tutorials/robot-arms/so-arm101/lelab/04-Teleoperation)
- [5 · Gravar um dataset](/pt-br/tutorials/robot-arms/so-arm101/lelab/05-Record-Dataset)
- [6 · Treinar e executar inferência](/pt-br/tutorials/robot-arms/so-arm101/lelab/06-Train-and-Inference)
- [7 · Solução de problemas](/pt-br/tutorials/robot-arms/so-arm101/lelab/07-Troubleshooting)

### Tutorial da imagem Docker do XLeRobot

- [Tutorial do XLeRobot Docker — Kit de Desenvolvedor Jetson AGX Orin](/pt-br/tutorials/jetson-agx-orin/xlerobot-docker/deployment/01-Overview)
- [Tutorial do XLeRobot Docker — Kit de Desenvolvedor Jetson Orin Nano Super](/pt-br/tutorials/jetson-orin-nano/xlerobot-docker/deployment/01-Overview)

<RelatedProducts slugs="so-arm101" />
