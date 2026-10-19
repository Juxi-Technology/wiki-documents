---
title: "07 · Perguntas frequentes e experiências"
description: "Armadilhas realmente encontradas neste fluxo, para consulta rápida por sintoma."
---

# 07 · Perguntas frequentes e experiências

Armadilhas realmente encontradas neste fluxo, para consulta rápida por sintoma.

## Ambiente

| Sintoma | Causa e solução |
| --- | --- |
| `uv sync` reporta `failed to persist temporary file ... os error 17（跨盘）` | Caso especial do Windows com o diretório de cache do uv desta máquina em outro disco. Adicione `export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'` antes de todos os comandos uv |
| O console exibe dezenas de linhas de falha ao carregar `libtorchcodec_core*.dll` | Aviso ruidoso: após falha no carregamento do torchcodec, há fallback automático para **pyav**. Medido (smoke [5]): o pyav **codifica e decodifica conjuntos de dados de vídeo normalmente**; tanto os conjuntos de dados de estado quanto os de vídeo não são afetados |
| `python` abre a Microsoft Store | Use o Python gerenciado pelo uv; não use a versão da Store |
| `lerobot-train` reporta `accelerate is required but not installed` | O extra `training` ficou de fora na instalação inicial — use o comando `uv sync` do [01](/pt-br/tutorials/robot-arms/so-arm101/mujoco/01-Environment) com `--extra training` e tente de novo (a instalação única do 01 já o inclui; quem seguir o 01 não encontrará isso) |

## Teleoperação

| Sintoma | Causa e solução |
| --- | --- |
| Controle pelo teclado "muito lento" | O `--teleop.rate` padrão de 60 unidades/segundo é conservador; aumente para **150** para uma sensação normal (curso completo em cerca de 1,3 s) |
| Log de inicialização inundado de WARNINGs `clamped to be safe` | Saída normal durante o alcance do limitador de velocidade; para ao chegar ao alvo |
| Com o braço líder centralizado, o braço simulado fica alguns graus deslocado | Desvio fixo causado pela assimetria da faixa de calibração — use o ajuste fino automático do `so101_leader_trim` ([05](/pt-br/tutorials/robot-arms/so-arm101/mujoco/05-Leader-Digital-Twin)) |
| O braço se move repentinamente no instante da conexão | É comportamento de projeto: no robô real, aplica torque e se move em direção ao ponto central/à pose do braço líder; mantenha espaço livre ao redor |
| Após sair com Ctrl-C, o braço fica mole e cai | Normal: o torque é desligado ao desconectar; segure-o com a mão |
| Digitar durante a teleoperação/gravação aciona o braço | A escuta do teclado é **global e não consome as teclas**: pressionar teclas mapeadas em qualquer janela (incluindo letras de pinyin) entra na fila de teclas. Não digite durante teleoperação/gravação no modo teclado; o modo braço líder não tem esse problema |

## Gravação

| Sintoma | Causa e solução |
| --- | --- |
| Após sair com `q`, as letras pressionadas durante a sessão "despejam todas de uma vez" na linha de comando | Eco acumulado do buffer de entrada do console do Windows; o iniciador já inclui a limpeza `drain_pending_keys()` (o fenômeno só ocorre em sessões antigas) |
| O action span de um episódio é todo 0 | Gravação vazia (ninguém se moveu) — faça algum movimento antes de gravar, ou exclua o episódio depois |
| Erro grande no primeiro segundo do episódio | Trecho de convergência: no instante em que a gravação começa, o braço seguidor ainda está na pose inicial e o braço líder já está parado em outro lugar; posicionar o braço líder perto da posição central antes evita isso |
| O conjunto de dados "desaparece" depois de configurar `--dataset.root` como diretório pai | **o root é o próprio diretório do conjunto de dados**; use um novo root a cada sessão de gravação |
| Diferença entre `Esc` e `q` | `q` apenas encerra a gravação; `Esc` também desconecta a teleoperação por teclado. Ambos encerram de forma limpa (corrigido); habitue-se a usar `q` |
| Ao salvar, `ValueError: You must add one or several frames...` e o processo termina com erro | Pressionar `→`/`n` a mais **durante o intervalo** entre episódios (o caso mais comum: a pausa de salvamento + codificação dupla de vídeo dura dezenas de segundos, o console parece travado e a mão coça para pressionar várias vezes); o sinal fica retido até o início do episódio seguinte e é consumido → **episódio vazio de 0 quadros**, e o upstream quebra ao salvar um episódio vazio (limitação conhecida do lerobot). **Os episódios já salvos não são afetados e os dados estão intactos**; basta reabrir a sessão e continuar gravando. **Proteção adicionada** (2026-10-16): o `record.py` limpa os sinais `→`/`←` retidos no intervalo no início de cada episódio (as teclas continuam funcionando normalmente durante a gravação), e antes de salvar imprime o aviso `saving the episode + encoding videos now...`; teste de regressão `smoke_test.py` [7] |
| `KeyError: 'wrist'` no instante em que a gravação começa (conjuntos de dados com imagem) | O loop de gravação lia a observação antes de o primeiro quadro da câmera terminar de renderizar; **corrigido** (2026-10-16): o `connect()` do plugin do robô agora espera o primeiro quadro ficar pronto antes de retornar |
| Um script com vídeo reporta `BrokenProcessPool` / `Invalid argument: '<stdin>'` | A codificação de vídeo usa um **pool de múltiplos processos**, e os processos filhos precisam reimportar o módulo de entrada por caminho de arquivo — rodar o script de gravação com `python - <<EOF` (stdin) faz tudo quebrar. Salve o script como um arquivo `.py` real e execute-o (a entrada real `record.py` não é afetada) |
| Ao salvar um episódio, `SvtMalloc[fatal]: allocate memory failed ... av.error.MemoryError: [Errno 12] ... 'avcodec_open2(libsvtav1)'` e a sessão inteira termina | O codificador padrão upstream **libsvtav1** falha numa alocação grande e única de memória quando as duas codificações de duas câmeras (wrist+top) abrem em paralelo (mais fácil de disparar sob consumo da simulação + janelas de pré-visualização; ocorreu de fato em 2026-10-16). **Corrigido**: o `record.py` injeta por padrão `--dataset.rgb_encoder.vcodec=h264` (codificação dupla h264 em paralelo verificada; passar vcodec explicitamente sobrescreve). Episódios já salvos ficam intactos; o crash pode deixar `tmp*/` e parquet órfão no diretório do conjunto de dados (limpe como no run2) |
| A imagem fica travada durante a gravação (especialmente após pressionar `→`), mas a operação em si não tem atraso | O que trava é a **janela de salvamento/codificação**: os processos de codificação usam toda a CPU por padrão (duas codificações de vídeo em paralelo), enquanto a thread da simulação continua renderizando 5 telas (mais evidente na GPU integrada). O loop de controle em si não é afetado — confie nos números de cadence (medido: 29,97 Hz do início ao fim, 0 ticks acima do orçamento). **Mitigado** (2026-10-16): o `record.py` usa por padrão `--dataset.encoder_threads=2` (limite de 2 threads por codificação); a atualização das janelas de pré-visualização das câmeras caiu para 15 Hz (`--robot.preview_fps`). Quanto mais curto o episódio, maior a proporção da janela de salvamento e mais travado parece; para eliminar totalmente a pausa, use `--dataset.streaming_encoding=true` (codificação durante a gravação, recomendado pelo upstream, ainda a ser testado) |
| Ao salvar um episódio, o codificador reporta **falha de alocação de memória** e a sessão inteira termina (incluem-se aqui `SvtMalloc` do svtav1, `malloc ... failed` do x264 e erros de `avcodec_open2`) | A memória comprometida (commit) do sistema desta máquina fica há muito tempo perto do limite (medido em 2026-10-16: **105,9 GB / 119,7 GB**, com 29 dias de uptime contínuo). Cada salvamento inicia 2 novos processos de codificação (cada um carrega torch/av, com grande pico de commit); iniciá-los em paralelo à beira do abismo dá errado. **Mitigado**: o `record.py` agora adiciona **nova tentativa automática uma vez em caso de falha** à codificação (falhas transitórias não perdem mais o episódio), e o excesso de logs durante o salvamento também foi silenciado (`av.logging.set_libav_level` + barra de progresso do HF). **Solução definitiva = reiniciar a máquina** (limpar o commit acumulado de execuções longas / vazamentos do kernel; os processos de espaço de usuário ocupam apenas 27 GB, o restante está na camada de kernel/driver e não pode ser morto); autoverificação: `Get-Counter '\Memory\Committed Bytes'` vs `'\Memory\Commit Limit'` |

## Hardware

| Sintoma | Causa e solução |
| --- | --- |
| O número da porta COM não é o mesmo da última vez | O número da porta serial varia com conexões/desconexões ou troca de porta; liste as portas para confirmar antes de cada uso ([03](/pt-br/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration)) |
| A verificação somente leitura indica servo ausente | Problema de fiação/alimentação; verifique primeiro a placa driver e a ordem dos fios; não se apresse em calibrar |
| A direção de `shoulder_lift` é oposta à intuição (simulação) | A direção positiva desse modelo aponta para baixo; verifique o sinal antes do mapeamento ([02](/pt-br/tutorials/robot-arms/so-arm101/mujoco/02-Sim-Model-Verification)) |

## Notas de design (por que fazer assim)

- **O MuJoCo reescreve os dados dos vértices da malha**: após carregar um `<mesh>`, `mjModel.mesh_vert` guarda os vértices no **sistema de coordenadas da própria malha**
  (a origem é redefinida para o centroide dos vértices e os eixos são reordenados), não mais nas coordenadas originais do arquivo — usá-lo diretamente para calcular a caixa delimitadora ou aplicar dimensões de CAD
  produz resultados errados (a exibição da renderização não é afetada). Para obter a geometria real do CAD, analise o arquivo original (a abordagem em `preview_mount.py` /
  `step_to_stl.py`). Já aconteceu uma vez: dimensões reais do suporte 54,3 × 35,0 × 75,0 mm.
- **A direção de enquadramento da câmera do MuJoCo é o −Z do seu sistema de coordenadas**: o elemento `<camera>` não olha para o próprio +Z (direção em que a lente se projeta). A primeira versão do
  módulo de câmera construiu a lente em +Z com o elemento orientado como identity → a imagem na verdade saía "de trás para frente" a partir do lado traseiro da PCB, e **a direção da lente e a direção da imagem
  ficavam exatamente opostas** (a raiz de "a direção em que eu giro não bate com a imagem" ao ajustar parâmetros; localizado em 2026-10-16 com testes de renderização comparando placas vermelha/azul).
  Correção: o elemento de câmera gira 180° em torno de Y (`view.quat = RPY(0,180,0)`, unificado em três lugares: preview_mount / adjust_camera / plugin do robô); o `adjust_camera.py` ganhou a janela de imagem em tempo real "sim_cam live view", com ajuste de lente em tempo real (WYSIWYG).
- **A garra do MJCF do tutorial oficial é do tipo "bico de pássaro", com contato pontual**: as duas pontas dos dentes se fecham até um contato pontual de cerca de 2,3 mm, quase sem superfície de preensão utilizável.
  Conclusão de experimentos físicos sistemáticos (2026-10-16, centenas de casos): com o cubo em qualquer posição perto da abertura dos dentes, ele é
  empurrado/expulso durante a varredura de fechamento de cerca de 100°, impossível de agarrar (vale para cubos de 16–34 mm; o curso mecânico e o torque em si estão
  normais). **É proibido corrigir o problema adicionando "placas de colisão" ao modelo** — já se tentou adicionar placas dentadas às duas garras (melhora significativa na preensão), mas essa é uma geometria que não existe no robô real; a política treinada passaria a
  depender dela, causando distorção sim2real, e isso foi removido. A correção correta é **substituir a garra do modelo oficial pela geometria da garra do robô real** (por exemplo, o
  SO-ARM101 do menagerie ou uma reconstrução a partir do CAD próprio), mantendo os parâmetros físicos consistentes com o robô real.
- **Os parâmetros de contato padrão oficiais são "macios" demais e causam interpenetração física**: a constante de tempo `solref` padrão é 20 ms; contatos rápidos/finos
  (cubo caindo sobre a face fina da garra, varredura de fechamento) atravessam um ao outro "antes de conseguir gerar força" — o sintoma é "o cubo atravessa a face da garra e cai".
  Correção (2026-10-16): endurecimento dos parâmetros de contato — `harden_mesh_contacts` endurece, após a compilação, o `solref` de todos os corpos de colisão de malha
  para o mesmo valor das faces dentadas do menagerie (0,01 s), com o mesmo tratamento para o contato do cubo. Correção puramente de fidelidade física, sem adicionar nenhuma geometria.
- **O robô simulado foi migrado para o modelo SO-ARM100 do mujoco_menagerie** (2026-10-16): o MJCF do zip do tutorial original é uma peça de demonstração cinemática e a garra não consegue agarrar;
  o modelo do menagerie é feito a partir do CAD do robô real — a garra tem faces dentadas de colisão dedicadas e parâmetros de contato rígidos,
  e as quatro posições dos dentes (rasa→profunda) conseguem, nas medições, bloquear + agarrar + levantar o cubo de 34 mm. Pontos da migração: o modelo está vendored em
  `assets/menagerie_so_arm100/` (Apache-2.0, com LICENSE); o mapeamento de juntas e os sinais das unidades estão em `MODEL_JOINT`
  (determinado junta a junta comparando o movimento no mundo com o modelo antigo; o sinal de wrist_roll aguarda revisão por teleoperação no robô real); a Base do modelo gira +90° em torno de Z para que a
  face de trabalho fique voltada para +x; o suporte passou a ser fixado na lateral da Fixed_Jaw (servo nº 6) (primeiro por busca analítica de posicionamento; finalizado em 2026-10-16 pelo usuário, comparando fotos do robô real,
  com ajuste manual via `adjust_mount.py --model menagerie`: `[0.1, -0.7, 24.7]mm`, `RPY [0.34, -27.20, 89.51]°`). Os modelos e ferramentas do tutorial antigo foram mantidos intactos, disponíveis para comparação a qualquer momento.
- **Por que usar o ambiente de projeto do uv em vez do conda**: o `.venv` fica no mesmo diretório do projeto, tem versões bloqueadas pelo `uv.lock` e é recuperado ao excluir o diretório,
  totalmente isolado dos ambientes conda da máquina; o `uv run` nunca instala nada no conda ativado. O ambiente conda `lerobot` desta máquina
  aponta para **outra cópia do repositório** (`lerobot-main`); os dois não interferem entre si.
- **Por que todos os plugins ficam em `examples/so101_mujoco/`**: integração pelo mecanismo oficial de registro (`register_subclass`),
  **zero modificações no código-fonte do lerobot**; atualizar o upstream exige apenas um novo sync.

<RelatedProducts slugs="so-arm101" />
