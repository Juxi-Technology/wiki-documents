---
title: 02 · Preparación del entorno
---

# 02 · Preparación del entorno

> **Anterior:** [01-Overview](01-Overview.md)
> **Siguiente:** [03-Deployment](03-Deployment.md)

Instale Docker, configure la red para China continental y conecte el hardware.
**Si no completa esta página, la siguiente no funcionará.**

---

## 1. Instalar Docker

Si ya lo tiene instalado puede saltarse este paso; compruebe primero:

```bash
docker --version
```

Si no lo tiene instalado:

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
```

**Después de ejecutar la última línea debe volver a iniciar sesión** (cierre
la sesión y vuelva a entrar, o reinicie); de lo contrario el comando `docker`
dará un error de permisos. Verifique:

```bash
docker run --rm hello-world
```

---

## 2. Configurar el acelerador de espejos para China continental ⚠️ Obligatorio en China continental

**Docker Hub agota el tiempo de espera si se conecta directamente desde
China continental**; sin configurar un acelerador no podrá descargar ninguna
imagen.

Edite `/etc/docker/daemon.json` (créelo si no existe):

```json
{
    "registry-mirrors": [
        "https://docker.m.daocloud.io",
        "https://docker.1ms.run",
        "https://docker.xuanyuan.me"
    ]
}
```

Reinicie Docker:

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

Verifique que surte efecto:

```bash
docker info | grep -A4 "Registry Mirrors"
```

> ⚠️ Muchas direcciones de espejos que circulan por internet ya no funcionan
> (las de USTC y NetEase, y `dockerproxy.com`, han dejado de dar servicio);
> no copie artículos antiguos. Los tres de arriba están probados y funcionan
> a fecha de septiembre de 2026.

---

## 3. Preparar el hardware

### 3.1 Conexión del robot

1. Conecte los servos del brazo robótico SO-101 al ordenador mediante la placa adaptadora USB
2. Conecte la cámara por USB (si usa RealSense, en un puerto USB 3.0)

### 3.2 Permisos del puerto serie ⚠️ Importante

Si no lo configura, **no se verán los dispositivos dentro del contenedor**:

```bash
sudo usermod -aG dialout $USER
```

**También hay que volver a iniciar sesión para que surta efecto.**

### 3.3 Confirmar que los dispositivos se detectan

```bash
ls /dev/ttyACM* /dev/ttyUSB*    # Puerto serie de los servos
ls /dev/video*                   # Cámara
```

Si puede ver los nodos de dispositivo, el sistema los ha reconocido.

---

## 4. Configurar el espejo de Hugging Face ⚠️ Obligatorio en China continental

**`huggingface.co` es completamente inalcanzable desde China continental**,
y es imprescindible para cargar modelos preentrenados.

Al iniciar el contenedor, añada esta variable de entorno:

```bash
-e HF_ENDPOINT=https://hf-mirror.com
```

`scripts/run.sh` ya lo trae configurado por defecto. Si trabaja totalmente
sin conexión, añada además `-e HF_HUB_OFFLINE=1`.

---

## Lista de comprobación

Antes de pasar a la siguiente página, confirme que todo esto se cumple:

```bash
docker --version                       # Docker instalado
docker info | grep -A4 "Registry Mirrors"   # acelerador activo
groups | grep dialout                  # permisos del puerto serie configurados (tras volver a iniciar sesión)
ls /dev/ttyACM*                        # dispositivo reconocido
```

---

> **Siguiente:** [03-Deployment](03-Deployment.md) — Descargar la imagen e iniciar el contenedor
