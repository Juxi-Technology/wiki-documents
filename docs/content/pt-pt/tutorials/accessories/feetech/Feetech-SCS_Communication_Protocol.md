---
title: "Protocolo de Comunicação SCS"
description: "O nível de comunicação utiliza o método de nível TTL, compatível com comunicação de alta velocidade, e o método RS485, com forte capacidade anti-interferência."
---

# Protocolo de Comunicação SCS

> **[Comprar na loja](https://www.juxitech.com/products/feetech-scs0009-serial-bus-servo)**


## 1 Resumo do protocolo de comunicação

O nível de comunicação utiliza o método de nível TTL, compatível com comunicação de alta velocidade, e o método RS485, com forte capacidade anti-interferência. A comunicação continua sendo duplex assíncrona, e os sinais de envio e recebimento são processados de forma assíncrona. 

O controlador e o servo se comunicam pelo método de pergunta e resposta, em que o controlador envia um quadro de comando e o servo retorna um quadro de resposta. 

Em uma rede de controle por barramento, é permitido haver vários servos, portanto cada servo recebe um número de ID exclusivo dentro da rede. Os comandos de controle enviados pelo controlador contêm informações de ID, e apenas o servo que corresponder ao número de ID pode receber integralmente esse comando e retornar informações de resposta. 

O modo de comunicação é serial assíncrono, com um quadro de dados dividido em 1 bit de início, 8 bits de dados e 1 bit de parada, sem bit de paridade, totalizando 10 bits. 

Quando alguns parâmetros da tabela de memória usam uma faixa de valores de dois bytes, a ordem dos dois bytes é diferenciada conforme o modelo do servo. Para servos do tipo potenciômetro, o formato é big-endian (byte alto primeiro, byte baixo depois); para servos do tipo encoder magnético, o formato é little-endian (byte baixo primeiro, byte alto depois). Como cada servo tem funções ligeiramente diferentes, consulte a tabela de memória do modelo específico durante o controle real. 

## 2 Quadro de instruções

- Cabeçalho: receber dois bytes 0xFF consecutivos indica a chegada de um pacote de dados.
Número de ID: cada servo possui um número de ID. A faixa de números de ID vai de 0 a 253, o que corresponde a 0x00 a 0xFD em hexadecimal.

- ID de difusão: o número de ID 254 é o ID de difusão. Se o número de ID enviado pelo controlador for 254 (0xFE), todos os servos receberão o comando e nenhuma informação de resposta será retornada para comandos que não sejam PING (o comando PING de difusão não pode ser usado quando vários servos estão conectados ao barramento).

- Comprimento dos dados: igual ao parâmetro N a ser enviado mais 2, ou seja, "N+2".

- Instrução: código de função da operação do pacote; consulte 1.3 Tipos de instruções para detalhes.

- Parâmetro: informações de controle adicionais necessárias além da instrução. O parâmetro suporta no máximo dois bytes para representar um valor de memória, e a ordem dos bytes é a indicada na tabela de controle de memória do manual do utilizador do servomotor (a ordem dos bytes varia entre diferentes modelos de servomotor).

- Soma de verificação: o método de cálculo é o seguinte
Check Sum = ~ (ID + Length + Instruction + Parameter1 + … Parameter N). Se a soma do cálculo dentro dos parênteses exceder 255, considera-se apenas o byte mais baixo, onde "~" denota a negação bit a bit.

## 3 Quadro de resposta

O quadro de resposta retornado contém o estado atual ERROR do servo. Se o estado operacional atual do servo estiver anormal, isso será refletido por meio desse byte (para detalhes sobre o significado de cada estado, consulte a Tabela de Controle de Memória do manual). Se ERROR for 0, o servo não possui informações de erro. 

## 4 Tipos de instruções

### 4.1 Instrução de consulta de estado PING

- Função: ler o estado operacional do servomotor

- Comprimento: 0x02

- Instrução: 0x01

- Parâmetro: nenhum

- A instrução PING usa o endereço de difusão, e o servo também retorna uma mensagem de resposta.

Exemplo 1: ler o estado operacional do servo com número de ID 1. 

Quadro de comando: FF FF 01 02 01 FB (enviado em hexadecimal)

```Plain Text
Header：FF FF
ID：01
Length：02
Instruction：01
Checksum：FB
```

Quadro de resposta: FF FF 01 02 00 FC (exibição em hexadecimal)

```Plain Text
Header：FF FF
ID：01
Length：02
Instruction：00
Checksum：FC
```

### 4.2 Instrução de leitura READ DATA

- Função: ler dados da tabela de controle de memória do servo

- Comprimento: 0x04

- Instrução: 0x02

- Parâmetro 1: endereço inicial do segmento de leitura de dados

- Parâmetro 2: comprimento dos dados a serem lidos

Exemplo 2: ler a posição atual do servo com ID 1 (byte baixo primeiro, byte alto depois). O endereço na tabela de memória do parâmetro de posição é 0X38, que ocupa dois bytes consecutivos. 

Quadro de comando: FF FF 01 04 02 38 02 BE (enviado em hexadecimal)

```Plain Text
Header：FF FF
ID：01
Length：04
Instruction：02
Parameter：38 02（Current position address, data read length）
Checksum：BE
```

Quadro de resposta: FF FF 01 04 00 18 05 DD (exibição em hexadecimal)

```Plain Text
Header：FF FF
ID：01
Length：04
Instruction：00
Parameter：18 05
Checksum：DD
```

Os dois bytes de dados lidos (em estrutura little-endian) são: byte baixo L 0x18, byte alto H 0x05. Os dois bytes combinados formam um dado de 16 bits 0X0518, e a posição atual representada em decimal é 1304. 

### 4.3 Instrução de escrita WRITE DATA

- Função: gravar dados na tabela de controle de memória do servo

- Comprimento: N+2 (N é o comprimento do parâmetro)

- Instrução: 0x03

- Parâmetro 1: endereço inicial do segmento de gravação de dados

- Parâmetro 2: grava o 1º dado

- Parâmetro 3: grava o segundo dado
…

- Parâmetro N: grava o enésimo dado, onde N = n + 1

Exemplo 3: usar o ID de difusão (0xFE) para definir o ID de um servo de número arbitrário para 1; o endereço onde o número de ID é armazenado na tabela de memória é 5.

Quadro de comando: FF FF FE 04 03 05 01 F4 (enviado em hexadecimal)

```Plain Text
Header：FF FF
ID：01
Length：04
Instruction：03
Parameter：05 01（ID Address New ID Value）
Checksum：F4
```

Como os comandos são enviados a usar o ID de difusão, nenhum dado será retornado. Além disso, a tabela de memória EPROM possui um interruptor de bloqueio de proteção, que precisa ser desativado (definido como 0) antes de modificar o ID; caso contrário, o número de ID do exemplo não será salvo quando houver perda de energia. Para operações detalhadas, consulte a tabela de memória ou o manual de operação do modelo específico do servo.

Exemplo 4: controlar o servo de ID1 para girar até a posição de 2048 a uma velocidade de 1000 passos por segundo. O endereço inicial da posição alvo na tabela de memória é 0x2A, portanto comece a gravar seis bytes consecutivos no endereço 0x2A.

- Dados de posição 0x0800 (2048)

- Dados reservados 0x0000 (0)

- Dados de velocidade 0x03E8 (1000)

Quadro de comando: FF FF 01 09 03 2A 00 08 00 00 E8 03 D5 (enviado em hexadecimal)

```Plain Text
Header：FF FF
ID：01
Length：09
Instruction：03
Parameter：
2A（starting address）
00 08（Position）
00 00（Reserved）
E8 03（Speed）
Checksum：D5
```

Quadro de resposta: FF FF 01 02 00 FC (exibição em hexadecimal)

```Plain Text
Header：FF FF
ID：01
Length：02
Instruction：00
Checksum：FC
```

Retornar um estado de funcionamento igual a 0 indica que o servo recebeu corretamente o comando, sem erros, e iniciou a execução. O ID do pacote de comando enviado usa um ID que não é de difusão (0xFE), portanto o servo retornará um pacote de estado após a conclusão do recebimento do comando. 

### 4.4 Instrução de escrita assíncrona REG WRITE

A instrução REG WRITE é semelhante à WRITE DATA, exceto que o tempo de execução é diferente. Quando um quadro de instrução REG WRITE é recebido, os dados recebidos são armazenados no buffer para uso posterior, e o registrador de sinalização de escrita assíncrona é definido como 1. Após receber a instrução ACTION, a instrução armazenada é finalmente executada. 

- Comprimento: N+2 (N é o comprimento do parâmetro)

- Instrução: 0x04

- Parâmetro 1: endereço inicial da área de gravação de dados

- Parâmetro 2: o primeiro dado gravado

- Parâmetro 3: o segundo dado gravado

- Parâmetro N: o enésimo dado gravado, onde N = n + 1

Exemplo 5: controlar os servos de ID1 a ID10 para girar até a posição 2048 a uma velocidade de 1000 por segundo. 

```Plain Text
ID 1：Asynchronous Write Command Frame：FF FF 01 09 04 2A 00 08 00 00 E8 03 D4 
ID 1：Response Frame：FF FF 01 02 00 FC
ID 2：Asynchronous Write Command Frame：FF FF 02 09 04 2A 00 08 00 00 E8 03 D3 
ID 2：Response Frame：FF FF 02 02 00 FB
ID 3：Asynchronous Write Command Frame：FF FF 03 09 04 2A 00 08 00 00 E8 03 D2 
ID 3：Response Frame：FF FF 03 02 00 FA
ID 4：Asynchronous Write Command Frame：FF FF 04 09 04 2A 00 08 00 00 E8 03 D1 
ID 4：Response Frame：FF FF 04 02 00 F9
ID 5：Asynchronous Write Command Frame：FF FF 05 09 04 2A 00 08 00 00 E8 03 D0 
ID 5：Response Frame：FF FF 05 02 00 F8
ID 6：Asynchronous Write Command Frame：FF FF 06 09 04 2A 00 08 00 00 E8 03 CF 
ID 6：Response Frame：FF FF 06 02 00 F7
ID 7：Asynchronous Write Command Frame：FF FF 07 09 04 2A 00 08 00 00 E8 03 CE 
ID 7：Response Frame：FF FF 07 02 00 F6
ID 8：Asynchronous Write Command Frame：FF FF 08 09 04 2A 00 08 00 00 E8 03 CD 
ID 8：Response Frame：FF FF 08 02 00 F5
ID 9：Asynchronous Write Command Frame：FF FF 09 09 04 2A 00 08 00 00 E8 03 CC 
ID 9：Response Frame：FF FF 09 02 00 F4
ID10：Asynchronous Write Command Frame：FF FF 0A 09 04 2A 00 08 00 00 E8 03 CB
ID10：Response Frame：FF FF 0A 02 00 F3
```

### 4.5 Executar instrução de escrita assíncrona ACTION

- Função: acionar a instrução REG WRITE

- Comprimento: 0x02

- Instrução: 0x05

- Parâmetro: nenhum

1. A instrução ACTION é muito útil ao controlar vários servos simultaneamente.

2. Ao controlar vários servos, o uso da instrução ACTION permite que o primeiro e o último servos executem suas respectivas ações ao mesmo tempo, sem atraso entre eles.

3. Ao enviar instruções ACTION para vários servos, é usado o ID de difusão (0xFE). Portanto, o envio deste comando não resultará no retorno de um quadro de dados.

Exemplo 6: após enviar o comando de escrita assíncrona para controlar os servos de ID1 a ID10 para girar até a posição 2048 a uma velocidade de 1000 por segundo, um comando de escrita assíncrona precisa ser executado. 

```Plain Text
Command Frame：FF FF FE 02 05 FA
Response Frame：None
```

### 4.6 Instrução de escrita síncrona SYNC WRITE

- Função: usada para controlar vários servos simultaneamente.

- ID:0xFE

- Comprimento: (L+1)\*n+4 (L: comprimento dos dados enviados a cada servo, n: número de servos)

- Instrução: 0x83

- Parâmetro 1: endereço inicial dos dados a serem gravados

- Parâmetro 2: comprimento (L) dos dados a serem gravados

- Parâmetro 3: número de ID do primeiro servo

- Parâmetro 4: grava o primeiro dado do primeiro servo

- Parâmetro 5: grava o segundo dado do primeiro servo
…

- Parâmetro L+3: grava o enésimo dado do 1º servo

- Parâmetro L+4: número de ID do segundo servo

- Parâmetro L+5: grava o primeiro dado do segundo servomotor

- Parâmetro L+6: grava o segundo dado do segundo servo
…

- Parâmetro 2L+4: grava o L-ésimo dado do 2º servo
…

Diferentemente da instrução REG WRITE+ACTION, a instrução SYNC WRITE possui maior desempenho em tempo real. Um único comando SYNC WRITE pode modificar o conteúdo das tabelas de controle de vários servos de uma só vez, enquanto a instrução REG WRITE+ACTION faz isso em etapas. No entanto, ao usar a instrução SYNC WRITE, o comprimento dos dados gravados e o endereço inicial de armazenamento dos dados devem ser os mesmos. 

Exemplo 7: gravar posição 0x0800, tempo 0X0000 e velocidade 0x03E8 (byte baixo primeiro, byte alto por último) no endereço inicial 0x2A de um total de 4 servos, de ID1 a ID4. 

Quadro de comando: FF FF FE 20 83 2A 06 01 00 08 00 00 E8 03 02 00 08 00 00 E8 03 03 00 08 00 00 E8 03 04 00 08 00 00 E8 03 58 (enviado em hexadecimal)

```Plain Text
Header：FF FF
ID：FE
Valid Data Length：20
Instruction：83
Parameter：
2A 06（Start Address Data Length）
01 00 08 00 00 E8 03（ID1 servo Instruction）
02 00 08 00 00 E8 03（ID2 servo Instruction）
03 00 08 00 00 E8 03（ID3 servo Instruction）
04 00 08 00 00 E8 03（ID4 servo Instruction）
Checksum：58
```

### 4.7 Instrução de leitura síncrona SYNC READ

- Função: usada para consultar vários servos simultaneamente.

- ID:0xFE

- Comprimento: n+4 (n é o número de servos)

- Instrução: 0x82

- Parâmetro 1: endereço inicial para leitura dos dados

- Parâmetro 2: comprimento dos dados lidos

- Parâmetro 3: número de ID do 1º servo

- Parâmetro 4: número de ID do segundo servo
…

- Parâmetro N: número de ID do enésimo servo, N = n + 2

Uma instrução SYNC READ pode consultar o conteúdo das tabelas de controle de vários servos de uma só vez. A instrução SYNC READ especifica os IDs dos servos a serem consultados, e os servos retornam pacotes de resposta na ordem dos IDs no pacote de comando. Ao usar a instrução SYNC READ, o comprimento e o endereço inicial de todos os dados consultados devem ser os mesmos (esta instrução está disponível para alguns servos de barramento serial). 

Exemplo 8: consultar a posição atual, a velocidade atual, a carga atual, a tensão atual e a temperatura atual de um total de 2 servomotores, de ID1 a ID2 (endereço inicial 0x38, um total de dados de 8 palavras, com o byte de ordem baixa primeiro e o byte de ordem alta por último).

Quadro de comando: FF FF FE 06 82 38 08 01 02 36

```Plain Text
Header：FF FF
ID：FE
Length：06
Instruction：82
Parameter：
38 08（Data Starting Address  Data Length）
01 02（ID01 ID02）
Checksum：36
```

Quadro de resposta:

```Plain Text
ID01 servo motor：FF FF 01 0A 00 00 08 00 00 00 00 79 1E 55 
ID02 servo motor：FF FF 02 0A 00 FF 07 00 00 00 00 77 23 53
```

O quadro de resposta pode ser decodificado de acordo com o comando de leitura 

### 4.8 Instrução de reinicialização de estado RESET

- Função: reinicializar o estado do servo (reinicializar a contagem de rotações do servo)

- Comprimento: 0x02

- Instrução: 0x0A

- Parâmetro: nenhum

Exemplo 9: reinicializar o servomotor com número de ID 01. 

```Plain Text
Command Frame：FF FF 01 02 0A F2（Send in hexadecimal format）
Response Frame：FF FF 01 02 00 FC（Hexadecimal display）
```

### 4.9 Instrução de calibração de posição

- Função: recalibrar a posição atual para o valor definido

- Comprimento: 0x02 ou 0x04

- Instrução: 0x0B

- Parâmetro: nenhum ou valor definido 

Observação: se o comando de calibração de posição não tiver parâmetros, significa calibrar a posição atual para a posição intermediária; o comando de calibração suporta apenas alguns modelos de servo; consulte a tabela a seguir para os modelos suportados.

Exemplo 10: recalibrar a posição atual para a posição intermediária. 

```Plain Text
Command Frame：FF FF 01 02 0B F1（Send in hexadecimal format）
Response Frame：FF FF 01 02 00 FC（Hexadecimal display）
```

Exemplo 11: a posição atual é recalibrada para 1024. 

Quadro de comando: FF FF 01 04 0B 00 04 EB (enviado em hexadecimal)

```Plain Text
Header：FF FF
ID：01
Length：04
Instruction：0B
Set value：00 04（1024）
Checksum：EB
```

Quadro de resposta: FF FF 01 02 00 FC (exibição em hexadecimal)

```Plain Text
Header：FF FF
ID：01
Length：02
Status：00
Checksum：FC
```

### 4.10 Instrução de restauração de parâmetros

- Função: restaurar os demais parâmetros do servo, exceto o número de ID

- Comprimento: 0x02

- Instrução: 0x06

- Parâmetro: nenhum

Exemplo 11: restaurar os parâmetros do servo.

```Plain Text
Command Frame：FF FF 01 02 06 F6（Send in hexadecimal format）
Response Frame：FF FF 01 02 00 FC（Hexadecimal display）
```

Observação: desbloqueie os parâmetros EPROM antes de restaurar os parâmetros do servo.

### 4.11 Instrução de backup de parâmetros

- Função: backup de parâmetros (usada para a instrução de restauração de parâmetros)

- Comprimento: 0x02

- Instrução: 0x09

- Parâmetro: nenhum

Exemplo 12: fazer backup dos parâmetros do servo.

```Plain Text
Command Frame：FF FF 01 02 09 F3（Send in hexadecimal format）
Response Frame：FF FF 01 02 00 FC（Hexadecimal display）
```

Observação: desbloqueie os parâmetros EPROM antes de fazer o backup dos parâmetros do servo

### 4.12 Comando de reinicialização

- Função: comando de reinicialização (reiniciar o servo)

- Comprimento: 0x02

- Instrução: 0x08

- Parâmetro: nenhum

Exemplo 13: reiniciar o servo. 

```Plain Text
Command Frame：FF FF 01 02 08 F4（Send in hexadecimal format）
Response Frame：None (Restart duration approx. 800ms)
```

Observação: antes de reiniciar o servo, desligue primeiro o interruptor de torque

