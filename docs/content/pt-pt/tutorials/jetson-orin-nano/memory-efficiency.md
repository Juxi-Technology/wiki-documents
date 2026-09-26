---
title: Eficiência de memória — Executar modelos em 8 GB
sidebar_label: Eficiência de memória
slug: /tutorials/memory-efficiency
description: >-
  As alavancas documentadas para encaixar cargas de trabalho de LLM, VLM e
  visão nos 8 GB de memória unificada do kit de desenvolvedor Jetson Orin
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

# Eficiência de memória — Executar modelos em 8 GB

No kit Orin Nano Super, os 8 GB de memória unificada são um limite rígido para
tudo: o sistema operativo, o ambiente de trabalho, os serviços e o próprio
modelo. As alavancas documentadas distribuem-se por três camadas —
**plataforma**, **modelo** e **medição** — e esta página assinala onde uma
técnica está documentada apenas para um módulo maior.

## O orçamento de 8 GB em números simples

- Cerca de **7.6 GB dos 8 GB são utilizáveis** após as reservas do firmware e
  do kernel — o orçamento que o blogue da NVIDIA sobre eficiência de memória
  utiliza para todos os seus números de «memória disponível».
- A memória da CPU e a memória da GPU (CUDA, buffers de multimédia) vêm do
  **mesmo conjunto físico**; reduzir uma ajuda a outra.
- A demonstração principal do blogue — um pipeline VLM de 2B parâmetros — é
  executada a **4.5 / 7.6 GB (~60%)**.

## Alavanca 1 — Nível da plataforma: o que o sistema operativo e os serviços ocupam

As poupanças abaixo são do blogue da NVIDIA sobre eficiência de memória.

| Alavanca | Poupança documentada | Como |
|---|---|---|
| Desativar o ambiente de trabalho gráfico (sem monitor) | Até 865 MB | `sudo systemctl set-default multi-user.target` |
| Desativar serviços de rede e de journaling | Até 32 MB | `sudo systemctl disable <service-name>` |
| Carveouts do ecrã e da câmara | Cerca de 100 MB no total | Edição da árvore de dispositivos do BSP, depois regravar |
| Reserva do SWIOTLB | Cerca de 4 MB | Argumento do kernel `swiotlb=2048`, apenas se surgirem problemas de DMA |
| Pipeline ao estilo do DeepStream | Até 412 MB | De contentor para bare metal (70 MB); de Python para C++ (84 MB); desativar o Tiler/OSD e usar FakeSink (258 MB) — consulte [DeepStream](/pt-pt/tutorials/jetson-orin-nano/deepstream) |
| Escolha da framework de inferência | Evitar mais de 2.7 GB de sobrecarga | Runtimes leves (runtime C++, llama.cpp); uma framework mais pesada pode acrescentar mais de 2.7 GB só na inicialização |

> **Nota da Juxi:** as alterações de carveouts são alterações ao código-fonte
> do BSP: exigem uma regravação e poupam pouco. Altere uma coisa de cada vez e
> mantenha uma imagem de gravação funcional — consulte [Gravação e
> atualizações](/pt-pt/tutorials/jetson-orin-nano/flashing-and-updates).

**O swap não é uma poupança, mas sim uma válvula de pressão.** O tutorial de
otimização de RAM do fornecedor substitui o ZRAM por um **ficheiro de swap de
16 GB no NVMe** (`sudo systemctl disable nvzramconfig` primeiro); a
demonstração de 8 GB da NVIDIA assumiu cerca de **2 GB de swap utilizados no
pico**.

### Depois de parar um servidor, liberte a cache

A utilização de memória pode manter-se elevada depois de parar um servidor
vLLM ou SGLang, ou um contentor Docker (problema conhecido 5661165 do L4T
r39.2.1). O comando da NVIDIA:

```bash
sudo sh -c "sync; echo 3 > /proc/sys/vm/drop_caches"
```

A mesma correção aplica-se quando uma compilação de motor Edge-LLM fica sem
memória: `sudo sysctl -w vm.drop_caches=3` mais limites de compilação mais
pequenos (tutorial do fornecedor).

### Os modos de alimentação alteram frequências, não a capacidade

| Modo de alimentação | ID do modo | Frequência máx. da CPU | Frequência máx. da GPU | Frequência máx. da memória |
|---|---|---|---|---|
| 15W | 0 | 1497.6 MHz | 612 MHz | 2133 MHz |
| 25W (predefinido) | 1 | 1344 MHz | 918 MHz | 3199 MHz |
| MAXN_SUPER | 2 | 1728 MHz | 1020 MHz | 3199 MHz |

Os máximos de frequência acima são das tabelas de Energia e Desempenho do
r39.2 da NVIDIA. Os modos de alimentação alteram as frequências, não o tamanho
da memória — um modelo que não cabe não passa a caber num modo mais rápido.
Mude com `sudo nvpmodel -q` (listar) e `sudo nvpmodel -m <mode_id>`; o
MAXN_SUPER requer a configuração de gravação Super e é experimental (segundo
essas tabelas). Se faltarem os modos 25W ou MAXN SUPER, consulte [Resolução de
problemas](/pt-pt/tutorials/jetson-orin-nano/troubleshooting).

> **Atenção:** uma alocação de memória CUDA excessivamente grande pode
> **reiniciar o dispositivo** (problema conhecido 5699079 do L4T r39.2.1). A
> orientação nas mesmas notas de versão: garanta que o CUDA e outras aplicações
> não pedem mais memória do que a fisicamente disponível e inicie os processos
> CUDA com pontuações OOM mais altas, para que os processos do sistema não
> sejam terminados.

## Alavanca 2 — Nível do modelo: o que o modelo e a sua cache ocupam

### A quantização é a maior alavanca individual

O Orin executa **apenas motores FP16, INT8 e INT4**; FP8 e FP4 não são
executados no Orin (classe Thor/Blackwell). Para o TensorRT Edge-LLM, use
checkpoints **INT4 AWQ ou INT4 GPTQ**, evite INT8 GPTQ e nunca escolha
checkpoints FP8, MXFP8, FP4 ou NVFP4. Consulte [Inferência local de
LLM](/pt-pt/tutorials/jetson-orin-nano/local-llm).

Números da própria NVIDIA: o Qwen3 8B, de FP16 para W4A16, recupera cerca de
**10 GB**; o Qwen3 4B, de BF16 para INT4, recupera cerca de **5.6 GB**. O
gráfico da NVIDIA para o caso de 4B tem a legenda "Jetson Orin NX 16 GB" — um
módulo maior, pelo que os números devem ser tratados como referência, não como
uma promessa para 8 GB.

Com quantização de 4 bits e um runtime eficiente, o envelope documentado pela
NVIDIA para este orçamento é **LLMs até ~10B parâmetros e VLMs até ~4B
parâmetros**.

### O que a NVIDIA avalia de facto em 8 GB

O TensorRT Edge-LLM publica linhas do Orin Nano 8 GB para modelos de 0.6B a 2B
parâmetros (famílias Qwen3 e Qwen3.5); **2B é o maior modelo que a NVIDIA
avalia em benchmarks neste módulo**. Existe um tutorial do fornecedor com um 4B
INT4 AWQ (cerca de 2 GB de pesos), mas não são publicados números oficiais
para 4B.

### Memória de compilação de motores (TensorRT Edge-LLM)

- `--externalize-weights int4_ffn` (denso) ou `--externalize-weights
  int4_ffn int4_moe` (MoE) reduz a memória de compilação de motores em
  dispositivos Orin com menos memória de sistema.
- Limites afinados para o Orin Nano do tutorial do fornecedor:
  `llm_build --maxBatchSize 1 --maxInputLen 512 --maxKVCacheCapacity 1024`.
  Se a compilação continuar sem memória, liberte primeiro a memória do sistema
  e reduza mais, por exemplo `--maxInputLen 256 --maxKVCacheCapacity 512`. Os
  motores são compilados no dispositivo e não são portáveis entre módulos.

### KV cache: dimensionamento e reutilização

A KV cache cresce com o comprimento do contexto, o tamanho do batch e a
concorrência; faz parte do orçamento de memória, não é uma reflexão tardia.

- Os limites de compilação delimitam-na: `--maxInputLen` e
  `--maxKVCacheCapacity`; as compilações de benchmark do Orin Nano usaram
  maxInputLen 2048 e maxKVCacheCapacity 2200, batch 1.
- A **reutilização da KV cache** é uma capacidade documentada do runtime do
  Edge-LLM: uma cache local ao processo, endereçada por conteúdo, para prefixos
  de entrada repetidos, de modo que o estado de prefill de documentos, turnos
  anteriores, continuações geradas e prefixos de imagem repetidos é
  reutilizado em vez de recalculado.
- Um ficheiro de modelo que cabe pode ainda assim falhar: um relato da
  comunidade mostra ficheiros GGUF de 7.4 GB e 16 GB a falhar com um erro de
  alocação da KV cache numa placa de 8 GB — acrescente a KV cache e a
  sobrecarga do runtime quando verificar se o modelo cabe.
- A **redução de vocabulário** (geração restrita a um subconjunto de tokens
  específico da tarefa) e a **poda de tokens visuais (DART)** (tokens visuais
  duplicados descartados antes do prefill) são páginas de funcionalidades
  documentadas do Edge-LLM. A compilação do motor visual também aceita limites
  de tokens de imagem: `--minImageTokens`, `--maxImageTokens`,
  `--maxImageTokensPerImage`.

> **Importante:** a KV cache FP8 — a poupança de memória de ~50% na KV cache
> — requer SM89 ou mais recente (Ada Lovelace ou superior). O Orin é SM87,
> pelo que **não está disponível neste kit**. Utilize a KV cache FP16.

### Um antes/depois da própria NVIDIA

O estudo de caso de 8 GB da NVIDIA (blogue sobre eficiência de memória,
Tabela 7): modo sem monitor em vez do ambiente de trabalho GNOME completo
(1.8 GB → 1.1 GB) mais um VLM GGUF de 4 bits (Q4_K_M, 6.6 GB → 2.2 GB). O
pipeline não era executável no Orin Nano 8 GB antes (só o VLM consumia 87% da
RAM) e agora é executado a **4.5 / 7.6 GB (~60%)** — >5.1 GB poupados. A
coluna «antes» é no **Orin NX 16 GB**: as mesmas otimizações passaram a carga
de trabalho para o kit de 8 GB.

## Alavanca 3 — Nível da medição: ver para onde vai a memória

| Ferramenta | O que mostra | Nota |
|---|---|---|
| `sudo tegrastats` | CPU, GPU, memória, temperatura, potência | O guia do utilizador do kit de desenvolvimento: o nvidia-smi não é a principal ferramenta de monitorização no Jetson |
| `nvidia-smi dmon` | Utilização da GPU | Segundo a nota de versão 5406663; a utilização da GPU na Jetson Power GUI está «ainda em avaliação» |
| `free -h` | A visão do sistema operativo sobre a memória | Não indica aquilo que uma carga de trabalho de GPU pode alocar |
| procrank | Memória física por processo (PSS) | `git clone https://github.com/csimmonds/procrank_linux.git`, `cd procrank_linux/`, `make`, `sudo ./procrank` |
| nvmap clients | Processos que retêm buffers de GPU/multimédia | `sudo cat /sys/kernel/debug/nvmap/iovmm/clients` |

### «Memória livre» não é o orçamento

O `free -h` mostra a visão do sistema operativo; as alocações da GPU vêm do
mesmo conjunto, com contabilidade separada. Num relato da comunidade sobre uma
placa de 8 GB, o `cudaMalloc` falhou para a KV cache enquanto o `free -h` ainda
mostrava 5.7 GiB «livres» [grau B, relato da comunidade]. Avalie se o modelo
cabe face ao orçamento de ~7.6 GB, não face à memória «livre».

### Método

1. Confirme primeiro o básico da plataforma — [Verificar o
   sistema](/pt-pt/tutorials/jetson-orin-nano/verify-your-system).
2. Registe uma linha de base: memória em repouso e depois sob carga
   (`tegrastats`).
3. Altere uma alavanca, meça novamente. Se nada mudou, reverta.

## Por onde começar

Pela dimensão documentada do ganho:

1. **Runtime e quantização** — a maior camada no resumo da NVIDIA (cerca de
   5–10 GB para frameworks de inferência e quantização de modelos, segundo a
   Tabela 5 do blogue).
2. **Sem monitor (headless)** — até ~865 MB, um só comando.
3. **Otimização de pipelines** — até ~412 MB (ao estilo do DeepStream).
4. **Swap no NVMe** — alívio de pressão, não uma poupança.
5. **Carveouts e SWIOTLB** — cerca de 100 MB e 4 MB, e uma regravação. Em
   último lugar.

Se um modelo continua a não caber, o problema é o modelo, não as
configurações: escolha um mais pequeno, quantize mais, encurte o contexto ou
reduza o batch — consulte [Inferência local de
LLM](/pt-pt/tutorials/jetson-orin-nano/local-llm) e as
[FAQ](/pt-pt/tutorials/jetson-orin-nano/faq).

## Fontes

- [Blogue técnico da NVIDIA — Maximizing Memory Efficiency to Run Bigger Models on NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (orçamento de 7.6 GB, ambiente de trabalho 865 MB, rede/journaling 32 MB, carveouts, SWIOTLB, poupanças de pipeline, tabelas de quantização e antes/depois, passos de instalação do procrank e nvmap clients; verificado em 2026-09-26)
- Documentação do TensorRT Edge-LLM: [Modelos suportados](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html) · [KV cache FP8](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/FP8KV.html) · [Benchmarks de desempenho](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html) · [Guia de início rápido](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html) · páginas de funcionalidades: [Reutilização da KV cache](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) · [Redução de vocabulário](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/reduce-vocab.html) · [Poda de tokens visuais (DART)](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html) (verificado em 2026-09-26)
- Documentação do Jetson Linux: [Notas de versão do r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (problemas 5661165, 5699079, 5406663) · [Energia e desempenho, r39.2](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) · [Guia prático do kit de desenvolvimento](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (verificado em 2026-09-26)
- Jetson AI Lab: [tutorial do TensorRT Edge-LLM](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/) · [otimização de RAM](https://www.jetson-ai-lab.com/tutorials/ram-optimization/) (limites de compilação do Orin Nano; swap em NVMe; verificado em 2026-09-26)
- [Fóruns de Desenvolvedores NVIDIA — Ollama on Jetson](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) (comunidade: free -h vs. cudaMalloc; grau B; verificado em 2026-09-26)

*Estado: rascunho, pendente de revisão por cheny. Baseado na documentação
oficial da NVIDIA na data indicada; ainda não verificado em hardware físico
pela Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas comerciais da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
