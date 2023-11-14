const DEFAULT_AVANCE = 10;
const DEFAULT_CADENA_INICIAL = "FX";
const DEFAULT_TRANSICION_X = "X+YF+";
const DEFAULT_TRANSICION_Y = "-FX-Y";
const DEFAULT_ITERACIONES = 15;
const DEFAULT_ANGULO = 90;
const DEFAULT_ANCHO_LINEA = 1;
const DEFAULT_VELOCIDAD = 1;

const btnComenzar = document.getElementById("btnComenzar");
btnComenzar.addEventListener("click", main);

let cadenaInicial = DEFAULT_CADENA_INICIAL;
let transicionX = DEFAULT_TRANSICION_X;
let transicionY = DEFAULT_TRANSICION_Y;
let iteraciones = DEFAULT_ITERACIONES;
let angulo = DEFAULT_ANGULO;
let marcadoMostrarProcesoDibujo = true;
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
  clear();
  width(anchoLinea);
  color(randomColor_h());
  if (marcadoMostrarProcesoDibujo) {
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
