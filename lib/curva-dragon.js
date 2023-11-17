// Constantes
const DEFAULT_CADENA_INICIAL = "FX";
const DEFAULT_TRANSICION_X = "X+YF+";
const DEFAULT_TRANSICION_Y = "-FX-Y";
const DEFAULT_ITERACIONES = 10;
const DEFAULT_ANGULO = 90;
const DEFAULT_ANCHO_LINEA = 1;
const DEFAULT_VELOCIDAD = 1;
const DEFAULT_MOSTRAR_PROCESO_DIBUJO = true;
const DEFAULT_AVANCE = 100;

//Botones
const btnComenzar = document.getElementById("btnComenzar");
btnComenzar.addEventListener("click", procesar);

const btnValoresPorDefecto = document.getElementById("btnValoresPorDefecto");
btnValoresPorDefecto.addEventListener("click", cargarFormConValoresPorDefecto);

// Variables globales
let avance;
let cadenaInicial;
let transicionX;
let transicionY;
let iteraciones;
let angulo;
let mostrarProcesoDibujo;
let anchoLinea;
let velocidad;

// Diccionarios
const diccionarioTransiciones = {
  X: transicionX,
  Y: transicionY,
};

const diccionarioInterpretaciones = {
  F: function () {
    forward(avance); // En library.js
  },
  "+": function () {
    right(angulo); // En library.js
  },
  "-": function () {
    left(angulo); // En library.js
  },
};

//Funciones
function procesar() {
  main(); // En library.js
  obtenerDatosDesdeForm();
  configurarParametrosIniciales();
  const cadenaTerminales = derivar();
  interpertar(cadenaTerminales);
}

function obtenerDatosDesdeForm() {
  cadenaInicial = document.getElementById("cadenaInicial").value;
  diccionarioTransiciones.X = document.getElementById("transicionX").value;
  diccionarioTransiciones.Y = document.getElementById("transicionY").value;
  iteraciones = iteracionesValidas(
    document.getElementById("iteraciones").value
  );
  angulo = anguloValido(document.getElementById("angulo").value);
  mostrarProcesoDibujo = document.getElementById(
    "mostrarProcesoDibujo"
  ).checked;
}

function anguloValido(iteracionesInteger) {
  let anguloInteger = Number(iteracionesInteger);
  if (anguloInteger < -360 || anguloInteger > 360) {
    document.getElementById("angulo").value = DEFAULT_ANGULO;
    anguloInteger = DEFAULT_ANGULO;
  }
  return anguloInteger;
}

function iteracionesValidas(iteracionesDesdeForm) {
  let iteracionesInteger = Number(iteracionesDesdeForm);
  if (iteracionesInteger < 0 || iteracionesInteger > 15) {
    document.getElementById("iteraciones").value = DEFAULT_ITERACIONES;
    iteracionesInteger = DEFAULT_ITERACIONES;
  }
  return iteracionesInteger;
}

function configurarParametrosIniciales() {
  clear();
  goto(0, 0);
  width(anchoLinea);
  color(randomColor_h());
  if (mostrarProcesoDibujo) {
    setSpeed(velocidad);
  }
  calcularAvance();
}

function calcularAvance() {
  if (iteraciones == 0) {
    avance = DEFAULT_AVANCE * 2;
  } else if (iteraciones < 10) {
    avance = Math.round(DEFAULT_AVANCE / iteraciones);
  } else if (iteraciones >= 10 && iteraciones < 12) {
    avance = Math.round(DEFAULT_AVANCE / (iteraciones * 1.1));
  } else if (iteraciones >= 12 && iteraciones < 14) {
    avance = Math.round(DEFAULT_AVANCE / (iteraciones * 1.9));
  } else {
    avance = Math.round(DEFAULT_AVANCE / (iteraciones * 3));
  }
}

function derivar() {
  let cadena = cadenaInicial;

  for (let i = 0; i < iteraciones; i++) {
    cadena = reemplazarCaracteres(cadena, diccionarioTransiciones);
  }

  return cadena;
}

function reemplazarCaracteres(cadena, diccionarioTransiciones) {
  let caracteres = cadena.split("");
  for (let i = 0; i < caracteres.length; i++) {
    let caracter = caracteres[i];
    if (diccionarioTransiciones.hasOwnProperty(caracter)) {
      caracteres[i] = diccionarioTransiciones[caracter];
    }
  }
  let cadenaModificada = caracteres.join("");
  return cadenaModificada;
}

function interpertar(cadena) {
  for (let i = 0; i < cadena.length; i++) {
    let terminal = cadena[i];
    if (diccionarioInterpretaciones.hasOwnProperty(terminal)) {
      diccionarioInterpretaciones[terminal]();
    }
  }
}

function cargarFormConValoresPorDefecto() {
  document.getElementById("cadenaInicial").value = DEFAULT_CADENA_INICIAL;
  document.getElementById("transicionX").value = DEFAULT_TRANSICION_X;
  document.getElementById("transicionY").value = DEFAULT_TRANSICION_Y;
  document.getElementById("iteraciones").value = DEFAULT_ITERACIONES;
  document.getElementById("angulo").value = DEFAULT_ANGULO;
  document.getElementById("mostrarProcesoDibujo").checked =
    DEFAULT_MOSTRAR_PROCESO_DIBUJO;
}

// Inicialización del formulario
cargarFormConValoresPorDefecto();
