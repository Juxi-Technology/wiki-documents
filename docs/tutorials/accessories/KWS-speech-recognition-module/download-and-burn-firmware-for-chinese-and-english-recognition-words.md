# 中英文识别词固件下载及烧录

> 模块出厂已经烧录语音识别功能固件，资料附件里面也提供了出厂固件，如果需要重新制作固件可以根据下面步骤进行固件制作
> 
> 

## 进入[启英泰伦语音AI平台](https://aiplatform.chipintelli.com/home/index.html)

#### 注册启英泰伦官网账号

#### 点击顶部菜单“平台功能”，选择“产品固件及SDK深度开发”

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OGE1YzRiYTY0NDhmOTM4ODg1YjYyYjFjYTNjMDI0Y2FfYmE3N2Q1ZGVlYmQ3N2YzOGU1ZDY0NDQ1NDU0YmU2MzdfSUQ6NzYyNDQzMDg0NjAxMTQ5MzU5Nl8xNzgwMDU2ODc4OjE3ODAxNDMyNzhfVjM)

---

#### 点击“离线语音识别大模型应用”

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmFiOGYzYmMyYjBkOGQ3MmQ4MWQ0Yjk3OWQ2YWU0MjVfNDdjZTNkNDZmNmJiZDBkYzIzZDdiNzI1MjlmZTk3ODBfSUQ6NzYyNDQzMTQ4NTM5NTgzMjAwNF8xNzgwMDU2ODc4OjE3ODAxNDMyNzhfVjM)

---

#### 点击“语音识别固件及SDK开发”

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MmM0YjM1Mjc4NjU3NzRkZTY4YTllOWNlNDAyYzQ4NmFfYTYyNTdmMjEyNzljMDI1ZThiMjQ0NmFjMzg3YmEzOWFfSUQ6NzYyNDQzMTg2MDE5NTUxMTQ4OV8xNzgwMDU2ODc4OjE3ODAxNDMyNzhfVjM)

---

#### 新建项目

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjhiYTg5YWY2NDJiN2NhYjYzYjcxZDEwMzg5MzNmOGVfYmZlMWRhMmRiY2UyNGE4OWUxOGM5NzFmMzg4ZTMyMzNfSUQ6NzYyNDQzMjIwNzU4NzAyMDAwMV8xNzgwMDU2ODc4OjE3ODAxNDMyNzhfVjM)

---

#### 产品信息填写

1. **产品名称：**按自己名称规则来即可

2. **应用方案：**选择“单麦语音识别”

3. **产品类型：**“通用\-\&gt;智能中控”

4. **芯片型号：**Cl1302

5. **sdk名称：**Cl13XX\_SDK\_ASR\_Offline

6. **sdk版本：**1\.12\.16

7. **描述：**按自己描述规则来即可

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZDZjNDAwMTlkODAzZTNkNDQyMTM2NGZmZDhkMmRlN2RfYTllZDQ3MjgyZjMyNjI4OGJiNmM0NzlkNWYyZDYzYjNfSUQ6NzYyNDQzMjYxMjcxNDkwODYxOV8xNzgwMDU2ODc4OjE3ODAxNDMyNzhfVjM)

---

#### 固件信息选择

> 在这里可以选择中文或者英文
> 
> 

1. **版本名称：**按自己版本规则即可

2. **语言类型：**按自己需求选择

3. **选择声学类型：**

    1. **中文选择：**VO0681\_中文\_ASR\_通用\_0\.9M

    2. **英文选择：**VO0916\_英文\_ASR\_通用\_1\.1M

4. **模块板选择：**CI\-D02GS02S

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OTFlM2U0Mjk1MTQzM2I3Mjg5YTA5MTUzMGMyYTg4ZThfMmU5OTM2YjIxYTBmMWUyYmEzMDY3NGNiNmQ2NThlM2VfSUQ6NzYyNDQzNDU3Mzc3MDk2ODI4Ml8xNzgwMDU2ODc4OjE3ODAxNDMyNzhfVjM)

---

#### 固件配置

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTVlOGJiZjQ0MTdiNjM0NTYxNDFjODUxMTllY2VmZGFfZjY1MzNhYjdhODRkZDVhMDc5NjNhY2U3ZTNiNDQ3N2ZfSUQ6NzYzNDAzOTE5NTc2OTcxOTczNl8xNzgwMDU2ODc4OjE3ODAxNDMyNzhfVjM)

---

#### 下载唤醒词固件

1. 上传\-选择对应语言的唤醒词表格

2. 点击“立即提交”

3. 等待几分钟即可下载固件

4. 这里提供了两份命令词播报词协议列表，有需要的可以根据这份表格自行更改

    \[命令词播报词协议列表V3\_中文模板\.xlsx\]

    \[命令词播报词协议列表V3\_英文模板\.xlsx\]

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTU5YTk0NzUwYzg0MTJiMTk4MmRjNGRmMDIyNjlhNTZfNDRkZjljZTY1YTJjNGRjMTllNWY0NDM2YzQzYTI4OTBfSUQ6NzYyNDQzOTgyNzM4Nzg5NDcxNV8xNzgwMDU2ODc4OjE3ODAxNDMyNzhfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTQ5MzBhY2IzOTA1NGNhYjZkMDMzZGUxN2M4ZWRiNThfYzcxMTFkMDUxNzNmOTk4YzM1ZjI1ZDlhMDI4MTVjOTFfSUQ6NzYyNDQ0MzU2ODM1NDM5NzE0MF8xNzgwMDU2ODc4OjE3ODAxNDMyNzhfVjM)

---

## 语音模块烧录固件

#### 下载语音模块烧录软件压缩包

\[语音模块固件烧录软件\.7z\]

1. 解压后打开软件

> 固件选择“CI1302”，点击“固件升级”
> 
> 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTUxZGI2ZTY5MDBhM2RhY2QzNDk1N2Y4ZGIyOTU1NjZfNGM3Mzc5MGViZTk4YTI3MTg0NDkyMjVlMWQ0ZGE0NWJfSUQ6NzYyNDQ0NTQ0NDE4MjQ5NDQzMF8xNzgwMDU2ODc4OjE3ODAxNDMyNzhfVjM)

2. 将声卡插上电脑，打开设备管理器

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjM4MDhhMTc2NTM3ZDQwNThjMjEyNmIxM2U0NWY2ZTRfNzY5YTVlYjg1Y2Y4MmQxODFkNWYyNTljMjk2ZDhlNzlfSUQ6NzYyNDQ0NzI1NzgwNzI5MzY2NF8xNzgwMDU2ODc4OjE3ODAxNDMyNzhfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OWEwMzg3NDgyYzM0ODM1NDI2YWM2NWIzNWNlMTBiZDBfMDNiZmYyMzNiNDc0NzRiMzcwZjU5NGIzOGVhYWEyMjhfSUQ6NzYyNDQ0NzQ4MzU1MzA0MTM2NF8xNzgwMDU2ODc4OjE3ODAxNDMyNzhfVjM)

3. 移至固件烧录软件页面

> 声卡按键位置
> 
> ![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MzJmZTY2ZjMwMTJlYjI4MjBlOGZhOTY5NjkxOGNkZjJfNWQ4ZDg3NzczNmNkNmIwZTM4ZTA5ODkwMTJlMjkyYzJfSUQ6NzYyNDQ0ODY1OTM2MjY5NjE1OF8xNzgwMDU2ODc4OjE3ODAxNDMyNzhfVjM)
> 
> 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=N2YzMDE1NmIwMmI0NjJlNmIyMWU3Y2E4NzIyNDgyNDhfNDFmMTA3ZTE0MGQ1YmYxMzU3MGU0NWJkNjcwM2E5MjhfSUQ6NzYyNzA1NjE1NTMyMzczMDg5MV8xNzgwMDU2ODc4OjE3ODAxNDMyNzhfVjM)

#### 完成后可移步到左侧对应的其他教程

#### 这里有准备好的固件资料，可直接烧录

\[CI1302\_中文\_单麦\_V00681\_UART0\_115200\_2M\.bin\]

\[CI1302\_英文\_单麦\_V00916\_UART0\_115200\_2M\.bin\]





## 注意事项

1. CH341驱动安装（以管理员身份安装）

https://www\.wch\.cn/downloads/CH341SER\_EXE\.html

若在设备管理器被识别成未知设备usb single serial 或usb serial，请先右键卸载，再安装驱动！



