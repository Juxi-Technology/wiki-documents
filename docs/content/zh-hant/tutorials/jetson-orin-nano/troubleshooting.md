---
title: 故障排除
sidebar_label: 故障排除
slug: /support/troubleshooting
description: >-
  針對 NVIDIA Jetson Orin Nano Super Developer Kit（8GB）的症狀導向故障排除——
  涵蓋安裝陷阱、電源模式、NVMe 儲存、GPU 加速與已知問題，並明確標示來源等級。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetson-orin-nano-missing-25w-power-mode-qspi-firmware-mismatch-after-missed-capsule-update/377553
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetson-orin-nano-in-jetpack-7-2-r39-2-nvme-ssd-on-pcie-c7-is-not-detected-bootable-in-uefi-stage-but-works-normally-after-linux-boots/383858
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetson-orin-nano-repeated-ext4-nvme-filesystem-corruption-and-attempting-recovery-boot-on-jetpack-7-2/379702
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269
    checked: 2026-09-26
review_owner: cheny
---

# 故障排除

在下方索引中找到你的症狀，再閱讀對應的章節。等級：**A** = NVIDIA 官方文件；**B** = NVIDIA 開發者論壇（員工或社群回報）。僅有社群來源的項目標示為*未經確認*。鉅犀科技手上沒有本系列的實機——本頁僅經文件驗證，未經硬體測試。

## 先從 NVIDIA 官方的故障排除指南開始

NVIDIA 為本套件建議的第一站：[故障排除指南](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html)。它恰好涵蓋五個設定問題：(1) Jetson ISO 無法開機、(2) 沒有顯示輸出、(3) 安裝程式未顯示目標儲存裝置、(4) 需要更新固件、(5) docker 權限錯誤。相關官方頁面：[Interim Solutions](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/interim_solutions.html) 頁面目前不含任何因應做法（它指向 JetPack 6.x 更新路徑），而 [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) 頁面列出 NVIDIA 的問題升級管道。（等級 A）

## 症狀索引

| 症狀 | 章節 |
| --- | --- |
| 安裝程式跳過語言／網路／使用者畫面，之後系統停在只有游標的黑屏；任何密碼都無效 | 錯過 QSPI capsule 提示 |
| 安裝看起來正常，之後卻失敗 | 錯過 QSPI capsule 提示 |
| 接著 USB 集線器或轉接器時安裝或刷機失敗 | USB 周邊裝置 |
| 電源選單只有 7W 與 15W；`nvpmodel -m 2` 報錯 | 缺少 25W／MAXN SUPER |
| 即使在 MAXN SUPER 下，GPU 仍固定在 624.75 MHz | GPU 卡在 624.75 MHz |
| 切換電源模式要求重新開機；重新開機會黑屏卡住 | 電源模式切換與黑屏重啟 |
| 安裝程式未提供 NVMe 硬碟；安裝在 100% 後卡住 | NVMe 儲存問題 |
| NVMe 在 UEFI 階段看不到 | NVMe 儲存問題 |
| 安裝在「Step 9/13 Updating boot firmware」中止 | Step 9/13 板卡名稱不符 |
| `jetson-io.py` 在以 ISO 刷機的 Super 裝置上失敗 | Jetson-IO DTB 不符 |
| Ollama 以 CPU 執行；出現「Unsupported JetPack version」警告 | Ollama 與 GPU 加速 |
| 需要 JetPack 7.2 的 Python wheels | Python wheels |
| Wi-Fi 看不到網路；不支援 6 GHz MBSSID 路由器 | Wi-Fi 看不到網路 |
| 沒有顯示輸出；安裝程式無法啟動 | 官方故障排除指南（上方） |
| Docker socket 權限錯誤 | Docker 權限錯誤 |
| 需要在沒有顯示器的情況下取得開機日誌 | 串口控制台 |

## 錯過 QSPI capsule 提示（最常見的安裝陷阱）

ISO 安裝期間，套件會要求你確認 QSPI 固件 capsule 更新。NVIDIA 稱之為「最常被錯過的步驟」：提示只等待 30 秒。**請按 Y。**

- 若逾時，「安裝稍後會失敗」。NVIDIA 的指示是重新開始安裝並按 Y。（等級 A；[Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) 第 5.1 節；發行說明問題 6266271，見 [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) 與 [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)：「跳過此步驟會因新 ISO 映像與舊 QSPI 映像不相容而導致安裝問題。」）
- 更新會分兩輪執行，且套件可能在兩輪之間重新開機。這是正常現象。NVIDIA 也建議在 UEFI 開機管理程式中明確選取 USB 安裝碟，而不要依賴自動開機。（等級 A，[Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)；員工證實指南已依使用者的因應做法更新——等級 B，[討論串 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151)）
- 失敗特徵（等級 B，使用者回報加員工確認，[討論串 380410](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410)）：安裝程式跳過語言、網路與使用者名稱畫面，直接跳到「Finished installation and reboot」，之後系統停在黑屏或灰屏並顯示游標。沒有任何預設憑證可用（nvidia/nvidia、ubuntu/ubuntu、root/空密碼）。原因：capsule 提示從未被確認。按下 Y 之後，設定畫面便出現，安裝順利完成。同一討論串中的其他使用者則改用 SDK Manager 刷機解決。（等級 B）
- 如果套件根本沒有進入安裝程式（黑屏，或掉到 UEFI shell），QSPI 固件很可能太舊：JetPack 7.2／7.2.1 需要 JetPack 6.x 世代的 UEFI/QSPI 固件。參見[刷機與更新](/zh-hant/tutorials/jetson-orin-nano/flashing-and-updates)與[遷移指南](/zh-hant/tutorials/jetson-orin-nano/jetpack-6-to-7)。（等級 A，[Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)）

## 部分 USB 周邊裝置會導致安裝或刷機失敗

官方問題 **5424568** 與 **5460707**（見 [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) 與 [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) 發行說明）：當安裝用 USB 隨身碟插在 **「USB3.0 4-port Portable Hub Model UH400」** 集線器上時，ISO 安裝會失敗——「其他 USB 隨身碟或集線器則運作正常」——而連接 **TRENDnet TU2-ET100** USB 轉乙太網路轉接器時，刷機有時會失敗。請改用其他隨身碟／集線器或直接插在 USB 接口上，並移除該轉接器後再重試。（等級 A）

## 缺少 25W 與 MAXN SUPER

症狀：只出現 7W 與 15W，或 `nvpmodel -m 2` 回報電源模式錯誤。原因——官方已知問題 **6279443**（[r39.2 發行說明](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)）：以 ISO 更新的裝置「更新後不會預設為『Super』模式。若要使用『Super』模式，你必須用 Linux 主機或 SDKM 刷寫目標。」（等級 A）

特徵——`/etc/nv_boot_control.conf` 中缺少 `-super` 後綴。員工表示：「啟用 Super Mode 時，配置應包含 -super 後綴……目前，ISO 映像無法將裝置從非 Super Mode 升級為 Super Mode。請使用 x86 主機以 Super Mode 配置重新刷寫裝置。」（等級 B，[討論串 372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627)）

7.2.1 已在設計上修復——員工：「此問題將在 jp7.2.1 中修復」；[r39.2.1 發行說明](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)指出「ISO 現在預設以 Super Mode 刷機配置刷寫 Jetson Orin Nano Developer Kit」，且問題 6279443 已不在已知問題清單中。（等級 A）

修復選項：

1. 從 Linux 主機或使用 SDK Manager 重新刷機。（等級 A，問題 6279443，[r39.2 發行說明](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)）
2. 員工提供的僅 QSPI 刷機——只刷寫 QSPI bootloader，不刷系統映像（等級 B，[討論串 377553](https://forums.developer.nvidia.com/t/jetson-orin-nano-missing-25w-power-mode-qspi-firmware-mismatch-after-missed-capsule-update/377553)）。第一條命令是員工提供的命令；第二條加入回報者成功使用的 Super 目標與 EEPROM 覆寫參數：

```
sudo ./flash.sh --no-systemimg -c bootloader/generic/cfg/flash_t234_qspi.xml jetson-orin-nano-devkit internal

sudo SKIP_EEPROM_CHECK=1 BOARDID=3767 BOARDSKU=0005 FAB=300 ./flash.sh --no-systemimg -c bootloader/generic/cfg/flash_t234_qspi.xml jetson-orin-nano-devkit-super internal
```

3. 社群原地修法——*未經確認*，NVIDIA 未認可（等級 B，[討論串 372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627)、[討論串 375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435)）。NVIDIA 員工請使用者在編輯該檔案**之前**先擷取狀態（`cat /etc/nv_tegra_release`、`cat /etc/nv_boot_control.conf`、`sudo /usr/sbin/nvpmodel -q --verbose`）——因為編輯「會移除我們需要檢查的失敗狀態」。回報的操作順序：`sudo -i`；`perl -i -0777 -pe 's/nano-devkit-\n/nano-devkit-super-\n/g' /etc/nv_boot_control.conf`；`dpkg-reconfigure nvidia-l4t-bootloader`；`rm /etc/nvpmodel.conf`；`reboot`；然後 `sudo nvpmodel -m 2 --verbose --force`。多位使用者確認之後 25W 與 MAXN SUPER 就出現了；一位使用 SD 卡安裝的使用者遇到開機循環並重新安裝。

背景：在 7.2 的非 Super 安裝上，`/etc/nvpmodel/nvpmodel_p3767_0003_super.conf`（15W、25W、MAXN_SUPER）存在，但 `/etc/nvpmodel.conf` 指向只有 15W 與 7W 的非 Super 檔案。（等級 B，社群，[討論串 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151)）。電源模式檢查命令：[驗證你的系統](/zh-hant/tutorials/jetson-orin-nano/verify-your-system)。

## GPU 卡在 624.75 MHz

即使 MAXN_SUPER 已啟用，GPU 仍可能固定在 624,750,000 Hz（`bpmp/debug/clk/nafll_gpc0/max_rate` = 624750000）；在回報案例中，只刷 Super capsule 沒有幫助——Super 固件並未套用。員工：請用 SDK Manager 刷機，或從 Ubuntu 主機手動刷機；並表示已於 7.2.1 修復。（等級 B，[討論串 377003](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003)）社群附註：L4T 39.2 中沒有 `nvpmodel_p3767_0005.conf`；P3767-0005 模組使用的是 0003 配置（員工未確認）。（等級 B，社群，同上討論串）

## 電源模式切換與黑屏重啟

- 在 GPU 使用過之後（「golden image context」），切換電源模式後出現重啟提示是正常現象。（等級 B，員工，[討論串 375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435)）
- 若重新開機黑屏卡住，這與問題 **6236259** 相符（[r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)；在 [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) 中列為已修復）：在 systemd 初始化期間將 EMC 降到 Fmax 以下，可能導致系統在重新開機時崩潰，尤其是在連接顯示器的情況下。（等級 A）
- 因應做法：拔掉顯示器重新開機，開機後再接回——一位使用者確認這清除了電源模式問題。（等級 B，員工加使用者，[討論串 375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435)）
- NVIDIA 的緩解措施：重新開機前先切換到 MAXN（將 EMC 還原至 Fmax）；若已處於問題模式，先在未接顯示器的情況下開機一次。（等級 A，問題 6236259，[r39.2 發行說明](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)）

## NVMe 儲存問題

**安裝程式未提供硬碟／分割步驟失敗**——*未經確認*：安裝程式可能不支援格式化為 4K 磁區的 NVMe 硬碟；它需要 512n/512e。用 `nvme id-ns -H /dev/nvme0n1` 檢查；用 `nvme format --lbaf=ID /dev/nvme0n1` 變更——**具破壞性**；該貼文未討論資料保留。NVIDIA 尚未正式確認此事。（等級 B，未經確認，[討論串 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151)）

**安裝看似成功後開機卡住**——*未經確認*：多起回報指出安裝程式到達 100% 後黑屏或游標閃爍。一位使用者僅透過 recovery 模式直接刷機解決；另一位將其追溯到上述 4K 磁區問題。尚無確認的根本原因。（等級 B，未經確認，[討論串 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151)）

**NVMe 在 UEFI 階段未被偵測（r39.2）**——一個接在 PCIe C7 上的硬碟在 UEFI 開機階段看不到，雖然在 R36.4 中運作正常；回報者透過還原預設配置並重新刷機解決。員工表示：「對 NV 開發套件而言，預設 BSP 中的一切都已正確配置。你嘗試配置的項目越多，越有可能弄壞某些東西。」（等級 B，[討論串 383858](https://forums.developer.nvidia.com/t/jetson-orin-nano-in-jetpack-7-2-r39-2-nvme-ssd-on-pcie-c7-is-not-detected-bootable-in-uefi-stage-but-works-normally-after-linux-boots/383858)）。注意：從 JetPack 7.2 起 SD 卡映像已取消——請將 ISO 寫入 USB 隨身碟，再安裝到 microSD 或 NVMe。（等級 A，[Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)）

## 安裝程式在「Step 9/13 Updating boot firmware」中止（板卡名稱不符）

*未經確認。* 安裝可能以下列訊息中止：

```
ERROR. 3767--0005--1--jetson-orin-nx-devkit-16gb- does not match any known boards.
```

原因：`/etc/nv_boot_control.conf` 帶有過期的 COMPATIBLE_SPEC，bootloader 套件的板卡清單對不上；oem-config／使用者建立步驟因此從未執行——這就是本案例中「跳過使用者名稱／密碼」的機制。已在開機後的 r39.2 系統上重現：`sudo apt-get install --reinstall nvidia-l4t-bootloader`。NVIDIA 尚未確認此事。也在 Orin NX 16GB 上重現，並由第三方於 2026-09-18 重現（subiquity `command_34 … returned non-zero exit status 100`）；另有 SDK Manager 7.2.x 在「Step 9」失敗的變體回報。（等級 B，未經確認，[討論串 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151)）

社群因應做法，*未經確認*：chroot 進入 `/target`，擴展 `/var/lib/dpkg/info/nvidia-l4t-bootloader.postinst` 中 `select_3767_payload` 的 board-glob 分支，然後 `rm -f /opt/nvidia/l4t-packages/.nv-l4t-disable-boot-fw-update-in-preinstall`、執行 `dpkg --configure -a`，再 `apt-mark hold nvidia-l4t-bootloader`。NVIDIA 尚未發布此問題的修復；上述社群因應做法仍未經確認。（等級 B）

## 以 ISO 刷機的 Super 裝置上 Jetson-IO DTB 不符

官方問題 **6236205**（見 [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) 與 [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)）：`jetson-io.py` 在以 ISO 刷機的 Orin Nano Super 裝置上失敗。官方因應做法：在 `/boot` 下用 `fdtget` 迴圈比對 `/compatible` 與 `/model` 找出相符的 DTB；將它複製到 `/boot/dtb/` 並命名為 `kernel_<name>.dtb`；然後重新執行 `sudo /opt/nvidia/jetson-io/jetson-io.py`。以其他方式刷機的裝置不受影響。（等級 A）

## Ollama 與 GPU 加速

歷史：JetPack 7.2 上早期的 Ollama 版本會退回 CPU 執行，因為 Ollama 預建的 CUDA 函式庫不含 sm_87（Orin 的運算能力 8.7）。員工引述日誌「skipping CUDA device — compute capability not in compiled architectures … device=Orin cc=870」並表示：「這是已知問題……我們正直接與 Ollama 團隊合作，加入對 JP 7.2 的原生支援。」（等級 B，員工，[討論串 372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521)）

現況：最新的上游 Ollama 可以運作。員工已在 JetPack 7.2.1 上驗證（2026-09-21）：用 `curl -fsSL https://ollama.com/install.sh | sh` 安裝、執行模型，然後檢查 `ollama ps`——應顯示 `100% GPU`。出現「WARNING: Unsupported JetPack version detected」這行是無害訊息；舊的 `override.conf` 因應做法「已不再需要」。（等級 B，員工，[討論串 383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350)）

舊版殘留的修復：若 `find /usr/local/lib/ollama ... | grep -Ei 'cuda|cudart|runner'` 同時顯示 `cuda_v12` 與 `cuda_v13` 目錄樹，請刪除舊的那個——`sudo rm -rf /usr/local/lib/ollama/cuda_v12`。之後日誌顯示「load_backend: loaded CUDA backend from /usr/local/lib/ollama/cuda_v13/libggml-cuda.so … compute capability 8.7」。（等級 B，員工加使用者，[討論串 372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521)）

8 GB 附註：較大的模型仍可能失敗並顯示 `cudaMalloc failed: out of memory … failed to allocate buffer for kv cache`，即使 `free -h` 顯示還有可用記憶體——GPU 記憶體是共享的。請使用較小或量化過的模型。（等級 B，社群，[討論串 383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350)）。更多內容：[本地 LLM 推論](/zh-hant/tutorials/jetson-orin-nano/local-llm)。

## JetPack 7.2 的 Python wheels

員工對 JP 7.2 / CUDA 13.2 的回答：使用 `https://pypi.jetson-ai-lab.io/sbsa/cu130`。（等級 B，員工，[討論串 372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521)）。注意事項：查核索引根目錄時（2026-09-26），它列出 `jp6/cu126`、`jp6/cu128`、`jp6/cu129`、`sbsa/cu130` 與 `sbsa/dev`——看不到 `jp7` 項目；社群討論串也引用 `https://pypi.jetson-ai-lab.io/jp7/cu132`，但未出現在該列表中。（等級 C）。員工表示：「降級：是的，如有需要，你可以透過 SDK Manager 刷回 JP 6.2.2。」（等級 B）

## Wi-Fi 看不到網路

官方 Wi-Fi 已知問題（見 [r39.2.1 發行說明](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)）：**不支援使用 MBSSID 的 Wi-Fi 6 GHz 路由器**（問題 **5226667**），且**在環境繁忙時 Wi-Fi 掃描可能漏掉 AP**——可執行 `wpa_cli set bss_max_count 500` 作為加大掃描緩衝的因應做法（問題 **5426982**）。（等級 A）

## 串口控制台（無頭除錯）

接線（等級 A，[Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)）：USB 轉 TTL 串口線接在按鍵排針上——RXD pin 3 接轉接器的 TX 線、TXD pin 4 接轉接器的 RX 線、GND pin 7 接轉接器的接地線。接著「在你的 PC 上開啟串口控制台」。開機期間反覆按 **Esc** 即可進入 UEFI。無頭 ISO 安裝時，請在開機前選項按 Esc、選擇 **Boot Manager**，再選 USB 磁碟。

- NVIDIA 的頁面未說明鮑率或終端機程式——只寫「在你的 PC 上開啟串口控制台」。（參見*我們無法確認的事項*）
- 沒有 DisplayPort 顯示器或 Debug UART，無頭 ISO 安裝並不實際——員工表示：「你得使用 DP 顯示輸出或 Debug UART……所以如果兩者都沒有，實際上不可能完成。」（等級 B，員工，[討論串 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151)）
- 在無頭 ISO 安裝中，UEFI 控制台是 `/dev/ttyACM1`，在 QSPI 更新到 GA（38.2）之前會不斷湧出大量輸出；接上顯示器時不會出現（[問題 5463861](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)）。（等級 A）
- 重新插拔除錯線後，minicom 可能無法存取——請重新啟動 minicom（[問題 5437763](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)，兩個版本皆有）。（等級 A）

## Docker 權限錯誤

官方修復（等級 A，[故障排除指南](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html)）——若群組變更未生效，請重新啟動終端機：

```
sudo usermod -aG docker $USER
newgrp docker
```

## 取得協助

- **NVIDIA Jetson 開發者論壇**（forums.developer.nvidia.com）——官方社群，列於 NVIDIA 的 Additional Docs 頁面。請先搜尋，再附上你的 `cat /etc/nv_tegra_release` 輸出發文；電源或固件問題請另附 `/etc/nv_boot_control.conf` 與 `sudo /usr/sbin/nvpmodel -q --verbose`。（就收錄而言為等級 A）
- **注意：**部分標示為「NVIDIA-STAFF」的回覆是自動生成的 LLM 答案——它們會以「— 🤖 This is an automated AI response. I'm here to help, but please verify important details! —」或「*** Please note that this reply is generated by LLM automatically ***」這類標記開頭。請把它們視為非權威內容。（等級 B，[討論串 372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627)、[討論串 372269](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269)）
- **鉅犀科技**——技術支援請寄 support@juxitech.com，訂單、保固與 RMA 事宜亦同（請附上訂單編號）。銷售：sales@juxitech.com · 產品諮詢：pe@juxitech.com。

## 上游仍未解決的問題

NVIDIA 的發行說明為本套件列出一個可能導致非預期重置的未解決問題：**SC7 休眠／喚醒期間 DCE 中止，觸發看門狗重置**（問題 6235055，於 r39.2 與 r39.2.1 均為未解決）。如果你從不讓套件休眠，這不影響你；如果你會，請在上游追蹤，而不要尋找設定面的修復。（等級 A，[r39.2.1 發行說明](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)）

## 我們無法確認的事項

我們的來源中仍待解答的問題：

- 串口控制台的鮑率與終端機程式——NVIDIA 只說「在你的 PC 上開啟串口控制台」。
- 板卡名稱不符（`command_34` 結束碼 100）是否已在 r39.2.1 修復；討論串中沒有 NVIDIA 回覆；最後一次社群重現為 2026-09-18。
- 7.2.1 的 ISO 安裝能否讓最初以 7.2 ISO 刷機的裝置恢復 Super 模式——發行說明只說 7.2.1 預設以 Super 配置刷機。
- 4K 磁區 NVMe 的限制是否真實且有官方記載——僅有社群回報，未見於發行說明或使用者指南。
- 重新蓋印過期 COMPATIBLE_SPEC/TNSPEC 沒有官方程序；向 NVIDIA 提出的論壇問題未獲回覆。
- JP 7.2 的 wheel 索引哪個才是正規：`/sbsa/cu130`（員工）或 `/jp7/cu132`（社群引述）。
- 刷機主機需求在官方來源之間互相矛盾：發行說明寫「Ubuntu 24.04 與 22.04」（未提架構）；BSP 頁面寫 SDK Manager 需 x86_64；使用者另回報 Windows 版 SDK Manager 可成功刷寫 7.2.1。
- 社群的 `nv_boot_control.conf` 編輯是否安全——NVIDIA 既未認可，也未修復原地路徑。
- 在非 Super 安裝上，`sudo nvpmodel -m 2` 是否能跨重新開機持續生效（社群回報說不行）。
- EXT4/NVMe 損毀回報（日誌復原失敗、I/O tag 逾時、「Attempting recovery boot」）——尚未解決；該討論串被關閉且未獲回覆。
- 透過原始碼構建或容器執行的 Ollama——兩條路徑都不是權威做法；只有最新的上游安裝程式獲得 NVIDIA 員工在 7.2.1 上的確認。
- 「7.2.1-b49 對 b184」的版本說法與缺少「Agent Skills」——未經證實，可能是混淆；r39.2.1 的 What's New 確實列出「Agent skills for video pipelines」。

## 資料來源

- NVIDIA Jetson Orin Nano Developer Kit User Guide：[Troubleshooting Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html) · [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) · [JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) · [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) · [Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) —— 查閱於 2026-09-26
- 發行說明：[JetPack 7.2 / L4T r39.2（PDF）](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) · [JetPack 7.2.1 / L4T r39.2.1（PDF）](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) —— 查閱於 2026-09-26
- NVIDIA 開發者論壇討論串（查閱於 2026-09-26）：[372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151) · [380410](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410) · [372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) · [377003](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003) · [377553](https://forums.developer.nvidia.com/t/jetson-orin-nano-missing-25w-power-mode-qspi-firmware-mismatch-after-missed-capsule-update/377553) · [375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435) · [372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) · [383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) · [383858](https://forums.developer.nvidia.com/t/jetson-orin-nano-in-jetpack-7-2-r39-2-nvme-ssd-on-pcie-c7-is-not-detected-bootable-in-uefi-stage-but-works-normally-after-linux-boots/383858) · [379702](https://forums.developer.nvidia.com/t/jetson-orin-nano-repeated-ext4-nvme-filesystem-corruption-and-attempting-recovery-boot-on-jetpack-7-2/379702) · [372269](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269)

*狀態：已於 2026-10-11 審核。標示為未經確認的項目來自社群論壇回報，可能有所變動。本頁僅經文件驗證——鉅犀科技尚未在硬體上測試本套件。*

---

NVIDIA® 與 Jetson™ 是 NVIDIA Corporation 的商標。本頁面由鉅犀科技發布，並非 NVIDIA 官方出版物。
