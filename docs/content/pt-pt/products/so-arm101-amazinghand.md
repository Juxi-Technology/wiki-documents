---
title: "Braço Robótico SO-ARM101 e AmazingHand com Mão Destra de Código Aberto"
category: robot
description: "O SO-ARM101 & AmazingHand é uma plataforma completa de IA incorporada de código aberto que combina o braço robótico de 6 eixos SO-ARM101 com a mão destra de…"
keywords: ["Braço Robótico SO-ARM101 e AmazingHand com Mão Destra de Código Aberto", "SO-ARM101", "AmazingHand", "LeRobot", "SCS0009", "STS3215"]
---

# Braço Robótico SO-ARM101 e AmazingHand com Mão Destra de Código Aberto

## Visão Geral do Produto

O SO-ARM101 & AmazingHand é uma plataforma completa de IA incorporada de código aberto que combina o braço robótico de 6 eixos SO-ARM101 com a mão destra de quatro dedos e 8 graus de liberdade AmazingHand. A garra paralela original é substituída por uma mão de quatro dedos acionada por um único servo do braço líder, proporcionando apreensão e extensão sincronizadas dos quatro dedos por meio de um mecanismo simples, confiável e montado de fábrica. Baseada no ecossistema LeRobot da Hugging Face, suporta teleoperação líder-seguidor, coleta de dados com visão dupla e aprendizado por imitação de ponta a ponta com ACT, SmolVLA, Pi0, Pi0.5 e GR00T N1.5: o ponto de partida mais fácil para passar de uma garra a uma mão destra.

**SO-ARM101**é um braço robótico de 6 eixos de código aberto profundamente otimizado a partir do SO-ARM100. O novo roteamento de cabos e o novo emparelhamento de motores e engrenagens eliminam o problema de ruptura dos cabos nas articulações e não limitam mais a amplitude de movimento, além de suportar o acompanhamento líder-seguidor em tempo real e compatibilidade total com o kit de ferramentas LeRobot da Hugging Face.

**AmazingHand**é um kit de desenvolvimento de mão robótica de 8 graus de liberdade, de código aberto, baixo custo e totalmente imprimível em 3D. Seus servos ficam totalmente alojados dentro do corpo da mão, com design interno sem cabos, e cada dedo é acionado por duas articulações, combinando destreza com colaboração natural entre os dedos.

## Principais Vantagens

### Mão Destra de Quatro Dedos com 8 Graus de Liberdade

O AmazingHand possui quatro dedos (polegar, indicador, médio e anelar), duas falanges articuladas por dedo e 8 graus de liberdade no total. Um mecanismo de ligação paralela permite que os dedos trabalhem juntos para uma preensão mais natural, enquanto todos os servos ficam dentro do corpo da mão, sem cabos externos, para uma construção compacta e limpa.

### Um Único Servo com Ligação Aciona os Quatro Dedos

O servo nº 6 (STS3215) do braço líder aciona os oito servos de barramento SCS0009 dentro da mão por meio de mapeamento de curso, de modo que um único movimento produz apreensão sincronizada dos quatro dedos (punho fechado) ou extensão (palma aberta). Mecânica simples, controle confiável e sem programação complexa no lado da mão.

### Aprendizado por Imitação de Ponta a Ponta com ACT, SmolVLA, Pi0, Pi0.5 e GR00T N1.5

Execute a teleoperação líder-seguidor para registrar dados de demonstração e, em seguida, treine uma política de aprendizado por imitação em uma única passada. Um conjunto de dados pequeno basta para que o braço seguidor conclua tarefas de apreensão predefinidas de forma autônoma, e todo o ciclo pode ser fechado sem escrever código do zero.

### Coleta de Dados com Visão Dupla

Uma câmera superior em suporte cobre toda a área de trabalho vista de cima para estabelecer a posição espacial e a orientação dos objetos-alvo, enquanto uma câmera lateral sobre suporte de mesa transmite o contexto da área de trabalho em tempo real. Juntas, mantêm a manipulação precisa, respondem rapidamente às mudanças da cena e evitam desvios ou travamentos.

### Montado de Fábrica, Pronto para Usar

Cada unidade é enviada montada, cabeada e calibrada: basta conectar a alimentação e o USB e a plataforma fica pronta para teleoperação e coleta de dados. As opções de câmera incluem um módulo com autofoco de 86° a 30 FPS e um módulo grande angular de foco fixo de 100° a 60 FPS, ambos USB, sem drivers e plug-and-play.

### Integração Total com o Hugging Face LeRobot

Reutilize diretamente os modelos pré-treinados, os conjuntos de dados e as bibliotecas de algoritmos do LeRobot, compartilhe código e experiência com uma comunidade global de desenvolvedores e entre na IA incorporada sem precisar reconstruir a cadeia de ferramentas.

## Visão Geral do Hardware

### Versões Disponíveis (Escolha conforme sua necessidade de efetuador final):

| Versão | Efetuador Final | Controle da Mão | Indicada Para |
|---|---|---|---|
| Versão Pro | Garra flexível de TPU | Controle independente por servo | Usuários que precisam da garra padrão de dois dedos do SO-ARM101 |
| Versão Mão Destra | Mão destra de quatro dedos AmazingHand | Servo nº 6 do braço líder com mapeamento de curso para acionar 8 servos de barramento em conjunto | Usuários que exploram a apreensão destra e o aprendizado por imitação de ponta a ponta |

**Método de apreensão:**a Versão Pro usa pinçamento de dois dedos, enquanto a Versão Mão Destra usa apreensão e extensão de quatro dedos. O controle independente de cada dedo não é suportado na versão atual e está no roteiro de desenvolvimento.

### Dispositivos Compatíveis:

Controladores Raspberry Pi / D-Robotics RDK / série NVIDIA Jetson, além de PCs com Windows e Linux via serial USB. Totalmente compatível com os projetos de código aberto LeRobot SO-ARM101 e AmazingHand, e suporta a maioria dos servos de barramento serial do mercado.

### Configuração Fácil em 3 Passos:

- Conecte a placa controladora de servos ao seu controlador Raspberry Pi, RDK ou Jetson com o cabo fornecido e, em seguida, alimente o braço líder (DC5521 5V6A) e o braço seguidor (DC5521 12V5A).
- Ligue e conecte via serial USB. O braço e a mão são enviados montados, cabeados e calibrados: não é necessária montagem mecânica nem configuração de ID dos servos.
- Siga os tutoriais do LeRobot fornecidos para teleoperar o braço seguidor, coletar conjuntos de dados com visão dupla e treinar sua política de aprendizado por imitação.

## Especificações Técnicas

### Mão Destra (AmazingHand)

| Abertura dos Dedos | 195 mm ~ 101 mm |
|---|---|
| Graus de Liberdade | 8 graus de liberdade (acionados por 8 servos de barramento) |
| Capacidade de Carga por Dedo | 0,2 kg (máximo de 0,5 kg com os quatro dedos em preensão total) |
| Número de Dedos | 4 (polegar, indicador, médio, anelar) |
| Falanges por Dedo | 2 |
| Peso da Mão | 0,416 kg |
| Amplitude de Flexão dos Dedos | Primeira falange 0~86°, segunda falange 0~80° |
| Ângulo de Giro Lateral dos Dedos | Polegar 20°, os outros três dedos -20°~20° |
| Tensão de Alimentação | 6 V DC |
| Método de Controle | Acionada pelo servo nº 6 do braço líder: apreensão/extensão sincronizada dos quatro dedos |
| Potência | Máxima de 48 W, nominal de 4,8 W |

### Braço Robótico (SO-ARM101)

| Material do Produto | Bambu PLA+ |
|---|---|
| Dimensões do Produto | Braço líder: 111 x 239 x 525 mm
Braço seguidor: 111 x 173 x 532 mm |
| Peso do Produto | Braço líder: aprox. 680 g
Braço seguidor: aprox. 690 g |
| Placa Controladora de Servos | Adaptador de Servos de Barramento JUXI |
| Câmera | Câmera HD de 2 MP com autofoco a 30 FPS (1080P)
Câmera HD de 2 MP com foco fixo a 60 FPS (1080P) |
| Alimentação | DC5521 5V6A (braço líder) / DC5521 12V5A (braço seguidor) |
| Sistema Operacional | Windows / Linux |
| Interface de Controle | Comunicação serial USB |
| Linguagem de Programação | Python |

### Configuração dos Servos

| Posição | Modelo do Servo | Relação de Engrenagens | Quantidade |
|---|---|---|---|
| Braço líder — articulação nº 2 (7,4 V) | STS3215-C001 | 1:345 | 1 |
| Braço líder — articulações nº 1 e nº 3 (7,4 V) | STS3215-C044 | 1:191 | 2 |
| Braço líder — articulações nº 4 e nº 5, e garra/mão nº 6 (7,4 V) | STS3215-C046 | 1:147 | 3 |
| Braço seguidor — todas as articulações, Versão Pro (12 V) | STS3215-C018 | 1:345 | 6 |
| Braço seguidor — articulações do braço, Versão Mão Destra (12 V) | STS3215-C018 | 1:345 | 5 |
| Mão destra AmazingHand (6 V) | SCS0009-C001 | — | 8 |

### Servo de Barramento SCS0009 (Mão Destra)

| Modelo do Servo | Feetech SCS0009-C001 (servo de barramento serial de eixo único de 2,3 kg) |
|---|---|
| Velocidade de Rotação | 0,07 s/60° (143 RPM) @6V |
| Torque de Bloqueio | 2,3 kg·cm @6V |
| Precisão do Servo | 0,293° (300/1024) |
| Sensor e Curso | Sensor de potenciômetro, 300° controláveis, suporta tanto o modo servo com controle de ângulo quanto o modo de rotação contínua |
| Proteção | Proteção de tensão, proteção contra bloqueio e proteção de sobretemperatura |
| Leitura de Dados | Compatível: realimentação de temperatura, velocidade, tensão e posição |
| Implantações | Dois servos SCS0009 por dedo, oferecendo resposta rápida e coordenada e movimento fluido dos dedos |

### Servo de Barramento STS3215 (Braço Robótico)

| Parâmetro | STS3215-C001 | STS3215-C018 |
|---|---|---|
| Velocidade de Rotação | 0,192 s/60° (52 RPM) @7,4 V | 0,222 s/60° (45 RPM) @12 V |
| Torque de Bloqueio | 19,5 kg·cm @7,4 V | 30 kg·cm @12 V |
| Precisão do Servo | 0,088° | 0,088° |
| Sensor e Curso | Encoder magnético de alta precisão de 12 bits, 360° controláveis | Encoder magnético de alta precisão de 12 bits, 360° controláveis |
| Proteção | Proteção de tensão, proteção contra bloqueio e proteção de sobretemperatura | Proteção de tensão, proteção contra bloqueio e proteção de sobretemperatura |
| Leitura de Dados | Compatível: realimentação de ângulo, temperatura, tensão e posição | Compatível: realimentação de ângulo, temperatura, tensão e posição |

O STS3215 integra dois motores de encoder magnético de alta qualidade com resposta coordenada em nível de milissegundos e vários modos de operação, mantendo cada movimento do braço fluido e preciso.

### Adaptador de Servos de Barramento JUXI (Placa Controladora)

| Entrada de Alimentação | 7~12 V |
|---|---|
| Conector de Alimentação | DC5521 |
| Interface de Servo | Interface de servo de barramento PH2.0 |
| Interface de Comunicação | USB Type-C |
| Espaçamento entre Furos de Montagem | 37,00 x 28,00 mm |
| Diâmetro dos Furos de Montagem | 2,5 mm |
| Dimensões do Produto | 42,00 x 33,00 mm |
| Peso do Produto | 15 g |

A placa tem um design compacto plug-and-play com um módulo de proteção e regulação de tensão TVS para evitar falhas por alta tensão. Um único cabo a conecta a controladores Raspberry Pi, D-Robotics RDK ou NVIDIA Jetson para controle de motores em tempo real e realimentação de dados do encoder. Suporta o braço LeRobot SO-ARM101, a mão destra AmazingHand e a maioria dos servos de barramento serial do mercado.

### Módulo de Câmera (Opcional)

| Resolução | 1080P, 2 MP |
|---|---|
| Opções Disponíveis | Câmera de 86° com autofoco a 30 FPS / câmera de 100° grande angular com foco fixo a 60 FPS |
| Interface | USB, sem drivers e plug-and-play |
| Opções de Montagem | Kit de montagem de câmera lateral ou superior |

### Aplicações

- **Pesquisa universitária**— laboratórios de ensino e projetos de pesquisa em robótica, inteligência artificial e automação, em particular apreensão destra e aprendizado por imitação.
- **Desenvolvedores e makers**— desenvolvimento de algoritmos, validação de protótipos, desenvolvimento secundário da mão destra e competições de robótica.
- **Instituições de ensino**— um recurso didático ideal para cursos avançados de programação de IA e visão robótica.
- **Entusiastas**— monte um robô de mesa que coloque em prática técnicas reais de IA e apreenda com uma mão semelhante à humana.

## Código Aberto e Ecossistema

Este produto é baseado no projeto de código aberto LeRobot SO-ARM101 e no projeto AmazingHand. A plataforma SO-ARM101 & AmazingHand conecta-se diretamente à comunidade Hugging Face: os modelos pré-treinados, os conjuntos de dados e as bibliotecas de algoritmos do LeRobot podem ser reutilizados diretamente, e o código e a experiência podem ser compartilhados com desenvolvedores de todo o mundo, reduzindo a barreira técnica para entrar na IA incorporada.

- O código-fonte é publicado sob a licença Apache 2.0.
- Os arquivos de design mecânico são publicados sob a licença CC BY 4.0.

## Opções de Pacote

| Pacote | AmazingHand (Montada) | SO-ARM101 Versão Pro | Kit SO-ARM101 Mão Destra | Kit Mão Destra (Câmera Dupla) |
|---|---|---|---|---|
| Peças Impressas em 3D | ✓ | ✓ | ✓ | ✓ |
| Mão Destra AmazingHand | ✓ | — | ✓ | ✓ |
| Câmera de Cena | — | — | — | ✓ |
| Coleta de Dados com Visão Dupla | — | — | — | ✓ |
| Teleoperação Líder-Seguidor | — | ✓ | ✓ | ✓ |
| Aprendizado por Imitação de Ponta a Ponta | ✓ | ✓ | ✓ | ✓ |

## Lista de Peças

### Kit SO-ARM101 Mão Destra:

- 1× braço líder (montado) — 1× STS3215-C001 (7,4 V, 1:345), 2× STS3215-C044 (7,4 V, 1:191), 3× STS3215-C046 (7,4 V, 1:147)
- 1× braço seguidor (montado) — 5× STS3215-C018 (12 V, 1:345)
- 1× mão destra de quatro dedos AmazingHand (montada) — 8× servos de barramento SCS0009-C001 (6 V)
- 2× adaptador de servos de barramento JUXI (placa controladora de servos)
- 1× cabo de alimentação DC5521 5V6A (braço líder)
- 1× cabo de alimentação DC5521 12V5A (braço seguidor)
- 2× cabo USB Type-C
- 4× clipe de fixação
- 1× hub USB

### Kit SO-ARM101 Mão Destra (Câmera Dupla):

Tudo o que vem no Kit SO-ARM101 Mão Destra, mais:

- 1× kit de montagem de câmera superior com módulo de câmera 1080P de 2 MP
- 1× kit de câmera lateral com suporte de mesa e módulo de câmera 1080P de 2 MP

### SO-ARM101 Pro (Garra de TPU):

- 1× braço líder (montado) — 1× STS3215-C001 (7,4 V, 1:345), 2× STS3215-C044 (7,4 V, 1:191), 3× STS3215-C046 (7,4 V, 1:147)
- 1× braço seguidor (montado) com garra flexível de TPU — 6× STS3215-C018 (12 V, 1:345)
- 2× adaptador de servos de barramento JUXI (placa controladora de servos)
- 1× cabo de alimentação DC5521 5V6A (braço líder)
- 1× cabo de alimentação DC5521 12V5A (braço seguidor)
- 2× cabo USB Type-C
- 4× clipe de fixação
- 1× hub USB

### AmazingHand (Mão Direita):

- 1× mão destra de quatro dedos AmazingHand, totalmente montada, com 8× servos de barramento SCS0009-C001 (6 V)
- 1× adaptador de servos de barramento JUXI (placa controladora de servos)
- 1× cabo de interconexão


## Tutoriais

- [Tutorial SO-ARM101](/pt-pt/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Montagem SO-ARM101](/pt-pt/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [Guia de Seleção de Braços Robóticos](/pt-pt/tutorials/robot-arms/select-guide)
- [Introdução à IA Incorporada (LeRobot)](/pt-pt/topics/embodied-ai-intro)
- [Controle de Interface da Mão Robótica](/pt-pt/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control)
- [Exemplo Oficial da Mão Robótica](/pt-pt/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example)
- [Depuração TTL da Mão Robótica](/pt-pt/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging)


## Suporte

- 📧 E-mail: support@juxitech.com
- 🌐 Site: [www.juxitech.com](https://www.juxitech.com)
