---
title: "SSHファイル転送"
description: "IMU モジュールの SSH ファイル転送チュートリアル:リモートログインソフトをインストールし、SSH で開発ボードに接続してファイルを転送します。"
---

# SSHファイル転送

## 1. WInSCPプログラムのインストール

リモートログインソフト.zip

ダウンロードして解凍し、ダブルクリックでプログラムを開いてインストールを開始し、Acceptをクリックして契約に同意し、あとはプロンプトに従ってインストールするだけです。

![図 1](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/1.png)

![図 2](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/2.png)

![図 3](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/3.png)

Finishをクリックしてインストールを完了します。

![図 4](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/4.png)

デスクトップにWinSCPのアイコンが1つ増えているのが確認できます

![図 5](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/5.png)

## 2. SSHリモートファイル転送

WinSCPソフトを開くと、以下のログイン画面が表示されます。

File protocol：ファイルプロトコルはSFTPを選択、Host name：IPアドレス、Port number：デフォルトの22で問題ありません、User name：ユーザー名、Password：ログインパスワード。

正しい情報を入力した後、Saveをクリックして入力した情報を保存でき、次回ログイン時に再入力する必要がありません。

![図 6](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/6.png)

Loginをクリックしてログインに成功すると、以下の画面が表示されます。左側はwinパソコンのフォルダ、右側はnanoのフォルダです。

![図 7](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/7.png)

ファイル転送には3つの操作方法があります。1つ目は、ファイルを左側から右側へ、または右側から左側へ直接ドラッグする方法で、システムが自動的にファイルをコピーして転送します。

2つ目は、マウスでファイルを選択し、F5キーを押すと、選択されたファイルがもう一方にコピーされます。

3つ目は、ファイルを選択してマウスを右クリックし、winパソコンからnanoに転送する場合はuploadをクリックします、

![図 8](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/8.png)

プロンプトが表示されるので、今後表示しないを選択し、OKをクリックすると、ファイルが自動的に転送されます。

![図 9](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/9.png)

nanoからwinパソコンにファイルを転送する場合は、マウスを右クリックしてファイルを選択し、Downloadを選択します

![図 10](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/10.png)

注意：ファイル転送には、パソコンとボードが同じローカルエリアネットワーク上にあり、Raspberry PiのSSHサービスが有効になっている必要があります。ファイル転送が失敗する場合は、通常ボード側の権限が不足しているため、最高権限を付与するだけで解決します。

```Plain Text
chmod 777 目录名 
```



