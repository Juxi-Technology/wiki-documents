---
title: Eficiência de memória — Executando modelos em 8 GB
sidebar_label: Eficiência de memória
slug: /tutorials/memory-efficiency
description: >-
  As alavancas documentadas para encaixar cargas de trabalho de LLM, VLM e
  visão nos 8 GB de memória unificada do Kit de Desenvolvedor Jetson Orin
  Nano Super — plataforma, modelo e medição.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/FP8KV.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/reduce-vocab.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/ram-optimization/
    checked: 2026-09-26
review_owner: cheny
---

# Eficiência de memória — Executando modelos em 8 GB

No kit Orin Nano Super, os 8 GB de memória unificada são um limite rígido para
tudo: o SO, o desktop, os serviços e o próprio modelo. As alavancas
documentadas vêm em três camadas — **plataforma**, **modelo** e **medição** — e
esta página observa onde uma técnica está documentada apenas para um módulo
maior.

## O orçamento de 8 GB em números concretos

- Cerca de **7,6 GB dos 8 GB são utilizáveis** após as reservas de firmware e
  kernel — o orçamento que o blog de eficiência de memória da NVIDIA usa para
  todos os seus números de "memória disponível".
- Memória de CPU e memória de GPU (CUDA, buffers de multimídia) vêm do **mesmo
  pool físico**; reduzir uma ajuda a outra.
- A demonstração principal do blog — um pipeline de VLM de 2B parâmetros —
  roda a **4,5 / 7,6 GB (~60%)**.

## Alavanca 1 — Camada da plataforma: o que o SO e os serviços ocupam

As economias abaixo são do blog de eficiência de memória da NVIDIA.

| Alavanca | Economia documentada | Como |
|---|---|---|
| Desativar o desktop gráfico (headless) | Até 865 MB | `sudo systemctl set-default multi-user.target` |
| Desativar serviços de rede e journaling | Até 32 MB | `sudo systemctl disable <service-name>` |
| Carveouts de display e câmera | Cerca de 100 MB no total | Edição da árvore de dispositivos do BSP e nova gravação |
| Reserva do SWIOTLB | Cerca de 4 MB | Argumento de kernel `swiotlb=2048`, apenas se surgirem problemas de DMA |
| Pipeline no estilo DeepStream | Até 412 MB | Contêiner para bare metal (70 MB); Python para C++ (84 MB); desativar Tiler/OSD e usar FakeSink (258 MB) — veja [DeepStream](/pt-br/tutorials/jetson-orin-nano/deepstream) |
| Escolha do framework de inferência | Evite >2,7 GB de sobrecarga | Runtimes enxutos (runtime C++, llama.cpp); um framework mais pesado pode adicionar mais de 2,7 GB só na inicialização |

> **Nota da Juxi:** edições de carveout são mudanças no código-fonte do BSP:
> exigem uma nova gravação e economizam pouco. Mude uma coisa de cada vez e
> mantenha uma imagem de gravação funcional — veja
> [Gravação e atualizações](/pt-br/tutorials/jetson-orin-nano/flashing-and-updates).

**Swap não é uma economia, mas uma válvula de pressão.** O tutorial de
otimização de RAM do fabricante substitui o ZRAM por um **arquivo de swap de
16 GB no NVMe** (`sudo systemctl disable nvzramconfig` primeiro); a demonstração
de 8 GB da NVIDIA assumiu cerca de **2 GB de swap usados no pico**.

### Depois de parar um servidor, libere o cache

O uso de memória pode permanecer alto depois que você para um servidor vLLM ou
SGLang, ou um contêiner Docker (problema conhecido 5661165 do L4T r39.2.1). O
comando da NVIDIA:

```bash
sudo sh -c "sync; echo 3 > /proc/sys/vm/drop_caches"
```

A mesma correção se aplica quando uma compilação de engine do Edge-LLM fica
sem memória: `sudo sysctl -w vm.drop_caches=3` mais limites de compilação
menores (tutorial do fabricante).

### Modos de energia mudam os clocks, não a capacidade

| Modo de energia | ID do modo | Clock máx. da CPU | Clock máx. da GPU | Clock máx. da memória |
|---|---|---|---|---|
| 15W | 0 | 1497,6 MHz | 612 MHz | 2133 MHz |
| 25W (padrão) | 1 | 1344 MHz | 918 MHz | 3199 MHz |
| MAXN_SUPER | 2 | 1728 MHz | 1020 MHz | 3199 MHz |

Os máximos de clock acima são das tabelas de Energia e Desempenho do r39.2 da
NVIDIA. Modos de energia mudam frequências de clock, não o tamanho da memória —
um modelo que não cabe não vai caber em um modo mais rápido. Alterne com
`sudo nvpmodel -q` (listar) e `sudo nvpmodel -m <mode_id>`; o MAXN_SUPER exige
a configuração de gravação Super e é experimental (segundo essas tabelas). Se
25W ou MAXN SUPER estiver faltando, veja [Solução de problemas](/pt-br/tutorials/jetson-orin-nano/troubleshooting).

> **Atenção:** uma alocação de memória CUDA excessivamente grande pode
> **reiniciar o dispositivo** (problema conhecido 5699079 do L4T r39.2.1). A
> orientação nas mesmas notas de versão: garanta que o CUDA e outros
> aplicativos não solicitem mais memória do que está fisicamente disponível, e
> inicie processos CUDA com pontuações OOM mais altas para que os processos do
> sistema não sejam encerrados.

## Alavanca 2 — Camada do modelo: o que o modelo e o seu cache ocupam

### A quantização é a maior alavanca isolada

O Orin executa **somente engines FP16, INT8 e INT4**; FP8 e FP4 não rodam no
Orin (classe Thor/Blackwell). Para o TensorRT Edge-LLM, use checkpoints
**INT4 AWQ ou INT4 GPTQ**, evite INT8 GPTQ e nunca escolha checkpoints FP8,
MXFP8, FP4 ou NVFP4. Veja [Inferência de LLM local](/pt-br/tutorials/jetson-orin-nano/local-llm).

Números do fabricante: Qwen3 8B de FP16 para W4A16 recupera cerca de **10 GB**;
Qwen3 4B de BF16 para INT4 recupera cerca de **5,6 GB**. O gráfico da NVIDIA
para o caso 4B tem a legenda "Jetson Orin NX 16 GB" — um módulo maior, então
trate os números como referência, não como uma promessa para 8 GB.

Com quantização de 4 bits e um runtime eficiente, o envelope documentado pela
NVIDIA para este orçamento é de **LLMs de até ~10B parâmetros e VLMs de até
~4B parâmetros**.

### O que a NVIDIA realmente mede nos benchmarks de 8 GB

O TensorRT Edge-LLM publica linhas do Orin Nano 8 GB para modelos de 0,6B a 2B
parâmetros (famílias Qwen3 e Qwen3.5); **2B é o maior modelo que a NVIDIA mede
neste módulo**. Existe um walkthrough de 4B INT4 AWQ como tutorial do
fabricante (cerca de 2 GB de pesos), mas nenhum número oficial de 4B é
publicado.

### Memória de compilação dos engines (TensorRT Edge-LLM)

- `--externalize-weights int4_ffn` (denso) ou `--externalize-weights
  int4_ffn int4_moe` (MoE) reduz a memória de compilação do engine em
  dispositivos Orin com menos memória de sistema.
- Limites ajustados para o Orin Nano do tutorial do fabricante:
  `llm_build --maxBatchSize 1 --maxInputLen 512 --maxKVCacheCapacity 1024`.
  Se a compilação ainda ficar sem memória, libere memória do sistema primeiro
  e reduza mais, por exemplo `--maxInputLen 256 --maxKVCacheCapacity 512`.
  Os engines são compilados no dispositivo e não são portáveis entre módulos.

### Cache KV: dimensionamento e reutilização

O cache KV cresce com o comprimento do contexto, o tamanho do batch e a
concorrência; ele faz parte do orçamento de memória, e não algo a considerar
depois.

- Limites de compilação o delimitam: `--maxInputLen` e `--maxKVCacheCapacity`;
  as compilações de benchmark do Orin Nano usaram maxInputLen 2048 e
  maxKVCacheCapacity 2200, batch 1.
- **A reutilização de cache KV** é um recurso documentado do runtime do
  Edge-LLM: um cache local ao processo, endereçado por conteúdo, para prefixos
  de entrada repetidos, de modo que o estado de prefill de documentos, turnos
  anteriores, continuações geradas e prefixos de imagem repetidos seja
  reutilizado em vez de recalculado.
- Um arquivo de modelo que cabe ainda pode falhar: um relato da comunidade
  mostra arquivos GGUF de 7,4 GB e 16 GB falhando com um erro de alocação de
  cache KV em uma placa de 8 GB — adicione o cache KV e a sobrecarga do
  runtime ao verificar a compatibilidade.
- **A redução de vocabulário** (geração restrita a um subconjunto de tokens
  específico da tarefa) e a **poda de tokens visuais (DART)** (tokens visuais
  duplicados descartados antes do prefill) são páginas de recursos
  documentadas do Edge-LLM. A compilação do engine visual também aceita
  limites de tokens de imagem: `--minImageTokens`, `--maxImageTokens`,
  `--maxImageTokensPerImage`.

> **Importante:** o cache KV em FP8 — a economia de ~50% de memória do cache
> KV — exige SM89 ou mais recente (Ada Lovelace e superiores). O Orin é SM87,
> então **não está disponível neste kit**. Use cache KV em FP16.

### Um antes/depois do fabricante

O estudo de caso de 8 GB da NVIDIA (blog de eficiência de memória, Tabela 7):
modo headless em vez do desktop GNOME completo (1,8 GB → 1,1 GB) mais um VLM
GGUF de 4 bits (Q4_K_M, 6,6 GB → 2,2 GB). O pipeline não rodava no Orin Nano
8 GB antes (só o VLM usava 87% da RAM) e agora roda a **4,5 / 7,6 GB (~60%)** —
mais de 5,1 GB economizados. A coluna "antes" é no **Orin NX 16 GB**: as
mesmas otimizações moveram a carga de trabalho para o kit de 8 GB.

## Alavanca 3 — Camada de medição: veja para onde a memória vai

| Ferramenta | Mostra | Nota |
|---|---|---|
| `sudo tegrastats` | CPU, GPU, memória, temperatura, energia | O guia do usuário do kit de desenvolvedor: o nvidia-smi não é a ferramenta de monitoramento principal no Jetson |
| `nvidia-smi dmon` | Utilização da GPU | Conforme a nota de versão 5406663; a utilização da GPU na Jetson Power GUI está "ainda em avaliação" |
| `free -h` | A visão do SO sobre a memória | Não diz o que uma carga de trabalho de GPU pode alocar |
| procrank | Memória física por processo (PSS) | `git clone https://github.com/csimmonds/procrank_linux.git`, `cd procrank_linux/`, `make`, `sudo ./procrank` |
| Clientes do nvmap | Processos que mantêm buffers de GPU/multimídia | `sudo cat /sys/kernel/debug/nvmap/iovmm/clients` |

### "Memória livre" não é o orçamento

O `free -h` mostra a visão do sistema aberto; as alocações de GPU vêm do mesmo
pool com contabilização separada. Em um relato da comunidade em uma placa de
8 GB, o `cudaMalloc` falhou para o cache KV enquanto o `free -h` ainda mostrava
5,7 GiB "livres" [grau B, relato da comunidade]. Julgue a compatibilidade pelo
orçamento de ~7,6 GB, não pelo "livre".

### Método

1. Confirme primeiro o básico da plataforma — [Verifique seu sistema](/pt-br/tutorials/jetson-orin-nano/verify-your-system).
2. Registre uma linha de base: memória em repouso e depois sob carga (`tegrastats`).
3. Mude uma alavanca, meça de novo. Se nada mudou, reverta.

## Por onde começar

Pelo tamanho documentado do ganho:

1. **Runtime e quantização** — a maior camada no resumo da NVIDIA (cerca de 5–10 GB para frameworks de inferência e quantização de modelos, conforme a Tabela 5 do blog).
2. **Headless** — até ~865 MB, um comando.
3. **Ajuste de pipeline** — até ~412 MB (estilo DeepStream).
4. **Swap no NVMe** — alívio de pressão, não economia.
5. **Carveouts e SWIOTLB** — cerca de 100 MB e 4 MB, e uma nova gravação. Por último.

Se um modelo ainda não cabe, o problema é o modelo, não as configurações: vá
para um menor, quantize mais, encurte o contexto ou reduza o batch — veja
[Inferência de LLM local](/pt-br/tutorials/jetson-orin-nano/local-llm) e o
[FAQ](/pt-br/tutorials/jetson-orin-nano/faq).

## Fontes

- [Blog técnico da NVIDIA — Maximizing Memory Efficiency to Run Bigger Models on NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (orçamento de 7,6 GB, desktop 865 MB, rede/journaling 32 MB, carveouts, SWIOTLB, economias de pipeline, tabelas de quantização e de antes/depois, passos de instalação do procrank e clientes do nvmap; verificado em 2026-09-26)
- Documentação do TensorRT Edge-LLM: [Supported Models](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html) · [FP8 KV Cache](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/FP8KV.html) · [Performance Benchmarks](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html) · [Quick Start Guide](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html) · páginas de recursos: [reutilização de cache KV](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) · [redução de vocabulário](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/reduce-vocab.html) · [poda de tokens visuais (DART)](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html) (verificado em 2026-09-26)
- Documentação do Jetson Linux: [Notas de versão do r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (problemas 5661165, 5699079, 5406663) · [Power and Performance, r39.2](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) · [Dev Kit How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (verificado em 2026-09-26)
- Jetson AI Lab: [tutorial do TensorRT Edge-LLM](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/) · [otimização de RAM](https://www.jetson-ai-lab.com/tutorials/ram-optimization/) (limites de compilação do Orin Nano; swap em NVMe; verificado em 2026-09-26)
- [Fóruns de desenvolvedores NVIDIA — Ollama no Jetson](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) (comunidade: free -h vs. cudaMalloc; grau B; verificado em 2026-09-26)

*Status: rascunho, pendente de revisão por cheny. Baseado na documentação
oficial da NVIDIA na data indicada; ainda não verificado em hardware físico
pela Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas registradas da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
