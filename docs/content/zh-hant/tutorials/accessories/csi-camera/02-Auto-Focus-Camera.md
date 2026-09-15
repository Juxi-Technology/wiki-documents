---
title: "自動對焦攝像頭使用"
description: "圖片的結果是接了兩個CSI攝像頭、一個USB攝像頭的結果：一般一個CSI攝像頭顯示一個video裝置，一個USB攝像頭顯示兩個video裝置，USB攝像頭選擇新增加且數字較小的/dev/video2呼叫（接上USB攝像…"
---

# 自動對焦攝像頭使用

## 1、查看video裝置

```Plain Text
ls /dev/video*
```

圖片的結果是接了兩個CSI攝像頭、一個USB攝像頭的結果：一般一個CSI攝像頭顯示一個`video`裝置，一個USB攝像頭顯示兩個`video`裝置，USB攝像頭選擇新增加且數字較小的`/dev/video2`呼叫（接上USB攝像頭系統新增`/dev/video2`、`/dev/video3`裝置號）

![圖 1](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/1.png)

## 2、GUVCView

GUVCView是一個用於Linux系統的開源軟件，用於捕捉和錄製影片和圖像，主要用於Webcam攝像頭。

### 2.1、GUVCView安裝

```Plain Text
sudo apt update
sudo apt install guvcview -y
```

![圖 2](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/2.png)

### 2.2、GUVCView使用

進入應用選單欄點擊`guvcview`圖示或者終端輸入啟動命令：選擇USB攝像頭，CSI攝像頭無預覽畫面

```Plain Text
guvcview
```

![圖 3](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/3.png)

![圖 4](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/4.png)

## 3、VLC

VLC media player是一個自由且開源的多媒體播放器，支援多種音訊和影片格式以及DVD、音訊CD、VCD和各種串流媒體協定。

### 3.1、VLC安裝

```Plain Text
sudo apt update
sudo apt install vlc -y
```

![圖 5](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/5.png)

### 3.2、VLC使用

進入應用選單欄點擊`VLC media player`圖示或者終端輸入啟動命令：選擇USB攝像頭，CSI攝像頭無預覽畫面

```Plain Text
vlc
```

![圖 6](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/6.png)

![圖 7](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/7.png)

選擇USB攝像頭對應的裝置號：

![圖 8](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/8.png)

![圖 9](../../../../../public/images/tutorials/accessories/csi-camera/02-Auto-Focus-Camera/9.png)

<RelatedProducts slugs="usb-auto-focus-camera" />
