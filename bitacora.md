Diccionario de datos

id: número. Identifica la venta.
fecha: texto. Día de la venta.
cliente: texto. Identifica al cliente.
producto: texto. Producto vendido.
ciudad: texto. Ciudad de la venta.
cantidad: número. Unidades vendidas.
precio: número. Precio por unidad.

Casos borde detectados

* La ciudad puede tener mayúsculas distintas o espacios, por ejemplo "medellín ". La dejo como viene y la normalizo al comparar.
* Hay una venta con cantidad 0. La conservo, pero no la cuento para el ticket promedio.
* El cliente C01 aparece más de una vez. Puede haber hecho varias compras; conservo cada venta.

Reto 2: cálculos con ciclos

Pseudocódigo

valorVenta: multiplicar cantidad por precio.

totalVendido: empezar en cero, recorrer las ventas, sumar el valor de cada venta y devolver el total.

unidadesVendidas: empezar en cero, recorrer las ventas, sumar la cantidad y devolver las unidades.

ventaMayor: si no hay ventas, devolver null. Si hay, empezar con la primera y guardar otra cuando su valor sea mayor.

1 .ticketPromedio: empezar el total y el contador en cero. Sumar y contar las ventas con cantidad mayor que cero. Si no hay ventas válidas, devolver cero; si hay, dividir el total por el contador.

ventasPorCiudad: quitar espacios y pasar a minúsculas la ciudad buscada y las ciudades de las ventas. Sumar el valor de las que coinciden.

Con el arreglo vacío, totalVendido, unidadesVendidas, ticketPromedio y ventasPorCiudad devuelven 0. ventaMayor devuelve null. valorVenta usa una venta, no un arreglo; por ejemplo, la venta 1 vale 2 x 42000 = 84000.

Pruebas: arreglo completo, una venta y arreglo vacío

Función | Completo | Venta 1 | Vacío
totalVendido | 985000 | 84000 | 0
unidadesVendidas | 21 | 2 | 0
ventaMayor | venta 10 | venta 1 | null
ticketPromedio | 89545.45 aprox. | 84000 | 0
ventasPorCiudad("Medellín") | 356000 | 84000 | 0

Traza del total vendido

Venta | Valor | Total acumulado
1 | 84000 | 84000
2 | 26000 | 110000
3 | 95000 | 205000
4 | 42000 | 247000
5 | 135000 | 382000
6 | 52000 | 434000
7 | 120000 | 554000
8 | 0 | 554000
9 | 90000 | 644000
10 | 168000 | 812000
11 | 95000 | 907000
12 | 78000 | 985000

Traza de las ventas de Medellín

Venta | Valor | Total acumulado
1 | 84000 | 84000
4 | 42000 | 126000
5, "medellín " | 135000 | 261000
11 | 95000 | 356000

Reto 3: métodos y agrupaciones

totalVendidoM: recorro todas las ventas; no filtro; convierto cada venta a su valor; sumo los valores; no agrupo.

unidadesVendidasM: recorro todas las ventas; no filtro; tomo la cantidad de cada una; sumo las cantidades; no agrupo.

ventasPorCiudadM: recorro las ventas; filtro la ciudad buscada; convierto cada coincidencia a su valor; sumo los valores; no agrupo.

totalPorCiudad: recorro las ventas; no filtro; normalizo el nombre de la ciudad; sumo el valor; agrupo por ciudad.

unidadesPorProducto: recorro las ventas; no filtro; tomo el producto y la cantidad; sumo las unidades; agrupo por producto.

topProductosPorValor: recorro las ventas; no filtro; convierto los totales en una lista; sumo el valor por producto; agrupo por producto y devuelvo los k mayores.

verificar.js compara las tres funciones con ciclo y método. También prueba los cálculos con el arreglo completo, una venta y uno vacío.

Reto 4: reporte y errores

Error de Bogotá duplicada

Síntoma: Bogotá aparecía en dos grupos.
Entrada que lo produce: "Bogotá" y "Bogotá ".
Hipótesis: los nombres se agrupaban sin normalizarlos.
Prueba: sumar las dos variantes y revisar que queden en un grupo.
Causa: el espacio al final hace que los textos sean distintos.
Corrección: quitar espacios y pasar a minúsculas al agrupar; mostrar el nombre como Bogotá.

Error del ticket promedio en un día sin ventas

Síntoma: el ticket promedio mostraba NaN.
Entrada que lo produce: resumen del día "2026-09-07", que no tiene ventas.
Hipótesis: se dividía el total entre cero ventas válidas.
Prueba: ventasDelDia devuelve cero ventas, cero total, cero unidades y ticket cero.
Causa: no se revisaba si había ventas válidas antes de dividir.
Corrección: si no hay ventas válidas, devolver cero.

El reporte muestra el resumen general, las ventas por ciudad, las unidades por producto, los tres productos de mayor valor y el resumen del 2026-09-01 y del 2026-09-07.

* Reto 5: predicción antes de medir

Predicciones si n pasa de 100 a 1.000:

- primeraVenta: no cambia, aproximadamente 1 operación.
- totalVendido: crece aproximadamente 10 veces.
- ventaMayor: crece aproximadamente 10 veces.
- totalPorCiudad: crece aproximadamente 10 veces.

Complejidades esperadas:

- primeraVenta: O(1)
- totalVendido: O(n)
- ventaMayor: O(n)
- totalPorCiudad: O(n)