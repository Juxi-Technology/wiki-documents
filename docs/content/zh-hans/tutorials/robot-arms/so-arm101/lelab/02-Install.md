---
title: "2 · 安装与启动"
description: "安装与启动 LeLab:uv 一行命令或从源码安装(都会连带装上 LeRobot),浏览器打开 localhost:8000。"
---

# 2 · 安装与启动

> **上一篇**：[01 总览](01-Overview.md)
> **下一篇**：[03 接线与校准](03-Calibration.md)

两种方式都会把 LeRobot 一起装上——LeLab 需要它。

---

## 方式 A · 一行命令

需要先装 [uv](https://docs.astral.sh/uv/)。装进独立环境：

```bash
uv tool install --with-executables-from huggingface_hub git+https://github.com/Juxi-Technology/leLab.git && lelab
```

浏览器会打开 `http://localhost:8000/`。

## 方式 B · 从源码装

```bash
git clone https://github.com/Juxi-Technology/leLab.git
cd leLab
pip install -e .
```

`pip install -e .` 会把 React 前端构建好并打进 Python 包，所以一个进程同时提供 API 和界面。第一次装要几分钟。

提示找不到 Node.js 的话，装 **Node.js 22** 再重试。Node 只在安装时和开发模式下需要，之后**运行** LeLab 不需要。

> **想要官方的原版？** 本仓库是副本。原项目由 Hugging Face 的 LeRobot 团队维护：<https://github.com/huggingface/leLab>。本教程的内容对它同样适用。

---

## 启动

```bash
lelab
```

界面在 **<http://localhost:8000/>**，会自动打开浏览器。

| 参数 | 作用 |
|---|---|
| `lelab` | 生产模式。一个进程在 `:8000` 同时提供 API 和构建好的界面 |
| `lelab --dev` | Vite 热更新在 `:8080`，uvicorn `--reload` 在 `:8000`。需要 Node.js 22 |
| `lelab --rebuild` | 用本地源码重新构建前端，再按生产模式启动 |
| `lelab --no-open` | 启动但不自动开浏览器 |
| `lelab --stop` | 停掉正在跑的 LeLab，释放 8000 和 8080 端口 |

停止：`Ctrl+C`，或在另一个终端里

```bash
lelab --stop
```

页面打不开时用 `--stop`——多半是上一次的进程还占着 8000 或 8080。

---

## 确认装好了

打开 <http://localhost:8000/>，页签应有 **Calibration**、**Teleoperation**、**Recording**、**Datasets**、**Training**、**Inference**。

或在终端里确认：

```bash
curl http://localhost:8000/health
```

返回一段 JSON 状态。

---

## 开发模式

```bash
lelab --dev
```

Vite 在 `:8080`，API 带自动重载在 `:8000`。改 `frontend/src/` 下的东西页面不用重启就更新；改 `lelab/` 下的东西服务自己重载。

**`--dev` 模式下访问的是 `:8080`，不是 `:8000`。** 8000 上只有没挂界面的 API。

---

## 更新

LeLab 会检查安装时用的分支有没有新提交，有的话在界面里提示。手动更新：

```bash
uv tool install --with-executables-from huggingface_hub git+https://github.com/Juxi-Technology/leLab.git --force
```

可编辑安装（`pip install -e .`）不参与这个检查，用 `git pull` 更新。

---

> **下一篇**：[03 接线与校准](03-Calibration.md)

<RelatedProducts slugs="so-arm101" />
