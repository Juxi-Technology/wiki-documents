---
title: "02. Utilização da câmara com foco automático"
description: "O resultado da imagem corresponde a duas câmaras CSI e uma câmara USB ligadas: normalmente uma câmara CSI apr…"
---

# 02. Utilização da câmara com foco automático

## 1. Verificar os dispositivos de vídeo

```Plain Text
ls /dev/video*
```

O resultado da imagem corresponde a duas câmaras CSI e uma câmara USB ligadas: normalmente uma câmara CSI apresenta um dispositivo `video`, e uma câmara USB apresenta dois dispositivos `video`; para a câmara USB, escolha o `/dev/video2`, recém-adicionado e de número menor, para chamar (ao ligar a câmara USB, o sistema adiciona os números de dispositivo `/dev/video2` e `/dev/video3`)

![Imagem 1](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/1.png)

## 2. GUVCView

O GUVCView é um software de código aberto para o sistema Linux, usado para capturar e gravar vídeos e imagens, principalmente para webcams.

### 2.1. Instalação do GUVCView

```Plain Text
sudo apt update
sudo apt install guvcview -y
```

![Imagem 2](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/2.png)

### 2.2. Utilização do GUVCView

No menu de aplicações, clique no ícone `guvcview`, ou introduza o comando de arranque no terminal: escolha a câmara USB, pois a câmara CSI não tem imagem de pré-visualização

```Plain Text
guvcview
```

![Imagem 3](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/3.png)

![Imagem 4](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/4.png)

## 3. VLC

O VLC media player é um reprodutor multimédia livre e de código aberto, que suporta vários formatos de áudio e vídeo, além de DVD, CD de áudio, VCD e vários protocolos de streaming.

### 3.1. Instalação do VLC

```Plain Text
sudo apt update
sudo apt install vlc -y
```

![Imagem 5](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/5.png)

### 3.2. Utilização do VLC

No menu de aplicações, clique no ícone `VLC media player`, ou introduza o comando de arranque no terminal: escolha a câmara USB, pois a câmara CSI não tem imagem de pré-visualização

```Plain Text
vlc
```

![Imagem 6](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/6.png)

![Imagem 7](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/7.png)

Selecione o número de dispositivo correspondente à câmara USB:

![Imagem 8](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/8.png)

![Imagem 9](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/9.png)



