---
title: "01. Utilização da câmara CSI"
description: "Utilize as teclas de seta para baixo para selecionar Configure Jetson 24pin CSI Connector. De seguida, prima …"
---

# 01. Utilização da câmara CSI

## 1. Configurar os pinos da câmara CSI

```Plain Text
sudo /opt/nvidia/jetson-io/jetson-io.py
```

![Imagem 1](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/1.png)

Utilize as teclas de seta para baixo para selecionar **Configure Jetson 24pin CSI Connector**. De seguida, prima Enter para avançar para a opção seguinte

![Imagem 2](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/2.png)

Selecione **Configure for compatible hardware** e, de seguida, prima Enter.

![Imagem 3](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/3.png)

Utilize as teclas de seta para baixo para selecionar **Camera IMX219 Dual** e, de seguida, prima Enter.

Se depois de reiniciar a pré-visualização da imagem da câmara apresentar erro ou ecrã preto, altere aqui para Camera IMX219-C

![Imagem 4](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/4.png)

Selecione **Save pin changes** e, de seguida, prima Enter.

![Imagem 5](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/5.png)

Utilize as teclas de seta para baixo para selecionar **Save and reboot to reconfigure pins** e, de seguida, prima Enter.

![Imagem 6](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/6.png)

Quando surgir a interface abaixo, prima diretamente a tecla Enter e a placa principal será reiniciada.

![Imagem 7](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/7.jpg)

## 2. Verificar os dispositivos de vídeo

```Plain Text
ls /dev/video*
```

O resultado da imagem corresponde a duas câmaras CSI ligadas: normalmente uma câmara CSI apresenta um dispositivo `video`

![Imagem 8](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/8.png)

## 3. Pré-visualizar a imagem da câmara

Introduza o comando abaixo no terminal e o sistema abrirá automaticamente a janela da imagem da câmara: por predefinição, abre o dispositivo `/dev/video0`

```Plain Text
nvgstcapture-1.0
```

![Imagem 9](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/9.png)

### 3.1. Especificar a câmara

Se houver várias câmaras, é possível especificar o ID da câmara:

```Plain Text
nvgstcapture-1.0 --sensor-id=1
```

![Imagem 10](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/10.png)

### 3.2. Especificar a resolução de pré-visualização

Se houver apenas uma câmara CSI, pode alterar `--sensor-id=1` para `--sensor-id=0`:

```Plain Text
nvgstcapture-1.0 --sensor-id=1 --cus-prev-res=1280x720
```

![Imagem 11](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/11.png)



