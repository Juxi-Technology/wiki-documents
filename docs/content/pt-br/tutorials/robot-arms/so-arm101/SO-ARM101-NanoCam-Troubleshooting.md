---
title: "Solução de problemas de teleoperação"
description: "Resumo das falhas comuns na teleoperação sem fio do SO-ARM101 (versão ESP32-NanoCam): sintomas, causas e soluções para problemas de gravação e porta serial."
---

# Solução de problemas de teleoperação

> **[Comprar na loja](https://www.juxitech.com/products/so-arm101-developers-kit)**

Esta página reúne a solução de problemas comuns da teleoperação sem fio do SO-ARM101 na versão ESP32-NanoCam. O fluxo de operação completo está em [Teleoperação sem fio do SO-ARM101 (versão ESP32-NanoCam)](./SO-ARM101-NanoCam-Wireless-Teleop.md).

## Consulta rápida de problemas gerais

| Sintoma | Verificação |
|---|---|
| Falha ao conectar para gravar | Entre manualmente no modo de download (BOOT + reset); adicione `upload_port` no `platformio.ini` |
| Sem saída serial após a gravação | Verifique o cabo USB e o driver CH340; no Windows, consulte a porta COM no Gerenciador de Dispositivos |
| Travado em `Waiting for micro-ROS Agent...` | Verifique AGENT_IP / UDP 8888 / isolamento de clientes |
| Barramento de servos sem resposta (`servo_mask≠0x3f`) | Confirme a ligação via UART da placa de acionamento de servos em P2-7/P2-8; alimentação externa de 12V 5A no braço seguidor |
| Nível do microfone sempre 0 | Verifique o log `audio: ES8311 ready`; pull-up no I2C 41/42; assopre no microfone para testar |
| Alto-falante sem som | Verifique a conexão do alto-falante; registro de volume do ES8311 `R_DAC32` (o firmware atual já está no máximo 0xFF) |
| WiFi cai com frequência | Verifique a antena e a distância; RGB vermelho indica perda de WiFi, com reinício automático após 10s |

## Problemas de gravação e porta serial

- **Falha ao conectar para gravar**: mantenha o botão BOOT pressionado (GPIO0) → conecte o USB (ou pressione reset) → solte o BOOT e execute o upload imediatamente. No Windows, se a porta serial não for reconhecida automaticamente, adicione uma linha `upload_port = COM3` em `[env:nano_cam]` no `platformio.ini` (substitua pelo número COM real do CH340 no Gerenciador de Dispositivos).
- **Sem saída serial após a gravação**: o USB do NanoCam é CH340K → UART0; no Linux o nome do dispositivo é `/dev/ttyUSB0`; se não for reconhecido ao conectar, verifique o cabo USB e o driver CH340 (já incluso no kernel).
- **Barramento de servos sem resposta (`servo_mask≠0x3f`)**: confirme que o barramento de servos está ligado ao UART da placa de acionamento de servos em **P2-7/P2-8** (GPIO19/20), e não no 43/44 do UART0; o braço seguidor precisa de alimentação externa de 12V 5A (o USB não dá conta de 6 servos).
- **Confusão entre barramento de servos e porta serial de depuração**: a porta serial de depuração é o USB-C (CH340K → UART0), totalmente independente do barramento de servos, e ambos podem ser usados ao mesmo tempo.

## Problemas de compilação e toolchain

- **Primeira execução de `pio run` lenta/travada** (na primeira vez são baixados, em sequência, a plataforma espressif32, a toolchain `toolchain-xtensa-esp32s3` com cerca de 100 MB e o framework Arduino com cerca de 200 MB): a estimativa de tempo restante do PlatformIO é imprecisa e costuma travar por um tempo para então terminar de repente; aguarde 5 minutos observando se a porcentagem avança; você pode ativar proxy/VPN (usando o proxy do sistema);
- **Download manual da toolchain**: baixe no navegador `https://dl.espressif.com/dl/xtensa-esp32s3-elf-gcc8_4_0-esp-2021r2-patch5-win32.zip` (no Linux, o correspondente é `-linux-amd64.tar.gz`); após extrair, renomeie o diretório para `toolchain-xtensa-esp32s3` e coloque em `C:\Users\<nome de usuário>\.platformio\packages\`, depois execute `pio run` novamente; interromper com Ctrl+C no meio não corrompe o ambiente e a próxima execução continua de onde parou;
- **Comando `pio` não encontrado no Git Bash do Windows**: use o terminal PowerShell/CMD ou adicione `C:\Users\<nome de usuário>\.platformio\penv\Scripts` ao PATH.

## Solução de problemas específicos da câmera

| Sintoma | Causa raiz | Correção |
|---|---|---|
| `i2c driver install error` + `camera probe failed` | **Conflito de I2C**: o ES8311 usa `Wire1` nos GPIO41/42 e a instalação do driver I2C pelo SCCB da câmera é recusada | Adicione `Wire1.end()` no fim do `init()` em `audio_es8311.cpp`, liberando o I2C para a câmera |
| `JPEG format is not supported on this sensor` (0x106) | **O GC2145 não tem codificador JPEG por hardware** (somente OV2640/OV5640 têm) | Mude a captura para `PIXFORMAT_RGB565` e use `frame2jpg` para codificar em JPEG por software no `/stream` e no `/jpg` |
| `/jpg` e `/stream` sem resposta, navegador girando sem parar | **Estouro de pilha do httpd**: a pilha padrão de 8KB não comporta a codificação por software do `frame2jpg` | `config.stack_size = 16384` em `start_server()` |
| `/stream` abre, mas tela preta | **Falta do limite multipart**: `STREAM_BOUNDARY` não era enviado entre os quadros e o navegador não conseguia interpretar | Envie `STREAM_BOUNDARY` antes de cada quadro |
| Teste de `/jpg` com curl retorna `HTTP:000`, mas o navegador exibe imagem | esp_http_server é **de tarefa única**: com `/stream` ocupando a tarefa httpd, o `/jpg` não entra na fila; ou o timeout do curl é curto demais | Feche o `/stream` e teste o `/jpg` separadamente; use o navegador em vez do curl para validar |
| Câmera inicializa, mas imagem toda preta/sem quadros | Geralmente é **hardware**: alimentação AVDD/DOVDD, nível do PWDN, contato do cabo flat | Primeiro teste um instantâneo em `/jpg` pelo navegador (se sair imagem = link OK); verifique a alimentação de 2.8V da câmera e o cabo flat |
| Parte inferior da imagem em VGA (cerca de 2/3) com artefatos | **Taxa de dados DVP alta demais**: VGA em RGB565 excede a margem de temporização de amostragem DVP desta placa (reproduzido com 24/20/16MHz × buffer simples/duplo); QVGA funciona normalmente | Use **QVGA 320×240** na configuração oficial (suficiente para FPV) ou mude para um XCLK mais estável/revise o roteamento de hardware do DVP |

> Observação: os quatro primeiros itens da tabela já foram corrigidos no firmware fornecido; basta gravar o firmware mais recente, sem necessidade de alterar o código manualmente.

**Atenção**: o esp_http_server é de tarefa única e `/stream` e `/jpg` não podem ser acessados ao mesmo tempo — com o `/stream` aberto, o `/jpg` fica pendurado indefinidamente. Feche a página do stream antes de capturar um quadro único.

## Solução de problemas específicos de áudio

| Sintoma | Causa raiz | Correção |
|---|---|---|
| Alto-falante **totalmente mudo** + nível do microfone ≈ 0 (ex.: `0.0009`) | **MCLK sem saída**: o driver I2S legacy não gera MCLK no ESP32-S3 e o DAC/ADC interno do ES8311 fica sem clock | Gere **MCLK de 6.15MHz com LEDC no GPIO39** (`start_ledc_mclk()` em `audio_es8311.cpp`) |
| Tom de aviso **baixo demais** (só se ouve com o ouvido colado) | Amplitude digital baixa + volume mestre do ES8311 baixo | Amplitude do `play_tone` 12000→30000 e `R_DAC32` 0x30→0xFF (cerca de +29dB) |
| Ao ligar, só o "bip bip" de inicialização, sem outros sons | **Comportamento normal**: os sons de prontidão/desbloqueio são orientados por eventos e só disparam ao executar a teleoperação | Som de inicialização = ao ligar; som de prontidão = comunicação com o Agent estabelecida; som de desbloqueio = comando de controle recebido |

> Observação: os dois primeiros itens já foram corrigidos no firmware fornecido; o terceiro é um comportamento normal e não requer ação.

## Verificação de hardware do microfone, alto-falante e RGB

- **Nível do microfone sempre em 0**: verifique o log `audio: ES8311 ready`; confirme que o MCLK está presente (o GPIO39 deve ter ~1.65V, gerado pelo LEDC); pull-up no barramento I2C 41/42 (a placa já tem 10K); assopre no microfone e veja se `/follower_audio/level` oscila.
- **Alto-falante sem som**: confirme que o alto-falante NS4150B está conectado ao conector de alto-falante; confirme a saída de MCLK no GPIO39 (LEDC, `start_ledc_mclk()`); registro de volume `R_DAC32` (atualmente 0xFF); se o ES8311 não inicializar, o log imprime o motivo da falha.
- **LED RGB não acende**: o pino de dados do WS2812 é o GPIO18; verifique se o log de inicialização do firmware mostra erro de inicialização do RMT antes de `camera_stream` (normalmente não ocorre).

## Problemas de rede e micro-ROS

- **Travado em `Waiting for micro-ROS Agent...`**: verifique, em ordem, se o `AGENT_IP` está preenchido com o IP do computador Ubuntu na rede local, se a UDP 8888 está liberada e se o roteador/hotspot está com isolamento de clientes ativado (precisa estar desativado). A antena do NanoCam é a antena U.FL do módulo; se o RSSI estiver ruim, verifique primeiro a antena e a posição, e recomenda-se testar as distâncias de 5/10/20/30 metros.
- **WiFi cai com frequência**: verifique a antena e a distância; RGB vermelho indica perda de WiFi e o firmware reinicia automaticamente após o timeout de 10s.
- **Se não conectar, confirme primeiro o ambiente**: o NanoCam e o computador Ubuntu precisam estar na mesma rede local de 2.4GHz (pode ser o hotspot do celular); se você trocou de rede, lembre-se de atualizar o `AGENT_IP` e a configuração de WiFi (ver a seção "Configurar o WiFi" do tutorial de teleoperação sem fio).

<RelatedProducts slugs="so-arm101,esp32-s3-wifi-module" />
