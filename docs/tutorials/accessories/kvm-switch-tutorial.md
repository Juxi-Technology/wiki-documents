# KVM切换器使用教程

KVM切换器包含HUB功能、TTL串口、蓝牙模块

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ODcwMWQ3MjgyYzlkOGU3MWYxMGM5YzI3NTBlY2YyYmNfMGJjMDFhYWJlY2VkZTU5MzBmOTRhNTg0YzQ0ZTFiZDJfSUQ6NzYxNjY2MjUyNDQ5NDcxMTc2NF8xNzgwMDUxNjY4OjE3ODAxMzgwNjhfVjM)

## 单独模块功能

### 1、HUB功能

只需通过一根USB-TypeC线即可实现一个USB接口拓展为三个USB接口

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ODNiYjk3Y2M3ZjQxZDQ0MDQzY2FjOTgyMzRmZDkxZDlfNjM5NTM2ZTdhZmY0NDU4MzAwOWEzZmQ1ZWE2MjJiNjZfSUQ6NzYxNjY2MjcxMzYzNjU3MjM4Ml8xNzgwMDUxNjY4OjE3ODAxMzgwNjhfVjM)

### 2、TTL串口

针脚从左到右分别为 GND RXD TXD TNOW 3V3 5V

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=Y2Q4ZWEzODNhZGRhZDZmM2NjZGE4ZDRhMGE5ODYwODVfNWEyODI3OGI5ZDM5N2UzZjRhNzhkM2RmNWZhZGFjNmNfSUQ6NzYxNzY3OTgyNjkwNzk1ODIxNV8xNzgwMDUxNjY4OjE3ODAxMzgwNjhfVjM)

### 3、蓝牙模块

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjUyY2NhMmNiZWI1ZjdmYWNhNjNmN2NiNmJkZDExZThfMjAwNmY0YzJiN2UzYzlkOWI1OWRjZGQ2NzA2ZGU4Y2ZfSUQ6NzYxNzY4MjIyMzQ3OTY4ODEzNV8xNzgwMDUxNjY4OjE3ODAxMzgwNjhfVjM)

用at指令去连接，或者改成从模式，手机得走4.2协议连接

## 双端切换

### 1、设备A+设备B（双端都有显示器）

按键切换&amp;红外遥控器切换

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTNhNGQxNWQzNDg2M2I0N2MxNzIxNTkxNDE1NDI3M2ZfNjhiY2Y1OWZhODI4NzA3OGY2OGNmYzhkODc1ZjhmNWNfSUQ6NzYxNjY2MzYzMTUwMTI0OTQ4OV8xNzgwMDUxNjY4OjE3ODAxMzgwNjhfVjM)

### 2、主板（无显示器）+主机（有显示器）

只需要额外使用一个 4K高清HDMI采集器 连接到主机端，在**主机端**使用OBS、Potplay等软件即可采集**主板（无显示器）**的画面

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NzlhYWI3YWMyMDFmZTdiMTljMWUzYjJmNGRkYTBhMmJfZDg0MzAyYjA1NzU5ODRhNzY4YzViM2YxMzBlY2E0ZGRfSUQ6NzYxNjY2NzczMzQ3MjQ5NjU3OV8xNzgwMDUxNjY4OjE3ODAxMzgwNjhfVjM)

**4K高清HDMI采集器 接线操作**

根据主板的接口分以下三种接线操作

**HDMI接口**——&gt;HDMI线——&gt;采集器的HDMI接口——&gt; USB/Type-C ——&gt;笔记本、电脑、一体机、手机/平板等显示器

**Micro HAMI接口**——&gt;Micro转HDMI转接头——&gt;HDMI线——&gt;采集器的HDMI接口——&gt; USB/Type-C ——&gt;笔记本、电脑、一体机、手机/平板等显示器

**DP接口**——&gt;DP转HDMI转接头——&gt;HDMI线——&gt;采集器的HDMI接口——&gt; USB/Type-C ——&gt;笔记本、电脑、一体机、手机/平板等显示器

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OTM5YjE1ZmVlMmU4OTI2MmI0YTRjOWQzMjgxNDBlMWNfNzg4ZDQ4NzcyYjI1MTEwNWZkMTc3NDA4NjhjZjZjYjBfSUQ6NzU4Njk4MTk4NTkzNjYyNDg0Nl8xNzgwMDUxNjY4OjE3ODAxMzgwNjhfVjM)

**OBS操作指南**

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTIyMTVmODJhMjU5MzZiZmVlOGFhOWVlYTJlZjI4NjRfMDY4YThjN2IyMGRkNGYzZWQzZDljMWUzZDk0Njk1NmZfSUQ6NzU4Njk4MjAzODI4MTUzODUxM18xNzgwMDUxNjY4OjE3ODAxMzgwNjhfVjM)

**Potplayer操作指南**

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTAyNWQ0ZjdiYTEzNGUwNDk5Zjk5Y2RmZDExMDhjYTFfMThiNTExN2ExZTcwZDk0MmJmYjZkYzg2MWY5ZmE1ZDVfSUQ6NzU4Njk4MjA4NDY1ODE4NzIwM18xNzgwMDUxNjY4OjE3ODAxMzgwNjhfVjM)

针脚图示例

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MjI3NDQyOWRhOWYzMGIwNmYyODM3MjMzNDhmMGEyMThfY2MzYTQ4MzU2OTUzZDk1NzExMTM0MGM5ZDRmNGRlNThfSUQ6NzU4Njk4MDQxNjc3MjAxNzA4Ml8xNzgwMDUxNjY4OjE3ODAxMzgwNjhfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTVhMjQxYjdhMTJhNThiMWYxNTVmNzdhNDk4YmI2ZGJfNDIwY2JiNWM1MjVmMGNjOTM5MjU4MTBlY2JiMWQ3YjhfSUQ6NzU4Njk5MjgyNjkxMjM3ODA3MF8xNzgwMDUxNjY4OjE3ODAxMzgwNjhfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTk2ZWJmYzBhNDRjZjA0OTMzNDc0NjA2NjBiMTI4NjRfNWM0M2E0ZDM1OTJhNTRiOTMwOGMxMmU1ZGUwNGEwMTlfSUQ6NzYxNjY2MzA3MzE5MTIzNDQ5OV8xNzgwMDUxNjY4OjE3ODAxMzgwNjhfVjM)
