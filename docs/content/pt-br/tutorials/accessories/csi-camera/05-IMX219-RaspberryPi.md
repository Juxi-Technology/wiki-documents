---
title: "IMX219 no Raspberry Pi"
description: "Se não existir, pode ser que haja um problema no kernel ou no hardware do dispositivo; pode tentar reinstalar…"
---

# IMX219 no Raspberry Pi

##### 1. Primeiro, use a instrução "ls" para verificar se existe o nó de dispositivo vchiq: insira ls /dev

![Imagem 1](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/1.png)

Se não existir, pode ser que haja um problema no kernel ou no hardware do dispositivo; pode tentar reinstalar o sistema ou substituir o hardware.

##### 2. Execute o comando "sudo raspi-config" para habilitar a câmera CSI do Raspberry Pi

![Imagem 2](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/2.png)

![Imagem 3](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/3.png)

![Imagem 4](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/4.png)

![Imagem 5](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/5.png)

Depois saia e insira o comando sudo reboot para reiniciar o Raspberry Pi

##### 3. Insira "vcgencmd get_camera" para verificar se a câmera atual e a habilitação estão disponíveis

![Imagem 6](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/6.png)

Se detected=0, significa que o módulo da câmera não está bem conectado; verifique novamente o hardware. detected=1 significa que a câmera CSI está conectada corretamente. supported=1 significa que a câmera já está habilitada e pode ser usada. supported=0 significa que a câmera CSI não está habilitada e é necessário habilitar o módulo da câmera.

## **3. Tirar fotos com o comando rapistill**

Insira **"raspistill -o image.jpg"** e você conseguirá tirar e salvar a foto com sucesso; nesse momento a câmera acenderá uma luz vermelha. Para mais parâmetros, use raspistill --help

![Imagem 7](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/7.png)

Transfira a imagem image.jpg para a área de trabalho do Windows e abra-a para ver o efeito da foto tirada

<RelatedProducts slugs="imx219-csi-camera" />
