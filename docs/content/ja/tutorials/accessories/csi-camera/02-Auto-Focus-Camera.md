---
title: "02、オートフォーカスカメラの使用"
description: "図の結果はCSIカメラ2つ、USBカメラ1つを接続した結果です：一般的に1つのCSIカメラにつき1つのvideoデバイスが表示され、1つのUSBカメラにつき2つのvideoデバイスが表示されます。USBカメラは新しく追…"
---

# 02、オートフォーカスカメラの使用

## 1、videoデバイスの確認

```Plain Text
ls /dev/video*
```

図の結果はCSIカメラ2つ、USBカメラ1つを接続した結果です：一般的に1つのCSIカメラにつき1つの`video`デバイスが表示され、1つのUSBカメラにつき2つの`video`デバイスが表示されます。USBカメラは新しく追加された、番号が小さい`/dev/video2`を選択して呼び出します（USBカメラを接続するとシステムに`/dev/video2`、`/dev/video3`のデバイス番号が新規追加されます）

![図 1](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/1.png)

## 2、GUVCView

GUVCViewはLinuxシステム用のオープンソースソフトウェアで、ビデオや画像のキャプチャと録画に使用され、主にWebcamカメラに用いられます。

### 2.1、GUVCViewのインストール

```Plain Text
sudo apt update
sudo apt install guvcview -y
```

![図 2](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/2.png)

### 2.2、GUVCViewの使用

アプリケーションメニューバーで`guvcview`アイコンをクリックするか、ターミナルで起動コマンドを入力します：USBカメラを選択してください。CSIカメラはプレビュー画面がありません

```Plain Text
guvcview
```

![図 3](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/3.png)

![図 4](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/4.png)

## 3、VLC

VLC media playerは自由かつオープンソースのマルチメディアプレーヤーで、さまざまな音声・動画フォーマット、およびDVD、オーディオCD、VCDと各種ストリーミングプロトコルをサポートします。

### 3.1、VLCのインストール

```Plain Text
sudo apt update
sudo apt install vlc -y
```

![図 5](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/5.png)

### 3.2、VLCの使用

アプリケーションメニューバーで`VLC media player`アイコンをクリックするか、ターミナルで起動コマンドを入力します：USBカメラを選択してください。CSIカメラはプレビュー画面がありません

```Plain Text
vlc
```

![図 6](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/6.png)

![図 7](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/7.png)

USBカメラに対応するデバイス番号を選択します：

![図 8](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/8.png)

![図 9](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/9.png)



