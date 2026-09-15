---
title: Tutorial de uso da ferramenta de depuração do servo SCS0009
description: "Ferramenta de depuração FTServo projetada para o servo Feetech SCS0009 (feedback por potenciômetro, resolução de 10 bits 0–1023), com conexão serial, varredura de servos, leitura/gravação de parâmetros de 44 registradores, controle de posição e backup/restauração de parâmetros xdat."
---

# Tutorial de uso da ferramenta de depuração do servo SCS0009

> **[Comprar na loja](https://www.juxitech.com/pt/products/feetech-scs0009-serial-bus-servo)**


**A ferramenta de depuração do servo SCS0009** é uma ferramenta de depuração FTServo projetada especificamente para o servo SCS0009 da linha de [servos de barramento Feetech](/pt-br/products/feetech-servo) (feedback por potenciômetro, resolução de 10 bits 0–1023). Pela interface gráfica, é possível realizar conexão serial, varredura de servos, leitura/gravação de parâmetros, controle de posição, alteração de taxa de baud, restauração de fábrica e backup/restauração de parâmetros xdat.

Esta ferramenta é desenvolvida e mantida pela JUXI_Technology e publicada sob licença MIT. Recursos como o depurador FT, o backup/restauração de parâmetros xdat e o suporte multiplataforma são de implementação própria.

## Aviso de compatibilidade

> ⚠️ **Esta ferramenta atualmente suporta apenas o servo Feetech SCS0009 (série SCS, feedback de posição por potenciômetro, resolução de 10 bits 0–1023)**. A tabela de registradores, o formato de parâmetros xdat e a tabela de taxas de baud foram projetados para o Feetech SCS0009; servos de outras marcas/modelos não têm compatibilidade garantida.

## Recursos

| Recurso | Descrição |
| ---- | ---- |
| Detecção automática de portas | Identifica de forma inteligente portas seriais USB, filtrando automaticamente dispositivos virtuais |
| Suporte multiplataforma | Compatível com Windows / Ubuntu / macOS |
| Alternância chinês/inglês | Troca entre chinês/inglês com um clique na interface, com memorização automática da escolha |
| Conexão serial | Seleção manual/automática da porta serial, 8 taxas de baud (38400~1M) |
| Varredura de servos | Detecta automaticamente os servos online (ID 1–254), com exibição em tempo real |
| Leitura de parâmetros | Lê todos os 44 registradores (EEPROM + SRAM) |
| Tabela de parâmetros | Exibição em 5 colunas (endereço/registrador/valor/área de armazenamento/leitura-gravação), com vinculação ao clicar |
| Controle de posição | Controle de posição/velocidade de destino, com aviso para desligar o torque ao concluir o movimento |
| Alteração de taxa de baud | Altera a taxa de baud do servo, com reversão automática em caso de falha |
| Restauração de fábrica | Restaura as configurações padrão de fábrica com um clique |
| Parâmetros xdat | Salva os parâmetros EEPROM do servo atual / abre backup para restauração |

## Visão geral da interface

O programa principal tem um layout de painel único (depurador FT); quando a altura da janela é insuficiente, aparece automaticamente uma barra de rolagem, e ao maximizar a janela se adapta elasticamente:

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

- **Barra superior**: título do aplicativo e botão de troca de idioma.
- **🔌 Conexão serial**: seleção de porta e taxa de baud, conectar/desconectar.
- **🎯 Servo**: varredura, seleção de servo, leitura de parâmetros/status.
- **📋 Tabela de parâmetros**: exibe os 44 registradores em 5 colunas (endereço/registrador/valor/área de armazenamento/leitura-gravação); ao clicar, o endereço de gravação é preenchido automaticamente.
- **🎯 Controle de posição**: posição/velocidade de destino; ao concluir o movimento, a barra de status avisa para desligar o torque.
- **🔧 Taxa de baud / restauração de fábrica**: altera a taxa de baud (reversão em caso de falha) e restaura o padrão de fábrica.
- **📁 Parâmetros xdat (salva apenas a EEPROM)**: salva os parâmetros do servo atual, abre o backup e restaura.

## Instalação e inicialização

Requisitos de ambiente:

| Dependência | Versão | Descrição |
| ---- | ---- | ---- |
| Python | >= 3.8 | Recomendado 3.10+; baixe em [python.org](https://www.python.org/downloads/) |
| PySide6 | >= 6.0 | Framework de GUI |
| pyserial | >= 3.5 | Comunicação serial |
| Sistema | Windows 10 / 11, Ubuntu 20.04+ / Debian 11+, macOS 11+ | macOS 11+ com suporte a Apple Silicon / Intel |

Conexão de hardware: use um adaptador USB-serial (como CH340 / CP2102) para conectar a placa de controle dos servos e alimente os servos (versão padrão recomendada DC 5V 5A; versão Pro recomendada DC 12V 5A).

### Windows

1. Instale o [Python 3.10+](https://www.python.org/downloads/) (durante a instalação, marque obrigatoriamente **Add Python to PATH**, caso contrário o `python` não será encontrado na linha de comando). Verifique a instalação:

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

> ⚠️ **O ambiente virtual só precisa ser criado uma vez**. Executar `python -m venv .venv` novamente redefine/substitui o ambiente original (apagando as dependências instaladas); depois disso, basta apenas ativar com `activate` a cada uso.

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

> **Anote o número da COM** e selecione-a após iniciar; também é possível especificar a porta manualmente (quando a porta serial estiver ocupada):

```bash
python -m src.gui.factory_calibration_tool --port COM3
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
cd SCS0009_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

> ⚠️ **O ambiente virtual só precisa ser criado uma vez**. Executar `python3 -m venv .venv` novamente substitui o ambiente original (apagando as dependências instaladas); depois disso, basta apenas `source .venv/bin/activate` a cada uso.

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
python -m src.gui.factory_calibration_tool --port /dev/ttyUSB0
```

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

Verificação:

```bash
python3 --version
```

2. Crie o ambiente virtual, instale as dependências e inicie (ative com `source`, não com `.bat`):

```bash
cd SCS0009_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

> ⚠️ **O ambiente virtual só precisa ser criado uma vez**. Executar `python3 -m venv .venv` novamente substitui o ambiente original (apagando as dependências instaladas); depois disso, basta apenas `source .venv/bin/activate` a cada uso.

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
python -m src.gui.factory_calibration_tool --port /dev/cu.usbserial-0001
```

4. Driver USB: a maioria dos chips comuns (CH340, CP2102, FTDI) tem driver nativo no macOS, plug and play. Se o dispositivo não for reconhecido:

```bash
system_profiler SPUSBDataType | grep -A5 -i "serial\|CH340\|CP210"
```

- **CH340**: lotes mais antigos exigem a instalação do driver oficial da WCH;
- Em geral, basta que `ls /dev/cu.*` mostre o dispositivo.

5. Dicas de uso:
   - **O nome da porta serial pode mudar**: o nome `cu.*` pode mudar após conectar/desconectar em portas USB diferentes; basta selecioná-la na área "🔌 Conexão serial" a cada inicialização.
   - **Economia de energia**: o macOS pode suspender e desconectar a porta serial; mantenha o computador desperto ou aumente o tempo de suspensão durante a operação.
   - **Permissão de privacidade**: na primeira execução, se aparecer o aviso "acessar disco removível", clique em permitir.

## Passos de uso

### 1. Conectar e identificar o servo

1. Conecte a placa de controle dos servos através de um adaptador USB-serial e alimente os servos.
2. Abra a GUI, selecione a porta na área "🔌 Conexão serial" (ou clique em `🔄` para atualizar) e defina a taxa de baud (padrão 1M).
3. Clique em **Conectar**; o status exibe `🟢 Conectado`.

> Se aparecer o aviso de porta serial ocupada, confirme que nenhum outro programa (monitor de porta serial, instância anterior da ferramenta não encerrada) está usando essa porta.

> Se houver apenas uma porta serial, a ferramenta define a segunda porta automaticamente como "desativada".

### 2. Escanear servos

1. Clique em **🔍 Escanear servos** para detectar os servos online no intervalo de ID 1–254.
2. Os resultados da varredura são exibidos em tempo real na lista de servos (com modelo).
3. Clique em uma linha da lista de servos; ela preenche automaticamente a caixa de seleção "Servo".

### 3. Ler parâmetros

1. Com um servo selecionado, clique em **📖 Ler parâmetros** para ler um a um todos os 44 registradores.
2. A tabela de parâmetros exibe 5 colunas (endereço/registrador/valor/área de armazenamento/leitura-gravação), com cores distintas para EPROM / SRAM / DEFAULT.
3. A área de log exibe o resultado da leitura de cada registrador e o motivo de falha.

Para o significado de cada registrador, consulte [Análise da tabela de memória do servo SCSCL com potenciômetro](./Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis.md).

### 4. Modificar parâmetros / gravar

1. Na tabela de parâmetros, clique na linha do registrador a modificar → os campos "Endereço de gravação", "Comprimento" e "Valor" são preenchidos automaticamente.
2. Altere o novo valor na caixa "Valor" e clique em **✏️ Gravar**.
3. O programa executa: desbloquear a EEPROM → gravar → bloquear novamente.
4. Resultado da gravação em pop-up: sucesso exibe a mensagem verde "✅ Gravação concluída com sucesso"; falha exibe a mensagem vermelha "❌ Falha na gravação" (com o motivo).

### 5. Alterar o ID do servo

1. Na tabela de parâmetros, localize a linha "ID do servo" (endereço 0x05) e clique para selecionar.
2. Altere "Valor" para o novo ID e clique em **✏️ Gravar**.
3. O programa executa: desbloquear → gravar no endereço 5 → bloquear novamente.

> ⚠️ Antes de alterar o ID, certifique-se de que apenas este servo esteja no barramento, evitando conflitos de ID.

### 6. Controle de posição

1. Na área "🎯 Controle de posição", **arraste o controle deslizante** para ajustar a posição de destino (0–1023, resolução de 10 bits do potenciômetro); a caixa numérica é atualizada em sincronia; também é possível digitar diretamente na caixa numérica, com o controle deslizante acompanhando.
2. Clique em **▶ Mover**; o servo começa a se mover e a barra de status exibe "Em movimento...".
3. Ao concluir o movimento, é exibido "✅ Movimento concluído, desligue o torque"; clique em **⏹ Desligar torque**.

### 7. Alterar a taxa de baud / restaurar padrão de fábrica

- **Alterar a taxa de baud**: na área "🔧 Taxa de baud / restauração de fábrica", selecione a nova taxa (38400 – 1000000 bps) e clique em **🔧 Alterar taxa de baud**. Após a gravação, a taxa da porta serial é alterada automaticamente e validada com ping; em caso de falha, há reversão automática.
- **Restaurar padrão de fábrica**: clique em **🔄 Restaurar fábrica**; o servo volta ao padrão de fábrica (ID=1, taxa de baud=1000000); depois é necessário escanear novamente.

### 8. Backup e restauração de parâmetros xdat

Na área "📁 Parâmetros xdat (salva apenas a EEPROM)":

1. **💾 Salvar servo atual**: salva os parâmetros EEPROM do servo selecionado como arquivo xdat (backup).
2. Após modificar livremente os parâmetros do servo, se quiser restaurar:
3. **📂 Abrir xdat**: carrega o arquivo de backup.
4. **📤 Restaurar parâmetros no servo**: grava o backup de volta na EEPROM do servo atual.

## Precauções

1. **Segurança em primeiro lugar**: a gravação de parâmetros é persistida na EEPROM. Antes de gravar, confirme que a alimentação está estável e que o braço robótico não colidirá com pessoas ou objetos.
2. **Alimentação**: para o SoARM 101 versão padrão recomenda-se DC 5V 5A; para a versão Pro, DC 12V 5A. Alimentação insuficiente causa perda de passos ou falha de comunicação dos servos.
3. **Exclusividade da porta serial**: no Windows, a porta serial é exclusiva do programa; a mesma porta não pode ser usada por dois programas ao mesmo tempo. Não use esta ferramenta enquanto outro programa (monitor de porta serial) estiver com a mesma porta aberta.
4. **Permissões de porta serial no Linux**: para acessar `/dev/ttyUSB*` / `/dev/ttyACM*`, adicione o usuário ao grupo `dialout` (ver a seção "Linux" acima).
5. **Nomenclatura de porta serial no macOS**: use `/dev/cu.*` (não bloqueante) em vez de `/dev/tty.*` (bloqueante, pode travar); ver a seção "macOS" acima.
6. **Hot-plug**: ao desconectar o USB, o programa tenta reconectar automaticamente; ao reconectar, clique em `🔄` para atualizar a lista de portas.
7. **Proteção contra superaquecimento / sobretensão**: o programa monitora tensão e temperatura (alerta quando a temperatura > 60°C). Se os servos permanecerem em alta temperatura, pare e deixe esfriar.
8. **A gravação de parâmetros é irreversível**: após a gravação na EEPROM, o valor original é sobrescrito e não pode ser desfeito. Recomenda-se primeiro fazer backup com "Salvar servo atual (xdat)" antes de modificar.
9. **Risco de alteração de ID**: se a gravação ou a validação falhar, o programa reporta erro, mas em casos extremos o servo pode "perder a comunicação". Nesse caso, tente "Restaurar padrão de fábrica" (após o reset, o ID volta para 1).
10. **Problemas de codificação**: se aparecerem emojis corrompidos no console do Windows, defina `PYTHONIOENCODING=utf-8` antes de executar as ferramentas de linha de comando. No Linux / macOS, que usam UTF-8 nativamente, isso geralmente não ocorre.

## Solução de problemas

| Sintoma | Possível causa | Solução |
| ---- | -------- | -------- |
| Não é possível abrir a porta serial / porta ocupada | Outro programa a está usando | Feche programas como monitores de porta serial, ou troque a porta e reinicie a ferramenta |
| Erro PermissionError ao abrir a porta serial no Windows | Outro processo está usando essa porta COM | Certifique-se de que nenhum outro processo use essa porta COM |
| Nenhum servo encontrado na varredura | Alimentação insuficiente / fiação incorreta / taxa de baud divergente | Verifique a alimentação e a fiação; confirme que o servo está a 1M baud |
| Falha ao ler parâmetros | Porta serial ocupada / servo não responde | Feche outros programas; reconecte; verifique se o endereço está correto |
| Falha na gravação | Alimentação insuficiente do servo ou registrador de destino não gravável | Verifique a alimentação e a conexão do servo; confirme que o registrador de destino é gravável |
| Aquecimento rápido demais | Carga excessiva ou travamento | Verifique obstruções no mecanismo e reduza a velocidade/aceleração |
| Servo não encontrado após alterar o ID | Conflito de ID ou falha na gravação | Restaure o padrão de fábrica e escaneie novamente |
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

O repositório desta ferramenta é composto pelos módulos `src/gui` (interface gráfica PySide6 e depurador FT), `scservo_sdk` (SDK de comunicação com servos FTServo) e `setup.py` (script de verificação de ambiente).

<RelatedProducts slugs="feetech-servo" />
