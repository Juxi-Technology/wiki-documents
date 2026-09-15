---
title: "SO-ARM101 組裝教程"
description: "Pro版 主動臂使用5V6A電源適配器，從動臂使用12V5A電源適配器"
---

# SO-ARM101 組裝教程

> **[ 淘寶店鋪 ](https://juxitechnology.taobao.com)**


![image – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/1.jpg)

**Pro版 主動臂使用5V6A電源適配器，從動臂使用12V5A電源適配器**

舵機ID設置和舵機角度校準及組裝要提前做好，可參考[官方組裝教程](https://huggingface.co/docs/lerobot/so101)

# 第一步：設置舵機ID，安裝舵盤（除5號舵機）

![image – 2](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/2.png)

再次提醒，請確保舵機關節 ID 和齒輪比與 **SO-ARM101** 的嚴格對應。

總線上每個電機都有一個唯一的ID。新電機通常帶有一個默認ID `1`。為了確保電機和控制器之間的通信正常，我們首先需要為每個電機設置一個唯一的ID。此外，總線上的數據傳輸速度由波特率決定。為了能夠相互通信，控制器和所有電機都需要配置相同的波特率，本機械臂舵機的波特率為100000。

為此，我們首先需要將控制器分別連接到每個電機，以便進行設置。由於我們會將這些參數寫入電機內部存儲器（EEPROM）的非易失性區域，因此只需操作一次即可。

如果您要重新利用其他機器人的電機，您可能還需要執行此步驟，因為 ID 和波特率可能不匹配。

下面的視頻展示了設置電機 ID 的步驟順序。

## Windows系統

[飞特舵机上位机.zip]

使用飛特舵機上位機設置舵機ID並校準中位，ID設置是從1到6的！

[机械臂舵机设置ID-Windows系统.mp4]

## Linux/ubuntu系統

如需飛特舵機上位機可參考https://gitee.com/ftservo/FTServo_Linux

請先按照 [LeRobot机械臂教程](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc) 跟進到 **C. 機械臂控制**下 的 **端口授權 的 **運行腳本以查找端口**

使用 USB 數據線從電腦連接到從動臂的舵機驅動板，並接通電源。然後，運行以下命令。請將命令中的--robot.port=/dev/ttyACM0 修改為找到的端口號。如查找的端口為/dev/ttyACM1，則修改為--robot.port=/dev/ttyACM1

```Python
lerobot-setup-motors \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0
```

您會看到以下輸出。

```Python
Connect the controller board to the 'gripper' motor only and press enter.
```

依照指示，連接夾爪的舵機。請確保它是唯一連接到舵機驅動板的舵機，並且該舵機尚未與其他任何舵機進行連接。當您按下 **[Enter]** 鍵後，腳本將自動設置該舵機的 ID 和波特率，ID設置是從6到1的！

之後，您應該會看到以下信息：

```Python
'gripper' motor id set to 6
```

接著是下一條輸出是:

```Python
Connect the controller board to the 'wrist_roll' motor only and press enter.
```

**注意 根據指示，對每個舵機重複上述操作。

與之前的舵機一樣，請確保它是唯一連接到驅動板的舵機，並且舵機本身沒有連接到任何其他舵機。

在每次按 **Enter** 鍵之前，請務必檢查您的線纜連接。例如，在操作電路板時，電源線可能會斷開。

當您完成所有步驟後，腳本將自動結束，此時舵機即可投入使用。現在，您可以將每根舵機的 3 針接口依次連接，並將第一個舵機（ID 為 1 的"shoulder pan"舵機）的線纜連接到驅動板。現在可以將驅動板安裝到機械臂的底座上。

對主動臂重複相同的步驟。

```Python
lerobot-setup-motors \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM0
```

[机械臂舵机设置ID-Linux系统.mp4]

# 第二步：組裝

從動臂的組裝步驟與主動臂基本相同。唯一的區別在於第12步之後，末端執行器（夾爪和手柄）的安裝方式有所不同。

[SO-ARM101机械臂组装教程.mp4]

舵機驅動板的安裝：先安裝4個銅柱，然後用四個M2.5\*8的螺絲固定驅動板

![Linux/ubuntu系統 – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/7.png)

![Linux/ubuntu系統 – 2](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/8.png)

![Linux/ubuntu系統 – 3](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/9.png)

**Pro版 黑色主動臂使用5V6A電源適配器，白色從動臂使用12V5A電源適配器**

<RelatedProducts slugs="so-arm101,servo-driver-board,overhead-camera-mount" />
