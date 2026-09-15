---
title: "Configuração da câmera CSI no Jetson"
description: "Use as setas para baixo para selecionar Configure Jetson 24pin CSI Connector. Em seguida, pressione Enter par…"
---

# Configuração da câmera CSI no Jetson

## 1. Configurar os pinos da câmera CSI

```Plain Text
sudo /opt/nvidia/jetson-io/jetson-io.py
```

![Imagem 1](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/1.png)

Use as setas para baixo para selecionar **Configure Jetson 24pin CSI Connector**. Em seguida, pressione Enter para entrar na próxima opção

![Imagem 2](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/2.png)

Selecione **Configure for compatible hardware** e, em seguida, pressione Enter.

![Imagem 3](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/3.png)

Use as setas para baixo para selecionar **Camera IMX219 Dual** e, em seguida, pressione Enter.

Se depois de reiniciar a visualização da imagem da câmera apresentar erro ou tela preta, altere aqui para Camera IMX219-C

![Imagem 4](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/4.png)

Selecione **Save pin changes** e, em seguida, pressione Enter.

![Imagem 5](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/5.png)

Use as setas para baixo para selecionar **Save and reboot to reconfigure pins** e, em seguida, pressione Enter.

![Imagem 6](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/6.png)

Quando a interface abaixo aparecer, pressione diretamente a tecla Enter e a placa-mãe será reiniciada.

![Imagem 7](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/7.jpg)

## 2. Verificar os dispositivos de vídeo

```Plain Text
ls /dev/video*
```

O resultado da imagem corresponde a duas câmeras CSI conectadas: normalmente uma câmera CSI exibe um dispositivo `video`

![Imagem 8](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/8.png)

## 3. Pré-visualizar a imagem da câmera

Digite o comando abaixo no terminal e o sistema abrirá automaticamente a janela da imagem da câmera: por padrão, abre o dispositivo `/dev/video0`

```Plain Text
nvgstcapture-1.0
```

![Imagem 9](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/9.png)

### 3.1. Especificar a câmera

Se houver várias câmeras, é possível especificar o ID da câmera:

```Plain Text
nvgstcapture-1.0 --sensor-id=1
```

![Imagem 10](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/10.png)

### 3.2. Especificar a resolução de pré-visualização

Se houver apenas uma câmera CSI, pode alterar `--sensor-id=1` para `--sensor-id=0`:

```Plain Text
nvgstcapture-1.0 --sensor-id=1 --cus-prev-res=1280x720
```

![Imagem 11](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/11.png)

<RelatedProducts slugs="imx219-csi-camera" />
