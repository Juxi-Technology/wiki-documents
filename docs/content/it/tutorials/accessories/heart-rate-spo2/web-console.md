---
title: "Tutorial della versione web"
description: "Usare il software per PC in versione browser (Web Serial) per collegare e monitorare il modulo di frequenza cardiaca e SpO2 MAX30102, senza installare software."
---

# Tutorial della versione web

Questo tutorial spiega come usare il software per PC in versione browser per collegare e monitorare il modulo di frequenza cardiaca e SpO2. La versione web accede direttamente alla porta seriale tramite Web Serial, senza installare Python o un `.exe`, e funziona su Windows, macOS e Linux.

**Indirizzo online:**[https://juxi-technology.github.io/JUXI_HeartRate_SPO2/](https://juxi-technology.github.io/JUXI_HeartRate_SPO2/)

> La versione web usa lo stesso protocollo Modbus RTU del software per PC desktop (indirizzo slave `0x20`, 9600 baud) e le letture sono del tutto identiche.

## 1. Requisiti dell'ambiente

- **Chrome, Edge o Opera** desktop (con supporto Web Serial)
- Safari, Firefox e i browser mobili non implementano Web Serial e non possono collegarsi alla porta seriale
- Driver USB-TTL (CH340, CP2102, FT232, ecc.)
- La pagina richiede una connessione a Internet per caricarsi
- Il browser autorizza la pagina a un solo dispositivo seriale alla volta

## 2. Collegamento hardware

| Modulo di frequenza cardiaca e SpO2 | Adattatore USB-TTL |
|---|---|
| **VCC** | **5V** (non collegare a 3,3V) |
| **GND** | **GND** |
| **TX** | **RX** (collegamento incrociato) |
| **RX** | **TX** (collegamento incrociato) |

⚠️ TX e RX devono essere collegati in modo incrociato. Dopo aver completato i collegamenti, inserire l'adattatore USB-TTL nel computer.

## 3. Collegamento del dispositivo

1. Aprire l'indirizzo online indicato sopra con Chrome / Edge / Opera desktop.
1. Mantenere il baud rate su **9600**, uguale a quello del modulo.
1. Fare clic su «**Connetti porta seriale**» e nella finestra popup del browser selezionare il dispositivo seriale USB corrispondente al modulo.
1. Quando lo stato mostra «**Connesso, in attesa di acquisizione**», il collegamento è riuscito e accanto al pulsante viene mostrato il dispositivo selezionato.

> I parametri della porta seriale sono fissi: 8 bit di dati, 1 bit di stop, nessuna parità e nessun controllo di flusso; vengono impostati automaticamente dalla pagina, senza configurazione manuale.

## 4. Avvio dell'acquisizione e monitoraggio

1. Fare clic su «**Avvia acquisizione**»: il LED del modulo si accende e lo stato diventa «Acquisizione avviata, LED acceso».
1. Mettere il dito sul sensore coprendo completamente l'area ottica; è sufficiente appoggiarlo delicatamente, senza premere con forza.
1. Fare clic su «**Avvia monitoraggio**»: lo stato diventa «Monitoraggio in corso...» e i dati in tempo reale iniziano ad aggiornarsi.

## 5. Descrizione dell'interfaccia

### Dati in tempo reale

| Metrica | Unità | Descrizione |
|---|---|---|
| Ossigeno nel sangue (SPO2) | % | Saturazione di ossigeno |
| Frequenza cardiaca | battiti/min | Frequenza del polso |
| Temperatura | °C | Temperatura a bordo del modulo, non temperatura corporea |

**Filtro**: attivo per impostazione predefinita. Applica alle letture un livellamento a mediana su 5 punti ed elimina i valori anomali fuori dagli intervalli ragionevoli (frequenza cardiaca 35–220, SpO2 70–100 %, temperatura 0–60 °C). Il numero di valori eliminati viene mostrato sotto l'area dei dati, ad esempio «N valori anomali eliminati». Deselezionando la casella è possibile vedere le letture grezze non elaborate.

**Messaggi di stato**: non connesso / in attesa di selezione del dispositivo… / connesso, in attesa di acquisizione / acquisizione avviata, LED acceso / acquisizione chiusa, LED spento / monitoraggio in corso… / monitoraggio arrestato / dispositivo disconnesso / il browser attuale non supporta Web Serial.

### Cambio lingua

Il pulsante **EN / 中文** nell'angolo in alto a destra cambia la lingua dell'interfaccia. Il browser memorizza la scelta del baud rate e dell'interruttore del filtro e mantiene l'ultima configurazione alla riapertura.

### Scheda della documentazione d'uso

La scheda «**Documentazione d'uso**» in alto contiene i tutorial di questo prodotto in 11 lingue e permette di cambiare lingua e leggerli direttamente nella pagina.

## 6. Arresto e disconnessione

Si consiglia di procedere in questo ordine:

1. Fare clic su «Arresta monitoraggio»
1. Fare clic su «Chiudi acquisizione»: il LED si spegne
1. Fare clic su «Disconnetti»

## 7. Interpretazione dei dati

| Dato | Intervallo normale | Descrizione |
|---|---|---|
| Ossigeno nel sangue SpO2 | 95% – 100% | Sotto il 90 % si consiglia di consultare un medico |
| Frequenza cardiaca | 60 – 100 battiti/min | Intervallo a riposo di un adulto |
| Temperatura | 25 – 35 °C | Temperatura del sensore a bordo, non temperatura corporea |

È normale che venga mostrato `-1` appena connesso o se il dito non è posizionato bene.

## 8. Differenze rispetto al software per PC desktop

| Aspetto | Versione web | Software per PC desktop |
|---|---|---|
| Installazione | Nessuna installazione richiesta | Richiede l'esecuzione di un `.exe` o di uno script Python |
| Ambiente di esecuzione | Browser | Windows |
| Modalità di comunicazione | Web Serial | Porta seriale di sistema |
| Uso offline | Non supportato; la pagina richiede Internet | Supportato |
| Protocollo e letture | Identici | Identici |

## 9. Domande frequenti

**D1: Viene mostrato «il browser attuale non supporta Web Serial».**
Usare Chrome, Edge o Opera desktop. Safari, Firefox e i browser mobili non implementano Web Serial.

**D2: Dopo aver fatto clic su «Connetti porta seriale», nella finestra popup non compare alcun dispositivo.**
Verificare che il driver USB-TTL sia installato e che il cavo dati supporti il trasferimento dati; provare con un'altra porta USB o ricollegare il cavo.

**D3: La connessione non riesce.**
Verificare che la porta seriale non sia occupata da altri programmi (terminale seriale, Arduino IDE, ecc.) e che il dispositivo sia alimentato.

**D4: Il LED non si accende dopo aver fatto clic su «Avvia acquisizione».**
Verificare che VCC sia collegato a 5V e non a 3,3V e controllare che TX/RX siano collegati in modo incrociato.

**D5: I dati mostrano sempre -1.**
Verificare di aver fatto clic su «Avvia acquisizione», che il dito copra completamente l'area ottica del sensore e che rimanga stabile per alcuni secondi.

**D6: Il dispositivo è stato scollegato.**
La pagina mostrerà «dispositivo disconnesso»; ricollegarlo e fare di nuovo clic su «Connetti porta seriale».

## 10. Precauzioni

1. Collegare prima il sensore, poi l'USB.
1. Il sensore deve essere alimentato a 5V; con 3,3V potrebbe non funzionare correttamente.
1. Durante la misurazione coprire completamente l'area ottica con il dito e non premere con forza.
1. Evitare la luce intensa diretta sul sensore.
1. Il browser autorizza un solo dispositivo seriale alla volta; per più dispositivi occorre collegarli separatamente.
