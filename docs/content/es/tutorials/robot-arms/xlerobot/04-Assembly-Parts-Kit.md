---
title: "Montaje del kit de piezas"
description: "Consejo"
---

# Montaje del kit de piezas

![Imagen 1](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/1.png)

Consejo

Si prefiere saltarse la diversión de apretar tornillos, también puede adquirir el [kit preensamblado](https://item.taobao.com/item.htm?ft=t&id=1002551208989&spm=a21dvs.23580594.0.0.47b32c1bwUlxLA&skuId=6088534920039) para los brazos seguidores SO101 compatible con Xlerobot.



## 🦾 Brazo robótico SO101

![Imagen 2](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/2.png)

> Si ya dispone de 2 brazos robóticos SO101 ensamblados con los servomotores configurados, omita esta sección.
> 
> 

- Construya 2 brazos robóticos SO101 siguiendo las [instrucciones de montaje paso a paso del SO101](https://juxitech.feishu.cn/wiki/HllBwhjJ1iayMdkUTGgcyKbgn8g), haciendo 2 brazos seguidores idénticos, equipados con 2 juegos de servomotores (todos con ID 1-6 anteriormente) para las 2 placas controladoras de servomotor.

- Añada la cámara de muñeca siguiendo esta [guía de instalación](https://juxitech.feishu.cn/wiki/LjJywf5ILihuwkkOboGcFx1Qnkc).

- Si dispone de almohadillas antideslizantes, puede pegarlas en la pinza.

## 一、Configurar los servomotores

||Cantidad|ID del servomotor|Uso|
|---|---|---|---|
|Servomotor Feetech STS3215-C018|3|7、8、9|Chasis rodante de ruedas omnidireccionales|
|Servomotor Feetech STS3215-C018|2|7、8|Kit de extremidad superior-torre de cámara|
|Cable prolongador de servomotor 90CM|2||Conectar el chasis rodante y la torre de cámara a la placa controladora del servomotor|

![Imagen 3](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/3.png)

> Como el repositorio de código oficial de lerobot actualmente no admite configuraciones de servomotor distintas del brazo robótico, utilizamos [Bambot](https://bambot.org/) en su lugar (funciona en Windows y Mac; en Linux es necesario ejecutar primero sudo chmod 666 /dev/ttyACM0).
> 
> 

```Plain Text
sudo chmod 666 /dev/ttyACM0
```

- Conecte los servomotores que desea configurar (uno por uno) a la placa controladora de servomotor y conecte la placa controladora de servomotor directamente a su ordenador.

- Acceda a la [página de configuración de servomotores de Bambot](https://bambot.org/feetech.js), establezca la conexión y escanee sus servomotores. 

![Imagen 4](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/4.png)

- Cambie el nombre de los ID de los servomotores según las instrucciones siguientes. 

![Imagen 5](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/5.png)

- Además de los brazos robóticos SO101, también necesita configurar dos juegos de servomotores para las 2 placas controladoras de servomotor:

    - Un juego para la **torre de cámara** (ID de servomotor: 7, 8)

    - Otro juego para el **chasis rodante de ruedas omnidireccionales** (ID de servomotor: 7, 8, 9).

- Consejo: escriba números en los servomotores con un rotulador y distinga los servomotores de las distintas placas (por ejemplo, L1-L8 y R1-R9).

## 🛒 Carrito

- En caso de que haya tirado el manual por accidente, [aquí tiene una copia](https://github.com/Vector-Wangel/XLeRobot/blob/main/others/Manuals_raskog_utility_cart.pdf).

![Imagen 6](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/6.png)

## 🧑‍🦼‍➡ Base con ruedas

> Si ya dispone de una base Lekiwi, retire la batería, los soportes de los servomotores, etc. En la placa inferior solo hay que instalar 3 servomotores con ruedas (conserve el cableado).
> 
> 

![Imagen 7](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/7.png)

**Nota**

No elija la placa equivocada; cada placa tiene un orden específico.

- Instale las ruedas omnidireccionales en la placa según la figura anterior.

    - Los ID de servomotor específicos deben instalarse en consecuencia.

- Tenga en cuenta que los conectores de las ruedas omnidireccionales necesitan 3 tornillos M4.

- Cablee los servomotores con normalidad según el [tutorial](https://github.com/SIGRobotics-UIUC/LeKiwi/blob/main/Assembly.md#2-bottom-plate-assembly); después, no conecte los cables de los servomotores a la placa controladora de servomotor, sino que debe utilizar el **cable prolongador de servomotor de 90CM** para conectarlos a la placa controladora de servomotor.

![Imagen 8](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/8.png)

- Instale la placa superior según la figura anterior.

- Deje el **cable prolongador de servomotor de 90CM** colgando; por ahora no lo saque del orificio de la placa superior.

![Imagen 9](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/9.png)

- Instale 3 conectores (alzas) en la placa superior según la figura anterior.

Consejo

Coloque la base Lekiwi con los conectores debajo del carrito y compruebe si ejerce suficiente presión sobre el carrito como para que sus cuatro ruedas sigan tocando el suelo. Si no es así, intente modificar el modelo 3D del conector ajustando ligeramente la escala del eje z directamente en el software de laminado (manteniendo sin cambios la escala de los ejes xy) y vuelva a imprimirlo.

![Imagen 10](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/10.png)

Consejo

De la vuelta al carrito para realizar el siguiente montaje.

- Ahora instale la base Lekiwi con los conectores en la parte inferior del carrito, con la placa más fina en el lado opuesto.

- Consulte las imágenes para encontrar la orientación de montaje necesaria según el índice del servomotor.

Nota

Esta nueva versión de hardware es compatible con la malla metálica del carrito; los 12 tornillos M3 deberían poder insertarse sin dificultad.

![Imagen 11](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/11.png)

- A continuación, pase los cables previamente prolongados desde abajo hacia arriba a través del carrito.

## 🦾 Base del brazo robótico

### Montaje de la base superior

14 tornillos hexagonales M3\*12

4 tornillos hexagonales M3\*16

![Imagen 12](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/12.png)

- El montaje es más fácil cuando la base está volteada.

### Montaje de la cabeza

①Primero utilice el cable prolongador de servomotor de 90CM (blanco y negro alternos) y el cable de servomotor (blanco, rojo y negro alternos) conectados al servomotor n.º 7.



②Utilice cuatro tornillos con arandela M2\*6 para fijar la cámara

![Imagen 13](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/13.png)

- Tenga en cuenta que, al instalar el disco del servomotor, no debe atornillar el orificio central del disco.

- Esto debería ser igual que los dos primeros pasos del [montaje del brazo robótico SO101](https://huggingface.co/docs/lerobot/so101#joint-1).

## 🧵 Cableado

Importante

Antes de sujetar la base superior al carrito, complete todo el cableado y la gestión de cables de la base superior, y coloque la Raspberry Pi en su carcasa.

![Imagen 14](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/14.png)

- Conecte el cable prolongador de servomotor de 90CM procedente de la **base Lekiwi** al **brazo robótico SO101 izquierdo** (esto convierte la base y el brazo en un Lekiwi).

- Conecte 2 **cables de datos USB-C a USB-A ** desde las 2 **placas controladoras de servomotor** a la **Raspberry Pi** (las 2 ranuras USB-A restantes son para las cámaras) o a la placa base Jetson.

- Conecte los 3 **cables de alimentación**: 2 **cables USB-C a DC (12V)** desde las 2 placas controladoras de servomotor y 1 **cable USB-C a USB-C** desde la **Raspberry Pi**, a los puertos de carga rápida PD de la fuente de alimentación. Cada puerto proporciona hasta 100W cuando se carga simultáneamente, y se ha comprobado que es suficiente para soportar el funcionamiento de la versión de 12V.

### 🔋 Colocar la batería 🛒

- Colóquela en cualquier lugar de la capa intermedia o inferior del carrito para mantener bajo el centro de gravedad. La batería tiene una base antideslizante y no se desliza con facilidad durante el funcionamiento normal.

- Por seguridad, manténgala en posición vertical.

- En caso de que también haya tirado el manual de la batería por accidente, [aquí tiene una copia](https://github.com/Vector-Wangel/XLeRobot/blob/main/others/Manual_Anker_SOLIX_C300_DC_Portable_Power_Station.pdf).

Importante

Para proteger las placas controladoras de servomotor, asegúrese de conectar los cables de alimentación en último lugar. Desconecte siempre los cables de alimentación cuando conecte o desconecte otros cables.

## 📸 Montaje final

### Instalar la base en el carrito

Importante

Antes de sujetar la base superior al carrito, complete todo el cableado y la gestión de cables de la base superior, y coloque la Raspberry Pi en su carcasa.

![Imagen 15](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/15.png)

- Tenga cuidado de no dañar la carcasa al introducir el borde del carrito en el enchufe de la carcasa.

- Para facilitar las pruebas, los brazos robóticos SO101 se sujetan directamente al carrito. Coloque la [base del brazo robótico](https://github.com/Vector-Wangel/XLeRobot/blob/main/3D_Models/3D_models_for_printing/XLeRobot_special/SO_5DOF_ARM100_Assemblybases.stl) en las dos esquinas de la capa superior del carrito y fíjela con **abrazaderas tipo F**.

- Si dispone de un carrete de cartón de filamento de Bambu Lab, no olvide colocarlo dentro para proporcionar un soporte estructural estable.

![Imagen 16](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/16.png)

Después de completar estos pasos, el XLeRobot debería estar bien ensamblado físicamente y listo para hacer algunas tareas domésticas.

![Imagen 17](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/17.png)

![Imagen 18](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/18.png)

Importante

Una vez que el XLeRobot esté completamente ensamblado, no lo empuje de un lado a otro como si fuera un carrito, ya que esto podría dañar los engranajes de los servomotores. En su lugar, cuando necesite moverlo manualmente, levante el robot (~12kg).

<RelatedProducts slugs="xlerobot" />
