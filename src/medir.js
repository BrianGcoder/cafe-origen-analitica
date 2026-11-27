const { performance } = require("node:perf_hooks");
const { generarVentas } = require("./generador");
const {
  totalVendido,
  ventaMayor,
  totalPorCiudad,
  primeraVenta,
  clientesRecurrentesDobleFor,
  clientesRecurrentesSet,
  comprasPorCliente,
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
  primeraVenta(ventas, contadorPrimera);

  tablaOperaciones.push({
    n,
    primeraVenta: contadorPrimera.operaciones,
    totalVendido: contadorTotal.operaciones,
    ventaMayor: contadorMayor.operaciones,
    totalPorCiudad: contadorCiudades.operaciones,
  });
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

const tamañosClientes = [1000, 10000, 100000];
const tablaClientes = [];

function medirClientes(etiqueta, ventas, funcion) {
  console.time(etiqueta);
  const inicio = performance.now();
  funcion(ventas);
  const milisegundos = performance.now() - inicio;
  console.timeEnd(etiqueta);
  return Number(milisegundos.toFixed(3));
}

const tablaFuerzaBruta = [];
const tiemposFuerzaBruta = new Map();
for (const n of [1000, 2000, 4000, 10000]) {
  const ventas = generarVentas(n);
  const milisegundos = medirClientes(
    `doble for escala n=${n}`,
    ventas,
    clientesRecurrentesDobleFor,
  );
  tiemposFuerzaBruta.set(n, milisegundos);
  tablaFuerzaBruta.push({ ventas: n, "doble for (ms)": milisegundos });
}
console.log("Escalado de la versión de fuerza bruta:");
console.table(tablaFuerzaBruta);

console.log("Tiempo de las tres versiones de clientes recurrentes:");
for (const n of tamañosClientes) {
  const ventas = generarVentas(n);
  const dobleFor = tiemposFuerzaBruta.get(n) ?? "omitida";
  const set = medirClientes(`Set n=${n}`, ventas, clientesRecurrentesSet);
  const map = medirClientes(`Map n=${n}`, ventas, comprasPorCliente);
  tablaClientes.push({ ventas: n, "doble for (ms)": dobleFor, "Set (ms)": set, "Map (ms)": map });
}

console.table(tablaClientes);
