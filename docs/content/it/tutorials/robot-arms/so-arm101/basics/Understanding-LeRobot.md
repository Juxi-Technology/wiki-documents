---
title: "Conoscere LeRobot"
description: "Introduzione alla robotica e a LeRobot: che cosa significa intelligenza incarnata, che cosa è il braccio SO-ARM101, quali computer servono e che cosa è VLA."
---

# Conoscere LeRobot

## Che cos'è l'intelligenza incarnata?

Intelligenza dotata di un corpo. Consiste nel collegare l'AI a varie entità hardware, ad esempio:

cani robot quadrupedi, robot umanoidi bipedi, robot con ruote e gambe, droni, auto a guida autonoma

## Che cos'è LeRobot?

LeRobot è il `framework software open source per robot a intelligenza incarnata` di HuggingFace

Indirizzo Github: https://github.com/huggingface/lerobot

Realizzazione a basso costo d'ingresso: **raccolta dati, addestramento degli algoritmi e deployment dell'inferenza** per l'apprendimento per rinforzo e l'**apprendimento per imitazione (VLA)**, tra cui il più importante è l'**apprendimento per imitazione (VLA)**

- Quali robot si possono sviluppare con LeRobot?

Dal braccio robotico SO-ARM 101 da circa mille yuan, al piccolo veicolo LeKiwi, fino al braccio robotico piper di Songling da decine di migliaia di yuan, al braccio robotico StarAI di Huaxinjing, alla mano robotica Hope-JR, fino al robot umanoide Unitree G1 da oltre centomila yuan. LeRobot è diventato lo standard del settore dell'intelligenza incarnata per la raccolta dati e l'addestramento degli algoritmi.

Puoi anche adattare il tuo robot al framework LeRobot.

- Dataset e modelli LeRobot

LeRobot ha definito un proprio formato di dataset per l'apprendimento per imitazione; puoi consultare, usare, scaricare e addestrare tutti i dataset e i modelli pubblici su HuggingFace, e puoi anche caricare i tuoi dataset su HuggingFace

## Che cos'è il braccio robotico SO-ARM 101?

Questo tutorial prende come esempio il braccio robotico SO-ARM 101, che utilizza componenti strutturali stampati in 3D e servomotori Feetech, con un costo molto basso.

È un corpo a intelligenza incarnata che anche uno studente squattrinato può permettersi, ed è anche uno dei corpi raccomandati ufficialmente da LeRobot.

Il braccio robotico comprende due bracci: il braccio attivo (Leader) e il braccio passivo (Follower). Ogni braccio comprende 6 gradi di libertà (5 gradi di libertà articolari + 1 grado di libertà della pinza).

## Che configurazione di computer mi serve

Un normale notebook Windows è sufficiente per svolgere tutte le operazioni che precedono l'addestramento

Un normale computer Mac è sufficiente per svolgere tutte le operazioni

Un computer Ubuntu con scheda grafica NVIDIA è sufficiente per svolgere tutte le operazioni

In questo tutorial si utilizza una [piattaforma GPU cloud](https://featurize.cn?s=d7ce99f842414bfcaea5662a97581bd1) per addestrare i modelli, quindi non è necessaria una configurazione elevata del proprio computer

## Che cos'è l'**apprendimento per imitazione e VLA**?

L'uomo trascina il robot per insegnargli e raccogliere un dataset, formando così il dataset. Poi usa questo dataset per addestrare l'algoritmo di apprendimento per imitazione, che alla fine viene distribuito sul robot, permettendogli di imitare autonomamente i movimenti umani e di generalizzare all'ambiente reale. Non servono teleoperazione né telecomando.

Ad esempio, nel video qui sopra, l'uomo trascina il braccio robotico SO-ARM per afferrare gamberi di fiume, intingerli nel condimento e immergerli nell'olio bollente, riuscendo infine a far compiere questo movimento al braccio robotico in modo autonomo. Anche se arriva un nuovo gambero di fiume, il robot è in grado di reagire in qualsiasi momento e completare il movimento.

L'apprendimento per imitazione ha anche un nome all'avanguardia e alla moda: VLA (modello di grandi dimensioni visione-linguaggio-azione). Questo è anche il campo di ricerca sull'intelligenza incarnata che oggi si sviluppa più rapidamente, con gli investimenti più accesi, la concorrenza più intensa tra Cina e Stati Uniti, l'ecosistema open source più fiorente, la grande attenzione dei media e innumerevoli laureati e dottorandi che vi si dedicano a gara.

L'algoritmo principalmente supportato da LeRobot è proprio l'apprendimento per imitazione. Ad esempio ACT, Diffusion Policy, SmolVLA, Pi0, Pi0.5, Wall-OSS e altri.

L'apprendimento per imitazione trattato nel tutorial è solo VLA.

<RelatedProducts slugs="so-arm101" />
