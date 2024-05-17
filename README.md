# GoodReads

Este proyecto se creo con [Angular CLI](https://github.com/angular/angular-cli) en su versión 16.1.6.

La idea original de este proyecto sale de las pruebas técnicas propuestas por  [@MiduDev](https://github.com/midudev "@MiduDev") en https://pruebastecnicas.com/ .

![goods](https://github.com/jaimes1br/good-reads-practice/assets/91866094/c08ebe93-2052-498d-af2b-ab39dc90f42b)

## Objetivo

Diseñar e implementar una pequeña aplicación web de lista de libros utilizado herramientas de mi elección, en este caso usando el framework de Angular.

## Contexto

Se tiene un sello editorial de libros multinacional. Buscando ofrecer a su público una forma de ver su catálogo y poder guardar los libros que les interesan en una lista de lectura.

Para ello, quieren desarrollar una aplicación web que permita a los usuarios ver los libros disponibles y crear una lista de lectura.

## Requisitos

### Funcionalidad

1. [x] **Visualización de Libros Disponibles**: La aplicación debe mostrar una lista de libros disponibles que el usuario pueda revisar.
2. [x] **Creación de Lista de Lectura**: El usuario debe ser capaz de crear una lista de lectura a partir de los libros disponibles. En la UI debe quedar claro qué libros están en la lista de lectura y cuáles no. También debe ser posible mover un libro de la lista de lectura a la lista de disponibles.
3. [x] **Filtrado de Libros por Género**: Los usuarios deben poder filtrar la lista de libros disponibles por género, y se mostrará un contador con el número de libros disponibles, el número de libros en la lista de lectura y el número de libros disponibles en el género seleccionado.
4. [x] **Sincronización de Estado**: Debe haber una sincronización del estado global que refleje el número de libros en la lista de lectura y el número de libros todavía disponibles. Si un libro se mueve de la lista de disponibles a la lista de lectura, el recuento de ambos debe actualizarse en consecuencia.
5. [x] **Persistencia de Datos**: La aplicación debe persistir los datos de la lista de lectura en el almacenamiento local del navegador. Al recargar la página, la lista de lectura debe mantenerse.
6. [ ] **Sincronización entre pestañas**: Si el usuario abre la aplicación en dos pestañas diferentes, los cambios realizados en una pestaña deben reflejarse en la otra. Sin necesidad de usar Backend.
7. [ ] **Despliegue**: La aplicación debe estar desplegada en algún servicio de hosting gratuito (Netlify, Vercel, Firebase, etc) y debe ser accesible a través de una URL pública. Indica la URL en el README.
8. [ ] **Test**: La aplicación debe tener AL MENOS un test. Haz el test que consideres más importante para tu aplicación.

### Desafios adicionales

1. [x] Implementar una funcionalidad de búsqueda en la lista de libros disponibles.
2. [x] Añade un nuevo filtro para filtrar los libros por número de páginas.
3. [x] Permitir la reorganización de los libros en la lista de lectura por prioridad.
4. [ ] Haz que tu diseño sea responsive.

## Ver Aplicación

Es posible ver la aplicación en ejecució de manera local, descarga el repositorio:

```bash
git clone https://github.com/jaimes1br/good-reads-practice.git
```

Una vez descargado, instala las dependencias: 

```bash
cd good-reads/
npm install
```

Para iniciar la aplicación ejecuta

```bash
ng serve
```

Una vez terminado el proceso, en un navegador navega a `http://localhost:4200/`.


## Build

Para obtener el build del proyecto, ejecuta el comando `ng build`. Podremos ver el resultado en el directorio `dist/`.
