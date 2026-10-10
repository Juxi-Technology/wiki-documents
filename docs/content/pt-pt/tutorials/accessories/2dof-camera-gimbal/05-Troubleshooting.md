---
title: Resolução de problemas
---

# Resolução de problemas

> **[Comprar na loja](https://www.juxitech.com/products/2-dof-servo-pan-tilt-unit)**

Este capítulo resume problemas frequentes e respetivas soluções, para ajudar o utilizador a diagnosticar e resolver rapidamente os vários problemas encontrados durante a utilização.

---

## Problemas de hardware

### Os servos não respondem

**Causas possíveis:**
1. A fonte de alimentação dos servos não está ligada
2. Ligação deficiente entre os servos e a placa de acionamento
3. Falha na conexão da porta série
4. Servos não ativados
**Soluções:**
1. Verifique se a fonte de alimentação dos servos está corretamente ligada e com energia
2. Verifique se os cabos de ligação entre os servos e a placa de acionamento estão bem fixos
3. Execute `examples/diagnostic.py` para ver as informações de diagnóstico
4. Confirme que premiu `C` para conectar o gimbal e que os servos estão ativados

### Os servos movem-se na direção oposta

**Causas possíveis:**
- A direção de montagem dos servos ou os parâmetros de controlo do programa precisam de ajuste
**Solução:**
Altere o método `calculate_move` em `src/trackers/tracking_controller.py` e inverta o sinal do parâmetro correspondente:

# Se a esquerda/direita estiver invertida

```python
delta_pan = -int(self.kp_pan * err_x)
```

# Se cima/baixo estiver invertido

```python
delta_tilt = -int(self.kp_tilt * err_y)
```

### Vibração dos servos

**Causas possíveis:**
- Os parâmetros de rastreio são demasiado sensíveis
- A zona morta é demasiado pequena
- Carga excessiva sobre os servos ou alimentação insuficiente
**Soluções:**
1. Aumente o parâmetro `dead_zone`
2. Aumente `min_move_interval`
3. Diminua `kp_pan` e `kp_tilt`
4. Verifique se a tensão de alimentação está correta

### Falha na conexão da porta série

**Causas possíveis:**
- Controlador não instalado
- Número da porta série incorreto
- Porta série ocupada por outro programa
- Avaria no cabo de ligação
**Soluções:**
1. No Windows, verifique o Gestor de Dispositivos e confirme que o controlador está instalado corretamente
2. Execute `examples/list_ports.py` para encontrar a porta série correta
3. Feche outros programas que possam estar a ocupar a porta série
4. Experimente mudar a porta USB ou o cabo de dados

---

## Problemas de software

### A câmara não abre

**Causas possíveis:**
- Índice da câmara incorreto
- Câmara ocupada por outro programa
- Problema na ligação física da câmara
- Problema com o controlador da câmara
**Soluções:**
1. Execute `examples/list_cameras.py` para ver os índices das câmaras disponíveis
2. Feche outros programas que possam estar a utilizar a câmara
3. Verifique se a câmara está corretamente ligada
4. Experimente mudar de porta USB

### Erro no OpenCV

**Causas possíveis:**
- Problema de versão do OpenCV
- Dependências instaladas de forma incompleta
- Anomalia no hardware da câmara
**Soluções:**
1. Experimente reinstalar as dependências:

```python
pip install --upgrade opencv-python numpy
```

1. Verifique se a versão do Python cumpre os requisitos (>=3.8)
2. Consulte a informação da pilha de erros para localizar o código problemático

### Falha na instalação das dependências

**Causas possíveis:**
- Versão do pip demasiado antiga
- Problemas de conexão de rede
- Problemas de permissões
**Soluções:**
1. Primeiro, atualize o pip:

```python
pip install --upgrade pip
```

1. Utilize um espelho nacional para acelerar:

```python
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
```

1. Verifique se a conexão de rede está normal

### Arranque lento do programa

**Causas possíveis:**
- O DSHOW não está a ser utilizado no Windows
- A inicialização do hardware da câmara requer tempo
**Soluções:**
1. Confirme que o código utiliza `cv2.CAP_DSHOW` como back-end da câmara
2. Verifique se há outros programas a ocupar a câmara
3. Aguarde alguns segundos; a inicialização da câmara costuma demorar algum tempo

---

## Problemas de rastreio

### Reconhecimento impreciso do alvo

**No rastreio de cores:**
- Verifique se o contraste entre a cor do alvo e o fundo é suficiente
- Ajuste os parâmetros de cor (em `src/detectors/color_detector.py`)
- Garanta uma iluminação abundante e uniforme
**No rastreio de rostos:**
- A iluminação deve ser abundante; evite contraluz
- O rosto deve estar de frente para a câmara
- Mantenha uma distância adequada

### O gimbal não se move durante o rastreio

**Causas possíveis:**
1. Gimbal não conectado
2. Alvo não bloqueado
3. Alvo dentro da zona morta
4. Erro no programa
**Soluções:**
1. Confirme que premiu `C` para conectar o gimbal
2. Confirme que premiu `T` para bloquear o alvo
3. Consulte a saída da consola e procure mensagens de erro
4. Verifique se o alvo está dentro do intervalo `dead_zone`

### Direção do rastreio invertida

**Solução:**
Consulte a solução apresentada em «Os servos movem-se na direção oposta».

### Vibração durante o rastreio

**Solução:**
Consulte a solução apresentada em «Vibração dos servos».

### Falha no bloqueio do alvo

**Causas possíveis:**
1. O alvo não estava no centro da imagem no momento do bloqueio
2. O alvo é demasiado pequeno ou a cor não é suficientemente distinta
3. O alvo não foi detetado
**Soluções:**
1. Garanta que o alvo está no centro da imagem no momento do bloqueio
2. O tamanho do alvo deve ser adequado para ser detetado corretamente
3. Consulte a saída da consola para confirmar se o alvo é detetado
4. Ajuste novamente a posição do alvo antes de bloquear

---

## Utilização da ferramenta de diagnóstico

### Utilizar o programa de diagnóstico

O sistema disponibiliza uma ferramenta de diagnóstico completa, que permite testar todo o hardware do sistema:

```python
python examples/diagnostic.py --camera 0 --port COM3
```

O programa de diagnóstico testa sequencialmente:
1. Se a câmara funciona corretamente
2. Se a porta série se consegue conectar corretamente
3. Se os servos respondem corretamente
Após a conclusão do diagnóstico, são apresentados os resultados dos testes, que ajudam a localizar a origem do problema.

### Consultar a saída de depuração

Durante a execução do programa, a consola apresenta informações de depuração relevantes, incluindo:
- Informações sobre os alvos detetados
- Coordenadas do alvo
- Valores de erro
- Comandos de movimento do gimbal
- Quaisquer mensagens de erro
Observe atentamente estes dados; isso ajuda a localizar rapidamente o problema.

---

## Métodos de recuperação

### Repor o gimbal numa posição segura

- Prima `R` para recentrar o gimbal
- Ou chame `gimbal.return_to_center()`

### Reiniciar todas as configurações

- Prima `S` para parar o rastreio
- Prima `R` para recentrar
- Volte a bloquear o alvo

### Recalibração

Se o desempenho do rastreio for claramente insatisfatório, pode:
1. Ajustar os parâmetros de rastreio
2. Voltar a bloquear o alvo
3. Reiniciar o programa, se necessário
4. Verificar as ligações de hardware

---

## Obter ajuda

Se os métodos acima não resolverem o problema, registe as seguintes informações:
- Informações do sistema operativo
- Versão do Python
- Informações detalhadas sobre o erro
- Passos para reproduzir o problema
- Resultados da execução do diagnostic
