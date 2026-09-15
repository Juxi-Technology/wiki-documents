---
title: "XLeRobot 파일 이동"
description: "XLeRobot 파일 이동 단계 — XLeRobot 저장소의 SO101 해석적 역기구학 솔버 파일을 LeRobot 프로젝트 폴더로 복사하는 방법."
---

# XLeRobot 파일 이동

https://github.com/Vector-Wangel/XLeRobot 에서 압축 파일을 다운로드하여 압축을 해제합니다

또는

```Bash
Git clone https://github.com/Vector-Wangel/XLeRobot
```

`~\XLeRobot\software\src\model文件夹` 아래의 SO101 로봇 해석적 역기구학 솔버를
`~\lerobot\src\lerobot\model文件夹` 로 복사합니다

![그림 1](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/1.png)

![그림 2](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/2.png)

`~\XLeRobot\software\src\robots文件夹` 아래의 폴더를
`~\lerobot\src\lerobot\robot文件夹` 로 복사합니다

![그림 3](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/3.png)

![그림 4](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/4.png)

참고

Raspberry Pi 기반으로 구축하려면 `~\lerobot\src\lerobot\robots\xlerobot__init__.py` 에서 `xlerobot_host` 와 `xlerobot_client` 의 주석을 해제하십시오.

`~\XLeRobot\software\src\teleporators文件夹` 아래의 폴더를
`~\lerobot\src\lerobot\teleporators文件夹` 로 복사합니다

![그림 5](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/5.png)

![그림 6](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/6.png)

`~\XLeRobot\software\examples文件夹` 아래의 파일을 모두
`~\lerobot\examples文件夹` 아래로 복사합니다

![그림 7](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/7.png)

![그림 8](../../../../../public/images/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files/8.png)



튜토리얼 https://xlerobot.readthedocs.io/zh-cn/latest/software/index.html

<RelatedProducts slugs="xlerobot" />
