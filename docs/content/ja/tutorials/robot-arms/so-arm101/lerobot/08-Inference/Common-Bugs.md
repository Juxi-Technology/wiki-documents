---
title: "ステップ8:よくあるBugと解決方法"
description: "デプロイ時に起こりやすいカメラ取得の失敗やサーボ通信エラーの原因と、再試行回数の変更や再キャリブレーションといった対処をまとめています。"
---

# ステップ8:よくあるBugと解決方法

## カメラの取得に失敗する

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/1.png)

手首カメラの配線が緩んでいないか確認してください。特にカメラに近い側の配線は非常に接触不良を起こしやすいです

## カメラが切断される

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/2.png)

コマンドラインを再起動してください

## サーボ通信の問題1

ConnectionError: Failed to sync read 'Present_Position' on ids=[1, 2, 3, 4, 5, 6] after 1 tries. [TxRxResult] There is no status packet!

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/3.png)

解決方法：`lerobot/src/lerobot/motors/motors_bus.py` のコード内のすべての `num_retry` を99に変更します。特にエラー行に対応するものです

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/4.png)

## サーボ通信の問題2

ConnectionError: Failed to write 'Torque_Enable' on id_=1 with '0' after 6 tries. [TxRxResult] There is no status packet!

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/5.png)

![53823bc8797beb0cd2899d6c65ee9f63.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/6.png)

解決方法：ロボットアームを再キャリブレーションする

<RelatedProducts slugs="so-arm101" />
