---
title: 產品中心——機械臂、Jetson 套件與傳感器
description: "鉅犀科技產品中心——機械臂、靈巧手、感測器與配件全系手冊。"
keywords: ["機器人系統", "AI 計算與視覺", "感測器與定位", "配件與工具", "機械臂", "Jetson", "LeRobot"]
aside: false
sidebar: false
outline: false
prev: false
next: false
---

<!-- 本文件由 scripts/gen-products-index.mjs 生成,请勿手改(数据源:docs/.vitepress/products-data.mjs) -->

# 產品中心

<p class="hero-subtitle">從開源機械臂到 NVIDIA Jetson 邊緣計算——每款鉅犀科技硬體的手冊、規格參數與配套教程在這裡一站直達，並附官方商店入口。</p>

<p class="hub-filters">
  <button class="hub-chip active" aria-pressed="true" data-filter="all" @click="applyFilter('all')">全部</button>
  <button class="hub-chip" aria-pressed="false" data-filter="robot" @click="applyFilter('robot')">機器人系統</button>
  <button class="hub-chip" aria-pressed="false" data-filter="compute-vision" @click="applyFilter('compute-vision')">AI 計算與視覺</button>
  <button class="hub-chip" aria-pressed="false" data-filter="sensor" @click="applyFilter('sensor')">感測器與定位</button>
  <button class="hub-chip" aria-pressed="false" data-filter="accessory" @click="applyFilter('accessory')">配件與工具</button>
</p>

## 機器人系統

<div class="product-grid">
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/zh-hant/products/so-arm101')" class="pc-link">
      <img :src="withBase('/images/categories/SO-ARM101.png')" alt="SO-ARM101 開發套件" loading="lazy">
      <span class="pc-title">SO-ARM101 開發套件</span>
      <p class="pc-desc">6 自由度開源機械臂；原生 LeRobot 生態，遙操作、數據採集與模仿學習一站式上手。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hant/products/so-arm101-developers-kit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=so-arm101" target="_blank" rel="noopener" class="pc-buy">購買</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/zh-hant/products/so-arm101-7dof')" class="pc-link">
      <img :src="withBase('/images/categories/SO-ARM101-7DOF.png')" alt="SO-ARM101 開源七自由度機械臂" loading="lazy">
      <span class="pc-title">SO-ARM101 開源七自由度機械臂</span>
      <p class="pc-desc">經典 6 軸之上再加 90° 腕部滾轉；12V 總線舵機，工廠預組裝，附完整教程系列。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hant/products/so-arm101-open-source-7-dof-robotic-arm?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=so-arm101-7dof" target="_blank" rel="noopener" class="pc-buy">購買</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/zh-hant/products/amazinghand')" class="pc-link">
      <img :src="withBase('/images/categories/AmazingHand.png')" alt="AmazingHand 開源 4 指靈巧手" loading="lazy">
      <span class="pc-title">AmazingHand 開源 4 指靈巧手</span>
      <p class="pc-desc">開源 4 指靈巧手：TTL 總線控制、開源 CAD，為具身智能與人機交互研究而生。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hant/products/amazinghand?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=amazinghand" target="_blank" rel="noopener" class="pc-buy">購買</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/zh-hant/products/xlerobot')" class="pc-link">
      <img :src="withBase('/images/categories/XLeRobot.png')" alt="XLeRobot 雙臂移動機器人" loading="lazy">
      <span class="pc-title">XLeRobot 雙臂移動機器人</span>
      <p class="pc-desc">雙臂移動機器人：兩支 SO-ARM101 機械臂裝在全向輪底盤上；成品/散件兩種形態，LeRobot 生態全兼容。</p>
    </a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/zh-hant/products/lekiwi')" class="pc-link">
      <img :src="withBase('/images/categories/Lekiwi.png')" alt="Lekiwi 具身智能移動機器人" loading="lazy">
      <span class="pc-title">Lekiwi 具身智能移動機器人</span>
      <p class="pc-desc">高性價比具身智能移動平台：全向輪底盤 + 教學機械臂，入門 LeRobot 的實惠之選。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hant/products/lekiwi-embodied-intelligence-mobile-robotic-car?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=lekiwi" target="_blank" rel="noopener" class="pc-buy">購買</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/zh-hant/products/tpu-flexible-gripper')" class="pc-link">
      <img :src="withBase('/images/categories/TPU-Gripper.png')" alt="SO-ARM101 TPU 柔性夾爪" loading="lazy">
      <span class="pc-title">SO-ARM101 TPU 柔性夾爪</span>
      <p class="pc-desc">柔性 TPU 夾爪，安全抓取不規則與易碎物品，可選臂載相機。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hant/products/so-arm101-tpu-flexible-gripper?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=tpu-flexible-gripper" target="_blank" rel="noopener" class="pc-buy">購買</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/zh-hant/products/robot-vision-kit')" class="pc-link">
      <img :src="withBase('/images/categories/Robot-Vision-Kit.png')" alt="SO-ARM101 機械臂視覺套件" loading="lazy">
      <span class="pc-title">SO-ARM101 機械臂視覺套件</span>
      <p class="pc-desc">腕部/側方/俯視三視角安裝，60FPS 定焦或自動對焦變焦可選；兼容 ACT、SmolVLA、Pi0、GR00T。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hant/products/so-arm101-wrist-camera-mount?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=robot-vision-kit" target="_blank" rel="noopener" class="pc-buy">購買</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/zh-hant/products/overhead-camera-mount')" class="pc-link">
      <img :src="withBase('/images/categories/Overhead-Camera-Mount.png')" alt="SO-ARM101 頂置相機支架" loading="lazy">
      <span class="pc-title">SO-ARM101 頂置相機支架</span>
      <p class="pc-desc">俯視數據採集支架，兼容 RealSense——讓機械臂視覺訓練少一塊盲區。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hant/products/overhead-camera-mount-for-so-arm100-so-arm101-realsense-compatible?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=overhead-camera-mount" target="_blank" rel="noopener" class="pc-buy">購買</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/zh-hant/products/servo-driver-board')" class="pc-link">
      <img :src="withBase('/images/categories/Servo-Driver-Board.png')" alt="JUXI 總線舵機驅動板" loading="lazy">
      <span class="pc-title">JUXI 總線舵機驅動板</span>
      <p class="pc-desc">單總線驅動 253 路舵機，Type-C 即插即用；專為 LeRobot SO-ARM 設計。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hant/products/bus-servo-driver-board?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=servo-driver-board" target="_blank" rel="noopener" class="pc-buy">購買</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/zh-hant/products/pincopen')" class="pc-link">
      <img :src="withBase('/images/categories/PincOpen.png')" alt="PincOpen 開源平行夾爪" loading="lazy">
      <span class="pc-title">PincOpen 開源平行夾爪</span>
      <p class="pc-desc">PincOpen 開源平行夾爪—讓機械臂抓取變得觸手可及！</p>
    </a>
    <a href="https://www.juxitech.com/zh-hant/products/pincopen-open-source-parallel-gripper?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=pincopen" target="_blank" rel="noopener" class="pc-buy">購買</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/zh-hant/products/so-arm101-amazinghand')" class="pc-link">
      <img :src="withBase('/images/categories/SO-ARM101-AmazingHand.png')" alt="SO-ARM101 與 AmazingHand 開源靈巧手機械臂" loading="lazy">
      <span class="pc-title">SO-ARM101 與 AmazingHand 開源靈巧手機械臂</span>
      <p class="pc-desc">SO-ARM101 & AmazingHand 是一個完整的開源具身智慧平台，它將 SO-ARM101 六軸機械臂與 AmazingHand 8 自由度四指靈巧手相結合。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hant/products/so-arm101-amazinghand-open-source-dexterous-hand-robotic-arm?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=so-arm101-amazinghand" target="_blank" rel="noopener" class="pc-buy">購買</a>
  </div>
</div>

## AI 計算與視覺

<div class="product-grid">
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/zh-hant/products/jetson-agx-orin-devkit')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-AGX-Orin.png')" alt="Jetson AGX Orin 開發者套件(64GB)" loading="lazy">
      <span class="pc-title">Jetson AGX Orin 開發者套件(64GB)</span>
      <p class="pc-desc">275 TOPS 旗艦邊緣 AI 套件；出廠預先刷機、開箱即用，附完整 JetPack 7.2 文檔體系。</p>
    </a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/zh-hant/products/jetson-orin-nano-devkit')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-Orin-Nano.png')" alt="Jetson Orin Nano Super 開發者套件(8GB)" loading="lazy">
      <span class="pc-title">Jetson Orin Nano Super 開發者套件(8GB)</span>
      <p class="pc-desc">67 TOPS 入門級邊緣 AI，8GB 統一記憶體；從首次刷機到智能體 AI 的全流程文檔。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hant/products/nvidia-jetson-orin-nano-super-development-kit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=jetson-orin-nano-devkit" target="_blank" rel="noopener" class="pc-buy">購買</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/zh-hant/products/jetson-orin-nx-super-kit')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-Orin-NX.png')" alt="Jetson Orin NX Super 開發套件" loading="lazy">
      <span class="pc-title">Jetson Orin NX Super 開發套件</span>
      <p class="pc-desc">117/157 TOPS 邊緣平台，預裝 Ubuntu 22.04 與 256GB NVMe，開箱即訓大模型。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hant/products/nvidia-jetson-orin-nx-super-developer-kit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=jetson-orin-nx-super-kit" target="_blank" rel="noopener" class="pc-buy">購買</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/zh-hant/products/realsense-depth-camera')" class="pc-link">
      <img :src="withBase('/images/categories/RealSense-D435i.png')" alt="3D RealSense 深度相機" loading="lazy">
      <span class="pc-title">3D RealSense 深度相機</span>
      <p class="pc-desc">D435i / D405 / D405CB 三選一；為 XLeRobot 與 SO-ARM101 提供高精度深度視覺。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hant/products/3d-realsense-depth-camera?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=realsense-depth-camera" target="_blank" rel="noopener" class="pc-buy">購買</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/zh-hant/products/esp32-s3-wifi-module')" class="pc-link">
      <img :src="withBase('/images/categories/ESP32-NanoCam.png')" alt="ESP32-S3 WiFi 視頻模組" loading="lazy">
      <span class="pc-title">ESP32-S3 WiFi 視頻模組</span>
      <p class="pc-desc">200 萬像素 WiFi 實時圖傳 + 8 種板載 AI 視覺模式，任何機器人的輕量第一視角。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hant/products/esp32-s3-wifi-video-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=esp32-s3-wifi-module" target="_blank" rel="noopener" class="pc-buy">購買</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/zh-hant/products/imx219-csi-camera')" class="pc-link">
      <img :src="withBase('/images/categories/CSI-Camera.png')" alt="79° IMX219 CSI 攝像頭" loading="lazy">
      <span class="pc-title">79° IMX219 CSI 攝像頭</span>
      <p class="pc-desc">原生 CSI 接口直連 Jetson；77° 視場、低延遲——邊緣視覺的高性價比鏡頭。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hant/products/79-imx219-csi-camera?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=imx219-csi-camera" target="_blank" rel="noopener" class="pc-buy">購買</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/zh-hant/products/usb-auto-focus-camera')" class="pc-link">
      <img :src="withBase('/images/categories/USB-AutoFocus-Camera.png')" alt="USB 自動對焦攝像頭" loading="lazy">
      <span class="pc-title">USB 自動對焦攝像頭</span>
      <p class="pc-desc">1080P 86° 廣角免驅攝像頭，Windows/Linux/Jetson/樹莓派全平台即插即用。</p>
    </a>
  </div>
</div>

## 感測器與定位

<div class="product-grid">
  <div class="product-card" data-cat="sensor">
    <a :href="withBase('/zh-hant/products/imu-module')" class="pc-link">
      <img :src="withBase('/images/categories/IMU.png')" alt="IMU 高精度慣導模組" loading="lazy">
      <span class="pc-title">IMU 高精度慣導模組</span>
      <p class="pc-desc">100Hz 姿態解算，六/九/十軸可選，IIC + 串口雙通信，ROS 開箱集成。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hant/products/imu-module-ahrs-attitude-and-heading-angle-sensor?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=imu-module" target="_blank" rel="noopener" class="pc-buy">購買</a>
  </div>
  <div class="product-card" data-cat="sensor">
    <a :href="withBase('/zh-hant/products/gps-beidou-module')" class="pc-link">
      <img :src="withBase('/images/categories/GPS.png')" alt="GPS & 北斗 GNSS 定位模組" loading="lazy">
      <span class="pc-title">GPS & 北斗 GNSS 定位模組</span>
      <p class="pc-desc">四星座聯合定位、2.5 米精度，ROS 就緒——戶外機器人定位的入門首選。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hant/products/gps-beidou-gnss-positioning-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=gps-beidou-module" target="_blank" rel="noopener" class="pc-buy">購買</a>
  </div>
  <div class="product-card" data-cat="sensor">
    <a :href="withBase('/zh-hant/products/heart-rate-spo2')" class="pc-link">
      <img :src="withBase('/images/categories/Heart-Rate-SpO2.png')" alt="心率與血氧飽和度感測器模組" loading="lazy">
      <span class="pc-title">心率與血氧飽和度感測器模組</span>
      <p class="pc-desc">心率血氧感測器模組 — 高精準檢測 | 直出心率血氧值 | 多平台相容</p>
    </a>
    <a href="https://www.juxitech.com/zh-hant/products/heart-rate-spo2-sensor-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=heart-rate-spo2" target="_blank" rel="noopener" class="pc-buy">購買</a>
  </div>
</div>

## 配件與工具

<div class="product-grid">
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/zh-hant/products/ai-voice-module')" class="pc-link">
      <img :src="withBase('/images/categories/AI-Voice-Module.png')" alt="AI 語音交互模組" loading="lazy">
      <span class="pc-title">AI 語音交互模組</span>
      <p class="pc-desc">110+ 條離線指令、5 米內 99% 辨識率；串口/IIC 接入 Arduino、Jetson 與樹莓派。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hant/products/ai-voice-recognition-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=ai-voice-module" target="_blank" rel="noopener" class="pc-buy">購買</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/zh-hant/products/kws-voice-module')" class="pc-link">
      <img :src="withBase('/images/categories/KWS-Voice-Module.png')" alt="KWS 語音交互模組" loading="lazy">
      <span class="pc-title">KWS 語音交互模組</span>
      <p class="pc-desc">中英文喚醒詞辨識，固件開源；串口輸出 + RViz2 可視化。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hant/products/usb-kws-voice-interaction-module-english-translation-for-independent-station?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=kws-voice-module" target="_blank" rel="noopener" class="pc-buy">購買</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/zh-hant/products/usb-sound-card')" class="pc-link">
      <img :src="withBase('/images/categories/AI_SoundCard.png')" alt="USB 免驅聲卡" loading="lazy">
      <span class="pc-title">USB 免驅聲卡</span>
      <p class="pc-desc">板載麥克風 + 揚聲器的免驅聲卡，為樹莓派/Jetson 語音交互補齊最後一環。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hant/products/usb-2-0-driver-free-sound-card-onboard-mic-speaker-for-ai-voice-interaction?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=usb-sound-card" target="_blank" rel="noopener" class="pc-buy">購買</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/zh-hant/products/2dof-gimbal')" class="pc-link">
      <img :src="withBase('/images/categories/2DOF-Gimbal.png')" alt="2 自由度舵機雲台" loading="lazy">
      <span class="pc-title">2 自由度舵機雲台</span>
      <p class="pc-desc">兩軸雲台 + 200 萬攝像頭；顏色追蹤、人臉偵測與自動跟隨，純 Python 二次開發。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hant/products/2-dof-servo-pan-tilt-unit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=2dof-gimbal" target="_blank" rel="noopener" class="pc-buy">購買</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/zh-hant/products/4k-hdmi-capture')" class="pc-link">
      <img :src="withBase('/images/categories/4K-HDMI-Capture.png')" alt="4K HDMI 採集卡" loading="lazy">
      <span class="pc-title">4K HDMI 採集卡</span>
      <p class="pc-desc">4K 高清採集，HDMI/DP 多接口 USB 直連——直播錄屏與視覺數據回傳。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hant/products/4k-hd-hdmi-capture-card?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=4k-hdmi-capture" target="_blank" rel="noopener" class="pc-buy">購買</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/zh-hant/products/feetech-servo')" class="pc-link">
      <img :src="withBase('/images/categories/Feetech-Servo.png')" alt="Feetech 總線舵機(SCS0009 / STS3215)" loading="lazy">
      <span class="pc-title">Feetech 總線舵機(SCS0009 / STS3215)</span>
      <p class="pc-desc">SCS0009 / STS3215 總線舵機雙型號，磁編碼與電位器版本齊備，配套上位機調試工具。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hant/products/feetech-serial-bus-servo-sts3215-scs0009?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=feetech-servo" target="_blank" rel="noopener" class="pc-buy">購買</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/zh-hant/products/kvm-switch')" class="pc-link">
      <img :src="withBase('/images/categories/KVM-Switch.png')" alt="4 合 1 KVM 切換器" loading="lazy">
      <span class="pc-title">4 合 1 KVM 切換器</span>
      <p class="pc-desc">4 合 1 KVM：TTL 串口 + 藍牙擴展，多設備一鍵切換——機器人調試桌的效率工具。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hant/products/4-in-1-kvm-switch-hub-ttl-serial-bluetooth-docking-station?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=kvm-switch" target="_blank" rel="noopener" class="pc-buy">購買</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/zh-hant/products/jetson-orin-radiator')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-Orin-Radiator.png')" alt="Jetson Orin 散熱器" loading="lazy">
      <span class="pc-title">Jetson Orin 散熱器</span>
      <p class="pc-desc">Jetson Orin散熱器是一款高效能全金屬散熱解決方案，專為NVIDIA Jetson Orin NX SUPER和Jetson Orin Nano SUPER開發者套件而設計。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hant/products/jetson-orin-radiator?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=jetson-orin-radiator" target="_blank" rel="noopener" class="pc-buy">購買</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/zh-hant/products/feetech-scs0009-servo')" class="pc-link">
      <img :src="withBase('/images/categories/Feetech-SCS0009.png')" alt="飛特科技 SCS0009 串列匯流排伺服馬達" loading="lazy">
      <span class="pc-title">飛特科技 SCS0009 串列匯流排伺服馬達</span>
      <p class="pc-desc">這款 FEETECH SCS0009 串行匯流排舵機是一款適用於 AmazingHand 靈巧手的機械人執行器。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hant/products/feetech-scs0009-serial-bus-servo?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=feetech-scs0009-servo" target="_blank" rel="noopener" class="pc-buy">購買</a>
  </div>
</div>

<script setup>
import { withBase } from 'vitepress'

// 分类筛选:纯 DOM 切换(卡片是静态内容,不参与 Vue 重渲染;无 JS 时默认全部可见)
function applyFilter(cat) {
  document.querySelectorAll('.hub-chip').forEach((btn) => {
    const on = btn.dataset.filter === cat
    btn.classList.toggle('active', on)
    btn.setAttribute('aria-pressed', String(on))
  })
  document.querySelectorAll('.product-grid').forEach((grid) => {
    let any = false
    grid.querySelectorAll('.product-card').forEach((cardEl) => {
      const on = cat === 'all' || cardEl.dataset.cat === cat
      cardEl.style.display = on ? '' : 'none'
      if (on) any = true
    })
    grid.style.display = any ? '' : 'none'
    const h2 = grid.previousElementSibling
    if (h2 && h2.tagName === 'H2') h2.style.display = any ? '' : 'none'
  })
}
</script>

<style>

.vp-doc .hero-subtitle {
  font-size: 19px;
  line-height: 1.8;
  margin: 8px auto 8px;
  max-width: 780px;
  color: var(--vp-c-text-2);
  display: block;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  margin: 24px 0 48px 0;
}
.vp-doc .hub-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin: 18px 0 6px;
}
.hub-chip {
  padding: 6px 16px;
  border: 1px solid var(--vp-c-gutter);
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.4;
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s, color 0.2s;
}
.hub-chip:hover {
  border-color: #1e3a5f;
  color: var(--vp-c-text-1);
}
.hub-chip.active {
  background: #1e3a5f;
  border-color: #1e3a5f;
  color: #ffffff;
}
.product-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-gutter);
  border-radius: 12px;
  overflow: hidden;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  background: var(--vp-c-bg-soft);
}
/* 卡片内 a/p 元素样式须 .vp-doc 前缀:主题 .vp-doc a / .vp-doc p(0,1,1)会以
   品牌蓝+下划线,或 margin:16px 0(清掉左右间距)压过单类选择器(0,1,0) */
.vp-doc .pc-link {
  display: block;
  flex: 1;
  text-decoration: none;
  color: inherit;
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: var(--vp-c-brand);
}
.product-card img {
  width: 100%;
  height: 150px;
  object-fit: contain;
  padding: 14px 16px 0;
  background: var(--vp-c-bg);
}
.pc-title {
  display: block;
  font-weight: 700;
  font-size: 15px;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  margin: 12px 16px 8px;
}
.vp-doc .pc-desc {
  font-size: 13px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  margin: 0 16px 16px;
}
.vp-doc .pc-buy {
  align-self: center;
  margin: 0 16px 18px;
  padding: 7px 26px;
  border-radius: 6px;
  background: #1e3a5f;
  color: #ffffff;
  font-size: 13.5px;
  font-weight: 600;
  line-height: 1.4;
  text-decoration: none;
  transition: background-color 0.2s;
}
.vp-doc .pc-buy:hover {
  background: #152a45;
  color: #ffffff;
}
@media (max-width: 767px) {
  .product-grid { grid-template-columns: 1fr; }
}
</style>
