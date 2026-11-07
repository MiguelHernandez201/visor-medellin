# Visor Medellín para LG webOS TV

Las cámaras de tránsito del **SIMM** (Sistema Inteligente de Movilidad de Medellín) y las del **SIATA** (Sistema de Alerta Temprana del Valle de Aburrá) en el televisor, renovadas cada minuto, con la lluvia (radar y pluviómetros), el nivel de los ríos, el clima, las alertas del SIATA y un mapa de todas.

> Las imágenes son de la Alcaldía de Medellín ([SIMM](https://www.medellin.gov.co/SIMM/mapas/index.html?map=camarasCctv)) y del [SIATA](https://siata.gov.co/siata_nuevo/). No son video: el SIMM publica una **foto fija por cámara** que renueva cada minuto, y la app la pide en cuanto cambia. Ni el SIMM ni el SIATA publican video. Uso personal; revisa los términos de uso del sitio antes de redistribuir nada.

## Qué hace

- **Cuatro secciones**, en pestañas arriba: **SIMM** (80 cámaras de tránsito), **SIATA** (6 deprimidos viales, 11 panorámicas y 3 cámaras de cielo, entre ellas la de Bello), **Ríos** (72 cámaras del río Medellín, quebradas y drenajes, del SIATA, de norte a sur) y **Mapa**. Se pasa de una a otra con ↑ desde la primera fila y luego ← →, con los números 1 a 4, o con el puntero.
- **Lluvia en cada cámara:** cada cámara donde llueve lleva una etiqueta (llovizna, ligera, moderada o fuerte); en la cabecera se cuenta en cuántas llueve. Sale del radar del SIATA confirmado con los pluviómetros a menos de 2,5 km: si todos están secos, no se marca lluvia aunque el radar la muestre (el radar tiene falsos ecos y su imagen llega con 5-15 min de retraso). Donde no hay pluviómetros cerca vale el radar.
- **Nivel de los ríos:** cada cámara de río que tiene una estación de nivel del SIATA al lado muestra su riesgo (N1 seguro, N2 precaución, N3 inundación menor, N4 inundación mayor) y los metros de agua. En pantalla completa se ve además la gráfica de las últimas 3 horas con las franjas de riesgo. En el mapa, los ríos en N2 o más llevan un anillo que late, y en la cabecera se cuenta cuántos están en alerta. Se actualiza cada 5 minutos.
- **Mapa:** todas las cámaras sobre el Valle de Aburrá, con colores por fuente y un anillo en las cámaras donde llueve. Las flechas saltan a la cámara más cercana en esa dirección, el mapa la sigue y a la derecha se ve su foto, la lluvia, el clima y la calidad del aire de ese punto; OK la abre en pantalla completa; CH ± cambian el zoom.
- **Dónde llueve** (botón azul en el mapa, pasa de una capa a otra; se recuerda):
  - *Lluvia ahora*: la imagen del radar y una gota en cada pluviómetro donde está lloviendo, con los mm de los últimos 15 min (se ven con zoom de cerca).
  - *Lluvia medida*: mapa de calor hecho con los pluviómetros (lo que cae de verdad, no lo que estima el radar).
  - *Radar · últimas 3 horas*: animación con las ~36 imágenes del radar, para ver hacia dónde se mueve la lluvia.
- **Clima y alertas:** la temperatura del centro en la cabecera y, si el SIATA tiene una alerta vigente para la ciudadanía, una franja roja con el texto en lugar del estado.
- **Grilla de 12 cámaras** por página, con el nombre de cada lugar. Solo se descargan las que están a la vista. La imagen anterior sigue en pantalla hasta que llega la nueva, así que no parpadea.
- **Renovación sincronizada** (en el TV): cada foto se pide unos 2 s después de que el SIMM la renueva, no en un momento cualquiera del minuto.
- **Pantalla completa** con OK, con nombre y dirección; ← → pasan a la anterior o la siguiente.
- **Recorrido automático** (amarillo): cambia de cámara cada 15 s y pide la siguiente unos segundos antes para que ya esté lista.
- **Favoritas** (rojo) y vista **solo favoritas** (verde). Se guardan en el TV.
- **Edad de cada foto** ("hace 23 s"): en el TV es la hora en que el SIMM la tomó, no la de la descarga. Si una cámara no responde, se reintenta a los 15 s, 30 s… hasta 1 min, y la edad se pinta en amarillo.
- **Ahorro:** con la app en segundo plano no se descarga nada.

## Controles

| Botón | En la grilla | En pantalla completa |
|---|---|---|
| ← → ↑ ↓ | Moverse; ↑ desde la primera fila sube a las pestañas, donde ← → cambian de sección | Anterior / siguiente |
| 1 a 4 | Sección SIMM / SIATA / Ríos / Mapa | — |
| CH + / CH − | Página anterior / siguiente (en el mapa, acercar / alejar) | Anterior / siguiente |
| OK | Ver en pantalla completa | Volver a la grilla |
| Rojo | Marcar / desmarcar favorita | Marcar / desmarcar favorita |
| Verde | Solo favoritas sí/no | — |
| Amarillo / Play | Recorrido desde la cámara elegida | Recorrido sí/no |
| Azul | En el SIMM: buscar cámaras de nuevo. En el mapa: cambiar la capa de lluvia | — |
| Atrás | Sale de la app | Vuelve a la grilla |

En el PC: flechas, Enter, Re Pág / Av Pág, R G Y B para los colores y Esc como Atrás.

## Cómo funciona

Cada cámara del SIMM es una imagen numerada:

```
https://www.medellin.gov.co/SIMM/camaras-cctv/imagen6.jpg
```

No hay un listado público de cámaras, así que **la primera vez la app busca cuáles existen**: prueba `imagen1.jpg`, `imagen2.jpg`… (6 a la vez) hasta 400, o hasta encontrar 60 números seguidos sin imagen. Se guarda el resultado en el TV y se repite cada semana o con el botón azul.

El SIMM reescribe las fotos una tras otra al empezar cada minuto (la 2 hacia el segundo :01, la 82 hacia el :17, según su reloj, que va unos minutos atrasado). En el TV la app se carga desde `file://` y puede leer las cabeceras de la respuesta aunque el SIMM no envíe CORS: con `Last-Modified` y `Date` calcula cuándo se tomó cada foto y cuándo llega la siguiente, y la vuelve a pedir con `If-Modified-Since` (si aún no cambió, el SIMM responde 304 sin imagen). En el navegador del PC (`npm run dev`) CORS no deja leer las cabeceras, así que ahí se usa `<img>` y se pide cada minuto sin sincronizar. En ningún caso hace falta servicio Node.js como en el radar: es solo una app web.

Las del SIATA son una lista fija (`src/siata.js`) sacada de las capas "Cámaras" de su mapa: fotos como `https://siata.gov.co/ultimasFotosCamaras/ultimacam_dep_bulerias.jpg`. Su `Last-Modified` no sirve (repite la hora de la petición), pero el `ETag` lleva la hora real del archivo, y con él se pide con `If-None-Match`. Las fotos del SIATA llegan al servidor unos 20 s después de la hora que marcan; la app aprende ese retraso por cámara para no reintentar de más.

**Lluvia:** el SIATA publica cada ~5 minutos la última imagen de su radar meteorológico (`https://siata.gov.co/data/siata_app/ultima_imagen_radarDBZH.png`, de 5,1° a 7,3° N y de 76,6° a 74,3° O, unos 450 m por píxel). Como envía CORS, la app la lee píxel a píxel: convierte cada color en un nivel (azul → llovizna, verde → ligera, amarillo → moderada, rojo → fuerte). Los anillos de distancia, en negro, se ignoran, y se borran los falsos ecos: rayas de 1 px en línea recta hacia el radar (interferencias) y puntos sueltos, es decir, píxeles de lluvia con menos de 3 vecinos con lluvia. La cámara toma el color más intenso en 3x3 píxeles (≈1,4 km) a su alrededor. Para las marcas de cada cámara se sigue usando el radar (cubre todo el valle); los pluviómetros (`Pluviometrica.json` del sitio viejo se descartó porque su resumen no coincidía con cada estación; ahora se usan los del geoportal, ver abajo) se muestran en el mapa y en el panel.

**Geoportal del SIATA:** casi todo lo que no es la foto ni el radar sale de la API del [geoportal](https://geoportal.siata.gov.co) (`https://geoportal.siata.gov.co/fastgeoapi/...`, JSON). No envía CORS: en el TV se lee igual porque la app corre desde `file://`, pero **en el navegador del PC no hay niveles, pluviómetros, clima, alertas ni animación** (la app funciona igual, sin esas capas).

| Dato | Ruta (`fastgeoapi/…`) | Cada | Se pide |
|---|---|---|---|
| Nivel de ~160 estaciones | `geodata/geodataJson/2/niveles` (~65 KB) | 5 min | siempre |
| Serie de 3 h de una estación | `geodata/geographJson/3/nivel/<código>` | 2 min | en pantalla completa |
| ~180 pluviómetros (mm en 15 min) | `geodata/geodataJson/3/pluvios_v2` (~60 KB) | 1 min | en el mapa |
| ~40 estaciones meteorológicas | `geodata/geodataJson/3/tempVient` (~80 KB) | 5 min | siempre |
| PM2.5 (ICA de 24 h) | `geodata/geodataJson/1/pm25_minio` | 15 min | en el mapa |
| Alertas a la ciudadanía | `alerts/active/citizen` | 2 min | siempre |
| Lista de imágenes del radar (3 h) | `geoapi/radar_animation/` | 5 min | con la animación |
| Lista de cámaras | `cameras/` | — | solo para armar `src/siata.js` |

**Nivel de los ríos:** de cada estación se usan el nivel actual (cm), la hora y el `color` del riesgo (verde N1, amarillo N2, naranja N3, rojo N4; negro o gris = sin dato). Los umbrales (`nivelSeguro`, `nivelPrecaucion`, `inundacionMenor`, el tope de N1, N2 y N3) a veces no vienen en la respuesta, así que se recuerdan los últimos que llegaron. Cada cámara de río tiene asignada en `src/siata.js` la estación que está en el mismo punto o sobre la misma corriente a pocos cientos de metros; las que no tienen ninguna cerca no muestran nivel. (Antes se usaba el KML del visor viejo, `hidrologia/pagina_app/Nivel_new_poligono.kml`: pesa 850 KB y llega con ~20 min de retraso.)

**Pluviómetros:** `acumulado_15min` (mm) y `flag_precipitacion` ("yes" si llueve ahora). Solo cuenta como lluvia si el SIATA dice que está lloviendo. Nivel: menos de 0,5 mm en 15 min es llovizna, hasta 1,5 ligera, hasta 4 moderada y más, fuerte. El mapa de calor se calcula en el TV: cada pluviómetro con lluvia aporta sus mm, que se desvanecen con la distancia (campana de Gauss de 0,8 km); en cada punto manda el que más aporta.

**Mapa:** teselas *World Dark Gray* de Esri (sin clave; piden atribución), con un recorte del radar o el mapa de calor dibujado encima. Los cuadros de la animación (`siata.gov.co/data/radar/10/…png`) son del mismo tamaño y zona que la última imagen del radar. Las cámaras que comparten coordenadas (las 5 de la Torre SIATA, por ejemplo) se reparten en un círculo pequeño.

Los nombres, direcciones y coordenadas de `src/nombres.js` salen de la capa *CCTV_Movilidad* del [servidor de mapas de la Alcaldía](https://www.medellin.gov.co/servidormapas/rest/services/transporte/VC_Infraest_Gestion_Transito/MapServer/2), que une cada lugar con su imagen; las 10 que esa capa no numera se leyeron del texto que el SIMM sobreimprime en cada foto.

| Parte | Qué hace |
|---|---|
| `src/fuente.js` | Descarga sincronizada de las fotos (SIMM y SIATA) y búsqueda de cámaras del SIMM |
| `src/siata.js` | Cámaras del SIATA (secciones SIATA y Ríos) con sus coordenadas y estación de nivel |
| `src/lluvia.js` | Lectura del radar del SIATA, nivel de lluvia en cada punto y cuadros de la animación |
| `src/geoportal.js` | Pedidos periódicos a la API del geoportal y utilidades (distancias, horas) |
| `src/niveles.js` | Nivel del agua, riesgo y serie de 3 h de las estaciones del SIATA |
| `src/pluvios.js` | Lluvia medida en los pluviómetros |
| `src/clima.js` | Temperatura, viento, humedad, calidad del aire y alertas |
| `src/grafica.js` | Gráfica del nivel de un río (pantalla completa) |
| `src/mapa.js` | Mapa: teselas, radar, mapa de calor, gotas, puntos y salto a la cámara vecina |
| `src/nombres.js` | Nombre, dirección y coordenadas de las 80 cámaras del SIMM (el SIMM solo da números) |
| `src/main.js` | Secciones, grilla, pantalla completa, recorrido, favoritas y control remoto |
| `src/visor.css` | Estilos a 1920x1080 |
| `app/` | Manifiesto de webOS (`appinfo.json`), página e íconos |
| `scripts/icono.svg` | Diseño del ícono; `npm run iconos` genera `app/icon.png` y `app/largeIcon.png` |
| `dev/servidor.mjs` | Para probar en el PC |

### Si no aparece ninguna cámara

El sitio de la Alcaldía rechaza (403) algunas conexiones, por ejemplo desde fuera de Colombia o desde clientes que no son un navegador. Desde un navegador o un TV en Colombia debería cargar. Si `imagen6.jpg` se ve en el navegador del PC pero la app no encuentra nada, abre `npm run inspeccionar` y mira la pestaña *Network*.

Si el SIMM devolviera una imagen de relleno ("sin señal") para los números que no existen, la búsqueda los contaría como cámaras. En ese caso, ajusta `hasta` y `hueco` en `descubrir()` (`src/fuente.js`).

## Requisitos

- Un televisor **LG con webOS** (pensado para webOS TV 22: Chromium 87).
- En el PC: **Node.js 20 o más nuevo**.
- El **modo desarrollador** activado en el TV y el dispositivo registrado con `ares-setup-device` (por defecto se llama `tv`; se cambia con la variable `TV`).

## Uso

```bash
npm install
npm run dev          # http://localhost:8083 en el PC
npm run desplegar    # compila, empaqueta, instala y abre en el TV
```
