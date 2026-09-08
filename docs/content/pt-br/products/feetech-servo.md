---
title: Servos de Barramento Feetech (SCS0009 / STS3215)
category: accessory
description: Servos de barramento serial Feetech SCS0009 e STS3215 da Juxi Technology — protocolo SCS, versões magnética/potenciômetro, análise da tabela de memória, ferramenta FD
keywords: [feetech, servo, scs, sts, barramento serial]
---

# Servos de Barramento Feetech (SCS0009 / STS3215)

> **[Comprar na loja](https://www.juxitech.com/products/feetech-scs0009-serial-bus-servo)**

## Visão Geral

Os servos de barramento serial Feetech são o núcleo de acionamento de braços da classe SO-ARM101, usando o **protocolo de comunicação SCS** para cadeias multi-servo em um único barramento. Versões com encoder magnético (STS) e potenciômetro (SCSCL), com depuração pelo software host FD.

**Principais recursos**:

- Comunicação por barramento serial, vários servos em um único barramento
- Versões magnética (STS) / potenciômetro (SCSCL)
- Feedback em tempo real de posição/velocidade/torque
- Documentação completa da tabela de memória
- Comunicação dupla: TTL (alta velocidade) / RS485 (anti-interferência)
- Até 254 servos em um barramento (IDs 0-253, ID de broadcast 254)
- Padrão 1M baud, 8 bits de dados, 1 bit de parada
- Proteção contra sobreaquecimento / sobretensão / sobrecorrente / sobrecarga
- Ferramenta host FD (Windows)

## Especificações

| Categoria | Especificação |
|----------|------|
| Protocolo | Barramento serial SCS |
| Versões | STS3215 (magnético) / SCS0009 (potenciômetro) |
| Depuração | Ferramenta host FD (Windows) |
| Baud | 1.000.000 (padrão do host) |

## Início Rápido

```bash
# Windows FD host: feetechrc.com/software.html
# Select port, baud 1000000, click Search
```

## Tutoriais

- [Tutorial Feetech STS3215 & SCS0009](/pt-br/tutorials/accessories/feetech/Feetech-STS3215&SCS0009-Tutorial)
- [Protocolo de Comunicação SCS](/pt-br/tutorials/accessories/feetech/Feetech-SCS_Communication_Protocol)
- [Tabela de Memória do Servo STS com Encoder Magnético](/pt-br/tutorials/accessories/feetech/Feetech-Magnetic_Encoder_STS_Servo-Memory_Table_Analysis)
- [Tabela de Memória do Servo SCSCL com Potenciômetro](/pt-br/tutorials/accessories/feetech/Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis)

## Suporte

- 📧 E-mail: support@juxitech.com
- 🌐 Site: [www.juxitech.com](https://www.juxitech.com)
