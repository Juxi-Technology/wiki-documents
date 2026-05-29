# USB免驱声卡教程

# 可视化测试软件（Windows）

[audio_tools.7z](https://juxitech.feishu.cn/wiki/Wuc3wAppNi5elfkSI6VccrNDnfE)

**命令汇总（可跳过）

- 更新系统并安装工具：

    - 执行：`sudo apt update &amp;&amp; sudo apt full-upgrade`

    - 安装 ALSA：`sudo apt install alsa-base alsa-utils`

- 识别硬件：

    - 列出音频设备：`aplay -l`

    - 查看 PCI/USB 音频设备：`lspci | grep -i audio`、`lsusb`

- 基础配置与验证：

    - 运行配置向导：`sudo alsaconf`（若可用）

    - 调节音量：`alsamixer`（按 **M** 取消静音，方向键调音量，ESC 退出）

    - 保存设置：`sudo alsactl store`

    - 播放测试：测试音频输出（确保扬声器 / 耳机已连接）：

```Bash
# 播放测试音，-D 指定 USB 声卡设备（X 为 aplay -l 显示的 card 编号）
speaker-test -c 2 -D plughw:X,0
```

- 重启音频服务：`sudo systemctl restart alsa`（部分环境可能需要重启系统：`sudo reboot`）

# Jetson系列主控&amp;Ubuntu系统&amp;树莓派

## 命令行调试

### 一、USB声卡接入

1. 在插入USB声卡之前，我们使用 `lsusb` 命令查看一下USB设备：

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTE3NWQxYjdhYWFiMjMzZjdjYmYwNTNjNzZhNTU1NWRfZmZhZmU5ODAwYTcwM2QzMmQ1MDA5ZGVkNjI4ZDU4MzdfSUQ6NzU0ODMwODA1NTA0NzM1NjQxN18xNzgwMDUxNTgxOjE3ODAxMzc5ODFfVjM)

2. 然后把USB声卡插上，再使用 `lsusb` 查看一下，可以看到，多出来的那个就是USB声卡：

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MWEyNDc0NWVkMDY1MTA3NDFkYTg2ZDJlMDViNGEzZmZfNTRhNWZjMzFkOGJhODczMjRmMGVjODgzNDZjMzI5ZmVfSUQ6NzU0ODMwODA1NTUyNjYzNzI1Ml8xNzgwMDUxNTgxOjE3ODAxMzc5ODFfVjM)

3. 然后使用 `arecord -l` 可以列出所有录音设备，可以看到，我们的USB声卡设备

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2ExNzZkMzhkZDVlOGM5ZTZmYzc0MzMwZTg3ZTM2MDBfNmVmYzhkZDdjOWIxMjc5ZWU5MDkwNmUwNjFlYTZlMjNfSUQ6NzU0ODMwODA1NDUzMTc4NDczMl8xNzgwMDUxNTgxOjE3ODAxMzc5ODFfVjM)

4. 使用 `aplay -l` 可以列出所有播放设备

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NjM3YzIzM2QzYzIzODIwNmZiZGY2NzhjNTU1NzA5MmZfMjNkN2I3NTAwNzkxNDI0NTQwOTU1OGQ2YmZmNDg5YzRfSUQ6NzU0ODMwODA1Njk5NzQyOTI1Ml8xNzgwMDUxNTgxOjE3ODAxMzc5ODFfVjM)

### 二、USB声卡使用

`arecord -l`，例如这里显示UACDemoV1.0即是我们的声卡，card 0；device 0，在命令中修改为plughw:0,0指定该录音设备

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTFjODE4YWIwNDM5MWM1NjNhMzU2NjNjMDc0Y2Y4ZTdfY2RjZjM1YmRjZTFkYmUwMWFlN2E2ZWRhYTY4MjdiZTFfSUQ6NzYzODYxMDU3NDg4MDI2MzM1Nl8xNzgwMDUxNTgxOjE3ODAxMzc5ODFfVjM)

接执行Linux自带的录音命令，录制一段5秒的声音进行测试

`arecord -D plughw:0,0 -f S16_LE -r 16000 -d 5 -t wav test.wav`

其中 `plughw:0,0` 表示`card 0, device 0`，即我们的USB声卡，需根据`arecord -l` 找到自身设备号进行修改，如果你的UACDemoV1.0即是我们的声卡，显示card 1；device 1，就需要将命令中的`plughw:0,0`改为`plughw:1,1`。 `plughw`参数提供了自动的格式转换，可以在不同的数据格式和硬件之间进行桥接。arecord 其他的参数如下：

|指令|含义|本指令含义|
|---|---|---|
|-D|选择设备名称|使用外接USB声卡"plughw:1.0"|
|-f|录音格式|S16_LE代表有符号16位小端序|
|-r|采样率|16000是16KHz采样|
|-d|录音时长|录音5秒|
|-t|录音格式|wav格式|
|test.wav|文件名，可以包含路径|文件名字叫test.wav|

如果声音过小，输入命令 `alsamixer`，来对音量进行调整，按下`F6`，选择USB声卡，

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTU5NzFjNWJkMzFkMDFiMDUxZjYwMDE4Y2EyOTNjMTRfZWRmYzZkOWY3NTBlNDVlMzkxNGYxZmE5ZjRmNmIyMzJfSUQ6NzU0ODMwODA1NjI1NTY5MjgwM18xNzgwMDUxNTgxOjE3ODAxMzc5ODFfVjM)

然后按下`F5`，将录音和播音设备都展示出来，我们将录音的音量按上键调高，PCM是播放，CAPTURE MIC是录音

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=N2U4NjgxMDdiY2E4N2RkY2I2MmM5Njk5N2VhY2I3NjlfNTFhYTQ3YzQzMjllN2MyMTVkMTRmMDg3MjJlNDI1OGJfSUQ6NzU0ODMwODA1NzA4OTUwNzMzMl8xNzgwMDUxNTgxOjE3ODAxMzc5ODFfVjM)

然后使用`aplay`命令来播放

`aplay -D plughw:0,0 -f S16_LE -r 16000 -c 1 test.wav`

参数说明如下：

- -D plughw:0,0：指定录音设备。plughw:0,0 表示使用第一个声卡的第一个设备。

- -f S16_LE：设置音频文件格式。S16_LE 表示 16 位小端格式（Signed 16-bit Little Endian），一种常用的音频数据格式，"小端"指数据的低位字节存储在内存的低地址端。

- -r 16000：设置采样率。

- -c 1：设置声道数。

- -d 5：设置录音时长/秒。

## PulseAudio 可视化窗口查看

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZDMyYzkwNTAzOTU0NDM1ZDk1NDE0YWUyZDc3NTBkMTBfYWM1MTFhMzdjOTA5MGMxOGI5NWRmNzlhZDg5MDU1NTJfSUQ6NzU0ODMwODA1Njk5MjY2MTUwNV8xNzgwMDUxNTgxOjE3ODAxMzc5ODFfVjM)

通过PulseAudio，[命令行](https://so.csdn.net/so/search?q=%E5%91%BD%E4%BB%A4%E8%A1%8C&amp;spm=1001.2101.3001.7020)方式查看

`pactl list sources short`            # 列出当前 PulseAudio 音频服务器中所有可用的音频源

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MDUzOWNmMmU2NGE5Zjk3YTg4M2IzZGRkYWQ5ZjZmYTRfMWQyZDcyMzRhNjg4MWI3MTkyNDJiNTgxNjQxYzJjMjFfSUQ6NzU0ODMwODA1NjQxNjIzOTYxOF8xNzgwMDUxNTgxOjE3ODAxMzc5ODFfVjM)

&gt; 49 代表源索引
&gt;
&gt; Alsa _input.usb 表示这是一个USB输入设备，表示是一个麦克风
&gt;
&gt; s16le 表示 16 位小端（Signed 16-bit Little Endian）的音频采样格式。
&gt;
&gt; 1ch 表示单声道。
&gt;
&gt; 48000Hz 是采样率，表示每秒采样 48000 次
&gt;
&gt; SUSPENDED 代表当前麦克风是挂起的
&gt;
&gt; RUNNING 代表麦克风被占用中
&gt;
&gt;

## python调用USB免驱声卡

自行查找代码案例，例如搜索"[Python调用USB免驱声卡](https://blog.csdn.net/weixin_44463519/article/details/157463731?spm=1001.2101.3001.6650.3&amp;utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EYuanLiJiHua%7ECtr-3-157463731-blog-105694458.235%5Ev43%5Epc_blog_bottom_relevance_base9&amp;depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EYuanLiJiHua%7ECtr-3-157463731-blog-105694458.235%5Ev43%5Epc_blog_bottom_relevance_base9&amp;utm_relevant_index=4)"

## 问题汇总

### Jetson

1. 设备被占用问题

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MWM0NjFkZDFmNjI5ZjZmODhkZDIxMTdhNDA2MzU1MGVfYTRmZjQ0OGJlYzY1ZGEyNmE3ZGNmMWIxZWU1ZTA0YTNfSUQ6NzU0ODMwODA1NjI1NTcyNTU3MV8xNzgwMDUxNTgxOjE3ODAxMzc5ODFfVjM)

关闭设置页面，重新运行命令

若还不行，重新插拔或者重新启动

查看哪个进程占用音频设备

`sudo lsof /dev/snd/*`

插上声卡前

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MDA4MGZlMzMzYTEyNWI5NGU2YmU4MTNiNDM3Y2NhZDRfMmViOGUxMDE5MGMxZjM0ODQyNTNiYmJkNzMyNWQwNGRfSUQ6NzU0ODMwODA1NzU0MjMxMTkzOF8xNzgwMDUxNTgxOjE3ODAxMzc5ODFfVjM)

插上声卡后

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YTUyMWUxNjE1YTI2ZTRjNzhmOTNkN2FiYWZlZWZiMjRfOTQxNTYwYTc4OTNmODVkNjA3MWUyZTEwMDdhYTc2NzhfSUQ6NzU0ODMwODA1NDI0ODEyODUxNF8xNzgwMDUxNTgxOjE3ODAxMzc5ODFfVjM)

杀死进程 `kill -9 PID`，PID为插上声卡后出现的PID，截图里是33739

然后重新录音、播放

### 树莓派

1.噪音较大问题

```Plain Text
先将麦克风音量置于100
打开终端
$ sudo vi /boot/config.txt    #或者可能在/boot/firmware/config.txt
在文本最后添加
audio_pwm_mode = 2
ESC输入:wq退出保存
然后重启
$ reboot
```

2.每次重新启动会初始化音量设置

重新设置好音量后，

需要保存当前音量配置到系统默认配置文件

执行以下命令将当前设置持久化

```Python
sudo chmod 664 /var/lib/alsa/asound.state
sudo alsactl store
```

### Ubuntu虚拟机

1. 录音时有噪音杂音

解决办法：USB控制器兼容性改为3.0或3.1

# RDK x3&amp;x5

## 查看设备编号

检查声卡是否存在，检查设备编号。

通过 `cat /proc/asound/cards` 命令确认声卡是否注册

```Shell
0 [duplexaudio    ]: simple-card - duplex-audio
                      duplex-audio
```

通过 `cat /proc/asound/devices` 命令确认逻辑设备

```Shell
root@ubuntu:~# cat /proc/asound/devices
  2: [ 0- 0]: digital audio playback
  3: [ 0- 0]: digital audio capture
  4: [ 0]   : control
 33:        : timer
```

通过 `ls /dev/snd/` 命令检查用户空间的实际设备文件

```Shell
root@ubuntu:~# ls /dev/snd/
by-path/   controlC0  pcmC0D0c   pcmC0D0p   timer    
```

通过上述查询，可以确认，声卡0对应的是板载声卡；设备也是存在的, 且设备号为 `0-0`, 实际我们操作的设备应该是 `pcmC0D0p` 和 `pcmC0D0c`。

## 录制一段5秒的声音进行测试

`arecord -D plughw:0,0 -f S16_LE -r 16000 -d 5 -t wav test.wav`

其中 `plughw:0,0` 表示`card 0, device 0`，即我们的USB声卡，`plughw`参数提供了自动的格式转换，可以在不同的数据格式和硬件之间进行桥接。arecord 其他的参数如下：

|指令|含义|本指令含义|
|---|---|---|
|-D|选择设备名称|使用外接USB声卡"plughw:1.0"|
|-f|录音格式|S16_LE代表有符号16位小端序|
|-r|采样率|16000是16KHz采样|
|-d|录音时长|录音5秒|
|-t|录音格式|wav格式|
|test.wav|文件名，可以包含路径|文件名字叫test.wav|

如果声音过小，输入命令 `alsamixer`，来对音量进行调整，按下`F6`，选择USB声卡，

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MmFmNzY0YmRlMTQ1ZDkyYWViNDNiOTViYzdiYTRmY2RfYTkzZTVlOTRlZjMzMWEwNDJmOTMwYjE2NjU1M2JlOGZfSUQ6NzU2Njk2OTA2MDA0OTAyNzEwMF8xNzgwMDUxNTgxOjE3ODAxMzc5ODFfVjM)

然后按下`F5`，将录音和播音设备都展示出来，我们将录音的音量按上键调高，PCM是播放，CAPTURE MIC是录音

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZWUwMWUzMzc0ZmJmZmFkNjgwMTc3YWNhZmEyNTFlN2ZfZTMzOGVkZDBkNDA3ZTMxYmEyNDdiZTg5YTVlNzEzZTFfSUQ6NzU2Njk2OTA2MDYxNDI5MTQ2Ml8xNzgwMDUxNTgxOjE3ODAxMzc5ODFfVjM)

然后使用`aplay`命令来播放

`aplay -D plughw:0,0 -f S16_LE -r 16000 -c 1 test.wav`

参数说明如下：

- -D plughw:0,0：指定录音设备。plughw:0,0 表示使用第一个声卡的第一个设备。

- -f S16_LE：设置音频文件格式。S16_LE 表示 16 位小端格式（Signed 16-bit Little Endian），一种常用的音频数据格式，"小端"指数据的低位字节存储在内存的低地址端。

- -r 16000：设置采样率。

- -c 1：设置声道数。

- -d 5：设置录音时长/秒。

## 常见问题

### RDK 板卡如何区分 USB 声卡与板载声卡？

### RDK X3 系列的音频子板如何与 USB 声卡共存并同时使用？

### RDKS100 如何通过图形化界面方式支持音频功能使用？

参考 [RDK多媒体处理与应用](https://developer.d-robotics.cc/rdk_doc/FAQ/multimedia#usb-%E5%A3%B0%E5%8D%A1%E5%92%8C%E6%9D%BF%E8%BD%BD%E5%A3%B0%E5%8D%A1%E5%A6%82%E4%BD%95%E5%8C%BA%E5%88%86%E4%BD%BF%E7%94%A8)

# 检查最基本的音频驱动

能否使用 USB 免驱声卡，**核心取决于内核**

- 是否启用了 USB Audio Class 支持（即 `CONFIG_USB_AUDIO`）；

- 是否加载了相应的内核模块（如 `snd-usb-audio`）

只要内核支持，再补装基础音频工具，就能正常使用；若内核被裁剪，则需要重新编译内核启用驱动。

**步骤 1： 检查内核是否支持 snd_usb_audio**

```Plain Text
# 方法1： 检查是否已加载驱动模块
lsmod | grep snd_usb_audio

# 方法2： 检查内核是否内置该模块（即使未加载）
modinfo snd_usb_audio  # 有输出=内核支持；无输出=内核未编译该模块
```

**若 `modinfo` 无输出**：说明系统内核裁剪了该驱动，需重新编译内核，在 `.config` 中开启：

```Plain Text
CONFIG_SND_USB_AUDIO=m  # 编译为模块，或=y 内置到内核
CONFIG_SND_USB_UA101=y
CONFIG_SND_USB_CAIAQ=y
```

**若 `modinfo` 有输出**：直接加载模块：

```Bash
sudo modprobe snd_usb_audio
```

#### 步骤 2： 安装基础音频工具（精简版默认无）

精简版系统通常没有 `alsa-utils` 这类工具，需手动安装：

```Bash
# Ubuntu/Debian 系统
sudo apt update &amp;&amp; sudo apt install -y alsa-utils usbutils

# 无网络环境： 下载 alsa-utils 离线包，用 dpkg -i 安装
```

#### 步骤 3： 验证 USB 声卡识别与功能

1.插入 USB 声卡，执行命令确认设备识别：

```Bash
# 查看 USB 设备枚举
lsusb | grep -i audio

# 查看音频设备列表
aplay -l
```

输出中出现 `USB Audio` 相关的 `card X` 条目，说明识别成功。

2.测试音频输出（确保扬声器 / 耳机已连接）：

```Bash
# 播放测试音，-D 指定 USB 声卡设备（X 为 aplay -l 显示的 card 编号）
speaker-test -c 2 -D plughw:X,0
```

#### 步骤 4： （可选）安装音频服务（桌面 / 后台播放需求）

若需要在后台播放音频、或搭配桌面环境使用，精简版需额外安装音频服务：

```Bash
# 轻量级服务（推荐，无桌面也能用）
sudo apt install -y pulseaudio

# 或 PipeWire（Ubuntu 22.04+ 推荐）
sudo apt install -y pipewire pipewire-alsa
```

### 精简版系统的常见坑点及解决

**1.权限不足，普通用户无法访问声卡**

解决：将用户加入 `audio`组，重启后生效：

```Bash
sudo usermod -aG audio $USER
```

2.**无声音，但设备识别正常**

解决：用 `alsamixer`调大音量、解除静音（按 `M` 键取消静音）：

```Bash
alsamixer -c X  # X 为 USB 声卡的 card 编号
```

3.**内核版本过低，不支持新型 USB 声卡时，分以下两种情况**

```Bash
sudo apt install -y linux-generic &amp;&amp; sudo reboot
```

```Python
sudo modprobe snd-hda-intel model=generic #（不同机型可尝试不同 model 值）
# 创建声卡驱动配置文件
sudo echo "options snd-hda-intel model=generic" &gt; /etc/modprobe.d/sound.conf
sudo reboot
```
