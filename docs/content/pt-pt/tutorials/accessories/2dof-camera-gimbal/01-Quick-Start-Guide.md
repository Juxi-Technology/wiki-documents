---
title: Guia de início rápido
---

# Guia de início rápido

> **[Comprar na loja](https://www.juxitech.com/products/2-dof-servo-pan-tilt-unit)**

> Para utilizadores que já montaram o hardware e querem experimentar rapidamente as funcionalidades

---

## Passo 0: Localizar os dispositivos disponíveis

Antes de começar, é necessário identificar a câmara e a porta série corretas.

### Localizar as câmaras disponíveis

```python
python examples/list_cameras.py
```

O programa lista todas as câmaras disponíveis e os respetivos índices; memorize o índice que precisa de utilizar (normalmente 0).

### Localizar as portas série disponíveis

```python
python examples/list_ports.py
```

O programa lista todas as portas série disponíveis: no Windows, COM3, COM4, etc.; no Linux, /dev/ttyUSB0, etc.

---

## Passo 1: Instalar as dependências

```python
pip install -r requirements.txt
```

---

## Passo 2: Executar os tutoriais passo a passo pela ordem indicada (opcional, mas recomendado)

Para compreender melhor o sistema, recomenda-se executar estes programas pela ordem indicada:
1. **01_camera_only.py** - Mostra apenas a imagem da câmara, sem conectar o gimbal

```python
python examples/01_camera_only.py --camera 0
```

Função: verificar se a câmara funciona corretamente
1. **02_gimbal_only.py** - Controla apenas o gimbal, sem conectar a câmara

```python
python examples/02_gimbal_only.py --port COM3
```

Função: verificar se a ligação entre os servos e a placa de acionamento está correta
1. **03_simple_gimbal_camera.py** - Câmara e gimbal combinados

```python
python examples/03_simple_gimbal_camera.py --camera 0 --port COM3
```

Função: controlar manualmente o gimbal enquanto visualiza a imagem da câmara
1. **04_color_track_simple.py** - Rastreio de cores simples (sem bloqueio)

```python
python examples/04_color_track_simple.py --camera 0 --port COM3 --color red
```

Função: demonstração mais básica de rastreio automático

---

## Passo 3: Executar o programa completo

Depois de se familiarizar com as funcionalidades básicas, execute o programa completo de rastreio automático:

```python
python examples/auto_tracking_demo.py --camera 0 --port COM3 --color red
```

---

## Teclas de atalho do programa completo


|Tecla|Função|
|---|---|
|1|Alternar para o modo de rastreio de rostos|
|2|Alternar para o modo de rastreio de cores|
|C|Conectar o gimbal|
|R|Recentrar o gimbal|
|T|Bloquear/iniciar o rastreio do alvo|
|S|Parar o rastreio|
|X|Modo de cor: vermelho|
|Y|Modo de cor: verde|
|Z|Modo de cor: azul|
|Q|Sair do programa|


---

## Fluxo de experimentação rápida

### Experimentar o rastreio de cores

1. Prima `C` para conectar o gimbal
2. Prima `2` para entrar no modo de rastreio de cores
3. Mova o objeto vermelho (ou de outra cor) para o centro da imagem
4. Prima `T` para bloquear o alvo
5. Mova o objeto e observe o gimbal a acompanhar

### Experimentar o rastreio de rostos

1. Prima `C` para conectar o gimbal
2. Prima `1` para entrar no modo de rastreio de rostos
3. Coloque o rosto no centro da imagem
4. Prima `T` para bloquear o alvo
5. Mova o rosto e observe o gimbal a acompanhar

---

## Respostas rápidas a perguntas frequentes

P: O programa indica que não encontra a porta série?
R: Execute `list_ports.py` para ver as portas série disponíveis e especifique a porta com o parâmetro `--port`.
P: A câmara não abre?
R: Execute `list_cameras.py` para ver as câmaras disponíveis e especifique o índice com o parâmetro `--camera`.
P: O gimbal não se move?
R: Confirme que premiu `C` para conectar o gimbal e que a fonte de alimentação dos servos está ligada.
P: A direção do rastreio está invertida?
R: Consulte o capítulo de resolução de problemas.
