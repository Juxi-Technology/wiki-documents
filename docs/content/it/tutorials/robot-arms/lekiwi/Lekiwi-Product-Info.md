---
title: Informazioni sul prodotto
---

# Informazioni sul prodotto

> **[Acquista nel negozio](https://www.juxitech.com/it/products/lekiwi-embodied-intelligence-mobile-robotic-car)**

## Panoramica del prodotto

LeKiwi è sviluppato sotto la guida di SIGRobotics-UIUC (il gruppo di interesse per la robotica dell'Università dell'Illinois a Urbana-Champaign). Fornisce una piattaforma robotica open source a basso costo e altamente flessibile, che promuove la diffusione della tecnologia robotica nell'istruzione, nella ricerca e nell'automazione industriale. Il suo design hardware (file per la stampa 3D), lo stack software (compatibile con il framework LeRobot) e i tutorial sono tutti open source, e supporta estensioni definite dall'utente.

LeKiwi è composto da una piattaforma mobile e da un braccio leader-follower. Il braccio leader-follower utilizza componenti stampati in 3D come struttura e 6 servo Feetech da 12V come articolazioni motorie. Il braccio leader si trova su una piattaforma fissa, utilizza una scheda driver del servo e si collega a un computer tramite USB-C. Il braccio follower è montato sulla piattaforma mobile, che è azionata da 3 servo Feetech da 12V; utilizza una scheda driver del servo ed è controllato tramite USB-C collegato a un Raspberry Pi.

LeKiwi integra profondamente LeRobot (il framework open source di Hugging Face per l'apprendimento automatico applicato ai robot), supportando l'apprendimento per imitazione, la raccolta dati e l'addestramento delle policy. È implementato su PyTorch e include modelli preaddestrati, dataset e un ambiente di simulazione, ed è compatibile con noti dataset open source come Stanford ALOHA. Utilizza il framework DORA (un motore di dataflow distribuito) per ottenere una comunicazione hardware-algoritmo a bassa latenza (le prestazioni di Python sono 17 volte più rapide di ROS2) e supporta l'hot reloading, così il codice può essere modificato in tempo reale senza riavvio.

LeKiwi è particolarmente adatto all'istruzione e alla ricerca di livello introduttivo: insegnamento introduttivo alla robotica, con tutorial end-to-end che coprono tutto, dall'assemblaggio e dalla programmazione fino alla distribuzione delle policy di IA; validazione della ricerca: supporta la ricerca sull'apprendimento per imitazione (ad esempio, addestrare un robot partendo da video di operazioni umane registrati tramite VR), con il caso del robot pollen Ready2 che apprende compiti come piegare i vestiti e inserire chiavi dopo appena 2 ore di addestramento su 50 video da 15 secondi; prototipazione industriale: validazione a basso costo di soluzioni di automazione (come la movimentazione dei materiali e l'assemblaggio di precisione).
