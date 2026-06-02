# Lerobot机械臂组装教程

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzBjNzNiYjg3NzhkNTBkNTM2ZWZmYzU4Nzc1NmYxMDZfYTMyNjk4ODAzZDAxN2IwZWExNWFjOGY2OTYwM2IwNGFfSUQ6NzU5Mjk0NjQxNTQxMzA1NDY3N18xNzgwMDUxNTUwOjE3ODAxMzc5NTBfVjM)

**Pro版 主动臂使用5V6A电源适配器，从动臂使用12V5A电源适配器**

舵机ID设置和舵机角度校准及组装要提前做好，可参考[官方组装教程](https://huggingface.co/docs/lerobot/so101)

# 第一步：设置舵机ID，安装舵盘（除5号舵机）

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MzY3ZDVjNDY5YTJkMWZhOWQ1MmZmMDE0NzUzYzAxMmNfYmM1NzdhZmI1M2E5YzFkMjQzYTA4ZmJlMzZjMDMxY2NfSUQ6NzU5NTQ4Mzg0NzY2ODk3NjYwMF8xNzgwMDUxNTUwOjE3ODAxMzc5NTBfVjM)

再次提醒，请确保舵机关节 ID 和齿轮比与 **SO\-ARM101** 的严格对应。

总线上每个电机都有一个唯一的ID。新电机通常带有一个默认ID `1`。为了确保电机和控制器之间的通信正常，我们首先需要为每个电机设置一个唯一的ID。此外，总线上的数据传输速度由波特率决定。为了能够相互通信，控制器和所有电机都需要配置相同的波特率，本机械臂舵机的波特率为100000。

为此，我们首先需要将控制器分别连接到每个电机，以便进行设置。由于我们会将这些参数写入电机内部存储器（EEPROM）的非易失性区域，因此只需操作一次即可。

如果您要重新利用其他机器人的电机，您可能还需要执行此步骤，因为 ID 和波特率可能不匹配。

下面的视频展示了设置电机 ID 的步骤顺序。

## Windows系统

\[飞特舵机上位机\.zip\]

使用飞特舵机上位机设置舵机ID并校准中位，ID设置是从1到6的！

\[机械臂舵机设置ID\-Windows系统\.mp4\]

## Linux/ubuntu系统

如需飞特舵机上位机可参考https://gitee\.com/ftservo/FTServo_Linux

请先按照 [LeRobot机械臂教程](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc) 跟进到 **C\. 机械臂控制**下 的 **端口授权 的 ****运行脚本以查找端口**

使用 USB 数据线从电脑连接到从动臂的舵机驱动板，并接通电源。然后，运行以下命令。请将命令中的\-\-robot\.port=/dev/ttyACM0 修改为找到的端口号。如查找的端口为/dev/ttyACM1，则修改为\-\-robot\.port=/dev/ttyACM1

```Python
lerobot-setup-motors \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0
```

您会看到以下输出。

```Python
Connect the controller board to the 'gripper' motor only and press enter.
```

依照指示，连接夹爪的舵机。请确保它是唯一连接到舵机驱动板的舵机，并且该舵机尚未与其他任何舵机进行连接。当您按下 **\[Enter\]** 键后，脚本将自动设置该舵机的 ID 和波特率，ID设置是从6到1的！

之后，您应该会看到以下信息：

```Python
'gripper' motor id set to 6
```

接着是下一条输出是:

```Python
Connect the controller board to the 'wrist_roll' motor only and press enter.
```

**注意 根据指示，对每个舵机重复上述操作。

与之前的舵机一样，请确保它是唯一连接到驱动板的舵机，并且舵机本身没有连接到任何其他舵机。

在每次按 **Enter** 键之前，请务必检查您的线缆连接。例如，在操作电路板时，电源线可能会断开。

当您完成所有步骤后，脚本将自动结束，此时舵机即可投入使用。现在，您可以将每根舵机的 3 针接口依次连接，并将第一个舵机（ID 为 1 的"shoulder pan"舵机）的线缆连接到驱动板。现在可以将驱动板安装到机械臂的底座上。

对主动臂重复相同的步骤。

```Python
lerobot-setup-motors \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM0
```

\[机械臂舵机设置ID\-Linux系统\.mp4\]

# 第二步：组装

从动臂的组装步骤与主动臂基本相同。唯一的区别在于第12步之后，末端执行器（夹爪和手柄）的安装方式有所不同。

\[SO\-ARM101机械臂组装教程\.mp4\]

舵机驱动板的安装：先安装4个铜柱，然后用四个M2\.5\*8的螺丝固定驱动板

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OTdjMDNmYWY1ZjFlOTU5NTMzYmNjOGJiMzI5NjAxNTlfNzk1NmY5N2ViOGM1OWFiYjBmYjY2NjcxN2VjNzIyZDBfSUQ6NzU5NTUxMjE2OTIyNDkzMjU1NV8xNzgwMDUxNTUwOjE3ODAxMzc5NTBfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MDVkMjRkZjNmOGE0NWNiNTBiYjQ0YmJiMDZhNGQzMDlfZGM2NmU2NTM4YzY3YjFhYWJjNjk4YjY5MjM5YjdkZGVfSUQ6NzU5NTUxMjE3MDQyODI3ODI3OF8xNzgwMDUxNTUwOjE3ODAxMzc5NTBfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTk5OGJiMzRhOTUyZTdiYjcxMjY5ODYxODAzMThlZWNfODJiYzRjNDgyOWJjMTIxNGRhOWEzOGM1MWFhOWZhNjJfSUQ6NzU5NTUxMjc4ODU2NDM2NDUwNV8xNzgwMDUxNTUwOjE3ODAxMzc5NTBfVjM)

**Pro版 黑色主动臂使用5V6A电源适配器，白色从动臂使用12V5A电源适配器**
