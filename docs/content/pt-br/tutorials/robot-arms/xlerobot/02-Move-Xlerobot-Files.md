---
title: "Mover arquivos do XLeRobot"
description: "Baixe e descompacte o pacote compactado em https://github.com/Vector-Wangel/XLeRobot"
---

# Mover arquivos do XLeRobot

Baixe e descompacte o pacote compactado em https://github.com/Vector-Wangel/XLeRobot

ou

```Bash
Git clone https://github.com/Vector-Wangel/XLeRobot
```

Copie o solucionador de cinemática inversa do robô SO101 de `~\XLeRobot\software\src\model文件夹` para
`~\lerobot\src\lerobot\model文件夹`

![Imagem 1](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/1.png)

![Imagem 2](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/2.png)

Copie a pasta em `~\XLeRobot\software\src\robots文件夹` para
`~\lerobot\src\lerobot\robot文件夹`

![Imagem 3](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/3.png)

![Imagem 4](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/4.png)

Observação

Se você quiser construir com base no Raspberry Pi, descomente `xlerobot_host` e `xlerobot_client` em `~\lerobot\src\lerobot\robots\xlerobot__init__.py`.

Copie a pasta em `~\XLeRobot\software\src\teleporators文件夹` para
`~\lerobot\src\lerobot\teleporators文件夹`

![Imagem 5](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/5.png)

![Imagem 6](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/6.png)

Copie todos os arquivos em `~\XLeRobot\software\examples文件夹` para
`~\lerobot\examples文件夹`

![Imagem 7](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/7.png)

![Imagem 8](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/8.png)



Tutorial de uso https://xlerobot.readthedocs.io/zh-cn/latest/software/index.html

<RelatedProducts slugs="xlerobot" />
