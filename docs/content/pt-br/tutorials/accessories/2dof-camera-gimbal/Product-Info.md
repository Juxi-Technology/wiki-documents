---
title: Informações do produto
---

# Informações do produto

> **[Comprar na loja](https://www.juxitech.com/pt/products/2-dof-servo-pan-tilt-unit)**

Projeto de controle do gimbal de câmera 2-DOF, com suporte a rastreamento automático de cor, rosto e QR code.

---

## 📋 Funcionalidades

- 🎮 Controle manual do gimbal pelo teclado
- 🎯 Rastreamento automático de objetos por cor
- 👤 Rastreamento automático de rosto
- 📱 Rastreamento automático de QR code
- 🔒 Mecanismo de bloqueio de alvo
- 🚀 Inicialização rápida (usando o backend DSHOW)

---

## 🛠 Configuração de hardware

- **Modelo do servo**: SCS009
- **Atribuição dos servos**:
  - Servo 1: controle de rotação esquerda/direita
  - Servo 2: controle de inclinação cima/baixo
- **Método de comunicação**: placa de driver de barramento serial
- **Chip da placa de driver**: CH343
- **Taxa de transmissão**: 1 Mbps por padrão

### Parâmetros dos servos


|Parâmetro|Servo 1 (esquerda/direita)|Servo 2 (cima/baixo)|
|---|---|---|
|Faixa|220-802|220-511|
|Posição central|511|511|
|Descrição|220 = esquerda, 802 = direita|220 = cima, 511 = posição central|


---

## 📁 Estrutura do projeto

```python
2-DOF-Camera-Gimbal/
├── docs/            # documentação e tutoriais
│   └── tutorials/  # arquivos de tutorial
├── examples/        # programas de exemplo
│   ├── auto_tracking_demo.py  # demonstração completa de rastreamento
│   ├── basic_usage.py        # exemplo de uso básico
│   ├── keyboard_control.py    # exemplo de controle por teclado
│   └── diagnostic.py         # ferramenta de diagnóstico
├── src/            # código-fonte
│   ├── detectors/  # detectores de alvo
│   │   ├── color_detector.py
│   │   ├── face_detector.py
│   │   └── qr_detector.py
│   ├── trackers/  # controlador de rastreamento
│   │   └── tracking_controller.py
│   └── sc_servo.py  # biblioteca de comunicação com os servos
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

**Localizar as câmeras disponíveis**

```python
python examples/list_cameras.py
```

**Localizar as portas seriais disponíveis**

```python
python examples/list_ports.py
```

### Executar a demonstração

Configure com argumentos de linha de comando:

```python
python examples/auto_tracking_demo.py --camera 0 --port COM3 --color red
```

**Descrição dos parâmetros**
- `--camera` ou `-c`: índice da câmera (padrão 0)
- `--port` ou `-p`: porta serial (padrão COM3)
- `--color` ou `-C`: cor padrão (padrão red)

---

## 🎮 Instruções de uso

### Teclas de atalho


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


### Fluxo de uso do rastreamento automático

1. Pressione `C` para conectar o gimbal
2. Escolha o modo (pressione `1` ou `2`)
3. Mova o objeto-alvo para o centro da imagem
4. Pressione `T` para bloquear o alvo
5. Mova o alvo e o gimbal o seguirá automaticamente

---

## 📚 Documentação e tutoriais

Para ver os tutoriais detalhados, consulte o diretório docs/tutorials/:
- 01-快速开始指南.md - Primeiros passos de uso
- 02-硬件与环境准备.md - Lista de hardware e preparação do ambiente
- 03-基础使用.md - Controle por teclado e uso básico
- 04-高级功能与追踪.md - Recursos avançados e rastreamento em detalhes
- 05-故障排除.md - Problemas comuns e soluções

---

## 🔧 Notas técnicas

### Parâmetros de controle do rastreamento

Podem ser ajustados em `src/trackers/tracking_controller.py`:

|Parâmetro|Valor padrão|Descrição|
|---|---|---|
|kp_pan|0.08|Ganho proporcional do rastreamento esquerda/direita|
|kp_tilt|0.12|Ganho proporcional do rastreamento cima/baixo|
|dead_zone|30|Zona morta (pixels); dentro dessa faixa o gimbal não se move|
|min_move_interval|0.15|Intervalo mínimo de movimento (segundos)|


### Mecanismo de bloqueio de alvo

Após o bloqueio, o sistema seleciona o alvo de acordo com os seguintes critérios:
- Mais próximo do ponto de bloqueio (peso 70%)
- Tamanho mais semelhante ao do momento do bloqueio (peso 30%)

---

## 📖 Especificações do servo

- **Modelo**: SCS009
- **Tensão de operação**: 4-7,4 V (6 V típico)
- **Torque de bloqueio**: 2,3 kg·cm a 6 V
- **Protocolo**: porta serial assíncrona half-duplex (TTL)
