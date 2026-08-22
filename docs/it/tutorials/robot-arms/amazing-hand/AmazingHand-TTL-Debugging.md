---
title: Tutorial di debug della mano dexterous (servo TTL)
description: "Prima scaricare l'archivio «灵巧手调试.zip» ed estrarlo; poi con il documento «使用arduio程序调试灵巧手过程（TTL舵机）» impostare gli ID dei servo, calibrare, allineare il centro ed eseguire la demo, oppure consultare il codice open source ufficiale."
---

# Tutorial di debug della mano dexterous (servo TTL)

Prima scaricare l'archivio «[灵巧手调试.zip](https://juxitech.feishu.cn/wiki/QjYBwL0A0iJVlNkEpUUclLYGnBc)» ed estrarlo. Poi, tramite il documento «使用arduio程序调试灵巧手过程（TTL舵机）», è possibile impostare gli ID dei servo, calibrare, allineare il centro ed eseguire il programma demo, oppure consultare il [codice open source ufficiale](https://github.com/pollen-robotics/AmazingHand/tree/main/ArduinoExample).

**Senza smontare il prodotto finito** (ID servo, calibrazione e centro già impostati in fabbrica) si può saltare direttamente al **[punto 6: eseguire «02 演示程序»](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229188003&from=from_node_link)** e al punto 7 **[tracciamento della mano](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229188027&from=from_node_link)**.

## 1. Cablaggio per il debug della mano

Una opzione è usare il PC con software host come Python (software host Feetech o codice Python).
L'altra è usare un microcontrollore come MEGA328P o una scheda di sviluppo/controllo acquistata.

Cablaggio come segue:
(1) Cablaggio per debug con Python (solo scheda driver servo):
(2) Cablaggio per debug con MEGA328P (scheda driver servo + scheda 328P):

**Osservare bene le posizioni dei pin della scheda MEGA328P!**

Di seguito il processo di debug con microcontrollore. Il microcontrollore esegue il programma demo in loop; basta scollegare il cavo dati per fermarlo.

## 2. Impostare gli ID dei servo

Una mano usa 8 servo: mano destra ID 1-8, mano sinistra ID 11-18

Posizione centrale di fabbrica: destra [451,571,451,571,451,571,451,571], sinistra [571,451,571,451,571,451,571,451]

1. Cablaggio: collegare **singolarmente** servo e scheda driver, uno a uno.
2. Usare il software host FD1.9.8.2 del produttore per la configurazione
[FD.rar]

## 3. **Fissare la corna del servo**

1. Caricare il programma «安装白色伺服喇叭时使用» sulla scheda di sviluppo

Scopo del programma: portare l'ingranaggio del servo in una posizione approssimativamente centrale; gli angoli successivi si basano su questa posizione centrale.

(1) Installare il software arduino; in base al sistema vedere il [tutorial di installazione](https://blog.csdn.net/weixin_35509395/article/details/156188274); prima di compilare, installare nel gestore librerie le librerie FTServo e SCServo
(2) Tipo di scheda: scegliere «Arduino Nano»

2. Debug dei servo 1, 2
(1) Modifica: in base all'ID del servo da debugare (es. indice → ID 1, 2)
(2) Caricare il programma sulla scheda
(3) Cablaggio: scheda + scheda driver + **servi 1, 2** – si sente l'ingranaggio ruotare di un angolo e fermarsi.
(4) Montare la corna sull'ingranaggio, il più parallelo possibile

3. Debug dei servo 3, 4
(1) **Scollegare il cablaggio tra scheda 328P e scheda driver (altrimenti non si può caricare)**
(2) Modifica: ID 3, 4
(3) Caricare il programma
(4) Cablaggio: scheda + scheda driver + **servi 3, 4**
(5) Montare la corna, il più parallelo possibile

4. Servi 5, 6 – stessi passi
5. Servi 7, 8 – stessi passi

## 4. **Regolare finemente i valori centrali**

1. Caricare il programma «01 微调MiddlePos值时使用» sulla scheda

2. Con le dita in posizione chiusa, fermare subito il programma (scollegare il cavo dati) e verificare che le corna siano allineate (vedi figura). Se non lo sono, regolare i valori MiddlePos_1 e MiddlePos_2 fino all'allineamento. Annotare i valori (8 valori per 8 servo) – verranno usati nel programma finale.

## 5. **Eseguire il programma di test**

1. Inserire i valori MiddlePos_1 e MiddlePos_2 salvati nell'array seguente e scaricare il programma.

## 6. **Eseguire «02 演示程序»**

(1) Installare arduino in base al sistema: [tutorial di installazione](https://blog.csdn.net/weixin_35509395/article/details/156188274)
(2) In `灵巧手调试\00 TTL串口舵机\arduino程序（MEGA328P开发板）\02 演示程序`, aprire il file ino corrispondente a mano sinistra o destra
(3) Prima di compilare, installare le librerie FTServo e SCServo nel gestore librerie
(4) Tipo di scheda: «Arduino Nano»
(5) Compilare e caricare

Attenzione: il PC è collegato solo alla scheda di sviluppo; la scheda non è ancora collegata alla scheda driver (cioè non alla mano).

Dopo il caricamento riuscito, collegare la scheda alla scheda driver con tre cavi jumper e i servo alla scheda driver. Vedi [cablaggio del debug MEGA328P](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229187947&from=from_node_link).

La mano esegue **«02 演示程序»** in loop.

Risultato:

## [7. Tracciamento della mano](https://juxitech.feishu.cn/wiki/ZpHmwYARQiN2fwkqFJecqUFZnQg)
