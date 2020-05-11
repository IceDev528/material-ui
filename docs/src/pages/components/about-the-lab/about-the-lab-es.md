# Acerca del laboratorio

<p class="description">Este paquete aloja componentes en incubación que todavía no están listos para estar en core.</p>

La principal diferencia entre lab y core es la forma en que los componentes están versionados. Tener un paquete lab (laboratorio) nos permite la liberación de cambios dañinos cuando sea necesario, mientras que el paquete core (núcleo) sigue una [política de movimiento más lenta](https://material-ui.com/versions/#release-frequency).

Mientras los desarrolladores usan y prueban los componentes y reportan problemas, los mantenedores aprendemos más acerca de las deficiencias de los componentes: características faltantes, problemas de accesibilidad, defectos, diseño de la API, etc. Entre más antiguo y utilizado un componente es, menos probable es que encuentren nuevos problemas y, posteriormente, se necesiten introducir cambios dañinos.

Para que un componente esté listo para pasar al core, los siguientes criterios son considerados:

* Tiene que ser **usado**. El equipo de Materia-UI utiliza estadísticas de Google Analytics, entre otras métricas, para evaluar el uso de cada componente. Un componente lab con bajo uso o bien significa que no está funcionando plenamente todavía, o que tiene una baja demanda.
* Necesita tener la misma **calidad de código** que los componentes del core. No tiene que ser perfecto para ser una parte del core, pero el componente debe ser lo suficientemente confiable que desarrolladores pueden depender de él. 
    * Cada componente necesita **definiciones de tipo**. Actualmente no es necesario un componente de lab tenga tipo, pero debe tenerlo para moverse al core.
    * Requiere buena **cobertura de pruebas**. Algunos de los componentes de lab, actualmente no tienen pruebas exhaustivas.
* ¿Puede utilizarse como **palanca** para incentivar a los usuarios a actualizar a la última versión mayor? Cuanto menos fragmentada este la comunidad, mejor.
* Necesita tener una baja probabilidad de **cambio dañinos** en el corto/mediano plazo. Por ejemplo, si se necesita una nueva característica que probablemente va a requerir un cambio dañino, seria preferible retrasar su promoción al core.

## Instalación

Instala el paquete en el directorio de tu proyecto con:

```sh
// usando npm
npm install @material-ui/lab

// usando yarn
yarn add @material-ui/lab
```

Lab tiene como dependencia par a los componentes del core. Si aún no estás usando Material-UI en tu proyecto, puedes instalarlo con:

```sh
// usando npm
npm install @material-ui/core

// usando yarn
yarn add @material-ui/core
```