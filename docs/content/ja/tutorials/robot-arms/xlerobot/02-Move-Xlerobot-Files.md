---
title: "ステップ 2：Xlerobot ファイルの移動"
description: "https://github.com/Vector-Wangel/XLeRobot で圧縮ファイルをダウンロードして解凍します"
---

# ステップ 2：Xlerobot ファイルの移動

https://github.com/Vector-Wangel/XLeRobot で圧縮ファイルをダウンロードして解凍します

または

```Bash
Git clone https://github.com/Vector-Wangel/XLeRobot
```

`~\XLeRobot\software\src\model文件夹` にある SO101 ロボットの逆運動学解析ソルバーを、以下にコピーします
`~\lerobot\src\lerobot\model文件夹`

![図 1](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/1.png)

![図 2](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/2.png)

`~\XLeRobot\software\src\robots文件夹` にあるフォルダを、以下にコピーします
`~\lerobot\src\lerobot\robot文件夹`

![図 3](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/3.png)

![図 4](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/4.png)

備考

Raspberry Pi をベースに構築したい場合は、`~\lerobot\src\lerobot\robots\xlerobot__init__.py` 内で `xlerobot_host` と `xlerobot_client` のコメントを解除してください。

`~\XLeRobot\software\src\teleporators文件夹` にあるフォルダを、以下にコピーします
`~\lerobot\src\lerobot\teleporators文件夹`

![図 5](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/5.png)

![図 6](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/6.png)

`~\XLeRobot\software\examples文件夹` にあるファイルをすべて、以下の場所にコピーします
`~\lerobot\examples文件夹` 下

![図 7](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/7.png)

![図 8](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/8.png)



使用チュートリアルhttps://xlerobot.readthedocs.io/zh-cn/latest/software/index.html

<RelatedProducts slugs="xlerobot" />
