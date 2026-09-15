---
title: "树莓派:百度地图 API 申请"
description: "1. 注册方法"
---

# 树莓派:百度地图 API 申请

**1.** **注册方法**

进入百度地图开放平台https://lbsyun.baidu.com/

滑动到页面底端

点击立即注册

![图 1](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/19.jpg) 

建议选择成为个人开发者（因为当天申请即可使用）

按照提示一步步完成即可

![图 2](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/20.jpg) 

**2. 获取ak**

我们使用的是web服务里的 普通IP定位，文档可在下面的连接查阅。

https://lbsyun.baidu.com/index.php?title=webapi/ip-api

点击 控制台，选择 我的应用，选择 创建应用。

![图 3](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/21.jpg) 

应用名随便写，应用类型选择 服务器端 ，启用服务，白名单输入一个 0.0.0.0/0。

![图 4](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/22.jpg) 

点击 提交 生成一个应用。

![图 5](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/23.jpg) 

复制我们应用的ak值

![图 6](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/24.jpg) 

粘贴在程序里，保存，即可通过百度地图读取到位置信息。

![图 7](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/25.jpg)

<RelatedProducts slugs="gps-beidou-module" />
