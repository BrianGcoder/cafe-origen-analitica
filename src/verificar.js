const ventas = require("./datos");
const catalogo = require("./catalogo");
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
  comboRegalo,
  clientesRecurrentes,
  mejorRacha,
  clientesRecurrentesSet,
  clientesRecurrentesDobleFor,
  comprasPorCliente,
  totalCiudadCadena,
  totalCiudadUnaPasada,
} = require("./analitica");
const { generarVentas } = require("./generador");

let todasCorrectas = true;

function verificar(nombre, resultado, esperado) {
  const estado = resultado === esperado ? "OK" : "DIFERENTE";
  console.log(`${nombre}: ${estado}`);
  if (estado === "DIFERENTE") todasCorrectas = false;
}

function verificarClientesRecurrentes(nombre, datos) {
  const fuerzaBruta = clientesRecurrentesDobleFor(datos);
  const conSet = clientesRecurrentesSet(datos);
  const conMap = comprasPorCliente(datos).clientesRecurrentes;
  const normalizar = (clientes) => JSON.stringify([...clientes].sort());

  verificar(
    `clientes recurrentes (${nombre}): doble for y Set`,
    normalizar(fuerzaBruta),
    normalizar(conSet),
  );
  verificar(
    `clientes recurrentes (${nombre}): doble for y Map`,
    normalizar(fuerzaBruta),
    normalizar(conMap),
  );
}

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

for (const caso of casos) {
  const nombre = caso.nombre;
  const datos = caso.datos;
  const mayor = ventaMayor(datos);

  if (datos.length > 0) {
    verificar(`${nombre} - valorVenta`, valorVenta(datos[0]), 84000);
  }

  verificar(`${nombre} - totalVendido`, totalVendido(datos), caso.total);

  verificar(
    `${nombre} - unidadesVendidas`,
    unidadesVendidas(datos),
    caso.unidades,
  );

  verificar(
    `${nombre} - ventaMayor`,
    mayor === null ? null : mayor.id,
    caso.ventaMayorId,
  );

  verificar(`${nombre} - ticketPromedio`, ticketPromedio(datos), caso.ticket);

  verificar(
    `${nombre} - ventasPorCiudad`,
    ventasPorCiudad(datos, " Medellín "),
    caso.medellin,
  );

  verificar(
    `${nombre} - totalVendido ciclo y método`,
    totalVendidoM(datos),
    totalVendido(datos),
  );

  verificar(
    `${nombre} - unidadesVendidas ciclo y método`,
    unidadesVendidasM(datos),
    unidadesVendidas(datos),
  );

  verificar(
    `${nombre} - ventasPorCiudad ciclo y método`,
    ventasPorCiudadM(datos, " Medellín "),
    ventasPorCiudad(datos, " Medellín "),
  );
}

verificarClientesRecurrentes("Día 1", ventas);
verificar(
  "compras en Map para C01",
  comprasPorCliente(ventas).comprasPorCliente.get("C01"),
  3,
);
verificar(
  "clientes recurrentes sin duplicados",
  JSON.stringify(clientesRecurrentes([{ cliente: "C01" }, { cliente: "C02" }])),
  JSON.stringify([]),
);
verificar(
  "combo regalo",
  JSON.stringify(comboRegalo(catalogo, 87000)),
  JSON.stringify(["Origen Huila 500 g", "Origen Sierra 500 g"]),
);
verificar("combo regalo sin resultado", comboRegalo(catalogo, 10000), null);
verificar(
  "mejor racha de tres días",
  mejorRacha([110000, 137000, 187000, 120000, 258000, 173000], 3),
  565000,
);
verificar("mejor racha mayor que los días", mejorRacha([100, 200], 3), null);

verificarClientesRecurrentes("5.000 ventas generadas", generarVentas(5000));

const ventasGeneradas = generarVentas(10000);
const ciudad = "Bogotá";
verificar(
  "total por ciudad con cadena y una pasada",
  totalCiudadCadena(ventasGeneradas, ciudad),
  totalCiudadUnaPasada(ventasGeneradas, ciudad),
);

if (!todasCorrectas) process.exitCode = 1;
