---
title: Série de Braços Robóticos
description: "Início dos tutoriais de braços robóticos da Juxi Technology — SO-ARM101, AmazingHand, Lekiwi, XLeRobot"
---

# Série de Braços Robóticos

Bem-vindo aos tutoriais da série de braços robóticos! Aqui você encontrará guias completos para vários braços robóticos open source e mãos hábeis.

---

## Lista de Produtos

- [Guia de Seleção](./select-guide.md)

### SO-ARM101

Braço robótico de mesa open source de 6 eixos, com suporte ao LeRobot e a outros frameworks de IA.

- [Tutorial do SO-ARM101](./so-arm101/SO-ARM101-Tutorial.md)
- [Guia de montagem do SO-ARM101](./so-arm101/SO-ARM101-Assembly.md)
- [Compatibilidade do SO-ARM101 com PyTorch no Jetson Orin](./so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility.md)
- [Teleoperação sem fio do SO-ARM101 (versão ESP32-NanoCam)](./so-arm101/SO-ARM101-NanoCam-Wireless-Teleop.md)
- [Tutorial de dois braços (dois seguidores) do SO-ARM101](./so-arm101/SO-ARM101-Bi-Arm-Tutorial.md)
- [Tutorial de conversão do SO-ARM101 para 7-DOF e uso com LeRobot](./so-arm101/SO-ARM101-7DOF-LeRobot.md)
- [Ferramenta de calibração de servos da série SoARM](./so-arm101/SO-ARM101-Servo-Calibration-Tool.md)

#### Série SO-ARM101
- [Instalação do Suporte de Braço e Kit de Câmera SO-ARM100&101](./so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation.md)
- [Instalação da Câmera Superior](./so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation.md)

#### 1. Ambiente LeRobot
- [Etapa 1: Instalação do ambiente LeRobot (Ubuntu)](./so-arm101/lerobot/01-Environment-Setup/Ubuntu.md)
- [Etapa 1: Instalação do ambiente LeRobot (Windows)](./so-arm101/lerobot/01-Environment-Setup/Windows.md)
- [Etapa 1: Instalação do ambiente LeRobot (macOS)](./so-arm101/lerobot/01-Environment-Setup/MacOS.md)

#### 2. Porta serial
- [Etapa 2: Ver a porta do dispositivo serial (Ubuntu)](./so-arm101/lerobot/02-Serial-Port/Ubuntu.md)
- [Etapa 2: Ver a porta do dispositivo serial (Windows)](./so-arm101/lerobot/02-Serial-Port/Windows.md)
- [Etapa 2: Ver a porta do dispositivo serial (macOS)](./so-arm101/lerobot/02-Serial-Port/MacOS.md)

#### 3. Calibração
- [Etapa 3: Calibrar o braço robótico (Ubuntu)](./so-arm101/lerobot/03-Calibration/Ubuntu.md)
- [Etapa 3: Calibrar o braço robótico (Windows)](./so-arm101/lerobot/03-Calibration/Windows.md)
- [Etapa 3: Calibrar o braço robótico (macOS)](./so-arm101/lerobot/03-Calibration/MacOS.md)

#### 4. Teleoperação
- [Etapa 4: Teleoperação (Ubuntu)](./so-arm101/lerobot/04-Teleoperation/Ubuntu.md)
- [Etapa 4: Teleoperação (Windows)](./so-arm101/lerobot/04-Teleoperation/Windows.md)
- [Etapa 4: Teleoperação (macOS)](./so-arm101/lerobot/04-Teleoperation/MacOS.md)

#### 5. Teleop. e câmera
- [Etapa 5: Teleoperação com câmera (Ubuntu)](./so-arm101/lerobot/05-Camera-Teleoperation/Ubuntu.md)
- [Etapa 5: Teleoperação com câmera (Windows)](./so-arm101/lerobot/05-Camera-Teleoperation/Windows.md)
- [Etapa 5: Teleoperação com câmera (macOS)](./so-arm101/lerobot/05-Camera-Teleoperation/MacOS.md)

#### 6. Coleta de dados
- [Etapa 6: Coleta de dados por demonstração](./so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording.md)
- [Etapa 6: Observações sobre a coleta de dados](./so-arm101/lerobot/06-Data-Collection/Collection-Notes.md)
- [Etapa 6: Registrar conta no Hugging Face (opcional)](./so-arm101/lerobot/06-Data-Collection/HF-Account.md)
- [Etapa 6: Enviar o dataset ao Hugging Face (opcional)](./so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload.md)

#### 7. Treinamento
- [Etapa 7: Treinamento local no Ubuntu](./so-arm101/lerobot/07-Training/Local-Ubuntu.md)
- [Etapa 7: Configuração do ambiente de GPU na nuvem](./so-arm101/lerobot/07-Training/Cloud-GPU.md)
- [Etapa 7: Curvas de treinamento em tempo real no wandb](./so-arm101/lerobot/07-Training/WandB-Curves.md)
- [Etapa 7: Enviar o modelo ao Hugging Face (opcional)](./so-arm101/lerobot/07-Training/HF-Model-Upload.md)
- [Etapa 7: Obter o arquivo de pesos do modelo](./so-arm101/lerobot/07-Training/Model-Weights.md)
- [Etapa 7: Comando de treinamento — ACT](./so-arm101/lerobot/07-Training/Command-ACT.md)
- [Etapa 7: Comando de treinamento — pi0](./so-arm101/lerobot/07-Training/Command-pi0.md)
- [Etapa 7: Comando de treinamento — pi0.5](./so-arm101/lerobot/07-Training/Command-pi0.5.md)
- [Etapa 7: Comando de treinamento — pi0fast](./so-arm101/lerobot/07-Training/Command-pi0fast.md)
- [Etapa 7: Comando de treinamento — SmolVLA](./so-arm101/lerobot/07-Training/Command-smolvla.md)

#### 8. Inferência
- [Etapa 8: Descrição da linha de comando](./so-arm101/lerobot/08-Inference/CLI-Reference.md)
- [Etapa 8: Bugs comuns e soluções](./so-arm101/lerobot/08-Inference/Common-Bugs.md)
- [Etapa 8: Comando de inferência — ACT](./so-arm101/lerobot/08-Inference/Command-ACT.md)
- [Etapa 8: Comando de inferência — pi0](./so-arm101/lerobot/08-Inference/Command-pi0.md)
- [Etapa 8: Comando de inferência — pi0.5](./so-arm101/lerobot/08-Inference/Command-pi0.5.md)
- [Etapa 8: Comando de inferência — SmolVLA](./so-arm101/lerobot/08-Inference/Command-smolvla.md)

#### Fundamentos
- [Entendendo o LeRobot](./so-arm101/basics/Understanding-LeRobot.md)
- [Conjuntos de dados LeRobot no Hugging Face](./so-arm101/basics/HF-Datasets.md)
- [Materiais para treinamento de modelos](./so-arm101/basics/Training-Resources.md)
- [Arquivos oficiais de impressão 3D do SO-ARM 100](./so-arm101/basics/Official-3D-Print-Files.md)
- [Arquivos URDF e materiais de referência](./so-arm101/basics/URDF-Reference.md)

#### Extras e avançado
- [Controle de simulação ROS2](./so-arm101/ROS2-Simulation-Control.md)
- [Tutorial de instalação da garra de dedos paralelos](./so-arm101/Parallel-Finger-Gripper-Installation.md)

### AmazingHand

Mão hábil biônica open source, que oferece operação com múltiplos dedos de alta precisão.

- [Controle de interface do AmazingHand](./amazing-hand/AmazingHand-Interface-Control.md)
- [Exemplo oficial do AmazingHand](./amazing-hand/AmazingHand-Official-Example.md)
- [Depuração TTL do AmazingHand](./amazing-hand/AmazingHand-TTL-Debugging.md)

#### AmazingHand
- [AmazingHand Mão hábil — Informações do produto](./amazing-hand/product-info.md)

#### Depuração servo PWM
- [01-Controle visual por GUI](./amazing-hand/pwm-debugging/01-GUI-Visual-Control.md)
- [02-Tutorial de rastreamento de gestos](./amazing-hand/pwm-debugging/02-Gesture-Tracking.md)
- [03-Versão com servomotor PWM-Manual de uso](./amazing-hand/pwm-debugging/03-PWM-Servo-Manual.md)
- [04-Versão de servomotor serial-Instruções de uso](./amazing-hand/pwm-debugging/04-Serial-Servo-Guide.md)

#### Rastreamento de gestos
- [Linux (Ubuntu) implantação e execução com um clique](./amazing-hand/gesture-tracking/01-Ubuntu.md)
- [Implantação e execução com um clique no Windows](./amazing-hand/gesture-tracking/02-Windows.md)
- [Mac implantação e execução com um clique](./amazing-hand/gesture-tracking/03-macOS.md)

### Lekiwi

Carrinho robótico móvel totalmente open source, compatível com o framework de aprendizado por imitação LeRobot e com o braço SO101.

- [Tutorial do Lekiwi](./lekiwi/Lekiwi-Tutorial.md)
- [Guia de montagem do Lekiwi](./lekiwi/Lekiwi-Assembly.md)

### Curso SO-ARM101 + AmazingHand

Fluxo completo SO-ARM101 + AmazingHand: configuração, calibração, teleoperação, coleta de dados, treinamento e implantação (Windows / Linux).

- [Visão geral do curso](./so-arm-amazinghand/index.md)

#### Linux

- [Etapa 1: configuração de ambiente (Linux)](./so-arm-amazinghand/01-Environment-Setup-Linux.md)
- [Etapa 2: calibração de mão e braços (Linux)](./so-arm-amazinghand/02-Hand-Arm-Calibration-Linux.md)
- [Etapa 3: teleoperação (Linux)](./so-arm-amazinghand/03-Teleoperation-Linux.md)
- [Etapa 4: coleta de dados (Linux)](./so-arm-amazinghand/04-Data-Collection-Linux.md)
- [Etapa 5: treinamento do modelo (Linux)](./so-arm-amazinghand/05-Model-Training-Linux.md)
- [Etapa 6: implantação do modelo (Linux)](./so-arm-amazinghand/06-Model-Deployment-Linux.md)

#### Windows

- [Etapa 1: configuração de ambiente (Windows)](./so-arm-amazinghand/01-Environment-Setup-Windows.md)
- [Etapa 2: calibração de mão e braços (Windows)](./so-arm-amazinghand/02-Hand-Arm-Calibration-Windows.md)
- [Etapa 3: teleoperação (Windows)](./so-arm-amazinghand/03-Teleoperation-Windows.md)
- [Etapa 4: coleta de dados (Windows)](./so-arm-amazinghand/04-Data-Collection-Windows.md)
- [Etapa 5: treinamento do modelo (Windows)](./so-arm-amazinghand/05-Model-Training-Windows.md)
- [Etapa 6: implantação do modelo (Windows)](./so-arm-amazinghand/06-Model-Deployment-Windows.md)

### Tutoriais do XLeRobot

Tutoriais do XLeRobot: configuração, implantação de arquivos e montagem (kit montado/em peças).

- [Visão geral dos tutoriais](./xlerobot/index.md)
- [Configuração (macOS)](./xlerobot/01-Environment-Setup-macOS.md)
- [Configuração (Ubuntu)](./xlerobot/01-Environment-Setup-Ubuntu.md)
- [Configuração (Windows)](./xlerobot/01-Environment-Setup-Windows.md)
- [Mover arquivos do XLeRobot](./xlerobot/02-Move-Xlerobot-Files.md)
- [Montagem do kit montado](./xlerobot/03-Assembly-Assembled-Kit.md)
- [Montagem do kit em peças](./xlerobot/04-Assembly-Parts-Kit.md)

---

## Suporte Técnico

Se você tiver dúvidas, entre em contato:

- 📧 E-mail: support@juxitech.com
- 💬 GitHub Issues: [Feedback](https://github.com/Juxi-Technology/wiki-documents/issues)
