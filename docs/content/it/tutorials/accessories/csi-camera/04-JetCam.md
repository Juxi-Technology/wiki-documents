---
title: "Uso di JetCam"
description: "Uso di JetCam"
---

# Uso di JetCam

Uso di JetCam

1. Installazione di JetCam

2. Uso di JetCam

2.1. Fotocamera CSI

Spiegazione del codice principale

Chiamata alla fotocamera

Ottenere l'immagine della fotocamera

2.1.1. Fotocamera singola

2.1.2. Fotocamere multiple

2.2. Fotocamera USB

Riferimenti



JetCam è una libreria Python facile da usare sviluppata da NVIDIA per la piattaforma Jetson, destinata a integrare e gestire fotocamere USB o fotocamere CSI

## 1. Installazione di JetCam

```Plain Text
git clone https://github.com/NVIDIA-AI-IOT/jetcam
cd jetcam
sudo python3 setup.py install
sudo pip3 install ipywidgets
```

## 2. Uso di JetCam

JetCam fornisce programmi di esempio tipici per mostrare all'utente la chiamata a fotocamere CSI e USB.

Gli esempi devono essere eseguiti con Jupyter Lab; utilizzando il nostro sistema di immagine di fabbrica, è possibile accedere direttamente tramite IP della scheda:8888!

### 2.1. Fotocamera CSI

Nell'interfaccia web di Jupyter Lab, accedere alla cartella in cui si trova la fotocamera CSI e aprire la cartella corrispondente:

`/home/jetson/jetcam/notebooks/csi_camera`

**Nota: se non si ha familiarità con Jupyter Lab, è possibile consultare il tutorial sull'uso di Jupyter Lab per conoscere le operazioni di base!**

#### Spiegazione del codice principale

##### Chiamata alla fotocamera

width: larghezza di output dell'immagine

height: altezza di output dell'immagine

`from jetcam.csi_camera import CSICamera`

`camera = CSICamera(width=224, height=224)`

##### Ottenere l'immagine della fotocamera

`image = camera.read()`

#### 2.1.1. Fotocamera singola

> **Percorso del codice sorgente**
> 
> 

`/home/jetson/jetcam/notebooks/csi_camera/csi_camera.ipynb`

> **Risultato dell'esecuzione**
> 
> 

Dopo aver aperto il file di programma, eseguire le singole celle dall'alto verso il basso:

![Immagine 1](../../../../../public/images/tutorials/accessories/csi-camera/04-JetCam/1.png)

#### 2.1.2. Fotocamere multiple

> **Percorso del codice sorgente**
> 
> 

`/home/jetson/jetcam/notebooks/csi_camera/multi_csi_camera.ipynb`

> **Risultato dell'esecuzione**
> 
> 

Dopo aver aperto il file di programma, eseguire le singole celle dall'alto verso il basso:

![Immagine 2](../../../../../public/images/tutorials/accessories/csi-camera/04-JetCam/2.png)

### 2.2. Fotocamera USB

In Jupyter Lab, accedere alla cartella in cui si trova la fotocamera USB e aprire il file; percorso della cartella nel sistema di immagine di fabbrica:

`/home/jetson/jetcam/notebooks/usb_camera`

![Immagine 3](../../../../../public/images/tutorials/accessories/csi-camera/04-JetCam/3.png)

## Riferimenti

[https://github.com/NVIDIA-AI-IOT/jetcam](https://github.com/NVIDIA-AI-IOT/jetcam)

<RelatedProducts slugs="imx219-csi-camera" />
