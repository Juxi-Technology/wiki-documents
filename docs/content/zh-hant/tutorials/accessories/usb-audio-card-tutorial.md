---
title: "USB 免驅聲卡"
description: "鉅犀科技 USB 免驅聲卡教程，涵蓋可視化測試軟件、命令操作與音頻調試方法，適用於樹莓派、Jetson、PC 等設備。"
---

# USB 免驅聲卡

> **[ 淘寶店鋪 ](https://juxitechnology.taobao.com)**


## 可視化測試軟件（Windows）

[audio_tools.7z](https://juxitech.feishu.cn/wiki/Uz8wwCB4tiTWwMk0pFMctXxTn2b)

**命令彙總（可跳過）**

- 更新系統並安裝工具：

    - 執行：`sudo apt update&&sudo apt全升級`

    - 安裝 ALSA：`sudo apt install alsa-base alsa-utils`

- 識別硬件：

    - 列出音頻設備：`aplay -l`

    - 查看 PCI/USB 音頻設備：`lspci | grep -i audio`、`lsusb`

- 基礎配置與驗證：

    - 運行配置嚮導：`sudo alsaconf`（若可用）

    - 調節音量：`alsamixer`（按 **M** 取消靜音，方向鍵調音量，ESC 退出）

    - 保存設置：`sudo alsactl store`

    - 播放測試：測試音頻輸出（確保揚聲器 / 耳機已連接）：

    ```Bash
    # 播放測試音，-D 指定 USB 聲卡設備（X 為 aplay -l 顯示的 card 編號）
    speaker-test -c 2 -D plughw:X,0
    ```

    - 重啓音頻服務：`sudo systemctl restart alsa`（部分環境可能需要重啓系統：`sudo reboot`）

## Jetson系列主控&amp;Ubuntu系統&amp;樹莓派

### 命令行調試

#### 一、USB聲卡接入

1. 在插入USB聲卡之前，我們使用 `lsusb` 命令查看一下USB設備：

![一、USB聲卡接入 – 1](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/1.png)

2. 然後把USB聲卡插上，再使用 `lsusb` 查看一下，可以看到，多出來的那個就是USB聲卡：

![一、USB聲卡接入 – 2](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/10.png)

3. 然後使用 `arecord -l` 可以列出所有錄音設備，可以看到，我們的USB聲卡設備

![一、USB聲卡接入 – 3](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/2.png)

4. 使用 `aplay -l` 可以列出所有播放設備

![一、USB聲卡接入 – 4](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/3.png)

#### 二、USB聲卡使用

`arecord -l`，例如這裏顯示UACDemoV1.0即是我們的聲卡，card 0；device 0，在命令中修改爲plughw:0,0指定該錄音設備

![二、USB聲卡使用 – 1](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/4.png)

接執行Linux自帶的錄音命令，錄製一段5秒的聲音進行測試

`記錄-D plughw： 0,0-fS16_LE-r 16000-d 5-t wav test.wav`

其中 `plughw:0,0` 表示`card 0 , device 0`，即我們的USB聲卡，需根據`arecord -l` 找到自身設備號進行修改，如果你的UACDemoV1.0即是我們的聲卡，顯示card 1；device 1，就需要將命令中的`plughw:0,0`改爲`plughw:1,1`。 `plughw`參數提供了自動的格式轉換，可以在不同的數據格式和硬件之間進行橋接。arecord 其他的參數如下：

|指令|含義|本指令含義|
|---|---|---|
|-D|選擇設備名稱|使用外接USB聲卡“plughw:1.0”|
|-f|錄音格式|S16_LE代表有符號16位小端序|
|-r|採樣率|16000是16KHz採樣|
|-d|錄音時長|錄音5秒|
|-t|錄音格式|wav格式|
|test. wav|文件名，可以包含路徑|文件名字叫test.wav|

如果聲音過小，輸入命令 `alsamixer` ，來對音量進行調整，按下`F6`，選擇USB聲卡，

![二、USB聲卡使用 – 2](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/5.png)

然後按下`F5`，將錄音和播音設備都展示出來，我們將錄音的音量按上鍵調高，PCM是播放，CAPTURE MIC是錄音

![二、USB聲卡使用 – 3](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/6.png)

然後使用`aplay`命令來播放

`插頭S16_LE`

參數說明如下：

- -D plughw:0,0：指定錄音設備。plughw:0,0 表示使用第一個聲卡的第一個設備。

- -f S16_LE：設置音頻文件格式。S16_LE 表示 16 位小端格式（Signed 16-bit Little Endian），一種常用的音頻數據格式，“小端”指數據的低位字節存儲在內存的低地址端。

- -r 16000：設置採樣率。

- -c 1：設置聲道數。

- -d 5：設置錄音時長/秒。



### PulseAudio 可視化窗口查看

![PulseAudio 可視化窗口查看 – 1](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/7.png)

通過PulseAudio，[命令行](https://so.csdn.net/so/search?q=%E5%91%BD%E4%BB%A4%E8%A1%8C&spm=1001.2101.3001.7020)方式查看

`pactl list sources short`            #  列出當前 PulseAudio 音頻服務器中所有可用的音頻源

![PulseAudio 可視化窗口查看 – 2](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/8.png)

> 49 代表源索引
> 
> Alsa _input.usb 表示這是一個USB輸入設備，表示是一個麥克風
> 
> s16le 表示 16 位小端（Signed 16-bit Little Endian）的音頻採樣格式。
> 
> 1ch 表示單聲道。
> 
> 48000Hz 是採樣率，表示每秒採樣 48000 次
> 
> SUSPENDED 代表當前麥克風是掛起的
> 
> RUNNING 代表麥克風被佔用中
> 
> 



### python調用USB免驅聲卡

自行查找代碼案例，例如搜索“[Python調用USB免驅聲卡](https://blog.csdn.net/weixin_44463519/article/details/157463731?spm=1001.2101.3001.6650.3&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EYuanLiJiHua%7ECtr-3-157463731-blog-105694458.235%5Ev43%5Epc_blog_bottom_relevance_base9&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EYuanLiJiHua%7ECtr-3-157463731-blog-105694458.235%5Ev43%5Epc_blog_bottom_relevance_base9&utm_relevant_index=4)”



### 問題彙總

#### Jetson

1. 設備被佔用問題

![Jetson – 1](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/9.png)

關閉設置頁面，重新運行命令

若還不行，重新插拔或者重新啓動



查看哪個進程佔用音頻設備

`sudo lsof /dev/snd/*`

插上聲卡前

![Jetson – 2](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/1.png)

插上聲卡後

![Jetson – 3](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/10.png)

殺死進程 `kill -9 PID` ，PID爲插上聲卡後出現的PID，截圖裏是33739

然後重新錄音、播放



#### 樹莓派

1.噪音較大問題

先將麥克風音量置於100
打開終端

```Bash
$ sudo vi /boot/config.txt     #或者可能在/boot/firmware/config.txt
```

在文本最後添加

```Bash
audio_pwm_mode = 2
```

ESC輸入:wq退出保存

然後重啓

```Bash
$ reboot
```

2.每次重新啓動會初始化音量設置

重新設置好音量後，

需要保存當前音量配置到系統默認配置文件

執行以下命令將當前設置持久化

```Bash
sudo chmod 664 /var/lib/alsa/asound.state
sudo alsactl store
```

#### Ubuntu虛擬機

1. 錄音時有噪音雜音

解決辦法：USB控制器兼容性改爲3.0或3.1





## RDK x3&amp;x5

### 查看設備編號

檢查聲卡是否存在，檢查設備編號。

通過 `cat /proc/asound/cards` 命令確認聲卡是否註冊

```Shell
0 [duplexaudio    ]: simple-card - duplex-audio
                      duplex-audio
```

通過 `cat /proc/asound/devices` 命令確認邏輯設備

```Shell
root@ubuntu:~# cat /proc/asound/devices
  2: [ 0- 0]: digital audio playback
  3: [ 0- 0]: digital audio capture
  4: [ 0]   : control
 33:        : timer
```

通過 `ls /dev/snd/` 命令檢查用戶空間的實際設備文件

```Shell
root@ubuntu:~# ls /dev/snd/
by-path/   controlC0  pcmC0D0c   pcmC0D0p   timer    
```

通過上述查詢，可以確認，聲卡0對應的是板載聲卡；設備也是存在的, 且設備號爲 `0-0` , 實際我們操作的設備應該是 `pcmC0D0p` 和 `pcmC0D0c`。

### 錄製一段5秒的聲音進行測試

`記錄-D plughw： 0,0-fS16_LE-r 16000-d 5-t wav test.wav`

其中 `plughw:0,0` 表示`card 0 , device 0`，即我們的USB聲卡，`plughw`參數提供了自動的格式轉換，可以在不同的數據格式和硬件之間進行橋接。arecord 其他的參數如下：

|指令|含義|本指令含義|
|---|---|---|
|-D|選擇設備名稱|使用外接USB聲卡“plughw:1.0”|
|-f|錄音格式|S16_LE代表有符號16位小端序|
|-r|採樣率|16000是16KHz採樣|
|-d|錄音時長|錄音5秒|
|-t|錄音格式|wav格式|
|test. wav|文件名，可以包含路徑|文件名字叫test.wav|

如果聲音過小，輸入命令 `alsamixer` ，來對音量進行調整，按下`F6`，選擇USB聲卡，

![錄製一段5秒的聲音進行測試 – 1](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/2.png)

然後按下`F5`，將錄音和播音設備都展示出來，我們將錄音的音量按上鍵調高，PCM是播放，CAPTURE MIC是錄音

![錄製一段5秒的聲音進行測試 – 2](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/3.png)

然後使用`aplay`命令來播放

`插頭S16_LE`

參數說明如下：

- -D plughw:0,0：指定錄音設備。plughw:0,0 表示使用第一個聲卡的第一個設備。

- -f S16_LE：設置音頻文件格式。S16_LE 表示 16 位小端格式（Signed 16-bit Little Endian），一種常用的音頻數據格式，“小端”指數據的低位字節存儲在內存的低地址端。

- -r 16000：設置採樣率。

- -c 1：設置聲道數。

- -d 5：設置錄音時長/秒。

### 常見問題

#### RDK 板卡如何區分 USB 聲卡與板載聲卡？

#### RDK X3 系列的音頻子板如何與 USB 聲卡共存並同時使用？

#### RDKS100 如何通過圖形化界面方式支持音頻功能使用？

參考 [RDK多媒體處理與應用](https://developer.d-robotics.cc/rdk_doc/FAQ/multimedia#usb-%E5%A3%B0%E5%8D%A1%E5%92%8C%E6%9D%BF%E8%BD%BD%E5%A3%B0%E5%8D%A1%E5%A6%82%E4%BD%95%E5%8C%BA%E5%88%86%E4%BD%BF%E7%94%A8)





## 檢查最基本的音頻驅動

能否使用 USB 免驅聲卡，**核心取決於內核**

- 是否啓用了 USB Audio Class 支持（即 `CONFIG_USB_AUDIO`）；

- 是否加載了相應的內核模塊（如 `snd-usb-audio`）

只要內核支持，再補裝基礎音頻工具，就能正常使用；若內核被裁剪，則需要重新編譯內核啓用驅動。

**步驟 1： 檢查內核是否支持 snd_usb_audio**

```Plain Text
# 方法1： 檢查是否已加載驅動模塊
lsmod | grep snd_usb_audio

# 方法2： 檢查內核是否內置該模塊（即使未加載）
modinfo snd_usb_audio  # 有輸出=內核支持；無輸出=內核未編譯該模塊
```

**若 `modinfo`**：說明系統內核裁剪了該驅動，需重新編譯內核，在 `.config` 中開啓：

```Plain Text
CONFIG_SND_USB_AUDIO=m  # 編譯為模塊，或=y 內置到內核
CONFIG_SND_USB_UA101=y
CONFIG_SND_USB_CAIAQ=y
```

**若 `modinfo`**：直接加載模塊：

```Bash
sudo modprobe snd_usb_audio
```

##### 步驟 2： 安裝基礎音頻工具（精簡版默認無）

精簡版系統通常沒有 `alsa-utils` 這類工具，需手動安裝：

```Bash
# Ubuntu/Debian 系統
sudo apt update && sudo apt install -y alsa-utils usbutils

# 無網絡環境： 下載 alsa-utils 離線包，用 dpkg -i 安裝
```

##### 步驟 3： 驗證 USB 聲卡識別與功能

1.插入 USB 聲卡，執行命令確認設備識別：

```Bash
# 查看 USB 設備枚舉
lsusb | grep -i audio

# 查看音頻設備列表
aplay -l
```

輸出中出現 `USB Audio` 相關的 `card X` 條目，說明識別成功。

2.測試音頻輸出（確保揚聲器 / 耳機已連接）：

```Bash
# 播放測試音，-D 指定 USB 聲卡設備（X 為 aplay -l 顯示的 card 編號）
speaker-test -c 2 -D plughw:X,0
```

##### 步驟 4： （可選）安裝音頻服務（桌面 / 後臺播放需求）

若需要在後臺播放音頻、或搭配桌面環境使用，精簡版需額外安裝音頻服務：

```Bash
# 輕量級服務（推薦，無桌面也能用）
sudo apt install -y pulseaudio

# 或 PipeWire（Ubuntu 22.04+ 推薦）
sudo apt install -y pipewire pipewire-alsa
```

#### 精簡版系統的常見坑點及解決

**1.權限不足，普通用戶無法訪問聲卡**

解決：將用戶加入 `audio`組，重啓後生效：

```Bash
sudo usermod -aG audio $USER
```

2.**無聲音，但設備識別正常**

解決：用 `alsamixer`調大音量、解除靜音（按 `M` 鍵取消靜音）：

```Bash
alsamixer -c X  # X 為 USB 聲卡的 card 編號
```

3.**內核版本過低，不支持新型 USB 聲卡時，分以下兩種情況**

```Bash
sudo apt install -y linux-generic && sudo reboot
```

```Bash
sudo modprobe snd-hda-intel model=generic #（不同機型可嘗試不同 model 值）
# 創建聲卡驅動配置文件
sudo echo "options snd-hda-intel model=generic" > /etc/modprobe.d/sound.conf
sudo reboot
```

### 官方開源倉庫

JUXI 免驅 USB 音效卡的開源倉庫:[GitHub](https://github.com/Juxi-Technology/Driver-Free-Sound-Card)

隨插即用,相容樹莓派、Jetson、PC 等裝置,無需額外驅動,系統會自動識別為音訊輸入/輸出裝置。
