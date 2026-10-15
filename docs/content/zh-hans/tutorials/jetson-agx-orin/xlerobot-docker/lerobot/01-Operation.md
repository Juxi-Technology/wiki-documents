---
title: 原版 LeRobot 运行指令
---

# 原版 LeRobot 运行指令

> **所属**：[lerobot/](01-Operation.md) —— 单条 SO-101 / SO-100 臂、LeKiwi
> **前置**：先读完 [deployment/](../deployment/01-Overview.md) 并进到容器里
> **另一条路**：[xlerobot/](../xlerobot/01-Operation.md)（XLeRobot 整机）
> **下一篇**：[troubleshooting/](../troubleshooting/01-Troubleshooting.md)

用 `lerobot-*` 命令行操作**单条 SO-101 / SO-100 臂**或 **LeKiwi**。

> ⚠️ 跑 **XLeRobot 整机**请去 [xlerobot/](../xlerobot/01-Operation.md)。
> 这些命令行工具**不支持 `xlerobot`**——原因见下面第 0 节。

---

## 0. 什么情况走这条

| 你的硬件 | 走哪条 | 为什么 |
|---|---|---|
| **单条 SO-101 / SO-100 臂** | ✅ **本篇**（`lerobot-*` CLI） | 原版工具直接支持 |
| **LeKiwi** | ✅ **本篇**（`lerobot-*` CLI） | 原版工具直接支持 |
| **XLeRobot 整机**（双臂 + 底盘） | ❌ 走 [04](../xlerobot/01-Operation.md) | CLI 白名单里没有 `xlerobot` |

**为什么分两条路**：`lerobot-calibrate` 这类命令行工具在源码里写死了一份机器人导入
列表（14 种原版机器人，完整清单见第 11 节），**里面没有 `xlerobot`**。硬传会报：

```
lerobot-calibrate: error: argument --robot.type: invalid choice: 'xlerobot'
```

反过来，`examples/` 下的脚本是给 XLeRobot 整机写的，单臂用不上。

**两条路共用同一套环境**——镜像里装的包就叫 `lerobot`，XLeRobot 只是往
`robots/` 目录里多加了三份代码。所以**随时可以切，不用重装任何东西**，
同一个进程里两者都能一起导入。

---

## 1. 完整流程

```
准备          校准          用起来                  训练         部署
────          ────          ──────                  ────         ────
find-port  →  calibrate  →  teleoperate  ┐
find-cameras              record        ┴→  train  →  rollout
                          replay
```

每一步一条命令，下面逐个说。

---

## 2. 准备：找串口和摄像头

```bash
lerobot-find-port          # 交互式：按提示拔插舵机线，打印串口名
lerobot-find-cameras opencv   # 逐个试摄像头并截图
```

`lerobot-find-cameras` 会把截图存到 `outputs/captured_images/`，看到画面
就说明摄像头可用。**实测可用**（识别 `/dev/video0` 并成功采集）。

> 两个命令都是**交互式**的，直接加 `--help` 会报 EOF，正常现象。

---

## 3. 第一次用新舵机：写入 ID

全新的舵机出厂 ID 都是 1，必须逐个改成 1~6 才能串在同一条总线上：

```bash
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0
```

它会提示你「只接一个舵机，按回车」，改完一个再插下一个。

> 只在新组装、或换了舵机时才需要。已经能正常通信的臂跳过这步。

---

## 4. 校准

```bash
lerobot-calibrate \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_arm
```

- **没有校准文件** → 进入引导：先把臂摆到行程中点按回车，再逐个关节走全行程
- **已有校准文件** → 问你是恢复还是重新校准

校准文件在 `~/.cache/huggingface/lerobot/calibration/robots/so101_follower/my_arm.json`。
**容器启动时挂了 `-v ~/.cache/huggingface`**（见 [deployment/03-Deployment](../deployment/03-Deployment.md)），
所以重开容器不会丢。

主从臂的话，从臂和主臂**各校准一次**：

```bash
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower
lerobot-calibrate --teleop.type=so101_leader --teleop.port=/dev/ttyACM1 --teleop.id=my_leader
```

---

## 5. 遥操作

### 用主臂带着从臂动（主从模式）

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=my_leader
```

### 没有主臂？用键盘

`--teleop.type` 里有个 `keyboard`，不需要第二种硬件：

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=keyboard
```

也可以用 `--teleop.type=gamepad` 接 Xbox 手柄（需要 `pip install "lerobot[gamepad]"`）。

### 带摄像头看画面

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=my_leader \
  --display_data=true --display_mode=rerun
```

> 用 rerun 可视化同样需要先装那两个 X11 库，见
> [xlerobot/](../xlerobot/01-Operation.md) 第 1 节。

---

## 6. 采集示教数据

```bash
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }" \
  --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=my_leader \
  --dataset.repo_id=<your-username>/<my-first-dataset> \
  --dataset.num_episodes=10 \
  --dataset.single_task="pick up the cube"
```

**参数说明：**

| 参数 | 作用 |
|---|---|
| `--robot.cameras` | 摄像头配置，**嵌套字典语法**，`名字: {type: opencv, index_or_path: ..., width/height/fps}` |
| `--dataset.repo_id` | 数据集在 Hugging Face 上的 ID（本地录完也可以推上去） |
| `--dataset.num_episodes` | 录几条 |
| `--dataset.single_task` | 任务描述，训练时用得上 |
| `--dataset.root` | 想存到别的目录就加这个，默认在缓存目录下 |

**录制过程中的按键**（终端里会提示）：

| 键 | 作用 |
|---|---|
| `→`（右方向键） | 提前结束当前 episode，进入重置阶段 |
| `←`（左方向键） | 丢弃当前 episode，重录这一条 |
| `Esc` | 停止整个录制 |

录完本地就能用。想推到 Hub：

```bash
--dataset.push_to_hub=true
```

（记得容器启动时加了 `-e HF_ENDPOINT=https://hf-mirror.com`。）

---

## 7. 回放检查

录完先回放看一遍，确认数据没问题再训练：

```bash
lerobot-replay \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --dataset.repo_id=<your-username>/<my-first-dataset> \
  --dataset.episode=0
```

---

## 8. 训练

```bash
lerobot-train \
  --policy.type=act \
  --dataset.repo_id=<your-username>/<my-first-dataset>
```

> `lerobot-train` **不需要 `robot.type`**（只吃数据集和策略类型），
> 所以这条命令和 XLeRobot 那条路是**共用**的——你录的 XLeRobot 数据也能这么训。
>
> 训练很吃算力。CPU 上只能跑极小规模，实用的话需要 Jetson 的 GPU。

可选策略（`--policy.type`）：`act`（最常用）、`diffusion`、`smolvla`、
`pi0` / `pi05` / `pi0_fast`、`groot`、`tdmpc`、`vqbet` 等。

---

## 9. 真机部署：跑训练好的策略

```bash
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<your-username>/<my-model> \
  --strategy.type=base
```

| 参数 | 说明 |
|---|---|
| `--policy.path` | 训练好的模型（Hub 上的 ID 或本地路径） |
| `--strategy.type` | `base` 最常用；还有 `sentry`、`highlight`、`episodic`、`dagger` |
| `--inference.type` | `sync`（默认）或 `rtc` |

> ⚠️ **别用 `lerobot-eval` 跑真机**——它是给**仿真 benchmark** 用的
> （`--env.type=aloha/pusht/libero/metaworld...`），不是真机部署。真机用
> `lerobot-rollout`。

---

## 10. 命令行工具全表

| 命令 | 作用 | 需要 `robot.type` 吗 |
|---|---|---|
| `lerobot-find-port` | 找串口 | 否 |
| `lerobot-find-cameras` | 找摄像头 | 否 |
| `lerobot-setup-motors` | 给新舵机写 ID | 是 |
| `lerobot-calibrate` | 校准 | 是 |
| `lerobot-teleoperate` | 遥操作 | 是 |
| `lerobot-record` | 录数据集 | 是 |
| `lerobot-replay` | 回放数据 | 是 |
| `lerobot-train` | 训练策略 | **否**（和 XLeRobot 共用） |
| `lerobot-rollout` | **真机**部署策略 | 是 |
| `lerobot-eval` | **仿真** benchmark 评测 | 否（用 `--env.type`） |
| `lerobot-edit-dataset` | 编辑数据集 | 否 |
| `lerobot-dataset-viz` | 数据集可视化 | 否 |
| `lerobot-info` | 打印环境与版本信息 | 否 |

---

## 11. CLI 支持的机器人类型（完整清单）

这是 `lerobot-*` 命令行**实际能认**的全部类型（从源码的白名单里读出来的）。
**没有 `xlerobot`**——这就是要分两条路的原因。

**机器人（`--robot.type`）—— 14 种：**

```
openarm_follower      bi_openarm_follower     rebot_b601_follower
bi_rebot_b601_follower so100_follower         so101_follower
bi_so_follower        hope_jr_hand            hope_jr_arm
koch_follower         lekiwi                  lekiwi_client
omx_follower          unitree_g1
```

**遥操作器（`--teleop.type`）—— 包括：**

```
so101_leader      so100_leader      bi_so_leader      koch_leader
openarm_leader    omx_leader        rebot_102_leader  unitree_g1
keyboard          gamepad           homunculus_arm    homunculus_glove
```

> 完整清单以你自己镜像里的 `--help` 为准，不同版本会有增删。

---

## 12. 一个完整的例子（从零到能跑）

```bash
# 1. 找设备
lerobot-find-port                          # 记下串口号，下面用 /dev/ttyACM0
lerobot-find-cameras opencv                # 记下摄像头，下面用 /dev/video0

# 2. 新舵机写 ID（只有新装的臂需要）
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0

# 3. 校准
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower

# 4. 键盘试一下能不能动
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=keyboard

# 5. 录 10 条数据
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }" \
  --teleop.type=keyboard \
  --dataset.repo_id=<your-username>/my-first-dataset \
  --dataset.num_episodes=10 --dataset.single_task="pick up the cube"

# 6. 训练
lerobot-train --policy.type=act --dataset.repo_id=<your-username>/my-first-dataset

# 7. 让机械臂自己跑
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<your-username>/my-first-dataset --strategy.type=base
```

---

## 验证情况

本篇的命令都在 JetPack 7.2 的 `chenyang310/xlerobot:jetson` 镜像里**实际执行过**：

| 项目 | 结果 |
|---|---|
| 14 种原版 `--robot.type` 参数解析 | ✅ 通过 |
| `--teleop.type`（含 `keyboard`）参数解析 | ✅ 通过 |
| `lerobot-calibrate` 全链路 | ✅ 走到打开串口才停（当时没接舵机） |
| `lerobot-teleoperate --teleop.type=keyboard` 全链路 | ✅ 同上 |
| `lerobot-find-cameras opencv` | ✅ **真硬件**：识别 `/dev/video0` 并成功采集图像 |
| `--robot.cameras` 嵌套语法解析 | ✅ 通过 |
| 原版机器人与 XLeRobot **同一进程共存** | ✅ 8 个类型同时注册成功 |

没接机械臂，所以**动作层面的验证还没做**。你接上 SO-101 之后按第 12 节跑一遍，
哪一步不对告诉我。

---

> **下一篇**：[troubleshooting/](../troubleshooting/01-Troubleshooting.md) —— 出问题了查这里
