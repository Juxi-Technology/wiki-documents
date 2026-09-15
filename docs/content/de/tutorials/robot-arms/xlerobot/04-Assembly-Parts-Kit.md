---
title: "⚒️ Bausatz-Montage"
description: "Wenn Sie sich das Vergnügen des Schraubenanziehens lieber ersparen möchten, können Sie auch das vorgefertigte…"
---

# ⚒️ Bausatz-Montage

![Abb. 1](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/1.png)

Tipp

Wenn Sie sich das Vergnügen des Schraubenanziehens lieber ersparen möchten, können Sie auch das [vorgefertigte Bausatz-Set](https://item.taobao.com/item.htm?ft=t&id=1002551208989&spm=a21dvs.23580594.0.0.47b32c1bwUlxLA&skuId=6088534920039) für die SO101-Follower-Arme in Xlerobot-kompatibler Ausführung kaufen.



## 🦾 SO101-Roboterarm

![Abb. 2](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/2.png)

> Wenn Sie bereits über 2 fertig montierte SO101-Roboterarme mit konfigurierten Servos verfügen, überspringen Sie diesen Abschnitt.
> 
> 

- Bauen Sie gemäß der [SO101-Schritt-für-Schritt-Montageanleitung](https://juxitech.feishu.cn/wiki/HllBwhjJ1iayMdkUTGgcyKbgn8g) 2 SO101-Roboterarme und stellen Sie 2 identische Follower-Arme her, ausgestattet mit 2 Servo-Sätzen (zuvor alle mit ID 1-6) für die 2 Servo-Treiberplatinen.

- Fügen Sie gemäß dieser [Installationsanleitung](https://juxitech.feishu.cn/wiki/LjJywf5ILihuwkkOboGcFx1Qnkc) die Handgelenkkamera hinzu.

- Wenn Sie über Antirutsch-Pads verfügen, können Sie diese auf den Greifer kleben.

## 一、Servos konfigurieren

||Anzahl|Servo-ID|Verwendungszweck|
|---|---|---|---|
|Feetech STS3215-C018-Servo|3|7、8、9|Omnidirektionalrad-Fahrgestell|
|Feetech STS3215-C018-Servo|2|7、8|Oberkörper-Kit-Kamera-Turm|
|90CM-Servo-Verlängerungskabel|2||Verbindet Fahrgestell und Kamera-Turm mit der Servo-Treiberplatine|

![Abb. 3](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/3.png)

> Da das offizielle lerobot-Code-Repository derzeit keine Servo-Konfiguration außerhalb des Roboterarms unterstützt, verwenden wir stattdessen [Bambot](https://bambot.org/) (funktioniert unter Windows und Mac; unter Linux müssen Sie zuerst sudo chmod 666 /dev/ttyACM0 ausführen).
> 
> 

```Plain Text
sudo chmod 666 /dev/ttyACM0
```

- Verbinden Sie die Servos, die Sie konfigurieren möchten, (einzeln) mit der Servo-Treiberplatine und schließen Sie die Servo-Treiberplatine direkt an Ihren Computer an.

- Öffnen Sie die [Servo-Konfigurationsseite von Bambot](https://bambot.org/feetech.js), stellen Sie eine Verbindung her und scannen Sie Ihre Servos. 

![Abb. 4](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/4.png)

- Benennen Sie die Servo-IDs gemäß den folgenden Anweisungen um. 

![Abb. 5](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/5.png)

- Zusätzlich zu den SO101-Roboterarmen müssen Sie für die 2 Servo-Treiberplatinen zwei Servo-Sätze konfigurieren:

    - einen Satz für den **Kamera-Turm** (Servo-IDs: 7, 8)

    - den anderen Satz für das **Omnidirektionalrad-Fahrgestell** (Servo-IDs: 7, 8, 9).

- Tipp: Schreiben Sie mit einem Markierstift Zahlen auf die Servos und unterscheiden Sie die Servos der verschiedenen Platinen (z. B. L1-L8 und R1-R9).

## 🛒 Wagen

- Falls Sie das Handbuch versehentlich weggeworfen haben, [hier ist eine Kopie](https://github.com/Vector-Wangel/XLeRobot/blob/main/others/Manuals_raskog_utility_cart.pdf).

![Abb. 6](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/6.png)

## 🧑‍🦼‍➡ Radbasis

> Wenn Sie bereits eine Lekiwi-Basis haben, entfernen Sie bitte den Akku, die Servo-Halterungen usw. Auf der Bodenplatte müssen nur 3 Servos mit Rädern montiert werden (Verkabelung beibehalten).
> 
> 

![Abb. 7](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/7.png)

**Hinweis**

Wählen Sie nicht die falsche Platine; jede Platine hat eine bestimmte Reihenfolge.

- Montieren Sie die Omnidirektionalräder gemäß der obigen Abbildung auf der Platine.

    - Die jeweiligen Servo-IDs müssen entsprechend montiert werden.

- Beachten Sie, dass die Anschlüsse der Omnidirektionalräder 3 M4-Schrauben benötigen.

- Verkabeln Sie die Servos normal gemäß dem [Tutorial](https://github.com/SIGRobotics-UIUC/LeKiwi/blob/main/Assembly.md#2-bottom-plate-assembly); verbinden Sie anschließend die Servo-Kabel nicht mit der Servo-Treiberplatine, sondern verwenden Sie das **90CM-Servo-Verlängerungskabel**, um die Servo-Treiberplatine anzuschließen.

![Abb. 8](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/8.png)

- Montieren Sie die Deckplatte gemäß der obigen Abbildung.

- Lassen Sie das **90CM-Servo-Verlängerungskabel** hängen; ziehen Sie es vorerst nicht aus dem Loch der Deckplatte heraus.

![Abb. 9](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/9.png)

- Montieren Sie gemäß der obigen Abbildung 3 Anschlüsse (Distanzhalter) auf der Deckplatte.

Tipp

Stellen Sie die Lekiwi-Basis mit Anschlüssen unter den Wagen und prüfen Sie, ob sie genügend Druck auf den Wagen ausübt, sodass die vier Räder des Wagens noch den Boden berühren. Wenn nicht, versuchen Sie, das 3D-Modell des Anschlusses durch eine leichte Anpassung des Z-Achsen-Maßstabs direkt in der Slicing-Software zu ändern (wobei der Maßstab der X- und Y-Achse unverändert bleibt) und erneut zu drucken.

![Abb. 10](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/10.png)

Tipp

Drehen Sie den Wagen um, um die folgende Montage durchzuführen.

- Montieren Sie nun die Lekiwi-Basis mit den Anschlüssen an der Unterseite des Wagens, wobei sich die dünnere Platte auf der anderen Seite befindet.

- Finden Sie anhand der Abbildungen und des Servo-Index die erforderliche Montagerichtung.

Hinweis

Diese neue Hardware-Version ist mit dem Metallgitter des Wagens kompatibel; alle 12 M3-Schrauben sollten sich problemlos einsetzen lassen.

![Abb. 11](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/11.png)

- Führen Sie anschließend die zuvor verlängerten Kabel von unten durch den Wagen nach oben.

## 🦾 Roboterarm-Basis

### Montage der oberen Basis

14 M3\*12-Sechskantschrauben

4 M3\*16-Sechskantschrauben

![Abb. 12](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/12.png)

- Die Montage ist einfacher, wenn die Basis umgedreht wird.

### Montage des Kopfes

①Stecken Sie zunächst das 90CM-Servo-Verlängerungskabel (schwarz-weiß) und das Servo-Kabel (weiß-rot-schwarz) auf Servo Nr. 7.



②Befestigen Sie die Kamera mit vier M2\*6-Unterlegscheibenschrauben

![Abb. 13](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/13.png)

- Beachten Sie, dass beim Montieren des Servo-Horns keine Schraube in das mittlere Loch des Servo-Horns gesetzt wird.

- Dies sollte mit den ersten beiden Schritten der [SO101-Roboterarm-Montage](https://huggingface.co/docs/lerobot/so101#joint-1) übereinstimmen.

## 🧵 Verkabelung

Wichtig

Bevor Sie die obere Basis am Wagen festklemmen, schließen Sie die gesamte Verkabelung der oberen Basis ab, führen Sie das Kabelmanagement durch und setzen Sie den Raspberry Pi in sein Gehäuse ein.

![Abb. 14](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/14.png)

- Verbinden Sie das 90CM-Servo-Verlängerungskabel von der **Lekiwi-Basis** mit dem **linken SO101-Roboterarm** (dadurch werden Basis und Arm zu einem Lekiwi).

- Verbinden Sie 2 **USB-C-auf-USB-A-Datenkabel ** von den 2 **Servo-Treiberplatinen** mit dem **Raspberry Pi** (die verbleibenden 2 USB-A-Steckplätze sind für die Kameras) oder einem Jetson-Mainboard.

- Schließen Sie alle 3 **Stromkabel** an: 2 **USB-C-auf-DC-(12V)-Kabel von den 2 Servo-Treiberplatinen** und 1 **USB-C-auf-USB-C-Kabel** vom **Raspberry Pi** an die PD-Schnellladeanschlüsse der Stromversorgung. Jeder Anschluss liefert beim gleichzeitigen Laden bis zu 100W, was getestet ausreicht, um den Betrieb der 12V-Version zu unterstützen.

### 🔋 Platzierung des Akkus 🛒

- Platzieren Sie ihn an einer beliebigen Stelle auf der mittleren oder unteren Ebene des Wagens, um den Schwerpunkt niedrig zu halten. Der Akku hat eine rutschfeste Unterseite und verrutscht im normalen Betrieb nicht leicht.

- Stellen Sie ihn aus Sicherheitsgründen aufrecht auf.

- Falls Sie auch das Akku-Handbuch versehentlich weggeworfen haben, [hier ist eine Kopie](https://github.com/Vector-Wangel/XLeRobot/blob/main/others/Manual_Anker_SOLIX_C300_DC_Portable_Power_Station.pdf).

Wichtig

Um die Servo-Treiberplatinen zu schützen, schließen Sie die Stromkabel zuletzt an. Trennen Sie beim Ein- und Ausstecken anderer Kabel stets die Stromkabel.

## 📸 Endmontage

### Einsetzen der Basis in den Wagen

Wichtig

Bevor Sie die obere Basis am Wagen festklemmen, schließen Sie die gesamte Verkabelung der oberen Basis ab, führen Sie das Kabelmanagement durch und setzen Sie den Raspberry Pi in sein Gehäuse ein.

![Abb. 15](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/15.png)

- Achten Sie darauf, das Gehäuse nicht zu beschädigen, wenn Sie den Rand des Wagens in die Gehäuseaufnahme schieben.

- Um Tests zu erleichtern, werden die SO101-Roboterarme direkt am Wagen festgeklemmt. Positionieren Sie die [Roboterarm-Basis](https://github.com/Vector-Wangel/XLeRobot/blob/main/3D_Models/3D_models_for_printing/XLeRobot_special/SO_5DOF_ARM100_Assemblybases.stl) an den beiden Ecken der obersten Ebene des Wagens und fixieren Sie sie mit **F-Typ-Klemmen**.

- Wenn Sie eine Pappspule von Bambu Lab Filament haben, vergessen Sie nicht, sie innen zu platzieren, um eine stabile strukturelle Unterstützung zu bieten.

![Abb. 16](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/16.png)

Nach Abschluss dieser Schritte sollte der XLeRobot physisch gut montiert und bereit sein, etwas Hausarbeit zu erledigen.

![Abb. 17](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/17.png)

![Abb. 18](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/18.png)

Wichtig

Schieben Sie den vollständig montierten XLeRobot nicht wie einen Wagen durch die Gegend, da dies die Servo-Getriebe beschädigen kann. Heben Sie den Roboter stattdessen an (~12kg), wenn Sie ihn manuell bewegen müssen.



