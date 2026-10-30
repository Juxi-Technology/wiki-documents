---
title: "Calibrazione dei servo STS3215 della serie So-ARM - versione web"
description: "Calibrazione web dei servo STS3215 del So-ARM101: connessione dei bracci leader/follower tramite Web Serial del browser, calibrazione mediana e della corsa, teleoperazione, FT debugger ed esportazione dei file di calibrazione."
---

# Calibrazione dei servo STS3215 della serie So-ARM - versione web

> **Tool desktop:** [Tutorial d'uso del tool di calibrazione servo della serie SoARM](./SO-ARM101-Servo-Calibration-Tool.md)

La **versione web** del tool di calibrazione dei servo del So-ARM101: l'intera interfaccia funziona nel browser e si collega direttamente alla porta seriale tramite Web Serial, **senza bisogno di installare Python**.

Indirizzo online:

[https://juxi-technology.github.io/SO-ARM101-ServoController/](https://juxi-technology.github.io/SO-ARM101-ServoController/)

> ⚠️ Questo tool supporta solo **servo Feetech (serie STS3215)**.

## 1. Preparazione prima dell'uso

- **Browser**: Chrome o Edge 89+ (Firefox / Safari non supportano Web Serial)
- Aprire in **HTTPS o localhost**; GitHub Pages soddisfa già questo requisito
- **Adattatore USB-seriale** + servo Feetech STS3215, **baudrate predefinito di 1 M** (`1000000`)


## 2. Connessione del braccio robotico

1. Nella parte sinistra della barra superiore selezionare il «**baudrate di connessione**», predefinito `1000000`. **Se il baudrate del servo è stato modificato, selezionare quello corretto prima di connettersi**.
1. Fare clic su «**Connetti porta seriale**» del «braccio leader» o del «braccio follower» e scegliere la porta COM corrispondente nella finestra popup del browser.
1. Dopo la connessione viene eseguita automaticamente la scansione dei servo (ID 1–6).


> I due bracci possono essere collegati separatamente e gestiti in modo indipendente. Se la scansione non rileva alcun servo, verificare prima che il baudrate di connessione corrisponda a quello del servo, poi che la porta seriale non sia occupata da altri programmi.

## 3. Modalità demo (senza hardware)

Selezionare «**Modalità demo (senza hardware)**» nella barra superiore prima di connettersi: verrà usato un set di dati simulati di 6 servo per esplorare l'intera interfaccia.

> I dati in modalità demo sono simulati e **non azionano hardware reale**.

## 4. Tre pagine funzionali

### 🦾 Calibrazione servo

Mostra in tempo reale posizione, tensione, temperatura e stato della coppia di ciascun servo; offre le operazioni «calibrazione mediana», «test della posizione mediana», «disattiva motori» e «cancella limiti» per il singolo servo, oltre all'accesso alla calibrazione dell'intero braccio.

### 🎚️ Controllo singolo servo

Ogni servo occupa una riga: **ID / Pos / slider / L (target)**.

- **Pos e slider sono collegati in entrambe le direzioni**: trascinando lo slider, Pos lo segue e il comando viene inviato al rilascio; inserendo un valore in Pos, il comando viene inviato immediatamente.


### 🔬 FT debugger

Connessione seriale, scansione dei servo, lettura di tutti i registri, lettura/scrittura del singolo registro, controllo della posizione, modifica del baudrate, ripristino di fabbrica, backup/ripristino dei parametri xdat.

## 5. Flusso di calibrazione completo (consigliato)

1. Nella pagina «Calibrazione servo» fare clic su «**Calibrazione mediana del braccio leader**» per aprire la procedura guidata.
1. Fare clic su «**Avvia registrazione della posizione mediana**» (il pulsante diventa arancione) → posizionare il braccio robotico nella posizione mediana standard → fare clic su «**Termina registrazione della posizione mediana**».
1. Fare clic su «**Registra la corsa di movimento**» (il pulsante diventa verde) → ruotare ogni giunto dall'inizio alla fine (**anche la pinza va ruotata**) → fare di nuovo clic per fermarsi.
1. Al termine dei 6 giunti **il file di calibrazione viene salvato automaticamente**; ripetere l'operazione per il braccio follower.
1. Dopo aver calibrato entrambi i bracci, fare clic su «**🎮 Teleoperazione**» nella barra superiore per muovere il braccio follower con il braccio leader.


## 6. Dove si trova il file di calibrazione

Il browser può scaricare i file solo nella cartella «Download». Dopo il salvataggio la procedura guidata mostra il percorso di destinazione; **spostarlo manualmente in quella posizione**:

| Parte | Percorso di destinazione |
|---|---|
| Braccio leader | `~/.cache/huggingface/lerobot/calibration/teleoperators/so_leader/my_leader_arm.json` |
| Braccio follower | `~/.cache/huggingface/lerobot/calibration/robots/so_follower/my_follower_arm.json` |

Su Windows `~` corrisponde a `%USERPROFILE%`, e il percorso completo ha la forma `%USERPROFILE%.cache\huggingface\lerobot\calibration...`.

## 7. Teleoperazione

Dopo aver calibrato e collegato entrambi i bracci, fare clic su «**🎮 Teleoperazione**» nella barra superiore per pilotare il braccio follower con gli angoli del braccio leader. Fare di nuovo clic su «⏹ Ferma teleoperazione» per terminare.

> Prima della teleoperazione verificare che l'area attorno ai due bracci sia sicura: **con la coppia attiva i servo non possono essere mossi a mano**. La teleoperazione richiede due porte seriali connesse.

## 8. Dettagli dell'FT debugger

### Lettura e scrittura dei registri

- Fare clic su «**Leggi tutti i parametri**» per leggere tutti i registri del servo selezionato; i risultati vengono inseriti nella tabella dei parametri.
- **Facendo clic su una riga della tabella dei parametri vengono compilati indirizzo e lunghezza in alto; poi inserire il «valore» e fare clic su «scrivi**».
- Le righe grigie (area DEFAULT) **non sono leggibili né scrivibili**, per evitare scritture errate nelle aree di sola lettura.


### Controllo della posizione

Dopo aver selezionato il servo, impostare la posizione target con lo slider o un valore numerico e fare clic su «Muovi» per eseguire. Se la coppia non è attiva, viene chiesto prima se attivarla.

### Modifica del baudrate

Dopo aver selezionato il nuovo baudrate fare clic su «Applica»; una volta scritto, la connessione viene chiusa e si tenta di riconnettere al nuovo baudrate; in caso di errore il log indica il motivo.

### Ripristino delle impostazioni di fabbrica

Riporta l'ID a 1 e il baudrate a 1M, **ed è irreversibile**; l'esecuzione richiede una seconda conferma.

### Backup e ripristino dei parametri xdat

| Pulsante | Funzione |
|---|---|
| 💾 Salva il servo attuale come xdat | Legge tutti i parametri e scarica un file `.xdat` |
| 📂 Apri xdat | Carica un file `.xdat` locale |
| 📤 Ripristina parametri sul servo | Riscrive i parametri xdat nella EEPROM del servo attuale |

> Il ripristino sovrascrive impostazioni come ID, baudrate e limiti; prima di eseguirlo verificare che il servo selezionato sia corretto. La EEPROM ha una durata di scrittura limitata: non scriverla di frequente.

## 9. Note

1. **La pagina deve restare in primo piano**: il browser limita le schede in background, quindi teleoperazione e aggiornamento in tempo reale rallentano o si bloccano.
1. **La corsa di uno stesso giunto deve essere scansionata in modo coerente sui due bracci**, altrimenti durante la teleoperazione l'ampiezza del movimento non coinciderà.
1. **La pinza non è un giunto a rotazione continua e anche la sua corsa va scansionata**, altrimenti l'intervallo rimane quello predefinito 0–4095.
1. Nell'FT debugger **le righe grigie (area DEFAULT) non sono leggibili né scrivibili**; la EEPROM ha una durata di scrittura limitata: non scriverla di frequente.
1. **Prima della teleoperazione verificare che l'area attorno ai due bracci sia sicura**; con la coppia attiva i servo non possono essere mossi a mano.
1. Solo un programma può occupare la porta seriale alla volta: durante l'uso di questa pagina chiudere la versione desktop o altri programmi di controllo.


## 10. Domande frequenti

**D1: Impossibile connettersi / la scansione non rileva alcun servo.**
Verificare prima che il baudrate di connessione corrisponda a quello del servo, poi che la porta seriale non sia occupata da altri programmi.

**D2: Pos non si aggiorna.**
Verificare che il servo sia online; fare di nuovo clic su «Connetti porta seriale» o ricaricare la pagina.

**D3: Scrittura non riuscita.**
Consultare il motivo specifico nel log; verificare che indirizzo e lunghezza provengano da una riga della tabella dei parametri.

**D4: Viene segnalato che il browser attuale non supporta Web Serial.**
Usare Chrome / Edge 89+ e aprire la pagina tramite HTTPS o localhost.

**D5: Dopo il salvataggio LeRobot non trova il file di calibrazione.**
Il browser scarica solo nella cartella «Download»; il file va spostato manualmente nei percorsi elencati nella sezione 6.
