---
title: "Uso do JetCam"
description: "Uso da biblioteca JetCam da NVIDIA no Jetson — captura com câmera CSI (uma ou várias) e câmera USB em Python, com explicação do código principal."
---

# Uso do JetCam

Uso do JetCam

1. Instalação do JetCam

2. Uso do JetCam

2.1. Câmera CSI

Explicação do código principal

Chamar a câmera

Obter a imagem da câmera

2.1.1. Câmera única

2.1.2. Várias câmeras

2.2. Câmera USB

Referências



JetCam é uma biblioteca Python de fácil uso desenvolvida pela NVIDIA para a plataforma Jetson, usada para integrar e operar câmeras USB ou câmeras CSI

## 1. Instalação do JetCam

```Plain Text
git clone https://github.com/NVIDIA-AI-IOT/jetcam
cd jetcam
sudo python3 setup.py install
sudo pip3 install ipywidgets
```

## 2. Uso do JetCam

O JetCam fornece programas de exemplo típicos para demonstrar ao usuário a chamada das câmeras CSI e USB.

Os exemplos precisam ser executados com o Jupyter Lab; usando o nosso sistema de imagem de fábrica, é possível acessar diretamente através de IP da placa-mãe:8888!

### 2.1. Câmera CSI

No Jupyter Lab (interface web), entre na pasta onde está a câmera CSI e abra a pasta correspondente:

`/home/jetson/jetcam/notebooks/csi_camera`

**Atenção: quem não estiver familiarizado com o Jupyter Lab pode consultar o tutorial de uso do Jupyter Lab para conhecer as operações básicas!**

#### Explicação do código principal

##### Chamar a câmera

width: largura de saída da imagem

height: altura de saída da imagem

`from jetcam.csi_camera import CSICamera`

`camera = CSICamera(width=224, height=224)`

##### Obter a imagem da câmera

`image = camera.read()`

#### 2.1.1. Câmera única

> **Caminho do código-fonte**
> 
> 

`/home/jetson/jetcam/notebooks/csi_camera/csi_camera.ipynb`

> **Comportamento em execução**
> 
> 

Após abrir o arquivo do programa, execute as células uma a uma, de cima para baixo:

![Imagem 1](../../../../../public/images/tutorials/accessories/csi-camera/04-JetCam/1.png)

#### 2.1.2. Várias câmeras

> **Caminho do código-fonte**
> 
> 

`/home/jetson/jetcam/notebooks/csi_camera/multi_csi_camera.ipynb`

> **Comportamento em execução**
> 
> 

Após abrir o arquivo do programa, execute as células uma a uma, de cima para baixo:

![Imagem 2](../../../../../public/images/tutorials/accessories/csi-camera/04-JetCam/2.png)

### 2.2. Câmera USB

No Jupyter Lab, entre na pasta onde está a câmera USB e abra o arquivo; caminho da pasta no sistema de imagem de fábrica:

`/home/jetson/jetcam/notebooks/usb_camera`

![Imagem 3](../../../../../public/images/tutorials/accessories/csi-camera/04-JetCam/3.png)

## Referências

[https://github.com/NVIDIA-AI-IOT/jetcam](https://github.com/NVIDIA-AI-IOT/jetcam)

<RelatedProducts slugs="imx219-csi-camera" />
