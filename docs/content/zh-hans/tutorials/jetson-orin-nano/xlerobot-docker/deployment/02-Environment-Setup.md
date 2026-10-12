---
title: 02 · 环境准备
---

# 02 · 环境准备

> **上一篇**：[deployment/01-Overview](01-Overview.md)
> **下一篇**：[deployment/03-Deployment](03-Deployment.md)

装好 Docker、配好国内网络、接好硬件。**这一篇不做完，下一篇跑不起来。**

---

## 1. 装 Docker

如果已经装了可以跳过，先确认：

```bash
docker --version
```

没装的话：

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
```

**执行完最后一条要重新登录**（注销再登录，或重启），否则 `docker` 命令会报
权限错误。验证：

```bash
docker run --rm hello-world
```

---

## 2. 配置国内镜像加速 ⚠️ 国内用户必做

**Docker Hub 从国内直连是超时的**，不配加速器拉不下来任何镜像。

编辑 `/etc/docker/daemon.json`（没有就新建）：

```json
{
    "registry-mirrors": [
        "https://docker.m.daocloud.io",
        "https://docker.1ms.run",
        "https://docker.xuanyuan.me"
    ]
}
```

重启 Docker：

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

验证生效：

```bash
docker info | grep -A4 "Registry Mirrors"
```

> ⚠️ 网上流传的很多镜像地址已经失效（中科大、网易、`dockerproxy.com`
> 都已停服），别照抄旧文章。上面三个是 2026 年 9 月实测可用的。

---

## 3. 准备硬件

### 3.1 机器人接线

1. 把 SO-101 机械臂的舵机通过 USB 转接板连到电脑
2. 摄像头插 USB（如果用 RealSense 则插 USB 3.0 口）

### 3.2 串口权限 ⚠️ 重要

不配的话，**容器里看不到设备**：

```bash
sudo usermod -aG dialout $USER
```

**同样需要重新登录生效。**

### 3.3 确认设备被识别

```bash
ls /dev/ttyACM* /dev/ttyUSB*    # 舵机串口
ls /dev/video*                   # 摄像头
```

能看到设备节点就说明系统认出来了。

---

## 4. 配置 Hugging Face 镜像 ⚠️ 国内必做

**`huggingface.co` 从国内完全不可达**，而加载预训练模型必须用它。

启动容器时加这个环境变量：

```bash
-e HF_ENDPOINT=https://hf-mirror.com
```

`scripts/run.sh` 已经默认配好了。完全离线的话再加 `-e HF_HUB_OFFLINE=1`。

---

## 检查清单

进下一篇之前，确认这几条都过了：

```bash
docker --version                       # Docker 装好了
docker info | grep -A4 "Registry Mirrors"   # 加速器生效了
groups | grep dialout                  # 串口权限配好了（重新登录后）
ls /dev/ttyACM*                        # 设备认出来了
```

---

> **下一篇**：[deployment/03-Deployment](03-Deployment.md) —— 拉镜像、启动容器
