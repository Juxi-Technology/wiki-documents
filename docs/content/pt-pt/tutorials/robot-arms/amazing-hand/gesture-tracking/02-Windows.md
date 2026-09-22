---
title: "Implementação e execução com um clique no Windows"
description: "Implementação com um clique do rastreio de gestos AmazingHand no Windows: faça duplo clique nos scripts e controle a mão simulada ou real com gestos."
---

# Implementação e execução com um clique no Windows

**AmazingHand-main.zip**（AmazingHand-main.zip, acima do limite de tamanho por ficheiro do site — solicite em support@juxitech.com）

Este tutorial baseia-se no Demo oficial do AmazingHand (mão robótica da Pollen Robotics) e já vem com scripts de implementação com um clique.
Basta executar pela ordem numérica.**Todos os scripts estão na pasta ****`Demo\Windows一键部署脚本\`**** ; faça duplo clique para executar.**

---

## Preparação de hardware

> Os ficheiros de modelo podem ser consultados ou descarregados no [Onshape](https://cad.onshape.com/documents/430ff184cf3dd9557aaff2be/w/e3658b7152c139971d22c688/e/d79fbb3641873de0a515037e) (inclui URDF).
> 
> 

---

## Instalação do ambiente (script 1)

**Clique duas vezes em ****`1-安装环境.bat`** , executa automaticamente:

1. **Verificar as ferramentas de compilação MSVC** (cl.exe) — necessárias para a compilação do Rust. Se estiverem ausentes, será pedida a instalação do
Visual Studio 2022 Build Tools, assinale "Desenvolvimento para ambiente de trabalho com C++"; após instalar, reabra o terminal.

2. **Instalar o Rust** (toolchain rustup + stable-msvc)

3. **Configurar o espelho da Tsinghua para o cargo** (`C:\Users\<utilizador>\.cargo\config.toml`), para acelerar o download de crates

4. **Instalar o uv** (gestor de pacotes Python)

5. **Instalar o dora-cli 0.5.0** (`cargo install`, a primeira compilação demora cerca de 10~20 minutos; aguarde com paciência)

6. **Instalar o pacote pip dora-rs** (opcional, será instalado no ambiente virtual)

> **Importante**: após o fim do script, **feche e reabra o terminal** para que as variáveis de ambiente tenham efeito. A instalação pode demorar por causa da rede; aguarde com paciência e não feche a janela a meio do processo.
> 
> 

### Instalação manual alternativa (caso os scripts não funcionem)

- **Rust**: [https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install)

    - No Windows, utilize o rustup-init.exe e escolha a toolchain MSVC predefinida

    - Variáveis de ambiente: adicione `%USERPROFILE%\.cargo\bin` ao PATH

- **uv**: no PowerShell, execute `irm ``https://astral.sh/uv/install.ps1`` | iex`

    - Variáveis de ambiente: adicione `%USERPROFILE%\.local\bin` ao PATH

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

> Utilize o **índice esparso (sparse)** (como acima), e não um espelho de repositório git — o modo git tem de descarregar cerca de 1GB de índice na primeira vez e é fácil bloquear em `Updating 'tuna' index`.
> 
> 

---

## Modo de ligação

- A placa de acionamento dos servos é ligada ao computador por USB, com **fonte externa de 5V4A**

- No computador, encontre o número da porta: **Gestor de dispositivos → Portas (COM e LPT)**, por exemplo `COM11`

---

## Configurar a porta série (script 2)

**Clique duas vezes em ****`2-配置串口.bat`** (a lógica real está em `2-配置串口.ps1`):

1. É apresentada a mensagem "Ligue a placa de acionamento dos servos ao computador" → pressione Enter para iniciar a deteção

2. Lista automaticamente as portas COM detetadas (com o nome do dispositivo)

3. Com uma única porta, pressione Enter para confirmar; com várias portas, introduza o número

4. Escreve automaticamente a porta predefinida nos `--serialport` dos 3 dataflow yml e em `AHControl\src\main.rs`

5. Os ficheiros originais são copiados automaticamente para `.bak`

> Se o USB for desligado e ligado de novo, o número da porta pode mudar e será necessário executar este script novamente.
> 
> 

---

## Implementação do código (script 3)

**Clique duas vezes em ****`3-部署代码.bat`** , executa automaticamente:

1. Inicia o daemon do dora (`dora up`)

2. Cria um ambiente virtual Python 3.12 (`uv venv --python 3.12`)

3. Ativa o ambiente virtual

4. Compila o nó Rust do AHControl (`cargo build --release`, cerca de 10 minutos na primeira vez)

5. Sincroniza as dependências do AHSimulation e do HandTracking (`uv sync`)

6. Força a instalação do mediapipe==0.10.14

> A implementação só precisa de ser executada uma vez. Se for executada novamente, será perguntado se o ambiente virtual deve ser recriado.
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

- Escolha **1**: ambiente de simulação, em que os gestos da câmara acionam as duas mãos simuladas

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

Após a escolha, são executados automaticamente `dora build` + `dora run`. A janela da câmara aparece; faça gestos em frente à câmara e a mão robótica acompanha em tempo real. **Ctrl+C para parar**; quando o fluxo de dados terminar, pressione Enter para voltar ao menu principal, onde pode escolher outro modo ou `q` para sair.

> Na primeira execução, o Windows pode bloquear a permissão da câmara; basta clicar em "Permitir".
> 
> 

---

## Limpeza do projeto (script 0)

**Clique duas vezes em ****`0-清理项目.bat`** , digite `Y` para confirmar e a limpeza é feita automaticamente:

1. Para o daemon do dora

2. Apaga os 3 ambientes virtuais (`.venv`)

3. Apaga os artefactos de compilação do Rust (`Demo\target`)

4. Apaga `pycache`, as cópias de segurança `.bak`, os registos e `Demo\out` (diretório de registos do dora)

5. **Restaura a porta predefinida** (`--serialport /dev/ttyACM0`) e remove vestígios da porta série desta máquina

> Após a limpeza, pode copiar a pasta `AmazingHand-main` inteira para outra pessoa, limpa e sem resíduos. Numa máquina nova, basta executar pela ordem 1 → 2 → 3 → 4.
> 
> 

---

## Perguntas frequentes e observações

### 8.1 O cargo bloqueia em `Updating 'tuna' index`

- Causa: a configuração do espelho usou o **modo de repositório git** (`.../git/crates.io-index.git`), que tem de descarregar mais de 1GB+ de índice na primeira vez

- Solução: altere `C:\Users\<utilizador>\.cargo\config.toml` para o **índice esparso (sparse)** (ver secção 2.2), ou execute novamente `1-安装环境.bat`

### 8.2 mediapipe sem o submódulo solutions / instalação danificada

```Bash
uv pip uninstall mediapipe
```

```Bash
uv pip install mediapipe==0.10.14
```

- Deve ser executado com o ambiente virtual ativo (no diretório `Demo`)

- O `3-部署代码.bat` já faz este passo automaticamente como salvaguarda

### 8.3 Versão do dora incompatível (message v0.8.0 vs v0.7.0)

- Sintoma: `version mismatch: message format v0.8.0 is not compatible with expected message format v0.7.0`

- Causa: a versão do dora-cli não corresponde à do dora-node-api. **É obrigatório uniformizar em 0.5.0**

    - Verifique: `dora --version` deve apresentar `dora-cli 0.5.0` e `dora-message: 0.8.0`

    - Correção: `cargo install dora-cli --version 0.5.0 --force`

    - Se existirem vários dora no PATH (como a versão antiga em `C:\Users\xxx\.dora\bin`), garanta que `.cargo\bin` venha primeiro, ou elimine a versão antiga

### 8.4 Falha ao carregar o modelo no MuJoCo / mediapipe (caminho com chinês)

- Sintoma: `ParseXML: Error opening file '...\scene.xml'` ou `Can't find file: ....tflite`

- Causa: o carregador C++ do MuJoCo 3.x / mediapipe, no Windows, **não consegue abrir caminhos absolutos que contenham chinês** (como `D:\Claude工作区...`)

- Este projeto já inclui correções integradas:

    - `AHSimulation\AHSimulation\mj_mink_*.py` muda o diretório de trabalho antes de carregar o modelo

    - `HandTracking\mediapipe_patch.py` contorna o problema com o caminho curto 8.3 + caminhos relativos

- Não elimine estes códigos de correção

### 8.5 Permissão da câmara

- Na primeira execução, escolha "Permitir" na janela apresentada

- Definições → Privacidade → Câmara → Permitir acesso a aplicações de ambiente de trabalho

### 8.6 O número da porta muda sempre

- Após desligar e ligar novamente o USB, o número da COM pode mudar; execute novamente `2-配置串口.bat`

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
Câmara → HandTracking (o MediaPipe reconhece gestos)
              ↓ Coordenadas dos pontos-chave da mão
         AHSimulation (simulação MuJoCo + cinemática inversa)
              ↓ Ângulos-alvo das articulações
         AHControl (porta série → placa de acionamento dos servos → mão hábil)
```

### Localização da configuração da porta

- A linha `args:` dos três `dataflow_tracking_real_*.yml`: `--serialport COMxx`

- O `default_value = "COMxx"` de `AHControl\src\main.rs` (valor predefinido do parâmetro de porta série)

- `AHControl\config\*.toml`: modelo do servo, ID, deslocamento (normalmente não precisa de ser alterado)

