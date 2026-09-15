---
title: "02. Uso da câmera com foco automático"
description: "O resultado da imagem corresponde a duas câmeras CSI e uma câmera USB conectadas: normalmente uma câmera CSI …"
---

# 02. Uso da câmera com foco automático

## 1. Verificar os dispositivos de vídeo

```Plain Text
ls /dev/video*
```

O resultado da imagem corresponde a duas câmeras CSI e uma câmera USB conectadas: normalmente uma câmera CSI exibe um dispositivo `video`, e uma câmera USB exibe dois dispositivos `video`; para a câmera USB, escolha o `/dev/video2`, recém-adicionado e de número menor, para chamar (ao conectar a câmera USB, o sistema adiciona os números de dispositivo `/dev/video2` e `/dev/video3`)

![Imagem 1](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/1.png)

## 2. GUVCView

O GUVCView é um software de código aberto para o sistema Linux, usado para capturar e gravar vídeos e imagens, principalmente para webcams.

### 2.1. Instalação do GUVCView

```Plain Text
sudo apt update
sudo apt install guvcview -y
```

![Imagem 2](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/2.png)

### 2.2. Uso do GUVCView

No menu de aplicações, clique no ícone `guvcview`, ou digite o comando de inicialização no terminal: escolha a câmera USB, pois a câmera CSI não tem imagem de visualização

```Plain Text
guvcview
```

![Imagem 3](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/3.png)

![Imagem 4](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/4.png)

## 3. VLC

O VLC media player é um reprodutor multimídia livre e de código aberto, que suporta vários formatos de áudio e vídeo, além de DVD, CD de áudio, VCD e vários protocolos de streaming.

### 3.1. Instalação do VLC

```Plain Text
sudo apt update
sudo apt install vlc -y
```

![Imagem 5](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/5.png)

### 3.2. Uso do VLC

No menu de aplicações, clique no ícone `VLC media player`, ou digite o comando de inicialização no terminal: escolha a câmera USB, pois a câmera CSI não tem imagem de visualização

```Plain Text
vlc
```

![Imagem 6](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/6.png)

![Imagem 7](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/7.png)

Selecione o número de dispositivo correspondente à câmera USB:

![Imagem 8](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/8.png)

![Imagem 9](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/9.png)



