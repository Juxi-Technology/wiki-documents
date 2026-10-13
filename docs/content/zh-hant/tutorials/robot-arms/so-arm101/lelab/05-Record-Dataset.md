---
title: "5 · 錄製資料集"
description: "錄製資料集:在 Recording 頁設定資料集名稱(repo_id)、任務描述、episode 數量與攝影機,把遙操作示範錄成 LeRobotDataset。"
---

# 5 · 錄製資料集

> **上一篇**：[04 遙操作](04-Teleoperation.md)
> **下一篇**：[06 訓練與推論](06-Train-and-Inference.md)

資料集是一群 **episode** 的集合，每個 episode 都是一次從頭到尾完成任務的示範。錄製就是遙操作加上一個錄製控制項。

## 設定

開啟 **Recording** 分頁並填寫：

| 欄位 | 填入內容 |
|---|---|
| **資料集名稱**（`repo_id`） | `your-name/task-name`，例如 `juxi/pick-up-the-cube`。若打算上傳，`name/` 這部分必須是你的 Hugging Face 使用者名稱 |
| **任務描述** | 一句話，例如 `pick up the cube and drop it in the box`。這是策略所依據的條件文字 |
| **Episodes** | 要錄多少個示範——見下 |
| **Cameras** | 要納入哪些已設定的攝影機，以及用什麼解析度與影格率 |

### 要錄多少個 episode

簡單的取放任務用 **30 到 50** 個。非常重複的任務可以少一些；變化多的任務需要多一些。

一致性比數量更重要：每個 episode 的起始位置、攝影機取景與任務描述都要相同。五十個幾乎一致的示範，勝過一百個變化多端的示範。只在你希望策略能強健應對的地方做變化——如果每個 episode 一開始方塊都在同一點，策略就只會學到那一點。

## 錄製期間

| 按鍵 | 動作 |
|---|---|
| `SPACE` 或 `→` | 結束當前 episode，開始下一個 |
| `DEL` 或 `←` | 丟棄剛錄好的 episode 並重錄 |

分頁會顯示 episode 計數器與 session 計數器。

任務完成時就結束 episode——不是等手臂回到起點之後。回到起點是下一個 episode 的事。

手滑、把物件碰移位，或沒完成任務時，就重錄該 episode。策略會從資料集中的所有內容學習，包括錯誤。

## 停止

累積到足夠的 episode 後就停止 session。**錄製是在你停止時才定案的**——資料集索引就在那時寫入。在 episode 中途被終止的 session，可能留下讀起來不完整的資料集。

## 資料放在哪

預設在 `~/.cache/huggingface/lerobot/` 底下，以你選擇的 `repo_id` 為鍵。在你從 **Upload** 分頁推送之前，不會上傳任何東西。

## 檢查錄製結果

開啟 **Datasets** 分頁並選擇資料集。你可以逐格瀏覽各 episode，一次一台攝影機，並附有關節運動軌跡。

訓練前先做這件事。它能抓到你在握著手臂時看不見的問題：

- 攝影機旋轉設錯——畫格是歪的
- 某個 episode 開頭有一段空白的停滯時間
- 腕部攝影機中途飄出畫面

重錄一次只花幾分鐘；訓練後才發現，代價是整輪訓練。

---

> **下一篇**：[06 訓練與推論](06-Train-and-Inference.md)

<RelatedProducts slugs="so-arm101" />
