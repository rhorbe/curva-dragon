const cadenaInicial = "FX";
const anchoLinea = 1;
const avance = 10;
const velocidad = 0.00001;
const angulo = 90;
const iteraciones = 10;

const diccionario = {
  X: "X+YF+",
  Y: "−FX−Y",
};

function main() {
  configuracionInicial();
  let cadenaTerminales = realizarTransiciones();
  ejecutarAcciones(cadenaTerminales);
}

function realizarTransiciones() {
  let cadena = cadenaInicial;

  for (let i = 0; i < iteraciones; i++) {
    cadena = reemplazarCaracteres(cadena, diccionario);
  }

  return cadena;
}

function reemplazarCaracteres(cadena, diccionario) {
  const caracteres = cadena.split("");

  for (let i = 0; i < caracteres.length; i++) {
    let caracter = caracteres[i];
    if (diccionario.hasOwnProperty(caracter)) {
      caracteres[i] = diccionario[caracter];
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

function ejecutarAcciones(cadena) {
  for (let i = 0; i < cadena.length; i++) {
    terminal = cadena[i];

    switch (terminal) {
      case "F":
        forward(avance);
        break;

      case "+":
        right(angulo);
        break;

      case "-":
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
