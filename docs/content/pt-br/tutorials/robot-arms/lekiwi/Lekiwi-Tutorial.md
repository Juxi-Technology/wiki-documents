---
title: "Tutorial de Uso do Robô Móvel Lekiwi"
description: "O braço ativo preto usa um adaptador de energia de 5V 6A, enquanto o braço passivo branco usa um adaptador de energia de 12V 5A"
---

# Tutorial de Uso do Robô Móvel Lekiwi

> **[Comprar na loja](https://www.juxitech.com/products/lekiwi-embodied-intelligence-mobile-robotic-car)**

O braço líder preto usa uma fonte de alimentação de 5V 6A, e o braço seguidor branco usa uma fonte de alimentação de 12V 5A.

[lerobot-Lekiwi.zip](/downloads/lerobot-Lekiwi.zip)

O código neste repositório de tutorial é mantido na versão estável e testada do LeRobot anterior a 1º de outubro de 2026. Desde então, a Hugging Face realizou uma atualização muito grande no LeRobot, adicionando uma grande quantidade de novos recursos. Se você quiser experimentar o tutorial mais recente, consulte a [documentação oficial](https://huggingface.co/docs/lerobot/lekiwi).



[Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi) é um projeto de carro robô totalmente de código aberto iniciado pela [SIGRobotics-UIUC](https://github.com/SIGRobotics-UIUC). Ele inclui arquivos detalhados de impressão 3D e instruções de operação, e foi projetado para ser compatível com o framework de aprendizado por imitação [LeRobot](https://github.com/huggingface/lerobot/tree/main). Ele suporta o braço robótico SO101, permitindo um fluxo de trabalho completo de aprendizado por imitação.

[*No CAD online do Fusion360*](https://a360.co/4k1P8yO)* você pode visualizar as posições exatas dos componentes.*

[Arquivo URDF](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)

Pré-visualização online do URDF https://urdf.d-robotics.cc/

![image – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-01.png)

## Principais recursos

1. **Código aberto e baixo custo**: o [Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi) oferece uma solução de carro robô de código aberto e baixo custo.
2. **Integração com o LeRobot**: projetado para integração com a [plataforma LeRobot](https://github.com/huggingface/lerobot).
3. **Recursos de aprendizado abrangentes**: recursos de aprendizado abrangentes de código aberto, incluindo guias de montagem e calibração, além de tutoriais para testes, coleta de dados, treinamento e implantação, ajudando os usuários a começar rapidamente e a criar aplicações robóticas.
4. **Compatível com Nvidia**: pode ser usado com o reComputer Mini J4012 Orin NX 16 GB.
5. **Aplicações em vários cenários**: adequado para educação, pesquisa científica, produção automatizada e robótica, ajudando os usuários a obter uma operação robótica eficiente e precisa em uma variedade de tarefas complexas.

A JUXI é responsável apenas pela qualidade do próprio hardware. Este tutorial é atualizado estritamente de acordo com a documentação oficial. Se você encontrar problemas de software ou de dependência de ambiente que realmente não consiga resolver, reporte-os prontamente à [plataforma LeRobot](https://github.com/huggingface/lerobot) ou ao [canal Discord do LeRobot](https://discord.gg/8TnwDdjFGU).

**Observação**
- Todos os servos do chassi do Lekiwi exigem alimentação de 12V. Para usuários com um braço robótico de 5V, fornecemos um módulo conversor abaixador de 12V para 5V. Note que você precisará modificar a fiação por conta própria.
- Fonte de alimentação de 12V — você pode selecionar esta opção no checkout, se necessário. Se você já tem uma fonte de alimentação de 12V, basta converter o conector de saída dela para um plugue DC 5521.
- Controlador Raspberry Pi e câmeras — devem ser adquiridos separadamente na página do pedido.

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

Depois de configurar a Raspberry Pi, você deve habilitar e configurar o [SSH](https://www.raspberrypi.com/news/coding-on-raspberry-pi-remotely-with-visual-studio-code/) (Secure Shell) para poder fazer login na Raspberry Pi a partir do seu notebook sem conectar tela, teclado e mouse à Pi. Você pode encontrar um ótimo tutorial [aqui](https://www.raspberrypi.com/documentation/computers/remote-access.html#ssh). Você pode fazer login na Raspberry Pi pelo prompt de comando (cmd) ou, se usar o VSCode, pode usar [esta](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) extensão.

## Guia de impressão 3D

### Peças

Fornecemos arquivos STL imprimíveis para as seguintes peças impressas em 3D. Essas peças podem ser impressas em impressoras FDM de nível de consumidor usando filamento PLA de uso geral. Nós as testamos em uma impressora Bambu Lab P1S. Para cada componente, simplesmente o carregamos no Bambu Studio, deixamos que ele gire e organize automaticamente, habilitamos os suportes recomendados, se houver, e imprimimos.


### Configurações de impressão

Os arquivos STL fornecidos podem ser impressos diretamente em muitas impressoras FDM. Abaixo estão as configurações testadas e recomendadas; outras configurações também podem funcionar.

- Material: PLA+
- Diâmetro e precisão do bico: bico de 0,2mm de diâmetro, altura de camada de 0,2mm
- Densidade de preenchimento: 15%
- Velocidade de impressão: 150 mm/s
- Se necessário, envie o G-code (arquivo fatiado) para a impressora e imprima

## A. Instalação do LeRobot na Raspberry Pi

Na sua Raspberry Pi:

### 1. [Instalar o Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

```Python
mkdir -p ~/miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm ~/miniconda3/miniconda.sh
```

### 2. Reiniciar o shell

Copie e cole o seguinte comando no seu shell: `source ~/.bashrc`, ou, para usuários de Mac: `source ~/.bash_profile` ou `source ~/.zshrc` (se você usar o zshell).

### 3. Criar e ativar um novo ambiente Conda para o LeRobot

```Python
conda create -y -n lerobot python=3.10
```

Em seguida, ative o seu ambiente Conda (você precisa fazer isso sempre que abrir um shell para usar o LeRobot!):

```Bash
conda activate lerobot
```

### 4. Clonar o LeRobot:

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. Instalar o ffmpeg no seu ambiente:

Ao usar o `miniconda`, instale o `ffmpeg` no seu ambiente:

```PowerShell
conda install ffmpeg -c conda-forge
```

Isso geralmente instala o ffmpeg 7.X compilado com o codificador libsvtav1 para a sua plataforma. Se o libsvtav1 não for suportado (você pode verificar os codificadores suportados com `ffmpeg -encoders`), você pode:
[Para todas as plataformas] Instalar explicitamente o ffmpeg 7.X:
`conda install ffmpeg=7.1.1 -c conda-forge`
[Apenas Linux] Instalar as dependências de compilação do ffmpeg e compilar o ffmpeg com suporte a libsvtav1 a partir do código-fonte, e garantir que o executável do ffmpeg em uso seja o correto, o que você pode confirmar com `which ffmpeg`.
Se você encontrar o erro abaixo, os comandos acima também podem corrigi-lo.

![image – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-02.png)

### 6. Instalar o LeRobot com a dependência do motor feetech:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install -e ".[lekiwi]"
```

### 7. Definir o tempo de conexão

Encontre o config_lekiwi.py no diretório `lerobot\src\lerobot\robots\lekiwi`.

 connection_time_s: int = 7200 # ou seja, 2 horas

![image – 3](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-03.png)

## B. Instalação do LeRobot em um notebook

Se você já instalou o LeRobot no seu notebook, pode pular esta etapa; caso contrário, siga os **mesmos passos** que usamos na Raspberry Pi.

> [!Tip] Usaremos o prompt de comando (cmd) com frequência. Se você não estiver familiarizado com o cmd, ou quiser revisar o uso da linha de comando, consulte: [Curso intensivo de linha de comando](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line)

No seu computador:

### 1. [Instalar o Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

anaconda.com/download/success

Ou clique neste link para baixar o instalador diretamente

https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe

![image – 4](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-04.png)
![image – 5](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-05.png)

## Alterando as fontes de pacotes do conda

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

Copie e cole o seguinte comando no seu shell: `source ~/.bashrc`, ou, para usuários de Mac: `source ~/.bash_profile` ou `source ~/.zshrc` (se você usar o zshell).

![image – 6](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-06.png)

### 3. Criar e ativar um novo ambiente Conda para o LeRobot

```Bash
conda create -y -n lerobot python=3.10
```

Em seguida, ative o seu ambiente Conda (você precisa fazer isso sempre que abrir um shell para usar o LeRobot!):

```Bash
conda activate lerobot
```

### 4. Clonar o LeRobot:

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. Instalar o ffmpeg no seu ambiente:

Ao usar o `miniconda`, instale o `ffmpeg` no seu ambiente:

```PowerShell
conda install ffmpeg -c conda-forge
```

Isso geralmente instala o ffmpeg 7.X compilado com o codificador libsvtav1 para a sua plataforma. Se o libsvtav1 não for suportado (você pode verificar os codificadores suportados com `ffmpeg -encoders`), você pode:
[Para todas as plataformas] Instalar explicitamente o ffmpeg 7.X:
`conda install ffmpeg=7.1.1 -c conda-forge`
[Apenas Linux] Instalar as dependências de compilação do ffmpeg e compilar o ffmpeg com suporte a libsvtav1 a partir do código-fonte, e garantir que o executável do ffmpeg em uso seja o correto, o que você pode confirmar com `which ffmpeg`.
Se você encontrar o erro abaixo, os comandos acima também podem corrigi-lo.

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

Solução de problemas: no Linux, talvez você precise conceder acesso à porta USB com os seguintes comandos:

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

### **2. Configurar seus motores (pule esta etapa para uma unidade pronta)**

Conecte cada motor do seu chassi um de cada vez e execute o seguinte script. Ele primeiro inicializa os servos do braço robótico (ID 6..1), depois inicializa os servos do chassi, definindo seus IDs como (ID 9..7). Se você já calibrou o braço robótico, pode simplesmente pressionar Enter para sobrescrever e pular:

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

#### ② Registrar o Token

![image – 13](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-13.png)

#### ③ Vincular o Token

```Shell
hf auth login

hf auth whoami
```

![image – 14](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-14.png)

#### ④ Criar um Repositório de Dataset

**Anote o Owner e o nome do Dataset, ou seja, o <hf_username> e o <dateset_repo_id> de que você precisará mais tarde**

![image – 15](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-15.png)
![image – 16](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-16.png)

![image – 17](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-17.png)

### 4. Atualizar a configuração!!!

Os arquivos de configuração no LeKiwi LeRobot e no notebook devem permanecer consistentes. Primeiro, precisamos encontrar o **endereço IP** da Raspberry Pi que controla o braço móvel. Este é o mesmo endereço IP usado para o SSH. Também precisamos encontrar a **porta USB** da placa controladora de servos do braço líder no notebook e a **porta da placa controladora de servos no LeKiwi**. Você pode encontrar essas portas com o seguinte script.

No Linux, talvez você precise conceder acesso à porta USB executando os seguintes comandos:

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

Importante: agora que você tem a porta do braço líder e o endereço IP do braço do Lekiwi, atualize o **ip** na configuração de rede, a **port** na configuração do braço líder, e a **port, remote_ip** na configuração do LeKiwi.

Modifique estes quatro arquivos no diretório example\lekiwi

![image – 18](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-18.png)

#### ① Modificar teleoperate.py

remote_ip: o endereço IP da Raspberry Pi

port: o número da porta quando o braço líder está conectado ao computador ou ao Linux

![image – 19](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-19.png)

#### ② Modificar record.py

HF_REPO_ID: [nome de usuário e nome do dataset da Hugging Face](https://juxitech.feishu.cn/wiki/A2orwQ9xzidMCjk10SVcAAWVnhd?fromScene=spaceOverview#share-TYrIdHmPPobd1mx9xB7c75WEn0d)

remote_ip: o endereço IP da Raspberry Pi

port: o número da porta quando o braço líder está conectado ao computador ou ao Linux

![image – 20](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-20.png)

#### ③ Modificar replay.py

remote_ip: o endereço IP da Raspberry Pi

<hf_username>/<dataset_repo_id>, ou seja, o [nome de usuário e nome do dataset da Hugging Face](https://juxitech.feishu.cn/wiki/A2orwQ9xzidMCjk10SVcAAWVnhd?fromScene=spaceOverview#share-TYrIdHmPPobd1mx9xB7c75WEn0d)

![image – 21](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/fix-01.png)

## D. Calibração

Agora precisamos calibrar o braço líder e o braço seguidor. Os servos das rodas omnidirecionais não precisam de calibração.

### Calibração do braço seguidor (montado na base do Lekiwi)

Execute o seguinte comando no seu computador para calibrar o braço líder. Observação: as imagens mostradas aqui são exemplos para o modelo SO101.

```Bash
lerobot-calibrate \
    --teleop.type=so100_leader \
    --teleop.port=/dev/tty.usbmodem58760431551 \ # change to the port you found
    --teleop.id=my_awesome_leader_arm
```

Agora execute o seguinte comando na sua Raspberry Pi para calibrar o braço seguidor no LeKiwi. Ignore sua posição atual sobre a mesa — a calibração adequada deve ser feita com ele montado no chassi do Lekiwi.

```Bash
lerobot-calibrate \
    --robot.type=lekiwi \
    --robot.id=my_awesome_kiwi
```

Padronizamos o método de calibração na maioria dos robôs. Primeiro, precisamos mover o robô de modo que cada junta esteja no **meio de sua faixa de movimento**, e então pressionar o botão. Em segundo lugar, movemos todas as juntas por toda a sua **faixa de movimento** uma vez. Você pode encontrar um vídeo do mesmo processo de calibração para o SO101 [aqui](https://huggingface.co/docs/lerobot/en/so101#calibration-video) `Enter`.

## E. Teleoperação

Abra um novo Anaconda Prompt

![image – 22](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-21.png)

> Se você estiver usando um Mac, talvez precise conceder permissão de "Terminal" para acessar o teclado para a teleoperação. Vá em "Preferências do Sistema" > "Segurança e Privacidade" > "Monitoramento de Entrada" e marque a caixa "Terminal".

Para teleoperar, faça login na sua Raspberry Pi via SSH, execute o seguinte comando para ativar o ambiente `conda activate lerobot` e então execute o seguinte script:

```Bash
python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

![image – 23](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-22.png)

Em seguida, no seu notebook, execute também o seguinte comando para ativar o ambiente `conda activate lerobot` e então execute o seguinte script:

```Bash
python examples/lekiwi/teleoperate.py
```

A tela do seu notebook deve exibir algo como: `[INFO] Connected to remote robot at tcp://172.17.133.91:5555 and video stream at tcp://172.17.133.91:5556.` Agora você pode mover o braço de controle e usar as teclas (W, A, S, D) do teclado para conduzir o robô para frente, para a esquerda, para trás e para a direita. Use as teclas (Z, X) para girar o robô para a esquerda ou para a direita. Use as teclas (R, F) para aumentar ou diminuir a velocidade do robô. Há três modos de velocidade; veja a tabela abaixo:



Se você usar um teclado diferente, pode alterar o atalho de tecla para cada comando em [`LeKiWiClientConfig`](https://github.com/huggingface/lerobot/blob/main/src/lerobot/robots/lekiwi/config_lekiwi.py).

## Solução de problemas de comunicação

Se você tiver dificuldade para conectar o robô móvel SO101, siga as etapas abaixo para diagnosticar e corrigir o problema.

### 1. Verificar a configuração do endereço IP

Certifique-se de que o endereço IP correto da Raspberry Pi esteja definido no arquivo de configuração. Para verificar o endereço IP da Raspberry Pi, execute o seguinte comando (na linha de comando da Pi):

```Bash
hostname -I
```

### 2. Verificar se o notebook/PC consegue alcançar a Pi

Tente fazer ping na Raspberry Pi a partir do notebook:

```Bash
ping <your_pi_ip_address>
```

Se o ping falhar:

- Certifique-se de que a Pi esteja ligada e conectada à mesma rede.
- Verifique se o SSH está habilitado na Pi.

### 3. Tentar uma conexão SSH

Se você não conseguir fazer login na Pi via SSH, a conexão pode estar incorreta. Use o seguinte comando:

```Bash
ssh <your_pi_user_name>@<your_pi_ip_address>
```

Por exemplo, `ssh pi@192.168.0.106`

Se você receber um erro de conexão:

- Certifique-se de que o SSH esteja habilitado na Pi; você pode executar o seguinte comando:

```Bash
sudo raspi-config
```

- Em seguida, navegue até: **Interfacing Options -> SSH** e habilite-o.

### 4. Consistência dos arquivos de configuração!!!

Certifique-se de que os arquivos de configuração no notebook/PC e na Raspberry Pi sejam exatamente iguais.

## F. Gravação de um dataset

Depois que você estiver confortável com a teleoperação, você pode usar o LeKiwi para gravar seu primeiro dataset.

Para iniciar o programa no LeKiwi, conecte-se à sua Raspberry Pi via SSH e execute os seguintes comandos para ativar o ambiente e iniciar o script:

```Bash
conda activate lerobot

python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

Se você quiser usar o Hugging Face Hub para enviar datasets e nunca tiver feito login antes, certifique-se de fazer login com um token de acesso de escrita, que você pode gerar nas [configurações da Hugging Face](https://huggingface.co/settings/tokens):

```Bash
hf auth login
```

Armazene o nome do seu repositório da Hugging Face em uma variável para executar o seguinte comando:

```Bash
hf auth whoami
```

Em seguida, execute o seguinte comando no seu notebook para gravar 2 episódios e enviar o dataset para o Hub:

```Bash
python examples/lekiwi/record.py
```

## G. Visualização de um dataset

Se você enviou o dataset, pode [visualizar seu dataset online](https://huggingface.co/spaces/lerobot/visualize_dataset); copie e cole o ID do repositório produzido pelo seguinte comando:

```Bash
echo ${HF_USER}/my_lekiwi_dataset
```

Se você não enviou o dataset, também pode visualizá-lo localmente (a ferramenta de visualização abre em uma janela do navegador em `http://127.0.0.1:9090`):

```Bash
python lerobot/scripts/visualize_dataset_html.py \
  --repo-id ${HF_USER}/lekiwi_test \
  --local-files-only 1
```

### Visualizar um dataset (opcional, vale a pena tentar)

```Bash
echo ${HF_USER}/my_lekiwi_dataset
```

Se você enviou o dataset, também pode visualizá-lo localmente com o seguinte comando:

```Python
lerobot-dataset-viz \
  --repo-id ${HF_USER}/my_lekiwi_dataset \
```

Se você não enviou o dataset, também pode visualizá-lo localmente com o seguinte comando:

```Python
lerobot-dataset-viz \
  --repo-id juxi/my_lekiwi_dataset \
```

Aqui, `juxi` é um nome de `repo_id` personalizado definido durante a coleta de dados.



#### Dicas de coleta de dados

Depois que você estiver confortável com a gravação de dados, poderá criar datasets maiores para treinamento. Uma boa tarefa inicial é pegar objetos de diferentes posições e colocá-los em um recipiente. Recomendamos gravar pelo menos 50 episódios, 10 por posição. Mantenha a posição da câmera fixa e mantenha o movimento de agarrar consistente durante toda a gravação. Além disso, certifique-se de que os objetos que você está manipulando estejam claramente visíveis no quadro da câmera. Uma regra prática simples: você deve conseguir concluir a tarefa apenas observando o feed da câmera.

Nas seções seguintes, você treinará sua rede neural. Depois de obter um desempenho de agarrar confiável, você pode começar a introduzir mais variação na coleta de dados, como adicionar posições de agarrar, usar diferentes técnicas de agarrar e alterar as posições da câmera.

Evite adicionar variação demais rápido demais, pois isso pode prejudicar seus resultados.

Se você quiser se aprofundar neste tópico importante, confira nossa [publicação no blog sobre o que faz um bom dataset.](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset)

#### Solução de problemas:

No Linux, se as teclas de seta esquerda/direita e a tecla Esc não funcionarem durante a gravação de dados, certifique-se de que a variável de ambiente `$DISPLAY` esteja definida. Veja as [limitações do pynput](https://pynput.readthedocs.io/en/latest/limitations.html#linux)

## H. Reprodução de um episódio

Agora tente reproduzir o primeiro episódio no seu robô:

```Bash
python examples/lekiwi/replay.py
```

Parabéns 🎉 — seu robô está pronto para aprender tarefas por conta própria. Siga a seção de treinamento deste tutorial para começar a treiná-lo: [Introdução aos robôs do mundo real](https://huggingface.co/docs/lerobot/il_robots)

## I. Avaliação da sua política

Certifique-se de alterar remote_ip, port, HF_MODEL_ID

### Modificar evaluate.py

HF_MODEL_ID="<hf_username>/<model_repo_id>" altere isto para o nome do dataset enviado à Hugging Face após o treinamento (se você o enviou à Hugging Face), ou para o diretório local onde o modelo foi exportado após o treinamento

HF_DATASET_ID="<hf_username>/<eval_dataset_id>" altere isto para o nome de usuário que você criou e o nome do dataset eval_

remote_ip: o endereço IP da Raspberry Pi

![image – 24](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-23.png)

Em seguida, execute o seguinte comando:

```Bash
python examples/lekiwi/evaluate.py
```

1. O nome do dataset começa com `eval` para refletir que você está executando uma inferência (por exemplo, `${HF_USER}/eval_act_lekiwi_test`).
2. Se durante a avaliação você encontrar `File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'`, primeiro exclua a pasta cujo nome começa com `eval_` e execute o programa novamente.



Para treinamento em simulação, consulte

https://github.com/Ekumen-OS/lekiwi/tree/main

https://github.com/SIGRobotics-UIUC/LeKiwi-sim



## Ajuda 🙋‍

Para problemas de hardware, entre em contato com o atendimento ao cliente. Para dúvidas de uso, entre no Discord.

[plataforma LeRobot](https://github.com/huggingface/lerobot)

[canal Discord do LeRobot](https://discord.gg/8TnwDdjFGU)

##   
  
Instalação do Miniconda no Mac

## Conceder permissões

![image – 25](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-24.png)

## Instalar o Miniconda

https://www.anaconda.com/download

## Alterando a fonte de pacotes do pip

```Shell
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple
```

## Alterando a fonte de pacotes do conda

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

