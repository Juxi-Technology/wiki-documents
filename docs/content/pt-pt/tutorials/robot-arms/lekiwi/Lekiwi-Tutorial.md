---
title: "Tutorial de Uso do Robô Móvel Lekiwi"
description: "Tutorial de utilização do robô Lekiwi: lista de materiais, guia de impressão 3D, instalação do LeRobot, configuração dos motores e alimentação dos braços."
---

# Tutorial de Uso do Robô Móvel Lekiwi

> **[Comprar na loja](https://www.juxitech.com/products/lekiwi-embodied-intelligence-mobile-robotic-car)**

O braço líder preto utiliza uma fonte de alimentação de 5V 6A e o braço seguidor branco utiliza uma fonte de alimentação de 12V 5A.

[lerobot-Lekiwi.zip](/downloads/lerobot-Lekiwi.zip)

O código neste repositório de tutorial é mantido na versão estável e testada do LeRobot anterior a 1 de outubro de 2026. Desde então, a Hugging Face realizou uma atualização muito grande do LeRobot, adicionando uma enorme quantidade de novas funcionalidades. Se quiser experimentar o tutorial mais recente, consulte a [documentação oficial](https://huggingface.co/docs/lerobot/lekiwi).



[Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi) é um projeto de carro robot totalmente de código aberto iniciado pela [SIGRobotics-UIUC](https://github.com/SIGRobotics-UIUC). Inclui ficheiros detalhados de impressão 3D e instruções de funcionamento, e foi concebido para ser compatível com o framework de aprendizagem por imitação [LeRobot](https://github.com/huggingface/lerobot/tree/main). Suporta o braço robótico SO101, permitindo um fluxo de trabalho completo de aprendizagem por imitação.

[*No CAD online do Fusion360*](https://a360.co/4k1P8yO)* pode visualizar as posições exatas dos componentes.*

[Ficheiro URDF](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)

Pré-visualização online do URDF https://urdf.d-robotics.cc/

![image – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-01.png)

## Principais características

1. **Código aberto e baixo custo**: o [Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi) oferece uma solução de carro robot de código aberto e baixo custo.
2. **Integração com o LeRobot**: concebido para integração com a [plataforma LeRobot](https://github.com/huggingface/lerobot).
3. **Recursos de aprendizagem completos**: recursos de aprendizagem abrangentes de código aberto, incluindo guias de montagem e calibração, bem como tutoriais para testes, recolha de dados, treino e implementação, que ajudam os utilizadores a começar rapidamente e a criar aplicações robóticas.
4. **Compatível com Nvidia**: pode ser utilizado com o reComputer Mini J4012 Orin NX 16 GB.
5. **Aplicações em múltiplos cenários**: adequado para educação, investigação científica, produção automatizada e robótica, ajudando os utilizadores a obter uma operação robótica eficiente e precisa numa variedade de tarefas complexas.

A JUXI é responsável apenas pela qualidade do próprio hardware. Este tutorial é atualizado em estrita conformidade com a documentação oficial. Se encontrar problemas de software ou de dependências de ambiente que realmente não consiga resolver, comunique-os prontamente à [plataforma LeRobot](https://github.com/huggingface/lerobot) ou ao [canal Discord do LeRobot](https://discord.gg/8TnwDdjFGU).

**Nota**
- Todos os servos do chassi do Lekiwi requerem alimentação de 12V. Para utilizadores com um braço robótico de 5V, fornecemos um módulo conversor redutor de 12V para 5V. Note que terá de modificar a cablagem por sua conta.
- Fonte de alimentação de 12V — pode selecionar esta opção ao finalizar a compra, se necessário. Se já tiver uma fonte de alimentação de 12V, basta converter o conector de saída numa ficha DC 5521.
- Controlador Raspberry Pi e câmaras — têm de ser adquiridos separadamente na página do pedido.

## Lista de materiais (BOM)


## Ambiente inicial do sistema

**Para Ubuntu x86:**

- Ubuntu 22.04
- CUDA 12+
- Python 3.10
- Torch 2.6

**Para Jetson Orin:**

- Jetson JetPack 6.0
- Python 3.10
- Torch 2.3+

**Para Raspberry Pi:**

- Raspberry Pi 5, 4G\~16G

### Configuração do SSH

Depois de configurar a Raspberry Pi, deve ativar e configurar o [SSH](https://www.raspberrypi.com/news/coding-on-raspberry-pi-remotely-with-visual-studio-code/) (Secure Shell) para poder iniciar sessão na Raspberry Pi a partir do seu portátil sem ligar um ecrã, teclado e rato à Pi. Pode encontrar um excelente tutorial [aqui](https://www.raspberrypi.com/documentation/computers/remote-access.html#ssh). Pode iniciar sessão na Raspberry Pi através da linha de comandos (cmd) ou, se utilizar o VSCode, pode usar [esta](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) extensão.

## Guia de impressão 3D

### Peças

Fornecemos ficheiros STL imprimíveis para as seguintes peças impressas em 3D. Estas peças podem ser impressas em impressoras FDM de nível de consumidor com filamento PLA de uso geral. Testámo-las numa impressora Bambu Lab P1S. Para cada componente, limitámo-nos a carregá-lo no Bambu Studio, deixámos que este o rodasse e organizasse automaticamente, ativámos os suportes recomendados, se aplicável, e imprimimos.


### Configurações de impressão

Os ficheiros STL fornecidos podem ser impressos diretamente em muitas impressoras FDM. Abaixo estão as configurações testadas e recomendadas; outras configurações também podem funcionar.

- Material: PLA+
- Diâmetro e precisão do bico: bico de 0,2mm de diâmetro, altura de camada de 0,2mm
- Densidade de preenchimento: 15%
- Velocidade de impressão: 150 mm/s
- Se necessário, envie o G-code (ficheiro fatiado) para a impressora e imprima

## A. Instalar o LeRobot na Raspberry Pi

Na sua Raspberry Pi:

### 1. [Instalar o Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

```Python
mkdir -p ~/miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm ~/miniconda3/miniconda.sh
```

### 2. Reiniciar o shell

Copie e cole o seguinte comando no seu shell: `source ~/.bashrc`, ou, para utilizadores de Mac: `source ~/.bash_profile` ou `source ~/.zshrc` (se utilizar o zshell).

### 3. Criar e ativar um novo ambiente Conda para o LeRobot

```Python
conda create -y -n lerobot python=3.10
```

Em seguida, ative o seu ambiente Conda (tem de o fazer sempre que abrir um shell para utilizar o LeRobot!):

```Bash
conda activate lerobot
```

### 4. Clonar o LeRobot:

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. Instalar o ffmpeg no seu ambiente:

Ao utilizar o `miniconda`, instale o `ffmpeg` no seu ambiente:

```PowerShell
conda install ffmpeg -c conda-forge
```

Normalmente, isto instala o ffmpeg 7.X compilado com o codificador libsvtav1 para a sua plataforma. Se o libsvtav1 não for suportado (pode verificar os codificadores suportados com `ffmpeg -encoders`), pode:
[Todas as plataformas] Instalar explicitamente o ffmpeg 7.X:
`conda install ffmpeg=7.1.1 -c conda-forge`
[Apenas Linux] Instalar as dependências de compilação do ffmpeg e compilar o ffmpeg com suporte para libsvtav1 a partir do código-fonte, e garantir que o executável do ffmpeg em utilização é o correto, o que pode confirmar com `which ffmpeg`.
Se encontrar o erro abaixo, os comandos acima também podem corrigi-lo.

![image – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-02.png)

### 6. Instalar o LeRobot com a dependência do motor feetech:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install -e ".[lekiwi]"
```

### 7. Definir o tempo de ligação

Encontre o config_lekiwi.py no diretório `lerobot\src\lerobot\robots\lekiwi`.

 connection_time_s: int = 7200 # ou seja, 2 horas

![image – 3](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-03.png)

## B. Instalar o LeRobot num portátil

Se já instalou o LeRobot no seu portátil, pode saltar esta etapa; caso contrário, siga os **mesmos passos** que utilizámos na Raspberry Pi.

> [!Tip] Vamos utilizar com frequência a linha de comandos (cmd). Se não estiver familiarizado com o cmd, ou quiser rever a utilização da linha de comandos, pode consultar: [Curso intensivo de linha de comandos](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line)

No seu computador:

### 1. [Instalar o Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

anaconda.com/download/success

Ou clique nesta ligação para descarregar o instalador diretamente

https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe

![image – 4](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-04.png)
![image – 5](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-05.png)

## Alterar as fontes de pacotes do conda

```Shell
# First clear the existing source configuration (to avoid conflicts)
conda config --remove-key channels

# Replace conda's default sources and common third-party sources with the Tsinghua mirror
# Add the default package sources (main/r/msys2)
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2/

# Add common third-party sources
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/menpo/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/

# Show the download source, so installing packages displays the specific download URL
conda config --set show_channel_urls yes

# Clear the index cache so the new sources take effect
conda clean -i

# Show the current configuration (to verify the sources were added successfully)
conda config --show-sources
```

### 2. Reiniciar o shell

Copie e cole o seguinte comando no seu shell: `source ~/.bashrc`, ou, para utilizadores de Mac: `source ~/.bash_profile` ou `source ~/.zshrc` (se utilizar o zshell).

![image – 6](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-06.png)

### 3. Criar e ativar um novo ambiente Conda para o LeRobot

```Bash
conda create -y -n lerobot python=3.10
```

Em seguida, ative o seu ambiente Conda (tem de o fazer sempre que abrir um shell para utilizar o LeRobot!):

```Bash
conda activate lerobot
```

### 4. Clonar o LeRobot:

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. Instalar o ffmpeg no seu ambiente:

Ao utilizar o `miniconda`, instale o `ffmpeg` no seu ambiente:

```PowerShell
conda install ffmpeg -c conda-forge
```

Normalmente, isto instala o ffmpeg 7.X compilado com o codificador libsvtav1 para a sua plataforma. Se o libsvtav1 não for suportado (pode verificar os codificadores suportados com `ffmpeg -encoders`), pode:
[Todas as plataformas] Instalar explicitamente o ffmpeg 7.X:
`conda install ffmpeg=7.1.1 -c conda-forge`
[Apenas Linux] Instalar as dependências de compilação do ffmpeg e compilar o ffmpeg com suporte para libsvtav1 a partir do código-fonte, e garantir que o executável do ffmpeg em utilização é o correto, o que pode confirmar com `which ffmpeg`.
Se encontrar o erro abaixo, os comandos acima também podem corrigi-lo.

![image – 7](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-07.png)

### 6. Instalar o LeRobot com a dependência do motor feetech:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install -e ".[lekiwi]"
```

## C. Configuração dos motores

![image – 8](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-08.png)
![image – 9](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-09.png)

### **1. Localizar a porta USB associada ao braço robótico**

Para encontrar a porta correta de um motor individual, execute o seguinte script utilitário duas vezes:

```Bash
lerobot-find-port
```

Saída de exemplo (por exemplo, `/dev/tty.usbmodem575E0031751` no Mac, ou possivelmente `/dev/ttyACM0` no Linux):

Saída de exemplo (por exemplo, `/dev/tty.usbmodem575E0032081` no Mac, ou possivelmente `/dev/ttyACM1` no Linux):

Resolução de problemas: no Linux, pode ser necessário conceder acesso à porta USB com os seguintes comandos:

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

### **2. Configurar os seus motores (salte esta etapa para uma unidade já pronta)**

Ligue cada motor do seu chassi, um de cada vez, e execute o seguinte script. Primeiro, inicializa os servos do braço robótico (ID 6..1) e, em seguida, inicializa os servos do chassi, definindo os respetivos IDs como (ID 9..7). Se já calibrou o braço robótico, pode limitar-se a premir Enter para sobrescrever e avançar:

```Bash
lerobot-setup-motors \
    --robot.type=lekiwi \
    --robot.port=/dev/tty.usbmodem58760431551 # <- paste here the port found at previous step
```

![image – 10](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-10.png)

### 3. Configurar o espelho da Hugging Face na China

- Ubuntu

```Shell
sudo nano ~/.bashrc

# Add at the end of the file
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.bashrc
echo $HF_ENDPOINT

# Output
# https://hf-mirror.com
```

- Mac

```Shell
sudo nano ~/.zshrc

# Add at the end of the file
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.zshrc

# Output
# https://hf-mirror.com
```

#### ① Criar um Token

https://huggingface.co/settings/tokens

![image – 11](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-11.png)

![image – 12](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-12.png)

#### ② Registar o Token

![image – 13](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-13.png)

#### ③ Associar o Token

```Shell
hf auth login

hf auth whoami
```

![image – 14](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-14.png)

#### ④ Criar um Repositório de Dataset

**Anote o Owner e o nome do Dataset, ou seja, o <hf_username> e o <dateset_repo_id> de que vai precisar mais tarde**

![image – 15](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-15.png)
![image – 16](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-16.png)

![image – 17](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-17.png)

### 4. Atualizar a configuração!!!

Os ficheiros de configuração no LeKiwi LeRobot e no portátil têm de se manter consistentes. Primeiro, precisamos de encontrar o **endereço IP** da Raspberry Pi que controla o braço móvel. É o mesmo endereço IP utilizado para o SSH. Precisamos também de encontrar a **porta USB** da placa controladora de servos do braço líder no portátil e a **porta da placa controladora de servos no LeKiwi**. Pode encontrar estas portas com o seguinte script.

No Linux, pode ser necessário conceder acesso à porta USB executando os seguintes comandos:

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

Importante: agora que tem a porta do braço líder e o endereço IP do braço do Lekiwi, atualize o **ip** na configuração de rede, a **port** na configuração do braço líder e a **port, remote_ip** na configuração do LeKiwi.

Modifique estes quatro ficheiros no diretório example\lekiwi

![image – 18](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-18.png)

#### ① Modificar teleoperate.py

remote_ip: o endereço IP da Raspberry Pi

port: o número da porta quando o braço líder está ligado ao computador ou ao Linux

![image – 19](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-19.png)

#### ② Modificar record.py

HF_REPO_ID: [nome de utilizador e nome do dataset da Hugging Face](https://juxitech.feishu.cn/wiki/A2orwQ9xzidMCjk10SVcAAWVnhd?fromScene=spaceOverview#share-TYrIdHmPPobd1mx9xB7c75WEn0d)

remote_ip: o endereço IP da Raspberry Pi

port: o número da porta quando o braço líder está ligado ao computador ou ao Linux

![image – 20](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-20.png)

#### ③ Modificar replay.py

remote_ip: o endereço IP da Raspberry Pi

<hf_username>/<dataset_repo_id>, ou seja, o [nome de utilizador e nome do dataset da Hugging Face](https://juxitech.feishu.cn/wiki/A2orwQ9xzidMCjk10SVcAAWVnhd?fromScene=spaceOverview#share-TYrIdHmPPobd1mx9xB7c75WEn0d)

![image – 21](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/fix-01.png)

## D. Calibração

Agora precisamos de calibrar o braço líder e o braço seguidor. Os servos das rodas omnidirecionais não precisam de calibração.

### Calibração do braço seguidor (montado na base do Lekiwi)

Execute o seguinte comando no seu computador para calibrar o braço líder. Nota: as imagens aqui apresentadas são exemplos para o modelo SO101.

```Bash
lerobot-calibrate \
    --teleop.type=so100_leader \
    --teleop.port=/dev/tty.usbmodem58760431551 \ # change to the port you found
    --teleop.id=my_awesome_leader_arm
```

Agora execute o seguinte comando na sua Raspberry Pi para calibrar o braço seguidor no LeKiwi. Ignore a sua posição atual sobre a mesa — a calibração adequada deve ser feita com ele montado no chassi do Lekiwi.

```Bash
lerobot-calibrate \
    --robot.type=lekiwi \
    --robot.id=my_awesome_kiwi
```

Padronizámos o método de calibração na maioria dos robots. Primeiro, precisamos de mover o robot de modo a que cada junta fique no **meio da sua amplitude de movimento** e, em seguida, premir o botão. Depois, movemos todas as juntas ao longo de toda a sua **amplitude de movimento** uma vez. Pode encontrar um vídeo do mesmo processo de calibração para o SO101 [aqui](https://huggingface.co/docs/lerobot/en/so101#calibration-video) `Enter`.

## E. Teleoperação

Abra um novo Anaconda Prompt

![image – 22](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-21.png)

> Se estiver a utilizar um Mac, pode precisar de conceder permissão ao "Terminal" para aceder ao teclado durante a teleoperação. Vá a "Preferências do Sistema" > "Segurança e Privacidade" > "Monitorização de Entrada" e assinale a caixa "Terminal".

Para teleoperar, inicie sessão na sua Raspberry Pi através de SSH, execute o seguinte comando para ativar o ambiente `conda activate lerobot` e, em seguida, execute o seguinte script:

```Bash
python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

![image – 23](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-22.png)

Em seguida, no seu portátil, execute também o seguinte comando para ativar o ambiente `conda activate lerobot` e depois execute o seguinte script:

```Bash
python examples/lekiwi/teleoperate.py
```

O ecrã do seu portátil deve apresentar algo como: `[INFO] Connected to remote robot at tcp://172.17.133.91:5555 and video stream at tcp://172.17.133.91:5556.` Agora pode mover o braço de controlo e utilizar as teclas (W, A, S, D) do teclado para conduzir o robot para a frente, para a esquerda, para trás e para a direita. Utilize as teclas (Z, X) para rodar o robot para a esquerda ou para a direita. Utilize as teclas (R, F) para aumentar ou diminuir a velocidade do robot. Existem três modos de velocidade; consulte a tabela abaixo:



Se utilizar um teclado diferente, pode alterar a tecla de atalho de cada comando em [`LeKiWiClientConfig`](https://github.com/huggingface/lerobot/blob/main/src/lerobot/robots/lekiwi/config_lekiwi.py).

## Resolução de problemas de comunicação

Se tiver dificuldades em ligar o robot móvel SO101, siga as etapas abaixo para diagnosticar e corrigir o problema.

### 1. Verificar a configuração do endereço IP

Certifique-se de que o endereço IP correto da Raspberry Pi está definido no ficheiro de configuração. Para verificar o endereço IP da Raspberry Pi, execute o seguinte comando (na linha de comandos da Pi):

```Bash
hostname -I
```

### 2. Verificar se o portátil/PC consegue alcançar a Pi

Tente fazer ping à Raspberry Pi a partir do portátil:

```Bash
ping <your_pi_ip_address>
```

Se o ping falhar:

- Certifique-se de que a Pi está ligada e conectada à mesma rede.
- Verifique se o SSH está ativado na Pi.

### 3. Experimentar uma ligação SSH

Se não conseguir iniciar sessão na Pi via SSH, a ligação pode estar incorreta. Utilize o seguinte comando:

```Bash
ssh <your_pi_user_name>@<your_pi_ip_address>
```

Por exemplo, `ssh pi@192.168.0.106`

Se receber um erro de ligação:

- Certifique-se de que o SSH está ativado na Pi; pode executar o seguinte comando:

```Bash
sudo raspi-config
```

- Em seguida, navegue até: **Interfacing Options -> SSH** e ative-o.

### 4. Consistência dos ficheiros de configuração!!!

Certifique-se de que os ficheiros de configuração no portátil/PC e na Raspberry Pi são exatamente iguais.

## F. Gravar um dataset

Depois de se sentir à vontade com a teleoperação, pode utilizar o LeKiwi para gravar o seu primeiro dataset.

Para iniciar o programa no LeKiwi, ligue-se à sua Raspberry Pi através de SSH e execute os seguintes comandos para ativar o ambiente e iniciar o script:

```Bash
conda activate lerobot

python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

Se quiser utilizar o Hugging Face Hub para carregar datasets e nunca tiver iniciado sessão antes, certifique-se de que inicia sessão com um token de acesso de escrita, que pode gerar nas [configurações da Hugging Face](https://huggingface.co/settings/tokens):

```Bash
hf auth login
```

Guarde o nome do seu repositório da Hugging Face numa variável para executar o seguinte comando:

```Bash
hf auth whoami
```

Em seguida, execute o seguinte comando no seu portátil para gravar 2 episódios e carregar o dataset para o Hub:

```Bash
python examples/lekiwi/record.py
```

## G. Visualizar um dataset

Se carregou o dataset, pode [visualizar o seu dataset online](https://huggingface.co/spaces/lerobot/visualize_dataset); copie e cole o ID do repositório produzido pelo seguinte comando:

```Bash
echo ${HF_USER}/my_lekiwi_dataset
```

Se não carregou o dataset, também pode visualizá-lo localmente (a ferramenta de visualização abre numa janela do navegador em `http://127.0.0.1:9090`):

```Bash
python lerobot/scripts/visualize_dataset_html.py \
  --repo-id ${HF_USER}/lekiwi_test \
  --local-files-only 1
```

### Visualizar um dataset (opcional, vale a pena experimentar)

```Bash
echo ${HF_USER}/my_lekiwi_dataset
```

Se carregou o dataset, também pode visualizá-lo localmente com o seguinte comando:

```Python
lerobot-dataset-viz \
  --repo-id ${HF_USER}/my_lekiwi_dataset \
```

Se não carregou o dataset, também pode visualizá-lo localmente com o seguinte comando:

```Python
lerobot-dataset-viz \
  --repo-id juxi/my_lekiwi_dataset \
```

Aqui, `juxi` é um nome de `repo_id` personalizado definido durante a recolha de dados.



#### Dicas de recolha de dados

Depois de se sentir à vontade com a gravação de dados, pode criar datasets maiores para treino. Uma boa tarefa inicial é apanhar objetos de diferentes posições e colocá-los num recipiente. Recomendamos gravar pelo menos 50 episódios, 10 por posição. Mantenha a posição da câmara fixa e o movimento de agarrar consistente durante toda a gravação. Além disso, certifique-se de que os objetos que está a manipular estão claramente visíveis na imagem da câmara. Uma regra prática simples: deve conseguir concluir a tarefa apenas a observar a imagem da câmara.

Nas secções seguintes, vai treinar a sua rede neuronal. Depois de obter um desempenho de agarrar fiável, pode começar a introduzir mais variação na recolha de dados, por exemplo, adicionando posições de agarrar, utilizando diferentes técnicas de agarrar e alterando as posições da câmara.

Evite introduzir variação a mais demasiado depressa, pois pode prejudicar os seus resultados.

Se quiser aprofundar este tópico importante, consulte a nossa [publicação no blogue sobre o que faz um bom dataset.](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset)

#### Resolução de problemas:

No Linux, se as teclas de seta esquerda/direita e a tecla Esc não funcionarem durante a gravação de dados, certifique-se de que a variável de ambiente `$DISPLAY` está definida. Consulte as [limitações do pynput](https://pynput.readthedocs.io/en/latest/limitations.html#linux)

## H. Reproduzir um episódio

Agora experimente reproduzir o primeiro episódio no seu robot:

```Bash
python examples/lekiwi/replay.py
```

Parabéns 🎉 — o seu robot está pronto para aprender tarefas sozinho. Siga a secção de treino deste tutorial para começar a treiná-lo: [Introdução aos robots do mundo real](https://huggingface.co/docs/lerobot/il_robots)

## I. Avaliar a sua política

Certifique-se de que altera remote_ip, port, HF_MODEL_ID

### Modificar evaluate.py

HF_MODEL_ID="<hf_username>/<model_repo_id>" altere isto para o nome do dataset carregado na Hugging Face depois do treino (se o tiver carregado na Hugging Face), ou para o diretório local onde o modelo foi exportado depois do treino

HF_DATASET_ID="<hf_username>/<eval_dataset_id>" altere isto para o nome de utilizador que criou e o nome do dataset eval_

remote_ip: o endereço IP da Raspberry Pi

![image – 24](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-23.png)

Em seguida, execute o seguinte comando:

```Bash
python examples/lekiwi/evaluate.py
```

1. O nome do dataset começa por `eval` para refletir que está a executar uma inferência (por exemplo, `${HF_USER}/eval_act_lekiwi_test`).
2. Se durante a avaliação encontrar `File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'`, elimine primeiro a pasta cujo nome começa por `eval_` e execute o programa novamente.



Para treino em simulação, consulte

https://github.com/Ekumen-OS/lekiwi/tree/main

https://github.com/SIGRobotics-UIUC/LeKiwi-sim



## Ajuda 🙋‍

Para problemas de hardware, contacte o serviço de apoio ao cliente. Para dúvidas de utilização, junte-se ao Discord.

[plataforma LeRobot](https://github.com/huggingface/lerobot)

[canal Discord do LeRobot](https://discord.gg/8TnwDdjFGU)

##   
  
Instalar o Miniconda num Mac

## Conceder permissões

![image – 25](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-24.png)

## Instalar o Miniconda

https://www.anaconda.com/download

## Alterar a fonte de pacotes do pip

```Shell
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple
```

## Alterar a fonte de pacotes do conda

```Shell
# Clear the existing .condarc configuration (optional, to avoid conflicts)
echo "" > ~/.condarc

# Write the Tsinghua mirror configuration
cat << EOF > ~/.condarc
channels:
  - defaults
show_channel_urls: true
default_channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2
custom_channels:
  conda-forge: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  msys2: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  bioconda: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  menpo: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch-lts: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  simpleitk: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
EOF

# Clear the cache to apply the configuration
conda clean -i
```

<RelatedProducts slugs="lekiwi,so-arm101,servo-driver-board" />

