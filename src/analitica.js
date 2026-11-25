const valorVenta = (venta) => venta.cantidad * venta.precio;

function normalizarCiudad(ciudad) {
  return ciudad.trim().toLowerCase();
}

function mostrarCiudad(ciudad) {
  const clave = normalizarCiudad(ciudad);
  const nombres = {
    "medellín": "Medellín",
    "bogotá": "Bogotá",
    "cali": "Cali",
    "pereira": "Pereira",
  };
  return nombres[clave] || ciudad.trim();
}

function totalVendido(ventas, contador) {
  let total = 0;
  for (const venta of ventas) {
    if (contador) contador.operaciones++;
    total += valorVenta(venta);
  }
  return total;
}

function unidadesVendidas(ventas) {
  let unidades = 0;
  for (const venta of ventas) unidades += venta.cantidad;
  return unidades;
}

function ventaMayor(ventas, contador) {
  if (ventas.length === 0) return null;

  let mayor = ventas[0];
  for (const venta of ventas) {
    if (contador) contador.operaciones++;
    if (valorVenta(venta) > valorVenta(mayor)) mayor = venta;
  }
  return mayor;
}

function ticketPromedio(ventas) {
  let total = 0;
  let ventasValidas = 0;

  for (const venta of ventas) {
    if (venta.cantidad > 0) {
      total += valorVenta(venta);
      ventasValidas++;
    }
  }

  return ventasValidas === 0 ? 0 : total / ventasValidas;
}

function ventasPorCiudad(ventas, ciudad) {
  const ciudadBuscada = normalizarCiudad(ciudad);
  let total = 0;

  for (const venta of ventas) {
    if (normalizarCiudad(venta.ciudad) === ciudadBuscada) {
      total += valorVenta(venta);
    }
  }
  return total;
}

function totalVendidoM(ventas) {
  return ventas.map(valorVenta).reduce((total, valor) => total + valor, 0);
}

function unidadesVendidasM(ventas) {
  return ventas
    .map((venta) => venta.cantidad)
    .reduce((total, cantidad) => total + cantidad, 0);
}

function ventasPorCiudadM(ventas, ciudad) {
  const ciudadBuscada = normalizarCiudad(ciudad);
  return ventas
    .filter((venta) => normalizarCiudad(venta.ciudad) === ciudadBuscada)
    .map(valorVenta)
    .reduce((total, valor) => total + valor, 0);
}

function totalPorCiudad(ventas, contador) {
  return ventas.reduce((totales, venta) => {
    if (contador) contador.operaciones++;
    const ciudad = mostrarCiudad(venta.ciudad);
    totales[ciudad] = (totales[ciudad] || 0) + valorVenta(venta);
    return totales;
  }, {});
}

function unidadesPorProducto(ventas) {
  return ventas.reduce((unidades, venta) => {
    unidades[venta.producto] = (unidades[venta.producto] || 0) + venta.cantidad;
    return unidades;
  }, {});
}

function topProductosPorValor(ventas, k) {
  const totales = ventas.reduce((porProducto, venta) => {
    porProducto[venta.producto] =
      (porProducto[venta.producto] || 0) + valorVenta(venta);
    return porProducto;
  }, {});

  return [...Object.entries(totales)]
    .map(([producto, valor]) => ({ producto, valor }))
    .sort((a, b) => b.valor - a.valor)
    .slice(0, k);
}

function ventasDelDia(ventas, fecha) {
  const ventasDelDia = ventas.filter((venta) => venta.fecha === fecha);
  const ventasValidas = ventasDelDia.filter((venta) => venta.cantidad > 0);
  const total = totalVendido(ventasDelDia);

  return {
    fecha,
    cantidadVentas: ventasDelDia.length,
    totalVendido: total,
    unidadesVendidas: unidadesVendidas(ventasDelDia),
    ticketPromedio:
      ventasValidas.length === 0 ? 0 : totalVendido(ventasValidas) / ventasValidas.length,
  };
}

function primeraVenta(ventas, contador) {
  if (contador) contador.operaciones++;
  return ventas.length === 0 ? null : ventas[0];
}
// clientes con set
function clientesRecurrentes(ventas) {
  const recurrentes = new Set();
  const recurrentesconguayaba = new Set();
  
for (let value of ventas) {
  if (recurrentes.has(value.cliente)){
    recurrentesconguayaba.add(value.cliente)
  }else {recurrentes.add(value.cliente)}
}
return recurrentesconguayaba;
}
//compras con map
function comprasPorCliente (ventas) {
    const comprasconguayabas = new Map()
    const clientesRecurrentes = new Set ()

  for (let value of ventas){
    
    let cliente = value.cliente;
    let cantidad = value.cantidad;
    if(comprasconguayabas.has(cliente)){
        comprasconguayabas.set(
            cliente,
            comprasconguayabas.get (cliente) + cantidad 
        )
        clientesRecurrentes.add(cliente) 

    } else {comprasconguayabas.set(cliente, cantidad)}

    
}

    const guayabas = [...clientesRecurrentes]

    return {comprasconguayabas,
         guayabas,};
}



function totalCiudadCadena(ventas, ciudad) {
  const ciudadBuscada = normalizarCiudad(ciudad);
  return ventas
    .map((venta) => ({
      ciudad: normalizarCiudad(venta.ciudad),
      valor: valorVenta(venta),
    }))
    .filter((venta) => venta.ciudad === ciudadBuscada)
    .map((venta) => venta.valor)
    .reduce((total, valor) => total + valor, 0);
}

function totalCiudadUnaPasada(ventas, ciudad) {
  const ciudadBuscada = normalizarCiudad(ciudad);
  let total = 0;

  for (const venta of ventas) {
    if (normalizarCiudad(venta.ciudad) === ciudadBuscada) {
      total += valorVenta(venta);
    }
  }

  return total;
}

module.exports = {
  valorVenta,
  normalizarCiudad,
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
  primeraVenta,
  clientesRecurrentes,
  totalCiudadCadena,
  totalCiudadUnaPasada,
  comprasPorCliente,
};
