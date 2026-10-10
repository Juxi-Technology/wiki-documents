---
title: 故障排查
sidebar_label: 故障排查
slug: /support/troubleshooting
description: >-
  面向 NVIDIA Jetson Orin Nano Super Developer Kit（8GB）的症状驱动式故障排查——
  安装陷阱、电源模式、NVMe 存储、GPU 加速与已知问题，并标注明确的来源等级。
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

# 故障排查

在下面的索引中找到你的症状，再阅读对应的章节。等级：**A** = NVIDIA 官方文档；
**B** = NVIDIA 开发者论坛（官方员工或社区的报告）。仅来自社区的内容标注为
*未经证实*。钜犀手上没有该系列的实机——本页仅依据文档核实，未经硬件实测。

## 先看 NVIDIA 官方的故障排查指南

NVIDIA 针对本套件的首站是[故障排查指南](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html)。
它恰好覆盖五种安装问题：(1) Jetson ISO 无法启动，(2) 无显示输出，(3) 安装器
不显示目标存储，(4) 需要更新固件，(5) docker 权限错误。相关官方页面：
[Interim Solutions](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/interim_solutions.html)
页面目前不含任何规避方法（它转指 JetPack 6.x 更新路径），
[Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html)
页面则列出了 NVIDIA 的求助渠道。（等级 A）

## 症状索引

| 症状 | 章节 |
| --- | --- |
| 安装器跳过语言/网络/用户名界面，随后系统停在带光标的黑屏上；任何密码都不对 | 错过 QSPI capsule 提示 |
| 安装看起来正常，但之后失败 | 错过 QSPI capsule 提示 |
| 连接 USB 集线器或转接器时安装或刷机失败 | USB 外设 |
| 电源菜单里只有 7W 和 15W；`nvpmodel -m 2` 报错 | 缺少 25W / MAXN SUPER |
| 即使在 MAXN SUPER 下，GPU 也卡在 624.75 MHz | GPU 卡在 624.75 MHz |
| 切换电源模式时要求重启；重启可能黑屏卡住 | 切换电源模式与黑屏重启 |
| 安装器不提供 NVMe 硬盘；安装到 100% 后卡住 | NVMe 存储问题 |
| 在 UEFI 阶段看不到 NVMe | NVMe 存储问题 |
| 安装在 “Step 9/13 Updating boot firmware” 处中止 | Step 9/13 处的板卡名称不匹配 |
| `jetson-io.py` 在 ISO 刷入的 Super 设备上失败 | Jetson-IO DTB 不匹配 |
| Ollama 跑在 CPU 上；出现 “Unsupported JetPack version” 警告 | Ollama 与 GPU 加速 |
| 需要 JetPack 7.2 的 Python wheel | Python wheel |
| Wi-Fi 搜不到网络；不支持 6 GHz MBSSID 路由器 | Wi-Fi 搜不到网络 |
| 无显示输出；安装器无法启动 | 官方故障排查指南（见上文） |
| Docker socket 权限错误 | Docker 权限错误 |
| 无显示器时需要启动日志 | 串口控制台 |

## 错过 QSPI capsule 提示（最常见的安装陷阱）

ISO 安装过程中，套件会要求你确认一次 QSPI 固件 capsule 更新。NVIDIA 称其为
“最常被错过的一步”：提示只等待 30 秒。**请按 Y。**

- 一旦超时，“安装稍后会失败”。NVIDIA 的指示是重新开始安装并按 Y。（等级 A；
  [快速开始](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)
  第 5.1 节；发布说明中的问题 6266271，见
  [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)
  和
  [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)：
  “跳过此步骤会因新 ISO 镜像与旧 QSPI 镜像不兼容而导致安装问题。”）
- 该更新分两轮执行，套件可能在两轮之间重启。这属于正常现象。NVIDIA 还建议在
  UEFI Boot Manager 中显式选择 USB 安装器，而不要依赖自动启动。（等级 A，
  [快速开始](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)；
  员工确认指南已根据一位用户的规避方法做了更新——等级 B，
  [主题帖 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151)）
- 失败特征（等级 B，用户报告加员工确认，
  [主题帖 380410](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410)）：
  安装器跳过语言、网络和用户名界面，直接跳到 “Finished installation and
  reboot”，随后系统停在带光标的黑屏或灰屏上。任何默认凭据都无法登录
  （nvidia/nvidia、ubuntu/ubuntu、root/空密码）。原因：capsule 提示从未被
  确认。按下 Y 之后，设置界面就出现了，安装也顺利完成。同一帖中的其他用户则
  改用 SDK Manager 刷机解决了问题。（等级 B）
- 如果套件始终到不了安装器（黑屏，或掉进 UEFI shell），多半是 QSPI 固件太旧：
  JetPack 7.2/7.2.1 要求 JetPack 6.x 世代的 UEFI/QSPI 固件。参见
  [刷机与更新](/zh-hans/tutorials/jetson-orin-nano/flashing-and-updates)和
  [迁移指南](/zh-hans/tutorials/jetson-orin-nano/jetpack-6-to-7)。（等级 A，
  [快速开始](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)）

## 特定 USB 外设导致安装或刷机失败

官方问题 **5424568** 和 **5460707**（见
[r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)
与
[r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)
说明）：当安装器 U 盘插在 **“USB3.0 4-port Portable Hub Model UH400”**
集线器上时，ISO 安装会失败——“其他 U 盘或集线器均可正常使用”——而当连接着
**TRENDnet TU2-ET100** USB 转以太网转接器时，刷机有时会失败。重试前请改用
其他 U 盘/集线器或直连 USB 端口，并拔掉该转接器。（等级 A）

## 缺少 25W 和 MAXN SUPER

症状：只显示 7W 和 15W，或 `nvpmodel -m 2` 返回电源模式错误。原因——
官方已知问题 **6279443**（[r39.2
说明](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)）：
经 ISO 更新的设备“更新后不会默认进入 ‘Super’ 模式。要使用 ‘Super’ 模式，
你必须用 Linux 主机或 SDKM 刷写目标设备。”（等级 A）

特征——`/etc/nv_boot_control.conf` 中缺少 `-super` 后缀。员工：“启用
Super 模式时，配置应包含 -super 后缀……目前 ISO 镜像无法把设备从非
Super 模式升级到 Super 模式。请使用 x86 主机，以 Super 模式配置重新刷写
该设备。”（等级 B，
[主题帖 372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627)）

已按设计在 7.2.1 中修复——员工称“这将在 jp7.2.1 中修复”；
[r39.2.1
说明](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)
写道“ISO 现在默认以 Super Mode 刷机配置刷写 Jetson Orin Nano Developer
Kit”，且问题 6279443 已不在已知问题列表中。（等级 A）

修复选项：

1. 从 Linux 主机或用 SDK Manager 重新刷机。（等级 A，问题 6279443，[r39.2
   说明](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)）
2. 员工的仅 QSPI 刷机法——只刷 QSPI bootloader，不刷系统镜像（等级 B，
   [主题帖 377553](https://forums.developer.nvidia.com/t/jetson-orin-nano-missing-25w-power-mode-qspi-firmware-mismatch-after-missed-capsule-update/377553)）。
   第一条命令是员工给出的命令；第二条加入了报告者成功的 Super 目标与
   EEPROM 覆盖：

```
sudo ./flash.sh --no-systemimg -c bootloader/generic/cfg/flash_t234_qspi.xml jetson-orin-nano-devkit internal

sudo SKIP_EEPROM_CHECK=1 BOARDID=3767 BOARDSKU=0005 FAB=300 ./flash.sh --no-systemimg -c bootloader/generic/cfg/flash_t234_qspi.xml jetson-orin-nano-devkit-super internal
```

3. 社区原地修复法——*未经证实*，未获 NVIDIA 认可（等级 B，[主题帖
   372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627)、
   [主题帖
   375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435)）。
   NVIDIA 员工要求用户**在编辑该文件之前**先采集现场状态
   （`cat /etc/nv_tegra_release`、`cat /etc/nv_boot_control.conf`、
   `sudo /usr/sbin/nvpmodel -q --verbose`）——那样编辑“会抹掉我们需要检查的
   故障状态”。报告的操作顺序：`sudo -i`；
   `perl -i -0777 -pe 's/nano-devkit-\n/nano-devkit-super-\n/g' /etc/nv_boot_control.conf`；
   `dpkg-reconfigure nvidia-l4t-bootloader`；`rm /etc/nvpmodel.conf`；
   `reboot`；然后 `sudo nvpmodel -m 2 --verbose --force`。多名用户确认之后
   出现了 25W 和 MAXN SUPER；有一位用 SD 卡安装的用户出现启动循环并重装了
   系统。

背景：在 7.2 的非 Super 安装上，`/etc/nvpmodel/nvpmodel_p3767_0003_super.conf`
（15W、25W、MAXN_SUPER）是存在的，但 `/etc/nvpmodel.conf` 指向只含 15W 和
7W 的非 Super 文件。（等级 B，社区，[主题帖
372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151)）。
电源模式检查命令见[验证你的系统](/zh-hans/tutorials/jetson-orin-nano/verify-your-system)。

## GPU 卡在 624.75 MHz

即使 MAXN_SUPER 已生效，GPU 仍可能被钉在 624,750,000 Hz
（`bpmp/debug/clk/nafll_gpc0/max_rate` = 624750000）；在报告的案例中，仅刷
Super capsule 没有帮助——Super 固件并未被应用。员工建议：用 SDK Manager
刷机，或从 Ubuntu 主机手动刷机；并称已在 7.2.1 修复。（等级 B，[主题帖
377003](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003)）
社区补充：L4T 39.2 中没有 `nvpmodel_p3767_0005.conf`；P3767-0005 模块使用的
是 0003 配置（员工未确认这一点）。（等级 B，社区，与上帖相同）

## 切换电源模式与黑屏重启

- 只要 GPU 被使用过（“golden image context”），切换电源模式后弹出重启提示
  就属正常。（等级 B，员工，[主题帖
  375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435)）
- 如果重启黑屏卡住，这与问题 **6236259** 相符（[r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)；
  在
  [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)
  中列为已修复）：在 systemd 初始化期间把 EMC 降到 Fmax 以下，可能导致系统
  重启时崩溃，连接显示器时尤甚。（等级 A）
- 规避方法：拔掉显示器再重启，启动完成后重新接上——有用户确认这解决了电源
  模式问题。（等级 B，员工加用户，[主题帖
  375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435)）
- NVIDIA 的缓解措施：重启前先切换到 MAXN（将 EMC 恢复到 Fmax）；如果已经
  处于问题模式，先不接显示器启动一次。（等级 A，问题 6236259，[r39.2
  说明](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)）

## NVMe 存储问题

**安装器不提供该硬盘 / 分区步骤失败**——*未经证实*：安装器可能不支持以
4K 扇区格式化的 NVMe 硬盘；它需要 512n/512e。用
`nvme id-ns -H /dev/nvme0n1` 检查；用
`nvme format --lbaf=ID /dev/nvme0n1` 更改——**这会破坏数据**；原帖未讨论
数据保留问题。NVIDIA 尚未正式确认。（等级 B，未经证实，[主题帖
372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151)）

**安装看起来成功后启动却卡住**——*未经证实*：多起报告称安装器到达 100% 后
出现黑屏或光标闪烁。一位用户只能通过恢复模式直刷解决；另一位将其归因于
上面的 4K 扇区问题。尚无确认的根因。（等级 B，未经证实，[主题帖
372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151)）

**UEFI 阶段检测不到 NVMe（r39.2）**——一块接在 PCIe C7 上的硬盘在 UEFI
启动阶段不可见，尽管它在 R36.4 下工作正常；报告者通过恢复默认配置并重新
刷机解决了问题。员工：“对 NV devkit 来说，默认 BSP 中一切都已配置正确。
你尝试配置的项越多，就越有可能把某些东西弄坏。”（等级 B，[主题帖
383858](https://forums.developer.nvidia.com/t/jetson-orin-nano-in-jetpack-7-2-r39-2-nvme-ssd-on-pcie-c7-is-not-detected-bootable-in-uefi-stage-but-works-normally-after-linux-boots/383858)）。
注意：从 JetPack 7.2 起 SD 卡镜像已取消——请把 ISO 写入 U 盘，再安装到
microSD 或 NVMe。（等级 A，
[快速开始](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)）

## 安装器在 “Step 9/13 Updating boot firmware” 处中止（板卡名称不匹配）

*未经证实。* 安装可能以下面的报错中止：

```
ERROR. 3767--0005--1--jetson-orin-nx-devkit-16gb- does not match any known boards.
```

原因：`/etc/nv_boot_control.conf` 里带有一个过期的 COMPATIBLE_SPEC，与
bootloader 软件包中的板卡列表不匹配；于是 oem-config/用户创建步骤从不
运行——本例中这就是“跳过用户名/密码”的机制。在已启动的 r39.2 系统上复现：
`sudo apt-get install --reinstall nvidia-l4t-bootloader`。NVIDIA 尚未确认
此问题。该现象也在 Orin NX 16GB 上复现过，并有第三方于 2026-09-18 复现
（subiquity `command_34 … returned non-zero exit status 100`）；另有
SDK Manager 7.2.x 在 “Step 9” 处失败的变体报告。（等级 B，未经证实，
[主题帖
372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151)）

社区规避方法，*未经证实*：chroot 进入 `/target`，扩展
`/var/lib/dpkg/info/nvidia-l4t-bootloader.postinst` 中 `select_3767_payload`
的 board-glob 分支，然后
`rm -f /opt/nvidia/l4t-packages/.nv-l4t-disable-boot-fw-update-in-preinstall`、
运行 `dpkg --configure -a`，再执行 `apt-mark hold nvidia-l4t-bootloader`。
NVIDIA 未针对此失败发布修复；上述社区规避方法仍未经证实。（等级 B）

## ISO 刷入的 Super 设备上 Jetson-IO DTB 不匹配

官方问题 **6236205**（见
[r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)
与
[r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)）：
在经 ISO 刷入的 Orin Nano Super 设备上，`jetson-io.py` 会失败。官方规避
方法：用 `fdtget` 循环比对 `/compatible` 与 `/model`，在 `/boot` 下找到
匹配的 DTB；把它复制为 `/boot/dtb/` 下的 `kernel_<name>.dtb`；然后重新
运行 `sudo /opt/nvidia/jetson-io/jetson-io.py`。以其他方式刷入的设备不受
影响。（等级 A）

## Ollama 与 GPU 加速

背景：JetPack 7.2 上早期的 Ollama 构建会回退到 CPU，因为 Ollama 预编译的
CUDA 库不含 sm_87（Orin 的计算能力为 8.7）。员工引用了日志 “skipping CUDA
device — compute capability not in compiled architectures … device=Orin
cc=870”，并表示：“这是已知问题……我们正在与 Ollama 团队直接合作，加入对
JP 7.2 的原生支持。”（等级 B，员工，[主题帖
372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521)）

当前状态：上游最新的 Ollama 可以工作。员工在 JetPack 7.2.1 上验证
（2026-09-21）：用 `curl -fsSL https://ollama.com/install.sh | sh` 安装，
运行一个模型，然后检查 `ollama ps`——应显示 `100% GPU`。
“WARNING: Unsupported JetPack version detected” 这一行是无害提示；旧的
`override.conf` 规避方法“已不再需要”。（等级 B，员工，[主题帖
383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350)）

旧构建的修复：如果
`find /usr/local/lib/ollama ... | grep -Ei 'cuda|cudart|runner'` 同时显示
`cuda_v12` 和 `cuda_v13` 两套目录，删除旧的那套——
`sudo rm -rf /usr/local/lib/ollama/cuda_v12`。之后日志会显示
“load_backend: loaded CUDA backend from
/usr/local/lib/ollama/cuda_v13/libggml-cuda.so … compute capability 8.7”。
（等级 B，员工加用户，[主题帖
372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521)）

8 GB 提醒：更大的模型仍可能以
`cudaMalloc failed: out of memory … failed to allocate buffer for kv cache`
失败，即便 `free -h` 显示还有空闲内存——GPU 内存是共享的。请改用更小或
量化后的模型。（等级 B，社区，[主题帖
383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350)）。
更多内容：[8GB 上的本地
LLM](/zh-hans/tutorials/jetson-orin-nano/local-llm)。

## JetPack 7.2 的 Python wheel

员工对 JP 7.2 / CUDA 13.2 的答复：使用
`https://pypi.jetson-ai-lab.io/sbsa/cu130`。（等级 B，员工，[主题帖
372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521)）。
注意：核查该索引根目录时（2026-09-26），其列出的是 `jp6/cu126`、
`jp6/cu128`、`jp6/cu129`、`sbsa/cu130` 和 `sbsa/dev`——看不到 `jp7`
条目；社区帖子还引用了 `https://pypi.jetson-ai-lab.io/jp7/cu132`，也不在
该列表中。（等级 C）。员工：“降级：可以，如有需要你可以通过 SDK Manager
刷回 JP 6.2.2。”（等级 B）

## Wi-Fi 搜不到网络

官方 Wi-Fi 已知问题（见 [r39.2.1
说明](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)）：
**不支持使用 MBSSID 的 Wi-Fi 6 GHz 路由器**（问题 **5226667**）；
**在环境繁忙时 Wi-Fi 扫描可能漏掉部分 AP**——可运行
`wpa_cli set bss_max_count 500` 增大扫描缓冲区作为规避（问题
**5426982**）。（等级 A）

## 串口控制台（无头调试）

接线（等级 A，
[快速开始](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)）：
USB 转 TTL 串口线接在 Button Header 上——RXD 引脚 3 接适配器的 TX 线，
TXD 引脚 4 接适配器的 RX 线，GND 引脚 7 接适配器的地线。然后“在你的 PC
上打开串口控制台”。启动过程中反复按 **Esc** 进入 UEFI。无头 ISO 安装时，
在预启动选项处按 Esc，选择 **Boot Manager**，再选中该 USB 磁盘。

- NVIDIA 的页面没有给出波特率或终端软件——只说“在你的 PC 上打开串口
  控制台”。（见*我们无法确认的内容*）
- 没有 DisplayPort 显示器或 Debug UART，无头 ISO 安装不切实际——员工：
  “你要么用 DP 显示输出，要么用 Debug UART……如果两个都没有，那基本不可能
  完成。”（等级 B，员工，[主题帖
  372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151)）
- 在无头 ISO 安装中，UEFI 控制台是 `/dev/ttyACM1`，在 QSPI 更新到
  GA（38.2）之前会输出大量日志；连接显示器时不出现此现象（[问题
  5463861](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)）。
  （等级 A）
- 重新插拔调试线后，minicom 可能无法访问——重启 minicom（[问题
  5437763](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)，
  两个版本均存在）。（等级 A）

## Docker 权限错误

官方修复（等级 A，
[故障排查指南](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html)）——
若用户组更改未生效，请重启终端：

```
sudo usermod -aG docker $USER
newgrp docker
```

## 获取帮助

- **NVIDIA Jetson 开发者论坛**（forums.developer.nvidia.com）——官方社区，
  列在 NVIDIA 的 Additional Docs 页面上。先搜索，再带上
  `cat /etc/nv_tegra_release` 的输出发帖；电源或固件问题还需附上
  `/etc/nv_boot_control.conf` 和 `sudo /usr/sbin/nvpmodel -q --verbose`。
  （论坛列表本身为等级 A）
- **注意：** 一些标注为 “NVIDIA-STAFF” 的回复是自动生成的 LLM 回答——
  它们以诸如 “— 🤖 This is an automated AI response. I'm here to help, but
  please verify important details! —” 或 “*** Please note that this reply
  is generated by LLM automatically ***” 之类的标记开头。请把它们视为
  非权威内容。（等级 B，[主题帖
  372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627)、
  [主题帖
  372269](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269)）
- **钜犀科技**——技术支持以及订单、保修与 RMA 事宜请联系
  support@juxitech.com（附上你的订单号）。销售：sales@juxitech.com ·
  产品咨询：pe@juxitech.com。

## 上游仍未解决的问题

NVIDIA 发布说明中列出一条针对本套件、可能导致意外重启的未解决问题：
**SC7 挂起/恢复期间 DCE 中止并触发看门狗复位**（问题 6235055，在 r39.2 和
r39.2.1 中均未关闭）。如果你从不挂起套件，它不会影响你；如果会用到，请
跟踪上游进展，而不要指望通过配置来修复。（等级 A，[r39.2.1 发布
说明](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)）

## 我们无法确认的内容

我们的来源中仍悬而未决的问题：

- 串口控制台的波特率与终端软件——NVIDIA 只说“在你的 PC 上打开串口控制台”。
- 板卡名称不匹配（`command_34` 退出码 100）是否已在 r39.2.1 中修复；相关
  帖子中没有 NVIDIA 回复；社区最后一次复现是 2026-09-18。
- 在最初用 7.2 ISO 刷写的设备上，7.2.1 ISO 安装能否恢复 Super 模式——
  说明只提到 7.2.1 默认以 Super 配置刷写。
- 4K 扇区 NVMe 限制是否真实存在且获官方记载——只有社区报告，发布说明和
  用户指南中都没有。
- 没有重新写入过期 COMPATIBLE_SPEC/TNSPEC 的官方流程；论坛上向 NVIDIA 的
  提问未获回复。
- 对 JP 7.2 而言哪个 wheel 索引才是权威：`/sbsa/cu130`（员工）还是
  `/jp7/cu132`（社区引用）。
- 刷机主机的要求在各官方来源之间存在冲突：发布说明写的是
  “Ubuntu 24.04 和 22.04”（未提架构）；BSP 页面称 SDK Manager 需要
  x86_64；用户还报告 Windows 版 SDK Manager 成功刷写了 7.2.1。
- 社区的 `nv_boot_control.conf` 编辑是否安全——NVIDIA 既未认可、也未修复
  这条原地路径。
- 在非 Super 安装上，`sudo nvpmodel -m 2` 能否跨重启保持（社区报告称
  不能）。
- EXT4/NVMe 损坏报告（journal recovery failed、I/O tag timeout、
  “Attempting recovery boot”）——未解决；该帖在无人回复的情况下被关闭。
- 通过源码构建或容器使用 Ollama——两条路径都不权威；只有最新的上游安装器
  在 7.2.1 上得到过 NVIDIA 员工的确认。
- “7.2.1-b49 vs b184”的构建版本说法以及 “Agent Skills” 缺失——未经核实，
  很可能是混淆；r39.2.1 的 What's New 确实列出了 “Agent skills for video
  pipelines”。

## 来源

- NVIDIA Jetson Orin Nano 开发者套件用户指南：[故障排查指南](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html) · [快速开始](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) · [JetPack 6.x 更新路径](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) · [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) · [硬件布局](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html)，核查于 2026-09-26
- 发布说明：[JetPack 7.2 / L4T r39.2（PDF）](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) · [JetPack 7.2.1 / L4T r39.2.1（PDF）](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)，核查于 2026-09-26
- NVIDIA 开发者论坛主题帖（核查于 2026-09-26）：[372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151) · [380410](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410) · [372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) · [377003](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003) · [377553](https://forums.developer.nvidia.com/t/jetson-orin-nano-missing-25w-power-mode-qspi-firmware-mismatch-after-missed-capsule-update/377553) · [375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435) · [372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) · [383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) · [383858](https://forums.developer.nvidia.com/t/jetson-orin-nano-in-jetpack-7-2-r39-2-nvme-ssd-on-pcie-c7-is-not-detected-bootable-in-uefi-stage-but-works-normally-after-linux-boots/383858) · [379702](https://forums.developer.nvidia.com/t/jetson-orin-nano-repeated-ext4-nvme-filesystem-corruption-and-attempting-recovery-boot-on-jetpack-7-2/379702) · [372269](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269)

*状态：已于 2026-10-11 审核。标注为未经证实的条目来自社区论坛报告，可能发生
变化。本页仅依据文档核实——钜犀尚未在硬件上测试本套件。*

---

NVIDIA® 和 Jetson™ 是 NVIDIA Corporation 的商标。本页面由钜犀科技发布，并非
NVIDIA 官方出版物。
