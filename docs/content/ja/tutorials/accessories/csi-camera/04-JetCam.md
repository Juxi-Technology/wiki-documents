---
title: "JetCam の使用"
description: "Jetson 向けカメラライブラリ JetCam の使い方。インストールから CSI カメラの映像取得と表示までを解説します。"
---

# JetCam の使用

JetCamの使用

1、JetCamのインストール

2、JetCamの使用

2.1、CSIカメラ

主要コードの解説

カメラの呼び出し

カメラ映像の取得

2.1.1、単一カメラ

2.1.2、複数カメラ

2.2、USBカメラ

参考資料



JetCam は NVIDIA が Jetson プラットフォーム向けに開発した使いやすい Python ライブラリで、USB カメラや CSI カメラの統合と操作に使用されます

## 1、JetCamのインストール

```Plain Text
git clone https://github.com/NVIDIA-AI-IOT/jetcam
cd jetcam
sudo python3 setup.py install
sudo pip3 install ipywidgets
```

## 2、JetCamの使用

JetCamは典型的なサンプルプログラムを提供し、ユーザーにCSIカメラとUSBカメラの呼び出しをデモンストレーションします。

サンプルはJupyter Labで実行する必要があります。当社の出荷イメージシステムを使用している場合、メインボードIP:8888から直接アクセスできます！

### 2.1、CSIカメラ

Jupyter LabのWeb画面でCSIカメラが格納されているフォルダに移動し、対応するフォルダを開きます：

`/home/jetson/jetcam/notebooks/csi_camera`

**注意：Jupyter Labにあまり慣れていない方は、Jupyter Lab使用チュートリアルを見て基本操作を確認できます！**

#### 主要コードの解説

##### カメラの呼び出し

width：画像出力の幅

height：画像出力の高さ

`from jetcam.csi_camera import CSICamera`

`camera = CSICamera(width=224, height=224)`

##### カメラ映像の取得

`image = camera.read()`

#### 2.1.1、単一カメラ

> **ソースコードのパス**
> 
> 

`/home/jetson/jetcam/notebooks/csi_camera/csi_camera.ipynb`

> **実行結果**
> 
> 

プログラムファイルを開いた後、個々のセルを上から下へ順に実行します：

![図 1](../../../../../public/images/tutorials/accessories/csi-camera/04-JetCam/1.png)

#### 2.1.2、複数カメラ

> **ソースコードのパス**
> 
> 

`/home/jetson/jetcam/notebooks/csi_camera/multi_csi_camera.ipynb`

> **実行結果**
> 
> 

プログラムファイルを開いた後、個々のセルを上から下へ順に実行します：

![図 2](../../../../../public/images/tutorials/accessories/csi-camera/04-JetCam/2.png)

### 2.2、USBカメラ

Jupyter LabでUSBカメラが格納されているフォルダに移動し、ファイルを開きます。出荷イメージシステムのフォルダパス：

`/home/jetson/jetcam/notebooks/usb_camera`

![図 3](../../../../../public/images/tutorials/accessories/csi-camera/04-JetCam/3.png)

## 参考資料

[https://github.com/NVIDIA-AI-IOT/jetcam](https://github.com/NVIDIA-AI-IOT/jetcam)

<RelatedProducts slugs="imx219-csi-camera" />
