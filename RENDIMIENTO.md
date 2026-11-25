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
| clientesRecurrentes | Encuentra clientes que aparecen más de una vez | O(n²), peor caso con O(n³) por includes | O(r), con r clientes recurrentes | Dos ciclos comparan pares, n(n-1)/2 iteraciones; includes puede recorrer recurrentes. |
| totalCiudadCadena | Suma una ciudad con cuatro métodos encadenados | O(n) | O(n) | Devuelve el mismo valor que una pasada en 10.000 ventas, pero crea arreglos temporales. |
| totalCiudadUnaPasada | Suma una ciudad con un recorrido | O(n) | O(1) | Devuelve el mismo valor que la cadena, sin arreglos intermedios. |

## Proyección

La proyección usa el tiempo medido a 16.000 ventas de clientesRecurrentes (14.566 s) y crece como n²:

- 100.000 ventas: aproximadamente 569 s, unos 9,5 minutos.
- 1.000.000 de ventas: aproximadamente 56.883 s, unas 15,8 horas.

No se ejecutó 100.000 porque supera dos minutos.

## Riesgos

1. clientesRecurrentes: mayor riesgo por crecimiento cuadrático y búsquedas ocultas con includes.
2. topProductosPorValor: crecimiento n log n y memoria proporcional a productos distintos.
3. ventasDelDia y métodos encadenados: crecimiento lineal, pero crean arreglos adicionales.
4. totalPorCiudad y unidadesPorProducto: crecimiento lineal con memoria proporcional a categorías.
5. totalVendido, ventaMayor y demás recorridos únicos: crecimiento lineal y memoria constante.

## Plan de optimización

Para clientesRecurrentes se repite el recorrido de pares para encontrar coincidencias y luego se vuelve a recorrer recurrentes con includes. Una mejora futura puede usar un Set para recordar qué cliente ya apareció y qué cliente ya fue agregado. Así se evita comparar todos los pares y evita volver a buscar dentro de recurrentes. Primero se debe revisar cada venta una vez, guardar clientes vistos y guardar recurrentes una sola vez.
