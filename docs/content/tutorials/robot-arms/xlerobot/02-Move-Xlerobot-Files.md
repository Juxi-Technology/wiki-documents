---
title: "Step 2: Move the Xlerobot Files"
description: "Download and extract the archive at https://github.com/Vector-Wangel/XLeRobot"
---

# Step 2: Move the Xlerobot Files

Download and extract the archive at https://github.com/Vector-Wangel/XLeRobot

or

```Bash
Git clone https://github.com/Vector-Wangel/XLeRobot
```

Copy the SO101 robot analytical inverse kinematics solver under `~\XLeRobot\software\src\model文件夹` to
`~\lerobot\src\lerobot\model文件夹`

![Image 1](../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/1.png)

![Image 2](../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/2.png)

Copy the folders under `~\XLeRobot\software\src\robots文件夹` to
`~\lerobot\src\lerobot\robot文件夹`

![Image 3](../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/3.png)

![Image 4](../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/4.png)

Note

If you want to build based on the Raspberry Pi, uncomment `xlerobot_host` and `xlerobot_client` in `~\lerobot\src\lerobot\robots\xlerobot__init__.py`.

Copy the folders under `~\XLeRobot\software\src\teleporators文件夹` to
`~\lerobot\src\lerobot\teleporators文件夹`

![Image 5](../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/5.png)

![Image 6](../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/6.png)

Copy all the files under `~\XLeRobot\software\examples文件夹` into
`~\lerobot\examples文件夹`

![Image 7](../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/7.png)

![Image 8](../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/8.png)



Tutorial https://xlerobot.readthedocs.io/zh-cn/latest/software/index.html



