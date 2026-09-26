---
title: FAQ
sidebar_label: FAQ
slug: /support/faq
description: >-
  Domande frequenti sul NVIDIA Jetson Orin Nano Super Developer Kit (8GB) —
  archiviazione, prima configurazione, firmware, modalità di alimentazione,
  carichi di lavoro di IA e supporto.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
review_owner: cheny
---

# FAQ

## Prima di iniziare

**Che cosa c'è nella confezione?**
Il Jetson Orin Nano Developer Kit, un alimentatore da 19 V e una scheda di avvio
rapido e supporto. **Nella confezione NVIDIA non c'è alcuna archiviazione**: la scheda microSD o l'SSD NVMe, la chiavetta USB per
l'installer, il monitor e la tastiera sono a suo carico — anche se il bundle
dello store Juxi per questo kit aggiunge una scheda microSD da 64 GB (secondo
la scheda dello store). Vedere
[Avvio rapido](/it/tutorials/jetson-orin-nano/quick-start).

**Devo comprare un supporto di archiviazione?**
Sì — a meno che non abbia acquistato il bundle dello store Juxi, che include
già una scheda microSD da 64 GB; soddisfa il requisito di archiviazione di
destinazione, quindi acquisti un SSD NVMe solo se desidera più capacità. (La
scheda in dotazione arriva vuota, senza immagine preinstallata — il sistema vi si
installa con la Jetson ISO.) NVIDIA dichiara:
"Il Jetson Orin Nano Developer Kit non include archiviazione rimovibile nella
confezione, quindi scelga una scheda microSD o un SSD NVMe prima di iniziare la
configurazione". Acquisti
una scheda microSD da 64GB UHS-1 o superiore (raccomandazione di NVIDIA) se ha
ricevuto la confezione NVIDIA senza il bundle Juxi, oppure un SSD NVMe PCIe per uno degli slot
M.2 Key-M della scheda carrier. Il kit non ha eMMC: la sua scheda o il suo SSD
diventa l'archiviazione principale del sistema. Vedere
[Avvio rapido](/it/tutorials/jetson-orin-nano/quick-start) e
[Interfacce e layout hardware](/it/tutorials/jetson-orin-nano/interfaces).

**Posso ancora flashare un'immagine per scheda SD, come nelle release JetPack
precedenti?**
No. A partire da JetPack 7.2, le immagini per scheda SD non sono più
supportate. L'istruzione di NVIDIA: "Non flashare la Jetson ISO su una scheda
microSD — scriva l'immagine su una chiavetta USB, poi la usi per installare
Jetson Linux sulla sua scheda microSD o sull'SSD NVMe". La scheda microSD resta un target di
installazione valido; semplicemente non è più il supporto su cui si scrive
l'immagine. La chiavetta USB con la ISO è un installer, non una live USB — non
può eseguire un desktop, installa soltanto il sistema. Vedere
[Flashing e aggiornamenti](/it/tutorials/jetson-orin-nano/flashing-and-updates) e
[Migrazione da JetPack 6.x a JetPack 7.2.1](/it/tutorials/jetson-orin-nano/jetpack-6-to-7).

**Che cosa serve esattamente prima di iniziare?**
Serve:

- Il kit e il suo alimentatore da 19 V in dotazione.
- Un laptop o un PC (Windows, Mac o Linux) con almeno 25GB di spazio libero.
- Una chiavetta USB, da 16GB o più capiente, per contenere l'immagine
  dell'installer.
- Un'archiviazione di destinazione: una scheda microSD (raccomandata da 64GB
  UHS-1 o superiore) e/o un SSD NVMe — il bundle dello store Juxi include già
  la scheda microSD da 64 GB.
- Un monitor DisplayPort e una tastiera e un mouse USB, oppure un cavo seriale
  USB-TTL per una configurazione headless.

La guida di NVIDIA utilizza Balena Etcher per scrivere la ISO sulla chiavetta
USB — copiare il file sull'unità non basta. Passo passo:
[Avvio rapido](/it/tutorials/jetson-orin-nano/quick-start).

**Serve un PC Ubuntu?**
No, non per il percorso consigliato. L'installazione da Jetson ISO avviene sul
kit stesso; il PC serve solo a scrivere la ISO su una chiavetta USB, e Windows,
Mac e Linux vanno tutti bene per questo. Un PC host Ubuntu x86_64 è necessario
solo per i metodi alternativi — SDK Manager o lo script di flashing — ad
esempio quando si vuole riflashare un kit con la configurazione Super. Nota:
la pagina di SDK Manager documenta host Ubuntu 20.04 / 22.04 x86_64, mentre il
personale NVIDIA segnala anche flashing riusciti da Windows. Vedere
[Flashing e aggiornamenti](/it/tutorials/jetson-orin-nano/flashing-and-updates).

**Dov'è lo slot microSD?**
Si trova sul lato inferiore del modulo Jetson Orin Nano, non sul bordo della
scheda carrier. Inserisca la scheda prima di avviare l'installer ISO;
l'installer offre solo le memorie già installate. Per cambiare scheda in
seguito: spenga il kit, sostituisca la scheda e riesegua l'installer ISO di
JetPack 7.2.1 con la nuova scheda inserita — JetPack 7.2 e successivi non hanno
alcuna immagine per scheda da scrivere. Vedere
[Interfacce e layout hardware](/it/tutorials/jetson-orin-nano/interfaces) e
[Avvio rapido](/it/tutorials/jetson-orin-nano/quick-start).

## Configurazione

**Il mio kit è nuovo — perché la guida dice di aggiornare prima il firmware?**
Le installazioni JetPack 7.2 e successive richiedono sul kit un firmware
UEFI/QSPI della generazione JetPack 6.x — versione 36.x o successiva. I kit
spediti con firmware di fabbrica più vecchio devono completare il "JetPack 6.x
Update Path" di NVIDIA prima che la ISO di JetPack 7.2.1 possa avviarsi. Per
controllare la versione: accenda il kit con un monitor collegato e prema
ripetutamente Esc alla schermata di avvio; il menu UEFI mostra la versione del
firmware in alto. Se indica 36.x o successiva, proceda; se è precedente alla
36.0, esegua prima il percorso di aggiornamento. Vedere
[Avvio rapido](/it/tutorials/jetson-orin-nano/quick-start),
[Flashing e aggiornamenti](/it/tutorials/jetson-orin-nano/flashing-and-updates) e
il [Glossario](/it/tutorials/jetson-orin-nano/glossary) per termini come QSPI e
capsule update.

**Quanto dura la configurazione?**
NVIDIA non pubblica un tempo totale di configurazione. Le istruzioni ufficiali
dicono che si può vedere del testo bianco scorrere sullo schermo per diversi
minuti e che occorre attendere il completamento dell'installer e riavviare
quando richiesto. Le segnalazioni degli utenti vanno da circa 15 minuti a circa
due ore per un'installazione su scheda microSD (segnalazioni degli utenti, non
confermate), e al primo avvio si aggiungono le schermate di configurazione di
Ubuntu (lingua, rete, nome utente). Vedere
[Avvio rapido](/it/tutorials/jetson-orin-nano/quick-start).

**E se l'installer salta le schermate di nome utente e password?**
Corrisponde a una segnalazione nota: la richiesta della capsula QSPI è scaduta.
L'installer chiede di confermare un aggiornamento firmware (QSPI) e attende
solo 30 secondi — se la richiesta non viene vista, i passaggi successivi
possono fallire e le schermate di lingua, rete e nome utente possono non
comparire mai; il riavvio successivo può quindi fermarsi su uno schermo nero
con un cursore. La soluzione dalla guida ufficiale: riavviare l'installazione e
premere Y quando compare la richiesta della capsula. Alcuni utenti hanno anche
ripulito le partizioni residue prima di riprovare, oppure hanno installato con
SDK Manager (segnalazioni degli utenti; il personale NVIDIA ha riconosciuto il
thread). Vedere
[Risoluzione dei problemi](/it/tutorials/jetson-orin-nano/troubleshooting).

> **Importante** Quando l'installer mostra la richiesta di aggiornamento della capsula QSPI, prema
> **Y** entro 30 secondi. NVIDIA la chiama "il passaggio più comunemente
> mancato".

**Come ottengo una console seriale?**
Colleghi un cavo seriale USB-TTL al connettore dei pulsanti: il pin 3 (RXD) si
collega al filo TX dell'adattatore, il pin 4 (TXD) al filo RX e il pin 7 (GND)
al filo di massa. Poi apra una console seriale sul suo PC,
accenda il kit e prema Esc durante la schermata di pre-avvio per entrare in
UEFI / Boot Manager — può completare l'intera installazione ISO in questo modo.
Una lacuna dichiarata apertamente: le pagine di NVIDIA dicono "apra una console
seriale sul suo PC" ma non indicano né un baud rate né un programma terminale.
Quando il kit è collegato a un PC via USB-C in modalità device, presenta anche
una "USB Serial device for serial terminal access". Vedere
[Interfacce e layout hardware](/it/tutorials/jetson-orin-nano/interfaces) e
[Risoluzione dei problemi](/it/tutorials/jetson-orin-nano/troubleshooting).

## Alimentazione e prestazioni

**Perché non c'è l'opzione 25W / MAXN SUPER?**
Il suo kit è stato flashato con la configurazione di avvio non-Super, quindi
compaiono solo le modalità 7W e 15W. Si tratta del problema documentato
**6279443** della ISO di JetPack 7.2: le installazioni da ISO mantenevano il
profilo pre-aggiornamento invece di passare a "Super". JetPack 7.2.1 lo
corregge per le nuove installazioni — la ISO "ora esegue il flashing del Jetson
Orin Nano Developer Kit con la configurazione di flashing Modalità Super per
impostazione predefinita"; NVIDIA non dice se una reinstallazione 7.2.1 converta un kit con
ISO 7.2.0. Controlli `/etc/nv_boot_control.conf`: una configurazione Super
mostra il suffisso `-super`. Per correggere un'installazione 7.2 esistente,
riflashi con la configurazione Super da un host Ubuntu (SDK Manager o lo script
di flashing); il menu Power Mode offre quindi 15W, 25W (predefinita) e MAXN
SUPER. Vedere
[Verificare il sistema](/it/tutorials/jetson-orin-nano/verify-your-system),
[Risoluzione dei problemi](/it/tutorials/jetson-orin-nano/troubleshooting) e
[Flashing e aggiornamenti](/it/tutorials/jetson-orin-nano/flashing-and-updates).

> **Nota di Juxi:** Esiste una correzione in-place della community (modificare
> `/etc/nv_boot_control.conf`, riconfigurare il bootloader, rimuovere
> `/etc/nvpmodel.conf`, riavviare). Diversi utenti segnalano successo, ma
> NVIDIA non l'ha approvata e un utente ha segnalato un boot loop.

## Carichi di lavoro di IA

**Quanto grande può essere un modello eseguibile con 8 GB?**
Gli 8GB di LPDDR5 sono memoria unificata, condivisa da CPU, GPU e sistema
operativo — dopo le riserve di firmware e kernel ne restano utilizzabili circa
7,6GB. La guida pubblicata da NVIDIA: con quantizzazione a 4 bit e runtime
efficienti in termini di memoria, si possono ospitare LLM fino a circa 10B
parametri e VLM fino a circa 4B parametri. I benchmark ufficiali di TensorRT
Edge-LLM per Orin Nano 8GB coprono modelli fino a 2B, ed è la più grande classe
di modelli che NVIDIA benchmarka su questo kit. Un modello può non caricarsi
anche quando il file sembra entrare, perché anche la cache KV richiede memoria;
GGUF da 7,4GB e 16GB non si sono caricati su un kit da 8GB (segnalazioni degli
utenti). Vedere
[Inferenza LLM locale su 8 GB](/it/tutorials/jetson-orin-nano/local-llm) e
[Efficienza della memoria](/it/tutorials/jetson-orin-nano/memory-efficiency).

## Supporto e assistenza

**Qual è il percorso di assistenza?**
Inizi dalla [Troubleshooting Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html)
ufficiale di NVIDIA, che copre i cinque problemi di configurazione più comuni:
la ISO non si avvia, nessuna uscita display, l'installer non mostra
l'archiviazione di destinazione, è necessario un aggiornamento del firmware e
un errore di permessi di Docker. Per domande sulla piattaforma, usi i forum per
sviluppatori NVIDIA Jetson, elencati nella pagina ufficiale
[Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html);
cerchi prima di pubblicare e includa l'output di
`cat /etc/nv_tegra_release`. Contatti Juxi Technology:

- Supporto tecnico: **support@juxitech.com**
- Ordini, garanzia e RMA: **support@juxitech.com** (includa il numero d'ordine)
- Vendite e preventivi: **sales@juxitech.com**
- Domande sui prodotti (selezione, compatibilità): **pe@juxitech.com**

Download ufficiali e link di riferimento: [Download](/it/tutorials/jetson-orin-nano/downloads).

> **Nota di Juxi:** Alcune risposte del forum etichettate come personale NVIDIA
> sono risposte IA generate automaticamente (iniziano con "This is an automated
> AI response"). Le consideri non autorevoli e preferisca la documentazione
> ufficiale.

## Fonti

- Jetson Orin Nano Developer Kit User Guide — [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html), [Troubleshooting](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html), [How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html), [Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (verificato il 2026-09-26)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (verificato il 2026-09-26)
- Note di rilascio di Jetson Linux — [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf), [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (verificato il 2026-09-26)
- [Maximizing memory efficiency to run bigger models on NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (verificato il 2026-09-26)
- [TensorRT Edge-LLM performance benchmarks](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html) (verificato il 2026-09-26)
- Forum per sviluppatori NVIDIA — [thread sul boot bloccato / configurazione nome utente saltata](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410), [thread su 25W / MAXN SUPER](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) (verificato il 2026-09-26)
- [Scheda dello store Juxi Technology — Jetson Orin Nano Super Developer Kit](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) (verificato il 2026-09-26)

*Stato: bozza, in attesa di revisione da parte di cheny.*

---

NVIDIA® e Jetson™ sono marchi di NVIDIA Corporation. Questa pagina è pubblicata
da Juxi Technology e non è una pubblicazione NVIDIA.
