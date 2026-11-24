// require: importa los datos y las funciones que se van a probar.
const ventas = require("./datos");
const {
  valorVenta,
  totalVendido,
  unidadesVendidas,
  ventaMayor,
  ticketPromedio,
  ventasPorCiudad,
  totalVendidoM,
  unidadesVendidasM,
  ventasPorCiudadM,
} = require("./analitica");

let todasCorrectas = true;

// Función auxiliar: compara el resultado con el esperado usando igualdad estricta.
function verificar(nombre, resultado, esperado) {
  // Operador ternario: muestra OK o DIFERENTE.
  const estado = resultado === esperado ? "OK" : "DIFERENTE";
  console.log(`${nombre}: ${estado}`);
  // Condicional if: marca error si los resultados no coinciden.
  if (estado === "DIFERENTE") todasCorrectas = false;
}

// Arreglo de objetos: guarda casos completo, unitario y vacío.
const casos = [
  {
    nombre: "todas las ventas",
    datos: ventas,
    total: 985000,
    unidades: 21,
    ventaMayorId: 10,
    ticket: 985000 / 11,
    medellin: 356000,
  },
  {
    nombre: "una venta",
    datos: [ventas[0]],
    total: 84000,
    unidades: 2,
    ventaMayorId: 1,
    ticket: 84000,
    medellin: 84000,
  },
  {
    nombre: "arreglo vacío",
    datos: [],
    total: 0,
    unidades: 0,
    ventaMayorId: null,
    ticket: 0,
    medellin: 0,
  },
];

// Ciclo for...of: prueba cada función con cada caso.
for (const caso of casos) {
  const nombre = caso.nombre;
  const datos = caso.datos;
  const mayor = ventaMayor(datos);

  // valorVenta: calcula cantidad por precio.
  if (datos.length > 0) {
    verificar(`${nombre} - valorVenta`, valorVenta(datos[0]), 84000);
  }

  // totalVendido: suma el valor de todas las ventas.
  verificar(`${nombre} - totalVendido`, totalVendido(datos), caso.total);

  // unidadesVendidas: suma las unidades vendidas.
  verificar(
    `${nombre} - unidadesVendidas`,
    unidadesVendidas(datos),
    caso.unidades,
  );

  // ventaMayor: devuelve el registro de mayor valor.
  verificar(
    `${nombre} - ventaMayor`,
    mayor === null ? null : mayor.id,
    caso.ventaMayorId,
  );

  // ticketPromedio: calcula el promedio de ventas válidas.
  verificar(`${nombre} - ticketPromedio`, ticketPromedio(datos), caso.ticket);

  // ventasPorCiudad: suma las ventas de la ciudad indicada.
  verificar(
    `${nombre} - ventasPorCiudad`,
    ventasPorCiudad(datos, " Medellín "),
    caso.medellin,
  );

  // totalVendidoM: suma las ventas usando métodos de arreglo.
  verificar(
    `${nombre} - totalVendido ciclo y método`,
    totalVendidoM(datos),
    totalVendido(datos),
  );

  // unidadesVendidasM: suma las unidades usando métodos de arreglo.
  verificar(
    `${nombre} - unidadesVendidas ciclo y método`,
    unidadesVendidasM(datos),
    unidadesVendidas(datos),
  );

  // ventasPorCiudadM: suma la ciudad usando métodos de arreglo.
  verificar(
    `${nombre} - ventasPorCiudad ciclo y método`,
    ventasPorCiudadM(datos, " Medellín "),
    ventasPorCiudad(datos, " Medellín "),
  );
}

if (!todasCorrectas) process.exitCode = 1;
