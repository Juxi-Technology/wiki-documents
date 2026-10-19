---
title: "SO-ARM101 ロボットアームチュートリアル"
description: "SO-ARM101 チュートリアルのトップページ:身体性知能と LeRobot とは何か、ロボットアームの概要、必要な PC 構成、模倣学習(VLA)の意味を紹介し、コース全体のナビゲーションを提供します。"
---

# SO-ARM101 ロボットアームチュートリアル

![image.png](../../../../../public/images/tutorials/robot-arms/so-arm101/so-arm101-index/d02-03.png)

## 身体性知能とは何か？

身体を持つ知能です。AI をさまざまな物理的なハードウェア実体に接続します。たとえば次のようなものです。

四足歩行ロボット犬、二足歩行ヒューマノイドロボット、車輪脚ロボット、ドローン、自動運転車

## LeRobot とは何か？

LeRobot は HuggingFace のオープンソースの `身体性知能ロボットソフトウェアフレームワーク` です

GitHub アドレス：https://github.com/huggingface/lerobot

強化学習と**模倣学習（VLA）**における**データ収集、アルゴリズム学習、推論デプロイ**の障壁を下げ、**模倣学習（VLA）**を主軸としています

- LeRobot ではどのようなロボットを開発できるのか？

千元クラスの SO-ARM 101 ロボットアームと LeKiwi カートから、数万元クラスの AgileX piper アーム、Huaxinjing StarAI アーム、Hope-JR 巧みな手まで、さらに数十万元クラスの Unitree G1 ヒューマノイドロボットへと広がります。LeRobot は身体性知能産業におけるデータ収集とアルゴリズム学習の標準となっています。

自分のロボットを LeRobot フレームワークに適合させることもできます。

- LeRobot のデータセットとモデル

LeRobot は独自の模倣学習データセット形式を定義しています。HuggingFace 上のすべての公開データセットとモデルを閲覧・利用・ダウンロード・学習でき、自分のデータセットを HuggingFace にアップロードすることもできます。

## SO-ARM 101 ロボットアームとは何か？

本チュートリアルでは SO-ARM 101 ロボットアームを例に取り上げます。3D プリントの構造部品と Feetech サーボを使用し、非常に低コストです。

これは貧しい学生でも手が届く身体性知能の身体であり、LeRobot が公式に推奨する身体の一つでもあります。

アームは2本のアームで構成されています。Leader アームと Follower アームです。各アームは5自由度に加えてグリッパ1自由度を持ちます。

## どのようなコンピュータ構成が必要か

一般的な Windows ノート PC であれば、学習までのすべてを処理できます。

一般的な Mac であればすべてを処理できます。

NVIDIA GPU を搭載した Ubuntu マシンであればすべてを処理できます。

本チュートリアルでは[クラウド GPU プラットフォーム](https://featurize.cn?s=d7ce99f842414bfcaea5662a97581bd1)を使ってモデルを学習するため、手元のコンピュータにハイエンドな構成は必要ありません。

## **模倣学習と VLA** とは何か？

人間がロボットを引っ張って実演し、データセットを収集します。そのデータセットを使って模倣学習アルゴリズムを学習し、最終的にロボットにデプロイして、人間の動作を自律的に模倣し実環境へ汎化させます。テレオペレーションや遠隔操作は不要です。

たとえば上の動画では、人間が SO-ARM ロボットアームを引っ張ってザリガニをつかみ、調味料に浸して熱油に落とし、最終的にアームがこの動作を自力で実行します。新しいザリガニであっても、いつでも反応して動作を完了できます。

模倣学習には最先端でおしゃれな名前もあります。VLA（Vision-Language-Action 大規模モデル）です。これは現在最も速く発展し、最も熱い投資を集め、中国と米国の競争が最も激しく、オープンソースエコシステムが最も繁栄し、メディアの注目を最も集め、無数の修士・博士課程の学生を引き寄せている身体性知能の研究分野でもあります。

LeRobot が主に適合させるアルゴリズムは模倣学習のもので、ACT、Diffusion Policy、SmolVLA、Pi0、Pi0.5、Wall-OSS などがあります。

本チュートリアルの模倣学習はすべて VLA です。


## チュートリアルナビゲーション

### コンプリートコース

- [LeRobot完全コース](/ja/tutorials/robot-arms/so-arm101/lerobot/)
- [SO-ARM101 ロボットアーム 7軸 チュートリアル](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/)

### 組み立て・拡張チュートリアル

- [LeRobot ロボットアームチュートリアル](/ja/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Lerobot ロボットアーム組立ガイド](/ja/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [SO-ARM100&101 アーム搭載ブラケットと環境カメラキット 取付チュートリアル](/ja/tutorials/robot-arms/so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation)
- [オーバーヘッドカメラマウント取付ガイド](/ja/tutorials/robot-arms/so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation)
- [平行指グリッパー取り付けチュートリアル](/ja/tutorials/robot-arms/so-arm101/Parallel-Finger-Gripper-Installation)
- [SO-ARM101 デュアルアーム(デュアルフォロワー)チュートリアル](/ja/tutorials/robot-arms/so-arm101/SO-ARM101-Bi-Arm-Tutorial)
- [SO-ARM101 ワイヤレス遠隔操作(ESP32-NanoCam 版)](/ja/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop)
- [遠隔操作トラブルシューティング](/ja/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Troubleshooting)
- [SoARM シリーズ サーボキャリブレーションツール使用チュートリアル](/ja/tutorials/robot-arms/so-arm101/SO-ARM101-Servo-Calibration-Tool)
- [ROS2シミュレーション制御](/ja/tutorials/robot-arms/so-arm101/ROS2-Simulation-Control)
- [Jetson Orin での PyTorch 非互換問題](/ja/tutorials/robot-arms/so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility)

### 基礎知識

- [LeRobotを知る](/ja/tutorials/robot-arms/so-arm101/basics/Understanding-LeRobot)
- [HuggingFace上のLeRobotデータセット](/ja/tutorials/robot-arms/so-arm101/basics/HF-Datasets)
- [モデルトレーニングの資料](/ja/tutorials/robot-arms/so-arm101/basics/Training-Resources)
- [SO-ARM 100公式3Dプリントファイル](/ja/tutorials/robot-arms/so-arm101/basics/Official-3D-Print-Files)
- [URDFファイルおよび資料参考](/ja/tutorials/robot-arms/so-arm101/basics/URDF-Reference)
- [推奨カメラブラケットとマウント](/ja/tutorials/robot-arms/so-arm101/basics/Camera-Mounts-Recommended)

### LeLab チュートリアル

- [1 · 概要](/ja/tutorials/robot-arms/so-arm101/lelab/01-Overview)
- [2 · インストールと起動](/ja/tutorials/robot-arms/so-arm101/lelab/02-Install)
- [3 · 接続とキャリブレーション](/ja/tutorials/robot-arms/so-arm101/lelab/03-Calibration)
- [4 · テレオペレーション](/ja/tutorials/robot-arms/so-arm101/lelab/04-Teleoperation)
- [5 · データセットの記録](/ja/tutorials/robot-arms/so-arm101/lelab/05-Record-Dataset)
- [6 · 訓練と推論](/ja/tutorials/robot-arms/so-arm101/lelab/06-Train-and-Inference)
- [7 · トラブルシューティング](/ja/tutorials/robot-arms/so-arm101/lelab/07-Troubleshooting)
,### MuJoCo シミュレーションチュートリアル,,- [SO-ARM101 × MuJoCo ワークフロー全体チュートリアル（索引）](/ja/tutorials/robot-arms/so-arm101/mujoco/),- [01 · 環境準備](/ja/tutorials/robot-arms/so-arm101/mujoco/01-Environment),- [02 · シミュレーションモデル検証（MJCF の読み込みと駆動）](/ja/tutorials/robot-arms/so-arm101/mujoco/02-Sim-Model-Verification),- [03 · 実機接続とキャリブレーション](/ja/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration),- [04 · キーボード遠隔操作](/ja/tutorials/robot-arms/so-arm101/mujoco/04-Keyboard-Teleop),- [05 · リーダーアームのデジタルツイン（実体アームがシミュレーションアームを駆動）](/ja/tutorials/robot-arms/so-arm101/mujoco/05-Leader-Digital-Twin),- [06 · データ録画と再生](/ja/tutorials/robot-arms/so-arm101/mujoco/06-Record-and-Replay),- [07 · よくある問題と経験](/ja/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting),- [08 · 今後のロードマップ](/ja/tutorials/robot-arms/so-arm101/mujoco/08-Roadmap),- [09 · 完全使用チュートリアル（アーム起動 → データセット → 動画確認 → 学習 → 展開）](/ja/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial)

### XLeRobot Docker イメージチュートリアル

- [XLeRobot Docker チュートリアル — Jetson AGX Orin 開発キット](/ja/tutorials/jetson-agx-orin/xlerobot-docker/deployment/01-Overview)
- [XLeRobot Docker チュートリアル — Jetson Orin Nano Super 開発キット](/ja/tutorials/jetson-orin-nano/xlerobot-docker/deployment/01-Overview)

<RelatedProducts slugs="so-arm101" />
