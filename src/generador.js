const productos = [
  { nombre: "Origen Huila 500 g", precio: 42000 },
  { nombre: "Origen Nariño 250 g", precio: 26000 },
  { nombre: "Origen Sierra 500 g", precio: 45000 },
  { nombre: "Prensa francesa", precio: 95000 },
  { nombre: "Molino manual", precio: 120000 },
];

const ciudades = ["Medellín", "Bogotá", "Cali", "Pereira"];

function generarVentas(n) {
  const cantidadClientes = Math.floor(n / 3);
  const ventas = [];

  for (let i = 0; i < n; i++) {
    const producto = productos[Math.floor(Math.random() * productos.length)];
    const numeroCliente = Math.floor(Math.random() * cantidadClientes) + 1;

    ventas.push({
      id: i + 1,
      fecha: "2026-09-01",
      cliente: `C${numeroCliente}`,
      producto: producto.nombre,
      ciudad: ciudades[Math.floor(Math.random() * ciudades.length)],
      cantidad: Math.floor(Math.random() * 5) + 1,
      precio: producto.precio,
    });
  }

  return ventas;
}

module.exports = { generarVentas };
