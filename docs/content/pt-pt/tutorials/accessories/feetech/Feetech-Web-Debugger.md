---
title: "Depuração de servos de barramento Feetech na versão web (SCS0009 / STS3215 / HD1910)"
description: "Depuração de servos de barramento Feetech na versão web: ligação via Web Serial no navegador, com suporte para varredura, leitura/escrita de parâmetros, controlo de posição, alteração da taxa de baud, restauro de fábrica e backup xdat para SCS0009 / STS3215 / HD1910."
---

# Depuração de servos de barramento Feetech na versão web (SCS0009 / STS3215 / HD1910)

> **Ferramenta para desktop:** [Tutorial de utilização da ferramenta de depuração do servo SCS0009](./SCS0009-Debug-Tool.md) ｜ [Tutorial de depuração do STS3215 & SCS0009](./Feetech-STS3215&SCS0009-Tutorial.md)

Versão web da ferramenta de depuração de servos de barramento Feetech: o navegador abre diretamente a porta série USB através do **Web Serial** para comunicar com o servo, permitindo ligação à porta série, varredura de servos, identificação do modelo, leitura/escrita de parâmetros, controlo de posição e seguimento em tempo real, alteração da taxa de baud, restauro de fábrica e backup/restauro de parâmetros xdat.

Página totalmente estática, **sem necessidade de instalar qualquer software ou ambiente Python**: basta abrir o endereço para utilizar. Atualmente compatível com os três modelos **SCS0009**, **STS3215** e **HD1910**.

## 1. Abrir a página

Endereço online:

[https://juxi-technology.github.io/FT-ServoController-web/](https://juxi-technology.github.io/FT-ServoController-web/)

O mesmo site disponibiliza ainda um tutorial completo de utilização da versão web (com alternância entre chinês e inglês):

[https://juxi-technology.github.io/FT-ServoController-web/guide.html](https://juxi-technology.github.io/FT-ServoController-web/guide.html)

Requisitos de ambiente:

- **Chrome ou Edge 89+** (Firefox e Safari não suportam o Web Serial)
- A página tem de ser aberta através de **https ou localhost**
- É necessário instalar o controlador USB para TTL (CH340, CH343, CP2102, etc.)


## 2. Ligar a porta série

1. Na área «🔌 Ligação da porta série», selecione a **taxa de baud**; a predefinição é 1000000 (1M).
1. Clique em «**Ligar porta série**» e, na caixa de diálogo do sistema aberta pelo navegador, selecione a porta série USB correspondente ao servo.
1. Após a ligação bem-sucedida, o estado no canto superior direito passa a «🟢 Ligado».


Taxas de baud disponíveis: 1000000 / 500000 / 250000 / 128000 / 115200 / 76800 / 57600 / 38400.

## 3. Varredura de servos e identificação do modelo

1. Depois de ligar a porta série, clique em «🔍 **Varrer servos**». A página varre os IDs de 1 a 254 e **apresenta assim que encontra**, sem esperar que a varredura termine.
1. Durante a varredura, o botão transforma-se no botão vermelho «⏹ **Parar varredura**»; clique novamente para interromper, e os servos já encontrados são mantidos.
1. Clique no chip do servo (ou na lista pendente acima) para selecionar o servo pretendido.


O modelo é determinado automaticamente pelos **dois bytes dos endereços 3 / 4** do servo (número da versão principal e número da versão secundária):

| Modelo | Bytes de identificação (principal / secundário) | Intervalo de posição | Ordem de bytes |
|---|---|---|---|
| SCS0009 | 5 / 4 | 0–1023 | Big-endian |
| STS3215 | 9 / 3 | 0–4095 | Little-endian |
| HD1910 | 10 / 31 | 0–4095 | Little-endian |

O resultado da identificação é apresentado no chip do servo, por exemplo **ID1 (SCS0009 · SCS)**; a tabela de parâmetros e o intervalo de posição mudam automaticamente conforme o servo selecionado. Os modelos que não constam da tabela de identificação aparecem como «Modelo desconhecido», e o log imprime os dois bytes efetivamente lidos, para facilitar o envio de feedback para completarmos o suporte.

## 4. Tabela de parâmetros

A tabela de parâmetros apresenta todos os registos do servo selecionado em cinco colunas — **endereço, registo, valor, área de armazenamento e leitura/escrita** —, com a área de armazenamento dividida em EPROM, SRAM e DEFAULT e colorida por área.

> **Apenas a linha cuja coluna «leitura/escrita» está marcada como gravável pode ser selecionada e escrita**; os registos apenas de leitura e a área DEFAULT não respondem ao clique e não entram na linha de escrita, evitando escritas acidentais em áreas apenas de leitura.

## 5. Ler e escrever parâmetros

**Ler parâmetros**: depois de clicar no chip para selecionar o servo pretendido, a página **lê automaticamente todos os parâmetros desse servo** e preenche-os na tabela, além de alinhar o cursor deslizante da área de controlo de posição com a posição real atual. Também pode clicar em «📖 Ler parâmetros» a qualquer momento para atualizar manualmente.

**Escrever parâmetros**:

1. **Selecione uma linha** na tabela de parâmetros (apenas as linhas graváveis podem ser selecionadas).
1. Os campos «Endereço de escrita 0x» e «Comprimento» na parte inferior são preenchidos automaticamente.
1. Introduza o novo valor na caixa «Valor» e clique em «✏️ **Escrever**».
1. Ao escrever na EEPROM, a página executa automaticamente **desbloquear → escrever → bloquear**; o resultado é apresentado numa notificação flutuante com o sucesso ou o motivo da falha.


> Antes de alterar parâmetros como o ID, a taxa de baud e os limites de ângulo, use «Guardar servo atual» para criar um backup xdat, facilitando o restauro em caso de erro.

## 6. Controlo de posição

1. Depois de selecionar o servo, arraste o cursor deslizante de **posição de destino** na área «🎯 Controlo de posição» ou introduza o valor diretamente na caixa numérica. O intervalo varia conforme o modelo: **SCS0009: 0–1023**, **STS3215 / HD1910: 0–4095**; o cursor deslizante e a caixa numérica estão vinculados nos dois sentidos.
1. Defina a **velocidade** (valor bruto do registo; o significado das unidades varia entre as séries).
1. Clique em «▶ **Mover**» para executar; a página consulta periodicamente o sinalizador MOVING e, no final do movimento, avisa para desligar o torque.


**Seguimento em tempo real**: ao marcar «Seguimento em tempo real», o servo acompanha em tempo real enquanto arrasta o cursor deslizante. Ao marcar, é pedida uma confirmação adicional e o torque do servo é ativado automaticamente; o envio é limitado para não saturar o barramento. Ao trocar de servo, repetir a varredura ou desligar a ligação, o recurso é desativado automaticamente e um aviso lembra de desligar o torque.

Controlo do torque:

| Botão | Função |
|---|---|
| ⚡ Ativar torque | Ativa o torque do servo atual |
| ⏹ Desativar torque | Desativa o torque do servo atual |
| ⏹ Desativar todo o torque | Liberta de uma vez todos os servos do barramento |

> **Se a ligação cair repentinamente durante um movimento, volte a ligar e desative imediatamente o torque.**

## 7. Ler o estado

Clique em «📊 Ler estado»; a barra de estado abaixo apresenta a posição atual, a velocidade, a carga, a tensão, a temperatura, a corrente e os sinalizadores de funcionamento.

## 8. Alterar a taxa de baud

1. Na área «🔧 Taxa de baud / Restauro de fábrica», selecione a **nova taxa de baud**.
1. Clique em «🔧 **Alterar taxa de baud**».
1. Depois de escrever, a página **volta a abrir a porta série à nova taxa e faz uma leitura de verificação**; em caso de falha, **reverte automaticamente** para a taxa original, evitando que o servo perca a ligação.


## 9. Restauro de fábrica

Clique em «🔄 **Restaurar fábrica**»; é necessário **confirmar duas vezes** antes de executar. O comando de restauro é diferente em cada série, e a página seleciona-o automaticamente conforme o modelo identificado:

| Modelo | Comando de restauro | Após a execução |
|---|---|---|
| SCS0009 | 0x0A restauro de fábrica | ID volta a 1, taxa de baud volta a 1M |
| STS3215 / HD1910 | 0x06 restauro de parâmetros | ID mantém-se inalterado; os restantes parâmetros voltam aos valores predefinidos |

> O restauro de fábrica **não pode ser anulado**; recomenda-se guardar o xdat antes de executar.

## 10. Backup e restauro de parâmetros xdat

A área «📁 Parâmetros xdat (guarda apenas a EEPROM)» oferece três operações:

| Botão | Função |
|---|---|
| 💾 Guardar servo atual | Lê todos os parâmetros do servo e descarrega-os como um ficheiro .xdat |
| 📂 Abrir xdat | Carrega um ficheiro .xdat local e pré-visualiza o conteúdo |
| 📤 Restaurar parâmetros no servo | Escreve os parâmetros xdat carregados de volta na EEPROM do servo atual |

O nome do ficheiro guardado inclui **modelo e ID**, por exemplo **SCS0009_ID1.xdat** e **HD1910_ID6.xdat**, evitando que o mesmo ID de modelos diferentes se sobreponha.

O formato do ficheiro é «cabeçalho de 2 bytes + área de dados de 49 bytes»; o endereço de registo A fica no deslocamento A+2; os valores multibyte são armazenados conforme a ordem de bytes do modelo (SCS big-endian, STS / HD1910 little-endian).

> Para evitar parâmetros corrompidos, a página verifica se o ficheiro e o servo atual pertencem à mesma família de ordem de bytes e **proíbe a escrita quando são diferentes**. No restauro, apenas são escritos os parâmetros EEPROM graváveis, ignorando o modelo e as áreas apenas de leitura; a área de dados abrange apenas os endereços 0–48. Antes de restaurar, confirme que o ID do servo selecionado está correto.

## 11. Log

O «📜 Log» na parte inferior da página regista em tempo real cada operação e o resultado devolvido; pode clicar em «Limpar» para o apagar.

A interface suporta **alternância entre chinês e inglês** — o botão «EN / English» no canto superior direito alterna instantaneamente o idioma da interface e do log, e o histórico do log também é atualizado em sincronia, sem necessidade de voltar a ligar.

## 12. Avisos de segurança

- ⚠️ Só um programa pode ocupar a porta série de cada vez. Ao utilizar esta página, feche a aplicação de host para desktop, o assistente de porta série e outros programas.
- ⚠️ Se o cabo for desligado durante o movimento, o servo pode continuar a executar a ação — depois de voltar a ligar, **desative primeiro o torque**.
- ⚠️ Efetue as ligações e as conexões/desconexões sempre com a alimentação desligada.
- ⚠️ Antes de sair da página, pode clicar em «⏹ Desativar todo o torque» para libertar todos os servos de uma vez.


## 13. Perguntas frequentes

**P1: A página indica que o Web Serial não é suportado ou não é possível ligar.**
Utilize o Chrome / Edge 89+ e aceda através de https ou localhost. O Firefox e o Safari não implementam o Web Serial.

**P2: A ligação falha, com a indicação de que não é possível abrir a porta série.**
Confirme que a porta série não está ocupada por outro programa (aplicação de host para desktop, assistente de porta série, Arduino IDE, etc.) e que o controlador USB para TTL está instalado.

**P3: A varredura não encontra servos.**
Confirme se a cablagem está correta, se o servo está alimentado e se a taxa de baud corresponde à do servo. Se a taxa de baud do servo tiver sido alterada, experimente primeiro outros valores; se houver conflito de ID no barramento, os dois servos respondem ao mesmo tempo — ligue um servo de cada vez para diagnosticar.

**P4: Algumas linhas da tabela de parâmetros não respondem ao clique.**
É o comportamento previsto: apenas as linhas cuja coluna «leitura/escrita» está marcada como gravável podem ser selecionadas para escrita; os registos apenas de leitura e a área DEFAULT não são graváveis.

**P5: O que fazer se a alteração da taxa de baud falhar?**
A página reverte automaticamente para a taxa original e indica o motivo da falha; verifique a cablagem e tente novamente.

**P6: O que fazer se o servo aparecer como «Modelo desconhecido»?**
Isso indica que os dois bytes dos endereços 3 / 4 do servo não constam da tabela de identificação. Atualmente só há suporte para SCS0009, STS3215 e HD1910; consulte os valores de «versão principal / versão secundária» no log e envie-nos o feedback para completarmos o suporte.

**P7: O comportamento não mudou após a atualização da página.**
O navegador coloca os scripts em cache; force uma atualização para recarregar (Windows: Ctrl+Shift+R; macOS: Cmd+Shift+R).
