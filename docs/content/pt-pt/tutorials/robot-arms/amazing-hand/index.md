---

title: "Tutorial de utilização da mão hábil AmazingHand"

description: "Tutorial completo da mão hábil open source AmazingHand: informações do produto, kit de câmara, reconhecimento de gestos na web, rastreamento de gestos no MuJoCo, controlo de interface, Arduino Nano e depuração TTL e PWM."

---



# Tutorial de utilização da mão hábil AmazingHand



A AmazingHand é um projeto de código aberto de uma mão antropomórfica que custa menos de 250 dólares, destinado a entusiastas de robótica, investigadores e programadores.



## Apresentação do projeto



- **Design mecânico**: 8 graus de liberdade, 4 dedos, com 2 falanges articuladas por dedo; os dedos usam acionamento por mecanismo paralelo, sem cabos externos, com todos os atuadores integrados na mão; peças impressas em 3D, peso de cerca de 400 g e custo inferior a 200 euros.

- **Solução de controlo**: driver de barramento série em Python (compatível com hardware como a Waveshare); duas opções à escolha: Arduino + Feetech TTL Linker; código de exemplo em Python e Arduino; suporte a feedback como ativação do binário dos servos, sensor de posição e monitorização de temperatura.

- **Recursos completos**: lista de materiais (BOM) completa, ficheiros CAD e documentação online no Onshape, tutorial de montagem e scripts de calibração, exemplos de demonstração básicos e avançados, com suporte a cinemática inversa/direta.

- **Destaques do projeto**: compatível com pulsos de robôs como o Reachy2; design aberto e impulsionado pela comunidade; o roteiro futuro inclui sensoriamento tátil, juntas elásticas, dedos com comprimentos variados e uma solução de 5 dedos.



## Lista de tutoriais



| Conteúdo | Descrição |
|---|---|
| [Informações do produto](./product-info.md) | Parâmetros do produto, BOM, estrutura e descarregamento de materiais |
| [Instalação do kit de câmara ambiente](./Camera-Kit-Installation.md) | Passos de instalação do suporte do kit de câmara |
| [Reconhecimento de gestos na web](./AmazingHand-Web-Control.md) | Controlo online no navegador e implementação local |
| [Rastreamento de gestos (simulação MuJoCo)](./gesture-tracking/02-Windows.md) | Implementação e execução com um clique no Windows / Linux / Mac |
| [Tutorial de controlo de interface](./AmazingHand-Interface-Control.md) | Controlo por GUI Python / linha de comandos, calibração da mão esquerda e direita e protocolo |
| [Tutorial de utilização do Arduino Nano](./Arduino-Nano-Tutorial.md) | Ligação da placa Nano, instalação de bibliotecas e programa de demonstração |
| [Depuração e montagem de servo TTL via série](./AmazingHand-TTL-Debugging.md) | Montagem e depuração de servo TTL via porta série |
| [Depuração de servo PWM](./pwm-debugging/01-GUI-Visual-Control.md) | Visualização por GUI, rastreamento de gestos e manual de utilização |



## Descarregamentos de recursos



- [AmazingHand.zip](https://juxitech.feishu.cn/wiki/EoLawIK31i3xNNkVX8WcENGfn2d) — implementação do rastreamento de gestos com um clique (Windows / Linux / Mac)

- [SCS0009_ServoController.zip](https://juxitech.feishu.cn/wiki/Qp06wpL4HiALsMkWHsKchxvKnJc) — ferramenta de calibração dos servos Feetech SCS0009

- [Repositório oficial da AmazingHand](https://github.com/pollen-robotics/AmazingHand)
- [delivery_package.zip](/downloads/delivery_package.zip) — Pacote de entrega PWM（GUI / rastreamento de gestos / firmware / documentação）
- [Amazinghand-web.zip](/downloads/Amazinghand-web.zip) — Pacote de implementação local
- [Juxi_ServoController.zip](/downloads/Juxi_ServoController.zip) — Ferramenta de depuração de servos


### Todas as páginas

- [AmazingHand Mão hábil — Informações do produto](./product-info.md)
- [Instalação do kit de câmara ambiente](./Camera-Kit-Installation.md)
- [Controlo Web do AmazingHand](./AmazingHand-Web-Control.md)
- [Implementação e execução com um clique no Windows](./gesture-tracking/02-Windows.md)
- [Linux (Ubuntu) implementação e execução com um clique](./gesture-tracking/01-Ubuntu.md)
- [Mac implementação e execução com um clique](./gesture-tracking/03-macOS.md)
- [Tutorial do Exemplo Oficial da Mão Robótica](./AmazingHand-Official-Example.md)
- [Tutorial de controlo de interface](./AmazingHand-Interface-Control.md)
- [Tutorial de utilização do Arduino Nano](./Arduino-Nano-Tutorial.md)
- [Tutorial de Depuração da Mão Hábil (servo TTL)](./AmazingHand-TTL-Debugging.md)
- [01-Controlo visual por GUI](./pwm-debugging/01-GUI-Visual-Control.md)
- [02-Tutorial de rastreamento de gestos](./pwm-debugging/02-Gesture-Tracking.md)
- [03-Versão com servomotor PWM-Manual de utilização](./pwm-debugging/03-PWM-Servo-Manual.md)
- [04-Versão de servomotor série-Instruções de utilização](./pwm-debugging/04-Serial-Servo-Guide.md)
- [Tutorial completo](./pwm-debugging/05-Full-Workflow-Tutorial.md)


<RelatedProducts slugs="amazinghand" />

