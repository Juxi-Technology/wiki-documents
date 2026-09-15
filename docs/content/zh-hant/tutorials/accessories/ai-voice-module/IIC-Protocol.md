---
title: "IIC協定"
description: "注意：主機裝置與語音互動模組的供電電源可以不同，但在連接時必須要共地，才可以提供穩定的通訊電平"
---

# IIC協定

注意：主機裝置與語音互動模組的供電電源可以不同，但在連接時必須要共地，才可以提供穩定的通訊電平

## 1.語音互動模組當從機

接收解析主機發送的訊號：

等待 IIC 訊號中斷，若 IIC 有資料接收到，則根據 IIC 接收到的暫存器位址資訊，呼叫對應的函式功能。

資料處理與回饋：

當語音互動模組接收到讀取暫存器命令時，則需要呼叫對應的發送函式，將辨識到的資料發送給主機裝置。

## 2.IIC裝置位址及暫存器功能

語音互動模組的 IIC 從機的裝置位址為 0x2A。

## 3.取得命令詞條。

開啟附件中的命令词播报词协议列表V1_中文檔案，能看到通訊協定協定以 0xFE、0xED 開頭，以 0xEE結尾，中間 2 個位元組，分別為功能類型和 ID 號。

![圖 1](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/1.png)

當語音互動模組辨識到“停車”命令詞時，會回應“好的，已停止”，主控可在辨識結果暫存器（0xDA）上讀取到 0x02一個位元組資料，該資料與“停車”的發送協定中第 4 個位元組相同。

![圖 2](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/2.png)

## 4.播報語詞條

播報語詞條不會主動播報，必須要主控透過 IIC 設定才會進行播報（命令詞條的播報語也可以進行播報）。

主控透過 IIC 在播報暫存器位址（0xD1）上寫入 一個1個位元組，為命令詞 ID 號，語音播報模組就會播報對應的語句，0xFF 為普通播報語。

![圖 3](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/3.png)

例如：

使用者需要播放“這是紅色”時，主控需要透過 IIC 在播報暫存器（0xD1）上寫入“0x5F”，語音互動模組即會播報“這是紅色”。

![圖 4](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/4.png)

## 5.播報功能詞條

功能詞條可以辨識到命令詞的時候播報，也可以透過IIC寫入特定的位元組播報。

主控透過 IIC 在播報暫存器位址（0xD2）上寫入 一個1個位元組，為命令詞 ID 號，語音播報模組就會播報對應的語句，0xFF 為普通播報語。

![圖 5](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/5.png)

例如：

使用者需要播放“這是紅色”時，主控需要透過 IIC 在播報暫存器（0xD2）上寫入“0x01”，語音互動模組即會播報“歡迎使用小犀”。

![圖 6](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/6.png)

## 5.播報命令詞條

命令詞條可以辨識到命令詞的時候播報，也可以透過IIC寫入特定的位元組播報。

主控透過 IIC 在播報暫存器位址（0xD3）上寫入 一個1個位元組，為命令詞 ID 號，語音播報模組就會播報對應的語句，0xFF 為普通播報語。

![圖 7](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/7.png)

例如：

使用者需要播放“好的，正在前進”時，主控需要透過 IIC 在播報暫存器（0xD3）上寫入“0x04”，語音互動模組即會播報“好的，正在前進”。

![圖 8](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/8.png)



