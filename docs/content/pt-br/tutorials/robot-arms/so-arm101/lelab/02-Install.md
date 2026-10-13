---
title: "2 · Instalar e executar"
description: "Instale e execute o LeLab: instalação em uma linha com uv ou a partir do código-fonte — ambas instalam o LeRobot; a interface web abre em localhost:8000."
---

# 2 · Instalar e executar

> **Anterior:** [01 Visão geral](01-Overview.md)
> **Próximo:** [03 Conectar e calibrar](03-Calibration.md)

Os dois métodos também instalam o LeRobot — o LeLab precisa dele.

---

## Método A · Uma linha

Precisa do [uv](https://docs.astral.sh/uv/). Instala em um ambiente isolado:

```bash
uv tool install --with-executables-from huggingface_hub git+https://github.com/Juxi-Technology/leLab.git && lelab
```

O navegador abre em `http://localhost:8000/`.

## Método B · A partir do código-fonte

```bash
git clone https://github.com/Juxi-Technology/leLab.git
cd leLab
pip install -e .
```

`pip install -e .` compila o front end React e o empacota no pacote Python, então um único processo serve tanto a API quanto a interface. A primeira instalação leva alguns minutos.

Se a compilação não encontrar o Node.js, instale o **Node.js 22** e tente de novo. O Node é necessário no momento da instalação e no modo de desenvolvimento apenas — não para **executar** o LeLab depois.

> **Prefere o código oficial?** Este repositório é uma cópia. O original, mantido pela equipe do LeRobot na Hugging Face, é <https://github.com/huggingface/leLab>. Tudo nestas páginas se aplica a ele sem alterações.

---

## Iniciando

```bash
lelab
```

Serve a interface em **<http://localhost:8000/>** e abre o navegador.

| Opção | O que faz |
|---|---|
| `lelab` | Modo de produção. Um processo serve a API e a interface compilada em `:8000` |
| `lelab --dev` | Hot-reload do Vite em `:8080` mais uvicorn `--reload` em `:8000`. Precisa do Node.js 22 |
| `lelab --rebuild` | Recompila o front end a partir dos fontes locais e inicia em modo de produção |
| `lelab --no-open` | Inicia sem abrir o navegador |
| `lelab --stop` | Para um LeLab em execução e libera as portas 8000 e 8080 |

Pare com `Ctrl+C`, ou de outro terminal:

```bash
lelab --stop
```

Use `--stop` quando a página parar de carregar: um processo antigo ocupando a porta 8000 ou 8080 é a causa usual.

---

## Confirme que funcionou

Abra <http://localhost:8000/>. A página inicial tem abas para **Calibration**, **Teleoperation**, **Recording**, **Datasets**, **Training** e **Inference**.

No terminal:

```bash
curl http://localhost:8000/health
```

Retorna um status JSON.

---

## Modo de desenvolvimento

```bash
lelab --dev
```

Vite em `:8080`, a API com recarga automática em `:8000`. Edições em `frontend/src/` atualizam a página sem reiniciar; edições em `lelab/` recarregam o servidor.

**No modo `--dev` navegue em `:8080`, não em `:8000`.** A porta 8000 oferece a API sem interface.

---

## Atualização

O LeLab verifica se o branch a partir do qual foi instalado mudou e oferece uma atualização na interface. Para atualizar manualmente:

```bash
uv tool install --with-executables-from huggingface_hub git+https://github.com/Juxi-Technology/leLab.git --force
```

Instalações editáveis (`pip install -e .`) ficam de fora da verificação. Atualize-as com `git pull`.

---

> **Próximo:** [03 Conectar e calibrar](03-Calibration.md)

<RelatedProducts slugs="so-arm101" />
