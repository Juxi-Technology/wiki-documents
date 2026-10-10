---
title: Solução de problemas
---

# Solução de problemas

> **[Comprar na loja](https://www.juxitech.com/pt/products/2-dof-servo-pan-tilt-unit)**

Este capítulo resume problemas comuns e soluções, ajudando o usuário a diagnosticar e resolver rapidamente os diversos problemas encontrados durante o uso.

---

## Problemas de hardware

### Servos não respondem

**Possíveis causas:**
1. Alimentação dos servos não conectada
2. Conexão defeituosa entre os servos e a placa de driver
3. Falha na conexão da porta serial
4. Servos não habilitados
**Soluções:**
1. Verifique se a alimentação dos servos está corretamente conectada e energizada
2. Verifique se os cabos de conexão entre os servos e a placa de driver estão firmes
3. Execute `examples/diagnostic.py` para ver as informações de diagnóstico
4. Certifique-se de que o gimbal foi conectado com `C` e que os servos estão habilitados

### Servos giram na direção oposta

**Possíveis causas:**
- A direção de montagem dos servos ou os parâmetros de controle do programa precisam de ajuste
**Soluções:**
Modifique o método `calculate_move` em `src/trackers/tracking_controller.py` e inverta o sinal dos parâmetros correspondentes:

# Se esquerda/direita estiver invertido

```python
delta_pan = -int(self.kp_pan * err_x)
```

# Se cima/baixo estiver invertido

```python
delta_tilt = -int(self.kp_tilt * err_y)
```

### Servos tremem

**Possíveis causas:**
- Parâmetros de rastreamento sensíveis demais
- Zona morta muito pequena
- Carga excessiva nos servos ou alimentação insuficiente
**Soluções:**
1. Aumente o parâmetro `dead_zone`
2. Aumente `min_move_interval`
3. Reduza `kp_pan` e `kp_tilt`
4. Verifique se a tensão da fonte de alimentação está normal

### Falha na conexão da porta serial

**Possíveis causas:**
- Driver não instalado
- Número da porta serial incorreto
- Porta serial ocupada por outro programa
- Defeito no cabo de conexão
**Soluções:**
1. No Windows, verifique o Gerenciador de Dispositivos e confirme se o driver está instalado corretamente
2. Execute `examples/list_ports.py` para encontrar a porta serial correta
3. Feche outros programas que possam estar ocupando a porta serial
4. Tente trocar a porta USB ou o cabo de dados

---

## Problemas de software

### A câmera não abre

**Possíveis causas:**
- Índice da câmera incorreto
- Câmera ocupada por outro programa
- Problema na conexão física da câmera
- Problema no driver da câmera
**Soluções:**
1. Execute `examples/list_cameras.py` para ver os índices das câmeras disponíveis
2. Feche outros programas que possam estar usando a câmera
3. Verifique se a conexão da câmera está normal
4. Tente trocar a porta USB

### Erro no OpenCV

**Possíveis causas:**
- Problema na versão do OpenCV
- Instalação incompleta das bibliotecas de dependência
- Anomalia no hardware da câmera
**Soluções:**
1. Tente reinstalar as bibliotecas de dependência:

```python
pip install --upgrade opencv-python numpy
```

1. Verifique se a versão do Python atende aos requisitos (>=3.8)
2. Analise as informações de pilha de erros (stack trace) para localizar o código com problema

### Falha na instalação das dependências

**Possíveis causas:**
- Versão do pip muito antiga
- Problema de conexão de rede
- Problema de permissão
**Soluções:**
1. Primeiro, atualize o pip:

```python
pip install --upgrade pip
```

1. Use um mirror doméstico para acelerar:

```python
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
```

1. Verifique se a conexão de rede está normal

### O programa inicia lentamente

**Possíveis causas:**
- DSHOW não utilizado no Windows
- A inicialização do hardware da câmera leva tempo
**Soluções:**
1. Confirme se o código usa `cv2.CAP_DSHOW` como backend da câmera
2. Verifique se há outros programas usando a câmera
3. Aguarde alguns segundos; a inicialização da câmera geralmente leva um tempo

---

## Problemas de rastreamento

### Reconhecimento impreciso do alvo

**No rastreamento de cor:**
- Verifique se o contraste entre a cor do alvo e o fundo é nítido
- Ajuste os parâmetros de cor (em `src/detectors/color_detector.py`)
- Garanta que a iluminação seja suficiente e uniforme
**No rastreamento de rosto:**
- A iluminação deve ser suficiente; evite contraluz
- O rosto deve estar de frente para a câmera
- Mantenha uma distância adequada

### O gimbal não se move durante o rastreamento

**Possíveis causas:**
1. Gimbal não conectado
2. Alvo não bloqueado
3. Alvo dentro da zona morta
4. Erro no programa
**Soluções:**
1. Confirme que o gimbal foi conectado com `C`
2. Confirme que o alvo foi bloqueado com `T`
3. Verifique a saída do console em busca de mensagens de erro
4. Verifique se o alvo está dentro da faixa de `dead_zone`

### Direção do rastreamento invertida

**Soluções:**
Consulte a solução de "Servos giram na direção oposta".

### Tremores no rastreamento

**Soluções:**
Consulte a solução de "Servos tremem".

### Falha no bloqueio do alvo

**Possíveis causas:**
1. No momento do bloqueio, o alvo não estava no centro da imagem
2. Alvo muito pequeno ou cor pouco nítida
3. Alvo não detectado
**Soluções:**
1. Garanta que o alvo esteja no centro da imagem no momento do bloqueio
2. O tamanho do alvo deve ser adequado para ser detectado corretamente
3. Verifique a saída do console para confirmar se o alvo foi detectado
4. Ajuste novamente a posição do alvo e bloqueie de novo

---

## Uso da ferramenta de diagnóstico

### Usar o programa de diagnóstico

O sistema oferece uma ferramenta de diagnóstico completa, capaz de testar todo o hardware do sistema:

```python
python examples/diagnostic.py --camera 0 --port COM3
```

O programa de diagnóstico testará sucessivamente:
1. Se a câmera funciona corretamente
2. Se a porta serial consegue conectar normalmente
3. Se os servos respondem normalmente
Ao final do diagnóstico, os resultados dos testes serão exibidos, ajudando a localizar o problema.

### Ver a saída de depuração

Durante a execução do programa, o console exibirá informações de depuração relevantes, incluindo:
- Informações dos alvos detectados
- Coordenadas do alvo
- Valores de erro
- Comandos de movimento do gimbal
- Quaisquer mensagens de erro
Observar atentamente essas saídas ajuda a localizar o problema rapidamente.

---

## Métodos de recuperação

### Restaurar o gimbal para uma posição segura

- Pressione `R` para centralizar o gimbal
- Ou chame `gimbal.return_to_center()`

### Redefinir todas as configurações

- Pressione `S` para parar o rastreamento
- Pressione `R` para centralizar
- Bloqueie o alvo novamente

### Recalibração

Se o efeito do rastreamento estiver bastante insatisfatório, você pode:
1. Ajustar os parâmetros de rastreamento
2. Bloquear o alvo novamente
3. Reiniciar o programa, se necessário
4. Verificar as conexões de hardware

---

## Obtendo ajuda

Se os métodos acima não resolverem o problema, registre as seguintes informações:
- Informações do sistema operacional
- Versão do Python
- Mensagens de erro detalhadas
- Passos para reproduzir o problema
- Resultado da execução do diagnostic
