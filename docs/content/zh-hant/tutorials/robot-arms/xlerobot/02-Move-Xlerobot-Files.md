---
title: "移動 XLeRobot 文件"
description: "在https://github.com/Vector-Wangel/XLeRobot下載壓縮包解壓"
---

# 移動 XLeRobot 文件

在https://github.com/Vector-Wangel/XLeRobot下載壓縮包解壓

或者

```Bash
Git clone https://github.com/Vector-Wangel/XLeRobot
```

將`~\XLeRobot\software\src\model文件夹`下的SO101機器人解析逆運動學求解器複製到
`~\lerobot\src\lerobot\model文件夹`

![圖 1](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/1.png)

![圖 2](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/2.png)

將`~\XLeRobot\software\src\robots文件夹`下的資料夾複製到
`~\lerobot\src\lerobot\robot文件夹`

![圖 3](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/3.png)

![圖 4](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/4.png)

備註

如果您想基於Raspberry Pi構建，請在`~\lerobot\src\lerobot\robots\xlerobot__init__.py`中取消註解`xlerobot_host`和`xlerobot_client`。

將`~\XLeRobot\software\src\teleporators文件夹`下的資料夾複製到
`~\lerobot\src\lerobot\teleporators文件夹`

![圖 5](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/5.png)

![圖 6](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/6.png)

將`~\XLeRobot\software\examples文件夹`下的檔案都複製到
`~\lerobot\examples文件夹`下

![圖 7](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/7.png)

![圖 8](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/8.png)



使用教學https://xlerobot.readthedocs.io/zh-cn/latest/software/index.html

<RelatedProducts slugs="xlerobot" />
