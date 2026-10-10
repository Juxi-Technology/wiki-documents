---
title: Troubleshooting
sidebar_label: Troubleshooting
slug: /support/troubleshooting
description: >-
  Symptom-driven troubleshooting for the NVIDIA Jetson Orin Nano Super Developer Kit (8GB) — install traps, power modes, NVMe storage, GPU acceleration, and known issues, with clear source grades.
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

# Troubleshooting

Find your symptom in the index below, then read the matching section. Grades: **A** = NVIDIA official documentation; **B** = NVIDIA developer forum (staff or community reports). Community-only items are marked *unconfirmed*. Juxi has no unit in hand for this series — this page is documented-verified only, not hardware-tested.

## Start with NVIDIA's official Troubleshooting Guide

NVIDIA's first stop for this kit: the [Troubleshooting Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html). It covers exactly five setup problems: (1) Jetson ISO does not boot, (2) no display output, (3) installer does not show target storage, (4) firmware update needed, (5) docker permission error. Related official pages: the [Interim Solutions](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/interim_solutions.html) page currently contains no workarounds (it defers to the JetPack 6.x Update Path), and the [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) page lists NVIDIA's escalation channels. (grade A)

## Symptom index

| Symptom | Section |
| --- | --- |
| Installer skips language/network/user screens, then the system hangs on a black screen with a cursor; no password works | Missed QSPI capsule prompt |
| Install looked fine but fails later | Missed QSPI capsule prompt |
| Install or flashing fails with a USB hub or dongle attached | USB peripherals |
| Only 7W and 15W in the power menu; `nvpmodel -m 2` errors | 25W / MAXN SUPER missing |
| GPU pinned at 624.75 MHz even in MAXN SUPER | GPU stuck at 624.75 MHz |
| Power-mode change asks for a reboot; the reboot can hang with a black screen | Power-mode changes and the black-screen reboot |
| Installer does not offer the NVMe drive; install hangs after 100% | NVMe storage issues |
| NVMe is not visible at the UEFI stage | NVMe storage issues |
| Install aborts at "Step 9/13 Updating boot firmware" | Board-name mismatch at Step 9/13 |
| `jetson-io.py` fails on an ISO-flashed Super unit | Jetson-IO DTB mismatch |
| Ollama runs on CPU; "Unsupported JetPack version" warning | Ollama and GPU acceleration |
| Need Python wheels for JetPack 7.2 | Python wheels |
| Wi-Fi cannot see the network; 6 GHz MBSSID routers unsupported | Wi-Fi cannot see the network |
| No display output; the installer does not boot | Official Troubleshooting Guide (above) |
| Docker socket permission error | Docker permission error |
| Need boot logs without a display | Serial console |

## Missed the QSPI capsule prompt (the most common install trap)

During the ISO install, the kit asks you to confirm a QSPI firmware capsule update. NVIDIA calls this "the most commonly missed step": the prompt waits only 30 seconds. **Press Y.**

- If it times out, "the install fails later". NVIDIA's instruction is to restart the installation and press Y. (grade A; [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) section 5.1; release-note issue 6266271, in [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) and [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf): "Skipping this step causes installation issues due to incompatibility of new ISO images with older QSPI images.")
- The update runs in two passes, and the kit may reboot between them. That is expected. NVIDIA also recommends selecting the USB installer explicitly in the UEFI Boot Manager instead of relying on auto-boot. (grade A, [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html); staff confirmed the guide was updated with a user's workaround — grade B, [thread 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))
- Failure signature (grade B, user report plus staff acknowledgement, [thread 380410](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410)): the installer skips the language, network, and username screens, jumps to "Finished installation and reboot", and the system then hangs on a black or gray screen with a cursor. No default credential works (nvidia/nvidia, ubuntu/ubuntu, root/empty). Cause: the capsule prompt was never confirmed. After pressing Y, the setup screens appeared and the install completed. Other users in the same thread fixed it by flashing with SDK Manager. (grade B)
- If the kit never reaches the installer (black screen, or it drops to a UEFI shell), the QSPI firmware is probably too old: JetPack 7.2/7.2.1 require JetPack 6.x-generation UEFI/QSPI firmware. See [Flashing & Updates](/tutorials/jetson-orin-nano/flashing-and-updates) and [JetPack 6 to 7](/tutorials/jetson-orin-nano/jetpack-6-to-7). (grade A, [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html))

## Install or flashing fails with certain USB peripherals

Official issues **5424568** and **5460707** (present in [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) and [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) notes): the ISO install fails when the installer USB drive is plugged into a **"USB3.0 4-port Portable Hub Model UH400"** hub — "Other USB sticks or hubs work as expected" — and flashing sometimes fails when a **TRENDnet TU2-ET100** USB-to-Ethernet dongle is connected. Use another stick/hub or a direct USB port, and remove the dongle, before retrying. (grade A)

## 25W and MAXN SUPER are missing

Symptoms: only 7W and 15W appear, or `nvpmodel -m 2` returns a bad-power-mode error. Cause — official known issue **6279443** ([r39.2 notes](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)): ISO-updated units "will not default to 'Super' mode after the update. To use 'Super' mode, you must flash the target using a Linux host or SDKM." (grade A)

Signature — the `-super` suffix is missing in `/etc/nv_boot_control.conf`. Staff: "When Super Mode is enabled, the configuration should include the -super suffix … Currently, the ISO image cannot upgrade a device from non-Super Mode to Super Mode. Please use an x86 host to reflash the device with the Super Mode configuration." (grade B, [thread 372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627))

Fixed by design in 7.2.1 — staff: "This would be fixed in jp7.2.1"; the [r39.2.1 notes](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) say "ISO now flashes the Jetson Orin Nano Developer Kit with Super Mode flashing configuration by default", and issue 6279443 is absent from the known-issues list. (grade A)

Fix options:

1. Reflash from a Linux host, or with SDK Manager. (grade A, issue 6279443, [r39.2 notes](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf))
2. Staff QSPI-only flash — flashes only the QSPI bootloader, no system image (grade B, [thread 377553](https://forums.developer.nvidia.com/t/jetson-orin-nano-missing-25w-power-mode-qspi-firmware-mismatch-after-missed-capsule-update/377553)). The first command is the staff command; the second adds the reporter's successful Super target and EEPROM overrides:

```
sudo ./flash.sh --no-systemimg -c bootloader/generic/cfg/flash_t234_qspi.xml jetson-orin-nano-devkit internal

sudo SKIP_EEPROM_CHECK=1 BOARDID=3767 BOARDSKU=0005 FAB=300 ./flash.sh --no-systemimg -c bootloader/generic/cfg/flash_t234_qspi.xml jetson-orin-nano-devkit-super internal
```

3. In-place community fix — *unconfirmed*, not endorsed by NVIDIA (grade B, [thread 372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627), [thread 375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435)). NVIDIA staff asked users to capture state **before** editing that file (`cat /etc/nv_tegra_release`, `cat /etc/nv_boot_control.conf`, `sudo /usr/sbin/nvpmodel -q --verbose`) — editing "would remove the failed state we need to inspect". Reported sequence: `sudo -i`; `perl -i -0777 -pe 's/nano-devkit-\n/nano-devkit-super-\n/g' /etc/nv_boot_control.conf`; `dpkg-reconfigure nvidia-l4t-bootloader`; `rm /etc/nvpmodel.conf`; `reboot`; then `sudo nvpmodel -m 2 --verbose --force`. Several users confirmed 25W and MAXN SUPER appeared afterwards; one user on an SD-card install got a boot loop and reinstalled.

Context: on a 7.2 non-Super install, `/etc/nvpmodel/nvpmodel_p3767_0003_super.conf` (15W, 25W, MAXN_SUPER) exists, but `/etc/nvpmodel.conf` points to the non-Super file with only 15W and 7W. (grade B, community, [thread 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151)). Power-mode check commands: [Verify Your System](/tutorials/jetson-orin-nano/verify-your-system).

## GPU stuck at 624.75 MHz

Even with MAXN_SUPER active, the GPU can stay pinned at 624,750,000 Hz (`bpmp/debug/clk/nafll_gpc0/max_rate` = 624750000); flashing the Super capsule alone did not help in the reported case — the Super firmware was not applied. Staff: flash with SDK Manager, or manual flash from an Ubuntu host; said fixed in 7.2.1. (grade B, [thread 377003](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003)) Community note: there is no `nvpmodel_p3767_0005.conf` in L4T 39.2; the P3767-0005 module uses the 0003 configuration (staff did not confirm). (grade B, community, same thread as above)

## Power-mode changes and the black-screen reboot

- The reboot prompt after a power-mode change is expected once the GPU has been used ("golden image context"). (grade B, staff, [thread 375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435))
- If the reboot hangs with a black screen, it matches issue **6236259** ([r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf); listed as Fixed in [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)): lowering EMC below Fmax during systemd init can crash the system on reboot, especially with a display connected. (grade A)
- Workaround: reboot with the monitor disconnected, then reconnect after boot — a user confirmed this cleared the power-mode issues. (grade B, staff plus user, [thread 375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435))
- NVIDIA's mitigation: switch to MAXN (restores EMC to Fmax) before rebooting; if already in the bad mode, boot once without the display. (grade A, issue 6236259, [r39.2 notes](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf))

## NVMe storage issues

**Installer does not offer the drive / partition step fails** — *unconfirmed*: the installer may not support NVMe drives formatted with 4K sectors; it needs 512n/512e. Check `nvme id-ns -H /dev/nvme0n1`; change with `nvme format --lbaf=ID /dev/nvme0n1` — **destructive**; the post does not discuss data preservation. NVIDIA has not confirmed this officially. (grade B, unconfirmed, [thread 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))

**Boot hangs after a successful-looking install** — *unconfirmed*: several reports of a black screen or blinking cursor after the installer reaches 100%. One user fixed it only via recovery-mode direct flash; another traced it to the 4K-sector issue above. No confirmed root cause. (grade B, unconfirmed, [thread 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))

**NVMe not detected at the UEFI stage (r39.2)** — a drive on PCIe C7 was invisible at the UEFI boot stage although it worked in R36.4; the reporter resolved it by restoring default configurations and re-flashing. Staff: "for NV devkit, everything is already configured correctly in the default BSP. The more items you try to configure, it has more chance you make something not work." (grade B, [thread 383858](https://forums.developer.nvidia.com/t/jetson-orin-nano-in-jetpack-7-2-r39-2-nvme-ssd-on-pcie-c7-is-not-detected-bootable-in-uefi-stage-but-works-normally-after-linux-boots/383858)). Note: SD-card images are gone from JetPack 7.2 onward — write the ISO to a USB drive, then install onto microSD or NVMe. (grade A, [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html))

## Installer aborts at "Step 9/13 Updating boot firmware" (board-name mismatch)

*Unconfirmed.* The install can abort with:

```
ERROR. 3767--0005--1--jetson-orin-nx-devkit-16gb- does not match any known boards.
```

Cause: `/etc/nv_boot_control.conf` carries a stale COMPATIBLE_SPEC that the bootloader package's board list does not match; the oem-config/user-creation step then never runs — the "skipped username/password" mechanism in this case. Reproduction on a booted r39.2 system: `sudo apt-get install --reinstall nvidia-l4t-bootloader`. NVIDIA has not confirmed this. Also reproduced on an Orin NX 16GB and by a third party on 2026-09-18 (subiquity `command_34 … returned non-zero exit status 100`); a variant was reported for SDK Manager 7.2.x failing at "Step 9". (grade B, unconfirmed, [thread 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))

Community workaround, *unconfirmed*: chroot into `/target`, extend the board-glob branch in `select_3767_payload` inside `/var/lib/dpkg/info/nvidia-l4t-bootloader.postinst`, then `rm -f /opt/nvidia/l4t-packages/.nv-l4t-disable-boot-fw-update-in-preinstall`, run `dpkg --configure -a`, and `apt-mark hold nvidia-l4t-bootloader`. NVIDIA has not posted a fix for this failure; the community workaround above remains unconfirmed. (grade B)

## Jetson-IO DTB mismatch on ISO-flashed Super units

Official issue **6236205** (present in [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) and [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)): `jetson-io.py` fails on Orin Nano Super units flashed with the ISO. Official workaround: find the matching DTB under `/boot` with an `fdtget` loop comparing `/compatible` and `/model`; copy it into `/boot/dtb/` as `kernel_<name>.dtb`; then re-run `sudo /opt/nvidia/jetson-io/jetson-io.py`. Units flashed by other methods are not affected. (grade A)

## Ollama and GPU acceleration

History: early Ollama builds on JetPack 7.2 fell back to CPU because Ollama's pre-built CUDA libraries had no sm_87 (Orin compute capability 8.7). Staff quoted the log "skipping CUDA device — compute capability not in compiled architectures … device=Orin cc=870" and said: "This is a known issue … We're working directly with the Ollama team to get native JP 7.2 support added." (grade B, staff, [thread 372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521))

Current status: the latest upstream Ollama works. Staff verified on JetPack 7.2.1 (2026-09-21): install with `curl -fsSL https://ollama.com/install.sh | sh`, run a model, then check `ollama ps` — it should show `100% GPU`. The "WARNING: Unsupported JetPack version detected" line is a harmless message; the older `override.conf` workaround "is no longer needed". (grade B, staff, [thread 383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350))

Stale-build fix: if `find /usr/local/lib/ollama ... | grep -Ei 'cuda|cudart|runner'` shows both `cuda_v12` and `cuda_v13` trees, delete the old one — `sudo rm -rf /usr/local/lib/ollama/cuda_v12`. The log then showed "load_backend: loaded CUDA backend from /usr/local/lib/ollama/cuda_v13/libggml-cuda.so … compute capability 8.7". (grade B, staff plus user, [thread 372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521))

8 GB note: larger models can still fail with `cudaMalloc failed: out of memory … failed to allocate buffer for kv cache`, even when `free -h` shows free memory — GPU memory is shared. Use smaller or quantized models. (grade B, community, [thread 383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350)). More: [Local LLMs on 8 GB](/tutorials/jetson-orin-nano/local-llm).

## Python wheels for JetPack 7.2

Staff answer for JP 7.2 / CUDA 13.2: use `https://pypi.jetson-ai-lab.io/sbsa/cu130`. (grade B, staff, [thread 372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521)). Caveat: when the index root was checked (2026-09-26), it listed `jp6/cu126`, `jp6/cu128`, `jp6/cu129`, `sbsa/cu130`, and `sbsa/dev` — no `jp7` entry visible; community threads also cite `https://pypi.jetson-ai-lab.io/jp7/cu132`, not visible in that listing. (grade C). Staff: "Downgrade: Yes, you can flash back to JP 6.2.2 via SDK Manager if needed." (grade B)

## Wi-Fi cannot see the network

Official Wi-Fi known issues (in the [r39.2.1 notes](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)): **Wi-Fi 6 GHz routers using MBSSID are unsupported** (issue **5226667**), and **the Wi-Fi scan can miss APs in busy environments** — run `wpa_cli set bss_max_count 500` as a buffer workaround (issue **5426982**). (grade A)

## Serial console (headless debugging)

Wiring (grade A, [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)): USB-to-TTL serial cable on the Button Header — RXD pin 3 to the adapter's TX wire, TXD pin 4 to the adapter's RX wire, GND pin 7 to the adapter's ground wire. Then "Open a serial console on your PC". Press **Esc** repeatedly during boot to enter UEFI. For a headless ISO install, press Esc at the pre-boot options, choose **Boot Manager**, and select the USB disk.

- NVIDIA's pages state no baud rate or terminal program — only "Open a serial console on your PC". (see *What we could not confirm*)
- Without a DisplayPort display or Debug UART, a headless ISO install is not practical — staff: "You'd need to use either the DP display output or the Debug UART … so if you don't have either it's practically impossible." (grade B, staff, [thread 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))
- In headless ISO installs the UEFI console is `/dev/ttyACM1`, flooded with output until QSPI is updated to GA (38.2); not seen with a display attached ([issue 5463861](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)). (grade A)
- After a debug-cable re-insert, minicom can become inaccessible — restart minicom ([issue 5437763](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf), in both releases). (grade A)

## Docker permission error

Official fix (grade A, [Troubleshooting Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html)) — restart the terminal if the group change does not take effect:

```
sudo usermod -aG docker $USER
newgrp docker
```

## Getting help

- **NVIDIA Jetson Developer Forums** (forums.developer.nvidia.com) — official community, listed on NVIDIA's Additional Docs page. Search first, then post with your `cat /etc/nv_tegra_release` output; for power or firmware issues also include `/etc/nv_boot_control.conf` and `sudo /usr/sbin/nvpmodel -q --verbose`. (grade A for the listing)
- **Caution:** some replies marked "NVIDIA-STAFF" are auto-generated LLM answers — they begin with a marker such as "— 🤖 This is an automated AI response. I'm here to help, but please verify important details! —" or "*** Please note that this reply is generated by LLM automatically ***". Treat them as non-authoritative. (grade B, [thread 372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627), [thread 372269](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269))
- **Juxi Technology** — support@juxitech.com for technical support, and for order, warranty, and RMA matters (include your order number). Sales: sales@juxitech.com · Product questions: pe@juxitech.com.

## Still open upstream

NVIDIA's release notes list one open issue for this kit that can cause an unexpected reset: **DCE aborts during SC7 suspend/resume triggering a watchdog reset** (issue 6235055, open in both r39.2 and r39.2.1). If you never suspend the kit, this does not affect you; if you do, track it upstream rather than looking for a configuration fix. (grade A, [r39.2.1 release notes](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf))

## What we could not confirm

Open questions in our sources:

- The serial-console baud rate and terminal program — NVIDIA only says "Open a serial console on your PC".
- Whether the board-name mismatch (`command_34` exit 100) is fixed in r39.2.1; no NVIDIA reply in the threads; last community reproduction 2026-09-18.
- Whether a 7.2.1 ISO install restores Super modes on a unit originally flashed with the 7.2 ISO — the notes only say 7.2.1 flashes the Super configuration by default.
- Whether the 4K-sector NVMe limitation is real and officially documented — community report only, not in the release notes or user guide.
- No official procedure for re-stamping a stale COMPATIBLE_SPEC/TNSPEC; a forum question to NVIDIA was unanswered.
- Which wheel index is canonical for JP 7.2: `/sbsa/cu130` (staff) or `/jp7/cu132` (community quote).
- Flashing-host requirements conflict across official sources: the release notes say "Ubuntu 24.04 and 22.04" (no architecture); the BSP page says x86_64 for SDK Manager; users also report Windows SDK Manager flashing 7.2.1 successfully.
- Whether the community `nv_boot_control.conf` edit is safe — NVIDIA has neither endorsed nor fixed the in-place path.
- Whether `sudo nvpmodel -m 2` can persist across reboots on a non-Super install (community reports say no).
- EXT4/NVMe corruption reports (journal recovery failed, I/O tag timeout, "Attempting recovery boot") — unresolved; the thread was closed unanswered.
- Ollama via build-from-source or containers — neither route is authoritative; only the latest upstream installer has NVIDIA staff confirmation on 7.2.1.
- The "7.2.1-b49 vs b184" build claim and missing "Agent Skills" — unverified, plausibly confused; r39.2.1's What's New does list "Agent skills for video pipelines".

## Sources

- NVIDIA Jetson Orin Nano Developer Kit User Guide: [Troubleshooting Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html) · [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) · [JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) · [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) · [Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) — checked 2026-09-26
- Release notes: [JetPack 7.2 / L4T r39.2 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) · [JetPack 7.2.1 / L4T r39.2.1 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) — checked 2026-09-26
- NVIDIA developer forum threads (checked 2026-09-26): [372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151) · [380410](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410) · [372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) · [377003](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003) · [377553](https://forums.developer.nvidia.com/t/jetson-orin-nano-missing-25w-power-mode-qspi-firmware-mismatch-after-missed-capsule-update/377553) · [375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435) · [372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) · [383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) · [383858](https://forums.developer.nvidia.com/t/jetson-orin-nano-in-jetpack-7-2-r39-2-nvme-ssd-on-pcie-c7-is-not-detected-bootable-in-uefi-stage-but-works-normally-after-linux-boots/383858) · [379702](https://forums.developer.nvidia.com/t/jetson-orin-nano-repeated-ext4-nvme-filesystem-corruption-and-attempting-recovery-boot-on-jetpack-7-2/379702) · [372269](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269)

*Status: reviewed on 2026-10-11. Items labelled unconfirmed come from community forum reports and may change. This page is documented-verified only — Juxi has not tested this kit on hardware.*

---

NVIDIA® and Jetson™ are trademarks of NVIDIA Corporation. This page is published by Juxi Technology and is not an NVIDIA publication.
