---
title: Teleoperação sem fios do SO-ARM101 (versão ESP32-NanoCam)
description: "Solução de teleoperação sem fios para demonstrações em competição: o braço líder liga-se a um computador Ubuntu através do LeRobot e o braço seguidor é."
---

# Teleoperação sem fios do SO-ARM101 (versão ESP32-NanoCam)

> **[Comprar na loja](https://www.juxitech.com/products/esp32-s3-wifi-video-module)**

Este tutorial destina-se ao cenário de demonstração em competição de teleoperação sem fios de um braço SO-ARM101 montado num drone: o braço líder liga-se a um computador Ubuntu através do LeRobot e o braço seguidor é controlado pelo [módulo de vídeo WiFi ESP32-S3](/pt-pt/products/esp32-s3-wifi-module) desenvolvido internamente (ESP32-NanoCam, ESP32-S3 N16R8), recebendo comandos por micro-ROS WiFi UDP e integrando câmara FPV na placa, microfone, altifalante e luz de estado RGB. Em caso de problemas, consulte o [guia de resolução de problemas](./SO-ARM101-NanoCam-Troubleshooting.md).

## Introdução e arquitetura do sistema

```text
SO-ARM101 braço líder (leader) → placa de acionamento de servos USB → Ubuntu 22.04 (LeRobot + ROS2 Humble + micro-ROS Agent)
                                            │  2.4 GHz Wi-Fi (mesma rede local)
                                            ▼
                              ESP32-NanoCam controlador do braço seguidor (ESP32-S3)
                                            │  1 Mbps UART (via pinos UART da placa de acionamento de servos)
                                            ▼
                              SO-ARM101 braço seguidor (follower) 6 × STS3215
```

- Movimento do operador no braço líder → o LeRobot lê o braço líder → tópico ROS2 `/joint_command` → o micro-ROS Agent envia por UDP 8888 → o ESP32-NanoCam recebe e aciona os 6 servos;
- O braço seguidor devolve o feedback `/joint_states` (20 Hz) no sentido inverso, como ciclo fechado e watchdog;
- A câmara integrada publica um fluxo MJPEG em `http://<IP>/stream` (FPV), que o lado do PC pode converter num tópico ROS.

Divisão de papéis: o braço líder liga-se ao computador Ubuntu; o braço seguidor é controlado pelo ESP32-NanoCam; a ligação entre os dois é sem fios. Funcionalidades integradas na placa depois de o firmware ser alimentado:

| Funcionalidade | Implementação | Descrição |
|---|---|---|
| Teleoperação micro-ROS | `main.cpp` + `servo_bus.cpp` | Feedback `/joint_states` a 20 Hz, receção de comandos `/joint_command`, com mecanismos de segurança completos integrados |
| Câmara FPV | `camera_stream.cpp` | Fluxo MJPEG `http://<IP>/stream` (QVGA) |
| Microfone | `audio_es8311.cpp` | Nível de som ambiente → `/follower_audio/level` (Float32, 5 Hz) |
| Altifalante | `audio_es8311.cpp` | Sons de arranque/prontidão/desbloqueio/erro |
| Luz de estado RGB | `rgb_status.cpp` | Arranque vermelho → WiFi laranja → micro-ROS verde → desbloqueio azul; perda de WiFi vermelho |

## Lista de hardware

| Hardware | Quantidade | Descrição |
|---|---|---|
| Braço líder SO-ARM101 | 1 | Com 6 servos STS3215 |
| Braço seguidor SO-ARM101 | 1 | Com 6 servos STS3215 |
| Módulo ESP32-NanoCam | 1 | ESP32-S3 N16R8, com câmara/áudio/RGB integrados |
| Placa de acionamento de servos USB | 2 | Calibração + intermediação do barramento dos braços líder e seguidor (pinos UART) |
| Computador com Ubuntu 22.04 | 1 | Executa o LeRobot + ROS2 + Agent |
| Router 2,4 GHz ou hotspot do telemóvel | 1 | O computador do braço líder e o NanoCam na mesma rede local |
| Fonte de alimentação externa 12V 5A | 1 | **Alimentação do braço seguidor** (o USB não consegue alimentar 6 servos) |
| Fonte de alimentação externa 5V 6A | 1 | **Alimentação do braço líder** (ligado ao computador Ubuntu) |
| Cabo de dados USB-C | 2 | Alimentação/depuração do NanoCam + ligação da placa de acionamento do braço líder ao computador |

> Periféricos integrados no NanoCam: câmara GC2145 (DVP); áudio ES8311 (I2S 24 kHz, microfone AP2718AT + altifalante NS4150B); RGB WS2812 @ GPIO18.

## Modo de cablagem

A ligação entre o ESP32-NanoCam e o braço seguidor é feita **através dos pinos UART da placa de acionamento de servos**:

```text
UART da placa de acionamento:   RX ←── NanoCam TX (P2-8 / GPIO20)
                                TX ──→ NanoCam RX (P2-7 / GPIO19)
                               GND ──→ NanoCam GND
```

- **TX liga a RX e RX liga a TX (cruzado)**, GND comum, taxa de baud de 1 Mbps;
- O barramento de servos do NanoCam usa UART1 e liga-se aos **P2-7 / P2-8** do módulo (a porta série de depuração usa USB-C, CH340K → UART0; são totalmente independentes e podem ser usadas ao mesmo tempo);
- O barramento de servos e a alimentação dos servos partilham o mesmo GND (fonte de 12V 5A do braço seguidor).

### Pinos principais do NanoCam

| Periférico | Pino |
|---|---|
| Barramento de servos (UART1) | TX=GPIO20(P2-8 ESP_P), RX=GPIO19(P2-7 ESP_N), barra de pinos P2 do módulo |
| Porta série de depuração (UART0) | GPIO43/44 → CH340K integrado → USB-C (sem USB CDC nativo) |
| Câmara DVP (GC2145) | D0~D7=GPIO4/2/1/3/5/7/8/10, PCLK=6, VSYNC=13, HREF=11, XCLK=9 (24MHz), PWDN=12, RESET=14, SCCB SDA/SCL=41/42 |
| Áudio ES8311 (I2S) | MCLK=39, BCLK=38, WS=47, DIN(ADC)=40, DOUT(DAC)=48; I2C SDA/SCL=41/42, endereço 0x30 |
| Microfone | AP2718AT MEMS analógico (via ADC do ES8311) |
| Altifalante | Amplificador classe D NS4150B (via DAC do ES8311), sem pino de ativação de PA na placa |
| RGB | WS2812 @ GPIO18 (1 unidade, GRB, acionado por RMT) |
| BOOT | GPIO0 |

> As definições dos pinos vêm de `docs/reference/nano_config.h` e da documentação do esquemático de hardware.

## Alimentação

| Dispositivo | Modo de alimentação |
|---|---|
| ESP32-NanoCam | **Alimentação pelo cabo de dados USB** (a porta série de depuração CH340K funciona ao mesmo tempo) |
| Braço seguidor (6×STS3215) | Fonte externa de **12V 5A** |
| Braço líder (ligado ao computador Ubuntu) | Fonte externa de **5V 6A** |

> ⚠️ O USB não consegue alimentar 6 servos: o braço seguidor tem obrigatoriamente de ser alimentado por uma fonte externa de 12V 5A; o ESP32 pode ser alimentado pelo cabo de dados USB.

## Requisitos de ambiente

### Lado da compilação e gravação (Windows / Linux / macOS)

| Item | Requisito |
|---|---|
| Sistema operativo | Windows 10/11 ou Linux (macOS também) |
| Python | 3.8+ (verificar com `python --version`) |
| PlatformIO | Core 6.x (com toolchain esp32s3 + framework Arduino) |
| Espaço em disco | Pelo menos 3 GB livres |
| Rede | Acesso ao GitHub / CDN da Espressif (a primeira transferência da toolchain é de cerca de 1-2 GB) |

### Lado de execução (computador Ubuntu 22.04, onde a teleoperação é executada)

| Item | Requisito |
|---|---|
| Sistema operativo | Ubuntu 22.04 (64 bits) |
| ROS 2 | Humble (Hawksbill) |
| LeRobot | Com suporte Feetech SO-101 (`so101_leader` / `so101_follower`) |
| micro-ROS Agent | `snap run micro-ros-agent` ou instalação a partir do código-fonte |
| Comandos necessários | `nmcli`, `ip`, `flock` (incluídos no NetworkManager, iproute2 e util-linux) |
| Ambiente Python | Ambiente virtual `lerobot_so101` (conda/miniforge) |

> Identificação da porta série de depuração: a interface USB do NanoCam é um CH340K convertido para UART0; no Linux o nome do dispositivo é normalmente `/dev/ttyUSB0` (ou `/dev/serial/by-id/...CH340*`) e o PlatformIO reconhece-o automaticamente (a definição da placa já inclui o HWID do CH340 0x1A86:0x7523); a taxa de baud do monitor série é 115200. Para uma instalação mais completa do ambiente LeRobot/Ubuntu, consulte o [Tutorial de utilização do SO-ARM101](./SO-ARM101-Tutorial.md).

## Passos de instalação

### 1. Instalar o PlatformIO (lado da compilação e gravação)

**Opção A: extensão do VSCode (recomendada)**

1. Instale o [VSCode](https://code.visualstudio.com/);
2. Pesquise **PlatformIO IDE** na loja de extensões e instale; a instalação reinicia automaticamente e descarrega o PlatformIO Core;
3. Verifique com `pio --version` no terminal do VSCode.

**Opção B: instalação pela linha de comandos**

```bash
pip install platformio
```

> No Windows, se o comando `pio` não for encontrado no Git Bash, use um terminal PowerShell/CMD ou adicione `C:\Users\<nome_de_utilizador>\.platformio\penv\Scripts` ao PATH.

### 2. Primeira compilação (descarrega automaticamente a toolchain)

Entre no diretório do firmware e faça uma compilação (sem gravar):

```bash
cd firmware/nanocam_soarm
pio run
```

Na primeira vez serão descarregados, por ordem:

1. A plataforma espressif32 (`espressif32@7.0.1`);
2. A **toolchain** `toolchain-xtensa-esp32s3` (cerca de 100 MB, do CDN da Espressif);
3. O framework Arduino `framework-arduinoespressif32` (cerca de 200 MB).

Se a transferência estiver lenta ou bloquear:

- A estimativa de tempo restante do PlatformIO não é exata e é comum ficar parada algum tempo para depois terminar de repente; dê 5 minutos e observe se a percentagem avança;
- Ative um proxy/VPN (usa o proxy do sistema);
- Descarregue a toolchain manualmente: no navegador, transfira `https://dl.espressif.com/dl/xtensa-esp32s3-elf-gcc8_4_0-esp-2021r2-patch5-win32.zip` (no Linux, o equivalente `-linux-amd64.tar.gz`), descomprima, renomeie a pasta para `toolchain-xtensa-esp32s3`, coloque-a em `C:\Users\<nome_de_utilizador>\.platformio\packages\` e volte a executar `pio run`;
- Interromper com Ctrl+C a meio não danifica o ambiente; uma nova execução retoma a transferência.

### 3. Instalar o ambiente de execução no Ubuntu

```bash
# 1. ROS 2 Humble (instalar segundo a documentação oficial)
#    https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debs.html
source /opt/ros/humble/setup.bash

# 2. LeRobot (com suporte Feetech)
conda create -n lerobot_so101 python=3.10 -y
conda activate lerobot_so101
pip install lerobot[feetech]

# 3. micro-ROS Agent
sudo snap install micro-ros-agent
snap run micro-ros-agent udp4 --port 8888   # testar se arranca

# 4. PlatformIO (caso também queira compilar e gravar no lado Ubuntu)
pip install platformio
```

## Configurar o WiFi

O PC e o NanoCam têm de estar na mesma rede local (WiFi de 2,4 GHz; um hotspot do telemóvel serve) e o router/hotspot não pode ter isolamento de clientes ativo. Há duas formas de configurar o WiFi; escolha uma.

### Opção 1: configuração no momento da compilação (predefinida)

```bash
cd firmware/nanocam_soarm
cp src/wifi_config.example.h src/wifi_config.h
# editar wifi_config.h: WIFI_SSID / WIFI_PASS / AGENT_IP (IP do computador Ubuntu na rede local)
```

### Opção 2: configuração por comandos na porta série (recomendada, sem regravar o firmware)

O firmware inclui configuração em tempo de execução (armazenada em NVS), que pode ser introduzida a qualquer momento pela porta série de depuração (taxa de baud 115200):

| Comando | Função |
|---|---|
| `wifi_ssid:nome-da-sua-rede` | Definir e guardar o nome da WiFi |
| `wifi_pass:a-sua-palavra-passe` | Definir e guardar a palavra-passe da WiFi |
| `agent_ip:IP-do-computador-Ubuntu` | Definir e guardar o IP do micro-ROS Agent |
| `wifi_show` | Ver a configuração atualmente em vigor |
| `wifi_clear` | Apagar a configuração guardada e voltar à predefinição de compilação |

Depois de guardar qualquer comando de definição, o módulo **reinicia automaticamente ao fim de 3 segundos** para aplicar as alterações. Prioridade: configuração guardada pela porta série > predefinição de compilação. Para mudar de hotspot ou de computador, basta ligar o USB e introduzir três comandos, sem alterar código nem regravar o firmware.

> Os valores predefinidos de compilação (`wifi_config.h`) são sempre mantidos como alternativa quando não foi usada a configuração por porta série; o `wifi_show` distingue o que «vem da NVS» do «predefinido de compilação». A palavra-passe é guardada em texto simples na NVS, o que é aceitável em cenários de demonstração em rede local; o `wifi_config.h` contém a palavra-passe da WiFi e está excluído pelo `.gitignore` — não o envie para o repositório.

## Gravação e arranque

```bash
cd firmware/nanocam_soarm
pio run --target upload
```

**Entrar no modo de download (passo crítico)**: o NanoCam grava através do CH340K → UART0 (porta série), não por USB CDC automático. Execute primeiro o upload diretamente; se a placa tiver circuito de download automático, funciona logo; se indicar que não consegue ligar: **mantenha premido o botão BOOT (GPIO0) → ligue o USB (ou prima o reset) → largue o BOOT** e volte a executar o upload imediatamente. No Windows, se a porta série não for reconhecida automaticamente, acrescente uma linha `upload_port = COM3` em `[env:nano_cam]` do `platformio.ini` (substitua pelo número COM real do CH340 no Gestor de Dispositivos).

Ver o registo da porta série:

```bash
pio device monitor --baud 115200
```

Após a gravação, deverá ver (por esta ordem):

```text
audio: ES8311 ready @24000Hz      ← áudio inicializado com sucesso
Servo Ping mask: 0x3f             ← os 6 servos estão todos online
Servo calibration match: YES      ← vetores de calibração iguais à EEPROM dos servos
IP: 192.168.x.x  RSSI: -xx        ← WiFi ligado
Waiting for micro-ROS Agent...    ← à espera do Agent (desaparece depois de o iniciar)
```

> O barramento de servos pode ficar desligado durante a gravação; gravação e funcionamento dos servos não interferem entre si (depuração em UART0 / servos em UART1, independentes). O projeto já inclui a biblioteca estática micro-ROS para ESP32-S3 (xtensa-lx7), pelo que não é preciso compilá-la no uso diário.

## Notas sobre a calibração

O diretório `cali/` do projeto já contém os ficheiros de calibração do braço líder/seguidor, e os vetores de calibração do firmware já estão alinhados com a calibração do braço seguidor (ou seja, `cali/follower_recal.json`). **Só é necessário recalibrar quando se substitui o hardware do braço seguidor/líder.**

```bash
# braço seguidor
python -m lerobot.scripts.lerobot_calibrate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --robot.id=follower_recal --robot.calibration_dir="$PWD/cali"

# braço líder
python -m lerobot.scripts.lerobot_calibrate \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM0 \
  --teleop.id=leader_recal --teleop.calibration_dir="$PWD/cali"
```

Depois de recalibrar o braço seguidor, é obrigatório abrir `firmware/nanocam_soarm/src/servo_bus.cpp` e substituir os três vetores `kHomingOffsets` / `kRangeMin` / `kRangeMax` pelos valores do seu `cali/follower_recal.json` (ordem: shoulder_pan, shoulder_lift, elbow_flex, wrist_flex, wrist_roll, gripper) e voltar a compilar e gravar.

## Executar a teleoperação sem fios

### Verificações antes de arrancar

```bash
# 1. O computador Ubuntu está ligado ao mesmo WiFi de 2.4GHz que o NanoCam
# 2. A placa de acionamento USB do braço líder está ligada e reconhecida
ls -l /dev/ttyACM*   # encontrar a porta série do braço líder
# 3. O NanoCam do braço seguidor está alimentado e ligado à rede (confirmar via porta série ou navegador que o fluxo MJPEG está acessível)
```

### Arranque com um só comando

```bash
# definir o ambiente (ou editar diretamente os valores predefinidos no topo de start_soarm_demo.sh)
export SOARM_WIFI_SSID="o-seu-hotspot-2.4G"
export SOARM_AGENT_IP="IP-do-computador-Ubuntu"
export SOARM_LEADER_PORT="/dev/ttyACM*"
export SOARM_PYTHON="$(command -v python)"   # ambiente lerobot_so101

./start_soarm_demo.sh --check    # verificação prévia: rede / braço líder / Agent / braço seguidor online
./start_soarm_demo.sh            # iniciar a teleoperação; Ctrl+C para parar
```

O script faz, por ordem:

1. Verifica a rede (o SSID tem de coincidir com `EXPECTED_WIFI_SSID`), a porta série do braço líder e a existência dos ficheiros de calibração;
2. Inicia o micro-ROS Agent (se não estiver a correr, o log fica em `logs/micro_ros_agent.log`);
3. Aguarda que o `/joint_states` do braço seguidor apareça (timeout de 15 s);
4. Movimento do braço líder → seguimento do braço seguidor, frequência de comandos de 30 Hz, **`--mapping-mode absolute` (mapeamento absoluto)**.

**Sobre o mapeamento absolute**: a pose do braço líder e a do braço seguidor correspondem-se um a um nos respetivos sistemas de coordenadas de calibração; a vantagem é que **após desconexão e reconexão não há desvio acumulado** — ao reconectar, o braço seguidor alinha suavemente com a pose atual do braço líder em 8 segundos (startup_blend) e, a partir daí, quando o braço líder regressa ao zero o seguidor também regressa ao seu zero. Chegou a usar-se o mapeamento relative (relativo), mas após desconexão e reconexão o braço seguidor ficava na posição em que se desconectou, criando um desvio permanente em relação ao braço líder que regressava ao zero, pelo que se passou para absolute.

**Reinício automático quando o Agent se perde** (firmware posterior a 2026-08-19): depois de parar a teleoperação com Ctrl+C, o braço seguidor reinicia automaticamente em cerca de 10 segundos e volta a `Waiting for micro-ROS Agent...`, pelo que pode simplesmente voltar a executar este script, sem reiniciar manualmente o braço seguidor (durante a reconexão, o braço seguidor regressa à posição zero, ou seja, é como voltar a alimentá-lo).

Quando a ligação é estabelecida, a porta série do braço seguidor imprime `micro-ROS ready` (o RGB fica verde e o altifalante toca o som de prontidão) e o `Waiting for micro-ROS Agent...` desaparece.

### Verificar os tópicos manualmente

```bash
ros2 topic echo /joint_states --once           # feedback do braço seguidor
ros2 topic hz /joint_states                    # deverá ser cerca de 20 Hz
ros2 topic echo /follower_audio/level --once   # nível do microfone (sobe quando se fala)
```

## Câmara FPV

Depois de alimentado e ligado à rede, o firmware inicia automaticamente o serviço de streaming MJPEG (GC2145 integrada, interface DVP, porta HTTP predefinida 80):

```text
http://<NANOCAM_IP>/         página de informações
http://<NANOCAM_IP>/jpg      fotograma JPEG único (snapshot)
http://<NANOCAM_IP>/stream   fluxo MJPEG contínuo (FPV)
```

### Parâmetros e afinação

- Resolução **QVGA 320×240** (configuração final), **captura RGB565 + codificação por software com `frame2jpg`** (a GC2145 não tem codificador JPEG por hardware; só a OV2640/OV5640 têm), qualidade JPEG 12, duplo buffer em **PSRAM Octal de 8MB**;
- **Porquê QVGA**: na prática, o VGA (640×480) RGB565 tem um débito de dados demasiado alto para o DVP desta placa e cerca de 2/3 da parte inferior da imagem fica com artefactos (reproduzido com todas as combinações de XCLK 24/20/16MHz × buffer simples/duplo); o QVGA é completo e fluido (a taxa de fotogramas é inferior à do JPEG por hardware, o que é normal);
- O streaming corre numa tarefa httpd separada (a stack foi aumentada para 16KB para acomodar a codificação por software), sem interferir com a teleoperação micro-ROS nem com a captura de áudio;
- Porta HTTP predefinida 80 (`HTTPD_DEFAULT_CONFIG()` do firmware);
- Para alterar a resolução/qualidade: edite `config.frame_size` / `kJpegQuality` em `firmware/nanocam_soarm/src/camera_stream.cpp`; a orientação da imagem ajusta-se com `set_vflip` / `set_hmirror` (no mesmo ficheiro);
- O esp_http_server é uma única tarefa: `/stream` e `/jpg` **não podem ser acedidos ao mesmo tempo** (com o fluxo aberto, o `/jpg` fica pendurado);
- Se a inicialização da câmara falhar, o firmware imprime uma linha de aviso e continua a funcionar normalmente; a teleoperação não é afetada.

Receção no lado do PC (publicação como tópico ROS 2, tipo de mensagem `sensor_msgs/CompressedImage`):

```bash
# Terminal 1: iniciar a teleoperação normalmente
./start_soarm_demo.sh

# Terminal 2: receber o vídeo e publicar o tópico
source /opt/ros/humble/setup.bash
python3 tools/follower_camera.py --stream http://<NANOCAM_IP>/stream
# opcional: --topic /topico-personalizado  --max-fps 10

# verificação
ros2 topic hz /follower_camera/image_raw/compressed   # deverá ser cerca de 10~15 Hz
rviz2    # Add → By topic → Camera, escolher /follower_camera/image_raw/compressed
```

Também pode verificar a ligação sem instalar ROS: abra `http://<NANOCAM_IP>/stream` no navegador, ou execute `curl -s http://<NANOCAM_IP>/jpg -o snap.jpg`.

## Áudio (microfone e altifalante)

**Microfone**: AP2718AT MEMS analógico (via ADC do ES8311). O firmware lê o nível de som ambiente a cada 200ms (RMS, normalizado 0~1) e publica-o em `/follower_audio/level` (`std_msgs/Float32`, best-effort). Pode implementar a sua própria deteção de atividade de voz, monitorização do ambiente, ou usar como sinal de disparo simples para «capturar quando alguém fala».

```bash
ros2 topic echo /follower_audio/level
```

**Altifalante**: DAC do ES8311 → amplificador classe D NS4150B (sem pino de ativação de PA na placa), com quatro grupos de sons de aviso integrados (ver a secção seguinte); para personalizar os sons, altere as chamadas a `play_tone()` em `audio_es8311.cpp`. O volume está no registo 0x32 do ES8311 (`R_DAC32`; no firmware atual já está no máximo, 0xFF).

### Parâmetros de áudio e afinação

- Taxa de amostragem de 24 kHz, 16-bit, slots estéreo (igual ao firmware original do NanoCam), MCLK = 256×FS = 6,144 MHz;
- **O MCLK é gerado por LEDC** (GPIO39, 80MHz÷13≈6,154MHz, erro de 0,16% dentro da tolerância): o driver I2S legacy não emite MCLK no ESP32-S3, o que deixa o altifalante mudo e o nível do microfone sempre a 0; foi corrigido em `audio_es8311.cpp` com `start_ledc_mclk()`;
- O controlo do ES8311 usa I2C1 (o barramento físico GPIO41/42 é partilhado com o SCCB da câmara; a câmara só usa o SCCB no arranque, pelo que não há conflito em funcionamento); no fim de `init()` é chamado `Wire1.end()` para libertar o I2C para a câmara;
- O ganho do microfone é o valor predefinido do NanoCam original (registo 0x16 = 0x24); se precisar de mais sensibilidade, ajuste o valor de `R_ADC16` em `audio_es8311.cpp`.

## Luz de estado RGB e sons de aviso

### Significado da luz de estado RGB

| Cor | Estado |
|---|---|
| Vermelho | A arrancar / falha na inicialização do micro-ROS / perda de WiFi |
| Laranja | WiFi ligado, à espera do micro-ROS Agent |
| Verde | micro-ROS pronto (ligação de teleoperação estabelecida) |
| Azul | Controlo de servos desbloqueado (ARMED) |
| Roxo | Comando de controlo rejeitado (handshake/limites/passo incompatíveis) |

### Sons de aviso do altifalante

| Evento | Som |
|---|---|
| Alimentação | Dois «bip-bip» curtos (som de arranque) |
| micro-ROS pronto | Duplo tom ascendente |
| Desbloqueio dos servos | Duplo tom ascendente |
| Falha de inicialização | Um tom grave |

> Os sons de aviso são acionados por eventos: o som de arranque toca assim que a placa é alimentada, o som de prontidão quando a comunicação com o Agent é estabelecida e o som de desbloqueio quando é recebido um comando de controlo; por isso, se apenas ligar a alimentação sem executar a teleoperação, só ouvirá o som de arranque.

## Mecanismos de segurança

O firmware inclui os seguintes mecanismos de segurança, sem necessidade de configuração manual:

- Verificação da identidade dos servos e verificação da calibração da EEPROM;
- Handshake da posição atual (0,05 rad);
- Limites de software; limite de passo por comando de 0,25 rad;
- Watchdog de feedback de 0,5 s;
- Reinício automático após 10 s sem WiFi.

> Nota para demonstrações de voo: após a instalação invertida (de cabeça para baixo), é necessário reconfirmar a direção das articulações, o centro de gravidade, o esquema de alimentação (BEC) e fazer testes de interferência EMI.

## Estado de verificação

### Resultados de teste (esperados)

- Todos os seis servos do braço seguidor identificados (`servo_mask=0x3f`);
- `/joint_states` publicado a cerca de 20 Hz;
- A ponte principal publica comandos a 30 Hz;
- Fluxo da câmara `http://<IP>/stream` QVGA fluido;
- `/follower_audio/level` publicado a 5 Hz, com o nível a subir claramente quando se fala;
- A luz de estado RGB muda progressivamente: arranque → ligação à rede → prontidão → desbloqueio;
- Continua a funcionar depois de desligar o cabo de dados USB (o ESP32 tem alimentação própria e o braço seguidor é alimentado externamente a 12V).

### Estado de desenvolvimento

**Validado na placa (2026-08-19):**

- Áudio `ES8311 ready @24000Hz` (saída MCLK normal + altifalante/microfone a funcionar; corrigidas a ausência de MCLK + volume demasiado baixo);
- Ligação WiFi + comunicação micro-ROS (`/joint_states` estável a 20Hz, `/follower_audio/level` normal);
- Câmara GC2145 FPV: `/stream` QVGA completo e fluido (corrigidos o conflito I2C / codificação por software / stack do httpd / limite multipart);
- Cadeia completa de teleoperação (movimento do braço líder → seguimento pelo braço seguidor);
- **Mapeamento absolute + reinício automático quando o Agent se perde**: após desconexão e reconexão, os braços líder e seguidor ficam alinhados sem desvio; depois de Ctrl+C, o braço seguidor reinicia automaticamente e fica à espera de nova ligação.

**Ainda por validar:**

- Cenário de voo: orientação da instalação invertida, centro de gravidade, alimentação (BEC) e interferência EMI.

## Estrutura do projeto e firmware avançado

Neste projeto, o controlador do braço seguidor evoluiu do ESP32-S3 para o módulo ESP32-NanoCam desenvolvido internamente (ESP32-S3 N16R8, com câmara DVP / áudio ES8311 / RGB WS2812 integrados).

### Estrutura de diretórios

```text
firmware/nanocam_soarm/   Firmware do braço seguidor ESP32-NanoCam (PlatformIO)
  ├─ boards/nano_cam.json Definição da placa própria (16MB Flash / 8MB Octal PSRAM)
  ├─ src/                 Código-fonte do firmware (teleoperação micro-ROS + câmara + áudio + RGB)
  ├─ lib/microros/        Biblioteca estática micro-ROS (xtensa-lx7)
  └─ lib/scservo/         Biblioteca de servos SCServo (localizada, sem dependências de rede)
tools/                    Scripts do lado do PC (wireless_teleoperate.py ponte de teleoperação, follower_camera.py receção FPV)
start_soarm_demo.sh       Script de arranque com um só comando (verificação prévia de rede/Agent/calibração + teleoperação)
cali/                     Ficheiros de calibração do braço líder/seguidor
docs/                     Progresso do projeto e registos de experiências + referência de hardware (docs/reference/)
```

### Diferenças em relação à versão anterior

| Item | Este projeto (ESP32-NanoCam) |
|---|---|
| Definição da placa | `boards/nano_cam.json` próprio (16MB Flash / 8MB Octal PSRAM, qio_opi) |
| Barramento de servos | Serial1/UART1, TX=20/RX=19 (a UART0 está ocupada pelo CH340K de depuração) |
| Porta série de depuração | UART0 (43/44) → CH340K → USB-C |
| Câmara | DVP GC2145 do NanoCam (GPIO1~14 + 41/42), XCLK 24MHz |
| Áudio | ES8311 + microfone AP2718AT + altifalante NS4150B (novo) |
| RGB | Luz de estado WS2812 (novo) |
| Biblioteca micro-ROS | xtensa-lx7 — o NanoCam também é ESP32-S3, pelo que é compatível com a versão S3 |
| Scripts do PC | Inalterados (tools/ e start_soarm_demo.sh são independentes do hardware) |

### Caminhos dos cabeçalhos micro-ROS e build_flags

A árvore de cabeçalhos do micro-ROS é plana (`include/<pkg>/<header>.h`), pelo que se mantém apenas o caminho raiz `-Ilib/microros/include`. **Não** adicione caminhos por pacote `-Ilib/microros/include/<pkg>/` — isso faria com que `<string.h>` fosse resolvido como `rosidl_runtime_c/string.h` e o `<Client.h>` da biblioteca WiFi como `rcl/Client.h`, provocando falhas de compilação.

### Reconstruir a libmicroros.a (ESP32-S3 / xtensa-lx7)

> Neste projeto, `firmware/nanocam_soarm/lib/microros/` já inclui a biblioteca estática da versão ESP32-S3 (o NanoCam é um ESP32-S3, pelo que a biblioteca é compatível). **Salte esta secção para utilização normal.** Só precisa de a reconstruir se quiser personalizar a configuração do micro-ROS (tipos de mensagens, QoS, pool de memória, etc.) — no desenvolvimento diário não é necessário recompilar a `libmicroros.a`.

**Opção A: construtor Docker oficial (recomendado, pode ser executado em qualquer máquina)**

O script de geração da biblioteca oficial micro-ROS `micro_ros_arduino` já inclui o alvo **esp32s3**:

```bash
git clone -b humble https://github.com/micro-ROS/micro_ros_arduino.git
cd micro_ros_arduino
docker pull microros/micro_ros_static_library_builder:humble
docker run -it --rm -v $(pwd):/project \
  --env MICROROS_LIBRARY_FOLDER=extras \
  microros/micro_ros_static_library_builder:humble -p esp32s3
```

Os artefactos ficam em `src/esp32s3/libmicroros.a` e os cabeçalhos nos diretórios de cada pacote em `src/`:

```bash
cp src/esp32s3/libmicroros.a <projeto>/firmware/nanocam_soarm/lib/microros/
# substituição completa dos cabeçalhos (mantendo os três ficheiros personalizados
# deste diretório: default_transport.cpp / wifi_transport.cpp / micro_ros_arduino.h)
rsync -a src/* <projeto>/firmware/nanocam_soarm/lib/microros/include/ \
  --exclude esp32s3 --exclude '*.cpp' --exclude micro_ros_arduino.h
```

**Sobre a toolchain**: o segmento esp32s3 do script oficial usa por predefinição a toolchain `xtensa-esp32-elf` (LX6); LX6/LX7 são compatíveis ao nível do conjunto de instruções para código C normal e funcionam. A `libmicroros.a` incluída neste projeto foi compilada com a **toolchain LX7 genuína** (`xtensa-esp32s3-elf` gcc 8.4.0, igual à versão integrada no PlatformIO). Como fazer: descarregue `xtensa-esp32s3-elf-gcc8_4_0-esp-2021r2-patch5-linux-amd64.tar.gz` (releases crosstool-NG da Espressif), descomprima e altere em `library_generation.sh` o `TOOLCHAIN_PREFIX` do segmento esp32s3 para `/uros_ws/xtensa-esp32s3-elf/bin/xtensa-esp32s3-elf-`, e volte a montar no contentor e execute novamente:

```bash
docker run --platform linux/amd64 -it --rm \
  -v $(pwd):/project \
  -v <diretório-descomprimido>/xtensa-esp32s3-elf:/uros_ws/xtensa-esp32s3-elf \
  --env MICROROS_LIBRARY_FOLDER=extras \
  microros/micro_ros_static_library_builder:humble -p esp32s3
```

> Nota: em Apple Silicon é obrigatório adicionar `--platform linux/amd64` (a toolchain esp32 incluída na imagem é um binário x86_64 que não pode ser executado num contentor arm64).

**Opção B: Ubuntu 22.04 + ROS 2 Humble + toolchain do PlatformIO**

1. Garanta que o PlatformIO já descarregou a toolchain do S3 (basta executar `pio run` uma vez no diretório do firmware):

   ```bash
   ls ~/.platformio/packages/toolchain-xtensa-esp32s3/bin/xtensa-esp32s3-elf-gcc
   ls ~/.platformio/packages/framework-arduinoespressif32/tools/sdk/esp32s3
   ```

2. Use o micro_ros_setup para obter o código-fonte do micro-ROS (com o mesmo layout `/tmp/firmware/mcu_ws` do `build_microros.sh`):

   ```bash
   mkdir -p /tmp/firmware && cd /tmp/firmware
   git clone -b humble https://github.com/micro-ROS/micro_ros_setup.git src/micro_ros_setup
   # depois de instalar as dependências do micro_ros_setup:
   source /opt/ros/humble/setup.bash
   colcon build && source install/local_setup.bash
   ros2 run micro_ros_setup create_firmware_ws.sh generate_lib
   ```

3. Execute o script de compilação do S3 deste projeto:

   ```bash
   cd <projeto>/firmware/nanocam_soarm
   chmod +x build_microros_s3.sh
   ./build_microros_s3.sh
   ```

   O script já substituiu riscv32 por xtensa-esp32s3, `-march=rv32imc` por `-mlongcalls` e o SDK `esp32c3` pelo SDK `esp32s3`. Basta copiar os artefactos para o projeto, seguindo as indicações no fim do script.

### Referências

- Documentação de referência do hardware NanoCam (esquemático/especificações/definições de pinos/driver ES8311): `docs/reference/` do repositório
- [micro-ROS](https://micro.ros.org/) / [micro_ros_arduino](https://github.com/micro-ROS/micro_ros_arduino)
- [LeRobot](https://github.com/huggingface/lerobot)

<RelatedProducts slugs="so-arm101,esp32-s3-wifi-module" />
