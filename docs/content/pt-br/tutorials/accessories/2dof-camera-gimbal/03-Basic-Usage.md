---
title: Uso básico
---

# Uso básico

> **[Comprar na loja](https://www.juxitech.com/pt/products/2-dof-servo-pan-tilt-unit)**

Este capítulo descreve em detalhes os métodos básicos de controle do gimbal e o fluxo de uso, ajudando o usuário a se familiarizar com as operações básicas.

---

## Visão geral dos modos de controle

O sistema do gimbal oferece dois modos principais de controle:
1. Controle por teclado: controlar manualmente o movimento do gimbal com as teclas do teclado
2. Rastreamento automático: o sistema identifica e rastreia o alvo automaticamente

---

## Controle por teclado

### Descrição das teclas de atalho

Estas são as teclas de atalho disponíveis no programa principal:

|Tecla|Função|
|---|---|
|Seta ←|Girar o gimbal para a esquerda|
|Seta →|Girar o gimbal para a direita|
|Seta ↑|Inclinar o gimbal para cima|
|Seta ↓|Inclinar o gimbal para baixo|
|C|Conectar ou desconectar o gimbal|
|R|Centralizar o gimbal (voltar à posição inicial)|
|1|Alternar para o modo de rastreamento de rosto|
|2|Alternar para o modo de rastreamento de cor|
|T|Bloquear/iniciar o rastreamento do alvo|
|S|Parar o rastreamento|
|X|Modo de cor: rastrear objetos vermelhos|
|Y|Modo de cor: rastrear objetos verdes|
|Z|Modo de cor: rastrear objetos azuis|
|Q|Sair do programa|


### Exemplo independente de controle por teclado

Você também pode praticar com o programa de controle por teclado independente:

```python
python examples/keyboard_control.py --port COM3
```

Este programa oferece apenas funções básicas de controle do gimbal; é ideal para iniciantes.

---

## Fluxo de operações básicas

### Inicialização e conexão

1. Inicie o programa principal com o seguinte comando:

```python
python examples/auto_tracking_demo.py --camera 0 --port COM3
```

1. Depois que o programa iniciar, pressione `C` para conectar o gimbal
2. Observe se os servos respondem normalmente; se houver algum problema, consulte o capítulo de solução de problemas

### Prática de controle manual

1. Pressione as setas e observe se o movimento do gimbal corresponde ao esperado
2. Pratique mover o gimbal para diferentes posições com as setas
3. Pressione `R` para centralizar o gimbal
4. Familiarize-se com os limites de posição mínima e máxima do gimbal
Recomenda-se realizar os seguintes exercícios:
- Exercício 1: mova o gimbal até as quatro posições extremas (mais à esquerda, mais à direita, mais acima e mais abaixo) para se familiarizar com a faixa de posição
- Exercício 2: centralize o gimbal a partir de qualquer posição e observe se o retorno ao centro é fluido
- Exercício 3: experimente os ajustes finos para se familiarizar com a precisão de movimento dos servos

---

## Programas de exemplo básicos

O projeto oferece vários programas de exemplo progressivos para você aprender:

### Apenas mostrar a câmera

```python
python examples/01_camera_only.py --camera 0
```

Este programa apenas abre a câmera e mostra a imagem em tempo real, sem envolver o controle do gimbal. É ideal para verificar se a câmera funciona corretamente.

### Apenas controlar o gimbal

```python
python examples/02_gimbal_only.py --port COM3
```

Este programa oferece apenas o controle do gimbal, sem envolver a câmera. É ideal para verificar se a conexão entre os servos e a placa de driver está correta.

### Câmera e gimbal combinados

```python
python examples/03_simple_gimbal_camera.py --camera 0 --port COM3
```

Este programa combina a exibição da câmera com o controle do gimbal, permitindo observar o efeito conjunto entre a imagem e o gimbal.

---

## Precauções de uso

Durante o uso, observe os seguintes pontos:
1. Depois de conectar o gimbal, confirme que a alimentação dos servos está conectada
2. Durante o controle manual, evite permanecer por muito tempo nas posições extremas
3. Evite impactos bruscos ou força excessiva contra o suporte do gimbal durante a manipulação
4. Se os servos vibrarem de forma anormal ou emitirem ruídos estranhos, corte a alimentação imediatamente e verifique
5. Se não for usá-lo por muito tempo, recomenda-se desconectar a alimentação
