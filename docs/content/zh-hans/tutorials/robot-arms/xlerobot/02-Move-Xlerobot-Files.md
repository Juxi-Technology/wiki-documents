---
title: "移动 XLeRobot 文件"
description: "XLeRobot 文件部署教程：将软件仓库中的模型、机器人、遥操作与示例文件复制到 LeRobot 目录下的步骤。"
---

# 移动 XLeRobot 文件

在 [https://github.com/Vector-Wangel/XLeRobot](https://github.com/Vector-Wangel/XLeRobot) 下载压缩包解压

或者

```Bash
Git clone https://github.com/Vector-Wangel/XLeRobot
```

将`~\XLeRobot\software\src\model文件夹`下的SO101机器人解析逆运动学求解器复制到
`~\lerobot\src\lerobot\model文件夹`

![图 1](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/1.png)

![图 2](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/2.png)

将`~\XLeRobot\software\src\robots文件夹`下的文件夹复制到
`~\lerobot\src\lerobot\robot文件夹`

![图 3](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/3.png)

![图 4](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/4.png)

备注

如果您想基于树莓派构建，请在`~\lerobot\src\lerobot\robots\xlerobot__init__.py`中取消注释`xlerobot_host`和`xlerobot_client`。

将`~\XLeRobot\software\src\teleporators文件夹`下的文件夹复制到
`~\lerobot\src\lerobot\teleporators文件夹`

![图 5](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/5.png)

![图 6](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/6.png)

将`~\XLeRobot\software\examples文件夹`下的文件都复制到
`~\lerobot\examples文件夹`下

![图 7](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/7.png)

![图 8](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/8.png)



使用教程https://xlerobot.readthedocs.io/zh-cn/latest/software/index.html

<RelatedProducts slugs="xlerobot" />
