---
title: 02 · Preparação do ambiente
---

# 02 · Preparação do ambiente

> **Anterior:** [01-Overview](01-Overview.md)
> **Próximo:** [03-Deployment](03-Deployment.md)

Instale o Docker, configure a rede para a China continental e conecte o hardware. **Se você não concluir esta página, a próxima não vai rodar.**

---

## 1. Instalar o Docker

Se já instalou, pode pular; primeiro confirme:

```bash
docker --version
```

Se ainda não instalou:

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
```

**Depois de executar o último comando, é preciso fazer login novamente**
(encerrar a sessão e entrar de novo, ou reiniciar), caso contrário o comando
`docker` dará um erro de permissão. Para verificar:

```bash
docker run --rm hello-world
```

---

## 2. Configurar aceleradores de imagem na China continental ⚠️ Obrigatório para usuários na China continental

**O acesso direto ao Docker Hub a partir da China continental dá timeout**; sem configurar um acelerador, não é possível baixar nenhuma imagem.

Edite o `/etc/docker/daemon.json` (crie o arquivo se ele não existir):

```json
{
    "registry-mirrors": [
        "https://docker.m.daocloud.io",
        "https://docker.1ms.run",
        "https://docker.xuanyuan.me"
    ]
}
```

Reinicie o Docker:

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

Verifique se funcionou:

```bash
docker info | grep -A4 "Registry Mirrors"
```

> ⚠️ Muitos endereços de espelho que circulam por aí já não funcionam (USTC,
> NetEase e `dockerproxy.com` saíram do ar), então não copie artigos antigos.
> Os três acima foram testados em setembro de 2026 e estavam funcionando.

---

## 3. Preparar o hardware

### 3.1 Conexão do robô

1. Conecte os servos do braço robótico SO-101 ao computador por meio de uma placa adaptadora USB
2. Conecte a câmera ao USB (no caso da RealSense, use uma porta USB 3.0)

### 3.2 Permissão da porta serial ⚠️ Importante

Se não configurar isto, **o contêiner não verá o dispositivo**:

```bash
sudo usermod -aG dialout $USER
```

**Isso também exige fazer login novamente para ter efeito.**

### 3.3 Confirme que o dispositivo foi reconhecido

```bash
ls /dev/ttyACM* /dev/ttyUSB*    # porta serial do servo
ls /dev/video*                   # câmera
```

Conseguir ver os nós de dispositivo significa que o sistema reconheceu tudo.

---

## 4. Configurar o espelho do Hugging Face ⚠️ Obrigatório na China continental

**O `huggingface.co` é totalmente inacessível a partir da China continental**, e ele é indispensável para carregar modelos pré-treinados.

Ao iniciar o contêiner, adicione esta variável de ambiente:

```bash
-e HF_ENDPOINT=https://hf-mirror.com
```

O `scripts/run.sh` já traz isso configurado por padrão. Se você for trabalhar
totalmente offline, adicione também `-e HF_HUB_OFFLINE=1`.

---

## Checklist

Antes de passar para a próxima página, confirme que todos estes itens passaram:

```bash
docker --version                       # Docker instalado
docker info | grep -A4 "Registry Mirrors"   # acelerador em vigor
groups | grep dialout                  # permissão da porta serial configurada (depois de fazer login novamente)
ls /dev/ttyACM*                        # dispositivo reconhecido
```

---

> **Próximo:** [03-Deployment](03-Deployment.md) — Baixar a imagem, iniciar o contêiner
