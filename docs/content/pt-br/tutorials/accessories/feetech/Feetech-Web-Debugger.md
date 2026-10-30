---
title: "Depuração de servos de barramento Feetech na versão web (SCS0009 / STS3215 / HD1910)"
description: "Depuração de servos de barramento Feetech na versão web: conexão via Web Serial no navegador, com suporte a varredura, leitura/gravação de parâmetros, controle de posição, alteração da taxa de baud, restauração de fábrica e backup xdat para SCS0009 / STS3215 / HD1910."
---

# Depuração de servos de barramento Feetech na versão web (SCS0009 / STS3215 / HD1910)

> **Ferramenta para desktop:** [Tutorial de uso da ferramenta de depuração do servo SCS0009](./SCS0009-Debug-Tool.md) ｜ [Tutorial de depuração do STS3215 & SCS0009](./Feetech-STS3215&SCS0009-Tutorial.md)

Versão web da ferramenta de depuração de servos de barramento Feetech: o navegador abre diretamente a porta serial USB via **Web Serial** para se comunicar com o servo, permitindo conexão serial, varredura de servos, identificação de modelo, leitura/gravação de parâmetros, controle de posição e acompanhamento em tempo real, alteração da taxa de baud, restauração de fábrica e backup/restauração de parâmetros xdat.

Página totalmente estática, **sem necessidade de instalar nenhum software ou ambiente Python**: basta abrir o endereço para usar. Atualmente compatível com os três modelos **SCS0009**, **STS3215** e **HD1910**.

## 1. Abrir a página

Endereço online:

[https://juxi-technology.github.io/FT-ServoController-web/](https://juxi-technology.github.io/FT-ServoController-web/)

O mesmo site também oferece um tutorial completo de uso da versão web (com alternância entre chinês e inglês):

[https://juxi-technology.github.io/FT-ServoController-web/guide.html](https://juxi-technology.github.io/FT-ServoController-web/guide.html)

Requisitos de ambiente:

- **Chrome ou Edge 89+** (Firefox e Safari não suportam Web Serial)
- A página precisa ser aberta via **https ou localhost**
- É necessário instalar o driver USB para TTL (CH340, CH343, CP2102 etc.)


## 2. Conectar a porta serial

1. Na área “🔌 Conexão serial”, selecione a **taxa de baud**; o padrão é 1000000 (1M).
1. Clique em “**Conectar porta serial**” e, na caixa de diálogo do sistema que o navegador abre, selecione a porta serial USB correspondente ao servo.
1. Após a conexão bem-sucedida, o status no canto superior direito muda para “🟢 Conectado”.


Taxas de baud disponíveis: 1000000 / 500000 / 250000 / 128000 / 115200 / 76800 / 57600 / 38400.

## 3. Varredura de servos e identificação de modelo

1. Após conectar a porta serial, clique em “🔍 **Escanear servos**”. A página varre os IDs de 1 a 254 e **exibe assim que encontra**, sem esperar que a varredura termine.
1. Durante a varredura, o botão se transforma no botão vermelho “⏹ **Parar varredura**”; clique novamente para interromper, e os servos já encontrados são mantidos.
1. Clique no chip do servo (ou na lista suspensa acima) para selecionar o servo desejado.


O modelo é determinado automaticamente pelos **dois bytes dos endereços 3 / 4** do servo (número da versão principal e número da versão secundária):

| Modelo | Bytes de identificação (principal / secundário) | Faixa de posição | Ordem de bytes |
|---|---|---|---|
| SCS0009 | 5 / 4 | 0–1023 | Big-endian |
| STS3215 | 9 / 3 | 0–4095 | Little-endian |
| HD1910 | 10 / 31 | 0–4095 | Little-endian |

O resultado da identificação aparece no chip do servo, por exemplo **ID1 (SCS0009 · SCS)**; a tabela de parâmetros e a faixa de posição mudam automaticamente conforme o servo selecionado. Modelos ausentes da tabela de identificação aparecem como “Modelo desconhecido”, e o log imprime os dois bytes efetivamente lidos, para facilitar o envio de feedback para complementarmos o suporte.

## 4. Tabela de parâmetros

A tabela de parâmetros mostra todos os registradores do servo selecionado em cinco colunas — **endereço, registrador, valor, área de armazenamento e leitura/gravação** —, com a área de armazenamento dividida em EPROM, SRAM e DEFAULT e colorida por área.

> **Somente a linha cuja coluna “leitura/gravação” está marcada como gravável pode ser selecionada e gravada**; os registradores somente leitura e a área DEFAULT não respondem ao clique e não entram na linha de gravação, evitando gravações acidentais em áreas somente leitura.

## 5. Ler e gravar parâmetros

**Ler parâmetros**: após clicar no chip para selecionar o servo desejado, a página **lê automaticamente todos os parâmetros desse servo** e os preenche na tabela, além de alinhar o controle deslizante da área de controle de posição com a posição real atual dele. Também é possível clicar em “📖 Ler parâmetros” a qualquer momento para atualizar manualmente.

**Gravar parâmetros**:

1. **Selecione uma linha** na tabela de parâmetros (somente linhas graváveis podem ser selecionadas).
1. Os campos “Endereço de gravação 0x” e “Comprimento” na parte inferior são preenchidos automaticamente.
1. Digite o novo valor na caixa “Valor” e clique em “✏️ **Gravar**”.
1. Ao gravar na EEPROM, a página executa automaticamente **desbloquear → gravar → bloquear**; o resultado é exibido em uma notificação flutuante com o sucesso ou o motivo da falha.


> Antes de alterar parâmetros como ID, taxa de baud e limites de ângulo, use “Salvar servo atual” para fazer um backup xdat, facilitando a restauração em caso de erro.

## 6. Controle de posição

1. Após selecionar o servo, arraste o controle deslizante de **posição de destino** na área “🎯 Controle de posição” ou digite diretamente na caixa numérica. A faixa varia conforme o modelo: **SCS0009: 0–1023**, **STS3215 / HD1910: 0–4095**; o controle deslizante e a caixa numérica são vinculados nos dois sentidos.
1. Defina a **velocidade** (valor bruto do registrador; o significado das unidades difere entre as séries).
1. Clique em “▶ **Mover**” para executar; a página consulta periodicamente o flag MOVING e, ao final do movimento, avisa para desligar o torque.


**Acompanhamento em tempo real**: ao marcar “Acompanhamento em tempo real”, o servo acompanha em tempo real enquanto você arrasta o controle deslizante. Ao marcar, é pedida uma confirmação adicional e o torque do servo é ativado automaticamente; o envio é limitado para não saturar o barramento. Ao trocar de servo, escanear novamente ou desconectar, o recurso é desativado automaticamente e um aviso lembra de desligar o torque.

Controle de torque:

| Botão | Função |
|---|---|
| ⚡ Ativar torque | Ativa o torque do servo atual |
| ⏹ Desativar torque | Desativa o torque do servo atual |
| ⏹ Desativar todo o torque | Libera de uma vez todos os servos do barramento |

> **Se a conexão cair repentinamente durante um movimento, reconecte e desative o torque imediatamente.**

## 7. Ler status

Clique em “📊 Ler status”; a barra de status abaixo mostra a posição atual, velocidade, carga, tensão, temperatura, corrente e flags de operação.

## 8. Alterar a taxa de baud

1. Na área “🔧 Taxa de baud / Restauração de fábrica”, selecione a **nova taxa de baud**.
1. Clique em “🔧 **Alterar taxa de baud**”.
1. Após gravar, a página **reabre a porta serial na nova taxa e faz uma leitura de verificação**; em caso de falha, **reverte automaticamente** para a taxa original, evitando que o servo perca a comunicação.


## 9. Restauração de fábrica

Clique em “🔄 **Restaurar fábrica**”; é preciso **confirmar duas vezes** antes de executar. O comando de restauração é diferente para cada série, e a página o seleciona automaticamente conforme o modelo identificado:

| Modelo | Comando de restauração | Após a execução |
|---|---|---|
| SCS0009 | 0x0A restauração de fábrica | ID volta para 1, taxa de baud volta para 1M |
| STS3215 / HD1910 | 0x06 restauração de parâmetros | ID permanece inalterado; os demais parâmetros voltam aos valores padrão |

> A restauração de fábrica **não pode ser desfeita**; recomenda-se salvar o xdat antes de executar.

## 10. Backup e restauração de parâmetros xdat

A área “📁 Parâmetros xdat (salva somente a EEPROM)” oferece três operações:

| Botão | Função |
|---|---|
| 💾 Salvar servo atual | Lê todos os parâmetros do servo e os baixa como um arquivo .xdat |
| 📂 Abrir xdat | Carrega um arquivo .xdat local e pré-visualiza o conteúdo |
| 📤 Restaurar parâmetros no servo | Grava os parâmetros xdat carregados de volta na EEPROM do servo atual |

O nome do arquivo salvo inclui **modelo e ID**, por exemplo **SCS0009_ID1.xdat** e **HD1910_ID6.xdat**, evitando que o mesmo ID de modelos diferentes se sobrescreva.

O formato do arquivo é “cabeçalho de 2 bytes + área de dados de 49 bytes”; o endereço de registrador A fica no deslocamento A+2; valores multibyte são armazenados conforme a ordem de bytes do modelo (SCS big-endian, STS / HD1910 little-endian).

> Para evitar parâmetros corrompidos, a página verifica se o arquivo e o servo atual pertencem à mesma família de ordem de bytes e **proíbe a gravação quando são diferentes**. Na restauração, apenas parâmetros EEPROM graváveis são escritos, ignorando modelo e áreas somente leitura; a área de dados cobre apenas os endereços 0–48. Antes de restaurar, confirme que o ID do servo selecionado está correto.

## 11. Log

O “📜 Log” na parte inferior da página registra em tempo real cada operação e o resultado retornado; é possível clicar em “Limpar” para apagá-lo.

A interface suporta **alternância entre chinês e inglês** — o botão “EN / English” no canto superior direito alterna instantaneamente o idioma da interface e do log, e o histórico do log também é atualizado em sincronia, sem necessidade de reconectar.

## 12. Avisos de segurança

- ⚠️ Somente um programa pode ocupar a porta serial por vez. Ao usar esta página, feche o aplicativo de host para desktop, assistentes de porta serial e outros programas.
- ⚠️ Se o cabo for desconectado durante o movimento, o servo pode continuar executando a ação — após reconectar, **desative o torque primeiro**.
- ⚠️ Faça ligações e conexões/desconexões sempre com a alimentação desligada.
- ⚠️ Antes de sair da página, você pode clicar em “⏹ Desativar todo o torque” para liberar todos os servos de uma vez.


## 13. Perguntas frequentes

**P1: A página informa que o Web Serial não é suportado ou não é possível conectar.**
Use Chrome / Edge 89+ e acesse via https ou localhost. Firefox e Safari não implementam o Web Serial.

**P2: Falha na conexão, com aviso de que não é possível abrir a porta serial.**
Confirme que a porta serial não está ocupada por outro programa (aplicativo de host para desktop, assistente de porta serial, Arduino IDE etc.) e que o driver USB para TTL está instalado.

**P3: Nenhum servo encontrado na varredura.**
Confirme se a fiação está correta, se o servo está alimentado e se a taxa de baud corresponde à do servo. Se a taxa de baud do servo foi alterada, tente primeiro outras opções; se houver conflito de ID no barramento, os dois servos responderão ao mesmo tempo — conecte um servo de cada vez para investigar.

**P4: Algumas linhas da tabela de parâmetros não respondem ao clique.**
É o comportamento previsto: somente as linhas cuja coluna “leitura/gravação” está marcada como gravável podem ser selecionadas para gravação; registradores somente leitura e a área DEFAULT não são graváveis.

**P5: O que fazer se a alteração da taxa de baud falhar?**
A página reverte automaticamente para a taxa original e informa o motivo da falha; verifique a fiação e tente novamente.

**P6: O que fazer se o servo aparecer como “Modelo desconhecido”?**
Isso indica que os dois bytes dos endereços 3 / 4 do servo não estão na tabela de identificação. Atualmente só há suporte para SCS0009, STS3215 e HD1910; consulte os valores de “versão principal / versão secundária” no log e envie-nos o feedback para complementarmos o suporte.

**P7: O comportamento não mudou após a atualização da página.**
O navegador armazena os scripts em cache; force uma atualização para recarregar (Windows: Ctrl+Shift+R; macOS: Cmd+Shift+R).
