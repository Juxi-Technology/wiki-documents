---
title: "03 · Bluetooth"
description: "Il dispositivo integra un modulo Bluetooth (il lato wireless dello stesso canale seriale della porta TTL a 6 pin): una volta collegata una scheda di sviluppo…"
---

# 03 · Bluetooth

> [← Torna alla panoramica](/it/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Prodotto applicabile: JUXI Technology KVM&HUB&TTL

## A cosa serve il Bluetooth

Il dispositivo integra un modulo Bluetooth (**il lato wireless dello stesso canale seriale della porta TTL a 6 pin**): una volta collegata una scheda di sviluppo o un sensore alla porta TTL, i suoi dati vengono emessi non solo sulla porta seriale del PC ma **anche contemporaneamente via Bluetooth**; collegando un telefono puoi inviare e ricevere dati in modalità wireless.

> Per il cablaggio vedi [04 - Porta seriale TTL](/it/tutorials/accessories/kvm-switch/04-TTL-Serial-Port). La connessione Bluetooth e il trasferimento dati **non sono influenzati dalla commutazione del computer** (il collegamento resta attivo qualunque computer sia selezionato).

## Come funziona (leggi prima questo)

⚠️ **Il Bluetooth non è un «telecomando»** — è un **cavo seriale wireless**: trasporta i dati seriali tra il «dispositivo collegato al connettore a 6 pin» e il tuo «telefono/computer». **Senza un dispositivo esterno collegato, una connessione Bluetooth non mostra alcun dato — è normale.**

```
【Dispositivo esterno】   【Questo prodotto】       【Tu】
 Scheda/sensore ──6 pin──> passthrough seriale ──┬─ via cavo → seriale del PC (USB-BLE-SERIAL CH9143)
 (genera/riceve dati)                            └─ wireless → Bluetooth telefono/PC (app BleUart)
```

**Esempio 1: visualizzare i dati di assetto di un'IMU in modalità wireless**

1. Collega TX/RX/GND/5V del modulo IMU al connettore a 6 pin (incrociato, con alimentazione — vedi 04); l'IMU inizia a trasmettere;
2. Tieni premuto il pulsante di commutazione per circa 3 secondi per entrare in modalità Bluetooth (il LED si accende);
3. Collega l'app BleUart del telefono a `CH9143BLE2U`;
4. Sul telefono compaiono subito frame di dati continui (circa 80 fotogrammi/secondo di dati di assetto nel nostro test);
5. Contemporaneamente, uno strumento seriale sul PC aperto su `USB-BLE-SERIAL CH9143` mostra esattamente gli stessi dati.

**Esempio 2: debug wireless di Raspberry Pi / Jetson**

1. Collega Pin8(TXD)/Pin10(RXD)/GND del Raspberry Pi al connettore a 6 pin (incrociato);
2. Avvia il Raspberry Pi; il log di avvio viene emesso sulla porta seriale;
3. Collega l'app BleUart del telefono per **vedere il log di avvio in modalità wireless**;
4. Ciò che digiti nell'app viene emesso dal TXD del connettore a 6 pin verso il Raspberry Pi — il telefono diventa una **console seriale wireless** (login, invio comandi).

## Passaggi di connessione del telefono (4 passaggi)

1. **Tieni premuto il pulsante di commutazione per circa 3 secondi** finché il LED si accende — modalità Bluetooth (nome trasmesso: `CH9143BLE2U`);
2. Installa sul telefono l'app ufficiale WCH **«BleUart»** (cerca nello store delle app, gratuita);
3. Apri l'app → tocca «Connetti Bluetooth» → seleziona **CH9143BLE2U** dall'elenco;
4. Connessione riuscita (**senza password**) — puoi inviare e ricevere dati.

(Illustrazione: risorsa del tutorial 04 – Pressione lunga per la modalità Bluetooth)

## ⚠️ Avvisi importanti

- **Non usare l'«associazione» Bluetooth delle impostazioni di sistema del telefono**: chiederà un PIN e nessun PIN funzionerà — collega sempre i dispositivi BLE direttamente con l'**app BleUart**;
- Il modulo Bluetooth può essere collegato **a un solo dispositivo host alla volta** (mentre un telefono è collegato, un computer non può collegarsi via Bluetooth e viceversa). La **porta seriale** (USB) del PC non è interessata e può essere usata contemporaneamente.

## Risoluzione dei problemi

| Problema | Soluzione |
|---|---|
| CH9143BLE2U non trovato | Tieni di nuovo premuto il pulsante finché il LED si accende; verifica di essere entro 10 m |
| Richiesta PIN / connessione fallita | Annulla l'associazione di sistema e usa l'app BleUart |
| L'app non si connette | Forse occupato da un altro dispositivo (es. computer) — disconnetti prima l'altra connessione |
| Connesso ma senza dati | Il Bluetooth trasporta i dati seriali del connettore a 6 pin — verifica prima che il dispositivo esterno sia collegato alla porta TTL (vedi 04) |

<RelatedProducts slugs="kvm-switch" />
