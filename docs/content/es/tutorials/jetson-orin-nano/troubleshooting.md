---
title: Solución de problemas
sidebar_label: Solución de problemas
slug: /support/troubleshooting
description: >-
  Solución de problemas guiada por síntomas para el kit de desarrollo NVIDIA
  Jetson Orin Nano Super (8GB) — trampas de instalación, modos de
  alimentación, almacenamiento NVMe, aceleración por GPU y problemas
  conocidos, con grados de fuente claros.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetson-orin-nano-missing-25w-power-mode-qspi-firmware-mismatch-after-missed-capsule-update/377553
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetson-orin-nano-in-jetpack-7-2-r39-2-nvme-ssd-on-pcie-c7-is-not-detected-bootable-in-uefi-stage-but-works-normally-after-linux-boots/383858
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetson-orin-nano-repeated-ext4-nvme-filesystem-corruption-and-attempting-recovery-boot-on-jetpack-7-2/379702
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269
    checked: 2026-09-26
review_owner: cheny
---

# Solución de problemas

Busque su síntoma en el índice de abajo y lea la sección correspondiente.
Grados: **A** = documentación oficial de NVIDIA; **B** = foro de
desarrolladores de NVIDIA (informes del personal o de la comunidad). Los
elementos que solo provienen de la comunidad se marcan como *sin confirmar*.
Juxi no tiene ninguna unidad de esta serie en mano — esta página solo está
verificada contra la documentación, no probada en hardware.

## Empiece por la guía oficial de solución de problemas de NVIDIA

El primer punto de parada de NVIDIA para este kit: la
[Guía de solución de problemas](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html).
Cubre exactamente cinco problemas de configuración: (1) la Jetson ISO no
arranca, (2) sin salida de pantalla, (3) el instalador no muestra el
almacenamiento de destino, (4) se necesita una actualización de firmware,
(5) error de permisos de docker. Páginas oficiales relacionadas: la página
[Interim Solutions](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/interim_solutions.html)
no contiene actualmente soluciones alternativas (remite a la ruta de
actualización de JetPack 6.x), y la página
[Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html)
lista los canales de escalado de NVIDIA. (grado A)

## Índice de síntomas

| Síntoma | Sección |
| --- | --- |
| El instalador omite las pantallas de idioma/red/usuario y el sistema se queda colgado en una pantalla negra con un cursor; ninguna contraseña funciona | Aviso de cápsula QSPI omitido |
| La instalación parecía correcta, pero falla más tarde | Aviso de cápsula QSPI omitido |
| La instalación o el flasheo falla con un hub o adaptador USB conectado | Periféricos USB |
| Solo 7W y 15W en el menú de alimentación; `nvpmodel -m 2` da error | Faltan 25W / MAXN SUPER |
| GPU fijada a 624.75 MHz incluso en MAXN SUPER | GPU fijada a 624.75 MHz |
| Un cambio de modo de alimentación pide un reinicio; el reinicio puede quedarse colgado con una pantalla negra | Cambios de modo de alimentación y el reinicio con pantalla negra |
| El instalador no ofrece la unidad NVMe; la instalación se cuelga después del 100% | Problemas de almacenamiento NVMe |
| El NVMe no es visible en la etapa UEFI | Problemas de almacenamiento NVMe |
| La instalación se aborta en «Step 9/13 Updating boot firmware» | Discrepancia de nombre de placa en el paso 9/13 |
| `jetson-io.py` falla en una unidad Super flasheada con la ISO | Discrepancia de DTB de Jetson-IO |
| Ollama se ejecuta en CPU; aviso «Unsupported JetPack version» | Ollama y la aceleración por GPU |
| Se necesitan wheels de Python para JetPack 7.2 | Wheels de Python |
| El Wi-Fi no ve la red; routers de 6 GHz con MBSSID no compatibles | El Wi-Fi no ve la red |
| Sin salida de pantalla; el instalador no arranca | Guía oficial de solución de problemas (arriba) |
| Error de permisos del socket de Docker | Error de permisos de Docker |
| Se necesitan registros de arranque sin pantalla | Consola serie |

## Aviso de la cápsula QSPI omitido (la trampa de instalación más común)

Durante la instalación por ISO, el kit le pide confirmar una actualización de
la cápsula de firmware QSPI. NVIDIA lo llama «el paso que más se omite»: el
aviso espera solo 30 segundos. **Pulse Y.**

- Si se agota el tiempo, «la instalación falla más tarde». La instrucción de
  NVIDIA es reiniciar la instalación y pulsar Y. (grado A;
  sección 5.1 de [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html);
  problema 6266271 de las notas de la versión, en
  [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)
  y [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf):
  «Omitir este paso causa problemas de instalación debido a la incompatibilidad
  de las nuevas imágenes ISO con las imágenes QSPI antiguas».)
- La actualización se ejecuta en dos pasadas, y el kit puede reiniciar entre
  ambas. Eso es lo esperado. NVIDIA también recomienda seleccionar
  explícitamente la unidad USB de instalación en el gestor de arranque UEFI en
  lugar de confiar en el arranque automático. (grado A,
  [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html);
  el personal confirmó que la guía se actualizó con la solución de un usuario —
  grado B, [hilo 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))
- Firma del fallo (grado B, informe de usuario con reconocimiento del personal,
  [hilo 380410](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410)):
  el instalador omite las pantallas de idioma, red y nombre de usuario, salta a
  «Finished installation and reboot» y el sistema se queda colgado en una
  pantalla negra o gris con un cursor. Ninguna credencial predeterminada
  funciona (nvidia/nvidia, ubuntu/ubuntu, root/empty). Causa: el aviso de la
  cápsula nunca se confirmó. Tras pulsar Y, aparecieron las pantallas de
  configuración y la instalación se completó. Otros usuarios del mismo hilo lo
  resolvieron flasheando con SDK Manager. (grado B)
- Si el kit nunca llega al instalador (pantalla negra, o cae a un shell de
  UEFI), es probable que el firmware QSPI sea demasiado antiguo: JetPack
  7.2/7.2.1 requieren firmware UEFI/QSPI de la generación de JetPack 6.x.
  Consulte [Flasheo y actualizaciones](/es/tutorials/jetson-orin-nano/flashing-and-updates)
  y [Migración de JetPack 6.x a JetPack 7.2.1](/es/tutorials/jetson-orin-nano/jetpack-6-to-7).
  (grado A, [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html))

## La instalación o el flasheo falla con ciertos periféricos USB

Problemas oficiales **5424568** y **5460707** (presentes en las notas de
[r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)
y [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)):
la instalación por ISO falla cuando la unidad USB del instalador se conecta a
un hub **«USB3.0 4-port Portable Hub Model UH400»** — «Otras unidades USB o
hubs funcionan como se espera» — y el flasheo a veces falla cuando hay
conectado un adaptador USB a Ethernet **TRENDnet TU2-ET100**. Use otra
unidad/hub o un puerto USB directo, y retire el adaptador, antes de
reintentar. (grado A)

## Faltan 25W y MAXN SUPER

Síntomas: solo aparecen 7W y 15W, o `nvpmodel -m 2` devuelve un error de modo
de alimentación incorrecto. Causa — problema conocido oficial **6279443**
(notas de [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)):
las unidades actualizadas por ISO «no adoptarán el modo Super de forma
predeterminada tras la actualización. Para usar el modo Super, debe flashear el
destino con un host Linux o SDKM». (grado A)

Firma — falta el sufijo `-super` en `/etc/nv_boot_control.conf`. El personal:
«Cuando el modo Super está habilitado, la configuración debería incluir el
sufijo -super … Actualmente, la imagen ISO no puede actualizar un dispositivo
del modo no Super al modo Super. Use un host x86 para reflashear el dispositivo
con la configuración de modo Super». (grado B,
[hilo 372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627))

Corregido por diseño en 7.2.1 — el personal: «Esto se corregiría en jp7.2.1»;
las notas de
[r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)
dicen «la ISO ahora flashea el Jetson Orin Nano Developer Kit con la
configuración de flasheo de modo Super de forma predeterminada», y el problema
6279443 no aparece en la lista de problemas conocidos. (grado A)

Opciones de corrección:

1. Reflashee desde un host Linux, o con SDK Manager. (grado A, problema 6279443,
   notas de [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf))
2. Flasheo solo QSPI del personal — flashea solo el gestor de arranque QSPI, sin
   imagen de sistema (grado B,
   [hilo 377553](https://forums.developer.nvidia.com/t/jetson-orin-nano-missing-25w-power-mode-qspi-firmware-mismatch-after-missed-capsule-update/377553)).
   El primer comando es el del personal; el segundo añade el destino Super y las
   anulaciones de EEPROM que le funcionaron al informante:

```
sudo ./flash.sh --no-systemimg -c bootloader/generic/cfg/flash_t234_qspi.xml jetson-orin-nano-devkit internal

sudo SKIP_EEPROM_CHECK=1 BOARDID=3767 BOARDSKU=0005 FAB=300 ./flash.sh --no-systemimg -c bootloader/generic/cfg/flash_t234_qspi.xml jetson-orin-nano-devkit-super internal
```

3. Solución comunitaria en el propio equipo — *sin confirmar*, no respaldada
   por NVIDIA (grado B,
   [hilo 372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627),
   [hilo 375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435)).
   El personal de NVIDIA pidió a los usuarios capturar el estado **antes** de
   editar ese archivo (`cat /etc/nv_tegra_release`,
   `cat /etc/nv_boot_control.conf`, `sudo /usr/sbin/nvpmodel -q --verbose`) —
   editarlo «eliminaría el estado de fallo que necesitamos inspeccionar».
   Secuencia reportada: `sudo -i`;
   `perl -i -0777 -pe 's/nano-devkit-\n/nano-devkit-super-\n/g' /etc/nv_boot_control.conf`;
   `dpkg-reconfigure nvidia-l4t-bootloader`; `rm /etc/nvpmodel.conf`; `reboot`;
   y después `sudo nvpmodel -m 2 --verbose --force`. Varios usuarios confirmaron
   que 25W y MAXN SUPER aparecieron después; un usuario con una instalación en
   tarjeta SD obtuvo un bucle de arranque y reinstaló.

Contexto: en una instalación 7.2 no Super,
`/etc/nvpmodel/nvpmodel_p3767_0003_super.conf` (15W, 25W, MAXN_SUPER) existe,
pero `/etc/nvpmodel.conf` apunta al archivo no Super, que solo tiene 15W y 7W.
(grado B, comunidad,
[hilo 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151)).
Comandos de comprobación de modos de alimentación:
[Verificación del sistema](/es/tutorials/jetson-orin-nano/verify-your-system).

## GPU fijada a 624.75 MHz

Incluso con MAXN_SUPER activo, la GPU puede quedarse fijada a 624,750,000 Hz
(`bpmp/debug/clk/nafll_gpc0/max_rate` = 624750000); flashear solo la cápsula
Super no ayudó en el caso reportado — el firmware Super no se aplicó. El
personal: flashee con SDK Manager, o flasheo manual desde un host Ubuntu; dicen
que está corregido en 7.2.1. (grado B,
[hilo 377003](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003))
Nota de la comunidad: no hay `nvpmodel_p3767_0005.conf` en L4T 39.2; el módulo
P3767-0005 usa la configuración 0003 (el personal no lo confirmó). (grado B,
comunidad, el mismo hilo que arriba)

## Cambios de modo de alimentación y el reinicio con pantalla negra

- El aviso de reinicio tras un cambio de modo de alimentación es lo esperado
  una vez que se ha usado la GPU («golden image context»). (grado B, personal,
  [hilo 375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435))
- Si el reinicio se queda colgado con una pantalla negra, coincide con el
  problema **6236259**
  ([r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf);
  listado como corregido en
  [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)):
  bajar la EMC por debajo de Fmax durante la inicialización de systemd puede
  bloquear el sistema al reiniciar, especialmente con una pantalla conectada.
  (grado A)
- Solución alternativa: reinicie con el monitor desconectado y vuelva a
  conectarlo después del arranque — un usuario confirmó que esto resolvió los
  problemas de modo de alimentación. (grado B, personal y usuario,
  [hilo 375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435))
- Mitigación de NVIDIA: cambie a MAXN (restaura la EMC a Fmax) antes de
  reiniciar; si ya está en el modo problemático, arranque una vez sin la
  pantalla. (grado A, problema 6236259, notas de
  [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf))

## Problemas de almacenamiento NVMe

**El instalador no ofrece la unidad / el paso de particionado falla** — *sin
confirmar*: puede que el instalador no admita unidades NVMe formateadas con
sectores de 4K; necesita 512n/512e. Compruebe
`nvme id-ns -H /dev/nvme0n1`; cámbielo con
`nvme format --lbaf=ID /dev/nvme0n1` — **destructivo**; el mensaje no trata la
preservación de datos. NVIDIA no lo ha confirmado oficialmente. (grado B, sin
confirmar, [hilo 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))

**El arranque se cuelga tras una instalación que parecía correcta** — *sin
confirmar*: varios informes de pantalla negra o cursor parpadeante después de
que el instalador llegue al 100%. Un usuario lo resolvió solo con un flasheo
directo en modo recovery; otro lo atribuyó al problema de sectores de 4K
anterior. Sin causa raíz confirmada. (grado B, sin confirmar,
[hilo 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))

**NVMe no detectado en la etapa UEFI (r39.2)** — una unidad en PCIe C7 era
invisible en la etapa de arranque UEFI aunque funcionaba en R36.4; el
informante lo resolvió restaurando las configuraciones predeterminadas y
reflasheando. El personal: «para el devkit NV, todo ya está configurado
correctamente en el BSP predeterminado. Cuantos más elementos intente
configurar, más posibilidades hay de que algo deje de funcionar». (grado B,
[hilo 383858](https://forums.developer.nvidia.com/t/jetson-orin-nano-in-jetpack-7-2-r39-2-nvme-ssd-on-pcie-c7-is-not-detected-bootable-in-uefi-stage-but-works-normally-after-linux-boots/383858)).
Nota: las imágenes de tarjeta SD desaparecieron a partir de JetPack 7.2 —
escriba la ISO en una unidad USB e instale después en microSD o NVMe. (grado A,
[Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html))

## El instalador se aborta en «Step 9/13 Updating boot firmware» (discrepancia de nombre de placa)

*Sin confirmar.* La instalación puede abortarse con:

```
ERROR. 3767--0005--1--jetson-orin-nx-devkit-16gb- does not match any known boards.
```

Causa: `/etc/nv_boot_control.conf` lleva un COMPATIBLE_SPEC obsoleto que la
lista de placas del paquete del gestor de arranque no reconoce; el paso de
oem-config/creación de usuario entonces nunca se ejecuta — el mecanismo de
«usuario/contraseña omitidos» en este caso. Reproducción en un sistema r39.2
arrancado: `sudo apt-get install --reinstall nvidia-l4t-bootloader`. NVIDIA no
ha confirmado esto. También se reprodujo en un Orin NX 16GB y por un tercero el
2026-09-18 (subiquity `command_34 … returned non-zero exit status 100`); se
reportó una variante para SDK Manager 7.2.x que falla en «Step 9». (grado B,
sin confirmar,
[hilo 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))

Solución alternativa de la comunidad, *sin confirmar*: haga chroot en
`/target`, amplíe la rama board-glob de `select_3767_payload` dentro de
`/var/lib/dpkg/info/nvidia-l4t-bootloader.postinst`, luego
`rm -f /opt/nvidia/l4t-packages/.nv-l4t-disable-boot-fw-update-in-preinstall`,
ejecute `dpkg --configure -a` y `apt-mark hold nvidia-l4t-bootloader`. NVIDIA
no ha publicado una corrección para este fallo; la solución comunitaria
anterior sigue sin confirmar. (grado B)

## Discrepancia de DTB de Jetson-IO en unidades Super flasheadas con la ISO

Problema oficial **6236205** (presente en
[r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)
y [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)):
`jetson-io.py` falla en unidades Orin Nano Super flasheadas con la ISO.
Solución alternativa oficial: encuentre el DTB correspondiente en `/boot` con
un bucle `fdtget` que compare `/compatible` y `/model`; cópielo en `/boot/dtb/`
como `kernel_<name>.dtb`; luego vuelva a ejecutar
`sudo /opt/nvidia/jetson-io/jetson-io.py`. Las unidades flasheadas por otros
métodos no se ven afectadas. (grado A)

## Ollama y la aceleración por GPU

Historial: las primeras compilaciones de Ollama en JetPack 7.2 recurrían a la
CPU porque las bibliotecas CUDA precompiladas de Ollama no incluían sm_87 (la
compute capability de Orin es 8.7). El personal citó el registro «skipping CUDA
device — compute capability not in compiled architectures … device=Orin
cc=870» y dijo: «Es un problema conocido … Estamos trabajando directamente con
el equipo de Ollama para añadir compatibilidad nativa con JP 7.2». (grado B,
personal,
[hilo 372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521))

Estado actual: la última versión de Ollama upstream funciona. El personal lo
verificó en JetPack 7.2.1 (2026-09-21): instale con
`curl -fsSL https://ollama.com/install.sh | sh`, ejecute un modelo y luego
compruebe `ollama ps` — debería mostrar `100% GPU`. La línea «WARNING:
Unsupported JetPack version detected» es un mensaje inofensivo; la antigua
solución de `override.conf` «ya no es necesaria». (grado B, personal,
[hilo 383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350))

Corrección para compilaciones obsoletas: si
`find /usr/local/lib/ollama ... | grep -Ei 'cuda|cudart|runner'` muestra
árboles `cuda_v12` y `cuda_v13`, elimine el antiguo —
`sudo rm -rf /usr/local/lib/ollama/cuda_v12`. El registro mostró entonces
«load_backend: loaded CUDA backend from
/usr/local/lib/ollama/cuda_v13/libggml-cuda.so … compute capability 8.7».
(grado B, personal y usuario,
[hilo 372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521))

Nota sobre 8 GB: los modelos más grandes aún pueden fallar con
`cudaMalloc failed: out of memory … failed to allocate buffer for kv cache`,
incluso cuando `free -h` muestra memoria libre — la memoria de la GPU es
compartida. Use modelos más pequeños o cuantizados. (grado B, comunidad,
[hilo 383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350)).
Más: [Inferencia LLM local en 8 GB](/es/tutorials/jetson-orin-nano/local-llm).

## Wheels de Python para JetPack 7.2

Respuesta del personal para JP 7.2 / CUDA 13.2: use
`https://pypi.jetson-ai-lab.io/sbsa/cu130`. (grado B, personal,
[hilo 372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521)).
Advertencia: cuando se comprobó la raíz del índice (2026-09-26), listaba
`jp6/cu126`, `jp6/cu128`, `jp6/cu129`, `sbsa/cu130` y `sbsa/dev` — no había
ninguna entrada `jp7` visible; los hilos de la comunidad también citan
`https://pypi.jetson-ai-lab.io/jp7/cu132`, no visible en ese listado. (grado C).
El personal: «Degradación: sí, puede volver a flashear a JP 6.2.2 con SDK
Manager si es necesario». (grado B)

## El Wi-Fi no ve la red

Problemas conocidos oficiales de Wi-Fi (en las notas de
[r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)):
**los routers Wi-Fi de 6 GHz que usan MBSSID no son compatibles** (problema
**5226667**), y **el escaneo de Wi-Fi puede perder AP en entornos con mucho
tráfico** — ejecute `wpa_cli set bss_max_count 500` como solución de búfer
(problema **5426982**). (grado A)

## Consola serie (depuración headless)

Conexionado (grado A,
[Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)):
cable serie USB a TTL en la cabecera de botones — pin 3 RXD al cable TX del
adaptador, pin 4 TXD al cable RX del adaptador, pin 7 GND al cable de tierra
del adaptador. Después, «abra una consola serie en su PC». Pulse **Esc**
repetidamente durante el arranque para entrar en UEFI. Para una instalación ISO
headless, pulse Esc en las opciones de prearranque, elija **Boot Manager** y
seleccione el disco USB.

- Las páginas de NVIDIA no indican ninguna velocidad en baudios ni programa de
  terminal — solo «abra una consola serie en su PC». (véase *Lo que no hemos
  podido confirmar*)
- Sin una pantalla DisplayPort o el UART de depuración, una instalación ISO
  headless no es práctica — el personal: «Necesitaría usar la salida de
  pantalla DP o el UART de depuración … así que si no tiene ninguna de las dos,
  es prácticamente imposible». (grado B, personal,
  [hilo 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))
- En las instalaciones ISO headless la consola UEFI es `/dev/ttyACM1`,
  inundada de salida hasta que el QSPI se actualiza a GA (38.2); no se observa
  con una pantalla conectada
  ([problema 5463861](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)).
  (grado A)
- Tras volver a insertar el cable de depuración, minicom puede quedar
  inaccesible — reinicie minicom
  ([problema 5437763](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf),
  en ambas versiones). (grado A)

## Error de permisos de Docker

Corrección oficial (grado A,
[Guía de solución de problemas](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html))
— reinicie el terminal si el cambio de grupo no surte efecto:

```
sudo usermod -aG docker $USER
newgrp docker
```

## Cómo obtener ayuda

- **Foro de desarrolladores de NVIDIA Jetson** (forums.developer.nvidia.com) —
  comunidad oficial, listada en la página Additional Docs de NVIDIA. Busque
  primero y publique con la salida de `cat /etc/nv_tegra_release`; para
  problemas de alimentación o firmware incluya también
  `/etc/nv_boot_control.conf` y `sudo /usr/sbin/nvpmodel -q --verbose`.
  (grado A para el listado)
- **Precaución:** algunas respuestas marcadas «NVIDIA-STAFF» son respuestas de
  LLM generadas automáticamente — comienzan con un marcador como «— 🤖 This is
  an automated AI response. I'm here to help, but please verify important
  details! —» o «*** Please note that this reply is generated by LLM
  automatically ***». Trátelas como no autoritativas. (grado B,
  [hilo 372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627),
  [hilo 372269](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269))
- **Juxi Technology** — support@juxitech.com para soporte técnico, y para
  asuntos de pedidos, garantía y RMA (incluya su número de pedido). Ventas:
  sales@juxitech.com · Preguntas sobre productos: pe@juxitech.com.

## Aún abierto en el upstream

Las notas de la versión de NVIDIA listan un problema abierto para este kit que
puede causar un reinicio inesperado: **abortos de DCE durante la
suspensión/reanudación SC7 que provocan un reinicio por watchdog** (problema
6235055, abierto tanto en r39.2 como en r39.2.1). Si nunca suspende el kit, no
le afecta; si lo hace, siga el problema en el upstream en lugar de buscar una
corrección de configuración. (grado A,
[notas de la versión r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf))

## Lo que no hemos podido confirmar

Preguntas abiertas en nuestras fuentes:

- La velocidad en baudios y el programa de terminal de la consola serie —
  NVIDIA solo dice «abra una consola serie en su PC».
- Si la discrepancia de nombre de placa (`command_34` con salida 100) está
  corregida en r39.2.1; no hay respuesta de NVIDIA en los hilos; última
  reproducción de la comunidad el 2026-09-18.
- Si una instalación ISO 7.2.1 restaura los modos Super en una unidad flasheada
  originalmente con la ISO 7.2 — las notas solo dicen que 7.2.1 flashea la
  configuración Super de forma predeterminada.
- Si la limitación de NVMe con sectores de 4K es real y está documentada
  oficialmente — solo hay un informe de la comunidad, no está en las notas de
  la versión ni en la guía del usuario.
- No hay procedimiento oficial para volver a estampar un COMPATIBLE_SPEC/TNSPEC
  obsoleto; una pregunta a NVIDIA en el foro quedó sin respuesta.
- Qué índice de wheels es el canónico para JP 7.2: `/sbsa/cu130` (personal) o
  `/jp7/cu132` (cita de la comunidad).
- Los requisitos del host de flasheo entran en conflicto entre fuentes
  oficiales: las notas de la versión dicen «Ubuntu 24.04 and 22.04» (sin
  arquitectura); la página del BSP dice x86_64 para SDK Manager; los usuarios
  también informan de que SDK Manager en Windows flashea 7.2.1 con éxito.
- Si la edición comunitaria de `nv_boot_control.conf` es segura — NVIDIA no ha
  respaldado ni corregido la vía en el propio equipo.
- Si `sudo nvpmodel -m 2` puede persistir entre reinicios en una instalación no
  Super (los informes de la comunidad dicen que no).
- Informes de corrupción EXT4/NVMe (fallo de recuperación del journal, timeout
  de etiqueta de E/S, «Attempting recovery boot») — sin resolver; el hilo se
  cerró sin respuesta.
- Ollama mediante compilación desde el código fuente o contenedores — ninguna
  de las dos vías es autoritativa; solo el instalador upstream más reciente
  tiene la confirmación del personal de NVIDIA en 7.2.1.
- La afirmación sobre la compilación «7.2.1-b49 vs b184» y la ausencia de
  «Agent Skills» — sin verificar, probablemente confundido; el *What's New* de
  r39.2.1 sí lista «Agent skills for video pipelines».

## Fuentes

- NVIDIA Jetson Orin Nano Developer Kit User Guide: [Troubleshooting Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html) · [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) · [JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) · [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) · [Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) — consultado el 2026-09-26
- Notas de la versión: [JetPack 7.2 / L4T r39.2 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) · [JetPack 7.2.1 / L4T r39.2.1 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) — consultado el 2026-09-26
- Hilos del foro de desarrolladores de NVIDIA (consultado el 2026-09-26): [372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151) · [380410](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410) · [372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) · [377003](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003) · [377553](https://forums.developer.nvidia.com/t/jetson-orin-nano-missing-25w-power-mode-qspi-firmware-mismatch-after-missed-capsule-update/377553) · [375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435) · [372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) · [383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) · [383858](https://forums.developer.nvidia.com/t/jetson-orin-nano-in-jetpack-7-2-r39-2-nvme-ssd-on-pcie-c7-is-not-detected-bootable-in-uefi-stage-but-works-normally-after-linux-boots/383858) · [379702](https://forums.developer.nvidia.com/t/jetson-orin-nano-repeated-ext4-nvme-filesystem-corruption-and-attempting-recovery-boot-on-jetpack-7-2/379702) · [372269](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269)

*Estado: borrador, pendiente de revisión por cheny. Los elementos etiquetados
como sin confirmar provienen de informes de la comunidad y pueden cambiar. Esta
página solo está verificada contra la documentación — Juxi no ha probado este
kit en hardware.*

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta página es
publicada por Juxi Technology y no es una publicación de NVIDIA.
