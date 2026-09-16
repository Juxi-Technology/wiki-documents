---
title: "Mac implementação e execução com um clique"
description: "Este tutorial baseia-se no Demo oficial do AmazingHand (mão hábil da Pollen Robotics) e já inclui um script d…"
---

# Mac implementação e execução com um clique

[AmazingHand-main.zip]

Este tutorial baseia-se no Demo oficial do AmazingHand (mão hábil da Pollen Robotics) e já inclui um script de implementação com um clique. Execute pela ordem numérica. **Todos os scripts estão na pasta Demo/Mac一键部署脚本/ e são executados no terminal com ./nome-do-script.**

---

## Preparação de hardware

|Hardware|Requisitos|
|---|---|
|Corpo da mão hábil|Mão direita / mão esquerda / ambas as mãos|
|Placa de acionamento dos servos|Externa, ligada ao computador por USB|
|Fonte de alimentação|**No mínimo 5V 4A** (a alimentação por USB é insuficiente, é obrigatório usar uma fonte externa)|
|Câmara|Câmara integrada do Mac ou câmara USB|

> O ficheiro do modelo pode ser consultado ou descarregado em [Onshape](https://cad.onshape.com/documents/430ff184cf3dd9557aaff2be/w/e3658b7152c139971d22c688/e/d79fbb3641873de0a515037e) (inclui URDF).
> 
> 

---

## Obter permissão de execução dos scripts (importante)

**Depois de copiar os scripts do Windows / de um ficheiro comprimido para o Mac, a permissão de execução (****`+x`****) é perdida, e a execução direta apresenta
****`Permission denied`****. Antes da primeira utilização é obrigatório executar:**

```Plain Text
cd "AmazingHand-main/Demo/Mac一键部署脚本"
chmod +x *.sh
```

Depois disso, cada script pode ser executado com `./nome-do-script`.

> Dica: ao copiar `AmazingHand-main` para o Mac, usar **tar** preserva melhor as permissões:
> `tar czf AmazingHand-main.tar.gz AmazingHand-main`, ou, depois de descompactar, executar uma única vez `chmod +x *.sh`.
> 
> 

---

## Instalação do ambiente (script 1)

No terminal, entre no diretório dos scripts e execute (confirme que o `chmod +x` do passo 2 acima já foi feito):

```Plain Text
cd "AmazingHand-main/Demo/Mac一键部署脚本"
./1-安装环境.sh
```

Executa automaticamente:

1. **Verificar as ferramentas de linha de comando do Xcode** (necessárias para compilar Rust). Se faltarem, é indicado `xcode-select --install`

2. **Instalar o Rust** (rustup + toolchain stable)

3. **Configurar o espelho Tsinghua do cargo** (`~/.cargo/config.toml`), para acelerar o download de crates

4. **Instalar o uv** (gestor de pacotes Python)

5. **Instalar o dora-cli 0.5.0** (`cargo install`, a primeira compilação demora cerca de 10~20 minutos, aguarde com paciência). Limpa automaticamente versões antigas do dora

6. **Instalar o pacote pip dora-rs** (opcional)

> **Importante**: depois de o script terminar, **feche e reabra o terminal** para que as variáveis de ambiente entrem em vigor. Se a versão aparecer vazia, adicione o seguinte caminho ao `~/.zshrc`:
> 
> 

```Plain Text
export PATH="$HOME/.cargo/bin:$HOME/.local/bin:$PATH"
```

### Instalação manual alternativa (quando os scripts não estão disponíveis)

- **Ferramentas de linha de comando do Xcode**: `xcode-select --install`

- **Rust**: `curl --proto '=https' --tlsv1.2 -sSf `[`https://sh.rustup.rs`](https://sh.rustup.rs)` | sh`

- **uv**: `curl -LsSf `[`https://astral.sh/uv/install.sh`](https://astral.sh/uv/install.sh)` | sh`

- **dora-cli**: `cargo install dora-cli --version 0.5.0`

### Espelho Tsinghua do cargo (~/.cargo/config.toml)

```Plain Text
[source.crates-io]
replace-with = "tuna"

[source.tuna]
registry = "sparse+https://mirrors.tuna.tsinghua.edu.cn/crates.io-index/"

[registries.tuna]
index = "sparse+https://mirrors.tuna.tsinghua.edu.cn/crates.io-index/"

[http]
check-revoke = false
```

> Use o **índice esparso (sparse)** (como acima), não use espelhos de repositório git — o método git exige descarregar cerca de 1 GB de índice na primeira vez e costuma bloquear em `Updating 'tuna' index`.
> 
> 

---

## Modo de ligação

- Placa de acionamento dos servos ligada ao computador por USB, **com fonte de alimentação externa de 5V4A**

- O nome do dispositivo de porta serial USB do macOS é **/dev/tty.usbmodem\*** ou **/dev/cu.usbmodem\*** (não é o `/dev/ttyACM*` do Linux)

- Verificar a porta:

```Plain Text
ls /dev/tty.usbmodem* /dev/cu.usbmodem*
```

---

## Configurar a porta serial (script 2)

**Execute ****`./2-配置串口.sh`**:

1. É apresentada a mensagem "Ligue a placa de acionamento dos servos ao computador" → prima Enter para iniciar a deteção

2. Lista automaticamente as portas seriais detetadas (`/dev/tty.usbmodem* / /dev/cu.usbmodem* / *.usbserial*`)

3. Com uma única porta, prima Enter para confirmar; com várias portas, introduza o número

4. Escreve automaticamente o `--serialport` dos 3 yml de dataflow e a porta predefinida de `AHControl/src/main.rs`

5. As portas seriais USB do macOS são normalmente legíveis e graváveis pelo utilizador; se for indicada falta de permissão, execute manualmente:

```Bash
sudo chmod 666 /dev/cu.usbmodem*
```

Ou vá a **Definições do Sistema → Privacidade e Segurança → Monitorização de Entrada** e permita o acesso ao terminal.

> Se estiver numa máquina virtual, ligue o dispositivo USB à máquina virtual.
> 
> 

---

## Implementação do código (script 3)

**Execute ****`./3-部署代码.sh`**, que executa automaticamente:

1. Inicia o daemon do dora (`dora up`)

2. Cria um ambiente virtual Python 3.12 (`uv venv --python 3.12`)

3. Ativa o ambiente virtual

4. Compila o nó Rust AHControl (`cargo build --release`, cerca de 10 minutos na primeira vez)

5. Sincroniza as dependências do AHSimulation e do HandTracking (`uv sync`)

6. Instala à força mediapipe==0.10.14 (armadilha conhecida do tutorial, garantia de segurança)

> A implementação só precisa ser executada uma vez. Execuções repetidas depois disso irão perguntar se o ambiente virtual deve ser recriado.
> 
> 

---

## Executar o código (script 4)

**Execute ****`./4-运行代码.sh`**, surge um menu interativo:

```Bash
============================================
   请选择运行模式：
============================================
    1 - 模拟仿真（摄像头手势追踪）
    2 - 真实硬件
    q - 退出
============================================
  请输入序号 [1/2/q]:
```

- Escolha **1**: ambiente de simulação, os gestos captados pela câmara acionam as duas mãos simuladas

- Escolha **2**: entra no submenu, escolha mão direita / mão esquerda / ambas as mãos

```Bash
============================================
   真实硬件 - 请选择灵巧手：
============================================
    1 - 右手
    2 - 左手
    3 - 左右双手
    b - 返回上级菜单
============================================
```

Depois de escolher, executa automaticamente `dora build` + `dora run`. A janela da câmara abre; faça gestos em frente à câmara e a mão hábil acompanha em tempo real. **Ctrl+C para parar**; após o fim do fluxo de dados, prima Enter para voltar ao menu principal, onde pode escolher outro modo ou q para sair.

> **Na primeira execução o macOS solicita autorização de câmara**: Definições do Sistema → Privacidade e Segurança → Câmara, permita que o terminal utilize a câmara.
> 
> 

---

## Limpeza do projeto (script 0)

**Execute ****`./0-清理项目.sh`**, introduza Y para confirmar e a limpeza é feita automaticamente:

1. Para o daemon do dora

2. Elimina os 3 ambientes virtuais (`.venv`)

3. Elimina os artefactos de compilação do Rust (`Demo/target`)

4. Elimina `__pycache__`, cópias de segurança `.bak`, registos e `Demo/out` (diretório de registos do dora)

5. **Restaura a porta predefinida** (`--serialport /dev/ttyACM0`) e remove resíduos da porta serial desta máquina

> Depois da limpeza, a pasta `AmazingHand-main` inteira pode ser copiada para outra pessoa, limpa e sem resíduos. Numa máquina nova, basta executar na ordem 1 → 2 → 3 → 4.
> 
> 

---

## Problemas comuns e observações

### 9.1 `Permission denied` (os scripts não têm permissão de execução)

- Sintoma: ao executar `./1-安装环境.sh` surge `bash: ./1-安装环境.sh: Permission denied`

- Causa: depois de copiar os scripts do Windows / de um ficheiro comprimido para o Mac, **o bit de execução perde-se**

- Solução:

```Plain Text
chmod +x *.sh
```

### 9.2 O cargo bloqueia em `Updating 'tuna' index`

- Causa: a configuração do espelho usou o **modo de repositório git** (`.../git/crates.io-index.git`), que na primeira vez tem de descarregar 1GB+ de índice

- Solução: altere `~/.cargo/config.toml` para o **índice esparso (sparse)** (ver secção 3.2), ou simplesmente volte a executar o `1-安装环境.sh`

### 9.3 mediapipe sem o submódulo solutions / instalação corrompida

```Plain Text
uv pip uninstall mediapipe
uv pip install mediapipe==0.10.14
```

- Tem de ser executado com o ambiente virtual ativado (no diretório Demo)

- O `3-部署代码.sh` já faz este passo automaticamente como garantia

### 9.4 Versão do dora incompatível (message v0.8.0 vs v0.7.0)

- Sintoma: `version mismatch: message format v0.8.0 is not compatible with expected message format v0.7.0`

- Causa: a versão do dora-cli não corresponde à do dora-node-api. **É obrigatório uniformizar para 0.5.0**

    - Verificação: `dora --version` deve mostrar `dora-cli 0.5.0` e `dora-message: 0.8.0`

    - O `1-安装环境.sh` deteta automaticamente a versão antiga e força a reinstalação

**Se houver uma versão antiga de dora no sistema (como 0.4.1), limpe manualmente primeiro:**

```Bash
# 1. Localizar o dora antigo
which dora
ls -la ~/.cargo/bin/dora ~/.dora/bin/dora ~/.local/bin/dora 2>/dev/null

# 2. Remover a versão antiga encontrada (pelo caminho real)
rm -f ~/.cargo/bin/dora ~/.dora/bin/dora ~/.local/bin/dora

# 3. Instalação forçada da 0.5.0
cargo install dora-cli --version 0.5.0 --force

# 4. Confirmar a versão (deve mostrar dora-cli 0.5.0 / dora-message: 0.8.0)
dora --version
```

> Se `dora --version` continuar a mostrar a versão antiga, isso significa que ainda há outros dora antigos no PATH; use which dora para os identificar e eliminar um a um.
> 
> 

### 9.5 Porta serial sem permissão

```Bash
sudo chmod 666 /dev/cu.usbmodem*
```

- Ou **Definições do Sistema → Privacidade e Segurança → Monitorização de Entrada** → permitir o terminal

- Se o dispositivo `tty.*` não conseguir ler, use o dispositivo `cu.*` correspondente (o dispositivo cu usa a porta em modo de leitura, mais adequado para controlo direto)

### 9.6 Permissões de câmara

- **Na primeira execução, escolha "Permitir" na janela que surge**, ou vá a **Definições do Sistema → Privacidade e Segurança → Câmara** e permita que o terminal utilize a câmara

- Confirme que a câmara não está a ser utilizada por outra aplicação (FaceTime, software de reuniões)

### 9.7 O número da porta muda a cada vez

- Depois de voltar a ligar o USB, o nome do dispositivo pode mudar; execute novamente o `2-配置串口.sh`

### 9.8 Falta o OpenCV

```Bash
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

(executar no diretório `HandTracking`, com o ambiente virtual ativado)

### 9.9 Compilação mais lenta no Apple Silicon / primeira execução bloqueada pelo Gatekeeper

- No Apple Silicon, a primeira compilação das dependências do dora com `cargo build` é mais lenta, o que é normal; aguarde com paciência

- Se aparecer a mensagem "não foi possível verificar o programador": Definições do Sistema → Privacidade e Segurança → Abrir Mesmo Assim

---

## Descrição da estrutura do código

### Diretório Demo

|Diretório/Ficheiro|Descrição|
|---|---|
|AHControl|Nó Rust, controla os motores dos servos. src/main.rs é o ponto de entrada|
|AHSimulation|Nó Python, simulação MuJoCo + cinemática inversa (mink)|
|HandTracking|Nó Python, rastreio de mãos com MediaPipe|
|dataflow_\*.yml|Definição do fluxo de dados do dora (grafo de ligação dos nós)|
|Mac一键部署脚本|Este conjunto de scripts de um clique|

### Correspondência entre os vários dataflow

|Ficheiro|Utilização|
|---|---|
|dataflow_tracking_simu.yml|Ambiente de simulação, gestos da câmara → mãos simuladas|
|dataflow_tracking_real_right.yml|Mão direita real|
|dataflow_tracking_real_left.yml|Mão esquerda real|
|dataflow_tracking_real_2hands.yml|Ambas as mãos reais (ligadas à mesma placa de acionamento)|

### Princípio do fluxo de dados

```Bash
摄像头 → HandTracking（MediaPipe 识别手势）
              ↓ 手部关键点坐标
         AHSimulation（MuJoCo 仿真 + 逆运动学）
              ↓ 关节目标角度
         AHControl（串口 → 舵机驱动板 → 灵巧手）
```

### Localização da configuração das portas

- A linha `args:` dos três `dataflow_tracking_real_*.yml`: `--serialport /dev/cu.usbmodem...`

- O `default_value` de `AHControl/src/main.rs` (valor predefinido do parâmetro da porta serial)

- `AHControl/config/*.toml`: modelo do servo, ID, deslocamento (normalmente não é preciso alterar)



