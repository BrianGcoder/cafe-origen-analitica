const { generarVentas } = require("./generador");
const {
  totalVendido,
  ventaMayor,
  totalPorCiudad,
  primeraVenta,
  clientesRecurrentes,
  totalCiudadCadena,
  totalCiudadUnaPasada,
} = require("./analitica");

const tamaños = [100, 1000, 10000, 100000];
const tablaOperaciones = [];

for (const n of tamaños) {
  const ventas = generarVentas(n);
  const contadorTotal = { operaciones: 0 };
  const contadorMayor = { operaciones: 0 };
  const contadorCiudades = { operaciones: 0 };
  const contadorPrimera = { operaciones: 0 };

  totalVendido(ventas, contadorTotal);
  ventaMayor(ventas, contadorMayor);
  totalPorCiudad(ventas, contadorCiudades);
  contarOperacionConstante(ventas, contadorPrimera);

  tablaOperaciones.push({
    n,
    primeraVenta: contadorPrimera.operaciones,
    totalVendido: contadorTotal.operaciones,
    ventaMayor: contadorMayor.operaciones,
    totalPorCiudad: contadorCiudades.operaciones,
  });
}

function contarOperacionConstante(ventas, contador) {
  contador.operaciones++;
  primeraVenta(ventas);
}

console.table(tablaOperaciones);

const ventasCadenas = generarVentas(10000);
const porCadena = totalCiudadCadena(ventasCadenas, "Bogotá");
const porUnaPasada = totalCiudadUnaPasada(ventasCadenas, "Bogotá");
console.log("Comparación totalCiudad con 10.000 ventas:");
console.table([
  { versión: "Cadena de métodos", resultado: porCadena },
  { versión: "Una pasada", resultado: porUnaPasada },
  { versión: "Iguales", resultado: porCadena === porUnaPasada },
]);

const tamañosTiempo = [1000, 2000, 4000, 8000, 16000];
console.log("Tiempo de clientesRecurrentes:");

for (const n of tamañosTiempo) {
  const ventas = generarVentas(n);
  console.time(`n=${n}`);
  clientesRecurrentes(ventas);
  console.timeEnd(`n=${n}`);
}
