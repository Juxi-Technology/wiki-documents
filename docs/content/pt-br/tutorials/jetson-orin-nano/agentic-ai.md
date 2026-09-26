---
title: IA agêntica — NemoClaw no Orin Nano de 8 GB
sidebar_label: IA agêntica (NemoClaw)
slug: /tutorials/agentic-ai
description: >-
  Instale e execute o NVIDIA NemoClaw, a stack de agentes sempre ativos, no
  Kit de Desenvolvedor Jetson Orin Nano Super de 8 GB — instalação oficial,
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

Seu kit pode executar o NVIDIA NemoClaw, um agente autônomo sempre ativo,
instalado com um único comando. Esta página cobre o que é o NemoClaw, a
instalação oficial, as habilidades de agente ao redor dele, expectativas
honestas para 8 GB e as decisões de segurança que ele exige.

## O que é o NemoClaw

A NVIDIA descreve o NemoClaw como "uma coleção de blueprints abertos para
construir agentes autônomos" — sistemas de IA sempre ativos que raciocinam,
planejam e agem em fluxos de trabalho do mundo real. Ele empacota harnesses de
agentes (OpenClaw, Hermes, LangChain Deep Agents) com componentes do NVIDIA
Agent Toolkit: modelos Nemotron, NeMo e os controles de política em tempo de
execução do OpenShell.

O OpenShell é a camada de segurança: "o runtime seguro dentro dele que impõe o
que o agente pode acessar: arquivos, redes, credenciais e ferramentas."

O NemoClaw é software alpha — a NVIDIA o rotula "Early preview" (desde
2026-03-16). Página do produto: <https://www.nvidia.com/en-us/ai/nemoclaw> ·
Hub Build-a-Claw: <https://www.nvidia.com/en-us/ai/build-a-claw/>

## Instalação — o comando único oficial

No kit, execute o instalador da NVIDIA:

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash
```

Isso instala o harness padrão, **OpenClaw**. Outros dois podem ser
selecionados com uma variável de ambiente:

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | NEMOCLAW_AGENT=hermes bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | NEMOCLAW_AGENT=langchain-deepagents-code bash
```

Neste kit, o instalador detecta automaticamente o Jetson (Orin e Thor) e
aplica primeiro a configuração de host do JetPack; no L4T 39.x ele carrega o
módulo `br_netfilter` somente quando ele está ausente (sem ele, o sandbox
falha na resolução DNS e o onboarding trava em "Setting up OpenClaw inside
sandbox"). Se você selecionar o Ollama, o instalador também o instala: "O
script também instala o ollama (se o ollama for selecionado), então você não
precisa instalá-lo manualmente antes" (funcionários da NVIDIA). O site da
NVIDIA documenta este dispositivo: "Instale o OpenClaw no seu NVIDIA Jetson
Orin Nano" — "um assistente pessoal de IA totalmente local no Jetson … sem
necessidade de APIs de nuvem."

> **Importante** — a matriz de suporte de plataformas do NemoClaw (v1.1,
> 2026-09-04) não tem linha do Jetson; suas plataformas testadas são Linux
> (Ubuntu 24.04) e DGX OS Spark. O suporte ao Orin Nano é real na prática — o
> instalador detecta a placa e a NVIDIA documenta o fluxo — mas não é
> publicado como suporte formal, então conte com imperfeições.

Requisitos que importam aqui (da página de pré-requisitos do NemoClaw da
NVIDIA):

| Requisito | Mín. / recomendado | Neste kit |
|---|---|---|
| RAM | 8 GB / 16 GB | 8 GB no total — no limite mínimo |
| Disco livre | 20 GB | Sem armazenamento embutido; use microSD ou NVMe ([Início rápido](/pt-br/tutorials/jetson-orin-nano/quick-start)) |
| Node.js / npm | 22.19+ / 10+ | Instale separadamente |
| Runtime de contêiner | Docker Engine / Desktop / Colima | Correção de socket: `sudo usermod -aG docker $USER`, depois `newgrp docker` |

## Após a instalação — primeira sessão

Funcionários da NVIDIA indicam o
[walkthrough do Jetson AI Lab](https://www.jetson-ai-lab.com/tutorials/nemoclaw/)
(guia do fabricante) para o fluxo do Orin:

1. `curl -fsSL https://ollama.com/install.sh | sh` — ou pule esta etapa; o
   instalador do NemoClaw também pode instalar o Ollama.
2. Baixe um modelo da classe de 4B com uso de ferramentas (tool-calling), como
   o Nemotron3 Nano 4B (o exemplo `nemotron-3-nano:30b` do guia tem como alvo
   dispositivos maiores).
3. `curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash`
4. Faça o onboarding: selecione o Ollama como fonte de modelo e escolha o
   nível mais restrito de política de sandbox que funcione.
5. `source ~/.bashrc`, depois `nemoclaw my-assistant connect`; inicie o agente
   com `openclaw tui`.

## Habilidades de agente

A NVIDIA também distribui **habilidades de agente** (agent skills) — fluxos de
trabalho empacotados no formato aberto Agent Skills que estendem assistentes de
código de IA (Claude Code, Cursor, Codex) com automação específica do
dispositivo. Dois domínios estão documentados para esta era:

- **IA física (robótica).** O Isaac ROS distribui um catálogo de habilidades de
  agente — segundo a NVIDIA, tarefas como ativar o contêiner de desenvolvimento
  do Isaac ROS e subir a stack de nuvem Mission Control. O catálogo está em
  <https://github.com/nvidia/skills> (a categoria "Physical AI"), instalado com
  `npx` (o Node.js não faz parte do ambiente padrão do Isaac ROS). O Isaac ROS
  5.0 adiciona uma CLI `isaac-ros-activate` e uma habilidade de acesso
  antecipado `migrate-node-to-rosidl-buffer`. Veja
  [Robótica](/pt-br/tutorials/jetson-orin-nano/robotics).
- **Pipelines de vídeo.** As notas de versão do L4T r39.2.1 listam
  "Habilidades de agente para pipelines de vídeo" entre os itens do What's New.

Uma lacuna honesta: as fontes desta página documentam habilidades de agente da
NVIDIA para o Isaac ROS (IA física) e para pipelines de vídeo; nenhuma
documenta um catálogo de habilidades específico do NemoClaw.

## Expectativas realistas para 8 GB

Um agente sempre ativo, um modelo local e o desktop do Ubuntu não cabem
confortavelmente neste kit ao mesmo tempo. O orçamento documentado:

- **A memória utilizável é de ~7,6 GB, não 8 GB.** NVIDIA: "dos 8 GB de DRAM
  física, cerca de 7,6 GB são utilizáveis após as reservas de firmware e
  kernel."
- **8 GB é o piso do NemoClaw, não uma zona de conforto.** Os pré-requisitos
  listam 8 GB como mínimo e 16 GB como recomendado: "Em máquinas com menos de
  8 GB de RAM, esse uso combinado pode acionar o OOM killer. Se você não puder
  adicionar memória, configure pelo menos 8 GB de swap para contornar o
  problema, ao custo de desempenho mais lento." A memória deste kit é fixa —
  planeje o arquivo de swap
  ([Eficiência de memória](/pt-br/tutorials/jetson-orin-nano/memory-efficiency)). O push da imagem de
  sandbox de ~2,4 GB já acionou OOM em um Orin Nano de 8 GB.
- **O agente e o desktop consomem memória antes de o modelo carregar.** Um
  guia da comunidade nos fóruns da NVIDIA estima o runtime do OpenClaw em até
  ~1 GB; desativar o desktop gráfico libera até ~865 MB (número da NVIDIA), e
  uma medição da comunidade coloca o GNOME em mais de 600 MB.
- **A falha por modelo grande demais está documentada em um relato da
  comunidade nos fóruns da NVIDIA.** O Ollama em uma placa de 8 GB falhou ao
  carregar um modelo de 7,4 GB e um de 16 GB: `cudaMalloc failed: out of
  memory ... failed to allocate buffer for kv cache`. O tamanho do arquivo
  sozinho não é o teste de compatibilidade — o cache KV precisa caber nos
  mesmos 8 GB.

O que cabe, segundo as fontes: os padrões validados do Ollama pela NVIDIA
(`qwen3.6:35b`, `nemotron-3-nano:30b`, `qwen3.5:9b`) são dimensionados para
máquinas maiores; o guia do Jetson AI Lab diz para começar com um modelo da
classe de 4B com uso de ferramentas — "Pode funcionar, mas espere desempenho
mais fraco que os modelos da classe de 30B"; e o blog de memória da NVIDIA
coloca o envelope ajustado de 4 bits em LLMs de até ~10B e VLMs de até ~4B
parâmetros — um teto para uma configuração dedicada, não um orçamento que
também sustenta um desktop e um agente.

A NVIDIA não publica números de tokens por segundo para o Ollama neste
dispositivo; trate com cuidado alegações externas de velocidade (veja
[Inferência de LLM local](/pt-br/tutorials/jetson-orin-nano/local-llm)).

> **Nota da Juxi:** para uma configuração sempre ativa viável aqui, planeje o
> modo headless, um modelo quantizado da classe de 4B e armazenamento NVMe
> para o requisito de 20 GB e o arquivo de swap. Isso corresponde ao que as
> fontes sustentam; qualquer coisa maior não é verificada.

## Ollama e notas de agentes — confirmadas por funcionários da NVIDIA

Funcionários da NVIDIA depuraram o fluxo Orin Nano + JetPack 7.2 + Ollama nos seus
fóruns de desenvolvedores, e reverificou o Ollama no JetPack 7.2.1 em setembro
de 2026.

- **Verifique a GPU primeiro.** O `ollama ps` deve mostrar `100% GPU` na coluna
  PROCESSOR; se mostrar CPU, o agente será muito lento.
- **Falha documentada (junho de 2026).** Com NemoClaw + Ollama em um Orin Nano
  recém-gravado com JetPack 7.2, o `openclaw tui` abria mas nunca respondia
  ("Autocompaction could not recover this turn"). A NVIDIA reproduziu: o
  Ollama tinha pulado a descoberta de GPU (fallback para CPU), e a janela de
  contexto do sandbox era de apenas 4096 tokens. A correção dos funcionários gravou
  estas linhas em `/etc/systemd/system/ollama.service.d/override.conf`:

  ```ini
  Environment="OLLAMA_HOST=127.0.0.1:11434"
  Environment="OLLAMA_CONTEXT_LENGTH=32768"
  Environment="OLLAMA_IGPU_ENABLE=1"
  Environment="GGML_BACKEND_PATH=/usr/local/lib/ollama/cuda_v13/libggml-cuda.so"
  Environment="LD_LIBRARY_PATH=/usr/local/lib/ollama:/usr/local/lib/ollama/cuda_v13"
  ```

  depois `sudo systemctl daemon-reload && sudo systemctl restart ollama`;
  dentro do sandbox (`nemoclaw my-assistant connect`), o `contextWindow` foi
  elevado para 32768 no `.openclaw/openclaw.json` e o hash da configuração foi
  atualizado. O relator confirmou que o Ollama então rodou na GPU.
- **Status atual: esta solução alternativa não deve ser necessária.** Funcionários
  da NVIDIA, meados de 2026: "o problema está corrigido na versão mais recente
  do ollama. A solução alternativa (override.conf) não é mais necessária." No
  JetPack 7.2.1 o instalador do upstream funciona e o `ollama ps` reporta
  100% GPU; a linha "WARNING: Unsupported JetPack version detected" é
  inofensiva. Teste primeiro a instalação padrão.
- **Se o Ollama ainda recorrer à CPU:** atualize o Ollama primeiro. Um usuário
  do fórum resolveu um fallback persistente excluindo o diretório obsoleto
  `/usr/local/lib/ollama/cuda_v12` (remoção confirmada pelos funcionários). Mantenha o
  override.conf como recurso de última instância — foi o que a NVIDIA usou com
  sucesso neste kit exato.

## Segurança para agentes sempre ativos

Um agente sempre ativo é um programa com credenciais e acesso a ferramentas
que continua trabalhando enquanto você não está olhando. Em um dispositivo que
guarda seus dados, isso é um risco real: um agente com acesso a ferramentas e
shell aqui pode ler, alterar ou enviar qualquer coisa que consiga alcançar.

**Use a camada de política.** A NVIDIA descreve o OpenShell como "o runtime
seguro dentro dele que impõe o que o agente pode acessar: arquivos, redes,
credenciais e ferramentas." Durante o onboarding, escolha o nível mais restrito
de política de sandbox que ainda dê conta do trabalho (o walkthrough do Jetson
AI Lab aconselha o nível mais restrito).

**Credenciais.** Dê ao agente credenciais com escopo limitado e revogáveis —
chaves e contas dedicadas, nunca as suas pessoais. Tudo o que o agente pode
ler, ele pode copiar; tudo o que ele pode usar, ele pode ser induzido a usar.
Integrações de mensagens agem com a sua identidade: a página do Orin Nano da
NVIDIA mostra um exemplo de OpenClaw + WhatsApp, então use uma conta ou número
dedicado.

**Exposição de rede.** Mantenha serviços locais no localhost — a configuração
dos funcionários da NVIDIA para o Ollama aqui o vincula a `127.0.0.1`
(`OLLAMA_HOST=127.0.0.1:11434`). Não exponha dashboards de agentes, APIs de
controle ou servidores de modelo à internet aberta; para acesso remoto, use um
túnel ou VPN que você controla. A instalação precisa do Docker
(Engine/Desktop/Colima, conforme os requisitos acima) mais um cluster de
contêineres em sandbox (o gateway do OpenShell roda k3s internamente) e acesso
sudo.

**Hábitos de operação.** Comece supervisionado — observe o que o agente faz
antes de deixá-lo sem vigilância. Não lhe dê acesso que você não possa revogar
ou desfazer, e mantenha backups e um caminho de recuperação (veja
[Gravação e atualizações](/pt-br/tutorials/jetson-orin-nano/flashing-and-updates)). O NemoClaw é software
alpha ("Early preview"); trate o sandbox como uma camada entre várias, não
como a única.

> **Atenção** — como esta stack roda localmente ("sem necessidade de APIs de
> nuvem"), a fronteira de segurança é o seu dispositivo, a sua rede e as suas
> credenciais. Revise as três antes de deixar um agente em execução.

## Fontes

- [Página do produto NVIDIA NemoClaw](https://www.nvidia.com/en-us/ai/nemoclaw) (verificado em 2026-09-26) — definição, harnesses, comandos de instalação, OpenShell.
- [Hub de recursos Build-a-Claw da NVIDIA](https://www.nvidia.com/en-us/ai/build-a-claw/) (verificado em 2026-09-26) — seção de instalação no Orin Nano.
- [NemoClaw — pré-requisitos](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md) e [suporte de plataformas](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md) (verificado em 2026-09-26)
- [NemoClaw — solução de problemas (configuração de host do Jetson)](https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx) (verificado em 2026-09-26)
- [Fóruns de desenvolvedores NVIDIA — NemoClaw no Jetson Orin Super com JetPack 7.2 (correção dos funcionários da NVIDIA)](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269) (verificado em 2026-09-26)
- [Fóruns de desenvolvedores NVIDIA — Ollama no Jetson (verificado por funcionários)](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) e [aceleração de GPU no JetPack 7.2](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) (verificado em 2026-09-26)
- [Blog técnico da NVIDIA — Maximizing memory efficiency on NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (verificado em 2026-09-26)
- [Fóruns de desenvolvedores NVIDIA — Modelos de IA que rodam no Orin Nano Super 8GB (guia da comunidade)](https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412) (verificado em 2026-09-26)
- [Jetson AI Lab — tutorial do NemoClaw (guia do fabricante)](https://www.jetson-ai-lab.com/tutorials/nemoclaw/) (verificado em 2026-09-26)
- [Isaac ROS — Getting Started](https://nvidia-isaac-ros.github.io/getting_started/index.html) e [notas de versão](https://nvidia-isaac-ros.github.io/releases/index.html) (verificado em 2026-09-26)
- [Notas de versão do Jetson Linux r39.2.1 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (verificado em 2026-09-26) — o item "Habilidades de agente para pipelines de vídeo" do What's New.

*Status: rascunho, pendente de revisão por cheny. Baseado na documentação
oficial da NVIDIA, em posts dos fóruns de desenvolvedores da NVIDIA e no guia
do fabricante do Jetson AI Lab, nas datas indicadas; ainda não verificado em
hardware físico pela Juxi Technology.*

---

NVIDIA® e Jetson™ são marcas registradas da NVIDIA Corporation. Esta página é
publicada pela Juxi Technology e não é uma publicação da NVIDIA.
