---
title: "07 · 常見問題與經驗"
description: "本流程實際踩過的坑，按現象速查。"
---

# 07 · 常見問題與經驗

本流程實際踩過的坑，按現象速查。

## 環境類

| 現象 | 原因與解法 |
| --- | --- |
| `uv sync` 報 `failed to persist temporary file ... os error 17（跨盘）` | 本機 uv 快取目錄跨盤的 Windows 特例。所有 uv 指令前加 `export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'` |
| 主控台刷幾十行 `libtorchcodec_core*.dll` 載入失敗 | 噪音警告：torchcodec 載入失敗後自動回退 **pyav**。實測（smoke [5]）pyav **編解碼影片資料集都正常**，狀態資料集和影片資料集都不受影響 |
| `python` 開啟 Microsoft Store | 用 uv 管理的 Python；別用 Store 版 |
| `lerobot-train` 報 `accelerate is required but not installed` | 初次安裝時漏了 `training` extra——按 [01](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/01-Environment) 的 `uv sync` 指令補上 `--extra training` 後重試（01 的一次性安裝已包含，按 01 裝完不會遇到） |

## 遙控操作類

| 現象 | 原因與解法 |
| --- | --- |
| 鍵盤控制「很慢」 | `--teleop.rate` 預設 60 單位/秒偏保守；提到 **150** 手感正常（全行程約 1.3s） |
| 啟動日誌刷 `clamped to be safe` WARNING | 限速器追趕過程中的正常輸出，到位即停 |
| 主臂居中時模擬臂偏幾度 | 校正範圍不對稱導致的固定偏置——用 `so101_leader_trim` 自動微調（[05](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/05-Leader-Digital-Twin)） |
| 連線瞬間手臂突然運動 | 是設計行為：實機上力矩並朝中點/主動臂姿態移動；保持手邊留有空間 |
| Ctrl-C 退出後手臂變軟下墜 | 正常：斷開時關閉力矩，手扶一下 |
| 遙控操作/錄製期間打字會驅動手臂 | 鍵盤監聽**全域且不攔截按鍵**：任何視窗敲到映射鍵（含注音字母）都會進按鍵佇列。鍵盤模式遙控操作/錄製時別打字；主動臂模式無此問題 |

## 錄製類

| 現象 | 原因與解法 |
| --- | --- |
| `q` 退出後，工作階段期間按的字母「一下子全吐在命令列」 | Windows 主控台輸入緩衝的積壓回顯；啟動器已內建 `drain_pending_keys()` 清理（舊工作階段才有此現象） |
| 某回合 action span 全為 0 | 空錄（人沒動）——錄前先動一下，或事後刪除該回合 |
| 回合開頭 1 秒誤差很大 | 收斂段：開錄瞬間從動臂還在初始位姿，主動臂已停在別處；把主動臂事前放到中位附近可避免 |
| `--dataset.root` 配成父目錄後資料集「不見了」 | **root 就是資料集目錄本身**；每場錄製換一個新 root |
| `Esc` 和 `q` 的區別 | `q` 只停錄製；`Esc` 還會中斷鍵盤遙控操作。兩者都能乾淨收尾（已修復），習慣用 `q` |
| 儲存時 `ValueError: You must add one or several frames...` 行程帶著報錯退出 | 回合**間隙**裡多按了 `→`/`n`（最常見：儲存+雙路影片編碼停頓幾十秒、主控台看著像卡住，手癢連按了幾次），旗標滯留到下一回合開頭被吃掉 → **0 影格空回合**，上游儲存空回合時崩潰（lerobot 已知邊界）。**已存回合不受影響、資料完好**；重開工作階段續錄即可。**已加防護**（2026-10-16）：`record.py` 在每個回合開始時清掉間隙期滯留的 `→`/`←` 旗標（錄製中按鍵照常生效），儲存前會輸出 `saving the episode + encoding videos now...` 提示；回歸測試 `smoke_test.py` [7] |
| 開錄瞬間 `KeyError: 'wrist'`（含影像資料集） | 相機首影格還沒渲染完就被錄製迴圈讀了觀測；**已修復**（2026-10-16）：機器人外掛 `connect()` 現在會等第一影格畫面就緒再返回 |
| 含影片的腳本報 `BrokenProcessPool` / `Invalid argument: '<stdin>'` | 影片編碼走**多行程池**，子行程要靠檔案路徑重新匯入進入點模組——把錄製腳本用 `python - <<EOF`（stdin）執行就會崩潰。把腳本存成真實 `.py` 檔案再執行即可（真實進入點 `record.py` 不受影響） |
| 儲存回合時 `SvtMalloc[fatal]: allocate memory failed ... av.error.MemoryError: [Errno 12] ... 'avcodec_open2(libsvtav1)'`，整場工作階段退出 | 上游預設編碼器 **libsvtav1** 在雙相機（wrist+top）兩路編碼同時開啟時一次性大塊記憶體配置失敗（模擬+預覽視窗佔用下更易觸發；2026-10-16 實測踩過）。**已修復**：`record.py` 預設注入 `--dataset.rgb_encoder.vcodec=h264`（雙路 h264 同時編碼實測通過；明確傳 vcodec 可覆蓋）。已儲存回合無損；崩潰可能在資料集目錄留下 `tmp*/` 和孤立 parquet（按 run2 的方式清理） |
| 錄製中畫面變卡頓（尤其按 `→` 之後），但操作其實沒延遲 | 卡的是**儲存/編碼視窗**：編碼行程預設吃滿 CPU（雙路影片同時進行），同時模擬執行緒還在渲染 5 個畫面（內顯更明顯）。控制迴路本身不受影響——以 cadence 數字為準（實測全程 29.97Hz、0 tick 超預算）。**已緩解**（2026-10-16）：`record.py` 預設 `--dataset.encoder_threads=2`（每路編碼限 2 執行緒）；相機預覽視窗更新降到 15Hz（`--robot.preview_fps`）。回合越短，儲存視窗佔比越大、感受越卡；想徹底消除停頓可用 `--dataset.streaming_encoding=true`（邊錄邊編碼，上游推薦，待實測） |
| 儲存回合時編碼器報**記憶體配置失敗**、整場退出（svtav1 的 `SvtMalloc`、x264 的 `malloc ... failed`、`avcodec_open2` 報錯都屬此類） | 本機系統提交記憶體(commit)長期逼近上限（2026-10-16 實測 **105.9GB / 119.7GB**，已連續開機 29 天）。每次儲存新起 2 個編碼行程（各自載入 torch/av，commit 尖峰大），在懸崖邊同時啟動就會出問題。**已緩解**：`record.py` 現在給編碼加**失敗自動重試一次**（瞬時失敗不再丟回合），儲存期日誌刷屏也已靜音（`av.logging.set_libav_level` + HF 進度條）。**根治 = 重啟機器**（清理長跑累積的 commit / 核心洩漏；使用者態行程只佔 27GB，其餘在核心/驅動層，殺不掉）；自查：`Get-Counter '\Memory\Committed Bytes'` vs `'\Memory\Commit Limit'` |

## 硬體類

| 現象 | 原因與解法 |
| --- | --- |
| COM 埠號和上次不一樣 | 序列埠號隨插拔/換埠變化，每次先列連接埠確認（[03](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration)） |
| 唯讀檢查提示缺伺服馬達 | 接線/供電問題；先檢查驅動板與線序，別急著校正 |
| `shoulder_lift` 方向與直覺相反（模擬） | 該模型的正方向朝下，映射前先驗證符號（[02](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/02-Sim-Model-Verification)） |

## 設計說明（為什麼這樣做）

- **MuJoCo 會改寫網格頂點資料**：`<mesh>` 載入後，`mjModel.mesh_vert` 存的是**網格自身座標系**裡的
  頂點（原點被重定到頂點重心、軸向被重排），不再是檔案原始座標——直接用它算包圍盒/套 CAD 尺寸會
  得到錯誤結果（渲染顯示不受影響）。要拿 CAD 真實幾何，用原始檔案解析（`preview_mount.py` /
  `step_to_stl.py` 裡的做法）。踩過一次：支架真實尺寸 54.3 × 35.0 × 75.0 mm。
- **MuJoCo 相機的取景方向是它座標系的 −Z**：`<camera>` 元素不朝自身 +Z（鏡頭凸起方向）看。第一版
  相機模組把鏡頭建在 +Z、元素朝向 identity → 畫面實際從 PCB 背面「倒看」出去，**鏡頭指向和畫面方向
  正好相反**（調參時「轉的方向和畫面對不上」的根源；2026-10-16 用紅/藍板對照渲染測試定位）。
  修復：相機元素繞 Y 轉 180°（`view.quat = RPY(0,180,0)`，preview_mount / adjust_camera / 機器人外掛
  三處統一）；`adjust_camera.py` 新增 "sim_cam live view" 即時畫面視窗，調鏡頭所見即所得。
- **官方教學 MJCF 的夾爪是「鳥喙式」點接觸爪**：兩片齒尖閉合到 ~2.3 mm 點接觸、幾乎沒有可用夾持面。
  系統物理實驗（2026-10-16，數百組）結論：方塊放在齒口附近任意位置，都會在約 100° 的閉合掃掠中被
  鏟走/楔出，無法夾起（16–34 mm 方塊均如此；機械行程與力矩本身正常）。**禁止用「補碰撞片」的
  方式修**——曾試過給兩爪補齒板（能顯著改善夾持），但那是實機上不存在的幾何，訓練出的策略會依賴它、
  造成 sim2real 失真，已撤除。正確的修法是**用實機的爪部幾何替換官方模型的爪**（如 menagerie 的
  SO-ARM101 或自家 CAD 重建），物理參數則應保持與實機一致。
- **官方預設接觸參數太「軟」，會造成物理穿模**：`solref` 時間常數預設 20 ms，快速/薄的接觸
  （方塊落到薄爪面上、閉合掃掠）會「還來不及產生力」就互相穿過——症狀就是「方塊直接穿過爪面掉下去」。
  修復（2026-10-16）：接觸參數硬化——`harden_mesh_contacts` 在編譯後把全部網格碰撞體的 `solref`
  硬化到 menagerie 齒面同款（0.01 s），方塊接觸同樣處理。純物理保真度修復，不添加任何幾何。
- **模擬機器人已遷移到 mujoco_menagerie 的 SO-ARM100 模型**（2026-10-16）：原教學 zip 的 MJCF 是
  運動學示範品、爪無法夾取；menagerie 模型按實機 CAD 處理——爪部有專用碰撞齒面與硬接觸參數，
  四齒位（淺→深）實測均能頂停+夾住+提起 34mm 方塊。遷移要點：模型 vendored 在
  `assets/menagerie_so_arm100/`（Apache-2.0，含 LICENSE）；關節映射與單位符號見 `MODEL_JOINT`
  （逐關節對照舊模型的世界運動測定；wrist_roll 符號待實機遙控操作複核）；模型 Base 繞 Z 轉 +90° 使其
  工作正面朝 +x；支架改掛 Fixed_Jaw（6 號伺服馬達）側面（先解析搜尋定位，2026-10-16 由使用者對照實機
  照片用 `adjust_mount.py --model menagerie` 手動微調定稿：`[0.1, -0.7, 24.7]mm`、`RPY [0.34, -27.20, 89.51]°`）。舊教學模型與工具保留未動，可隨時對照。
- **為什麼用 uv 專案環境而不是 conda**：`.venv` 與專案同目錄、由 `uv.lock` 鎖定版本、刪目錄即回收，
  和機器上的 conda 環境完全隔離；`uv run` 從不往啟用的 conda 裡裝東西。本機的 `lerobot` conda 環境
  指向的是**另一個儲存庫副本**（`lerobot-main`），兩者互不干擾。
- **為什麼外掛都放在 `examples/so101_mujoco/`**：透過官方註冊機制接入（`register_subclass`），
  **零修改 lerobot 原始碼**；升級上游僅需重新 sync。

<RelatedProducts slugs="so-arm101" />
