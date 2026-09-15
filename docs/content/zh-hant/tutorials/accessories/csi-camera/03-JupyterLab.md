---
title: "Jupyter Lab 使用"
description: "使用下面命令安裝Jupyter Lab：若安裝Jupyter Lab下載速度較慢，可以使用 指定源 進行安裝"
---

# Jupyter Lab 使用

## 1、Jupyter Lab安裝

### 1.1、Jupyter Lab

使用下面命令安裝Jupyter Lab：若安裝Jupyter Lab下載速度較慢，可以使用 指定源 進行安裝

```Plain Text
sudo apt update
sudo apt install python3-pip -y
sudo pip3 install --upgrade pip
```

```Plain Text
sudo pip3 install jupyterlab
# 清華源：pip3 install jupyterlab -i https://pypi.tuna.tsinghua.edu.cn/simple
# 阿里雲源：sudo pip3 install jupyterlab -i https://mirrors.aliyun.com/pypi/simple/
```

![圖 1](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/1.png)

![圖 2](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/2.png)

![圖 3](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/3.png)

![圖 4](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/4.png)

### 1.2、Node.js

使用下面命令安裝最新的Node.js：

```Plain Text
sudo apt install curl -y
sudo curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install nodejs -y
```

![圖 5](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/5.png)

驗證版本：

```Plain Text
node -v && npm -v
```

![圖 6](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/6.png)

## 2、Jupyter Lab啟動

啟動Jupyter Lab前需要設定系統預設瀏覽器，不然啟動終端會出現一些提示。

### 2.1、設定預設瀏覽器

打開系統Chromium瀏覽器選擇設定預設瀏覽器：

![圖 7](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/7.png)

![圖 8](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/8.png)

### 2.2、啟動Jupyter Lab

```Plain Text
jupyter lab
# 無瀏覽器啟動 jupyter lab --no-browser
# 以管理員身分啟動 sudo jupyter lab --allow-root
```

![圖 9](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/9.png)

![圖 10](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/10.png)

### 2.3、宿主機存取

宿主機指Jetson主機板系統存取，直接透過[http://localhost:8888/](http://localhost:8888/)存取：

`http://localhost:8888/`

![圖 11](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/11.png)

## 3、Jupyter Lab配置

對Jupyter Lab配置區域網絡存取、存取密碼、開機自動啟動等操作。

### 3.1、區域網絡存取

設定處於同一區域網絡的裝置可以在瀏覽器輸入IP:8888，進行存取！

**注意：校園網的區域網絡一般無法存取，可以更換筆記本/手機熱點測試**

例如主機板IP：192.168.0.105；我們可以透過同一區域網絡下的瀏覽器輸入192.168.0.105:8888進行主機板的Jupyter Lab

#### 3.1.1、建立設定檔

```Plain Text
sudo jupyter lab --generate-config
```

自動產生的設定檔位置：Writing default config to: /root/.jupyter/jupyter_lab_config.py

#### 3.1.2、修改設定檔

```Plain Text
sudo gedit /root/.jupyter/jupyter_lab_config.py
```

修改內容：修改後點擊儲存並關閉檔案。

注意代碼前有無 \# 號，確保配置生效

```Plain Text
# 允許任何來源的請求存取Jupyter Lab伺服器
c.ServerApp.allow_origin = '*'
# 0.0.0.0表示綁定所有可用的網絡介面，允許從任何地址存取
c.ServerApp.ip = '0.0.0.0'
# 允許以root使用者身分啟動Jupyter Lab伺服器
c.ServerApp.allow_root = True
# 修改預設連接埠，避免衝突
c.ServerApp.port = 8888
```

![圖 12](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/12.png)

### 3.2、配置存取密碼

終端輸入設定密碼的命令，需要輸入兩次，輸入密碼不會顯示輸入的內容\!

```Plain Text
sudo jupyter lab password
```

自動產生的設定檔位置：[JupyterPasswordApp] Wrote hashed password to /root/.jupyter/jupyter_server_config.json

![圖 13](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/13.png)

### 3.3、開機自動啟動服務

#### 3.3.1、編輯服務檔案

```Plain Text
sudo gedit /etc/systemd/system/jupyterlab.service
```

新增內容：新增後點擊儲存並關閉檔案

```Plain Text
[Unit]
Description=jupyterlab
After=network.target
[Service]
Type=simple
ExecStart=/usr/local/bin/jupyter-lab
config=/root/.jupyter/jupyter_lab_config.py --no-browser
User=root
Group=root
WorkingDirectory=/home/jetson/
Restart=always
RestartSec=10
[Install]
WantedBy=multi-user.target
```

root：系統的使用者名稱

ExecStart：啟動Jupyter lab的命令，修改成JupyterLab的安裝路徑

config：修改成JupyterLab的設定檔路徑

WorkingDirectory：啟動Jupyter-lab打開的工作目錄，可自行更改（推薦修改成使用者目錄）

`查看Jupyter-lab安裝路徑：which jupyter-lab`

`設定檔路徑：參考上面產生設定檔的路徑`

![圖 14](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/14.png)

#### 3.3.2、設定自動啟動服務

##### 開機自動啟動服務

```Plain Text
sudo systemctl enable jupyterlab
# 關閉開機自動啟動 systemctl disable jupyterlab
```

##### **啟動服務**

```Plain Text
sudo systemctl start jupyterlab
# 停止服務 sudo systemctl stop jupyterlab
```

##### **查看服務狀態**

```Plain Text
systemctl status jupyterlab
```

![圖 15](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/15.png)

##### 驗證開機自動啟動

重啟系統後，根據系統IP，使用同一區域網絡的裝置存取主機板IP:8888。

> 首次存取需要輸入密碼，密碼是前面步驟設定的資訊；
> 
> 截圖時主機板的IP是192.168.0.105，所以同一區域網絡下的裝置可以存取192.168.0.105:8888
> 
> 

![圖 16](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/16.png)

## 4、Jupyter Lab使用

### 4.1、核心

建議每次執行程式或者程式異常時，重啟核心和清除所有儲存格輸出資訊：

![圖 17](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/17.png)

### 4.2、執行程式

透過Jupyter Lab打開需要執行的程式檔案，執行程式從上往下依次執行儲存格：

#### 4.2.1、正在執行

儲存格左上方顯示[\*]代表正在執行：

![圖 18](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/18.png)

#### 4.2.2、執行完成

儲存格左上方顯示[數字]代表執行的順序次數：例如[1] → 程式在第一次執行了該儲存格代碼

![圖 19](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/19.png)

<RelatedProducts slugs="imx219-csi-camera" />
