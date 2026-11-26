---
title: "Calibração dos braços robóticos"
description: "Calibração XLeRobot dos dois braços e da cabeça: comandos lerobot-calibrate para Windows / macOS / Linux, posição central, verificação de limites e validação dos braços esquerdo/direito."
---

# Calibração dos braços robóticos

![Procedimento de calibração dos dois braços e da cabeça](/images/tutorials/robot-arms/xlerobot/05-calibration/01.png)

## Procedimento de calibração dos dois braços e da cabeça

> Execute o comando do seu sistema operacional. `port1` é a placa de controle do braço esquerdo e `port2` a do braço direito; confirme antes as portas reais com `lerobot-find-port`.
>
> No Linux, liste as portas rapidamente com `ls /dev/ttyACM*`.

**Windows**

```bash
lerobot-calibrate \
    --robot.type=xlerobot --robot.id=juxi_xlerobot \
    --robot.port1=COM3 \
    --robot.port2=COM4
```

**macOS**

```bash
lerobot-calibrate \
    --robot.type=xlerobot --robot.id=juxi_xlerobot \
    --robot.port1=/dev/tty.usbmodem58546521551 \
    --robot.port2=/dev/tty.usbmodem58546521552
```

**Linux**

```bash
lerobot-calibrate \
    --robot.type=xlerobot --robot.id=juxi_xlerobot \
    --robot.port1=/dev/ttyACM0 \
    --robot.port2=/dev/ttyACM1
```

Após iniciar o comando de calibração, o terminal pede primeiro Middle Position. Coloque os braços na posição central — garra móvel para cima, garra fixa para baixo — e pressione Enter. Em seguida, mova cada junta até os limites máximo e mínimo.

> Antes de pressionar Enter para iniciar a calibração, coloque o braço robótico na posição central: cada junta no centro da sua faixa utilizável.
>
> Observe os valores mínimo e máximo de cada junta. Se um mínimo ultrapassar 0 e começar a diminuir a partir de 4095, ou um máximo ultrapassar 4095 e começar a aumentar a partir de 0, faça uma calibração de posição central com o software de PC da Feetech e calibre o braço robótico novamente.

Os dois servos da torre de câmera funcionam da mesma forma: gire cada um uma vez até os limites máximo e mínimo.

Quando a linha a seguir aparecer, começa a calibração do braço esquerdo e da cabeça:

![Procedimento de calibração dos dois braços e da cabeça](/images/tutorials/robot-arms/xlerobot/05-calibration/02.png)

![Procedimento de calibração dos dois braços e da cabeça](/images/tutorials/robot-arms/xlerobot/05-calibration/03.png)

Quando a linha a seguir aparecer, começa a calibração do braço direito. As rodas da base não precisam de calibração.

![Procedimento de calibração dos dois braços e da cabeça](/images/tutorials/robot-arms/xlerobot/05-calibration/04.png)

![Procedimento de calibração dos dois braços e da cabeça](/images/tutorials/robot-arms/xlerobot/05-calibration/05.png)
