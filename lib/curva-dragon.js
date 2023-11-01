const cadenaInicial = "FX";
const anchoLinea = 1;
const avance = 10;
const velocidad = 1;
const angulo = 90;
const iteraciones = 15;

const diccionarioTransiciones = {
  X: "X+YF+",
  Y: "-FX-Y",
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
  setSpeed(velocidad);
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
