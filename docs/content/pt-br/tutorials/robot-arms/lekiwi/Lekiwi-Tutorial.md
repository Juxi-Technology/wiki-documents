---
title: "Tutorial de Uso do Robô Móvel Lekiwi"
description: "O braço ativo preto usa um adaptador de energia de 5V 6A, enquanto o braço passivo branco usa um adaptador de energia de 12V 5A"
---

# Tutorial de Uso do Robô Móvel Lekiwi

> **[Comprar na loja](https://www.juxitech.com/products/lekiwi-embodied-intelligence-mobile-robotic-car)**


O braço ativo preto usa um adaptador de energia de 5V 6A, enquanto o braço passivo branco usa um adaptador de energia de 12V 5A 

[lerobot-Lekiwi.zip]

O código deste repositório de tutorial é mantido na versão estável do Lerobot testada antes de 1º de março de 2026. Atualmente, o Hugging Face fez uma atualização muito significativa do Lerobot, adicionando um grande número de novos recursos. Se você quiser acompanhar o tutorial mais recente, siga a [documentação oficial](https://huggingface.co/docs/lerobot/lekiwi). 



[LeKiwi](https://github.com/SIGRobotics-UIUC/LeKiwi) é um projeto de carro-robô totalmente open source criado pela [SIGRobotics-UIUC](https://github.com/SIGRobotics-UIUC). Ele inclui arquivos detalhados de impressão 3D e guias de operação, e foi projetado para ser compatível com o framework de aprendizado por imitação [LeRobot](https://github.com/huggingface/lerobot/tree/main). Ele suporta o braço robótico SO101, possibilitando um processo completo de aprendizado por imitação.

[*As posições precisas dos componentes podem ser visualizadas no CAD online Fusion360*](https://a360.co/4k1P8yO)*.*

[Arquivo URDF](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)

Visualização online do URDF https://urdf.d-robotics.cc/

![imagem – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

## Principais recursos

1. **Open source e baixo custo**: o [LeKiwi](https://github.com/SIGRobotics-UIUC/LeKiwi) oferece uma solução de carro-robô open source de baixo custo.

2. **Integração com o LeRobot**: projetado especificamente para integração com a [plataforma LeRobot](https://github.com/huggingface/lerobot).

3. **Recursos de aprendizado abundantes**: oferece recursos de aprendizado open source abrangentes, incluindo guias de montagem e calibração, além de tutoriais sobre testes, coleta de dados, treinamento e implantação, para ajudar os usuários a começar rapidamente e desenvolver aplicações robóticas.

4. **Compatível com Nvidia**: pode ser usado em conjunto com o reComputer Mini J4012 Orin NX 16 GB. 

5. **Aplicação em múltiplos cenários**: adequado para as áreas de educação, pesquisa científica, produção automatizada e robótica, ajudando os usuários a realizar operações robóticas eficientes e precisas em diversas tarefas complexas.

A JUXI é responsável apenas pela qualidade do hardware em si. Os tutoriais são atualizados estritamente de acordo com a documentação oficial. Se você encontrar problemas de software ou de dependências de ambiente que realmente não consiga resolver, reporte-os prontamente à [plataforma LeRobot](https://github.com/huggingface/lerobot) ou ao [canal do LeRobot no Discord](https://discord.gg/8TnwDdjFGU).

**Atenção**

- Todos os servos do chassis do Lekiwi precisam de alimentação de 12V. Para usuários que usam um braço robótico de 5V, fornecemos um módulo conversor redutor de 12V para 5V. Observe que você precisará modificar o circuito por conta própria.

- Fonte de alimentação de 12V — se necessário, você pode selecionar essa opção no checkout. Se você já tiver uma fonte de 12V, basta converter a interface de saída de energia para um plugue CC 5521.

- O controlador Raspberry Pi e a câmera precisam ser comprados separadamente pela interface de pedido. 

## Lista de materiais (BOM)

## Ambiente inicial do sistema

**Para Ubuntu x86: **

- Ubuntu 22.04

- CUDA 12+

- Python 3.10

- Torch 2.6

**Para Jetson Orin:**

- Jetson JetPack 6.0

- Python 3.10

- Torch 2.3+

**Para Raspberry Pi: **

- Raspberry Pi 5 4G~16G 

### Configurar SSH

Depois de configurar o Raspberry Pi, você deve habilitar e configurar o [SSH](https://www.raspberrypi.com/news/coding-on-raspberry-pi-remotely-with-visual-studio-code/) (Secure Shell Protocol), para poder entrar no Raspberry Pi a partir do seu notebook sem conectar monitor, teclado e mouse a ele. Você pode [encontrar um ótimo tutorial aqui](https://www.raspberrypi.com/documentation/computers/remote-access.html#ssh). É possível entrar no Raspberry Pi pelo prompt de comando (cmd) ou, se você usar VSCode, pode usar [esta](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) extensão. 

## Guia de impressão 3D

### Componentes

Fornecemos arquivos STL imprimíveis para as seguintes peças impressas em 3D. Essas peças podem ser impressas em impressoras FDM de nível doméstico usando filamentos PLA genéricos. Nós as testamos na impressora Bambu Lab P1S. Para todos os componentes, basta carregá-los no bambuslicer, rotacioná-los e organizá-los automaticamente, habilitar os suportes recomendados e imprimir. 

### Parâmetros de impressão

Os arquivos STL fornecidos podem ser impressos diretamente em muitas impressoras FDM. A seguir estão as configurações testadas e recomendadas; outras configurações também podem funcionar. 

- Material: PLA+

- Diâmetro e precisão do bico: bico de 0,2 mm, altura da camada de 0,2 mm 

- Densidade de preenchimento: 15%

- Velocidade de impressão: 150 mm/s

- Se necessário, envie o G-code (arquivo fatiado) para a impressora e imprima 

# Instalar o LeRobot 

No seu Raspberry Pi: 

### 1. [Instalar o Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install): 

```Python
mkdir -p ~/miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm ~/miniconda3/miniconda.sh
```

### 2. Reiniciar o Shell

Copie e cole o seguinte comando no seu Shell:`source ~/.bashrc` ou, para usuários de Mac:`source ~/.bash_profile` ou `source ~/.zshrc` (se você usar zshell)

### 3. Criar e ativar um novo ambiente Conda para o LeRobot

```Python
conda create -y -n lerobot python=3.10
```

Em seguida, ative seu ambiente Conda (você precisa fazer isso toda vez que abrir o Shell para usar o LeRobot!): 

```Bash
conda activate lerobot
```

### 4. Clonar o LeRobot:

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. Instale o ffmpeg no seu ambiente:

Ao usar `miniconda`, instale `ffmpeg` no seu ambiente:

```PowerShell
conda install ffmpeg -c conda-forge
```

Normalmente isso instala o ffmpeg 7.X compilado com o codificador libsvtav1 para a sua plataforma. Se o libsvtav1 não for suportado (você pode verificar os codificadores suportados com `ffmpeg -encoders`), você pode: 

【Para todas as plataformas】Instale explicitamente o ffmpeg 7.X:

`conda install ffmpeg=7.1.1 -c conda-forge`

[Somente Linux] Instale as dependências de compilação do ffmpeg e compile o ffmpeg com suporte a libsvtav1 a partir do código-fonte, garantindo que o executável ffmpeg usado seja o correto, o que pode ser confirmado com `which ffmpeg`.

Se você encontrar o seguinte erro, também pode usar o comando acima para resolvê-lo. 

![5. Instale o ffmpeg no seu ambiente: – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

### 6. Instalar o LeRobot com as dependências de motores feetech:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install -e ".[lekiwi]"
```

### 7. Definir o tempo de conexão

Encontre o `config_lekiwi.py` no diretório `lerobot\src\lerobot\robots\lekiwi`

connection_time_s: int = 7200 # 也就是2小时

![7. Definir o tempo de conexão – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)



## C. Instalar o LeRobot em um notebook

Se você já instalou o LeRobot no seu notebook, pode pular esta etapa; caso contrário, siga os mesmos passos que fizemos no Raspberry Pi. 

> [!Tip] Usaremos com frequência o Prompt de Comando (cmd). Se você não estiver familiarizado com o uso do cmd ou quiser revisar o uso da linha de comando, pode consultar este: [Curso intensivo de linha de comando](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line)
> 
> 

No seu computador:

### 1. [Instalar o Miniconda](https://docs.anaconda.com/miniconda/install/#quick-command-line-install): 

### 2. Reiniciar o Shell

Copie e cole o seguinte comando no seu shell:`source ~/.bashrc` ou, para usuários de Mac:`source ~/.bash_profile` ou `source ~/.zshrc` (se você usar zshell)

![2. Reiniciar o Shell – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)

### 3. Criar e ativar um novo ambiente Conda para o LeRobot

```Bash
conda create -y -n lerobot python=3.10
```

Em seguida, ative seu ambiente Conda (você precisa fazer isso toda vez que abrir o Shell para usar o LeRobot!): 

```Bash
conda activate lerobot
```

### 4. Clonar o LeRobot: 

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. Instale o ffmpeg no seu ambiente:

Ao usar `miniconda`, instale `ffmpeg` no seu ambiente:

```PowerShell
conda install ffmpeg -c conda-forge
```

Normalmente isso instala o ffmpeg 7.X compilado com o codificador libsvtav1 para a sua plataforma. Se o libsvtav1 não for suportado (você pode verificar os codificadores suportados com `ffmpeg -encoders`), você pode: 

【Para todas as plataformas】Instale explicitamente o ffmpeg 7.X:

`conda install ffmpeg=7.1.1 -c conda-forge`

[Somente Linux] Instale as dependências de compilação do ffmpeg e compile o ffmpeg com suporte a libsvtav1 a partir do código-fonte, garantindo que o executável ffmpeg usado seja o correto, o que pode ser confirmado com `which ffmpeg`.

Se você encontrar o seguinte erro, também pode usar o comando acima para resolvê-lo. 

![5. Instale o ffmpeg no seu ambiente: – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/4.png)

### 6. Instalar o LeRobot com as dependências de motores feetech:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install -e ".[lekiwi]"
```

# Configurar o motor 

![6. Instalar o LeRobot com as dependências de motores feetech: – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/5.png)

![6. Instalar o LeRobot com as dependências de motores feetech: – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/6.png)

### **1. Encontre a porta USB associada ao braço robótico**

Para encontrar a porta correta de um único motor, execute o script de utilitário a seguir duas vezes:

```Bash
lerobot-find-port
```

Exemplo de saída (por exemplo, `/dev/tty.usbmodem575E0031751` no Mac ou `/dev/ttyACM0` no Linux):

Exemplo de saída (por exemplo, `/dev/tty.usbmodem575E0032081` no Mac ou `/dev/ttyACM1` no Linux):

Solução de problemas: no Linux, talvez seja necessário conceder acesso à porta USB com o seguinte comando:

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

### **2. Configure seu motor (produtos prontos podem pular esta etapa)**

Conecte cada motor do chassis em sequência e execute o script a seguir. Ele primeiro inicializa os servos do braço robótico (IDs 6..1) e depois os servos do chassis, definindo seus IDs para (IDs 9..7). Se você já calibrou o braço robótico, pode pressionar Enter repetidamente para sobrescrever e pular:

```Bash
lerobot-setup-motors \
    --robot.type=lekiwi \
    --robot.port=/dev/tty.usbmodem58760431551 # <- paste here the port found at previous step
```

![2. Configure seu motor produtos prontos podem pular esta etapa – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/8.png)

### 3. Configurar o mirror nacional do Hugging Face

- Ubuntu

```Shell
sudo nano ~/.bashrc

# 在文件末尾加入
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.bashrc
echo $HF_ENDPOINT

# 输出
# https://hf-mirror.com
```

- Mac

```Shell
sudo nano ~/.zshrc

# 在文件末尾加入
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.zshrc

# 输出
# https://hf-mirror.com
```

#### ① Criar token 

https://huggingface.co/settings/tokens

![① Criar token – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

![① Criar token – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

![① Criar token – 3](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)

#### ② Registrar o token

Por exemplo, o meu é:

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### ③ Vincular o token

```Shell
hf auth login

hf auth whoami
```

![③ Vincular o token – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/4.png)

#### ④ Criar repositório de dataset

**Registre o Owner e o nome do Dataset, que são o \<hf_username\> e o \<dataset_repo_id\> necessários adiante**

![④ Criar repositório de dataset – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/5.png)

![④ Criar repositório de dataset – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/6.png)

![④ Criar repositório de dataset – 3](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/8.png)

### 4. Atualize a configuração!!!

Os arquivos de configuração no LeKiwi LeRobot e no notebook devem ser consistentes. Primeiro, precisamos encontrar o **endereço IP** do Raspberry Pi do carro-robô móvel. É o mesmo endereço IP usado para o SSH. Também precisamos encontrar a **porta USB** da placa de acionamento de servos do braço ativo no notebook e a **porta da placa de acionamento de servos no LeKiwi**. Essas portas podem ser encontradas com o script a seguir.

No Linux, talvez seja necessário conceder acesso à porta USB executando o seguinte comando:

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

Observação importante: agora que você obteve o número da porta do braço ativo e o endereço IP do carro-robô LeKiwi, atualize **ip** na configuração de rede, atualize **port** na configuração do braço ativo e atualize **port, remote_ip** na configuração do LeKiwi.

Altere esses quatro arquivos no diretório example\\lekiwi

![4. Atualize a configuração!!! – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

#### ① Modificar teleoperate.py

remote_ip: endereço IP do Raspberry Pi

port: número da porta quando o braço ativo está conectado a um computador ou ao Linux

![① Modificar teleoperate.py – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

#### ② Modificar record.py

HF_REPO_ID: [nome de usuário e nome do dataset no Hugging Face](https://juxitech.feishu.cn/docx/DXtPd0iF1oO3aGxRChBcL3LSnFh?fromScene=spaceOverview#doxcnsAUzU1e1l6XIM07OE8grYg)

remote_ip: endereço IP do Raspberry Pi

port: número da porta quando o braço ativo está conectado a um computador ou ao Linux

![② Modificar record.py – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)

#### ③ Modificar replay.py

remote_ip: endereço IP do Raspberry Pi

\<hf_username\>/\<dataset_repo_id\>, ou seja, [o nome de usuário do Hugging Face e o nome do dataset](https://juxitech.feishu.cn/docx/DXtPd0iF1oO3aGxRChBcL3LSnFh?fromScene=spaceOverview#doxcnsAUzU1e1l6XIM07OE8grYg)

![③ Modificar replay.py – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/4.png)

## Calibração

Agora precisamos calibrar o braço ativo e o braço passivo. O servo de direção da roda omnidirecional não precisa de calibração.

### Calibrar o braço seguidor (montado na base do LeKiwi)

Execute o seguinte comando no seu computador para calibrar o braço ativo. Observação: a imagem mostrada aqui é um exemplo do modelo SO101.

```Bash
lerobot-calibrate \
    --teleop.type=so100_leader \
    --teleop.port=/dev/tty.usbmodem58760431551 \ #修改为找到的端口号
    --teleop.id=my_awesome_leader_arm
```

Agora execute o seguinte comando no seu Raspberry Pi para calibrar o braço escravo no LeKiwi. Ignore a posição atual dele na mesa — a calibração normal deve ser feita quando instalado no chassis do LeKiwi. 

```Bash
lerobot-calibrate \
    --robot.type=lekiwi \
    --robot.id=my_awesome_kiwi
```

Unificamos os métodos de calibração para a maioria dos robôs. Primeiro, precisamos mover o robô para uma posição em que cada articulação esteja no **ponto médio da faixa de movimento** e, em seguida, pressionar o botão. Depois, movemos todas as articulações por toda a faixa de movimento. Você pode [encontrar aqui](https://huggingface.co/docs/lerobot/en/so101#calibration-video)` Enter ` um vídeo do mesmo processo de calibração do SO101 como referência. 

# F. Operação remota

Abra um novo Prompt do Anaconda

![Calibrar o braço seguidor montado na base do LeKiwi – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/5.png)

> Se você estiver usando um Mac, talvez seja necessário conceder ao "Terminal" a permissão de acesso ao teclado para as operações remotas. Vá em "Ajustes do Sistema" \> "Privacidade e Segurança" \> "Monitoramento de Entrada" e marque a opção "Terminal". 
> 
> 

Para realizar as operações remotas, entre no seu Raspberry Pi via SSH e execute o comando a seguir para ativar o ambiente`conda activate lerobot`; em seguida, execute o script:

```Bash
python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

![Calibrar o braço seguidor montado na base do LeKiwi – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/6.png)

Em seguida, no seu notebook, execute também o comando a seguir para ativar o ambiente `conda activate lerobot` e então rode o script:

```Bash
python examples/lekiwi/teleoperate.py
```

A tela do seu notebook deve exibir uma interface semelhante a esta:`[INFO] Connected to remote robot at tcp://172.17.133.91:5555 and video stream at tcp://172.17.133.91:5556.`Agora você pode mover o braço de controle e usar as teclas (W, A, S, D) do teclado para controlar o robô: avançar, virar à esquerda, recuar e virar à direita. Use as teclas (Z, X) para controlar o robô virando à esquerda ou à direita. Use as teclas (R, F) para aumentar ou diminuir a velocidade do robô móvel. Há três modos de velocidade no total; consulte a tabela a seguir: 

Se você usar um teclado diferente, pode alterar as configurações de teclas de cada comando [`em LeKiwiClientConfig`](https://github.com/huggingface/lerobot/blob/main/src/lerobot/robots/lekiwi/config_lekiwi.py) . 

## Solução de problemas de falha de comunicação 

Se você encontrar problemas ao conectar ao robô móvel SO101, siga os passos abaixo para diagnosticar e resolver o problema. 

### 1. Verifique a configuração do endereço IP

Certifique-se de que o endereço IP correto do Raspberry Pi esteja definido no arquivo de configuração. Para verificar o endereço IP do Raspberry Pi, execute o seguinte comando (na linha de comando do Pi):

```Bash
hostname -I
```

### 2. Verifique se o notebook/PC consegue acessar o Pi

Tente dar ping no Raspberry Pi a partir do notebook: 

```Bash
ping <your_pi_ip_address>
```

Se o ping falhar: 

- Certifique-se de que o Pi esteja ligado e conectado à mesma rede. 

- Verifique se o SSH está habilitado no Pi. 

### 3. Tente a conexão SSH

Se você não conseguir entrar no Pi via SSH, pode ser uma conexão incorreta. Use o seguinte comando: 

```Bash
ssh <your_pi_user_name>@<your_pi_ip_address>
```

Por exemplo, `ssh pi@192.168.0.106`

Se ocorrer um erro de conexão: 

- Para garantir que o SSH esteja habilitado no Pi, você pode executar o seguinte comando: 

```Bash
sudo raspi-config
```

- Em seguida, navegue até:**Interfacing Options -\> SSH** e habilite-o.

### 4. Consistência dos arquivos de configuração!!!

Certifique-se de que os arquivos de configuração no notebook/PC e no Raspberry Pi sejam exatamente iguais. 

# G. Registrar dataset 

Depois de se familiarizar com a operação remota, você pode usar o LeKiwi para registrar seu primeiro dataset. 

Para iniciar o programa no LeKiwi, conecte-se ao seu Raspberry Pi via SSH e execute os comandos a seguir para ativar o ambiente e iniciar o script:

```Bash
conda activate lerobot

python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

Se você quiser usar o recurso do Hub do Hugging Face para enviar um dataset e ainda não fez login, certifique-se de entrar com um token que tenha permissão de escrita, o qual pode ser gerado nas [configurações do Hugging Face](https://huggingface.co/settings/tokens): 

```Bash
hf auth login
```

Salve o nome do seu repositório do Hugging Face em uma variável para executar o comando a seguir: 

```Bash
hf auth whoami
```

Em seguida, execute o seguinte comando no seu notebook para registrar 2 rodadas e enviar o dataset ao Hub: 

```Bash
python examples/lekiwi/record.py
```

# H. Visualizar o dataset

Se você enviou um dataset, pode [visualizar seu dataset online](https://huggingface.co/spaces/lerobot/visualize_dataset) e copiar e colar o ID do repositório gerado pelo seguinte comando: 

```Bash
echo *${HF_USER}*/my_lekiwi_dataset
```

Se você não enviou um dataset, também pode fazer a visualização localmente (a janela do navegador pode abrir a ferramenta de visualização em `http://127.0.0.1:9090`): 

```Bash
python lerobot/scripts/visualize_dataset_html.py \
  --repo-id *${HF_USER}*/lekiwi_test \
  --local-files-only 1
```

### Visualizar um dataset (opcional, pode ser tentado) 

```Bash
echo ${HF_USER}/my_lekiwi_dataset
```

Se você enviou um dataset, também pode visualizá-lo localmente com o seguinte comando: 

```Python
lerobot-dataset-viz \
  --repo-id ${HF_USER}/my_lekiwi_dataset \
```

Se você não enviou um dataset, também pode visualizá-lo localmente com o seguinte comando: 

```Python
lerobot-dataset-viz \
  --repo-id juxi/my_lekiwi_dataset \
```

Aqui, `juxi` é o nome personalizado do `repo_id` durante a coleta de dados. 



#### Técnicas de coleta de dados

Depois que você se familiarizar com o registro de dados, poderá criar datasets maiores para o treinamento. Uma boa tarefa inicial é agarrar objetos de posições diferentes e colocá-los em recipientes. Recomendamos registrar pelo menos 50 segmentos, com 10 segmentos para cada posição. Mantenha a posição da câmera fixa e mantenha ações de preensão consistentes durante todo o registro. Além disso, garanta que os objetos manipulados estejam claramente visíveis no quadro da câmera. Um critério simples é que você consiga concluir a tarefa apenas observando o feed da câmera. 

Nos capítulos a seguir, você treinará sua rede neural. Depois de obter um desempenho confiável de preensão, você pode começar a introduzir mais variações durante o processo de coleta de dados, como aumentar as posições de preensão, adotar técnicas diferentes de preensão e alterar as posições da câmera. 

Evite adicionar muitas mudanças de uma vez, pois isso pode afetar seus resultados. 

Se você quiser se aprofundar nesse tópico importante, confira nossa postagem no blog sobre o que torna um dataset excelente [.](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset)

#### Solução de problemas:

Em sistemas Linux, se as teclas de seta esquerda e direita e a tecla Esc não funcionarem durante a coleta de dados, certifique-se de que a variável de ambiente `$DISPLAY` esteja definida. Consulte as [limitações do pynput](https://pynput.readthedocs.io/en/latest/limitations.html#linux)

# I. Reproduzir uma rodada

Agora tente reproduzir a primeira rodada no seu robô:

```Bash
python examples/lekiwi/replay.py
```

Parabéns 🎉, seu robô está pronto para tarefas de aprendizado autônomo. Siga a seção de treinamento deste tutorial para começar a treiná-lo: [Introdução a robôs do mundo real](https://huggingface.co/docs/lerobot/il_robots)

## K. Avalie sua política

Certifique-se de alterar remote_ip, port e HF_MODEL_ID

#### Modificar evaluate.py

HF_MODEL_ID="\<hf_username\>/\<model_repo_id\>" deve ser alterado para o nome do dataset enviado ao Hugging Face após o treinamento (se tiver sido enviado ao Hugging Face) ou para o diretório onde o modelo foi exportado localmente após o treinamento

HF_DATASET_ID = "\<hf_username\>/\<eval_dataset_id\>" Altere para o nome de usuário e o nome do dataset eval_ que você criou

remote_ip: endereço IP do Raspberry Pi

![Modificar evaluate.py – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/8.png)

Em seguida, execute o seguinte comando: 

```Bash
python examples/lekiwi/evaluate.py
```

1. O nome do dataset começa com `eval` para refletir que você está executando inferência (por exemplo, `${HF_USER}/eval_act_lekiwi_test`). 

2. Se na fase de avaliação aparecer `File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'`, exclua primeiro a pasta que começa com `eval_` e execute o programa novamente. 



O treinamento em simulação pode consultar

https://github.com/Ekumen-OS/lekiwi/tree/main

https://github.com/SIGRobotics-UIUC/LeKiwi-sim



## Ajuda 🙋 

Para problemas de hardware, entre em contato com o atendimento ao cliente. Para problemas de uso, participe do Discord.

[LeRobot Platform](https://github.com/huggingface/lerobot)

[LeRobot Discord Channel](https://discord.gg/8TnwDdjFGU)

<RelatedProducts slugs="lekiwi,so-arm101,servo-driver-board" />
