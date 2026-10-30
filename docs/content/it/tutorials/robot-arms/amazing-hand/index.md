---

title: "Tutorial d'uso della mano abile AmazingHand"

description: "Tutorial completo della mano abile open source AmazingHand: informazioni sul prodotto, kit fotocamera, riconoscimento dei gesti via web, tracciamento dei gesti con MuJoCo, controllo dell'interfaccia, Arduino Nano e debug TTL e PWM."

---



# Tutorial d'uso della mano abile AmazingHand



AmazingHand è un progetto open source di mano umanoide dal costo inferiore a 250 dollari, pensato per appassionati di robotica, ricercatori e sviluppatori.



## Introduzione al progetto



- **Progettazione meccanica**: 8 gradi di libertà, 4 dita, 2 articolazioni per dito con movimento accoppiato; le dita sono azionate da meccanismi paralleli, senza cavi esterni, con tutti gli attuatori integrati nella mano; parti stampate in 3D, peso di circa 400 g e costo inferiore a 200 euro.

- **Soluzione di controllo**: pilotaggio del bus seriale dei servo in Python (compatibile con hardware come Waveshare); doppia opzione Arduino + Feetech TTL Linker; esempi di codice in Python e Arduino; supporto per feedback quali attivazione/disattivazione della coppia del servo, sensore di posizione e monitoraggio della temperatura.

- **Risorse complete**: distinta materiali (BOM) completa, file CAD e documentazione online su Onshape, tutorial di assemblaggio e script di calibrazione, esempi dimostrativi di base e avanzati, con supporto per cinematica inversa/diretta.

- **Punti salienti del progetto**: compatibile con polsi di robot come Reachy2; design aperto e guidato dalla comunità; la roadmap futura include sensori tattili, articolazioni elastiche, lunghezze delle dita variabili e una soluzione a 5 dita.



## Indice dei tutorial



| Contenuto | Descrizione |
|---|---|
| [Informazioni sul prodotto](./product-info.md) | Parametri del prodotto, BOM, struttura e download dei materiali |
| [Installazione del kit fotocamera ambientale](./Camera-Kit-Installation.md) | Passaggi di montaggio del supporto del kit fotocamera |
| [Web: riconoscimento dei gesti](./AmazingHand-Web-Control.md) | Controllo web online e distribuzione locale |
| [Tracciamento dei gesti (simulazione MuJoCo)](./gesture-tracking/02-Windows.md) | Distribuzione ed esecuzione in un clic su Windows / Linux / Mac |
| [Tutorial sul controllo dell'interfaccia](./AmazingHand-Interface-Control.md) | Controllo con GUI Python / riga di comando, calibrazione della mano sinistra e destra e protocollo |
| [Tutorial d'uso di Arduino Nano](./Arduino-Nano-Tutorial.md) | Cablaggio della scheda Nano, installazione delle librerie e programma dimostrativo |
| [Debug e assemblaggio dei servo seriali TTL](./AmazingHand-TTL-Debugging.md) | Assemblaggio e debug dei servomotori seriali TTL |
| [Debug dei servo PWM](./pwm-debugging/01-GUI-Visual-Control.md) | GUI visuale, tracciamento dei gesti e manuale d'uso |



## Download delle risorse



- [AmazingHand.zip](https://juxitech.feishu.cn/wiki/EoLawIK31i3xNNkVX8WcENGfn2d) — distribuzione in un clic del tracciamento dei gesti (Windows / Linux / Mac)

- [SCS0009_ServoController.zip](https://juxitech.feishu.cn/wiki/Qp06wpL4HiALsMkWHsKchxvKnJc) — strumento di calibrazione per i servo Feetech SCS0009

- [Repository ufficiale di AmazingHand](https://github.com/pollen-robotics/AmazingHand)
- [delivery_package.zip](/downloads/delivery_package.zip) — Pacchetto di consegna PWM（GUI / tracciamento dei gesti / firmware / documentazione）
- [Amazinghand-web.zip](/downloads/Amazinghand-web.zip) — Pacchetto di distribuzione locale
- [Juxi_ServoController.zip](/downloads/Juxi_ServoController.zip) — Strumento di debug servo


### Tutte le pagine

- [Scheda prodotto AmazingHand](./product-info.md)
- [Installazione del kit fotocamera ambientale](./Camera-Kit-Installation.md)
- [AmazingHand Web Control](./AmazingHand-Web-Control.md)
- [Distribuzione ed esecuzione in un clic su Windows](./gesture-tracking/02-Windows.md)
- [Distribuzione ed esecuzione in un clic su Linux（Ubuntu）](./gesture-tracking/01-Ubuntu.md)
- [Distribuzione ed esecuzione in un clic su Mac](./gesture-tracking/03-macOS.md)
- [Tutorial di esecuzione dell'esempio ufficiale della mano robotica](./AmazingHand-Official-Example.md)
- [Tutorial sul controllo dell'interfaccia](./AmazingHand-Interface-Control.md)
- [Tutorial d'uso di Arduino Nano](./Arduino-Nano-Tutorial.md)
- [Tutorial di debug della mano dexterous (servo TTL)](./AmazingHand-TTL-Debugging.md)
- [01-Controllo visuale tramite GUI](./pwm-debugging/01-GUI-Visual-Control.md)
- [02-Tutorial del tracciamento dei gesti](./pwm-debugging/02-Gesture-Tracking.md)
- [03-Versione con servomotori PWM-Manuale d'uso](./pwm-debugging/03-PWM-Servo-Manual.md)
- [04-Versione con servomotori seriali-Istruzioni per l'uso](./pwm-debugging/04-Serial-Servo-Guide.md)
- [Tutorial completo](./pwm-debugging/05-Full-Workflow-Tutorial.md)


<RelatedProducts slugs="amazinghand" />

