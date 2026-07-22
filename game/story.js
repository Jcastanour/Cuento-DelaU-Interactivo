/* ════════════════════════════════════════════════════════
   EN CALIENTE · la historia
   ─────────────────────────────────────────────────────────
   Este archivo es DATOS. Para agregar escenas entre todos:

   1. Cada nodo tiene un id (la llave del objeto).
   2. `escena`: lo que pasa (2ª persona, presente, corto y con sabor).
   3. `timer`: segundos para decidir (omitir en finales).
   4. `choices`: 2-3 opciones. Cada una:
        txt      → lo que dice el botón
        emocion  → cuánto sube/baja tu emoción (-30 a +30)
        tiempo   → cuánto te cuesta del día (0 a -15)
        impulso  → true si es una decisión "en caliente"
        eco      → frase corta que aparece tras elegir
        next     → id del siguiente nodo
   5. `timeout`: qué pasa si el reloj llega a 0 (no decidir es decidir).
   6. Finales: { final:true, tono:"bueno"|"oscuro"|"negro", titulo, texto, moraleja }
   ════════════════════════════════════════════════════════ */

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

    /* ─────────── EL DETONANTE ─────────── */

    intro: {
      hora: "9:47 a.m. · sala de juntas",
      escena: "Camila acaba de echarte la culpa de SU error. Con sonrisita. Frente a Patricia y todo el equipo. Nadie dice nada. La cara te arde… y en tu pantalla está listo el mensaje que la hunde con pruebas, dirigido a TODA la oficina.",
      timer: 20,
      choices: [
        {
          txt: "Mandarlo. Ahora.",
          emocion: 22, tiempo: 0, impulso: true,
          eco: "Le diste a enviar. No hay vuelta atrás.",
          next: "enviado"
        },
        {
          txt: "Cerrar el portátil y respirar",
          emocion: -8, tiempo: -5,
          eco: "Lo tragaste. Por ahora.",
          next: "aguantas"
        },
        {
          txt: "«Con gusto reviso ese error, Patricia»",
          emocion: 6, tiempo: -8,
          eco: "Sonreíste. Nadie vio el volcán.",
          next: "fria"
        }
      ],
      timeout: {
        emocion: 30,
        eco: "Te temblaba la mano… y el dedo se resbaló. Enviado.",
        next: "resbalon"
      }
    },

    /* ─────────── NIVEL 2 ─────────── */

    enviado: {
      hora: "9:49 a.m. · el chat estalla",
      escena: "«¿Esto es en serio?» «😳» «JAJAJA». Veinte personas leyendo tus pruebas contra Camila. Patricia levanta la vista del celular, muy despacio. Camila se pone de pie y camina directo hacia ti.",
      timer: 15,
      choices: [
        {
          txt: "Levantarte y encararla delante de todos",
          emocion: 20, tiempo: -5, impulso: true,
          eco: "Todo el mundo sacó el celular a grabar.",
          next: "fin_escandalo"
        },
        {
          txt: "«Me equivoqué en la forma. Hablemos»",
          emocion: -10, tiempo: -8,
          eco: "Respiraste. La sala bajó dos grados.",
          next: "fin_humana"
        },
        {
          txt: "«¡Me hackearon!»",
          emocion: 12, tiempo: 0, impulso: true,
          eco: "TI revisa los registros en 10 minutos…",
          next: "fin_hundida"
        }
      ],
      timeout: {
        emocion: 15,
        eco: "Te quedaste helada. Camila llegó primero… con su versión.",
        next: "fin_hundida"
      }
    },

    aguantas: {
      hora: "11:30 a.m. · a solas con el 'error'",
      escena: "Respiraste. Nadie vio nada. Ahora Patricia te dejó revisando 'tu' error… que es de Camila. Y ves su carpeta abierta en el servidor: TODO su trabajo del mes, sin respaldo, a un clic de desaparecer.",
      timer: 15,
      choices: [
        {
          txt: "Armar las pruebas y mostrarlas con calma",
          emocion: -6, tiempo: -10,
          eco: "Frío. Metódico. Irrefutable.",
          next: "fin_fria"
        },
        {
          txt: "Borrar. La. Carpeta.",
          emocion: 25, tiempo: 0, impulso: true,
          eco: "Clic. La papelera también. Qué silencio tan rico.",
          next: "fin_fatal"
        },
        {
          txt: "Cerrar todo y dejarlo así",
          emocion: 8, tiempo: -5,
          eco: "Otra vez te lo tragaste. Ya van muchas.",
          next: "fin_apagada"
        }
      ],
      timeout: {
        emocion: 12,
        eco: "Te quedaste mirando la carpeta demasiado tiempo… y llegó gente.",
        next: "fin_apagada"
      }
    },

    fria: {
      hora: "2:15 p.m. · tu escritorio",
      escena: "Tu jugada fría funcionó: Patricia empieza a sospechar sola. Y justo ahora encuentras, olvidada en tu escritorio, la USB de Camila. Adentro: su trabajo… y una carpeta que se llama 'PLAN B – no abrir'.",
      timer: 15,
      choices: [
        {
          txt: "Devolverla sin abrirla",
          emocion: -8, tiempo: 0,
          eco: "Se la entregaste mirándola a los ojos. Ella entendió.",
          next: "fin_paz"
        },
        {
          txt: "Abrir 'PLAN B'",
          emocion: 15, tiempo: -5, impulso: true,
          eco: "Ay. Eso no lo debiste ver.",
          next: "fin_escandalo"
        },
        {
          txt: "«¿De quién será esto?» …y se 'pierde'",
          emocion: 18, tiempo: 0, impulso: true,
          eco: "La USB cayó al fondo de tu cajón. Qué pena con ella.",
          next: "fin_hundida_tu"
        }
      ],
      timeout: {
        emocion: 10,
        eco: "Camila volvió por ella antes de que decidieras. Te vio con la USB en la mano.",
        next: "fin_escandalo"
      }
    },

    resbalon: {
      hora: "9:48 a.m. · enviado 'solo'",
      escena: "Se envió. Tú ni siquiera decidiste… ¿o sí? El chat arde. Camila te mira desde el otro lado de la sala con los ojos MUY abiertos. Patricia pregunta, con voz de hielo: «Jimena, ¿qué es esto?»",
      timer: 15,
      choices: [
        {
          txt: "«Fue mi dedo… pero cada palabra es cierta»",
          emocion: 10, tiempo: -5,
          eco: "Media oficina asintió en silencio.",
          next: "fin_humana"
        },
        {
          txt: "«Mi gato pisó el teclado»",
          emocion: 15, tiempo: 0, impulso: true,
          eco: "No tienes gato. Y todos lo saben.",
          next: "fin_escandalo"
        },
        {
          txt: "Doblar la apuesta: «Y hay más»",
          emocion: 24, tiempo: 0, impulso: true,
          eco: "Sacaste la segunda carpeta. La sala dejó de respirar.",
          next: "fin_fatal"
        }
      ],
      timeout: {
        emocion: 18,
        eco: "El silencio te respondió por ti. El peor de los abogados.",
        next: "fin_hundida"
      }
    },

    /* ─────────── FINALES ─────────── */

    fin_fria: {
      final: true, tono: "bueno",
      titulo: "Jugaste frío",
      texto: "Presentaste las pruebas sin levantar la voz. Camila se hundió sola, con su propio error. Patricia te ofreció liderar el próximo proyecto. Nadie te vio sudar — y eso fue lo más aterrador de todo.",
      moraleja: "La calma no es debilidad: es puntería."
    },

    fin_humana: {
      final: true, tono: "bueno",
      titulo: "Metiste la pata… y la sacaste",
      texto: "Te equivocaste en caliente, pero diste la cara. Camila también terminó admitiendo su parte. No son amigas — ni falta que hace — pero hoy la oficina aprendió que contigo se habla de frente.",
      moraleja: "Errar es humano. Reconocerlo, escaso."
    },

    fin_paz: {
      final: true, tono: "bueno",
      titulo: "La guerra que no fue",
      texto: "Devolviste la USB sin abrirla. Camila lo supo, y algo cambió: al día siguiente admitió su error ante Patricia sin que nadie la obligara. No hubo abrazo. Hubo respeto, que dura más.",
      moraleja: "El poder que no usaste también habla de ti."
    },

    fin_apagada: {
      final: true, tono: "oscuro",
      titulo: "La que se lo tragó todo",
      texto: "No explotaste. Tampoco hablaste. Cargaste con un error ajeno y la rabia te la llevaste a casa, al carro, a la almohada. Camila duerme rico. Tú no. Y mañana… hay reunión otra vez.",
      moraleja: "Tragarse todo también es una decisión. Y también cobra."
    },

    fin_hundida: {
      final: true, tono: "oscuro",
      titulo: "Te hundiste sola",
      texto: "Tenías la razón… y la perdiste en 15 segundos. RRHH no evaluó quién causó el error: evaluó el mensaje, el show y la mentira. El viernes entregaste el carné. Camila te despidió en la puerta: «cuídate mucho ✨».",
      moraleja: "Tener la razón no te salva de perderla."
    },

    fin_hundida_tu: {
      final: true, tono: "oscuro",
      titulo: "La villana eras tú",
      texto: "La USB 'perdida' apareció — en la cámara del pasillo, contigo guardándola. Nadie volvió a hablar del error de Camila: ahora la historia de la oficina eres tú. Hasta el de la cafetería te mira raro.",
      moraleja: "El impulso perverso siempre deja huella. Literal."
    },

    fin_escandalo: {
      final: true, tono: "oscuro",
      titulo: "Viral por lo que no era",
      texto: "Alguien grabó. Esa noche eras un video de 34 segundos sin contexto, con tu peor ángulo y un audio de reguetón. Tu mamá lo recibió por tres grupos distintos. El lunes había carteles de 'manejo de emociones' en la cocina. Con tu foto no, pero casi.",
      moraleja: "En caliente nadie graba tu versión completa."
    },

    fin_fatal: {
      final: true, tono: "negro",
      titulo: "Se te fue la mano",
      texto: "Ibas ganando. Pero quisiste el golpe final — y en la escalada, Camila retrocedió un paso de más en las escaleras. El velorio fue el jueves. Fuiste, por respeto, con el mismo saco de la entrevista. El eco de la oficina lo resume: «todo por un clic».",
      moraleja: "Hay impulsos de los que no se vuelve. De ninguno de los dos lados."
    }
  }
};
