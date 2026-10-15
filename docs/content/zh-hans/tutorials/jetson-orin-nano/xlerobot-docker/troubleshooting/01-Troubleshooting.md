---
title: 常见问题与速查
---

# 常见问题与速查

> **所属**：[troubleshooting/](01-Troubleshooting.md)
> **相关**：[deployment/](../deployment/01-Overview.md) ·
> [xlerobot/](../xlerobot/01-Operation.md) ·
> [lerobot/](../lerobot/01-Operation.md)

---

## 常见问题

### 容器里看不到机器人的串口

```bash
# 宿主机上确认设备存在
ls /dev/ttyACM*
# 确认用户在 dialout 组
groups | grep dialout
```

不在组里就 `sudo usermod -aG dialout $USER` 然后**重新登录**。

### 拉镜像卡住 / 超时

没配镜像加速器。见 [deployment/02-Environment-Setup](../deployment/02-Environment-Setup.md) 第 2 节。

### 下载模型失败 / 连不上 huggingface

配 `-e HF_ENDPOINT=https://hf-mirror.com`。
见 [deployment/02-Environment-Setup](../deployment/02-Environment-Setup.md) 第 4 节。

### rerun 可视化窗口崩溃

```
thread 'main' panicked at 'Library libxkbcommon-x11.so could not be loaded.'
```

缺 X11 库。**机器人本身不受影响**，只是看不到窗口。
装库的命令和注意事项见 [xlerobot/](../xlerobot/01-Operation.md) 第 1 节——
关键是 `docker exec` **必须带 `-u root`**。

### 容器里 `torch.cuda.is_available()` 是 False

GPU 是必需的，所以这一定是配置问题，两处都查一下：

- 启动容器时用了 `--device nvidia.com/gpu=all` —— **不是 `--runtime nvidia`**，
  后者不注入设备节点
- 宿主机上 CDI 规范存在（`/etc/cdi/nvidia.yaml`）—— 见
  [03-Deployment §4](../deployment/03-Deployment.md)

### 容器起不来，报 CDI 错误

```
CDI device injection failed: failed to stat CDI host device "/dev/dri/card0"
```

宿主机上的自动刷新服务生成了引用了不存在的 `card0` 的规范。修复：

```bash
sudo systemctl disable --now nvidia-cdi-refresh.path nvidia-cdi-refresh.service
sudo rm -f /var/run/cdi/nvidia.yaml
sudo systemctl restart docker
```

（这个问题每次重启都会复现。）

### 校准每次都要重做

校准文件存在容器里，容器一删就没了。启动时挂载缓存目录：

```bash
-v ~/.cache/huggingface:/home/jetson/.cache/huggingface
```

`scripts/run.sh` 已经做了这件事。

### 校准命令报 `invalid choice: 'xlerobot'`

不是故障，是设计如此。`lerobot-calibrate` 的命令行工具不支持 XLeRobot，
校准会自动在示例脚本里触发。见 [xlerobot/](../xlerobot/01-Operation.md) 第 0、3 节。

### 数据集操作时刷一大段 torchcodec 报错

如果你用的是**自己装**的环境而不是镜像，可能看到
`libnvrtc.so.13: cannot open shared object file`。这是 torchcodec 在纯 CPU
环境下无法加载，lerobot 会自动回退到 pyav，功能不受影响。
镜像里已经把它卸掉了，不会出现这个报错。

### 容器里 `import` 两个机器人变体报错

```
Cannot register ... as xlerobot because ... is already registered
```

只在 **`xlerobot` 和 `xlerobot_mecanum` 这一对**之间发生——两者在源码里都注册成
`"xlerobot"`（mecanum 那份 config 是复制来的，注册名没改），这是 XLeRobot 上游的 bug。

**其它组合都不冲突**：原版 LeRobot 的所有机器人 + XLeRobot 可以**在同一个进程里共存**
（实测 8 个类型同时注册成功），`xlerobot_2wheels` 也不冲突。

一台机器人只会用到一个变体，所以实际使用不受影响。真要同时用（比如写对比脚本），
分开进程跑。

---

## 用原版 `lerobot-*` 命令时的问题

### `lerobot-record` 报摄像头相关的错 / 录出来的数据没有图像

摄像头要通过 `--robot.cameras` **嵌套字典**传，不是单独的顶层参数：

```bash
--robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }"
```

注意是 `index_or_path`（不是 `index`），`front` 是摄像头名字，可以起多个。
完整例子见 [lerobot/](../lerobot/01-Operation.md) 第 6 节。

### `lerobot-eval` 跑真机不工作

`lerobot-eval` 是给**仿真 benchmark** 用的（`--env.type=aloha/pusht/libero/metaworld...`），
**不是真机部署工具**。

真机上跑训练好的策略要用 **`lerobot-rollout`**：

```bash
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<your-username>/<my-model> --strategy.type=base
```

### 分不清该用 `examples/` 还是 `lerobot-*`

| 你的硬件 | 用哪个 |
|---|---|
| XLeRobot 整机（双臂 + 底盘） | `examples/` 脚本 → [xlerobot/](../xlerobot/01-Operation.md) |
| 单条 SO-101 / SO-100 臂、LeKiwi | `lerobot-*` 命令行 → [lerobot/](../lerobot/01-Operation.md) |

判据很简单：`lerobot-*` 的机器人白名单里**没有 `xlerobot`**（完整清单见
[lerobot/](../lerobot/01-Operation.md) 第 11 节）。

### `--robot.type` 传了但报 `invalid choice`

对照 [lerobot/](../lerobot/01-Operation.md) 第 11 节的完整清单——
只有那 14 种原版类型能用。`xlerobot` 不在里面，要用 `examples/` 脚本。

---

## 速查表

### 通用（两条路都要）

```bash
# 拉镜像
docker pull chenyang310/xlerobot:jetson

# 启动
bash scripts/run.sh jetson

# 进容器之后 —— 首次配置
lerobot-find-port                     # 找串口（交互式，按提示拔插舵机线）

# 装 rerun 需要的两个 X11 库（另开一个终端，-u root 不能省）
docker exec -u root -it xlerobot bash -c "apt-get update && apt-get install -y libxkbcommon-x11-0 libxinerama1"

# 训练（两条路共用：不需要 robot.type）
lerobot-train --policy.type=act --dataset.repo_id=<username>/<dataset-name>

# 自检
python -c "import torch, lerobot; print(torch.__version__, lerobot.__version__)"
python -c "import torch; print('GPU:', torch.cuda.is_available())"
```

### A · XLeRobot 整机（双臂 + 底盘）

```bash
# 遥操作：一个终端就够，首次会自动进入校准引导
python examples/4_xlerobot_teleop_keyboard.py

# 两轮底盘版
python examples/4_xlerobot_2wheels_teleop_keyboard.py

# ⚠️ 别用 lerobot-calibrate / lerobot-record / lerobot-teleoperate 传 xlerobot，
#    白名单里没有，只会报 invalid choice。XLeRobot 走 examples/ 脚本。
```

详见 [xlerobot/](../xlerobot/01-Operation.md)。

### B · 单条 SO-101 / LeKiwi（`lerobot-*` 命令行）

```bash
# 找设备
lerobot-find-port
lerobot-find-cameras opencv

# 新舵机写 ID（只有新装的臂需要）
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0

# 校准
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower

# 遥操作（键盘，不需要主臂）
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=keyboard

# 录数据集
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }" \
  --teleop.type=keyboard \
  --dataset.repo_id=<username>/<dataset-name> --dataset.num_episodes=10 \
  --dataset.single_task="pick up the cube"

# 回放检查
lerobot-replay --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --dataset.repo_id=<username>/<dataset-name> --dataset.episode=0

# 真机部署训练好的策略（⚠️ 不是 lerobot-eval，那个是仿真用的）
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<username>/<model-name> --strategy.type=base
```

详见 [lerobot/](../lerobot/01-Operation.md)。

### 按键速查

| 部位 | 键 | 作用 |
|---|---|---|
| 底盘 | `i` `k` `j` `l` | 前 / 后 / 左 / 右 |
| 底盘 | `u` `o` `n` `m` | 左转 / 右转 / 加速 / 减速 |
| 底盘 | `b` | 退出 |
| 左臂 | `q/e` `w/s` `a/d` `z/x` | pan / x / y / pitch |
| 左臂 | `r/f` `t/g` `c` `y` | wrist / 夹爪 / 回零 / 矩形轨迹 |
| 左臂 | `<` `>` `,` `.` | 头部舵机 1 / 2 |
| 右臂 | `7/9` `8/2` `4/6` `1/3` | pan / x / y / pitch |
| 右臂 | `/` `*` `+` `-` `0` | wrist / 夹爪 / 回零 |
| 右臂 | `Y`（**大写**） | 矩形轨迹 |
| 其它 | `?` | 头部回零 |

完整说明见 [xlerobot/](../xlerobot/01-Operation.md) 第 4 节。

---

## 附录：这份教程里提到的东西为什么是这样

| 决定 | 原因 |
|---|---|
| 必须要 Python 3.12 | lerobot 0.6.2 用了 PEP 695 语法（`type X = ...`、`class Foo[T]:`），3.10/3.11 连编译都过不了 |
| 国内必须配镜像加速器 | Docker Hub 直连超时，实测 `context deadline exceeded` |
| 必须配 HF_ENDPOINT | `huggingface.co` 从国内完全不可达，`hf-mirror.com` 可通 |
| Jetson 用 CDI 而不是 `--runtime nvidia` | JetPack 6/7 的 cgroup v2 环境下 `--runtime nvidia` 不注入设备节点 |
| 不装 placo 运动学库 | 它没有 cp312/aarch64 的轮子；XLeRobot 用的是自带的解析式 IK，不依赖它 |

---

## 相关链接

- [XLeRobot 项目](https://github.com/Vector-Wangel/XLeRobot)
- [LeRobot 官方文档](https://huggingface.co/docs/lerobot)
- [Docker Hub 使用量与限制](https://docs.docker.com/docker-hub/usage/)
- [钜犀科技 Wiki](https://wiki.juxitech.com)

---

> **回到开头**：[deployment/01-Overview](../deployment/01-Overview.md)
> **另一条路**：[xlerobot/](../xlerobot/01-Operation.md) ·
> [lerobot/](../lerobot/01-Operation.md)
