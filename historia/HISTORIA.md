# EN CALIENTE · La historia completa (todas las versiones)

**Este documento es para editar a mano.** Aquí está todo el texto del juego,
versión por versión. Corrige, tacha, reescribe con tus palabras y las de tu
equipo. Cuando esté lista tu versión, me la pasas (o editas directamente
`game/story.js`) y yo la monto y la pruebo.

## Cómo funciona una escena

- Cada escena tiene un **id** (ej. `intro`), una **hora**, el **texto de la
  situación**, una **ilustración**, un **reloj** en segundos y **2 opciones**
  (izquierda y derecha en pantalla). Ya NO usamos tercera opción.
- Cada opción tiene: el **texto del botón**, cuánto mueve la **emoción**
  (-30 a +30) y el **tiempo** (-15 a 0), si es **impulso** 🔥, el **eco**
  (la frase que aparece tras elegir) y a qué escena **lleva** (`→`).
- **Si el reloj llega a 0**, el "timeout" decide: no decidir también es decidir.
- Los **finales** tienen tono (bueno / agridulce / oscuro), título, texto y moraleja.
- Ilustraciones disponibles: `juntas, mensaje, chat, pasillo, carpeta, usb,
  cafetera, escaleras, parqueadero, telefono, bano, escritorio, nomina,
  impresora, almuerzo, ascensor` (y puedo dibujar más si las necesitas).

## Regla de oro al editar

Toda opción debe llevar (`→`) a una escena o final que exista. Cada partida
debería tener 3 o 4 decisiones y durar ~3 minutos.

---

# VERSIÓN 4 · "EL VUELTO" (LA ELEGIDA — montada en el juego)

**Premisa:** el cajero te devuelve $50.000 de más. En casa esperan Emma (tu bebé, la leche a la mitad) y Coco (el perrito). La quincena llega el lunes. Devolverlo es lo correcto, y tu crisis es tan grande que suena absurdo devolverlo. Las dos ramas duelen: si lo guardas, cobra la conciencia; si lo devuelves, cobra la vida.

### Escena `intro`
**7:40 p.m. · viernes, salida del supermercado**  ·  ilustración: `caja`  ·  reloj: 25s

> Pagaste con veinte. El cajero nuevo, con la fila hasta los congeladores, te devolvió como si fueran setenta: cincuenta mil de más, doblados en tu mano. En el bolso, la leche de Emma marca la mitad. La quincena llega el lunes. Dizque.

**Opción 1:** Guardarlo y caminar.  🔥impulso
- emoción +14 · tiempo 0 · lleva a → `n2_guarda`
- eco: *El billete entra al bolsillo solito. Tú solo no lo sacas.*

**Opción 2:** Volver a la caja. Devolverlo.
- emoción -6 · tiempo -6 · lleva a → `n2_devuelve`
- eco: *La fila entera te ve devolverte. Alguien resopla.*

**Si el reloj llega a 0:** lleva a → `n2_guarda` (emoción +18)
- eco: *Te quedaste en la puerta hasta que el guarda te miró. Caminaste.*

---

### Escena `n2_guarda`
**8:05 p.m. · tienda de don Óscar**  ·  ilustración: `tienda`  ·  reloj: 20s

> Con el billete alcanza para todo: leche etapa dos, cuido para Coco, huevos. Don Óscar empaca y comenta, por comentar: «al cajerito nuevo del súper se lo descuentan del sueldo, ¿sí sabía? Así los reciben a todos».

**Opción 1:** Comprar todo. Emma y Coco primero.  🔥impulso
- emoción +8 · tiempo -4 · lleva a → `n3_casa`
- eco: *La bolsa pesa rico. El bolsillo también.*

**Opción 2:** Solo la leche. El resto se devuelve mañana.
- emoción -4 · tiempo -5 · lleva a → `n3_mitad`
- eco: *Treinta y dos mil doblados aparte, en el bolsillo chiquito.*

**Si el reloj llega a 0:** lleva a → `n3_casa` (emoción +10)
- eco: *Don Óscar ya había empacado todo. Pagaste sin mirar.*

---

### Escena `n3_casa`
**9:30 p.m. · tu casa**  ·  ilustración: `cuna`  ·  reloj: 20s

> Emma comió y duerme con el puño cerrado. Coco raspó el plato hasta dejarlo brillante. En el grupo del barrio, la vecina reenvía: «ojo, en el súper van a echar al muchacho de la caja 3 por un descuadre de $50.000». Tres caritas tristes.

**Opción 1:** Mañana devuelvo los cincuenta. Completos.
- emoción -6 · tiempo -6 · lleva a → `n4_reponer`
- eco: *Completos. Ya gastaste treinta y uno. Las cuentas no duermen.*

**Opción 2:** Callar. Mi bebé comió. Punto.  🔥impulso
- emoción +10 · tiempo 0 · lleva a → `n4_silencio`
- eco: *Silencias el grupo del barrio. El grupo sigue ahí.*

**Si el reloj llega a 0:** lleva a → `n4_silencio` (emoción +8)
- eco: *Escribiste y borraste tres respuestas. Ganó la borrada.*

---

### Escena `n3_mitad`
**6:50 a.m. · sábado, súper de la esquina**  ·  ilustración: `caja`  ·  reloj: 20s

> Llegaste con los treinta y dos mil que quedaron y un discurso ensayado. En la caja 3 no está el muchacho: hay una señora de moño. «¿Brayan? Hoy le hacen el descargo a las diez», dice, sin dejar de pasar códigos.

**Opción 1:** Esperar el descargo y entrar a contar todo.
- emoción -5 · tiempo -8 · lleva a → `n4_descargo`
- eco: *Dos horas en la panadería de enfrente, revolviendo el mismo tinto.*

**Opción 2:** Dejar los treinta y dos en un sobre. Sin nombre.  🔥impulso
- emoción +6 · tiempo -4 · lleva a → `n4_sobre`
- eco: *«Esto es del descuadre de ayer. Falta el resto. Perdón.»*

**Si el reloj llega a 0:** lleva a → `n4_descargo` (emoción +8)
- eco: *A las diez y diez seguías en la panadería. El tinto, frío.*

---

### Escena `n4_reponer`
**7:15 a.m. · sábado, compraventa La Milagrosa**  ·  ilustración: `nomina`  ·  reloj: 20s

> Para completar los cincuenta faltan diecinueve. Sobre el mostrador: tus argollas de grado. El señor las pesa sin ceremonia: «le doy veinticinco». Detrás tuyo, la fila del sábado tiene tu misma cara.

**Opción 1:** Empeñarlas. Devolver completo hoy.
- emoción -4 · tiempo -6 · lleva a → `fin_completos`
- eco: *El recibo rosado dice: plazo 30 días. Otra deuda con fecha.*

**Opción 2:** Devolver solo lo que hay. Y dar la cara.
- emoción -8 · tiempo -5 · lleva a → `fin_cara`
- eco: *Treinta y uno en billetes sueltos. Y tu nombre completo.*

**Si el reloj llega a 0:** lleva a → `fin_cara` (emoción +6)
- eco: *La fila te pasó por el lado. Volviste con las argollas puestas.*

---

### Escena `n4_silencio`
**jueves siguiente · 6:20 p.m. · parada del bus**  ·  ilustración: `parada`  ·  reloj: 20s

> Coco engordó. Emma estrena tarro de leche. En la parada, con una caja de cartón en las piernas, está el muchacho de la caja 3. Te reconoce: fuiste su última clienta. «¿Sí ve? Por cincuenta lucas», dice, sin rabia. Y sonríe.

**Opción 1:** Contarle. Ahí, en la parada.
- emoción -10 · tiempo -5 · lleva a → `fin_parada`
- eco: *No te insulta. Peor: te agradece por decírselo.*

**Opción 2:** «Qué injusticia», decir. Y mirar el celular.  🔥impulso
- emoción +12 · tiempo 0 · lleva a → `fin_callada`
- eco: *El bus llegó rapidito. Bendito bus.*

**Si el reloj llega a 0:** lleva a → `fin_callada` (emoción +8)
- eco: *Él mismo cambió de tema, hablando del aguacero. Te salvó la lluvia.*

---

### Escena `n4_descargo`
**10:20 a.m. · sábado, oficina del administrador**  ·  ilustración: `juntas`  ·  reloj: 20s

> Brayan, de civil, con la carpeta en las piernas. Cuentas todo: el billete, la leche, los treinta y dos que trajiste. Silencio. «El reglamento es el reglamento», dice el administrador, «pero esto cambia el descargo». Brayan no te mira.

**Opción 1:** Ofrecer pagar el resto por cuotas. Firmado.
- emoción -5 · tiempo -6 · lleva a → `fin_cuotas`
- eco: *Firmas al lado de Brayan. La misma mesa, dos deudas.*

**Opción 2:** «El error fue de la caja. Ya devolví lo que pude.»  🔥impulso
- emoción +10 · tiempo 0 · lleva a → `fin_reglamento`
- eco: *Cierto. Legal. El administrador asiente despacio, escribiendo.*

**Si el reloj llega a 0:** lleva a → `fin_cuotas` (emoción +6)
- eco: *El administrador decidió por todos: «descuento compartido». Nadie protestó.*

---

### Escena `n4_sobre`
**lunes · 7:30 a.m. · grupo del barrio**  ·  ilustración: `chat`  ·  reloj: 20s

> La quincena por fin cayó. En el grupo, la señora del moño publicó la foto del sobre: «apareció esto en la caja 3. Dios le pague a quien fue». Cuarenta respuestas. La vecina, que todo lo ve: «yo creo que fue alguien de por aquí 👀».

**Opción 1:** Completar hoy los dieciocho que faltan. Otro sobre.
- emoción -5 · tiempo -5 · lleva a → `fin_sobres`
- eco: *El segundo sobre pesa menos y cuesta más.*

**Opción 2:** No volver a ese súper. Nunca.  🔥impulso
- emoción +8 · tiempo 0 · lleva a → `fin_desvio`
- eco: *Queda el de la otra cuadra. Más caro. Más lejos. Más tranquilo.*

**Si el reloj llega a 0:** lleva a → `fin_desvio` (emoción +7)
- eco: *Dejaste el chat en visto. El 👀 se quedó mirándote.*

---

### Escena `n2_devuelve`
**7:52 p.m. · caja 3**  ·  ilustración: `caja`  ·  reloj: 20s

> El muchacho cuenta el billete dos veces y respira como si saliera de bucear. «Me salvaste el puesto», dice. El administrador te regala un imán de nevera: CLIENTE HONESTO ⭐. Sales con tus dieciocho mil y la lista imposible en la cabeza: leche, cuido, pañales.

**Opción 1:** Pedirle fiado a don Óscar. Otra vez.
- emoción -4 · tiempo -5 · lleva a → `n3_fiado`
- eco: *El cuaderno de don Óscar te espera en la A de «Apartamento 201».*

**Opción 2:** Estirar lo que hay: agua de panela y medio tarro.  🔥impulso
- emoción +8 · tiempo 0 · lleva a → `n3_estirar`
- eco: *La calculadora del celular da lo mismo por tercera vez.*

**Si el reloj llega a 0:** lleva a → `n3_estirar` (emoción +8)
- eco: *Caminaste derecho a la casa, con el imán en el bolso.*

---

### Escena `n3_fiado`
**8:20 p.m. · tienda de don Óscar**  ·  ilustración: `tienda`  ·  reloj: 20s

> Don Óscar apunta la leche y el cuido en el cuaderno, sin cara de nada. «Va en ciento doce, mija». Lo dice bajito, pero la señora de las empanadas alcanza a oír. Afuera, amarrado, Coco mueve la cola por los dos.

**Opción 1:** «Apunte también unos huevos.» Frente en alto.
- emoción -4 · tiempo -4 · lleva a → `n4_fiebre`
- eco: *Deber con la frente en alto también es una técnica.*

**Opción 2:** Solo la leche. Coco come sobras esta semana.  🔥impulso
- emoción +6 · tiempo 0 · lleva a → `n4_fiebre`
- eco: *Coco mueve la cola igual. Los perros no leen cuadernos.*

**Si el reloj llega a 0:** lleva a → `n4_fiebre` (emoción +5)
- eco: *Don Óscar apuntó lo de siempre. Él ya se sabe tu lista.*

---

### Escena `n3_estirar`
**2:40 a.m. · tu casa**  ·  ilustración: `cuna`  ·  reloj: 20s

> Emma se despertó dos veces. El tarro quedó en cucharaditas raspadas. Coco, que entiende todo, no pidió. En el celular: «quincena consignada el lunes festivo = martes». Martes. El imán brilla con la luz del corredor: CLIENTE HONESTO ⭐.

**Opción 1:** Escribirle a tu hermana. Tragarse el orgullo.
- emoción -8 · tiempo -4 · lleva a → `n4_fiebre`
- eco: *«Yo te consigno mañana, boba. Para eso estamos.»*

**Opción 2:** Nadie tiene que saber cómo estás. Aguantar.  🔥impulso
- emoción +10 · tiempo 0 · lleva a → `n4_fiebre`
- eco: *El orgullo no alimenta, pero acompaña.*

**Si el reloj llega a 0:** lleva a → `n4_fiebre` (emoción +8)
- eco: *Te dormiste sentada, con el mensaje escrito y sin enviar.*

---

### Escena `n4_fiebre`
**domingo · 7:10 a.m. · tu casa**  ·  ilustración: `fiebre`  ·  reloj: 20s

> Emma amanece hirviendo: 38,9. La EPS contesta con menú de opciones y da cita para el otro jueves. El pediatra del centro comercial atiende hoy: sesenta mil. Anteayer tuviste cincuenta en la mano. Lo pensaste. Claro que lo pensaste. Coco no se despega de la cuna.

**Opción 1:** Urgencias de la EPS. La fila que toque.
- emoción +6 · tiempo -10 · lleva a → `fin_urgencias`
- eco: *Turno 47. Van por el 12. Emma se duerme en tu pecho.*

**Opción 2:** Empeñar el celular. Pediatra hoy mismo.  🔥impulso
- emoción -4 · tiempo -6 · lleva a → `fin_pediatra`
- eco: *«Le doy setenta.» El chip queda en un teléfono prestado.*

**Si el reloj llega a 0:** lleva a → `fin_urgencias` (emoción +8)
- eco: *La fiebre bajó un poco con pañitos. La duda no.*

---

## Finales (10)

### `fin_completos` · Cincuenta completos, argollas menos  (tono: agridulce)
> Devolviste los cincuenta antes de que empezara el descargo. Brayan conservó el puesto y nunca supo tu nombre. En tu monedero vive un recibo rosado que vence en treinta días, y en tu mano, la marca clarita donde iban las argollas. Emma comió toda la semana. Eso también cuenta. Eso es lo que cuenta.

*Moraleja:* Devolver tarde cobra unos intereses que no salen en ningún extracto.  ·  ilustración: `nomina`

---

### `fin_cara` · Con nombre y apellido  (tono: bueno)
> Devolviste treinta y uno y diste la cara: «lo demás lo pago por quincenas». El administrador anotó; tu palabra sirvió de descargo y a Brayan no lo echaron. Don Óscar se enteró, como se entera de todo, y ahora te guarda el pan de ayer, «que sale más barato y sabe igual». El barrio tiene buena memoria.

*Moraleja:* La plata volvió incompleta; tu nombre volvió entero.  ·  ilustración: `tienda`

---

### `fin_parada` · La deuda de la parada  (tono: agridulce)
> Se lo contaste con la caja de cartón entre los dos. Te dio las gracias por decírselo, y eso fue peor que cualquier insulto. Cada quincena le consignas diez mil a su Nequi, sin que nadie te obligue, hasta completar. Emma y Coco están bien. El bus de las 6:20 ya no lo tomas: te dio por caminar.

*Moraleja:* Hay deudas que no prescriben porque una no las deja.  ·  ilustración: `parada`

---

### `fin_callada` · Los vueltos, dos veces  (tono: oscuro)
> No dijiste nada y la vida siguió: Coco gordo, Emma sana, la quincena al fin en la cuenta. Al súper de la esquina no volviste. Y te quedó una maña que nadie más nota: cada vez que un cajero te da vueltas, las cuentas dos veces, despacio, como esperando que sobre algo para poder devolverlo.

*Moraleja:* Lo que callaste no desapareció: se mudó a los vueltos.  ·  ilustración: `caja`

---

### `fin_cuotas` · Dos firmas en la misma mesa  (tono: bueno)
> Firmaste un acuerdo de pago al lado de Brayan: tú, los diecinueve que faltaban; él, nada, porque tu descargo lo salvó. Pagaste en dos quincenas. Ahora los sábados te guarda el turno en la caja 3 y pregunta por Emma mirando tu bolso, donde siempre asoma algo: el pan, la leche, y desde hace poco, el imán. Al final sí te lo dieron.

*Moraleja:* Firmar tu error junto al que casi lo paga: eso también es plata.  ·  ilustración: `juntas`

---

### `fin_reglamento` · Legalmente impecable  (tono: oscuro)
> Dijiste la frase correcta: el error fue de la caja. Cierto, legal, irrefutable. El reglamento hizo el resto: a Brayan le descontaron la diferencia en dos quincenas. A ti te agradecieron «el gesto» delante de todos. El imán de CLIENTE HONESTO te lo ganaste ese día. Lo botaste en la primera caneca, sin bajar el paso.

*Moraleja:* Tener la razón salió gratis. Para ti.  ·  ilustración: `caja`

---

### `fin_sobres` · El ángel de la caja 3  (tono: agridulce)
> El segundo sobre completó la plata y el barrio completó la historia: «el ángel de la caja 3», le dicen. Brayan conservó el puesto sin saber a quién agradecerle. Solo la vecina te mira distinto en el ascensor, con ese 👀 que no necesita palabras. Nunca ha dicho nada. Tú tampoco. Ese silencio es el trato.

*Moraleja:* El anónimo también paga completo, pero nunca descansa.  ·  ilustración: `chat`

---

### `fin_desvio` · Tres cuadras más lejos  (tono: oscuro)
> El súper de la otra cuadra es más caro y no fía. El desvío son tres cuadras de ida y tres de vuelta, con mercado y con Coco. Un día Emma, ya caminando, jala hacia la esquina de siempre: «¿por qué nunca entramos a ese?». Le inventas algo de la fila. Ella te cree. Por ahora te cree.

*Moraleja:* El silencio no se paga de una: se paga en cuadras, todos los días.  ·  ilustración: `pasillo`

---

### `fin_urgencias` · Turno 47  (tono: agridulce)
> Seis horas de sala de espera para oír «virosis, suero y pañitos». Emma amaneció mejor el martes, el mismo día de la quincena. Don Óscar tachó la deuda sin ceremonia. El imán sigue en la nevera: unos días te da rabia mirarlo y otros días no, y todavía no sabes cuáles días tienen la razón.

*Moraleja:* Devolverlo fue lo correcto. Nadie prometió que lo correcto llegara con pediatra.  ·  ilustración: `fiebre`

---

### `fin_pediatra` · El chip prestado  (tono: agridulce)
> Empeñaste el celular sin pensarlo dos veces: pediatra, antibiótico, Emma dormida a las ocho. En el teléfono prestado las fotos se ven chiquitas. A los cuarenta días lo recuperaste. En el súper, Brayan te guarda las promociones «de buena clienta», y no sabe que la buena clienta hace cuentas con el corazón en la mano desde ese viernes.

*Moraleja:* La honestidad no te prestó plata: te fio la gente que la vio.  ·  ilustración: `telefono`

---


---
---

# VERSIÓN 3 · "La vaca de Marcela" (la que está montada ahora — la que NO te gustó)

### Escena `intro`
**8:52 a.m. · martes 22, tu escritorio**  ·  ilustración: `chat`  ·  reloj: 25s

> En «Regalo Marcela 🤫»: «Jime, pásanos cuentas hoy que mañana es la entrega». El sobre de manila del cajón: 262.000. Recogiste 300.000. Los 38.000 se los llevó un Rappi un viernes sin efectivo; repones el 30, con la quincena. Hoy es 22. Tres 🙌 y Lorena: «¿nos pasas el Excel con todo?». El Excel lo hiciste tú. Como siempre.

**Opción 1:** Escribir la verdad: me colgué, el 30 repongo.
- emoción -10 · tiempo -8 · lleva a → `n2_confiesa`
- eco: *Enviado. El chat queda «en línea», sin escribir, cuatro minutos.*

**Opción 2:** Conseguir 38.000 hoy. De donde sea.  🔥impulso
- emoción +10 · tiempo -6 · lleva a → `n2_plata`
- eco: *«Cuentas esta tarde 👍», respondes. El pulgar apenas te tiembla.*

**Opción 3:** Abrir el Excel. Los números se acomodan.  🔥impulso
- emoción +15 · tiempo -5 · lleva a → `n2_excel`
- eco: *La celda D14 parpadea. Tú también.*

**Si el reloj llega a 0:** lleva a → `n2_excel` (emoción +18)
- eco: *Escribiste «ya casi 😊» y abriste el Excel. El 😊 pesó.*

---

### Escena `n2_confiesa`
**9:36 a.m. · tu escritorio**  ·  ilustración: `mensaje`  ·  reloj: 20s

> Lo mandaste. Cuatro minutos de silencio y luego Lorena: «tranquila, todas tenemos meses duros ✨». Nadie más escribe. Sandra te mira por encima de las pantallas, dos segundos, y vuelve a lo suyo. Marcela, que no está en el grupo, te manda un meme de gatos por privado. El sobre queda abierto sobre el teclado.

**Opción 1:** Pantallazo del Rappi: que vean qué fue.  🔥impulso
- emoción +5 · tiempo -6 · lleva a → `n3_lorena`
- eco: *Hamburguesa doble, viernes 11:48 p.m. Lorena responde: «jaja ok».*

**Opción 2:** «Mañana llevo los 38 completos, cuenten con eso.»  🔥impulso
- emoción +6 · tiempo -6 · lleva a → `n3_frente`
- eco: *Lo mandas sin saber de dónde van a salir.*

**Opción 3:** Escribirle a Sandra por privado. Solo a ella.
- emoción -5 · tiempo -6 · lleva a → `n3_sandra`
- eco: *Sandra responde con un punto. Luego: «cafetera, 3:15».*

**Si el reloj llega a 0:** lleva a → `n3_lorena` (emoción +12)
- eco: *Tu confesión quedó arriba, sola, entre dos stickers de fiesta.*

---

### Escena `n2_plata`
**12:40 p.m. · centro comercial, hora de almuerzo**  ·  ilustración: `nomina`  ·  reloj: 20s

> Saliste «a almorzar» y estás en la fila del cajero con la tarjeta en la mano. El banco cobra por avance: pantalla chiquita, letra chiquita, comisión grande. Adelante, un señor lleva siete minutos. En el grupo, Lorena: «¿entonces esta tarde sí, Jime?». El sobre quedó en el cajón, con llave.

**Opción 1:** Avance de 40. Que cobre el banco.  🔥impulso
- emoción +8 · tiempo -6 · lleva a → `n3_cuadrada`
- eco: *Recibo: avance 40.000, comisión 24.900. El papel tiembla.*

**Opción 2:** Guardar la tarjeta. Escribirle a Sandra, la de nómina.
- emoción -5 · tiempo -6 · lleva a → `n3_sandra`
- eco: *Le escribes desde la fila. «Cafetera, 3:15», responde.*

**Opción 3:** Salir de la fila y escribir la verdad.
- emoción -8 · tiempo -7 · lleva a → `n3_frente`
- eco: *Lo escribes ahí, de pie, junto al de los helados.*

**Si el reloj llega a 0:** lleva a → `n3_sandra` (emoción +12)
- eco: *«Fuera de servicio» en tu turno. Terminas escribiéndole a Sandra, la de nómina.*

---

### Escena `n2_excel`
**9:58 a.m. · tu escritorio**  ·  ilustración: `escritorio`  ·  reloj: 20s

> El Excel en blanco. Recogido: 300.000. La freidora apartada donde doña Ángela: 262.000. Quedan 38.000 que el grupo cree que existen. Escribes 300.000 en la celda del regalo y todo cierra. Enviar. Lorena, al minuto: «quedó como caro ¿no? 😅 pásame la factura, que quiero regalarle lo mismo a mi mamá».

**Opción 1:** Ir donde doña Ángela por una factura «ajustada».
- emoción +10 · tiempo -6 · lleva a → `n3_vendedora`
- eco: *Apuntas la dirección del pasaje. Ensayas la frase toda la tarde.*

**Opción 2:** Nuevo rubro: «envoltura y tarjeta personalizada, 38.000».  🔥impulso
- emoción +8 · tiempo -5 · lleva a → `n3_rubro`
- eco: *La celda lo acepta sin preguntar. Las celdas son así.*

**Opción 3:** Borrar todo y escribir: «me colgué con 38».
- emoción -10 · tiempo -8 · lleva a → `n3_frente`
- eco: *Ctrl+Z hasta el principio. Luego la verdad, sin formato.*

**Si el reloj llega a 0:** lleva a → `n3_rubro` (emoción +12)
- eco: *«Ahora te la paso», escribiste. Ese «ahora» empezó a crecer.*

---

### Escena `n3_lorena`
**10:45 a.m. · cafetera del tercer piso**  ·  ilustración: `cafetera`  ·  reloj: 20s

> Lorena revuelve su aromática. «De verdad, tranquila», dice, con la cucharita dando vueltas. «Solo que el Excel quede clarito: qué se recogió, qué falta y desde cuándo». Desde cuándo. En la nevera, el tupper de Marcela con su nombre en cinta. Mañana a las 10:30 cortan la torta.

**Opción 1:** «Mañana llego con los 38 completos.»  🔥impulso
- emoción +8 · tiempo -6 · lleva a → `n4_torta_sandra`
- eco: *«Así da gusto», dice Lorena. Esa tarde le pides los cuarenta a Sandra.*

**Opción 2:** Proponer en el grupo: compramos con lo que hay.
- emoción -10 · tiempo -7 · lleva a → `n4_torta_paz`
- eco: *«Como te parezca, tú eres la que sabe ✨», escribe Lorena.*

**Opción 3:** Responder el ✨ con otro ✨ y aguantar.
- emoción -3 · tiempo -5 · lleva a → `n4_torta_paz`
- eco: *Dos brillitos en pantalla. Ninguno brilla.*

**Si el reloj llega a 0:** lleva a → `n4_torta_paz` (emoción +10)
- eco: *Lorena se fue con su taza. Tu tinto se enfrió esperándote.*

---

### Escena `n3_frente`
**8:20 p.m. · tu apartamento**  ·  ilustración: `nomina`  ·  reloj: 20s

> Cuentas sobre la mesa del comedor: 9.200 en monedas y un billete arrugado, la tarjeta con cupo, el simulador del banco abierto en «avance en efectivo». Ya dijiste la verdad en el grupo; falta decidir con qué cara llegas mañana. Lorena fijó un mensaje: «entrega 10:30, puntualidad porfa 🎂». El chat de Sandra, la de nómina, abierto y en blanco.

**Opción 1:** Llegar con lo que hay y deber hasta el 30.
- emoción -8 · tiempo -6 · lleva a → `n4_torta_paz`
- eco: *La bolsita de monedas suena a lo que es.*

**Opción 2:** Avance en el cajero, esta noche, llegar completa.  🔥impulso
- emoción +10 · tiempo -7 · lleva a → `n4_torta_deuda`
- eco: *El cajero escupe dos billetes. Comisión: 24.900.*

**Opción 3:** «Sandra, ¿me salvas hasta el 30?»
- emoción +3 · tiempo -6 · lleva a → `n4_torta_sandra`
- eco: *Responde a la primera: «mañana se los llevo. Tranquila».*

**Si el reloj llega a 0:** lleva a → `n4_torta_paz` (emoción +8)
- eco: *Te dormiste con la calculadora prendida. Mañana, con lo que hay.*

---

### Escena `n3_sandra`
**3:15 p.m. · cafetera del tercer piso**  ·  ilustración: `almuerzo`  ·  reloj: 20s

> Sandra llega con su termo y sin preguntas. Espera a que la practicante se vaya con su yogur. «¿Cuánto le falta?», dice, y saca del bolso dos billetes de veinte doblados en cuatro: la plata del mercado. «Me los devuelve el 30 y de esto ni un audio». El microondas pita tres veces.

**Opción 1:** Recibirlos. «El 30, lo juro.»
- emoción -5 · tiempo -5 · lleva a → `n4_torta_sandra`
- eco: *Los billetes tibios del bolso. Cuarenta mil; sobran dos.*

**Opción 2:** No recibirlos. Decir la verdad en el grupo.
- emoción -10 · tiempo -7 · lleva a → `n4_torta_paz`
- eco: *Sandra guarda la plata. Esa tarde escribes la verdad al grupo.*

**Opción 3:** Recibirlos y ofrecerle 45 el 30.  🔥impulso
- emoción +5 · tiempo -5 · lleva a → `n4_torta_sandra`
- eco: *«¿Me está pagando intereses, Jimena?» No sonríe.*

**Si el reloj llega a 0:** lleva a → `n4_torta_paz` (emoción +10)
- eco: *Guardó los billetes: «usted verá». Esa noche escribes la verdad.*

---

### Escena `n3_cuadrada`
**4:20 p.m. · tu escritorio**  ·  ilustración: `carpeta`  ·  reloj: 20s

> El sobre otra vez en 300.000, con dos billetes que huelen a cajero. Pasas el Excel: recogido 300, freidora apartada 262, sobrante 38 para gaseosas y bombas. Todo cierra porque tú lo tapaste. Lorena responde de una: «uy, juiciosa 👏 ¿me pasas la factura cuando la recojas? Quiero regalarle lo mismo a mi mamá».

**Opción 1:** «Claro, mañana te la mando 👍»
- emoción -3 · tiempo -5 · lleva a → `n4_torta_deuda`
- eco: *Un chulo, dos chulos, azules. Nadie sabe nada.*

**Opción 2:** Contarle a Sandra lo del avance. A alguien.
- emoción -6 · tiempo -6 · lleva a → `n4_torta_deuda`
- eco: *«¿24.900 de comisión?», dice Sandra, como quien dice culebras.*

**Opción 3:** Sacar los billetes del sobre y confesar los 38.
- emoción -8 · tiempo -7 · lleva a → `n4_torta_paz`
- eco: *Devuelves el avance esa tarde. La comisión, esa sí, ya es tuya.*

**Si el reloj llega a 0:** lleva a → `n4_torta_deuda` (emoción +8)
- eco: *Le diste «me gusta» a su mensaje y apagaste el computador.*

---

### Escena `n3_vendedora`
**6:15 p.m. · local de doña Ángela, pasaje del centro**  ·  ilustración: `impresora`  ·  reloj: 20s

> Doña Ángela envuelve la freidora en papel globo mientras su nieta hace tareas en el mostrador. Sacas la frase ensayada: que si la factura puede salir «por trescientos, por una cosa de la oficina». Deja de envolver. «¿Y eso pa' qué, mija? Yo facturo lo que cobro». El talonario está ahí, con su papel carbón y todo.

**Opción 1:** «Hágamela por 300 y quédese con 10.»  🔥impulso
- emoción +12 · tiempo -6 · lleva a → `n4_torta_factura`
- eco: *Escribe despacio, sin mirarte. El carbón copia todo dos veces.*

**Opción 2:** «Démela sin valor, yo la lleno.»  🔥impulso
- emoción +10 · tiempo -5 · lleva a → `n4_torta_factura`
- eco: *Te la entrega en blanco. «Eso ya es cosa suya».*

**Opción 3:** «Nada, no importa. La real está bien.»
- emoción -10 · tiempo -6 · lleva a → `n4_torta_paz`
- eco: *El moño queda lindo. Esa noche, el Excel dice la verdad.*

**Si el reloj llega a 0:** lleva a → `n4_torta_rubro` (emoción +10)
- eco: *Entró otra clienta. Esa noche el Excel estrena rubro: «envoltura, 38.000».*

---

### Escena `n3_rubro`
**4:50 p.m. · tu escritorio**  ·  ilustración: `carpeta`  ·  reloj: 20s

> El rubro quedó: «envoltura y tarjeta personalizada: 38.000». Enviado. Lorena responde con la foto de un puesto de envolturas: «¿38? ¿dónde, para no ir? 😂 en el de la 14 cobran seis». Alguien manda un jajaja. Marcela, por privado, sin saber nada: «gracias por organizar todo, Jime 💛».

**Opción 1:** «Es artesanal, con caligrafía. Por eso.»  🔥impulso
- emoción +10 · tiempo -5 · lleva a → `n4_torta_rubro`
- eco: *«Ahh ok», escribe Lorena. Ese «ahh» tiene doble fondo.*

**Opción 2:** Bajarlo a 15 y repartir el resto en «varios».  🔥impulso
- emoción +8 · tiempo -6 · lleva a → `n4_torta_rubro`
- eco: *Versión 3 del Excel. El historial las guarda todas.*

**Opción 3:** Borrar el rubro y escribir la verdad.
- emoción -10 · tiempo -8 · lleva a → `n4_torta_paz`
- eco: *«Me colgué con 38. El 30 repongo». Enviar.*

**Si el reloj llega a 0:** lleva a → `n4_torta_rubro` (emoción +12)
- eco: *Dejaste el jajaja en visto. El rubro se quedó quieto, esperando.*

---

### Escena `n4_torta_paz`
**10:30 a.m. · miércoles 23, sala de juntas**  ·  ilustración: `juntas`  ·  reloj: 20s

> La freidora, con su moño, hace llorar a Marcela antes de abrirla. «Yo sé lo que costó», dice, mirándolos a todos, y a ti de últimas. El Excel con la verdad lleva horas en el grupo. Lorena corta la torta y, con el cuchillo en la mano: «al final cuadró todo, ¿no, Jime?».

**Opción 1:** «Cuadró porque lo conté a tiempo.»
- emoción -5 · tiempo -5 · lleva a → `fin_ganada`
- eco: *Lorena te sirve porción de primeras. Con rosita y todo.*

**Opción 2:** Sonreír, repartir servilletas, no dar papaya.
- emoción -3 · tiempo -5 · lleva a → `fin_lunes`
- eco: *La torta es de milo. Nadie vuelve al tema. Hoy.*

**Opción 3:** «El Rappi más caro de mi vida.»  🔥impulso
- emoción +5 · tiempo -4 · lleva a → `fin_ganada`
- eco: *Se ríen de verdad. Hasta Lorena, con torta en la boca.*

**Si el reloj llega a 0:** lleva a → `fin_lunes` (emoción +6)
- eco: *Repartiste tenedores, callada. La pregunta flotó y se fue.*

---

### Escena `n4_torta_deuda`
**10:30 a.m. · miércoles 23, sala de juntas**  ·  ilustración: `telefono`  ·  reloj: 20s

> El sobre cerró en 300 y en la sala nadie pregunta cómo. Marcela abraza la freidora: «yo sé lo que costó, con este año tan duro». Tu celular vibra contra la pierna: «Compra AVANCE T.CRÉDITO. Pago mínimo: 21/08». Lorena reparte torta contenta: los números cuadraron perfecto. El extracto que viene es asunto tuyo.

**Opción 1:** Sostener la sonrisa. La deuda es tuya, privada.
- emoción +5 · tiempo -5 · lleva a → `fin_deuda`
- eco: *Volteas el celular boca abajo. Aplaudes con todos.*

**Opción 2:** Decirlo esta noche en el grupo, ya repuesto.
- emoción -6 · tiempo -6 · lleva a → `fin_lunes`
- eco: *Redactas mentalmente mientras cantan el feliz cumpleaños.*

**Opción 3:** Diferir el avance a 24 cuotas desde el baño.  🔥impulso
- emoción +8 · tiempo -6 · lleva a → `fin_deuda`
- eco: *Tres clics entre el lavamanos y el secador. Listo. Invisible.*

**Si el reloj llega a 0:** lleva a → `fin_deuda` (emoción +6)
- eco: *El celular vibró tres veces más. Lo dejaste bocabajo, cantando.*

---

### Escena `n4_torta_sandra`
**10:30 a.m. · miércoles 23, sala de juntas**  ·  ilustración: `juntas`  ·  reloj: 20s

> Los cuarenta mil de Sandra ya duermen en el sobre; sobraron dos mil que no sabes dónde poner. Marcela llora con la freidora y Sandra te mira desde el otro lado de la torta, con su pedazo intacto. Lorena, celular en mano, repasa el Excel por deporte. «Quedó bonito», dice. No dice qué.

**Opción 1:** Decirlo: faltaba plata, Sandra me salvó, pago el 30.
- emoción -8 · tiempo -6 · lleva a → `fin_deuda_publica`
- eco: *Silencio con torta. Marcela: «eso también costó». Sandra asiente.*

**Opción 2:** Callar y pagarle el 30, cumplida, en efectivo.
- emoción -3 · tiempo -5 · lleva a → `fin_treinta`
- eco: *Sandra por fin prueba su pedazo. No te mira más.*

**Opción 3:** Evitar su mirada. Concentrarse en la torta.  🔥impulso
- emoción +10 · tiempo -5 · lleva a → `fin_fria_sandra`
- eco: *El glaseado, las velitas, el mantel. Cualquier cosa menos Sandra.*

**Si el reloj llega a 0:** lleva a → `fin_fria_sandra` (emoción +8)
- eco: *Sandra dejó su pedazo a medias y volvió al puesto.*

---

### Escena `n4_torta_factura`
**10:30 a.m. · miércoles 23, sala de juntas**  ·  ilustración: `telefono`  ·  reloj: 20s

> La factura por 300.000 circula pegada al Excel. Marcela, conmovida: «yo sé lo que costó». Lorena tiene el celular en la mano y en la pantalla, abierta, la misma freidora en Falabella: $262.900, envío gratis. Sube el celular apenas un poco. «Qué raro», dice, dulce. «Aquí está más barata».

**Opción 1:** «A nosotras nos costó eso. Cosas del local.»  🔥impulso
- emoción +12 · tiempo -5 · lleva a → `fin_grupo_nuevo`
- eco: *Lorena guarda el celular sonriendo. Guarda también otra cosa.*

**Opción 2:** «Hoy es de Marcela. Luego revisamos, ¿sí?»
- emoción +8 · tiempo -5 · lleva a → `fin_auditoria`
- eco: *«Obvio», dice Lorena, y se anota algo mental. Todos lo ven.*

**Opción 3:** Soltarlo todo, con la torta servida.
- emoción -10 · tiempo -7 · lleva a → `fin_tarde`
- eco: *«La factura la pedí yo. Faltaban 38. Míos». Silencio largo.*

**Si el reloj llega a 0:** lleva a → `fin_descubierta` (emoción +12)
- eco: *No dijiste nada. Lorena giró la pantalla hacia Marcela.*

---

### Escena `n4_torta_rubro`
**10:30 a.m. · miércoles 23, sala de juntas**  ·  ilustración: `juntas`  ·  reloj: 20s

> Marcela lee la tarjeta del regalo en voz alta: «Feliz cumple, te queremos». Letra de esfero, papel de siempre. «¿Esta es la tarjeta personalizada del Excel?», pregunta la practicante, sin maldad, con el archivo abierto en el celular. Lorena no dice nada. Lorena ya googleó cuánto vale una envoltura.

**Opción 1:** «La caligrafía la cobraron aparte. Es sutil.»  🔥impulso
- emoción +12 · tiempo -5 · lleva a → `fin_grupo_nuevo`
- eco: *La practicante acerca la tarjeta a la cara. Buscando la caligrafía.*

**Opción 2:** Soltar la verdad, con la torta servida.
- emoción -10 · tiempo -7 · lleva a → `fin_tarde`
- eco: *«No hay envoltura de 38. Hubo un Rappi. Mío». Ya.*

**Opción 3:** «Error de celda. Ahorita lo corrijo.»  🔥impulso
- emoción +8 · tiempo -5 · lleva a → `fin_auditoria`
- eco: *Versión 5 del Excel, desde el baño. El historial anota.*

**Si el reloj llega a 0:** lleva a → `fin_descubierta` (emoción +10)
- eco: *Marcela guardó la tarjeta despacio, mirándote solo a ti.*

---

## Finales (10)

### `fin_ganada` · Cuentas claras  (tono: bueno)
> El 30, día de quincena, el último peso de los 38.000 cae al fondo antes del café. Pantallazo al grupo, sin mensaje. Lorena responde: «juiciosa 💪». En diciembre, cuando arman la vaca de fin de año, el mensaje llega solito: «Jime, ¿nos manejas la plata?». Aceptas. Esta vez el sobre de manila vive en el cajón con llave, y los Rappi de viernes salen de tu Nequi.

*Moraleja:* Un descuadre confesado el martes es anécdota; descubierto el miércoles, expediente.  ·  ilustración: `nomina`

---

### `fin_deuda_publica` · Costó y se dijo  (tono: bueno)
> Lo dijiste con el cuchillo de la torta todavía en la mesa y nadie se murió. Marcela repitió «eso también costó» y Lorena, por una vez, no agregó nada. El 30 le pagas a Sandra delante de la cafetera, billetes contados, y el jueves te guarda puesto en la mesa de siempre. En diciembre la vaca tiene dos administradoras: tú y Sandra. Por votación.

*Moraleja:* Deber en voz alta fue lo único que te subió el crédito.  ·  ilustración: `cafetera`

---

### `fin_lunes` · La porción sin rosita  (tono: agridulce)
> Nadie volvió a tocar el tema. En voz alta. Los 38.000 quedaron repuestos hasta el último peso y el Excel muere en paz en una carpeta que nadie abre. Pero en la vaca de diciembre la plata la maneja Lorena, «para rotar responsabilidades», y a ti te toca comprar las bombas. Marcela usa la freidora cada semana y manda fotos de papas al grupo. Les das pulgar arriba.

*Moraleja:* La confianza no se pierde de golpe: se rota, como las responsabilidades.  ·  ilustración: `cafetera`

---

### `fin_deuda` · El hueco cambió de dueño  (tono: agridulce)
> Nadie miró tu celular. La vaca cerró perfecta, Marcela guardó el moño de recuerdo y Lorena archivó el Excel como ejemplo de transparencia. El avance lo pagas en cuotas: 38.000 se volvieron 63.000 entre comisión e intereses. Cada extracto llega un 21. Cada 21 te acuerdas del Rappi, de la hamburguesa, del viernes. Estaba buena, eso sí.

*Moraleja:* El banco te fía el silencio al 3,1% mensual.  ·  ilustración: `telefono`

---

### `fin_treinta` · Paz y salvo  (tono: agridulce)
> El 30, a las 9:02, le entregas a Sandra un sobre chiquito: los treinta y ocho que tapó y los dos mil que sobraron, cuarenta justos. Los cuenta de un vistazo, sin contar. Cumplida, exacta, sin intereses. Siguen almorzando juntas los jueves, pero cuando alguien habla de plata en la mesa, Sandra revuelve la sopa y te deja hablar a ti primero.

*Moraleja:* Pagaste los cuarenta exactos; el antecedente quedó en cuenta aparte.  ·  ilustración: `almuerzo`

---

### `fin_tarde` · Con la torta servida  (tono: agridulce)
> Lo dijiste tarde, pero lo dijiste tú. Marcela habló primero: «por 38.000 no se daña un cumpleaños». Se comieron la torta, un poco en silencio. El 30 repusiste, con pantallazo. Nadie te sacó el tema otra vez, aunque Lorena guardó tu mensaje con estrellita, y tú lo sabes porque a veces la ves buscándolo. La freidora, eso sí, quedó perfecta.

*Moraleja:* Confesar cuando ya te vieron no borra la deuda: apenas rebaja la multa.  ·  ilustración: `juntas`

---

### `fin_fria_sandra` · El pedazo intacto  (tono: oscuro)
> Le pagaste el 30, puntual, por Nequi, sin mirarla. Sandra respondió «recibido». Desde entonces almuerza con las de contabilidad y a ti te saluda con la cabeza, cordial, como se saluda al de la fotocopiadora. Nunca contó nada a nadie, y eso es lo peor: el cobro fue la silla vacía del jueves, todos los jueves, sin fecha de vencimiento.

*Moraleja:* Te prestó sin preguntas y le pagaste sin mirarla: quedaron en ceros.  ·  ilustración: `almuerzo`

---

### `fin_descubierta` · La pantalla girada  (tono: oscuro)
> Lorena no gritó. Dejó el precio real a la vista, el que cualquiera podía buscar, y que cada uno restara solo. Marcela dijo «no importa, de verdad», que es lo que se dice cuando importa. El 30 repusiste los 38.000 y nadie los recibió con comentarios. Ahora eres puntual, transparente, impecable: mandas pantallazo hasta del domicilio de las empanadas. Nadie te lo pide. Por eso mismo.

*Moraleja:* No te acusó nadie: la aritmética se defendió sola.  ·  ilustración: `telefono`

---

### `fin_auditoria` · Historial de versiones  (tono: oscuro)
> La revisión llegó por correo: Lorena, el Excel adjunto y todas sus versiones recuperadas, cada una con su fecha y su hora, la del martes a las 11:58 p.m. incluida. No hubo pelea; hubo un documento. Devolviste los 38.000 al día siguiente, con un párrafo que nadie contestó. La vaca sigue existiendo. Ahora las cuentas las lleva un formulario de Google que administra Lorena.

*Moraleja:* El Excel perdona; el historial de versiones, jamás.  ·  ilustración: `carpeta`

---

### `fin_grupo_nuevo` · Grupo nuevo  (tono: oscuro)
> Nadie te desmintió en la torta. Tu explicación pasó, dulce, y pareció quedar atrás. En noviembre, Marcela te muestra un meme y alcanzas a ver su lista de chats: «Vaca Diciembre 🎄», foto de todos en la última integración. Tú no estás. Cuando preguntas por la natilla, Lorena responde rapidito: «tranquila, este año queremos que descanses de cuentas ✨». Con brillitos y todo.

*Moraleja:* En la oficina nadie te acusa: te dejan de agregar.  ·  ilustración: `chat`

---


---
---

# VERSIÓN 2 · "El mensaje que hunde a Camila" (la del enjambre anterior)

### Escena `intro`
**9:47 a.m. · sala de juntas**  ·  ilustración: `juntas`  ·  reloj: 20s

> Patricia pregunta, delante de todos, quién subió el consolidado dañado. Camila te mira fijo y dice: «Jimena lo montó anoche». Anoche tú estabas en urgencias de la EPS. El ventilador chirría. En tu celular, listo hace diez minutos, un mensaje con siete pantallazos que prueban todo. Destinatario: toda la oficina. Tu pulgar flota sobre enviar.

**Opción 1:** Mandarlo. Ahora. Que arda.  🔥impulso
- emoción +25 · tiempo -5 · lleva a → `enviado`
- eco: *Siete pantallazos. Un chulito gris. Después, dos.*

**Opción 2:** Bloquear la pantalla. Respirar por la nariz.
- emoción -15 · tiempo -10 · lleva a → `aguantas`
- eco: *«Lo revisamos después del almuerzo», dice Patricia. Sobreviviste.*

**Opción 3:** Sonreír y anotar la hora exacta.
- emoción -5 · tiempo -8 · lleva a → `fria`
- eco: *9:47. Lo escribes con buena letra.*

**Si el reloj llega a 0:** lleva a → `resbalon` (emoción +20)
- eco: *El pulgar decidió por ti. Enviado.*

---

### Escena `enviado`
**9:49 a.m. · sala de juntas**  ·  ilustración: `chat`  ·  reloj: 15s

> Enviado. Los celulares vibran en cadena, del fondo de la mesa hacia ti. Patricia lee sin mover la cara. Camila escribe… borra… escribe… El de contabilidad reacciona con 😮. El ventilador chirría en la esquina y, por primera vez en dos años, todos lo oyen.

**Opción 1:** Sostenerle la mirada a Patricia.
- emoción -10 · tiempo -5 · lleva a → `n3_corrillo`
- eco: *Patricia guarda el celular. Muy despacio.*

**Opción 2:** Agregar: «con pantallazos, para que conste».  🔥impulso
- emoción +15 · tiempo -8 · lleva a → `n3_corrillo`
- eco: *Doble chulo azul en treinta y cuatro celulares.*

**Opción 3:** Salir de la sala antes que nadie.
- emoción -5 · tiempo -5 · lleva a → `n3_corrillo`
- eco: *El pasillo aplaude en silencio. O eso sientes.*

**Si el reloj llega a 0:** lleva a → `n3_corrillo` (emoción +10)
- eco: *Todo el mundo sacó el celular. Nadie te mira.*

---

### Escena `aguantas`
**10:15 a.m. · pasillo del servidor**  ·  ilustración: `carpeta`  ·  reloj: 15s

> Fuiste por agua para no ir por sangre. De vuelta, abres el servidor: la carpeta de Camila no tiene respaldo. Ninguno. Todo el trimestre vive en su computador y en la suerte. Un clic tuyo y el error de anoche sería un chiste al lado de esto. Nadie te está mirando.

**Opción 1:** Pantallazo a la carpeta vacía. Por si acaso.
- emoción +5 · tiempo -5 · lleva a → `n3_servidor`
- eco: *Guardado en «Varios 2». Nadie busca en «Varios 2».*

**Opción 2:** Cerrar la ventana. Tú no viste nada.
- emoción -10 · tiempo -6 · lleva a → `n3_servidor`
- eco: *El clic de cerrar sonó más fuerte que el ventilador.*

**Opción 3:** Decírselo de frente: «no tiene respaldo».
- emoción -5 · tiempo -8 · lleva a → `n3_servidor`
- eco: *«¿Y a usted qué le importa?», responde. Pero palidece.*

**Si el reloj llega a 0:** lleva a → `n3_servidor` (emoción +10)
- eco: *Doña Marta pasó con el trapero y te vio ahí, congelada.*

---

### Escena `fria`
**10:40 a.m. · puesto de Camila**  ·  ilustración: `usb`  ·  reloj: 15s

> Camila salió a «una vuelta». En su puesto, junto al portátil, una USB roja con cinta y marcador: «PLAN B — no abrir». La gaveta quedó abierta. Adentro, tu hoja de vida impresa, subrayada con verde. Fecha de impresión: hace tres semanas. El corrillo de la cafetera está de espaldas.

**Opción 1:** Copiar la USB en tu computador. Rápido.
- emoción +10 · tiempo -6 · lleva a → `n3_usb`
- eco: *Cuarenta segundos. La barra de copiado más larga de tu vida.*

**Opción 2:** Echártela al bolsillo. Completa.  🔥impulso
- emoción +15 · tiempo -4 · lleva a → `n3_usb`
- eco: *La USB pesa como si supiera algo.*

**Opción 3:** Fotos primero. La USB, «prestada» después.
- emoción -5 · tiempo -7 · lleva a → `n3_usb`
- eco: *Tu hoja de vida sale nítida. La USB, al bolso.*

**Si el reloj llega a 0:** lleva a → `n3_usb` (emoción +12)
- eco: *Camila volvió por el otro pasillo. «¿Se le perdió algo?»*

---

### Escena `resbalon`
**9:48 a.m. · sala de juntas**  ·  ilustración: `telefono`  ·  reloj: 15s

> No lo mandaste. O sea: sí. Tu pulgar rozó enviar mientras Patricia hablaba y ahora treinta y cuatro personas tienen los pantallazos y un audio que ni recordabas haber grabado. El celular te vibra en la mano como un animal. Camila levanta su teléfono. Lo lee. Te mira.

**Opción 1:** «Me hackearon.» Con cara seria.  🔥impulso
- emoción +15 · tiempo -5 · lleva a → `n3_rrhh`
- eco: *Nadie en la sala te cree. Ni tú.*

**Opción 2:** «Sí, fui yo. Y todo es cierto.»
- emoción +8 · tiempo -6 · lleva a → `n3_rrhh`
- eco: *Silencio. El ventilador chirría dos veces.*

**Opción 3:** Borrar para todos. Ya. Ya. Ya.  🔥impulso
- emoción +18 · tiempo -4 · lleva a → `n3_rrhh`
- eco: *«Se eliminó este mensaje». Peor que el mensaje.*

**Si el reloj llega a 0:** lleva a → `n3_rrhh` (emoción +15)
- eco: *Los tres puntos de Patricia aparecen. Y desaparecen.*

---

### Escena `n3_corrillo`
**11:20 a.m. · baño del segundo piso**  ·  ilustración: `bano`  ·  reloj: 15s

> Camila llora frente al lavamanos. Rímel corrido, pero el llanto sube cuando entra gente y baja cuando sale. Te ve por el espejo. «¿Contenta?», dice, y la voz le tiembla, o la hace temblar. Afuera, el corrillo de la cafetera espera el segundo capítulo con vasos desechables.

**Opción 1:** «El archivo era suyo. Esto se me fue.»
- emoción -12 · tiempo -6 · lleva a → `fin_humana`
- eco: *Camila cierra la llave. Por primera vez hay silencio de verdad.*

**Opción 2:** «Llore bonito, que afuera están grabando.»  🔥impulso
- emoción +20 · tiempo -4 · lleva a → `fin_villana`
- eco: *Alguien en un cubículo dijo «uy». Se oyó clarito.*

**Opción 3:** Salir del baño sin decir nada.
- emoción +5 · tiempo -6 · lleva a → `fin_viral`
- eco: *El corrillo se aparta. Nadie te ofrece tinto.*

**Si el reloj llega a 0:** lleva a → `fin_viral` (emoción +15)
- eco: *Entró la practicante, celular en alto, grabando en vertical.*

---

### Escena `n3_servidor`
**2:30 p.m. · oficina de Patricia**  ·  ilustración: `escritorio`  ·  reloj: 15s

> Patricia cierra la puerta con seguro. «Yo sé que el archivo no fue suyo», dice, sin sorpresa. «Camila me sirve donde está. Usted me sirve más callada. Aguante este golpe y en enero queda libre la coordinación.» Sobre su escritorio, boca abajo, tu evaluación de desempeño.

**Opción 1:** «No, jefa. Esto se aclara hoy.»
- emoción -8 · tiempo -6 · lleva a → `fin_paz`
- eco: *Patricia sonríe despacio. «Sabía que iba a decir eso».*

**Opción 2:** «¿Enero? ¿Coordinación? ¿Firmamos algo?»
- emoción +5 · tiempo -5 · lleva a → `fin_trato`
- eco: *Se dan la mano. La de ella está helada.*

**Opción 3:** Asentir. Solo asentir.
- emoción -15 · tiempo -7 · lleva a → `fin_apagada`
- eco: *La puerta se abre. El pasillo sigue igual. Tú no.*

**Si el reloj llega a 0:** lleva a → `fin_apagada` (emoción +8)
- eco: *«Piénselo», dice Patricia, y te da la espalda. Ya lo pensaste.*

---

### Escena `n3_usb`
**3:10 p.m. · sala pequeña**  ·  ilustración: `juntas`  ·  reloj: 15s

> «PLAN B», abierto al fin en un computador sin sesión iniciada: correos donde Camila le vende a la competencia el cliente grande, con tarifas y fechas de entrega. Firma como «C». Justo entonces, el correo de Patricia: «Sala pequeña, 3:15, usted y yo». Cinco minutos. Dinamita ajena en las manos.

**Opción 1:** Solo tu caso: fechas, la EPS, el archivo.
- emoción -10 · tiempo -6 · lleva a → `fin_fria`
- eco: *Patricia toma nota. Tres veces subraya «anoche».*

**Opción 2:** Proyectar los correos en la sala. Todo.  🔥impulso
- emoción +18 · tiempo -4 · lleva a → `fin_villana`
- eco: *Patricia lee «C» dos veces. La segunda, moviendo los labios.*

**Opción 3:** Devolver la USB a la gaveta. Manos limpias.
- emoción -12 · tiempo -5 · lleva a → `fin_fria`
- eco: *La cinta queda igualita. Tus manos, no.*

**Si el reloj llega a 0:** lleva a → `fin_despido` (emoción +12)
- eco: *Llegaste tarde, con la USB en la mano. Camila ya estaba adentro.*

---

### Escena `n3_rrhh`
**4:45 p.m. · piso 3, Recursos Humanos**  ·  ilustración: `escritorio`  ·  reloj: 15s

> RRHH te cita «para conversar». En la sala: la psicóloga, un formato en blanco y un vaso de agua que nadie te ofreció. «Cuéntenos qué pasó con el mensaje». Tu celular vibra: alguien subió tu audio a un grupo que se llama «EN CALIENTE 🔥». Tiene 118 miembros.

**Opción 1:** «La forma estuvo mal. El fondo no.»
- emoción -10 · tiempo -6 · lleva a → `fin_humana`
- eco: *La psicóloga guarda el formato. Saca otro. Uno mejor.*

**Opción 2:** «Ese audio es inteligencia artificial.»  🔥impulso
- emoción +15 · tiempo -5 · lleva a → `fin_despido`
- eco: *En el audio se oye tu tos. Tu tos es famosa.*

**Opción 3:** Correr a borrar el audio del servidor.  🔥impulso
- emoción +25 · tiempo -4 · lleva a → `fin_fatal`
- eco: *El servidor queda dos pisos abajo. Corriendo se llega antes.*

**Si el reloj llega a 0:** lleva a → `fin_despido` (emoción +15)
- eco: *Te quedaste muda. La psicóloga escribió tres líneas sin mirarte.*

---

## Finales (9)

### `fin_fria` · Sangre fría  (tono: bueno)
> Patricia revisa las fechas. La cita de la EPS coincide al minuto. El lunes, el archivo amanece «corregido» y Camila pide traslado a la sede norte sin que nadie se lo pida. La USB volvió a su puesto, cinta y letrero intactos. No la necesitaste. Ella sabe que la viste. Tú sabes que ella sabe. Con eso basta.

*Moraleja:* El poder real es la prueba que decides no usar.  ·  ilustración: `carpeta`

---

### `fin_humana` · Dar la cara  (tono: bueno)
> Hubo comité. Te llamaron la atención por el mensaje; a Camila, por el archivo. Firmaste tu parte sin pelear la letra. Dos meses después ella te saluda en el ascensor y tú respondes, y ninguna lo hace por gusto, pero lo hacen. La taza de «Team Player» sigue en tu escritorio. Ya no te parece un chiste.

*Moraleja:* Equivocarse de frente cansa menos que tener razón escondida.  ·  ilustración: `cafetera`

---

### `fin_paz` · La guerra que no fue  (tono: bueno)
> Dijiste que no con la puerta todavía asegurada. Al día siguiente lo aclaraste en el chat general: fechas, la EPS, cero adjetivos. Nadie aplaudió. Patricia no te perdona y Camila no te mira, y sin embargo duermes corrido por primera vez en semanas. La coordinación de enero fue para otra. El pulso, para ti.

*Moraleja:* Un no dicho a tiempo vale más que un cargo en enero.  ·  ilustración: `escritorio`

---

### `fin_trato` · La socia  (tono: oscuro)
> Enero llegó y la coordinación fue tuya, con oficina y silla que no chirría. También llegaron los mensajes de Patricia a las diez de la noche: «¿Cómo vio hoy a Andrés? ¿Y a la practicante?». Los respondes todos. En tu gaveta ya hay una USB con cinta y marcador. Todavía no le pones nombre. Todavía.

*Moraleja:* Lo que aceptas a puerta cerrada te lo cobran a puerta cerrada.  ·  ilustración: `usb`

---

### `fin_apagada` · En silencio  (tono: oscuro)
> No dijiste nada. Ni ese día ni los siguientes. La coordinación de enero fue para la sobrina de alguien. Camila te pide favores con tono dulce y tú se los haces. En las noches redactas el mensaje completo, con los pantallazos, perfecto. Nunca lo mandas. El ventilador sigue chirriando. Hace rato dejaste de oírlo.

*Moraleja:* Callar también es una decisión. La vuelves a tomar cada mañana.  ·  ilustración: `mensaje`

---

### `fin_despido` · El carné por la ranura  (tono: oscuro)
> El comité duró once minutos. «Pérdida de confianza», dice la carta, que no menciona el archivo, ni la EPS, ni a Camila. Empacas en una caja de resma de papel: la taza, el cargador, un cactus. El de seguridad te acompaña al parqueadero y te desea suerte, y lo dice en serio, y eso es lo peor.

*Moraleja:* Nadie te despide por estar equivocada; te despiden por cómo tuviste la razón.  ·  ilustración: `parqueadero`

---

### `fin_viral` · Tendencia  (tono: oscuro)
> El pantallazo salió de la oficina antes del almuerzo. A las cinco ya eras un TikTok con voz en off: «POV: la compañera tóxica». Tres millones de vistas y en los comentarios nadie pregunta de quién era el archivo. En la panadería de abajo, la cajera te mira dos veces. Tú tenías las pruebas. Internet tenía el video.

*Moraleja:* Internet no lee contexto. Lee pantallazos.  ·  ilustración: `telefono`

---

### `fin_villana` · La mala del cuento  (tono: oscuro)
> Todo lo que mostraste era cierto. Camila renunció esa misma tarde, llorando por todo el pasillo, despacio, asegurándose público. Ahora tú eres «la que hizo llorar a Camila» y ella, «la muchacha que pasó por algo muy duro». Te escribió al salir: «cuídate mucho ✨». Tus pruebas duermen en un expediente que nadie volvió a abrir.

*Moraleja:* Quemaste a la bruja con su propia leña. Ahora hueles a humo.  ·  ilustración: `pasillo`

---

### `fin_fatal` · Fuera de línea  (tono: negro)
> Bajaste las escaleras de a tres, escribiendo «ya lo borro» con una mano. El letrero amarillo de piso húmedo estaba puesto; doña Marta siempre lo pone. En tu funeral hubo flores de la empresa y un minuto de silencio que Patricia cronometró. El grupo «EN CALIENTE 🔥» te dedicó una velita. A los ocho minutos ya hablaban de otra cosa.

*Moraleja:* Corriste a borrar un audio y la borrada fuiste tú.  ·  ilustración: `escaleras`

---


---
---

# VERSIÓN 1 · La original (escrita a mano, la primera jugable)

### Escena `intro`
**9:47 a.m. · sala de juntas**  ·  ilustración: `?`  ·  reloj: 20s

> Camila acaba de echarte la culpa de SU error. Con sonrisita. Frente a Patricia y todo el equipo. Nadie dice nada. La cara te arde… y en tu pantalla está listo el mensaje que la hunde con pruebas, dirigido a TODA la oficina.

**Opción 1:** Mandarlo. Ahora.  🔥impulso
- emoción +22 · tiempo 0 · lleva a → `enviado`
- eco: *Le diste a enviar. No hay vuelta atrás.*

**Opción 2:** Cerrar el portátil y respirar
- emoción -8 · tiempo -5 · lleva a → `aguantas`
- eco: *Lo tragaste. Por ahora.*

**Opción 3:** «Con gusto reviso ese error, Patricia»
- emoción +6 · tiempo -8 · lleva a → `fria`
- eco: *Sonreíste. Nadie vio el volcán.*

**Si el reloj llega a 0:** lleva a → `resbalon` (emoción +30)
- eco: *Te temblaba la mano… y el dedo se resbaló. Enviado.*

---

### Escena `enviado`
**9:49 a.m. · el chat estalla**  ·  ilustración: `?`  ·  reloj: 15s

> «¿Esto es en serio?» «😳» «JAJAJA». Veinte personas leyendo tus pruebas contra Camila. Patricia levanta la vista del celular, muy despacio. Camila se pone de pie y camina directo hacia ti.

**Opción 1:** Levantarte y encararla delante de todos  🔥impulso
- emoción +20 · tiempo -5 · lleva a → `fin_escandalo`
- eco: *Todo el mundo sacó el celular a grabar.*

**Opción 2:** «Me equivoqué en la forma. Hablemos»
- emoción -10 · tiempo -8 · lleva a → `fin_humana`
- eco: *Respiraste. La sala bajó dos grados.*

**Opción 3:** «¡Me hackearon!»  🔥impulso
- emoción +12 · tiempo 0 · lleva a → `fin_hundida`
- eco: *TI revisa los registros en 10 minutos…*

**Si el reloj llega a 0:** lleva a → `fin_hundida` (emoción +15)
- eco: *Te quedaste helada. Camila llegó primero… con su versión.*

---

### Escena `aguantas`
**11:30 a.m. · a solas con el 'error'**  ·  ilustración: `?`  ·  reloj: 15s

> Respiraste. Nadie vio nada. Ahora Patricia te dejó revisando 'tu' error… que es de Camila. Y ves su carpeta abierta en el servidor: TODO su trabajo del mes, sin respaldo, a un clic de desaparecer.

**Opción 1:** Armar las pruebas y mostrarlas con calma
- emoción -6 · tiempo -10 · lleva a → `fin_fria`
- eco: *Frío. Metódico. Irrefutable.*

**Opción 2:** Borrar. La. Carpeta.  🔥impulso
- emoción +25 · tiempo 0 · lleva a → `fin_fatal`
- eco: *Clic. La papelera también. Qué silencio tan rico.*

**Opción 3:** Cerrar todo y dejarlo así
- emoción +8 · tiempo -5 · lleva a → `fin_apagada`
- eco: *Otra vez te lo tragaste. Ya van muchas.*

**Si el reloj llega a 0:** lleva a → `fin_apagada` (emoción +12)
- eco: *Te quedaste mirando la carpeta demasiado tiempo… y llegó gente.*

---

### Escena `fria`
**2:15 p.m. · tu escritorio**  ·  ilustración: `?`  ·  reloj: 15s

> Tu jugada fría funcionó: Patricia empieza a sospechar sola. Y justo ahora encuentras, olvidada en tu escritorio, la USB de Camila. Adentro: su trabajo… y una carpeta que se llama 'PLAN B – no abrir'.

**Opción 1:** Devolverla sin abrirla
- emoción -8 · tiempo 0 · lleva a → `fin_paz`
- eco: *Se la entregaste mirándola a los ojos. Ella entendió.*

**Opción 2:** Abrir 'PLAN B'  🔥impulso
- emoción +15 · tiempo -5 · lleva a → `fin_escandalo`
- eco: *Ay. Eso no lo debiste ver.*

**Opción 3:** «¿De quién será esto?» …y se 'pierde'  🔥impulso
- emoción +18 · tiempo 0 · lleva a → `fin_hundida_tu`
- eco: *La USB cayó al fondo de tu cajón. Qué pena con ella.*

**Si el reloj llega a 0:** lleva a → `fin_escandalo` (emoción +10)
- eco: *Camila volvió por ella antes de que decidieras. Te vio con la USB en la mano.*

---

### Escena `resbalon`
**9:48 a.m. · enviado 'solo'**  ·  ilustración: `?`  ·  reloj: 15s

> Se envió. Tú ni siquiera decidiste… ¿o sí? El chat arde. Camila te mira desde el otro lado de la sala con los ojos MUY abiertos. Patricia pregunta, con voz de hielo: «Jimena, ¿qué es esto?»

**Opción 1:** «Fue mi dedo… pero cada palabra es cierta»
- emoción +10 · tiempo -5 · lleva a → `fin_humana`
- eco: *Media oficina asintió en silencio.*

**Opción 2:** «Mi gato pisó el teclado»  🔥impulso
- emoción +15 · tiempo 0 · lleva a → `fin_escandalo`
- eco: *No tienes gato. Y todos lo saben.*

**Opción 3:** Doblar la apuesta: «Y hay más»  🔥impulso
- emoción +24 · tiempo 0 · lleva a → `fin_fatal`
- eco: *Sacaste la segunda carpeta. La sala dejó de respirar.*

**Si el reloj llega a 0:** lleva a → `fin_hundida` (emoción +18)
- eco: *El silencio te respondió por ti. El peor de los abogados.*

---

## Finales (8)

### `fin_fria` · Jugaste frío  (tono: bueno)
> Presentaste las pruebas sin levantar la voz. Camila se hundió sola, con su propio error. Patricia te ofreció liderar el próximo proyecto. Nadie te vio sudar — y eso fue lo más aterrador de todo.

*Moraleja:* La calma no es debilidad: es puntería.  ·  ilustración: `?`

---

### `fin_humana` · Metiste la pata… y la sacaste  (tono: bueno)
> Te equivocaste en caliente, pero diste la cara. Camila también terminó admitiendo su parte. No son amigas — ni falta que hace — pero hoy la oficina aprendió que contigo se habla de frente.

*Moraleja:* Errar es humano. Reconocerlo, escaso.  ·  ilustración: `?`

---

### `fin_paz` · La guerra que no fue  (tono: bueno)
> Devolviste la USB sin abrirla. Camila lo supo, y algo cambió: al día siguiente admitió su error ante Patricia sin que nadie la obligara. No hubo abrazo. Hubo respeto, que dura más.

*Moraleja:* El poder que no usaste también habla de ti.  ·  ilustración: `?`

---

### `fin_apagada` · La que se lo tragó todo  (tono: oscuro)
> No explotaste. Tampoco hablaste. Cargaste con un error ajeno y la rabia te la llevaste a casa, al carro, a la almohada. Camila duerme rico. Tú no. Y mañana… hay reunión otra vez.

*Moraleja:* Tragarse todo también es una decisión. Y también cobra.  ·  ilustración: `?`

---

### `fin_hundida` · Te hundiste sola  (tono: oscuro)
> Tenías la razón… y la perdiste en 15 segundos. RRHH no evaluó quién causó el error: evaluó el mensaje, el show y la mentira. El viernes entregaste el carné. Camila te despidió en la puerta: «cuídate mucho ✨».

*Moraleja:* Tener la razón no te salva de perderla.  ·  ilustración: `?`

---

### `fin_hundida_tu` · La villana eras tú  (tono: oscuro)
> La USB 'perdida' apareció — en la cámara del pasillo, contigo guardándola. Nadie volvió a hablar del error de Camila: ahora la historia de la oficina eres tú. Hasta el de la cafetería te mira raro.

*Moraleja:* El impulso perverso siempre deja huella. Literal.  ·  ilustración: `?`

---

### `fin_escandalo` · Viral por lo que no era  (tono: oscuro)
> Alguien grabó. Esa noche eras un video de 34 segundos sin contexto, con tu peor ángulo y un audio de reguetón. Tu mamá lo recibió por tres grupos distintos. El lunes había carteles de 'manejo de emociones' en la cocina. Con tu foto no, pero casi.

*Moraleja:* En caliente nadie graba tu versión completa.  ·  ilustración: `?`

---

### `fin_fatal` · Se te fue la mano  (tono: negro)
> Ibas ganando. Pero quisiste el golpe final — y en la escalada, Camila retrocedió un paso de más en las escaleras. El velorio fue el jueves. Fuiste, por respeto, con el mismo saco de la entrevista. El eco de la oficina lo resume: «todo por un clic».

*Moraleja:* Hay impulsos de los que no se vuelve. De ninguno de los dos lados.  ·  ilustración: `?`

---

