const productos = [
  { nombre: "Origen Huila 500 g", precio: 42000 },
  { nombre: "Origen Nariño 250 g", precio: 26000 },
  { nombre: "Origen Sierra 500 g", precio: 45000 },
  { nombre: "Prensa francesa", precio: 95000 },
  { nombre: "Molino manual", precio: 120000 },
];

const ciudades = ["Medellín", "Bogotá", "Cali", "Pereira"];

function enteroAleatorio(maximo) {
  return Math.floor(Math.random() * maximo);
}

function generarVentas(n) {
  if (!Number.isInteger(n) || n < 0) {
    throw new TypeError("n debe ser un entero mayor o igual que cero");
  }

  const cantidadClientes = n === 0 ? 0 : Math.max(1, Math.floor(n / 3));
  const ventas = [];

  for (let i = 0; i < n; i++) {
    const producto = productos[enteroAleatorio(productos.length)];
    const numeroCliente = enteroAleatorio(cantidadClientes) + 1;

    ventas.push({
      id: i + 1,
      fecha: "2026-09-01",
      cliente: `C${String(numeroCliente).padStart(2, "0")}`,
      producto: producto.nombre,
      ciudad: ciudades[enteroAleatorio(ciudades.length)],
      cantidad: enteroAleatorio(5) + 1,
      precio: producto.precio,
    });
  }

  return ventas;
}

module.exports = { generarVentas };
