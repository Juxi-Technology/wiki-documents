---
title: "Step 8: Inference — Common Bugs"
description: "Fix common inference problems such as camera acquisition failure, camera disconnection, and servo communication errors on the arm."
---

# Step 8: Inference — Common Bugs

## Camera acquisition failure

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/1.png)

Check whether the wiring of the wrist camera is loose, especially the wiring near the camera end, which is very prone to poor contact

## Camera disconnection

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/2.png)

Restart the command line

## Servo communication problem 1

ConnectionError: Failed to sync read 'Present_Position' on ids=[1, 2, 3, 4, 5, 6] after 1 tries. [TxRxResult] There is no status packet!

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/3.png)

Solution: in the `lerobot/src/lerobot/motors/motors_bus.py` code, change all `num_retry` to 99, especially the one corresponding to the error line

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/4.png)

## Servo communication problem 2

ConnectionError: Failed to write 'Torque_Enable' on id_=1 with '0' after 6 tries. [TxRxResult] There is no status packet!

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/5.png)

![53823bc8797beb0cd2899d6c65ee9f63.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/6.png)

Solution: recalibrate the robotic arm

<RelatedProducts slugs="so-arm101" />
