---
title: Tutorial de utilização da ferramenta de calibração de servos da série SoARM
description: "Ferramenta de calibração de fábrica de servos FTServo e de calibração LeRobot para braços robóticos da série SoARM 10X."
---

# Tutorial de utilização da ferramenta de calibração de servos da série SoARM

> **[Comprar na loja](https://www.juxitech.com/products/so-arm101-developers-kit)**


**A ferramenta de calibração da série SoARM** é um conjunto de ferramentas de calibração de fábrica de servos FTServo e de calibração LeRobot concebido especificamente para os braços robóticos da série SoARM 10X (como o [kit de desenvolvimento SO-ARM101](/pt-pt/products/so-arm101)). Através da interface gráfica pode efetuar a calibração do ponto médio dos servos, o controlo de servos individuais, a leitura/escrita de parâmetros, o backup/restauro de parâmetros xdat e a teleoperação sincronizada de duas portas, entre outras operações, e ainda gerar ficheiros de calibração JSON no formato LeRobot. Para a montagem do braço robótico e a instalação dos servos, consulte primeiro o [Tutorial de montagem do braço robótico LeRobot](./SO-ARM101-Assembly.md).

Esta ferramenta é uma adaptação e melhoria do projeto [Seeed_RoboController da Seeed Studio](https://github.com/Seeed-Studio), publicado originalmente sob licença MIT. Mantendo as funcionalidades principais do projeto original, este projeto reconstruiu a interface GUI e acrescentou o Depurador FT, o backup/restauro de parâmetros xdat, o suporte multiplataforma e outras funcionalidades melhoradas.

## Aviso de compatibilidade

> ⚠️ **Esta ferramenta suporta atualmente apenas servos Feetech (série STS3215)**. A tabela de registos, o formato dos parâmetros xdat e a tabela de taxas de baud foram concebidos especificamente para a série STS3215 da Feetech; não se garante a compatibilidade com servos de outras marcas/modelos.

## Funcionalidades

| Funcionalidade | Descrição |
| ---- | ---- |
| Deteção automática de portas | Identifica automaticamente portas USB e filtra dispositivos virtuais |
| Suporte multiplataforma | Compatível com Windows / Ubuntu / macOS |
| Sincronização de duas portas | As duas portas série (esquerda e direita) funcionam de forma independente; suporta teleoperação sincronizada mestre-escravo |
| Alternância entre chinês e inglês | Muda entre chinês / inglês na interface com um clique; a escolha é memorizada automaticamente |
| Calibração do ponto médio | Grava a posição atual dos servos como ponto médio 2048 (persistido na EEPROM) |
| Teste do ponto médio | Ativa o torque e move os servos para o ponto médio, validando o resultado da calibração |
| Desativar motores | Desliga com um clique o torque de todos os servos, facilitando os ajustes manuais |
| Varredura automática | Deteta automaticamente todos os servos online com ID entre 1 e 20 |
| Controlo de servo individual | Controla em tempo real a posição de cada servo e o interruptor de torque com um cursor deslizante |
| Depurador FT | Ligação à porta série, varredura, leitura/escrita de parâmetros, controlo de posição, alteração da taxa de baud, restauro de fábrica e backup de parâmetros xdat |
| Parâmetros xdat | Guardar os parâmetros EEPROM do servo atual / abrir um backup para restaurar |
| Calibração LeRobot | Gera ficheiros de calibração JSON no formato LeRobot |
| Execução do ponto médio a partir do ficheiro de calibração | Move o braço robótico para o ponto médio de acordo com o ficheiro de calibração |

## Introdução à interface

O programa principal contém três separadores:

```
┌─────────────────────────────────────────────────────────────┐
│  SoARM 系列校准工具         [串口1▾] [串口2▾] [🔄]  [🎮遥控][EN]│  ← 顶栏
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────┬──────────────────────────────┐ │
│  │ 串口1 - 舵机标定        │ 串口2 - 舵机标定            │ │
│  │  [🔴未连接] 当前舵机:…   │  [🔴未连接] 当前舵机:…      │ │
│  │  舵机1~6 状态表格        │  舵机1~6 状态表格           │ │
│  │  [中位校准][中位测试]…   │  [中位校准][中位测试]…      │ │
│  └─────────────────────────┴──────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

- **Barra superior**: título da aplicação, listas pendentes de seleção das portas série, botão de atualização, botão de teleoperação e botão de alternância de idioma.
- **🦾 Separador 1 – Calibração de servos**: operações rápidas dos painéis esquerdo e direito (calibração do ponto médio, teste do ponto médio, desativar motores) e estado em tempo real.
- **🎚️ Separador 2 – Controlo de servo individual**: ajuste fino da posição e ativação/desativação do torque de cada servo online com um cursor deslizante.
- **🔬 Separador 3 – Depurador FT**: ligação à porta série, varredura, leitura/escrita de parâmetros (56 registos), controlo de posição, taxa de baud/restauro de fábrica e backup/restauro de parâmetros xdat.

## Instalação e arranque

Requisitos de ambiente:

| Dependência | Versão | Descrição |
| ---- | ---- | ---- |
| Python | >= 3.8 | Recomenda-se 3.10+; transferir em [python.org](https://www.python.org/downloads/) |
| PySide6 | >= 6.0 | Framework de GUI |
| pyserial | >= 3.5 | Comunicação por porta série |
| Sistema | Windows 10 / 11, Ubuntu 20.04+ / Debian 11+, macOS 11+ | macOS 11+ suporta Apple Silicon / Intel |

Ligação de hardware: ligue a placa de controlo do braço robótico com um adaptador USB-série (como o CH340 / CP2102) e alimente os servos (recomenda-se DC 5V 5A para a versão standard e DC 12V 5A para a versão Pro).

### Windows

1. Instale o [Python 3.10+](https://www.python.org/downloads/) (durante a instalação, marque obrigatoriamente **Add Python to PATH**, caso contrário a linha de comandos não encontra o `python`). Verifique a instalação:

```bash
python --version
```

2. Crie um ambiente virtual e instale as dependências:

```bash
cd Juxi_ServoController
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

> Dica: depois da ativação, aparece o prefixo `(.venv)` na linha de comandos.

3. Verifique o ambiente e inicie o programa:

```bash
python setup.py
python -m src.gui.factory_calibration_tool
```

Se aparecer `[OK] 环境检查通过，可以运行项目`, o ambiente está correto.

4. No Gestor de Dispositivos (`Win+X` → Gestor de Dispositivos), confirme o número da porta em «Portas (COM e LPT)»:

```
端口 (COM 和 LPT)
  └─ USB-SERIAL CH340 (COM3)     ← 你的舵机串口
```

> **Anote o número COM** e selecione-o na barra superior depois do arranque; também pode indicar a porta manualmente (quando a porta série estiver ocupada):

```bash
python -m src.gui.factory_calibration_tool --port1 COM3 --port2 COM4
```

Ver as portas disponíveis:

```bash
python -m src.gui.factory_calibration_tool --list-ports
```

### Linux (Ubuntu / Debian)

1. Instale as fontes chinesas e as dependências (as fontes chinesas são necessárias para apresentar a interface em chinês; a fonte de emoji serve para ícones como ✅⚠️ no log):

```bash
sudo apt install python3-venv fonts-noto-cjk fonts-noto-color-emoji
```

2. **⚠️ Adicione permissões para a porta série (grupo dialout) [obrigatório]** (por predefinição, um utilizador normal do Linux não consegue aceder a `/dev/ttyUSB*` / `/dev/ttyACM*`):

```bash
sudo usermod -a -G dialout $USER
# Tem efeito depois de terminar sessão e iniciar sessão novamente
```

Verificação (a saída deve conter `dialout`):

```bash
groups
```

> Se não resultar: reinicie o computador; nalgumas distribuições o nome do grupo é `uucp` (Arch) ou `tty`.

3. Crie o ambiente virtual, instale as dependências e inicie o programa:

```bash
cd Juxi_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

> Se o pip apresentar o erro externally managed environment, use `pip install --break-system-packages -r requirements.txt` ou um ambiente virtual.

4. Identifique o dispositivo USB-série (depois de ligar o adaptador):

```bash
ls /dev/ttyUSB* /dev/ttyACM* 2>/dev/null
```

Saída típica:

```
/dev/ttyUSB0   # CH340 / CP2102 / PL2303
/dev/ttyACM0   # Porta série USB nativa (integrada no Arduino / ESP32)
```

Consulte informações detalhadas do fabricante:

```bash
dmesg | tail -20 | grep -i tty
# ou
lsusb
```

> Com vários dispositivos, `ttyUSB0` / `ttyUSB1` são atribuídos pela ordem de ligação/desligação, o que pode ser instável. Recomenda-se usar `/dev/ttyACM*` ou fixar pelo fabricante (ver a secção udev mais abaixo).

Indicar a porta manualmente:

```bash
python -m src.gui.factory_calibration_tool --port1 /dev/ttyUSB0 --port2 /dev/ttyUSB1
```

> Se existir apenas uma porta série, a ferramenta define automaticamente a segunda porta como «desativada».

5. Opcional: fixe o nome do dispositivo com udev (para evitar que a numeração mude após ligar/desligar). Crie `/etc/udev/rules.d/99-servo.rules` e fixe pelo ID USB:

```
SUBSYSTEM=="tty", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", SYMLINK+="ttyServo"
```

Depois, `ls -l /dev/ttyServo` permite aceder com o nome fixo; consulte o ID do fabricante com `lsusb`.

### macOS

1. Instale o Python com o Homebrew (para evitar a versão demasiado antiga do Python do sistema):

```bash
# Instalar o Homebrew (se não tiver)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar o Python
brew install python
```

Verificação:

```bash
python3 --version
```

2. Crie o ambiente virtual, instale as dependências e inicie o programa (ative com `source`, não com `.bat`):

```bash
cd Juxi_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

3. **⚠️ Nomes das portas série**: o macOS coloca os dispositivos USB-série em `/dev`, com **dois esquemas de nomenclatura**:

| Prefixo | Significado | Utilizável |
| ---- | ---- | -------- |
| `/dev/tty.usbserial-*` | Estilo modem (bloqueante) | Pode ficar preso; não recomendado |
| `/dev/cu.usbserial-*` | Estilo chamada/terminal (**não bloqueante**) | ✅ Recomendado |

Veja o nome da sua porta série:

```bash
ls /dev/cu.*
```

Saída típica:

```
/dev/cu.usbserial-0001      # CP2102 / FTDI
/dev/cu.usbmodem141101      # Porta série USB integrada (Arduino / ESP32)
/dev/cu.wchusbserial1420    # CH340
```

> O programa dá automaticamente prioridade aos dispositivos `cu.*`; ao indicar a porta manualmente, use `cu.` em vez de `tty.`.

Indicar a porta manualmente:

```bash
python -m src.gui.factory_calibration_tool --port1 /dev/cu.usbserial-0001 --port2 /dev/cu.usbmodem141101
```

4. Controladores USB: o macOS inclui controladores para a maioria dos chips comuns (CH340, CP2102, FTDI), prontos a usar. Se o dispositivo não for reconhecido:

```bash
system_profiler SPUSBDataType | grep -A5 -i "serial\|CH340\|CP210"
```

- **CH340**: os lotes mais antigos exigem a instalação do controlador oficial da WCH;
- Em geral, basta que `ls /dev/cu.*` mostre o dispositivo.

5. Sugestões de utilização:
   - **O nome da porta série muda**: depois de ligar/desligar em portas USB diferentes, o nome `cu.*` pode mudar; basta selecioná-lo na lista pendente da barra superior em cada arranque.
   - **Poupança de energia**: o macOS pode entrar em suspensão e desligar a porta série; mantenha o computador acordado durante a operação ou aumente o tempo de suspensão.
   - **Permissões de privacidade**: na primeira execução, se aparecer o pedido «Acesso a discos removíveis», clique em Permitir.

## Passos de utilização

### 1. Ligar e identificar os servos

1. Ligue a placa de controlo do braço robótico através de um adaptador USB-série e alimente os servos.
2. Abra a GUI e selecione a porta correspondente na lista pendente da barra superior (ou clique em `🔄` para atualizar).
3. O topo do painel mostra `🟢 已连接` e é feita automaticamente uma varredura aos servos online com ID entre 1 e 20 (normalmente 1–6).

> Se aparecer um aviso de porta série ocupada, confirme que nenhum outro programa (monitor de porta série, uma instância anterior da ferramenta ainda aberta) está a usar essa porta.

### 2. Calibração do ponto médio (definir a posição atual como 2048)

> Antes de calibrar, coloque primeiro o braço robótico na posição desejada, com cada articulação na «posição zero / ponto médio» pretendida.

1. Clique no botão **Calibração do ponto médio da porta X** no painel.
2. O programa desativa primeiro os servos e pede-lhe para ajustar manualmente cada servo até ao ponto médio pretendido.
3. Após a confirmação, o programa executa para cada servo: desbloquear a EEPROM → escrever o comando de calibração (valor 128 no endereço 40) → voltar a bloquear a EEPROM.
4. Depois da calibração, pode validar com o «teste do ponto médio»: se os servos se mantiverem praticamente na mesma posição (deslocamento muito pequeno), a calibração foi bem-sucedida.

### 3. Teste do ponto médio

1. Clique em **Teste do ponto médio da porta X**.
2. O programa ativa o torque e move todos os servos para 2048.
3. Se os servos quase não se moverem da posição atual, a calibração está correta; se se moverem bastante, o valor de calibração não é fiável e é preciso recalibrar.

### 4. Desativar motores (ajuste manual)

- Clique em **Desativar motores da porta X** para desligar o torque de todos os servos dessa porta, podendo rodá-los livremente à mão.
- Um servo individual pode ser ativado/desativado no separador **Controlo de servo individual**, através do interruptor de torque por baixo do cursor deslizante.

### 5. Controlo de servo individual (separador 2)

1. No separador **🎚️ Controlo de servo individual**, cada servo online tem um cursor deslizante de posição e um interruptor de torque.
2. **Arraste o cursor deslizante → solte**; o servo move-se para a posição alvo.
3. O interruptor de torque por baixo do cursor deslizante permite ativar/desativar individualmente o torque desse servo.

### 6. Depurador FT (leitura/escrita de parâmetros e controlo de posição)

No separador **🔬 Depurador FT**:

1. **Ligação da porta série**: selecione a porta e a taxa de baud (predefinição 1M); depois de ligar, use **Varrer servos** para detetar os servos online.
2. **Ler parâmetros**: lê todos os registos (EEPROM + SRAM).
3. **Tabela de parâmetros**: apresenta os 56 registos em 5 colunas; ao clicar numa linha, o «endereço de escrita» é preenchido automaticamente.
4. **Controlo de posição**: defina a posição alvo / a velocidade e execute; após o movimento, é sugerido desligar o torque.
5. A alteração da taxa de baud, o restauro de fábrica e o backup/restauro de parâmetros xdat estão descritos nas secções seguintes.

### 7. Alterar o ID do servo

1. Entre no separador **🔬 Depurador FT**, ligue a porta série e faça a varredura dos servos.
2. Selecione o servo pretendido e altere o valor de «ID do servo» (endereço 0x05) na tabela de parâmetros; clique em escrever.
3. O programa executa: desbloquear → escrever no endereço 5 → validar o novo ID → voltar a bloquear.

> ⚠️ Antes de alterar o ID, certifique-se de que só este servo está ligado ao barramento, para evitar conflitos de ID.

### 8. Alterar a taxa de baud / restaurar predefinições de fábrica

- **Alterar a taxa de baud**: na área «Taxa de baud / restauro de fábrica» do Depurador FT, selecione a nova taxa de baud (38400 – 1000000 bps) e altere. Após a escrita, a taxa de baud da porta série é comutada automaticamente e validada por ping; em caso de falha, há reversão automática.
- **Restaurar predefinições de fábrica**: os servos voltam às predefinições de fábrica (ID=1, taxa de baud=1000000); depois é preciso fazer nova varredura.

### 9. Backup e restauro de parâmetros xdat

Na área «Parâmetros xdat (apenas guarda a EEPROM)» do Depurador FT:

1. **💾 Guardar servo atual**: guarda os parâmetros EEPROM do servo selecionado num ficheiro xdat (backup).
2. Depois de alterar livremente os parâmetros do servo, se quiser restaurar:
3. **📂 Abrir xdat**: carrega o ficheiro de backup.
4. **📤 Restaurar parâmetros no servo**: escreve o backup de volta na EEPROM do servo atual.

### 10. Teleoperação sincronizada de duas portas

> ⚠️ **Sentido: a porta 1 controla a porta 2**. A porta 1 (mestre) apenas lê os ângulos dos servos; a porta 2 (escravo) é controlada de forma sincronizada.

1. Clique em **🎮 Teleoperação** na barra superior (a porta 1 lê os ângulos → a porta 2 controla de forma sincronizada os servos com o mesmo ID).
2. Os IDs dos servos das duas portas têm de ser iguais; apenas são sincronizados os servos da interseção.
3. Clique novamente no mesmo botão para parar; em seguida, a thread de varredura dos painéis esquerdo e direito é retomada automaticamente.

### 11. Calibração LeRobot (linha de comandos)

```bash
# Calibrar o braço seguidor (guardar em ~/.cache/huggingface/lerobot/calibration/robots/so_follower/)
python -m src.tools.lerobot_calibrate --arm-type follower

# Calibrar o braço líder
python -m src.tools.lerobot_calibrate --arm-type leader
```

Fluxo: desativar os servos → levar cada articulação ao ponto médio e registar o `homing_offset` → rodar lentamente ao longo de todo o curso e registar `range_min/max` (o `wrist_roll` é uma articulação de rotação contínua, com intervalo fixo `[0,4095]`) → guardar o JSON.

Executar o ponto médio de acordo com o ficheiro de calibração:

```bash
python -m src.tools.run_calibration_middle <校准文件.json> --mode zero
```

A instalação do ambiente LeRobot e o fluxo de recolha de dados estão descritos no [Tutorial do braço robótico LeRobot](./SO-ARM101-Tutorial.md).

## Ferramentas de linha de comandos

Além da interface gráfica, a ferramenta disponibiliza os seguintes pontos de entrada de linha de comandos (sem necessidade de GUI):

```bash
# Digitalizar os servos
python -m src.tools.scan_id

# Calibração rápida do ponto médio dos servos
python -m src.tools.servo_quick_calibration

# Teste do ponto médio dos servos
python -m src.tools.servo_center_test

# Desativar todos os servos
python -m src.tools.servo_disable

# Calibração ao estilo LeRobot
python -m src.tools.lerobot_calibrate

# Calibração ao estilo LeRobot (porta série especificada)
python -m src.tools.lerobot_calibrate /dev/ttyACM0

# Calibração ao estilo LeRobot (porta série especificada, macOS)
python -m src.tools.lerobot_calibrate /dev/cu.usbserial-0001

# Teleoperação sincronizada de duas portas
python -m src.tools.servo_remote_control
```

## Precauções

1. **Segurança em primeiro lugar**: a calibração do ponto médio persiste dados na EEPROM. Antes de calibrar, confirme que a alimentação é estável e que o braço robótico não colide com pessoas ou objetos.
2. **Alimentação**: recomenda-se DC 5V 5A para a versão standard do SoARM 101 e DC 12V 5A para a versão Pro. Alimentação insuficiente provoca perda de passos ou falhas de comunicação nos servos.
3. **Exclusividade da porta série**: no Windows, a porta série é ocupada exclusivamente pelo programa; a mesma porta não pode ser ocupada ao mesmo tempo pela thread de varredura da GUI e pelo subprocesso de calibração. A ferramenta para automaticamente a thread de varredura e termina os processos antigos antes de operar; não clique repetidamente.
4. **Permissões da porta série no Linux**: o acesso a `/dev/ttyUSB*` / `/dev/ttyACM*` exige adicionar o utilizador ao grupo `dialout` (ver a secção «Linux» acima).
5. **Nomes das portas série no macOS**: use `/dev/cu.*` (não bloqueante) em vez de `/dev/tty.*` (bloqueante, pode ficar preso); ver a secção «macOS» acima.
6. **Hot-plug**: depois de desligar o USB, o programa tenta reconectar automaticamente; após voltar a ligar, clique em `🔄` para atualizar a lista de portas.
7. **Proteção contra sobreaquecimento / sobretensão**: o programa monitoriza a tensão e a temperatura (alerta quando a temperatura > 60°C). Se os servos aquecerem de forma contínua, pare e deixe arrefecer.
8. **A calibração do ponto médio é irreversível**: depois da escrita, o desvio original é substituído e não pode ser anulado. Recomenda-se registar a posição original antes de calibrar.
9. **Risco ao alterar o ID**: se a escrita ou a validação falharem, o programa apresenta um erro e retoma a varredura, mas em casos extremos o servo pode «perder a ligação». Nesse caso, experimente «restaurar as predefinições de fábrica» (após o reset, o ID volta a 1).
10. **Problemas de codificação**: se aparecerem emojis corrompidos na consola do Windows, defina `PYTHONIOENCODING=utf-8` antes de executar as ferramentas de linha de comandos. No Linux / macOS, com UTF-8 nativo, normalmente não há este problema.

## Resolução de problemas

| Sintoma | Causa possível | Solução |
| ---- | -------- | -------- |
| Não é possível abrir a porta série / porta ocupada | Outro programa a usar a porta | Feche programas como monitores de porta série, ou mude de porta e reinicie a ferramenta |
| Windows: erro PermissionError ao abrir a porta série | Outro processo a ocupar essa porta COM | Certifique-se de que nenhum outro processo ocupa essa porta COM |
| Varredura não encontra servos | Alimentação insuficiente / cablagem incorreta / taxa de baud incorreta | Verifique a alimentação e a cablagem; confirme que os servos estão a 1M de taxa de baud |
| Servos movem-se descontroladamente após a calibração do ponto médio | O braço não estava bem posicionado antes da calibração | Repita «desativar → posicionar à mão → calibração do ponto médio» |
| Aquecimento demasiado rápido | Carga excessiva ou bloqueio do motor | Verifique se o mecanismo está preso; reduza a velocidade/aceleração |
| Servo não encontrado após alterar o ID | Conflito de ID ou falha na escrita | Restaure as predefinições de fábrica e faça nova varredura |
| Teleoperação dessincronizada | IDs diferentes nas duas portas | Confirme que os servos com o mesmo ID estão online nas portas mestre e escrava |
| Windows: porta série não encontrada | Controlador em falta | Verifique o controlador no Gestor de Dispositivos; mude de porta USB; instale o controlador CH340 |
| Linux: porta série não encontrada | Dispositivo não reconhecido | `ls /dev/ttyUSB* /dev/ttyACM*`; confirme o dispositivo com `lsusb` |
| Permission denied: /dev/ttyUSB0 | Utilizador não pertence ao grupo dialout | Execute `sudo usermod -a -G dialout $USER` e volte a iniciar sessão; ou `sudo chmod 666 /dev/ttyUSB0` (temporário) |
| Linux: o nome do dispositivo muda | A ordem de ligar/desligar afeta a numeração ttyUSB | Fixe o nome com regras udev (ver a secção «Linux» acima) ou selecione a porta em cada arranque |
| macOS: porta com `tty.` fica presa | Foi usado um nome de dispositivo bloqueante | Use o dispositivo com o prefixo `cu.` |
| macOS: dispositivo não encontrado | Dispositivo não reconhecido | `ls /dev/cu.*`; volte a ligar; verifique com `system_profiler SPUSBDataType` |
| macOS: problemas de permissões | Controlo de acesso do sistema | Em geral não são necessárias permissões extra; se aparecer o controlo de acesso, permita o acesso ao terminal |
| Interface em chinês em branco | Falta de fontes chinesas | No Windows, Microsoft YaHei por predefinição (instale um tipo de letra chinês em caso de anomalia); no Linux, instale `fonts-noto-cjk`; no macOS, PingFang por predefinição (em caso de anomalia, instale Noto Sans CJK) |
| Emojis aparecem como quadrados | Falta de fonte de emoji | Instale `fonts-noto-color-emoji` |
| Falha na instalação com pip | Python do sistema protegido (externally managed environment) | Use um ambiente virtual; ou `pip install --break-system-packages -r requirements.txt` |
| O programa não inicia | Dependências em falta ou versões incompatíveis | Confirme a versão com `python3 --version`; verifique as dependências com `pip list` |
| macOS: falha ao ativar o ambiente virtual | Script de ativação errado | Use `source .venv/bin/activate` (não `.bat`) |
| macOS Apple Silicon: erro de compilação | Python antigo a correr via Rosetta | Use Python 3.10+ (com suporte nativo Apple Silicon) |

## Estrutura de diretórios

```
Juxi_ServoController/
├── docs/                    # Tutoriais por sistema
│   ├── Windows教程.md
│   ├── Linux教程.md
│   └── macOS教程.md
├── src/
│   ├── gui/                  # Interface gráfica PySide6
│   │   ├── factory_calibration_tool.py   # Ferramenta principal (calibração de duas portas série + teleoperação + alternância de idioma)
│   │   ├── ft_debugger.py                # Depurador FT (leitura/escrita de parâmetros / backup xdat)
│   │   ├── calibration_wizard.py         # Assistente de calibração LeRobot
│   │   ├── theme_utils.py                # Tema claro
│   │   └── language_dialog.py            # Caixa de diálogo de seleção de idioma
│   ├── tools/                # Ferramentas de linha de comandos
│   ├── xdat_utils.py         # Leitura e escrita de ficheiros de parâmetros xdat
│   ├── i18n*.py / i18n_translations/     # Internacionalização chinês-inglês
│   ├── port_utils.py         # Deteção de portas série
│   └── calibration_manager.py# LeRobot 校准文件管理
├── scservo_sdk/              # SDK de comunicação de servos FTServo
├── requirements.txt
└── setup.py                  # Script de verificação do ambiente
```

O repositório desta ferramenta é composto pelos módulos `src/gui` (interface gráfica PySide6), `src/tools` (ferramentas de linha de comandos), `scservo_sdk` (SDK de comunicação com servos FTServo) e `setup.py` (script de verificação do ambiente), entre outros.

<RelatedProducts slugs="so-arm101,servo-driver-board" />
