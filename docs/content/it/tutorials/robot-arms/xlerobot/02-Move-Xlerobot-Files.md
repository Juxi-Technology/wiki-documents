---
title: "Spostare i file XLeRobot"
description: "Scaricare ed estrarre l'archivio all'indirizzo https://github.com/Vector-Wangel/XLeRobot"
---

# Spostare i file XLeRobot

Scaricare ed estrarre l'archivio all'indirizzo https://github.com/Vector-Wangel/XLeRobot

oppure

```Bash
Git clone https://github.com/Vector-Wangel/XLeRobot
```

Copiare il risolutore di cinematica inversa analitica del robot SO101 presente in `~\XLeRobot\software\src\model文件夹` in
`~\lerobot\src\lerobot\model文件夹`

![Immagine 1](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/1.png)

![Immagine 2](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/2.png)

Copiare le cartelle sotto `~\XLeRobot\software\src\robots文件夹` in
`~\lerobot\src\lerobot\robot文件夹`

![Immagine 3](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/3.png)

![Immagine 4](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/4.png)

Nota

Se si desidera eseguire la build basandosi sul Raspberry Pi, rimuovere il commento da `xlerobot_host` e `xlerobot_client` in `~\lerobot\src\lerobot\robots\xlerobot__init__.py`.

Copiare le cartelle sotto `~\XLeRobot\software\src\teleporators文件夹` in
`~\lerobot\src\lerobot\teleporators文件夹`

![Immagine 5](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/5.png)

![Immagine 6](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/6.png)

Copiare tutti i file sotto `~\XLeRobot\software\examples文件夹` in
`~\lerobot\examples文件夹`

![Immagine 7](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/7.png)

![Immagine 8](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/8.png)



Tutorial https://xlerobot.readthedocs.io/zh-cn/latest/software/index.html

<RelatedProducts slugs="xlerobot" />
