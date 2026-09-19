---
title: "Linux (Ubuntu) implementação e execução com um clique"
description: "Implementação com um clique do rastreio de gestos AmazingHand no Ubuntu: execute os scripts no terminal e controle a mão simulada ou real com gestos."
---

# Linux (Ubuntu) implementação e execução com um clique

AmazingHand-main.zip

Este tutorial baseia-se no Demo oficial do AmazingHand (mão hábil da Pollen Robotics) e já inclui um script de implementação com um clique.
Basta executar pela ordem numérica. **Todos os scripts estão na pasta ****`Demo/Linux (Ubuntu)一键部署脚本/`**** e são executados no terminal com ****`./nome-do-script`****.**

---

## Preparação de hardware

> O ficheiro do modelo pode ser consultado ou descarregado em [Onshape](https://cad.onshape.com/documents/430ff184cf3dd9557aaff2be/w/e3658b7152c139971d22c688/e/d79fbb3641873de0a515037e) (inclui URDF).
> 
> 

---

## Obter permissão de execução dos scripts (importante)

**Depois de copiar os scripts do Windows / de um ficheiro comprimido para o Linux, a permissão de execução (****`+x`****) é perdida** e a execução direta apresenta
`Permission denied`. **Antes da primeira utilização é obrigatório executar:**

```Bash
cd "AmazingHand-main/Demo/Linux(Ubuntu)一键部署脚本"
```

```Bash
chmod +x *.sh
```

Depois disso, cada script pode ser executado com `./nome-do-script`. Também é possível combinar os dois passos:

```Bash
cd "AmazingHand-main/Demo/Linux(Ubuntu)一键部署脚本" && chmod +x *.sh && ./1-安装环境.sh
```

> Dica: ao copiar `AmazingHand-main` para o Linux, usar **tar** preserva melhor as permissões:
> `tar czf AmazingHand-main.tar.gz AmazingHand-main` (compactar em qualquer lado, Windows ou Linux, e descompactar no lado Linux),
> ou, depois de descompactar, executar uma única vez `chmod +x *.sh`.
> 
> 

---

## Instalação do ambiente (script 1)

No terminal, entre no diretório dos scripts e execute (confirme que o `chmod +x` do passo 2 acima já foi feito):

```Bash
cd "Demo/Linux(Ubuntu)一键部署脚本"
```

```Bash
./1-安装环境.sh
```

Executa automaticamente:

1. **Instalar o Rust** (rustup + toolchain stable)

2. **Configurar o espelho Tsinghua do cargo** (`~/.cargo/config.toml`), para acelerar o download de crates

3. **Instalar o uv** (gestor de pacotes Python)

4. **Instalar o dora-cli 0.5.0** (`cargo install`, a primeira compilação demora cerca de 10~20 minutos, aguarde com paciência)

5. **Instalar o pacote pip dora-rs** (opcional)

> **Importante**: depois de o script terminar, **feche e reabra o terminal** para que as variáveis de ambiente entrem em vigor. Se a versão aparecer vazia, adicione o seguinte caminho ao `~/.bashrc`:
> 
> export PATH="$HOME/.cargo/bin:$HOME/.local/bin:$PATH"
> 
> 

### Instalação manual alternativa (quando os scripts não estão disponíveis)

- **Rust**:

```Bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

- **uv**:

```Bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

- **dora-cli**:

```Bash
cargo install dora-cli --version 0.5.0
```

### Configuração do espelho Tsinghua do cargo (~/.cargo/config.toml)

```Bash
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

- Verificar o número da porta:

```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```

- Normalmente é `/dev/ttyACM0`

---

## Configurar a porta serial (script 2)

**Execute ****`./2-配置串口.sh`**:

1. É apresentada a mensagem "Ligue a placa de acionamento dos servos ao computador" → prima Enter para iniciar a deteção

2. Lista automaticamente as portas seriais detetadas (`/dev/ttyACM*` / `/dev/ttyUSB*`)

3. Com uma única porta, prima Enter para confirmar; com várias portas, introduza o número

4. Escreve automaticamente o `--serialport` dos 3 yml de dataflow e a porta predefinida de `AHControl/src/main.rs`

5. **Configura automaticamente as permissões da porta serial**:

```Bash
sudo chmod 666 /dev/ttyACM0
```

6. Recomenda-se adicionar o utilizador atual ao grupo dialout (evita introduzir a palavra-passe de cada vez, requer terminar a sessão e voltar a entrar):

```Bash
sudo usermod -aG dialout $USER
```

> Se `ls /dev/ttyUSB* /dev/ttyACM*` não devolver resultados dentro de uma máquina virtual, ligue o dispositivo USB à máquina virtual nas definições desta.
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

Depois de escolher, executa automaticamente `dora build` + `dora run`. A janela da câmara abre; faça gestos em frente à câmara e a mão hábil acompanha em tempo real. **Ctrl+C para parar**; após o fim do fluxo de dados, prima Enter para voltar ao menu principal, onde pode escolher outro modo ou `q` para sair.

> No Linux, o ambiente de trabalho precisa de permissão de câmara (por exemplo, Definições de privacidade → Câmara no Ubuntu), e confirme que a câmara não está a ser utilizada por outra aplicação.
> Se a câmara não abrir na máquina virtual, consulte  9.6 Permissões de câmara / a máquina virtual não abre a câmara.
> 
> 

---

## Limpeza do projeto (script 0)

**Execute ****`./0-清理项目.sh`**, introduza `Y` para confirmar e a limpeza é feita automaticamente:

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

- Causa: depois de copiar os scripts do Windows / de um ficheiro comprimido para o Linux, **o bit de execução perde-se**

- Solução: conceder permissão de execução a todos os scripts

```Bash
chmod +x *.sh
```

- Depois execute com `./nome-do-script` (não use `bash 脚本名`, isso ignora as mensagens interativas do passo 2 deste tutorial)

### 9.2 O cargo bloqueia em `Updating 'tuna' index`

- Causa: a configuração do espelho usou o **modo de repositório git** (`.../git/crates.io-index.git`), que na primeira vez tem de descarregar 1GB+ de índice

- Solução: altere `~/.cargo/config.toml` para o **índice esparso (sparse)** (ver secção 3.2), ou simplesmente volte a executar o `1-安装环境.sh`

### 9.3 mediapipe sem o submódulo solutions / instalação corrompida

```Bash
uv pip uninstall mediapipe
```

```Bash
uv pip install mediapipe==0.10.14
```

- Tem de ser executado com o ambiente virtual ativado (no diretório `Demo`)

- O `3-部署代码.sh` já faz este passo automaticamente como garantia

### 9.4 Versão do dora incompatível (message v0.8.0 vs v0.7.0)

- Sintoma: `version mismatch: message format v0.8.0 is not compatible with expected message format v0.7.0`

- Causa: a versão do dora-cli não corresponde à do dora-node-api. **É obrigatório uniformizar para 0.5.0**

    - Verificação: `dora --version` deve mostrar `dora-cli 0.5.0` e `dora-message: 0.8.0`

    - O `1-安装环境.sh` agora **deteta a versão automaticamente**: se não for 0.5.0, limpa e força a reinstalação

**Se o sistema tiver uma versão antiga de dora (como 0.4.1), limpe manualmente antes de reinstalar:**

```Bash
# 1. Localizar onde está o dora antigo
which dora
ls -la ~/.cargo/bin/dora ~/.dora/bin/dora ~/.local/bin/dora 2>/dev/null

# 2. Remover a versão antiga encontrada (remover pelo caminho real, podem existir várias)
rm -f ~/.cargo/bin/dora ~/.dora/bin/dora ~/.local/bin/dora

# 3. Instalação forçada da 0.5.0 (instalada em ~/.cargo/bin)
cargo install dora-cli --version 0.5.0 --force

# 4. Confirmar a versão (deve mostrar dora-cli 0.5.0 / dora-message: 0.8.0)
dora --version
```

> Se `dora --version` continuar a mostrar a versão antiga, isso significa que ainda há outras posições no PATH com dora antigo; use `which dora` para os identificar e eliminar um a um e garanta que `~/.cargo/bin` fica no início do PATH.
> 
> 

### 9.5 Porta serial sem permissão (Permission denied)

```Plain Text
sudo chmod 666 /dev/ttyACM*
```

- A permissão pode ser reposta a cada nova ligação e desligação do cabo

- Solução definitiva: `sudo usermod -aG dialout $USER`, terminar a sessão e voltar a entrar

### 9.6 Permissões de câmara / a máquina virtual não abre a câmara

**Máquina real**:

- Ubuntu: Definições → Privacidade → Câmara → Permitir acesso de aplicações

- Confirme que a câmara não está a ser utilizada por outra aplicação (Câmara, Zoom, etc.)

**Máquina virtual (VMware) não abre a câmara**:

Sintoma: `open VIDEOIO (V4L2:/dev/video0): can't open camera by index` ou `select () timeout`,
enquanto `ls /dev/video0` existe e o `v4l2-ctl` consegue capturar fotogramas, mas o OpenCV `cap.read ()` devolve sempre `ret = False`.

Diagnóstico e solução (por ordem):

1. **Encaminhar a câmara para dentro da máquina virtual**: menu → Máquina virtual → Dispositivos removíveis → Câmara → Ligar

2. **Trocar a versão do controlador USB (solução comum no VMware, a mais eficaz)**:

    - Máquina virtual → Definições → **Controlador USB** → alternar entre `USB 2.0` / `USB 3.1`

    - Depois de alternar, **reinicie a máquina virtual** e tente novamente

3. Verificar se o dispositivo existe:

```Plain Text
ls -l /dev/video0
sudo usermod -aG video $USER   # Adicionar ao grupo video, terminar sessão e iniciar novamente
```

4. Usar o v4l2 para verificar se a câmara realmente consegue emitir fotogramas (se emitir fotogramas = o driver está bem, o problema está na compatibilidade com o OpenCV):

```Bash
v4l2-ctl --device=/dev/video0 --set-fmt-video=width=640,height=480,pixelformat=MJPG --stream-mmap --stream-count=1 --stream-to=/tmp/frame.jpg
ls -l /tmp/frame.jpg   # Dezenas a centenas de KB = fluxo ativo
```

### 9.7 O número da porta muda a cada vez

- Depois de voltar a ligar o USB, o número do dispositivo pode mudar; execute novamente o `2-配置串口.sh`

### 9.8 Falta o OpenCV

```Bash
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

(executar no diretório `HandTracking`, com o ambiente virtual ativado)

---

## Descrição da estrutura do código

### Diretório Demo

### Correspondência entre os vários dataflow

### Princípio do fluxo de dados

```Plain Text
摄像头 → HandTracking（MediaPipe 识别手势）
              ↓ 手部关键点坐标
         AHSimulation（MuJoCo 仿真 + 逆运动学）
              ↓ 关节目标角度
         AHControl（串口 → 舵机驱动板 → 灵巧手）
```

### Localização da configuração das portas

- A linha `args:` dos três `dataflow_tracking_real_*.yml`: `--serialport /dev/ttyACMx`

- O `default_value = "/dev/ttyACM0"` de `AHControl/src/main.rs` (valor predefinido do parâmetro da porta serial)

- `AHControl/config/*.toml`: modelo do servo, ID, deslocamento (normalmente não é preciso alterar)

