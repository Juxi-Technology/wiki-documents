---
title: "Implantação e execução com um clique no Windows"
description: "Implantação com um clique do rastreamento de gestos AmazingHand no Windows: execute os scripts com duplo clique e controle a mão simulada ou real com gestos."
---

# Implantação e execução com um clique no Windows

**AmazingHand-main.zip**（AmazingHand-main.zip, acima do limite de tamanho por arquivo do site — solicite em support@juxitech.com）

Este tutorial baseia-se no Demo oficial do AmazingHand (mão robótica da Pollen Robotics) e já vem com scripts de implantação com um clique.
Basta executar pela ordem numérica.**Todos os scripts estão na pasta ****`Demo\Windows一键部署脚本\`**** ; execute diretamente com duplo clique.**

---

## Preparação de hardware

> Os arquivos de modelo podem ser visualizados ou baixados em [Onshape](https://cad.onshape.com/documents/430ff184cf3dd9557aaff2be/w/e3658b7152c139971d22c688/e/d79fbb3641873de0a515037e) (inclui URDF).
> 
> 

---

## Instalação do ambiente (script 1)

**Clique duas vezes em ****`1-安装环境.bat`** , executa automaticamente:

1. **Verificar as ferramentas de compilação MSVC** (cl.exe) — necessárias para a compilação do Rust. Se estiverem ausentes, será solicitada a instalação do
Visual Studio 2022 Build Tools, marque "Desenvolvimento para desktop com C++"; após instalar, reabra o terminal.

2. **Instalar o Rust** (toolchain rustup + stable-msvc)

3. **Configurar o espelho da Tsinghua para o cargo** (`C:\Users\<usuario>\.cargo\config.toml`), para acelerar o download de crates

4. **Instalar o uv** (gerenciador de pacotes Python)

5. **Instalar o dora-cli 0.5.0** (`cargo install`, a primeira compilação leva cerca de 10~20 minutos; aguarde com paciência)

6. **Instalar o pacote pip dora-rs** (opcional, será instalado no ambiente virtual)

> **Importante**: após o script terminar, **feche e reabra o terminal** para que as variáveis de ambiente entrem em vigor. A instalação pode ser lenta por causa da rede; aguarde com paciência e não feche a janela no meio do processo.
> 
> 

### Instalação manual alternativa (caso os scripts não funcionem)

- **Rust**: [https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install)

    - No Windows, use o rustup-init.exe e escolha a toolchain MSVC predefinida

    - Variáveis de ambiente: adicione `%USERPROFILE%.cargo\bin` ao PATH

- **uv**: no PowerShell, execute `irm ``https://astral.sh/uv/install.ps1`` | iex`

    - Variáveis de ambiente: adicione `%USERPROFILE%.local\bin` ao PATH

- **dora-cli**: `cargo install dora-cli --version 0.5.0`

### Configuração do espelho da Tsinghua para o cargo (~/.cargo/config.toml)

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

> Use o **índice esparso (sparse)** (como acima), e não um espelho de repositório git — o modo git precisa baixar cerca de 1GB de índice na primeira vez e é fácil travar em `Updating 'tuna' index`.
> 
> 

---

## Modo de conexão

- A placa de acionamento dos servos é conectada ao computador por USB, com **fonte externa de 5V4A**

- No computador, encontre o número da porta: **Gerenciador de Dispositivos → Portas (COM e LPT)**, por exemplo `COM11`

---

## Configurar a porta serial (script 2)

**Clique duas vezes em ****`2-配置串口.bat`** (a lógica real está em `2-配置串口.ps1`):

1. É exibida a mensagem "Conecte a placa de acionamento dos servos ao computador" → pressione Enter para iniciar a detecção

2. Lista automaticamente as portas COM detectadas (com o nome do dispositivo)

3. Com uma única porta, pressione Enter para confirmar; com várias portas, digite o número

4. Grava automaticamente a porta padrão nos `--serialport` dos 3 dataflow yml e em `AHControl\src\main.rs`

5. Os arquivos originais são copiados automaticamente para `.bak`

> Se o USB for desconectado e reconectado, o número da porta pode mudar e será necessário executar este script novamente.
> 
> 

---

## Implantação do código (script 3)

**Clique duas vezes em ****`3-部署代码.bat`** , executa automaticamente:

1. Inicia o daemon do dora (`dora up`)

2. Cria um ambiente virtual Python 3.12 (`uv venv --python 3.12`)

3. Ativa o ambiente virtual

4. Compila o nó Rust do AHControl (`cargo build --release`, cerca de 10 minutos na primeira vez)

5. Sincroniza as dependências do AHSimulation e do HandTracking (`uv sync`)

6. Força a instalação do mediapipe==0.10.14

> A implantação só precisa ser executada uma vez. Se for executada novamente, será perguntado se o ambiente virtual deve ser recriado.
> 
> 

---

## Executar o código (script 4)

**Clique duas vezes em ****`4-运行代码.bat`** , surge o menu interativo:

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

- Escolha **1**: ambiente de simulação, em que os gestos da câmera acionam as duas mãos simuladas

- Escolha **2**: entra num submenu para escolher mão direita / mão esquerda / ambas as mãos

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

Após a escolha, são executados automaticamente `dora build` + `dora run`. A janela da câmera aparece; faça gestos em frente à câmera e a mão robótica acompanha em tempo real. **Ctrl+C para parar**; quando o fluxo de dados terminar, pressione Enter para voltar ao menu principal, onde pode escolher outro modo ou `q` para sair.

> Na primeira execução, o Windows pode bloquear a permissão da câmera; basta clicar em "Permitir".
> 
> 

---

## Limpeza do projeto (script 0)

**Clique duas vezes em ****`0-清理项目.bat`** , digite `Y` para confirmar e a limpeza é feita automaticamente:

1. Para o daemon do dora

2. Apaga os 3 ambientes virtuais (`.venv`)

3. Apaga os artefatos de compilação do Rust (`Demo\target`)

4. Apaga `pycache`, os backups `.bak`, os logs e `Demo\out` (diretório de logs do dora)

5. **Restaura a porta padrão** (`--serialport /dev/ttyACM0`) e remove vestígios da porta serial desta máquina

> Após a limpeza, você pode copiar a pasta `AmazingHand-main` inteira para outra pessoa, limpa e sem resíduos. Numa máquina nova, basta executar na ordem 1 → 2 → 3 → 4.
> 
> 

---

## Perguntas frequentes e observações

### 8.1 O cargo fica preso em `Updating 'tuna' index`

- Causa: a configuração do espelho usou o **modo de repositório git** (`.../git/crates.io-index.git`), que precisa baixar mais de 1GB+ de índice na primeira vez

- Solução: altere `C:\Users\<usuario>\.cargo\config.toml` para o **índice esparso (sparse)** (ver seção 2.2), ou execute novamente `1-安装环境.bat`

### 8.2 mediapipe sem o submódulo solutions / instalação corrompida

```Bash
uv pip uninstall mediapipe
```

```Bash
uv pip install mediapipe==0.10.14
```

- Deve ser executado com o ambiente virtual ativado (no diretório `Demo`)

- O `3-部署代码.bat` já faz esta etapa automaticamente como salvaguarda

### 8.3 Versão do dora incompatível (message v0.8.0 vs v0.7.0)

- Sintoma: `version mismatch: message format v0.8.0 is not compatible with expected message format v0.7.0`

- Causa: a versão do dora-cli não corresponde à do dora-node-api. **É obrigatório uniformizar em 0.5.0**

    - Cheque: `dora --version` deve apresentar `dora-cli 0.5.0` e `dora-message: 0.8.0`

    - Correção: `cargo install dora-cli --version 0.5.0 --force`

    - Se houver vários dora no PATH (como a versão antiga em `C:\Users\xxx\.dora\bin`), garanta que `.cargo\bin` venha primeiro, ou apague a versão antiga

### 8.4 Falha ao carregar o modelo no MuJoCo / mediapipe (caminho com chinês)

- Sintoma: `ParseXML: Error opening file '...\scene.xml'` ou `Can't find file: ....tflite`

- Causa: o carregador C++ do MuJoCo 3.x / mediapipe, no Windows, **não consegue abrir caminhos absolutos que contenham chinês** (como `D:\Claude工作区...`)

- Este projeto já inclui correções incorporadas:

    - `AHSimulation\AHSimulation\mj_mink_*.py` muda o diretório de trabalho antes de carregar o modelo

    - `HandTracking\mediapipe_patch.py` contorna o problema com o caminho curto 8.3 + caminhos relativos

- Não apague estes códigos de correção

### 8.5 Permissão da câmera

- Na primeira execução, escolha "Permitir" na janela que aparece

- Configurações → Privacidade → Câmera → Permitir acesso a aplicativos de desktop

### 8.6 O número da porta muda a cada vez

- Após desconectar e reconectar o USB, o número da COM pode mudar; execute novamente `2-配置串口.bat`

### 8.7 Falta do openCV

```Bash
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

(executar no diretório `HandTracking`, depois de ativar o ambiente virtual)

---

## Descrição da estrutura do código

### Diretório Demo

### Correspondência entre os dataflows

### Princípio do fluxo de dados

```Bash
Câmera → HandTracking (MediaPipe reconhece gestos)
              ↓ coordenadas dos pontos-chave da mão
         AHSimulation (simulação MuJoCo + cinemática inversa)
              ↓ ângulos alvo das juntas
         AHControl (porta serial → placa de acionamento dos servos → mão hábil)
```

### Localização da configuração da porta

- A linha `args:` dos três `dataflow_tracking_real_*.yml`: `--serialport COMxx`

- O `default_value = "COMxx"` de `AHControl\src\main.rs` (valor padrão do parâmetro de porta serial)

- `AHControl\config\*.toml`: modelo do servo, ID, deslocamento (normalmente não precisa de alteração)

