---
title: "Uso do JetCam"
description: "Utilização do JetCam"
---

# Uso do JetCam

Utilização do JetCam

1. Instalação do JetCam

2. Utilização do JetCam

2.1. Câmara CSI

Explicação do código principal

Chamar a câmara

Obter a imagem da câmara

2.1.1. Câmara única

2.1.2. Várias câmaras

2.2. Câmara USB

Referências



JetCam é uma biblioteca Python de fácil uso desenvolvida pela NVIDIA para a plataforma Jetson, usada para integrar e operar câmaras USB ou câmaras CSI

## 1. Instalação do JetCam

```Plain Text
git clone https://github.com/NVIDIA-AI-IOT/jetcam
cd jetcam
sudo python3 setup.py install
sudo pip3 install ipywidgets
```

## 2. Utilização do JetCam

O JetCam fornece programas de exemplo típicos para demonstrar ao utilizador a chamada das câmaras CSI e USB.

Os exemplos precisam de ser executados com o Jupyter Lab; utilizando o nosso sistema de imagem de fábrica, é possível aceder diretamente através de IP da placa:8888!

### 2.1. Câmara CSI

No Jupyter Lab (interface web), entre na pasta onde está a câmara CSI e abra a pasta correspondente:

`/home/jetson/jetcam/notebooks/csi_camera`

**Atenção: quem não estiver familiarizado com o Jupyter Lab pode consultar o tutorial de utilização do Jupyter Lab para conhecer as operações básicas!**

#### Explicação do código principal

##### Chamar a câmara

width: largura de saída da imagem

height: altura de saída da imagem

`from jetcam.csi_camera import CSICamera`

`camera = CSICamera(width=224, height=224)`

##### Obter a imagem da câmara

`image = camera.read()`

#### 2.1.1. Câmara única

> **Caminho do código-fonte**
> 
> 

`/home/jetson/jetcam/notebooks/csi_camera/csi_camera.ipynb`

> **Comportamento em execução**
> 
> 

Após abrir o ficheiro do programa, execute as células uma a uma, de cima para baixo:

![Imagem 1](../../../../../public/images/tutorials/accessories/csi-camera/04-JetCam/1.png)

#### 2.1.2. Várias câmaras

> **Caminho do código-fonte**
> 
> 

`/home/jetson/jetcam/notebooks/csi_camera/multi_csi_camera.ipynb`

> **Comportamento em execução**
> 
> 

Após abrir o ficheiro do programa, execute as células uma a uma, de cima para baixo:

![Imagem 2](../../../../../public/images/tutorials/accessories/csi-camera/04-JetCam/2.png)

### 2.2. Câmara USB

No Jupyter Lab, entre na pasta onde está a câmara USB e abra o ficheiro; caminho da pasta no sistema de imagem de fábrica:

`/home/jetson/jetcam/notebooks/usb_camera`

![Imagem 3](../../../../../public/images/tutorials/accessories/csi-camera/04-JetCam/3.png)

## Referências

[https://github.com/NVIDIA-AI-IOT/jetcam](https://github.com/NVIDIA-AI-IOT/jetcam)

<RelatedProducts slugs="imx219-csi-camera" />
