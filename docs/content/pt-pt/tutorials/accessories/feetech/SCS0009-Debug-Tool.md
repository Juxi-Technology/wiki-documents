---
title: Tutorial de utilização da ferramenta de depuração do servo SCS0009
description: "Ferramenta de depuração FTServo concebida especificamente para o servo Feetech SCS0009 (realimentação por potenciómetro, resolução de 10 bits 0–1023), com suporte para ligação por porta série, varredura de servos, leitura/escrita dos 44 registos, controlo de posição e backup/restauro de parâmetros xdat."
---

# Tutorial de utilização da ferramenta de depuração do servo SCS0009

> **[Comprar na loja](https://www.juxitech.com/products/feetech-scs0009-serial-bus-servo)**


**A ferramenta de depuração do servo SCS0009** é uma ferramenta de depuração FTServo concebida especificamente para o servo SCS0009 dos [servos de barramento Feetech](/pt-pt/products/feetech-servo) (realimentação por potenciómetro, resolução de 10 bits 0–1023). Através da interface gráfica pode efetuar a ligação à porta série, a varredura de servos, a leitura/escrita de parâmetros, o controlo de posição, a alteração da taxa de baud, o restauro de fábrica e o backup/restauro de parâmetros xdat.

Esta ferramenta é desenvolvida e mantida pela JUXI_Technology e publicada sob licença MIT. O Depurador FT, o backup/restauro de parâmetros xdat e o suporte multiplataforma são implementações próprias.

## Aviso de compatibilidade

> ⚠️ **Esta ferramenta suporta atualmente apenas o servo Feetech SCS0009 (série SCS, realimentação de posição por potenciómetro, resolução de 10 bits 0–1023)**. A tabela de registos, o formato dos parâmetros xdat e a tabela de taxas de baud foram concebidos especificamente para o Feetech SCS0009; não se garante a compatibilidade com servos de outras marcas/modelos.

## Funcionalidades

| Funcionalidade | Descrição |
| ---- | ---- |
| Deteção automática de portas | Identifica automaticamente portas USB e filtra dispositivos virtuais |
| Suporte multiplataforma | Compatível com Windows / Ubuntu / macOS |
| Alternância entre chinês e inglês | Muda entre chinês / inglês na interface com um clique; a escolha é memorizada automaticamente |
| Ligação à porta série | Seleção manual/automática da porta série, 8 níveis de taxa de baud (38400~1M) |
| Varredura de servos | Deteta automaticamente os servos online (ID 1–254) e apresenta-os em tempo real |
| Leitura de parâmetros | Lê todos os 44 registos (EEPROM + SRAM) |
| Tabela de parâmetros | Apresentação em 5 colunas (endereço/registo/valor/área de armazenamento/leitura-escrita); ao clicar, o campo correspondente é preenchido automaticamente |
| Controlo de posição | Controlo da posição alvo/velocidade; após o movimento, é sugerido desligar o torque |
| Alteração da taxa de baud | Altera a taxa de baud do servo; em caso de falha, há reversão automática |
| Restauro de fábrica | Restaura as predefinições de fábrica com um clique |
| Parâmetros xdat | Guardar os parâmetros EEPROM do servo atual / abrir um backup para restaurar |

## Introdução à interface

O programa principal tem um layout de painel único (Depurador FT); quando a altura da janela é insuficiente, aparece automaticamente uma barra de deslocamento e, ao maximizar, o layout adapta-se:

```
┌─────────────────────────────────────────────────────────────┐
│  SCS0009 舵机调试工具                     [EN / English]     │  ← 顶栏
├─────────────────────────────────────────────────────────────┤
│  🔌 串口连接   [端口▾][🔄][波特率▾][连接] [🔴未连接]         │
│  🎯 舵机      [🔍扫描][舵机▾][读取参数][读取状态]            │
│               ┌ 扫描到的舵机列表 ┐                           │
│  📋 参数表    地址|寄存器|值|存储区域|读写  (44 个寄存器)      │
│  🎯 位置控制  目标位置|速度|移动|力矩开|力矩关 | 状态         │
│  🔧 波特率/恢复出厂  新波特率|修改波特率|恢复出厂            │
│  📁 xdat 参数(仅保存EEPROM) 保存当前舵机|打开xdat|恢复参数    │
│  📜 日志                                                      │
└─────────────────────────────────────────────────────────────┘
```

- **Barra superior**: título da aplicação e botão de alternância de idioma.
- **🔌 Ligação da porta série**: seleção da porta, da taxa de baud e ligar/desligar.
- **🎯 Servo**: varredura, seleção do servo, leitura de parâmetros/estado.
- **📋 Tabela de parâmetros**: 44 registos apresentados em 5 colunas (endereço/registo/valor/área de armazenamento/leitura-escrita); ao clicar, o endereço de escrita é preenchido automaticamente.
- **🎯 Controlo de posição**: posição alvo/velocidade; após o movimento, a barra de estado sugere desligar o torque.
- **🔧 Taxa de baud/restauro de fábrica**: alterar a taxa de baud (reversão em caso de falha) e restaurar as predefinições de fábrica.
- **📁 Parâmetros xdat (apenas guarda a EEPROM)**: guardar os parâmetros do servo atual, abrir um backup e restaurar.

## Instalação e arranque

Requisitos de ambiente:

| Dependência | Versão | Descrição |
| ---- | ---- | ---- |
| Python | >= 3.8 | Recomenda-se 3.10+; transferir em [python.org](https://www.python.org/downloads/) |
| PySide6 | >= 6.0 | Framework de GUI |
| pyserial | >= 3.5 | Comunicação por porta série |
| Sistema | Windows 10 / 11, Ubuntu 20.04+ / Debian 11+, macOS 11+ | macOS 11+ suporta Apple Silicon / Intel |

Ligação de hardware: ligue a placa de controlo dos servos com um adaptador USB-série (como o CH340 / CP2102) e alimente os servos (recomenda-se DC 5V 5A para a versão standard e DC 12V 5A para a versão Pro).

### Windows

1. Instale o [Python 3.10+](https://www.python.org/downloads/) (durante a instalação, marque obrigatoriamente **Add Python to PATH**, caso contrário a linha de comandos não encontra o `python`). Verifique a instalação:

```bash
python --version
```

2. Crie um ambiente virtual e instale as dependências:

```bash
cd SCS0009_ServoController
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

> ⚠️ **O ambiente virtual só precisa de ser criado uma vez**. Executar novamente `python -m venv .venv` repõe/substitui o ambiente original (apaga as dependências já instaladas); a partir daí basta ativar com `activate` de cada vez.

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

> **Anote o número COM** e selecione-o depois do arranque; também pode indicar a porta manualmente (quando a porta série estiver ocupada):

```bash
python -m src.gui.factory_calibration_tool --port COM3
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
# 注销并重新登录后生效
```

Verificação (a saída deve conter `dialout`):

```bash
groups
```

> Se não resultar: reinicie o computador; nalgumas distribuições o nome do grupo é `uucp` (Arch) ou `tty`.

3. Crie o ambiente virtual, instale as dependências e inicie o programa:

```bash
cd SCS0009_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

> ⚠️ **O ambiente virtual só precisa de ser criado uma vez**. Executar novamente `python3 -m venv .venv` substitui o ambiente original (apaga as dependências já instaladas); a partir daí basta `source .venv/bin/activate` de cada vez.

> Se o pip apresentar o erro externally managed environment, use `pip install --break-system-packages -r requirements.txt` ou um ambiente virtual.

4. Identifique o dispositivo USB-série (depois de ligar o adaptador):

```bash
ls /dev/ttyUSB* /dev/ttyACM* 2>/dev/null
```

Saída típica:

```
/dev/ttyUSB0   # CH340 / CP2102 / PL2303
/dev/ttyACM0   # 原生 USB 串口（Arduino / ESP32 板载）
```

Consulte informações detalhadas do fabricante:

```bash
dmesg | tail -20 | grep -i tty
# 或
lsusb
```

> Com vários dispositivos, `ttyUSB0` / `ttyUSB1` são atribuídos pela ordem de ligação/desligação, o que pode ser instável. Recomenda-se usar `/dev/ttyACM*` ou fixar pelo fabricante (ver a secção udev mais abaixo).

Indicar a porta manualmente:

```bash
python -m src.gui.factory_calibration_tool --port /dev/ttyUSB0
```

5. Opcional: fixe o nome do dispositivo com udev (para evitar que a numeração mude após ligar/desligar). Crie `/etc/udev/rules.d/99-servo.rules` e fixe pelo ID USB:

```
SUBSYSTEM=="tty", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", SYMLINK+="ttyServo"
```

Depois, `ls -l /dev/ttyServo` permite aceder com o nome fixo; consulte o ID do fabricante com `lsusb`.

### macOS

1. Instale o Python com o Homebrew (para evitar a versão demasiado antiga do Python do sistema):

```bash
# 安装 Homebrew（如果没有）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Python
brew install python
```

Verificação:

```bash
python3 --version
```

2. Crie o ambiente virtual, instale as dependências e inicie o programa (ative com `source`, não com `.bat`):

```bash
cd SCS0009_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

> ⚠️ **O ambiente virtual só precisa de ser criado uma vez**. Executar novamente `python3 -m venv .venv` substitui o ambiente original (apaga as dependências já instaladas); a partir daí basta `source .venv/bin/activate` de cada vez.

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
/dev/cu.usbmodem141101      # 板载 USB 串口（Arduino / ESP32）
/dev/cu.wchusbserial1420    # CH340
```

> O programa dá automaticamente prioridade aos dispositivos `cu.*`; ao indicar a porta manualmente, use `cu.` em vez de `tty.`.

Indicar a porta manualmente:

```bash
python -m src.gui.factory_calibration_tool --port /dev/cu.usbserial-0001
```

4. Controladores USB: o macOS inclui controladores para a maioria dos chips comuns (CH340, CP2102, FTDI), prontos a usar. Se o dispositivo não for reconhecido:

```bash
system_profiler SPUSBDataType | grep -A5 -i "serial\|CH340\|CP210"
```

- **CH340**: os lotes mais antigos exigem a instalação do controlador oficial da WCH;
- Em geral, basta que `ls /dev/cu.*` mostre o dispositivo.

5. Sugestões de utilização:
   - **O nome da porta série muda**: depois de ligar/desligar em portas USB diferentes, o nome `cu.*` pode mudar; basta selecioná-lo na área «🔌 Ligação da porta série» em cada arranque.
   - **Poupança de energia**: o macOS pode entrar em suspensão e desligar a porta série; mantenha o computador acordado durante a operação ou aumente o tempo de suspensão.
   - **Permissões de privacidade**: na primeira execução, se aparecer o pedido «Acesso a discos removíveis», clique em Permitir.

## Passos de utilização

### 1. Ligar e identificar o servo

1. Ligue a placa de controlo dos servos através de um adaptador USB-série e alimente os servos.
2. Abra a GUI e, na área «🔌 Ligação da porta série», selecione a porta (ou clique em `🔄` para atualizar) e defina a taxa de baud (predefinição 1M).
3. Clique em **Ligar**; o estado mostra `🟢 已连接`.

> Se aparecer um aviso de porta série ocupada, confirme que nenhum outro programa (monitor de porta série, uma instância anterior da ferramenta ainda aberta) está a usar essa porta.

### 2. Varredura de servos

1. Clique em **🔍 Varrer servos** para detetar os servos online com ID entre 1 e 254.
2. Os resultados da varredura são apresentados em tempo real na lista de servos (com o modelo).
3. Clique numa linha da lista de servos para preencher automaticamente a lista pendente «Servo».

### 3. Leitura de parâmetros

1. Depois de selecionar o servo, clique em **📖 Ler parâmetros** para ler os 44 registos, um a um.
2. A tabela de parâmetros apresenta 5 colunas (endereço/registo/valor/área de armazenamento/leitura-escrita); EPROM / SRAM / DEFAULT são distinguidos por cores.
3. A área de log mostra o resultado da leitura de cada registo e a causa das falhas.

O significado de cada registo pode ser consultado em [Análise da tabela de memória do servo SCSCL de potenciómetro](./Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis.md).

### 4. Alterar parâmetros / escrita

1. Na tabela de parâmetros, clique na linha do registo a alterar → «Endereço de escrita», «Comprimento» e «Valor» são preenchidos automaticamente.
2. Introduza o novo valor no campo «Valor» e clique em **✏️ Escrever**.
3. O programa executa: desbloquear a EEPROM → escrever → voltar a bloquear.
4. Janela de resultado da escrita: em caso de sucesso aparece um aviso verde «✅ 已成功写入»; em caso de falha, um aviso vermelho «❌ 写入失败» (com a causa).

### 5. Alterar o ID do servo

1. Na tabela de parâmetros, localize a linha «ID do servo» (endereço 0x05) e clique para a selecionar.
2. Altere «Valor» para o novo ID e clique em **✏️ Escrever**.
3. O programa executa: desbloquear → escrever no endereço 5 → voltar a bloquear.

> ⚠️ Antes de alterar o ID, certifique-se de que só este servo está ligado ao barramento, para evitar conflitos de ID.

### 6. Controlo de posição

1. Na área «🎯 Controlo de posição», **arraste o cursor deslizante** para ajustar a posição alvo (0–1023, resolução de 10 bits do potenciómetro); o campo numérico é atualizado em simultâneo; também pode introduzir diretamente o valor no campo numérico, com o cursor deslizante a acompanhar.
2. Clique em **▶ Mover**; o servo começa a mover-se e a barra de estado mostra «移动中...».
3. Após o movimento, aparece «✅ 已移动完成，请关闭力矩»; clique em **⏹ Desligar torque**.

### 7. Alterar a taxa de baud / restaurar predefinições de fábrica

- **Alterar a taxa de baud**: na área «🔧 Taxa de baud/restauro de fábrica», selecione a nova taxa de baud (38400 – 1000000 bps) e clique em **🔧 Alterar taxa de baud**. Após a escrita, a taxa de baud da porta série é comutada automaticamente e validada por ping; em caso de falha, há reversão automática.
- **Restaurar predefinições de fábrica**: clique em **🔄 Restaurar fábrica**; o servo volta às predefinições de fábrica (ID=1, taxa de baud=1000000); depois é preciso fazer nova varredura.

### 8. Backup e restauro de parâmetros xdat

Na área «📁 Parâmetros xdat (apenas guarda a EEPROM)»:

1. **💾 Guardar servo atual**: guarda os parâmetros EEPROM do servo selecionado num ficheiro xdat (backup).
2. Depois de alterar livremente os parâmetros do servo, se quiser restaurar:
3. **📂 Abrir xdat**: carrega o ficheiro de backup.
4. **📤 Restaurar parâmetros no servo**: escreve o backup de volta na EEPROM do servo atual.

## Precauções

1. **Segurança em primeiro lugar**: a escrita de parâmetros persiste-os na EEPROM. Antes de escrever, confirme que a alimentação é estável e que o braço robótico não colide com pessoas ou objetos.
2. **Alimentação**: recomenda-se DC 5V 5A para a versão standard do SoARM 101 e DC 12V 5A para a versão Pro. Alimentação insuficiente provoca perda de passos ou falhas de comunicação nos servos.
3. **Exclusividade da porta série**: no Windows, a porta série é ocupada exclusivamente pelo programa; a mesma porta não pode ser ocupada ao mesmo tempo por dois programas. Não use esta ferramenta enquanto outro programa (monitor de porta série) tiver a mesma porta aberta.
4. **Permissões da porta série no Linux**: o acesso a `/dev/ttyUSB*` / `/dev/ttyACM*` exige adicionar o utilizador ao grupo `dialout` (ver a secção «Linux» acima).
5. **Nomes das portas série no macOS**: use `/dev/cu.*` (não bloqueante) em vez de `/dev/tty.*` (bloqueante, pode ficar preso); ver a secção «macOS» acima.
6. **Hot-plug**: depois de desligar o USB, o programa tenta reconectar automaticamente; após voltar a ligar, clique em `🔄` para atualizar a lista de portas.
7. **Proteção contra sobreaquecimento / sobretensão**: o programa monitoriza a tensão e a temperatura (alerta quando a temperatura > 60°C). Se os servos aquecerem de forma contínua, pare e deixe arrefecer.
8. **A escrita de parâmetros é irreversível**: depois da escrita na EEPROM, o valor original é substituído e não pode ser anulado. Recomenda-se fazer primeiro um backup com «xdat – Guardar servo atual» antes de alterar.
9. **Risco ao alterar o ID**: se a escrita ou a validação falharem, o programa apresenta um erro, mas em casos extremos o servo pode «perder a ligação». Nesse caso, experimente «restaurar as predefinições de fábrica» (após o reset, o ID volta a 1).
10. **Problemas de codificação**: se aparecerem emojis corrompidos na consola do Windows, defina `PYTHONIOENCODING=utf-8` antes de executar as ferramentas de linha de comandos. No Linux / macOS, com UTF-8 nativo, normalmente não há este problema.

## Resolução de problemas

| Sintoma | Causa possível | Solução |
| ---- | -------- | -------- |
| Não é possível abrir a porta série / porta ocupada | Outro programa a usar a porta | Feche programas como monitores de porta série, ou mude de porta e reinicie a ferramenta |
| Windows: erro PermissionError ao abrir a porta série | Outro processo a ocupar essa porta COM | Certifique-se de que nenhum outro processo ocupa essa porta COM |
| Varredura não encontra servos | Alimentação insuficiente / cablagem incorreta / taxa de baud incorreta | Verifique a alimentação e a cablagem; confirme que os servos estão a 1M de taxa de baud |
| Falha ao ler parâmetros | Porta série ocupada / servo sem resposta | Feche outros programas; volte a ligar; verifique se o endereço está correto |
| Falha na escrita | Alimentação insuficiente do servo ou registo de destino não gravável | Verifique a alimentação e a ligação do servo; confirme que o registo de destino é gravável |
| Aquecimento demasiado rápido | Carga excessiva ou bloqueio do motor | Verifique se o mecanismo está preso; reduza a velocidade/aceleração |
| Servo não encontrado após alterar o ID | Conflito de ID ou falha na escrita | Restaure as predefinições de fábrica e faça nova varredura |
| Windows: porta série não encontrada | Controlador em falta | Verifique o controlador no Gestor de Dispositivos; mude de porta USB; instale o controlador CH340 |
| Linux: porta série não encontrada | Dispositivo não reconhecido | `ls /dev/ttyUSB* /dev/ttyACM*`; confirme o dispositivo com `lsusb` |
| Permission denied: /dev/ttyUSB0 | Utilizador não pertence ao grupo dialout | Execute `sudo usermod -a -G dialout $USER` e volte a iniciar sessão; ou `sudo chmod 666 /dev/ttyUSB0` (temporário) |
| Linux: o nome do dispositivo muda | A ordem de ligar/desligar afeta a numeração ttyUSB | Fixe o nome com regras udev (ver a secção «Linux» acima) ou selecione a porta em cada arranque |
| macOS: porta com `tty.` fica presa | Foi usado um nome de dispositivo bloqueante | Use o dispositivo com o prefixo `cu.` |
| macOS: dispositivo não encontrado | Dispositivo não reconhecido | `ls /dev/cu.*`; volte a ligar; verifique com `system_profiler SPUSBDataType` |
| macOS: problemas de permissões | Controlo de acesso do sistema | Em geral não são necessárias permissões extra; se aparecer o controlo de acesso, permita o acesso ao terminal |
| Interface em chinês em branco | Falta de fontes chinesas | No Linux, instale `fonts-noto-cjk`; no macOS, em caso de anomalia, instale Noto Sans CJK |
| Emojis aparecem como quadrados | Falta de fonte de emoji | Instale `fonts-noto-color-emoji` |
| Falha na instalação com pip | Python do sistema protegido (externally managed environment) | Use um ambiente virtual; ou `pip install --break-system-packages -r requirements.txt` |
| O programa não inicia | Dependências em falta ou versões incompatíveis | Confirme a versão com `python3 --version`; verifique as dependências com `pip list` |
| macOS: falha ao ativar o ambiente virtual | Script de ativação errado | Use `source .venv/bin/activate` (não `.bat`) |
| macOS Apple Silicon: erro de compilação | Python antigo a correr via Rosetta | Use Python 3.10+ (com suporte nativo Apple Silicon) |

## Estrutura de diretórios

```
SCS0009_ServoController/
├── docs/                    # 分系统教程（中英文）
│   ├── zh/                  # 中文教程
│   │   ├── Windows教程.md
│   │   ├── Linux教程.md
│   │   └── macOS教程.md
│   └── en/                  # 英文教程
│       ├── Windows.md
│       ├── Linux.md
│       └── macOS.md
├── src/
│   ├── gui/                  # PySide6 图形界面
│   │   ├── factory_calibration_tool.py   # 主窗口（FT 调试器 + 语言切换）
│   │   ├── ft_debugger.py                # FT 调试器面板（参数读写 / xdat 备份）
│   │   ├── theme_utils.py                # 浅色主题
│   │   └── language_dialog.py            # 语言选择对话框
│   ├── xdat_utils.py         # xdat 参数文件读写
│   ├── i18n*.py / i18n_translations/     # 中英文国际化
│   └── port_utils.py         # 串口检测
├── scservo_sdk/              # FTServo 舵机通信 SDK
├── requirements.txt
└── setup.py                  # 环境检查脚本
```

O repositório desta ferramenta é composto pelos módulos `src/gui` (interface gráfica PySide6 e Depurador FT), `scservo_sdk` (SDK de comunicação com servos FTServo) e `setup.py` (script de verificação do ambiente), entre outros.

<RelatedProducts slugs="feetech-servo" />
