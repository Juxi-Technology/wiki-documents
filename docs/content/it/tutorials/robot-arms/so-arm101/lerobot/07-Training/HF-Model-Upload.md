---
title: "Passo 7: Caricare il modello su HuggingFace (opzionale)"
description: "Caricare il modello addestrato su HuggingFace: modalità automatica o manuale, checkpoint intermedi, parametri opzionali e uso diretto senza download."
---

# Passo 7: Caricare il modello su HuggingFace (opzionale)

> Questo passaggio è opzionale. Al termine dell'addestramento il modello resta sul tuo computer o sull'istanza cloud GPU, e può essere usato direttamente per l'inferenza. Devi caricarlo su HuggingFace solo quando ti serve **eseguire il backup del modello, passare a un'altra macchina per l'inferenza o condividerlo con altri**.

## Segnaposto nei comandi

Questo capitolo riprende la notazione con segnaposto usata nei capitoli precedenti; sostituiscili con le tue informazioni, **rimuovendo anche le parentesi angolari** al momento della sostituzione:

- `<nome-utente>`: il nome del tuo account HuggingFace
- `<nome-utente>`: il nome utente di sistema del tuo computer; puoi visualizzarlo digitando `whoami` nel terminale

## Metodo 1: caricamento automatico durante l'addestramento

Aggiungi due righe di parametri al comando di addestramento: al termine dell'addestramento il modello verrà caricato automaticamente.

```Shell
  --policy.push_to_hub=true \
  --policy.repo_id=<nome-utente>/shake_act_a \
```

**Queste due righe devono comparire sempre insieme: scrivendo solo `push_to_hub=true` si otterrà un errore.** `repo_id` è il nome del repository che assegni a questo modello, nella forma `nome_account/nome_modello`; se il repository non esiste, LeRobot lo creerà automaticamente.

Ad esempio, il comando completo di ACT diventa:

```Shell
lerobot-train \
  --dataset.repo_id=<nome-utente>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=act \
  --output_dir=~/output_lerobot_train/shake/act/ \
  --job_name=shake_act_a \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=true \
  --policy.repo_id=<nome-utente>/shake_act_a \
  --steps=20000 \
  --batch_size=8
```

Secondo quanto spiegato nella sezione precedente, al termine di questa sessione di addestramento il modello comparirà all'indirizzo `https://huggingface.co/<nome-utente>/shake_act_a`.

### Caricare insieme anche i checkpoint intermedi

Durante l'addestramento viene salvato un checkpoint ogni `save_freq` (impostazione predefinita: 20000 step). Se desideri caricare anche questi checkpoint intermedi (ad esempio, se l'addestramento dura a lungo e vuoi poter usare in qualsiasi momento un modello intermedio), aggiungi anche questa riga:

```Shell
  --policy.save_checkpoint_to_hub=true \
```

Al momento del caricamento a ogni checkpoint viene assegnato un tag con lo stesso nome del numero di step (ad esempio `010000`); in seguito, specificando questo tag al caricamento del modello potrai ottenere la versione corrispondente al numero di step, come descritto più avanti in "Caricare il modello già caricato".

### Alcuni parametri opzionali

Aggiungi secondo necessità:

| Parametro | Descrizione |
|---|---|
| `--policy.private=true` | imposta il repository come privato, così gli altri non possono vederlo |
| `--policy.tags=act,so101` | aggiunge tag al modello per facilitarne la ricerca |
| `--policy.license=mit` | specifica la licenza open source |

## Metodo 2: caricamento manuale al termine dell'addestramento

Questo è l'approccio più comune: durante l'addestramento scrivi come al solito `--policy.push_to_hub=false`; quando l'addestramento è terminato e hai confermato che i risultati sono soddisfacenti, carica manualmente il modello.

### 1. Accesso

Se hai già associato un Token puoi saltare questo passaggio; in caso contrario vedi [Registrare un account Hugging Face (opzionale)](/it/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account).

```Shell
hf auth login
hf auth whoami
```

### 2. Caricamento

Supponiamo che la directory di output dell'addestramento ACT sia `~/output_lerobot_train/shake/act/`:

```Shell
export HF_USER=<nome-utente>

hf upload ${HF_USER}/shake_act_a \
  ~/output_lerobot_train/shake/act/checkpoints/last/pretrained_model
```

Il repository del modello non deve essere creato in anticipo: se `hf upload` rileva che non esiste, ne creerà automaticamente uno.

### 3. Caricare il checkpoint di un determinato numero di step

Se vuoi caricare solo un checkpoint intermedio invece dell'ultimo:

```Shell
CKPT=005000
hf upload ${HF_USER}/shake_act_a_${CKPT} \
  ~/output_lerobot_train/shake/act/checkpoints/${CKPT}/pretrained_model
```

### 4. Caricamento dalla pagina web

Se il modello non è grande e non vuoi usare i comandi, puoi operare direttamente dalla pagina web di HuggingFace: crea un nuovo repository Model e trascina al suo interno i file della directory `pretrained_model`.

## Caricare il modello già caricato

Dopo aver caricato il modello, in fase di deployment è sufficiente puntare `--policy.path` ad esso, senza doverlo prima scaricare in locale:

```Shell
  --policy.path=<nome-utente>/shake_act_a \
```

Questo è più comodo che puntare a un percorso locale: cambiando computer, o se qualcuno conosce il tuo nome account, può usarlo direttamente. Nota che per scaricare un modello da HuggingFace è necessario potersi connettere ai suoi server; in ambienti di rete cinesi si consiglia di configurare prima il mirror seguendo [Registrare un account Hugging Face (opzionale)](/it/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account).

Se hai caricato più checkpoint e vuoi specificare quale usare, aggiungi il numero di versione:

```Shell
  --policy.pretrained_revision=005000 \
```

`005000` è il numero di step del checkpoint al momento del caricamento.

## Note

- Il nome del repository del modello (`repo_id`) non ha alcuna relazione con `--output_dir` e `--job_name` nel comando di addestramento: sono indipendenti, quindi scegli pure un nome facilmente riconoscibile
- In tutti i comandi di addestramento del tutorial è scritto `--policy.push_to_hub=false`; se vuoi usare il caricamento automatico, cambia questa riga in `true` e aggiungi `--policy.repo_id`: entrambe sono indispensabili

<RelatedProducts slugs="so-arm101" />
