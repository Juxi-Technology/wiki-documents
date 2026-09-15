---
title: 中英認識語ファームウェアのダウンロードと書き込み
description: "モジュールは工場出荷時に音声認識機能ファームウェアが書き込まれています。資料の添付ファイルにも出荷ファームウェアが提供されています。ファームウェアを再作成する必要がある場合は次の手順で行えます。"
---

# 中英認識語ファームウェアのダウンロードと書き込み

> **[ストアで購入](https://www.juxitech.com/ja/products/ai-voice-recognition-module)**


> モジュールは工場出荷時に音声認識機能ファームウェアが書き込まれています。資料の添付ファイルにも出荷ファームウェアが提供されています。ファームウェアを再作成する必要がある場合は次の手順で行えます。
>

## [启英泰伦音声AIプラットフォーム](https://aiplatform.chipintelli.com/home/index.html)に入る

#### 启英泰伦公式サイトのアカウントを登録

#### 上部メニュー「平台功能」をクリックし、「产品固件及SDK深度开发」を選択

![上部メニュー「平台功能」をクリックし、「产品固件及SDK深度开发」を選択 – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/1.png)

---

#### 「离线语音识别大模型应用」をクリック

![上部メニュー「平台功能」をクリックし、「产品固件及SDK深度开发」を選択 – 2](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/10.png)

---

#### 「语音识别固件及SDK开发」をクリック

![「语音识别固件及SDK开发」をクリック – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/11.png)

---

#### 新規プロジェクト作成

![「语音识别固件及SDK开发」をクリック – 2](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/12.png)

---

#### 製品情報の記入

1. **製品名：**ご自身の命名ルールで構いません

2. **応用方案：**「单麦语音识别」を選択

3. **製品タイプ：**「通用-&gt;智能中控」

4. **チップ型番：**Cl1302

5. **sdk名：**Cl13XX_SDK_ASR_Offline

6. **sdkバージョン：**1.12.16

7. **説明：**ご自身の説明ルールで構いません

![製品情報の記入 – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/13.png)

---

#### ファームウェア情報の選択

> ここで中文または英文を選択できます
>

1. **バージョン名：**ご自身のバージョンルールで構いません

2. **言語タイプ：**ご自身のニーズに応じて選択

3. **音響タイプの選択：**

    1. **中文を選択：**VO0681_中文_ASR_通用_0.9M

    2. **英文を選択：**VO0916_英文_ASR_通用_1.1M

4. **モジュールボード選択：**CI-D02GS02S

![製品情報の記入 – 2](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/14.png)

---

#### ファームウェア設定

![ファームウェア設定 – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/2.png)

---

#### ウェイクワードファームウェアのダウンロード

1. アップロード - 対応する言語のウェイクワード表を選択

2. 「立即提交」をクリック

3. 数分待つとファームウェアをダウンロードできます

4. ここに「命令詞播報詞協議列表」が2部提供されています。必要に応じてこの表をもとに変更できます

    命令詞播報詞協議列表V3_中文模板.xlsx

    命令詞播報詞協議列表V3_英文模板.xlsx

![ファームウェア設定 – 2](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/3.png)

![ファームウェア設定 – 3](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/4.png)

---

## 音声モジュールへのファームウェア書き込み

#### 音声モジュール書き込みソフトウェアの圧縮パッケージをダウンロード

音声モジュールファームウェア書き込みソフトウェア.7z

1. 解凍後、ソフトウェアを開く

> ファームウェアは「CI1302」を選択し、「固件升级」をクリック
>

![音声モジュール書き込みソフトウェアの圧縮パッケージをダウンロード – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/5.png)

2. サウンドカードをPCに挿し、デバイスマネージャーを開く

![音声モジュール書き込みソフトウェアの圧縮パッケージをダウンロード – 2](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/6.png)

![音声モジュール書き込みソフトウェアの圧縮パッケージをダウンロード – 3](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/7.png)

3. ファームウェア書き込みソフトウェアのページに移動

> サウンドカードのボタン位置
>
> ![音声モジュール書き込みソフトウェアの圧縮パッケージをダウンロード – 4](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/8.png)
>

![音声モジュール書き込みソフトウェアの圧縮パッケージをダウンロード – 5](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/9.png)

#### 完了後は左側の対応する他のチュートリアルへ移動できます

#### ここに準備済みのファームウェア資料があり、直接書き込めます

CI1302_中文_单麦_V00681_UART0_115200_2M.bin

CI1302_英文_单麦_V00916_UART0_115200_2M.bin




## 注意事項

1. CH341ドライバのインストール（管理者としてインストール）

https://www.wch.cn/downloads/CH341SER_EXE.html

デバイスマネージャーで未知のデバイス usb single serial または usb serial と認識された場合は、右クリックでアンインストールしてからドライバをインストールしてください！
