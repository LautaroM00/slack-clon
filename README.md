# Trabajo final: Diplomatura Full-Stack

## Contexto

Para comenzar el desarrollo del proyecto decidí reutilizar el código que había hecho para el primer módulo (Front-End), dudé en tomar esa decisión porque pensaba que lo mejor era empezar el código desde 0. 

La principal razón por la que terminé reciclando el código anterior fue porque siento que, como desarrollador, empezar un proyecto desde 0 es tan importante como `saber refactorizar`, es decir, agregar nuevas funcionalidades, elementos o estilos a un proyecto ya hecho. Quise enfrentar la situación de `migrar` el consumo de datos del localStorage a una DB en la nube (MySQL).

## Back-End  

Arranqué por realizar un backend simple ajustado a las necesidades de mi front-end, el cual tiene features como:

1. **Rutas protegidas con JWT**.
2. **Encriptamiento de datos sensibles con bcrypt**.
3. **Enrutamiento, controladores y middlewares con Express.js**.
4. **Manejo de funciones manipuladoras de bases de datos con programación orientada a objetos**.
5. **Conexión a base de datos con Mysql2**.
6. **Envío de emails de validación de usuarios con nodemailer**.
7. **Manejo de respuestas con POO**.
8. **Configuración de CORS para permitir uso compartido de recursos entre orígenes**.

El principal desafío que encontré haciendo el backend fue asegurarme de `proteger todas las aristas` por las cuales la aplicación pueda tener **comportamientos indeseados**, esto lo logré a puro prueba y error.

## Front-End

A lo hecho en la entrega del primer módulo (véase `README.v0.md`), se le agrega:

1. **Rutas protegidas con react-router-dom**.
2. **Custom hooks y contexto para alinear el código al principio DRY**.
3. **Componentes reutilizables como Form o ListaWorkspacePreview**.
4. **Uso de POO para crear objetos de formulario**.
5. **Manejo de código asíncrono**.
6. **Consumo de API**.

## Uso de inteligencia artificial

El desarrollador que diga que nunca usó inteligencia artificial para que lo ayude en su proyecto, miente. Ahora bien, ¿es legítimo hacer uso de ChatGPT siendo un estudiante? **Depende del contexto**, `sí`.  

Sería ilógico pedirle a ChatGPT que haga cosas que **DEBERÍA** saber hacer porque me fueron enseñadas: crear controladores, ingresar, modificar o tomar datos a una DB, hacer clases para crear respuestas o métodos, crear componentes, hooks, contextos, rutas protegidas, hacer lógica de validaciones, y muchas cosas más que aprendí a lo largo de la cursada.  

Ahora bien, dónde sí es lícito es sobre lo que **NO sé hacer** ni me fue enseñado, que fueron solo dos cosas: **animaciones en CSS** y **creación de triggers en la DB**.  

Pienso que ese es el **equilibrio** que me permite utilizar IA sin sentir que pierdo como estudiante: delegarle la responsabilidad, `no de hacer mi código`, sino de enseñarme puntualmente **qué necesito aprender** y **cómo eso se aplica a una situación real** para luego `yo implementarlo` en mi código (*adaptaciones de por medio*). Así reduzco muchísimo el tiempo que, para empezar, gastaría en buscar qué tengo que aprender, es decir, **buscar algo sin saber qué es**.

## Conclusión

Siendo que en marzo de 2024 **no sabía ni centrar un div ni qué era una etiqueta HTML ni mucho menos qué era un string**, no puedo evitar sentirme orgulloso con mi crecimiento. Soy consciente que esto recién empieza, pero confío que la pasión que siento por el desarrollo me va a llevar a buen puerto.  

#### `Ansío tener la oportunidad de demostrar, en un entorno real, de lo que soy capaz.`

---

### Berisso, Buenos Aires.
### 23/12/2024