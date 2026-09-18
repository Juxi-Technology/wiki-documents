---
title: "Passo 8: Bug comuni e soluzioni"
description: "Bug comuni in fase di raccolta e inferenza: telecamera non acquisita o disconnessa e errori di comunicazione dei servomotori, con le relative soluzioni."
---

# Passo 8: Bug comuni e soluzioni

## Acquisizione della telecamera non riuscita

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/1.png)

Verifica che il cablaggio della telecamera da polso non sia allentato, in particolare il tratto vicino alla telecamera, che è molto soggetto a falsi contatti

## Telecamera disconnessa

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/2.png)

Riavvia la riga di comando

## Problema di comunicazione del servo 1

ConnectionError: Failed to sync read 'Present_Position' on ids=[1, 2, 3, 4, 5, 6] after 1 tries. [TxRxResult] There is no status packet!

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/3.png)

Soluzione: nel codice `lerobot/src/lerobot/motors/motors_bus.py` cambia tutti i `num_retry` in 99, in particolare quelli corrispondenti alla riga che genera l'errore

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/4.png)

## Problema di comunicazione del servo 2

ConnectionError: Failed to write 'Torque_Enable' on id_=1 with '0' after 6 tries. [TxRxResult] There is no status packet!

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/5.png)

![53823bc8797beb0cd2899d6c65ee9f63.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/6.png)

Soluzione: ricalibrare il braccio robotico

<RelatedProducts slugs="so-arm101" />
