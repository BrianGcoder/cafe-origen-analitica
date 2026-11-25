const ventas = require("./datos");
const {
  totalVendido,
  unidadesVendidas,
  ventaMayor,
  ticketPromedio,
  totalPorCiudad,
  unidadesPorProducto,
  topProductosPorValor,
  ventasDelDia,
  comprasPorCliente,
} = require("./analitica");

const pesos = (valor) =>
  `$ ${valor.toLocaleString("es-CO", { maximumFractionDigits: 2 })}`;

console.log("========================================");
console.log("       REPORTE DE VENTAS - CAFÉ ORIGEN");
console.log("========================================");

console.log("RESUMEN GENERAL");

console.log(`Total vendido:       ${pesos(totalVendido(ventas))}`);
console.log(`Unidades vendidas:   ${unidadesVendidas(ventas)}`);
console.log(`Ticket promedio:     ${pesos(ticketPromedio(ventas))}`);
const mayor = ventaMayor(ventas);
console.log(
  `Venta más grande:    ${mayor ? `${mayor.producto} (${pesos(mayor.cantidad * mayor.precio)})` : "Sin ventas"}`,
);

console.log("\nVENTAS POR CIUDAD");

console.table(
  Object.entries(totalPorCiudad(ventas)).map(([ciudad, total]) => ({
    ciudad,
    total: pesos(total),
  })),
);

console.log("UNIDADES POR PRODUCTO");

console.table(
  Object.entries(unidadesPorProducto(ventas)).map(([producto, unidades]) => ({
    producto,
    unidades,
  })),
);

console.log("TOP 3 PRODUCTOS POR VALOR");
console.log("----------------------------------------");
console.table(
  topProductosPorValor(ventas, 3).map(({ producto, valor }) => ({
    producto,
    valor: pesos(valor),
  })),
);

console.log("RESUMEN DE UN DÍA CON VENTAS");

console.table([ventasDelDia(ventas, "2026-09-01")]);

console.log("RESUMEN DE UN DÍA SIN VENTAS");

console.table([ventasDelDia(ventas, "2026-09-07")]);

const {comprasconguayabas, guayabas}= comprasPorCliente(ventas) 
console.log (comprasconguayabas, guayabas)