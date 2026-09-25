---
title: "Bugs comuns e soluções"
description: "Soluções para bugs comuns na implantação, como falhas na ligação à câmara, desconexões e problemas de comunicação com o servo 1."
---

# Bugs comuns e soluções

## Falha ao obter a câmara

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/1.png)

Verifique se a ligação do cabo da câmara de pulso está solta, especialmente a extremidade do cabo junto à câmara, que é muito propensa a mau contacto

## Desconexão da câmara

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/2.png)

Reinicie a linha de comando

## Problema de comunicação do servo 1

ConnectionError: Failed to sync read 'Present\_Position' on ids=\[1, 2, 3, 4, 5, 6\] after 1 tries\. \[TxRxResult\] There is no status packet\!

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/3.png)

Solução: altere todos os `num_retry` no código de `lerobot/src/lerobot/motors/motors_bus.py` para 99, especialmente o correspondente à linha do erro

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/4.png)

## Problema de comunicação do servo 2

ConnectionError: Failed to write 'Torque\_Enable' on id\_=1 with '0' after 6 tries\. \[TxRxResult\] There is no status packet\!

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/5.png)

![53823bc8797beb0cd2899d6c65ee9f63\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/6.png)

Solução: recalibrar o braço robótico


