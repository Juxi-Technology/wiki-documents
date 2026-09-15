---
title: "Jetson CSI 攝像頭配置"
description: "按方向鍵下選擇Configure Jetson 24pin CSI Connector。然後按Enter進入下一個選項"
---

# Jetson CSI 攝像頭配置

## 1、配置CSI攝像頭引腳

```Plain Text
sudo /opt/nvidia/jetson-io/jetson-io.py
```

![圖 1](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/1.png)

按方向鍵下選擇**Configure Jetson 24pin CSI Connector**。然後按Enter進入下一個選項

![圖 2](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/2.png)

選擇**Configure for compatible hardware** ，然後按Enter。

![圖 3](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/3.png)

按方向鍵下選擇**Camera IMX219 Dual**，然後按Enter。

如果後面重啟之後執行預覽攝像頭畫面是報錯或黑屏，這裡改為Camera IMX219-C

![圖 4](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/4.png)

選擇**Save pin changes** ，然後按Enter。

![圖 5](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/5.png)

按方向鍵下選擇**Save and reboot to reconfigure pins**，然後按Enter。

![圖 6](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/6.png)

出現以下介面直接按Enter鍵，主機板會重新啟動。

![圖 7](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/7.jpg)

## 2、查看video裝置

```Plain Text
ls /dev/video*
```

圖片的結果是接了兩個CSI攝像頭的結果：一般一個CSI攝像頭顯示一個`video`裝置

![圖 8](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/8.png)

## 3、預覽攝像頭畫面

終端輸入下面命令，系統會自動彈出攝像頭畫面視窗：預設打開`/dev/video0`裝置

```Plain Text
nvgstcapture-1.0
```

![圖 9](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/9.png)

### 3.1、指定攝像頭

若有多個攝像頭，可以指定攝像頭ID：

```Plain Text
nvgstcapture-1.0 --sensor-id=1
```

![圖 10](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/10.png)

### 3.2、指定預覽解像度

若只有一個CSI攝像頭，可將`--sensor-id=1`改成`--sensor-id=0`：

```Plain Text
nvgstcapture-1.0 --sensor-id=1 --cus-prev-res=1280x720
```

![圖 11](../../../../../public/images/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup/11.png)

<RelatedProducts slugs="imx219-csi-camera" />
