# 灵巧手官方示例运行教程

## 1.代码下载

建议下载本使用教程下的代码压缩包进行Demo示例演示，或克隆 官方开源代码仓库https://github.com/pollen-robotics/AmazingHand.git，官方开源代码或有错漏请务必注意。

Windows 代码压缩包

[AmazingHand-main.zip]

Linux 代码压缩包

[AmazingHand-main.zip]

```Plain Text
git clone https://github.com/pollen-robotics/AmazingHand.git
```

## 2.环境安装

根据系统自行安装Rust、uv、dora-rs

**1、安装 Rust：**https://www.rust-lang.org/tools/install

windows端 Rust环境变量设置（重点！） 参考https://zhuanlan.zhihu.com/p/1933164131969659101

Linux端环境变量设置：

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OWViNDExYjI0ZGQ2N2M0ZDdkMmQzNzNlZWEwY2MwYmRfNTcxZWE0NmJkNmNiNmY3YTFjODk1MTM0MzhlNDdkNzhfSUQ6NzYwMDczMTM3Mzg1NDcwNjkwMl8xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjM4OGEyMWRlZTU0YjgyOGJiM2NiZjIwMGRiNmNhYzBfMTJkMTRiYzUzODVkNzFlYmYwMjk1NzY2NjhlYzJhMGVfSUQ6NzYwMDczMTM3MTgyOTE1MjcxMl8xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

首次安装可能需要Visual Studio Installer

**配置 Cargo 镜像源**

在 `.cargo` 文件夹中创建 `config.toml` 配置文件, 配置清华 `crates.io-index` 镜像，这样Cargo 将会使用清华大学的镜像源来下载 crate。

```Bash
[source.crates-io]
replace-with = 'tuna'

[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"
```

**2、安装 uv：**https://docs.astral.sh/uv/getting-started/installation/

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZDI0Mzg0NzJhNDhmODVjZjg1YTlkZjc1NDc4MmYyM2FfZjI3NDEwMWY4ZDU0NTkwZTE0NTk0YmZjZTNiNTdlZTRfSUQ6NzU5OTQ5NDY5MDA5Mzc4MDE5MF8xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

windows端打开Powershell终端，复制后输入此命令进行安装

**Linux端**环境变量设置：

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OGY1ZjhiMTcxM2E3YmUwMmQ5MWZkNzYyMzg5NThmYTNfZmM2ZmVmMmIzZTkxNjVjM2Y5YzM4YjlkN2Y1ZTRiOGRfSUQ6NzYwMDczMTY1MDYxNTY5MjIyNV8xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

**3、安装 dora-rs：**请参考https://dora-rs.ai/docs/guides/Installation/installing下载安装

linux端环境变量设置：

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MjJkYTY4ODU0OGIxYjRmMzBkNTE3NjZlZTFhY2Q5YTNfNjkxNzE1MDU2Y2ZkZjk1NTYzMDk0YjRhMDE3NjVmNDRfSUQ6NzYwMDczMTUyMDg3ODIzNDg0Ml8xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

## 3.接线方式

电源要求至少5V3A，外接 舵机驱动板，通过USB连接到电脑端

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjUwYzFiMDYzMWRhOTRlMjU2NTlkZjllNzZkNWY2N2RfOGU3ZmYzNDdhMjNiMDE2YzE3Y2MzZjFkZDJmMWI2MzJfSUQ6NzY0MTkwNzU0MzE2MTk4MTg5NV8xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

## 4.示例演示

### **1、查看舵机驱动板端口号**

- windows系统一般为COM11，可通过 设备管理器 或者 飞特舵机上位机 找到 舵机驱动板 的端口号

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YmE4MjczZTMxNzk0NGYzYTY0YWM1YTQzZDllZjI4NTNfODA5NzQyODdiODllMDZiYWE2NWZjNmU1NmUzN2YyY2ZfSUQ6NzU4NzM1NzczNTQzMjU1NTQ4Ml8xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

- Ubuntu、Linux系统一般为/dev/ttyACM0

通过命令行查看舵机驱动板的端口：

```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```

```Plain Text
sudo chmod 666 /dev/ttyACM*
```

```Plain Text
sudo usermod -aG dialout $USER
```

若是在虚拟机里 ls /dev/ttyUSB* /dev/ttyACM* 找不到目录，请检查虚拟机右下角是否将灵巧手连接到电脑，若是，请选择断开，并连接到虚拟机里

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NGU5ZWVjYzQ5NDE1NGZlYTQxOWMzOTE1YjY2MzQ0M2FfM2NlYTc5NTVlZjEwMjZiNDY1OTIxZDBmMjU2OTU4ZTFfSUQ6NzYxMTgyODIzODMxODg0ODk4NF8xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

### **2、修改代码中的端口号**

①找到AmazingHand-main\Demo\AHControl\src目录下的main.rs代码文件，文本打开，修改为自身主机查找到的端口号（windows为COM*，ubuntu、linux系统一般为/dev/ttyACM*）

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=Y2FiMWQzNzZmMmZjMWI1ZTNkY2YyMzgwYmRlOGI0OTJfOTM4OTRjZjRjNGM5NDY5ZTM4MTZmNjMxZGRiYmMyNjFfSUQ6NzU4NzM1OTMzMDc3MzY2NzA0NF8xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

②找到对应的实例文件

**右灵巧手** 找到AmazingHand-main\Demo目录下的 dataflow_tracking_real_right.yml

**左灵巧手** 找到AmazingHand-main\Demo目录下的 dataflow_tracking_real_left.yml

**双灵巧手** 找到AmazingHand-main\Demo目录下的 dataflow_tracking_real_2hands.yml

文本格式打开，修改为自身主机查找到的端口号（windows为COM*，ubuntu、linux系统一般为/dev/ttyACM*）

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NWQ0MjA1OWRmMTI1M2YyYzlkMzU4OGI4YjM3ODg3MzNfMjdjZTVjZTljMmM3Yjk4YWVjMjVhNDA1YWUzMzA2NGRfSUQ6NzU5NTE0OTg1Mjk0MDMwNzQwMF8xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NDk3YWMwYmVmNzE5M2Q5OTgxZDRiY2YyMWNmZGI1ZGJfMGEyNTZkOGIzZTk5MzcwNGYzOWZkNjg3NzAyM2ExZmZfSUQ6NzU5NTE0OTg5NDU5NzA3MDAyOV8xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MWRlNmU2ZGEzNDgxMTU0ZTEwZGIxNmEzZTVjYzcwNTBfMTkwMGY3MzYwODMwNDJjN2NmMDNkYjk3NWQ4MTUxYzNfSUQ6NzU9NTE0OTk3MTQ5NTUyMTQ5OV8xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

### **3、代码部署**

- 打开Demo文件夹

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ODFjYzI3YTZmNTdlZTFjYTRmMzM1NzE4N2Y0M2Y1MmJfMzEwNmY2NjY2NjRiZDQyOGQyNmE5ZTkwM2M2ZmQzMGJfSUQ6NzYzOTI3MTcwNzE0MjM0MzYyOV8xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

- Windows系统 在目录中输入Powershell 回车打开

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YWY4NWM3NzQ4ZjNkYTM1ZTE3ZmMyODJhYTM2OGNjOTZfNWI0MmM1YmVhMDE3YWY1NDY2N2UzYjZjYzNkYmU3M2VfSUQ6NzYzOTI3MTY0NTY4NTg0NDkyOF8xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

- 启动守护进程（每次都要）：

Linux系统 直接使用控制台打开，启动守护进程（每次都要）：

```Plain Text
dora up
```

- 然后在控制台中从该目录运行（搭建环境时曾经运行过一次即可！！再此运行会覆盖掉虚拟环境！！）创建虚拟环境：

```Plain Text
uv venv --python 3.12
```

- 激活虚拟环境（每次都要）请根据 系统 输入并运行：

```Plain Text
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process

.venv\Scripts\activate
```

```Plain Text
source .venv/bin/activate
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NWU4OGYwMWU1YWMwN2NjMTZiMTUzOWEyMWE0YWJiNDVfYTE1NDU0NDY3YTI2NTJkOTlkNWU4ZGM0MzAzOWYxZGFfSUQ6NzU4NzIzNDI5MTk3Mzc3MDQ0MF8xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

确保控制台已经激活虚拟环境！

- 执行依赖同步，进入到AHControl文件夹

```Plain Text
cd AHControl
```

```Plain Text
cargo build --release
```

- 然后 输入`cd ..`并回车 返回Demo目录下！进入到AHSimulation文件夹

```Plain Text
cd AHSimulation
```

```Plain Text
uv sync
```

- 然后输入`cd ..`并回车 返回Demo目录下！进入到HandTracking文件夹

```Plain Text
cd HandTracking
```

```Plain Text
uv sync
```

### 4、运行结果

- 打开Demo文件夹！在目录中输入Powershell 回车打开，启动守护进程（每次都要）：

```Plain Text
dora up
```

- 激活虚拟环境（每次都要）请根据 系统 输入并运行：

Windows端激活虚拟环境的命令：

```Python
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

```Plain Text
.venv\Scripts\activate
```

Linux端激活虚拟环境的命令：

```Plain Text
source .venv/bin/activate
```

### 模拟环境

- 仅在模拟环境下运行网络摄像头手部追踪演示：

```Plain Text
dora build dataflow_tracking_simu.yml --uv   #（只需执行一次）
```

```Plain Text
dora run dataflow_tracking_simu.yml --uv
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjBhZDcwMzQyZTNhYzRhMjI5ZjdjZDE2ZGU1ZWZiZjBfZDhmYzU5YWY4MzQ2NDcxMWY4Y2NiZjYxZmFlZGI4YTJfSUQ6NzU4NzIzNDI5MTk3Mzc3MDQ0MF8xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=Mzg3OTRhYjFiMDVjNzJjYmEyMWQ1OWNkNTk1ODljZTVfM2EzMTg3ZTY2ZGY3Zjg2YWVkYWY1YjA2ZTNkZmMwODVfSUQ6NzU4NzI0MjkzMjgzMTk0Nzk3OF8xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

### 真实硬件运行（手部追踪）

- 使用真实硬件运行网络摄像头手部追踪演示：

    #### 右灵巧手

    ```Plain Text
    dora build dataflow_tracking_real_right.yml --uv   #（只需执行一次）
    ```

    ```Plain Text
    dora run dataflow_tracking_real_right.yml --uv
    ```

    #### 左灵巧手

    ```Plain Text
    dora build dataflow_tracking_real_left.yml --uv   #（只需执行一次）
    ```

    ```Plain Text
    dora run dataflow_tracking_real_left.yml --uv
    ```

    #### 双灵巧手（注意都连接到一个舵机驱动板上）

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjhkZDA0MDg4NWJjNzc1NWE3MDEzYTg4ZWI4NDg2YjlfMGVhOWQ3MzU0OGI5YzdiZDE3ZjMzMWMyOTUyZjYyZGZfSUQ6NzYyMzYyNDM5MzI4NzIyNDI2N18xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

    ```Plain Text
    dora build dataflow_tracking_real_2hands.yml --uv   #（只需执行一次）
    ```

    ```Plain Text
    dora run dataflow_tracking_real_2hands.yml --uv
    ```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MWU5Mjg1OGFlZjE0OGJhMDFiODA4NWI0NTE4OGIwOThfN2EzNDkxODFlNWQ2YjQ0ODNiNzdjMjNkMmFmYzIxZDFfSUQ6NzU4NzI0NTUyMDEyMTk3Mzk2MF8xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MzA5MDMzMTBkMGJlN2Q4NmEyZWI0MzJlODc1NTMzYjJfNmZhMjhlZjE5ZDFiOGYzNTFmM2FjZDVkNzI2NzEzYTRfSUQ6NzU4NzI0NDk4NTkyMjM0MTgzOV8xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

### 简单示例控制仿真手指角度

- 运行一个简单的示例来控制仿真中的手指角度：

    ```Plain Text
    dora build dataflow_angle_simu.yml --uv   #（只需执行一次）
    ```

    ```Plain Text
    dora run dataflow_angle_simu.yml --uv
    ```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YWZiOWQzMWI1ZjZkNjljMjNmNTNlMzcxY2IxMmU0ODFfMzdhYjVjMDQ5NTllNTFiMjQyZTczZmU4MzRkNzAzNWZfSUQ6NzU4NzI0NTY5MzcxMDk3Nzk5Ml8xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzJhNmYxY2MzYzM2Nzc5N2JhNTc4MDZhODE1YmU0OGVfMDY0OTE1OWI2YjMzYzEzNGE3MTAzOTlmMzVmMTBhOGFfSUQ6NzU4NzI0NTIxMTQzMzczMzA4OF8xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

描述说明

- [AHControl](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/AHControl)包含一个 dora-rs 节点来控制电机，以及一些用于配置电机的实用工具。

- [AHSimulation](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/AHSimulation)包含一个 dora-rs 节点，用于模拟手部运动并获得逆运动学。

- [HandTracking](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/HandTracking)包含一个 dora-rs 节点，用于从网络摄像头跟踪手部并将其用作控制 AH! 的目标。


## 注意事项

### 1、mediapipe版本问题

pyproject.toml 中配置 mediapipe>=0.10.14，但安装后的 mediapipe 包缺少 solutions 子模块，大概率是mediapipe 版本与 Python 3.12 不兼容（高版本 mediapipe 对 Python 3.12 的支持存在问题），或安装过程中包文件损坏。

```Plain Text
uv pip uninstall mediapipe
```

```Plain Text
uv pip install mediapipe==0.10.14
```

### 2、Dora 版本不兼容，消息格式（v0.7.0 vs v0.8.0）

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MzI3MGZjYmQ2YjFmYzMyOWJiMWM3Zjc4Y2FlYjExMmJfMjM4NjVmMDQ1OGE1MWNmNzg3OGYyM2RhNThhYmIxYWZfSUQ6NzYyNjE5NDE1ODc4OTM0ODI4OV8xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

答：①先在C盘用户目录下的.cargo/registry/src/github.xxxxxxxx/ 下只删除对应的依赖包！

**`dora-message-0.7.0`**（核心！这是旧版消息格式文件夹，必须删）

`dora-core-0.4.1`

`dora-node-api-0.4.1`

`dora-arrow-convert-0.4.1`

`dora-metrics-0.4.1`

`dora-tracing-0.4.1`

`const-random-macro-0.1.16`（Dora 依赖的辅助库，随旧版一起删）

②打开Demo/AHControl文件夹修改Cargo.toml里的dora-node-api="0.5.0" dora-message="0.8.0"

③控制台进入到AHControl目录下重新运行cargo build --release

④在重新跟着"[真实硬件运行](https://juxitech.feishu.cn/wiki/ZpHmwYARQiN2fwkqFJecqUFZnQg?node-id=1759567650651511609&from=from_node_link)"重新进行build

根据实际报错情况修改对应的版本，例如dora-message需要0.6.0的，修改成dora-node-api="0.4.0" dora-message="0.6.0"

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MjI2YWY1NDJlNTk3ZDM2MGU5MzQwOTI1MjIzMWQ5M2RfOTFhOGNiMGEzZjhkMGY5YjZmZjI1ZDVjNjZkMzRhMGFfSUQ6NzYyNjE4ODEyODY3MTk3NjY2MF8xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTVmODNhNzJhN2VlMDY4YzY1ODhhYWRiOGI1OGVlMzVfZGYzM2E4ZThmYjVlM2NjOGYzZDJiMTZkZGJmYWFhNTFfSUQ6NzYyNjE4ODE5NzM0MDg0Mjk0NV8xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

### 3、没有openCV依赖库

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OWVjYTE2ZjM1YjE3MTYyZjJlNWIyNDRlN2ViMjBjMjFfMmI5Mzk0OGVmYjUxNjQwZDExMTI1ODJhMzUxZWYxZmNfSUQ6NzU3MTMwMDc2MjI3OTM3ODk3Ml8xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

在HandTracking目录下输入以下命令

```Python
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

### 4、相机权限开启（电脑端）

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzI5MDcxYjhhNjkyY2YwNjBmY2EyMWFmYjRiNWEyYzZfMDUzZjhjYzY4ZDcyYmUxNWQ3MzNlNmZkNmU3ODY2YTZfSUQ6NzU5OTk5Mjc0MDcxNzc0MzA3Ml8xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZWQ2NDMwM2M2ODE5MDQ2Yzg0MGQyZmQxZDhjNzE4YWFfYThmOGRjMzE1Y2M0NWQxYjQ2NGRhNTczNzcwMDRlNzlfSUQ6NzU5OTk5MjgwODk3NTcxNTUzNF8xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTFmMGVjYWQwYjdjYWI1MmE4NjQ2ZDMyODZkZGY2YjJfNzkxZmNkNTdhMGZmN2E2N2M3YjBlNTExMGQwYTg4OTFfSUQ6NzU5OTk5MjkzODEwMTczODQ0N18xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

### 5、虚拟机22.04调用摄像头

参考https://blog.csdn.net/qq_19731521/article/details/124954288

### 6、桌面摄像头安装

#### 环境相机套件支架安装步骤

1.先固定微调角度支架

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NjhhMDIxNmMyYzEwYzljNGFkNGNhNzk1MDY0ZWQ2NGVfZDU4NjMyNWU1YWFiZmUzMDYxZWE3YjdiZTFhNjNiY2JfSUQ6NzYyNjIwMDAzNTc1MTY2MDUxMF8xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

2.侧视环境相机套件

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NzNhMmFjZGUyNTNiNDlkYzk1MzFiMTRjNzlhZjI5NGZfMmYyMTBhNzMyMjEzZjkzM2Y4MWRhMjA1NzkyMzdmMGZfSUQ6NzYyNjIwMDAzNjY4MjQ2ODU3Nl8xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)



## 虚拟机22.04 直接运行手部追踪

将这四个文件下载并放在同一个英文目录下，用虚拟机软件直接打开.ovf文件进入系统

密码ubuntu

[ubuntu22.04_amazinghand.ovf]

[ubuntu22.04_amazinghand-disk1.vmdk]

[ubuntu22.04_amazinghand.mf]

[ubuntu22.04_amazinghand-file1.iso]

**1.在Demo目录下打开控制台：**

```Plain Text
dora up
```

**并激活虚拟环境：**

```Plain Text
source .venv/bin/activate
```

**2.虚拟机调用摄像头权限**

虚拟机22.04调用摄像头参考https://blog.csdn.net/qq_19731521/article/details/124954288

**3.通过命令行查看舵机驱动板的端口：**

```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```

```Plain Text
sudo chmod 666 /dev/ttyACM*
```

```Plain Text
sudo usermod -aG dialout $USER
```

**4.修改代码文件里的端口号**

①找到AmazingHand-main\Demo\AHControl\src目录下的main.rs代码文件，文本打开，修改为自身主机查找到的端口号（windows为COM*，ubuntu、linux系统一般为/dev/ttyACM*）

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=Nzk2ODM5OTU2OGJhN2E2NDgyNWU1MjQ5ZGFiYWZjNWJfMGFmYzUwYzMzMzhhNmFmMTIyOGZlNjkwMDJiNDNhODFfSUQ6NzYwMTE0NDE2NTMwNDM3MjE4OF8xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

②找到对应的实例文件

**右灵巧手** 找到AmazingHand-main\Demo目录下的 dataflow_tracking_real_right.yml

**左灵巧手** 找到AmazingHand-main\Demo目录下的 dataflow_tracking_real_left.yml

**双灵巧手** 找到AmazingHand-main\Demo目录下的 dataflow_tracking_real_2hands.yml

文本格式打开，修改为自身主机查找到的端口号（windows为COM*，ubuntu、linux系统一般为/dev/ttyACM*）

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MmZkNTU0MzVlY2EyY2Y1OGU0NmU5NDQ5NTNiODY2ZGNfY2M4NDNmMWE2MmI5NzYxODFiNTY0YTBlZDg5Y2ZmMmFfSUQ6NzYwMTE0NDE2MTc5ODI0NTMxNl8xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ODU4MmQ0ODZlMWYwYTFjMzVjNjNkNzA2NzJmMWM0NjBfMzM5ZTdjNzY0N2U2NGQ2MjY4MjY2NGI5N2E5ZTdjYTZfSUQ6NzYwMTE0NDE2MjcxODM4NzQwMF8xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjY4YTdiMTM5NTZhZmJmZmUyY2I3NmZhMGI3ZGYzOTVfY2NjNWQyZTc5NzM5MmIxMjhhNGU1MWQ1ZDVjNzE2NzdfSUQ6NzYwMTE0NDE2NDAyMTA5NTYxM18xNzgwMDUxNzA4OjE3ODAxMzgxMDhfVjM)

**5.运行 右手 手部追踪**

```Plain Text
dora run dataflow_tracking_real_right.yml --uv
```
