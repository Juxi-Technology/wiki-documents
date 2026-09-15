---
title: "Jupyter Lab の使用"
description: "以下のコマンドでJupyter Labをインストールします：Jupyter Labのインストール時にダウンロード速度が遅い場合は、指定ソースを使用してインストールできます"
---

# Jupyter Lab の使用

## 1、Jupyter Labのインストール

### 1.1、Jupyter Lab

以下のコマンドでJupyter Labをインストールします：Jupyter Labのインストール時にダウンロード速度が遅い場合は、指定ソースを使用してインストールできます

```Plain Text
sudo apt update
sudo apt install python3-pip -y
sudo pip3 install --upgrade pip
```

```Plain Text
sudo pip3 install jupyterlab
# 清華ミラー：pip3 install jupyterlab -i https://pypi.tuna.tsinghua.edu.cn/simple
# Alibaba Cloudミラー：sudo pip3 install jupyterlab -i https://mirrors.aliyun.com/pypi/simple/
```

![図 1](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/1.png)

![図 2](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/2.png)

![図 3](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/3.png)

![図 4](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/4.png)

### 1.2、Node.js

以下のコマンドで最新のNode.jsをインストールします：

```Plain Text
sudo apt install curl -y
sudo curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install nodejs -y
```

![図 5](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/5.png)

バージョンを確認します：

```Plain Text
node -v && npm -v
```

![図 6](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/6.png)

## 2、Jupyter Labの起動

Jupyter Labを起動する前にシステムのデフォルトブラウザを設定する必要があります。そうしないと、ターミナル起動時にいくつかメッセージが表示されます。

### 2.1、デフォルトブラウザの設定

システムのChromiumブラウザを開き、デフォルトブラウザの設定を選択します：

![図 7](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/7.png)

![図 8](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/8.png)

### 2.2、Jupyter Labの起動

```Plain Text
jupyter lab
# ブラウザなしで起動 jupyter lab --no-browser
# 管理者権限で起動 sudo jupyter lab --allow-root
```

![図 9](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/9.png)

![図 10](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/10.png)

### 2.3、ホストマシンからのアクセス

ホストマシンとはJetsonメインボードシステムからのアクセスを指し、直接[http://localhost:8888/](http://localhost:8888/)からアクセスします：

`http://localhost:8888/`

![図 11](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/11.png)

## 3、Jupyter Labの設定

Jupyter Labに対してLAN内アクセス、アクセスパスワード、起動時自動起動などの設定を行います。

### 3.1、LAN内アクセス

同じLAN内にあるデバイスがブラウザでIP:8888を入力してアクセスできるように設定します！

**注意：キャンパスネットワークのLANでは一般的にアクセスできません。ノートパソコン/スマートフォンのテザリングに切り替えてテストできます**

例えばメインボードのIP：192.168.0.105；同じLAN内のブラウザで192.168.0.105:8888を入力すると、メインボードのJupyter Labにアクセスできます

#### 3.1.1、設定ファイルの作成

```Plain Text
sudo jupyter lab --generate-config
```

自動生成される設定ファイルの場所：Writing default config to: /root/.jupyter/jupyter_lab_config.py

#### 3.1.2、設定ファイルの変更

```Plain Text
sudo gedit /root/.jupyter/jupyter_lab_config.py
```

変更内容：変更後、保存をクリックしてファイルを閉じます。

コードの前に \# 記号があるかどうかに注意し、設定が有効になるようにしてください

```Plain Text
# 任意のオリジンからのリクエストによるJupyter Labサーバーへのアクセスを許可
c.ServerApp.allow_origin = '*'
# 0.0.0.0は利用可能なすべてのネットワークインターフェースにバインドし、任意のアドレスからのアクセスを許可することを表します
c.ServerApp.ip = '0.0.0.0'
# rootユーザーとしてJupyter Labサーバーを起動することを許可
c.ServerApp.allow_root = True
# デフォルトポートを変更し、競合を回避
c.ServerApp.port = 8888
```

![図 12](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/12.png)

### 3.2、アクセスパスワードの設定

ターミナルでパスワード設定のコマンドを入力します。2回入力する必要があり、パスワード入力時は入力内容が表示されません\!

```Plain Text
sudo jupyter lab password
```

自動生成される設定ファイルの場所：[JupyterPasswordApp] Wrote hashed password to /root/.jupyter/jupyter_server_config.json

![図 13](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/13.png)

### 3.3、起動時自動起動サービス

#### 3.3.1、サービスファイルの編集

```Plain Text
sudo gedit /etc/systemd/system/jupyterlab.service
```

追加内容：追加後、保存をクリックしてファイルを閉じます

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

root：システムのユーザー名

ExecStart：Jupyter Labを起動するコマンドで、JupyterLabのインストールパスに変更します

config：JupyterLabの設定ファイルパスに変更します

WorkingDirectory：Jupyter-labを起動して開く作業ディレクトリで、自由に変更できます（ユーザーディレクトリに変更することを推奨します）

`Jupyter-labのインストールパスを確認：which jupyter-lab`

`設定ファイルパス：上記で生成された設定ファイルのパスを参照`

![図 14](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/14.png)

#### 3.3.2、自動起動サービスの設定

##### 起動時自動起動サービス

```Plain Text
sudo systemctl enable jupyterlab
# 起動時自動起動を無効化 systemctl disable jupyterlab
```

##### **サービスの起動**

```Plain Text
sudo systemctl start jupyterlab
# サービスを停止 sudo systemctl stop jupyterlab
```

##### **サービスの状態確認**

```Plain Text
systemctl status jupyterlab
```

![図 15](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/15.png)

##### 起動時自動起動の検証

システムを再起動した後、システムIPに基づき、同じLAN内のデバイスでメインボードIP:8888にアクセスします。

> 初回アクセス時はパスワードの入力が必要です。パスワードは前の手順で設定した情報です；
> 
> スクリーンショット時のメインボードのIPは192.168.0.105なので、同じLAN内のデバイスで192.168.0.105:8888にアクセスできます
> 
> 

![図 16](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/16.png)

## 4、Jupyter Labの使用

### 4.1、カーネル

プログラムを実行するたび、またはプログラムに異常が発生した際は、カーネルを再起動し、すべてのセルの出力情報をクリアすることを推奨します：

![図 17](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/17.png)

### 4.2、プログラムの実行

Jupyter Labで実行したいプログラムファイルを開き、上から下へ順にセルを実行します：

#### 4.2.1、実行中

セルの左上に[\*]が表示されている場合は実行中を表します：

![図 18](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/18.png)

#### 4.2.2、実行完了

セルの左上に[数字]が表示されている場合は実行の順序回数を表します：例えば[1] → プログラムが最初にそのセルのコードを実行したことを意味します

![図 19](../../../../../public/images/tutorials/accessories/csi-camera/03-JupyterLab/19.png)

<RelatedProducts slugs="imx219-csi-camera" />
