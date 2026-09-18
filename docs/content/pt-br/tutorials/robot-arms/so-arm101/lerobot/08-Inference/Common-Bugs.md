---
title: "Etapa 8: Bugs comuns e soluções"
description: "Soluções para os bugs mais comuns na implantação: falha ou desconexão da câmera, erros de comunicação dos servos e a recalibração do braço robótico."
---

# Etapa 8: Bugs comuns e soluções

## Falha ao obter a câmera

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/1.png)

Verifique se o cabo da câmera de punho está solto, especialmente o cabo próximo à extremidade da câmera, que é muito propenso a mau contato

## Desconexão da câmera

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/2.png)

Reinicie a linha de comando

## Problema de comunicação do servo 1

ConnectionError: Failed to sync read 'Present_Position' on ids=[1, 2, 3, 4, 5, 6] after 1 tries. [TxRxResult] There is no status packet!

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/3.png)

Solução: altere todos os `num_retry` no código de `lerobot/src/lerobot/motors/motors_bus.py` para 99, especialmente os correspondentes à linha do erro

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/4.png)

## Problema de comunicação do servo 2

ConnectionError: Failed to write 'Torque_Enable' on id_=1 with '0' after 6 tries. [TxRxResult] There is no status packet!

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/5.png)

![53823bc8797beb0cd2899d6c65ee9f63.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/6.png)

Solução: recalibrar o braço robótico

<RelatedProducts slugs="so-arm101" />
