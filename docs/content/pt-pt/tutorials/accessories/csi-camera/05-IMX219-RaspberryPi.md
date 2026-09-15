---
title: "IMX219 no Raspberry Pi"
description: "Ative e teste a câmara CSI IMX219 no Raspberry Pi: nó de dispositivo, ativação no raspi-config e captura de fotografias com o raspistill."
---

# IMX219 no Raspberry Pi

##### 1. Primeiro, utilize a instrução "ls" para verificar se existe o nó de dispositivo vchiq: introduza ls /dev

![Imagem 1](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/1.png)

Se não existir, pode ser que haja um problema no kernel ou no hardware do dispositivo; pode tentar reinstalar o sistema ou substituir o hardware.

##### 2. Execute o comando "sudo raspi-config" para ativar a câmara CSI do Raspberry Pi

![Imagem 2](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/2.png)

![Imagem 3](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/3.png)

![Imagem 4](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/4.png)

![Imagem 5](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/5.png)

Depois saia e introduza o comando sudo reboot para reiniciar o Raspberry Pi

##### 3. Introduza "vcgencmd get_camera" para verificar se a câmara atual e a ativação estão disponíveis

![Imagem 6](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/6.png)

Se detected=0, significa que o módulo da câmara não está bem ligado; verifique novamente o hardware. detected=1 significa que a câmara CSI está ligada corretamente. supported=1 significa que a câmara já está ativada e pode ser utilizada. supported=0 significa que a câmara CSI não está ativada e é necessário ativar o módulo da câmara.

## **3. Tirar fotografias com o comando rapistill**

Introduza **"raspistill -o image.jpg"** e conseguirá tirar e guardar a fotografia com sucesso; nesse momento a câmara acenderá uma luz vermelha. Para mais parâmetros, utilize raspistill --help

![Imagem 7](../../../../../public/images/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi/7.png)

Transfira a imagem image.jpg para o ambiente de trabalho do Windows e abra-a para ver o efeito da fotografia tirada

<RelatedProducts slugs="imx219-csi-camera" />
