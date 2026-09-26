---
title: Executar LLMs localmente — TensorRT Edge-LLM no Orin Nano de 8 GB
sidebar_label: Inferência local de LLM
slug: /tutorials/local-llm
description: >-
  Executar grandes modelos de linguagem localmente no Jetson Orin Nano de
  8 GB — suporte do TensorRT Edge-LLM, limites de precisão, o que cabe e
  números oficiais.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/llms-full.txt
    checked: 2026-09-26
  - source: https://github.com/dusty-nv/jetson-containers
    checked: 2026-09-26
  - source: https://pypi.jetson-ai-lab.io/sbsa/cu130
    checked: 2026-09-26
review_owner: cheny
---

# Executar LLMs localmente — TensorRT Edge-LLM no Orin Nano de 8 GB

O seu kit de desenvolvedor Jetson Orin Nano Super (8 GB) pode executar modelos
de linguagem localmente. A via otimizada da NVIDIA para isso é o **TensorRT
Edge-LLM**, que **suporta oficialmente o Jetson Orin na linha JetPack 7.2**.
Esta página aborda o que cabe em 8 GB e quais os runtimes que funcionam hoje;
as instruções estão na documentação da NVIDIA, com ligações abaixo.

## Leia isto primeiro — quatro restrições deste kit

1. **O Orin executa apenas motores FP16, INT8 e INT4. Os motores FP8 e FP4 não
   são executados neste dispositivo** — são capacidades da classe
   Thor/Blackwell («O Jetson Orin não executa motores FP8 nem FP4» — matriz de
   compatibilidade).
2. **Os motores são compilados no dispositivo** pelo runtime C++. A exportação
   e a quantização ONNX são executadas num host Linux x86-64 — não no Orin. Os
   motores são exatos quanto ao SM: um motor compilado no Thor (SM110) não
   carrega no Orin Nano (sm_87).
3. **O JetPack 7.2.1 (L4T r39.2.1) é a pilha suportada** — CUDA 13.2.2,
   TensorRT 10.16.2. O Edge-LLM utiliza o TensorRT da plataforma fornecido com
   o JetPack.
4. **Os 8 GB de memória unificada são partilhados com o sistema operativo e o
   ambiente de trabalho.** Cerca de 7.6 GB são utilizáveis. É o tamanho do
   modelo — e não os TOPS — que constitui a restrição determinante, e a KV
   cache tem de caber na mesma memória.

> **Importante:** escolha checkpoints **INT4 AWQ** ou **INT4 GPTQ** para este
> kit. Não selecione checkpoints FP8, MXFP8, FP4 ou NVFP4. O INT8 GPTQ não é
> suportado.

## O que o TensorRT Edge-LLM abrange

O TensorRT Edge-LLM é o runtime oficial da NVIDIA para LLMs e VLMs em
plataformas de borda. A matriz de compatibilidade lista o Jetson Orin como
«Oficial» para o JetPack 7.2, com motores compilados no dispositivo e precisão
FP16, INT8 e INT4.

- **Cobertura de modelos:** os checkpoints suportados incluem Llama 3.2 1B/3B,
  Llama 3.1 8B, Qwen2.5 (0.5B–14B), Qwen3 (0.6B–8B) e VLMs como Qwen2.5-VL
  3B/7B e InternVL3/3.5 (1B–14B) — checkpoints densos abaixo de 30B
  parâmetros. Não é uma matriz de verificação: «nem todos os checkpoints
  listados foram totalmente verificados em todas as plataformas e precisões
  suportadas».
- **O sinalizador de compilação para 8 GB:** para compilações de motores INT4
  no Orin Nano, passe `--externalize-weights int4_ffn` (denso) ou
  `--externalize-weights int4_ffn int4_moe` (MoE) para reduzir a memória de
  compilação do motor.
- **Espaço em disco:** conte com ~20–50 GB por fluxo de trabalho de modelo
  para ficheiros ONNX e motores; este kit não tem armazenamento integrado
  ([Início rápido](/pt-pt/tutorials/jetson-orin-nano/quick-start)).
- **Dois percursos de Início rápido:** um percurso C++ (exportar/quantizar num
  host, compilar motores no dispositivo, executar) e um percurso de servidor —
  `tensorrt-edgellm-serve Qwen/Qwen3.5-0.8B` (descarrega o checkpoint no
  primeiro arranque).

> **Dica da Juxi:** os passos autoritativos são os da NVIDIA — [Início
> rápido](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html),
> [Instalação](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html),
> [Modelos suportados](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html).
> A página de instalação da versão 0.10.1 afirma: «As wheels não são
> publicadas nem constituem o caminho de instalação predefinido na versão
> 0.10.1.»

## O que cabe realmente em 8 GB

- **Até 2B parâmetros é o que a NVIDIA avaliou em benchmarks neste módulo.** A
  maior linha do Orin Nano (8GB) na página de benchmarks do Edge-LLM é o
  Qwen3.5-2B, com 4692 MB: «2B é o maior modelo que a NVIDIA avaliou em
  benchmarks no Orin Nano 8 GB.»
- **Um tutorial do fornecedor executa um modelo de 4B.** O tutorial do Jetson
  AI Lab indica que o Qwen3-4B-Instruct INT4 AWQ (~2 GB de pesos) cabe «dentro
  da memória unificada de 8 GB do Orin Nano»; o InternVL3 1B/2B também cabe
  com INT4 AWQ, enquanto as variantes maiores se destinam ao AGX Orin ou ao
  Thor. (Conteúdo do fornecedor.)
- **Um envelope prático do blogue de memória da NVIDIA: LLMs até ~10B e VLMs
  até ~4B parâmetros** com quantização de 4 bits e runtimes eficientes — para
  configurações otimizadas.
- **O tamanho do ficheiro não é o teste de compatibilidade — a KV cache
  também tem de caber.** Relatos da comunidade mostram modelos GGUF da classe
  12B/26B (gemma4:12b com 7.4 GB, gemma4:26b com 16 GB) a falhar no Ollama
  na placa de 8 GB: `cudaMalloc failed: out of memory ... failed to allocate
  buffer for kv cache`. (Não confirmado.)

## Números oficiais de desempenho para este kit

A NVIDIA publica tabelas de benchmarks para o **Jetson Orin Nano (8GB)** —
v0.10.0, JetPack 7.2 / CUDA 13.2 / TensorRT 10.16. Resultados em tempo de
execução no MTBench (LLMs) e COCO (VLMs), com memória máxima da GPU:

| Modelo | Tipo | Débito | Memória máxima da GPU |
|---|---|---|---|
| Qwen3-0.6B | LLM | 77,0 tok/s | 1917 MB |
| Qwen3-1.7B | LLM | 36,5 tok/s | 2992 MB |
| Qwen3-VL-2B | VLM | 36,1 tok/s | 4486 MB |
| Qwen3.5-0.8B | LLM | 59,1 tok/s | 2127 MB |
| Qwen3.5-0.8B | VLM | 59,0 tok/s | 2760 MB |
| Qwen3.5-2B | LLM | 29,6 tok/s | 3642 MB |
| Qwen3.5-2B | VLM | 29,6 tok/s | 4692 MB |

As linhas do Orin usam batch 1 e pesos INT4 externalizados; limites de
compilação: maxInputLen 2048, maxKVCacheCapacity 2200. «O desempenho em
produção pode variar com a otimização ao nível do sistema (modo de
alimentação, configuração de memória, gestão térmica).»

> **Importante:** as tabelas de tokens por segundo publicadas pela NVIDIA para
> o **AGX Orin 64 GB** **não** se aplicam a este kit — módulo, largura de banda
> de memória e envelope de potência diferentes. Não estime números do Orin
> Nano a partir do AGX Orin. Não existem números da própria NVIDIA para os
> percursos Ollama ou llama.cpp neste kit.

## Outros runtimes neste kit

### Ollama

Estado atual, confirmado por funcionários da NVIDIA nos fóruns de
desenvolvedores para o JetPack 7.2.1 (setembro de 2026): o instalador de
origem funciona — `curl -fsSL https://ollama.com/install.sh | sh` — e o
`ollama ps` deve indicar `100% GPU`. O aviso "Unsupported JetPack version
detected" é inofensivo.

Compilações mais antigas recorriam à CPU porque as suas bibliotecas CUDA
pré-compiladas não incluíam sm_87, a capacidade de computação do Orin; relatos
da comunidade apontam para o Ollama 0.30.11 a acrescentar «CC 87 para CUDA
v13», e funcionários da NVIDIA confirmaram a correção. Subsistem alguns
relatos de problemas da comunidade (agosto–setembro de 2026) — verifique
`ollama ps` na sua unidade; a compilação do código-fonte com CUDA v13 continua
a ser a alternativa.

### Wheels Python para o JetPack 7.2

Os pacotes Python com CUDA (PyTorch e outros) para o JetPack 7.2 / CUDA 13.2
vêm do índice SBSA do Jetson AI Lab, citado por funcionários da NVIDIA:

```
https://pypi.jetson-ai-lab.io/sbsa/cu130
```

Utilize-o como índice do pip (`--index-url https://pypi.jetson-ai-lab.io/sbsa/cu130`).
Disponibiliza wheels aarch64 como torch 2.11.0, torchvision 0.25.0 e vllm
0.20.0+cu130. Não existe um índice `jp7/*`; o índice da era JetPack 6 é
`jp6/cu126`. O CUDA 13.2 unifica o Orin no toolkit Arm SBSA (controlador
R595+).

### jetson-containers e Jetson AI Lab (percurso alternativo)

O [jetson-containers](https://github.com/dusty-nv/jetson-containers) suporta o
JetPack 6.2 (CUDA 12.6) e o JetPack 7 (CUDA 13.x). Existem imagens
`-jetson-orin` pré-compiladas para os principais percursos de serviço,
incluindo `ghcr.io/nvidia-ai-iot/llama_cpp:latest-jetson-orin` e
`ghcr.io/nvidia-ai-iot/vllm:latest-jetson-orin`.

Advertências de 8 GB do material do fornecedor: o exemplo com vLLM utiliza
`--shm-size=16g` (o que aqui não é uma recomendação de tamanho), e a
configuração recomendada move a raiz de dados do Docker para o NVMe e
acrescenta um ficheiro de swap de 16 GB (desative primeiro o ZRAM).

## Otimização para 8 GB

Quando um modelo não cabe: liberte memória da plataforma (o modo sem monitor
recupera até ~865 MB), quantize para 4 bits e dimensione deliberadamente a KV
cache e o contexto — consulte [Eficiência de memória para
8 GB](/pt-pt/tutorials/jetson-orin-nano/memory-efficiency).

## Resolução de problemas

- **Sem memória ao carregar** — `cudaMalloc failed: out of memory ... failed
  to allocate buffer for kv cache` significa que o modelo mais a KV cache
  excedem os 8 GB de memória unificada. Utilize um modelo mais pequeno ou mais
  quantizado, ou encurte o contexto; para compilações de motores Edge-LLM,
  acrescente `--externalize-weights int4_ffn` e reduza `--maxInputLen` /
  `--maxKVCacheCapacity`.
- **Recurso do Ollama à CPU, ou o aviso "Unsupported JetPack version
  detected"** — atualize primeiro o Ollama (as compilações mais antigas não
  tinham sm_87); o aviso é inofensivo no 7.2.1 segundo funcionários da NVIDIA.
  Confirme com `ollama ps` (`100% GPU`).
- **Problemas de versão ou de configuração** — consulte [Verificar o
  sistema](/pt-pt/tutorials/jetson-orin-nano/verify-your-system) e [Resolução
  de problemas](/pt-pt/tutorials/jetson-orin-nano/troubleshooting).

## Fontes

- [TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/): [Matriz de compatibilidade](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html), [Modelos suportados](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html), [Instalação](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html), [Início rápido](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html), [Benchmarks de desempenho](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html) (verificado em 2026-09-26)
- [Página de transferências do JetPack 7.2.1](https://developer.nvidia.com/embedded/jetpack/downloads) (verificado em 2026-09-26)
- [Blogue da NVIDIA — Maximizing Memory Efficiency to Run Bigger Models on NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (verificado em 2026-09-26)
- [Fóruns de Desenvolvedores NVIDIA — Ollama on Jetson (verificado por funcionários no JetPack 7.2.1)](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) (verificado em 2026-09-26)
- [Fóruns de Desenvolvedores NVIDIA — problema de aceleração por GPU no JetPack 7.2 (índice de wheels, sm_87)](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) (verificado em 2026-09-26)
- [Fóruns de Desenvolvedores NVIDIA — AI models that run on Jetson Orin Nano Super 8GB (comunidade)](https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412) (verificado em 2026-09-26)
- [Jetson AI Lab — tutorial do TensorRT Edge-LLM](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/) (verificado em 2026-09-26)
- [Jetson AI Lab — texto completo da documentação (tabela de imagens de contentores)](https://www.jetson-ai-lab.com/llms-full.txt) (verificado em 2026-09-26)
- [jetson-containers (GitHub)](https://github.com/dusty-nv/jetson-containers) (verificado em 2026-09-26)
- [Índice PyPI do Jetson AI Lab — sbsa/cu130](https://pypi.jetson-ai-lab.io/sbsa/cu130) (verificado em 2026-09-26)

*Estado: rascunho, pendente de revisão por cheny. Baseado na documentação
oficial da NVIDIA na data indicada; ainda não verificado em hardware físico
pela Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas comerciais da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
