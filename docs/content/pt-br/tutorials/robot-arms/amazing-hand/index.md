---

title: "Tutorial de uso da mão hábil AmazingHand"

description: "Tutorial completo da mão hábil open source AmazingHand: informações do produto, kit de câmera, reconhecimento de gestos na web, rastreamento de gestos no MuJoCo, controle de interface, Arduino Nano e depuração TTL e PWM."

---



# Tutorial de uso da mão hábil AmazingHand



A AmazingHand é um projeto de código aberto de uma mão antropomórfica que custa menos de 250 dólares, voltado para entusiastas de robótica, pesquisadores e desenvolvedores.



## Visão geral do projeto



- **Design mecânico**: 8 graus de liberdade, 4 dedos, com 2 falanges articuladas por dedo; os dedos usam acionamento por mecanismo paralelo, sem cabos externos, com todos os atuadores integrados na mão; peças impressas em 3D, peso de cerca de 400 g e custo inferior a 200 euros.

- **Solução de controle**: driver de barramento serial em Python (compatível com hardwares como Waveshare); duas opções à escolha: Arduino + Feetech TTL Linker; código de exemplo em Python e Arduino; suporte a feedback como ativação do torque dos servos, sensor de posição e monitoramento de temperatura.

- **Recursos completos**: lista de materiais (BOM) completa, arquivos CAD e documentação online no Onshape, tutorial de montagem e scripts de calibração, exemplos de demonstração básicos e avançados, com suporte a cinemática inversa/direta.

- **Destaques do projeto**: compatível com punhos de robôs como o Reachy2; design aberto e impulsionado pela comunidade; o roteiro futuro inclui sensoriamento tátil, juntas elásticas, dedos com comprimentos variados e uma solução de 5 dedos.



## Lista de tutoriais



| Conteúdo | Descrição |
|---|---|
| [Informações do produto](./product-info.md) | Parâmetros do produto, BOM, estrutura e download de materiais |
| [Instalação do kit de câmera ambiente](./Camera-Kit-Installation.md) | Passos de instalação do suporte do kit de câmera |
| [Reconhecimento de gestos na web](./AmazingHand-Web-Control.md) | Controle online pelo navegador e implantação local |
| [Rastreamento de gestos (simulação MuJoCo)](./gesture-tracking/02-Windows.md) | Implantação e execução com um clique no Windows / Linux / Mac |
| [Tutorial de controle de interface](./AmazingHand-Interface-Control.md) | Controle por GUI Python / linha de comando, calibração de mão esquerda e direita e protocolo |
| [Tutorial de uso do Arduino Nano](./Arduino-Nano-Tutorial.md) | Ligação da placa Nano, instalação de bibliotecas e programa de demonstração |
| [Depuração e montagem de servo TTL via serial](./AmazingHand-TTL-Debugging.md) | Montagem e depuração de servo TTL via porta serial |
| [Depuração de servo PWM](./pwm-debugging/01-GUI-Visual-Control.md) | Visualização por GUI, rastreamento de gestos e manual de uso |



## Downloads de recursos



- [AmazingHand.zip](https://juxitech.feishu.cn/wiki/EoLawIK31i3xNNkVX8WcENGfn2d) — implantação do rastreamento de gestos com um clique (Windows / Linux / Mac)

- [SCS0009_ServoController.zip](https://juxitech.feishu.cn/wiki/Qp06wpL4HiALsMkWHsKchxvKnJc) — ferramenta de calibração dos servos Feetech SCS0009

- [Repositório oficial da AmazingHand](https://github.com/pollen-robotics/AmazingHand)
- [delivery_package.zip](/downloads/delivery_package.zip) — Pacote de entrega PWM（GUI / rastreamento de gestos / firmware / documentação）
- [Amazinghand-web.zip](/downloads/Amazinghand-web.zip) — Pacote de implantação local
- [Juxi_ServoController.zip](/downloads/Juxi_ServoController.zip) — Ferramenta de depuração de servos


### Todas as páginas

- [AmazingHand Mão hábil — Informações do produto](./product-info.md)
- [Instalação do kit de câmera ambiente](./Camera-Kit-Installation.md)
- [AmazingHand Web Control](./AmazingHand-Web-Control.md)
- [Implantação e execução com um clique no Windows](./gesture-tracking/02-Windows.md)
- [Linux (Ubuntu) implantação e execução com um clique](./gesture-tracking/01-Ubuntu.md)
- [Mac implantação e execução com um clique](./gesture-tracking/03-macOS.md)
- [Tutorial do Exemplo Oficial da Mão Robótica](./AmazingHand-Official-Example.md)
- [Tutorial de controle de interface](./AmazingHand-Interface-Control.md)
- [Tutorial de uso do Arduino Nano](./Arduino-Nano-Tutorial.md)
- [Tutorial de Depuração da Mão Hábil (servo TTL)](./AmazingHand-TTL-Debugging.md)
- [01-Controle visual por GUI](./pwm-debugging/01-GUI-Visual-Control.md)
- [02-Tutorial de rastreamento de gestos](./pwm-debugging/02-Gesture-Tracking.md)
- [03-Versão com servomotor PWM-Manual de uso](./pwm-debugging/03-PWM-Servo-Manual.md)
- [04-Versão de servomotor serial-Instruções de uso](./pwm-debugging/04-Serial-Servo-Guide.md)
- [Tutorial completo](./pwm-debugging/05-Full-Workflow-Tutorial.md)


<RelatedProducts slugs="amazinghand" />

