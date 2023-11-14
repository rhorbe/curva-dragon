const DEFAULT_AVANCE = 10;
const DEFAULT_CADENA_INICIAL = "FX";
const DEFAULT_TRANSICION_X = "X+YF+";
const DEFAULT_TRANSICION_Y = "-FX-Y";
const DEFAULT_ITERACIONES = 10;
const DEFAULT_ANGULO = 90;
const DEFAULT_ANCHO_LINEA = 1;
const DEFAULT_VELOCIDAD = 1;
const DEFAULT_MOSTRAR_PROCESO_DIBUJO = true;

const btnComenzar = document.getElementById("btnComenzar");
btnComenzar.addEventListener("click", procesar);

const btnValoresPorDefecto = document.getElementById("btnValoresPorDefecto");
btnValoresPorDefecto.addEventListener("click", cargarFormConValoresPorDefecto);

let cadenaInicial = DEFAULT_CADENA_INICIAL;
let transicionX = DEFAULT_TRANSICION_X;
let transicionY = DEFAULT_TRANSICION_Y;
let iteraciones = DEFAULT_ITERACIONES;
let angulo = DEFAULT_ANGULO;
let mostrarProcesoDibujo = DEFAULT_MOSTRAR_PROCESO_DIBUJO;
let avance = DEFAULT_AVANCE;
let anchoLinea = DEFAULT_ANCHO_LINEA;
let velocidad = DEFAULT_VELOCIDAD;

const diccionarioTransiciones = {
  X: transicionX,
  Y: transicionY,
};

const diccionarioInterpretaciones = {
  F: function () {
    forward(avance);
  },
  "+": function () {
    right(angulo);
  },
  "-": function () {
    left(angulo);
  },
};

function procesar() {
  obtenerDatosDesdeForm();
  configurarParametrosIniciales();
  const cadenaTerminales = derivar();
  interpertar(cadenaTerminales);
}

function obtenerDatosDesdeForm() {
  cadenaInicial = document.getElementById("cadenaInicial").value;
  diccionarioTransiciones.X = document.getElementById("transicionX").value;
  diccionarioTransiciones.Y = document.getElementById("transicionY").value;
  iteraciones = document.getElementById("iteraciones").value;
  angulo = document.getElementById("angulo").value;
  mostrarProcesoDibujo = document.getElementById(
    "mostrarProcesoDibujo"
  ).checked;
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

function configurarParametrosIniciales() {
  clear();
  goto(0, 0);
  width(anchoLinea);
  color(randomColor_h());
  console.log(mostrarProcesoDibujo);
  if (mostrarProcesoDibujo) {
    setSpeed(velocidad);
  }
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

cargarFormConValoresPorDefecto();
