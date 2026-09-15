---
title: "Capítulo 8: Reconhecimento facial"
description: "Capítulo 8 do tutorial do ESP32-NanoCam (módulo de vídeo WiFi ESP32-S3): registrar características faciais e reconhecer pessoas por comandos seriais."
---

# Capítulo 8: Reconhecimento facial

> **[Comprar na loja](https://www.juxitech.com/products/esp32-s3-wifi-video-module)**

**Objetivo do capítulo**: registrar características faciais, fazer o NanoCam reconhecer "quem é você" e montar uma solução completa de controle de acesso.

## Princípio

O reconhecimento facial = **detecção de rosto** (pipeline de dois estágios MSR01+MNP01) + **extração de características** (rede neural MFN FaceRecognition112V1S8) + **comparação por similaridade de cosseno**.

```Plain
摄像头 RGB565 帧
  → MSR01 粗检测（320×240, 0.3F 阈值）
  → MNP01 精检测（基于粗检候选框, 0.4F 阈值）
  → 10 个面部关键点提取（双眼/鼻尖/嘴角）
  → 关键点对齐 → 裁剪 112×112 人脸
  → MFN 卷积网络 → 512 维特征向量
  → L2 归一化
  → 与 Flash 中所有已注册 ID 的向量逐一计算余弦距离
  → 最大余弦相似度 > 阈值(0.55) → 匹配成功 → 输出 ID
  → 所有相似度 < 阈值 → 陌生人 → 输出 "who?"
```

### Otimização de desempenho

A extração de características MFN e a comparação com toda a base têm um custo computacional alto; executá-las em todos os quadros deixaria a imagem travada. A implementação atual usa uma **estratégia de salto de quadros**: a detecção de rosto roda em todos os quadros (barata) e o reconhecimento MFN roda uma vez a cada 10 quadros (caro), com o rótulo sobreposto continuamente a partir do último resultado de reconhecimento. Assim a imagem se mantém fluida e o rótulo de ID não pisca.

### Armazenamento das características faciais

As características faciais registradas (id + embedding de 512 dimensões) são armazenadas de forma persistente na partição `fr` da Flash (96 KB, até 47 IDs de face). Não se perdem com a falta de energia.

## Preparação de hardware

- Placa principal + placa base do NanoCam

- Cabo USB-C (para alimentação + porta serial do computador)

- Assistente de porta serial (taxa de transmissão 115200)

## Passos

### 8.1 Entrar no modo de reconhecimento facial

```Plain
ai_mode:4
```

O dispositivo reinicia automaticamente e entra no modo FaceID; o LED RGB WS2812 (GPIO18 DIN, alimentado por VDD50) fica roxo. Após o reinício, a porta serial deve exibir:

```Plain
I (5526) MFN: fr partition size: 98304 bytes, maxminum 47 IDs can be stored
I (5526) MFN: No face ID in flash
```

`No face ID in flash` indica que nenhuma face foi registrada ainda; isso é normal.

### 8.2 Registrar uma face

Posicione o rosto bem de frente para a câmera (distância 30-50cm, iluminação uniforme) e garanta que haja **apenas um rosto** na imagem. Envie pela porta serial:

```Plain
face_eril
```

Ao detectar o rosto, o dispositivo extrai as características automaticamente e as registra na Flash:

```Plain
I (xxxx) ENROLL: ID 1 is enrolled
```

Um texto azul `Enroll: ID 1` é sobreposto na imagem e desaparece após cerca de 0.5 segundo.

> **Atenção**: o comando é `face_eril` (abreviação de enroll), e não `face_enroll`. Se aparecer `fail: unknown command`, verifique a grafia.

### 8.3 Reconhecer uma face

Após o registro, envie o comando de reconhecimento:

```Plain
face_rz
```

O sistema entra no modo de reconhecimento contínuo. O rosto atual é comparado com todos os IDs registrados na Flash:

- **Correspondência encontrada**: a porta serial exibe `Similarity: 0.85, Match ID: 1`, e a imagem mostra continuamente `ID: 1` em verde

- **Pessoa desconhecida**: a porta serial exibe `Similarity: 0.32, Match ID: 0`, e a imagem mostra continuamente `who?` em vermelho

> O rótulo **permanece visível** e não desaparece. Para sair do modo de reconhecimento, envie `face_detect` para voltar ao modo de detecção pura.

### 8.4 Excluir uma face

```Plain
face_del
```

Exclui o último ID de face registrado; a porta serial retorna `N IDs left`, e a imagem mostra brevemente a quantidade de IDs restantes. As características na Flash são excluídas em conjunto.

### 8.5 Sair do modo de reconhecimento

```Plain
face_detect
```

Volta ao modo de detecção de rosto pura (apenas caixa + pontos-chave, sem reconhecimento) e os rótulos de ID são removidos.

> **Sobre o modo DETECT**: no ESP32-S3, a impressão de coordenadas na porta serial no modo de detecção de rosto pura está desabilitada (`#if !CONFIG_IDF_TARGET_ESP32S3`), para evitar que o log de detecção inunde a porta serial. Os logs de coordenadas `detection_result` só são emitidos ao entrar no modo de reconhecimento (`face_rz`).

## Referência rápida de comandos

|Comando|Função|Comportamento do rótulo|Contínuo?|
|---|---|---|---|
|`face_eril`|Registra a face detectada no momento|Azul "Enroll: ID N"|Pisca por 0.5s|
|`face_rz`|Entra no modo de reconhecimento contínuo|Verde "ID: N" / vermelho "who?"|✅ Contínuo|
|`face_del`|Exclui o último ID registrado|Vermelho "N IDs left"|Pisca por 0.5s|
|`face_detect`|Sai do reconhecimento e volta à detecção pura|Remove todos os rótulos|—|

> Consulte o [manual do protocolo serial](./ESP32-NanoCam-Serial-Protocol.md) para todos os comandos.

## Exemplo de fluxo de operação

```Plain
ai_mode:4                          # 进入人脸识别模式
[设备重启，LED 紫色]

face_eril                          # 注册第一个人脸（张三）
→ ID 1 is enrolled

face_eril                          # 注册第二个人脸（李四）
→ ID 2 is enrolled

face_rz                            # 开始持续识别
→ 张三站摄像头前: 画面持续显示 "ID: 1"
→ 李四站摄像头前: 画面持续显示 "ID: 2"
→ 陌生人站摄像头前: 画面持续显示 "who?"

face_detect                        # 退出识别模式
→ 标签消失，只画检测框

face_del                           # 删除李四 (ID 2)
→ 1 IDs left

face_rz                            # 再次识别
→ 张三站摄像头前: "ID: 1"
→ 李四站摄像头前: "who?" (已被删除)
```

> O modo de reconhecimento facial consome bastante memória (modelo MFN + dois modelos de detecção de rosto), e a porta serial Type-C (UART0) funciona normalmente. Se a porta serial não responder, verifique primeiro se a taxa de transmissão está em 115200.

## Código

### Lógica central de reconhecimento

`components/modules/ai/who_human_face_recognition.cpp` — estratégia de reconhecimento com salto de quadros:

```C++
case RECOGNIZE:
{
    // 跳帧：每 10 次检测执行 1 次 MFN 识别
    static int recog_skip = 0;
    if (recog_skip <= 0) {
        recognize_result = recognizer->recognize(
            (uint16_t *)frame->buf,
            {(int)frame->height, (int)frame->width, 3},
            detect_results.front().keypoint);
        recog_skip = 10;
    }
    recog_skip--;
    frame_show_state = SHOW_STATE_RECOGNIZE;
    break;
}
```

## Solução de problemas

|Sintoma|Causa possível|Solução|
|---|---|---|
|`No face ID in flash`|Normal, nenhuma face registrada ainda|Envie `face_eril` para registrar|
|O resultado é sempre `who?`|Iluminação insuficiente / ângulo desfavorável / similaridade abaixo do limiar|Registre novamente, de frente para a câmera e com iluminação uniforme|
|Sem reação ao registrar|Número de rostos na imagem ≠ 1|Garanta que haja apenas um rosto, a 30-50cm|
|Imagem travando durante o reconhecimento|Normal, a inferência MFN leva tempo|Já otimizado com salto de quadros; roda uma vez a cada 10 quadros|
|Rótulo piscando|—|Corrigido; o rótulo permanece visível sem desaparecer|
|`fail: unknown command`|Erro de digitação no comando|Verifique o comando: `face_eril`, e não `face_enroll`|

## Resultado

Registre a face → reconhecimento contínuo com o ID exibido → resultado na I2C/porta serial → controle de relés/servos: uma solução completa de controle de acesso.

Próximo capítulo: [Capítulo 9: Conversa por voz](./Ch09-Voice-Chat.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
