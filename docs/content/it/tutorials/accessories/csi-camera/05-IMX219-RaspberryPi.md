---
title: "IMX219 su Raspberry Pi"
description: "Fotocamera IMX219 su Raspberry Pi: verificare il nodo del dispositivo, abilitare la fotocamera CSI, scattare foto e risolvere i problemi di rilevamento."
---

# IMX219 su Raspberry Pi

##### 1. Innanzitutto, utilizzare il comando "ls" per verificare se esiste il nodo di dispositivo vchiq: digitare ls /dev

![Immagine 1](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/1.png)

Se non esiste, potrebbe trattarsi di un problema del kernel o dell'hardware del dispositivo; è possibile provare a riscrivere il sistema o a sostituire l'hardware.

##### 2. Eseguire il comando "sudo raspi-config" per abilitare la fotocamera CSI del Raspberry Pi

![Immagine 2](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/2.png)

![Immagine 3](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/3.png)

![Immagine 4](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/4.png)

![Immagine 5](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/5.png)

Quindi uscire e digitare il comando sudo reboot per riavviare il Raspberry Pi

##### 3. Digitare "vcgencmd get_camera" per verificare se la fotocamera attuale e la sua abilitazione sono disponibili

![Immagine 6](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/6.png)

Se detected=0, significa che il modulo fotocamera non è collegato correttamente; controllare nuovamente l'hardware. detected=1 indica che la fotocamera CSI è collegata correttamente. supported=1 indica che la fotocamera è già abilitata e può essere utilizzata. supported=0 indica che la fotocamera CSI non è abilitata ed è necessario abilitare il modulo fotocamera.

## **3. Scattare foto con il comando rapistill**

Digitare **"raspistill -o image.jpg"** per scattare e salvare la foto correttamente; in quel momento la fotocamera accende una luce rossa. Per ulteriori parametri, utilizzare raspistill --help

![Immagine 7](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/7.png)

Trasferire l'immagine image.jpg sul desktop di Windows e aprirla per vedere il risultato della foto

<RelatedProducts slugs="imx219-csi-camera" />
