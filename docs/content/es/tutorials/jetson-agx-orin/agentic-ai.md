---
title: IA agéntica — NemoClaw en JetPack 7.2
sidebar_label: IA agéntica (NemoClaw)
slug: /tutorials/agentic-ai
description: >-
  Implemente NVIDIA NemoClaw en el kit de desarrollo AGX Orin — instalación
  con un solo comando, habilidades de agente de Jetson y notas prácticas para
  agentes siempre activos.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2
    checked: 2026-09-24
  - source: https://www.nvidia.com/en-us/ai/nemoclaw
    checked: 2026-09-24
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
review_owner: cheny
---

# IA agéntica — NemoClaw en JetPack 7.2

JetPack 7.2 hace que su kit esté **listo para la IA agéntica**: NVIDIA NemoClaw
se instala con un solo comando, y las habilidades de agente de NVIDIA
automatizan gran parte del trabajo de plataforma que antes era manual.

## Qué es NemoClaw

Según NVIDIA: NemoClaw es una colección abierta de stack y blueprints para
construir **agentes autónomos** — sistemas de IA siempre activos que razonan,
planifican y actúan. Añade controles de privacidad y seguridad (mediante los
controles de políticas en tiempo de ejecución de **OpenShell**) al ecosistema
de agentes OpenClaw, y empaqueta componentes de NVIDIA como los modelos
Nemotron y NeMo. JetPack 7.2 viene **preconfigurado con las dependencias
necesarias**, por lo que no hace falta configurar el entorno manualmente en su
kit.

- Página del producto NemoClaw: <https://www.nvidia.com/en-us/ai/nemoclaw>
- NemoClaw en GitHub: <https://github.com/NemoClaw> · ejemplos de la comunidad: <https://github.com/nemoclaw-community>

## Instalación (un solo comando, oficial)

En el kit (JetPack 7.2 o superior), ejecute:

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash
```

> **Nota de seguridad — léala antes de ejecutar:** esto instala un framework
> de agentes siempre activo. Revise a qué puede acceder el agente y qué
> credenciales puede usar *antes* de habilitarlo, prefiera tokens con alcance
> limitado y revocables, y utilice los controles de políticas de OpenShell. No
> deje un agente desatendido con un acceso que no pueda revocar.

## Después de la instalación — adónde ir a continuación

NVIDIA mantiene un **Build-a-Claw Resource Hub** con guías de instalación,
pruebas en la nube y recursos de aprendizaje: <https://www.nvidia.com/en-us/ai/build-a-claw>

También resulta útil:

- Curso del NVIDIA Deep Learning Institute: *Securing Agents With NemoClaw and OpenShell* (consulte el centro de recursos)
- Discord de NVIDIA Developer — canal `#nemoclaw`
- Guías de terceros (p. ej., la [guía de NemoClaw de Seeed Studio](https://wiki.seeedstudio.com/control_rebot_arm_with_nemoclaw_on_nvidia_jetson_thor_bk/), escrita para un brazo robótico Jetson Thor) documentan flujos posteriores a la instalación como `nemoclaw onboard` — considérelas orientación de la comunidad y siga el centro de recursos de NVIDIA para el flujo de referencia.

## Habilidades de agente de Jetson — automatizar el trabajo de plataforma

JetPack 7.2 incluye **habilidades de agente** (agent skills): flujos de
trabajo repetibles y ejecutables por agentes para el desarrollo en Jetson.
Tres categorías según NVIDIA:

| Categoría de habilidad | Qué automatiza |
|---|---|
| **Personalización de Jetson Linux** | Creación o personalización de un BSP para placas portadoras personalizadas — configuración de E/S, relojes, control del ventilador, perfiles de energía |
| **Optimización de memoria** | Auditoría de las regiones reservadas del bootloader, las reservas del kernel y la memoria de espacio de usuario para que quepan cargas de trabajo más potentes en menos memoria |
| **Benchmarking de modelos** | Búsqueda de la configuración óptima del modelo y diagnósticos para su dispositivo |

Más habilidades de agente en el ecosistema:

- [Habilidades del lado del dispositivo Jetson](https://github.com/jetson-device-skills) · [Habilidades BSP de Jetson](https://github.com/jetson-bsp-skills)
- [DeepStream Coding Agent](https://github.com/DeepStream_Coding_Agent) — creación de pipelines de visión asistida por agentes (consulte [nuestro tutorial de DeepStream](/es/tutorials/jetson-agx-orin/deepstream))
- [Habilidades del blueprint Metropolis VSS](https://github.com/NVIDIA-AI-Blueprints/video-search-and-summarization/tree/main/skills) — flujos de trabajo de búsqueda y resumen de vídeo

## Notas prácticas para el kit AGX Orin

- **Los agentes siempre activos necesitan cómputo dedicado** — ese es el
  motivo de ejecutarlos en un kit en lugar de en un portátil que se suspende;
  planifique en consecuencia la energía y la refrigeración (consulte las notas
  sobre modos de energía en
  [Solución de problemas](/es/tutorials/jetson-agx-orin/troubleshooting)).
- **La elección del modelo importa para la memoria** — los modelos locales en
  Orin funcionan bien dentro de los 64GB, pero los agentes siempre activos
  acumulan contexto. Consulte
  [Eficiencia de memoria](/es/tutorials/jetson-agx-orin/memory-efficiency) para conocer los ajustes, y
  [Inferencia LLM local](/es/tutorials/jetson-agx-orin/local-llm) para el rendimiento de los modelos en el dispositivo.
- **Este campo avanza muy rápido.** Considere los comandos anteriores como la
  ruta oficial actual; consulte el centro de recursos para ver si hay novedades
  antes de automatizar despliegues con scripts.

## Fuentes

- [Blog técnico de NVIDIA — IA agéntica en JetPack 7.2 (comando de instalación, habilidades de agente, novedades de la versión)](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2) (consultado el 2026-09-24)
- [Página del producto NVIDIA NemoClaw](https://www.nvidia.com/en-us/ai/nemoclaw) (consultado el 2026-09-24)
- [Página de descargas de JetPack 7.2.1](https://developer.nvidia.com/embedded/jetpack/downloads) (consultado el 2026-09-24)

*Estado: borrador, pendiente de revisión por cheny. Basado en la documentación
oficial de NVIDIA a la fecha indicada; aún no verificado en hardware físico por
Juxi Technology.*

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta página es
publicada por Juxi Technology y no es una publicación de NVIDIA.
