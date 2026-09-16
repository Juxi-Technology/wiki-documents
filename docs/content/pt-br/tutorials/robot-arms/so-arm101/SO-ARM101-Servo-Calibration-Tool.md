---
title: Tutorial de uso da ferramenta de calibração de servos da série SoARM
description: "Ferramenta de calibração de fábrica FTServo e de calibração LeRobot para braços robóticos da série SoARM 10X, com calibração de ponto médio."
---

# Tutorial de uso da ferramenta de calibração de servos da série SoARM

> **[Comprar na loja](https://www.juxitech.com/pt/products/so-arm101-developers-kit)**


**A ferramenta de calibração da série SoARM** é um kit de ferramentas de calibração de fábrica FTServo e de calibração LeRobot projetado especificamente para braços robóticos da série SoARM 10X (como o [kit de desenvolvimento SO-ARM101](/pt-br/products/so-arm101)). Pela interface gráfica, você pode concluir operações como calibração de ponto médio dos servos, controle de servo individual, leitura/gravação de parâmetros, backup/restauração de parâmetros xdat e controle remoto síncrono de duas portas, além de gerar arquivos de calibração JSON no formato LeRobot. Para a montagem do braço robótico e a instalação dos servos, consulte primeiro o [Tutorial de montagem do braço SO-ARM101 LeRobot](./SO-ARM101-Assembly.md).

Esta ferramenta é baseada no projeto [Seeed_RoboController da Seeed Studio](https://github.com/Seeed-Studio), reformulado e aprimorado; o projeto original foi publicado sob licença MIT. Este projeto, mantendo as funcionalidades principais originais, reconstruiu a interface gráfica e adicionou recursos aprimorados como o depurador FT, o backup/restauração de parâmetros xdat e o suporte multiplataforma.

## Aviso de compatibilidade

> ⚠️ **Esta ferramenta atualmente suporta apenas servos Feetech (série STS3215)**. A tabela de registradores, o formato de parâmetros xdat e a tabela de taxas de baud foram projetados para a série STS3215 da Feetech; servos de outras marcas/modelos não têm compatibilidade garantida.

## Recursos

| Recurso | Descrição |
| ---- | ---- |
| Detecção automática de portas | Identifica de forma inteligente portas seriais USB, filtrando automaticamente dispositivos virtuais |
| Suporte multiplataforma | Compatível com Windows / Ubuntu / macOS |
| Sincronização de duas portas | As duas portas seriais, esquerda e direita, operam de forma independente, com controle remoto síncrono mestre-escravo entre as duas portas |
| Alternância chinês/inglês | Troca entre chinês/inglês com um clique na interface, com memorização automática da escolha |
| Calibração de ponto médio | Grava a posição atual do servo como ponto médio 2048 (persistido na EEPROM) |
| Teste de ponto médio | Ativa o torque e move o servo até o ponto médio para verificar o resultado da calibração |
| Desabilitar motores | Desliga com um clique o torque de todos os servos, facilitando o ajuste manual |
| Varredura automática | Detecta automaticamente todos os servos online no intervalo de ID 1–20 |
| Controle de servo individual | Controle em tempo real, por controle deslizante, da posição e do torque de um servo individual |
| Depurador FT | Conexão serial, varredura, leitura/gravação de parâmetros, controle de posição, alteração de taxa de baud, restauração de fábrica e backup de parâmetros xdat |
| Parâmetros xdat | Salva os parâmetros EEPROM do servo atual / abre backup para restauração |
| Calibração LeRobot | Gera arquivos de calibração JSON no formato LeRobot |
| Execução ao ponto médio por arquivo de calibração | Move o braço robótico até o ponto médio com base no arquivo de calibração |

## Visão geral da interface

O programa principal contém três abas:

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

- **Barra superior**: título do aplicativo, caixas de seleção de porta serial, botão de atualizar, botão de controle remoto e botão de troca de idioma.
- **🦾 Aba 1 Calibração de servos**: operações rápidas nos painéis esquerdo e direito (calibração de ponto médio, teste de ponto médio, desabilitar motores) e status em tempo real.
- **🎚️ Aba 2 Controle de servo individual**: ajuste fino da posição de cada servo online com controle deslizante e ativação/desativação do torque.
- **🔬 Aba 3 Depurador FT**: conexão serial, varredura, leitura/gravação de parâmetros (56 registradores), controle de posição, taxa de baud/restauração de fábrica e backup/restauração de parâmetros xdat.

## Instalação e inicialização

Requisitos de ambiente:

| Dependência | Versão | Descrição |
| ---- | ---- | ---- |
| Python | >= 3.8 | Recomendado 3.10+; baixe em [python.org](https://www.python.org/downloads/) |
| PySide6 | >= 6.0 | Framework de GUI |
| pyserial | >= 3.5 | Comunicação serial |
| Sistema | Windows 10 / 11, Ubuntu 20.04+ / Debian 11+, macOS 11+ | macOS 11+ com suporte a Apple Silicon / Intel |

Conexão de hardware: use um adaptador USB-serial (como CH340 / CP2102) para conectar a placa de controle do braço robótico e alimente os servos (versão padrão recomendada DC 5V 5A; versão Pro recomendada DC 12V 5A).

### Windows

1. Instale o [Python 3.10+](https://www.python.org/downloads/) (durante a instalação, marque obrigatoriamente **Add Python to PATH**, caso contrário o `python` não será encontrado na linha de comando). Verifique a instalação:

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

> Dica: após a ativação, o prefixo `(.venv)` aparecerá na linha de comando.

3. Verifique o ambiente e inicie:

```bash
python setup.py
python -m src.gui.factory_calibration_tool
```

Ver `[OK] 环境检查通过，可以运行项目` significa que o ambiente está correto.

4. No Gerenciador de Dispositivos (`Win+X` → Gerenciador de Dispositivos), confirme o número da porta serial em "Portas (COM e LPT)":

```
端口 (COM 和 LPT)
  └─ USB-SERIAL CH340 (COM3)     ← 你的舵机串口
```

> **Anote o número da COM** e selecione-a na barra superior após iniciar; também é possível especificar a porta manualmente (quando a porta serial estiver ocupada):

```bash
python -m src.gui.factory_calibration_tool --port1 COM3 --port2 COM4
```

Para ver as portas disponíveis:

```bash
python -m src.gui.factory_calibration_tool --list-ports
```

### Linux (Ubuntu / Debian)

1. Instale as fontes chinesas e as dependências (as fontes chinesas são necessárias para exibir a interface em chinês; as fontes de emoji são usadas para ícones como ✅⚠️ nos logs):

```bash
sudo apt install python3-venv fonts-noto-cjk fonts-noto-color-emoji
```

2. **⚠️ Adicionar permissão de porta serial (grupo dialout) [obrigatório]** (por padrão, usuários comuns do Linux não conseguem acessar `/dev/ttyUSB*` / `/dev/ttyACM*`):

```bash
sudo usermod -a -G dialout $USER
# 注销并重新登录后生效
```

Verificação (a saída deve conter `dialout`):

```bash
groups
```

> Se não funcionar: reinicie o computador; em algumas distribuições o nome do grupo é `uucp` (Arch) ou `tty`.

3. Crie o ambiente virtual, instale as dependências e inicie:

```bash
cd Juxi_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

> Se o pip reportar o erro externally managed environment, use `pip install --break-system-packages -r requirements.txt`, ou utilize um ambiente virtual.

4. Identifique o dispositivo USB-serial (após conectar o adaptador):

```bash
ls /dev/ttyUSB* /dev/ttyACM* 2>/dev/null
```

Saída típica:

```
/dev/ttyUSB0   # CH340 / CP2102 / PL2303
/dev/ttyACM0   # 原生 USB 串口（Arduino / ESP32 板载）
```

Para ver informações detalhadas do fabricante:

```bash
dmesg | tail -20 | grep -i tty
# 或
lsusb
```

> Com vários dispositivos, a atribuição de `ttyUSB0` / `ttyUSB1` segue a ordem de conexão e pode ser instável. Recomenda-se usar `/dev/ttyACM*` ou fixar por fabricante (ver a seção udev abaixo).

Especificar a porta manualmente:

```bash
python -m src.gui.factory_calibration_tool --port1 /dev/ttyUSB0 --port2 /dev/ttyUSB1
```

> Se houver apenas uma porta serial, a ferramenta define automaticamente a segunda porta como "desabilitada".

5. Opcional: fixe o nome do dispositivo com udev (evitando que a numeração mude após reconexões). Crie `/etc/udev/rules.d/99-servo.rules` fixando por USB ID:

```
SUBSYSTEM=="tty", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", SYMLINK+="ttyServo"
```

Depois, `ls -l /dev/ttyServo` permite acessar pelo nome fixo; para consultar o ID do fabricante, use `lsusb`.

### macOS

1. Instale o Python com o Homebrew (para evitar a versão antiga do Python do sistema):

```bash
# 安装 Homebrew（如果没有）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Python
brew install python
```

Verifique:

```bash
python3 --version
```

2. Crie o ambiente virtual, instale as dependências e inicie (ative com `source`, não com `.bat`):

```bash
cd Juxi_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

3. **⚠️ Nomenclatura da porta serial**: o macOS coloca os dispositivos USB-serial em `/dev`, com **dois padrões de nome**:

| Prefixo | Significado | Utilizável |
| ---- | ---- | -------- |
| `/dev/tty.usbserial-*` | Estilo modem (bloqueante) | Pode travar, não recomendado |
| `/dev/cu.usbserial-*` | Estilo call-out/terminal (**não bloqueante**) | ✅ Recomendado |

Para ver o nome da sua porta serial:

```bash
ls /dev/cu.*
```

Saída típica:

```
/dev/cu.usbserial-0001      # CP2102 / FTDI
/dev/cu.usbmodem141101      # 板载 USB 串口（Arduino / ESP32）
/dev/cu.wchusbserial1420    # CH340
```

> O programa prioriza automaticamente dispositivos `cu.*`; ao especificar a porta manualmente, use `cu.` em vez de `tty.`.

Especificar a porta manualmente:

```bash
python -m src.gui.factory_calibration_tool --port1 /dev/cu.usbserial-0001 --port2 /dev/cu.usbmodem141101
```

4. Driver USB: a maioria dos chips comuns (CH340, CP2102, FTDI) tem driver nativo no macOS, plug and play. Se o dispositivo não for reconhecido:

```bash
system_profiler SPUSBDataType | grep -A5 -i "serial\|CH340\|CP210"
```

- **CH340**: lotes mais antigos exigem a instalação do driver oficial da WCH;
- Em geral, basta que `ls /dev/cu.*` mostre o dispositivo.

5. Dicas de uso:
   - **O nome da porta serial pode mudar**: o nome `cu.*` pode mudar ao reconectar em portas USB diferentes; basta selecionar na caixa da barra superior a cada inicialização.
   - **Economia de energia**: o macOS pode suspender e desconectar a porta serial; mantenha o computador desperto ou aumente o tempo de suspensão durante a operação.
   - **Permissão de privacidade**: na primeira execução, se aparecer o aviso "acessar disco removível", clique em permitir.

## Passos de uso

### 1. Conectar e identificar os servos

1. Conecte a placa de controle do braço robótico através de um adaptador USB-serial e alimente os servos.
2. Abra a GUI e selecione a porta correspondente na caixa de seleção da barra superior (ou clique em `🔄` para atualizar).
3. O topo do painel exibe `🟢 已连接` e escaneia automaticamente os servos online no intervalo de ID 1–20 (normalmente 1–6).

> Se aparecer o aviso de porta serial ocupada, confirme que nenhum outro programa (monitor de porta serial, instância anterior da ferramenta não encerrada) está usando essa porta.

### 2. Calibração de ponto médio (definir a posição atual como 2048)

> Antes de calibrar, posicione fisicamente o braço robótico de modo que cada articulação fique na "posição zero / ponto médio" desejada.

1. Clique no botão **Calibração de ponto médio (Porta X)** no painel.
2. O programa primeiro desabilita os servos e solicita que você ajuste manualmente os servos até o ponto médio desejado.
3. Após a confirmação, o programa executa em cada servo: desbloquear a EEPROM → gravar o comando de calibração (valor 128 no endereço 40) → bloquear a EEPROM novamente.
4. Após a calibração, use o "Teste de ponto médio" para validar: se os servos permanecerem praticamente na mesma posição (deslocamento mínimo), a calibração foi bem-sucedida.

### 3. Teste de ponto médio

1. Clique em **Teste de ponto médio (Porta X)**.
2. O programa ativa o torque e move todos os servos para 2048.
3. Se os servos praticamente não se moverem da posição atual, a calibração está correta; se se moverem muito, o valor de calibração não é confiável e é preciso recalibrar.

### 4. Desabilitar motores (ajuste manual)

- Clique em **Desabilitar motores (Porta X)** para desligar o torque de todos os servos dessa porta e girá-los manualmente com liberdade.
- Servos individuais podem ter o torque ativado/desativado na página **Controle de servo individual**, pela chave de torque abaixo do controle deslizante.

### 5. Controle de servo individual (Aba 2)

1. Na página **🎚️ Controle de servo individual**, cada servo online corresponde a um controle deslizante de posição e a uma chave de torque.
2. **Arraste o controle deslizante → ao soltar**, o servo se move até a posição de destino.
3. A chave de torque abaixo do controle deslizante ativa/desativa o torque apenas desse servo.

### 6. Depurador FT (leitura/gravação de parâmetros e controle de posição)

Na página **🔬 Depurador FT**:

1. **Conexão serial**: selecione a porta e a taxa de baud (padrão 1M); após conectar, use **Escanear servos** para detectar os servos online.
2. **Ler parâmetros**: lê todos os registradores (EEPROM + SRAM).
3. **Tabela de parâmetros**: exibe todos os 56 registradores em 5 colunas; ao clicar em uma linha, o campo "Endereço de gravação" é preenchido automaticamente.
4. **Controle de posição**: defina a posição/velocidade de destino e execute; ao concluir o movimento, aparece o aviso para desligar o torque.
5. Alteração de taxa de baud, restauração de fábrica e backup/restauração de parâmetros xdat: ver as seções abaixo.

### 7. Alterar o ID do servo

1. Entre na página **🔬 Depurador FT**, conecte a porta serial e escaneie os servos.
2. Selecione o servo desejado, altere o valor de "ID do servo" (endereço 0x05) na tabela de parâmetros e clique em gravar.
3. O programa executa: desbloquear → gravar no endereço 5 → validar o novo ID → bloquear novamente.

> ⚠️ Antes de alterar o ID, certifique-se de que apenas este servo esteja no barramento, evitando conflitos de ID.

### 8. Alterar a taxa de baud / restaurar padrão de fábrica

- **Alterar a taxa de baud**: na área "Taxa de baud / restauração de fábrica" da página do depurador FT, selecione a nova taxa (38400 – 1000000 bps) e aplique. Após a gravação, a taxa da porta serial é alterada automaticamente e validada com ping; em caso de falha, há reversão automática.
- **Restaurar padrão de fábrica**: o servo volta ao padrão de fábrica (ID=1, taxa de baud=1000000); depois é necessário escanear novamente.

### 9. Backup e restauração de parâmetros xdat

Na área "Parâmetros xdat (salva apenas a EEPROM)" da página do depurador FT:

1. **💾 Salvar servo atual**: salva os parâmetros EEPROM do servo selecionado como arquivo xdat (backup).
2. Após modificar livremente os parâmetros do servo, se quiser restaurar:
3. **📂 Abrir xdat**: carrega o arquivo de backup.
4. **📤 Restaurar parâmetros no servo**: grava o backup de volta na EEPROM do servo atual.

### 10. Controle remoto síncrono de duas portas

> ⚠️ **Direção: a porta serial 1 controla a porta serial 2**. A porta serial 1 (mestre) apenas lê o ângulo dos servos; a porta serial 2 (escrava) é controlada de forma síncrona.

1. Clique em **🎮 Controle remoto** na barra superior (a porta serial 1 lê os ângulos → a porta serial 2 controla de forma síncrona os servos com o mesmo ID).
2. Os IDs dos servos das duas portas precisam ser iguais; apenas os servos na interseção serão sincronizados.
3. Clique novamente no mesmo botão para parar; em seguida, a thread de varredura dos painéis esquerdo e direito é retomada automaticamente.

### 11. Calibração LeRobot (linha de comando)

```bash
# 校准从动臂（保存到 ~/.cache/huggingface/lerobot/calibration/robots/so_follower/）
python -m src.tools.lerobot_calibrate --arm-type follower

# 校准领导臂
python -m src.tools.lerobot_calibrate --arm-type leader
```

Fluxo: desabilitar os servos → posicionar cada articulação no ponto médio e registrar o `homing_offset` → girar lentamente por todo o curso e registrar `range_min/max` (`wrist_roll` é uma articulação de rotação contínua, com faixa fixa `[0,4095]`) → salvar o JSON.

Executar até o ponto médio conforme o arquivo de calibração:

```bash
python -m src.tools.run_calibration_middle <校准文件.json> --mode zero
```

O processo de instalação do ambiente LeRobot e de coleta de dados está detalhado no [Tutorial de braço robótico LeRobot](./SO-ARM101-Tutorial.md).

## Ferramentas de linha de comando

Além da interface gráfica, a ferramenta oferece as seguintes entradas de linha de comando (sem GUI):

```bash
# 扫描舵机
python -m src.tools.scan_id

# 舵机快速中位校准
python -m src.tools.servo_quick_calibration

# 舵机中位测试
python -m src.tools.servo_center_test

# 失能全部舵机
python -m src.tools.servo_disable

# LeRobot 风格校准
python -m src.tools.lerobot_calibrate

# LeRobot 风格校准（指定串口）
python -m src.tools.lerobot_calibrate /dev/ttyACM0

# LeRobot 风格校准（指定串口，macOS）
python -m src.tools.lerobot_calibrate /dev/cu.usbserial-0001

# 双端口同步遥控
python -m src.tools.servo_remote_control
```

## Precauções

1. **Segurança em primeiro lugar**: a calibração de ponto médio persiste os dados na EEPROM. Antes de calibrar, confirme que a alimentação está estável e que o braço robótico não colidirá com pessoas ou objetos.
2. **Alimentação**: para o SoARM 101 versão padrão recomenda-se DC 5V 5A; para a versão Pro, DC 12V 5A. Alimentação insuficiente causa perda de passos ou falha de comunicação dos servos.
3. **Exclusividade da porta serial**: no Windows, a porta serial é exclusiva do programa; a mesma porta não pode ser ocupada ao mesmo tempo pela thread de varredura da GUI e pelo subprocesso de calibração. A ferramenta para automaticamente a thread de varredura e encerra processos antigos antes de operar; não clique repetidamente de forma manual.
4. **Permissões de porta serial no Linux**: para acessar `/dev/ttyUSB*` / `/dev/ttyACM*`, adicione o usuário ao grupo `dialout` (ver a seção "Linux" acima).
5. **Nomenclatura da porta serial no macOS**: use `/dev/cu.*` (não bloqueante) em vez de `/dev/tty.*` (bloqueante, pode travar); ver a seção "macOS" acima.
6. **Hot-plug**: ao desconectar o USB, o programa tenta reconectar automaticamente; ao reconectar, clique em `🔄` para atualizar a lista de portas.
7. **Proteção contra superaquecimento / sobretensão**: o programa monitora tensão e temperatura (alerta quando a temperatura > 60°C). Se os servos permanecerem em alta temperatura, pare e deixe esfriar.
8. **A calibração de ponto médio é irreversível**: após a gravação, o offset original é sobrescrito e não pode ser desfeito. Recomenda-se registrar a posição original antes de calibrar.
9. **Risco de alteração de ID**: se a gravação ou a validação falhar, o programa reporta o erro e retoma a varredura, mas em casos extremos o servo pode "perder a comunicação". Nesse caso, tente "Restaurar padrão de fábrica" (após o reset, o ID volta para 1).
10. **Problemas de codificação**: se aparecerem emojis corrompidos no console do Windows, defina `PYTHONIOENCODING=utf-8` antes de executar as ferramentas de linha de comando. No Linux / macOS, que usam UTF-8 nativamente, isso geralmente não ocorre.

## Solução de problemas

| Sintoma | Possível causa | Solução |
| ---- | -------- | -------- |
| Não é possível abrir a porta serial / porta ocupada | Outro programa a está usando | Feche programas como monitores de porta serial, ou troque a porta e reinicie a ferramenta |
| Erro PermissionError ao abrir a porta serial no Windows | Outro processo está usando essa porta COM | Certifique-se de que nenhum outro processo use essa porta COM |
| Nenhum servo encontrado na varredura | Alimentação insuficiente / fiação incorreta / taxa de baud divergente | Verifique a alimentação e a fiação; confirme que os servos estão a 1M baud |
| Servos se movem de forma descontrolada após a calibração de ponto médio | Postura não preparada antes da calibração | Repita "desabilitar → posicionar manualmente → calibração de ponto médio" |
| Aquecimento rápido demais | Carga excessiva ou travamento | Verifique obstruções no mecanismo e reduza a velocidade/aceleração |
| Servo não encontrado após alterar o ID | Conflito de ID ou falha na gravação | Restaure o padrão de fábrica e escaneie novamente |
| Controle remoto sem sincronia | IDs inconsistentes entre as duas portas | Confirme que há servos com o mesmo ID online nas portas mestre e escrava |
| Porta serial não encontrada no Windows | Driver ausente | Verifique o driver no Gerenciador de Dispositivos; troque a porta USB; instale o driver CH340 |
| Porta serial não encontrada no Linux | Dispositivo não reconhecido | `ls /dev/ttyUSB* /dev/ttyACM*`; confirme o dispositivo com `lsusb` |
| Permission denied: /dev/ttyUSB0 | Usuário não está no grupo dialout | Execute `sudo usermod -a -G dialout $USER` e faça login novamente; ou `sudo chmod 666 /dev/ttyUSB0` (temporário) |
| Nome do dispositivo muda no Linux | A ordem de conexão afeta a numeração ttyUSB | Fixe com regras udev (ver a seção "Linux" acima) ou selecione a cada inicialização |
| Porta serial com `tty.` trava no macOS | Nome de dispositivo bloqueante em uso | Use dispositivos com prefixo `cu.` |
| Dispositivo não encontrado no macOS | Dispositivo não reconhecido | `ls /dev/cu.*`; reconecte o cabo; verifique com `system_profiler SPUSBDataType` |
| Problemas de permissão no macOS | Controle de acesso do sistema | Geralmente não requer permissões extras; se aparecer o controle de acesso, permita o acesso ao terminal |
| Interface em chinês em branco | Falta de fontes chinesas | No Windows, Microsoft YaHei por padrão (instale uma fonte chinesa em caso de anomalia); no Linux, instale `fonts-noto-cjk`; no macOS, PingFang por padrão (instale Noto Sans CJK em caso de anomalia) |
| Emojis exibidos como quadrados | Falta de fonte de emoji | Instale `fonts-noto-color-emoji` |
| Falha na instalação do pip | Python do sistema protegido (externally managed environment) | Use um ambiente virtual; ou `pip install --break-system-packages -r requirements.txt` |
| O programa não inicia | Dependências ausentes ou versão incompatível | Confirme a versão com `python3 --version`; verifique as dependências com `pip list` |
| Falha ao ativar o ambiente virtual no macOS | Script de ativação incorreto | Use `source .venv/bin/activate` (não `.bat`) |
| Erro de compilação no macOS Apple Silicon | Python antigo via Rosetta em uso | Use Python 3.10+ (com suporte nativo a Apple Silicon) |

## Estrutura de diretórios

```
Juxi_ServoController/
├── docs/                    # 分系统教程
│   ├── Windows教程.md
│   ├── Linux教程.md
│   └── macOS教程.md
├── src/
│   ├── gui/                  # PySide6 图形界面
│   │   ├── factory_calibration_tool.py   # 主工具（双串口标定 + 遥控 + 语言切换）
│   │   ├── ft_debugger.py                # FT 调试器（参数读写 / xdat 备份）
│   │   ├── calibration_wizard.py         # LeRobot 校准向导
│   │   ├── theme_utils.py                # 浅色主题
│   │   └── language_dialog.py            # 语言选择对话框
│   ├── tools/                # 命令行工具
│   ├── xdat_utils.py         # xdat 参数文件读写
│   ├── i18n*.py / i18n_translations/     # 中英文国际化
│   ├── port_utils.py         # 串口检测
│   └── calibration_manager.py# LeRobot 校准文件管理
├── scservo_sdk/              # FTServo 舵机通信 SDK
├── requirements.txt
└── setup.py                  # 环境检查脚本
```

O repositório desta ferramenta é composto pelos módulos `src/gui` (interface gráfica PySide6), `src/tools` (ferramentas de linha de comando), `scservo_sdk` (SDK de comunicação com servos FTServo) e `setup.py` (script de verificação de ambiente).

<RelatedProducts slugs="so-arm101,servo-driver-board" />
