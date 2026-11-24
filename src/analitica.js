// Función flecha: multiplica cantidad por precio.
const valorVenta = (venta) => venta.cantidad * venta.precio;

// Función normalizadora; trim y toLowerCase eliminan espacios y unifican mayúsculas.
function normalizarCiudad(ciudad) {
  return ciudad.trim().toLowerCase();
}

// Función que devuelve un nombre de ciudad legible.
function mostrarCiudad(ciudad) {
  const clave = normalizarCiudad(ciudad);
  // Objeto diccionario: relaciona el nombre normalizado con su forma visible.
  const nombres = {
    "medellín": "Medellín",
    "bogotá": "Bogotá",
    "cali": "Cali",
    "pereira": "Pereira",
  };
  // Operador ||: usa el nombre original si no está en el diccionario.
  return nombres[clave] || ciudad.trim();
}

// totalVendido: usa for...of y un acumulador para sumar el valor de las ventas.
function totalVendido(ventas) {
  let total = 0;
  // Ciclo for...of: recorre cada venta.
  for (const venta of ventas) total += valorVenta(venta);
  return total;
}

// unidadesVendidas: usa for...of y un acumulador para sumar cantidades.
function unidadesVendidas(ventas) {
  let unidades = 0;
  // Ciclo for...of: recorre cada venta.
  for (const venta of ventas) unidades += venta.cantidad;
  return unidades;
}

// ventaMayor: usa una condición para conservar el registro de mayor valor.
function ventaMayor(ventas) {
  // Condicional if: devuelve null cuando no hay registros.
  if (ventas.length === 0) return null;

  let mayor = ventas[0];
  // Ciclo for...of y condicional if: comparan el valor de cada venta.
  for (const venta of ventas) {
    if (valorVenta(venta) > valorVenta(mayor)) mayor = venta;
  }
  return mayor;
}

// ticketPromedio: acumula valores y cuenta solo ventas con cantidad mayor que cero.
function ticketPromedio(ventas) {
  let total = 0;
  let ventasValidas = 0;

  // Ciclo for...of y condicional if: ignoran ventas con cantidad cero.
  for (const venta of ventas) {
    if (venta.cantidad > 0) {
      total += valorVenta(venta);
      ventasValidas++;
    }
  }

  // Operador ternario: evita dividir entre cero.
  return ventasValidas === 0 ? 0 : total / ventasValidas;
}

// ventasPorCiudad: usa for...of e if para sumar ventas de una ciudad normalizada.
function ventasPorCiudad(ventas, ciudad) {
  const ciudadBuscada = normalizarCiudad(ciudad);
  let total = 0;

  // Ciclo for...of y condicional if: suman solo las ciudades coincidentes.
  for (const venta of ventas) {
    if (normalizarCiudad(venta.ciudad) === ciudadBuscada) {
      total += valorVenta(venta);
    }
  }
  return total;
}

// totalVendidoM: map transforma ventas a valores y reduce los suma desde cero.
function totalVendidoM(ventas) {
  return ventas.map(valorVenta).reduce((total, valor) => total + valor, 0);
}

// unidadesVendidasM: map toma cantidades y reduce las suma desde cero.
function unidadesVendidasM(ventas) {
  return ventas
    .map((venta) => venta.cantidad)
    .reduce((total, cantidad) => total + cantidad, 0);
}

// ventasPorCiudadM: filter selecciona la ciudad, map calcula valores y reduce los suma.
function ventasPorCiudadM(ventas, ciudad) {
  const ciudadBuscada = normalizarCiudad(ciudad);
  return ventas
    .filter((venta) => normalizarCiudad(venta.ciudad) === ciudadBuscada)
    .map(valorVenta)
    .reduce((total, valor) => total + valor, 0);
}

// totalPorCiudad: reduce agrupa los valores por ciudad en un objeto diccionario.
function totalPorCiudad(ventas) {
  return ventas.reduce((totales, venta) => {
    const ciudad = mostrarCiudad(venta.ciudad);
    totales[ciudad] = (totales[ciudad] || 0) + valorVenta(venta);
    return totales;
  }, {});
}

// unidadesPorProducto: reduce agrupa y suma unidades por producto.
function unidadesPorProducto(ventas) {
  return ventas.reduce((unidades, venta) => {
    unidades[venta.producto] = (unidades[venta.producto] || 0) + venta.cantidad;
    return unidades;
  }, {});
}

// topProductosPorValor: reduce agrupa; spread copia; Object.entries y map preparan la lista.
function topProductosPorValor(ventas, k) {
  const totales = ventas.reduce((porProducto, venta) => {
    porProducto[venta.producto] =
      (porProducto[venta.producto] || 0) + valorVenta(venta);
    return porProducto;
  }, {});

  // sort ordena con comparador; slice devuelve los primeros k productos.
  return [...Object.entries(totales)]
    .map(([producto, valor]) => ({ producto, valor }))
    .sort((a, b) => b.valor - a.valor)
    .slice(0, k);
}

// ventasDelDia: filter selecciona una fecha y devuelve su resumen.
function ventasDelDia(ventas, fecha) {
  const ventasDelDia = ventas.filter((venta) => venta.fecha === fecha);
  const ventasValidas = ventasDelDia.filter((venta) => venta.cantidad > 0);
  const total = totalVendido(ventasDelDia);

  return {
    fecha,
    cantidadVentas: ventasDelDia.length,
    totalVendido: total,
    unidadesVendidas: unidadesVendidas(ventasDelDia),
    // Operador ternario: devuelve cero si no hay ventas válidas.
    ticketPromedio:
      ventasValidas.length === 0 ? 0 : totalVendido(ventasValidas) / ventasValidas.length,
  };
}

// module.exports: comparte las funciones con verificar.js y reporte.js.
module.exports = {
  valorVenta,
  totalVendido,
  unidadesVendidas,
  ventaMayor,
  ticketPromedio,
  ventasPorCiudad,
  totalVendidoM,
  unidadesVendidasM,
  ventasPorCiudadM,
  totalPorCiudad,
  unidadesPorProducto,
  topProductosPorValor,
  ventasDelDia,
};
