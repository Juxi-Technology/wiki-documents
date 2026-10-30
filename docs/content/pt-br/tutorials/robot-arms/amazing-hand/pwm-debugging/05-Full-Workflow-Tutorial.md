---
title: "AmazingHand PWM — Mão hábil: tutorial de uso completo"
description: "Tutorial completo da versão AmazingHand PWM, do firmware PWM do ESP32-S3 e dos comandos de gesto do computador host ao rastreamento de gestos pela GUI / dora."
---

# AmazingHand PWM — Mão hábil: tutorial de uso completo

> **Pacote de entrega:** [delivery_package.zip](/downloads/delivery_package.zip)


> Do **comando de gesto no computador host** ao **rastreamento de gestos**: um tutorial completo.
> Hardware aplicável: ESP32-S3 + 8 canais de servomotores PWM (acionamento diferencial).
>
> Versão: 2026-08-20 · Firmware correspondente: versão componentizada ESP-IDF (`AmazingHand_Serial`)

---

## Capítulo 0: Navegação do tutorial

Este tutorial está organizado em **ordem sequencial**. Primeiro identifique qual rota você vai seguir e depois pule para o capítulo correspondente.

| Rota | Finalidade | Pré-requisitos | Capítulos |
|------|------|----------|------|
| **A. Comandos de gesto do computador host** | Clicar em botões/digitar comandos para a mão mecânica fazer gestos (pedra/tesoura/papel/joia…) | Python + firmware gravado | Capítulos 1-4 |
| **B. Rastreamento de gestos integrado à GUI** | A câmera acompanha os movimentos da mão e a mão mecânica os reproduz em tempo real (versão simplificada, sem IK) | A + Python de 64 bits + mediapipe | Capítulos 1-4 + 5.1 |
| **C. Rastreamento IK oficial com dora** | Cadeia completa oficial: câmera → IK → 8 ângulos de junta → servomotores (versão completa) | A + Rust + uv + dora | Capítulos 1-4 + 5.2 |

**Rotas recomendadas**:
- Primeira utilização → siga a **A** e confirme primeiro que o firmware e a fiação estão corretos.
- Para ver rapidamente a câmera seguindo a mão → siga a **B** (leve, instala em poucos minutos).
- Para um rastreamento formal e completo → siga a **C** (cadeia oficial, maior precisão).

As três rotas compartilham o mesmo hardware; apenas a **rota C** exige a instalação adicional de Rust/uv/dora no ambiente.

---

## Capítulo 1: Preparação do ambiente

Instale na ordem indicada. **As rotas A/B precisam apenas da seção 1.1; a rota C também precisa da seção 1.2.**

### 1.1 Ambiente do computador host (necessário para as rotas A/B)

#### ① Python 3.12 de 64 bits

> **É obrigatório usar 64 bits**. O mediapipe 0.10.14 só oferece wheel de 64 bits para Windows; não é possível instalá-lo em 32 bits;
> esta também é uma causa comum de a GUI fechar sozinha ao clicar duas vezes.

- Recomendado instalar em `D:\Python312-64bit` (este caminho já existe neste computador).
- Durante a instalação, marque **Add to PATH**.
- Verificação (64 bits):

```bash
py -3.12-64 -c "import sys; print('64bit' if sys.maxsize > 2**32 else '32bit')"
# 输出: 64bit
```

#### ② Instalar as dependências do computador host

Diretório raiz do projeto (o diretório que contém `hand_gui.py`):

```bash
pip install -r requirements.txt     # 只需 pyserial
```

#### ③ Dependências adicionais de rastreamento (para a rota B)

Execute no diretório raiz do projeto:

```bash
setup_tracking.bat
```

Ele faz automaticamente: localiza o Python de 64 bits → cria o ambiente virtual `tracking_env` → instala o `requirements-tracking.txt`
(mediapipe==0.10.14, numpy<2, scipy, opencv, Pillow, pyserial) → valida o mediapipe.

> Ou instale manualmente:
> ```bash
> D:\Python312-64bit\python.exe -m pip install -r requirements-tracking.txt
> ```

### 1.2 Ambiente IK oficial do dora (necessário para a rota C)

**Instalação pelo cliente**: clique duas vezes em `..\02_hand_tracking\Demo\Windows_Scripts_CN\1-安装环境.bat` (a versão em inglês é `..\02_hand_tracking\Demo\Windows_Deploy_Scripts\1-Install_Env.bat`); ele instala automaticamente todas as dependências:
cadeia de ferramentas Rust, uv (gerenciador de pacotes Python) e dora-cli.

> Após a instalação, **feche o terminal e abra-o novamente** uma vez para que o PATH tenha efeito.
> As dependências detalhadas (versões, modo de instalação manual) estão no documento de manutenção; o cliente não precisa lidar com isso.

---

## Capítulo 2: Ligação do hardware

### 2.1 Lista de hardware

| Hardware | Descrição |
|------|------|
| Placa de desenvolvimento ESP32-S3 | YX-ESP32-S3 ou equivalente |
| 8 canais de servomotores PWM | Servomotores analógicos, acionamento diferencial |
| Placa adaptadora de servomotores | Servomotores → 8 saídas PWM |
| Fonte de alimentação 5V independente | **Pelo menos 5V 3A**; os servomotores têm correntes transitórias altas |
| Cabo USB de dados | ESP32-S3 Type-C → PC |
| Câmera | Câmera integrada ou USB (para rastreamento) |

### 2.2 Mapeamento de GPIO

PWM1-8 da placa adaptadora → GPIO do ESP32-S3:

| Placa adaptadora | GPIO | Dedo |
|--------|------|------|
| PWM1 | 4 | Junta 1 do indicador |
| PWM2 | 5 | Junta 2 do indicador |
| PWM3 | 6 | Junta 1 do médio |
| PWM4 | 7 | Junta 2 do médio |
| PWM5 | 15 | Junta 1 do anelar |
| PWM6 | 16 | Junta 2 do anelar |
| PWM7 | 17 | Junta 1 do polegar |
| PWM8 | 18 | Junta 2 do polegar |

> **As mãos esquerda e direita compartilham o mesmo conjunto de GPIO**. A troca entre esquerda/direita é feita por software (Capítulo 4), sem alterar a fiação.

### 2.3 Requisitos de alimentação

- Alimente os servomotores com uma **fonte de 5V independente** (pelo menos 3A); não dependa apenas da alimentação USB.
- Os picos de corrente momentâneos dos servomotores podem reiniciar o ESP32 (sintoma: o ESP32 reinicia repetidamente). Nesse caso, **desligue e religue** o ESP32.

### 2.4 Passos de ligação

1. 8 servomotores → PWM1-8 da placa adaptadora
2. Placa adaptadora → GPIO correspondente do ESP32-S3 (tabela acima)
3. ESP32-S3 Type-C → PC
4. Câmera conectada ao PC (para rastreamento)

> Para a fiação/diagrama de circuito detalhado, consulte o diretório `ESP32开发板电路图/`.

---

## Capítulo 3: Pré-requisito: gravação do firmware

> Para que os servomotores respondam, o firmware deve ser gravado primeiro. O firmware está em `esp-idf\AmazingHand_Serial\`.

### 3.1 Compilação da versão ESP-IDF (recomendada)

Abra o projeto `AmazingHand_Serial` no Espressif IDE:

1. Definir o chip de destino (na primeira vez):
   ```
   idf.py set-target esp32s3
   ```
2. Compilar:
   ```
   idf.py build
   ```
3. Gravar (no Windows, use a porta COM, por exemplo COM3):
   ```
   idf.py -p COM3 flash
   ```

### 3.2 Verificação após a gravação

Monitoramento serial (taxa de transmissão **115200**):

```
idf.py -p COM3 monitor
```

Você deve ver o log de inicialização:

```
AmazingHand Serial Control Ready (ESP-IDF)
Protocol: 115200-8N1 [0xAA CMD LEN DATA CKSUM]
```

> A taxa de transmissão serial já é configurada de forma unificada pelo firmware/scripts (115200); o cliente não precisa configurá-la manualmente.

> Observação: normalmente o firmware já está gravado quando o dispositivo é entregue; esta etapa só é necessária para firmware novo/nova gravação.

---

## Capítulo 4: Primeira execução: comandos de gesto do computador host

> Pré-requisitos: firmware gravado (Capítulo 3), ESP32 ligado e cabo serial conectado. Verifique primeiro no Gerenciador de Dispositivos qual é a porta COM.

### 4.1 GUI visual (recomendada)

#### Modo A: executar o exe empacotado

Clique duas vezes em `dist/AmazingHand控制台.exe` (**sem rastreamento**; o rastreamento exige o modo a partir do código-fonte).

#### Modo B: executar a partir do código-fonte

```bash
# 项目根目录,先激活追踪环境(装了 mediapipe)或任意带 pyserial 的 Python
tracking_env\Scripts\python hand_gui.py
```

#### Passos de uso da GUI

1. **Selecione a porta serial**: no menu suspenso superior, escolha a porta COM do ESP32.
2. **Clique em «Conectar»**: a luz de status fica verde, o log mostra "conectado" e um teste de link NOP é enviado automaticamente.
3. **Comandos de gesto**: clique em «pedra», «tesoura», «papel», «joia», «OK», «pinça», «apontar» etc.; a mão mecânica executa o gesto.
4. **Mão esquerda/direita**: marque «direita»/«esquerda» para alternar a direção espelhada do polegar.
5. **Acionamento direto dos servomotores**: arraste os 8 controles deslizantes para controlar em tempo real o ângulo de cada servomotor (0-180°).
6. **Controle diferencial dos dedos** (recomendado): duas barras de progresso por dedo — «Curvar◀▶Esticar» em diferencial inverso, «Oscilar à direita◀▶Oscilar à esquerda» no mesmo sentido. Os dois graus de liberdade são independentes e acionados em sincronia.
7. **Repetir/Parar**: repete o último gesto / interrompe imediatamente.
8. **Log de comunicação**: a parte inferior mostra em tempo real os quadros enviados e recebidos e as respostas.

### 4.2 Teste por linha de comando (serial_test.py)

Diretório raiz do projeto:

```bash
# 链路测试(先确认能通)
python serial_test.py COM3 nop

# 手势
python serial_test.py COM3 rock         # 石头
python serial_test.py COM3 thumbs_up    # 真棒
python serial_test.py COM3 index        # 指向
python serial_test.py COM3 open         # 张开
python serial_test.py COM3 close        # 握拳

# 单舵机直驱
python serial_test.py COM3 servo 1 90   # 舵机1 → 90°

# 全部归中
python serial_test.py COM3 mid

# 设左右手
python serial_test.py COM3 hand L
python serial_test.py COM3 hand R

# 扫频/自检
python serial_test.py COM3 sweep 1      # 舵机1 扫频
python serial_test.py COM3 test         # 全部舵机逐个测试
```

### 4.3 Verificação

- Após clicar em um gesto, os servomotores devem executar a ação correspondente; o log serial retorna `ACK` e `DONE`.
- Códigos de resposta: `0x00=OK`, `0x01=comando inválido`, `0x02=erro de parâmetro`, `0x03=ocupado`, `0x10=concluído`.
- Se os servomotores não se moverem de forma alguma: veja as perguntas frequentes no Capítulo 6 (verifique primeiro a alimentação/porta serial).

> A referência rápida completa dos comandos de gesto e do protocolo serial está no Capítulo 7.

---

## Capítulo 5: Tutorial avançado: rastreamento de gestos

> Pré-requisitos: Capítulos 1-4 concluídos (firmware gravado, controle pela porta serial funcionando, câmera posicionada).
> Este capítulo tem dois caminhos; escolha um deles.

### 5.1 Rastreamento integrado à GUI (versão leve)

**Indicado para**: demonstrações rápidas, sem precisar instalar o dora. Câmera → mapeamento direto para os servomotores diferenciais, sem IK.

#### Pré-requisitos

- Python de 64 bits + `setup_tracking.bat` (seção 1.1).
- Câmera disponível.

#### Execução

```bash
# 项目根目录,用追踪环境启动 GUI
tracking_env\Scripts\python hand_gui.py
```

1. Selecione a porta serial → «Conectar».
2. Role até o painel «Rastreamento de gestos (câmera MediaPipe)».
3. Selecione o número da câmera (padrão 0) → clique em «Iniciar rastreamento».
4. Coloque a mão no quadro; a mão mecânica acompanha a flexão/extensão da mão.

#### Princípio

- O mediapipe 0.10.14 extrai vetores 3D das pontas dos 4 dedos (no sistema de coordenadas da mão).
- A função `tips_to_angles()` de `hand_tracking.py` mapeia cada dedo para um ângulo diferencial:
  - flex (curvar/esticar): os três dedos usam a componente z; o polegar usa a componente y;
  - base (oscilação lateral): fixo em 90 (a oscilação lateral ainda não foi implementada).
- A GUI tem suavização EMA integrada (alpha=0.4) + limitação de 60ms, para evitar tremores.

#### Limitações

- **Sem IK**: as pontas dos dedos são mapeadas diretamente para ângulos; a precisão não é tão boa quanto a da cadeia oficial.
- **Oscilação lateral adiada**: base fixo em 90, sem oscilação lateral.
- Indicado para demonstração/prototipagem; para uso formal, recomenda-se a seção 5.2.

### 5.2 Rastreamento IK oficial com dora (versão completa)

**Indicado para**: uso formal. Cadeia oficial: câmera → mediapipe → IK MuJoCo+mink → 8 ângulos de junta → AHControl (Rust) → ESP32 → servomotores PWM.

#### Pré-requisitos

- Ambiente completo (Rust + uv + dora, seção 1.2).
- Firmware gravado (Capítulo 3).
- O yml do fluxo de dados já define a taxa de transmissão PWM (115200); não é preciso alterá-la manualmente.

#### Primeiro passo: implantação (script tudo-em-um recomendado)

Clique duas vezes em `..\02_hand_tracking\Demo\Windows_Scripts_CN\3-部署代码.bat` (a versão em inglês é `..\02_hand_tracking\Demo\Windows_Deploy_Scripts\3-Deploy_Demo.bat`); ele faz automaticamente:
cria o ambiente Python, compila o AHControl (Rust) e instala o AHSimulation/HandTracking (mediapipe).

> A primeira implantação leva alguns minutos. O script já trata das variáveis de ambiente; não é preciso configurá-las manualmente.

#### Segundo passo: execução

Clique duas vezes em `..\02_hand_tracking\Demo\Windows_Scripts_CN\4-运行代码.bat` (a versão em inglês é `..\02_hand_tracking\Demo\Windows_Deploy_Scripts\4-Run_Demo.bat`) e escolha no menu:

```
1 - 模拟仿真（摄像头手势追踪）
2 - 真实硬件（SCS0009 总线舵机）
3 - PWM 舵机（ESP32 直驱）   ← 选 3
```

Em seguida, escolha o tipo de mão: `1 右手` / `2 左手`. O script executa automaticamente `dora build` + `dora run`.

- A janela da câmera abre; coloque a mão no quadro → os dedos da simulação 3D acompanham → a mão mecânica acompanha.
- Parar: Ctrl+C (ou fechar a janela).

#### Alternância entre mão esquerda e direita

Basta escolher o tipo de mão no menu de execução (segundo passo da seção 5.2): selecione `1 右手` ou `2 左手`.

> Após a troca, o script reconstrói automaticamente o fluxo de dados correspondente; aguarde a conclusão da compilação antes de fazer qualquer coisa em frente à câmera.

#### Como ler os logs de execução

Na janela de execução, o nó AHControl gera logs continuamente. Preste atenção nesta linha:

```
[ACK-STATS] sent N frames, ESP32 acked M frames
```

- `M ≈ N` (por exemplo, `sent 300 frames, ESP32 acked 300 frames`) → normal, o ESP32 recebeu todos os quadros.
- `M = 0` → o ESP32 não recebeu dados; verifique a porta serial/alimentação (veja o Capítulo 6).

Enquanto essa linha estiver crescendo normalmente, a cadeia dos servomotores está funcionando; o que resta é saber se a câmera consegue acompanhar.

---

## Capítulo 6: Perguntas frequentes (durante a execução)

> Esta seção lista apenas os problemas **mais comuns e que você mesmo consegue resolver** durante o uso. Localize rapidamente pelo sintoma.

### 6.1 Os servomotores não se movem de forma alguma

Verifique na ordem:

1. **Alimentação**: os servomotores estão ligados a uma fonte independente (5V 3A ou mais)? Se dependerem apenas do USB, os servomotores podem não se mover ou o ESP32 pode reiniciar repetidamente. → Desligue e religue o ESP32.
2. **Porta serial**: a porta COM está correta? No Gerenciador de Dispositivos → Portas (COM e LPT), veja a porta correspondente ao ESP32. Há outro programa (como um assistente serial) usando a porta? → Feche o programa que a estiver usando.
3. **Fiação**: os PWM1-8 da placa adaptadora estão ligados aos GPIO corretos? Os fios de sinal dos servomotores estão bem conectados?

### 6.2 A câmera não mostra imagem

- Na primeira execução no Windows, aparece uma solicitação de permissão da câmera → clique em «Permitir».
- Se você escolheu "Não" anteriormente: Configurações → Privacidade e segurança → Câmera → Permitir que aplicativos da área de trabalho acessem a câmera, e execute novamente.

### 6.3 A câmera mostra imagem, mas a mão não acompanha / acompanha com atraso

- Confirme que a câmera está **de frente** para a mão, com iluminação suficiente e a mão totalmente visível no quadro.
- Mova-se mais devagar e com maior amplitude. Movimentos muito rápidos ou de amplitude pequena podem fazer o rastreamento perder o ritmo.
- Os dedos se movem na janela da simulação 3D?
  - **Sim**: a cadeia de rastreamento está normal; o problema está nos servomotores/porta serial; veja 6.1.
  - **Não**: o nó de rastreamento não reconheceu a mão; ajuste a pose/iluminação e tente novamente.

### 6.4 Tipo de mão invertido / direção do polegar invertida

- Você selecionou a mão esquerda/direita errada? Selecione o tipo de mão correto no menu de execução.
- Na GUI do computador host, marque «direita»/«esquerda» para alternar.

### 6.5 A troca de mão esquerda/direita não faz efeito

- Após trocar o tipo de mão, o `dora` precisa reconstruir o fluxo de dados: depois de escolher o tipo de mão no menu de execução, o `dora build` é executado automaticamente; basta aguardar a conclusão.

### 6.6 A imagem congela / o log para durante a execução

- É possível que a câmera esteja sendo usada por outro aplicativo (videoconferência, outro script); feche-o e tente novamente.
- Ou pressione `Ctrl+C` para parar e execute novamente.

### 6.7 Após trocar a porta USB / reiniciar o computador, a porta serial não é encontrada

- O número da porta COM pode ter mudado. Confirme o novo número COM no Gerenciador de Dispositivos, execute novamente `2-配置串口.bat` (ou `2-Setup_Serial.bat`) e selecione a porta uma vez, depois execute.

### 6.8 Ainda não funciona?

- Envie ao responsável pela manutenção uma captura de tela dos logs do terminal de execução, explicando: em qual etapa, qual operação e qual fenômeno foi observado.
- Logs principais: a linha `[CONFIG]` na inicialização e a linha `[ACK-STATS]` durante a execução (se o M em `ESP32 acked M frames` está próximo de N).

---

## Capítulo 7: Referência rápida de comandos (apêndice)

> A descrição completa do protocolo está em `用户手册.md`, no mesmo diretório. Aqui está a tabela de referência rápida.

### 7.1 Comandos de gesto

| Gesto | HEX | ACK | DONE |
|------|-----|-----|------|
| NOP | `AA 00 00 00` | `BB 00 00 00` | — |
| Pedra | `AA 01 00 01` | `BB 01 00 01` | `BB 01 10 11` |
| Tesoura | `AA 02 00 02` | `BB 02 00 02` | `BB 02 10 12` |
| Papel | `AA 03 00 03` | `BB 03 00 03` | `BB 03 10 13` |
| Joia | `AA 04 00 04` | `BB 04 00 04` | `BB 04 10 14` |
| Provocação 1 (agitar o indicador) | `AA 05 00 05` | `BB 05 00 05` | `BB 05 10 15` |
| Provocação 2 (anelar) | `AA 06 00 06` | `BB 06 00 06` | `BB 06 10 16` |
| Abrir | `AA 07 00 07` | `BB 07 00 07` | `BB 07 10 17` |
| Punho fechado | `AA 08 00 08` | `BB 08 00 08` | `BB 08 10 18` |
| OK | `AA 09 00 09` | `BB 09 00 09` | `BB 09 10 19` |
| Pinça | `AA 0A 00 0A` | `BB 0A 00 0A` | `BB 0A 10 1A` |
| Apontar | `AA 0C 00 0C` | `BB 0C 00 0C` | `BB 0C 10 1C` |

### 7.2 Comandos de controle

| Comando | HEX | Descrição |
|------|-----|------|
| Repetir | `AA FE 00 FE` | Repete o último gesto |
| Parar | `AA FF 00 FF` | Interrompe imediatamente |
| Definir mão direita | `AA F1 01 01 F1` | — |
| Definir mão esquerda | `AA F1 01 02 F2` | — |
| Acionamento direto | `AA F0 08 [8×角度] CKSUM` | 8 bytes de ângulo |

### 7.3 Formato do quadro

```
帧头(0xAA) + 命令(CMD) + 长度(LEN) + 数据(DATA) + 校验和(CKSUM)
CKSUM = CMD ^ LEN ^ DATA[0] ^ ... ^ DATA[N-1]
响应: 帧头(0xBB) + CMD + STATUS + (CMD^STATUS)
```

### 7.4 Ferramentas do computador host

| Ferramenta | Comando | Utilização |
|------|------|------|
| GUI | `tracking_env\Scripts\python hand_gui.py` | Gestos visuais + acionamento direto + diferencial + rastreamento |
| exe empacotado | `dist/AmazingHand控制台.exe` | Visualização sem instalar Python (sem rastreamento) |
| Linha de comando | `python serial_test.py COMx <cmd>` | Testes automatizados |

### 7.5 Arquivos de fluxo de dados de rastreamento (versão PWM)

| Utilização | Arquivo |
|------|------|
| Rastreamento PWM da mão esquerda | `dataflow_tracking_real_left_pwm.yml` |
| Rastreamento PWM da mão direita | `dataflow_tracking_real_right_pwm.yml` |
| Configuração PWM da mão esquerda | `AHControl/config/l_hand_pwm.toml` |
| Configuração PWM da mão direita | `AHControl/config/r_hand_pwm.toml` |
