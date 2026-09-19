---
title: チュートリアル
description: "Juxi Technology Wiki のチュートリアル一覧。ロボットアームやカメラなど全製品の使い方と設定ガイドを網羅しています。"
---

# チュートリアル

チュートリアルページへようこそ!ここでは、すべての製品の使い方チュートリアル、設定ガイド、ベストプラクティスを確認でき、すぐに使い始めて製品の機能を最大限に活用できます。

## テーマカテゴリ

### クイックスタート

- [FAQ](/ja/tutorials/faq)
- [ROS 入門](/ja/tutorials/ros-intro)
- [Lark Wiki](/ja/tutorials/lark-wiki)

### 学習リソース

- [学習リソース](/ja/tutorials/learning-resources/)
- [Jetson Orin での PyTorch 非互換問題](/ja/tutorials/learning-resources/jetson-orin-pytorch-compatibility)

### ロボットアーム

- [ロボットアームシリーズ](/ja/tutorials/robot-arms/)
- [選定ガイド](/ja/tutorials/robot-arms/select-guide)
  - **SO-ARM101 シリーズ**
    - [LeRobot ロボットアームチュートリアル](/ja/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
    - [Lerobot ロボットアーム組立ガイド](/ja/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
    - [Jetson Orin での PyTorch 非互換問題](/ja/tutorials/robot-arms/so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility)
    - [SO-ARM100&101 アーム搭載ブラケットと環境カメラキット 取付チュートリアル](/ja/tutorials/robot-arms/so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation)
    - [オーバーヘッドカメラマウント取付ガイド](/ja/tutorials/robot-arms/so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation)
    - [SO-ARM101 ワイヤレス遠隔操作(ESP32-NanoCam 版)](/ja/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop)
    - [遠隔操作トラブルシューティング](/ja/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Troubleshooting)
    - [SO-ARM101 デュアルアーム(デュアルフォロワー)チュートリアル](/ja/tutorials/robot-arms/so-arm101/SO-ARM101-Bi-Arm-Tutorial)
    - [SO-ARM101 7-DOF 改造と LeRobot 使用チュートリアル](/ja/tutorials/robot-arms/so-arm101/SO-ARM101-7DOF-LeRobot)
    - [SoARM シリーズ サーボキャリブレーションツール使用チュートリアル](/ja/tutorials/robot-arms/so-arm101/SO-ARM101-Servo-Calibration-Tool)
      - **LeRobot完全コース**
        - [LeRobot完全コース](/ja/tutorials/robot-arms/so-arm101/lerobot/)
          - **1. LeRobot環境のインストール**
            - [ステップ1:LeRobot環境のインストール（Ubuntu）](/ja/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Ubuntu)
            - [ステップ1:LeRobot環境のインストール（Windows）](/ja/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Windows)
            - [ステップ1:LeRobot環境のインストール（macOS）](/ja/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/MacOS)
          - **2. シリアルポート番号の確認**
            - [ステップ2:シリアルポート番号の確認（Ubuntu）](/ja/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/Ubuntu)
            - [ステップ2:シリアルポート番号の確認（Windows）](/ja/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/Windows)
            - [ステップ2:シリアルポート番号の確認（macOS）](/ja/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/MacOS)
          - **3. ロボットアームのキャリブレーション**
            - [ステップ3:ロボットアームのキャリブレーション（Ubuntu）](/ja/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/Ubuntu)
            - [ステップ3:ロボットアームのキャリブレーション（Windows）](/ja/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/Windows)
            - [ステップ3:ロボットアームのキャリブレーション（macOS）](/ja/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/MacOS)
          - **4. テレオペレーション**
            - [ステップ4:テレオペレーション（Ubuntu）](/ja/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/Ubuntu)
            - [ステップ4:テレオペレーション（Windows）](/ja/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/Windows)
            - [ステップ4:テレオペレーション（macOS）](/ja/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/MacOS)
          - **5. カメラ付きテレオペレーション**
            - [ステップ5:カメラ付きテレオペレーション（Ubuntu）](/ja/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/Ubuntu)
            - [ステップ5:カメラ付きテレオペレーション（Windows）](/ja/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/Windows)
            - [ステップ5:カメラ付きテレオペレーション（macOS）](/ja/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/MacOS)
          - **6. データセット収集（実機）**
            - [ステップ6:教示によるデータセット収集](/ja/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording)
            - [ステップ6:データセット収集の注意事項](/ja/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Collection-Notes)
            - [ステップ6:HuggingFaceアカウントの登録（任意）](/ja/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account)
            - [ステップ6:データセットをHuggingFaceにアップロード（任意）](/ja/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload)
          - **7. モデルの訓練**
            - [ステップ7:ローカルUbuntuでの訓練](/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/Local-Ubuntu)
            - [ステップ7:クラウドGPU訓練環境の設定](/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU)
            - [ステップ7:wandbでリアルタイム訓練曲線を確認](/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)
            - [ステップ7:モデルをHuggingFaceにアップロード（任意）](/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload)
            - [ステップ7:モデルの重みファイルを取得](/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/Model-Weights)
            - [ステップ7:訓練コマンドライン-ACT](/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-ACT)
            - [ステップ7:訓練コマンドライン-pi0](/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0)
            - [ステップ7:訓練コマンドライン-pi0.5](/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0.5)
            - [ステップ7:訓練コマンドライン-pi0fast](/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0fast)
            - [ステップ7:訓練コマンドライン-smolvla](/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-smolvla)
          - **8. モデルのデプロイ**
            - [ステップ8:デプロイコマンドラインの説明](/ja/tutorials/robot-arms/so-arm101/lerobot/08-Inference/CLI-Reference)
            - [ステップ8:よくあるBugと解決方法](/ja/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Common-Bugs)
            - [ステップ8:デプロイコマンドライン-ACT](/ja/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-ACT)
            - [ステップ8:デプロイコマンドライン-pi0](/ja/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-pi0)
            - [ステップ8:デプロイコマンドライン-pi0.5](/ja/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-pi0.5)
            - [ステップ8:デプロイコマンドライン-smolvla](/ja/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-smolvla)
          - **基礎知識**
            - [LeRobotを知る](/ja/tutorials/robot-arms/so-arm101/basics/Understanding-LeRobot)
            - [HuggingFace上のLeRobotデータセット](/ja/tutorials/robot-arms/so-arm101/basics/HF-Datasets)
            - [モデルトレーニングの資料](/ja/tutorials/robot-arms/so-arm101/basics/Training-Resources)
            - [SO-ARM 100公式3Dプリントファイル](/ja/tutorials/robot-arms/so-arm101/basics/Official-3D-Print-Files)
            - [URDFファイルおよび資料参考](/ja/tutorials/robot-arms/so-arm101/basics/URDF-Reference)
          - **その他・応用**
            - [ROS2シミュレーション制御](/ja/tutorials/robot-arms/so-arm101/ROS2-Simulation-Control)
            - [平行指グリッパー取り付けチュートリアル](/ja/tutorials/robot-arms/so-arm101/Parallel-Finger-Gripper-Installation)
  - **SO-ARM101 + AmazingHand チュートリアル**
    - [コース概要](/ja/tutorials/robot-arms/so-arm-amazinghand/)
    - [ステージ1：環境構築（Linux）](/ja/tutorials/robot-arms/so-arm-amazinghand/01-Environment-Setup-Linux)
    - [ステージ1：環境構築（Windows）](/ja/tutorials/robot-arms/so-arm-amazinghand/01-Environment-Setup-Windows)
    - [ステージ2:ハンドとアームのキャリブレーション(Linux)](/ja/tutorials/robot-arms/so-arm-amazinghand/02-Hand-Arm-Calibration-Linux)
    - [ステージ2:ハンドとアームのキャリブレーション(Windows)](/ja/tutorials/robot-arms/so-arm-amazinghand/02-Hand-Arm-Calibration-Windows)
    - [ステージ3：遠隔操作（Linux）](/ja/tutorials/robot-arms/so-arm-amazinghand/03-Teleoperation-Linux)
    - [ステージ3：遠隔操作（Windows）](/ja/tutorials/robot-arms/so-arm-amazinghand/03-Teleoperation-Windows)
    - [ステージ4：データ収集（Linux）](/ja/tutorials/robot-arms/so-arm-amazinghand/04-Data-Collection-Linux)
    - [ステージ4：データ収集（Windows）](/ja/tutorials/robot-arms/so-arm-amazinghand/04-Data-Collection-Windows)
    - [ステージ5：モデル訓練（Linux）](/ja/tutorials/robot-arms/so-arm-amazinghand/05-Model-Training-Linux)
    - [ステージ5：モデル訓練（Windows）](/ja/tutorials/robot-arms/so-arm-amazinghand/05-Model-Training-Windows)
    - [ステージ6:モデルデプロイ(Linux)](/ja/tutorials/robot-arms/so-arm-amazinghand/06-Model-Deployment-Linux)
    - [ステージ6:モデルデプロイ(Windows)](/ja/tutorials/robot-arms/so-arm-amazinghand/06-Model-Deployment-Windows)
  - **XLeRobot チュートリアル**
    - [チュートリアル概要](/ja/tutorials/robot-arms/xlerobot/)
    - [環境構築(macOS)](/ja/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS)
    - [環境構築(Ubuntu)](/ja/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu)
    - [環境構築(Windows)](/ja/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows)
    - [XLeRobot ファイルの移動](/ja/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files)
    - [完成品組み立て](/ja/tutorials/robot-arms/xlerobot/03-Assembly-Assembled-Kit)
    - [パーツキット組み立て](/ja/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit)
  - **AmazingHand**
    - [ロボットハンド インターフェース制御](/ja/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control)
    - [AmazingHand 器用なハンド製品資料](/ja/tutorials/robot-arms/amazing-hand/product-info)
    - [器用ハンド公式サンプル実行チュートリアル](/ja/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example)
    - [器用ハンド（TTL シリアルサーボ）デバッグチュートリアル](/ja/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging)
      - **PWMサーボ デバッグ**
        - [01-GUI 可視化制御](/ja/tutorials/robot-arms/amazing-hand/pwm-debugging/01-GUI-Visual-Control)
        - [02-ジェスチャートラッキングチュートリアル](/ja/tutorials/robot-arms/amazing-hand/pwm-debugging/02-Gesture-Tracking)
        - [03-PWM サーボバージョン-使用マニュアル](/ja/tutorials/robot-arms/amazing-hand/pwm-debugging/03-PWM-Servo-Manual)
        - [04-シリアルサーボバージョン-使用説明](/ja/tutorials/robot-arms/amazing-hand/pwm-debugging/04-Serial-Servo-Guide)
      - **ジェスチャー追跡**
        - [Linux（Ubuntu）ワンクリックデプロイ実行](/ja/tutorials/robot-arms/amazing-hand/gesture-tracking/01-Ubuntu)
        - [Windows ワンクリックデプロイ実行](/ja/tutorials/robot-arms/amazing-hand/gesture-tracking/02-Windows)
        - [Mac ワンクリックデプロイ実行](/ja/tutorials/robot-arms/amazing-hand/gesture-tracking/03-macOS)
  - **Lekiwi**
    - [Lekiwi 移動ロボット使用チュートリアル](/ja/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial)
    - [Lekiwi 移動ロボット組み立てチュートリアル](/ja/tutorials/robot-arms/lekiwi/Lekiwi-Assembly)

### センサー

- [センサーと知覚](/ja/tutorials/sensors/)
- [IMU キャリブレーション](/ja/tutorials/sensors/imu/calibration)
- [ファイルリモート転送](/ja/tutorials/sensors/imu/remote-file-transfer)
- [SSHファイル転送](/ja/tutorials/sensors/imu/ssh-file-transfer)
  - **IMU 慣性ナビゲーション**
    - [製品情報](/ja/tutorials/sensors/imu/product-info)
      - **マルチボード例**
        - [マルチホスト通信ケース概要](/ja/tutorials/sensors/imu/multi-board-examples/overview)
        - [PC 通信](/ja/tutorials/sensors/imu/multi-board-examples/pc-communication)
          - **I2C 通信**
            - [Arduino](/ja/tutorials/sensors/imu/multi-board-examples/i2c-communication/arduino)
            - [Jetson](/ja/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson)
            - [ラズベリーパイ](/ja/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi)
            - [RDK](/ja/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk)
            - [STM32](/ja/tutorials/sensors/imu/multi-board-examples/i2c-communication/stm32)
          - **シリアル通信**
            - [Arduino](/ja/tutorials/sensors/imu/multi-board-examples/serial-communication/arduino)
            - [Jetson](/ja/tutorials/sensors/imu/multi-board-examples/serial-communication/jetson)
            - [ラズベリーパイ](/ja/tutorials/sensors/imu/multi-board-examples/serial-communication/raspberry-pi)
            - [RDK](/ja/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk)
            - [STM32](/ja/tutorials/sensors/imu/multi-board-examples/serial-communication/stm32)
      - **ROS サンプル**
        - [ROS1 応用](/ja/tutorials/sensors/imu/ros-examples/ros1)
        - [ROS2 応用](/ja/tutorials/sensors/imu/ros-examples/ros2)
  - **GPS 北斗測位モジュール**
    - [モジュール資料](/ja/tutorials/sensors/gps/GPS-Module-Info)
    - [51 マイコン:GPS 解析](/ja/tutorials/sensors/gps/51-MCU-GPS-Parsing)
    - [Arduino:位置情報の読み取り](/ja/tutorials/sensors/gps/Arduino-Location-Reading)
    - [Arduino:位置情報の解析](/ja/tutorials/sensors/gps/Arduino-Location-Parsing)
    - [STM32F103:GPS 解析出力](/ja/tutorials/sensors/gps/STM32F103-GPS-Parsing)
    - [Jetson:位置情報解析](/ja/tutorials/sensors/gps/Jetson-GPS-Parsing)
    - [Jetson:AGNSS 支援測位](/ja/tutorials/sensors/gps/Jetson-AGNSS)
    - [Jetson:百度地図 API 申請](/ja/tutorials/sensors/gps/Jetson-Baidu-Map-API)
    - [ラズベリーパイ:位置情報解析](/ja/tutorials/sensors/gps/RaspberryPi-GPS-Parsing)
    - [ラズベリーパイ:AGNSS 支援測位](/ja/tutorials/sensors/gps/RaspberryPi-AGNSS)
    - [ラズベリーパイ:百度地図 API 申請](/ja/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API)
    - [ROS:事前準備](/ja/tutorials/sensors/gps/ROS-Preparation)
    - [ROS:GPS データの読み取り](/ja/tutorials/sensors/gps/ROS-Read-GPS-Data)
    - [ROS:GPS 軌跡の描画](/ja/tutorials/sensors/gps/ROS-Draw-GPS-Track)
    - [地図の位置誤差](/ja/tutorials/sensors/gps/Map-Location-Error)

### アクセサリー

- [ロボットアクセサリ](/ja/tutorials/accessories/)
  - [USB オートフォーカスカメラ](/ja/tutorials/accessories/usb-auto-focus-camera)
  - [Jetson CSI カメラ](/ja/tutorials/accessories/jetson-csi-camera)
    - **KWS 音声認識モジュール**
      - [シリーズチュートリアルホーム](/ja/tutorials/accessories/KWS-speech-recognition-module/)
      - [Jetson Nano シリアル通信](/ja/tutorials/accessories/KWS-speech-recognition-module/Jetson-Nano-serial-communication)
      - [Jetson シリアル通信](/ja/tutorials/accessories/KWS-speech-recognition-module/Jetson-serial-communication)
      - [PC シリアル通信](/ja/tutorials/accessories/KWS-speech-recognition-module/PC-serial-communication)
      - [ラズベリーパイシリアル通信](/ja/tutorials/accessories/KWS-speech-recognition-module/raspberry-pi-serial-communication)
      - [ROS2 RViz2 可視化](/ja/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization)
      - [中英認識語ファームウェアのダウンロードと書き込み](/ja/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words)
    - **Feetech サーボ**
      - [STS3215 & SCS0009 デバッグチュートリアル](/ja/tutorials/accessories/feetech/Feetech-STS3215&SCS0009-Tutorial)
      - [SCS 通信プロトコル](/ja/tutorials/accessories/feetech/Feetech-SCS_Communication_Protocol)
      - [磁気エンコーダ STS サーボ - メモリテーブル解析](/ja/tutorials/accessories/feetech/Feetech-Magnetic_Encoder_STS_Servo-Memory_Table_Analysis)
      - [ポテンショメータ SCSCL サーボ - メモリテーブル解析](/ja/tutorials/accessories/feetech/Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis)
      - [SCS0009 サーボデバッグツール使用チュートリアル](/ja/tutorials/accessories/feetech/SCS0009-Debug-Tool)
    - **ESP32-NanoCam 映像伝送モジュール**
      - [ESP32-NanoCam クイックスタート](/ja/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start)
      - [ESP32-NanoCam ハードウェア仕様書](/ja/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Hardware-Spec)
      - [ESP32-NanoCam シリアルプロトコルマニュアル](/ja/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Serial-Protocol)
        - **AI ビジョンチュートリアル(全 11 章)**
          - [第 1 章:環境構築](/ja/tutorials/accessories/esp32-nanocam/Ch01-Environment-Setup)
          - [第 2 章:クイックスタート](/ja/tutorials/accessories/esp32-nanocam/Ch02-Quick-Start)
          - [第 3 章:カメラの基礎](/ja/tutorials/accessories/esp32-nanocam/Ch03-Camera-Basics)
          - [第 4 章:顔検出](/ja/tutorials/accessories/esp32-nanocam/Ch04-Face-Detection)
          - [第 5 章:猫顔検出](/ja/tutorials/accessories/esp32-nanocam/Ch05-Cat-Face-Detection)
          - [第 6 章:色認識](/ja/tutorials/accessories/esp32-nanocam/Ch06-Color-Recognition)
          - [第 7 章:QR コードスキャン](/ja/tutorials/accessories/esp32-nanocam/Ch07-QR-Code-Scanning)
          - [第 8 章:顔認識](/ja/tutorials/accessories/esp32-nanocam/Ch08-Face-Recognition)
          - [第 9 章:音声対話](/ja/tutorials/accessories/esp32-nanocam/Ch09-Voice-Chat)
          - [第 10 章:AI 視覚理解](/ja/tutorials/accessories/esp32-nanocam/Ch10-AI-Vision-Understanding)
          - [第 11 章:ESP-Claw 音声制御](/ja/tutorials/accessories/esp32-nanocam/Ch11-ESP-Claw-Voice-Control)
    - **CSI カメラ使用チュートリアル**
      - [Jetson CSI カメラ設定](/ja/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup)
      - [オートフォーカスカメラの使用](/ja/tutorials/accessories/csi-camera/02-Auto-Focus-Camera)
      - [Jupyter Lab の使用](/ja/tutorials/accessories/csi-camera/03-JupyterLab)
      - [JetCam の使用](/ja/tutorials/accessories/csi-camera/04-JetCam)
      - [IMX219(ラズベリーパイ)](/ja/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi)
    - **AI 音声対話モジュール**
      - [クイックスタート](/ja/tutorials/accessories/ai-voice-module/Quick-Start)
      - [製品資料](/ja/tutorials/accessories/ai-voice-module/Product-Info)
      - [モジュールファームウェアの書き込み](/ja/tutorials/accessories/ai-voice-module/Firmware-Flashing)
      - [ウェイクワードとコマンドワードの変更](/ja/tutorials/accessories/ai-voice-module/Wake-Word-Commands-Edit)
      - [カスタムプロトコルエントリーの作成](/ja/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries)
      - [ROS1 音声対話](/ja/tutorials/accessories/ai-voice-module/ROS1-Voice-Interaction)
      - [ROS2 音声対話](/ja/tutorials/accessories/ai-voice-module/ROS2-Voice-Interaction)
      - [シリアルポートプロトコル](/ja/tutorials/accessories/ai-voice-module/Serial-Protocol)
      - [IIC プロトコル](/ja/tutorials/accessories/ai-voice-module/IIC-Protocol)
      - [PC 通信](/ja/tutorials/accessories/ai-voice-module/PC-Communication)
      - [Arduino: シリアルポート通信](/ja/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication)
      - [Arduino: IIC 通信](/ja/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication)
      - [Jetson: シリアルポート通信](/ja/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication)
      - [Jetson: IIC 通信](/ja/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication)
      - [RDK: シリアルポート通信](/ja/tutorials/accessories/ai-voice-module/RDK-Serial-Communication)
      - [RDK: IIC 通信](/ja/tutorials/accessories/ai-voice-module/RDK-IIC-Communication)
      - [ラズベリーパイ: シリアルポート通信](/ja/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication)
      - [ラズベリーパイ: IIC 通信](/ja/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication)
  - [2自由度ジンバル](/ja/tutorials/accessories/2dof-camera-gimbal)
- [心拍・血中酸素センサー](/ja/tutorials/accessories/heart-rate-spo2)
- [0.91 インチ OLED スクリーン](/ja/tutorials/accessories/0.91-oled-screen-tutorial)
- [4K HDMI キャプチャカード](/ja/tutorials/accessories/4k-hdmi-capture-tutorial)
- [KVMスイッチ](/ja/tutorials/accessories/kvm-switch-tutorial)
- [USB ドライバ不要サウンドカード](/ja/tutorials/accessories/usb-audio-card-tutorial)

## 使い方

1. **テーマカテゴリを選ぶ**: 興味やニーズに応じて、対応するテーマカテゴリを選択します
2. **チュートリアルリストを確認する**: 各テーマカテゴリで、利用可能なチュートリアルとドキュメントを確認します
3. **手順に従う**: チュートリアルの手順に従って、段階的に製品を学び使用します
4. **実践と探索**: 実際の操作で、さまざまな機能や設定を試して経験を積みます

## その他のリソース

- ご質問やご提案は、GitHub リポジトリにアクセスして Issue を送信してください
- 最新の製品アップデートやチュートリアル情報は、ブログや SNS をフォローしてください
