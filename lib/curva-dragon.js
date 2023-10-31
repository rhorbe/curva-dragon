const cadenaInicial = "FX";
const anchoLinea = 1;
const avance = 10;
const velocidad = 0.00001;
const angulo = 120;
const iteraciones = 10;

function main() {
  configuracionInicial();
  realizarTransiciones();
  ejecutarAcciones();
}

function configuracionInicial() {
  setSpeed(velocidad);
  width(anchoLinea);
  color(randomColor_h());
}

function realizarTransiciones() {
  let nuevaCadena = cadenaInicial;
  for (let i = 0; i < iteraciones; i++) {
/*     nuevaCadena = nuevaCadena.replaceAll("X", "X+YF+");
    nuevaCadena = nuevaCadena.replaceAll("Y", "−FX−Y"); */
    nuevaCadena = nuevaCadena.replaceAll("X", "W+ZF+");
    nuevaCadena = nuevaCadena.replaceAll("Y", "−FW−Z");
    nuevaCadena = nuevaCadena.replaceAll("W", "X");
    nuevaCadena = nuevaCadena.replaceAll("Z", "Y");
  }
  ejecutarAcciones(nuevaCadena);
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
