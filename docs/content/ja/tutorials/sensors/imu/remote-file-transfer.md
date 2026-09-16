---
title: "ファイルリモート転送"
description: "MobaXtermは強力なリモートツールであり、SHH、VNC、FTPなどのリモートツールを統合しています。"
---

# ファイルリモート転送

## 1. MobaXterm

MobaXtermは強力なリモートツールであり、SHH、VNC、FTPなどのリモートツールを統合しています。

## 2. MobaXtermのインストール

公式サイト：[https://mobaxterm.mobatek.net/](https://mobaxterm.mobatek.net/)

![図 1](../../../../../public/images/tutorials/sensors/imu/remote-file-transfer/1.png)

### 2.1. MobaXtermのダウンロード

無料版を選択してダウンロード：

![図 2](../../../../../public/images/tutorials/sensors/imu/remote-file-transfer/2.png)

インストール版を選択してダウンロード：

![図 3](../../../../../public/images/tutorials/sensors/imu/remote-file-transfer/3.png)

### 2.2. MobaXtermのインストール

公式サイトからダウンロードした圧縮ファイルを解凍し、`MobaXterm_installer_24.4.msi`ファイルを開いてインストールします：

![図 4](../../../../../public/images/tutorials/sensors/imu/remote-file-transfer/4.png)

契約に同意：

![図 5](../../../../../public/images/tutorials/sensors/imu/remote-file-transfer/5.png)

ソフトのインストール場所を選択：デフォルトの場所を推奨

![図 6](../../../../../public/images/tutorials/sensors/imu/remote-file-transfer/6.png)

本インストール：

![図 7](../../../../../public/images/tutorials/sensors/imu/remote-file-transfer/7.png)

![図 8](../../../../../public/images/tutorials/sensors/imu/remote-file-transfer/8.png)

インストール完了：

![図 9](../../../../../public/images/tutorials/sensors/imu/remote-file-transfer/9.png)

## 3. MobaXtermの使用

デスクトップで`MobaXterm`アイコンを見つけて開きます：

![図 10](../../../../../public/images/tutorials/sensors/imu/remote-file-transfer/10.png)

## 4. MobaXterm：SSHリモート

`Session` → `SSH` を選択：リモートデバイスのIPとユーザー名を入力します

例：

Jetsonボードのデフォルト情報：

ユーザー名：juxi

パスワード：juxi

注意：MobaXtermでSSHリモートを使用すると、サイドバーで自動的にSFTPリモートログインが使用されます

![図 11](../../../../../public/images/tutorials/sensors/imu/remote-file-transfer/11.png)

![図 12](../../../../../public/images/tutorials/sensors/imu/remote-file-transfer/12.png)

