/* ============================================================
   EN CALIENTE — story.js
   ============================================================
   GUÍA RÁPIDA PARA EL EQUIPO (cómo agregar o editar escenas)

   1. Toda la historia vive en window.STORY.nodes. Cada llave
      ("intro", "enviado", "fin_fria"...) es un nodo del grafo.
      El juego arranca en STORY.start.

   2. NODO NORMAL (no final) lleva:
        hora    : "9:47 a.m. · sala de juntas"  (hora + lugar)
        escena  : texto de la situación (máx ~55 palabras)
        art     : uno de: juntas, mensaje, chat, pasillo, carpeta,
                  usb, cafetera, escaleras, parqueadero, telefono,
                  bano, escritorio
        timer   : segundos para decidir (intro=20, resto=15)
        choices : lista de opciones, cada una con:
           txt     : texto del botón (máx 8 palabras, con voz)
           emocion : -30..+30 (negativo calma, positivo enciende)
           tiempo  : -15..0 (cuánto tiempo de vida quema)
           impulso : true si es decisión en caliente
           eco     : frase seca tras elegir (máx 12 palabras)
           next    : llave del siguiente nodo
        timeout : { emocion, eco, next } — si el reloj llega a 0,
                  "el impulso decide por ti".

   3. NODO FINAL lleva:
        final: true, tono: "bueno"|"oscuro"|"negro",
        titulo, texto (máx ~70 palabras), moraleja, art

   4. REGLAS DE LA CASA:
      - Nada genérico. Detalles concretos: la taza, el audio,
        el letrero de piso mojado. Si suena a frase de taza de
        café, se borra.
      - REGLA DE ORO: todo next debe apuntar a un nodo que
        exista. Probar la partida completa antes de subir.

   5. Estructura actual: intro → nivel 2 (4 nodos) → nivel 3
      (1 por cada nodo de nivel 2) → finales (9).
      Cada partida son exactamente 3 decisiones.
   ============================================================ */

window.STORY = {
  meta: {
    titulo: "EN CALIENTE",
    subtitulo: "Un día de oficina. Quince segundos por decisión.",
    protagonista: "Jimena",
    emocionInicial: 42,
    tiempoInicial: 100
  },
  start: "intro",
  nodes: {

    /* ================= NIVEL 1 ================= */

    intro: {
      hora: "9:47 a.m. · sala de juntas",
      escena: "Patricia pregunta, delante de todos, quién subió el consolidado dañado. Camila te mira fijo y dice: «Jimena lo montó anoche». Anoche tú estabas en urgencias de la EPS. El ventilador chirría. En tu celular, listo hace diez minutos, un mensaje con siete pantallazos que prueban todo. Destinatario: toda la oficina. Tu pulgar flota sobre enviar.",
      art: "juntas",
      timer: 20,
      choices: [
        {
          txt: "Mandarlo. Ahora. Que arda.",
          emocion: 25, tiempo: -5, impulso: true,
          eco: "Siete pantallazos. Un chulito gris. Después, dos.",
          next: "enviado"
        },
        {
          txt: "Bloquear la pantalla. Respirar por la nariz.",
          emocion: -15, tiempo: -10, impulso: false,
          eco: "«Lo revisamos después del almuerzo», dice Patricia. Sobreviviste.",
          next: "aguantas"
        },
        {
          txt: "Sonreír y anotar la hora exacta.",
          emocion: -5, tiempo: -8, impulso: false,
          eco: "9:47. Lo escribes con buena letra.",
          next: "fria"
        }
      ],
      timeout: {
        emocion: 20,
        eco: "El pulgar decidió por ti. Enviado.",
        next: "resbalon"
      }
    },

    /* ================= NIVEL 2 ================= */

    enviado: {
      hora: "9:49 a.m. · sala de juntas",
      escena: "Enviado. Los celulares vibran en cadena, del fondo de la mesa hacia ti. Patricia lee sin mover la cara. Camila escribe… borra… escribe… El de contabilidad reacciona con 😮. El ventilador chirría en la esquina y, por primera vez en dos años, todos lo oyen.",
      art: "chat",
      timer: 15,
      choices: [
        {
          txt: "Sostenerle la mirada a Patricia.",
          emocion: -10, tiempo: -5, impulso: false,
          eco: "Patricia guarda el celular. Muy despacio.",
          next: "n3_corrillo"
        },
        {
          txt: "Agregar: «con pantallazos, para que conste».",
          emocion: 15, tiempo: -8, impulso: true,
          eco: "Doble chulo azul en treinta y cuatro celulares.",
          next: "n3_corrillo"
        },
        {
          txt: "Salir de la sala antes que nadie.",
          emocion: -5, tiempo: -5, impulso: false,
          eco: "El pasillo aplaude en silencio. O eso sientes.",
          next: "n3_corrillo"
        }
      ],
      timeout: {
        emocion: 10,
        eco: "Todo el mundo sacó el celular. Nadie te mira.",
        next: "n3_corrillo"
      }
    },

    aguantas: {
      hora: "10:15 a.m. · pasillo del servidor",
      escena: "Fuiste por agua para no ir por sangre. De vuelta, abres el servidor: la carpeta de Camila no tiene respaldo. Ninguno. Todo el trimestre vive en su computador y en la suerte. Un clic tuyo y el error de anoche sería un chiste al lado de esto. Nadie te está mirando.",
      art: "carpeta",
      timer: 15,
      choices: [
        {
          txt: "Pantallazo a la carpeta vacía. Por si acaso.",
          emocion: 5, tiempo: -5, impulso: false,
          eco: "Guardado en «Varios 2». Nadie busca en «Varios 2».",
          next: "n3_servidor"
        },
        {
          txt: "Cerrar la ventana. Tú no viste nada.",
          emocion: -10, tiempo: -6, impulso: false,
          eco: "El clic de cerrar sonó más fuerte que el ventilador.",
          next: "n3_servidor"
        },
        {
          txt: "Decírselo de frente: «no tiene respaldo».",
          emocion: -5, tiempo: -8, impulso: false,
          eco: "«¿Y a usted qué le importa?», responde. Pero palidece.",
          next: "n3_servidor"
        }
      ],
      timeout: {
        emocion: 10,
        eco: "Doña Marta pasó con el trapero y te vio ahí, congelada.",
        next: "n3_servidor"
      }
    },

    fria: {
      hora: "10:40 a.m. · puesto de Camila",
      escena: "Camila salió a «una vuelta». En su puesto, junto al portátil, una USB roja con cinta y marcador: «PLAN B — no abrir». La gaveta quedó abierta. Adentro, tu hoja de vida impresa, subrayada con verde. Fecha de impresión: hace tres semanas. El corrillo de la cafetera está de espaldas.",
      art: "usb",
      timer: 15,
      choices: [
        {
          txt: "Copiar la USB en tu computador. Rápido.",
          emocion: 10, tiempo: -6, impulso: false,
          eco: "Cuarenta segundos. La barra de copiado más larga de tu vida.",
          next: "n3_usb"
        },
        {
          txt: "Echártela al bolsillo. Completa.",
          emocion: 15, tiempo: -4, impulso: true,
          eco: "La USB pesa como si supiera algo.",
          next: "n3_usb"
        },
        {
          txt: "Fotos primero. La USB, «prestada» después.",
          emocion: -5, tiempo: -7, impulso: false,
          eco: "Tu hoja de vida sale nítida. La USB, al bolso.",
          next: "n3_usb"
        }
      ],
      timeout: {
        emocion: 12,
        eco: "Camila volvió por el otro pasillo. «¿Se le perdió algo?»",
        next: "n3_usb"
      }
    },

    resbalon: {
      hora: "9:48 a.m. · sala de juntas",
      escena: "No lo mandaste. O sea: sí. Tu pulgar rozó enviar mientras Patricia hablaba y ahora treinta y cuatro personas tienen los pantallazos y un audio que ni recordabas haber grabado. El celular te vibra en la mano como un animal. Camila levanta su teléfono. Lo lee. Te mira.",
      art: "telefono",
      timer: 15,
      choices: [
        {
          txt: "«Me hackearon.» Con cara seria.",
          emocion: 15, tiempo: -5, impulso: true,
          eco: "Nadie en la sala te cree. Ni tú.",
          next: "n3_rrhh"
        },
        {
          txt: "«Sí, fui yo. Y todo es cierto.»",
          emocion: 8, tiempo: -6, impulso: false,
          eco: "Silencio. El ventilador chirría dos veces.",
          next: "n3_rrhh"
        },
        {
          txt: "Borrar para todos. Ya. Ya. Ya.",
          emocion: 18, tiempo: -4, impulso: true,
          eco: "«Se eliminó este mensaje». Peor que el mensaje.",
          next: "n3_rrhh"
        }
      ],
      timeout: {
        emocion: 15,
        eco: "Los tres puntos de Patricia aparecen. Y desaparecen.",
        next: "n3_rrhh"
      }
    },

    /* ================= NIVEL 3 ================= */

    n3_corrillo: {
      hora: "11:20 a.m. · baño del segundo piso",
      escena: "Camila llora frente al lavamanos. Rímel corrido, pero el llanto sube cuando entra gente y baja cuando sale. Te ve por el espejo. «¿Contenta?», dice, y la voz le tiembla, o la hace temblar. Afuera, el corrillo de la cafetera espera el segundo capítulo con vasos desechables.",
      art: "bano",
      timer: 15,
      choices: [
        {
          txt: "«El archivo era suyo. Esto se me fue.»",
          emocion: -12, tiempo: -6, impulso: false,
          eco: "Camila cierra la llave. Por primera vez hay silencio de verdad.",
          next: "fin_humana"
        },
        {
          txt: "«Llore bonito, que afuera están grabando.»",
          emocion: 20, tiempo: -4, impulso: true,
          eco: "Alguien en un cubículo dijo «uy». Se oyó clarito.",
          next: "fin_villana"
        },
        {
          txt: "Salir del baño sin decir nada.",
          emocion: 5, tiempo: -6, impulso: false,
          eco: "El corrillo se aparta. Nadie te ofrece tinto.",
          next: "fin_viral"
        }
      ],
      timeout: {
        emocion: 15,
        eco: "Entró la practicante, celular en alto, grabando en vertical.",
        next: "fin_viral"
      }
    },

    n3_servidor: {
      hora: "2:30 p.m. · oficina de Patricia",
      escena: "Patricia cierra la puerta con seguro. «Yo sé que el archivo no fue suyo», dice, sin sorpresa. «Camila me sirve donde está. Usted me sirve más callada. Aguante este golpe y en enero queda libre la coordinación.» Sobre su escritorio, boca abajo, tu evaluación de desempeño.",
      art: "escritorio",
      timer: 15,
      choices: [
        {
          txt: "«No, jefa. Esto se aclara hoy.»",
          emocion: -8, tiempo: -6, impulso: false,
          eco: "Patricia sonríe despacio. «Sabía que iba a decir eso».",
          next: "fin_paz"
        },
        {
          txt: "«¿Enero? ¿Coordinación? ¿Firmamos algo?»",
          emocion: 5, tiempo: -5, impulso: false,
          eco: "Se dan la mano. La de ella está helada.",
          next: "fin_trato"
        },
        {
          txt: "Asentir. Solo asentir.",
          emocion: -15, tiempo: -7, impulso: false,
          eco: "La puerta se abre. El pasillo sigue igual. Tú no.",
          next: "fin_apagada"
        }
      ],
      timeout: {
        emocion: 8,
        eco: "«Piénselo», dice Patricia, y te da la espalda. Ya lo pensaste.",
        next: "fin_apagada"
      }
    },

    n3_usb: {
      hora: "3:10 p.m. · sala pequeña",
      escena: "«PLAN B», abierto al fin en un computador sin sesión iniciada: correos donde Camila le vende a la competencia el cliente grande, con tarifas y fechas de entrega. Firma como «C». Justo entonces, el correo de Patricia: «Sala pequeña, 3:15, usted y yo». Cinco minutos. Dinamita ajena en las manos.",
      art: "juntas",
      timer: 15,
      choices: [
        {
          txt: "Solo tu caso: fechas, la EPS, el archivo.",
          emocion: -10, tiempo: -6, impulso: false,
          eco: "Patricia toma nota. Tres veces subraya «anoche».",
          next: "fin_fria"
        },
        {
          txt: "Proyectar los correos en la sala. Todo.",
          emocion: 18, tiempo: -4, impulso: true,
          eco: "Patricia lee «C» dos veces. La segunda, moviendo los labios.",
          next: "fin_villana"
        },
        {
          txt: "Devolver la USB a la gaveta. Manos limpias.",
          emocion: -12, tiempo: -5, impulso: false,
          eco: "La cinta queda igualita. Tus manos, no.",
          next: "fin_fria"
        }
      ],
      timeout: {
        emocion: 12,
        eco: "Llegaste tarde, con la USB en la mano. Camila ya estaba adentro.",
        next: "fin_despido"
      }
    },

    n3_rrhh: {
      hora: "4:45 p.m. · piso 3, Recursos Humanos",
      escena: "RRHH te cita «para conversar». En la sala: la psicóloga, un formato en blanco y un vaso de agua que nadie te ofreció. «Cuéntenos qué pasó con el mensaje». Tu celular vibra: alguien subió tu audio a un grupo que se llama «EN CALIENTE 🔥». Tiene 118 miembros.",
      art: "escritorio",
      timer: 15,
      choices: [
        {
          txt: "«La forma estuvo mal. El fondo no.»",
          emocion: -10, tiempo: -6, impulso: false,
          eco: "La psicóloga guarda el formato. Saca otro. Uno mejor.",
          next: "fin_humana"
        },
        {
          txt: "«Ese audio es inteligencia artificial.»",
          emocion: 15, tiempo: -5, impulso: true,
          eco: "En el audio se oye tu tos. Tu tos es famosa.",
          next: "fin_despido"
        },
        {
          txt: "Correr a borrar el audio del servidor.",
          emocion: 25, tiempo: -4, impulso: true,
          eco: "El servidor queda dos pisos abajo. Corriendo se llega antes.",
          next: "fin_fatal"
        }
      ],
      timeout: {
        emocion: 15,
        eco: "Te quedaste muda. La psicóloga escribió tres líneas sin mirarte.",
        next: "fin_despido"
      }
    },

    /* ================= FINALES ================= */

    fin_fria: {
      final: true,
      tono: "bueno",
      titulo: "Sangre fría",
      texto: "Patricia revisa las fechas. La cita de la EPS coincide al minuto. El lunes, el archivo amanece «corregido» y Camila pide traslado a la sede norte sin que nadie se lo pida. La USB volvió a su puesto, cinta y letrero intactos. No la necesitaste. Ella sabe que la viste. Tú sabes que ella sabe. Con eso basta.",
      moraleja: "El poder real es la prueba que decides no usar.",
      art: "carpeta"
    },

    fin_humana: {
      final: true,
      tono: "bueno",
      titulo: "Dar la cara",
      texto: "Hubo comité. Te llamaron la atención por el mensaje; a Camila, por el archivo. Firmaste tu parte sin pelear la letra. Dos meses después ella te saluda en el ascensor y tú respondes, y ninguna lo hace por gusto, pero lo hacen. La taza de «Team Player» sigue en tu escritorio. Ya no te parece un chiste.",
      moraleja: "Equivocarse de frente cansa menos que tener razón escondida.",
      art: "cafetera"
    },

    fin_paz: {
      final: true,
      tono: "bueno",
      titulo: "La guerra que no fue",
      texto: "Dijiste que no con la puerta todavía asegurada. Al día siguiente lo aclaraste en el chat general: fechas, la EPS, cero adjetivos. Nadie aplaudió. Patricia no te perdona y Camila no te mira, y sin embargo duermes corrido por primera vez en semanas. La coordinación de enero fue para otra. El pulso, para ti.",
      moraleja: "Un no dicho a tiempo vale más que un cargo en enero.",
      art: "escritorio"
    },

    fin_trato: {
      final: true,
      tono: "oscuro",
      titulo: "La socia",
      texto: "Enero llegó y la coordinación fue tuya, con oficina y silla que no chirría. También llegaron los mensajes de Patricia a las diez de la noche: «¿Cómo vio hoy a Andrés? ¿Y a la practicante?». Los respondes todos. En tu gaveta ya hay una USB con cinta y marcador. Todavía no le pones nombre. Todavía.",
      moraleja: "Lo que aceptas a puerta cerrada te lo cobran a puerta cerrada.",
      art: "usb"
    },

    fin_apagada: {
      final: true,
      tono: "oscuro",
      titulo: "En silencio",
      texto: "No dijiste nada. Ni ese día ni los siguientes. La coordinación de enero fue para la sobrina de alguien. Camila te pide favores con tono dulce y tú se los haces. En las noches redactas el mensaje completo, con los pantallazos, perfecto. Nunca lo mandas. El ventilador sigue chirriando. Hace rato dejaste de oírlo.",
      moraleja: "Callar también es una decisión. La vuelves a tomar cada mañana.",
      art: "mensaje"
    },

    fin_despido: {
      final: true,
      tono: "oscuro",
      titulo: "El carné por la ranura",
      texto: "El comité duró once minutos. «Pérdida de confianza», dice la carta, que no menciona el archivo, ni la EPS, ni a Camila. Empacas en una caja de resma de papel: la taza, el cargador, un cactus. El de seguridad te acompaña al parqueadero y te desea suerte, y lo dice en serio, y eso es lo peor.",
      moraleja: "Nadie te despide por estar equivocada; te despiden por cómo tuviste la razón.",
      art: "parqueadero"
    },

    fin_viral: {
      final: true,
      tono: "oscuro",
      titulo: "Tendencia",
      texto: "El pantallazo salió de la oficina antes del almuerzo. A las cinco ya eras un TikTok con voz en off: «POV: la compañera tóxica». Tres millones de vistas y en los comentarios nadie pregunta de quién era el archivo. En la panadería de abajo, la cajera te mira dos veces. Tú tenías las pruebas. Internet tenía el video.",
      moraleja: "Internet no lee contexto. Lee pantallazos.",
      art: "telefono"
    },

    fin_villana: {
      final: true,
      tono: "oscuro",
      titulo: "La mala del cuento",
      texto: "Todo lo que mostraste era cierto. Camila renunció esa misma tarde, llorando por todo el pasillo, despacio, asegurándose público. Ahora tú eres «la que hizo llorar a Camila» y ella, «la muchacha que pasó por algo muy duro». Te escribió al salir: «cuídate mucho ✨». Tus pruebas duermen en un expediente que nadie volvió a abrir.",
      moraleja: "Quemaste a la bruja con su propia leña. Ahora hueles a humo.",
      art: "pasillo"
    },

    fin_fatal: {
      final: true,
      tono: "negro",
      titulo: "Fuera de línea",
      texto: "Bajaste las escaleras de a tres, escribiendo «ya lo borro» con una mano. El letrero amarillo de piso húmedo estaba puesto; doña Marta siempre lo pone. En tu funeral hubo flores de la empresa y un minuto de silencio que Patricia cronometró. El grupo «EN CALIENTE 🔥» te dedicó una velita. A los ocho minutos ya hablaban de otra cosa.",
      moraleja: "Corriste a borrar un audio y la borrada fuiste tú.",
      art: "escaleras"
    }
  }
};
