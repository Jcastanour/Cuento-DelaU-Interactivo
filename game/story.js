/* ============================================================
   EN CALIENTE · story.js · "El vuelto"
   ============================================================
   La premisa (elegida por el equipo): el cajero te devuelve
   $50.000 de más. Devolverlos es lo correcto. Y tu crisis es
   tan grande que hasta suena absurdo devolverlos. Las DOS
   ramas duelen: si los guardas, la conciencia cobra; si los
   devuelves, la vida cobra. Ninguna decisión sale gratis.

   REGLAS DE LA CASA:
   - 2 opciones por escena (izquierda / derecha). Timeout siempre.
   - Escenas de ~45 palabras máximo. Detalle concreto, cero frases de taza.
   - Todo next debe apuntar a un nodo que exista.
   - Se lee/edita cómoda corriendo: node game/story2md.js game/story.js
   ============================================================ */

window.STORY = {
  meta: {
    titulo: "EN CALIENTE",
    subtitulo: "un juego sobre decidir con la sangre hirviendo",
    protagonista: "Jimena",
    emocionInicial: 40,
    tiempoInicial: 100
  },
  start: "intro",
  nodes: {

    /* ================= NIVEL 1 · EL VUELTO ================= */

    intro: {
      hora: "7:40 p.m. · viernes, salida del supermercado",
      escena: "Pagaste con veinte. El cajero nuevo, con la fila hasta los congeladores, te devolvió como si fueran setenta: cincuenta mil de más, doblados en tu mano. En el bolso, la leche de Emma marca la mitad. La quincena llega el lunes. Dizque.",
      art: "caja",
      timer: 25,
      choices: [
        {
          txt: "Guardarlo y caminar.",
          emocion: 14, tiempo: 0, impulso: true,
          eco: "El billete entra al bolsillo solito. Tú solo no lo sacas.",
          next: "n2_guarda"
        },
        {
          txt: "Volver a la caja. Devolverlo.",
          emocion: -6, tiempo: -6, impulso: false,
          eco: "La fila entera te ve devolverte. Alguien resopla.",
          next: "n2_devuelve"
        }
      ],
      timeout: {
        emocion: 18,
        eco: "Te quedaste en la puerta hasta que el guarda te miró. Caminaste.",
        next: "n2_guarda"
      }
    },

    /* ================= RAMA A · LO GUARDASTE ================= */

    n2_guarda: {
      hora: "8:05 p.m. · tienda de don Óscar",
      escena: "Con el billete alcanza para todo: leche etapa dos, cuido para Coco, huevos. Don Óscar empaca y comenta, por comentar: «al cajerito nuevo del súper se lo descuentan del sueldo, ¿sí sabía? Así los reciben a todos».",
      art: "tienda",
      timer: 20,
      choices: [
        {
          txt: "Comprar todo. Emma y Coco primero.",
          emocion: 8, tiempo: -4, impulso: true,
          eco: "La bolsa pesa rico. El bolsillo también.",
          next: "n3_casa"
        },
        {
          txt: "Solo la leche. El resto se devuelve mañana.",
          emocion: -4, tiempo: -5, impulso: false,
          eco: "Treinta y dos mil doblados aparte, en el bolsillo chiquito.",
          next: "n3_mitad"
        }
      ],
      timeout: {
        emocion: 10,
        eco: "Don Óscar ya había empacado todo. Pagaste sin mirar.",
        next: "n3_casa"
      }
    },

    n3_casa: {
      hora: "9:30 p.m. · tu casa",
      escena: "Emma comió y duerme con el puño cerrado. Coco raspó el plato hasta dejarlo brillante. En el grupo del barrio, la vecina reenvía: «ojo, en el súper van a echar al muchacho de la caja 3 por un descuadre de $50.000». Tres caritas tristes.",
      art: "cuna",
      timer: 20,
      choices: [
        {
          txt: "Mañana devuelvo los cincuenta. Completos.",
          emocion: -6, tiempo: -6, impulso: false,
          eco: "Completos. Ya gastaste treinta y uno. Las cuentas no duermen.",
          next: "n4_reponer"
        },
        {
          txt: "Callar. Mi bebé comió. Punto.",
          emocion: 10, tiempo: 0, impulso: true,
          eco: "Silencias el grupo del barrio. El grupo sigue ahí.",
          next: "n4_silencio"
        }
      ],
      timeout: {
        emocion: 8,
        eco: "Escribiste y borraste tres respuestas. Ganó la borrada.",
        next: "n4_silencio"
      }
    },

    n3_mitad: {
      hora: "6:50 a.m. · sábado, súper de la esquina",
      escena: "Llegaste con los treinta y dos mil que quedaron y un discurso ensayado. En la caja 3 no está el muchacho: hay una señora de moño. «¿Brayan? Hoy le hacen el descargo a las diez», dice, sin dejar de pasar códigos.",
      art: "caja",
      timer: 20,
      choices: [
        {
          txt: "Esperar el descargo y entrar a contar todo.",
          emocion: -5, tiempo: -8, impulso: false,
          eco: "Dos horas en la panadería de enfrente, revolviendo el mismo tinto.",
          next: "n4_descargo"
        },
        {
          txt: "Dejar los treinta y dos en un sobre. Sin nombre.",
          emocion: 6, tiempo: -4, impulso: true,
          eco: "«Esto es del descuadre de ayer. Falta el resto. Perdón.»",
          next: "n4_sobre"
        }
      ],
      timeout: {
        emocion: 8,
        eco: "A las diez y diez seguías en la panadería. El tinto, frío.",
        next: "n4_descargo"
      }
    },

    n4_reponer: {
      hora: "7:15 a.m. · sábado, compraventa La Milagrosa",
      escena: "Para completar los cincuenta faltan diecinueve. Sobre el mostrador: tus argollas de grado. El señor las pesa sin ceremonia: «le doy veinticinco». Detrás tuyo, la fila del sábado tiene tu misma cara.",
      art: "nomina",
      timer: 20,
      choices: [
        {
          txt: "Empeñarlas. Devolver completo hoy.",
          emocion: -4, tiempo: -6, impulso: false,
          eco: "El recibo rosado dice: plazo 30 días. Otra deuda con fecha.",
          next: "fin_completos"
        },
        {
          txt: "Devolver solo lo que hay. Y dar la cara.",
          emocion: -8, tiempo: -5, impulso: false,
          eco: "Treinta y uno en billetes sueltos. Y tu nombre completo.",
          next: "fin_cara"
        }
      ],
      timeout: {
        emocion: 6,
        eco: "La fila te pasó por el lado. Volviste con las argollas puestas.",
        next: "fin_cara"
      }
    },

    n4_silencio: {
      hora: "jueves siguiente · 6:20 p.m. · parada del bus",
      escena: "Coco engordó. Emma estrena tarro de leche. En la parada, con una caja de cartón en las piernas, está el muchacho de la caja 3. Te reconoce: fuiste su última clienta. «¿Sí ve? Por cincuenta lucas», dice, sin rabia. Y sonríe.",
      art: "parada",
      timer: 20,
      choices: [
        {
          txt: "Contarle. Ahí, en la parada.",
          emocion: -10, tiempo: -5, impulso: false,
          eco: "No te insulta. Peor: te agradece por decírselo.",
          next: "fin_parada"
        },
        {
          txt: "«Qué injusticia», decir. Y mirar el celular.",
          emocion: 12, tiempo: 0, impulso: true,
          eco: "El bus llegó rapidito. Bendito bus.",
          next: "fin_callada"
        }
      ],
      timeout: {
        emocion: 8,
        eco: "Él mismo cambió de tema, hablando del aguacero. Te salvó la lluvia.",
        next: "fin_callada"
      }
    },

    n4_descargo: {
      hora: "10:20 a.m. · sábado, oficina del administrador",
      escena: "Brayan, de civil, con la carpeta en las piernas. Cuentas todo: el billete, la leche, los treinta y dos que trajiste. Silencio. «El reglamento es el reglamento», dice el administrador, «pero esto cambia el descargo». Brayan no te mira.",
      art: "juntas",
      timer: 20,
      choices: [
        {
          txt: "Ofrecer pagar el resto por cuotas. Firmado.",
          emocion: -5, tiempo: -6, impulso: false,
          eco: "Firmas al lado de Brayan. La misma mesa, dos deudas.",
          next: "fin_cuotas"
        },
        {
          txt: "«El error fue de la caja. Ya devolví lo que pude.»",
          emocion: 10, tiempo: 0, impulso: true,
          eco: "Cierto. Legal. El administrador asiente despacio, escribiendo.",
          next: "fin_reglamento"
        }
      ],
      timeout: {
        emocion: 6,
        eco: "El administrador decidió por todos: «descuento compartido». Nadie protestó.",
        next: "fin_cuotas"
      }
    },

    n4_sobre: {
      hora: "lunes · 7:30 a.m. · grupo del barrio",
      escena: "La quincena por fin cayó. En el grupo, la señora del moño publicó la foto del sobre: «apareció esto en la caja 3. Dios le pague a quien fue». Cuarenta respuestas. La vecina, que todo lo ve: «yo creo que fue alguien de por aquí 👀».",
      art: "chat",
      timer: 20,
      choices: [
        {
          txt: "Completar hoy los dieciocho que faltan. Otro sobre.",
          emocion: -5, tiempo: -5, impulso: false,
          eco: "El segundo sobre pesa menos y cuesta más.",
          next: "fin_sobres"
        },
        {
          txt: "No volver a ese súper. Nunca.",
          emocion: 8, tiempo: 0, impulso: true,
          eco: "Queda el de la otra cuadra. Más caro. Más lejos. Más tranquilo.",
          next: "fin_desvio"
        }
      ],
      timeout: {
        emocion: 7,
        eco: "Dejaste el chat en visto. El 👀 se quedó mirándote.",
        next: "fin_desvio"
      }
    },

    /* ================= RAMA B · LO DEVOLVISTE ================= */

    n2_devuelve: {
      hora: "7:52 p.m. · caja 3",
      escena: "El muchacho cuenta el billete dos veces y respira como si saliera de bucear. «Me salvaste el puesto», dice. El administrador te regala un imán de nevera: CLIENTE HONESTO ⭐. Sales con tus dieciocho mil y la lista imposible en la cabeza: leche, cuido, pañales.",
      art: "caja",
      timer: 20,
      choices: [
        {
          txt: "Pedirle fiado a don Óscar. Otra vez.",
          emocion: -4, tiempo: -5, impulso: false,
          eco: "El cuaderno de don Óscar te espera en la A de «Apartamento 201».",
          next: "n3_fiado"
        },
        {
          txt: "Estirar lo que hay: agua de panela y medio tarro.",
          emocion: 8, tiempo: 0, impulso: true,
          eco: "La calculadora del celular da lo mismo por tercera vez.",
          next: "n3_estirar"
        }
      ],
      timeout: {
        emocion: 8,
        eco: "Caminaste derecho a la casa, con el imán en el bolso.",
        next: "n3_estirar"
      }
    },

    n3_fiado: {
      hora: "8:20 p.m. · tienda de don Óscar",
      escena: "Don Óscar apunta la leche y el cuido en el cuaderno, sin cara de nada. «Va en ciento doce, mija». Lo dice bajito, pero la señora de las empanadas alcanza a oír. Afuera, amarrado, Coco mueve la cola por los dos.",
      art: "tienda",
      timer: 20,
      choices: [
        {
          txt: "«Apunte también unos huevos.» Frente en alto.",
          emocion: -4, tiempo: -4, impulso: false,
          eco: "Deber con la frente en alto también es una técnica.",
          next: "n4_fiebre"
        },
        {
          txt: "Solo la leche. Coco come sobras esta semana.",
          emocion: 6, tiempo: 0, impulso: true,
          eco: "Coco mueve la cola igual. Los perros no leen cuadernos.",
          next: "n4_fiebre"
        }
      ],
      timeout: {
        emocion: 5,
        eco: "Don Óscar apuntó lo de siempre. Él ya se sabe tu lista.",
        next: "n4_fiebre"
      }
    },

    n3_estirar: {
      hora: "2:40 a.m. · tu casa",
      escena: "Emma se despertó dos veces. El tarro quedó en cucharaditas raspadas. Coco, que entiende todo, no pidió. En el celular: «quincena consignada el lunes festivo = martes». Martes. El imán brilla con la luz del corredor: CLIENTE HONESTO ⭐.",
      art: "cuna",
      timer: 20,
      choices: [
        {
          txt: "Escribirle a tu hermana. Tragarse el orgullo.",
          emocion: -8, tiempo: -4, impulso: false,
          eco: "«Yo te consigno mañana, boba. Para eso estamos.»",
          next: "n4_fiebre"
        },
        {
          txt: "Nadie tiene que saber cómo estás. Aguantar.",
          emocion: 10, tiempo: 0, impulso: true,
          eco: "El orgullo no alimenta, pero acompaña.",
          next: "n4_fiebre"
        }
      ],
      timeout: {
        emocion: 8,
        eco: "Te dormiste sentada, con el mensaje escrito y sin enviar.",
        next: "n4_fiebre"
      }
    },

    n4_fiebre: {
      hora: "domingo · 7:10 a.m. · tu casa",
      escena: "Emma amanece hirviendo: 38,9. La EPS contesta con menú de opciones y da cita para el otro jueves. El pediatra del centro comercial atiende hoy: sesenta mil. Anteayer tuviste cincuenta en la mano. Lo pensaste. Claro que lo pensaste. Coco no se despega de la cuna.",
      art: "fiebre",
      timer: 20,
      choices: [
        {
          txt: "Urgencias de la EPS. La fila que toque.",
          emocion: 6, tiempo: -10, impulso: false,
          eco: "Turno 47. Van por el 12. Emma se duerme en tu pecho.",
          next: "fin_urgencias"
        },
        {
          txt: "Empeñar el celular. Pediatra hoy mismo.",
          emocion: -4, tiempo: -6, impulso: true,
          eco: "«Le doy setenta.» El chip queda en un teléfono prestado.",
          next: "fin_pediatra"
        }
      ],
      timeout: {
        emocion: 8,
        eco: "La fiebre bajó un poco con pañitos. La duda no.",
        next: "fin_urgencias"
      }
    },

    /* ================= FINALES ================= */

    fin_completos: {
      final: true, tono: "agridulce",
      titulo: "Cincuenta completos, argollas menos",
      texto: "Devolviste los cincuenta antes de que empezara el descargo. Brayan conservó el puesto y nunca supo tu nombre. En tu monedero vive un recibo rosado que vence en treinta días, y en tu mano, la marca clarita donde iban las argollas. Emma comió toda la semana. Eso también cuenta. Eso es lo que cuenta.",
      moraleja: "Devolver tarde cobra unos intereses que no salen en ningún extracto.",
      art: "nomina"
    },

    fin_cara: {
      final: true, tono: "bueno",
      titulo: "Con nombre y apellido",
      texto: "Devolviste treinta y uno y diste la cara: «lo demás lo pago por quincenas». El administrador anotó; tu palabra sirvió de descargo y a Brayan no lo echaron. Don Óscar se enteró, como se entera de todo, y ahora te guarda el pan de ayer, «que sale más barato y sabe igual». El barrio tiene buena memoria.",
      moraleja: "La plata volvió incompleta; tu nombre volvió entero.",
      art: "tienda"
    },

    fin_parada: {
      final: true, tono: "agridulce",
      titulo: "La deuda de la parada",
      texto: "Se lo contaste con la caja de cartón entre los dos. Te dio las gracias por decírselo, y eso fue peor que cualquier insulto. Cada quincena le consignas diez mil a su Nequi, sin que nadie te obligue, hasta completar. Emma y Coco están bien. El bus de las 6:20 ya no lo tomas: te dio por caminar.",
      moraleja: "Hay deudas que no prescriben porque una no las deja.",
      art: "parada"
    },

    fin_callada: {
      final: true, tono: "oscuro",
      titulo: "Los vueltos, dos veces",
      texto: "No dijiste nada y la vida siguió: Coco gordo, Emma sana, la quincena al fin en la cuenta. Al súper de la esquina no volviste. Y te quedó una maña que nadie más nota: cada vez que un cajero te da vueltas, las cuentas dos veces, despacio, como esperando que sobre algo para poder devolverlo.",
      moraleja: "Lo que callaste no desapareció: se mudó a los vueltos.",
      art: "caja"
    },

    fin_cuotas: {
      final: true, tono: "bueno",
      titulo: "Dos firmas en la misma mesa",
      texto: "Firmaste un acuerdo de pago al lado de Brayan: tú, los diecinueve que faltaban; él, nada, porque tu descargo lo salvó. Pagaste en dos quincenas. Ahora los sábados te guarda el turno en la caja 3 y pregunta por Emma mirando tu bolso, donde siempre asoma algo: el pan, la leche, y desde hace poco, el imán. Al final sí te lo dieron.",
      moraleja: "Firmar tu error junto al que casi lo paga: eso también es plata.",
      art: "juntas"
    },

    fin_reglamento: {
      final: true, tono: "oscuro",
      titulo: "Legalmente impecable",
      texto: "Dijiste la frase correcta: el error fue de la caja. Cierto, legal, irrefutable. El reglamento hizo el resto: a Brayan le descontaron la diferencia en dos quincenas. A ti te agradecieron «el gesto» delante de todos. El imán de CLIENTE HONESTO te lo ganaste ese día. Lo botaste en la primera caneca, sin bajar el paso.",
      moraleja: "Tener la razón salió gratis. Para ti.",
      art: "caja"
    },

    fin_sobres: {
      final: true, tono: "agridulce",
      titulo: "El ángel de la caja 3",
      texto: "El segundo sobre completó la plata y el barrio completó la historia: «el ángel de la caja 3», le dicen. Brayan conservó el puesto sin saber a quién agradecerle. Solo la vecina te mira distinto en el ascensor, con ese 👀 que no necesita palabras. Nunca ha dicho nada. Tú tampoco. Ese silencio es el trato.",
      moraleja: "El anónimo también paga completo, pero nunca descansa.",
      art: "chat"
    },

    fin_desvio: {
      final: true, tono: "oscuro",
      titulo: "Tres cuadras más lejos",
      texto: "El súper de la otra cuadra es más caro y no fía. El desvío son tres cuadras de ida y tres de vuelta, con mercado y con Coco. Un día Emma, ya caminando, jala hacia la esquina de siempre: «¿por qué nunca entramos a ese?». Le inventas algo de la fila. Ella te cree. Por ahora te cree.",
      moraleja: "El silencio no se paga de una: se paga en cuadras, todos los días.",
      art: "pasillo"
    },

    fin_urgencias: {
      final: true, tono: "agridulce",
      titulo: "Turno 47",
      texto: "Seis horas de sala de espera para oír «virosis, suero y pañitos». Emma amaneció mejor el martes, el mismo día de la quincena. Don Óscar tachó la deuda sin ceremonia. El imán sigue en la nevera: unos días te da rabia mirarlo y otros días no, y todavía no sabes cuáles días tienen la razón.",
      moraleja: "Devolverlo fue lo correcto. Nadie prometió que lo correcto llegara con pediatra.",
      art: "fiebre"
    },

    fin_pediatra: {
      final: true, tono: "agridulce",
      titulo: "El chip prestado",
      texto: "Empeñaste el celular sin pensarlo dos veces: pediatra, antibiótico, Emma dormida a las ocho. En el teléfono prestado las fotos se ven chiquitas. A los cuarenta días lo recuperaste. En el súper, Brayan te guarda las promociones «de buena clienta», y no sabe que la buena clienta hace cuentas con el corazón en la mano desde ese viernes.",
      moraleja: "La honestidad no te prestó plata: te fio la gente que la vio.",
      art: "telefono"
    }
  }
};
