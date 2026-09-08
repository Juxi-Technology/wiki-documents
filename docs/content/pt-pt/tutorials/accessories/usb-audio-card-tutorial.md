---
title: Tutorial da placa de som USB sem driver
description: "Tutorial da placa de som USB sem driver da Juxi Technology — software de teste visual, operações de linha de comando e depuração de áudio para Raspberry Pi, Jetson e PC."
---

# Tutorial da placa de som USB sem driver

> **[Comprar na loja](https://www.juxitech.com/pt-pt/products/usb-2-0-driver-free-sound-card-onboard-mic-speaker-for-ai-voice-interaction)**


# Software de teste visual (Windows)

[audio_tools.7z](https://juxitech.feishu.cn/wiki/NThUwAgW5iLyB3kEWzOcyO35nvW)

**Resumo dos comandos (opcional)**

- Atualize o sistema e instale as ferramentas:

    - Execute：`sudo apt update && sudo apt full-upgrade`

    - Instale o ALSA:`sudo apt install alsa-base alsa-utils`

- Hardware identificado:

    - Liste os dispositivos de áudio:`aplay -l`

    - Verifique os dispositivos de áudio PCI/USB:`lspci | grep -i audio`, `lsusb`

- Configuração básica e verificação: 

    - Execute o assistente de configuração:`sudo alsaconf`(se disponível)

    - Ajuste o volume:`alsamixer` (Pressione **M** para desmutar, use as teclas de seta para ajustar o volume e ESC para sair)

    - Salve as configurações:`sudo alsactl store`

    - Teste de reprodução: teste a saída de áudio (garanta que os alto-falantes/fones estejam conectados):

    ```Bash
    # Play test tone, -D specifies the USB sound card device (X is the card number displayed by aplay -l)
    speaker-test -c 2 -D plughw:X,0
    ```

    - Reinicie o serviço de áudio:`sudo systemctl restart alsa`(Alguns ambientes podem exigir reinicialização do sistema:`sudo reboot`)

# Controlador principal da série Jetson &amp; sistema Ubuntu &amp; Raspberry Pi

## Depuração por linha de comando

### 1. Conexão da placa de som USB

1. Antes de inserir a placa de som USB, usamos o comando `lsusb` para verificar os dispositivos USB:

![1. Conexão da placa de som USB – 1](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/1.png)

2. Em seguida, conecte a placa de som USB e use `lsusb` para verificar. Você pode ver que o dispositivo extra é a placa de som USB: 

![1. Conexão da placa de som USB – 2](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/10.png)

3. Em seguida, use `arecord -l` para listar todos os dispositivos de gravação. Como você pode ver, nosso dispositivo de placa de som USB 

![1. Conexão da placa de som USB – 3](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/2.png)

4. O uso de `aplay -l` pode listar todos os dispositivos de reprodução

![1. Conexão da placa de som USB – 4](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/3.png)

### 2. Uso da placa de som USB

`arecord -l`, por exemplo, aqui o UACDemoV1.0 é exibido, que é a nossa placa de som, card 0; device 0, e no comando, modifique-o para plughw:0,0 para especificar este dispositivo de gravação

![2. Uso da placa de som USB – 1](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/4.png)

Execute o comando de gravação integrado do Linux para gravar um som de 5 segundos para teste

`arecord -D plughw:0,0 -f S16_LE -r 16000 -d 5 -t wav test.wav`

Entre eles, `plughw:0,0` representa`card 0, device 0`, que é a nossa placa de som USB. Ele precisa ser modificado de acordo com o número do dispositivo encontrado por`arecord -l` . Se o seu UACDemoV1.0 for a nossa placa de som e exibir card 1; device 1, você precisa alterar`plughw:0,0`no comando para`plughw:1,1`. O parâmetro`plughw`fornece conversão automática de formato e pode fazer a ponte entre diferentes formatos de dados e hardware. Os outros parâmetros do arecord são os seguintes:

|Instrução|Significado |Significado desta instrução|
|---|---|---|
|-D|Selecionar nome do dispositivo|Usar a placa de som USB externa "plughw:1.0"|
|-f|Formato de gravação|S16_LE representa little-endian de 16 bits com sinal|
|-r|Taxa de amostragem|16000 é uma taxa de amostragem de 16KHz|
|-d|Duração da gravação|Gravar por 5 segundos|
|-t|Formato de gravação|Formato wav|
|test.wav|Nome do ficheiro, pode incluir um caminho|O nome do ficheiro é test.wav |

Se o som estiver muito baixo, digite o comando `alsamixer` para ajustar o volume, pressione `F6`, selecione a placa de som USB, 

![2. Uso da placa de som USB – 2](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/5.png)

Em seguida, pressione `F5`, exibindo os dispositivos de gravação e reprodução; aumentamos o volume de gravação pressionando a tecla para cima; PCM é para reprodução e CAPTURE MIC é para gravação 

![2. Uso da placa de som USB – 3](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/6.png)

Em seguida, use o comando `aplay` para reproduzir

`aplay -D plughw:0,0 -f S16_LE -r 16000 -c 1 test.wav`

As descrições dos parâmetros são as seguintes:

- -D plughw:0,0: especifica o dispositivo de gravação. plughw:0,0 indica o uso do primeiro dispositivo da primeira placa de som.

- -f S16_LE: define o formato do ficheiro de áudio. S16_LE representa o formato little-endian de 16 bits com sinal (Signed 16-bit Little Endian), um formato de dados de áudio comumente usado, onde "little endian" significa que o byte de ordem baixa dos dados é armazenado no endereço baixo da memória.

- -r 16000: define a taxa de amostragem.

- -c 1: define o número de canais.

- -d 5: define a duração da gravação/segundos.



## Visualizar a janela de visualização do PulseAudio

![Visualizar a janela de visualização do PulseAudio – 1](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/7.png)

Visualize via PulseAudio, método de [linha de comando](https://so.csdn.net/so/search?q=%E5%91%BD%E4%BB%A4%E8%A1%8C&spm=1001.2101.3001.7020) 

`pactl list sources short`            # Lists all available audio sources in the current PulseAudio audio server

![Visualizar a janela de visualização do PulseAudio – 2](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/8.png)

> 49 representa o índice da fonte
> 
> Alsa _input.usb indica que este é um dispositivo de entrada USB, representando um microfone
> 
> s16le representa o formato de amostra de áudio little-endian de 16 bits com sinal (Signed 16-bit Little Endian).
> 
> 1ch representa mono.
> 
> 48000Hz é a taxa de amostragem, indicando 48000 amostras por segundo
> 
> SUSPENDED indica que o microfone atual está suspenso 
> 
> RUNNING indica que o microfone está em uso
> 
> 



## Python chamando a placa de som USB sem driver

Procure exemplos de código por conta própria, como pesquisar "[Python chamando placa de som USB sem driver](https://blog.csdn.net/weixin_44463519/article/details/157463731?spm=1001.2101.3001.6650.3&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EYuanLiJiHua%7ECtr-3-157463731-blog-105694458.235%5Ev43%5Epc_blog_bottom_relevance_base9&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EYuanLiJiHua%7ECtr-3-157463731-blog-105694458.235%5Ev43%5Epc_blog_bottom_relevance_base9&utm_relevant_index=4)"



## Resumo de problemas

### Jetson

1. Problema de ocupação do dispositivo

![Jetson – 1](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/9.png)

Feche a página de configurações e execute novamente o comando

Se ainda não funcionar, tente reconectar ou reiniciar



Verifique qual processo está ocupando o dispositivo de áudio 

`sudo lsof /dev/snd/*`

Antes de conectar a placa de som 

![Jetson – 2](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/1.png)

Depois de conectar a placa de som 

![Jetson – 3](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/10.png)

Encerre o processo com `kill -9 PID` , onde PID é o PID que aparece após conectar a placa de som e, na captura de ecrã, é 33739 

Em seguida, regrave e reproduza



### Raspberry Pi 

1. Problema de ruído relativamente alto

Primeiro, defina o volume do microfone para 100
Abra o terminal 

```Bash
$ sudo vi /boot/config.txt    #Or it may be in /boot/firmware/config.txt
```

Adicione no final do texto

```Bash
audio_pwm_mode = 2
```

Pressione ESC, digite: wq para sair e salvar
Em seguida, reinicie

```Bash
$ reboot
```

2. Cada reinicialização inicializa as configurações de volume.

Após redefinir o volume, 

é necessário salvar a configuração de volume atual no ficheiro de configuração padrão do sistema

Execute o seguinte comando para persistir as configurações atuais

```Python
sudo chmod 664 /var/lib/alsa/asound.state
sudo alsactl store
```

### Máquina virtual Ubuntu

1. Há ruído e interferência durante a gravação

Solução: altere a compatibilidade do controlador USB para 3.0 ou 3.1 





# RDK x3&amp;x5

## Ver o número do dispositivo

Verifique se a placa de som existe e confirme o número do dispositivo. 

Confirme se a placa de som está registrada por meio do comando `cat /proc/asound/cards`

```Shell
0 [duplexaudio    ]: simple-card - duplex-audio
                      duplex-audio
```

Confirme o dispositivo lógico por meio do comando `cat /proc/asound/devices`

```Shell
root@ubuntu:~# cat /proc/asound/devices
  2: [ 0- 0]: digital audio playback
  3: [ 0- 0]: digital audio capture
  4: [ 0]   : control
 33:        : timer
```

Verifique os ficheiros de dispositivo reais no espaço do utilizador por meio do comando `ls /dev/snd/`

```Shell
root@ubuntu:~# ls /dev/snd/
by-path/   controlC0  pcmC0D0c   pcmC0D0p   timer    
```

Por meio da consulta acima, pode-se confirmar que a placa de som 0 corresponde à placa de som integrada; o dispositivo também existe e seu número de dispositivo é `0-0`. Na verdade, os dispositivos que operamos devem ser `pcmC0D0p` e `pcmC0D0c`.

## Gravar um som de 5 segundos para teste

`arecord -D plughw:0,0 -f S16_LE -r 16000 -d 5 -t wav test.wav`

Entre eles, `plughw:0,0` representa`card 0, device 0`, que é a nossa placa de som USB; o parâmetro`plughw`fornece conversão automática de formato e pode fazer a ponte entre diferentes formatos de dados e hardware. Os outros parâmetros do arecord são os seguintes:

|Instrução|Significado |Significado desta instrução|
|---|---|---|
|-D|Selecionar nome do dispositivo|Usar a placa de som USB externa "plughw:1.0" |
|-f|Formato de gravação|S16_LE representa little-endian de 16 bits com sinal|
|-r|Taxa de amostragem|16000 é uma taxa de amostragem de 16KHz|
|-d|Duração da gravação|Gravar por 5 segundos|
|-t|Formato de gravação|Formato wav|
|test.wav|Nome do ficheiro, pode incluir um caminho|O nome do ficheiro é test.wav |

Se o som estiver muito baixo, digite o comando `alsamixer` para ajustar o volume, pressione `F6`, selecione a placa de som USB, 

![Gravar um som de 5 segundos para teste – 1](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/2.png)

Em seguida, pressione `F5`, exibindo os dispositivos de gravação e reprodução; aumentamos o volume de gravação pressionando a tecla para cima; PCM é para reprodução e CAPTURE MIC é para gravação 

![Gravar um som de 5 segundos para teste – 2](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/3.png)

Em seguida, use o comando `aplay` para reproduzir

`aplay -D plughw:0,0 -f S16_LE -r 16000 -c 1 test.wav`

As descrições dos parâmetros são as seguintes:

- -D plughw:0,0: especifica o dispositivo de gravação. plughw:0,0 indica o uso do primeiro dispositivo da primeira placa de som.

- -f S16_LE: define o formato do ficheiro de áudio. S16_LE representa o formato little-endian de 16 bits com sinal (Signed 16-bit Little Endian), um formato de dados de áudio comumente usado, onde "little endian" significa que o byte de ordem baixa dos dados é armazenado no endereço baixo da memória.

- -r 16000: define a taxa de amostragem.

- -c 1: define o número de canais.

- -d 5: define a duração da gravação/segundos.

## Perguntas frequentes 

### Como a placa RDK diferencia entre placas de som USB e placas de som integradas?

### Como a placa filha de áudio da série RDK X3 pode coexistir e ser usada simultaneamente com uma placa de som USB?

### Como a RDKS100 suporta o uso de funções de áudio por meio de uma interface gráfica?

Consulte [Processamento multimídia e aplicações RDK](https://developer.d-robotics.cc/rdk_doc/FAQ/multimedia#usb-%E5%A3%B0%E5%8D%A1%E5%92%8C%E6%9D%BF%E8%BD%BD%E5%A3%B0%E5%8D%A1%E5%A6%82%E4%BD%95%E5%8C%BA%E5%88%86%E4%BD%BF%E7%94%A8)





# Verificação do driver de áudio mais básico

Se uma placa de som USB sem driver pode ser usada **depende, em última análise, do kernel** 

- Se o suporte a USB Audio Class (ou seja, `CONFIG_USB_AUDIO`) está habilitado;

- Se o módulo de kernel correspondente (como `snd-usb-audio`) está carregado?

Desde que o kernel ofereça suporte, basta instalar as ferramentas básicas de áudio para usá-la normalmente; se o kernel tiver sido reduzido, é necessário recompilar o kernel para habilitar o driver. 

**Etapa 1: verificar se o kernel suporta snd_usb_audio **

```Plain Text
*# **Method 1: Check whether the driver module has been loaded*
lsmod | grep snd_usb_audio

*# **Method 2: Check if the module is built into the kernel (even if not loaded)*
modinfo snd_usb_audio  *# **Output exists = Kernel support; No output = The module is not compiled into the kernel*
```

**Se `modinfo`**: indica que o kernel do sistema removeu esse driver, e o kernel precisa ser recompilado. Habilite-o em `.config`: 

```Plain Text
CONFIG_SND_USB_AUDIO=m  # Compile as a module, or =y to build into the kernel
CONFIG_SND_USB_UA101=y
CONFIG_SND_USB_CAIAQ=y
```

**Se `modinfo`**: carregue o módulo diretamente: 

```Bash
sudo modprobe snd_usb_audio
```

#### Etapa 2: instalar as ferramentas básicas de áudio (não incluídas por padrão na versão Lite) 

O sistema reduzido geralmente não possui `alsa-utils` e ferramentas semelhantes, que precisam ser instaladas manualmente: 

```Bash
# Ubuntu/Debian
sudo apt update && sudo apt install -y alsa-utils usbutils

# Offline environment: Download the alsa-utils offline package and install it with dpkg -i
```

#### Etapa 3: verificar o reconhecimento e o funcionamento da placa de som USB

1. Insira a placa de som USB e execute o comando para confirmar o reconhecimento do dispositivo:

```Bash
# View USB device enumeration
lsusb | grep -i audio

# View the audio device list
aplay -l
```

O aparecimento de entradas `card X` relacionadas a `USB Audio` na saída indica reconhecimento bem-sucedido. 

2. Teste a saída de áudio (garanta que os alto-falantes/fones estejam conectados):

```Bash
# Play test tone, -D specifies the USB sound card device (X is the card number displayed by aplay -l)
speaker-test -c 2 -D plughw:X,0
```

#### Etapa 4: (Opcional) instalar o serviço de áudio (para necessidades de reprodução em desktop/segundo plano) 

Se você precisar reproduzir áudio em segundo plano ou usá-lo com um ambiente de desktop, a versão Lite requer a instalação adicional de serviços de áudio: 

```Bash
# Lightweight Service (Recommended, usable without a desktop environment)
sudo apt install -y pulseaudio

# or PipeWire (Recommended for Ubuntu 22.04 and above)
sudo apt install -y pipewire pipewire-alsa
```

### Armadilhas comuns e soluções do sistema da versão Lite

**1. Permissões insuficientes: utilizadors comuns não podem acessar a placa de som**

Solução: adicione o utilizador ao grupo `audio`, o que terá efeito após reiniciar: 

```Bash
sudo usermod -aG audio $USER
```

2.** Sem som, mas o reconhecimento do dispositivo está normal **

Solução: use `alsamixer` para aumentar o volume e desmutar (pressione a tecla `M` para desmutar): 

```Bash
alsamixer -c X  # X refers to the card number of the USB sound card
```

3.** Quando a versão do kernel é muito antiga e não suporta a nova placa de som USB, aplicam-se os dois cenários a seguir **

```Bash
sudo apt install -y linux-generic && sudo reboot
```

```Python
sudo modprobe snd-hda-intel model=generic #(Different models can try different model values)
# Create the sound card driver configuration file
sudo echo "options snd-hda-intel model=generic" > /etc/modprobe.d/sound.conf
sudo reboot
```






