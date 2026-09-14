---
title: SO-ARM101 无线遥操作(ESP32-NanoCam 版)
description: "面向比赛演示的无线遥操作方案:主臂经 LeRobot 连接 Ubuntu 电脑,从臂由 ESP32-NanoCam 模块通过 micro-ROS WiFi 控制,涵盖接线、供电、烧录、标定与摄像头 FPV 的完整流程。"
---

# SO-ARM101 无线遥操作(ESP32-NanoCam 版)

> **[ 淘宝店铺 ](https://juxitechnology.taobao.com)**

本教程面向比赛演示的无人机搭载 SO-ARM101 机械臂无线遥操作场景:主臂通过 LeRobot 连接 Ubuntu 电脑,从臂使用自研的 [ESP32-S3 WiFi 视频模块](/zh-hans/products/esp32-s3-wifi-module)(ESP32-NanoCam,ESP32-S3 N16R8)控制,通过 micro-ROS WiFi UDP 接收指令,并集成板载摄像头 FPV、麦克风、扬声器与 RGB 状态灯。遇到问题请参考 [排障指南](./SO-ARM101-NanoCam-Troubleshooting.md)。

## 简介与系统架构

```text
SO-ARM101 主臂(leader) → USB 舵机驱动板 → Ubuntu 22.04 (LeRobot + ROS2 Humble + micro-ROS Agent)
                                            │  2.4 GHz Wi-Fi(同一局域网)
                                            ▼
                              ESP32-NanoCam 从臂控制器(ESP32-S3)
                                            │  1 Mbps UART(经舵机驱动板 UART 针脚中转)
                                            ▼
                              SO-ARM101 从臂(follower) 6 × STS3215
```

- 主臂操作者动作 → LeRobot 读主臂 → ROS2 话题 `/joint_command` → micro-ROS Agent 通过 UDP 8888 发送 → ESP32-NanoCam 收下并驱动 6 个舵机;
- 从臂反馈 `/joint_states`(20Hz)反向回传,作为闭环与看门狗;
- 板载摄像头发布 MJPEG 流 `http://<IP>/stream`(FPV),PC 端可转成 ROS 话题。

角色分工:主臂接 Ubuntu 电脑;从臂由 ESP32-NanoCam 控制,两者无线连接。固件上电后的板载功能:

| 功能 | 实现 | 说明 |
|---|---|---|
| micro-ROS 遥操作 | `main.cpp` + `servo_bus.cpp` | `/joint_states` 20Hz 反馈、`/joint_command` 命令接收,内置完整安全机制 |
| 摄像头 FPV | `camera_stream.cpp` | `http://<IP>/stream` MJPEG 流(QVGA) |
| 麦克风 | `audio_es8311.cpp` | 环境音量电平 → `/follower_audio/level`(Float32,5Hz) |
| 扬声器 | `audio_es8311.cpp` | 启动/就绪/解锁/错误提示音 |
| RGB 状态灯 | `rgb_status.cpp` | 启动红 → WiFi 橙 → micro-ROS 绿 → 解锁蓝;WiFi 丢失红 |

## 硬件清单

| 硬件 | 数量 | 说明 |
|---|---|---|
| SO-ARM101 主臂 | 1 | 带 6×STS3215 舵机 |
| SO-ARM101 从臂 | 1 | 带 6×STS3215 舵机 |
| ESP32-NanoCam 模块 | 1 | ESP32-S3 N16R8,板载摄像头/音频/RGB |
| USB 舵机驱动板 | 2 | 标定 + 主从臂总线中转(UART 针脚) |
| Ubuntu 22.04 电脑 | 1 | 运行 LeRobot + ROS2 + Agent |
| 2.4GHz 路由器或手机热点 | 1 | 主臂电脑与 NanoCam 同一局域网 |
| 12V 5A 外部电源 | 1 | **从臂供电**(USB 带不动 6 个舵机) |
| 5V 6A 外部电源 | 1 | **主臂供电**(连接 Ubuntu 电脑) |
| USB-C 数据线 | 2 | NanoCam 供电/调试 + 主臂驱动板连电脑 |

> NanoCam 板载外设:摄像头 GC2145(DVP);音频 ES8311(I2S 24kHz,AP2718AT 麦克风 + NS4150B 扬声器);RGB WS2812 @ GPIO18。

## 接线方式

ESP32-NanoCam 与从臂之间**通过舵机驱动板的 UART 针脚中转**:

```text
舵机驱动板 UART:   RX ←── NanoCam TX (P2-8 / GPIO20)
                   TX ──→ NanoCam RX (P2-7 / GPIO19)
                  GND ──→ NanoCam GND
```

- **TX 连 RX、RX 连 TX(交叉)**,GND 共地,1 Mbps 波特率;
- NanoCam 舵机总线走 UART1,接模块 **P2-7 / P2-8**(调试串口走 USB-C,CH340K → UART0,两者完全独立,可以同时使用);
- 舵机总线与舵机电源共地(从臂 12V 5A 电源)。

### NanoCam 主要引脚

| 外设 | 引脚 |
|---|---|
| 舵机总线(UART1) | TX=GPIO20(P2-8 ESP_P),RX=GPIO19(P2-7 ESP_N),模块 P2 排针 |
| 调试串口(UART0) | GPIO43/44 → 板载 CH340K → USB-C(无原生 USB CDC) |
| 摄像头 DVP(GC2145) | D0~D7=GPIO4/2/1/3/5/7/8/10,PCLK=6,VSYNC=13,HREF=11,XCLK=9(24MHz),PWDN=12,RESET=14,SCCB SDA/SCL=41/42 |
| 音频 ES8311(I2S) | MCLK=39,BCLK=38,WS=47,DIN(ADC)=40,DOUT(DAC)=48;I2C SDA/SCL=41/42,地址 0x30 |
| 麦克风 | AP2718AT 模拟 MEMS(经 ES8311 ADC) |
| 扬声器 | NS4150B D 类功放(经 ES8311 DAC),板上无 PA 使能脚 |
| RGB | WS2812 @ GPIO18(1 颗,GRB,RMT 驱动) |
| BOOT | GPIO0 |

> 引脚定义来自 `docs/reference/nano_config.h` 与硬件原理图文档。

## 供电

| 设备 | 供电方式 |
|---|---|
| ESP32-NanoCam | **USB 数据线供电**(CH340K 调试串口同时工作) |
| 从臂(6×STS3215) | **12V 5A** 外部电源 |
| 主臂(连接 Ubuntu 电脑) | **5V 6A** 外部电源 |

> ⚠️ USB 带不动 6 个舵机,从臂必须用 12V 5A 外部供电;ESP32 用 USB 数据线供电即可。

## 环境要求

### 编译烧录端(Windows / Linux / macOS 均可)

| 项 | 要求 |
|---|---|
| 操作系统 | Windows 10/11 或 Linux(macOS 也可) |
| Python | 3.8+(`python --version` 验证) |
| PlatformIO | Core 6.x(含 esp32s3 工具链 + Arduino 框架) |
| 磁盘空间 | 至少 3 GB 空闲 |
| 网络 | 能访问 GitHub / Espressif CDN(首次下载工具链约 1-2 GB) |

### 运行端(Ubuntu 22.04 电脑,最终跑遥操作的地方)

| 项 | 要求 |
|---|---|
| 操作系统 | Ubuntu 22.04(64 位) |
| ROS 2 | Humble(Hawksbill) |
| LeRobot | 含 Feetech SO-101 支持(`so101_leader` / `so101_follower`) |
| micro-ROS Agent | `snap run micro-ros-agent` 或源码安装 |
| 依赖命令 | `nmcli`、`ip`、`flock`(NetworkManager、iproute2、util-linux 自带) |
| Python 环境 | `lerobot_so101` 虚拟环境(conda/miniforge) |

> 调试串口识别:NanoCam 的 USB 接口是 CH340K 转 UART0,Linux 下设备名通常是 `/dev/ttyUSB0`(或 `/dev/serial/by-id/...CH340*`),PlatformIO 可自动识别(板卡定义已配 CH340 的 HWID 0x1A86:0x7523);串口监视器波特率 115200。更完整的 LeRobot/Ubuntu 环境安装可参考 [SO-ARM101 使用教程](./SO-ARM101-Tutorial.md)。

## 安装步骤

### 1. 安装 PlatformIO(编译烧录端)

**方式 A:VSCode 扩展(推荐)**

1. 安装 [VSCode](https://code.visualstudio.com/);
2. 扩展商店搜索 **PlatformIO IDE** 并安装,装完自动重启并下载 PlatformIO Core;
3. 在 VSCode 终端里用 `pio --version` 验证。

**方式 B:命令行安装**

```bash
pip install platformio
```

> Windows 下 `pio` 命令若在 Git Bash 里找不到,改用 PowerShell/CMD 终端,或把 `C:\Users\<用户名>\.platformio\penv\Scripts` 加入 PATH。

### 2. 首次构建(自动下载工具链)

进入固件目录跑一次编译(不烧录):

```bash
cd firmware/nanocam_soarm
pio run
```

首次会依次下载:

1. espressif32 平台(`espressif32@7.0.1`);
2. **工具链** `toolchain-xtensa-esp32s3`(约 100 MB,来自 Espressif CDN);
3. Arduino 框架 `framework-arduinoespressif32`(约 200 MB)。

下载慢/卡住的处理:

- PlatformIO 剩余时间估算不准,常卡住一段时间后突然跳完,给 5 分钟观察百分比是否推进;
- 开代理/VPN(走系统代理);
- 手动下载工具链:浏览器下载 `https://dl.espressif.com/dl/xtensa-esp32s3-elf-gcc8_4_0-esp-2021r2-patch5-win32.zip`(Linux 对应 `-linux-amd64.tar.gz`),解压后把目录改名为 `toolchain-xtensa-esp32s3` 放入 `C:\Users\<用户名>\.platformio\packages\`,重跑 `pio run`;
- 中途 Ctrl+C 中断不会损坏环境,重跑会续传。

### 3. 安装 Ubuntu 运行环境

```bash
# 1. ROS 2 Humble(按官方文档安装)
#    https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debs.html
source /opt/ros/humble/setup.bash

# 2. LeRobot(含 Feetech 支持)
conda create -n lerobot_so101 python=3.10 -y
conda activate lerobot_so101
pip install lerobot[feetech]

# 3. micro-ROS Agent
sudo snap install micro-ros-agent
snap run micro-ros-agent udp4 --port 8888   # 测试能否启动

# 4. PlatformIO(Ubuntu 端若也要编译烧录)
pip install platformio
```

## 配置 WiFi

PC 与 NanoCam 必须在同一局域网(2.4GHz Wi-Fi,手机热点即可),且路由器/热点未开启客户端隔离。WiFi 配置有两种方式,二选一。

### 方式一:编译期配置(默认)

```bash
cd firmware/nanocam_soarm
cp src/wifi_config.example.h src/wifi_config.h
# 编辑 wifi_config.h:WIFI_SSID / WIFI_PASS / AGENT_IP(Ubuntu 电脑局域网 IP)
```

### 方式二:串口命令配置(推荐,无需重烧)

固件内置运行时配置(NVS 存储),通过调试串口(115200 波特率)随时输入:

| 命令 | 作用 |
|---|---|
| `wifi_ssid:你的热点名` | 设置 WiFi 名称并保存 |
| `wifi_pass:你的密码` | 设置 WiFi 密码并保存 |
| `agent_ip:Ubuntu电脑IP` | 设置 micro-ROS Agent IP 并保存 |
| `wifi_show` | 查看当前生效配置 |
| `wifi_clear` | 清除已保存配置,恢复编译期默认 |

任意设置命令保存后 **3 秒自动重启生效**。优先级:串口保存的配置 > 编译期默认。换热点/换电脑只需插 USB 敲三条命令,不用改代码重烧。

> 编译期默认值(`wifi_config.h`)始终保留,作为未用串口配置过时的回退;`wifi_show` 会区分"来自 NVS"和"编译期默认"。密码以明文存于 NVS,局域网演示场景可接受;`wifi_config.h` 含 WiFi 密码,已被 `.gitignore` 排除,请勿提交到仓库。

## 烧录与启动

```bash
cd firmware/nanocam_soarm
pio run --target upload
```

**进下载模式(关键)**:NanoCam 走 CH340K → UART0 串口下载(非 USB CDC 自动下载)。先直接跑 upload,若板子有自动下载电路会直接成功;若提示连接不上:**按住 BOOT 键(GPIO0)→ 插 USB(或按复位)→ 松开 BOOT**,立即重跑 upload。Windows 下若没自动识别串口,可在 `platformio.ini` 的 `[env:nano_cam]` 加一行 `upload_port = COM3`(替换成设备管理器里 CH340 的实际 COM 号)。

查看串口日志:

```bash
pio device monitor --baud 115200
```

烧录后应看到(按序出现):

```text
audio: ES8311 ready @24000Hz      ← 音频初始化成功
Servo Ping mask: 0x3f             ← 6 个舵机全部在线
Servo calibration match: YES      ← 标定数组与舵机 EEPROM 一致
IP: 192.168.x.x  RSSI: -xx        ← WiFi 已连
Waiting for micro-ROS Agent...    ← 等待 Agent(下一步启动后消失)
```

> 舵机总线烧录时可空着,烧录与舵机运行互不干扰(UART0 调试 / UART1 舵机独立)。工程已附带 ESP32-S3(xtensa-lx7)版 micro-ROS 静态库,日常使用无需自行编译。

## 标定说明

工程 `cali/` 目录已含主臂/从臂标定文件,固件内的标定数组也已与从臂标定对齐(即 `cali/follower_recal.json`)。**只有更换从臂/主臂硬件时才需要重新标定。**

```bash
# 从臂
python -m lerobot.scripts.lerobot_calibrate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --robot.id=follower_recal --robot.calibration_dir="$PWD/cali"

# 主臂
python -m lerobot.scripts.lerobot_calibrate \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM0 \
  --teleop.id=leader_recal --teleop.calibration_dir="$PWD/cali"
```

重新标定从臂后,必须打开 `firmware/nanocam_soarm/src/servo_bus.cpp`,把 `kHomingOffsets` / `kRangeMin` / `kRangeMax` 三个数组替换成自己的 `cali/follower_recal.json` 数值(顺序:shoulder_pan, shoulder_lift, elbow_flex, wrist_flex, wrist_roll, gripper),然后重新编译烧录。

## 运行无线遥操作

### 启动前检查

```bash
# 1. Ubuntu 电脑连上与 NanoCam 相同的 2.4GHz WiFi
# 2. 主臂 USB 舵机驱动板已连接并识别
ls -l /dev/ttyACM*   # 找到主臂串口
# 3. 从臂 NanoCam 已上电并联网(串口或浏览器确认 MJPEG 流可访问)
```

### 一键启动

```bash
# 设置环境(或直接编辑 start_soarm_demo.sh 顶部的默认值)
export SOARM_WIFI_SSID="你的2.4G热点"
export SOARM_AGENT_IP="Ubuntu电脑IP"
export SOARM_LEADER_PORT="/dev/ttyACM*"
export SOARM_PYTHON="$(command -v python)"   # lerobot_so101 环境

./start_soarm_demo.sh --check    # 预飞检查:网络/主臂/Agent/从臂在线
./start_soarm_demo.sh            # 正式启动遥操作,Ctrl+C 停止
```

脚本会按顺序做:

1. 检查网络(SSID 须与设置一致)、主臂串口、标定文件存在;
2. 启动 micro-ROS Agent(若未运行,日志在 `logs/micro_ros_agent.log`);
3. 等从臂 `/joint_states` 上线(15s 超时);
4. 主臂动作 → 从臂跟随,30Hz 命令频率,**`--mapping-mode absolute`(绝对映射)**。

**关于 absolute 映射**:主臂姿态与从臂姿态在各自标定坐标系里一一对应,好处是**断连重连后无累积偏差**——重连时从臂在 8 秒内平滑对齐主臂当前姿态(startup_blend),之后主臂回零 → 从臂也回自己零位。曾用 relative(相对)映射,但断连重连后从臂停留在断连位置,与回到零位的主臂产生永久偏差,故改为 absolute。

**Agent 失联自动重启**(固件 2026-08-19 后):Ctrl+C 停掉遥操作后,从臂约 10 秒内自动重启回到 `Waiting for micro-ROS Agent...`,因此可直接重跑本脚本,无需手动复位从臂(重连期间从臂会回零位,即重新上电)。

链路建立后从臂串口打印 `micro-ROS ready`(RGB 变绿、扬声器响就绪提示音),`Waiting for micro-ROS Agent...` 随之消失。

### 手动验证话题

```bash
ros2 topic echo /joint_states --once           # 从臂反馈
ros2 topic hz /joint_states                    # 应约 20 Hz
ros2 topic echo /follower_audio/level --once   # 麦克风电平(说话时抬升)
```

## 摄像头 FPV

固件上电联网后自动启动 MJPEG 流媒体服务(板载 GC2145,DVP 接口,默认 HTTP 端口 80):

```text
http://<NANOCAM_IP>/         信息页
http://<NANOCAM_IP>/jpg      单帧 JPEG(快照)
http://<NANOCAM_IP>/stream   连续 MJPEG 流(FPV)
```

### 参数与调参

- 分辨率 **QVGA 320×240**(正式配置),**RGB565 采集 + `frame2jpg` 软件编码**(GC2145 无硬件 JPEG 编码器,仅 OV2640/OV5640 有),JPEG 质量 12,双缓冲放 **8MB Octal PSRAM**;
- **为何用 QVGA**:实测 VGA(640×480) RGB565 在此板 DVP 上数据率过高,画面下方约 2/3 花屏(XCLK 24/20/16MHz × 单/双缓冲组合均复现);QVGA 完整流畅(帧率比硬件 JPEG 低,属正常);
- 流媒体运行在独立 httpd 任务中(栈已调至 16KB 容纳软编码),与 micro-ROS 遥操作、音频采集互不干扰;
- 默认 HTTP 端口 80(固件 `HTTPD_DEFAULT_CONFIG()`);
- 想改分辨率/质量:编辑 `firmware/nanocam_soarm/src/camera_stream.cpp` 里的 `config.frame_size` / `kJpegQuality`;画面方向用 `set_vflip` / `set_hmirror` 调整(同文件);
- esp_http_server 单任务,`/stream` 与 `/jpg` **不能同时访问**(开着流时 `/jpg` 会挂起);
- 摄像头初始化失败时固件打印一行提示后继续正常工作,遥操作不受影响。

PC 端接收(发布为 ROS 2 话题,消息类型 `sensor_msgs/CompressedImage`):

```bash
# 终端 1:照常启动遥操作
./start_soarm_demo.sh

# 终端 2:接收视频并发布话题
source /opt/ros/humble/setup.bash
python3 tools/follower_camera.py --stream http://<NANOCAM_IP>/stream
# 可选:--topic /自定义话题  --max-fps 10

# 验证
ros2 topic hz /follower_camera/image_raw/compressed   # 应约 10~15 Hz
rviz2    # Add → By topic → Camera,选 /follower_camera/image_raw/compressed
```

不装 ROS 也能先验证链路:浏览器打开 `http://<NANOCAM_IP>/stream`,或 `curl -s http://<NANOCAM_IP>/jpg -o snap.jpg`。

## 音频(麦克风与扬声器)

**麦克风**:AP2718AT 模拟 MEMS(经 ES8311 ADC)。固件每 200ms 读取一次环境音量电平(RMS,归一化 0~1),发布到 `/follower_audio/level`(`std_msgs/Float32`,best-effort)。可自行实现语音活动检测、环境监听,或作为"有人说话再抓取"的简单触发信号。

```bash
ros2 topic echo /follower_audio/level
```

**扬声器**:ES8311 DAC → NS4150B D 类功放(板上无 PA 使能脚),内置四组提示音(见下节);如需自定义提示音,修改 `audio_es8311.cpp` 中的 `play_tone()` 调用。音量在 ES8311 寄存器 0x32(`R_DAC32`,当前固件已设为最大 0xFF)。

### 音频参数与调参

- 采样率 24 kHz、16-bit、立体声槽位(与 NanoCam 原厂固件一致),MCLK = 256×FS = 6.144 MHz;
- **MCLK 由 LEDC 生成**(GPIO39,80MHz÷13≈6.154MHz,误差 0.16% 在容差内):legacy I2S 驱动在 ESP32-S3 上不输出 MCLK,会导致扬声器无声 + 麦克风电平恒 0,已在 `audio_es8311.cpp` 的 `start_ledc_mclk()` 中用 LEDC 修复;
- ES8311 控制走 I2C1(GPIO41/42 物理总线与摄像头 SCCB 共用,摄像头只在启动时使用 SCCB,运行期无冲突);`init()` 末尾 `Wire1.end()` 释放 I2C 给摄像头;
- 麦克风增益默认值同 NanoCam 原厂(寄存器 0x16 = 0x24),如需提高灵敏度可调 `audio_es8311.cpp` 中 `R_ADC16` 的值。

## RGB 状态灯与提示音

### RGB 状态含义

| 颜色 | 状态 |
|---|---|
| 红 | 启动中 / micro-ROS 初始化失败 / WiFi 丢失 |
| 橙 | WiFi 已连接,等待 micro-ROS Agent |
| 绿 | micro-ROS 就绪(遥操作链路通) |
| 蓝 | 舵机控制已解锁(ARMED) |
| 紫 | 控制命令被拒绝(握手/限位/步长不匹配) |

### 扬声器提示音

| 事件 | 提示音 |
|---|---|
| 上电 | 两声短"嘀嘀"(启动音) |
| micro-ROS 就绪 | 上扬双音 |
| 舵机解锁 | 上扬双音 |
| 初始化失败 | 一声低音 |

> 提示音是事件驱动的:启动音上电即播,就绪音在 Agent 通信建立时播,解锁音在收到控制命令时播,因此只上电不跑遥操作时只会听到启动音。

## 安全机制

固件内置以下安全机制,无需手动配置:

- 舵机身份检查、EEPROM 标定检查;
- 当前姿态握手(0.05 rad);
- 软限位;单命令步长限制 0.25 rad;
- 反馈看门狗 0.5 s;
- WiFi 丢失 10 s 超时自动重启。

> 飞行演示注意:倒挂安装后需重新确认关节方向、重心、供电(BEC)方案,并做 EMI 干扰测试。

## 验证状态

### 测试结果(预期)

- 六个从舵全部识别(`servo_mask=0x3f`);
- `/joint_states` 约 20 Hz 发布;
- 主控桥 30 Hz 发布命令;
- 摄像头流 `http://<IP>/stream` QVGA 流畅;
- `/follower_audio/level` 5 Hz 发布,说话时电平明显抬升;
- RGB 状态灯随启动→联网→就绪→解锁逐级变化;
- 拔掉 USB 数据线后(ESP32 独立供电,从臂外部 12V 供电)仍可运行。

### 开发状态

**已上板验证通过(2026-08-19):**

- 音频 `ES8311 ready @24000Hz`(MCLK 输出正常 + 扬声器/麦克风均正常,修复了 MCLK 缺失 + 音量过小);
- WiFi 连接 + micro-ROS 通信(`/joint_states` 20Hz 稳定、`/follower_audio/level` 正常);
- GC2145 摄像头 FPV:QVGA `/stream` 完整流畅(修复了 I2C 冲突 / 软编码 / httpd 栈 / multipart 边界);
- 完整遥操作链路(主臂动作 → 从臂跟随);
- **absolute 映射 + Agent 失联自动重启**:断连重连后主从臂对齐无偏差;Ctrl+C 后从臂自动重启等待重连。

**仍待验证:**

- 飞行场景:倒挂安装方向、重心、供电(BEC)、EMI 干扰。

## 工程结构与固件进阶

本项目从臂控制器由 ESP32-S3 演进到自研 ESP32-NanoCam 模块(ESP32-S3 N16R8,板载 DVP 摄像头 / ES8311 音频 / WS2812 RGB)。

### 目录结构

```text
firmware/nanocam_soarm/   ESP32-NanoCam 从臂固件 (PlatformIO)
  ├─ boards/nano_cam.json 自研板卡定义 (16MB Flash / 8MB Octal PSRAM)
  ├─ src/                 固件源码 (micro-ROS 遥操作 + 摄像头 + 音频 + RGB)
  ├─ lib/microros/        micro-ROS 静态库 (xtensa-lx7)
  └─ lib/scservo/         SCServo 舵机库 (本地化, 无网络依赖)
tools/                    PC 端脚本 (wireless_teleoperate.py 遥操作桥, follower_camera.py FPV 接收)
start_soarm_demo.sh       一键启动脚本 (网络/Agent/标定预检 + 遥操作)
cali/                     主臂/从臂标定文件
docs/                     项目进度与实验记录 + 硬件参考 (docs/reference/)
```

### 与早期版的差异

| 项目 | 本工程 (ESP32-NanoCam) |
|---|---|
| 板卡定义 | 自建 `boards/nano_cam.json`(16MB Flash / 8MB Octal PSRAM,qio_opi) |
| 舵机总线 | Serial1/UART1,TX=20/RX=19(UART0 被 CH340K 调试占用) |
| 调试串口 | UART0 (43/44) → CH340K → USB-C |
| 摄像头 | NanoCam DVP GC2145(GPIO1~14 + 41/42),XCLK 24MHz |
| 音频 | ES8311 + AP2718AT 麦克风 + NS4150B 扬声器(新增) |
| RGB | WS2812 状态灯(新增) |
| micro-ROS 库 | xtensa-lx7——NanoCam 同为 ESP32-S3,与 S3 版通用 |
| PC 端脚本 | 不变(tools/、start_soarm_demo.sh 与硬件无关) |

### micro-ROS 头文件路径与 build_flags

micro-ROS 头文件树是扁平结构(`include/<pkg>/<header>.h`),只保留 `-Ilib/microros/include` 根路径。**不要**添加逐包 `-Ilib/microros/include/<pkg>/` 路径——那会把 `<string.h>` 解析成 `rosidl_runtime_c/string.h`、把 WiFi 库的 `<Client.h>` 解析成 `rcl/Client.h`,导致编译失败。

### 重建 libmicroros.a(ESP32-S3 / xtensa-lx7)

> 本工程 `firmware/nanocam_soarm/lib/microros/` 已附上 ESP32-S3 版静态库(NanoCam 为 ESP32-S3,库通用)。**普通使用跳过本节**。只有当你需要自定义 micro-ROS 配置(消息类型、QoS、内存池等)时才需要重建——日常开发不需要重编 `libmicroros.a`。

**方式 A:官方 Docker 构建器(推荐,可在任意机器上执行)**

micro-ROS 官方 `micro_ros_arduino` 库的生成脚本自带 **esp32s3 目标**:

```bash
git clone -b humble https://github.com/micro-ROS/micro_ros_arduino.git
cd micro_ros_arduino
docker pull microros/micro_ros_static_library_builder:humble
docker run -it --rm -v $(pwd):/project \
  --env MICROROS_LIBRARY_FOLDER=extras \
  microros/micro_ros_static_library_builder:humble -p esp32s3
```

产物在 `src/esp32s3/libmicroros.a`,头文件在 `src/` 下各包目录中:

```bash
cp src/esp32s3/libmicroros.a <工程>/firmware/nanocam_soarm/lib/microros/
# 头文件整体替换(保留该目录下的 default_transport.cpp / wifi_transport.cpp /
# micro_ros_arduino.h 三个自定义文件)
rsync -a src/* <工程>/firmware/nanocam_soarm/lib/microros/include/ \
  --exclude esp32s3 --exclude '*.cpp' --exclude micro_ros_arduino.h
```

**关于工具链**:官方脚本的 esp32s3 段默认使用 `xtensa-esp32-elf`(LX6)工具链编译,LX6/LX7 对普通 C 代码指令集兼容、可运行。本工程随附的 `libmicroros.a` 是用**纯正 LX7 工具链**(`xtensa-esp32s3-elf` gcc 8.4.0,与 PlatformIO 内置版本一致)编译的,做法:下载 `xtensa-esp32s3-elf-gcc8_4_0-esp-2021r2-patch5-linux-amd64.tar.gz`(Espressif crosstool-NG releases),解压后把 `library_generation.sh` 里 esp32s3 段的 `TOOLCHAIN_PREFIX` 改为 `/uros_ws/xtensa-esp32s3-elf/bin/xtensa-esp32s3-elf-`,再挂载进容器重跑:

```bash
docker run --platform linux/amd64 -it --rm \
  -v $(pwd):/project \
  -v <解压目录>/xtensa-esp32s3-elf:/uros_ws/xtensa-esp32s3-elf \
  --env MICROROS_LIBRARY_FOLDER=extras \
  microros/micro_ros_static_library_builder:humble -p esp32s3
```

> 注意:Apple Silicon 上必须加 `--platform linux/amd64`(镜像内置的 esp32 工具链是 x86_64 二进制,arm64 容器内无法执行)。

**方式 B:Ubuntu 22.04 + ROS 2 Humble + PlatformIO 工具链**

1. 确保 PlatformIO 已下载过 S3 工具链(在固件目录跑一次 `pio run` 即可):

   ```bash
   ls ~/.platformio/packages/toolchain-xtensa-esp32s3/bin/xtensa-esp32s3-elf-gcc
   ls ~/.platformio/packages/framework-arduinoespressif32/tools/sdk/esp32s3
   ```

2. 用 micro_ros_setup 拉取 micro-ROS 源码(与 `build_microros.sh` 的 `/tmp/firmware/mcu_ws` 布局一致):

   ```bash
   mkdir -p /tmp/firmware && cd /tmp/firmware
   git clone -b humble https://github.com/micro-ROS/micro_ros_setup.git src/micro_ros_setup
   # 安装 micro_ros_setup 依赖后:
   source /opt/ros/humble/setup.bash
   colcon build && source install/local_setup.bash
   ros2 run micro_ros_setup create_firmware_ws.sh generate_lib
   ```

3. 运行本工程的 S3 构建脚本:

   ```bash
   cd <工程>/firmware/nanocam_soarm
   chmod +x build_microros_s3.sh
   ./build_microros_s3.sh
   ```

   脚本已把 riscv32 → xtensa-esp32s3、`-march=rv32imc` → `-mlongcalls`、`esp32c3` SDK → `esp32s3` SDK。产物按脚本末尾提示拷入工程即可。

### 参考资料

- NanoCam 硬件参考文档(原理图/规格书/引脚定义/ES8311 驱动):仓库 `docs/reference/`
- [micro-ROS](https://micro.ros.org/) / [micro_ros_arduino](https://github.com/micro-ROS/micro_ros_arduino)
- [LeRobot](https://github.com/huggingface/lerobot)

<RelatedProducts slugs="so-arm101,esp32-s3-wifi-module" />
