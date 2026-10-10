---
title: Risoluzione dei problemi
sidebar_label: Risoluzione dei problemi
slug: /support/troubleshooting
description: >-
  Risoluzione dei problemi guidata dai sintomi per il NVIDIA Jetson Orin Nano Super Developer Kit (8GB) — trappole di installazione, modalità di alimentazione, archiviazione NVMe, accelerazione GPU e problemi noti, con chiara classificazione delle fonti.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetson-orin-nano-missing-25w-power-mode-qspi-firmware-mismatch-after-missed-capsule-update/377553
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetson-orin-nano-in-jetpack-7-2-r39-2-nvme-ssd-on-pcie-c7-is-not-detected-bootable-in-uefi-stage-but-works-normally-after-linux-boots/383858
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetson-orin-nano-repeated-ext4-nvme-filesystem-corruption-and-attempting-recovery-boot-on-jetpack-7-2/379702
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269
    checked: 2026-09-26
review_owner: cheny
---

# Risoluzione dei problemi

Trovi il suo sintomo nell'indice qui sotto, poi legga la sezione corrispondente.
Gradi di attendibilità: **A** = documentazione ufficiale NVIDIA; **B** = forum
per sviluppatori NVIDIA (segnalazioni del personale o della community). Le voci
solo della community sono marcate come *non confermate*. Juxi non ha un'unità in
mano per questa serie — questa pagina è verificata solo sulla documentazione,
non testata su hardware.

## Iniziare dalla guida ufficiale alla risoluzione dei problemi di NVIDIA

Il primo punto di riferimento di NVIDIA per questo kit: la [Troubleshooting Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html). Copre esattamente cinque problemi di configurazione: (1) la Jetson ISO non si avvia, (2) nessuna uscita display, (3) l'installer non mostra l'archiviazione di destinazione, (4) aggiornamento del firmware necessario, (5) errore di permessi Docker. Pagine ufficiali correlate: la pagina [Interim Solutions](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/interim_solutions.html) attualmente non contiene soluzioni temporanee (rimanda al JetPack 6.x Update Path), e la pagina [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) elenca i canali di escalation di NVIDIA. (grado A)

## Indice dei sintomi

| Sintomo | Sezione |
| --- | --- |
| L'installer salta le schermate di lingua/rete/utente, poi il sistema si blocca su uno schermo nero con un cursore; nessuna password funziona | Richiesta della capsula QSPI mancata |
| L'installazione sembrava andata bene ma fallisce più tardi | Richiesta della capsula QSPI mancata |
| L'installazione o il flashing falliscono con un hub o un dongle USB collegato | Periferiche USB |
| Nel menu di alimentazione solo 7W e 15W; `nvpmodel -m 2` dà errore | 25W / MAXN SUPER mancanti |
| GPU fissa a 624,75 MHz anche in MAXN SUPER | GPU bloccato a 624,75 MHz |
| Il cambio di modalità di alimentazione chiede un riavvio; il riavvio può bloccarsi con uno schermo nero | Cambi di modalità di alimentazione e il riavvio con schermo nero |
| L'installer non offre l'unità NVMe; l'installazione si blocca dopo il 100% | Problemi di archiviazione NVMe |
| L'NVMe non è visibile in fase UEFI | Problemi di archiviazione NVMe |
| L'installazione si interrompe a "Step 9/13 Updating boot firmware" | Mancata corrispondenza del nome della scheda al passo 9/13 |
| `jetson-io.py` fallisce su un'unità Super flashata da ISO | Disallineamento DTB di Jetson-IO |
| Ollama gira su CPU; avviso "Unsupported JetPack version" | Ollama e l'accelerazione GPU |
| Servono le wheel Python per JetPack 7.2 | Wheel Python |
| Il Wi-Fi non vede la rete; router a 6 GHz con MBSSID non supportati | Il Wi-Fi non vede la rete |
| Nessuna uscita display; l'installer non si avvia | Guida ufficiale alla risoluzione dei problemi (sopra) |
| Errore di permessi sul socket Docker | Errore di permessi Docker |
| Servono i log di avvio senza display | Console seriale |

## Richiesta della capsula QSPI mancata (la trappola di installazione più comune)

Durante l'installazione da ISO, il kit chiede di confermare un aggiornamento
della capsula del firmware QSPI. NVIDIA la chiama "il passaggio più comunemente
mancato": la richiesta attende solo 30 secondi. **Prema Y.**

- Se scade, "l'installazione fallisce più tardi". L'istruzione di NVIDIA è di riavviare l'installazione e premere Y. (grado A; [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) sezione 5.1; problema 6266271 delle note di rilascio, in [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) e [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf): "Saltare questo passaggio causa problemi di installazione a causa dell'incompatibilità delle nuove immagini ISO con le immagini QSPI più vecchie".)
- L'aggiornamento viene eseguito in due passaggi e il kit può riavviarsi tra l'uno e l'altro. È previsto. NVIDIA raccomanda inoltre di selezionare esplicitamente l'installer USB nell'UEFI Boot Manager invece di affidarsi all'avvio automatico. (grado A, [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html); il personale ha confermato che la guida è stata aggiornata con la soluzione di un utente — grado B, [thread 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))
- Firma del guasto (grado B, segnalazione di un utente più conferma del personale, [thread 380410](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410)): l'installer salta le schermate di lingua, rete e nome utente, passa a "Finished installation and reboot" e il sistema si blocca quindi su uno schermo nero o grigio con un cursore. Nessuna credenziale predefinita funziona (nvidia/nvidia, ubuntu/ubuntu, root/vuota). Causa: la richiesta della capsula non è mai stata confermata. Dopo aver premuto Y, le schermate di configurazione sono comparse e l'installazione è stata completata. Altri utenti nello stesso thread hanno risolto flashando con SDK Manager. (grado B)
- Se il kit non raggiunge mai l'installer (schermo nero, o cade in una shell UEFI), il firmware QSPI è probabilmente troppo vecchio: JetPack 7.2/7.2.1 richiedono firmware UEFI/QSPI della generazione JetPack 6.x. Vedere [Flashing e aggiornamenti](/it/tutorials/jetson-orin-nano/flashing-and-updates) e [Migrazione da JetPack 6.x a JetPack 7.2.1](/it/tutorials/jetson-orin-nano/jetpack-6-to-7). (grado A, [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html))

## Installazione o flashing falliscono con alcune periferiche USB

Problemi ufficiali **5424568** e **5460707** (presenti nelle note [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) e [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)): l'installazione da ISO fallisce quando la chiavetta USB dell'installer è collegata a un hub **"USB3.0 4-port Portable Hub Model UH400"** — "Altre chiavette o hub USB funzionano come previsto" — e il flashing a volte fallisce quando è collegato un dongle USB-Ethernet **TRENDnet TU2-ET100**. Usi un'altra chiavetta/hub o una porta USB diretta e rimuova il dongle prima di riprovare. (grado A)

## 25W e MAXN SUPER mancano

Sintomi: compaiono solo 7W e 15W, oppure `nvpmodel -m 2` restituisce un errore di modalità di alimentazione non valida. Causa — problema noto ufficiale **6279443** ([note r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)): le unità aggiornate via ISO "non passeranno alla modalità 'Super' dopo l'aggiornamento. Per usare la modalità 'Super', è necessario flashare il target usando un host Linux o SDKM". (grado A)

Firma — manca il suffisso `-super` in `/etc/nv_boot_control.conf`. Il personale: "Quando Super Mode è abilitata, la configurazione deve includere il suffisso -super … Attualmente l'immagine ISO non può aggiornare un dispositivo dalla modalità non-Super alla Super Mode. Usi un host x86 per riflashare il dispositivo con la configurazione Super Mode". (grado B, [thread 372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627))

Corretto per progettazione in 7.2.1 — il personale: "Questo sarà corretto in jp7.2.1"; le [note r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) dicono che "la ISO ora esegue il flashing del Jetson Orin Nano Developer Kit con la configurazione di flashing Modalità Super per impostazione predefinita", e il problema 6279443 è assente dall'elenco dei problemi noti. (grado A)

Opzioni di correzione:

1. Riflashi da un host Linux o con SDK Manager. (grado A, problema 6279443, [note r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf))
2. Flash del solo QSPI suggerito dal personale — flasha solo il bootloader QSPI, nessuna immagine di sistema (grado B, [thread 377553](https://forums.developer.nvidia.com/t/jetson-orin-nano-missing-25w-power-mode-qspi-firmware-mismatch-after-missed-capsule-update/377553)). Il primo comando è quello del personale; il secondo aggiunge il target Super e gli override EEPROM che hanno funzionato per chi ha segnalato:

```
sudo ./flash.sh --no-systemimg -c bootloader/generic/cfg/flash_t234_qspi.xml jetson-orin-nano-devkit internal

sudo SKIP_EEPROM_CHECK=1 BOARDID=3767 BOARDSKU=0005 FAB=300 ./flash.sh --no-systemimg -c bootloader/generic/cfg/flash_t234_qspi.xml jetson-orin-nano-devkit-super internal
```

3. Correzione in-place della community — *non confermata*, non approvata da NVIDIA (grado B, [thread 372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627), [thread 375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435)). Il personale NVIDIA ha chiesto agli utenti di acquisire lo stato **prima** di modificare quel file (`cat /etc/nv_tegra_release`, `cat /etc/nv_boot_control.conf`, `sudo /usr/sbin/nvpmodel -q --verbose`) — modificarlo "rimuoverebbe lo stato di errore che dobbiamo ispezionare". Sequenza segnalata: `sudo -i`; `perl -i -0777 -pe 's/nano-devkit-\n/nano-devkit-super-\n/g' /etc/nv_boot_control.conf`; `dpkg-reconfigure nvidia-l4t-bootloader`; `rm /etc/nvpmodel.conf`; `reboot`; poi `sudo nvpmodel -m 2 --verbose --force`. Diversi utenti hanno confermato la comparsa di 25W e MAXN SUPER in seguito; un utente con installazione su scheda SD ha avuto un boot loop e ha reinstallato.

Contesto: su un'installazione 7.2 non-Super, `/etc/nvpmodel/nvpmodel_p3767_0003_super.conf` (15W, 25W, MAXN_SUPER) esiste, ma `/etc/nvpmodel.conf` punta al file non-Super con solo 15W e 7W. (grado B, community, [thread 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151)). Comandi per verificare le modalità di alimentazione: [Verificare il sistema](/it/tutorials/jetson-orin-nano/verify-your-system).

## GPU bloccato a 624,75 MHz

Anche con MAXN_SUPER attivo, la GPU può restare fissa a 624.750.000 Hz (`bpmp/debug/clk/nafll_gpc0/max_rate` = 624750000); flashare la sola capsula Super non ha aiutato nel caso segnalato — il firmware Super non era stato applicato. Il personale: flashare con SDK Manager, o flash manuale da un host Ubuntu; dicono corretto in 7.2.1. (grado B, [thread 377003](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003)) Nota della community: in L4T 39.2 non esiste `nvpmodel_p3767_0005.conf`; il modulo P3767-0005 usa la configurazione 0003 (il personale non l'ha confermato). (grado B, community, stesso thread di cui sopra)

## Cambi di modalità di alimentazione e il riavvio con schermo nero

- La richiesta di riavvio dopo un cambio di modalità di alimentazione è prevista una volta che la GPU è stata usata ("golden image context"). (grado B, personale, [thread 375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435))
- Se il riavvio si blocca con uno schermo nero, corrisponde al problema **6236259** ([r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf); indicato come risolto in [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)): abbassare la frequenza EMC sotto la Fmax durante l'inizializzazione di systemd può mandare in crash il sistema al riavvio, soprattutto con un display collegato. (grado A)
- Soluzione temporanea: riavviare con il monitor scollegato, poi ricollegarlo dopo l'avvio — un utente ha confermato che questo ha eliminato i problemi di modalità di alimentazione. (grado B, personale e utente, [thread 375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435))
- Mitigazione di NVIDIA: passi a MAXN (riporta EMC alla Fmax) prima di riavviare; se è già nella modalità problematica, avvii una volta senza il display. (grado A, problema 6236259, [note r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf))

## Problemi di archiviazione NVMe

**L'installer non offre l'unità / il passaggio di partizionamento fallisce** — *non confermato*: l'installer potrebbe non supportare unità NVMe formattate con settori da 4K; servono settori 512n/512e. Controlli con `nvme id-ns -H /dev/nvme0n1`; cambi con `nvme format --lbaf=ID /dev/nvme0n1` — **distruttivo**; il post non discute la conservazione dei dati. NVIDIA non l'ha confermato ufficialmente. (grado B, non confermato, [thread 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))

**Il boot si blocca dopo un'installazione apparentemente riuscita** — *non confermato*: diverse segnalazioni di schermo nero o cursore lampeggiante dopo che l'installer raggiunge il 100%. Un utente l'ha risolto solo con un flash diretto in modalità recovery; un altro l'ha ricondotto al problema dei settori 4K di cui sopra. Nessuna causa principale confermata. (grado B, non confermato, [thread 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))

**NVMe non rilevato in fase UEFI (r39.2)** — un'unità su PCIe C7 era invisibile in fase di avvio UEFI sebbene funzionasse in R36.4; chi ha segnalato ha risolto ripristinando le configurazioni predefinite e riflashando. Il personale: "per il devkit NV, tutto è già configurato correttamente nel BSP predefinito. Più voci si cerca di configurare, più probabilità c'è che qualcosa non funzioni". (grado B, [thread 383858](https://forums.developer.nvidia.com/t/jetson-orin-nano-in-jetpack-7-2-r39-2-nvme-ssd-on-pcie-c7-is-not-detected-bootable-in-uefi-stage-but-works-normally-after-linux-boots/383858)). Nota: le immagini per scheda SD sono sparite da JetPack 7.2 in poi — scriva la ISO su un'unità USB, poi installi su microSD o NVMe. (grado A, [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html))

## L'installer si interrompe a "Step 9/13 Updating boot firmware" (mancata corrispondenza del nome della scheda)

*Non confermato.* L'installazione può interrompersi con:

```
ERROR. 3767--0005--1--jetson-orin-nx-devkit-16gb- does not match any known boards.
```

Causa: `/etc/nv_boot_control.conf` contiene un COMPATIBLE_SPEC obsoleto che la lista di schede del pacchetto del bootloader non riconosce; il passaggio di oem-config/creazione utente quindi non viene mai eseguito — è questo il meccanismo della "mancata richiesta di nome utente/password" in questo caso. Riproduzione su un sistema r39.2 avviato: `sudo apt-get install --reinstall nvidia-l4t-bootloader`. NVIDIA non l'ha confermato. Riprodotto anche su un Orin NX 16GB e da terzi il 2026-09-18 (subiquity `command_34 … returned non-zero exit status 100`); una variante è stata segnalata per SDK Manager 7.2.x che fallisce a "Step 9". (grado B, non confermato, [thread 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))

Soluzione temporanea della community, *non confermata*: eseguire chroot in `/target`, estendere il ramo board-glob in `select_3767_payload` dentro `/var/lib/dpkg/info/nvidia-l4t-bootloader.postinst`, poi `rm -f /opt/nvidia/l4t-packages/.nv-l4t-disable-boot-fw-update-in-preinstall`, eseguire `dpkg --configure -a` e `apt-mark hold nvidia-l4t-bootloader`. NVIDIA non ha pubblicato una correzione per questo guasto; la soluzione della community sopra resta non confermata. (grado B)

## Disallineamento DTB di Jetson-IO su unità Super flashate da ISO

Problema ufficiale **6236205** (presente in [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) e [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)): `jetson-io.py` fallisce sulle unità Orin Nano Super flashate con la ISO. Soluzione temporanea ufficiale: trovare il DTB corrispondente sotto `/boot` con un ciclo `fdtget` che confronta `/compatible` e `/model`; copiarlo in `/boot/dtb/` come `kernel_<name>.dtb`; quindi rieseguire `sudo /opt/nvidia/jetson-io/jetson-io.py`. Le unità flashate con altri metodi non sono interessate. (grado A)

## Ollama e l'accelerazione GPU

Cronologia: le prime build di Ollama su JetPack 7.2 ripiegavano sulla CPU perché le librerie CUDA precompilate di Ollama non includevano sm_87 (compute capability 8.7 di Orin). Il personale ha citato il log "skipping CUDA device — compute capability not in compiled architectures … device=Orin cc=870" e ha dichiarato: "Questo è un problema noto … Stiamo lavorando direttamente con il team Ollama per aggiungere il supporto nativo a JP 7.2". (grado B, personale, [thread 372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521))

Stato attuale: l'ultima versione upstream di Ollama funziona. Il personale ha verificato su JetPack 7.2.1 (2026-09-21): installare con `curl -fsSL https://ollama.com/install.sh | sh`, eseguire un modello, poi controllare `ollama ps` — deve mostrare `100% GPU`. La riga "WARNING: Unsupported JetPack version detected" è un messaggio innocuo; la vecchia soluzione con `override.conf` "non è più necessaria". (grado B, personale, [thread 383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350))

Correzione per build obsolete: se `find /usr/local/lib/ollama ... | grep -Ei 'cuda|cudart|runner'` mostra sia l'albero `cuda_v12` sia quello `cuda_v13`, elimini quello vecchio — `sudo rm -rf /usr/local/lib/ollama/cuda_v12`. Il log mostrava quindi "load_backend: loaded CUDA backend from /usr/local/lib/ollama/cuda_v13/libggml-cuda.so … compute capability 8.7". (grado B, personale e utente, [thread 372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521))

Nota sugli 8 GB: i modelli più grandi possono comunque fallire con `cudaMalloc failed: out of memory … failed to allocate buffer for kv cache`, anche quando `free -h` mostra memoria libera — la memoria GPU è condivisa. Usi modelli più piccoli o quantizzati. (grado B, community, [thread 383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350)). Approfondimenti: [Inferenza LLM locale su 8 GB](/it/tutorials/jetson-orin-nano/local-llm).

## Wheel Python per JetPack 7.2

Risposta del personale per JP 7.2 / CUDA 13.2: usare `https://pypi.jetson-ai-lab.io/sbsa/cu130`. (grado B, personale, [thread 372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521)). Avvertenza: al momento della verifica della radice dell'indice (2026-09-26) erano elencati `jp6/cu126`, `jp6/cu128`, `jp6/cu129`, `sbsa/cu130` e `sbsa/dev` — nessuna voce `jp7` visibile; i thread della community citano anche `https://pypi.jetson-ai-lab.io/jp7/cu132`, non visibile in quell'elenco. (grado C). Il personale: "Downgrade: sì, può tornare a JP 6.2.2 tramite SDK Manager se necessario". (grado B)

## Il Wi-Fi non vede la rete

Problemi noti ufficiali del Wi-Fi (nelle [note r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)): **i router Wi-Fi a 6 GHz che usano MBSSID non sono supportati** (problema **5226667**) e **la scansione Wi-Fi può mancare alcuni AP in ambienti affollati** — esegua `wpa_cli set bss_max_count 500` come soluzione tampone per il buffer (problema **5426982**). (grado A)

## Console seriale (debug headless)

Cablaggio (grado A, [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)): cavo seriale USB-TTL sul connettore dei pulsanti — pin 3 (RXD) al filo TX dell'adattatore, pin 4 (TXD) al filo RX e pin 7 (GND) al filo di massa. Poi "apra una console seriale sul suo PC". Prema **Esc** ripetutamente durante l'avvio per entrare in UEFI. Per un'installazione ISO headless, prema Esc alle opzioni di pre-avvio, scelga **Boot Manager** e selezioni il disco USB.

- Le pagine di NVIDIA non indicano alcun baud rate né programma terminale — solo "apra una console seriale sul suo PC". (vedere *Che cosa non abbiamo potuto confermare*)
- Senza un display DisplayPort o la Debug UART, un'installazione ISO headless non è praticabile — il personale: "Servirebbe usare o l'uscita display DP o la Debug UART … quindi se non si ha né l'una né l'altra è praticamente impossibile". (grado B, personale, [thread 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))
- Nelle installazioni ISO headless la console UEFI è `/dev/ttyACM1`, inondata di output finché il QSPI non è aggiornato alla GA (38.2); non osservato con un display collegato ([problema 5463861](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)). (grado A)
- Dopo aver reinserito il cavo di debug, minicom può diventare inaccessibile — riavviare minicom ([problema 5437763](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf), in entrambe le release). (grado A)

## Errore di permessi Docker

Correzione ufficiale (grado A, [Troubleshooting Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html)) — riavviare il terminale se il cambio di gruppo non ha effetto:

```
sudo usermod -aG docker $USER
newgrp docker
```

## Ottenere assistenza

- **NVIDIA Jetson Developer Forums** (forums.developer.nvidia.com) — community ufficiale, elencata nella pagina Additional Docs di NVIDIA. Cerchi prima, poi pubblichi con l'output di `cat /etc/nv_tegra_release`; per problemi di alimentazione o firmware includa anche `/etc/nv_boot_control.conf` e `sudo /usr/sbin/nvpmodel -q --verbose`. (grado A per l'elenco)
- **Attenzione:** alcune risposte contrassegnate come "NVIDIA-STAFF" sono risposte LLM generate automaticamente — iniziano con un marcatore del tipo "— 🤖 This is an automated AI response. I'm here to help, but please verify important details! —" oppure "*** Please note that this reply is generated by LLM automatically ***". Le consideri non autorevoli. (grado B, [thread 372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627), [thread 372269](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269))
- **Juxi Technology** — support@juxitech.com per il supporto tecnico e per questioni relative a ordini, garanzia e RMA (includa il numero d'ordine). Vendite: sales@juxitech.com · Domande sui prodotti: pe@juxitech.com.

## Ancora aperti a monte

Le note di rilascio di NVIDIA elencano un problema aperto per questo kit che può causare un riavvio imprevisto: **aborti DCE durante sospensione/ripresa SC7 che innescano un watchdog reset** (problema 6235055, aperto sia in r39.2 sia in r39.2.1). Se non sospende mai il kit, non la riguarda; se lo fa, lo monitori a monte invece di cercare una correzione di configurazione. (grado A, [note di rilascio r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf))

## Che cosa non abbiamo potuto confermare

Domande aperte nelle nostre fonti:

- Il baud rate e il programma terminale della console seriale — NVIDIA dice solo "apra una console seriale sul suo PC".
- Se la mancata corrispondenza del nome della scheda (`command_34` exit 100) sia risolta in r39.2.1; nessuna risposta di NVIDIA nei thread; ultima riproduzione della community il 2026-09-18.
- Se un'installazione da ISO 7.2.1 ripristini le modalità Super su un'unità originariamente flashata con la ISO 7.2 — le note dicono solo che 7.2.1 flasha la configurazione Super per impostazione predefinita.
- Se la limitazione NVMe dei settori 4K sia reale e documentata ufficialmente — solo segnalazione della community, non presente nelle note di rilascio né nella guida utente.
- Nessuna procedura ufficiale per riapplicare un COMPATIBLE_SPEC/TNSPEC obsoleto; una domanda sul forum a NVIDIA è rimasta senza risposta.
- Quale indice di wheel sia quello canonico per JP 7.2: `/sbsa/cu130` (personale) o `/jp7/cu132` (citazione della community).
- I requisiti dell'host di flashing sono in conflitto tra le fonti ufficiali: le note di rilascio dicono "Ubuntu 24.04 e 22.04" (nessuna architettura); la pagina BSP dice x86_64 per SDK Manager; gli utenti segnalano anche che Windows SDK Manager flasha 7.2.1 con successo.
- Se la modifica community di `nv_boot_control.conf` sia sicura — NVIDIA non ha né approvato né corretto il percorso in-place.
- Se `sudo nvpmodel -m 2` possa persistere tra i riavvii su un'installazione non-Super (le segnalazioni della community dicono di no).
- Segnalazioni di corruzione EXT4/NVMe (journal recovery failed, I/O tag timeout, "Attempting recovery boot") — irrisolte; il thread è stato chiuso senza risposta.
- Ollama tramite build da sorgente o container — nessuna delle due strade è autorevole; solo l'ultimo installer upstream ha la conferma del personale NVIDIA su 7.2.1.
- L'affermazione sulle build "7.2.1-b49 vs b184" e le "Agent Skills" mancanti — non verificata, plausibilmente confusa; il What's New di r39.2.1 elenca effettivamente "Agent skills for video pipelines".

## Fonti

- NVIDIA Jetson Orin Nano Developer Kit User Guide: [Troubleshooting Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html) · [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) · [JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) · [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) · [Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) — verificato il 2026-09-26
- Note di rilascio: [JetPack 7.2 / L4T r39.2 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) · [JetPack 7.2.1 / L4T r39.2.1 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) — verificato il 2026-09-26
- Thread del forum per sviluppatori NVIDIA (verificati il 2026-09-26): [372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151) · [380410](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410) · [372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) · [377003](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003) · [377553](https://forums.developer.nvidia.com/t/jetson-orin-nano-missing-25w-power-mode-qspi-firmware-mismatch-after-missed-capsule-update/377553) · [375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435) · [372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) · [383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) · [383858](https://forums.developer.nvidia.com/t/jetson-orin-nano-in-jetpack-7-2-r39-2-nvme-ssd-on-pcie-c7-is-not-detected-bootable-in-uefi-stage-but-works-normally-after-linux-boots/383858) · [379702](https://forums.developer.nvidia.com/t/jetson-orin-nano-repeated-ext4-nvme-filesystem-corruption-and-attempting-recovery-boot-on-jetpack-7-2/379702) · [372269](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269)

*Stato: rivisto il 2026-10-11. Le voci etichettate come non confermate provengono da segnalazioni del forum della community e possono cambiare. Questa pagina è verificata solo sulla documentazione — Juxi non ha testato questo kit su hardware.*

---

NVIDIA® e Jetson™ sono marchi di NVIDIA Corporation. Questa pagina è pubblicata
da Juxi Technology e non è una pubblicazione NVIDIA.
