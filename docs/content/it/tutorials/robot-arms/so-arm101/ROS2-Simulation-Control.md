---
title: "Controllo di simulazione ROS2"
description: "Controllo di simulazione ROS2 per SO-ARM101: workspace completo con descrizione del robot, driver hardware, simulazione Gazebo e pianificazione MoveIt 2."
---

# Controllo di simulazione ROS2

[SO-ARM101_ROS2.zip](/downloads/SO-ARM101_ROS2.zip)

Workspace ROS 2 completo per il braccio robotico a sei gradi di libertà SO-ARM101, che comprende la descrizione del robot, il driver hardware integrato, la simulazione Gazebo e la pianificazione del movimento MoveIt 2.

SO-ARM101 è il braccio follower open source di seconda generazione progettato congiuntamente da [TheRobotStudio](https://www.therobotstudio.com/) e dalla community di [LeRobot](https://huggingface.co/lerobot); utilizza sei servomotori STS3215, una scheda driver per servomotori e componenti in PLA+ stampati in 3D.

**Nota:****il braccio robotico necessita della calibrazione centrale; esegui la calibrazione centrale quando tutte le articolazioni si trovano nella posizione intermedia del loro campo di rotazione**

## Struttura dei pacchetti

Piattaforma di destinazione: **ROS 2 Humble / Jazzy**.

---

## Preparazione dell'ambiente ROS2

Prima di compilare questo progetto, assicurati che ROS 2 e i componenti correlati siano installati sul sistema.

### Requisiti di sistema

- Ubuntu 22.04 (consigliato) o 24.04

- Almeno 4 GB di memoria

- La modalità hardware reale richiede una porta seriale USB

### 0.1  Installazione di ROS 2 Humble

```Bash
# Impostazione della locale
sudo apt update && sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8

# Aggiunta del repository software di ROS 2
sudo apt install software-properties-common
sudo add-apt-repository universe
sudo apt update && sudo apt install curl -y
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# Installazione di ROS 2 Humble Desktop
sudo apt update
sudo apt install ros-humble-desktop
```

### 0.2  Installazione degli strumenti di compilazione e delle dipendenze

```Bash
# Strumento di compilazione colcon
sudo apt install python3-colcon-common-extensions

# MoveIt 2
sudo apt install ros-humble-moveit

# ros2_control
sudo apt install ros-humble-ros2-control \
                 ros-humble-ros2-controllers \
                 ros-humble-controller-manager \
                 ros-humble-joint-state-publisher-gui
```

### 0.3  Impostazione delle variabili d'ambiente

```Bash
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

### 0.4  Impostazione dei permessi della porta seriale (necessario per l'hardware reale)

**Impostazione permanente (consigliata)**:

```Bash
sudo usermod -a -G dialout $USER
# Ha effetto dopo la disconnessione e il nuovo accesso
```

**Impostazione temporanea (da rieseguire dopo ogni riavvio)**:

```Bash
sudo chmod 666 /dev/ttyACM0
```

## Installazione dell'ambiente del workspace

```Markdown
# Passo 1  Creazione del workspace
mkdir -p ~/so101_ws/src
cd ~/so101_ws/src

# Passo 2  Copia del codice sorgente
cp -r /path/to/SO-ARM101_ROS2 ./

# Passo 3  Installazione delle dipendenze di sistema
cd ~/so101_ws
rosdep install --from-paths src --ignore-src -r -y

# Passo 4  Compilazione di tutti i pacchetti
colcon build --symlink-install

# Passo 5  Caricamento dell'ambiente  ← da eseguire in ogni nuovo terminale
source install/setup.bash
```

**Nota sull'hardware reale** — il pacchetto `so_arm_hardware` è già integrato. Non è necessario installare driver aggiuntivi,
comunica direttamente con i servomotori STS3215 tramite la porta seriale utilizzando il protocollo SCS.

## Verifica di visualizzazione

Iniziare da qui è la cosa più semplice——non servono controller né hardware.

```Bash
#  Terminale 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_description view_description.launch.py rviz:=true
```

RViz mostra il modello completo del robot; trascinando i cursori puoi verificare se il movimento di ciascuna articolazione è corretto.

---

## Test dei controller (hardware virtuale / modalità Mock)

Non serve ancora un robot reale; tutto viene eseguito in memoria.

```Bash
#  Terminale 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_description controllers_bringup.launch.py
```

Una volta comparsi i log, il sistema è pronto:

```Bash
joint_state_broadcaster      → active
joint_trajectory_controller  → active
```

**Nota**: la modalità di simulazione avvia solo due controller (`joint_state_broadcaster` e
`joint_trajectory_controller`). `gripper_controller` è stato rimosso; la pinza
viene controllata in modo unificato da `joint_trajectory_controller` insieme a tutte le 6 articolazioni.

### Responsabilità dei controller

## Pianificazione del movimento MoveIt (hardware Mock)

**Basta un solo terminale** — MoveIt avvia automaticamente lo stack dei controller al suo interno.

```Bash
#  Terminale 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config demo.launch.py
```

Dopo l'apertura della finestra RViz:

1. Nel pannello **MotionPlanning**, **Planning Group → manipulator**

2. **Start State → ****`<current>`**, **Goal State → extended**

3. Fai clic in sequenza su **Plan** e **Execute**

Pose preimpostate disponibili: `open`, `zero`, `extended`, `rest`.

### 4.1  Dettagli dell'interfaccia MoveIt

Dopo l'avvio di RViz, sul lato sinistro viene visualizzato il pannello **MotionPlanning**, che contiene le seguenti schede principali:

#### Scheda Planning

#### Parametri di pianificazione

> **Consiglio per il primo test**: imposta Velocity e Acceleration su 0.3 per ridurre la velocità di movimento e garantire la sicurezza.
> 
> 

#### Scheda Scene Objects

- Aggiungi ostacoli (Box / Sphere / Cylinder) per il rilevamento delle collisioni

- Importa / esporta la scena

- MoveIt pianifica automaticamente evitando gli ostacoli

#### Scheda Stored States

- Salva le pose del braccio robotico usate di frequente

- Pose predefinite: `open`, `zero`, `extended`, `rest`

### 4.2  Flusso operativo di base

#### Metodo A: trascinamento interattivo (consigliato)

1. Nella vista 3D, individua il **marcatore interattivo** all'estremità del braccio robotico (frecce e anelli colorati)

2. Trascina le frecce per traslare la posizione dell'estremità, trascina gli anelli per ruotarne l'orientamento

3. Il sistema risolve automaticamente la cinematica inversa (IK) e aggiorna in tempo reale gli angoli delle articolazioni

4. Fai clic su **Plan** per visualizzare la traiettoria pianificata (arancione)

5. Dopo la conferma, fai clic su **Execute** per eseguire

> Se il trascinamento risulta a scatti, si consiglia di partire dalla posa preimpostata `rest` prima di trascinare.
> 
> 

#### Metodo B: pose preimpostate

1. Menu a tendina **Query Goal State** → seleziona `open` / `extended` / `rest` ecc.

2. Fai clic su **Update**

3. Fai clic su **Plan**

4. Fai clic su **Execute**

#### Metodo C: impostazione manuale degli angoli delle articolazioni

1. **Query Goal State** → scheda **Joints**

2. Trascina gli slider di ciascuna articolazione per impostare gli angoli desiderati

3. Riferimento per gli intervalli delle articolazioni:

1. Fai clic su **Update**

2. Fai clic su **Plan**

3. Fai clic su **Execute**

#### Metodo D: obiettivo casuale valido

Fai clic sul pulsante **Random Valid** per generare automaticamente una posa casuale raggiungibile, poi Plan → Execute.

### 4.3  Avvertenze di sicurezza

1. **Riduci la velocità al primo utilizzo**: imposta Velocity / Acceleration su 0.1–0.3

2. **Arresto di emergenza**: interrompi il programma con Ctrl+C in qualsiasi momento oppure scollega l'alimentazione

3. **Limiti delle articolazioni**: MoveIt non pianifica oltre gli intervalli di `joint_limits.yaml`, ma è necessario assicurarsi che la configurazione sia corretta

4. **Hardware reale**: prima dell'esecuzione, assicurati che intorno al braccio robotico vi sia spazio sufficiente

### Panoramica della configurazione di MoveIt

---

## Simulazione Gazebo

La simulazione Gazebo richiede l'**esecuzione simultanea di 4 terminali**. Esegui seguendo rigorosamente l'ordine.

### 5.1  Avvio della simulazione Gazebo  (Terminale 1)

```Bash
#  Terminale 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm_gz so_arm_gz_bringup.launch.py
```

Attendi la comparsa della finestra Gazebo; il robot rimane brevemente sospeso in aria e poi atterra.

### 5.2  Caricamento del controller di traiettoria  (Terminale 2)

Per impostazione predefinita Gazebo attiva solo `forward_position_controller`; è necessario passare manualmente a
`joint_trajectory_controller`:

```Markdown
#  Terminale 2
source ~/so101_ws/install/setup.bash

# Passo A — Disattivazione di forward_position_controller
ros2 control set_controller_state forward_position_controller inactive

# Passo B — Caricamento e attivazione di joint_trajectory_controller con lo spawner
ros2 run controller_manager spawner joint_trajectory_controller

# Passo C — Verifica
ros2 control list_controllers
```

Output atteso:

```Bash
forward_position_controller  inactive
joint_state_broadcaster      active
joint_trajectory_controller  active
```

⚠️ Non usare prima `ros2 control load_controller`! Imposterebbe il controller nello
stato `unconfigured`, impedendo allo spawner di attivarlo. Se lo hai già eseguito, prima
usa `unload_controller` e ricomincia.

### 5.3  Avvio di move_group  (Terminale 3)

```Bash
#  Terminale 3
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config move_group.launch.py use_sim_time:=True
```

### 5.4  Avvio di RViz  (Terminale 4)

```Bash
#  Terminale 4
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config moveit_rviz.launch.py
```

Una volta che RViz è pronto:

1. **Planning Group → manipulator**

2. **Goal State → open** (oppure `extended`, `rest`)

3. Fai clic in sequenza su **Plan** e **Execute**

Le articolazioni del braccio in Gazebo seguono il movimento.

**Nota**: a causa del limite sul guadagno PID della versione Humble di `gz_ros2_control`,
la pinza potrebbe non aprirsi fisicamente in Gazebo (il log di esecuzione mostra comunque successo).
La modalità Mock e l'hardware reale non presentano questo problema.

### 5.5  Modalità headless (senza GUI)

```Bash
ros2 launch so_arm_gz so_arm_gz_bringup.launch.py \
  gazebo_gui:=false \
  launch_rviz:=false
```

### 5.6  Risoluzione dei problemi: quando il caricamento fallisce ripetutamente

Se lo spawner continua a segnalare `Failed to activate controller`, esegui i seguenti passaggi per reimpostare completamente:

```Bash
# 1. Scarica il controller bloccato
ros2 control unload_controller joint_trajectory_controller

# 2. Disattiva forward_position_controller
ros2 control set_controller_state forward_position_controller inactive

# 3. Esegui nuovamente lo spawn
ros2 run controller_manager spawner joint_trajectory_controller
```

## Hardware reale

Prerequisito: il braccio robotico SO-ARM101 è già assemblato e la scheda driver dei servomotori è collegata al computer tramite USB.

### 6.1  Avvio dei controller (opzionale)

```Bash
#  Terminale 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_description controllers_bringup.launch.py \
  hardware_type:=real \
  usb_port:=/dev/ttyACM0
```

Il plugin `so_arm_hardware` esegue automaticamente:

1. Apre la porta seriale

2. Scansiona i 6 ID dei servomotori (1–6)

3. Verifica che ogni servomotore risponda

4. Attiva la coppia e legge la posizione attuale

Una volta pronti i controller, apri altri due terminali per avviare MoveIt:

```Bash
#  Terminale 2 — move_group
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config move_group.launch.py
```

```Bash
#  Terminale 3 — RViz
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config moveit_rviz.launch.py
```

### 6.2  MoveIt (avvio con un solo comando)

> Il seguente comando **sostituisce** il punto 6.1 (non eseguirli contemporaneamente; arresta i comandi del punto 6.1)——`demo.launch.py` include già al suo interno lo stack dei controller.
> 
> 

```Bash
#  Terminale 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config demo.launch.py \
  hardware_type:=real \
  usb_port:=/dev/ttyACM0
```

### 6.3  Risoluzione dei problemi della porta seriale

### 6.4  Visualizzazione di RViz non coerente con la posa reale

Se la posa del braccio robotico in RViz non è coerente con l'hardware reale (ad esempio offset delle articolazioni, falsi rilevamenti di collisione):

1. Verifica che i servomotori abbiano completato la calibrazione centrale

2. Regola il `position_offset` di ciascuna articolazione in `so_arm101.ros2_control.xacro`

3. Formula di conversione: `nuovo offset = offset attuale + (rad attuali visualizzati / 0.00153398)`

4. Dopo la modifica, ricompila il pacchetto `so_arm101_description`

---

## Domande frequenti

### Q1: durante la compilazione viene segnalato "package not found"

**R**: assicurati di aver installato correttamente tutte le dipendenze di sistema e di aver eseguito il source dell'ambiente ROS 2:

```Bash
source /opt/ros/humble/setup.bash
cd ~/so101_ws
rosdep install --from-paths src --ignore-src -r -y
colcon build --symlink-install
```

### Q2: all'avvio viene segnalato "Permission denied" nell'accesso alla porta seriale

**R**: controlla i permessi della porta seriale:

```Bash
# Soluzione temporanea
sudo chmod 666 /dev/ttyACM0

# Soluzione permanente (ha effetto dopo la disconnessione)
sudo usermod -a -G dialout $USER
```

### Q3: la pianificazione di MoveIt fallisce con il messaggio "Motion planning start tree could not be initialized"

**R**: di solito ci sono due cause:

1. **Articolazione oltre il limite** — controlla l'output di `FixStartStateBounds` nel log. La tolleranza attuale è
0.3 rad; se l'eccesso rientra in questo intervallo viene accettato. In caso contrario occorre regolare `start_state_max_bounds_error`
oppure controllare l'offset dei servomotori.

2. **Collisione dello stato iniziale** — controlla l'output di `FixStartStateCollision` nel log. Se
compare "Unable to find a valid state nearby", significa che la posa attuale presenta un'autocollisione.
Il braccio robotico potrebbe trovarsi in una posa ripiegata (ad esempio se il gripper tocca la shoulder) oppure l'offset non è corretto.
Regola `position_offset` e riprova.

### Q4: dopo Execute il braccio robotico non si muove

**R**: controlla lo stato dei controller:

```Bash
ros2 control list_controllers
```

Assicurati che `joint_trajectory_controller` sia in stato `active`. In caso contrario, esegui nuovamente lo spawn:

```Bash
ros2 run controller_manager spawner joint_trajectory_controller
```

### Q5: RViz si avvia lentamente o si blocca

**R**: è un comportamento normale. All'avvio MoveIt carica il modello URDF, i plugin di rilevamento delle collisioni,
i risolutori cinematici, ecc.; il primo avvio richiede circa 10 secondi.

### Q6: il percorso pianificato non è fluido o presenta vibrazioni

**R**: prova i seguenti metodi:

- Passa a un pianificatore diverso (nel menu a tendina Planner di RViz seleziona `RRTConnect`)

- Aumenta il Planning Time a 10 secondi

- Verifica che l'obiettivo sia all'interno dello spazio di lavoro (prova con `Random Valid`)

### Q7: in Gazebo la pinza non si muove

**R**: si tratta di una limitazione dovuta al valore di guadagno PID codificato in modo fisso nella versione Humble di `gz_ros2_control`
(fissato a 0.1), non sovrascrivibile tramite i parametri URDF. Nel log Execute risulta riuscito,
ma nella simulazione fisica di Gazebo la pinza non si apre. La modalità Mock e l'hardware reale non presentano questo problema.

## Appendice: riferimento rapido dei parametri di avvio

### `controllers_bringup.launch.py`

### `so_arm_gz_bringup.launch.py`

---

## Layout delle directory

```Bash
SO-ARM101_ROS2/
├── so_arm_utils/                   # Libreria di utilità Python
├── so_arm101_description/          # URDF · controller · mesh · RViz · MuJoCo
├── so_arm101_moveit_config/        # MoveIt 2 SRDF · planner · file di launch
├── so_arm_gz/                      # Avvio della simulazione Gazebo
├── so_arm_hardware/                # Driver seriale SCS integrato (C++)
└── Simulation/                     # URDF CAD originale (conservato come riferimento)
```

<RelatedProducts slugs="so-arm101" />
