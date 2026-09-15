---
title: "Creazione di voci con protocollo personalizzato"
description: "Il modulo è già stato caricato in fabbrica con il firmware con funzione di riconoscimento vocale e il firmwar…"
---

# Creazione di voci con protocollo personalizzato

## 1. Creazione del firmware del chip vocale

## 1.1 Precauzioni

Il modulo è già stato caricato in fabbrica con il firmware con funzione di riconoscimento vocale e il firmware di fabbrica è fornito anche nell'archivio delle risorse; se occorre ricreare il firmware, è possibile seguire i passaggi riportati di seguito.

## 1.2 Creazione del firmware

Occorre innanzitutto aprire il link "[Piattaforma AI vocale Chipintelli](https://aiplatform.chipintelli.com/)" per accedere al sito ufficiale di creazione del firmware.  Fare clic su “Sviluppo funzioni” nella barra dei menu, quindi su “Applicazione di grandi modelli per il riconoscimento vocale offline” nella colonna dello sviluppo prodotto.

![Immagine 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/1.png)

A questo punto verrà richiesto di effettuare l'accesso; è necessario registrare un account sulla piattaforma con i propri dati (l'account di questo tutorial è stato registrato in anticipo). Dopo l'accesso, fare nuovamente clic su “Sviluppo firmware e SDK per il riconoscimento vocale”.

![Immagine 2](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/2.png)

Dopo il reindirizzamento della pagina, fare clic su Nuovo progetto a sinistra e creare un prodotto come mostrato nella figura seguente; il nome e la descrizione del prodotto possono essere personalizzati, mentre le altre informazioni devono essere selezionate in base al contenuto del riquadro rosso. Per il tipo di prodotto occorre selezionare “通用->智能中控”. Al termine, fare clic su Crea.

![Immagine 3](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/3.png)

Successivamente occorre compilare le informazioni di base del progetto. Dobbiamo riconoscere il cinese, quindi selezionare “cinese” come tipo di lingua; se occorre riconoscere l'inglese è possibile modificarlo di conseguenza. Per le altre informazioni è sufficiente selezionare quanto mostrato nella figura seguente, quindi fare clic su Continua.

![Immagine 4](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/4.png)

Occorre poi configurare il firmware; qui illustriamo solo le parti da modificare. Attivare la cancellazione dell'eco nei parametri dell'algoritmo.

![Immagine 5](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/5.png)

Nei parametri hardware occorre selezionare “RC interno” come sorgente dell'oscillatore a cristallo.

![Immagine 6](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/6.png)

Nella configurazione della porta seriale di stampa, impostare il livello di UART0 come open-drain, con supporto al pull-up esterno a 5V.

![Immagine 7](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/7.png)

Modificare la configurazione della porta seriale di comunicazione: impostare il baud rate a 115200 e configurare il livello di UART1 come open-drain, con supporto al pull-up esterno a 5V. Al termine della configurazione, fare clic su “Continua” per passare al passaggio successivo.

![Immagine 8](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/8.png)

Si passa ora alla funzione di modifica delle parole di comando. Occorre innanzitutto selezionare il timbro da riprodurre; qui selezioniamo “小蝶-清新女声 Ver.3”.

![Immagine 9](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/9.png)

Carichiamo poi l'allegato delle parole di comando: individuare la tabella “命令词播报词协议列表V1_中文” nello stesso percorso di questo documento e trascinarla direttamente nella pagina web per caricarla.

![Immagine 10](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/10.png)

Dopo aver caricato il file, i dati delle parole di comando saranno visibili nella tabella sottostante.

![Immagine 11](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/11.png)

Attivare la funzione di autoapprendimento e selezionare l'apprendimento specificato; il sistema genererà automaticamente 4 comandi di autoapprendimento, che qui non modifichiamo.

![Immagine 12](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/12.png)

Dopo l'invio, attendere alcuni minuti per completare la creazione del firmware; al termine, fare clic su Scarica firmware per ottenere il firmware creato.

![Immagine 13](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/13.png)

Per i passaggi del flashing del firmware è possibile consultare "[Flash del firmware del modulo](https://juxitech.feishu.cn/wiki/FfE8wbL1wipUWgkUKW6cbsw2nOe)".

## 2. Modifica delle voci funzionali

Aprire negli allegati il file 命令词播报词协议列表V1_中文.

![Immagine 14](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/14.png)

Individuare nella tabella le voci funzionali, ovvero le prime 10 voci. Si noti che queste prime 10 voci funzionali sono tutte voci fisse: non possono essere aggiunte, ma solo modificate.

![Immagine 15](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/15.png)

Qui prendiamo come esempio la modifica della frase di riproduzione della parola di attivazione: cambiare la riproduzione da “在的” a “我在” dopo il riconoscimento di “你好，小犀”.

![Immagine 16](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/16.png)

Al termine delle modifiche, salvare. Seguire quindi i passaggi di “1.2 Creazione del firmware” per importare la tabella nel sito web. Se è già stato creato un firmware in precedenza, è possibile fare clic sul pulsante “Eredita” nel progetto precedente, risparmiando così i passaggi di configurazione dei parametri.

![Immagine 17](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/17.png)

Dopo aver ricreato il firmware, occorre anche caricarlo nel modulo di interazione vocale: in questo modo sarà possibile modificare le voci funzionali.

## 3. Aggiunta di nuove voci di comando

Aprire negli allegati il file 命令词播报词协议列表V1_中文.

![Immagine 18](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/18.png)

In fondo alla tabella, aggiungere una nuova voce di comando; qui prendiamo come esempio l'aggiunta di una parola di comando “打扫房间”.

![Immagine 19](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/19.png)

Qui occorre selezionare “命令词” come tipo di funzione e impostare la modalità di riproduzione su “主”, in modo che, dopo il riconoscimento di “打扫房间”, venga riprodotto attivamente “好的”.

![Immagine 20](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/20.png)

Vediamo ora il protocollo di invio: la 1ª e la 2ª posizione dei dati sono l'intestazione del frame di dati e non devono essere modificate. Quando si seleziona “命令词” come tipo di funzione, secondo il protocollo di invio la 3ª posizione dei dati deve essere “00”; ciò serve a distinguere se l'istruzione è una “命令词” o una “播报语”.

![Immagine 21](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/21.png)

La 4ª posizione dei dati è l'ID dei dati della parola di comando, un dato esadecimale; poiché l'ID della parola di comando precedente è “8B”, questa posizione deve essere impostata su “8C”. In casi speciali gli ID dei dati possono anche essere uguali, ad esempio quando i risultati restituiti dalle due parole di comando seguenti sono identici.

![Immagine 22](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/22.png)

La 5ª posizione del protocollo è fissa su “EE” e anch'essa non deve essere modificata. Nella tabella, il protocollo di invio e il protocollo di ricezione devono essere coerenti.

![Immagine 23](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/23.png)

Al termine delle modifiche, salvare. Seguire quindi i passaggi di “1.2 Creazione del firmware” per importare la tabella nel sito web. Se è già stato creato un firmware in precedenza, è possibile fare clic sul pulsante “Eredita” nel progetto precedente, risparmiando così i passaggi di configurazione dei parametri

![Immagine 24](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/24.png)

Dopo aver ricreato il firmware, occorre anche caricarlo nel modulo di interazione vocale: in questo modo sarà possibile aggiungere nuove voci di comando.

## 4. Aggiunta di una nuova frase di riproduzione

Aprire negli allegati il file 命令词播报词协议列表V1_中文.

![Immagine 25](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/25.png)

In fondo alla tabella, aggiungere una nuova voce; qui prendiamo come esempio l'aggiunta di una frase di riproduzione “现在是晚上”.

![Immagine 26](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/26.png)

Qui occorre selezionare “播报语” come tipo di funzione e impostare la modalità di riproduzione su “被”.

![Immagine 27](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/27.png)

Vediamo ora il protocollo di invio: la 1ª e la 2ª posizione dei dati sono l'intestazione del frame di dati e non devono essere modificate. Quando si seleziona “播报语” come tipo di funzione, secondo il protocollo di invio la 3ª posizione dei dati deve essere “FF”; ciò serve a distinguere che l'istruzione è una “播报语”.

![Immagine 28](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/28.png)

La 4ª posizione dei dati è l'ID dei dati della parola di comando, un dato esadecimale; poiché l'ID della frase di riproduzione precedente è “8B”, questa posizione deve essere impostata su “8C”.

La 5ª posizione del protocollo è fissa su “EE” e anch'essa non deve essere modificata. Nella tabella, il protocollo di invio e il protocollo di ricezione devono essere coerenti.

![Immagine 29](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/29.png)

Al termine delle modifiche, salvare. Seguire quindi i passaggi di “1.2 Creazione del firmware” per importare la tabella nel sito web. Se è già stato creato un firmware in precedenza, è possibile fare clic sul pulsante “Eredita” nel progetto precedente, risparmiando così i passaggi di configurazione dei parametri.

![Immagine 30](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/30.png)

Dopo aver ricreato il firmware, occorre anche caricarlo nel modulo di interazione vocale: in questo modo sarà possibile aggiungere nuove voci di comando.

<RelatedProducts slugs="ai-voice-module" />
