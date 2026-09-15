---
title: "Capítulo 8: Reconhecimento facial"
description: "Capítulo 8 do tutorial ESP32-NanoCam: reconhecimento facial, registo e gestão de faces, comandos de deteção e otimização de desempenho."
---

# Capítulo 8: Reconhecimento facial

> **[Comprar na loja](https://www.juxitech.com/products/esp32-s3-wifi-video-module)**

**Objetivo deste capítulo**: registar características faciais, fazer com que o NanoCam reconheça "quem és tu" e construir uma solução completa de controlo de acesso.

## Princípio

Reconhecimento facial = **deteção de rostos** (pipeline de dois estágios MSR01+MNP01) + **extração de características** (rede neural MFN FaceRecognition112V1S8) + **comparação por similaridade de cosseno**.

```Plain
Fotograma RGB565 da câmara
  → Deteção grosseira MSR01 (320×240, limiar 0.3F)
  → Deteção fina MNP01 (com base nas caixas candidatas da deteção grosseira, limiar 0.4F)
  → Extração de 10 pontos-chave faciais (olhos/nariz/cantos da boca)
  → Alinhamento pelos pontos-chave → recorte da face 112×112
  → Rede convolucional MFN → vetor de características de 512 dimensões
  → Normalização L2
  → Cálculo da distância de cosseno com os vetores de todos os IDs registados na Flash, um a um
  → Similaridade de cosseno máxima > limiar (0.55) → correspondência bem-sucedida → emitir ID
  → Todas as similaridades < limiar → desconhecido → emitir "who?"
```

### Otimização de desempenho

A extração de características MFN e a comparação com toda a base de dados têm um custo computacional elevado; executá-las em todos os fotogramas tornaria a imagem lenta. A implementação atual adota uma **estratégia de salto de fotogramas**: a deteção de rostos corre em cada fotograma (barata), o reconhecimento MFN corre a cada 10 fotogramas (caro), e a etiqueta usa o último resultado de reconhecimento, mantendo-se sobreposta. Assim a imagem mantém-se fluida e a etiqueta de ID não pisca.

### Armazenamento das características faciais

As características faciais registadas (id + embedding de 512 dimensões) são guardadas de forma persistente na partição `fr` da Flash (96 KB, até 47 IDs de faces). Não se perdem ao desligar a alimentação.

## Preparação de hardware

- Placa principal NanoCam + placa base

- Cabo de dados USB-C (para alimentação do computador + porta serial)

- Assistente de porta serial (taxa de baud 115200)

## Passos

### 8.1 Entrar no modo de reconhecimento facial

```Plain
ai_mode:4
```

O dispositivo reinicia automaticamente e entra no modo FaceID; o LED RGB WS2812 (GPIO18 DIN, alimentação VDD50) mostra cor roxa. Após o reinício, a porta serial deve apresentar:

```Plain
I (5526) MFN: fr partition size: 98304 bytes, maxminum 47 IDs can be stored
I (5526) MFN: No face ID in flash
```

`No face ID in flash` indica que ainda não foi registada nenhuma face, o que é normal.

### 8.2 Registar uma face

Coloque a face de frente para a câmara (distância 30-50cm, iluminação uniforme) e garanta que na imagem aparece **apenas uma face**. Envie pela porta serial:

```Plain
face_eril
```

Após detetar a face, o dispositivo extrai automaticamente as características e regista-as na Flash:

```Plain
I (xxxx) ENROLL: ID 1 is enrolled
```

A imagem sobrepõe o texto azul `Enroll: ID 1`, que desaparece após cerca de 0,5 segundos.

> **Atenção**: o comando é `face_eril` (abreviatura de enroll), não `face_enroll`. Se vir `fail: unknown command`, verifique a grafia.

### 8.3 Reconhecer faces

Depois de concluir o registo, envie o comando de reconhecimento:

```Plain
face_rz
```

O sistema entra em modo de reconhecimento contínuo. A face atual é comparada com todos os IDs registados na Flash:

- **Correspondência bem-sucedida**: a porta serial emite `Similarity: 0.85, Match ID: 1`; a imagem sobrepõe continuamente `ID: 1` em verde

- **Desconhecido**: a porta serial emite `Similarity: 0.32, Match ID: 0`; a imagem sobrepõe continuamente `who?` em vermelho

> A etiqueta **mantém-se visível** e não desaparece. Para sair do modo de reconhecimento, envie `face_detect` para voltar ao modo de deteção simples.

### 8.4 Eliminar uma face

```Plain
face_del
```

Elimina o último ID de face registado; a porta serial devolve `N IDs left` e a imagem mostra brevemente o número de IDs restantes. As características na Flash são eliminadas em simultâneo.

### 8.5 Sair do modo de reconhecimento

```Plain
face_detect
```

Volta ao modo de deteção de rostos simples (apenas desenho da caixa + pontos-chave, sem reconhecimento) e as etiquetas de ID são removidas.

> **Sobre o modo DETECT**: no ESP32-S3, a impressão de coordenadas pela porta serial no modo de deteção de rostos simples está desativada (`#if !CONFIG_IDF_TARGET_ESP32S3`), para evitar que o registo de deteção encha a porta serial. Só depois de entrar no modo de reconhecimento (`face_rz`) é que os registos de coordenadas `detection_result` são emitidos.

## Referência rápida de comandos

|Comando|Função|Comportamento da etiqueta|Persistente|
|---|---|---|---|
|`face_eril`|Registar a face detetada atual|Azul "Enroll: ID N"|Pisca 0,5s|
|`face_rz`|Entrar no modo de reconhecimento contínuo|Verde "ID: N" / vermelho "who?"|✅ Contínuo|
|`face_del`|Eliminar o último ID registado|Vermelho "N IDs left"|Pisca 0,5s|
|`face_detect`|Sair do reconhecimento, voltar à deteção simples|Remover todas as etiquetas|—|

> Consulte o [manual do protocolo da porta serial](./ESP32-NanoCam-Serial-Protocol.md) para a lista completa de comandos.

## Exemplo de fluxo de operação

```Plain
ai_mode:4                          # Entrar no modo de reconhecimento facial
[dispositivo reinicia, LED roxo]

face_eril                          # Registar a primeira face (Zhang San)
→ ID 1 is enrolled

face_eril                          # Registar a segunda face (Li Si)
→ ID 2 is enrolled

face_rz                            # Iniciar reconhecimento contínuo
→ Zhang San em frente da câmara: a imagem mostra "ID: 1" continuamente
→ Li Si em frente da câmara: a imagem mostra "ID: 2" continuamente
→ Desconhecido em frente da câmara: a imagem mostra "who?" continuamente

face_detect                        # Sair do modo de reconhecimento
→ As etiquetas desaparecem, apenas a caixa de deteção é desenhada

face_del                           # Eliminar Li Si (ID 2)
→ 1 IDs left

face_rz                            # Reconhecer novamente
→ Zhang San em frente da câmara: "ID: 1"
→ Li Si em frente da câmara: "who?" (já eliminado)
```

> O modo de reconhecimento facial ocupa bastante memória (modelo MFN + deteção de rostos, dois modelos); a porta serial Type-C (UART0) funciona normalmente. Se a porta serial não responder, verifique primeiro se a taxa de baud é 115200.

## Código

### Lógica de reconhecimento principal

`components/modules/ai/who_human_face_recognition.cpp` — estratégia de reconhecimento com salto de fotogramas:

```C++
case RECOGNIZE:
{
    // Salto de fotogramas: 1 reconhecimento MFN a cada 10 deteções
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

## Resolução de problemas

|Sintoma|Causa possível|Solução|
|---|---|---|
|`No face ID in flash`|Normal, ainda não há registos|Envie `face_eril` para registar|
|O resultado é sempre `who?`|Luz insuficiente/ângulo desviado/similaridade abaixo do limiar|Volte a registar, de frente para a câmara, com iluminação uniforme|
|Sem reação ao registar|Número de faces na imagem ≠ 1|Garanta que há apenas uma face, distância 30-50cm|
|Imagem lenta durante o reconhecimento|Normal, a inferência MFN demora|Já otimizado com salto de fotogramas, corre a cada 10 fotogramas|
|Etiqueta a piscar|—|Já corrigido, a etiqueta mantém-se visível|
|`fail: unknown command`|Erro de grafia do comando|Verifique o comando: `face_eril` e não `face_enroll`|

## Efeito

Registar faces → reconhecimento contínuo com ID → resultados pela I2C/porta serial → controlar relés/servos, uma solução completa de controlo de acesso.

Próximo capítulo: [Capítulo 9: Conversa por voz](./Ch09-Voice-Chat.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
