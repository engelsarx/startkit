# README #

Repositorio base para iniciar proyectos de maquetación

### Descripción ###
* Ahorraremos tiempo minificando 'assets' y agilizaremos el flujo con tareas como la sincronización de navegadores. 
* Se trabaja sobre una carpeta de desarrollo 'dev' y al final del proyecto o para una entrega parcial se creará una copia optimizada para distribución en el directorio 'dist'

### Versión ###
* 1.1.0

### ¿Cómo arrancar el proyecto? ###
* Clonar el repositorio
* npm init (para ajustar el archivo 'package.json' con los datos correctos al nuevo proyecto)
* npm install
* 'gulp dev' para trabajar en desarrollo
* 'gulp build' crea la versión para distribución

### DEPENDENCIAS ###
* Node, NPM, Python, Ruby

### Si algo falla escribir a ###
* alejandro.mur@babel.es

### Problemas conocidos ###
* A pesar de que 'gulp-sass' es más rápido que 'gulp-ruby-sass' utilizamos este últimos porque 'gulp-sass' depende de 'node-sass' y en algunos equipos windows 7 la compilación del SCSS no es efectiva al primer guardado y hay que guardar dos veces.
* Si compilar el SCSS te parece lento desactiva los sourcemaps.
* Si la tarea 'build' no te genera bien la versión para distribución, comprueba:
- Que haya llevado correctamente los assets a la carpeta 'dist': fonts, images, css (minificado), js (minificado)
- Que haya sustituido en los .html los comentarios tipo < !-- build:css css/styles.min.css --> por < link rel="stylesheet" href="css/styles.min.css" >
* A veces ocurre que hace los dos pasos anteriores bien pero que el .html tiene alguna mal formación, si esto ocurre:
- Ejecuta la tarea por separado 'gulp useref' y ejecuta después 'gulp serve' para comprobar que todo está en su sitio
* Otras veces ocurre que falla la inyección de dependencias minificadas en el html, en ese caso:
- Ejecuta la tarea por separado 'gulp useref' y ejecuta después 'gulp serve' para comprobar que todo está en su sitio
* Si estas soluciones no te funcionan borra los .html a mano de la carpeta de desarrollo y hacer 'gulp dev', abrir los .html y guardarlos sin ningún cambio y 'gulp build'.

### ¿Y ahora qué? ###
* Aporta. Busca plugins que sean útiles, crea una nueva rama y pruébalos aislado e integrado con el actual 'gulpfile.js'
* Enséñaselo al equipo, y si resulta útil mergealo a master, que es la rama principal

### Tareas pendientes ###
* Critical [https://github.com/addyosmani/critical] [https://nystudio107.com/blog/implementing-critical-css]
* Uncss [https://github.com/giakki/uncss]
* Custom properties [https://github.com/malyw/css-vars] [https://github.com/postcss/postcss-custom-properties]
* Gulp load plugins [https://www.npmjs.com/package/gulp-load-plugins]
* Pasar cada tarea a un directorio en vez de tenerlas en el 'gulpfile.js'
* Probar plugin para crear hojas de alto contraste [https://github.com/shiwaforce/postcss-high-contrast]
* Crear los favicons de manera automática [https://github.com/evilebottnawi/favicons]
* Crear componentes de los listados a continuación 

### Listas de componentes para maquetación  ###
* Tabs - OK (alerts.kit, alerts.scss, alerts.js)
* Alerts - OK (tabs.kit, tabs.scss, tabs.js)
* Formularios
* Listas (bullets / iconos / normales/ con link)
* Acordeón
* Breadcrumbs
* Modal
* Popovers
* Títulos
* Párrafos
* 

#   s t a r t k i t  
 