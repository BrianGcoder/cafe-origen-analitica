// require: importa el arreglo de ventas.
const ventas = require("./datos");

// length: obtiene la cantidad de registros.
console.log("valor de ventas.length:", ventas.length);

// Índices: 0 es el primer registro y length - 1 es el último.
console.log("valor de ventas[0]:", ventas[0]);
console.log("valor de ventas[ventas.length - 1]:", ventas[ventas.length - 1]);

// Acceso a propiedad: muestra producto del registro con índice 4.
console.log("producto en la posicion 4", ventas[4].producto)

// console.table: muestra el arreglo como tabla.
console.table(ventas);

 