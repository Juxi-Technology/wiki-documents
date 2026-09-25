---
title: Braccio robotico SO-ARM101 7-DOF
category: robot
description: "Braccio robotico open source SO-ARM101 7-DOF di Juxi Technology — imbardata del polso a 90°, servo a bus 12V 30kg.cm e integrazione LeRobot"
keywords: [so-arm101, 7-dof, 7 assi, braccio robotico, leRobot, teleoperazione, apprendimento per imitazione]
---

# Braccio robotico SO-ARM101 7-DOF

> **[Acquista nel negozio](https://www.juxitech.com/products/so-arm101-open-source-7-dof-robotic-arm)**

## Panoramica

SO-ARM101 è un braccio robotico open source profondamente ottimizzato a partire dal SO-ARM100. Il percorso dei cavi e gli abbinamenti motore/riduttore rivisti eliminano il problema della rottura dei cavi nei giunti, e gli aggiornamenti prestazionali supportano l'inseguimento leader-follower in tempo reale. **Questa è la versione 7-DOF**: aggiunge al modello a 6 assi un servomotore per l'imbardata del polso, offrendo al polso una libertà di postura molto maggiore, più punti raggiungibili e una presa di precisione multi-angolo.

Si adatta al toolkit **LeRobot** di Hugging Face e si collega direttamente ai modelli PyTorch e ai dataset condivisi, così l'apprendimento per imitazione e l'apprendimento per rinforzo sono facili da mettere in pratica. Sono inclusi un tutorial di assemblaggio completo e un kit fai-da-te: studenti, ricercatori e maker possono dedicarsi alla robotica intelligente per l'apprendimento, la ricerca e la creazione.

**In sintesi**: 7-DOF con imbardata del polso a 90° · servo 12V ad alta coppia da 30kg.cm · pinza flessibile in TPU opzionale · raccolta dati a doppia vista · inferenza a bordo su NVIDIA Jetson e D-Robotics RDK · assemblato in fabbrica e pronto all'uso · supporta l'addestramento dei modelli ACT / SmolVLA / Pi0 / Pi0.5 / GR00T N1.5.

## Vantaggi principali

### 7 gradi di libertà con imbardata del polso a 90°

La versione 7-DOF aggiunge al progetto a 6 assi un servomotore per l'imbardata del polso (rotazione sinistra/destra), così il polso può avvicinarsi a un obiettivo da molti più angoli e raggiungere più punti nello spazio di lavoro. È questa libertà in più a rendere possibile una presa fine e multi-angolo.

### Teleoperazione leader-follower e apprendimento per imitazione

Il braccio integra il framework AI di Hugging Face. Si teleopera il braccio leader per registrare i movimenti dimostrativi, quindi si addestra un modello di apprendimento per imitazione in un'unica passata e si distribuisce la policy ottimizzata. Può affrontare compiti complessi e adattarsi all'ambiente, chiudendo end-to-end il ciclo dell'automazione.

### Copertura globale a doppia vista

La telecamera montata sul braccio cattura a distanza ravvicinata posizione spaziale, angolo e texture superficiale del bersaglio, per una raccolta dati più fedele, mentre una telecamera di scena su supporto da tavolo legge in tempo reale l'ambiente di lavoro. Insieme mantengono l'operazione precisa, reagiscono rapidamente ai cambiamenti e prevengono derive o stalli.

### Servo a bus 12V ad alta coppia da 30kg.cm

Il braccio follower è uniformato a 7 × Feetech STS3215-C018 (12V, 30kg.cm, 1:345) per garantire una coppia di presa sufficiente sotto carico multi-asse, mentre il braccio leader resta a 7.4V per bilanciare la sensazione di trascinamento rispetto al costo. Un encoder magnetico a 12 bit garantisce una precisione di 0.088° su ogni asse.

### Supporto all'addestramento multi-modello

Si possono addestrare e distribuire policy ACT, SmolVLA, Pi0, Pi0.5 e GR00T N1.5 sullo stesso hardware, e riutilizzare modelli pre-addestrati come `lerobot/smolvla_base`, `lerobot/pi0_base`, `lerobot/pi05_base` e `lerobot/xvla-widowx` direttamente dall'hub dei modelli LeRobot.

### Inferenza a bordo su NVIDIA e D-Robotics RDK

Con un solo cavo collegato a un controller Raspberry Pi, D-Robotics RDK o NVIDIA Jetson si esegue l'inferenza direttamente sul braccio, con controllo dei motori e feedback dell'encoder in tempo reale.

### Assemblato in fabbrica, pronto all'uso

Ogni unità viene spedita assemblata, cablata e calibrata: basta collegare alimentazione e USB e la piattaforma è pronta per teleoperazione e raccolta dati.

### Pinza flessibile aggiornabile

La pinza flessibile è un upgrade della pinza rigida standard, stampata in 3D in materiale TPU flessibile. Utilizza un design cavo con nervature di rinforzo interne e si basa su un principio di presa a lamelle flessibili: si conforma alla forma dell'oggetto afferrato, riducendo la forza di contatto applicata — ideale per oggetti morbidi o facilmente danneggiabili (frutta, oggetti in vetro, uova, lavorazione alimentare) che una pinza rigida convenzionale non può gestire in sicurezza.

## Specifiche

| Categoria | Specifica |
|----------|------|
| Tipo | Braccio robotico di teleoperazione leader-follower |
| DOF | 7 (aggiunge un asse di imbardata del polso rispetto al modello a 6 assi) |
| Servo del braccio follower | 7 × Feetech STS3215-C018 (12V, 30kg.cm, 1:345) |
| Servo del braccio leader | 7 × STS3215 da 7.4V — versione con smorzamento: 1 × C001 (1:345) + 2 × C044 (1:191) + 3 × C046 (1:147); versione a smorzamento zero: 7 × C066 |
| Encoder | Encoder magnetico a 12 bit (precisione 0.088°) |
| Alimentazione | Leader 5V6A / Follower 12V5A |
| Host | PC (Linux) / Raspberry Pi / D-Robotics RDK / NVIDIA Jetson |
| Ecosistema | Hugging Face LeRobot (ACT / SmolVLA / Pi0 / Pi0.5 / GR00T N1.5) |
| Pinza | PLA rigido (standard) o TPU flessibile (upgrade) |
| Assemblaggio | Assemblato, cablato e calibrato in fabbrica |

*Le configurazioni dei servomotori e i pacchetti disponibili sono indicati nella pagina del negozio.*

## Tutorial

- **[Corso completo SO-ARM101 7-DOF](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/)** — configurazione dell'ambiente, sostituzione dei file 7-DOF, calibrazione, teleoperazione, raccolta dati, addestramento e inferenza, passo dopo passo
- [Sostituzione dei file 7-DOF (adattare un clone ufficiale di lerobot)](/it/tutorials/robot-arms/so-arm101/lerobot-7dof/02-Replace-Files-7DOF)
- [Tutorial SO-ARM101 (6 assi)](/it/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Guida alla scelta del braccio robotico](/it/tutorials/robot-arms/select-guide)
- [Introduzione all'IA incarnata (LeRobot)](/it/topics/embodied-ai-intro)

## Supporto

- 📧 E-mail: support@juxitech.com
- 🌐 Sito ufficiale: [www.juxitech.com](https://www.juxitech.com)
