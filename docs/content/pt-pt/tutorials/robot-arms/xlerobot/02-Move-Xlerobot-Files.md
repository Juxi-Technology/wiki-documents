---
title: "Mover ficheiros do XLeRobot"
description: "Mova os ficheiros do XLeRobot para o repositório LeRobot: cinemática inversa, robôs, teleoperadores e exemplos, com nota para o Raspberry Pi."
---

# Mover ficheiros do XLeRobot

Transfira e descomprima o pacote comprimido em https://github.com/Vector-Wangel/XLeRobot

Ou

```Bash
Git clone https://github.com/Vector-Wangel/XLeRobot
```

Copie o solucionador de cinemática inversa analítica do robô SO101 em `~\XLeRobot\software\src\model文件夹` para
`~\lerobot\src\lerobot\model文件夹`

![Imagem 1](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/1.png)

![Imagem 2](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/2.png)

Copie as pastas em `~\XLeRobot\software\src\robots文件夹` para
`~\lerobot\src\lerobot\robot文件夹`

![Imagem 3](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/3.png)

![Imagem 4](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/4.png)

Nota

Se pretender construir com base no Raspberry Pi, descomente `xlerobot_host` e `xlerobot_client` em `~\lerobot\src\lerobot\robots\xlerobot__init__.py`.

Copie as pastas em `~\XLeRobot\software\src\teleporators文件夹` para
`~\lerobot\src\lerobot\teleporators文件夹`

![Imagem 5](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/5.png)

![Imagem 6](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/6.png)

Copie todos os ficheiros em `~\XLeRobot\software\examples文件夹` para
`~\lerobot\examples文件夹`

![Imagem 7](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/7.png)

![Imagem 8](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/8.png)



Tutorial de utilização https://xlerobot.readthedocs.io/zh-cn/latest/software/index.html

<RelatedProducts slugs="xlerobot" />
