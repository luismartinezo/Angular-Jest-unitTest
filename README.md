Project for the unit test course

# BOOK LIST APP

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.3.

## Configuracion y primeros pasos con Jest
### Eliminar Jasmine y Karma del Proyecto
* Nos aseguramos de que esten instalados como dependencias de desarrollo en el archivo package.json
* corremos el comando `npm remove @types/jasmine jasmine-core karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter` todas las que se relacionen o simplemente las quitamos del archivo y corremos `npm install` 
* Si deseamos borrar la linea llamada "test": "ng test" al inicio del archivo, esta sirve para correr los test de jasmine y karma
* Abrimos el archivo llamado angular.json y vamos al apartado de test y borramos donde termina los corchetes{}
* Vamos al archivo llamado karma.conf.js y lo eliminamos por completo.
* Dentro de src/ borramos el archivo test.ts 

### Configurar Jest en Angular 
* Corremos el comando `ng add @briebug/jest-schematic` para instalar jest 
* luego de instalado si queremos trabajar con localStorage debemos borrar en el archivo setup-jest.ts en la linea 8 `|| ''` al final despues del value 
* En el archivo `tsconfig.spec.json` apartado de types agregamos la palabra jest en reemplazo de jasmine y luego de este apartado , agregamos `"esModuleInterop":true, "emitDecoratorMetadata":true` 
* En el archivo `jest.config.js` podemos agregar configuraciones nuestras, podemos agregar luego de `setupFilesAfterEnv` algo como `collectCoverage:true` se nos crea una carpeta de coverage automaticamente y podemos decirle el directory donde se va crear con `coverageDirectory:'coverage/unitest'`
* En el archivo package.json creamos el comando para ejecutar los test en el apartado scripts `"test": "jest"`

### Archivo de pruebas de un proyecto

### Lanzar Test
* Corremos el comando `npm run test` para correr el test 
* Agregamos un nuevo comando en el archivo package.json llamado `"test-watch":"jest --watchAll"`
* Podemos tambien crear la carpeta de coverage por medio de comando `test-coverage:jest --coverage` en el archivo package.json

## Test Unitario
### Aplicacion para testear
### Instalar Json-Server
* Luego de descargar o crear el proyecto Angular corremos el comando `npm install json-server` y corremos con `json-server --watch db.json` para levantar el backend en la dirección `http://localhost:3000`

### Estructura de un fichero de pruebas (.spec)
### Crear Test y configurar el testBed
### Fallos comunes configurando el testBed
### Test a metodos con return
### Test a métodos sin return (uso de spyOn)
### Test a métodos privados
### Test a suscripciones(subscribe-Observable)
### Mock de un servicio
### xit, fit, xdescribbe, fedescribe, describe.only
* las opciones de *xit* hace el test no se ejecute y que sea nulo o se evita igualmente se puede hacer para *xdescribe*
* Para *fit* y *fdescribe* hace lo contrario, se ejecuta unicamente el test que se halla marcado como *fit* o *fdescribe*
* La opcion *it.oonly* hace exactamente lo mismo que la anterior, se ejecuta ese solo test que se marco dentro del archivo spec 
### beforeEach, beforeAll, afterEach, afterAll
como sus nombre en ingles lo indican estos:
* beforeEach se ejecta antes del test 
* beforeAll se ejecta antes de todo los test
* afterEach se ejecta despues del test
* afterAll se ejecta despues de todos los test
### Test a un Pipe 
### Test a un servicio con peticion API
### Instanciar un componente o un servicio 
### Testear Rutas 

## Angular Material Dialog
* Instalamos el angular material con `ng add @angular/material`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


