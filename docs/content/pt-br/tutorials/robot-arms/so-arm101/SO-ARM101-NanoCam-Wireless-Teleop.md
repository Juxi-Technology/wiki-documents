---
title: Teleoperação sem fio do SO-ARM101 (versão ESP32-NanoCam)
description: "Solução de teleoperação sem fio para demonstrações em competições: o braço líder se conecta ao computador Ubuntu via LeRobot e o braço seguidor é controlado."
---

# Teleoperação sem fio do SO-ARM101 (versão ESP32-NanoCam)

> **[Comprar na loja](https://www.juxitech.com/products/so-arm101-developers-kit)**

Este tutorial é voltado ao cenário de teleoperação sem fio de um braço robótico SO-ARM101 embarcado em drone para demonstrações em competições: o braço líder se conecta ao computador Ubuntu via LeRobot e o braço seguidor é controlado pelo [Módulo de Vídeo WiFi ESP32-S3](/pt-br/products/esp32-s3-wifi-module) de desenvolvimento próprio (ESP32-NanoCam, ESP32-S3 N16R8), recebendo comandos por micro-ROS WiFi UDP, com câmera FPV, microfone, alto-falante e LED RGB de status integrados na placa. Em caso de problemas, consulte o [Guia de resolução de problemas](./SO-ARM101-NanoCam-Troubleshooting.md).

## Apresentação e arquitetura do sistema

```text
SO-ARM101 braço líder (leader) → placa de acionamento USB de servos → Ubuntu 22.04 (LeRobot + ROS2 Humble + micro-ROS Agent)
                                            │  2.4 GHz Wi-Fi (mesma LAN)
                                            ▼
                              Controlador do braço seguidor ESP32-NanoCam (ESP32-S3)
                                            │  1 Mbps UART (intermediado pelos pinos UART da placa de acionamento de servos)
                                            ▼
                              Braço seguidor SO-ARM101 (follower) 6 × STS3215
```

- O operador movimenta o braço líder → o LeRobot lê o braço líder → tópico ROS2 `/joint_command` → o micro-ROS Agent envia via UDP 8888 → o ESP32-NanoCam recebe e aciona os 6 servos;
- O braço seguidor retroalimenta `/joint_states` (20Hz), usado como malha fechada e watchdog;
- A câmera embarcada publica um stream MJPEG em `http://<IP>/stream` (FPV); o lado PC pode convertê-lo em tópico ROS.

Divisão de papéis: o braço líder se conecta ao computador Ubuntu; o braço seguidor é controlado pelo ESP32-NanoCam; os dois se comunicam sem fio. Funções embarcadas do firmware após a energização:

| Função | Implementação | Descrição |
|---|---|---|
| Teleoperação micro-ROS | `main.cpp` + `servo_bus.cpp` | Feedback `/joint_states` a 20Hz, recepção de comandos `/joint_command`, com mecanismos de segurança completos integrados |
| Câmera FPV | `camera_stream.cpp` | Stream MJPEG em `http://<IP>/stream` (QVGA) |
| Microfone | `audio_es8311.cpp` | Nível de volume ambiente → `/follower_audio/level` (Float32, 5Hz) |
| Alto-falante | `audio_es8311.cpp` | Sons de inicialização/prontidão/desbloqueio/erro |
| LED RGB de status | `rgb_status.cpp` | Inicialização vermelho → WiFi laranja → micro-ROS verde → desbloqueio azul; perda de WiFi vermelho |

## Lista de hardware

| Hardware | Quantidade | Descrição |
|---|---|---|
| Braço líder SO-ARM101 | 1 | Com 6 servos STS3215 |
| Braço seguidor SO-ARM101 | 1 | Com 6 servos STS3215 |
| Módulo ESP32-NanoCam | 1 | ESP32-S3 N16R8, com câmera/áudio/RGB embarcados |
| Placa de acionamento de servos USB | 2 | Calibração + intermediação do barramento dos braços líder/seguidor (pinos UART) |
| Computador Ubuntu 22.04 | 1 | Executa LeRobot + ROS2 + Agent |
| Roteador 2.4GHz ou hotspot do celular | 1 | O computador do braço líder e o NanoCam na mesma rede local |
| Fonte externa de 12V 5A | 1 | **Alimentação do braço seguidor** (o USB não dá conta de 6 servos) |
| Fonte externa de 5V 6A | 1 | **Alimentação do braço líder** (conectado ao computador Ubuntu) |
| Cabo de dados USB-C | 2 | Alimentação/depuração do NanoCam + conexão da placa do braço líder ao computador |

> Periféricos embarcados do NanoCam: câmera GC2145 (DVP); áudio ES8311 (I2S 24kHz, microfone AP2718AT + alto-falante NS4150B); RGB WS2812 @ GPIO18.

## Modo de ligação

Entre o ESP32-NanoCam e o braço seguidor, a ligação **é intermediada pelos pinos UART da placa de acionamento de servos**:

```text
UART da placa de acionamento de servos:  RX ←── NanoCam TX (P2-8 / GPIO20)
                                         TX ──→ NanoCam RX (P2-7 / GPIO19)
                                        GND ──→ NanoCam GND
```

- **TX conecta em RX, RX conecta em TX (cruzado)**, GND comum, taxa de 1 Mbps;
- O barramento de servos do NanoCam usa a UART1 nos pinos **P2-7 / P2-8** do módulo (a porta serial de depuração usa o USB-C, CH340K → UART0; são totalmente independentes e podem ser usadas ao mesmo tempo);
- O barramento de servos e a alimentação dos servos compartilham o mesmo GND (fonte 12V 5A do braço seguidor).

### Principais pinos do NanoCam

| Periférico | Pino |
|---|---|
| Barramento de servos (UART1) | TX=GPIO20 (P2-8 ESP_P), RX=GPIO19 (P2-7 ESP_N), header P2 do módulo |
| Porta serial de depuração (UART0) | GPIO43/44 → CH340K embarcado → USB-C (sem USB CDC nativo) |
| Câmera DVP (GC2145) | D0~D7=GPIO4/2/1/3/5/7/8/10, PCLK=6, VSYNC=13, HREF=11, XCLK=9 (24MHz), PWDN=12, RESET=14, SCCB SDA/SCL=41/42 |
| Áudio ES8311 (I2S) | MCLK=39, BCLK=38, WS=47, DIN(ADC)=40, DOUT(DAC)=48; I2C SDA/SCL=41/42, endereço 0x30 |
| Microfone | MEMS analógico AP2718AT (via ADC do ES8311) |
| Alto-falante | Amplificador classe D NS4150B (via DAC do ES8311), sem pino de enable de PA na placa |
| RGB | WS2812 @ GPIO18 (1 unidade, GRB, acionado por RMT) |
| BOOT | GPIO0 |

> As definições de pinos vêm de `docs/reference/nano_config.h` e da documentação esquemática de hardware.

## Alimentação

| Dispositivo | Alimentação |
|---|---|
| ESP32-NanoCam | **Alimentado por cabo de dados USB** (a porta serial de depuração CH340K funciona ao mesmo tempo) |
| Braço seguidor (6×STS3215) | Fonte externa de **12V 5A** |
| Braço líder (conectado ao computador Ubuntu) | Fonte externa de **5V 6A** |

> ⚠️ O USB não dá conta de 6 servos, o braço seguidor deve usar alimentação externa de 12V 5A; o ESP32 pode ser alimentado pelo próprio cabo de dados USB.

## Requisitos de ambiente

### Lado de compilação e gravação (Windows / Linux / macOS)

| Item | Requisito |
|---|---|
| Sistema operacional | Windows 10/11 ou Linux (macOS também é possível) |
| Python | 3.8+ (verifique com `python --version`) |
| PlatformIO | Core 6.x (com toolchain esp32s3 + framework Arduino) |
| Espaço em disco | Pelo menos 3 GB livres |
| Rede | Acesso a GitHub / Espressif CDN (o primeiro download da toolchain é de cerca de 1-2 GB) |

### Lado de execução (computador Ubuntu 22.04, onde a teleoperação roda de fato)

| Item | Requisito |
|---|---|
| Sistema operacional | Ubuntu 22.04 (64 bits) |
| ROS 2 | Humble (Hawksbill) |
| LeRobot | Com suporte a Feetech SO-101 (`so101_leader` / `so101_follower`) |
| micro-ROS Agent | `snap run micro-ros-agent` ou instalação a partir do código-fonte |
| Comandos dependentes | `nmcli`, `ip`, `flock` (já incluídos no NetworkManager, iproute2 e util-linux) |
| Ambiente Python | Ambiente virtual `lerobot_so101` (conda/miniforge) |

> Identificação da porta serial de depuração: a interface USB do NanoCam é CH340K para UART0; no Linux o nome do dispositivo geralmente é `/dev/ttyUSB0` (ou `/dev/serial/by-id/...CH340*`); o PlatformIO reconhece automaticamente (a definição da placa já traz o HWID 0x1A86:0x7523 do CH340); o monitor serial usa 115200. Para a instalação completa do ambiente LeRobot/Ubuntu, consulte o [Tutorial de uso do SO-ARM101](./SO-ARM101-Tutorial.md).

## Etapas de instalação

### 1. Instalar o PlatformIO (lado de compilação e gravação)

**Opção A: extensão do VSCode (recomendado)**

1. Instale o [VSCode](https://code.visualstudio.com/);
2. Pesquise **PlatformIO IDE** na loja de extensões e instale; após instalar, ele reinicia automaticamente e baixa o PlatformIO Core;
3. Verifique com `pio --version` no terminal do VSCode.

**Opção B: instalação por linha de comando**

```bash
pip install platformio
```

> No Windows, se o comando `pio` não for encontrado no Git Bash, use o terminal PowerShell/CMD ou adicione `C:\Users\<nome de usuário>\.platformio\penv\Scripts` ao PATH.

### 2. Primeira compilação (download automático da toolchain)

Entre no diretório do firmware e execute uma compilação (sem gravar):

```bash
cd firmware/nanocam_soarm
pio run
```

Na primeira vez, são baixados em sequência:

1. a plataforma espressif32 (`espressif32@7.0.1`);
2. a **toolchain** `toolchain-xtensa-esp32s3` (cerca de 100 MB, da Espressif CDN);
3. o framework Arduino `framework-arduinoespressif32` (cerca de 200 MB).

Se o download estiver lento ou travado:

- A estimativa de tempo restante do PlatformIO é imprecisa; costuma travar por um tempo e então terminar de repente; aguarde 5 minutos observando se a porcentagem avança;
- Ative proxy/VPN (usando o proxy do sistema);
- Download manual da toolchain: baixe no navegador `https://dl.espressif.com/dl/xtensa-esp32s3-elf-gcc8_4_0-esp-2021r2-patch5-win32.zip` (no Linux, o correspondente é `-linux-amd64.tar.gz`); após extrair, renomeie o diretório para `toolchain-xtensa-esp32s3` e coloque em `C:\Users\<nome de usuário>\.platformio\packages\`, depois execute `pio run` novamente;
- Interromper com Ctrl+C no meio não corrompe o ambiente; a próxima execução continua de onde parou.

### 3. Instalar o ambiente de execução no Ubuntu

```bash
# 1. ROS 2 Humble (instale conforme a documentação oficial)
#    https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debs.html
source /opt/ros/humble/setup.bash

# 2. LeRobot (com suporte a Feetech)
conda create -n lerobot_so101 python=3.10 -y
conda activate lerobot_so101
pip install lerobot[feetech]

# 3. micro-ROS Agent
sudo snap install micro-ros-agent
snap run micro-ros-agent udp4 --port 8888   # testa se inicia

# 4. PlatformIO (caso também queira compilar/gravar no lado Ubuntu)
pip install platformio
```

## Configurar o WiFi

O PC e o NanoCam precisam estar na mesma rede local (Wi-Fi 2.4GHz; o hotspot do celular serve), e o roteador/hotspot não pode ter isolamento de clientes ativado. Há duas formas de configurar o WiFi; escolha uma.

### Opção 1: configuração em tempo de compilação (padrão)

```bash
cd firmware/nanocam_soarm
cp src/wifi_config.example.h src/wifi_config.h
# edite wifi_config.h: WIFI_SSID / WIFI_PASS / AGENT_IP (IP local do computador Ubuntu)
```

### Opção 2: configuração por comandos na serial (recomendado, sem regravar)

O firmware inclui configuração em tempo de execução (armazenada na NVS), digitada a qualquer momento pela porta serial de depuração (115200 baud):

| Comando | Função |
|---|---|
| `wifi_ssid:seu_hotspot` | Define e salva o nome do WiFi |
| `wifi_pass:sua_senha` | Define e salva a senha do WiFi |
| `agent_ip:IP_do_computador_Ubuntu` | Define e salva o IP do micro-ROS Agent |
| `wifi_show` | Exibe a configuração atual em vigor |
| `wifi_clear` | Apaga a configuração salva e restaura o padrão de compilação |

Após salvar qualquer comando de configuração, o dispositivo **reinicia automaticamente em 3 segundos** para aplicar. Prioridade: configuração salva pela serial > padrão de compilação. Para trocar de hotspot ou de computador, basta plugar o USB e digitar três comandos, sem alterar o código nem regravar.

> Os valores padrão de compilação (`wifi_config.h`) são sempre mantidos como fallback quando nada foi configurado pela serial; o `wifi_show` distingue "vindo da NVS" de "padrão de compilação". A senha fica em texto claro na NVS, aceitável para cenários de demonstração em rede local; o `wifi_config.h` contém a senha do WiFi e já está excluído pelo `.gitignore` — não o envie ao repositório.

## Gravação e inicialização

```bash
cd firmware/nanocam_soarm
pio run --target upload
```

**Entrar no modo de download (ponto crítico)**: o NanoCam grava pela porta serial CH340K → UART0 (não pelo download automático USB CDC). Execute o upload diretamente primeiro; se a placa tiver circuito de download automático, dará certo de imediato; se indicar falha de conexão: **mantenha o botão BOOT pressionado (GPIO0) → conecte o USB (ou pressione reset) → solte o BOOT** e execute o upload imediatamente. No Windows, se a porta serial não for reconhecida automaticamente, adicione uma linha `upload_port = COM3` em `[env:nano_cam]` no `platformio.ini` (substitua pelo número COM real do CH340 no Gerenciador de Dispositivos).

Para ver o log da serial:

```bash
pio device monitor --baud 115200
```

Após a gravação, você deve ver (na ordem):

```text
audio: ES8311 ready @24000Hz      ← áudio inicializado com sucesso
Servo Ping mask: 0x3f             ← os 6 servos estão online
Servo calibration match: YES      ← vetores de calibração consistentes com a EEPROM dos servos
IP: 192.168.x.x  RSSI: -xx        ← WiFi conectado
Waiting for micro-ROS Agent...    ← aguardando o Agent (desaparece após iniciar o próximo passo)
```

> O barramento de servos pode ficar desconectado durante a gravação: gravação e operação dos servos não interferem entre si (UART0 de depuração / UART1 dos servos são independentes). O projeto já inclui a biblioteca estática do micro-ROS para ESP32-S3 (xtensa-lx7); no uso diário não é preciso compilá-la por conta própria.

## Notas sobre calibração

O diretório `cali/` do projeto já contém os arquivos de calibração do braço líder/seguidor, e os vetores de calibração dentro do firmware também estão alinhados com a calibração do braço seguidor (ou seja, `cali/follower_recal.json`). **Só é preciso recalibrar ao trocar o hardware do braço seguidor/líder.**

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

Após recalibrar o braço seguidor, é obrigatório abrir `firmware/nanocam_soarm/src/servo_bus.cpp` e substituir os três vetores `kHomingOffsets` / `kRangeMin` / `kRangeMax` pelos valores do seu `cali/follower_recal.json` (ordem: shoulder_pan, shoulder_lift, elbow_flex, wrist_flex, wrist_roll, gripper) e recompilar/regravar.

## Executar a teleoperação sem fio

### Verificações antes de iniciar

```bash
# 1. O computador Ubuntu está conectado ao mesmo WiFi 2.4GHz do NanoCam
# 2. A placa de acionamento USB do braço líder está conectada e reconhecida
ls -l /dev/ttyACM*   # encontre a porta serial do braço líder
# 3. O NanoCam do braço seguidor está energizado e na rede (confirme pela serial ou pelo navegador que o stream MJPEG está acessível)
```

### Inicialização em um clique

```bash
# Defina o ambiente (ou edite diretamente os valores padrão no topo de start_soarm_demo.sh)
export SOARM_WIFI_SSID="seu_hotspot_2.4G"
export SOARM_AGENT_IP="IP_do_computador_Ubuntu"
export SOARM_LEADER_PORT="/dev/ttyACM*"
export SOARM_PYTHON="$(command -v python)"   # ambiente lerobot_so101

./start_soarm_demo.sh --check    # verificação pré-voo: rede / braço líder / Agent / braço seguidor online
./start_soarm_demo.sh            # inicia a teleoperação de fato; Ctrl+C para parar
```

O script faz, em ordem:

1. Verifica a rede (o SSID precisa ser igual a `EXPECTED_WIFI_SSID`), a porta serial do braço líder e a existência dos arquivos de calibração;
2. Inicia o micro-ROS Agent (se não estiver rodando; o log fica em `logs/micro_ros_agent.log`);
3. Aguarda o `/joint_states` do braço seguidor entrar no ar (timeout de 15s);
4. Movimento do braço líder → o braço seguidor acompanha, com frequência de comando de 30Hz, **`--mapping-mode absolute` (mapeamento absoluto)**.

**Sobre o mapeamento absolute**: a pose do braço líder e a do braço seguidor se correspondem uma a uma em seus respectivos sistemas de coordenadas de calibração; a vantagem é **não haver desvio acumulado após desconexão e reconexão** — na reconexão, o braço seguidor se alinha suavemente à pose atual do braço líder em 8 segundos (startup_blend) e, depois, quando o braço líder volta ao zero, o seguidor também volta ao próprio zero. Antes era usado o mapeamento relative (relativo), mas após reconectar o braço seguidor permanecia na posição da desconexão, criando desvio permanente em relação ao líder que voltava ao zero; por isso foi alterado para absolute.

**Reinício automático após perda do Agent** (firmware a partir de 2026-08-19): após parar a teleoperação com Ctrl+C, o braço seguidor reinicia automaticamente em cerca de 10 segundos e volta para `Waiting for micro-ROS Agent...`, portanto você pode executar o script novamente, sem reset manual do braço seguidor (durante a reconexão o braço seguidor volta ao zero, ou seja, é reenergizado).

Após estabelecer o enlace, a serial do braço seguidor imprime `micro-ROS ready` (o RGB fica verde e o alto-falante toca o som de prontidão), e o `Waiting for micro-ROS Agent...` desaparece.

### Verificar os tópicos manualmente

```bash
ros2 topic echo /joint_states --once           # feedback do braço seguidor
ros2 topic hz /joint_states                    # deve ficar em cerca de 20 Hz
ros2 topic echo /follower_audio/level --once   # nível do microfone (sobe quando há fala)
```

## Câmera FPV

Após energizar e conectar à rede, o firmware inicia automaticamente o serviço de streaming MJPEG (GC2145 embarcada, interface DVP, porta HTTP padrão 80):

```text
http://<NANOCAM_IP>/         página de informações
http://<NANOCAM_IP>/jpg      JPEG de quadro único (snapshot)
http://<NANOCAM_IP>/stream   fluxo MJPEG contínuo (FPV)
```

### Parâmetros e ajustes

- Resolução **QVGA 320×240** (configuração oficial), **captura em RGB565 + codificação por software com `frame2jpg`** (o GC2145 não tem codificador JPEG por hardware; somente OV2640/OV5640 têm), qualidade JPEG 12, buffer duplo na **8MB Octal PSRAM**;
- **Por que QVGA**: em testes, o VGA (640×480) em RGB565 tem taxa de dados alta demais no DVP desta placa e cerca de 2/3 da parte inferior da imagem apresenta artefatos (reproduzido com 24/20/16MHz de XCLK × combinações de buffer simples/duplo); o QVGA é completo e fluido (a taxa de quadros é menor que a do JPEG por hardware, o que é normal);
- O streaming roda em uma tarefa httpd independente (a pilha foi ajustada para 16KB para acomodar a codificação por software), sem interferir na teleoperação micro-ROS nem na captura de áudio;
- Porta HTTP padrão 80 (`HTTPD_DEFAULT_CONFIG()` do firmware);
- Para alterar resolução/qualidade: edite `config.frame_size` / `kJpegQuality` em `firmware/nanocam_soarm/src/camera_stream.cpp`; a orientação da imagem é ajustada com `set_vflip` / `set_hmirror` (mesmo arquivo);
- O esp_http_server é de tarefa única e `/stream` e `/jpg` **não podem ser acessados ao mesmo tempo** (com o stream aberto, o `/jpg` fica pendurado);
- Se a câmera falhar ao inicializar, o firmware imprime uma linha de aviso e continua funcionando normalmente, sem afetar a teleoperação.

Recepção no lado PC (publicado como tópico ROS 2, tipo de mensagem `sensor_msgs/CompressedImage`):

```bash
# Terminal 1: inicie a teleoperação normalmente
./start_soarm_demo.sh

# Terminal 2: receba o vídeo e publique o tópico
source /opt/ros/humble/setup.bash
python3 tools/follower_camera.py --stream http://<NANOCAM_IP>/stream
# opcional: --topic /topico_personalizado  --max-fps 10

# verificação
ros2 topic hz /follower_camera/image_raw/compressed   # deve ficar em cerca de 10~15 Hz
rviz2    # Add → By topic → Camera, escolha /follower_camera/image_raw/compressed
```

Sem instalar o ROS também é possível validar o enlace primeiro: abra `http://<NANOCAM_IP>/stream` no navegador, ou `curl -s http://<NANOCAM_IP>/jpg -o snap.jpg`.

## Áudio (microfone e alto-falante)

**Microfone**: MEMS analógico AP2718AT (via ADC do ES8311). O firmware lê o nível de volume ambiente a cada 200ms (RMS, normalizado em 0~1) e publica em `/follower_audio/level` (`std_msgs/Float32`, best-effort). Você pode implementar detecção de atividade de voz, monitoramento ambiente, ou usar como sinal de disparo simples de "só capturar quando alguém falar".

```bash
ros2 topic echo /follower_audio/level
```

**Alto-falante**: DAC do ES8311 → amplificador classe D NS4150B (sem pino de enable de PA na placa), com quatro conjuntos de sons integrados (ver próxima seção); para personalizar os sons, modifique as chamadas de `play_tone()` em `audio_es8311.cpp`. O volume fica no registrador 0x32 do ES8311 (`R_DAC32`; o firmware atual já está no máximo 0xFF).

### Parâmetros de áudio e ajustes

- Taxa de amostragem 24 kHz, 16-bit, slots estéreo (igual ao firmware original do NanoCam), MCLK = 256×FS = 6.144 MHz;
- **MCLK gerado por LEDC** (GPIO39, 80MHz÷13≈6.154MHz, erro de 0.16% dentro da tolerância): o driver I2S legacy não gera MCLK no ESP32-S3, o que deixava o alto-falante mudo + nível do microfone sempre 0; corrigido com LEDC em `start_ledc_mclk()` de `audio_es8311.cpp`;
- O controle do ES8311 usa a I2C1 (o barramento físico GPIO41/42 é compartilhado com o SCCB da câmera; a câmera só usa o SCCB na inicialização, sem conflito em execução); o `Wire1.end()` no fim do `init()` libera o I2C para a câmera;
- O ganho padrão do microfone é igual ao do NanoCam original (registrador 0x16 = 0x24); para aumentar a sensibilidade, ajuste o valor de `R_ADC16` em `audio_es8311.cpp`.

## LED RGB de status e sons

### Significado do status RGB

| Cor | Status |
|---|---|
| Vermelho | Inicializando / falha na inicialização do micro-ROS / perda de WiFi |
| Laranja | WiFi conectado, aguardando o micro-ROS Agent |
| Verde | micro-ROS pronto (enlace de teleoperação ativo) |
| Azul | Controle dos servos desbloqueado (ARMED) |
| Roxo | Comando de controle rejeitado (handshake / limite / passo incompatível) |

### Sons do alto-falante

| Evento | Som |
|---|---|
| Energização | Dois "bip bip" curtos (som de inicialização) |
| micro-ROS pronto | Tom duplo ascendente |
| Desbloqueio dos servos | Tom duplo ascendente |
| Falha na inicialização | Um tom grave |

> Os sons são orientados por eventos: o som de inicialização toca ao energizar; o de prontidão, quando a comunicação com o Agent é estabelecida; o de desbloqueio, quando um comando de controle é recebido. Portanto, apenas energizando sem rodar a teleoperação, você ouve somente o som de inicialização.

## Mecanismos de segurança

O firmware inclui os seguintes mecanismos de segurança, sem necessidade de configuração manual:

- Verificação de identidade dos servos e de calibração da EEPROM;
- Handshake da pose atual (0.05 rad);
- Limites de software; limite de passo por comando de 0.25 rad;
- Watchdog de feedback de 0.5 s;
- Reinício automático após 10 s de timeout por perda de WiFi.

> Atenção para a demonstração em voo: após a instalação invertida (de cabeça para baixo), reconfirme a direção das articulações, o centro de gravidade, o esquema de alimentação (BEC) e faça testes de interferência EMI.

## Status de verificação

### Resultados de teste (esperados)

- Todos os seis servos detectados (`servo_mask=0x3f`);
- `/joint_states` publicado a cerca de 20 Hz;
- A ponte no PC publica comandos a 30 Hz;
- Stream da câmera `http://<IP>/stream` em QVGA fluido;
- `/follower_audio/level` publicado a 5 Hz, com o nível subindo visivelmente ao falar;
- O LED RGB muda em estágios: inicialização→rede→prontidão→desbloqueio;
- Continua funcionando após desconectar o cabo de dados USB (ESP32 com alimentação própria e braço seguidor com fonte externa de 12V).

### Status de desenvolvimento

**Verificado na placa (2026-08-19):**

- Áudio `ES8311 ready @24000Hz` (saída de MCLK normal + alto-falante/microfone funcionando; corrigidos MCLK ausente + volume baixo demais);
- Conexão WiFi + comunicação micro-ROS (`/joint_states` estável a 20Hz, `/follower_audio/level` normal);
- Câmera GC2145 FPV: `/stream` QVGA completo e fluido (corrigidos conflito de I2C / codificação por software / pilha do httpd / limites multipart);
- Cadeia completa de teleoperação (movimento do braço líder → braço seguidor acompanha);
- **Mapeamento absolute + reinício automático após perda do Agent**: alinhamento líder-seguidor sem desvio após desconexão e reconexão; após Ctrl+C, o braço seguidor reinicia sozinho e aguarda a reconexão.

**Ainda a verificar:**

- Cenário de voo: orientação da instalação invertida, centro de gravidade, alimentação (BEC), interferência EMI.

## Estrutura do projeto e firmware avançado

Neste projeto, o controlador do braço seguidor evoluiu do ESP32-S3 para o módulo ESP32-NanoCam de desenvolvimento próprio (ESP32-S3 N16R8, com câmera DVP / áudio ES8311 / WS2812 RGB embarcados).

### Estrutura de diretórios

```text
firmware/nanocam_soarm/   firmware do braço seguidor ESP32-NanoCam (PlatformIO)
  ├─ boards/nano_cam.json definição da placa própria (16MB Flash / 8MB Octal PSRAM)
  ├─ src/                 código-fonte do firmware (teleoperação micro-ROS + câmera + áudio + RGB)
  ├─ lib/microros/        biblioteca estática do micro-ROS (xtensa-lx7)
  └─ lib/scservo/         biblioteca de servos SCServo (localizada, sem dependência de rede)
tools/                    scripts do lado PC (wireless_teleoperate.py ponte de teleoperação, follower_camera.py recepção FPV)
start_soarm_demo.sh       script de inicialização em um clique (verificação prévia de rede/Agent/calibração + teleoperação)
cali/                     arquivos de calibração do braço líder/seguidor
docs/                     progresso do projeto e registros de experimentos + referência de hardware (docs/reference/)
```

### Diferenças em relação às versões anteriores

| Item | Este projeto (ESP32-NanoCam) |
|---|---|
| Definição da placa | `boards/nano_cam.json` própria (16MB Flash / 8MB Octal PSRAM, qio_opi) |
| Barramento de servos | Serial1/UART1, TX=20/RX=19 (a UART0 fica ocupada pelo CH340K de depuração) |
| Porta serial de depuração | UART0 (43/44) → CH340K → USB-C |
| Câmera | NanoCam DVP GC2145 (GPIO1~14 + 41/42), XCLK 24MHz |
| Áudio | ES8311 + microfone AP2718AT + alto-falante NS4150B (novo) |
| RGB | LED de status WS2812 (novo) |
| Biblioteca micro-ROS | xtensa-lx7 — o NanoCam também é ESP32-S3, compatível com a versão para S3 |
| Scripts do lado PC | Inalterados (tools/, start_soarm_demo.sh não dependem do hardware) |

### Caminhos dos cabeçalhos do micro-ROS e build_flags

A árvore de cabeçalhos do micro-ROS é uma estrutura plana (`include/<pkg>/<header>.h`); mantenha apenas o caminho raiz `-Ilib/microros/include`. **Não** adicione caminhos `-Ilib/microros/include/<pkg>/` por pacote — isso faria `<string.h>` ser resolvido como `rosidl_runtime_c/string.h` e `<Client.h>` da biblioteca WiFi como `rcl/Client.h`, causando falha de compilação.

### Recompilar libmicroros.a (ESP32-S3 / xtensa-lx7)

> Este projeto já inclui em `firmware/nanocam_soarm/lib/microros/` a biblioteca estática para ESP32-S3 (o NanoCam é ESP32-S3; a biblioteca é compatível). **No uso comum, pule esta seção**. Você só precisa recompilar quando quiser personalizar a configuração do micro-ROS (tipos de mensagem, QoS, pool de memória etc.) — o desenvolvimento diário não exige recompilar a `libmicroros.a`.

**Opção A: construtor oficial via Docker (recomendado, executável em qualquer máquina)**

O script de geração da biblioteca oficial `micro_ros_arduino` do micro-ROS já inclui o alvo **esp32s3**:

```bash
git clone -b humble https://github.com/micro-ROS/micro_ros_arduino.git
cd micro_ros_arduino
docker pull microros/micro_ros_static_library_builder:humble
docker run -it --rm -v $(pwd):/project \
  --env MICROROS_LIBRARY_FOLDER=extras \
  microros/micro_ros_static_library_builder:humble -p esp32s3
```

O artefato fica em `src/esp32s3/libmicroros.a` e os cabeçalhos, nos diretórios de cada pacote em `src/`:

```bash
cp src/esp32s3/libmicroros.a <projeto>/firmware/nanocam_soarm/lib/microros/
# substituição completa dos cabeçalhos (preservando os três arquivos personalizados
# default_transport.cpp / wifi_transport.cpp / micro_ros_arduino.h desse diretório)
rsync -a src/* <projeto>/firmware/nanocam_soarm/lib/microros/include/ \
  --exclude esp32s3 --exclude '*.cpp' --exclude micro_ros_arduino.h
```

**Sobre a toolchain**: o trecho esp32s3 do script oficial compila por padrão com a toolchain `xtensa-esp32-elf` (LX6); LX6/LX7 são compatíveis no conjunto de instruções para código C comum e funcionam. A `libmicroros.a` que acompanha este projeto foi compilada com a **toolchain LX7 genuína** (`xtensa-esp32s3-elf` gcc 8.4.0, igual à versão embutida no PlatformIO). O procedimento: baixe `xtensa-esp32s3-elf-gcc8_4_0-esp-2021r2-patch5-linux-amd64.tar.gz` (Espressif crosstool-NG releases); após extrair, altere o `TOOLCHAIN_PREFIX` do trecho esp32s3 em `library_generation.sh` para `/uros_ws/xtensa-esp32s3-elf/bin/xtensa-esp32s3-elf-` e monte-o no contêiner para rodar de novo:

```bash
docker run --platform linux/amd64 -it --rm \
  -v $(pwd):/project \
  -v <diretório extraído>/xtensa-esp32s3-elf:/uros_ws/xtensa-esp32s3-elf \
  --env MICROROS_LIBRARY_FOLDER=extras \
  microros/micro_ros_static_library_builder:humble -p esp32s3
```

> Atenção: no Apple Silicon é obrigatório adicionar `--platform linux/amd64` (a toolchain esp32 embutida na imagem é um binário x86_64 e não pode ser executada em contêiner arm64).

**Opção B: Ubuntu 22.04 + ROS 2 Humble + toolchain do PlatformIO**

1. Garanta que o PlatformIO já baixou a toolchain do S3 (basta rodar `pio run` uma vez no diretório do firmware):

   ```bash
   ls ~/.platformio/packages/toolchain-xtensa-esp32s3/bin/xtensa-esp32s3-elf-gcc
   ls ~/.platformio/packages/framework-arduinoespressif32/tools/sdk/esp32s3
   ```

2. Use o micro_ros_setup para obter o código-fonte do micro-ROS (consistente com o layout `/tmp/firmware/mcu_ws` de `build_microros.sh`):

   ```bash
   mkdir -p /tmp/firmware && cd /tmp/firmware
   git clone -b humble https://github.com/micro-ROS/micro_ros_setup.git src/micro_ros_setup
   # após instalar as dependências do micro_ros_setup:
   source /opt/ros/humble/setup.bash
   colcon build && source install/local_setup.bash
   ros2 run micro_ros_setup create_firmware_ws.sh generate_lib
   ```

3. Execute o script de build do S3 deste projeto:

   ```bash
   cd <projeto>/firmware/nanocam_soarm
   chmod +x build_microros_s3.sh
   ./build_microros_s3.sh
   ```

   O script já converteu riscv32 → xtensa-esp32s3, `-march=rv32imc` → `-mlongcalls` e o SDK `esp32c3` → SDK `esp32s3`. Basta copiar o artefato para o projeto conforme a indicação no fim do script.

### Referências

- Documentação de referência de hardware do NanoCam (esquemático / datasheet / definições de pinos / driver ES8311): `docs/reference/` no repositório
- [micro-ROS](https://micro.ros.org/) / [micro_ros_arduino](https://github.com/micro-ROS/micro_ros_arduino)
- [LeRobot](https://github.com/huggingface/lerobot)

<RelatedProducts slugs="so-arm101,esp32-s3-wifi-module" />
