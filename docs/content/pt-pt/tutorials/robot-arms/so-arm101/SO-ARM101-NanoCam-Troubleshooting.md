---
title: Guia de resolução de problemas da teleoperação sem fios do SO-ARM101 (versão NanoCam)
description: "Resumo das avarias comuns da teleoperação sem fios do SO-ARM101 (versão ESP32-NanoCam): sintomas, causas e soluções para problemas de gravação e porta série, câmara, áudio, rede e micro-ROS."
---

# Guia de resolução de problemas da teleoperação sem fios do SO-ARM101 (versão NanoCam)

> **[Comprar na loja](https://www.juxitech.com/products/esp32-s3-wifi-video-module)**

Esta página resume a resolução de problemas comuns da teleoperação sem fios do SO-ARM101 na versão ESP32-NanoCam. O fluxo de operação completo está em [Teleoperação sem fios do SO-ARM101 (versão ESP32-NanoCam)](./SO-ARM101-NanoCam-Wireless-Teleop.md).

## Verificação rápida de problemas comuns

| Sintoma | Verificação |
|---|---|
| Não consegue ligar-se para gravar | Entrar manualmente no modo de download (BOOT+reset); acrescentar `upload_port` ao `platformio.ini` |
| Sem saída na porta série após a gravação | Verificar o cabo USB e o driver CH340; no Windows, ver a porta COM no Gestor de Dispositivos |
| Bloqueado em `Waiting for micro-ROS Agent...` | Verificar AGENT_IP / UDP 8888 / isolamento de clientes |
| Barramento de servos sem resposta (`servo_mask≠0x3f`) | Confirmar a ligação ao P2-7/P2-8 via UART da placa de acionamento de servos; alimentação externa de 12V 5A no braço seguidor |
| Nível do microfone sempre 0 | Ver o registo `audio: ES8311 ready`; pull-up I2C em 41/42; soprar para o microfone para testar |
| Altifalante sem som | Verificar a ligação do altifalante; registo de volume do ES8311 `R_DAC32` (no firmware atual já está no máximo, 0xFF) |
| WiFi cai com frequência | Verificar antena e distância; RGB vermelho indica perda de WiFi, reinício automático após 10s |

## Problemas de gravação e porta série

- **Não consegue ligar-se para gravar**: mantenha premido o botão BOOT (GPIO0) → ligue o USB (ou prima o reset) → largue o BOOT e volte a executar o upload imediatamente. No Windows, se a porta série não for reconhecida automaticamente, acrescente uma linha `upload_port = COM3` em `[env:nano_cam]` do `platformio.ini` (substitua pelo número COM real do CH340 no Gestor de Dispositivos).
- **Sem saída na porta série após a gravação**: o USB do NanoCam é CH340K → UART0; no Linux o nome do dispositivo é `/dev/ttyUSB0`; se não for reconhecido ao ligar, verifique o cabo USB e o driver CH340 (incluído no kernel).
- **Barramento de servos sem resposta (`servo_mask≠0x3f`)**: confirme que o barramento de servos está ligado **a P2-7/P2-8** (GPIO19/20) através do UART da placa de acionamento de servos, e não às 43/44 da UART0; o braço seguidor tem obrigatoriamente de ter alimentação externa de 12V 5A (o USB não aguenta 6 servos).
- **Confusão entre barramento de servos e porta série de depuração**: a porta série de depuração é o USB-C (CH340K → UART0) e é totalmente independente do barramento de servos; podem ser usadas ao mesmo tempo.

## Problemas de compilação e toolchain

- **Primeiro `pio run` lento/bloqueado a descarregar** (na primeira vez descarrega por ordem a plataforma espressif32, a toolchain `toolchain-xtensa-esp32s3` com cerca de 100 MB e o framework Arduino com cerca de 200 MB): a estimativa de tempo restante do PlatformIO não é exata e é comum ficar parada algum tempo para depois terminar de repente; dê 5 minutos e observe se a percentagem avança; pode ativar um proxy/VPN (usa o proxy do sistema);
- **Descarregar a toolchain manualmente**: descarregue no navegador `https://dl.espressif.com/dl/xtensa-esp32s3-elf-gcc8_4_0-esp-2021r2-patch5-win32.zip` (no Linux o equivalente `-linux-amd64.tar.gz`), descomprima, renomeie a pasta para `toolchain-xtensa-esp32s3`, coloque-a em `C:\Users\<nome_de_utilizador>\.platformio\packages\` e volte a executar `pio run`; interromper com Ctrl+C a meio não danifica o ambiente e a nova execução retoma a transferência;
- **No Windows o comando `pio` não é encontrado no Git Bash**: use um terminal PowerShell/CMD ou adicione `C:\Users\<nome_de_utilizador>\.platformio\penv\Scripts` ao PATH.

## Resolução de problemas específicos da câmara

| Sintoma | Causa raiz | Correção |
|---|---|---|
| `i2c driver install error` + `camera probe failed` | **Conflito I2C**: o ES8311 ocupa GPIO41/42 com `Wire1` e a instalação do driver I2C pelo SCCB da câmara é recusada | Acrescentar `Wire1.end()` no fim de `init()` em `audio_es8311.cpp`, libertando o I2C para a câmara |
| `JPEG format is not supported on this sensor` (0x106) | **A GC2145 não tem codificador JPEG por hardware** (só a OV2640/OV5640 têm) | Passar a captura para `PIXFORMAT_RGB565` e codificar em JPEG por software com `frame2jpg` em `/stream` e `/jpg` |
| `/jpg` e `/stream` sem resposta, o navegador fica a carregar | **Stack overflow do httpd**: a stack predefinida de 8KB não comporta a codificação por software com `frame2jpg` | `config.stack_size = 16384` em `start_server()` |
| `/stream` abre mas o ecrã fica preto | **Falta do limite multipart**: sem `STREAM_BOUNDARY` entre fotogramas, o navegador não consegue analisar | Reenviar `STREAM_BOUNDARY` antes de cada fotograma |
| `curl` a testar `/jpg` devolve `HTTP:000`, mas o navegador mostra imagem | O esp_http_server é **de tarefa única**: com `/stream` a ocupar a tarefa httpd, o `/jpg` não chega a vez; ou o timeout do curl é demasiado curto | Fechar o `/stream` e testar o `/jpg` isoladamente; validar com o navegador em vez do curl |
| Câmara inicializa mas a imagem fica toda preta/sem fotogramas | Normalmente é **hardware**: alimentação AVDD/DOVDD, nível de PWDN, contacto do cabo flexível | Testar primeiro o snapshot `/jpg` no navegador (se sai imagem, o caminho está bom); verificar a alimentação de 2,8V da câmara e o cabo flexível |
| Cerca de 2/3 inferiores da imagem VGA com artefactos | **Débito de dados DVP demasiado alto**: o VGA RGB565 excede a margem de temporização de amostragem DVP desta placa (reproduzido com 24/20/16MHz × buffer simples/duplo); o QVGA está normal | Usar **QVGA 320×240** na configuração final (chega para FPV), ou mudar para um XCLK mais estável / alterar o encaminhamento do DVP em hardware |

> Nota: os primeiros quatro itens da tabela já estão corrigidos no firmware fornecido; basta gravar o firmware mais recente, sem necessidade de alterar código manualmente.

**Atenção**: o esp_http_server é de tarefa única e `/stream` e `/jpg` não podem ser acedidos ao mesmo tempo — com o `/stream` aberto, o `/jpg` fica pendurado indefinidamente. Feche a página do fluxo antes de capturar um fotograma único.

## Resolução de problemas específicos do áudio

| Sintoma | Causa raiz | Correção |
|---|---|---|
| Altifalante **completamente mudo** + nível do microfone ≈ 0 (por exemplo `0.0009`) | **MCLK sem saída**: o driver I2S legacy não gera MCLK no ESP32-S3 e o DAC/ADC interno do ES8311 fica sem relógio | Gerar MCLK de 6,15MHz com **LEDC em GPIO39** (`start_ledc_mclk()` em `audio_es8311.cpp`) |
| Sons de aviso **demasiado baixos** (só se ouve com o ouvido encostado) | Amplitude digital baixa + volume principal do ES8311 baixo | Amplitude de `play_tone` 12000→30000, `R_DAC32` 0x30→0xFF (cerca de +29dB) |
| Após ligar, só se ouve o «bip-bip» de arranque, mais nada | **Comportamento normal**: os sons de prontidão/desbloqueio são acionados por eventos e só tocam ao executar a teleoperação | Som de arranque = toca logo que é alimentado; som de prontidão = comunicação com o Agent estabelecida; som de desbloqueio = comando de controlo recebido |

> Nota: os dois primeiros itens já estão corrigidos no firmware fornecido; o terceiro é um comportamento normal, sem necessidade de intervenção.

## Verificação de hardware do microfone, altifalante e RGB

- **Nível do microfone sempre 0**: verificar o registo `audio: ES8311 ready`; confirmar que o MCLK está a ser gerado (GPIO39 deve ter ~1,65V, gerado por LEDC); pull-up do barramento I2C em 41/42 (a placa já tem 10K); soprar para o microfone e ver se `/follower_audio/level` oscila.
- **Altifalante sem som**: confirmar que o altifalante NS4150B está ligado ao conector de altifalante; confirmar que o MCLK de GPIO39 tem saída (LEDC, `start_ledc_mclk()`); registo de volume `R_DAC32` (atualmente 0xFF); se o ES8311 não inicializar, o registo imprime o motivo da falha.
- **Luz RGB não acende**: o pino de dados do WS2812 é GPIO18; verificar se o registo de arranque do firmware mostra um erro de inicialização de RMT antes de `camera_stream` (normalmente não acontece).

## Problemas de rede e micro-ROS

- **Bloqueado em `Waiting for micro-ROS Agent...`**: verificar por ordem se o `AGENT_IP` está preenchido com o IP do computador Ubuntu na rede local, se o UDP 8888 está aberto e se o router/hotspot tem isolamento de clientes ativado (é preciso desativar). A antena do NanoCam é a antena U.FL do módulo; com RSSI fraco, verificar primeiro a antena e a colocação, e recomenda-se um teste real de distância a 5/10/20/30 metros.
- **WiFi cai com frequência**: verificar a antena e a distância; o RGB vermelho indica perda de WiFi e o firmware reinicia automaticamente após 10s de timeout.
- **Se não conseguir ligar, confirme primeiro o ambiente**: o NanoCam e o computador Ubuntu têm de estar na mesma rede local de 2.4GHz (um hotspot do telemóvel serve); se mudou de rede, não se esqueça de atualizar o `AGENT_IP` e a configuração de WiFi (ver a secção «Configurar o WiFi» do tutorial de teleoperação sem fios).

<RelatedProducts slugs="so-arm101,esp32-s3-wifi-module" />
