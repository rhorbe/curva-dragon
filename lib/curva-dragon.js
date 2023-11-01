const cadenaInicial = "FX";
const anchoLinea = 1;
const avance = 10;
const velocidad = 1;
const angulo = 90;
const iteraciones = 10;

const diccionario = {
  X: "X+YF+",
  Y: "aFXaY",
};

const diccionario2 = {
  F: () => {
    forward(avance);
  },
};

function main() {
  configuracionInicial();
  const cadenaTerminales = realizarTransiciones();
  ejecutarAcciones(cadenaTerminales);
}

function realizarTransiciones() {
  let cadena = cadenaInicial;

  for (let i = 0; i < iteraciones; i++) {
    console.log(cadena);
    cadena = reemplazarCaracteres(cadena, diccionario);
  }
  return cadena;
}

function reemplazarCaracteres(cadena, diccionario) {
  console.log("cadena: " + cadena);

  let caracteres = cadena.split("");
  console.log("caracteres: " + caracteres);

  for (let i = 0; i < caracteres.length; i++) {
    let caracter = caracteres[i];
    if (diccionario.hasOwnProperty(caracter)) {
      caracteres[i] = diccionario[caracter];
    }
  }
  console.log("caracteres despuès cambio: " + caracteres);

  let cadenaModificada = caracteres.join("");

  console.log("join: " + cadenaModificada);

  return cadenaModificada;
}

function configuracionInicial() {
  setSpeed(velocidad);
  width(anchoLinea);
  color(randomColor_h());
}

function ejecutarAcciones(cadena) {
  console.log("cadena: " + cadena);
  for (let i = 0; i < cadena.length; i++) {
    terminal = cadena[i];

    console.log("terminal: " + terminal);

    switch (terminal) {
      case "F":
        console.log("F: " + cadena);

        forward(avance);
        break;

      case "+":
        console.log("+: " + cadena);

        right(angulo);
        break;

      case "a":
        console.log("-: " + cadena);
        left(angulo);
        break;

      default:
        break;
    }
  }
}

try {
  main();
} catch (error) {
  console.log(error);
}
