---
title: "05、IMX219-CSI-Kamera (Raspberry Pi) Anleitung"
description: "Wenn nicht, liegt möglicherweise ein Problem mit dem Kernel oder der Gerätehardware vor; versuchen Sie, das S…"
---

# 05、IMX219-CSI-Kamera (Raspberry Pi) Anleitung

##### 1、Verwenden Sie zunächst den Befehl "ls", um zu prüfen, ob ein vchiq-Geräteknoten vorhanden ist: geben Sie ls /dev ein

![Abb. 1](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/1.png)

Wenn nicht, liegt möglicherweise ein Problem mit dem Kernel oder der Gerätehardware vor; versuchen Sie, das System neu zu flashen oder die Hardware auszutauschen.

##### 2、Führen Sie den Befehl "sudo raspi-config" aus, um die CSI-Kamera des Raspberry Pi zu aktivieren

![Abb. 2](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/2.png)

![Abb. 3](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/3.png)

![Abb. 4](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/4.png)

![Abb. 5](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/5.png)

Beenden Sie dann und geben Sie den Befehl sudo reboot ein, um den Raspberry Pi neu zu starten

##### 3、Geben Sie "vcgencmd get_camera" ein, um zu prüfen, ob die aktuelle Kamera und deren Aktivierung verfügbar sind

![Abb. 6](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/6.png)

Wenn detected=0, ist das Kameramodul nicht richtig angeschlossen; überprüfen Sie die Hardware erneut. detected=1 bedeutet, dass die CSI-Kamera korrekt angeschlossen ist. supported=1 bedeutet, dass die Kamera aktiviert ist und verwendet werden kann. supported=0 bedeutet, dass die CSI-Kamera nicht aktiviert ist und das Kameramodul aktiviert werden muss.

## **3.Verwenden Sie den rapistill-Befehl, um ein Foto aufzunehmen**

Geben Sie **"raspistill -o image.jpg"** ein, um erfolgreich ein Foto aufzunehmen und zu speichern; dabei leuchtet die Kamera rot. Weitere Parameter finden Sie mit raspistill --help

![Abb. 7](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/7.png)

Übertragen Sie das Bild image.jpg auf den Windows-Desktop und öffnen Sie es, um das Ergebnis der Aufnahme zu sehen



