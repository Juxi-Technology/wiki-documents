---
title: Guia de início rápido
---

# Guia de início rápido

> **[Comprar na loja](https://www.juxitech.com/pt/products/2-dof-servo-pan-tilt-unit)**

> Para usuários que já montaram o hardware e desejam experimentar as funcionalidades rapidamente

---

## Passo 0: Localizar os dispositivos disponíveis

Antes de começar, precisamos encontrar a câmera e a porta serial corretas.

### Localizar as câmeras disponíveis

```python
python examples/list_cameras.py
```

O programa listará todas as câmeras disponíveis e seus índices; anote o índice que você precisa usar (normalmente 0).

### Localizar as portas seriais disponíveis

```python
python examples/list_ports.py
```

O programa listará todas as portas seriais disponíveis; no Windows, são COM3, COM4 etc.; no Linux, são /dev/ttyUSB0 etc.

---

## Passo 1: Instalar as dependências

```python
pip install -r requirements.txt
```

---

## Passo 2: Executar os tutoriais passo a passo, em ordem (opcional, mas recomendado)

Para entender melhor o sistema, recomenda-se executar estes programas em ordem:
1. **01_camera_only.py** - Exibe apenas a imagem da câmera, sem conectar o gimbal

```python
python examples/01_camera_only.py --camera 0
```

Função: verificar se a câmera está funcionando corretamente
1. **02_gimbal_only.py** - Controla apenas o gimbal, sem conectar a câmera

```python
python examples/02_gimbal_only.py --port COM3
```

Função: verificar se a conexão entre os servos e a placa de driver está correta
1. **03_simple_gimbal_camera.py** - Câmera e gimbal combinados

```python
python examples/03_simple_gimbal_camera.py --camera 0 --port COM3
```

Função: controlar o gimbal manualmente enquanto visualiza a imagem da câmera
1. **04_color_track_simple.py** - Rastreamento de cor simples (sem bloqueio)

```python
python examples/04_color_track_simple.py --camera 0 --port COM3 --color red
```

Função: a demonstração mais básica de rastreamento automático

---

## Passo 3: Executar o programa completo

Depois de se familiarizar com as funcionalidades básicas, execute o programa completo de rastreamento automático:

```python
python examples/auto_tracking_demo.py --camera 0 --port COM3 --color red
```

---

## Teclas de atalho do programa completo


|Tecla|Função|
|---|---|
|1|Alternar para o modo de rastreamento de rosto|
|2|Alternar para o modo de rastreamento de cor|
|C|Conectar o gimbal|
|R|Centralizar o gimbal|
|T|Bloquear/iniciar o rastreamento do alvo|
|S|Parar o rastreamento|
|X|Modo de cor: vermelho|
|Y|Modo de cor: verde|
|Z|Modo de cor: azul|
|Q|Sair do programa|


---

## Fluxo de teste rápido

### Teste do rastreamento de cor

1. Pressione `C` para conectar o gimbal
2. Pressione `2` para entrar no modo de rastreamento de cor
3. Mova um objeto vermelho (ou de outra cor) para o centro da imagem
4. Pressione `T` para bloquear o alvo
5. Mova o objeto e observe o gimbal acompanhar

### Teste do rastreamento de rosto

1. Pressione `C` para conectar o gimbal
2. Pressione `1` para entrar no modo de rastreamento de rosto
3. Posicione o rosto no centro da imagem
4. Pressione `T` para bloquear o alvo
5. Mova o rosto e observe o gimbal acompanhar

---

## Respostas rápidas a perguntas frequentes

P: O programa indica que não encontrou o número da porta serial?
R: Execute `list_ports.py` para ver as portas seriais disponíveis e especifique a porta com o parâmetro `--port`.
P: A câmera não abre?
R: Execute `list_cameras.py` para ver as câmeras disponíveis e especifique o índice com o parâmetro `--camera`.
P: O gimbal não se move?
R: Confirme que você pressionou `C` para conectar o gimbal e que a alimentação dos servos está ligada.
P: A direção do rastreamento está invertida?
R: Consulte o capítulo de solução de problemas.
