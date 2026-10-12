---
title: 02 · 環境準備
---

# 02 · 環境準備

> **上一篇**：[01-Overview](01-Overview.md)
> **下一篇**：[03-Deployment](03-Deployment.md)

裝好 Docker、設定好中國大陸網路、接好硬體。**這一篇沒做完，下一篇就跑不起來。**

---

## 1. 安裝 Docker

如果已經安裝了，可以跳過，先確認一下：

```bash
docker --version
```

還沒安裝的話：

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
```

**執行完最後一條之後要重新登入**（登出再登入，或重新啟動），否則 `docker` 指令會出現
權限錯誤。驗證方式：

```bash
docker run --rm hello-world
```

---

## 2. 設定中國大陸鏡像加速 ⚠️ 中國大陸使用者必做

**Docker Hub 從中國大陸直連會逾時**，不設定加速器的話，任何鏡像都拉不下來。

編輯 `/etc/docker/daemon.json`（沒有就新增）：

```json
{
    "registry-mirrors": [
        "https://docker.m.daocloud.io",
        "https://docker.1ms.run",
        "https://docker.xuanyuan.me"
    ]
}
```

重新啟動 Docker：

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

驗證是否生效：

```bash
docker info | grep -A4 "Registry Mirrors"
```

> ⚠️ 網路上流傳的許多鏡像網址已經失效（中科大、網易、`dockerproxy.com`
> 都已停止服務），別照抄舊文章。上面三個是 2026 年 9 月實測可用的。

---

## 3. 準備硬體

### 3.1 機器人接線

1. 把 SO-101 機械手臂的舵機透過 USB 轉接板連到電腦
2. 攝影機插 USB（如果用 RealSense 則插 USB 3.0 埠）

### 3.2 串口權限 ⚠️ 重要

不設定的話，**容器裡看不到裝置**：

```bash
sudo usermod -aG dialout $USER
```

**同樣需要重新登入才會生效。**

### 3.3 確認裝置是否被辨識

```bash
ls /dev/ttyACM* /dev/ttyUSB*    # 舵機串口
ls /dev/video*                   # 攝影機
```

能看到裝置節點就代表系統已經認出來了。

---

## 4. 設定 Hugging Face 鏡像 ⚠️ 中國大陸使用者必做

**`huggingface.co` 從中國大陸完全無法連線**，而載入預訓練模型時必須用到它。

啟動容器時加上這個環境變數：

```bash
-e HF_ENDPOINT=https://hf-mirror.com
```

`scripts/run.sh` 已經預設設定好了。完全離線的話再加 `-e HF_HUB_OFFLINE=1`。

---

## 檢查清單

進入下一篇之前，確認這幾條都通過了：

```bash
docker --version                       # Docker 裝好了
docker info | grep -A4 "Registry Mirrors"   # 加速器生效了
groups | grep dialout                  # 串口權限設定好了（重新登入後）
ls /dev/ttyACM*                        # 裝置認出來了
```

---

> **下一篇**：[03-Deployment](03-Deployment.md) —— 拉鏡像、啟動容器
