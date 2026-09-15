---
title: "Jetson CSI カメラ設定"
description: "方向キーで下を押してConfigure Jetson 24pin CSI Connectorを選択します。その後Enterを押して次のオプションに進みます"
---

# Jetson CSI カメラ設定

## 1、CSIカメラピンの設定

```Plain Text
sudo /opt/nvidia/jetson-io/jetson-io.py
```

![図 1](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/1.png)

方向キーで下を押して**Configure Jetson 24pin CSI Connector**を選択します。その後Enterを押して次のオプションに進みます

![図 2](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/2.png)

**Configure for compatible hardware** を選択し、その後Enterを押します。

![図 3](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/3.png)

方向キーで下を押して**Camera IMX219 Dual**を選択し、その後Enterを押します。

後で再起動した後にカメラプレビュー画面を実行してエラーや黒画面になる場合は、ここをCamera IMX219-Cに変更します

![図 4](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/4.png)

**Save pin changes** を選択し、その後Enterを押します。

![図 5](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/5.png)

方向キーで下を押して**Save and reboot to reconfigure pins**を選択し、その後Enterを押します。

![図 6](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/6.png)

以下の画面が表示されたらそのままEnterキーを押すと、メインボードが再起動します。

![図 7](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/7.jpg)

## 2、videoデバイスの確認

```Plain Text
ls /dev/video*
```

図の結果はCSIカメラを2つ接続した結果です：一般的に1つのCSIカメラにつき1つの`video`デバイスが表示されます

![図 8](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/8.png)

## 3、カメラ映像のプレビュー

ターミナルで以下のコマンドを入力すると、システムが自動的にカメラ画面のウィンドウをポップアップ表示します：デフォルトでは`/dev/video0`デバイスを開きます

```Plain Text
nvgstcapture-1.0
```

![図 9](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/9.png)

### 3.1、カメラの指定

カメラが複数ある場合は、カメラIDを指定できます：

```Plain Text
nvgstcapture-1.0 --sensor-id=1
```

![図 10](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/10.png)

### 3.2、プレビュー解像度の指定

CSIカメラが1つだけの場合、`--sensor-id=1`を`--sensor-id=0`に変更できます：

```Plain Text
nvgstcapture-1.0 --sensor-id=1 --cus-prev-res=1280x720
```

![図 11](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/11.png)

<RelatedProducts slugs="imx219-csi-camera" />
