---
title: Executar LLMs localmente — TensorRT Edge-LLM no Orin Nano de 8 GB
sidebar_label: Inferência de LLM local
slug: /tutorials/local-llm
description: >-
  Executar grandes modelos de linguagem localmente no Jetson Orin Nano de
  8 GB — suporte do TensorRT Edge-LLM, limites de precisão, o que cabe e os
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

Seu kit de desenvolvedor Jetson Orin Nano Super (8 GB) pode executar modelos
de linguagem localmente. O caminho otimizado da NVIDIA para isso é o
**TensorRT Edge-LLM**, que **oficialmente oferece suporte ao Jetson Orin na
linha JetPack 7.2**. Esta página cobre o que cabe em 8 GB e quais runtimes
funcionam hoje; as instruções estão na documentação da NVIDIA, com links abaixo.

## Leia isto primeiro — quatro restrições deste kit

1. **O Orin executa somente engines FP16, INT8 e INT4. Engines FP8 e FP4 não
   rodam neste dispositivo** — são recursos da classe Thor/Blackwell ("o Jetson
   Orin não executa engines de modelo FP8 ou FP4" — matriz de suporte).
2. **Os engines são compilados no próprio dispositivo** pelo runtime C++. A
   exportação ONNX e a quantização rodam em um host Linux x86-64 — não no Orin.
   Os engines são exatos em relação ao SM: um compilado no Thor (SM110) não
   carrega no Orin Nano (sm_87).
3. **O JetPack 7.2.1 (L4T r39.2.1) é a pilha com suporte** — CUDA 13.2.2,
   TensorRT 10.16.2. O Edge-LLM usa esse TensorRT da plataforma que vem com o
   JetPack.
4. **Os 8 GB de memória unificada são compartilhados com o SO e o desktop.**
   Cerca de 7,6 GB são utilizáveis. O tamanho do modelo — não os TOPS — é a
   restrição determinante, e o cache KV precisa caber nessa mesma memória.

> **Importante:** escolha checkpoints **INT4 AWQ** ou **INT4 GPTQ** para este
> kit. Não selecione checkpoints FP8, MXFP8, FP4 ou NVFP4. Não há suporte a
> INT8 GPTQ.

## O que o TensorRT Edge-LLM abrange

O TensorRT Edge-LLM é o runtime oficial da NVIDIA para LLMs e VLMs em
plataformas de borda. A matriz de suporte lista o Jetson Orin como
"Official" para o JetPack 7.2, com engines compilados no dispositivo e
precisões FP16, INT8 e INT4.

- **Cobertura de modelos:** os checkpoints suportados incluem Llama 3.2 1B/3B,
  Llama 3.1 8B, Qwen2.5 (0,5B–14B), Qwen3 (0,6B–8B) e VLMs como
  Qwen2.5-VL 3B/7B e InternVL3/3.5 (1B–14B) — checkpoints densos abaixo de
  30B parâmetros. Não é uma matriz de verificação: "nem todo checkpoint
  listado foi totalmente verificado em todas as plataformas e precisões
  suportadas".
- **A flag para 8 GB:** para builds de engine INT4 no Orin Nano, passe
  `--externalize-weights int4_ffn` (denso) ou `--externalize-weights
  int4_ffn int4_moe` (MoE) para reduzir a memória de compilação do engine.
- **Espaço em disco:** reserve ~20–50 GB por fluxo de trabalho de modelo para
  arquivos ONNX e engines; este kit não tem armazenamento embutido
  ([Início rápido](/pt-br/tutorials/jetson-orin-nano/quick-start)).
- **Dois caminhos de Quick Start:** um caminho C++ (exporte/quantize em um
  host, compile os engines no dispositivo, execute) e um caminho de servidor —
  `tensorrt-edgellm-serve Qwen/Qwen3.5-0.8B` (baixa o checkpoint na primeira
  execução).

> **Dica da Juxi:** as etapas autoritativas são as da NVIDIA — [Quick Start](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html),
> [Installation](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html),
> [Supported Models](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html).
> A página de instalação da 0.10.1 afirma: "os wheels não são publicados nem
> são o caminho de instalação padrão na 0.10.1".

## O que realmente cabe em 8 GB

- **Até 2B parâmetros é o que a NVIDIA mediu neste módulo.** A maior linha de
  Orin Nano (8GB) na página de benchmarks do Edge-LLM é o Qwen3.5-2B com
  4.692 MB: "o 2B é o maior modelo que a NVIDIA mediu no Orin Nano 8 GB".
- **Um walkthrough do fabricante executa um modelo de 4B.** O tutorial do
  Jetson AI Lab relata o Qwen3-4B-Instruct INT4 AWQ (~2 GB de pesos) cabendo
  "dentro da memória unificada de 8 GB do Orin Nano"; o InternVL3 1B/2B também
  cabe com INT4 AWQ, enquanto as variantes maiores têm como alvo o AGX Orin ou
  o Thor. (Conteúdo do fabricante.)
- **Um envelope prático do blog de memória da NVIDIA: LLMs de até ~10B e VLMs
  de até ~4B parâmetros** com quantização de 4 bits e runtimes eficientes —
  para configurações ajustadas.
- **O tamanho do arquivo não é o teste de compatibilidade — o cache KV também
  precisa caber.** Relatos da comunidade mostram modelos GGUF da classe de
  12B/26B (gemma4:12b com 7,4 GB, gemma4:26b com 16 GB) falhando no Ollama na
  placa de 8 GB: `cudaMalloc failed: out of memory ... failed to allocate
  buffer for kv cache`. (Não confirmado.)

## Números oficiais de desempenho para este kit

A NVIDIA publica tabelas de benchmark para o **Jetson Orin Nano (8GB)** —
v0.10.0, JetPack 7.2 / CUDA 13.2 / TensorRT 10.16. Resultados de runtime no
MTBench (LLMs) e no COCO (VLMs), com memória de GPU de pico:

| Modelo | Tipo | Throughput | Memória de GPU de pico |
|---|---|---|---|
| Qwen3-0.6B | LLM | 77,0 tok/s | 1.917 MB |
| Qwen3-1.7B | LLM | 36,5 tok/s | 2.992 MB |
| Qwen3-VL-2B | VLM | 36,1 tok/s | 4.486 MB |
| Qwen3.5-0.8B | LLM | 59,1 tok/s | 2.127 MB |
| Qwen3.5-0.8B | VLM | 59,0 tok/s | 2.760 MB |
| Qwen3.5-2B | LLM | 29,6 tok/s | 3.642 MB |
| Qwen3.5-2B | VLM | 29,6 tok/s | 4.692 MB |

As linhas do Orin usam batch 1 e pesos INT4 externalizados; limites de
compilação: maxInputLen 2048, maxKVCacheCapacity 2200. "O desempenho em
produção pode variar conforme o ajuste em nível de sistema (modo de energia,
configuração de memória, gerenciamento térmico)."

> **Importante:** as tabelas de tokens por segundo publicadas pela NVIDIA para
> o **AGX Orin 64 GB** **não** se aplicam a este kit — outro módulo, outra
> largura de banda de memória, outro envelope de energia. Não estime números
> do Orin Nano a partir do AGX Orin. Não existem números do próprio fabricante
> para os caminhos Ollama ou llama.cpp aqui.

## Outros runtimes neste kit

### Ollama

Status atual, verificado por funcionários da NVIDIA nos fóruns de
desenvolvedores para o JetPack 7.2.1 (setembro de 2026): o instalador padrão
funciona — `curl -fsSL https://ollama.com/install.sh | sh` — e o `ollama ps`
deve reportar `100% GPU`. O aviso "Unsupported JetPack version detected" é
inofensivo.

Builds mais antigos recorriam à CPU porque suas bibliotecas CUDA
pré-compiladas não tinham sm_87, a capacidade de computação do Orin; relatos
da comunidade apontam o Ollama 0.30.11 adicionando "CC 87 for CUDA v13", e
funcionários da NVIDIA confirmaram a correção. Alguns relatos de problemas da
comunidade permanecem (agosto–setembro de 2026) — verifique `ollama ps` na sua
unidade; a compilação a partir do código-fonte com CUDA v13 continua sendo o
recurso de reserva.

### Wheels Python para o JetPack 7.2

Pacotes Python com CUDA (PyTorch e outros) para o JetPack 7.2 / CUDA 13.2 vêm
do índice SBSA do Jetson AI Lab, que funcionários da NVIDIA citam:

```
https://pypi.jetson-ai-lab.io/sbsa/cu130
```

Use-o como o índice do pip (`--index-url https://pypi.jetson-ai-lab.io/sbsa/cu130`).
Ele serve wheels aarch64 como torch 2.11.0, torchvision 0.25.0 e
vllm 0.20.0+cu130. Não existe um índice `jp7/*`; o índice da era JetPack 6 é
`jp6/cu126`. O CUDA 13.2 unifica o Orin no kit de ferramentas Arm SBSA (driver
R595+).

### jetson-containers e Jetson AI Lab (caminho alternativo)

O [jetson-containers](https://github.com/dusty-nv/jetson-containers) oferece
suporte ao JetPack 6.2 (CUDA 12.6) e ao JetPack 7 (CUDA 13.x). Há imagens
`-jetson-orin` pré-compiladas para os principais caminhos de serviço, incluindo
`ghcr.io/nvidia-ai-iot/llama_cpp:latest-jetson-orin` e `ghcr.io/nvidia-ai-iot/vllm:latest-jetson-orin`.

Cuidados para 8 GB do material do fabricante: o exemplo do vLLM usa
`--shm-size=16g` (não é uma recomendação de tamanho para este kit), e a
configuração recomendada move a raiz de dados do Docker para o NVMe e adiciona
um arquivo de swap de 16 GB (desative o ZRAM primeiro).

## Ajuste fino para 8 GB

Quando um modelo não cabe: libere memória da plataforma (o modo headless
recupera até ~865 MB), quantize para 4 bits e dimensione o cache KV e o
contexto com intenção — veja [Eficiência de memória para 8 GB](/pt-br/tutorials/jetson-orin-nano/memory-efficiency).

## Solução de problemas

- **Falta de memória ao carregar** — `cudaMalloc failed: out of memory ...
  failed to allocate buffer for kv cache` significa que o modelo mais o cache
  KV excedem os 8 GB de memória unificada. Use um modelo menor ou mais
  quantizado, ou encurte o contexto; para builds de engine do Edge-LLM,
  adicione `--externalize-weights int4_ffn` e reduza `--maxInputLen` /
  `--maxKVCacheCapacity`.
- **Fallback para CPU no Ollama, ou o aviso "Unsupported JetPack version
  detected"** — atualize o Ollama primeiro (builds antigos não tinham sm_87);
  o aviso é inofensivo no 7.2.1 segundo funcionários da NVIDIA. Confirme com
  `ollama ps` (`100% GPU`).
- **Problemas de versão ou configuração** — veja [Verifique seu sistema](/pt-br/tutorials/jetson-orin-nano/verify-your-system)
  e [Solução de problemas](/pt-br/tutorials/jetson-orin-nano/troubleshooting).

## Fontes

- [TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/): [Support Matrix](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html), [Supported Models](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html), [Installation](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html), [Quick Start](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html), [Performance Benchmarks](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html) (verificado em 2026-09-26)
- [Página de downloads do JetPack 7.2.1](https://developer.nvidia.com/embedded/jetpack/downloads) (verificado em 2026-09-26)
- [Blog da NVIDIA — Maximizing Memory Efficiency to Run Bigger Models on NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (verificado em 2026-09-26)
- [Fóruns de desenvolvedores NVIDIA — Ollama no Jetson (verificado por funcionários no JetPack 7.2.1)](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) (verificado em 2026-09-26)
- [Fóruns de desenvolvedores NVIDIA — Problema de aceleração de GPU no JetPack 7.2 (índice de wheels, sm_87)](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) (verificado em 2026-09-26)
- [Fóruns de desenvolvedores NVIDIA — Modelos de IA que rodam no Jetson Orin Nano Super 8GB (comunidade)](https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412) (verificado em 2026-09-26)
- [Jetson AI Lab — tutorial do TensorRT Edge-LLM](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/) (verificado em 2026-09-26)
- [Jetson AI Lab — texto completo da documentação (tabela de imagens de contêiner)](https://www.jetson-ai-lab.com/llms-full.txt) (verificado em 2026-09-26)
- [jetson-containers (GitHub)](https://github.com/dusty-nv/jetson-containers) (verificado em 2026-09-26)
- [Índice PyPI do Jetson AI Lab — sbsa/cu130](https://pypi.jetson-ai-lab.io/sbsa/cu130) (verificado em 2026-09-26)

*Status: revisado em 2026-10-11. Baseado na documentação
oficial da NVIDIA na data indicada; ainda não verificado em hardware físico
pela Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas registradas da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
