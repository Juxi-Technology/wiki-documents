---
title: ロボットアームシリーズ
description: "Juxi Technologyロボットアームシリーズチュートリアルホーム——SO-ARM101、AmazingHand、Lekiwi、XLeRobot"
---

# ロボットアームシリーズ

ロボットアームシリーズチュートリアルへようこそ！さまざまなオープンソースロボットアームと器用ハンドの完全な使い方ガイドを集めています。

---

## 製品リスト

- [選定ガイド](./select-guide.md)

### SO-ARM101

6軸デスクトップオープンソースロボットアーム。LeRobotなどのAIフレームワークに対応。

- [SO-ARM101 チュートリアル](./so-arm101/SO-ARM101-Tutorial.md)
- [SO-ARM101 組み立てガイド](./so-arm101/SO-ARM101-Assembly.md)
- [SO-ARM101 Jetson Orin PyTorch 互換性](./so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility.md)
- [SO-ARM101 ワイヤレス遠隔操作(ESP32-NanoCam 版)](./so-arm101/SO-ARM101-NanoCam-Wireless-Teleop.md)
- [SO-ARM101 デュアルアーム(デュアルフォロワー)チュートリアル](./so-arm101/SO-ARM101-Bi-Arm-Tutorial.md)
- [SoARM シリーズ サーボキャリブレーションツール](./so-arm101/SO-ARM101-Servo-Calibration-Tool.md)

#### SO-ARM101 シリーズ
- [SO-ARM100&101 アーム搭載ブラケットと環境カメラキット 取付チュートリアル](./so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation.md)
- [オーバーヘッドカメラマウント取付ガイド](./so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation.md)

#### 1. LeRobot環境のインストール
- [ステップ1:LeRobot環境のインストール（Ubuntu）](./so-arm101/lerobot/01-Environment-Setup/Ubuntu.md)
- [ステップ1:LeRobot環境のインストール（Windows）](./so-arm101/lerobot/01-Environment-Setup/Windows.md)
- [ステップ1:LeRobot環境のインストール（macOS）](./so-arm101/lerobot/01-Environment-Setup/MacOS.md)

#### 2. シリアルポート番号の確認
- [ステップ2:シリアルポート番号の確認（Ubuntu）](./so-arm101/lerobot/02-Serial-Port/Ubuntu.md)
- [ステップ2:シリアルポート番号の確認（Windows）](./so-arm101/lerobot/02-Serial-Port/Windows.md)
- [ステップ2:シリアルポート番号の確認（macOS）](./so-arm101/lerobot/02-Serial-Port/MacOS.md)

#### 3. ロボットアームのキャリブレーション
- [ステップ3:ロボットアームのキャリブレーション（Ubuntu）](./so-arm101/lerobot/03-Calibration/Ubuntu.md)
- [ステップ3:ロボットアームのキャリブレーション（Windows）](./so-arm101/lerobot/03-Calibration/Windows.md)
- [ステップ3:ロボットアームのキャリブレーション（macOS）](./so-arm101/lerobot/03-Calibration/MacOS.md)

#### 4. テレオペレーション
- [ステップ4:テレオペレーション（Ubuntu）](./so-arm101/lerobot/04-Teleoperation/Ubuntu.md)
- [ステップ4:テレオペレーション（Windows）](./so-arm101/lerobot/04-Teleoperation/Windows.md)
- [ステップ4:テレオペレーション（macOS）](./so-arm101/lerobot/04-Teleoperation/MacOS.md)

#### 5. カメラ付きテレオペレーション
- [ステップ5:カメラ付きテレオペレーション（Ubuntu）](./so-arm101/lerobot/05-Camera-Teleoperation/Ubuntu.md)
- [ステップ5:カメラ付きテレオペレーション（Windows）](./so-arm101/lerobot/05-Camera-Teleoperation/Windows.md)
- [ステップ5:カメラ付きテレオペレーション（macOS）](./so-arm101/lerobot/05-Camera-Teleoperation/MacOS.md)

#### 6. データセット収集（実機）
- [ステップ6:教示によるデータセット収集](./so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording.md)
- [ステップ6:データセット収集の注意事項](./so-arm101/lerobot/06-Data-Collection/Collection-Notes.md)
- [ステップ6:HuggingFaceアカウントの登録（任意）](./so-arm101/lerobot/06-Data-Collection/HF-Account.md)
- [ステップ6:データセットをHuggingFaceにアップロード（任意）](./so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload.md)

#### 7. モデルの訓練
- [ステップ7:ローカルUbuntuでの訓練](./so-arm101/lerobot/07-Training/Local-Ubuntu.md)
- [ステップ7:クラウドGPU訓練環境の設定](./so-arm101/lerobot/07-Training/Cloud-GPU.md)
- [ステップ7:wandbでリアルタイム訓練曲線を確認](./so-arm101/lerobot/07-Training/WandB-Curves.md)
- [ステップ7:モデルをHuggingFaceにアップロード（任意）](./so-arm101/lerobot/07-Training/HF-Model-Upload.md)
- [ステップ7:モデルの重みファイルを取得](./so-arm101/lerobot/07-Training/Model-Weights.md)
- [ステップ7:訓練コマンドライン-ACT](./so-arm101/lerobot/07-Training/Command-ACT.md)
- [ステップ7:訓練コマンドライン-pi0](./so-arm101/lerobot/07-Training/Command-pi0.md)
- [ステップ7:訓練コマンドライン-pi0.5](./so-arm101/lerobot/07-Training/Command-pi0.5.md)
- [ステップ7:訓練コマンドライン-pi0fast](./so-arm101/lerobot/07-Training/Command-pi0fast.md)
- [ステップ7:訓練コマンドライン-smolvla](./so-arm101/lerobot/07-Training/Command-smolvla.md)

#### 8. モデルのデプロイ
- [ステップ8:デプロイコマンドラインの説明](./so-arm101/lerobot/08-Inference/CLI-Reference.md)
- [ステップ8:よくあるBugと解決方法](./so-arm101/lerobot/08-Inference/Common-Bugs.md)
- [ステップ8:デプロイコマンドライン-ACT](./so-arm101/lerobot/08-Inference/Command-ACT.md)
- [ステップ8:デプロイコマンドライン-pi0](./so-arm101/lerobot/08-Inference/Command-pi0.md)
- [ステップ8:デプロイコマンドライン-pi0.5](./so-arm101/lerobot/08-Inference/Command-pi0.5.md)
- [ステップ8:デプロイコマンドライン-smolvla](./so-arm101/lerobot/08-Inference/Command-smolvla.md)

#### 基礎知識
- [LeRobotを知る](./so-arm101/basics/Understanding-LeRobot.md)
- [HuggingFace上のLeRobotデータセット](./so-arm101/basics/HF-Datasets.md)
- [モデルトレーニングの資料](./so-arm101/basics/Training-Resources.md)
- [SO-ARM 100公式3Dプリントファイル](./so-arm101/basics/Official-3D-Print-Files.md)
- [URDFファイルおよび資料参考](./so-arm101/basics/URDF-Reference.md)

#### その他・応用
- [ROS2シミュレーション制御](./so-arm101/ROS2-Simulation-Control.md)
- [平行指グリッパー取り付けチュートリアル](./so-arm101/Parallel-Finger-Gripper-Installation.md)


### SO-ARM101 ロボットアーム 7軸 チュートリアル

- [SO-ARM101 ロボットアーム 7軸 チュートリアル](/tutorials/robot-arms/so-arm101/lerobot-7dof/)
- **1. LeRobot環境のインストール**
  - [Ubuntuコンピューター](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Ubuntu)
  - [Windowsコンピューター](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Windows)
  - [MACコンピューター](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/MacOS)
- **2. ファイルの置き換え（7DOF 対応）**
  - [ファイルの置き換え（7DOF 対応）](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/02-Replace-Files-7DOF)
- **3. シリアルポート番号の確認**
  - [Ubuntu](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Ubuntu)
  - [Windowsコンピューター](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Windows)
  - [MACコンピューター](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/MacOS)
- **4. ロボットアームのキャリブレーション**
  - [Ubuntuコンピューター](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Ubuntu)
  - [Windowsコンピューター](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Windows)
  - [Macコンピューター](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/MacOS)
- **5. テレオペレーション**
  - [Ubuntuコンピューター](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Ubuntu)
  - [Windowsコンピューター](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Windows)
  - [Macコンピューター](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/MacOS)
- **6. カメラ付きテレオペレーション**
  - [Ubuntuコンピューター](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Ubuntu)
  - [Windowsコンピューター](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Windows)
  - [Macコンピューター](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/MacOS)
- **7. データセット収集（実機）**
  - [データセットの確認・リプレイ](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Browse-and-Replay)
  - [データセット収集の注意事項](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Collection-Notes)
  - [Hugging Faceアカウントの登録（任意）](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Account)
  - [データセットをHuggingFaceにアップロード（任意）](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Dataset-Upload)
  - [教示によるデータセット収集-握手200](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording-Handshake-200)
  - [教示によるデータセット収集](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording)
- **8. モデルの訓練**
  - [クラウドGPU訓練環境の設定](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Cloud-GPU)
  - [訓練コマンドライン-ACT（入門に推奨）](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-ACT)
  - [訓練コマンドライン-Diffusion](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-Diffusion)
  - [訓練コマンドライン-pi0.5](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0.5)
  - [訓練コマンドライン-pi0（効果が最も良い）](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0)
  - [訓練コマンドライン-pi0fast](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0fast)
  - [訓練コマンドライン-smolvla（次のステップに推奨）](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-smolvla)
  - [モデルをHuggingFaceにアップロード（任意）](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/HF-Model-Upload)
  - [LeRobotがサポートする模倣学習アルゴリズム](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Imitation-Learning-Algorithms)
  - [ローカルUbuntuでの訓練](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Local-Ubuntu)
  - [モデルの重みファイルを取得](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Model-Weights)
  - [訓練パラメータの提案](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Training-Parameter-Tips)
  - [wandbでリアルタイム訓練曲線を確認](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/WandB-Curves)
- **9. モデルのデプロイ**
  - [コマンドラインの説明](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/CLI-Reference)
  - [推論コマンドライン-ACT](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-ACT)
  - [推論コマンドライン-Diffusion](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-Diffusion)
  - [推論コマンドライン-pi0.5](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0.5)
  - [推論コマンドライン-pi0](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0)
  - [推論コマンドライン-smolvla](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-smolvla)
  - [よくあるBugと解決方法](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Common-Bugs)
  - [NVIDIA DGX Spark 推論](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/DGX-Spark)
  - [地瓜机器人（D-Robotics） RDK S100 推論](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/RDK-S100)

### AmazingHand

オープンソースバイオニック器用ハンド。高精度の多指操作を提供。

- [AmazingHand インターフェース制御](./amazing-hand/AmazingHand-Interface-Control.md)
- [AmazingHand 公式サンプル](./amazing-hand/AmazingHand-Official-Example.md)
- [AmazingHand TTLデバッグ](./amazing-hand/AmazingHand-TTL-Debugging.md)

#### AmazingHand
- [AmazingHand 器用なハンド製品資料](./amazing-hand/product-info.md)

#### PWMサーボ デバッグ
- [01-GUI 可視化制御](./amazing-hand/pwm-debugging/01-GUI-Visual-Control.md)
- [02-ジェスチャートラッキングチュートリアル](./amazing-hand/pwm-debugging/02-Gesture-Tracking.md)
- [03-PWM サーボバージョン-使用マニュアル](./amazing-hand/pwm-debugging/03-PWM-Servo-Manual.md)
- [04-シリアルサーボバージョン-使用説明](./amazing-hand/pwm-debugging/04-Serial-Servo-Guide.md)

#### ジェスチャー追跡
- [Linux（Ubuntu）ワンクリックデプロイ実行](./amazing-hand/gesture-tracking/01-Ubuntu.md)
- [Windows ワンクリックデプロイ実行](./amazing-hand/gesture-tracking/02-Windows.md)
- [Mac ワンクリックデプロイ実行](./amazing-hand/gesture-tracking/03-macOS.md)

### Lekiwi

完全にオープンソースのモバイルロボットカー。LeRobot模倣学習フレームワーク互換、SO101アームに対応。

- [Lekiwi チュートリアル](./lekiwi/Lekiwi-Tutorial.md)
- [Lekiwi 組み立てチュートリアル](./lekiwi/Lekiwi-Assembly.md)
- [製品情報](./lekiwi/Lekiwi-Product-Info.md)

### SO-ARM101 + AmazingHand チュートリアル

SO-ARM101 フォロワーアーム + AmazingHand の全ワークフロー:環境構築、キャリブレーション、遠隔操作、データ収集、モデル訓練、デプロイ(Windows / Linux 別)。

- [コース概要](./so-arm-amazinghand/index.md)

#### Linux

- [ステージ1:環境構築(Linux)](./so-arm-amazinghand/01-Environment-Setup-Linux.md)
- [ステージ2:ハンドとアームのキャリブレーション(Linux)](./so-arm-amazinghand/02-Hand-Arm-Calibration-Linux.md)
- [ステージ3:遠隔操作(Linux)](./so-arm-amazinghand/03-Teleoperation-Linux.md)
- [ステージ4:データ収集(Linux)](./so-arm-amazinghand/04-Data-Collection-Linux.md)
- [ステージ5:モデル訓練(Linux)](./so-arm-amazinghand/05-Model-Training-Linux.md)
- [ステージ6:モデルデプロイ(Linux)](./so-arm-amazinghand/06-Model-Deployment-Linux.md)

#### Windows

- [ステージ1:環境構築(Windows)](./so-arm-amazinghand/01-Environment-Setup-Windows.md)
- [ステージ2:ハンドとアームのキャリブレーション(Windows)](./so-arm-amazinghand/02-Hand-Arm-Calibration-Windows.md)
- [ステージ3:遠隔操作(Windows)](./so-arm-amazinghand/03-Teleoperation-Windows.md)
- [ステージ4:データ収集(Windows)](./so-arm-amazinghand/04-Data-Collection-Windows.md)
- [ステージ5:モデル訓練(Windows)](./so-arm-amazinghand/05-Model-Training-Windows.md)
- [ステージ6:モデルデプロイ(Windows)](./so-arm-amazinghand/06-Model-Deployment-Windows.md)

### XLeRobot チュートリアル

XLeRobot 双腕移動ロボットのチュートリアル:環境構築、ファイル配置、完成品/パーツキットの組み立て。

- [チュートリアル概要](./xlerobot/index.md)
- [環境構築(macOS)](./xlerobot/01-Environment-Setup-macOS.md)
- [環境構築(Ubuntu)](./xlerobot/01-Environment-Setup-Ubuntu.md)
- [環境構築(Windows)](./xlerobot/01-Environment-Setup-Windows.md)
- [XLeRobot ファイルの移動](./xlerobot/02-Move-Xlerobot-Files.md)
- [完成品組み立て](./xlerobot/03-Assembly-Assembled-Kit.md)
- [パーツキット組み立て](./xlerobot/04-Assembly-Parts-Kit.md)

---

## サポート

問題があればご連絡ください：

- 📧 メール：support@juxitech.com
- 💬 GitHub Issues：[問題フィードバック](https://github.com/Juxi-Technology/wiki-documents/issues)
