---
title: "2 · 安裝與啟動"
description: "安裝與啟動 LeLab:uv 一行命令或從原始碼安裝(都會連帶裝上 LeRobot),瀏覽器開啟 localhost:8000。"
---

# 2 · 安裝與啟動

> **上一篇**：[01 總覽](01-Overview.md)
> **下一篇**：[03 連接與校準](03-Calibration.md)

兩種方式都會一併安裝 LeRobot——LeLab 需要它。

---

## 方式 A · 一行指令

需要 [uv](https://docs.astral.sh/uv/)。會安裝到獨立的環境中：

```bash
uv tool install --with-executables-from huggingface_hub git+https://github.com/Juxi-Technology/leLab.git && lelab
```

瀏覽器會開啟 `http://localhost:8000/`。

## 方式 B · 從原始碼

```bash
git clone https://github.com/Juxi-Technology/leLab.git
cd leLab
pip install -e .
```

`pip install -e .` 會建置 React 前端並打包進 Python 套件，因此單一程序同時提供 API 與介面。第一次安裝需要幾分鐘。

若建置時找不到 Node.js，安裝 **Node.js 22** 後重試。Node 只在安裝時與開發模式需要——之後執行 LeLab 不需要。

> **想要上游的原始碼嗎？** 本倉庫是副本。原始版本由 Hugging Face 的 LeRobot 團隊維護，位於 <https://github.com/huggingface/leLab>。這些頁面的內容原封不動地適用於它。

---

## 啟動

```bash
lelab
```

在 **<http://localhost:8000/>** 提供介面，並開啟瀏覽器。

| 參數 | 功能 |
|---|---|
| `lelab` | 生產模式。單一程序在 `:8000` 同時提供 API 與建置好的介面 |
| `lelab --dev` | Vite 熱重載於 `:8080`，加上 uvicorn `--reload` 於 `:8000`。需要 Node.js 22 |
| `lelab --rebuild` | 從本機原始碼重建前端，再以生產模式啟動 |
| `lelab --no-open` | 啟動但不開啟瀏覽器 |
| `lelab --stop` | 停止執行中的 LeLab，並釋放 8000 與 8080 埠 |

用 `Ctrl+C` 停止，或在另一個終端機：

```bash
lelab --stop
```

頁面載入不了時請用 `--stop`：卡住 8000 或 8080 埠的殘留程序是常見原因。

---

## 確認是否成功

開啟 <http://localhost:8000/>。首頁有 **Calibration**、**Teleoperation**、**Recording**、**Datasets**、**Training** 與 **Inference** 分頁。

從終端機：

```bash
curl http://localhost:8000/health
```

會回傳 JSON 狀態。

---

## 開發模式

```bash
lelab --dev
```

Vite 在 `:8080`，API 在 `:8000` 並自動重載。修改 `frontend/src/` 底下的內容會在不重啟的情況下更新頁面；修改 `lelab/` 底下的內容會重載伺服器。

**在 `--dev` 模式下要瀏覽 `:8080`，不是 `:8000`。** 8000 埠只給你沒有介面的 API。

---

## 更新

LeLab 會檢查安裝時所用的分支是否有更新，並在介面中提示更新。手動更新：

```bash
uv tool install --with-executables-from huggingface_hub git+https://github.com/Juxi-Technology/leLab.git --force
```

可編輯安裝（`pip install -e .`）不在此檢查範圍內。這類請用 `git pull` 更新。

---

> **下一篇**：[03 連接與校準](03-Calibration.md)

<RelatedProducts slugs="so-arm101" />
