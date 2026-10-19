---
title: "03 · Connessione al robot reale e calibrazione"
description: "Quando si collega la scheda driver con chip CH343 compare subito una porta COM; il numero cambia con inserimenti/rimozioni o cambio di porta USB, quindi veri…"
---

# 03 · Connessione al robot reale e calibrazione

> Prerequisito: completare [01 Preparazione dell'ambiente](/it/tutorials/robot-arms/so-arm101/mujoco/01-Environment) (l'extra `feetech` fornisce la comunicazione seriale).
> Porte di esempio in questo capitolo: follower `COM172`, leader `COM124` (valori misurati sul braccio leader attualmente in uso su questa macchina): **il numero può cambiare a ogni inserimento/rimozione,
> quindi fai sempre riferimento alla porta effettiva trovata al primo passo**; nei comandi seguenti basta sostituire il numero con il tuo.

## Identificazione della porta seriale

Quando si collega la scheda driver con chip CH343 compare subito una porta COM; il numero cambia con inserimenti/rimozioni o cambio di porta USB, quindi verifica prima di ogni connessione:

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'
uv run --frozen python -c "import serial.tools.list_ports as lp; [print(p.device, '|', p.description, '|', p.hwid) for p in lp.comports()]"
```

La riga dell'output in cui compare `CH343` (o un dispositivo seriale USB simile) è quella della scheda driver; annota il suo numero `COM`.

## Primo passo: controllo iniziale in sola lettura (cablaggio/alimentazione/servo)

**Senza scrivere nulla**, esegui prima un ping su ciascuno dei sei servo, poi leggi tensione e temperatura (lo stato di coppia resta invariato):

```bash
uv run --frozen python examples/so101_mujoco/hardware_check.py --port COM172   # 换成你查到的端口
```

`--port` è il numero trovato al primo passo; inserisci quello del braccio da controllare (lo stesso script può controllare sia follower sia leader).

Un output normale è del tipo: sei righe di giunti, temperatura 20–30 °C, coppia 0 (braccio libero). **La tensione dipende dal tipo di alimentazione**: con il follower collegato a un
alimentatore esterno è circa 11V, con il leader alimentato solo dalla scheda driver è circa 5V; se riesci a leggere tutti e sei i servo, il cablaggio è corretto. Servo mancanti o di modello
non corrispondente producono un errore immediato.

## Secondo passo: calibrazione

La calibrazione scrive nell'EEPROM dei servo "l'intervallo di corsa di ogni giunto + il riferimento di posizione centrale" e lo salva in un file locale; **follower e leader vanno calibrati entrambi una volta**.
I file di calibrazione dei due bracci sono memorizzati separatamente e non si influenzano a vicenda:

| Dispositivo | Comando | Posizione del file di calibrazione |
| --- | --- | --- |
| Follower | `uv run --frozen lerobot-calibrate --robot.type=so101_follower --robot.port=COM172 --robot.id=juxi_so101` | `~/.cache/huggingface/lerobot/calibration/robots/so_follower/juxi_so101.json` |
| Leader | `uv run --frozen lerobot-calibrate --teleop.type=so101_leader --teleop.port=COM124 --teleop.id=juxi_leader` | `.../calibration/teleoperators/so_leader/juxi_leader.json` |

Significato dei parametri nei comandi:

| Parametro | Descrizione |
| --- | --- |
| `--robot.type=so101_follower` / `--teleop.type=so101_leader` | Ruolo dell'oggetto da calibrare: follower / leader (non invertire i ruoli: i file di calibrazione sono memorizzati in directory separate per ruolo) |
| `--robot.port` / `--teleop.port` | Numero della porta seriale trovato al primo passo |
| `--robot.id` / `--teleop.id` | Nome assegnato a questo braccio (in questo esempio `juxi_so101` / `juxi_leader`); **teleoperazione e registrazione successive devono usare lo stesso id**, altrimenti verrà richiesta di nuovo la calibrazione |

`id` può essere qualsiasi nome, ma le calibrazioni dei due bracci sono indipendenti e non si sovrascrivono a vicenda.

### Passi fisici (il terminale stampa uno schema)

1. **Porta il braccio nella posa centrale e premi Invio**: appoggia la base sul bordo del tavolo, braccio superiore verticale verso l'alto, avambraccio orizzontale in avanti,
   rotazione della spalla e del polso centrate (il "gripper" del leader è l'impugnatura/grilletto). La posizione assunta in questo istante viene registrata come "riferimento centrale" del braccio.
2. Dopo Invio, **percorri lentamente l'intero campo di movimento di ogni giunto** (`wrist_roll` non va percorso: viene gestito automaticamente come giro completo), poi premi Invio per salvare.

Avvertenze:

- Durante la calibrazione del follower la coppia è 0 (il braccio è floscio): muovilo sostenendolo con la mano; il leader è già privo di coppia.
- La procedura di calibrazione scrive nell'EEPROM dei servo (fa parte della calibrazione, è normale).
- Risultati di calibrazione misurati in questa sessione (per confronto): la corsa dei giunti del follower è di circa 1474–2688 conteggi, la rotazione del polso (`wrist_roll`) 4095 conteggi;
  il leader circa 2208–2681 conteggi. Una corsa marcatamente asimmetrica è normale (motivo e compensazione in
  [05 Micro-regolazione dello zero](/it/tutorials/robot-arms/so-arm101/mujoco/05-Leader-Digital-Twin)).

<RelatedProducts slugs="so-arm101" />
