---
title: IA agêntica — NemoClaw no Orin Nano de 8 GB
sidebar_label: IA agêntica (NemoClaw)
slug: /tutorials/agentic-ai
description: >-
  Instale e execute o NVIDIA NemoClaw, a stack de agentes sempre ativos, no
  kit de desenvolvedor Jetson Orin Nano Super de 8 GB — instalação oficial,
  expectativas honestas para 8 GB e notas de segurança.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://www.nvidia.com/en-us/ai/nemoclaw
    checked: 2026-09-26
  - source: https://www.nvidia.com/en-us/ai/build-a-claw/
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/nemoclaw/
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/getting_started/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
review_owner: cheny
---

# IA agêntica — NemoClaw no Orin Nano de 8 GB

O seu kit pode executar o NVIDIA NemoClaw, um agente autónomo sempre ativo,
instalado com um único comando. Esta página aborda o que é o NemoClaw, a
instalação oficial, as competências de agente que o rodeiam, expectativas
honestas para 8 GB e as decisões de segurança que exige.

## O que é o NemoClaw

A NVIDIA descreve o NemoClaw como «uma coleção de blueprints abertos para
construir agentes autónomos» — sistemas de IA sempre ativos que raciocinam,
planeiam e agem em fluxos de trabalho do mundo real. Agrega harnesses de
agentes (OpenClaw, Hermes, LangChain Deep Agents) com componentes do NVIDIA
Agent Toolkit: modelos Nemotron, NeMo e controlos de política em tempo de
execução do OpenShell.

O OpenShell é a camada de segurança: «o runtime seguro no seu interior que
impõe aquilo a que o agente pode aceder: ficheiros, redes, credenciais e
ferramentas.»

O NemoClaw é software alfa — a NVIDIA rotula-o como "Early preview" (desde
2026-03-16). Página do produto: <https://www.nvidia.com/en-us/ai/nemoclaw> ·
centro Build-a-Claw: <https://www.nvidia.com/en-us/ai/build-a-claw/>

## Instalação — o único comando oficial

No kit, execute o instalador da NVIDIA:

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash
```

Isto instala o harness predefinido, o **OpenClaw**. Outros dois podem ser
selecionados com uma variável de ambiente:

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | NEMOCLAW_AGENT=hermes bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | NEMOCLAW_AGENT=langchain-deepagents-code bash
```

Neste kit, o instalador deteta automaticamente o Jetson (Orin e Thor) e aplica
primeiro a configuração de host do JetPack; no L4T 39.x, carrega o módulo
`br_netfilter` apenas quando este falta (sem ele, o sandbox falha a resolução
de DNS e a integração inicial fica presa em "Setting up OpenClaw inside
sandbox"). Se selecionar o Ollama, o instalador também o instala: «O script
também instala o ollama (se o ollama for selecionado), pelo que não precisa de
o instalar manualmente primeiro» (funcionários da NVIDIA). O site da NVIDIA
documenta este dispositivo: «Instale o OpenClaw no seu NVIDIA Jetson Orin
Nano» — «um assistente pessoal de IA totalmente local no Jetson … sem
necessidade de APIs de nuvem».

> **Importante** — a matriz de suporte de plataformas do NemoClaw (v1.1,
> 2026-09-04) não tem linha Jetson; as suas plataformas testadas são Linux
> (Ubuntu 24.04) e DGX OS Spark. O suporte do Orin Nano é real na prática — o
> instalador deteta a placa e a NVIDIA documenta o fluxo — mas não está
> publicado como formalmente suportado, pelo que deve esperar arestas por
> limar.

Requisitos que aqui importam (da página de pré-requisitos do NemoClaw da
NVIDIA):

| Requisito | Mínimo / recomendado | Neste kit |
|---|---|---|
| RAM | 8 GB / 16 GB | 8 GB no total — no mínimo absoluto |
| Disco livre | 20 GB | Sem armazenamento integrado; utilize microSD ou NVMe ([Início rápido](/pt-pt/tutorials/jetson-orin-nano/quick-start)) |
| Node.js / npm | 22.19+ / 10+ | Instale separadamente |
| Runtime de contentores | Docker Engine / Desktop / Colima | Correção do socket: `sudo usermod -aG docker $USER`, depois `newgrp docker` |

## Após a instalação — primeira sessão

Os funcionários da NVIDIA apontam para o [tutorial do Jetson AI
Lab](https://www.jetson-ai-lab.com/tutorials/nemoclaw/) (guia do fornecedor)
para o fluxo do Orin:

1. `curl -fsSL https://ollama.com/install.sh | sh` — ou ignore este passo; o
   instalador do NemoClaw também pode instalar o Ollama.
2. Obtenha um modelo da classe 4B com chamada de ferramentas, como o
   Nemotron3 Nano 4B (o exemplo `nemotron-3-nano:30b` do guia destina-se a
   dispositivos maiores).
3. `curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash`
4. Integração inicial: selecione o Ollama como fonte de modelo e escolha o
   nível de política de sandbox mais restrito que funcione.
5. `source ~/.bashrc` e depois `nemoclaw my-assistant connect`; inicie o
   agente com `openclaw tui`.

## Competências de agente

A NVIDIA também disponibiliza **competências de agente** — fluxos de trabalho
empacotados no formato aberto Agent Skills que estendem assistentes de
programação com IA (Claude Code, Cursor, Codex) com automatização específica
do dispositivo. Estão documentados dois domínios para esta era:

- **Physical AI (robótica).** O Isaac ROS inclui um catálogo de competências
  de agente — segundo a NVIDIA, tarefas como ativar o contentor de
  desenvolvimento do Isaac ROS e colocar em funcionamento a stack de nuvem
  Mission Control. O catálogo está em <https://github.com/nvidia/skills> (a
  categoria "Physical AI"), instalado com `npx` (o Node.js não faz parte do
  ambiente padrão do Isaac ROS). O Isaac ROS 5.0 acrescenta uma CLI
  `isaac-ros-activate` e uma competência de acesso antecipado
  `migrate-node-to-rosidl-buffer`. Consulte
  [Robótica](/pt-pt/tutorials/jetson-orin-nano/robotics).
- **Pipelines de vídeo.** As notas de versão do L4T r39.2.1 listam "Agent
  skills for video pipelines" entre os itens das novidades.

Uma lacuna honesta: as fontes desta página documentam competências de agente
da NVIDIA para o Isaac ROS (Physical AI) e para pipelines de vídeo; nenhuma
documenta um catálogo de competências específico do NemoClaw.

## Expectativas realistas para 8 GB

Um agente sempre ativo, um modelo local e o ambiente de trabalho Ubuntu não
cabem todos confortavelmente neste kit ao mesmo tempo. O orçamento documentado:

- **A memória utilizável é ~7.6 GB, não 8 GB.** NVIDIA: «dos 8 GB de DRAM
  física, cerca de 7.6 GB são utilizáveis após as reservas do firmware e do
  kernel.»
- **8 GB é o mínimo do NemoClaw, não uma zona de conforto.** Os pré-requisitos
  indicam 8 GB como mínimo e 16 GB como recomendado: «Em máquinas com menos de
  8 GB de RAM, esta utilização combinada pode acionar o OOM killer. Se não
  puder adicionar memória, configure pelo menos 8 GB de swap para contornar o
  problema, à custa de um desempenho mais lento.» A memória deste kit é fixa —
  planeie o ficheiro de swap ([Eficiência de
  memória](/pt-pt/tutorials/jetson-orin-nano/memory-efficiency)). O envio da
  imagem de sandbox de ~2.4 GB já acionou o OOM num Orin Nano de 8 GB.
- **O agente e o ambiente de trabalho ocupam memória antes de o modelo
  carregar.** Um guia da comunidade nos fóruns da NVIDIA estima o runtime do
  OpenClaw em até ~1 GB; desativar o ambiente de trabalho gráfico liberta até
  ~865 MB (número da NVIDIA), e uma medição da comunidade coloca o GNOME em
  mais de 600 MB.
- **A falha com modelos demasiado grandes está documentada num relato da
  comunidade nos fóruns da NVIDIA.** O Ollama numa placa de 8 GB não conseguiu
  carregar um modelo de 7.4 GB nem um de 16 GB: `cudaMalloc failed: out of
  memory ... failed to allocate buffer for kv cache`. O tamanho do ficheiro,
  por si só, não é o teste de compatibilidade — a KV cache tem de caber nos
  mesmos 8 GB.

O que cabe, segundo as fontes: as predefinições validadas do Ollama pela
NVIDIA (`qwen3.6:35b`, `nemotron-3-nano:30b`, `qwen3.5:9b`) são dimensionadas
para máquinas maiores; o guia do Jetson AI Lab diz para começar com um modelo
da classe 4B com chamada de ferramentas — «Pode funcionar, mas conte com um
desempenho mais fraco do que os modelos da classe 30B»; e o blogue de memória
da NVIDIA situa o envelope otimizado de 4 bits em LLMs até ~10B e VLMs até ~4B
parâmetros — um teto para uma configuração dedicada, não um orçamento que
também acomode um ambiente de trabalho e um agente.

A NVIDIA não publica números de tokens por segundo para o Ollama neste
dispositivo; trate com cuidado as alegações de velocidade externas (consulte
[Inferência local de LLM](/pt-pt/tutorials/jetson-orin-nano/local-llm)).

> **Nota da Juxi:** para uma configuração sempre ativa viável neste kit,
> planeie o modo sem monitor, um modelo quantizado da classe 4B e
> armazenamento NVMe para o requisito de 20 GB e o ficheiro de swap. Isto
> corresponde ao que as fontes suportam; qualquer coisa maior não está
> verificada.

## Notas sobre o Ollama e os agentes — confirmadas por funcionários da NVIDIA

Os funcionários da NVIDIA depuraram o fluxo Orin Nano + JetPack 7.2 + Ollama
nos seus fóruns de desenvolvedores e voltaram a verificar o Ollama no JetPack
7.2.1 em setembro de 2026.

- **Verifique primeiro a GPU.** O `ollama ps` deve mostrar `100% GPU` na coluna
  PROCESSOR; se mostrar CPU, o agente será muito lento.
- **Falha documentada (junho de 2026).** Com o NemoClaw + Ollama num Orin Nano
  recém-gravado com JetPack 7.2, o `openclaw tui` abria mas nunca respondia
  ("Autocompaction could not recover this turn"). A NVIDIA reproduziu-o: o
  Ollama tinha ignorado a descoberta da GPU (recurso à CPU) e a janela de
  contexto do sandbox era de apenas 4096 tokens. A correção dos funcionários
  escreveu estas linhas em
  `/etc/systemd/system/ollama.service.d/override.conf`:

  ```ini
  Environment="OLLAMA_HOST=127.0.0.1:11434"
  Environment="OLLAMA_CONTEXT_LENGTH=32768"
  Environment="OLLAMA_IGPU_ENABLE=1"
  Environment="GGML_BACKEND_PATH=/usr/local/lib/ollama/cuda_v13/libggml-cuda.so"
  Environment="LD_LIBRARY_PATH=/usr/local/lib/ollama:/usr/local/lib/ollama/cuda_v13"
  ```

  depois `sudo systemctl daemon-reload && sudo systemctl restart ollama`;
  dentro do sandbox (`nemoclaw my-assistant connect`), o `contextWindow` foi
  aumentado para 32768 em `.openclaw/openclaw.json` e o hash da configuração
  atualizado. O autor do relato confirmou que o Ollama passou então a ser
  executado na GPU.
- **Estado atual: esta solução alternativa já não deve ser necessária.**
  Funcionários, meados de 2026: «o problema está corrigido na versão mais
  recente do ollama. A solução alternativa (override.conf) já não é
  necessária.» No JetPack 7.2.1, o instalador do upstream funciona e o
  `ollama ps` indica 100% GPU; a linha "WARNING: Unsupported JetPack version
  detected" é inofensiva. Teste primeiro a instalação de origem.
- **Se o Ollama continuar a recorrer à CPU:** atualize primeiro o Ollama. Um
  utilizador do fórum resolveu um recurso persistente à CPU eliminando o
  diretório obsoleto `/usr/local/lib/ollama/cuda_v12` (remoção confirmada por
  funcionários). Mantenha o override.conf como último recurso — foi o que a
  NVIDIA utilizou com êxito neste kit exato.

## Segurança para agentes sempre ativos

Um agente sempre ativo é um programa com credenciais e acesso a ferramentas
que continua a trabalhar enquanto não está a vigiar. Num dispositivo que
guarda os seus dados, isso é um risco real: um agente com acesso a ferramentas
e à shell pode aqui ler, alterar ou enviar tudo o que conseguir alcançar.

**Utilize a camada de políticas.** A NVIDIA descreve o OpenShell como «o
runtime seguro no seu interior que impõe aquilo a que o agente pode aceder:
ficheiros, redes, credenciais e ferramentas». Durante a integração inicial,
escolha o nível de política de sandbox mais restrito que ainda faça o trabalho
(o tutorial do Jetson AI Lab aconselha o nível mais restrito).

**Credenciais.** Dê ao agente credenciais com âmbito limitado e revogáveis —
chaves e contas dedicadas, nunca as suas pessoais. Tudo o que o agente pode
ler, pode copiar; tudo o que pode utilizar, pode ser induzido a utilizar. As
integrações de mensagens atuam com a sua identidade: a página do Orin Nano da
NVIDIA mostra um exemplo de OpenClaw + WhatsApp, pelo que deve usar uma conta
ou um número dedicados.

**Exposição de rede.** Mantenha os serviços locais em localhost — a
configuração dos funcionários da NVIDIA para o Ollama aqui vincula-o a
`127.0.0.1` (`OLLAMA_HOST=127.0.0.1:11434`). Não exponha painéis de agentes,
APIs de controlo ou servidores de modelos à internet aberta; para acesso
remoto, utilize um túnel ou VPN que controle. A instalação requer o Docker
(Engine/Desktop/Colima, segundo os requisitos acima), além de um cluster de
contentores em sandbox (o gateway do OpenShell executa k3s internamente) e
acesso sudo.

**Hábitos de operação.** Comece com supervisão — observe o que o agente faz
antes de o deixar sem vigilância. Não lhe dê acesso que não possa revogar ou
anular, e mantenha cópias de segurança e um caminho de recuperação (consulte
[Gravação e
atualizações](/pt-pt/tutorials/jetson-orin-nano/flashing-and-updates)). O
NemoClaw é software alfa ("Early preview"); encare o sandbox como uma camada
entre várias, não como a única.

> **Atenção** — como esta stack é executada localmente («sem necessidade de
> APIs de nuvem»), a fronteira de segurança é o seu dispositivo, a sua rede e
> as suas credenciais. Reveja as três antes de deixar um agente em execução.

## Fontes

- [Página do produto NVIDIA NemoClaw](https://www.nvidia.com/en-us/ai/nemoclaw) (verificado em 2026-09-26) — definição, harnesses, comandos de instalação, OpenShell.
- [Centro de recursos NVIDIA Build-a-Claw](https://www.nvidia.com/en-us/ai/build-a-claw/) (verificado em 2026-09-26) — secção de instalação no Orin Nano.
- [NemoClaw — Pré-requisitos](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md) e [Suporte de plataformas](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md) (verificado em 2026-09-26)
- [NemoClaw — Resolução de problemas (configuração do host Jetson)](https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx) (verificado em 2026-09-26)
- [Fóruns de Desenvolvedores NVIDIA — NemoClaw on Jetson Orin Super with JetPack 7.2 (correção de funcionários da NVIDIA)](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269) (verificado em 2026-09-26)
- [Fóruns de Desenvolvedores NVIDIA — Ollama on Jetson (verificado por funcionários)](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) e [aceleração por GPU no JetPack 7.2](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) (verificado em 2026-09-26)
- [Blogue técnico da NVIDIA — Maximizing memory efficiency on NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (verificado em 2026-09-26)
- [Fóruns de Desenvolvedores NVIDIA — AI models that run on Orin Nano Super 8GB (guia da comunidade)](https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412) (verificado em 2026-09-26)
- [Jetson AI Lab — tutorial do NemoClaw (guia do fornecedor)](https://www.jetson-ai-lab.com/tutorials/nemoclaw/) (verificado em 2026-09-26)
- [Isaac ROS — Introdução](https://nvidia-isaac-ros.github.io/getting_started/index.html) e [Notas de versão](https://nvidia-isaac-ros.github.io/releases/index.html) (verificado em 2026-09-26)
- [Notas de versão do Jetson Linux r39.2.1 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (verificado em 2026-09-26) — o item das novidades "Agent skills for video pipelines".

*Estado: revisado em 2026-10-11. Baseado na documentação
oficial da NVIDIA, em publicações dos fóruns de desenvolvedores da NVIDIA e no
guia do fornecedor Jetson AI Lab, nas datas indicadas; ainda não verificado em
hardware físico pela Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas comerciais da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
