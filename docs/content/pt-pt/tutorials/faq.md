---
title: "FAQ"
description: "Respostas a dúvidas frequentes sobre os produtos da Juxi Technology: braços robóticos SO-ARM101, módulos IMU, voz KWS, câmaras USB e CSI e outros acessórios."
keywords: [faq, solução de problemas, problemas comuns]
---

# FAQ

Perguntas frequentes sobre os produtos da Juxi Technology, organizadas por categoria.

---

## Braços Robóticos · SO-ARM101

**Q: A porta do braço robótico não foi detectada?**

**A:** Execute `lerobot-find-port` para encontrar a porta. Confirme as conexões USB — braços líder/seguidor em suas respectivas portas. No Linux, conceda permissões seriais: `sudo chmod 666 /dev/ttyACM*`.

**Q: Recebi `Could not connect on port "/dev/ttyACM0"`?**

**A:** Verifique se `/dev/ttyACM*` existe e se as permissões foram concedidas, e tente novamente.

**Q: `Magnitude 30841 exceeds 2047` durante a calibração?**

**A:** Desligue e religue o braço robótico e tente calibrar novamente.

**Q: Erro de servo `ConnectionError: Failed to sync read 'Present_Position' on ids=[1,...,6]`?**

**A:** Verifique se o braço daquela porta está energizado e se os servos do barramento estão conectados corretamente.

**Q: `Motor 'gripper' was not found`?**

**A:** Verifique os cabos de comunicação dos servos e a tensão de alimentação.

**Q: GPU indisponível com o PyTorch?**

**A:** Consulte [Problemas de compatibilidade do PyTorch em Jetson Orin](/pt-pt/tutorials/learning-resources/jetson-orin-pytorch-compatibility).

---

## Sensores · Módulo IMU

**Q: Os dados do IMU apresentam deriva excessiva?**

**A:** Execute primeiro a [calibração completa](/pt-pt/tutorials/sensors/imu/calibration); confirme se o módulo está firmemente montado; adicione calibração de temperatura para grandes variações térmicas.

**Q: Leituras do magnetômetro incorretas?**

**A:** Execute a calibração do magnetômetro — gire lentamente em todas as orientações durante o processo, longe de motores e ímãs.

**Q: Sem dados nos tópicos ROS?**

**A:** Verifique as permissões seriais (`sudo chmod 666 /dev/ttyUSB*`) e os parâmetros de porta no seu ficheiro launch.

---

## Acessórios · Reconhecimento de Voz KWS

**Q: O módulo de voz não responde?**

**A:** Confirme se o firmware de fábrica foi gravado. Chips não gravados precisam ser queimados primeiro — veja [Download e gravação de firmware](/pt-pt/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words).

**Q: Sem dados na comunicação serial?**

**A:** Verifique se a taxa de transmissão (baud rate) corresponde ao tutorial e se a fiação está correta (RX/TX cruzados).

---

## Acessórios · Frequência Cardíaca e SpO2

**Q: A inicialização falha (init fail)?**

**A:** Verifique a fiação: endereço I2C padrão 0x57; baud UART 9600.

**Q: Leituras instáveis?**

**A:** Garanta um bom contato entre o sensor e a pele; mantenha o dedo parado.

---

## Acessórios · Câmaras USB / CSI

**Q: A câmara não foi detectada?**

**A:** Verifique o cabo e as portas USB; execute `ls /dev/video*` e `v4l2-ctl --list-devices`.

**Q: A câmara CSI não é reconhecida?**

**A:** Verifique a orientação do cabo flat (contatos metálicos voltados para a placa), conecte somente **com o dispositivo desligado**; verifique JetPack ≥ 5.0.

**Q: Erro no pipeline GStreamer?**

**A:** Confirme JetPack ≥ 5.0; verifique `apt list --installed | grep nvarguscamerasrc`.

---

## Acessórios · Outros

**Q: A captura HDMI 4K mostra ecrã preta?**

**A:** Verifique o tipo de interface HDMI (adaptador HDMI/Micro HDMI/DP) e use o conversor correto.

**Q: O ecrã OLED não acende?**

**A:** Verifique a fiação I2C (SCL/SDA); curtos nos pinos podem danificar a placa host.

**Q: A placa de som USB não foi detectada?**

**A:** Dispositivo plug-and-play; verifique a alimentação USB; alterne o dispositivo de saída de áudio padrão.

**Q: Os servos do gimbal de 2 graus de liberdade não respondem?**

**A:** Verifique a alimentação dos servos (servos SCS precisam de fonte externa de 6-8,4V).

---

## Geral

**Q: Os links do Feishu nos tutoriais não abrem?**
**A:** Os documentos do Feishu são internos/restritos a colaboradores. Prefira este wiki, ou entre em contato com support@juxitech.com.

**Q: Quais plataformas são suportadas?**

**A:** PC (Linux/Windows), Jetson, Raspberry Pi — consulte os "Requisitos de Sistema" de cada tutorial.

**Q: Como obter suporte?**

**A:**
- 📧 support@juxitech.com
- 💬 [GitHub Issues](https://github.com/Juxi-Technology/wiki-documents/issues)

---

## Links Relacionados

- [Guia de seleção de braço robótico](/pt-pt/tutorials/robot-arms/select-guide)
- [Central de downloads](/pt-pt/downloads/)
- [Casos de sucesso](/pt-pt/cases/)
