---
title: Lekiwi-Mobilitätsroboter – Montage-Tutorial
description: "In Fusion360 Online-CAD können die genauen Bauteilpositionen visualisiert werden."
---

# Lekiwi-Mobilitätsroboter – Montage-Tutorial

[*Fusion360 Online-CAD*](https://a360.co/4k1P8yO)*zeigt die genauen Bauteilpositionen.*
[URDF-Datei](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)
Online-URDF-Vorschau https://urdf.d-robotics.cc/

# 1. Radmodul montieren (3 pro Roboter)

1. Antriebsmotor mit 12 **M2x6**-Selbstschneidern am Motorbügel befestigen (im Servogehäuse enthalten).





2. Motorbügel mit 12 **M3x16-Maschinenschrauben und 12**-Mutter am Bodenblech befestigen.



3. Maschinenschrauben und Muttern des 82-mm-Omnirads entfernen



4. Den Servohorn mit M3*6-Schrauben am Servo befestigen



5. 4 Sicherungsmuttern in die Kupplung einsetzen und die Kupplung mit 4 M3*6-Schrauben am Servohorn befestigen





6. Das 82-mm-Omnirad mit M3*25-Maschinenschrauben und Sicherungsmuttern an der Kupplung befestigen

Nachdem alle drei Räder am Bodenblech montiert sind:







# 2. Bodenblech-Baugruppe

1. M3-Muttern in die Löcher von Servo-Treiberplatine und Batteriehalterung einsetzen. Beide mit 4 M3x12-Maschinenschrauben am Bodenblech befestigen.





2. Servo-Treiberplatine mit vier M2.5*6.5-Messingabstandshaltern und vier M2.5*8-Schrauben montieren und mit den 3 Servos verbinden.



Kabel der Powerbank

- **Stromeingang** direkt an die Stromquelle





- **USB-C** versorgt den Raspberry Pi mit 5 V
- Bei **12-V-Roboterarm** die **DC-Stromverteiler** direkt mit Strom für die **Servo-Motorplatine** versorgen





Kabel wie unten abgebildet anschließen:



# 3. Deckelplatten-Baugruppe

1. Raspberry Pi 5 in die Gehäuseunterschale legen und den Deckel aufsetzen.
2. Raspberry Pi mit zwei M3x12-Maschinenschrauben und zwei M3-Sicherungsmuttern an der oberen Bodenplatte befestigen und den SO-101-Roboterarm-Sockel mit vier M4x25-Maschinenschrauben und vier M4-Sicherungsmuttern montieren. Es kann unser verbesserter SO-101-Sockel oder der originale verwendet werden – die Bodenplatte hat Bohrungen für beide.



# 4.

1. USB-C-auf-USB-A-Kabel der Servo-Treiberplatine, 5-V-USB-C-Stromkabel und SO0-101-Servokabel durch die Löcher der oberen Bodenplatte führen.



2. Obere Bodenplatte mit 6 M3x12-Maschinenschrauben und 6 M3-Sicherungsmuttern am Motorbügel montieren.



3. Deckelplatte und Bodenplatte mit 6 M3*50-Messingabstandshaltern und 6 M3*-Maschinenschrauben verbinden

# 5. Kamera montieren

*Hinweis: Unser Bügel ist speziell für die gewählte Kamera konstruiert. Bei anderen Kameramodulen sind ggf. Anpassungen nötig.*

## (Option 1) Frontkamera montieren

Frontkamerabügel mit 3 M3*12-Maschinenschrauben und drei M3-Muttern am Bodenblech montieren
Kameramodul mit 4 M2*5*5-Abstandsschrauben befestigen

## (Option 2) Armkamera montieren

Kameramodul mit 4 M2*5*5-Abstandsschrauben befestigen

# 6. Strom einschalten

Gleichstrom-Hohlstecker-Adapter in die Servo-Treiberplatine stecken und den 5-V-USB-C-Stecker in den Raspberry Pi 5 – damit ist die Elektronik versorgt. Die USB-Datenkabel von Servo-Treiberplatine und Kamera können direkt in den Raspberry Pi gesteckt werden.


