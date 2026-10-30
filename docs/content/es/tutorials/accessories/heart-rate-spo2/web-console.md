---
title: "Tutorial de la versión web"
description: "Use el software de PC en versión navegador (Web Serial) para conectar y monitorizar el módulo de frecuencia cardíaca y SpO2 MAX30102, sin necesidad de instalar software."
---

# Tutorial de la versión web

Este tutorial explica cómo usar el software de PC en versión navegador para conectar y monitorizar el módulo de frecuencia cardíaca y SpO2. La versión web accede directamente al puerto serie mediante Web Serial, sin necesidad de instalar Python ni un `.exe`, y funciona en Windows, macOS y Linux.

**Dirección en línea:**[https://juxi-technology.github.io/JUXI_HeartRate_SPO2/](https://juxi-technology.github.io/JUXI_HeartRate_SPO2/)

> La versión web utiliza el mismo protocolo Modbus RTU que el software de PC de escritorio (dirección de esclavo `0x20`, 9600 baudios) y las lecturas son idénticas.

## 1. Requisitos del entorno

- **Chrome, Edge u Opera** de escritorio (con soporte de Web Serial)
- Safari, Firefox y los navegadores móviles no implementan Web Serial y no pueden conectarse al puerto serie
- Controlador USB a TTL (CH340, CP2102, FT232, etc.)
- La página requiere conexión a Internet para cargarse
- El navegador solo autoriza un dispositivo de puerto serie a la página a la vez

## 2. Conexión de hardware

| Módulo de frecuencia cardíaca y SpO2 | Adaptador USB a TTL |
|---|---|
| **VCC** | **5V** (no conecte 3,3V) |
| **GND** | **GND** |
| **TX** | **RX** (conexión cruzada) |
| **RX** | **TX** (conexión cruzada) |

⚠️ TX y RX deben conectarse de forma cruzada. Una vez conectado todo, inserte el adaptador USB a TTL en el ordenador.

## 3. Conexión del dispositivo

1. Abra la dirección en línea anterior con Chrome / Edge / Opera de escritorio.
1. Mantenga la velocidad en baudios en **9600**, igual que el módulo.
1. Haga clic en «**Conectar puerto serie**» y seleccione en la ventana emergente del navegador el dispositivo de puerto serie USB correspondiente al módulo.
1. Cuando el estado muestre «**Conectado, listo para adquirir**», la conexión se habrá realizado correctamente y junto al botón aparecerá el dispositivo seleccionado.

> Los parámetros del puerto serie son fijos: 8 bits de datos, 1 bit de parada, sin paridad y sin control de flujo; la página los configura automáticamente, sin configuración manual.

## 4. Inicio de la adquisición y monitorización

1. Haga clic en «**Iniciar adquisición**»: el LED del módulo se enciende y el estado cambia a «Adquisición iniciada, LED encendido».
1. Coloque el dedo sobre el sensor cubriendo por completo la zona óptica; basta con apoyarlo suavemente, sin presionar con fuerza.
1. Haga clic en «**Iniciar monitorización**»: el estado cambia a «Monitorizando...» y los datos en tiempo real empiezan a actualizarse.

## 5. Descripción de la interfaz

### Datos en tiempo real

| Métrica | Unidad | Descripción |
|---|---|---|
| Oxígeno en sangre (SPO2) | % | Saturación de oxígeno |
| Frecuencia cardíaca | veces/min | Frecuencia del pulso |
| Temperatura | °C | Temperatura de la placa del módulo, no temperatura corporal |

**Filtrado**: activado por defecto. Aplica un suavizado de mediana de 5 puntos a las lecturas y descarta los valores anómalos fuera de los rangos razonables (frecuencia cardíaca 35–220, SpO2 70–100 %, temperatura 0–60 °C). El número de valores descartados se muestra debajo del área de datos, por ejemplo «N valores anómalos descartados». Desmarque la casilla para ver las lecturas originales sin procesar.

**Mensajes de estado**: sin conexión / esperando selección de dispositivo… / conectado, listo para adquirir / adquisición iniciada, LED encendido / adquisición cerrada, LED apagado / monitorizando… / monitorización detenida / dispositivo desconectado / el navegador actual no admite Web Serial.

### Cambio de idioma

El botón **EN / 中文** de la esquina superior derecha cambia el idioma de la interfaz. El navegador recuerda la velocidad en baudios y el estado del filtro, y mantiene la última configuración al volver a abrir la página.

### Pestaña de documentación de uso

La pestaña «**Documentación de uso**» de la parte superior incluye los tutoriales de este producto en 11 idiomas y permite cambiar de idioma para leerlos directamente dentro de la página.

## 6. Detener y desconectar

Se recomienda seguir este orden:

1. Haga clic en «Detener monitorización»
1. Haga clic en «Cerrar adquisición»: el LED se apaga
1. Haga clic en «Desconectar»

## 7. Interpretación de los datos

| Dato | Rango normal | Descripción |
|---|---|---|
| Oxígeno en sangre SpO2 | 95% – 100% | Por debajo del 90 % se recomienda acudir al médico |
| Frecuencia cardíaca | 60 – 100 veces/min | Rango en reposo de un adulto |
| Temperatura | 25 – 35 °C | Temperatura del sensor de la placa, no temperatura corporal |

Es normal que se muestre `-1` al acabar de conectar o si el dedo no está bien colocado.

## 8. Diferencias con el software de PC de escritorio

| Aspecto | Versión web | Software de PC de escritorio |
|---|---|---|
| Instalación | No requiere instalación | Requiere ejecutar un `.exe` o un script de Python |
| Entorno de ejecución | Navegador | Windows |
| Modo de comunicación | Web Serial | Puerto serie del sistema |
| Uso sin conexión | No compatible; la página requiere Internet | Compatible |
| Protocolo y lecturas | Idénticos | Idénticos |

## 9. Preguntas frecuentes

**P1: Aparece «el navegador actual no admite Web Serial».**
Utilice Chrome, Edge u Opera de escritorio. Safari, Firefox y los navegadores móviles no implementan Web Serial.

**P2: Tras hacer clic en «Conectar puerto serie», no aparece ningún dispositivo en la ventana emergente.**
Compruebe si el controlador USB a TTL está instalado y si el cable de datos admite transferencia de datos; pruebe con otro puerto USB o vuelva a conectar el cable.

**P3: La conexión falla.**
Confirme que el puerto serie no esté ocupado por otro programa (asistente de puerto serie, Arduino IDE, etc.) y que el dispositivo esté encendido.

**P4: El LED no se enciende tras hacer clic en «Iniciar adquisición».**
Confirme que VCC esté conectado a 5V y no a 3,3V, y compruebe si TX/RX están conectados de forma cruzada.

**P5: Los datos muestran siempre -1.**
Confirme que ha hecho clic en «Iniciar adquisición», que el dedo cubre por completo la zona óptica del sensor y que se mantiene estable durante unos segundos.

**P6: El dispositivo se ha desconectado.**
La página mostrará «dispositivo desconectado»; vuelva a enchufarlo y haga clic de nuevo en «Conectar puerto serie».

## 10. Precauciones

1. Conecte primero el sensor y después el USB.
1. El sensor debe alimentarse a 5V; con 3,3V puede no funcionar correctamente.
1. Durante la medición, cubra por completo la zona óptica con el dedo y no presione con fuerza.
1. Evite la luz intensa directa sobre el sensor.
1. El navegador solo autoriza un dispositivo de puerto serie a la vez; para varios dispositivos hay que conectarlos por separado.
