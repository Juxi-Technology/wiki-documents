---
title: XLeRobot 运行指令
---

# XLeRobot 运行指令

> **所属**：[xlerobot/](01-Operation.md) —— XLeRobot 整机（双臂 + 底盘）
> **前置**：先读完 [deployment/](../deployment/01-Overview.md) 并进到容器里
> **另一条路**：[lerobot/](../lerobot/01-Operation.md)（单条 SO-101 臂 / LeKiwi）
> **下一篇**：[troubleshooting/](../troubleshooting/01-Troubleshooting.md)

🎯 **本篇只讲 XLeRobot 整机**（双臂 + 底盘）怎么跑。

要用 `lerobot-*` 命令行操作**单条 SO-101 臂**或 **LeKiwi**，去
[lerobot/](../lerobot/01-Operation.md)——两条路不一样。

本篇内容：校准、遥操作、按键表、录数据、训练、推理。

---

## 0. 先选路径 ⚠️

镜像里有**两个项目**，运行方式不同。**先看这张表确定你走哪条**：

| 你的硬件 | 走哪条 | 入口 |
|---|---|---|
| **XLeRobot 整机**（双臂 + 底盘） | ✅ **本篇** | `examples/` 下的示例脚本 |
| **单条 SO-101 / SO-100 臂** | ➡️ [lerobot/](../lerobot/01-Operation.md) | `lerobot-*` 命令行 |
| **LeKiwi** | ➡️ [lerobot/](../lerobot/01-Operation.md) | `lerobot-*` 命令行 |

**为什么分两条**：`lerobot-calibrate`、`lerobot-record`、`lerobot-teleoperate`
这些命令行工具**只认它们显式导入的机器人类型**（14 种原版机器人，**没有 `xlerobot`**）。
硬传会报：

```
lerobot-calibrate: error: argument --robot.type: invalid choice: 'xlerobot'
```

**XLeRobot 的入口是 `examples/` 下的示例脚本**（它们直接 import `XLerobot`）。

两条路**共用同一套环境**——随时可切，不用重装任何东西。

> 示例文件里虽然写着 host/client 双进程的用法，但**那部分是注释掉的**，
> 实际跑的是**直连模式**——一个终端就够，不用单独起 host。

---

## 1. 第一次跑遥操作之前：装两个 X11 库 ⚠️

镜像里缺两个 X11 库，**不装的话 rerun 可视化窗口会崩溃**：

```
Failed loading libxkbcommon-x11.so.0
thread 'main' panicked at 'Library libxkbcommon-x11.so could not be loaded.'
```

**机器人本身不受影响**（遥操作照常，键也响应），只是看不到可视化窗口，
而且 rerun 的数据通道会堵着刷 WARN 拖慢遥操作。

**另开一个终端**装进容器：

```bash
docker exec -u root -it xlerobot bash -c "apt-get update && apt-get install -y libxkbcommon-x11-0 libxinerama1"
```

⚠️ **`-u root` 不能省**——镜像默认以 `jetson` 用户运行，`docker exec` 进去
默认也是这个身份，而装 apt 包需要 root 权限。少了这个参数会报：

```
E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock — are you root?
```

而且**包会静默装不上**，rerun 照样崩，很容易误以为「装了没用」。

装完**重启遥操作脚本**（`Ctrl+C` 退出再重跑）。

> ⚠️ 这个改动**只在本次运行有效**——容器是 `--rm` 的，退出就没了，
> 所以每次重开容器都要装一遍。

---

## 2. 找串口

```bash
lerobot-find-port
```

它会提示你拔掉再插上舵机线，然后打印串口名（比如 `/dev/ttyACM0`）。

> 这个命令是**交互式**的，直接 `--help` 会报 EOF，正常现象。

**XLeRobot 用两个串口**（对应配置里的 `port1` 和 `port2`）：

| 参数 | 默认值 | 接什么 |
|---|---|---|
| `port1` | `/dev/ttyACM0` | SO-101 双臂 + 头部相机 |
| `port2` | `/dev/ttyACM1` | 底盘（轮子）相关的舵机 |

两个都要找出来。默认值是 `/dev/ttyACM0` 和 `/dev/ttyACM1`，**如果实际不是，
后面每条命令都要用 `--robot.port1=` / `--robot.port2=` 指定**（见第 6 节）。

---

## 3. 校准：跑示例时自动触发，不用单独跑命令

⚠️ **不要用 `lerobot-calibrate --robot.type=xlerobot`**。那个命令行工具只认它
显式导入的一批机器人（so100/so101/lekiwi 等），XLeRobot 的配置**不在名单里**，
会报 `invalid choice: 'xlerobot'`。

XLeRobot 的校准**内建在 `XLerobot.connect()` 里**，跑任意示例就会自动进入：

```bash
cd /opt/xlerobot
python examples/4_xlerobot_teleop_keyboard.py
```

**它会做什么：**

- **没有校准文件** → 自动进入引导校准：
  1. 提示「把左臂和头部舵机移到行程中点，按回车」
  2. 再提示「逐个关节走一遍全行程，按回车停止」
  3. 右臂和底盘同理
- **已有校准文件** → 问你：按回车恢复校准，还是输入 `c` 重新校准

校准文件存在：

```
~/.cache/huggingface/lerobot/calibration/robots/xlerobot/<id>.json
```

**这个目录必须挂载到宿主机**，否则每次重开容器都要重新校准：

```bash
-v ~/.cache/huggingface:/home/jetson/.cache/huggingface
```

> 如果你只想单独校准某一个 SO-101 臂（不是整个 XLeRobot），可以用原版命令，
> `so101_follower` 那个类型在 CLI 白名单里：
> ```bash
> lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_arm
> ```

> 有些示例（比如 `examples/0_so100_keyboard_joint_control.py`）用的是
> **代码里手写的校准系数**，而不是上面这个流程。具体用哪种取决于你的机器人
> 变体和所用的示例——先看一眼对应示例文件开头的注释。

---

## 4. 遥操作

**一个终端就够**（示例是直连模式，不用单独起 host）：

```bash
cd /opt/xlerobot
python examples/4_xlerobot_teleop_keyboard.py
```

**首次运行会自动进入校准引导**（不需要单独跑校准命令）：

1. `Move left arm and head motors to the middle of their range of motion and press ENTER....`
   → 把左臂和头部舵机摆到行程中间，**按回车**
2. `Move all left arm and head joints sequentially through their entire ranges of motion...`
   → 每个关节从头到尾走一遍，**按回车**结束
3. 右臂和底盘同理

以后有校准文件时会问：按回车恢复，还是输入 `c` 重新校准。

### 按键映射

**底盘**

| 键 | 作用 |
|---|---|
| `i` / `k` | 前进 / 后退 |
| `j` / `l` | 左移 / 右移 |
| `u` / `o` | 左转 / 右转 |
| `n` / `m` | 加速 / 减速（三档） |
| `b` | 退出程序 |

**左臂**

| 键 | 关节 |
|---|---|
| `q` / `e` | shoulder_pan（底座旋转）± |
| `w` / `s` | x（前后）± |
| `a` / `d` | y（左右）± |
| `z` / `x` | pitch（俯仰）± |
| `r` / `f` | wrist_roll（腕部旋转）± |
| `t` / `g` | gripper（夹爪）开 / 合 |
| `c` | 回零位 |
| `y` | 走矩形轨迹（演示/测试用） |
| `<` / `>` | head_motor_1 ± |
| `,` / `.` | head_motor_2 ± |

**右臂**

| 键 | 关节 |
|---|---|
| `7` / `9` | shoulder_pan ± |
| `8` / `2` | x（前后）± |
| `4` / `6` | y（左右）± |
| `1` / `3` | pitch（俯仰）± |
| `/` / `*` | wrist_roll ± |
| `+` / `-` | gripper 开 / 合 |
| `0` | 回零位 |
| `Y`（**大写**） | 走矩形轨迹 |

**其它**：`?` → 头部舵机回零位

> 左右臂是**镜像**的：左边用字母区（`q/e`、`w/a/s/d`），右边用小键盘/数字区
> （`7/9`、`4/6`、`8/2`、`1/3`）。`reset` 键也不一样——左臂 `c`，右臂 `0`。
> 注意矩形轨迹键左臂是小写 `y`、右臂是**大写** `Y`。

### 其它示例

| 示例 | 说明 | 需要额外装吗 |
|---|---|---|
| `4_xlerobot_2wheels_teleop_keyboard.py` | 两轮底盘版 | 不需要（同样要先装那两个库） |
| `5_xlerobot_teleop_xbox.py` | Xbox 手柄 | 需要 `pip install "lerobot[gamepad]"` |
| `7_xlerobot_teleop_joycon.py` | Joy-Con | 缺 `joyconrobotics` 模块，用不了 |
| `8_xlerobot_teleop_vr.py` | VR | 需要额外挂 XLeVR 目录 |

---

## 5. 采集示教数据

⚠️ `lerobot-record --robot.type=xlerobot` **用不了**（同第 0 节的原因）。

XLeRobot 只有 VR 那条录制路径，而它依赖 `XLeVR` 模块，不在镜像里。

**要用的话得自己写脚本**，用 LeRobotDataset API（库在镜像里）：

```python
from lerobot.datasets.lerobot_dataset import LeRobotDataset

ds = LeRobotDataset.create(
    repo_id="你的用户名/数据集名", fps=30,
    features={"observation.state": {"dtype": "float32", "shape": (6,), "names": None},
              "action": {"dtype": "float32", "shape": (6,), "names": None}},
    root="/data/ds")

# 遥操作循环里：
#   ds.add_frame({"observation.state": ..., "action": ..., "task": "pick"})
#   ds.save_episode()

ds.finalize()   # 必须调，否则元数据不落盘
```

可以参考镜像里的 `examples/8_vr_teleop_with_dataset_recording.py`，
把 VR 部分换成键盘遥操作。

**记得加 `-e HF_ENDPOINT=https://hf-mirror.com`**，不然推送数据集到 Hub 会失败。

> 写数据集时有个坑：`save_episode()` 之后**必须调 `ds.finalize()`**，
> 否则 episode 元数据不落盘，后面读不回来（报
> `Provided directory does not contain any parquet file`）。

---

## 6. 串口不是 ACM0/ACM1 怎么办

示例**没有 argparse**，串口用的是 `XLerobotConfig()` 的默认值：

```python
robot_config = XLerobotConfig()
robot = XLerobot(robot_config)
```

改成显式指定端口：

```python
robot_config = XLerobotConfig(port1="/dev/ttyACM1", port2="/dev/ttyACM2")
robot = XLerobot(robot_config)
```

改完直接重新跑（源码是挂载进去的，改宿主机文件立刻生效）。

---

## 7. 部署训练好的模型

ACT 策略**不需要额外依赖**，镜像里直接能用：

```python
from lerobot.policies.act.configuration_act import ACTConfig
from lerobot.policies.act.modeling_act import ACTPolicy

policy = ACTPolicy.from_pretrained("你的用户名/模型名")
policy.eval()

# 接上机器人后循环推理
# action = policy.select_action(batch)
```

镜像里已经预装好的策略：

| 策略 | 依赖 | 说明 |
|---|---|---|
| **ACT** | 无 | 最常用，实测可用 |
| **Diffusion** | `diffusers` | 需要完整版镜像 |
| SmolVLA / pi0 / groot | transformers | **未预装**，包很大且 CPU 上跑不动 |

> 同一进程里**不能同时 import 两个机器人变体**——`xlerobot_mecanum`
> 把自己的配置注册成 `"xlerobot"` 和基础版撞名了，会报
> `Cannot register ... already registered`。一台机器人只用一个变体，
> 分开进程跑就没问题。

---

## 8. 训练

```bash
lerobot-train \
  --policy.type=act \
  --dataset.repo_id=你的用户名/我的数据集名
```

> `lerobot-train` **不需要 `robot.type`**（只吃数据集和策略类型），
> 所以这个命令能用，不受第 0 节的限制。
>
> 训练很吃算力。CPU 上只能跑极小规模，实用的话需要 Jetson 的 GPU。

---

> **下一篇**：[troubleshooting/](../troubleshooting/01-Troubleshooting.md) —— 出问题了查这里
> **另一条路**：[lerobot/](../lerobot/01-Operation.md)（用 `lerobot-*` 命令行跑单臂 / LeKiwi）
