---
title: "Schritt 2: Die Xlerobot-Dateien verschieben"
description: "Laden Sie unter https://github.com/Vector-Wangel/XLeRobot das komprimierte Paket herunter und entpacken Sie es"
---

# Schritt 2: Die Xlerobot-Dateien verschieben

Laden Sie unter https://github.com/Vector-Wangel/XLeRobot das komprimierte Paket herunter und entpacken Sie es

oder

```Bash
Git clone https://github.com/Vector-Wangel/XLeRobot
```

Kopieren Sie den analytischen Inverse-Kinematik-Löser des SO101-Roboters unter `~\XLeRobot\software\src\model文件夹` nach
`~\lerobot\src\lerobot\model文件夹`

![Abb. 1](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/1.png)

![Abb. 2](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/2.png)

Kopieren Sie die Ordner unter `~\XLeRobot\software\src\robots文件夹` nach
`~\lerobot\src\lerobot\robot文件夹`

![Abb. 3](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/3.png)

![Abb. 4](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/4.png)

Hinweis

Wenn Sie auf Basis des Raspberry Pi bauen möchten, heben Sie in `~\lerobot\src\lerobot\robots\xlerobot__init__.py` die Auskommentierung von `xlerobot_host` und `xlerobot_client` auf.

Kopieren Sie die Ordner unter `~\XLeRobot\software\src\teleporators文件夹` nach
`~\lerobot\src\lerobot\teleporators文件夹`

![Abb. 5](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/5.png)

![Abb. 6](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/6.png)

Kopieren Sie alle Dateien unter `~\XLeRobot\software\examples文件夹` nach
`~\lerobot\examples文件夹`

![Abb. 7](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/7.png)

![Abb. 8](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/8.png)



Tutorial https://xlerobot.readthedocs.io/zh-cn/latest/software/index.html



