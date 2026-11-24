// require: importa los datos y las funciones del análisis.
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
} = require("./analitica");

// Función flecha y toLocaleString: dan formato colombiano a los valores.
const pesos = (valor) =>
  `$ ${valor.toLocaleString("es-CO", { maximumFractionDigits: 2 })}`;

// console.log: imprime el título y las secciones del reporte.
console.log("========================================");
console.log("       REPORTE DE VENTAS - CAFÉ ORIGEN");
console.log("========================================");

console.log("RESUMEN GENERAL");

console.log(`Total vendido:       ${pesos(totalVendido(ventas))}`);
console.log(`Unidades vendidas:   ${unidadesVendidas(ventas)}`);
console.log(`Ticket promedio:     ${pesos(ticketPromedio(ventas))}`);
const mayor = ventaMayor(ventas);
// Operador ternario: muestra la venta mayor o indica que no hay ventas.
console.log(
  `Venta más grande:    ${mayor ? `${mayor.producto} (${pesos(mayor.cantidad * mayor.precio)})` : "Sin ventas"}`,
);

console.log("\nVENTAS POR CIUDAD");

// Object.entries y map: convierten el diccionario de ciudades en filas.
// console.table: muestra las filas de forma ordenada.
console.table(
  Object.entries(totalPorCiudad(ventas)).map(([ciudad, total]) => ({
    ciudad,
    total: pesos(total),
  })),
);

console.log("UNIDADES POR PRODUCTO");

// Object.entries y map: preparan una fila por producto.
console.table(
  Object.entries(unidadesPorProducto(ventas)).map(([producto, unidades]) => ({
    producto,
    unidades,
  })),
);

console.log("TOP 3 PRODUCTOS POR VALOR");
console.log("----------------------------------------");
// map: prepara los tres resultados para mostrarlos como tabla.
console.table(
  topProductosPorValor(ventas, 3).map(({ producto, valor }) => ({
    producto,
    valor: pesos(valor),
  })),
);

console.log("RESUMEN DE UN DÍA CON VENTAS");

// console.table: muestra el resumen del día con ventas.
console.table([ventasDelDia(ventas, "2026-09-01")]);

console.log("RESUMEN DE UN DÍA SIN VENTAS");

// console.table: muestra ceros en el día sin ventas.
console.table([ventasDelDia(ventas, "2026-09-07")]);
