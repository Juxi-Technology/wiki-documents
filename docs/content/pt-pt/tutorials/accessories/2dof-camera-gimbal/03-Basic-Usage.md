---
title: Utilização básica
---

# Utilização básica

> **[Comprar na loja](https://www.juxitech.com/products/2-dof-servo-pan-tilt-unit)**

Este capítulo descreve em detalhe os métodos básicos de controlo do gimbal e o fluxo de utilização, para ajudar o utilizador a familiarizar-se com as operações básicas.

---

## Visão geral dos métodos de controlo

O sistema do gimbal suporta dois métodos principais de controlo:
1. Controlo por teclado: controlar manualmente o movimento do gimbal através das teclas
2. Rastreio automático: o sistema identifica e rastreia os alvos automaticamente

---

## Controlo por teclado

### Descrição das teclas de atalho

Seguem-se as teclas de atalho disponíveis no programa principal:

|Tecla|Descrição da função|
|---|---|
|Seta ←|Rodar o gimbal para a esquerda|
|Seta →|Rodar o gimbal para a direita|
|Seta ↑|Inclinar o gimbal para cima|
|Seta ↓|Inclinar o gimbal para baixo|
|C|Conectar ou desconectar o gimbal|
|R|Recentrar o gimbal (voltar à posição inicial)|
|1|Alternar para o modo de rastreio de rostos|
|2|Alternar para o modo de rastreio de cores|
|T|Bloquear/iniciar o rastreio do alvo|
|S|Parar o rastreio|
|X|Modo de cor: rastrear objetos vermelhos|
|Y|Modo de cor: rastrear objetos verdes|
|Z|Modo de cor: rastrear objetos azuis|
|Q|Sair do programa|


### Exemplo de controlo por teclado independente

Também pode praticar com o programa de controlo por teclado em separado:

```python
python examples/keyboard_control.py --port COM3
```

Este programa disponibiliza apenas as funcionalidades básicas de controlo do gimbal; adequado para principiantes.

---

## Fluxo de operação básica

### Arranque e conexão

1. Utilize o seguinte comando para iniciar o programa principal:

```python
python examples/auto_tracking_demo.py --camera 0 --port COM3
```

1. Depois de iniciar o programa, prima `C` para conectar o gimbal
2. Observe se os servos respondem normalmente; em caso de anomalia, consulte o capítulo de resolução de problemas

### Prática de controlo manual

1. Prima as setas e observe se o movimento do gimbal corresponde ao esperado
2. Pratique mover o gimbal para diferentes posições com as setas
3. Prima `R` para recentrar o gimbal
4. Familiarize-se com os limites mínimo e máximo de posição do gimbal
Sugerem-se os seguintes exercícios:
- Exercício 1: mover o gimbal para as quatro posições limite (mais à esquerda, mais à direita, mais acima, mais abaixo) e familiarizar-se com o intervalo de posição
- Exercício 2: recentrar a partir de qualquer posição e observar se a recentragem é fluida
- Exercício 3: experimentar ajustes finos e familiarizar-se com a precisão de movimento dos servos

---

## Programas de exemplo básicos

O projeto disponibiliza vários programas de exemplo progressivos para aprendizagem:

### Mostrar apenas a câmara

```python
python examples/01_camera_only.py --camera 0
```

Este programa abre apenas a câmara e mostra a imagem em tempo real, sem controlo do gimbal. Adequado para verificar se a funcionalidade da câmara está correta.

### Controlar apenas o gimbal

```python
python examples/02_gimbal_only.py --port COM3
```

Este programa disponibiliza apenas o controlo do gimbal, sem envolver a câmara. Adequado para verificar se a ligação entre os servos e a placa de acionamento está correta.

### Câmara e gimbal combinados

```python
python examples/03_simple_gimbal_camera.py --camera 0 --port COM3
```

Este programa combina a visualização da câmara com o controlo do gimbal, o que permite observar o efeito de interação entre a imagem e o gimbal.

---

## Precauções de utilização

Durante a utilização, tenha em atenção os seguintes pontos:
1. Depois de conectar o gimbal, confirme que os servos estão ligados à alimentação
2. No controlo manual, evite permanecer nas posições limite durante longos períodos
3. Evite impactos violentos contra o suporte do gimbal durante a operação
4. Se detetar vibrações anormais ou ruídos estranhos nos servos, corte imediatamente a alimentação e verifique
5. Se não utilizar o produto durante longos períodos, recomenda-se desligar a alimentação
