/* ============================================================
   EN CALIENTE · story.js · "El vuelto"
   Voz: hablada, casual, como contando un chisme. Nada de novela.
   2 opciones por escena · timeout siempre · todo next debe existir.
   Editar cómodo: historia/HISTORIA.md · validar: node game/validate.js
   ============================================================ */

window.STORY = {
  "meta": {
    "titulo": "EN CALIENTE",
    "subtitulo": "un juego sobre decidir con la sangre hirviendo",
    "protagonista": "Jimena",
    "emocionInicial": 40,
    "tiempoInicial": 100
  },
  "start": "intro",
  "nodes": {
    "intro": {
      "hora": "7:40 p.m. · viernes, salida del supermercado",
      "escena": "Pagaste con veinte mil y el cajero, que es nuevo y estaba ahogado con la fila, se enredó: te devolvió como si hubieras pagado con setenta. O sea: cincuenta mil de más, ahí en tu mano. Y tú con la leche de Emma acabándose y la quincena apenas el lunes. Eso dijeron: el lunes.",
      "art": "caja",
      "timer": 25,
      "choices": [
        {
          "txt": "Guardarlo y caminar.",
          "emocion": 14,
          "tiempo": 0,
          "impulso": true,
          "eco": "Te lo metiste al bolsillo. Ni lo pensaste tanto, la verdad.",
          "next": "n2_guarda"
        },
        {
          "txt": "Volver a la caja. Devolverlo.",
          "emocion": -6,
          "tiempo": -6,
          "impulso": false,
          "eco": "Te devolviste con toda la fila mirándote. Alguien hasta resopló.",
          "next": "n2_devuelve"
        }
      ],
      "timeout": {
        "emocion": 18,
        "eco": "Te quedaste pensándolo en la puerta hasta que el guarda te miró. Y caminaste.",
        "next": "n2_guarda"
      }
    },
    "n2_guarda": {
      "hora": "8:05 p.m. · tienda de don Óscar",
      "escena": "Con esa plata te alcanza para todo: la leche de Emma, el cuido de Coco y hasta huevos. Y mientras empaca, don Óscar suelta el comentario: «¿Sí supo? Al cajero nuevo del súper le descuentan del sueldo lo que falte en la caja. Así los tienen a todos».",
      "art": "tienda",
      "timer": 20,
      "choices": [
        {
          "txt": "Comprar todo. Emma y Coco primero.",
          "emocion": 8,
          "tiempo": -4,
          "impulso": true,
          "eco": "La bolsa quedó llena. Y tú con un peso raro encima.",
          "next": "n3_casa"
        },
        {
          "txt": "Solo la leche. El resto se devuelve mañana.",
          "emocion": -4,
          "tiempo": -5,
          "impulso": false,
          "eco": "Separaste treinta y dos mil en el otro bolsillo. Para devolverlos mañana.",
          "next": "n3_mitad"
        }
      ],
      "timeout": {
        "emocion": 10,
        "eco": "Don Óscar ya tenía todo empacado. Pagaste y ya.",
        "next": "n3_casa"
      }
    },
    "n3_casa": {
      "hora": "9:30 p.m. · tu casa",
      "escena": "Emma comió y quedó dormida. Coco dejó el plato brillante. Y justo ahí, en el grupo del barrio, la vecina reenvía: «Ojo: en el súper van a echar al muchacho de la caja 3 por un descuadre de $50.000». Y todo el mundo poniendo caritas tristes.",
      "art": "cuna",
      "timer": 20,
      "choices": [
        {
          "txt": "Mañana devuelvo los cincuenta. Completos.",
          "emocion": -6,
          "tiempo": -6,
          "impulso": false,
          "eco": "Devolverlos completos. Ya te gastaste treinta y uno… te toca conseguirlos.",
          "next": "n4_reponer"
        },
        {
          "txt": "Callar. Mi bebé comió. Punto.",
          "emocion": 10,
          "tiempo": 0,
          "impulso": true,
          "eco": "Silenciaste el grupo. Pero el grupo sigue ahí.",
          "next": "n4_silencio"
        }
      ],
      "timeout": {
        "emocion": 8,
        "eco": "Escribiste tres respuestas y las borraste todas.",
        "next": "n4_silencio"
      }
    },
    "n3_mitad": {
      "hora": "6:50 a.m. · sábado, súper de la esquina",
      "escena": "Madrugaste al súper con los treinta y dos mil que quedaron y el discurso ensayado. Pero en la caja 3 ya no está el muchacho: hay una señora de moño. «¿Brayan? Hoy le hacen el descargo a las diez», te dice, sin dejar de pasar productos.",
      "art": "caja",
      "timer": 20,
      "choices": [
        {
          "txt": "Esperar el descargo y entrar a contar todo.",
          "emocion": -5,
          "tiempo": -8,
          "impulso": false,
          "eco": "Te sentaste a esperar en la panadería del frente, con un tinto.",
          "next": "n4_descargo"
        },
        {
          "txt": "Dejar los treinta y dos en un sobre. Sin nombre.",
          "emocion": 6,
          "tiempo": -4,
          "impulso": true,
          "eco": "Dejaste el sobre con una nota: «esto es del descuadre de ayer, falta el resto, perdón».",
          "next": "n4_sobre"
        }
      ],
      "timeout": {
        "emocion": 8,
        "eco": "Se te hizo tarde ahí sentada. El tinto se enfrió.",
        "next": "n4_descargo"
      }
    },
    "n4_reponer": {
      "hora": "7:15 a.m. · sábado, compraventa La Milagrosa",
      "escena": "Para completar los cincuenta te faltan diecinueve. Y terminaste en la compraventa, con tus argollas de grado en el mostrador. El señor las pesó y soltó: «le doy veinticinco». Detrás tuyo, una fila de gente de sábado con la misma cara tuya.",
      "art": "nomina",
      "timer": 20,
      "choices": [
        {
          "txt": "Empeñarlas. Devolver completo hoy.",
          "emocion": -4,
          "tiempo": -6,
          "impulso": false,
          "eco": "Te dieron un recibo rosado: 30 días para recuperarlas. Otra deuda más.",
          "next": "fin_completos"
        },
        {
          "txt": "Devolver solo lo que hay. Y dar la cara.",
          "emocion": -8,
          "tiempo": -5,
          "impulso": false,
          "eco": "Devolviste los treinta y uno y diste tu nombre. Era lo que había.",
          "next": "fin_cara"
        }
      ],
      "timeout": {
        "emocion": 6,
        "eco": "No fuiste capaz. Te fuiste con las argollas puestas.",
        "next": "fin_cara"
      }
    },
    "n4_silencio": {
      "hora": "jueves siguiente · 6:20 p.m. · parada del bus",
      "escena": "Coco engordó y Emma estrenó tarro de leche. Pero hoy, en la parada del bus, está el muchacho de la caja 3 con una caja de cartón en las piernas. Te reconoce: fuiste su última clienta. «¿Sí ve? Me sacaron por cincuenta lucas», te dice. Y hasta sonríe.",
      "art": "parada",
      "timer": 20,
      "choices": [
        {
          "txt": "Contarle. Ahí, en la parada.",
          "emocion": -10,
          "tiempo": -5,
          "impulso": false,
          "eco": "Se lo contaste todo. No te insultó: te dio las gracias por contarle. Peor.",
          "next": "fin_parada"
        },
        {
          "txt": "«Qué injusticia», decir. Y mirar el celular.",
          "emocion": 12,
          "tiempo": 0,
          "impulso": true,
          "eco": "Le dijiste «qué injusticia» y te pusiste a mirar el celular. El bus llegó rápido.",
          "next": "fin_callada"
        }
      ],
      "timeout": {
        "emocion": 8,
        "eco": "Él mismo cambió de tema por el aguacero. Te salvó la lluvia.",
        "next": "fin_callada"
      }
    },
    "n4_descargo": {
      "hora": "10:20 a.m. · sábado, oficina del administrador",
      "escena": "Entraste al descargo. Brayan estaba de civil, con una carpeta en las piernas. Contaste todo: el billete, la leche, los treinta y dos que trajiste. El administrador escuchó y dijo: «el reglamento es el reglamento, pero esto cambia las cosas». Brayan ni te miró.",
      "art": "juntas",
      "timer": 20,
      "choices": [
        {
          "txt": "Ofrecer pagar el resto por cuotas. Firmado.",
          "emocion": -5,
          "tiempo": -6,
          "impulso": false,
          "eco": "Firmaste un acuerdo de pago ahí mismo, al lado de Brayan.",
          "next": "fin_cuotas"
        },
        {
          "txt": "«El error fue de la caja. Ya devolví lo que pude.»",
          "emocion": 10,
          "tiempo": 0,
          "impulso": true,
          "eco": "Dijiste que el error fue de la caja y que ya devolviste lo que pudiste. Técnicamente cierto.",
          "next": "fin_reglamento"
        }
      ],
      "timeout": {
        "emocion": 6,
        "eco": "El administrador decidió solo: «descuento compartido». Y ya.",
        "next": "fin_cuotas"
      }
    },
    "n4_sobre": {
      "hora": "lunes · 7:30 a.m. · grupo del barrio",
      "escena": "Por fin cayó la quincena. Y en el grupo del barrio, la señora del moño publicó la foto de tu sobre: «apareció esto en la caja 3, Dios le pague a quien fue». Cuarenta mensajes. Y la vecina, que todo lo ve: «yo creo que fue alguien de por aquí 👀».",
      "art": "chat",
      "timer": 20,
      "choices": [
        {
          "txt": "Completar hoy los dieciocho que faltan. Otro sobre.",
          "emocion": -5,
          "tiempo": -5,
          "impulso": false,
          "eco": "Armaste otro sobre con los dieciocho que faltaban.",
          "next": "fin_sobres"
        },
        {
          "txt": "No volver a ese súper. Nunca.",
          "emocion": 8,
          "tiempo": 0,
          "impulso": true,
          "eco": "Decidiste no volver a ese súper. Queda el de la otra cuadra: más caro y más lejos.",
          "next": "fin_desvio"
        }
      ],
      "timeout": {
        "emocion": 7,
        "eco": "Dejaste el chat en visto. El 👀 quedó ahí, mirándote.",
        "next": "fin_desvio"
      }
    },
    "n2_devuelve": {
      "hora": "7:52 p.m. · caja 3",
      "escena": "Volviste y se lo entregaste. El muchacho contó el billete dos veces y casi llora: «me salvaste el puesto». El administrador te regaló un imán de nevera: CLIENTE HONESTO ⭐. Y saliste con tus dieciocho mil y la lista imposible: leche, cuido, pañales.",
      "art": "caja",
      "timer": 20,
      "choices": [
        {
          "txt": "Pedirle fiado a don Óscar. Otra vez.",
          "emocion": -4,
          "tiempo": -5,
          "impulso": false,
          "eco": "Otra vez a la tienda de don Óscar, a pedir fiado.",
          "next": "n3_fiado"
        },
        {
          "txt": "Estirar lo que hay: agua de panela y medio tarro.",
          "emocion": 8,
          "tiempo": 0,
          "impulso": true,
          "eco": "Decidiste estirar lo que hay: agua de panela y lo que quede del tarro.",
          "next": "n3_estirar"
        }
      ],
      "timeout": {
        "emocion": 8,
        "eco": "Te fuiste derecho a la casa, con el imán en el bolso.",
        "next": "n3_estirar"
      }
    },
    "n3_fiado": {
      "hora": "8:20 p.m. · tienda de don Óscar",
      "escena": "Don Óscar apuntó la leche y el cuido en su cuaderno, sin poner cara de nada. «Va en ciento doce, mija», dijo bajito. Pero la señora de las empanadas alcanzó a oír. Y afuera Coco amarrado, moviendo la cola como si todo estuviera bien.",
      "art": "tienda",
      "timer": 20,
      "choices": [
        {
          "txt": "«Apunte también unos huevos.» Frente en alto.",
          "emocion": -4,
          "tiempo": -4,
          "impulso": false,
          "eco": "«Apúnteme también unos huevos», dijiste. Con la frente en alto.",
          "next": "n4_fiebre"
        },
        {
          "txt": "Solo la leche. Coco come sobras esta semana.",
          "emocion": 6,
          "tiempo": 0,
          "impulso": true,
          "eco": "Solo la leche. A Coco le tocan sobras esta semana. Él ni se queja.",
          "next": "n4_fiebre"
        }
      ],
      "timeout": {
        "emocion": 5,
        "eco": "Don Óscar apuntó lo de siempre. Ya se sabe tu lista de memoria.",
        "next": "n4_fiebre"
      }
    },
    "n3_estirar": {
      "hora": "2:40 a.m. · tu casa",
      "escena": "Dos de la mañana. Emma se despertó dos veces y el tarro quedó en las raspaditas. Coco ni pidió, como si entendiera. Y el banco mandó mensaje: «quincena consignada el lunes festivo = martes». Martes. Y el imán ahí en la nevera, brillando: CLIENTE HONESTO ⭐.",
      "art": "cuna",
      "timer": 20,
      "choices": [
        {
          "txt": "Escribirle a tu hermana. Tragarse el orgullo.",
          "emocion": -8,
          "tiempo": -4,
          "impulso": false,
          "eco": "Le escribiste a tu hermana. Respondió de una: «yo te consigno mañana, boba».",
          "next": "n4_fiebre"
        },
        {
          "txt": "Nadie tiene que saber cómo estás. Aguantar.",
          "emocion": 10,
          "tiempo": 0,
          "impulso": true,
          "eco": "No le contaste a nadie. Uno aguanta calladito.",
          "next": "n4_fiebre"
        }
      ],
      "timeout": {
        "emocion": 8,
        "eco": "Te quedaste dormida con el mensaje escrito, sin mandarlo.",
        "next": "n4_fiebre"
      }
    },
    "n4_fiebre": {
      "hora": "domingo · 7:10 a.m. · tu casa",
      "escena": "Emma amaneció con fiebre: 38,9. Llamaste a la EPS y el menú de opciones terminó en cita para el otro jueves. El pediatra del centro comercial atiende hoy, pero vale sesenta mil. Y tú hace dos días tuviste cincuenta en la mano. Lo pensaste. Obvio que lo pensaste.",
      "art": "fiebre",
      "timer": 20,
      "choices": [
        {
          "txt": "Urgencias de la EPS. La fila que toque.",
          "emocion": 6,
          "tiempo": -10,
          "impulso": false,
          "eco": "Urgencias de la EPS: turno 47 y van por el 12. Emma dormida en tu pecho.",
          "next": "fin_urgencias"
        },
        {
          "txt": "Empeñar el celular. Pediatra hoy mismo.",
          "emocion": -4,
          "tiempo": -6,
          "impulso": true,
          "eco": "Empeñaste el celular: «le doy setenta». Y saliste corriendo al pediatra.",
          "next": "fin_pediatra"
        }
      ],
      "timeout": {
        "emocion": 8,
        "eco": "Con pañitos de agua la fiebre bajó un poquito. La angustia no.",
        "next": "fin_urgencias"
      }
    },
    "fin_completos": {
      "final": true,
      "tono": "agridulce",
      "titulo": "Cincuenta completos, argollas menos",
      "texto": "Alcanzaste a devolver los cincuenta completos antes del descargo. A Brayan no lo echaron y nunca supo tu nombre. Eso sí: tus argollas de grado quedaron empeñadas y tienes 30 días para recuperarlas. Pero Emma comió toda la semana. Y al final eso era lo que importaba, ¿no?",
      "moraleja": "Devolver tarde también cuesta. Y esa cuenta no la cobra el banco: la cobra uno mismo.",
      "art": "nomina"
    },
    "fin_cara": {
      "final": true,
      "tono": "bueno",
      "titulo": "Con nombre y apellido",
      "texto": "Devolviste los treinta y uno que tenías y diste la cara: «el resto lo pago por quincenas». Tu palabra sirvió en el descargo y a Brayan no lo echaron. Y don Óscar, que se entera de todo, ahora te guarda el pan de ayer, «que sale más barato y sabe igual». El barrio se dio cuenta. El barrio siempre se da cuenta.",
      "moraleja": "No devolviste la plata completa, pero tu nombre sí quedó completo.",
      "art": "tienda"
    },
    "fin_parada": {
      "final": true,
      "tono": "agridulce",
      "titulo": "La deuda de la parada",
      "texto": "Se lo contaste ahí en la parada, y él te dio las gracias por la honestidad. Eso dolió más que un insulto. Desde entonces, cada quincena le consignas diez mil a su Nequi, sin que nadie te lo pida, hasta completarle. Emma y Coco están bien. Pero el bus de las 6:20 ya no lo coges: te dio por caminar.",
      "moraleja": "Hay deudas que uno paga aunque nadie las esté cobrando.",
      "art": "parada"
    },
    "fin_callada": {
      "final": true,
      "tono": "oscuro",
      "titulo": "Los vueltos, dos veces",
      "texto": "No dijiste nada y la vida siguió: Coco gordo, Emma sana, la quincena llegó. A ese súper no volviste más. Y te quedó una maña que nadie te conoce: cada vez que un cajero te da vueltas, las cuentas dos veces, despacito. Como esperando que sobre algo, a ver si esta vez sí lo devuelves.",
      "moraleja": "Lo que uno calla no se va. Se queda viviendo en los vueltos.",
      "art": "caja"
    },
    "fin_cuotas": {
      "final": true,
      "tono": "bueno",
      "titulo": "Dos firmas en la misma mesa",
      "texto": "Firmaste el acuerdo de pago al lado de Brayan: tú pusiste los diecinueve que faltaban y a él no le descontaron nada, porque tu versión lo salvó. Pagaste en dos quincenas. Ahora los sábados te guarda turno en la caja 3 y te pregunta por Emma. Y el imán de CLIENTE HONESTO al final sí te lo dieron.",
      "moraleja": "Reconocer el embarrado al lado del que casi lo paga vale más que la plata.",
      "art": "juntas"
    },
    "fin_reglamento": {
      "final": true,
      "tono": "oscuro",
      "titulo": "Legalmente impecable",
      "texto": "Dijiste la frase correcta: «el error fue de la caja». Y es verdad, es legal, nadie te puede decir nada. El reglamento hizo el resto: a Brayan le descontaron la diferencia en dos quincenas. A ti te dieron las gracias «por el gesto». Y el imán de CLIENTE HONESTO lo botaste en la primera caneca que viste.",
      "moraleja": "Salir con la razón te salió gratis. A ti.",
      "art": "caja"
    },
    "fin_sobres": {
      "final": true,
      "tono": "agridulce",
      "titulo": "El ángel de la caja 3",
      "texto": "El segundo sobre completó la plata, y el barrio inventó su versión: «el ángel de la caja 3». Brayan conservó el puesto sin saber a quién agradecerle. La única que sospecha es la vecina, que te mira en el ascensor con ese 👀. Nunca ha dicho nada. Tú tampoco. Y así se quedan las dos.",
      "moraleja": "Pagar de anónimo también cuenta. Pero uno nunca descansa del todo.",
      "art": "chat"
    },
    "fin_desvio": {
      "final": true,
      "tono": "oscuro",
      "titulo": "Tres cuadras más lejos",
      "texto": "El súper de la otra cuadra es más caro y no fía, pero allá nadie te conoce. El desvío son tres cuadras más, cargando mercado y con Coco. Un día Emma, ya caminando, jaló para la esquina de siempre: «¿y por qué nunca entramos a este?». Le inventaste algo de la fila. Y te creyó. Por ahora.",
      "moraleja": "El silencio no se paga de una vez. Se paga por cuadras, todos los días.",
      "art": "pasillo"
    },
    "fin_urgencias": {
      "final": true,
      "tono": "agridulce",
      "titulo": "Turno 47",
      "texto": "Seis horas en urgencias para que te dijeran «virosis: suero y pañitos». Emma amaneció bien el martes, justo el día que cayó la quincena. Don Óscar tachó la deuda del cuaderno sin decir nada. Y el imán sigue ahí en la nevera: hay días que te da rabia verlo y días que no. Todavía no sabes cuáles tienen la razón.",
      "moraleja": "Devolverlo era lo correcto. Lo que nadie te dijo es que lo correcto no venía con pediatra.",
      "art": "fiebre"
    },
    "fin_pediatra": {
      "final": true,
      "tono": "agridulce",
      "titulo": "El chip prestado",
      "texto": "Empeñaste el celular sin pensarlo: pediatra, antibiótico y Emma dormidita a las ocho. Estuviste 40 días con un teléfono prestado donde las fotos se ven chiquitas. En el súper, Brayan ahora te guarda las promociones «por buena clienta». Y no sabe que la buena clienta hace cuentas con el alma desde ese viernes.",
      "moraleja": "La honestidad no te presta plata. Pero la gente que la vio, sí.",
      "art": "telefono"
    }
  }
};
