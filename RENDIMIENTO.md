# Rendimiento de Café Origen v0.2

## Tabla de funciones

| Función | Qué hace | Tiempo | Espacio | Justificación y medición con 10.000 ventas |
|---|---|---|---|---|
| valorVenta | Multiplica cantidad por precio | O(1) | O(1) | Hace una operación sin recorrer datos. |
| totalVendido | Suma el valor de todas las ventas | O(n) | O(1) | Un recorrido; 10.000 operaciones instrumentadas. |
| unidadesVendidas | Suma cantidades | O(n) | O(1) | Un recorrido con un acumulador. |
| ventaMayor | Encuentra la venta de mayor valor | O(n) | O(1) | Compara durante un recorrido; 10.000 operaciones instrumentadas. |
| ticketPromedio | Calcula el promedio de ventas válidas | O(n) | O(1) | Recorre las ventas una vez y conserva dos acumuladores. |
| ventasPorCiudad | Suma una ciudad | O(n) | O(1) | Recorre las ventas una vez y conserva un total. |
| totalVendidoM | Suma con map y reduce | O(n) | O(n) | map crea un arreglo de valores antes de reduce. |
| unidadesVendidasM | Suma unidades con map y reduce | O(n) | O(n) | map crea un arreglo intermedio de cantidades. |
| ventasPorCiudadM | Filtra y suma una ciudad | O(n) | O(n) | filter y map crean arreglos intermedios. |
| totalPorCiudad | Agrupa totales por ciudad | O(n) en promedio | O(c), con c ciudades distintas | Recorre cada venta una vez; el objeto crece con las ciudades. Con hasta c ciudades, c puede crecer, pero es menor o igual a n. |
| unidadesPorProducto | Agrupa unidades por producto | O(n) | O(p), con p productos distintos | El diccionario contiene cada producto distinto. |
| topProductosPorValor | Agrupa y ordena productos | O(n log n) | O(p) | Reducir toma O(n); ordenar p totales puede costar O(p log p). Se conserva una copia de productos como arreglo y objetos. |
| ventasDelDia | Resume un día | O(n) | O(n) | Filtra ventas y crea arreglos intermedios; totalVendido también recorre el filtro. |
| primeraVenta | Devuelve la primera venta | O(1) | O(1) | Acceso directo al índice cero; 1 operación medida. |
| clientesRecurrentes | Encuentra clientes que aparecen más de una vez | O(n) promedio | O(u), con u clientes distintos | Usa dos Set y procesa cada venta una vez. |
| comboRegalo | Busca dos productos que sumen un monto | O(n) promedio | O(n) | Recorre el catálogo y busca complementos con un Map. |
| mejorRacha | Busca el mayor total de k días consecutivos | O(n) | O(1) | Calcula la primera ventana y actualiza la suma al entrar y salir cada día. |
| totalCiudadCadena | Suma una ciudad con cuatro métodos encadenados | O(n) | O(n) | Devuelve el mismo valor que una pasada en 10.000 ventas, pero crea arreglos temporales. |
| totalCiudadUnaPasada | Suma una ciudad con un recorrido | O(n) | O(1) | Devuelve el mismo valor que la cadena, sin arreglos intermedios. |

## Medición de clientes recurrentes

Una ejecución de `node src/medir.js` midió estos tiempos:

| Ventas | Tiempo |
|---:|---:|
| 1.000 | 1,056 ms |
| 2.000 | 1,432 ms |
| 4.000 | 1,985 ms |
| 8.000 | 4,808 ms |
| 16.000 | 14,864 ms |

Los tiempos dependen del entorno y de los datos generados al azar. La complejidad promedio se determina por el recorrido único y las búsquedas en Set, no por una sola medición.

## Riesgos

1. topProductosPorValor: crecimiento O(n log n) y memoria proporcional a productos distintos.
2. ventasDelDia y métodos encadenados: crecimiento lineal, pero crean arreglos adicionales.
3. totalPorCiudad y unidadesPorProducto: memoria proporcional a categorías.
4. comboRegalo: memoria proporcional al tamaño del catálogo.

## Cambios realizados

`clientesRecurrentes` ahora usa Set y procesa cada venta una vez. `comboRegalo` usa Map para buscar el precio complementario y `mejorRacha` actualiza una ventana deslizante sin crear arreglos intermedios.
