const DEFAULT_AVANCE = 2;
const DEFAULT_CADENA_INICIAL = "FX";
const DEFAULT_TRANSICION_X = "X+YF+";
const DEFAULT_TRANSICION_Y = "FX-Y";
const DEFAULT_ITERACIONES = 15;
const DEFAULT_ANGULO = 90;
const DEFAULT_ANCHO_LINEA = 1;
const DEFAULT_VELOCIDAD = 1;

let cadenaInicial = document.getElementById("cadenaInicial").value;
let transicionX = document.getElementById("transicionX").value;
let transicionY = document.getElementById("transicionY").value;
let iteraciones = document.getElementById("iteraciones").value;
let angulo = document.getElementById("angulo").value;
let marcadoMostrarProcesoDibujo = document.getElementById(
  "marcadoMostrarProcesoDibujo"
).checked;

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

function main() {
  configuracionInicial();
  const cadenaTerminales = derivar();
  interpertar(cadenaTerminales);
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

function configuracionInicial() {
  if (marcadoMostrarProcesoDibujo) {
    setSpeed(velocidad);
  }
  width(anchoLinea);
  color(randomColor_h());
}

function interpertar(cadena) {
  for (let i = 0; i < cadena.length; i++) {
    let terminal = cadena[i];
    if (diccionarioInterpretaciones.hasOwnProperty(terminal)) {
      diccionarioInterpretaciones[terminal]();
    }
  }
}

try {
  main();
} catch (error) {
  console.log(error);
}
