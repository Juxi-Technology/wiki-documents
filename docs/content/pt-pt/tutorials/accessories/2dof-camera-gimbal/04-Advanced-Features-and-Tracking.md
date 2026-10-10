---
title: Funcionalidades avançadas e rastreio
---

# Funcionalidades avançadas e rastreio

> **[Comprar na loja](https://www.juxitech.com/products/2-dof-servo-pan-tilt-unit)**

Este capítulo descreve em detalhe as funcionalidades de rastreio automático do sistema, incluindo o rastreio de cores, o rastreio de rostos e o rastreio de códigos QR, bem como o mecanismo de bloqueio de alvos e a afinação de parâmetros.

---

## Visão geral dos modos de rastreio automático

O sistema suporta três modos de rastreio automático:
1. Rastreio de cores: rastrear objetos de uma cor específica
2. Rastreio de rostos: rastrear rostos
3. Rastreio de códigos QR: rastrear códigos QR

---

## Rastreio de cores

### Seleção de cor

O sistema suporta o rastreio de várias cores:
- Vermelho
- Verde
- Azul
No programa, pode alternar a cor através das teclas:
- `X`: selecionar vermelho
- `Y`: selecionar verde
- `Z`: selecionar azul

### Fluxo de utilização do rastreio de cores

1. Prima `C` para conectar o gimbal
2. Prima `2` para entrar no modo de rastreio de cores
3. Coloque o objeto com a cor pretendida no centro da imagem
4. Prima `T` para bloquear o alvo
5. Mova o alvo e observe o efeito de seguimento do gimbal

### Exemplo simples de rastreio de cores

Também pode utilizar o programa de exemplo simples de rastreio de cores:

```python
python examples/04_color_track_simple.py --camera 0 --port COM3 --color red
```

Este programa disponibiliza a funcionalidade de rastreio de cores mais básica; adequado para aprendizagem.

---

## Rastreio de rostos

### Princípio do rastreio de rostos

O sistema utiliza o classificador em cascata de Haar do OpenCV para a deteção de rostos. Após detetar um rosto, o sistema calcula automaticamente a posição do alvo e controla o gimbal para o seguir.

### Fluxo de utilização do rastreio de rostos

1. Prima `C` para conectar o gimbal
2. Prima `1` para entrar no modo de rastreio de rostos
3. Coloque o rosto no centro da imagem
4. Prima `T` para bloquear o alvo
5. Mova o rosto; o gimbal segue automaticamente

### Sugestões para melhorar a taxa de sucesso da deteção de rostos

- Mantenha uma iluminação adequada e evite contraluz
- O rosto deve estar virado de frente para a câmara
- Mantenha uma distância adequada (recomendado: 1-3 metros)
- Evite cenas com vários rostos ou utilize o mecanismo de bloqueio para fixar o alvo do rastreio

---

## Rastreio de códigos QR

O modo de rastreio de códigos QR utiliza o QRCodeDetector do OpenCV para o reconhecimento e a localização de códigos QR. O método de utilização é semelhante ao dos dois modos anteriores:
1. Conecte o gimbal e entre no modo de rastreio de códigos QR
2. Coloque o código QR no centro da imagem e prima `T` para bloquear
3. Mova o código QR e observe o efeito de seguimento do gimbal

---

## Mecanismo de bloqueio de alvos

### Função do bloqueio

O mecanismo de bloqueio de alvos é uma funcionalidade essencial do sistema e desempenha as seguintes funções:
- Regista a posição central e o tamanho do alvo no momento do bloqueio
- Quando aparecem vários alvos, dá prioridade ao alvo mais próximo do ponto de bloqueio
- Evita que o alvo mude constantemente e mantém a estabilidade do rastreio

### Fluxo de bloqueio

1. Coloque o objeto alvo no centro da imagem
2. Prima `T` para bloquear
3. Após o bloqueio bem-sucedido, o sistema dá prioridade ao alvo mais semelhante ao do momento do bloqueio
4. Prima `S` para cancelar o bloqueio e parar o rastreio

### Lógica de seleção no bloqueio

Ao selecionar o alvo após o bloqueio, o sistema tem em conta dois fatores:
- Distância: proximidade do centro do alvo em relação ao ponto de bloqueio (peso 70%)
- Tamanho: semelhança do tamanho do alvo com o do momento do bloqueio (peso 30%)
- O sistema escolhe para rastreio o alvo com a pontuação global mais elevada

---

## Afinação dos parâmetros de controlo do rastreio

Em `src/trackers/tracking_controller.py`, existem os seguintes parâmetros ajustáveis:

|Nome do parâmetro|Valor predefinido|Descrição|
|---|---|---|
|kp_pan|0.08|Ganho proporcional do rastreio horizontal|
|kp_tilt|0.12|Ganho proporcional do rastreio vertical|
|dead_zone|30|Intervalo da zona morta (píxeis); dentro deste intervalo o gimbal não se move|
|min_move_interval|0.15|Intervalo mínimo entre movimentos (segundos); limita a frequência de movimento do gimbal|


### Métodos de ajuste dos parâmetros

- **Rastreio demasiado lento**: aumente `kp_pan` e `kp_tilt`
- **Rastreio demasiado sensível, que causa vibração**: diminua `kp_pan` e `kp_tilt`, ou aumente `min_move_interval`, ou aumente `dead_zone`
- **Ajustes finos frequentes, que causam vibração**: aumente `dead_zone`
- **Direção invertida**: altere o sinal de `delta_pan` ou `delta_tilt` no método `calculate_move`

---

## Exemplo completo de utilização do rastreio

Segue-se um exemplo completo do fluxo de utilização:
1. Inicie o programa:

```python
python examples/auto_tracking_demo.py --camera 0 --port COM3 --color red
```

1. Prima `C` para conectar o gimbal
2. Prima `2` para selecionar o modo de rastreio de cores
3. Coloque o objeto vermelho no centro da imagem
4. Prima `T` para bloquear o alvo
5. Mova o objeto e observe o efeito de seguimento do gimbal
6. Se quiser mudar para verde, prima `Y` e volte a premir `T` para bloquear
7. Prima `S` para parar o rastreio e `R` para recentrar
8. Prima `Q` para sair

---

## Sugestões de desenvolvimento avançado

Se precisar de personalizar funcionalidades ou desenvolver trabalho adicional, pode consultar:
- `src/sc_servo.py`: camada de comunicação de baixo nível com os servos
- `src/gimbal.py`: controlo do gimbal
- `src/trackers/tracking_controller.py`: controlador de rastreio
- `src/detectors/`: vários detetores de alvos
