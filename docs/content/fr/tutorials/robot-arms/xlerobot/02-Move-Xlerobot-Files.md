---
title: "Déplacer les fichiers XLeRobot"
description: "Téléchargez et extrayez l'archive à l'adresse https://github.com/Vector-Wangel/XLeRobot"
---

# Déplacer les fichiers XLeRobot

Téléchargez et extrayez l'archive à l'adresse https://github.com/Vector-Wangel/XLeRobot

ou

```Bash
Git clone https://github.com/Vector-Wangel/XLeRobot
```

Copiez le solveur de cinématique inverse analytique du robot SO101 situé sous `~\XLeRobot\software\src\model文件夹` vers
`~\lerobot\src\lerobot\model文件夹`

![Image 1](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/1.png)

![Image 2](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/2.png)

Copiez les dossiers situés sous `~\XLeRobot\software\src\robots文件夹` vers
`~\lerobot\src\lerobot\robot文件夹`

![Image 3](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/3.png)

![Image 4](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/4.png)

Remarque

Si vous souhaitez effectuer une construction basée sur le Raspberry Pi, décommentez `xlerobot_host` et `xlerobot_client` dans `~\lerobot\src\lerobot\robots\xlerobot__init__.py`.

Copiez les dossiers situés sous `~\XLeRobot\software\src\teleporators文件夹` vers
`~\lerobot\src\lerobot\teleporators文件夹`

![Image 5](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/5.png)

![Image 6](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/6.png)

Copiez tous les fichiers situés sous `~\XLeRobot\software\examples文件夹` vers
`~\lerobot\examples文件夹`

![Image 7](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/7.png)

![Image 8](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/8.png)



Tutoriel https://xlerobot.readthedocs.io/zh-cn/latest/software/index.html

<RelatedProducts slugs="xlerobot" />
