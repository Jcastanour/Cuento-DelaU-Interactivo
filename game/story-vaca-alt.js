/* ============================================================
   EN CALIENTE · story.js · "La vaca de Marcela"
   ============================================================
   GUÍA RÁPIDA PARA EL EQUIPO (cómo agregar o editar escenas)

   1. Toda la historia vive en window.STORY.nodes. Cada llave
      ("intro", "n2_excel", "fin_deuda"...) es un nodo del grafo.
      El juego arranca en STORY.start.

   2. NODO NORMAL (no final) lleva:
        hora    : "8:52 a.m. · martes 22, tu escritorio"
                  (la hora AVANZA durante el día; la torta es al otro día)
        escena  : texto de la situación (máx ~55 palabras)
        art     : uno de: juntas, mensaje, chat, pasillo, carpeta,
                  usb, cafetera, escaleras, parqueadero, telefono,
                  bano, escritorio, nomina, impresora, almuerzo,
                  ascensor
        timer   : segundos para decidir (intro=25, resto=20)
        choices : lista de opciones, cada una con:
           txt     : texto del botón (máx 9 palabras, con voz)
           emocion : -30..+30 (negativo calma, positivo enciende)
           tiempo  : -15..0 (cuánto tiempo de vida quema)
           impulso : true si es decisión en caliente
           eco     : frase seca tras elegir (máx 12 palabras)
           next    : llave del siguiente nodo
        timeout : { emocion, eco, next }. Si el reloj llega a 0,
                  el impulso decide por ti. Y duele.

   3. NODO FINAL lleva:
        final: true, tono: "bueno" | "agridulce" | "oscuro",
        titulo (máx 6 palabras), texto (máx ~75 palabras),
        moraleja (una frase nueva, nada de proverbios), art

   4. REGLAS DE LA CASA:
      - Nada genérico. Detalles concretos: el sobre de manila,
        la celda D14, el papel carbón del talonario, el tupper
        de Marcela en la nevera. Si suena a frase de taza, se borra.
      - Prohibido el guion largo como puntuación.
      - REGLA DE ORO: todo next debe apuntar a un nodo que
        exista. Probar la partida completa antes de subir.

   5. Estructura actual: intro (timer 25) → nivel 2 (3 nodos) →
      nivel 3 (6 nodos, hay convergencias) → nivel 4 (5 nodos:
      la torta) → finales (10: 2 buenos, 4 agridulces, 4 oscuros).
      Cada partida son exactamente 4 decisiones.
   ============================================================ */

window.STORY = {
  meta: {
    titulo: "EN CALIENTE",
    subtitulo: "un juego sobre decidir con la sangre hirviendo",
    protagonista: "Jimena",
    emocionInicial: 42,
    tiempoInicial: 100
  },
  start: "intro",
  nodes: {

    /* ================= NIVEL 1 ================= */

    intro: {
      hora: "8:52 a.m. · martes 22, tu escritorio",
      escena: "En «Regalo Marcela 🤫»: «Jime, pásanos cuentas hoy que mañana es la entrega». El sobre de manila del cajón: 262.000. Recogiste 300.000. Los 38.000 se los llevó un Rappi un viernes sin efectivo; repones el 30, con la quincena. Hoy es 22. Tres 🙌 y Lorena: «¿nos pasas el Excel con todo?». El Excel lo hiciste tú. Como siempre.",
      art: "chat",
      timer: 25,
      choices: [
        {
          txt: "Escribir la verdad: me colgué, el 30 repongo.",
          emocion: -10, tiempo: -8, impulso: false,
          eco: "Enviado. El chat queda «en línea», sin escribir, cuatro minutos.",
          next: "n2_confiesa"
        },
        {
          txt: "Conseguir 38.000 hoy. De donde sea.",
          emocion: 10, tiempo: -6, impulso: true,
          eco: "«Cuentas esta tarde 👍», respondes. El pulgar apenas te tiembla.",
          next: "n2_plata"
        },
        {
          txt: "Abrir el Excel. Los números se acomodan.",
          emocion: 15, tiempo: -5, impulso: true,
          eco: "La celda D14 parpadea. Tú también.",
          next: "n2_excel"
        }
      ],
      timeout: {
        emocion: 18,
        eco: "Escribiste «ya casi 😊» y abriste el Excel. El 😊 pesó.",
        next: "n2_excel"
      }
    },

    /* ================= NIVEL 2 ================= */

    n2_confiesa: {
      hora: "9:36 a.m. · tu escritorio",
      escena: "Lo mandaste. Cuatro minutos de silencio y luego Lorena: «tranquila, todas tenemos meses duros ✨». Nadie más escribe. Sandra te mira por encima de las pantallas, dos segundos, y vuelve a lo suyo. Marcela, que no está en el grupo, te manda un meme de gatos por privado. El sobre queda abierto sobre el teclado.",
      art: "mensaje",
      timer: 20,
      choices: [
        {
          txt: "Pantallazo del Rappi: que vean qué fue.",
          emocion: 5, tiempo: -6, impulso: true,
          eco: "Hamburguesa doble, viernes 11:48 p.m. Lorena responde: «jaja ok».",
          next: "n3_lorena"
        },
        {
          txt: "«Mañana llevo los 38 completos, cuenten con eso.»",
          emocion: 6, tiempo: -6, impulso: true,
          eco: "Lo mandas sin saber de dónde van a salir.",
          next: "n3_frente"
        },
        {
          txt: "Escribirle a Sandra por privado. Solo a ella.",
          emocion: -5, tiempo: -6, impulso: false,
          eco: "Sandra responde con un punto. Luego: «cafetera, 3:15».",
          next: "n3_sandra"
        }
      ],
      timeout: {
        emocion: 12,
        eco: "Tu confesión quedó arriba, sola, entre dos stickers de fiesta.",
        next: "n3_lorena"
      }
    },

    n2_plata: {
      hora: "12:40 p.m. · centro comercial, hora de almuerzo",
      escena: "Saliste «a almorzar» y estás en la fila del cajero con la tarjeta en la mano. El banco cobra por avance: pantalla chiquita, letra chiquita, comisión grande. Adelante, un señor lleva siete minutos. En el grupo, Lorena: «¿entonces esta tarde sí, Jime?». El sobre quedó en el cajón, con llave.",
      art: "nomina",
      timer: 20,
      choices: [
        {
          txt: "Avance de 40. Que cobre el banco.",
          emocion: 8, tiempo: -6, impulso: true,
          eco: "Recibo: avance 40.000, comisión 24.900. El papel tiembla.",
          next: "n3_cuadrada"
        },
        {
          txt: "Guardar la tarjeta. Escribirle a Sandra, la de nómina.",
          emocion: -5, tiempo: -6, impulso: false,
          eco: "Le escribes desde la fila. «Cafetera, 3:15», responde.",
          next: "n3_sandra"
        },
        {
          txt: "Salir de la fila y escribir la verdad.",
          emocion: -8, tiempo: -7, impulso: false,
          eco: "Lo escribes ahí, de pie, junto al de los helados.",
          next: "n3_frente"
        }
      ],
      timeout: {
        emocion: 12,
        eco: "«Fuera de servicio» en tu turno. Terminas escribiéndole a Sandra, la de nómina.",
        next: "n3_sandra"
      }
    },

    n2_excel: {
      hora: "9:58 a.m. · tu escritorio",
      escena: "El Excel en blanco. Recogido: 300.000. La freidora apartada donde doña Ángela: 262.000. Quedan 38.000 que el grupo cree que existen. Escribes 300.000 en la celda del regalo y todo cierra. Enviar. Lorena, al minuto: «quedó como caro ¿no? 😅 pásame la factura, que quiero regalarle lo mismo a mi mamá».",
      art: "escritorio",
      timer: 20,
      choices: [
        {
          txt: "Ir donde doña Ángela por una factura «ajustada».",
          emocion: 10, tiempo: -6, impulso: false,
          eco: "Apuntas la dirección del pasaje. Ensayas la frase toda la tarde.",
          next: "n3_vendedora"
        },
        {
          txt: "Nuevo rubro: «envoltura y tarjeta personalizada, 38.000».",
          emocion: 8, tiempo: -5, impulso: true,
          eco: "La celda lo acepta sin preguntar. Las celdas son así.",
          next: "n3_rubro"
        },
        {
          txt: "Borrar todo y escribir: «me colgué con 38».",
          emocion: -10, tiempo: -8, impulso: false,
          eco: "Ctrl+Z hasta el principio. Luego la verdad, sin formato.",
          next: "n3_frente"
        }
      ],
      timeout: {
        emocion: 12,
        eco: "«Ahora te la paso», escribiste. Ese «ahora» empezó a crecer.",
        next: "n3_rubro"
      }
    },

    /* ================= NIVEL 3 ================= */

    n3_lorena: {
      hora: "10:45 a.m. · cafetera del tercer piso",
      escena: "Lorena revuelve su aromática. «De verdad, tranquila», dice, con la cucharita dando vueltas. «Solo que el Excel quede clarito: qué se recogió, qué falta y desde cuándo». Desde cuándo. En la nevera, el tupper de Marcela con su nombre en cinta. Mañana a las 10:30 cortan la torta.",
      art: "cafetera",
      timer: 20,
      choices: [
        {
          txt: "«Mañana llego con los 38 completos.»",
          emocion: 8, tiempo: -6, impulso: true,
          eco: "«Así da gusto», dice Lorena. Esa tarde le pides los cuarenta a Sandra.",
          next: "n4_torta_sandra"
        },
        {
          txt: "Proponer en el grupo: compramos con lo que hay.",
          emocion: -10, tiempo: -7, impulso: false,
          eco: "«Como te parezca, tú eres la que sabe ✨», escribe Lorena.",
          next: "n4_torta_paz"
        },
        {
          txt: "Responder el ✨ con otro ✨ y aguantar.",
          emocion: -3, tiempo: -5, impulso: false,
          eco: "Dos brillitos en pantalla. Ninguno brilla.",
          next: "n4_torta_paz"
        }
      ],
      timeout: {
        emocion: 10,
        eco: "Lorena se fue con su taza. Tu tinto se enfrió esperándote.",
        next: "n4_torta_paz"
      }
    },

    n3_frente: {
      hora: "8:20 p.m. · tu apartamento",
      escena: "Cuentas sobre la mesa del comedor: 9.200 en monedas y un billete arrugado, la tarjeta con cupo, el simulador del banco abierto en «avance en efectivo». Ya dijiste la verdad en el grupo; falta decidir con qué cara llegas mañana. Lorena fijó un mensaje: «entrega 10:30, puntualidad porfa 🎂». El chat de Sandra, la de nómina, abierto y en blanco.",
      art: "nomina",
      timer: 20,
      choices: [
        {
          txt: "Llegar con lo que hay y deber hasta el 30.",
          emocion: -8, tiempo: -6, impulso: false,
          eco: "La bolsita de monedas suena a lo que es.",
          next: "n4_torta_paz"
        },
        {
          txt: "Avance en el cajero, esta noche, llegar completa.",
          emocion: 10, tiempo: -7, impulso: true,
          eco: "El cajero escupe dos billetes. Comisión: 24.900.",
          next: "n4_torta_deuda"
        },
        {
          txt: "«Sandra, ¿me salvas hasta el 30?»",
          emocion: 3, tiempo: -6, impulso: false,
          eco: "Responde a la primera: «mañana se los llevo. Tranquila».",
          next: "n4_torta_sandra"
        }
      ],
      timeout: {
        emocion: 8,
        eco: "Te dormiste con la calculadora prendida. Mañana, con lo que hay.",
        next: "n4_torta_paz"
      }
    },

    n3_sandra: {
      hora: "3:15 p.m. · cafetera del tercer piso",
      escena: "Sandra llega con su termo y sin preguntas. Espera a que la practicante se vaya con su yogur. «¿Cuánto le falta?», dice, y saca del bolso dos billetes de veinte doblados en cuatro: la plata del mercado. «Me los devuelve el 30 y de esto ni un audio». El microondas pita tres veces.",
      art: "almuerzo",
      timer: 20,
      choices: [
        {
          txt: "Recibirlos. «El 30, lo juro.»",
          emocion: -5, tiempo: -5, impulso: false,
          eco: "Los billetes tibios del bolso. Cuarenta mil; sobran dos.",
          next: "n4_torta_sandra"
        },
        {
          txt: "No recibirlos. Decir la verdad en el grupo.",
          emocion: -10, tiempo: -7, impulso: false,
          eco: "Sandra guarda la plata. Esa tarde escribes la verdad al grupo.",
          next: "n4_torta_paz"
        },
        {
          txt: "Recibirlos y ofrecerle 45 el 30.",
          emocion: 5, tiempo: -5, impulso: true,
          eco: "«¿Me está pagando intereses, Jimena?» No sonríe.",
          next: "n4_torta_sandra"
        }
      ],
      timeout: {
        emocion: 10,
        eco: "Guardó los billetes: «usted verá». Esa noche escribes la verdad.",
        next: "n4_torta_paz"
      }
    },

    n3_cuadrada: {
      hora: "4:20 p.m. · tu escritorio",
      escena: "El sobre otra vez en 300.000, con dos billetes que huelen a cajero. Pasas el Excel: recogido 300, freidora apartada 262, sobrante 38 para gaseosas y bombas. Todo cierra porque tú lo tapaste. Lorena responde de una: «uy, juiciosa 👏 ¿me pasas la factura cuando la recojas? Quiero regalarle lo mismo a mi mamá».",
      art: "carpeta",
      timer: 20,
      choices: [
        {
          txt: "«Claro, mañana te la mando 👍»",
          emocion: -3, tiempo: -5, impulso: false,
          eco: "Un chulo, dos chulos, azules. Nadie sabe nada.",
          next: "n4_torta_deuda"
        },
        {
          txt: "Contarle a Sandra lo del avance. A alguien.",
          emocion: -6, tiempo: -6, impulso: false,
          eco: "«¿24.900 de comisión?», dice Sandra, como quien dice culebras.",
          next: "n4_torta_deuda"
        },
        {
          txt: "Sacar los billetes del sobre y confesar los 38.",
          emocion: -8, tiempo: -7, impulso: false,
          eco: "Devuelves el avance esa tarde. La comisión, esa sí, ya es tuya.",
          next: "n4_torta_paz"
        }
      ],
      timeout: {
        emocion: 8,
        eco: "Le diste «me gusta» a su mensaje y apagaste el computador.",
        next: "n4_torta_deuda"
      }
    },

    n3_vendedora: {
      hora: "6:15 p.m. · local de doña Ángela, pasaje del centro",
      escena: "Doña Ángela envuelve la freidora en papel globo mientras su nieta hace tareas en el mostrador. Sacas la frase ensayada: que si la factura puede salir «por trescientos, por una cosa de la oficina». Deja de envolver. «¿Y eso pa' qué, mija? Yo facturo lo que cobro». El talonario está ahí, con su papel carbón y todo.",
      art: "impresora",
      timer: 20,
      choices: [
        {
          txt: "«Hágamela por 300 y quédese con 10.»",
          emocion: 12, tiempo: -6, impulso: true,
          eco: "Escribe despacio, sin mirarte. El carbón copia todo dos veces.",
          next: "n4_torta_factura"
        },
        {
          txt: "«Démela sin valor, yo la lleno.»",
          emocion: 10, tiempo: -5, impulso: true,
          eco: "Te la entrega en blanco. «Eso ya es cosa suya».",
          next: "n4_torta_factura"
        },
        {
          txt: "«Nada, no importa. La real está bien.»",
          emocion: -10, tiempo: -6, impulso: false,
          eco: "El moño queda lindo. Esa noche, el Excel dice la verdad.",
          next: "n4_torta_paz"
        }
      ],
      timeout: {
        emocion: 10,
        eco: "Entró otra clienta. Esa noche el Excel estrena rubro: «envoltura, 38.000».",
        next: "n4_torta_rubro"
      }
    },

    n3_rubro: {
      hora: "4:50 p.m. · tu escritorio",
      escena: "El rubro quedó: «envoltura y tarjeta personalizada: 38.000». Enviado. Lorena responde con la foto de un puesto de envolturas: «¿38? ¿dónde, para no ir? 😂 en el de la 14 cobran seis». Alguien manda un jajaja. Marcela, por privado, sin saber nada: «gracias por organizar todo, Jime 💛».",
      art: "carpeta",
      timer: 20,
      choices: [
        {
          txt: "«Es artesanal, con caligrafía. Por eso.»",
          emocion: 10, tiempo: -5, impulso: true,
          eco: "«Ahh ok», escribe Lorena. Ese «ahh» tiene doble fondo.",
          next: "n4_torta_rubro"
        },
        {
          txt: "Bajarlo a 15 y repartir el resto en «varios».",
          emocion: 8, tiempo: -6, impulso: true,
          eco: "Versión 3 del Excel. El historial las guarda todas.",
          next: "n4_torta_rubro"
        },
        {
          txt: "Borrar el rubro y escribir la verdad.",
          emocion: -10, tiempo: -8, impulso: false,
          eco: "«Me colgué con 38. El 30 repongo». Enviar.",
          next: "n4_torta_paz"
        }
      ],
      timeout: {
        emocion: 12,
        eco: "Dejaste el jajaja en visto. El rubro se quedó quieto, esperando.",
        next: "n4_torta_rubro"
      }
    },

    /* ================= NIVEL 4 · LA TORTA ================= */

    n4_torta_paz: {
      hora: "10:30 a.m. · miércoles 23, sala de juntas",
      escena: "La freidora, con su moño, hace llorar a Marcela antes de abrirla. «Yo sé lo que costó», dice, mirándolos a todos, y a ti de últimas. El Excel con la verdad lleva horas en el grupo. Lorena corta la torta y, con el cuchillo en la mano: «al final cuadró todo, ¿no, Jime?».",
      art: "juntas",
      timer: 20,
      choices: [
        {
          txt: "«Cuadró porque lo conté a tiempo.»",
          emocion: -5, tiempo: -5, impulso: false,
          eco: "Lorena te sirve porción de primeras. Con rosita y todo.",
          next: "fin_ganada"
        },
        {
          txt: "Sonreír, repartir servilletas, no dar papaya.",
          emocion: -3, tiempo: -5, impulso: false,
          eco: "La torta es de milo. Nadie vuelve al tema. Hoy.",
          next: "fin_lunes"
        },
        {
          txt: "«El Rappi más caro de mi vida.»",
          emocion: 5, tiempo: -4, impulso: true,
          eco: "Se ríen de verdad. Hasta Lorena, con torta en la boca.",
          next: "fin_ganada"
        }
      ],
      timeout: {
        emocion: 6,
        eco: "Repartiste tenedores, callada. La pregunta flotó y se fue.",
        next: "fin_lunes"
      }
    },

    n4_torta_deuda: {
      hora: "10:30 a.m. · miércoles 23, sala de juntas",
      escena: "El sobre cerró en 300 y en la sala nadie pregunta cómo. Marcela abraza la freidora: «yo sé lo que costó, con este año tan duro». Tu celular vibra contra la pierna: «Compra AVANCE T.CRÉDITO. Pago mínimo: 21/08». Lorena reparte torta contenta: los números cuadraron perfecto. El extracto que viene es asunto tuyo.",
      art: "telefono",
      timer: 20,
      choices: [
        {
          txt: "Sostener la sonrisa. La deuda es tuya, privada.",
          emocion: 5, tiempo: -5, impulso: false,
          eco: "Volteas el celular boca abajo. Aplaudes con todos.",
          next: "fin_deuda"
        },
        {
          txt: "Decirlo esta noche en el grupo, ya repuesto.",
          emocion: -6, tiempo: -6, impulso: false,
          eco: "Redactas mentalmente mientras cantan el feliz cumpleaños.",
          next: "fin_lunes"
        },
        {
          txt: "Diferir el avance a 24 cuotas desde el baño.",
          emocion: 8, tiempo: -6, impulso: true,
          eco: "Tres clics entre el lavamanos y el secador. Listo. Invisible.",
          next: "fin_deuda"
        }
      ],
      timeout: {
        emocion: 6,
        eco: "El celular vibró tres veces más. Lo dejaste bocabajo, cantando.",
        next: "fin_deuda"
      }
    },

    n4_torta_sandra: {
      hora: "10:30 a.m. · miércoles 23, sala de juntas",
      escena: "Los cuarenta mil de Sandra ya duermen en el sobre; sobraron dos mil que no sabes dónde poner. Marcela llora con la freidora y Sandra te mira desde el otro lado de la torta, con su pedazo intacto. Lorena, celular en mano, repasa el Excel por deporte. «Quedó bonito», dice. No dice qué.",
      art: "juntas",
      timer: 20,
      choices: [
        {
          txt: "Decirlo: faltaba plata, Sandra me salvó, pago el 30.",
          emocion: -8, tiempo: -6, impulso: false,
          eco: "Silencio con torta. Marcela: «eso también costó». Sandra asiente.",
          next: "fin_deuda_publica"
        },
        {
          txt: "Callar y pagarle el 30, cumplida, en efectivo.",
          emocion: -3, tiempo: -5, impulso: false,
          eco: "Sandra por fin prueba su pedazo. No te mira más.",
          next: "fin_treinta"
        },
        {
          txt: "Evitar su mirada. Concentrarse en la torta.",
          emocion: 10, tiempo: -5, impulso: true,
          eco: "El glaseado, las velitas, el mantel. Cualquier cosa menos Sandra.",
          next: "fin_fria_sandra"
        }
      ],
      timeout: {
        emocion: 8,
        eco: "Sandra dejó su pedazo a medias y volvió al puesto.",
        next: "fin_fria_sandra"
      }
    },

    n4_torta_factura: {
      hora: "10:30 a.m. · miércoles 23, sala de juntas",
      escena: "La factura por 300.000 circula pegada al Excel. Marcela, conmovida: «yo sé lo que costó». Lorena tiene el celular en la mano y en la pantalla, abierta, la misma freidora en Falabella: $262.900, envío gratis. Sube el celular apenas un poco. «Qué raro», dice, dulce. «Aquí está más barata».",
      art: "telefono",
      timer: 20,
      choices: [
        {
          txt: "«A nosotras nos costó eso. Cosas del local.»",
          emocion: 12, tiempo: -5, impulso: true,
          eco: "Lorena guarda el celular sonriendo. Guarda también otra cosa.",
          next: "fin_grupo_nuevo"
        },
        {
          txt: "«Hoy es de Marcela. Luego revisamos, ¿sí?»",
          emocion: 8, tiempo: -5, impulso: false,
          eco: "«Obvio», dice Lorena, y se anota algo mental. Todos lo ven.",
          next: "fin_auditoria"
        },
        {
          txt: "Soltarlo todo, con la torta servida.",
          emocion: -10, tiempo: -7, impulso: false,
          eco: "«La factura la pedí yo. Faltaban 38. Míos». Silencio largo.",
          next: "fin_tarde"
        }
      ],
      timeout: {
        emocion: 12,
        eco: "No dijiste nada. Lorena giró la pantalla hacia Marcela.",
        next: "fin_descubierta"
      }
    },

    n4_torta_rubro: {
      hora: "10:30 a.m. · miércoles 23, sala de juntas",
      escena: "Marcela lee la tarjeta del regalo en voz alta: «Feliz cumple, te queremos». Letra de esfero, papel de siempre. «¿Esta es la tarjeta personalizada del Excel?», pregunta la practicante, sin maldad, con el archivo abierto en el celular. Lorena no dice nada. Lorena ya googleó cuánto vale una envoltura.",
      art: "juntas",
      timer: 20,
      choices: [
        {
          txt: "«La caligrafía la cobraron aparte. Es sutil.»",
          emocion: 12, tiempo: -5, impulso: true,
          eco: "La practicante acerca la tarjeta a la cara. Buscando la caligrafía.",
          next: "fin_grupo_nuevo"
        },
        {
          txt: "Soltar la verdad, con la torta servida.",
          emocion: -10, tiempo: -7, impulso: false,
          eco: "«No hay envoltura de 38. Hubo un Rappi. Mío». Ya.",
          next: "fin_tarde"
        },
        {
          txt: "«Error de celda. Ahorita lo corrijo.»",
          emocion: 8, tiempo: -5, impulso: true,
          eco: "Versión 5 del Excel, desde el baño. El historial anota.",
          next: "fin_auditoria"
        }
      ],
      timeout: {
        emocion: 10,
        eco: "Marcela guardó la tarjeta despacio, mirándote solo a ti.",
        next: "fin_descubierta"
      }
    },

    /* ================= FINALES ================= */

    fin_ganada: {
      final: true,
      tono: "bueno",
      titulo: "Cuentas claras",
      texto: "El 30, día de quincena, el último peso de los 38.000 cae al fondo antes del café. Pantallazo al grupo, sin mensaje. Lorena responde: «juiciosa 💪». En diciembre, cuando arman la vaca de fin de año, el mensaje llega solito: «Jime, ¿nos manejas la plata?». Aceptas. Esta vez el sobre de manila vive en el cajón con llave, y los Rappi de viernes salen de tu Nequi.",
      moraleja: "Un descuadre confesado el martes es anécdota; descubierto el miércoles, expediente.",
      art: "nomina"
    },

    fin_deuda_publica: {
      final: true,
      tono: "bueno",
      titulo: "Costó y se dijo",
      texto: "Lo dijiste con el cuchillo de la torta todavía en la mesa y nadie se murió. Marcela repitió «eso también costó» y Lorena, por una vez, no agregó nada. El 30 le pagas a Sandra delante de la cafetera, billetes contados, y el jueves te guarda puesto en la mesa de siempre. En diciembre la vaca tiene dos administradoras: tú y Sandra. Por votación.",
      moraleja: "Deber en voz alta fue lo único que te subió el crédito.",
      art: "cafetera"
    },

    fin_lunes: {
      final: true,
      tono: "agridulce",
      titulo: "La porción sin rosita",
      texto: "Nadie volvió a tocar el tema. En voz alta. Los 38.000 quedaron repuestos hasta el último peso y el Excel muere en paz en una carpeta que nadie abre. Pero en la vaca de diciembre la plata la maneja Lorena, «para rotar responsabilidades», y a ti te toca comprar las bombas. Marcela usa la freidora cada semana y manda fotos de papas al grupo. Les das pulgar arriba.",
      moraleja: "La confianza no se pierde de golpe: se rota, como las responsabilidades.",
      art: "cafetera"
    },

    fin_deuda: {
      final: true,
      tono: "agridulce",
      titulo: "El hueco cambió de dueño",
      texto: "Nadie miró tu celular. La vaca cerró perfecta, Marcela guardó el moño de recuerdo y Lorena archivó el Excel como ejemplo de transparencia. El avance lo pagas en cuotas: 38.000 se volvieron 63.000 entre comisión e intereses. Cada extracto llega un 21. Cada 21 te acuerdas del Rappi, de la hamburguesa, del viernes. Estaba buena, eso sí.",
      moraleja: "El banco te fía el silencio al 3,1% mensual.",
      art: "telefono"
    },

    fin_treinta: {
      final: true,
      tono: "agridulce",
      titulo: "Paz y salvo",
      texto: "El 30, a las 9:02, le entregas a Sandra un sobre chiquito: los treinta y ocho que tapó y los dos mil que sobraron, cuarenta justos. Los cuenta de un vistazo, sin contar. Cumplida, exacta, sin intereses. Siguen almorzando juntas los jueves, pero cuando alguien habla de plata en la mesa, Sandra revuelve la sopa y te deja hablar a ti primero.",
      moraleja: "Pagaste los cuarenta exactos; el antecedente quedó en cuenta aparte.",
      art: "almuerzo"
    },

    fin_tarde: {
      final: true,
      tono: "agridulce",
      titulo: "Con la torta servida",
      texto: "Lo dijiste tarde, pero lo dijiste tú. Marcela habló primero: «por 38.000 no se daña un cumpleaños». Se comieron la torta, un poco en silencio. El 30 repusiste, con pantallazo. Nadie te sacó el tema otra vez, aunque Lorena guardó tu mensaje con estrellita, y tú lo sabes porque a veces la ves buscándolo. La freidora, eso sí, quedó perfecta.",
      moraleja: "Confesar cuando ya te vieron no borra la deuda: apenas rebaja la multa.",
      art: "juntas"
    },

    fin_fria_sandra: {
      final: true,
      tono: "oscuro",
      titulo: "El pedazo intacto",
      texto: "Le pagaste el 30, puntual, por Nequi, sin mirarla. Sandra respondió «recibido». Desde entonces almuerza con las de contabilidad y a ti te saluda con la cabeza, cordial, como se saluda al de la fotocopiadora. Nunca contó nada a nadie, y eso es lo peor: el cobro fue la silla vacía del jueves, todos los jueves, sin fecha de vencimiento.",
      moraleja: "Te prestó sin preguntas y le pagaste sin mirarla: quedaron en ceros.",
      art: "almuerzo"
    },

    fin_descubierta: {
      final: true,
      tono: "oscuro",
      titulo: "La pantalla girada",
      texto: "Lorena no gritó. Dejó el precio real a la vista, el que cualquiera podía buscar, y que cada uno restara solo. Marcela dijo «no importa, de verdad», que es lo que se dice cuando importa. El 30 repusiste los 38.000 y nadie los recibió con comentarios. Ahora eres puntual, transparente, impecable: mandas pantallazo hasta del domicilio de las empanadas. Nadie te lo pide. Por eso mismo.",
      moraleja: "No te acusó nadie: la aritmética se defendió sola.",
      art: "telefono"
    },

    fin_auditoria: {
      final: true,
      tono: "oscuro",
      titulo: "Historial de versiones",
      texto: "La revisión llegó por correo: Lorena, el Excel adjunto y todas sus versiones recuperadas, cada una con su fecha y su hora, la del martes a las 11:58 p.m. incluida. No hubo pelea; hubo un documento. Devolviste los 38.000 al día siguiente, con un párrafo que nadie contestó. La vaca sigue existiendo. Ahora las cuentas las lleva un formulario de Google que administra Lorena.",
      moraleja: "El Excel perdona; el historial de versiones, jamás.",
      art: "carpeta"
    },

    fin_grupo_nuevo: {
      final: true,
      tono: "oscuro",
      titulo: "Grupo nuevo",
      texto: "Nadie te desmintió en la torta. Tu explicación pasó, dulce, y pareció quedar atrás. En noviembre, Marcela te muestra un meme y alcanzas a ver su lista de chats: «Vaca Diciembre 🎄», foto de todos en la última integración. Tú no estás. Cuando preguntas por la natilla, Lorena responde rapidito: «tranquila, este año queremos que descanses de cuentas ✨». Con brillitos y todo.",
      moraleja: "En la oficina nadie te acusa: te dejan de agregar.",
      art: "chat"
    }
  }
};
