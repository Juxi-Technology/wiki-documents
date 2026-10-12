---
title: 02 · Preparação do ambiente
---

# 02 · Preparação do ambiente

> **Anterior:** [01-Overview](01-Overview.md)
> **Seguinte:** [03-Deployment](03-Deployment.md)

Instale o Docker, configure a rede para a China continental e ligue o hardware. **Se não concluir esta página, a seguinte não corre.**

---

## 1. Instalar o Docker

Se já tiver instalado, pode saltar; confirme primeiro:

```bash
docker --version
```

Se não tiver instalado:

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
```

**Depois de executar o último comando, é necessário fazer login novamente**
(terminar a sessão e voltar a entrar, ou reiniciar), caso contrário o comando
`docker` apresentará um erro de permissão. Para verificar:

```bash
docker run --rm hello-world
```

---

## 2. Configurar aceleradores de imagem na China continental ⚠️ Indispensável para utilizadores na China continental

**O acesso direto ao Docker Hub a partir da China continental expira (timeout)**; sem configurar um acelerador, não é possível descarregar nenhuma imagem.

Edite o `/etc/docker/daemon.json` (crie o ficheiro caso não exista):

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

Verifique se entrou em vigor:

```bash
docker info | grep -A4 "Registry Mirrors"
```

> ⚠️ Muitos endereços de espelhos que circulam na Internet já não estão
> operacionais (USTC, NetEase e `dockerproxy.com` já encerraram), por isso não
> copie artigos antigos. Os três acima foram testados em setembro de 2026 e
> estavam operacionais.

---

## 3. Preparar o hardware

### 3.1 Ligação do robô

1. Ligue os servos do braço robótico SO-101 ao computador através de uma placa adaptadora USB
2. Ligue a câmara à porta USB (no caso da RealSense, numa porta USB 3.0)

### 3.2 Permissões da porta serial ⚠️ Importante

Se não configurar isto, **o dispositivo não será visível dentro do contendor**:

```bash
sudo usermod -aG dialout $USER
```

**Isto também exige fazer login novamente para produzir efeito.**

### 3.3 Confirme que o dispositivo é reconhecido

```bash
ls /dev/ttyACM* /dev/ttyUSB*    # porta serial do servo
ls /dev/video*                   # câmara
```

Conseguir ver os nós de dispositivo significa que o sistema os reconheceu.

---

## 4. Configurar o espelho do Hugging Face ⚠️ Indispensável na China continental

**O `huggingface.co` é completamente inacessível a partir da China continental**, e é indispensável para carregar modelos pré-treinados.

Ao iniciar o contendor, acrescente esta variável de ambiente:

```bash
-e HF_ENDPOINT=https://hf-mirror.com
```

O `scripts/run.sh` já o configura por omissão. Se precisar de funcionar
totalmente offline, acrescente também `-e HF_HUB_OFFLINE=1`.

---

## Lista de verificação

Antes de avançar para a página seguinte, confirme que todos estes pontos estão verificados:

```bash
docker --version                       # Docker instalado
docker info | grep -A4 "Registry Mirrors"   # acelerador em vigor
groups | grep dialout                  # permissões da porta serial configuradas (depois de fazer login novamente)
ls /dev/ttyACM*                        # dispositivo reconhecido
```

---

> **Seguinte:** [03-Deployment](03-Deployment.md) — Descarregar a imagem, iniciar o contendor
