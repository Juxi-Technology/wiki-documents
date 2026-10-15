---
title: 製品一覧——ロボットアーム、Jetson キット、センサー
description: "Juxi Technology 製品センター — ロボットアーム、器用手、センサー、アクセサリー"
keywords: ["ロボットシステム", "AI コンピューティングとビジョン", "センサーと測位", "アクセサリーとツール", "ロボットアーム", "Jetson", "LeRobot"]
aside: false
sidebar: false
outline: false
prev: false
next: false
---

<!-- 本文件由 scripts/gen-products-index.mjs 生成,请勿手改(数据源:docs/.vitepress/products-data.mjs) -->

# 製品一覧

<p class="hero-subtitle">オープンソースのロボットアームから NVIDIA Jetson のエッジ AI まで——Juxi Technology のすべてのハードウェア製品のマニュアル・仕様・チュートリアルがここにワンストップで揃い、公式ストアへのリンクも掲載しています。</p>

<p class="hub-filters">
  <button class="hub-chip active" aria-pressed="true" data-filter="all" @click="applyFilter('all')">すべて</button>
  <button class="hub-chip" aria-pressed="false" data-filter="robot" @click="applyFilter('robot')">ロボットシステム</button>
  <button class="hub-chip" aria-pressed="false" data-filter="compute-vision" @click="applyFilter('compute-vision')">AI コンピューティングとビジョン</button>
  <button class="hub-chip" aria-pressed="false" data-filter="sensor" @click="applyFilter('sensor')">センサーと測位</button>
  <button class="hub-chip" aria-pressed="false" data-filter="accessory" @click="applyFilter('accessory')">アクセサリーとツール</button>
</p>

## ロボットシステム

<div class="product-grid">
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/ja/products/so-arm101')" class="pc-link">
      <img :src="withBase('/images/categories/SO-ARM101.png')" alt="SO-ARM101 開発キット" loading="lazy">
      <span class="pc-title">SO-ARM101 開発キット</span>
      <p class="pc-desc">6 自由度のオープンソースロボットアーム。LeRobot エコシステムにネイティブ対応し、遠隔操作・データ収集・模倣学習をワンストップで始められます。</p>
    </a>
    <a href="https://www.juxitech.com/ja/products/so-arm101-developers-kit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=so-arm101" target="_blank" rel="noopener" class="pc-buy">購入</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/ja/products/so-arm101-7dof')" class="pc-link">
      <img :src="withBase('/images/categories/SO-ARM101-7DOF.png')" alt="SO-ARM101 7軸ロボットアーム" loading="lazy">
      <span class="pc-title">SO-ARM101 7軸ロボットアーム</span>
      <p class="pc-desc">定番の 6 軸アームに 90° の手首ロールを追加。12V バスサーボ、工場組立済み、完全なチュートリアルシリーズ付き。</p>
    </a>
    <a href="https://www.juxitech.com/ja/products/so-arm101-open-source-7-dof-robotic-arm?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=so-arm101-7dof" target="_blank" rel="noopener" class="pc-buy">購入</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/ja/products/amazinghand')" class="pc-link">
      <img :src="withBase('/images/categories/AmazingHand.png')" alt="AmazingHand オープンソース 4指器用ハンド" loading="lazy">
      <span class="pc-title">AmazingHand オープンソース 4指器用ハンド</span>
      <p class="pc-desc">オープンソースの 4 指器用ハンド。TTL バス制御とオープン CAD を搭載し、具身知能・HRI 研究のために生まれました。</p>
    </a>
    <a href="https://www.juxitech.com/ja/products/amazinghand?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=amazinghand" target="_blank" rel="noopener" class="pc-buy">購入</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/ja/products/xlerobot')" class="pc-link">
      <img :src="withBase('/images/categories/XLeRobot.png')" alt="XLeRobot 双腕移動ロボット" loading="lazy">
      <span class="pc-title">XLeRobot 双腕移動ロボット</span>
      <p class="pc-desc">全方向ホイールシャーシに SO-ARM101 アームを 2 本搭載した双腕移動ロボット。完成品とパーツキットの 2 形態で提供し、LeRobot エコシステムに完全対応しています。</p>
    </a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/ja/products/lekiwi')" class="pc-link">
      <img :src="withBase('/images/categories/Lekiwi.png')" alt="Lekiwi 具身知能モバイルロボット" loading="lazy">
      <span class="pc-title">Lekiwi 具身知能モバイルロボット</span>
      <p class="pc-desc">コスパに優れた具身知能モバイルプラットフォーム。全方向移動ベースと教育用ロボットアームで、LeRobot 入門のためのお手頃な選択肢です。</p>
    </a>
    <a href="https://www.juxitech.com/ja/products/lekiwi-embodied-intelligence-mobile-robotic-car?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=lekiwi" target="_blank" rel="noopener" class="pc-buy">購入</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/ja/products/tpu-flexible-gripper')" class="pc-link">
      <img :src="withBase('/images/categories/TPU-Gripper.png')" alt="SO-ARM101 TPU フレキシブルグリッパー" loading="lazy">
      <span class="pc-title">SO-ARM101 TPU フレキシブルグリッパー</span>
      <p class="pc-desc">フレキシブル TPU グリッパー。不規則な形状や壊れやすい物も安全に把持でき、アーム搭載カメラも選択できます。</p>
    </a>
    <a href="https://www.juxitech.com/ja/products/so-arm101-tpu-flexible-gripper?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=tpu-flexible-gripper" target="_blank" rel="noopener" class="pc-buy">購入</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/ja/products/robot-vision-kit')" class="pc-link">
      <img :src="withBase('/images/categories/Robot-Vision-Kit.png')" alt="SO-ARM101 ロボットアームビジョンキット" loading="lazy">
      <span class="pc-title">SO-ARM101 ロボットアームビジョンキット</span>
      <p class="pc-desc">手首・側面・真上の 3 視点に取り付け可能。60FPS 固定焦点またはオートフォーカスズームを選択でき、ACT・SmolVLA・Pi0・GR00T に対応。</p>
    </a>
    <a href="https://www.juxitech.com/ja/products/so-arm101-wrist-camera-mount?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=robot-vision-kit" target="_blank" rel="noopener" class="pc-buy">購入</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/ja/products/overhead-camera-mount')" class="pc-link">
      <img :src="withBase('/images/categories/Overhead-Camera-Mount.png')" alt="SO-ARM101 オーバーヘッドカメラマウント" loading="lazy">
      <span class="pc-title">SO-ARM101 オーバーヘッドカメラマウント</span>
      <p class="pc-desc">真上からのデータ収集用マウント、RealSense 対応——ロボットアームのビジョントレーニングの死角をひとつ減らします。</p>
    </a>
    <a href="https://www.juxitech.com/ja/products/overhead-camera-mount-for-so-arm100-so-arm101-realsense-compatible?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=overhead-camera-mount" target="_blank" rel="noopener" class="pc-buy">購入</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/ja/products/servo-driver-board')" class="pc-link">
      <img :src="withBase('/images/categories/Servo-Driver-Board.png')" alt="JUXI バスサーボドライバボード" loading="lazy">
      <span class="pc-title">JUXI バスサーボドライバボード</span>
      <p class="pc-desc">1 本のバスで最大 253 個のサーボを駆動。Type-C でプラグアンドプレイ、LeRobot SO-ARM 専用に設計されています。</p>
    </a>
    <a href="https://www.juxitech.com/ja/products/bus-servo-driver-board?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=servo-driver-board" target="_blank" rel="noopener" class="pc-buy">購入</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/ja/products/pincopen')" class="pc-link">
      <img :src="withBase('/images/categories/PincOpen.png')" alt="PincOpenオープンソースパラレルグリッパー" loading="lazy">
      <span class="pc-title">PincOpenオープンソースパラレルグリッパー</span>
      <p class="pc-desc">PincOpen オープンソースパラレルグリッパー— ロボット把持を誰にでも身近に！</p>
    </a>
    <a href="https://www.juxitech.com/ja/products/pincopen-open-source-parallel-gripper?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=pincopen" target="_blank" rel="noopener" class="pc-buy">購入</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/ja/products/so-arm101-amazinghand')" class="pc-link">
      <img :src="withBase('/images/categories/SO-ARM101-AmazingHand.png')" alt="SO-ARM101 & AmazingHand オープンソース多指ハンドロボットアーム" loading="lazy">
      <span class="pc-title">SO-ARM101 & AmazingHand オープンソース多指ハンドロボットアーム</span>
      <p class="pc-desc">SO-ARM101 & AmazingHand は、SO-ARM101 6 軸ロボットアームと AmazingHand 8 自由度四指多指ハンドを組み合わせた、完全なオープンソースの身体性 AI プラットフォームです。</p>
    </a>
    <a href="https://www.juxitech.com/ja/products/so-arm101-amazinghand-open-source-dexterous-hand-robotic-arm?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=so-arm101-amazinghand" target="_blank" rel="noopener" class="pc-buy">購入</a>
  </div>
</div>

## AI コンピューティングとビジョン

<div class="product-grid">
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/ja/products/jetson-agx-orin-devkit')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-AGX-Orin.png')" alt="Jetson AGX Orin 開発キット(64GB)" loading="lazy">
      <span class="pc-title">Jetson AGX Orin 開発キット(64GB)</span>
      <p class="pc-desc">275 TOPS のフラッグシップエッジ AI キット。書き込み済みで開封後すぐに使用でき、完全な JetPack 7.2 ドキュメントも付属します。</p>
    </a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/ja/products/jetson-orin-nano-devkit')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-Orin-Nano.png')" alt="Jetson Orin Nano Super 開発キット(8GB)" loading="lazy">
      <span class="pc-title">Jetson Orin Nano Super 開発キット(8GB)</span>
      <p class="pc-desc">67 TOPS のエントリー向けエッジ AI と 8GB ユニファイドメモリ。初回書き込みからエージェント AI まで、全工程をドキュメントでカバーします。</p>
    </a>
    <a href="https://www.juxitech.com/ja/products/nvidia-jetson-orin-nano-super-development-kit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=jetson-orin-nano-devkit" target="_blank" rel="noopener" class="pc-buy">購入</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/ja/products/jetson-orin-nx-super-kit')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-Orin-NX.png')" alt="Jetson Orin NX Super 開発キット" loading="lazy">
      <span class="pc-title">Jetson Orin NX Super 開発キット</span>
      <p class="pc-desc">117/157 TOPS のエッジプラットフォーム。Ubuntu 22.04 と 256GB NVMe をプリインストール済みで、開封後すぐに大規模モデルのトレーニングを始められます。</p>
    </a>
    <a href="https://www.juxitech.com/ja/products/nvidia-jetson-orin-nx-super-developer-kit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=jetson-orin-nx-super-kit" target="_blank" rel="noopener" class="pc-buy">購入</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/ja/products/realsense-depth-camera')" class="pc-link">
      <img :src="withBase('/images/categories/RealSense-D435i.png')" alt="3D RealSense 深度カメラ" loading="lazy">
      <span class="pc-title">3D RealSense 深度カメラ</span>
      <p class="pc-desc">D435i / D405 / D405CB の 3 モデルから選択可能。XLeRobot と SO-ARM101 に高精度な深度ビジョンを提供します。</p>
    </a>
    <a href="https://www.juxitech.com/ja/products/3d-realsense-depth-camera?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=realsense-depth-camera" target="_blank" rel="noopener" class="pc-buy">購入</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/ja/products/esp32-s3-wifi-module')" class="pc-link">
      <img :src="withBase('/images/categories/ESP32-NanoCam.png')" alt="ESP32-S3 WiFi 動画モジュール" loading="lazy">
      <span class="pc-title">ESP32-S3 WiFi 動画モジュール</span>
      <p class="pc-desc">200 万画素の WiFi リアルタイム映像転送と 8 種類のオンボード AI ビジョンモードで、あらゆるロボットに軽量な一人称視点を提供します。</p>
    </a>
    <a href="https://www.juxitech.com/ja/products/esp32-s3-wifi-video-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=esp32-s3-wifi-module" target="_blank" rel="noopener" class="pc-buy">購入</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/ja/products/imx219-csi-camera')" class="pc-link">
      <img :src="withBase('/images/categories/CSI-Camera.png')" alt="79° IMX219 CSI カメラ" loading="lazy">
      <span class="pc-title">79° IMX219 CSI カメラ</span>
      <p class="pc-desc">ネイティブ CSI インターフェースで Jetson に直結。77° FOV・低遅延——エッジビジョン向けのコスパに優れたレンズです。</p>
    </a>
    <a href="https://www.juxitech.com/ja/products/79-imx219-csi-camera?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=imx219-csi-camera" target="_blank" rel="noopener" class="pc-buy">購入</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/ja/products/usb-auto-focus-camera')" class="pc-link">
      <img :src="withBase('/images/categories/USB-AutoFocus-Camera.png')" alt="USBオートフォーカスカメラ" loading="lazy">
      <span class="pc-title">USBオートフォーカスカメラ</span>
      <p class="pc-desc">1080P・86° 広角のドライバ不要カメラ。Windows/Linux/Jetson/Raspberry Pi のすべてでプラグアンドプレイに対応。</p>
    </a>
  </div>
</div>

## センサーと測位

<div class="product-grid">
  <div class="product-card" data-cat="sensor">
    <a :href="withBase('/ja/products/imu-module')" class="pc-link">
      <img :src="withBase('/images/categories/IMU.png')" alt="IMU 高精度慣性航法モジュール" loading="lazy">
      <span class="pc-title">IMU 高精度慣性航法モジュール</span>
      <p class="pc-desc">100Hz の姿勢演算、6/9/10 軸オプション、IIC + シリアル両対応——ROS 統合もすぐに使えます。</p>
    </a>
    <a href="https://www.juxitech.com/ja/products/imu-module-ahrs-attitude-and-heading-angle-sensor?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=imu-module" target="_blank" rel="noopener" class="pc-buy">購入</a>
  </div>
  <div class="product-card" data-cat="sensor">
    <a :href="withBase('/ja/products/gps-beidou-module')" class="pc-link">
      <img :src="withBase('/images/categories/GPS.png')" alt="GPS & 北斗 GNSS 測位モジュール" loading="lazy">
      <span class="pc-title">GPS & 北斗 GNSS 測位モジュール</span>
      <p class="pc-desc">四大衛星システム連合測位、2.5m 精度、ROS 対応——屋外ロボット測位入門の第一候補。</p>
    </a>
    <a href="https://www.juxitech.com/ja/products/gps-beidou-gnss-positioning-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=gps-beidou-module" target="_blank" rel="noopener" class="pc-buy">購入</a>
  </div>
  <div class="product-card" data-cat="sensor">
    <a :href="withBase('/ja/products/heart-rate-spo2')" class="pc-link">
      <img :src="withBase('/images/categories/Heart-Rate-SpO2.png')" alt="心拍数 & SpO2 センサーモジュール" loading="lazy">
      <span class="pc-title">心拍数 & SpO2 センサーモジュール</span>
      <p class="pc-desc">心拍数 & SpO2 センサーモジュール — 高精度検出 | 心拍数 & SpO2 直接出力 | マルチプラットフォーム対応</p>
    </a>
    <a href="https://www.juxitech.com/ja/products/heart-rate-spo2-sensor-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=heart-rate-spo2" target="_blank" rel="noopener" class="pc-buy">購入</a>
  </div>
</div>

## アクセサリーとツール

<div class="product-grid">
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/ja/products/ai-voice-module')" class="pc-link">
      <img :src="withBase('/images/categories/AI-Voice-Module.png')" alt="AI 音声対話モジュール" loading="lazy">
      <span class="pc-title">AI 音声対話モジュール</span>
      <p class="pc-desc">110+ 個のオフライン音声コマンド、5m 以内で認識率 99%。シリアル/IIC で Arduino・Jetson・Raspberry Pi に接続できます。</p>
    </a>
    <a href="https://www.juxitech.com/ja/products/ai-voice-recognition-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=ai-voice-module" target="_blank" rel="noopener" class="pc-buy">購入</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/ja/products/kws-voice-module')" class="pc-link">
      <img :src="withBase('/images/categories/KWS-Voice-Module.png')" alt="KWS 音声対話モジュール" loading="lazy">
      <span class="pc-title">KWS 音声対話モジュール</span>
      <p class="pc-desc">中国語・英語のウェイクワード認識、ファームウェアはオープンソース。シリアル出力と RViz2 による可視化に対応しています。</p>
    </a>
    <a href="https://www.juxitech.com/ja/products/usb-kws-voice-interaction-module-english-translation-for-independent-station?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=kws-voice-module" target="_blank" rel="noopener" class="pc-buy">購入</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/ja/products/usb-sound-card')" class="pc-link">
      <img :src="withBase('/images/categories/AI_SoundCard.png')" alt="USB ドライバ不要サウンドカード" loading="lazy">
      <span class="pc-title">USB ドライバ不要サウンドカード</span>
      <p class="pc-desc">マイクとスピーカー内蔵のドライバ不要サウンドカード——Raspberry Pi/Jetson の音声対話に欠けていた最後のパーツです。</p>
    </a>
    <a href="https://www.juxitech.com/ja/products/usb-2-0-driver-free-sound-card-onboard-mic-speaker-for-ai-voice-interaction?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=usb-sound-card" target="_blank" rel="noopener" class="pc-buy">購入</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/ja/products/2dof-gimbal')" class="pc-link">
      <img :src="withBase('/images/categories/2DOF-Gimbal.png')" alt="2 自由度サーボパンチルト" loading="lazy">
      <span class="pc-title">2 自由度サーボパンチルト</span>
      <p class="pc-desc">2 軸雲台に 200 万画素カメラを搭載し、カラートラッキング・顔検出・自動追従に対応。Pure Python で自由に二次開発できます。</p>
    </a>
    <a href="https://www.juxitech.com/ja/products/2-dof-servo-pan-tilt-unit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=2dof-gimbal" target="_blank" rel="noopener" class="pc-buy">購入</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/ja/products/4k-hdmi-capture')" class="pc-link">
      <img :src="withBase('/images/categories/4K-HDMI-Capture.png')" alt="4K HDMI キャプチャカード" loading="lazy">
      <span class="pc-title">4K HDMI キャプチャカード</span>
      <p class="pc-desc">4K 高画質キャプチャ、HDMI/DP マルチインターフェースを USB で直結——ライブ配信・画面録画・ビジョンデータ転送に対応。</p>
    </a>
    <a href="https://www.juxitech.com/ja/products/4k-hd-hdmi-capture-card?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=4k-hdmi-capture" target="_blank" rel="noopener" class="pc-buy">購入</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/ja/products/feetech-servo')" class="pc-link">
      <img :src="withBase('/images/categories/Feetech-Servo.png')" alt="Feetech バスサーボ(SCS0009 / STS3215)" loading="lazy">
      <span class="pc-title">Feetech バスサーボ(SCS0009 / STS3215)</span>
      <p class="pc-desc">SCS0009 / STS3215 の 2 モデルのバスサーボ。磁気エンコーダ版とポテンショメータ版を揃え、上位機デバッグツールも付属します。</p>
    </a>
    <a href="https://www.juxitech.com/ja/products/feetech-serial-bus-servo-sts3215-scs0009?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=feetech-servo" target="_blank" rel="noopener" class="pc-buy">購入</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/ja/products/kvm-switch')" class="pc-link">
      <img :src="withBase('/images/categories/KVM-Switch.png')" alt="4-in-1 KVM スイッチャー" loading="lazy">
      <span class="pc-title">4-in-1 KVM スイッチャー</span>
      <p class="pc-desc">4-in-1 KVM。TTL シリアル + Bluetooth 拡張、複数デバイスをワンクリックで切替——ロボットデバッグ作業台の効率化ツールです。</p>
    </a>
    <a href="https://www.juxitech.com/ja/products/4-in-1-kvm-switch-hub-ttl-serial-bluetooth-docking-station?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=kvm-switch" target="_blank" rel="noopener" class="pc-buy">購入</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/ja/products/jetson-orin-radiator')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-Orin-Radiator.png')" alt="Jetson Orin ラジエーター" loading="lazy">
      <span class="pc-title">Jetson Orin ラジエーター</span>
      <p class="pc-desc">Jetson Orin ラジエーターは、NVIDIA Jetson Orin NX SUPER および Jetson Orin Nano SUPER 開発キット専用に設計された高性能オールメタル冷却ソリューションです。</p>
    </a>
    <a href="https://www.juxitech.com/ja/products/jetson-orin-radiator?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=jetson-orin-radiator" target="_blank" rel="noopener" class="pc-buy">購入</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/ja/products/feetech-scs0009-servo')" class="pc-link">
      <img :src="withBase('/images/categories/Feetech-SCS0009.png')" alt="FEETECH SCS0009 シリアルバスサーボ" loading="lazy">
      <span class="pc-title">FEETECH SCS0009 シリアルバスサーボ</span>
      <p class="pc-desc">この FEETECH SCS0009 シリアルバスサーボは、AmazingHand 器用ハンドに適合したロボットアクチュエータです。</p>
    </a>
    <a href="https://www.juxitech.com/ja/products/feetech-scs0009-serial-bus-servo?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=feetech-scs0009-servo" target="_blank" rel="noopener" class="pc-buy">購入</a>
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

.hero-subtitle {
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
.hub-filters {
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
/* 卡片链接/购买按钮须 .vp-doc 前缀:主题 .vp-doc a(0,1,1)会以品牌蓝+下划线+字重500
   压过单类选择器(0,1,0) */
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
.pc-desc {
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
