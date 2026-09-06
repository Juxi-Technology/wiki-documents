---
title: Tutorial di debug della mano dexterous (servo TTL)
description: "Prima scaricare l'archivio «灵巧手调试.zip» ed estrarlo; poi con il documento «使用arduio程序调试灵巧手过程（TTL舵机）» impostare gli ID dei servo, calibrare, allineare il centro ed eseguire la demo, oppure consultare il codice open source ufficiale."
---

# Tutorial di debug della mano dexterous (servo TTL)

> **[Acquista nel negozio](https://www.juxitech.com/it/products/amazinghand)**


Prima scaricare l'archivio «[灵巧手调试.zip](https://juxitech.feishu.cn/wiki/QjYBwL0A0iJVlNkEpUUclLYGnBc)» ed estrarlo. Poi, tramite il documento «使用arduio程序调试灵巧手过程（TTL舵机）», è possibile impostare gli ID dei servo, calibrare, allineare il centro ed eseguire il programma demo, oppure consultare il [codice open source ufficiale](https://github.com/pollen-robotics/AmazingHand/tree/main/ArduinoExample).

**Senza smontare il prodotto finito** (ID servo, calibrazione e centro già impostati in fabbrica) si può saltare direttamente al **[punto 6: eseguire «02 演示程序»](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229188003&from=from_node_link)** e al punto 7 **[tracciamento della mano](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229188027&from=from_node_link)**.

![Immagine – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTQ0NjE2ZmE3MmFlM2ZkMGQ5YmE2MmY3NTUyZDdjMWRfZjY1YjhhN2Q4ZjhhOWQ0NGE5ZWM4YWRjZDY3N2EwYjZfSUQ6NzYzODkzOTYxMTI1MDc4OTMzM18xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## 1. Cablaggio per il debug della mano

Una opzione è usare il PC con software host come Python (software host Feetech o codice Python).
L'altra è usare un microcontrollore come MEGA328P o una scheda di sviluppo/controllo acquistata.

Cablaggio come segue:
(1) Cablaggio per debug con Python (solo scheda driver servo):

![1. Cablaggio per il debug della mano – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTdmMjBiMGQzMTI2ODllOWMzYTU2N2ZkYWZlMzVkODdfNjNlZTQ2OTI4M2M3Mzg2NmZmZDNiYjI5Zjc3NDg0MjZfSUQ6NzYzODkzOTYxMTQ4OTg0ODI5MV8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(2) Cablaggio per debug con MEGA328P (scheda driver servo + scheda 328P):

![1. Cablaggio per il debug della mano – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjFjYzRiMGQ0ZGNjN2M0MmUyMTY1MjNiMjQ4MzQ4NmZfM2JmYWU5NmZjNDQyY2Y1MGZkNzExYTJiMDg1OGRlMjlfSUQ6NzYzODkzOTYwOTIwNDM5NDk2NV8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![1. Cablaggio per il debug della mano – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzIxZTg3NzMxNzZiYTRhMWMzNmM5ODJhMzZhNTE2YzZfNDY1MTNkNTI3YTVmYzBkY2U2YjViZTQzZDU2YmI5NzBfSUQ6NzYzODkzOTYxMDQxMjE0MTUzNV8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

**Osservare bene le posizioni dei pin della scheda MEGA328P!**

![1. Cablaggio per il debug della mano – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmYwNzM3ZjRiZjk3Njg1M2UyOGMwNzM0NmJhNjliMDNfNGE0NmRlYTI3MDY4ZDA1M2IwNTI3NTczZDE3NTBhNzhfSUQ6NzYzODkzOTYwOTU2NDkwODUwNV8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![1. Cablaggio per il debug della mano – 5](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OTUwM2U2Nzc0MjVhNzczODJiMGUwNjA0YTdjZWM0YTVfYWU4ZTQzOWRjOTlkOWU4NjhlNWFlOGJiODViNzNjNDRfSUQ6NzYzODkzOTYwNzY5MDk3MjEwOF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

Di seguito il processo di debug con microcontrollore. Il microcontrollore esegue il programma demo in loop; basta scollegare il cavo dati per fermarlo.

## 2. Impostare gli ID dei servo

Una mano usa 8 servo: mano destra ID 1-8, mano sinistra ID 11-18

Posizione centrale di fabbrica: destra [451,571,451,571,451,571,451,571], sinistra [571,451,571,451,571,451,571,451]

1. Cablaggio: collegare **singolarmente** servo e scheda driver, uno a uno.

![2. Impostare gli ID dei servo – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZWM0NTY2YjdjZWU5ZmNiNmJhZWRhODg0NjgwZDJiZjlfNjMzNGZmNzY1NTg3YmM5ZTMyNGRlYzk4YzdiMmZhYmNfSUQ6NzYzODkzOTYwNzUzOTQzNjUxN18xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

2. Usare il software host FD1.9.8.2 del produttore per la configurazione
[FD.rar]

![2. Impostare gli ID dei servo – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NmI3MTMyZTFlMjRmM2U1OTY3M2JkN2ZlYWYwM2MyMzdfYjA0NzhmZDNjODMyYjNiNmYyZjBkN2Q2NzJkNDUxMmVfSUQ6NzYzODkzOTYwODM0OTAxOTA5MF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![2. Impostare gli ID dei servo – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZGJmNWE2MGEwZGU4ZGUxMWU4ZDA2YWIwYWFkMDk3YzJfMjcxOGRlZTE2Mjg3MDQ0OWExNjJmODU1OTBmYTBhZDRfSUQ6NzYzODkzOTYxMDcyNjY4MTU3NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![2. Impostare gli ID dei servo – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YmQyNGIyMTQwOTExYzM3YzJhNGY2ZWQwMGZkOGI5NjdfZWJiYTYwZDZjNDlmNzY1OGRjYjEwMmRhMGEzMWZkZDBfSUQ6NzYzODkzOTYwODAxMzQ0MTk4MF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## 3. **Fissare la corna del servo**

1. Caricare il programma «安装白色伺服喇叭时使用» sulla scheda di sviluppo

Scopo del programma: portare l'ingranaggio del servo in una posizione approssimativamente centrale; gli angoli successivi si basano su questa posizione centrale.

(1) Installare il software arduino; in base al sistema vedere il [tutorial di installazione](https://blog.csdn.net/weixin_35509395/article/details/156188274); prima di compilare, installare nel gestore librerie le librerie FTServo e SCServo

![3. Fissare la corna del servo – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjU0NGRjM2VhZDU4NGViMmU4YjBkNjQ3OGRmYzMxOGFfMzYxMzAxMDM1NmFhYjFjM2ZhMTlmODMwNDBiOWUwMzlfSUQ6NzYzODkzOTYwNzU1MjI4MTUzOF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(2) Tipo di scheda: scegliere «Arduino Nano»

![3. Fissare la corna del servo – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjdiYmNjMzFjMjE3OTZkNjAzYjZkM2RhZDRiZDY5MDFfZTVjNTAyZGU5ZGFmYmJmYzgwNDI3YzMyOWNmMjljYzVfSUQ6NzYzODkzOTYxMTUyMzQ1MTg1NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

2. Debug dei servo 1, 2
(1) Modifica: in base all'ID del servo da debugare (es. indice → ID 1, 2)

![3. Fissare la corna del servo – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=N2UyYzFjYmJiNjA3YTZkMjY4MWZkYjdhMzFhMDNkZDlfMjQ4NjdlY2M4ZjI2ZjcxNjJlNDc5YmQyNGNmNGZhYzVfSUQ6NzYzODkzOTYwNzYyMzQwNDUxN18xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(2) Caricare il programma sulla scheda
(3) Cablaggio: scheda + scheda driver + **servi 1, 2** – si sente l'ingranaggio ruotare di un angolo e fermarsi.

![3. Fissare la corna del servo – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2U4MTBhZWY4YmY0Y2MzOWU5MzhiODA0ZDZhODc4MzRfZGEzZjM4ODdkOWQ1MTJmZjNiYmQxNTMyMjQ2ZDQ0MDZfSUQ6NzYzODkzOTYwNzkzNTY4MzU1OF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(4) Montare la corna sull'ingranaggio, il più parallelo possibile

![3. Fissare la corna del servo – 5](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTUyMDI0ODVjYjhhNDBjZDJkZmQ1YjNmMzA2NDc5ZTlfNTUxNmQ2MWQwOTdmYzdjOTM2YTNkZTkxYzYzYjI5YmVfSUQ6NzYzODkzOTYwODAxMzQ1ODM2NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

3. Debug dei servo 3, 4
(1) **Scollegare il cablaggio tra scheda 328P e scheda driver (altrimenti non si può caricare)**
(2) Modifica: ID 3, 4

![3. Fissare la corna del servo – 6](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2RlNzE0MzI1ZDYxY2I2YjE4Y2YyNWZkYjM0MTgyOGFfZTI2MWI2MmQ0NmJlNTgwOTEzZDAzN2U4OGRmOTkwNDFfSUQ6NzYzODkzOTYxMTI0NjY2MDU3OF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)
(3) Caricare il programma
(4) Cablaggio: scheda + scheda driver + **servi 3, 4**
(5) Montare la corna, il più parallelo possibile

4. Servi 5, 6 – stessi passi
5. Servi 7, 8 – stessi passi

## 4. **Regolare finemente i valori centrali**

1. Caricare il programma «01 微调MiddlePos值时使用» sulla scheda

2. Con le dita in posizione chiusa, fermare subito il programma (scollegare il cavo dati) e verificare che le corna siano allineate (vedi figura). Se non lo sono, regolare i valori MiddlePos_1 e MiddlePos_2 fino all'allineamento. Annotare i valori (8 valori per 8 servo) – verranno usati nel programma finale.

![4. Regolare finemente i valori centrali – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmExMWZhZTY2NTUxMWE0OGJkMjg5OWJjM2QwNjcwMmJfNDE3MzY4ODI3OGRjNTU0YjlhMDA3ZDViMGNkZmUxNjZfSUQ6NzYzODkzOTYxMTE5MjAxOTkyMF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![4. Regolare finemente i valori centrali – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YmY0ZTAyNTRkNGQ5OGQyMTAyZTkwNDk0Y2RmNDAzMjRfZGRjODE0NjQwODBlOTJkY2Q5NzUwN2M3OTZmYjEwZjlfSUQ6NzYzODkzOTYwODEwMzQ1NTY5NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## 5. **Eseguire il programma di test**

1. Inserire i valori MiddlePos_1 e MiddlePos_2 salvati nell'array seguente e scaricare il programma.

![5. Eseguire il programma di test – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NzA4ZmVjODQzYzU3ZjIwMjU2NGQ1NjQ4YzFkZjFjZDdfMmU3ZDU0NGJiODU3OWI4ZDQzNDNiNzY0YjNkYzllYWZfSUQ6NzYzODkzOTYxMTI2MzQzNzc2Ml8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## 6. **Eseguire «02 演示程序»**

(1) Installare arduino in base al sistema: [tutorial di installazione](https://blog.csdn.net/weixin_35509395/article/details/156188274)
(2) In `灵巧手调试\00 TTL串口舵机\arduino程序（MEGA328P开发板）\02 演示程序`, aprire il file ino corrispondente a mano sinistra o destra

![6. Eseguire «02 演示程序» – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MGU3YzRlZWM2ZDRiNWZmYjNjMWQ3MmQzNGVkOTYxNTNfNzE3NWFjMGY4MGY4ZjJkYmJhMGY1NjhiMDAxNTFlMmVfSUQ6NzYzODkzOTYwODAxMzQ5MTEzMl8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(3) Prima di compilare, installare le librerie FTServo e SCServo nel gestore librerie

![6. Eseguire «02 演示程序» – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NzgwNjdhZWY4ZjAzNmIzNzMyYmIzMGZkYzE0OTNiMTBfNmU3ODBjZTA2ODMwMzc5MWJhMDJmNDkzMDU3MmY1MjlfSUQ6NzYzODkzOTYwNzk0NjU3ODg3Ml8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(4) Tipo di scheda: «Arduino Nano»

![6. Eseguire «02 演示程序» – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YTc0YjYyYjRjMTY4NGI5NzIxN2RhNjA0MTQ5YzE3OTRfYjYzZGYyNjkwMzY5ZTM3MjIzZWIxNmI4MWUzMGMxNmZfSUQ6NzYzODkzOTYxMTUwMjQxNDgwMl8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)
(5) Compilare e caricare

Attenzione: il PC è collegato solo alla scheda di sviluppo; la scheda non è ancora collegata alla scheda driver (cioè non alla mano).

Dopo il caricamento riuscito, collegare la scheda alla scheda driver con tre cavi jumper e i servo alla scheda driver. Vedi [cablaggio del debug MEGA328P](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229187947&from=from_node_link).

La mano esegue **«02 演示程序»** in loop.

Risultato:

![6. Eseguire «02 演示程序» – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTY0NzA2NGI2OTBjNzkwODE4ZGFhNGM2ZDFkNjhhMzFfZDMxNjlmZWZhNmMxYjQ0YTNhMjZhZWEzYWU0OGY2YzBfSUQ6NzYzODkzOTYwOTI1NDY0NDY3NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## [7. Tracciamento della mano](https://juxitech.feishu.cn/wiki/ZpHmwYARQiN2fwkqFJecqUFZnQg)
