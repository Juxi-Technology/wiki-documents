---
title: "Tutorial de uso da interface web"
description: "Conecte e monitore o módulo de frequência cardíaca e SpO2 MAX30102 com o aplicativo de host no navegador (Web Serial), sem instalar software."
---

# Tutorial de uso da interface web

Este tutorial apresenta o uso do aplicativo de host no navegador para conectar e monitorar o módulo de frequência cardíaca e SpO2. A versão web acessa diretamente a porta serial via Web Serial, sem necessidade de instalar Python ou `.exe`, e funciona em Windows, macOS e Linux.

**Endereço online:** [https://juxi-technology.github.io/JUXI_HeartRate_SPO2/](https://juxi-technology.github.io/JUXI_HeartRate_SPO2/)

> A versão web e o aplicativo de host para desktop usam o mesmo protocolo Modbus RTU (endereço de escravo `0x20`, 9600 baud) e as leituras são completamente idênticas.

## 1. Requisitos de ambiente

- **Chrome, Edge ou Opera** para desktop (com suporte a Web Serial)
- Safari, Firefox e navegadores de celular não implementam o Web Serial e não conseguem se conectar à porta serial
- Driver USB para TTL (CH340, CP2102, FT232 etc.)
- A página precisa de conexão à internet para carregar
- O navegador autoriza apenas um dispositivo serial por vez para a página

## 2. Ligação de hardware

| Módulo de frequência cardíaca e SpO2 | USB para TTL |
|---|---|
| **VCC** | **5V** (não ligue a 3.3V) |
| **GND** | **GND** |
| **TX** | **RX** (ligação cruzada) |
| **RX** | **TX** (ligação cruzada) |

⚠️ TX e RX devem ser ligados de forma cruzada. Depois de ligar tudo, insira o USB para TTL no computador.

## 3. Conectar o dispositivo

1. Abra o endereço online acima no Chrome / Edge / Opera para desktop.
1. Mantenha a taxa de transmissão em **9600**, igual à do módulo.
1. Clique em “**Conectar porta serial**” e selecione, na janela do navegador, o dispositivo USB serial correspondente ao módulo.
1. O status “**Conectado, aguardando coleta**” indica que a conexão foi bem-sucedida; o dispositivo selecionado aparecerá ao lado do botão.

> Os parâmetros da porta serial são fixos em 8 bits de dados, 1 bit de parada, sem paridade e sem controle de fluxo; são definidos automaticamente pela página, sem necessidade de configuração manual.

## 4. Iniciar a coleta e o monitoramento

1. Clique em “**Iniciar coleta**” — o LED do módulo acende e o status muda para “Coleta iniciada, LED aceso”.
1. Coloque o dedo sobre o sensor, cobrindo completamente a área óptica; basta apoiar levemente, sem pressionar com força.
1. Clique em “**Iniciar monitoramento**” — o status muda para “Monitorando...” e os dados em tempo real começam a ser atualizados.

## 5. Descrição da interface

### Dados em tempo real

| Indicador | Unidade | Descrição |
|---|---|---|
| Oxigênio no sangue (SpO2) | % | Saturação de oxigênio no sangue |
| Frequência cardíaca | bpm | Frequência de pulso |
| Temperatura | °C | Temperatura da placa do módulo, não é temperatura corporal |

**Filtragem**: ativada por padrão. Aplica uma suavização por mediana de 5 pontos às leituras e remove valores anómalos fora das faixas razoáveis (frequência cardíaca 35–220, SpO2 70–100%, temperatura 0–60 °C). A quantidade de valores removidos aparece abaixo da área de dados, por exemplo “N valores anómalos removidos”. Desmarque a opção para ver as leituras brutas não processadas.

**Mensagens de estado**: Não conectado / Aguardando seleção do dispositivo… / Conectado, aguardando coleta / Coleta iniciada, LED aceso / Coleta encerrada, LED apagado / Monitorando… / Monitoramento parado / Dispositivo desconectado / O navegador atual não suporta Web Serial.

### Alternância de idioma

O botão **EN / 中文** no canto superior direito alterna o idioma da interface. A taxa de transmissão e o estado do filtro são memorizados pelo navegador e mantidos na próxima abertura.

### Aba de documentação

A aba “**Documentação**” no topo inclui os tutoriais deste produto em 11 idiomas, permitindo alternar o idioma diretamente na página.

## 6. Parar e desconectar

Recomenda-se a seguinte ordem de operações:

1. Clique em “Parar monitoramento”
1. Clique em “Encerrar coleta” — o LED apaga
1. Clique em “Desconectar”

## 7. Interpretação dos dados

| Dados | Faixa normal | Descrição |
|---|---|---|
| SpO2 | 95% – 100% | Abaixo de 90%, recomenda-se procurar atendimento médico |
| Frequência cardíaca | 60 – 100 bpm | Faixa de repouso em adultos |
| Temperatura | 25 – 35 °C | Temperatura do sensor na placa, não é temperatura corporal |

Logo após conectar ou se o dedo não estiver bem colocado, é normal o valor exibir `-1`.

## 8. Diferenças em relação ao aplicativo de host para desktop

| Item de comparação | Versão web | Aplicativo de host para desktop |
|---|---|---|
| Instalação | Não requer instalação | Requer executar `.exe` ou script Python |
| Ambiente de execução | Navegador | Windows |
| Modo de comunicação | Web Serial | Porta serial do sistema |
| Uso offline | Não suportado; a página precisa de internet | Suportado |
| Protocolo e leituras | Iguais | Iguais |

## 9. Perguntas frequentes

**P1: aparece a mensagem “O navegador atual não suporta Web Serial”.**
Use o Chrome, Edge ou Opera para desktop. Safari, Firefox e navegadores de celular não implementam o Web Serial.

**P2: depois de clicar em “Conectar porta serial”, nenhum dispositivo aparece na janela.**
Verifique se o driver USB para TTL está instalado e se o cabo de dados suporta transmissão de dados; tente outra porta USB ou desconecte e reconecte o cabo e tente novamente.

**P3: a conexão falha.**
Confirme se a porta serial não está ocupada por outro programa (assistente de porta serial, Arduino IDE etc.) e se o dispositivo está alimentado.

**P4: depois de clicar em “Iniciar coleta”, o LED não acende.**
Confirme se o VCC está ligado a 5V, e não a 3.3V, e verifique se TX/RX estão ligados de forma cruzada.

**P5: os dados continuam exibindo -1.**
Confirme se você já clicou em “Iniciar coleta”, se o dedo cobre completamente a área óptica do sensor e mantenha-o estável por alguns segundos.

**P6: o dispositivo foi desconectado.**
A página exibirá “Dispositivo desconectado”; reconecte o dispositivo e clique novamente em “Conectar porta serial”.

## 10. Precauções

1. Conecte primeiro o sensor e depois insira o USB.
1. O sensor deve ser alimentado com 5V; 3.3V pode não funcionar corretamente.
1. Durante a medição, cubra completamente a área óptica com o dedo e não pressione com força.
1. Evite luz forte incidindo diretamente sobre o sensor.
1. O navegador autoriza apenas um dispositivo serial por vez; vários dispositivos precisam ser conectados separadamente.
