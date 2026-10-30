---

title: "AmazingHand Dexterous-Hand-Tutorial"

description: "Vollständiges Tutorial zur Open-Source-Dexterous-Hand AmazingHand: Produktdaten, Umgebungskamera-Kit, Gestenerkennung im Web, MuJoCo-Gesten-Tracking, Interface-Steuerung, Arduino Nano sowie TTL- und PWM-Debugging."

---



# AmazingHand Dexterous-Hand-Tutorial



AmazingHand ist ein Open-Source-Projekt einer menschenähnlichen Hand für unter 250 US-Dollar, das sich an Robotik-Enthusiasten, Forschende und Entwickler richtet.



## Projektübersicht



- **Mechanisches Design**: 8 Freiheitsgrade, 4 Finger, je Finger 2 gekoppelte Fingergelenke; die Finger werden über eine Parallelmechanik angetrieben, ohne externe Kabel, alle Antriebe sind in der Hand integriert; 3D-gedruckte Teile, Gewicht ca. 400 g, Kosten unter 200 Euro.

- **Steuerungskonzept**: Python-Ansteuerung über den seriellen Bus (unterstützt Hardware wie Waveshare); wahlweise zwei Lösungen mit Arduino + Feetech TTL Linker; Beispielcode für Python und Arduino; unterstützt Rückmeldungen wie das Ein-/Ausschalten des Servo-Drehmoments, Positionserfassung und Temperaturüberwachung.

- **Umfangreiche Ressourcen**: vollständige BOM-Stückliste, CAD-Dateien und Onshape-Onlinedokumentation, Montageanleitungen und Kalibrierskripte, einfache und fortgeschrittene Demo-Beispiele, Unterstützung für inverse/direkte Kinematik.

- **Projekt-Highlights**: passt an Roboterhandgelenke wie das des Reachy2; offenes Design, von der Community getrieben; geplante Erweiterungen umfassen taktile Sensorik, elastische Gelenke, variable Fingerlängen und eine 5-Finger-Variante.



## Tutorial-Übersicht



| Inhalt | Beschreibung |
|---|---|
| [Produktinformationen](./product-info.md) | Produktparameter, BOM, Aufbau und Downloads |
| [Montage des Umgebungskamera-Kits](./Camera-Kit-Installation.md) | Montageschritte für den Kamerakit-Halter |
| [Web-Gestenerkennung](./AmazingHand-Web-Control.md) | Online-Websteuerung und lokale Bereitstellung |
| [Gesten-Tracking (MuJoCo-Simulation)](./gesture-tracking/02-Windows.md) | Ein-Klick-Bereitstellung und -Ausführung für Windows / Linux / Mac |
| [Tutorial zur Interface-Steuerung](./AmazingHand-Interface-Control.md) | Python-GUI-/Kommandozeilensteuerung, Kalibrierung beider Hände und Protokoll |
| [Arduino-Nano-Tutorial](./Arduino-Nano-Tutorial.md) | Verdrahtung des Nano-Boards, Bibliotheksinstallation und Demo-Programm |
| [TTL-Serien-Servo-Debugging – Montage](./AmazingHand-TTL-Debugging.md) | Montage und Debugging der TTL-Serien-Servos |
| [PWM-Servo-Debugging](./pwm-debugging/01-GUI-Visual-Control.md) | GUI-Visualisierung, Gesten-Tracking und Benutzerhandbuch |



## Downloads



- [AmazingHand.zip](https://juxitech.feishu.cn/wiki/EoLawIK31i3xNNkVX8WcENGfn2d) — Ein-Klick-Bereitstellung für Gesten-Tracking (Windows / Linux / Mac)

- [SCS0009_ServoController.zip](https://juxitech.feishu.cn/wiki/Qp06wpL4HiALsMkWHsKchxvKnJc) — Kalibrierwerkzeug für Feetech-SCS0009-Servos

- [Offizielles AmazingHand-Repository](https://github.com/pollen-robotics/AmazingHand)
- [delivery_package.zip](/downloads/delivery_package.zip) — PWM-Lieferpaket（GUI / Gestenverfolgung / Firmware / Dokumentation）
- [Amazinghand-web.zip](/downloads/Amazinghand-web.zip) — Lokales Bereitstellungspaket
- [Juxi_ServoController.zip](/downloads/Juxi_ServoController.zip) — Servo-Debug-Tool


### Alle Seiten

- [AmazingHand Fingerhand Produktinformationen](./product-info.md)
- [Montage des Umgebungskamera-Kits](./Camera-Kit-Installation.md)
- [AmazingHand Web Control](./AmazingHand-Web-Control.md)
- [Windows Ein-Klick-Deployment und -Ausführung](./gesture-tracking/02-Windows.md)
- [Linux（Ubuntu）Ein-Klick-Deployment und -Ausführung](./gesture-tracking/01-Ubuntu.md)
- [Mac Ein-Klick-Deployment und -Ausführung](./gesture-tracking/03-macOS.md)
- [Tutorial zum offiziellen Beispiel der Roboterhand](./AmazingHand-Official-Example.md)
- [Tutorial zur Interface-Steuerung](./AmazingHand-Interface-Control.md)
- [Arduino-Nano-Tutorial](./Arduino-Nano-Tutorial.md)
- [Dexterous Hand (TTL-Servo) Debug-Tutorial](./AmazingHand-TTL-Debugging.md)
- [01-GUI-visuelle Steuerung](./pwm-debugging/01-GUI-Visual-Control.md)
- [02-Gesten-Tracking-Tutorial](./pwm-debugging/02-Gesture-Tracking.md)
- [03-PWM-Servo-Version - Handbuch](./pwm-debugging/03-PWM-Servo-Manual.md)
- [04-Serienservo-Version - Benutzungshinweise](./pwm-debugging/04-Serial-Servo-Guide.md)
- [Komplett-Workflow-Tutorial](./pwm-debugging/05-Full-Workflow-Tutorial.md)


<RelatedProducts slugs="amazinghand" />

