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

Reto 5: medición realizada

Predicción antes de medir: al pasar de n a 10n, las funciones lineales debían multiplicar sus operaciones aproximadamente por 10 y primeraVenta debía quedarse constante.

| n | primeraVenta | totalVendido | ventaMayor | totalPorCiudad 
| 100 | 1 | 100 | 100 | 100 |
| 1.000 | 1 | 1.000 | 1.000 | 1.000 |
| 10.000 | 1 | 10.000 | 10.000 | 10.000 |
| 100.000 | 1 | 100.000 | 100.000 | 100.000 |

Los resultados coinciden con las predicciones. primeraVenta tiene O(1). totalVendido recorre una vez el arreglo, ventaMayor visita cada venta una vez y totalPorCiudad procesa una venta por iteración, por lo que las tres tienen O(n).

Reto 6: clientes recurrentes, medición de la versión inicial

Con un arreglo de 5 ventas, los ciclos exterior e interior hacen 10 iteraciones del interior: 4 + 3 + 2 + 1. Comparan los clientes una vez por par. Con n ventas hacen n(n-1)/2 pares, es decir, O(n²) comparaciones antes de considerar métodos adicionales.

| n | Tiempo medido |
|---|---|
| 1.000 | 72.232 ms |
| 2.000 | 129.023 ms |
| 4.000 | 577.036 ms |
| 8.000 | 4.721 s |
| 16.000 | 14.566 s |

Al duplicar n, el tiempo tiende a multiplicarse por aproximadamente cuatro en los casos de tamaño suficiente. La medición confirma el crecimiento cuadrático.

Estimaciones cuadráticas: usaré el tiempo medido a 16.000 como referencia. Para 100.000, el factor es (100.000/16.000)² = 39.0625; la estimación es 14.566 s × 39.0625 ≈ 569 s. Para 1.000.000, el factor es (1.000.000/16.000)² = 3906.25; la estimación es 14.566 s × 3906.25 ≈ 56.883 s × 1.000 ≈ 15,8 horas. No ejecuté 100.000 porque la estimación supera dos minutos.

La llamada recurrentes.includes recorre el arreglo recurrentes. En el peor caso agrega trabajo adicional de búsqueda dentro de los pares encontrados. Por eso el costo puede incluir recorridos sobre recurrentes además del ciclo exterior e interior.

Conclusión para la gerente: el reporte revisa todas las ventas contra las demás y repite búsquedas entre coincidencias. Cada vez que el historial crece, el trabajo crece mucho más rápido que los datos. Con grandes volúmenes puede esperar varios minutos o quedarse pensando.

Actualización: la implementación final usa Set para procesar cada venta una vez. La complejidad promedio actual es O(n); las mediciones y proyecciones anteriores describen la versión inicial cuadrática, no el código actual.

Reto 7: recursos

Con 10.000 ventas, totalCiudadCadena y totalCiudadUnaPasada devolvieron exactamente 473.749.000 para Bogotá.

totalCiudadCadena usa cuatro recorridos completos: map normaliza y obtiene valores, filter conserva una ciudad, map extrae valores y reduce suma. Crea arreglos intermedios después de map, filter y map. Tiempo O(n), espacio O(n) por los arreglos temporales.

totalCiudadUnaPasada usa un recorrido con for...of y variables acumuladoras. Tiempo O(n), espacio O(1).

Aunque la cadena recorra el arreglo cuatro veces, O(4n) se simplifica a O(n) porque las constantes no cambian la categoría asintótica.

Reto 8: revisión y informe

Se creó RENDIMIENTO.md con mediciones, proyecciones, riesgos y plan de optimización. La observación de revisión priorizará incluir el criterio de medición: el informe separa operaciones deterministas de tiempos ambientales y deja claro qué datos no se ejecutaron.

Reto 9: optimización de clientes recurrentes (Día 2)

1. Entender

La entrada es un arreglo de ventas; cada venta contiene un identificador de cliente. La salida es la lista de identificadores únicos que aparecen en dos o más ventas. El orden de salida no es importante. La solución optimizada debe procesar 100.000 ventas en menos de un segundo. Las ventas con cantidad cero también cuentan como registros de compra, porque aquí se cuenta la frecuencia de ventas, no las unidades.

2. Ejemplos y casos borde

- Arreglo vacío: [] -> []
- Un solo registro: [A] -> []
- Un cliente aparece dos veces: [A, A] -> [A]
- Un cliente aparece varias veces: [A, B, A, A] -> [A], sin duplicar el identificador.
- Datos del Día 1: clientes recurrentes C01, C02 y C03.
- Con 5.000 ventas generadas, las tres implementaciones deben producir los mismos identificadores al ordenar sus resultados.

3. Fuerza bruta

clientesRecurrentesDobleFor compara cada venta con las demás. Solo agrega al cliente en su primera aparición y si encuentra otra venta del mismo cliente. Así evita duplicados sin una estructura de búsqueda adicional. En el peor caso hace O(n²) comparaciones. La memoria auxiliar es O(r), donde r es la cantidad de clientes recurrentes devueltos.

4. Optimizar

clientesRecurrentesSet usa un Set de vistos y otro de recurrentes. Las operaciones has y add tienen costo esperado O(1), de modo que el recorrido cuesta O(n) esperado. comprasPorCliente usa un Map para contar registros por cliente y revisa ese Map para obtener los clientes con más de una compra; también cuesta O(n) esperado.

El intercambio es usar memoria para evitar repetir comparaciones. Set y Map guardan información de hasta u clientes únicos y la salida guarda hasta r recurrentes: espacio O(u + r), que queda acotado por O(n). La fuerza bruta usa menos memoria auxiliar, pero puede hacer muchas más comparaciones.

5. Implementar

Se conservaron tres versiones comparables: clientesRecurrentesDobleFor como referencia, clientesRecurrentesSet con dos Set, y comprasPorCliente con un Map de conteos. La función clientesRecurrentes se mantiene como envoltorio compatible que devuelve el Set de clientes de la versión optimizada. El reporte usa los nombres explícitos del resultado del Map.

6. Probar y medir

node src/verificar.js compara las tres listas ordenadas con las ventas del Día 1 y con 5.000 ventas generadas; ambas comparaciones pasan. También comprueba que C01 tiene tres compras en el Map.

node src/medir.js usa console.time y performance.now. Los datos se generan aleatoriamente, así que los tiempos pueden variar entre ejecuciones y equipos. La fuerza bruta se mide hasta 10.000 ventas; se omite para 100.000 por su crecimiento cuadrático.

| Ventas | Doble for (ms) | Set (ms) | Map (ms) |
|---:|---:|---:|---:|
| 1.000 | 3.398 | 0.259 | 0.482 |
| 2.000 | 6.379 | — | — |
| 4.000 | 26.944 | — | — |
| 10.000 | 206.968 | 1.461 | 1.577 |
| 100.000 | omitida | 12.156 | 17.636 |

Las mediciones muestran que al aumentar de 1.000 a 10.000 ventas, las versiones optimizadas se mantienen cerca de un crecimiento lineal y la fuerza bruta aumenta mucho más rápido. Con 100.000 ventas, Set y Map quedan por debajo de un segundo en esta ejecución. Los tiempos son mediciones del entorno, no garantías para todos los equipos.