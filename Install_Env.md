# Instalacion de entorno de desarrollo

Utilizaremos: 
* **Nodejs** para gestionar paquetes.
* **Expo** para desplegar la aplicación en fase de desarrollo.
* **React Native** como framework.
* **Visual Studio Code** como IDE recomendado.
* **Git** para versionado 
* **FireBase** como Base de Datos.
### Node JS 📋
Es imprescindible tener Node Js instalado para gestionar los paquetes que necesitara React. El siguiente Link los lleva a la pagina de Node.
* [Descargar Node JS](https://nodejs.org/en/)

Para verificar la instalacion ejecutarmos en una shell:
~~~
npm -v 
~~~


### Expo 
Expo nos instala directamente todo lo que necesitamos para React Native, por lo simplemente ejecutaremos el comando para instalarlo. Además, nos provee de un ambiente de compilación para visualizar el proyecto en su fase de desarollo.
~~~
npm install -g expo-cli
~~~
Tambien, podemos instalar la aplicación movil de Expo para ver la aplicación en fase de desarrollo en nuestro dispositivo móvil, buscarla en la **App store**.

Para iniciar el proyecto y poder visualizarlo, en la carpeta raiz del proyecto ejecutar:
~~~
expo start
~~~
Se abrira una ventana Web con varias opciones. Si se quiere ver el proyecto en un navegador web, seleccionar _"Run in web browser"_. Si se quiere ver en un dispositivo movil, escanear el codigo QR en la aplicacion movil de Expo.
### Librerias necesarias
Las librerias que se utilizaran en el proyecto se iran guardando dentro del archivo _**package.json**_ en la raíz del proyecto. Cada vez que se agrege una libreria nueva es necesario instalar los paquetes necesarios, ya que Git no sube las librerias al repositorio (.gitignore). Para instalar se ejecuta: 
~~~
npm install
~~~
Este comando lee el archivo package.json e instala las librerias que no se encuentren localmente en el proyecto.

