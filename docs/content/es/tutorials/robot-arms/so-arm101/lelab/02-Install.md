---
title: "2 · Instalar y ejecutar"
description: "Instalar y ejecutar LeLab: instalación en una línea con uv o desde el código fuente — ambas instalan LeRobot; la interfaz web se abre en localhost:8000."
---

# 2 · Instalar y ejecutar

> **Anterior:** [01 Descripción general](01-Overview.md)
> **Siguiente:** [03 Conectar y calibrar](03-Calibration.md)

Ambos métodos instalan también LeRobot — LeLab lo necesita.

---

## Vía A · En una línea

Necesita [uv](https://docs.astral.sh/uv/). Se instala en un entorno aislado:

```bash
uv tool install --with-executables-from huggingface_hub git+https://github.com/Juxi-Technology/leLab.git && lelab
```

Se abre un navegador en `http://localhost:8000/`.

## Vía B · Desde el código fuente

```bash
git clone https://github.com/Juxi-Technology/leLab.git
cd leLab
pip install -e .
```

`pip install -e .` compila el front end de React y lo empaqueta dentro del paquete de Python, de modo que un solo proceso sirve tanto la API como la interfaz. La primera instalación tarda unos minutos.

Si la compilación no encuentra Node.js, instala **Node.js 22** y vuelve a intentarlo. Node solo es necesario en el momento de la instalación y en modo desarrollo — no para ejecutar LeLab después.

> **¿Prefieres el código original?** Este repositorio es una copia. El original, mantenido por el equipo de LeRobot en Hugging Face, es <https://github.com/huggingface/leLab>. Todo lo que hay en estas páginas se le aplica sin cambios.

---

## Iniciarlo

```bash
lelab
```

Sirve la interfaz en **<http://localhost:8000/>** y abre el navegador.

| Opción | Qué hace |
|---|---|
| `lelab` | Modo producción. Un proceso sirve la API y la interfaz compilada en `:8000` |
| `lelab --dev` | Recarga en caliente de Vite en `:8080` más uvicorn `--reload` en `:8000`. Necesita Node.js 22 |
| `lelab --rebuild` | Recompila el front end desde las fuentes locales y luego arranca en modo producción |
| `lelab --no-open` | Arranca sin abrir un navegador |
| `lelab --stop` | Detiene un LeLab en ejecución y libera los puertos 8000 y 8080 |

Detén con `Ctrl+C`, o desde otra terminal:

```bash
lelab --stop
```

Usa `--stop` cuando la página deje de cargar: un proceso obsoleto que ocupa el puerto 8000 o 8080 suele ser la causa.

---

## Comprobar que funcionó

Abre <http://localhost:8000/>. La página de inicio tiene pestañas para **Calibration**, **Teleoperation**, **Recording**, **Datasets**, **Training** e **Inference**.

Desde la terminal:

```bash
curl http://localhost:8000/health
```

Devuelve un estado JSON.

---

## Modo desarrollo

```bash
lelab --dev
```

Vite en `:8080`, la API con recarga automática en `:8000`. Las ediciones en `frontend/src/` actualizan la página sin reiniciar; las ediciones en `lelab/` recargan el servidor.

**En modo `--dev` navega por `:8080`, no por `:8000`.** El puerto 8000 te da la API sin interfaz.

---

## Actualizar

LeLab comprueba si la rama desde la que se instaló ha cambiado y ofrece una actualización en la interfaz. Para actualizar a mano:

```bash
uv tool install --with-executables-from huggingface_hub git+https://github.com/Juxi-Technology/leLab.git --force
```

Las instalaciones editables (`pip install -e .`) quedan excluidas de la comprobación. Actualízalas con `git pull`.

---

> **Siguiente:** [03 Conectar y calibrar](03-Calibration.md)

<RelatedProducts slugs="so-arm101" />
