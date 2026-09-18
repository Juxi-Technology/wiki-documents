---
title: "URDFファイルおよび資料参考"
description: "LeRobot公式のURDFファイルとURDF Studioに加え、LeLabやブラウザ上でのサーボID設定など関連資料をまとめています。"
---

# URDFファイルおよび資料参考

## Lerbot公式の[URDFファイル](https://github.com/TheRobotStudio/SO-ARM100/blob/main/Simulation/SO101/so101_new_calib.urdf)

### URDF Studio

https://urdf.d-robotics.cc/

### ROS2 シミュレーション制御（自身で実装可能）

https://github.com/holmsslk/so-arm-moveit-hardware

### LeRobotの公式グラフィカルインターフェース

https://github.com/huggingface/leLab

LeLabはWebアプリケーションであり、LeRobotの全ワークフロー——キャリブレーション、遠隔操作、記録、トレーニング、再生——を1つのブラウザインターフェースに統合します。機械アームを接続してアプリを開くだけで、すぐに操作を開始できます。面倒なコマンドライン操作も、キーボード入力も不要です。

🤗 LeRobot のネイティブなWebエントリーポイントであり、新規ユーザーが数分以内に「開梱」から「最初のポリシーのトレーニング」までの全プロセスを完了できることを目的としています。

🤗 たった1つのコマンドで、すべてのプログラムをインストールして実行できます。

## スマートフォンでフォロワーアームを制御

https://huggingface.co/docs/lerobot/main/en/phone_teleop

### クラウドロボティクス研究開発：AWS を基盤とした ROS 2 デバイスと Isaac Sim の Lerobot シミュレーションおよびデータフロー

https://github.com/ti/ti.github.io/blob/95261efa4f8bdb4c8571920762318a532e58c7fd/%E5%BC%80%E5%8F%91/isaac/aws-ros2-isaac.md

### ブラウザ上でサーボIDと中央位置キャリブレーションを設定

https://bambot.org/feetech.js?lang=zh

1、サーボの型番に応じて0または1を入力し、「接続」をクリックします

![截图_20260413125622.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/1.png)

2、ID 1~6 のサーボをスキャンし、スキャン結果のFOUNDで対応するIDのサーボを確認できます。例えば、画像ではサーボ ID 1 がスキャンされています

![截图_20260413125712.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/2.png)

3、ID設定と中央位置キャリブレーション

①現在のサーボIDは、スキャンで検出されたサーボIDを入力します

②「ID管理」に数字を入力し、「ID変更」をクリックするとIDを設定できます

③中央位置キャリブレーション（STS3215サーボの中央位置は2047、SCS0009サーボの中央位置は511）

STSサーボ：「位置制御」に2047を入力し、「Set」をクリックします

SCSサーボ：「位置制御」に511を入力し、「Set」をクリックします

![截图_20260413125748.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/3.png)

<RelatedProducts slugs="so-arm101" />
