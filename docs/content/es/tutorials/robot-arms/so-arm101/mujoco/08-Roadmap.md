---
title: "08 · Hoja de ruta"
description: "Hecho:"
---

# 08 · Hoja de ruta

## Completado (ejecutable directamente en este repositorio)

| Capacidad | Estado |
| --- | --- |
| Carga/accionamiento/renderizado de verificación de modelos de simulación (3 MJCF) | ✅ |
| Teleoperación por teclado (simulación / robot real) | ✅ validado en robot real |
| Gemelo digital del brazo líder (brazo físico → brazo simulado, con ajuste fino del cero) | ✅ validado en robot real |
| Grabación de datos (robot real / simulación) + control de episodios + script de inspección | ✅ validado en robot real |
| Reproducción de datos (robot real / simulación, mecanismo oficial) | ✅ validado en robot real |
| Prueba de humo automatizada (`smoke_test.py` sin hardware) | ✅ 26 elementos superados |
| Dataset visual de dos cámaras `so101_sim_vision` (5 episodios / 10610 fotogramas / 353.8s) | ✅ |
| Entrenamiento (ACT) y despliegue de política en simulación (`lerobot-train` / `lerobot-rollout`) | ✅ medido en prueba de humo (ver [09](/es/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial)) |

## Siguientes pasos (ordenados por valor)

### Fase 2 · Cámaras en la escena (en curso)

**Hecho**:
- El soporte (STEP→STL) y la cámara (cuerpo provisional construido según la hoja de datos HBVCAM-F2170HD V22, 25×30×5.2mm) se ensamblaron en la simulación,
  con poses ajustadas comparando con el robot real mediante `adjust_mount.py` / `adjust_camera.py`;
- Elemento `<camera>` integrado (`sim_cam`, valor inicial de fovy 49°), **cadena de grabación visual en simulación ya operativa**:
  `--robot.image_camera=sim_cam` produce un dataset de vídeo `observation.images.wrist` (pruebas de humo [5] superadas).

**Actualización del 2026-10-16**: la puntería/fovy de la cámara ya está ajustada a satisfacción (`adjust_camera.py` añade una **ventana de imagen en tiempo real live view**,
con ajuste reanudable y reapertura automática si la ventana se cierra por error; también se corrigió el bug de "dirección de la lente y de la imagen invertidas" causado por que la dirección de visión de la cámara de MuJoCo es el **−Z del elemento**;
detalles en [07](/es/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)). Con el brazo líder recién calibrado se grabó oficialmente el dataset visual (con vídeo wrist, error de seguimiento ≤2 unidades) ✅;
las grabaciones experimentales antiguas se limpiaron el 2026-10-16 y el dataset oficial se unificó como `so101_sim_vision` (dos cámaras).
**El mismo día, el robot simulado se migró al modelo SO-ARM100 de mujoco_menagerie** (2026-10-16): la pinza del modelo del tutorial original no podía agarrar;
la pinza del nuevo modelo usa colisión basada en el CAD del robot real y se verificó que sujeta de forma estable un cubo de 34mm; se conservan todas las cadenas de grabación/teleoperación/dos cámaras/área de trabajo,
pendiente de una revisión con teleoperación en el robot real (especialmente el signo de la dirección de wrist_roll).
**Pendiente**: cuando se conecte la HBVCAM real, hacer un ajuste fino comparando "toma real vs render de simulación";
opcional: sustituir el cuerpo provisional por el STL del cuerpo de la cámara. La configuración de cámaras en el lado del robot real (`--robot.cameras` OpenCV) se hará después del mismo modo.

### Fase 3 · Escena y escalado (en curso)

- ✅ Área de trabajo integrada en la escena (2026-10-16): placa de trabajo + cubos de tres colores (34mm, agarrables) + caja de almacenamiento + cámara cenital fija `top_cam`
  (definida en `so101_assets.add_workspace`, herramienta de renderizado/verificación de rendimiento `preview_workspace.py`); **cadena de grabación con dos cámaras (wrist+top)
  ya operativa** (`--robot.top_camera=top_cam`);
- **Generación automática de datos**: políticas scriptadas/RL ejecutándose por lotes toda la noche en simulación (sin humano en el bucle); de ahí viene el "aumento de eficiencia de decenas de veces";
- Aleatorización de dominio visual (texturas/iluminación/vibración de cámara) preparando sim2real.

### Fase 4 · Entrenamiento y despliegue

- ✅ **Cadena de entrenamiento/despliegue medida** (2026-10-16): `lerobot-train` (ACT, prueba de humo de 12 pasos en CPU: unos 2s/paso, loss descendiendo con normalidad,
  checkpoint guardado en disco según lo esperado) y `lerobot-rollout --strategy.type=base` (ejecuta de verdad la política 20s en simulación y
  termina devolviendo el brazo a la pose inicial) ya funcionan; comandos completos, puntos clave y método para reanudar el entrenamiento en las secciones 7/8 de [09](/es/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial),
  el tutorial incluye un checkpoint de demostración `outputs/train/smoke_act` que sirve directamente para probar la cadena de despliegue;
- El entrenamiento definitivo se hace en una **máquina con GPU** (ACT / SmolVLA; esta máquina solo con CPU únicamente sirve para validar la cadena con pocos pasos);
  basta con copiar el dataset o subirlo a un repositorio privado de HF;
- El despliegue en robot real también usa `lerobot-rollout` (cambiando `--robot.*` por la configuración `so101_follower`).

### Largo plazo · sim2real

Entrenamiento mixto con datos de simulación + pocos datos reales → evaluación en el robot real a coste cero (en simulación se puede reproducir la tasa de éxito de la evaluación de políticas).
Atención: usar datos puramente simulados directamente en el robot real (transferencia zero-shot) es la ruta más difícil; empieza con un "bucle corto" (entrenar con datos reales → desplegar en real) e ir añadiendo simulación poco a poco.

## Posicionamiento en una frase

Para equipos que ya tienen brazos físicos: simulación = **entorno de desarrollo + material de demostración + amplificador de datos**;
para clientes potenciales: simulación = **herramienta de experiencia con la que recorrer todo el flujo antes de comprar**.

<RelatedProducts slugs="so-arm101" />
