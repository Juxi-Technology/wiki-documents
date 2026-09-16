---
title: "02-Tutorial de rastreamento de gestos"
description: "Rastreamento de gestos — Tutorial de utilização (versão com servomotor PWM)"
---

# 02-Tutorial de rastreamento de gestos

**Rastreamento de gestos — Tutorial de utilização (versão com servomotor PWM)**

Este diretório disponibiliza o **rastreamento de gestos**: a câmara reconhece a sua mão e a mão hábil acompanha-a em tempo real (cadeia IK completa).

> Cadeia: câmara → esqueleto da mão no mediapipe → MuJoCo+IK → 8 ângulos de junta → ESP32 → servomotor PWM

> Aplicável a: ESP32-S3 + 8 canais de servomotores PWM. Para a gravação do firmware, consulte `..\03_firmware_docs`.

## 1. Pré-requisitos

1. **Hardware**: ESP32-S3 + 8 canais de servomotores PWM com alimentação, USB ligado e câmara disponível.

2. **Firmware**: já gravado (consulte o manual do utilizador em `..\03_firmware_docs`).

3. **Primeira implementação** (apenas uma vez, veja abaixo).

## 2. Primeira implementação

### 2.1 Instalar o ambiente

Entre em `Demo\Windows_Scripts_CN\`(em sistemas em inglês, utilize `Windows_Deploy_Scripts\`) e clique duas vezes seguindo a numeração:

```Plaintext
1-安装环境.bat   → 安装 Rust / uv / dora(几分钟)
```

Depois de instalar, **feche o terminal e abra-o novamente** uma vez.

### 2.2 Implementar o Demo

```Plaintext
3-部署代码.bat   → 创建 Python 环境 + 编译 AHControl + 安装依赖(几分钟)
```

## 3. Executar o rastreamento de gestos (de cada vez)

### 3.1 Duplo clique no script de execução

Entre em `Demo\Windows_Scripts_CN\` e clique duas vezes em `4-运行代码.bat`:

```Plaintext
Select a run mode:
   1 - 模拟仿真（摄像头手势追踪）
   2 - 真实硬件（SCS0009 总线舵机）
   3 - PWM 舵机（ESP32 直驱）    ← 选 3
```

De seguida, escolha o tipo de mão:

```Plaintext
PWM 舵机（ESP32 直驱）- 请选择灵巧手：
   1 - 右手          ← 选 1
   2 - 左手          ← 选 2
```

### 3.2 Começar a utilizar

1. O script executa automaticamente `dora build` + `dora run`.

2. A janela da câmara abre e os dedos da simulação 3D aparecem.

3. Coloque a mão no enquadramento e mova os dedos → **a simulação 3D acompanha → a mão hábil acompanha**.

4. Parar: Ctrl+C(ou fechar a janela).

> Sistemas Linux: utilize `Demo\Linux_Scripts_CN\`(chinês) ou `Linux_Deploy_Scripts\`(inglês); os nomes dos scripts terminam em `.sh` e exigem `bash 脚本名` ou permissão de execução.

## 4. Como confirmar que está a funcionar corretamente

Na janela de execução, o nó AHControl apresenta:

```Plaintext
[ACK-STATS] sent N frames, ESP32 acked M frames
```

- `M ≈ N`(como `sent 300 frames, ESP32 acked 300 frames`)→ **normal**, a cadeia do servomotor está a funcionar.

- `M = 0` → o ESP32 não recebeu dados; verifique a porta série/a alimentação (veja abaixo).

Enquanto esta linha estiver a crescer, significa que a cadeia do servomotor está normal; o que resta é saber se a câmara consegue acompanhar.

## 5. Alternar entre mão esquerda e direita

Basta escolher o tipo de mão no menu de execução. Após a troca, o script recompila automaticamente; aguarde a conclusão da compilação antes de operar.

## 6. Perguntas frequentes

|Sintoma|Solução|
|---|---|
|O servomotor não se move de forma alguma|Verifique a alimentação (5V 3A), a porta COM e a cablagem; veja se o registo `acked M frames` está em 0|
|A câmara não mostra imagem|Permita o acesso à câmara (Definições → Privacidade → Câmara)|
|A mão não acompanha / com atraso|Iluminação suficiente, mão completamente dentro do enquadramento, movimentos mais lentos e com maior amplitude|
|O tipo de mão ficou invertido / a direção do polegar ficou invertida|Selecionou a mão esquerda/direita correta no menu? Experimente a outra|
|Troquei a porta USB e não encontro a porta série|Execute novamente `2-配置串口.bat` e selecione uma vez a nova porta COM|

## 7. Utilizadores de servomotores de barramento SCS0009

Este Demo suporta também o **servomotor de barramento SCS0009** oficial. No menu, selecione `2 - 真实硬件(SCS0009 总线舵机)`; para configuração e descrição, consulte `Demo\双版本舵机并存说明.md` e o tutorial oficial.

## Descrição do diretório

|Caminho|Conteúdo|
|---|---|
|`Demo\AHControl`|Programa de controlo de servomotores em Rust (código-fonte, compilado automaticamente na implementação)|
|`Demo\AHSimulation`|Simulação MuJoCo + resolução de IK|
|`Demo\HandTracking`|Rastreamento de mãos com MediaPipe|
|`Demo\Windows_Scripts_CN` / `Windows_Deploy_Scripts`|Scripts tudo-em-um para Windows (chinês/inglês)|
|`Demo\Linux_Scripts_CN` / `Linux_Deploy_Scripts`|Scripts tudo-em-um para Linux (chinês/inglês)|
|`Demo\dataflow_*_pwm.yml`|Fluxo de dados da versão PWM (débito 115200 já incorporado)|

