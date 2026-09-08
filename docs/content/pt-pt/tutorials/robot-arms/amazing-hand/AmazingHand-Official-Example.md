---
title: Tutorial de execução do exemplo oficial do AmazingHand
description: "Recomenda-se baixar o pacote compactado do código deste tutorial para a demonstração do exemplo Demo, ou clonar o repositório oficial open source"
---

# Tutorial de execução do exemplo oficial do AmazingHand

> **[Comprar na loja](https://www.juxitech.com/products/amazinghand)**


## 1. Download do código

Recomenda-se baixar o pacote compactado do código deste tutorial para a demonstração do exemplo Demo, ou clonar o repositório de código oficial open source  https://github.com/pollen-robotics/AmazingHand.git . Observe que pode haver erros ou omissões no código oficial open source. 

[Tutorial de execução do exemplo oficial do AmazingHand](https://juxitech.feishu.cn/wiki/SfUCweM6ni4IookxjOMcLf5cnwd)

Pacote compactado do código para Windows

[AmazingHand-main.zip]

Pacote compactado do código para Linux

[AmazingHand-main.zip]

```Plain Text
git clone https://github.com/pollen-robotics/AmazingHand.git
```

## 2. Instalação do ambiente

Instale Rust, uv e dora-rs de acordo com o processo de instalação do seu sistema 

**1. Instale o Rust:** [https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install)

Referência para a configuração das variáveis de ambiente do Rust no Windows (Importante!) https://zhuanlan.zhihu.com/p/1958936613276087180

Configuração das variáveis de ambiente no Linux:

![2. Instalação do ambiente – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/1.png)

![2. Instalação do ambiente – 2](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/10.png)

O Visual Studio Installer pode ser necessário na primeira instalação

**Configure o espelho (mirror) do Cargo**

Crie o ficheiro de configuração `config.toml` na pasta `.cargo` e configure o espelho `crates.io-index` da Tsinghua, para que o Cargo use a fonte de espelho da Universidade Tsinghua para baixar as crates.

```Bash
[source.crates-io]
replace-with = 'tuna'

[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"
```

**2. Instale o uv:** [https://docs.astral.sh/uv/getting-started/installation/](https://docs.astral.sh/uv/getting-started/installation/)

![2. Instalação do ambiente – 3](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/11.png)

No Windows, abra o terminal do PowerShell, copie e execute este comando para instalar

**Configuração das variáveis de ambiente no Linux:**

![2. Instalação do ambiente – 4](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/12.png)

**3. Instale o dora-rs:** consulte [https://dora-rs.ai/docs/guides/Installation/installing](https://dora-rs.ai/docs/guides/Installation/installing) para fazer o download e a instalação

Configuração das variáveis de ambiente no Linux:

![2. Instalação do ambiente – 5](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/13.png)

## 3. Método de cabeamento

A fonte de alimentação precisa fornecer pelo menos 5V3A, deve ser conectada externamente a uma placa de acionamento de servos e ligada ao computador via USB 

![3. Método de cabeamento – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/14.png)

## 4. Demonstração do exemplo

### **1. Verifique o número da porta da placa de acionamento de servos**

- O sistema Windows geralmente usa COM11; o número da porta da placa de acionamento de servos pode ser encontrado no Gerenciador de Dispositivos ou no software de host de servos Feite 

![1. Verifique o número da porta da placa de acionamento de servos – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/16.png)

- Sistemas Ubuntu e Linux geralmente usam /dev/ttyACM0

Verifique o número da porta da placa de acionamento de servos pela linha de comando: 

```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```

```Plain Text
sudo chmod 666 /dev/ttyACM*
```

```Plain Text
sudo usermod -aG dialout $USER
```

Se o comando "ls /dev/ttyUSB\* /dev/ttyACM\*" não encontrar o diretório na máquina virtual, verifique se a mão hábil está conectada ao computador no canto inferior direito da máquina virtual. Se estiver, desconecte-a e conecte-a à máquina virtual. 

![1. Verifique o número da porta da placa de acionamento de servos – 2](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/18.png)

### **2. Modifique o número da porta no código**

① Localize o ficheiro de código main.rs no diretório AmazingHand-main\\Demo\\AHControl\\src, abra-o em um editor de texto e altere para o número da porta encontrado no seu computador (COM\* no Windows e, geralmente, /dev/ttyACM\* em sistemas Ubuntu e Linux)

![2. Modifique o número da porta no código – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/19.png)

② Localize o ficheiro de instância correspondente 

**Mão hábil direita** Encontre dataflow_tracking_real_right.yml no diretório AmazingHand-main\\Demo

**Mão hábil esquerda** Encontre dataflow_tracking_real_left.yml no diretório AmazingHand-main\\Demo

**Duas mãos hábeis** Encontre dataflow_tracking_real_2hands.yml no diretório AmazingHand-main\\Demo 

Abra em formato de texto e altere para o número da porta encontrado no seu computador (COM\* no Windows e, geralmente, /dev/ttyACM\* em sistemas Ubuntu e Linux) 

![2. Modifique o número da porta no código – 2](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/2.png)

![2. Modifique o número da porta no código – 3](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/20.png)

![2. Modifique o número da porta no código – 4](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/21.png)

### **3. Implantação do código**

- Abra a pasta Demo

No sistema Windows, abra o PowerShell no diretório e pressione Enter para abri-lo; em seguida, inicie o processo daemon (a cada vez):

Para sistemas Linux, abra diretamente pelo terminal e inicie o processo daemon (a cada vez): 

```Plain Text
dora up
```

- Em seguida, execute a partir deste diretório no terminal (ao configurar o ambiente, execute apenas uma vez!! Executar novamente substituirá o ambiente virtual!!) Crie um ambiente virtual:

```Plain Text
uv venv --python 3.12
```

- Ative o ambiente virtual (a cada vez) a executar o seguinte de acordo com o sistema: 

```Plain Text
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process

.venv\Scripts\activate
```

```Plain Text
source .venv/bin/activate
```

![3. Implantação do código – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/3.png)

Certifique-se de que o terminal ativou o ambiente virtual!

- Execute a sincronização de dependências e entre na pasta AHControl

```Plain Text
cd AHControl
```

```Plain Text
cargo build --release
```

- Em seguida, digite `cd..` e pressione Enter para voltar ao diretório Demo! Entre na pasta AHSimulation 

```Plain Text
cd AHSimulation
```

```Plain Text
uv sync
```

- Em seguida, digite`cd..`e pressione Enter para voltar ao diretório Demo! Entre na pasta HandTracking

```Plain Text
cd HandTracking
```

```Plain Text
uv sync
```

### 4. Resultados da execução

- Abra a pasta Demo! Abra o PowerShell no diretório e pressione Enter para iniciá-lo; em seguida, inicie o processo daemon (a cada vez):

```Plain Text
dora up
```

- Ative o ambiente virtual (a cada vez). Digite e execute de acordo com o sistema: 

Comando para ativar o ambiente virtual na plataforma Windows:

```Python
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

```Plain Text
.venv\Scripts\activate
```

Comando para ativar o ambiente virtual na plataforma Linux:

```Plain Text
source .venv/bin/activate
```

### Ambiente de simulação

- Execute o demo de rastreamento de mão por webcam apenas no ambiente de simulação:

```Plain Text
dora build dataflow_tracking_simu.yml --uv   *#(Execute only once)*
```

```Plain Text
dora run dataflow_tracking_simu.yml --uv
```

![Ambiente de simulação – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/4.png)

![Ambiente de simulação – 2](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/5.png)

### Operação com hardware real (rastreamento de mão)

- Execute o demo de rastreamento de mão por webcam a usar hardware real:

    #### Mão hábil direita

    ```Plain Text
    dora build dataflow_tracking_real_right.yml --uv   *#(Execute only once)*
    ```

    ```Plain Text
    dora run dataflow_tracking_real_right.yml --uv
    ```

    #### Mão hábil esquerda

    ```Plain Text
    dora build dataflow_tracking_real_left.yml --uv   *#(Execute only once)*
    ```

    ```Plain Text
    dora run dataflow_tracking_real_left.yml --uv
    ```

    #### Duas mãos hábeis (observe que ambas estão conectadas a uma placa de acionamento de servos) 

![Operação com hardware real, rastreamento de mão – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/6.png)

    ```Plain Text
    dora build dataflow_tracking_real_2hands.yml --uv   *#(Execute only once)*
    ```

    ```Plain Text
    dora run dataflow_tracking_real_2hands.yml --uv
    ```

![Operação com hardware real, rastreamento de mão – 2](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/7.png)

![Operação com hardware real, rastreamento de mão – 3](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/8.png)

### Exemplo simples para controlar o ângulo do dedo simulado

- Execute um exemplo simples para controlar o ângulo do dedo na simulação:

    ```Plain Text
    dora build dataflow_angle_simu.yml --uv   *#(Execute only once)*
    ```

    ```Plain Text
    dora run dataflow_angle_simu.yml --uv
    ```

![Exemplo simples para controlar o ângulo do dedo simulado – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/9.png)

![Exemplo simples para controlar o ângulo do dedo simulado – 2](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/1.png)

Descrição

- [AHControl](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/AHControl) inclui um nó dora-rs para controlar o motor, além de alguns utilitários para configurá-lo.

- [AHSimulation](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/AHSimulation) inclui um nó dora-rs para simular o movimento da mão e obter a cinemática inversa.

- [HandTracking](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/HandTracking) inclui um nó dora-rs que rastreia as mãos por webcam e as utiliza como alvos para controlar a AH!



## Precauções 

### 1. Problema de versão do mediapipe

No pyproject.toml está configurado mediapipe\>=0.10.14, mas o pacote mediapipe instalado não contém o submódulo solutions. Provavelmente, a versão do mediapipe é incompatível com o Python 3.12 (versões mais recentes do mediapipe têm problemas de suporte ao Python 3.12) ou os ficheiros do pacote foram corrompidos durante a instalação. 

```Plain Text
uv pip uninstall mediapipe
```

```Plain Text
uv pip install mediapipe==0.10.14
```

### 2. Incompatibilidade de versão do Dora, formato de mensagem (v0.7.0 vs v0.8.0)

![2. Incompatibilidade de versão do Dora, formato de mensagem v0.7.0 vs v0.8.0 – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/10.png)

Resposta: ① Primeiro, no diretório .cargo/registry/src/github.xxxxxxxx/ no diretório do utilizador da unidade C, exclua apenas o pacote de dependência correspondente!

**`dora-message-0.7.0`** (Essencial! Esta é a pasta do formato de mensagem antigo e deve ser excluída)

`dora-core-0.4.1`

`dora-node-api-0.4.1`

`dora-arrow-convert-0.4.1`

`dora-metrics-0.4.1`

`dora-tracing-0.4.1`

`const-random-macro-0.1.16` (biblioteca auxiliar de dependência do Dora, deve ser excluída junto com a versão antiga)

② Abra a pasta Demo/AHControl e altere dora-node-api="0.5.0" e dora-message="0.8.0" no Cargo.toml 

③ No terminal, navegue até o diretório AHControl e execute novamente cargo build --release

④ Siga novamente a "[operação com hardware real](https://juxitech.feishu.cn/docx/FnF9dE1w7oFLtSx2p2ocU96Knpe#doxcnI3XybJ3CPPpdlSk5iH8wug)" para recompilar

Altere a versão correspondente de acordo com o erro realmente apresentado. Por exemplo, se o dora-message exigir a versão 0.6.0, altere para dora-node-api="0.4.0" dora-message="0.6.0".

![2. Incompatibilidade de versão do Dora, formato de mensagem v0.7.0 vs v0.8.0 – 2](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/11.png)

![2. Incompatibilidade de versão do Dora, formato de mensagem v0.7.0 vs v0.8.0 – 3](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/12.png)

### 3. Falta a biblioteca de dependência openCV

![3. Falta a biblioteca de dependência openCV – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/13.png)

Execute o seguinte comando no diretório HandTracking 

```Python
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

### 4.  Permissão de câmara habilitada  (computador) 

![4.  Permissão de câmara habilitada  computador – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/14.png)

![4.  Permissão de câmara habilitada  computador – 2](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/16.png)

![4.  Permissão de câmara habilitada  computador – 3](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/18.png)

### 5. Máquina virtual 22.04 acessando a câmara

Referência https://blog.csdn.net/qq_19731521/article/details/124954288

### 6. Instalação da câmara de mesa

#### Passos de instalação do suporte do kit de câmara de ambiente

1. Primeiro, fixe o suporte de ajuste fino do ângulo

![Passos de instalação do suporte do kit de câmara de ambiente – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/19.png)

2. Kit de câmara de ambiente — vista lateral

![Passos de instalação do suporte do kit de câmara de ambiente – 2](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/2.png)





## Máquina virtual 22.04 a executar o rastreamento de mão diretamente 

Baixe estes quatro ficheiros e coloque-os no mesmo diretório (com nome em inglês); em seguida, use o software de máquina virtual para abrir diretamente o ficheiro .ovf e entrar no sistema

Senha: ubuntu

[ubuntu22.04_amazinghand.ovf]

[ubuntu22.04_amazinghand-disk1.vmdk]

[ubuntu22.04_amazinghand.mf]

[ubuntu22.04_amazinghand-file1.iso]

**1. Abra o terminal no diretório Demo:**

```Plain Text
dora up
```

**E ative o ambiente virtual: **

```Plain Text
source .venv/bin/activate
```

**2. Permissão de câmara na máquina virtual**

Referência para a máquina virtual 22.04 acessar a câmara https://blog.csdn.net/qq_19731521/article/details/124954288

**3. Verifique a porta da placa de acionamento de servos pela linha de comando:**

```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```

```Plain Text
sudo chmod 666 /dev/ttyACM*
```

```Plain Text
sudo usermod -aG dialout $USER
```

**4. Modifique o número da porta no ficheiro de código**

① Localize o ficheiro de código main.rs no diretório AmazingHand-main\\Demo\\AHControl\\src, abra-o em modo de texto e altere para o número da porta encontrado no seu computador (COM\* no Windows e, geralmente, /dev/ttyACM\* em sistemas Ubuntu e Linux)

![Máquina virtual 22.04 a executar o rastreamento de mão diretamente – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/20.png)

② Encontre o ficheiro de instância correspondente 

**Mão hábil direita** Encontre dataflow_tracking_real_right.yml no diretório AmazingHand-main\\Demo

**Mão hábil esquerda** Encontre dataflow_tracking_real_left.yml no diretório AmazingHand-main\\Demo

**Duas mãos hábeis** Encontre o ficheiro dataflow_tracking_real_2hands.yml no diretório AmazingHand-main\\Demo 

Abra em formato de texto e altere para o número da porta encontrado no seu computador (COM\* no Windows e, geralmente, /dev/ttyACM\* em sistemas Ubuntu e Linux) 

![Máquina virtual 22.04 a executar o rastreamento de mão diretamente – 2](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/21.png)

![Máquina virtual 22.04 a executar o rastreamento de mão diretamente – 3](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/3.png)

![Máquina virtual 22.04 a executar o rastreamento de mão diretamente – 4](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example/4.png)

**5. Execute o rastreamento da mão direita**

```Plain Text
dora run dataflow_tracking_real_right.yml --uv
```

<RelatedProducts slugs="amazinghand,servo-driver-board" />
