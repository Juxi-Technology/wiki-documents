---
title: Informações do produto
---

# Informações do produto

> **[Comprar na loja](https://www.juxitech.com/products/2-dof-servo-pan-tilt-unit)**

Projeto de controlo de um gimbal de câmara de 2 graus de liberdade, com suporte para rastreio automático de cores, rostos e códigos QR.

---

## 📋 Funcionalidades

- 🎮 Controlo manual do gimbal por teclado
- 🎯 Rastreio automático de objetos por cor
- 👤 Rastreio automático de rostos
- 📱 Rastreio automático de códigos QR
- 🔒 Mecanismo de bloqueio de alvos
- 🚀 Arranque rápido (utiliza o back-end DSHOW)

---

## 🛠 Configuração de hardware

- **Modelo dos servos**: SCS009
- **Distribuição dos servos**:
  - Servo n.º 1: controlo da rotação esquerda/direita
  - Servo n.º 2: controlo da inclinação cima/baixo
- **Método de comunicação**: placa de acionamento de barramento série
- **Chip da placa de acionamento**: CH343
- **Velocidade de transmissão**: 1Mbps por predefinição

### Parâmetros dos servos


|Parâmetro|Servo n.º 1 (esquerda/direita)|Servo n.º 2 (cima/baixo)|
|---|---|---|
|Intervalo|220-802|220-511|
|Posição central|511|511|
|Descrição|220=esquerda, 802=direita|220=cima, 511=posição central|


---

## 📁 Estrutura do projeto

```python
2-DOF-Camera-Gimbal/
├── docs/            # Documentação e tutoriais
│   └── tutorials/  # Ficheiros dos tutoriais
├── examples/        # Programas de exemplo
│   ├── auto_tracking_demo.py  # Demonstração completa de rastreio
│   ├── basic_usage.py        # Exemplo de utilização básica
│   ├── keyboard_control.py    # Exemplo de controlo por teclado
│   └── diagnostic.py         # Ferramenta de diagnóstico
├── src/            # Código-fonte
│   ├── detectors/  # Detetores de alvos
│   │   ├── color_detector.py
│   │   ├── face_detector.py
│   │   └── qr_detector.py
│   ├── trackers/  # Controlador de rastreio
│   │   └── tracking_controller.py
│   └── sc_servo.py  # Biblioteca de comunicação dos servos
├── .gitignore
├── requirements.txt
└── README.md
```

---

## 🚀 Início rápido

### Instalar as dependências

```python
pip install -r requirements.txt
```

### Localizar os dispositivos disponíveis

**Localizar as câmaras disponíveis**

```python
python examples/list_cameras.py
```

**Localizar as portas série disponíveis**

```python
python examples/list_ports.py
```

### Executar a demonstração

Configure através de parâmetros de linha de comandos:

```python
python examples/auto_tracking_demo.py --camera 0 --port COM3 --color red
```

**Descrição dos parâmetros**
- `--camera` ou `-c`: índice da câmara (predefinição 0)
- `--port` ou `-p`: dispositivo de porta série (predefinição COM3)
- `--color` ou `-C`: cor predefinida (predefinição red)

---

## 🎮 Instruções de utilização

### Teclas de atalho


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


### Fluxo de utilização do rastreio automático

1. Prima `C` para conectar o gimbal
2. Escolha o modo (prima `1` ou `2`)
3. Mova o objeto alvo para o centro da imagem
4. Prima `T` para bloquear o alvo
5. Mova o alvo; o gimbal segue automaticamente

---

## 📚 Documentação e tutoriais

Consulte o diretório docs/tutorials/ para os tutoriais detalhados:
- 01-快速开始指南.md - Introdução rápida à utilização
- 02-硬件与环境准备.md - Lista de hardware e preparação do ambiente
- 03-基础使用.md - Controlo por teclado e utilização básica
- 04-高级功能与追踪.md - Funcionalidades avançadas e explicação detalhada do rastreio
- 05-故障排除.md - Problemas frequentes e soluções

---

## 🔧 Notas técnicas

### Parâmetros de controlo do rastreio

Podem ser ajustados em `src/trackers/tracking_controller.py`:

|Parâmetro|Valor predefinido|Descrição|
|---|---|---|
|kp_pan|0.08|Ganho proporcional do rastreio horizontal|
|kp_tilt|0.12|Ganho proporcional do rastreio vertical|
|dead_zone|30|Zona morta (píxeis); dentro deste intervalo não há movimento|
|min_move_interval|0.15|Intervalo mínimo entre movimentos (segundos)|


### Mecanismo de bloqueio de alvos

Após o bloqueio, o sistema seleciona o alvo de acordo com os seguintes critérios:
- Mais próximo do ponto de bloqueio (peso 70%)
- Tamanho mais semelhante ao do momento do bloqueio (peso 30%)

---

## 📖 Especificações dos servos

- **Modelo**: SCS009
- **Tensão de funcionamento**: 4V-7.4V (tipicamente 6V)
- **Binário de bloqueio**: 2.3kg·cm a 6V
- **Protocolo**: série assíncrona half-duplex (TTL)
