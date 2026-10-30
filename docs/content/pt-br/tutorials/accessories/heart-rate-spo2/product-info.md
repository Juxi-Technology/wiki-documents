---
title: "Informações do produto"
description: "Visão geral do produto, princípio de detecção, especificações técnicas, definição dos pinos e cenários típicos de aplicação do módulo sensor de frequência cardíaca e SpO2 MAX30102."
---

# Informações do produto

## 1. Visão geral do produto

O módulo sensor de frequência cardíaca e SpO2 Gravity: MAX30102 está equipado com o chip dedicado MAX30102 de alta precisão original da Maxim e integra um microcontrolador com algoritmo de frequência cardíaca e SpO2 desenvolvido internamente; não é necessário que o dispositivo mestre escreva programas complexos de cálculo, pois o módulo pode emitir diretamente valores padronizados de frequência cardíaca e saturação de oxigênio no sangue.

O módulo realiza a aquisição de dados fisiológicos brutos com base no método PPG (fotopletismografia), e o microcontrolador da placa executa automaticamente todo o processamento de filtragem do sinal, cálculo dos dados e calibração dos valores; por fim, transmite os resultados da detecção para o exterior através das duas interfaces de comunicação universais, I2C e UART. Isso reduz drasticamente a dificuldade de adaptação de hardware para o desenvolvedor e o consumo de recursos do MCU principal, permitindo que até iniciantes concluam rapidamente o desenvolvimento do projeto. Além disso, o módulo inclui um software de host dedicado para PC, que permite ler os dados diretamente pelo computador e visualizar em tempo real os dados de frequência cardíaca e SpO2, tornando a depuração prática e eficiente.

## 2. Princípio de funcionamento da detecção

O módulo utiliza o **método de detecção por fotopletismografia (PPG)** para realizar a detecção não invasiva de indicadores fisiológicos: os vasos arteriais do corpo humano acompanham o batimento cardíaco, produzindo variações regulares de dilatação e contração, o que por sua vez provoca flutuações periódicas do volume de sangue nos vasos; a alteração do volume sanguíneo afeta diretamente a transmitância da luz no tecido da ponta do dedo. O módulo emite luz com comprimentos de onda específicos, coleta o sinal de luz refletida e captura as variações dinâmicas da transmitância; com o algoritmo integrado, converte com precisão os valores em tempo real de frequência cardíaca de pulso e saturação de oxigênio no sangue.

## 3. Precauções de uso

1. **A pressão aplicada afeta a precisão dos dados**: uma pressão irregular do dedo sobre o sensor ou uma pressão que muda continuamente interfere no sinal do caminho óptico, causando desvios nos valores de frequência cardíaca e SpO2; durante o uso, recomenda-se manter o dedo estável e a força de pressão constante.
1. **Instruções de colocação**: a área de medição deste módulo limita-se à ponta do dedo; a sonda de medição não tem distinção de frente e verso, e a colocação é simples.
1. **Declaração de não dispositivo médico**: este produto é um módulo eletrônico de detecção de nível consumidor e não é um dispositivo médico profissional; os dados de medição servem apenas como referência de saúde cotidiana e não podem ser usados para diagnóstico clínico, monitoramento de doenças ou tratamento médico auxiliar.

- Basta encostar a polpa do dedo ao sensor e fixá-la com a correia de fixação fornecida

![Diagrama](../../../../../public/images/tutorials/accessories/heart-rate-spo2/product-info/01.png)

## 4. Especificações técnicas

- Tensão de alimentação: 3.3-5V
- Corrente de operação: <15mA
- Modo de comunicação: I2C/UART
- Endereço I2C: 0x57
- Taxa de transmissão da porta serial: 9600
- Faixa de temperatura de operação: -40℃~85℃
- Dimensões do produto: 25.5*32mm

**Definição dos pinos (serigrafia):**

| Nº | Serigrafia | Descrição da função |
|---|---|---|
| 1 | D/T | Linha de dados I2C/TX |
| 2 | C/T | Linha de clock I2C/RX |
| 3 | GND | Polo negativo da alimentação |
| 4 | VCC | Polo positivo da alimentação |

## 5. Cenários típicos de aplicação

- Projetos de desenvolvimento de monitoramento de frequência cardíaca e SpO2 para dispositivos vestíveis inteligentes
- Construção DIY de medidores domésticos simples de frequência cardíaca e SpO2
- Sistemas de monitoramento contínuo e ininterrupto de sinais vitais humanos a longo prazo
- Projetos de hardware open source para makers e experimentos de detecção fisiológica em aulas práticas de eletrônica em universidades
