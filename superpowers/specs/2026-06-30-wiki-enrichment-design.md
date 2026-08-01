# Wiki 内容丰富设计文档

**日期**: 2026-06-30  
**分支**: `improve-wiki`  
**目标**: 基于 Juxi-Technology GitHub 组织仓库，补齐缺失产品教程 + 为已有教程补充代码示例

---

## 1. 新增 4 个产品教程

### 背景

`Juxi-Technology` 组织共 14 个仓库，10 个已有对应 Wiki 教程，4 个缺失：USB 自动对焦摄像头、Jetson CSI 摄像头、2 自由度云台、心率血氧传感器。

### 教程结构

参照现有 SO-ARM101 教程标准：产品概述 → 规格参数 → 接线说明 → 代码示例 → 常见问题 → 技术支持。

### 新增文件

```
docs/tutorials/accessories/
├── usb-auto-focus-camera.md              # USB自动对焦摄像头（zh-CN）
├── jetson-csi-camera.md                  # Jetson CSI摄像头（zh-CN）
├── 2dof-camera-gimbal.md                 # 2自由度云台（zh-CN）
├── heart-rate-spo2.md                    # 心率血氧传感器（zh-CN）
├── en/tutorials/accessories/
│   ├── usb-auto-focus-camera.md          # (en)
│   ├── jetson-csi-camera.md              # (en)
│   ├── 2dof-camera-gimbal.md             # (en)
│   └── heart-rate-spo2.md                # (en)
└── zh-HK/tutorials/accessories/
    ├── usb-auto-focus-camera.md          # (zh-HK)
    ├── jetson-csi-camera.md              # (zh-HK)
    ├── 2dof-camera-gimbal.md             # (zh-HK)
    └── heart-rate-spo2.md                # (zh-HK)
```

### 4 个产品教程内容

**1. USB 自动对焦摄像头**  
- 资料源：`USB-Auto-Focus-Camera` 仓库（仅 README.md，无代码）
- 内容：概述（86°广角 AF 1080P 30FPS 免驱）+ 规格 + USB 接线 + OpenCV 捕获代码（基于标准 OpenCV 模式编写）+ FAQ

**2. Jetson CSI 摄像头**  
- 资料源：`Jetson-Orin-Board-CSI-Camera` 仓库（仅 README.md，无代码）
- 内容：概述 + CSI 排线接 Jetson Orin + GStreamer/OpenCV CSI 管道捕获代码（基于 README 描述+Jetson 标准代码模式编写）+ 常见问题

**3. 2 自由度相机云台**  
- 资料源：`2dof-camera-gimbal` 仓库（三语 README + 10 Python 示例 + 5 章三语教程 + 完整源码）
- 内容：概述 + 规格 + 接线 + 精选 3 核心示例（基础舵机控制、颜色追踪、自动追踪）+ 追踪算法简介 + FAQ

**4. 心率血氧传感器**  
- 资料源：`JUXI_HeartRate_SPO2` 仓库（Arduino 库 + Python 树莓派/Windows 示例 + CN/EN 教程 + 11 张图片 + 上位机）
- 内容：概述 + 规格（MAX30102）+ 接线（IIC/UART 双模式）+ Arduino 代码 + Python 树莓派示例 + 上位机引用 + FAQ
- 图片资源：从仓库 `img/` 复制到 `docs/public/images/tutorials/accessories/heart-rate-spo2/`

### 侧边栏

在三语 `config.ts` 的 `/tutorials/accessories/` 分组中，各增加 4 个条目。

---

## 2. 已有教程补充官方仓库示例

### 背景

以下产品在 GitHub 有对应仓库但教程未引用仓库代码：

| 已有教程 | 对应仓库 | 可补充代码 |
|---------|---------|-----------|
| AmazingHand 系列 | `AmazingHand` (Python) | 控制代码、TTL 通信示例 |
| KWS 语音识别 | `Sound-card-for-KWS-speech-recognition-module` (Python) | 串口通信、唤醒词示例 |
| OLED 屏幕 | `OLED-Secondary-Display-RaspberryPi-Jetson` (Python) | IIC 驱动代码 |
| IMU 模块 | `ICM42670P-High-Precision-IMU-Module` (Python, ROS1/2) | ROS 示例、校准代码 |
| USB 免驱声卡 | `Driver-Free-Sound-Card` | README 规格补充 |

### 补充方式

在现有教程文件末尾追加「官方仓库示例」章节（仅中文版，英文和繁体暂不追加以减少冗余）：

```markdown
## 官方仓库示例

钜犀科技为该产品提供了开源代码仓库：[GitHub](https://github.com/Juxi-Technology/<repo>)

### 基础使用

\\`\\`\\`python
# 从仓库 examples/ 中提取的核心示例
\\`\\`\\`
```

每篇追加 1-3 个从对应仓库直接提取的代码片段，加简要说明。不重写原有内容。

### 涉及文件（修改）

- `docs/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control.md`
- `docs/tutorials/accessories/KWS-speech-recognition-module/index.md`
- `docs/tutorials/accessories/0.91-oled-screen-tutorial.md`
- `docs/tutorials/sensors/imu/index.md`
- `docs/tutorials/accessories/usb-audio-card-tutorial.md`

---

## 3. 文件变更总览

| 文件 | 操作 | 模块 |
|------|------|------|
| `docs/tutorials/accessories/usb-auto-focus-camera.md` | 新建 | 新产品教程 |
| `docs/tutorials/accessories/jetson-csi-camera.md` | 新建 | 新产品教程 |
| `docs/tutorials/accessories/2dof-camera-gimbal.md` | 新建 | 新产品教程 |
| `docs/tutorials/accessories/heart-rate-spo2.md` | 新建 | 新产品教程 |
| `docs/en/tutorials/accessories/` (4 文件) | 新建 | 英文教程 |
| `docs/zh-HK/tutorials/accessories/` (4 文件) | 新建 | 繁体教程 |
| `docs/public/images/tutorials/accessories/heart-rate-spo2/` | 新建 | 心率图片 |
| `docs/.vitepress/config.ts` | 修改 | 侧边栏入口 |
| 5 篇已有教程 | 修改 | 追加仓库示例章节 |

---

## 4. 验收标准

1. 4 个新产品在 tutorial 页面可访问，三语内容完整
2. 侧边栏 accessories 分组有这 4 个产品入口
3. 构建通过，无死链
4. 已有教程中追加的代码示例能正确展示

## 5. 不做

- 不对现有教程原有内容做结构调整
- 不新增产品分类或子目录
- 不在 en/zh-HK 版已有教程中追加代码（仅 zh-CN 版追加以减少维护负担）
