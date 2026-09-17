---
title: "Montaggio kit a pezzi"
description: "Montaggio del kit XLeRobot a pezzi: costruire i due bracci SO101, configurare i servomotori e assemblare carrello, base a ruote, testa e cablaggio passo passo."
---

# Montaggio kit a pezzi

![Immagine 1](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/1.jpg)

Suggerimento

Se preferisci saltare il divertimento di avvitare le viti, puoi anche acquistare il [kit preassemblato](https://item.taobao.com/item.htm?id=1002551208989&skuId=6088534920039) per i bracci follower SO101 compatibili con Xlerobot.



## 🦾 Braccio robotico SO101

![Immagine 2](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/2.jpg)

> Se disponi già di 2 bracci robotici SO101 assemblati con i servomotori configurati, salta questo passaggio.
> 
> 

- Costruisci 2 bracci robotici SO101 seguendo le [istruzioni di assemblaggio passo passo del SO101](https://juxitech.feishu.cn/wiki/HllBwhjJ1iayMdkUTGgcyKbgn8g), realizzando 2 bracci follower identici, dotati di 2 set di servomotori (tutti precedentemente con ID 1-6) per le 2 schede di driver del servo.

- Aggiungi la telecamera da polso seguendo questa [guida all'installazione](https://juxitech.feishu.cn/wiki/LjJywf5ILihuwkkOboGcFx1Qnkc).

- Se disponi di cuscinetti antiscivolo, puoi applicarli sulla pinza.

## 一、Configurazione dei servomotori

||Quantità|ID servo|Scopo|
|---|---|---|---|
|Servo Feetech STS3215-C018|3|7、8、9|Telaio mobile a ruote omnidirezionali|
|Servo Feetech STS3215-C018|2|7、8|Kit per arti superiori-torre della telecamera|
|Cavo di prolunga del servo 90CM|2||Collega il telaio mobile e la torre della telecamera alla scheda di driver del servo|

![Immagine 3](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/3.jpg)

> Poiché il repository ufficiale del codice lerobot attualmente non supporta configurazioni di servomotori diverse dal braccio robotico, utilizziamo [Bambot](https://bambot.org/) in alternativa (funziona su Windows e Mac; su Linux è necessario eseguire prima sudo chmod 666 /dev/ttyACM0).
> 
> 

```Plain Text
sudo chmod 666 /dev/ttyACM0
```

- Collega i servomotori che desideri configurare (uno alla volta) alla scheda di driver del servo e collega direttamente la scheda di driver del servo al computer.

- Vai alla [pagina di configurazione dei servomotori di Bambot](https://bambot.org/feetech.js), stabilisci una connessione e scansiona i servomotori. 

![Immagine 4](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/4.png)

- Rinomina gli ID dei servomotori secondo le istruzioni riportate di seguito. 

![Immagine 5](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/5.png)

- Oltre ai bracci robotici SO101, è necessario configurare due set di servomotori per le 2 schede di driver del servo:

    - un set per la **torre della telecamera** (ID servo: 7, 8)

    - l'altro set per il **telaio mobile a ruote omnidirezionali** (ID servo: 7, 8, 9).

- Suggerimento: usa un pennarello per scrivere i numeri sui servomotori e distingui i servomotori delle diverse schede (ad es. L1-L8 e R1-R9).

## 🛒 Carrello

- Nel caso in cui tu abbia accidentalmente gettato via il manuale, [qui ne trovi una copia](https://github.com/Vector-Wangel/XLeRobot/blob/main/others/Manuals_raskog_utility_cart.pdf).

![Immagine 6](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/6.png)

## 🧑🦼➡ Base a ruote

> Se disponi già di una base Lekiwi, rimuovi la batteria, i supporti dei servomotori, ecc. Alla piastra inferiore è sufficiente installare 3 servomotori con ruote (mantieni il cablaggio).
> 
> 

![Immagine 7](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/7.png)

**Nota**

Non scegliere la piastra sbagliata; ogni piastra ha un ordine specifico.

- Installa le ruote omnidirezionali sulla piastra secondo la figura sopra.

    - Gli ID servo specifici devono essere installati di conseguenza.

- Nota che i connettori delle ruote omnidirezionali richiedono 3 viti M4.

- Cabla i servomotori normalmente secondo il [tutorial](https://github.com/SIGRobotics-UIUC/LeKiwi/blob/main/Assembly.md#2-bottom-plate-assembly); successivamente, non collegare i cavi dei servomotori alla scheda di driver del servo, ma utilizza il **cavo di prolunga del servo da 90CM** per collegarti alla scheda di driver del servo.

![Immagine 8](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/8.png)

- Installa la piastra superiore secondo la figura sopra.

- Lascia il **cavo di prolunga del servo da 90CM** penzolante; per ora non tirarlo fuori dal foro della piastra superiore.

![Immagine 9](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/9.jpg)

- Installa 3 connettori (rialzi) sulla piastra superiore secondo la figura sopra.

Suggerimento

Posiziona la base Lekiwi con i connettori sotto il carrello e verifica se esercita una pressione sufficiente sul carrello affinché le sue quattro ruote tocchino ancora il suolo. In caso contrario, prova a modificare il modello 3D del connettore regolando leggermente la scala dell'asse Z direttamente nel software di slicing (mantenendo invariata la scala degli assi X e Y) e a ristamparlo.

![Immagine 10](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/10.png)

Suggerimento

Capovolgi il carrello per eseguire il seguente assemblaggio.

- Ora installa la base Lekiwi con i connettori sulla parte inferiore del carrello, con la piastra più sottile sull'altro lato.

- Fai riferimento alle figure per trovare l'orientamento di montaggio richiesto in base all'indice del servo.

Nota

Questa nuova versione dell'hardware è compatibile con la rete metallica del carrello; tutte le 12 viti M3 dovrebbero inserirsi senza difficoltà.

![Immagine 11](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/11.jpg)

- Poi, fai passare i cavi precedentemente prolungati dal basso verso l'alto attraverso il carrello.

## 🦾 Base del braccio robotico

### Assemblaggio della base superiore

14 viti esagonali M3\*12

4 viti esagonali M3\*16

![Immagine 12](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/12.png)

- L'assemblaggio è più facile quando la base è capovolta.

### Assemblaggio della testa

①Per prima cosa usa il cavo di prolunga del servo da 90CM (bianco e nero alternati) e il cavo del servo (bianco, rosso e nero alternati) inseriti nel servo n. 7.



②Usa quattro viti con rondella M2\*6 per fissare la telecamera

![Immagine 13](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/13.png)

- Nota che durante l'installazione del cornetto del servo, non avvitare la vite nel foro centrale del cornetto.

- Questo dovrebbe essere identico ai primi due passaggi dell'[assemblaggio del braccio robotico SO101](https://huggingface.co/docs/lerobot/so101#joint-1).

## 🧵 Cablaggio

Importante

Prima di fissare la base superiore al carrello, completa tutto il cablaggio e la gestione dei cavi della base superiore e inserisci il Raspberry Pi nel suo alloggiamento.

![Immagine 14](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/14.png)

- Collega il cavo di prolunga del servo da 90CM proveniente dalla **base Lekiwi** al **braccio robotico SO101 sinistro** (questo rende la base e il braccio un Lekiwi).

- Collega 2 **cavi dati da USB-C a USB-A ** dalle 2 **schede di driver del servo** al **Raspberry Pi** (i restanti 2 slot USB-A sono per le telecamere) o alla scheda madre Jetson.

- Collega tutti e 3 i **cavi di alimentazione**: 2 cavi **da USB-C a DC (12V)** dalle 2 schede di driver del servo e 1 cavo **da USB-C a USB-C** dal **Raspberry Pi**, alle porte di ricarica rapida PD dell'alimentatore. Ogni porta fornisce fino a 100W durante la ricarica simultanea, quantità testata come sufficiente per supportare il funzionamento della versione a 12V.

### 🔋 Posizionamento della batteria 🛒

- Posizionala in qualsiasi punto dello strato intermedio o inferiore del carrello per mantenere basso il baricentro. La batteria ha una base antiscivolo e non scivola facilmente durante il normale funzionamento.

- Per sicurezza, mantienila in posizione verticale.

- Nel caso in cui anche tu abbia accidentalmente gettato via il manuale della batteria, [qui ne trovi una copia](https://github.com/Vector-Wangel/XLeRobot/blob/main/others/Manual_Anker_SOLIX_C300_DC_Portable_Power_Station.pdf).

Importante

Per proteggere le schede di driver del servo, assicurati di collegare i cavi di alimentazione per ultimi. Scollega sempre i cavi di alimentazione quando inserisci o rimuovi altri cavi.

## 📸 Assemblaggio finale

### Inserimento della base nel carrello

Importante

Prima di fissare la base superiore al carrello, completa tutto il cablaggio e la gestione dei cavi della base superiore e inserisci il Raspberry Pi nel suo alloggiamento.

![Immagine 15](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/15.jpg)

- Fai attenzione a non danneggiare l'alloggiamento quando spingi il bordo del carrello nella presa dell'alloggiamento.

- Per facilitare i test, i bracci robotici SO101 sono fissati direttamente al carrello. Posiziona la [base del braccio robotico](https://github.com/Vector-Wangel/XLeRobot/blob/main/3D_Models/3D_models_for_printing/XLeRobot_special/SO_5DOF_ARM100_Assemblybases.stl) nei due angoli dello strato superiore del carrello, quindi fissala con **morsetti a F**.

- Se disponi di una bobina di filamento in cartone bambulab, non dimenticare di inserirla all'interno per fornire un supporto strutturale stabile.

![Immagine 16](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/16.jpg)

Dopo aver completato questi passaggi, l'XLeRobot dovrebbe essere assemblato fisicamente in modo corretto e pronto a svolgere qualche faccenda domestica.

![Immagine 17](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/17.jpg)

![Immagine 18](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/18.jpg)

Importante

Una volta che l'XLeRobot è completamente assemblato, non spingerlo in giro come un carrello, poiché ciò potrebbe danneggiare gli ingranaggi dei servomotori. Al contrario, quando devi spostarlo manualmente, sollevalo (~12kg).

<RelatedProducts slugs="xlerobot" />
