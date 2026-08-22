---
title: USBドライバ不要サウンドカードチュートリアル
description: "JUXI USBドライバ不要サウンドカードのチュートリアル。可視化テストソフト、コマンド操作、オーディオ調整方法を網羅。Raspberry Pi、Jetson、PC などに対応。"
---

# USBドライバ不要サウンドカードチュートリアル

# 可視化テストソフトウェア(Windows)

[audio_tools.7z](https://juxitech.feishu.cn/wiki/Wuc3wAppNi5elfkSI6VccrNDnfE)

**コマンドまとめ(読み飛ばし可)

- システム更新とツールのインストール:

    - 実行: `sudo apt update && sudo apt full-upgrade`

    - ALSA のインストール: `sudo apt install alsa-base alsa-utils`

- ハードウェアの識別:

    - オーディオデバイスの一覧: `aplay -l`

    - PCI/USB オーディオデバイスの確認: `lspci | grep -i audio`、`lsusb`

- 基本設定と検証:

    - 設定ウィザードの実行: `sudo alsaconf`(利用可能な場合)

    - 音量調整: `alsamixer`(**M** でミュート解除、矢印キーで音量調整、ESC で終了)

    - 設定の保存: `sudo alsactl store`

    - 再生テスト: オーディオ出力のテスト(スピーカー/ヘッドホンを接続):

```Bash
# テスト音を再生。-D で USBサウンドカードを指定(X は aplay -l の card 番号)
speaker-test -c 2 -D plughw:X,0
```

- オーディオサービスの再起動: `sudo systemctl restart alsa`(環境によっては再起動が必要: `sudo reboot`)

# Jetsonシリーズ主控&Ubuntuシステム&Raspberry Pi

## コマンドラインによるデバッグ

### 一、USBサウンドカードの接続

1. USBサウンドカードを挿す前に、`lsusb` コマンドでUSBデバイスを確認します:

![](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/1.png)

2. USBサウンドカードを挿してから、もう一度 `lsusb` を実行すると、増えているデバイスがUSBサウンドカードです:

![](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/10.png)

3. `arecord -l` で全ての録音デバイスを一覧表示できます。USBサウンドカードデバイスが確認できます:

![](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/2.png)

4. `aplay -l` で全ての再生デバイスを一覧表示できます:

![](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/3.png)

### 二、USBサウンドカードの使用

`arecord -l` で、例えば UACDemoV1.0 と表示されるのが私たちのサウンドカードです。card 0; device 0 なら、コマンドでは plughw:0,0 に変更して録音デバイスを指定します:

![](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/4.png)

Linux 付属の録音コマンドで、5秒間の音声を録音してテストします:

`arecord -D plughw:0,0 -f S16_LE -r 16000 -d 5 -t wav test.wav`

ここで `plughw:0,0` は `card 0, device 0`、つまり私たちのUSBサウンドカードを表します。実際の値は `arecord -l` で確認し、端末番号に応じて変更してください。UACDemoV1.0 が card 1; device 1 と表示される場合は、コマンド内の `plughw:0,0` を `plughw:1,1` に変更します。 `plughw` は自動フォーマット変換を行い、異なるデータフォーマットとハードウェアの間をブリッジします。arecord のその他のパラメータは以下の通りです:

|コマンド|意味|本コマンドでの意味|
|---|---|---|
|-D|デバイス名の選択|外付けUSBサウンドカード"plughw:1.0"を使用|
|-f|録音フォーマット|S16_LE は符号付き16ビット・リトルエンディアン|
|-r|サンプルレート|16000 は 16KHz サンプリング|
|-d|録音時間|5秒間録音|
|-t|録音フォーマット|wavフォーマット|
|test.wav|ファイル名(パス可)|ファイル名は test.wav|

音が小さい場合は `alsamixer` コマンドで音量を調整します。`F6` を押してUSBサウンドカードを選択:

![](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/5.png)

次に `F5` を押して録音デバイスと再生デバイスの両方を表示します。録音音量は上矢印キーで上げます。PCM は再生、CAPTURE MIC は録音です:

![](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/6.png)

続いて `aplay` コマンドで再生します:

`aplay -D plughw:0,0 -f S16_LE -r 16000 -c 1 test.wav`

パラメータの説明:

- -D plughw:0,0：録音デバイスを指定。plughw:0,0 は1つ目のサウンドカードの1つ目のデバイスを使用。

- -f S16_LE：オーディオファイルフォーマットを設定。S16_LE は符号付き16ビット・リトルエンディアン(Signed 16-bit Little Endian)で、一般的なオーディオデータフォーマット。"リトルエンディアン"とはデータの下位バイトがメモリの低アドレス側に格納されることを指します。

- -r 16000：サンプルレートを設定。

- -c 1：チャンネル数を設定。

- -d 5：録音時間(秒)を設定。

## PulseAudio 可視化ウィンドウでの表示

![](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/7.png)

PulseAudio を[コマンドライン](https://so.csdn.net/so/search?q=%E5%91%BD%E4%BB%A4%E8%A1%8C&spm=1001.2101.3001.7020)で確認:

`pactl list sources short`            # 現在の PulseAudio オーディオサーバーで利用可能な全てのオーディオソースを一覧表示

![](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/8.png)

> 49 はソースインデックスを表します
>
> Alsa _input.usb はUSB入力デバイス、つまりマイクであることを表します
>
> s16le は符号付き16ビット・リトルエンディアン(Signed 16-bit Little Endian)のオーディオサンプリングフォーマットを表します。
>
> 1ch はモノラルを表します。
>
> 48000Hz はサンプルレートで、毎秒48000回サンプリングすることを表します
>
> SUSPENDED は現在のマイクがサスペンド状態であることを表します
>
> RUNNING はマイクが使用中であることを表します

## pythonからUSBドライバ不要サウンドカードを呼び出す

コード例はご自身で検索してください。例: "[Python调用USB免驱声卡](https://blog.csdn.net/weixin_44463519/article/details/157463731?spm=1001.2101.3001.6650.3&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EYuanLiJiHua%7ECtr-3-157463731-blog-105694458.235%5Ev43%5Epc_blog_bottom_relevance_base9&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EYuanLiJiHua%7ECtr-3-157463731-blog-105694458.235%5Ev43%5Epc_blog_bottom_relevance_base9&utm_relevant_index=4)"

## 問題まとめ

### Jetson

1. デバイス使用中の問題

![](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/9.png)

設定ページを閉じて、コマンドを再実行します

それでもダメな場合は、挿し直すか再起動します

オーディオデバイスを占有しているプロセスを確認:

`sudo lsof /dev/snd/*`

サウンドカードを挿す前:

![](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/1.png)

サウンドカードを挿した後:

![](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/10.png)

プロセスを終了 `kill -9 PID`、PID はサウンドカード挿入後に現れたPIDです。スクリーンショットでは 33739 です

その後、録音・再生をやり直します

### Raspberry Pi

1.ノイズが多い問題

```Plain Text
まずマイク音量を100に設定
ターミナルを開く
$ sudo vi /boot/config.txt    #または /boot/firmware/config.txt の場合もあります
テキストの最後に追加
audio_pwm_mode = 2
ESCで:wqを入力して保存終了
その後再起動
$ reboot
```

2.再起動するたびに音量設定が初期化される

音量を設定し直した後、

現在の音量設定をシステムのデフォルト設定ファイルに保存する必要があります

以下のコマンドで現在の設定を永続化します:

```Bash
sudo chmod 664 /var/lib/alsa/asound.state
sudo alsactl store
```

### Ubuntu仮想マシン

1. 録音時にノイズが入る

解決方法：USBコントローラの互換性を3.0または3.1に変更

# RDK x3&x5

## デバイス番号の確認

サウンドカードが存在するか、デバイス番号を確認します。

`cat /proc/asound/cards` コマンドでサウンドカードが登録されているか確認:

```Shell
0 [duplexaudio    ]: simple-card - duplex-audio
                      duplex-audio
```

`cat /proc/asound/devices` コマンドで論理デバイスを確認:

```Shell
root@ubuntu:~# cat /proc/asound/devices
  2: [ 0- 0]: digital audio playback
  3: [ 0- 0]: digital audio capture
  4: [ 0]   : control
 33:        : timer
```

`ls /dev/snd/` コマンドでユーザー空間の実際のデバイスファイルを確認:

```Shell
root@ubuntu:~# ls /dev/snd/
by-path/   controlC0  pcmC0D0c   pcmC0D0p   timer
```

上記の確認により、サウンドカード0がオンボードサウンドカードであると確認できます。デバイスも存在し、デバイス番号は `0-0` です。実際に操作するデバイスは `pcmC0D0p` と `pcmC0D0c` です。

## 5秒間の音声を録音してテスト

`arecord -D plughw:0,0 -f S16_LE -r 16000 -d 5 -t wav test.wav`

ここで `plughw:0,0` は `card 0, device 0`、つまり私たちのUSBサウンドカードを表します。 `plughw` は自動フォーマット変換を行い、異なるデータフォーマットとハードウェアの間をブリッジします。arecord のその他のパラメータは以下の通りです:

|コマンド|意味|本コマンドでの意味|
|---|---|---|
|-D|デバイス名の選択|外付けUSBサウンドカード"plughw:1.0"を使用|
|-f|録音フォーマット|S16_LE は符号付き16ビット・リトルエンディアン|
|-r|サンプルレート|16000 は 16KHz サンプリング|
|-d|録音時間|5秒間録音|
|-t|録音フォーマット|wavフォーマット|
|test.wav|ファイル名(パス可)|ファイル名は test.wav|

音が小さい場合は `alsamixer` コマンドで音量を調整します。`F6` を押してUSBサウンドカードを選択:

![](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/2.png)

次に `F5` を押して録音デバイスと再生デバイスの両方を表示します。録音音量は上矢印キーで上げます。PCM は再生、CAPTURE MIC は録音です:

![](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/3.png)

続いて `aplay` コマンドで再生します:

`aplay -D plughw:0,0 -f S16_LE -r 16000 -c 1 test.wav`

パラメータの説明:

- -D plughw:0,0：録音デバイスを指定。plughw:0,0 は1つ目のサウンドカードの1つ目のデバイスを使用。

- -f S16_LE：オーディオファイルフォーマットを設定。S16_LE は符号付き16ビット・リトルエンディアン(Signed 16-bit Little Endian)で、一般的なオーディオデータフォーマット。"リトルエンディアン"とはデータの下位バイトがメモリの低アドレス側に格納されることを指します。

- -r 16000：サンプルレートを設定。

- -c 1：チャンネル数を設定。

- -d 5：録音時間(秒)を設定。

## よくある質問

### RDKボードでUSBサウンドカードとオンボードサウンドカードを区別するには?

### RDK X3 シリーズのオーディオサブボードとUSBサウンドカードを共存させて同時に使用するには?

### RDKS100 でグラフィカルインターフェースからオーディオ機能を使用するには?

[RDKマルチメディア処理と応用](https://developer.d-robotics.cc/rdk_doc/FAQ/multimedia#usb-%E5%A3%B0%E5%8D%A1%E5%92%8C%E6%9D%BF%E8%BD%BD%E5%A3%B0%E5%8D%A1%E5%A6%82%E4%BD%95%E5%8C%BA%E5%88%86%E4%BD%BF%E7%94%A8)を参照

# 基本的なオーディオドライバの確認

USBドライバ不要サウンドカードが使えるかどうかは、**カーネルが鍵**です

- USB Audio Class サポートが有効か(`CONFIG_USB_AUDIO`);

- 対応するカーネルモジュールがロードされているか(`snd-usb-audio`)

カーネルがサポートしていれば、基本的なオーディオツールを追加インストールするだけで正常に使用できます。カーネルがカットされている場合は、カーネルを再コンパイルしてドライバを有効にする必要があります。

**手順 1: カーネルが snd_usb_audio をサポートしているか確認**

```Plain Text
# 方法1： ドライバモジュールがロード済みか確認
lsmod | grep snd_usb_audio

# 方法2： カーネルにモジュールが組み込まれているか確認(未ロードでも)
modinfo snd_usb_audio  # 出力あり=カーネルがサポート; 出力なし=カーネルにこのモジュールが未コンパイル
```

**`modinfo` が出力を返さない場合**: システムカーネルがこのドライバをカットしているため、カーネルを再コンパイルし、`.config` で以下を有効にする必要があります:

```Plain Text
CONFIG_SND_USB_AUDIO=m  # モジュールとしてコンパイル、または=y でカーネルに組み込み
CONFIG_SND_USB_UA101=y
CONFIG_SND_USB_CAIAQ=y
```

**`modinfo` が出力を返す場合**: モジュールを直接ロード:

```Bash
sudo modprobe snd_usb_audio
```

#### 手順 2: 基本的なオーディオツールのインストール(最小構成版にはデフォルトで入っていない)

最小構成システムには通常 `alsa-utils` などのツールがなく、手動インストールが必要です:

```Bash
# Ubuntu/Debian システム
sudo apt update && sudo apt install -y alsa-utils usbutils

# ネットワークのない環境: alsa-utils のオフラインパッケージをダウンロードし、dpkg -i でインストール
```

#### 手順 3: USBサウンドカードの認識と機能の検証

1.USBサウンドカードを挿し、デバイス認識を確認:

```Bash
# USBデバイスの列挙を確認
lsusb | grep -i audio

# オーディオデバイス一覧を確認
aplay -l
```

出力に `USB Audio` 関連の `card X` エントリがあれば認識成功です。

2.オーディオ出力をテスト(スピーカー/ヘッドホンを接続):

```Bash
# テスト音を再生。-D で USBサウンドカードを指定(X は aplay -l の card 番号)
speaker-test -c 2 -D plughw:X,0
```

#### 手順 4: (任意)オーディオサービスのインストール(デスクトップ/バックグラウンド再生用)

バックグラウンドでオーディオ再生する場合、またはデスクトップ環境で使用する場合、最小構成版ではオーディオサービスの追加インストールが必要です:

```Bash
# 軽量サービス(推奨、デスクトップなしでも使用可)
sudo apt install -y pulseaudio

# または PipeWire (Ubuntu 22.04+ 推奨)
sudo apt install -y pipewire pipewire-alsa
```

### 最小構成システムのよくある問題と解決

**1.権限不足で一般ユーザーがサウンドカードにアクセスできない**

解決: ユーザーを `audio` グループに追加し、再起動後に有効:

```Bash
sudo usermod -aG audio $USER
```

2.**音が出ないが、デバイスは認識されている**

解決: `alsamixer` で音量を上げ、ミュートを解除(**M** キーでミュート解除):

```Bash
alsamixer -c X  # X は USBサウンドカードの card 番号
```

3.**カーネルバージョンが低く、新しいUSBサウンドカードに対応しない場合は以下の2ケース**

```Bash
sudo apt install -y linux-generic && sudo reboot
```

```Bash
sudo modprobe snd-hda-intel model=generic #(機種により異なる model 値を試す場合あり)
# サウンドカードドライバの設定ファイルを作成
sudo echo "options snd-hda-intel model=generic" > /etc/modprobe.d/sound.conf
sudo reboot
```


---

## 公式リポジトリ

JUXI USBドライバ不要サウンドカードのオープンソースリポジトリ: [GitHub](https://github.com/Juxi-Technology/Driver-Free-Sound-Card)

プラグアンドプレイで、Raspberry Pi、Jetson、PC などのデバイスに対応。追加ドライバ不要で、システムが自動的にオーディオ入力/出力デバイスとして認識します。
