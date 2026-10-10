---
title: Recursos avançados e rastreamento
---

# Recursos avançados e rastreamento

> **[Comprar na loja](https://www.juxitech.com/pt/products/2-dof-servo-pan-tilt-unit)**

Este capítulo descreve em detalhes as funções de rastreamento automático do sistema, incluindo rastreamento de cor, rastreamento de rosto e rastreamento de QR code, além do mecanismo de bloqueio de alvo e do ajuste de parâmetros.

---

## Visão geral dos modos de rastreamento automático

O sistema oferece três modos de rastreamento automático:
1. Rastreamento de cor: rastrear objetos de uma cor especificada
2. Rastreamento de rosto: rastrear rostos
3. Rastreamento de QR code: rastrear QR codes

---

## Rastreamento de cor

### Seleção de cor

O sistema oferece rastreamento de várias cores:
- Vermelho
- Verde
- Azul
No programa, é possível alternar a cor pelas teclas:
- `X`: selecionar vermelho
- `Y`: selecionar verde
- `Z`: selecionar azul

### Fluxo de uso do rastreamento de cor

1. Pressione `C` para conectar o gimbal
2. Pressione `2` para entrar no modo de rastreamento de cor
3. Coloque o objeto da cor desejada no centro da imagem
4. Pressione `T` para bloquear o alvo
5. Mova o alvo e observe o gimbal acompanhar

### Exemplo simples de rastreamento de cor

Você também pode usar o programa de exemplo de rastreamento de cor simples:

```python
python examples/04_color_track_simple.py --camera 0 --port COM3 --color red
```

Este programa oferece a função mais básica de rastreamento de cor e é ideal para aprendizado.

---

## Rastreamento de rosto

### Princípio do rastreamento de rosto

O sistema usa o classificador em cascata Haar do OpenCV para a detecção de rostos. Depois de detectar um rosto, o sistema calcula automaticamente a posição do alvo e controla o gimbal para acompanhá-lo.

### Fluxo de uso do rastreamento de rosto

1. Pressione `C` para conectar o gimbal
2. Pressione `1` para entrar no modo de rastreamento de rosto
3. Coloque o rosto no centro da imagem
4. Pressione `T` para bloquear o alvo
5. Mova o rosto e o gimbal o seguirá automaticamente

### Dicas para aumentar a taxa de sucesso da detecção de rostos

- Mantenha iluminação suficiente e evite contraluz
- Mantenha o rosto de frente para a câmera
- Mantenha uma distância adequada (recomenda-se 1-3 metros)
- Evite cenas com vários rostos ou use o mecanismo de bloqueio para fixar o alvo do rastreamento

---

## Rastreamento de QR code

O modo de rastreamento de QR code usa o QRCodeDetector do OpenCV para reconhecer e localizar QR codes. O uso é semelhante aos dois modos de rastreamento anteriores:
1. Conecte o gimbal e entre no modo de rastreamento de QR code
2. Coloque o QR code no centro da imagem e pressione `T` para bloquear
3. Mova o QR code e observe o gimbal acompanhar

---

## Mecanismo de bloqueio de alvo

### Função do bloqueio

O mecanismo de bloqueio de alvo é uma função essencial do sistema; seus objetivos incluem:
- Registrar a posição central e o tamanho do alvo no momento do bloqueio
- Quando há vários alvos, priorizar o mais próximo do ponto de bloqueio
- Evitar trocas frequentes de alvo e manter a estabilidade do rastreamento

### Fluxo de bloqueio

1. Coloque o objeto-alvo no centro da imagem
2. Pressione `T` para bloquear
3. Após o bloqueio bem-sucedido, o sistema priorizará o alvo mais semelhante ao do momento do bloqueio
4. Pressione `S` para cancelar o bloqueio e parar o rastreamento

### Lógica de seleção durante o bloqueio

Na seleção de alvo após o bloqueio, o sistema considera dois fatores:
- Distância: quão próximo o centro do alvo está do ponto de bloqueio (peso 70%)
- Tamanho: grau de semelhança do tamanho do alvo com o do momento do bloqueio (peso 30%)
- O sistema rastreia o alvo com a maior pontuação combinada

---

## Ajuste dos parâmetros de controle do rastreamento

Em `src/trackers/tracking_controller.py`, há os seguintes parâmetros ajustáveis:

|Parâmetro|Valor padrão|Descrição|
|---|---|---|
|kp_pan|0.08|Ganho proporcional do rastreamento esquerda/direita|
|kp_tilt|0.12|Ganho proporcional do rastreamento cima/baixo|
|dead_zone|30|Zona morta (pixels); dentro dessa faixa o gimbal não se move|
|min_move_interval|0.15|Intervalo mínimo de movimento (segundos), limita a frequência de movimento do gimbal|


### Métodos de ajuste dos parâmetros

- **Rastreamento muito lento**: aumente `kp_pan` e `kp_tilt`
- **Rastreamento sensível demais, causando tremores**: reduza `kp_pan` e `kp_tilt`, ou aumente `min_move_interval`, ou aumente `dead_zone`
- **Microajustes frequentes, causando tremores**: aumente `dead_zone`
- **Direção invertida**: altere o sinal de `delta_pan` ou `delta_tilt` no método `calculate_move`

---

## Exemplo completo de uso do rastreamento

A seguir, um exemplo completo de fluxo de uso:
1. Inicie o programa:

```python
python examples/auto_tracking_demo.py --camera 0 --port COM3 --color red
```

1. Pressione `C` para conectar o gimbal
2. Pressione `2` para selecionar o modo de rastreamento de cor
3. Coloque o objeto vermelho no centro da imagem
4. Pressione `T` para bloquear o alvo
5. Mova o objeto e observe o gimbal acompanhar
6. Se quiser trocar para verde, pressione `Y` e depois pressione `T` novamente para bloquear
7. Pressione `S` para parar o rastreamento e `R` para centralizar
8. Pressione `Q` para sair

---

## Dicas para desenvolvimento avançado

Para personalizar funções ou fazer desenvolvimento secundário, consulte:
- `src/sc_servo.py`: comunicação de baixo nível com os servos
- `src/gimbal.py`: controle do gimbal
- `src/trackers/tracking_controller.py`: controlador de rastreamento
- `src/detectors/`: diversos detectores de alvo
