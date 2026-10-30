---
title: "Debug web dei servo bus Feetech (SCS0009 / STS3215 / HD1910)"
description: "Debug web dei servo bus Feetech: connessione tramite Web Serial del browser; supporta scansione, lettura/scrittura dei parametri, controllo della posizione, modifica del baudrate, ripristino di fabbrica e backup xdat per SCS0009 / STS3215 / HD1910."
---

# Debug web dei servo bus Feetech (SCS0009 / STS3215 / HD1910)

> **Tool desktop:** [Tutorial d'uso del tool di debug servo SCS0009](./SCS0009-Debug-Tool.md) ｜ [Tutorial di debug STS3215 & SCS0009](./Feetech-STS3215&SCS0009-Tutorial.md)

Versione web del tool di debug dei servo bus Feetech: il browser apre direttamente la porta seriale USB tramite **Web Serial** per comunicare con i servo, completando connessione seriale, scansione dei servo, identificazione del modello, lettura/scrittura dei parametri, controllo della posizione con inseguimento in tempo reale, modifica del baudrate, ripristino di fabbrica e backup/ripristino dei parametri xdat.

Pagina puramente statica, **senza necessità di installare software o un ambiente Python**: basta aprire l'URL. Attualmente supporta i modelli **SCS0009**, **STS3215** e **HD1910**.

## 1. Aprire la pagina web

Indirizzo online:

[https://juxi-technology.github.io/FT-ServoController-web/](https://juxi-technology.github.io/FT-ServoController-web/)

Nello stesso sito è disponibile anche un tutorial d'uso web completo (con cambio cinese/inglese):

[https://juxi-technology.github.io/FT-ServoController-web/guide.html](https://juxi-technology.github.io/FT-ServoController-web/guide.html)

Requisiti dell'ambiente:

- **Chrome o Edge 89+** (Firefox e Safari non supportano Web Serial)
- La pagina deve essere aperta tramite **https o localhost**
- È necessario installare il driver USB-TTL (CH340, CH343, CP2102, ecc.)


## 2. Connessione seriale

1. Nell'area «🔌 Connessione seriale» selezionare il **baudrate**; il valore predefinito è 1000000 (1M).
1. Fare clic su «**Connetti porta seriale**» e scegliere, nella finestra di sistema aperta dal browser, la porta USB corrispondente al servo.
1. Dopo la connessione, lo stato in alto a destra diventa «🟢 Connesso».


Baudrate disponibili: 1000000 / 500000 / 250000 / 128000 / 115200 / 76800 / 57600 / 38400.

## 3. Scansione dei servo e identificazione del modello

1. Dopo aver connesso la porta seriale, fare clic su «🔍 **Scansiona servo**». La pagina scansiona gli ID 1–254 e **mostra ogni servo non appena lo trova**, senza attendere il completamento dell'intera scansione.
1. Durante la scansione il pulsante diventa «⏹ **Interrompi scansione**» in rosso; fare di nuovo clic per interrompere. I servo già trovati vengono mantenuti.
1. Fare clic sul chip del servo (o sul menu a tendina in alto) per selezionare il servo desiderato.


Il modello viene determinato automaticamente dai **due byte degli indirizzi 3 / 4** del servo (versione principale e versione secondaria):

| Modello | Byte di identificazione (principale / secondaria) | Intervallo di posizione | Ordine dei byte |
|---|---|---|---|
| SCS0009 | 5 / 4 | 0–1023 | big-endian |
| STS3215 | 9 / 3 | 0–4095 | little-endian |
| HD1910 | 10 / 31 | 0–4095 | little-endian |

Il risultato dell'identificazione viene mostrato sul chip del servo, ad esempio **ID1 (SCS0009 · SCS)**; la tabella dei parametri e l'intervallo di posizione cambiano automaticamente in base al servo selezionato. I modelli non presenti nella tabella di identificazione vengono mostrati come «modello sconosciuto» e nel log vengono stampati i due byte effettivamente letti, per facilitarne l'aggiunta.

## 4. Tabella dei parametri

La tabella dei parametri mostra tutti i registri del servo selezionato in cinque colonne (**indirizzo, registro, valore, area di memoria, lettura/scrittura**); l'area di memoria si divide in EPROM, SRAM e DEFAULT ed è colorata per area.

> **Solo la riga con la colonna «lettura/scrittura» contrassegnata come scrivibile può essere selezionata e scritta**; i registri di sola lettura e l'area DEFAULT non sono selezionabili e non entrano nella riga di scrittura, evitando scritture errate nelle aree di sola lettura.

## 5. Lettura e scrittura dei parametri

**Lettura dei parametri**: dopo aver fatto clic sul chip per selezionare il servo desiderato, la pagina **legge automaticamente tutti i parametri del servo** e li inserisce nella tabella dei parametri, portando inoltre lo slider del controllo di posizione sulla posizione reale attuale. È anche possibile fare clic in qualsiasi momento su «📖 Leggi parametri» per aggiornare manualmente.

**Scrittura dei parametri**:

1. **Selezionare una riga** nella tabella dei parametri (solo le righe scrivibili sono selezionabili).
1. I campi «indirizzo di scrittura 0x» e «lunghezza» in basso vengono compilati automaticamente.
1. Inserire il nuovo valore nel campo «valore» e fare clic su «✏️ **Scrivi**».
1. Durante la scrittura in EEPROM, la pagina esegue automaticamente **sblocco → scrittura → blocco**; il risultato viene mostrato in un overlay con l'esito o il motivo dell'errore.


> Prima di modificare parametri come ID, baudrate o limiti di angolo, usare «Salva servo attuale» per creare un backup xdat, così da poterlo ripristinare in caso di errore.

## 6. Controllo della posizione

1. Dopo aver selezionato il servo, trascinare lo slider della **posizione target** nell'area «🎯 Controllo posizione» oppure inserire il valore direttamente nella casella numerica. L'intervallo varia in base al modello: **SCS0009 è 0–1023**, **STS3215 / HD1910 è 0–4095**; slider e casella numerica sono collegati in entrambe le direzioni.
1. Impostare la **velocità** (valore grezzo del registro; l'unità ha significati diversi a seconda della serie).
1. Fare clic su «▶ **Muovi**» per eseguire; la pagina esegue il polling del flag MOVING e al termine del movimento suggerisce di disattivare la coppia.


**Inseguimento in tempo reale**: dopo aver selezionato «inseguimento in tempo reale», il servo segue in tempo reale il trascinamento dello slider. Alla selezione viene prima richiesta una seconda conferma e viene attivata automaticamente la coppia del servo; l'invio è limitato per non saturare il bus. Cambiando servo, riscansionando o disconnettendo, la funzione si disattiva automaticamente e viene ricordato di disattivare la coppia.

Controllo della coppia:

| Pulsante | Funzione |
|---|---|
| ⚡ Attiva coppia | Attiva la coppia del servo attuale |
| ⏹ Disattiva coppia | Disattiva la coppia del servo attuale |
| ⏹ Disattiva tutte le coppie | Rilascia con un clic tutti i servo sul bus |

> **Se durante il movimento si verifica una disconnessione improvvisa, riconnettersi e disattivare subito la coppia.**

## 7. Lettura dello stato

Fare clic su «📊 Leggi stato»; la barra di stato in basso mostra posizione attuale, velocità, carico, tensione, temperatura, corrente e flag di funzionamento.

## 8. Modifica del baudrate

1. Nell'area «🔧 Baudrate / Ripristino di fabbrica» selezionare il **nuovo baudrate**.
1. Fare clic su «🔧 **Modifica baudrate**».
1. Dopo la scrittura, la pagina **riapre la porta seriale alla nuova velocità e verifica rileggendo**; in caso di errore **esegue il rollback automatico** al baudrate originale, evitando che il servo diventi irraggiungibile.


## 9. Ripristino di fabbrica

Fare clic su «🔄 **Ripristina di fabbrica**»; l'esecuzione richiede una **seconda conferma**. Il comando di ripristino varia a seconda della serie e la pagina lo seleziona automaticamente in base al modello identificato:

| Modello | Comando di ripristino | Dopo l'esecuzione |
|---|---|---|
| SCS0009 | 0x0A ripristino di fabbrica | L'ID torna a 1 e il baudrate torna a 1M |
| STS3215 / HD1910 | 0x06 ripristino dei parametri | L'ID resta invariato, gli altri parametri tornano ai valori predefiniti |

> Il ripristino di fabbrica è **irreversibile**; prima di eseguirlo si consiglia di salvare un xdat.

## 10. Backup e ripristino dei parametri xdat

L'area «📁 Parametri xdat (salvataggio solo EEPROM)» offre tre operazioni:

| Pulsante | Funzione |
|---|---|
| 💾 Salva servo attuale | Legge tutti i parametri del servo e li scarica come file .xdat |
| 📂 Apri xdat | Carica un file .xdat locale e ne mostra l'anteprima del contenuto |
| 📤 Ripristina parametri sul servo | Riscrive nella EEPROM del servo attuale i parametri xdat caricati |

Il nome del file salvato include **modello e ID**, ad esempio **SCS0009_ID1.xdat** o **HD1910_ID6.xdat**, per evitare che lo stesso ID di modelli diversi si sovrascriva a vicenda.

Il formato del file è «intestazione di 2 byte + area dati di 49 byte»; l'indirizzo di registro A è memorizzato all'offset A+2 e i valori multibyte sono memorizzati secondo l'ordine dei byte del modello (SCS big-endian, STS / HD1910 little-endian).

> Per evitare scritture errate dei parametri, la pagina verifica se il file e il servo attuale appartengono alla stessa famiglia di ordine dei byte e **vieta la scrittura in caso di mancata corrispondenza**. Durante il ripristino vengono scritti solo i parametri EEPROM scrivibili, saltando il modello e le aree di sola lettura; l'area dati copre solo gli indirizzi 0–48. Prima del ripristino, verificare che l'ID del servo selezionato sia corretto.

## 11. Log

Il «📜 Log» in fondo alla pagina registra in tempo reale ogni operazione e il risultato restituito; è possibile fare clic su «Cancella» per svuotarlo.

L'interfaccia supporta il **cambio cinese/inglese**: il pulsante «EN / English» in alto a destra cambia immediatamente la lingua dell'interfaccia e del log, e anche il log storico viene aggiornato, senza bisogno di riconnettersi.

## 12. Avvertenze di sicurezza

- ⚠️ Solo un programma può occupare la porta seriale alla volta. Durante l'uso di questa pagina chiudere altri programmi come il tool desktop o il monitor seriale.
- ⚠️ Se si scollega il cavo durante un movimento, il servo potrebbe continuare a eseguirlo: dopo la riconnessione **disattivare subito la coppia**.
- ⚠️ Eseguire sempre cablaggio e connessioni con l'alimentazione scollegata.
- ⚠️ Prima di lasciare la pagina, è possibile fare clic su «⏹ Disattiva tutte le coppie» per rilasciare tutti i servo con un clic.


## 13. Domande frequenti

**D1: La pagina segnala che Web Serial non è supportato o non è possibile connettersi.**
Usare Chrome / Edge 89+ e accedere tramite https o localhost. Firefox e Safari non implementano Web Serial.

**D2: Connessione fallita con avviso di impossibile apertura della porta seriale.**
Verificare che la porta seriale non sia occupata da altri programmi (tool desktop, monitor seriale, Arduino IDE, ecc.) e che il driver USB-TTL sia installato.

**D3: La scansione non rileva alcun servo.**
Verificare che il cablaggio sia corretto, che il servo sia alimentato e che il baudrate corrisponda a quello del servo. Se il baudrate del servo è stato modificato, provare prima le altre opzioni; se sul bus c'è un conflitto di ID, due servo rispondono contemporaneamente: collegarne uno solo per la diagnosi.

**D4: Alcune righe della tabella dei parametri non sono selezionabili.**
È il comportamento previsto: solo le righe con la colonna «lettura/scrittura» contrassegnata come scrivibile possono essere selezionate e scritte; i registri di sola lettura e l'area DEFAULT non sono scrivibili.

**D5: Cosa fare se la modifica del baudrate fallisce.**
La pagina esegue automaticamente il rollback al baudrate originale e indica il motivo dell'errore; controllare il cablaggio e riprovare.

**D6: Cosa fare se il servo mostra «modello sconosciuto».**
Significa che i due byte degli indirizzi 3 / 4 del servo non sono nella tabella di identificazione. Attualmente sono supportati solo SCS0009, STS3215 e HD1910; è possibile consultare i valori di «versione principale / versione secondaria» nel log e comunicarceli per integrarli.

**D7: Il comportamento non cambia dopo l'aggiornamento della pagina.**
Il browser memorizza nella cache gli script; forzare il ricaricamento (Windows: Ctrl+Shift+R; macOS: Cmd+Shift+R).
