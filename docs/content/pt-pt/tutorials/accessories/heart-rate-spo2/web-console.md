---
title: "Tutorial de utilização da interface web"
description: "Ligue e monitorize o módulo de frequência cardíaca e SpO2 MAX30102 com a aplicação de host no navegador (Web Serial), sem instalar software."
---

# Tutorial de utilização da interface web

Este tutorial apresenta a utilização da aplicação de host no navegador para ligar e monitorizar o módulo de frequência cardíaca e SpO2. A versão web acede diretamente à porta série através do Web Serial, sem necessidade de instalar Python ou `.exe`, e funciona em Windows, macOS e Linux.

**Endereço online:** [https://juxi-technology.github.io/JUXI_HeartRate_SPO2/](https://juxi-technology.github.io/JUXI_HeartRate_SPO2/)

> A versão web e a aplicação de host para desktop utilizam o mesmo protocolo Modbus RTU (endereço de escravo `0x20`, débito de 9600 baud) e as leituras são exatamente iguais.

## 1. Requisitos de ambiente

- **Chrome, Edge ou Opera** para desktop (com suporte para Web Serial)
- Safari, Firefox e navegadores de telemóvel não implementam o Web Serial e não conseguem ligar-se à porta série
- Controlador USB para TTL (CH340, CP2102, FT232, etc.)
- A página necessita de ligação à internet para carregar
- O navegador autoriza apenas um dispositivo série de cada vez para a página

## 2. Ligação de hardware

| Módulo de frequência cardíaca e SpO2 | USB para TTL |
|---|---|
| **VCC** | **5V** (não ligue a 3.3V) |
| **GND** | **GND** |
| **TX** | **RX** (ligação cruzada) |
| **RX** | **TX** (ligação cruzada) |

⚠️ TX e RX têm de ser ligados de forma cruzada. Depois de ligar tudo, insira o USB para TTL no computador.

## 3. Ligar o dispositivo

1. Abra o endereço online acima no Chrome / Edge / Opera para desktop.
1. Mantenha o débito em **9600**, igual ao do módulo.
1. Clique em «**Ligar porta série**» e selecione, na janela do navegador, o dispositivo USB série correspondente ao módulo.
1. O estado «**Ligado, a aguardar recolha**» indica que a ligação foi bem-sucedida; o dispositivo selecionado aparece ao lado do botão.

> Os parâmetros da porta série são fixos: 8 bits de dados, 1 bit de paragem, sem paridade e sem controlo de fluxo; são definidos automaticamente pela página, sem necessidade de configuração manual.

## 4. Iniciar a recolha e a monitorização

1. Clique em «**Iniciar recolha**» — o LED do módulo acende e o estado muda para «Recolha iniciada, LED aceso».
1. Coloque o dedo sobre o sensor, cobrindo completamente a área ótica; basta apoiar levemente, sem pressionar com força.
1. Clique em «**Iniciar monitorização**» — o estado muda para «A monitorizar...» e os dados em tempo real começam a ser atualizados.

## 5. Descrição da interface

### Dados em tempo real

| Indicador | Unidade | Descrição |
|---|---|---|
| Oxigénio no sangue (SpO2) | % | Saturação de oxigénio no sangue |
| Frequência cardíaca | bpm | Frequência de pulso |
| Temperatura | °C | Temperatura da placa do módulo, não é temperatura corporal |

**Filtragem**: ativada por predefinição. Aplica uma suavização por mediana de 5 pontos às leituras e elimina valores anómalos fora das faixas razoáveis (frequência cardíaca 35–220, SpO2 70–100%, temperatura 0–60 °C). A quantidade de valores eliminados é apresentada abaixo da área de dados, por exemplo «N valores anómalos eliminados». Desmarque a opção para ver as leituras em bruto não processadas.

**Mensagens de estado**: Não ligado / A aguardar seleção do dispositivo… / Ligado, a aguardar recolha / Recolha iniciada, LED aceso / Recolha encerrada, LED apagado / A monitorizar… / Monitorização parada / Dispositivo desligado / O navegador atual não suporta Web Serial.

### Alternância de idioma

O botão **EN / 中文** no canto superior direito permite alternar o idioma da interface. O débito e o estado da filtragem ficam memorizados no navegador e mantêm-se na próxima abertura.

### Separador de documentação

O separador «**Documentação**» no topo inclui os tutoriais deste produto em 11 idiomas, permitindo alternar o idioma diretamente na página.

## 6. Parar e desligar

Recomenda-se a seguinte ordem de operações:

1. Clique em «Parar monitorização»
1. Clique em «Encerrar recolha» — o LED apaga
1. Clique em «Desligar»

## 7. Interpretação dos dados

| Dados | Faixa normal | Descrição |
|---|---|---|
| SpO2 | 95% – 100% | Abaixo de 90%, recomenda-se procurar assistência médica |
| Frequência cardíaca | 60 – 100 bpm | Faixa de repouso em adultos |
| Temperatura | 25 – 35 °C | Temperatura do sensor na placa, não é temperatura corporal |

Logo após a ligação ou se o dedo não estiver bem colocado, é normal o valor apresentar `-1`.

## 8. Diferenças em relação à aplicação de host para desktop

| Item de comparação | Versão web | Aplicação de host para desktop |
|---|---|---|
| Instalação | Não requer instalação | Requer executar `.exe` ou script Python |
| Ambiente de execução | Navegador | Windows |
| Modo de comunicação | Web Serial | Porta série do sistema |
| Utilização offline | Não suportada; a página necessita de internet | Suportada |
| Protocolo e leituras | Iguais | Iguais |

## 9. Perguntas frequentes

**P1: aparece a mensagem «O navegador atual não suporta Web Serial».**
Utilize o Chrome, Edge ou Opera para desktop. Safari, Firefox e navegadores de telemóvel não implementam o Web Serial.

**P2: depois de clicar em «Ligar porta série», não aparece nenhum dispositivo na janela.**
Verifique se o controlador USB para TTL está instalado e se o cabo de dados suporta transmissão de dados; experimente outra porta USB ou volte a ligar o cabo e tente novamente.

**P3: a ligação falha.**
Confirme se a porta série não está ocupada por outro programa (assistente de porta série, Arduino IDE, etc.) e se o dispositivo está alimentado.

**P4: depois de clicar em «Iniciar recolha», o LED não acende.**
Confirme se o VCC está ligado a 5V e não a 3.3V, e verifique se TX/RX estão ligados de forma cruzada.

**P5: os dados continuam a apresentar -1.**
Confirme se já clicou em «Iniciar recolha», se o dedo cobre completamente a área ótica do sensor e mantenha-o estável durante alguns segundos.

**P6: o dispositivo foi desligado.**
A página apresentará «Dispositivo desligado»; volte a ligar o dispositivo e clique novamente em «Ligar porta série».

## 10. Precauções

1. Ligue primeiro o sensor e só depois insira o USB.
1. O sensor tem de ser alimentado com 5V; 3.3V pode não funcionar corretamente.
1. Durante a medição, cubra completamente a área ótica com o dedo e não pressione com força.
1. Evite luz forte a incidir diretamente sobre o sensor.
1. O navegador autoriza apenas um dispositivo série de cada vez; vários dispositivos têm de ser ligados separadamente.
