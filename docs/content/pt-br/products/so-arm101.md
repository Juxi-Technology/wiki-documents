---
title: Kit de Desenvolvimento SO-ARM101
category: robot
description: "Kit de desenvolvimento SO-ARM101 da Juxi Technology: braço duplo 6-DOF open source no ecossistema LeRobot, para teleoperação e aprendizado por imitação."
keywords: [so-arm101, braço robótico, leRobot, teleoperação, braço duplo]
---

# Kit de Desenvolvimento SO-ARM101

> **[Comprar na loja](https://www.juxitech.com/products/so-arm101-developers-kit)**

## Visão Geral

O SO-ARM101 é o kit de desenvolvimento robótico de braço duplo 6-DOF open source da Juxi Technology, profundamente integrado ao ecossistema **LeRobot**. Braço líder preto + braço seguidor branco, pronto para teleoperação, coleta de dados de aprendizado por imitação e treinamento de políticas.

**Principais recursos**:

- Braços duplos, 6 DOF cada, acionados por servos de barramento
- Integração profunda com LeRobot (HuggingFace) — políticas ACT/Diffusion/Pi0
- Suporte a Jetson / PC (Linux)
- Hardware totalmente open source (esquemáticos/CAD/firmware)

## 1. Design de hardware: modular de alto desempenho, fácil de montar e personalizável

- **Material estrutural**: a estrutura central combina peças impressas em 3D com componentes de reforço de carga, otimizando a passagem de cabos e o design das articulações, evitando interferência de movimento e conciliando leveza e durabilidade; o usuário pode imprimir, substituir ou expandir as peças estruturais por conta própria.

- **Configuração de acionamento**: o braço seguidor é equipado com **6 servos de codificação magnética de 12V 30KG de alto torque**, com feedback de codificação magnética de 360° e algoritmo de controle PID, movimento suave e sem trepidação, alta precisão de posicionamento repetido, força potente e movimentos precisos; já o braço líder utiliza **6 servos de 7.4V**, distribuindo diferentes relações de redução conforme a carga de cada articulação, o que facilita o ensino por arraste manual.

- **Sistema de visão**: suporta um sistema de visão inteligente com duas câmeras; a câmera na extremidade captura detalhes da garra de perto, a câmera global cobre o ambiente de trabalho, e a fusão dos dados das duas câmeras constrói um modelo tridimensional, fornecendo suporte de dados rico para o aprendizado por imitação.

- **Conexão de controle**: equipado com placa de acionamento de servos, conecta-se diretamente ao computador ou ao Raspberry Pi pela interface USB-C, plug and play, simplificando o processo de conexão de hardware e montando rapidamente um ambiente de controle.

## 2. Ecossistema de software: integração profunda com o LeRobot, desenvolvimento de IA sem barreiras

- **Compatibilidade com o framework central**: profundamente adaptado ao **framework ML de robótica open source LeRobot** da Hugging Face, construído sobre PyTorch, com modelos pré-treinados integrados, datasets de múltiplos cenários e ambiente de simulação, compatível com datasets open source conhecidos, como o Stanford ALOHA.

- **Comunicação de baixa latência**: utiliza o **motor de fluxo de dados distribuído DORA**, realizando a interação de baixa latência entre hardware e algoritmos, com desempenho de execução em Python 17 vezes mais rápido que o ROS2, e suporta hot reload de código, permitindo ajustar a estratégia em tempo real sem reiniciar.

- **Open source em toda a stack**: arquivos de impressão 3D do hardware, código de controle do software, scripts de treinamento de IA e o conjunto completo de tutoriais são **totalmente open source**; o usuário pode modificar livremente e fazer desenvolvimento secundário, implementando rapidamente expansões de funcionalidades personalizadas.

## 3. Cenários de aplicação centrais: da introdução à implementação, adaptação a todos os cenários

1. **Introdução ao ensino de robótica**: oferece um tutorial de fluxo completo, da montagem do braço robótico e programação básica até a implantação de estratégias de IA, acompanhado de interface visual de operação e códigos de exemplo; usuários sem nenhuma base podem dominar rapidamente o controle do robô e as habilidades de aplicação de IA.

2. **Validação de algoritmos científicos**: focado em pesquisas de **aprendizado por imitação e aprendizado por reforço**, suporta a gravação de dados de operação humana por VR para treinar o robô; caso típico: com base em 50 vídeos de operação de 15 segundos, 2 horas de treinamento bastam para dominar tarefas como dobrar roupas, inserir chaves e separar materiais.

3. **Protótipo industrial leve**: valida soluções de automação a baixo custo, adaptando-se a cenários como **movimentação de materiais, montagem de precisão e triagem de peças**, realizando as funções centrais de um braço robótico industrial com um custo da ordem de mil yuans, implementando rapidamente a validação de protótipos.

## Especificações

| Categoria | Especificação |
|----------|------|
| Tipo | Robô de teleoperação de braço duplo |
| DOF | 6 DOF por braço |
| Acionamento | Servos de barramento Feetech |
| Host | PC (Linux) / Jetson |
| Ecossistema | LeRobot, ROS 2, ROS 1 |
| Alimentação | Líder 5V6A / Seguidor 12V5A |
| Carga útil | 500g |
| Repetibilidade | ±0,1mm |
| Raio de trabalho | 520mm |
| Comunicação | USB-C |
| Material | Bambu Lab PLA+ |
| Dimensões (líder / seguidor) | 111×239×525 mm / 111×173×532 mm |

![Desenho cotado dos braços líder e seguidor](../../../public/images/products/so-arm101/dimensions.jpg)

## Início Rápido

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot && pip install -e ".[feetech]"

lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0

lerobot-teleoperate --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM1
```

## Tutoriais

- [Tutorial SO-ARM101](/pt-br/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Montagem SO-ARM101](/pt-br/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [Guia de Seleção de Braços Robóticos](/pt-br/tutorials/robot-arms/select-guide)
- [Introdução à IA Incorporada (LeRobot)](/pt-br/topics/embodied-ai-intro)

## Suporte

- 📧 E-mail: support@juxitech.com
- 🌐 Site: [www.juxitech.com](https://www.juxitech.com)
