---
title: "Configurazione fotocamera CSI su Jetson"
description: "Configurazione della fotocamera CSI su NVIDIA Jetson: selezionare il connettore a 24 pin con lo strumento dedicato e verificare i dispositivi video."
---

# Configurazione fotocamera CSI su Jetson

## 1. Configurazione dei pin della fotocamera CSI

```Plain Text
sudo /opt/nvidia/jetson-io/jetson-io.py
```

![Immagine 1](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/1.png)

Premere il tasto freccia giù per selezionare **Configure Jetson 24pin CSI Connector**. Quindi premere Enter per passare all'opzione successiva

![Immagine 2](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/2.png)

Selezionare **Configure for compatible hardware**, quindi premere Enter.

![Immagine 3](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/3.png)

Premere il tasto freccia giù per selezionare **Camera IMX219 Dual**, quindi premere Enter.

Se dopo il riavvio la previsualizzazione della fotocamera mostra un errore o una schermata nera, modificare qui in Camera IMX219-C

![Immagine 4](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/4.png)

Selezionare **Save pin changes**, quindi premere Enter.

![Immagine 5](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/5.png)

Premere il tasto freccia giù per selezionare **Save and reboot to reconfigure pins**, quindi premere Enter.

![Immagine 6](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/6.png)

Quando appare la seguente schermata, premere direttamente il tasto Enter e la scheda si riavvierà.

![Immagine 7](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/7.jpg)

## 2. Visualizzare il dispositivo video

```Plain Text
ls /dev/video*
```

Il risultato dell'immagine corrisponde a due fotocamere CSI collegate: di norma una fotocamera CSI mostra un dispositivo `video`

![Immagine 8](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/8.png)

## 3. Anteprima dell'immagine della fotocamera

Digitare il seguente comando nel terminale e il sistema aprirà automaticamente la finestra dell'immagine della fotocamera: per impostazione predefinita apre il dispositivo `/dev/video0`

```Plain Text
nvgstcapture-1.0
```

![Immagine 9](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/9.png)

### 3.1. Specificare la fotocamera

Se sono presenti più fotocamere, è possibile specificare l'ID della fotocamera:

```Plain Text
nvgstcapture-1.0 --sensor-id=1
```

![Immagine 10](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/10.png)

### 3.2. Specificare la risoluzione di anteprima

Se è presente una sola fotocamera CSI, è possibile cambiare `--sensor-id=1` in `--sensor-id=0`:

```Plain Text
nvgstcapture-1.0 --sensor-id=1 --cus-prev-res=1280x720
```

![Immagine 11](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/11.png)

<RelatedProducts slugs="imx219-csi-camera" />
