---
title: "Paso 2: Mover los archivos de Xlerobot"
description: "Descargue y descomprima el paquete comprimido desde https://github.com/Vector-Wangel/XLeRobot"
---

# Paso 2: Mover los archivos de Xlerobot

Descargue y descomprima el paquete comprimido desde https://github.com/Vector-Wangel/XLeRobot

o

```Bash
Git clone https://github.com/Vector-Wangel/XLeRobot
```

Copie el solucionador de cinemática inversa analítica del robot SO101 que se encuentra en `~\XLeRobot\software\src\model文件夹` a
`~\lerobot\src\lerobot\model文件夹`

![Imagen 1](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/1.png)

![Imagen 2](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/2.png)

Copie las carpetas que se encuentran en `~\XLeRobot\software\src\robots文件夹` a
`~\lerobot\src\lerobot\robot文件夹`

![Imagen 3](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/3.png)

![Imagen 4](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/4.png)

Nota

Si desea crear la build basándose en la Raspberry Pi, descomente `xlerobot_host` y `xlerobot_client` en `~\lerobot\src\lerobot\robots\xlerobot__init__.py`.

Copie las carpetas que se encuentran en `~\XLeRobot\software\src\teleporators文件夹` a
`~\lerobot\src\lerobot\teleporators文件夹`

![Imagen 5](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/5.png)

![Imagen 6](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/6.png)

Copie todos los archivos que se encuentran en `~\XLeRobot\software\examples文件夹` a
`~\lerobot\examples文件夹`

![Imagen 7](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/7.png)

![Imagen 8](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/8.png)



Tutorial https://xlerobot.readthedocs.io/zh-cn/latest/software/index.html

<RelatedProducts slugs="xlerobot" />
