# Trabajo práctico final FRONT-END UTN
Hola! El objetivo de este 'readme' es realizar una explicación textual del desarrollo del trabajo práctico final. Algunas de las explicaciones que voy a desarrollar son:

- Orden de prioridades
- Guía para entender el código
- Ése bug en particular

Decidí seguir la propuesta de mi profesor de hacer el **clon de Slack** porque quise enfrentarme al desafío de desarrollar un proyecto enteramente solo sin recibir ninguna ayuda (como las dadas en el proyecto de Whatsapp que, si bien lo desarrollé también solo, sentía que era un proyecto 'hecho en clase').

El siguiente enlace contiene un **EXCALIDRAW** con el diagrama de flujo de la app: https://excalidraw.com/#json=tPEStCpeVUwTfdWDyTQFO,ytVrNddsZ36J2T44sumR7w

Espero que sea de utilidad.

## Orden de prioridades
Todo artista, ya sea pintor, músico, diseñador, arquitecto, dibujante e incluso nosotros los programadores debemos enfrentarnos al **lienzo en blanco**. Ese momento donde uno tiene que transferir los colores, las formas, las funcionalidades y la estructura del proyecto que tiene en mente a la pantalla en forma de código puede llegar a ser lo más desafiante de todo el proceso, puesto que una vez que se construyen las bases sólidas, el resto fluye.  

El **flujo de desarrollo** lo establecí de la siguiente manera:

    1 Decidir entre *'mobile-first'* o *'desktop-first'* (decanté por *'mobile-first'*)
    2 Realizar un **MOOK_DATA**.
    3 Componentes básicos de la aplicación (lo necesario para visualizar canales y workspace usando el MOOK_DATA).
    4 Algo de CSS símple para visualizar mejor cada parte.
    5 Funcionalidades (en orden):
        - LocalStorage.
        - Ruteo con **REACT-ROUTER-DOM**.
        - Enviar mensajes y, al mismo tiempo, actualizar el localStorage.
        - Desarrollar componentes de workspace.
        - Desarrollar componentes de canales.
        - Componentes de submit: mensajes, crearCanal, crearWorkspace.
        - Componentes de filtro: mensajes, canales, workspaces, texto de mensajes.
        - CSS + Responsive.
        - Easter egg en el responsive en referencia a quien fue mi profesor de front-end. 👀

Luego de establecer el flujo de desarrollo y realizar lo mínimo y necesario, la primera etapa del trabajo se veía así:
![Primer boceto 2](/public/uno.png)

    En este momento ya estaban realizados:
        - **MOOK_DATA**
        - **Screens principales**:
            - Selector de workspace
            - Workspace
        - **Rutas con react-router-dom**
        - **Componentes**

Llegar a este punto fue desafiante porque al ser el mas importante necesitaba crear una estructura sólida donde pueda seguir construyendo. Creo que logré mi objetivo porque de ahí en más todas las funcionalidades posteriores se integraron a la perfección.  

Algo que tuve a mi favor durante todo el desarrollo y que considero que es una de mis **fortalezas** como desarrollador es que veo el hacer código como levantar una pared de ladrillo; uno piensa que alto quiere que tenga, que grosor, que ancho, que ladrillos usar, todo eso se planifica antes pero a la hora de empezar a construir pienso y centro toda mi atención en poner cada ladrillo perféctamente sin dejar que en mi cabeza esté la ansiedad de '¿cuantos faltan?' o '¿quedará bién?'. Ladrillo a ladrillo.

## Guía para entender el código

El código se resume en dos carpetas de componentes: **Screens** y **Components**. Recomiendo tener a mano el excalidraw como acompañamiento visual para comprender mejor el siguiente desarrollo.

### Screen

Acá hay 3 componentes, por lo tanto hay tres **Screen** las cuales son:

    - SelectorWorkspace: La **Screen** principal, lo primero que ve el usuario cuando ingresa a la página.
    - CrearWorkspace: La **Screen** para crear un workspace, con su ruta particular.
    - Workspace: La **Screen** que dentro tiene todos los canales, con sus respectivos mensajes y miembros.

Voy a ir por partes explicando como funciona cada una.

#### SelectorWorkspace

Contiene tres funcionalidades:

    1. Desplegar una lista de WorkspacePreview (2 por defecto) para que el usuario pueda seleccionar e ingresar, y al hacerlo cambia la ruta de '/' a '/workspace/:idWorkspace/:idCanalParams' llevando al usuario al Workspace seleccionado. 
    La idea de ingresar los id como parámetro de ruta es capturarlo con useParams dentro del componente que renderiza esa ruta para, a través del metodo de arrays 'find', traer la información que le corresponde a ese id e inyectarla en los elementos subsiguientes.

    2. Contener el botón que redirecciona la ruta hacia la screen de CrearWorkspace.

    3. Contener un botón que de la opcion al usuario de reiniciar los datos ingresados por este.

#### CrearWorkspace

Contiene un formulario con dos inputs para que el usuario cree un **workspace** y un **canal** con los nombres que quiera pero cumpliendo ciertas condiciones:

1. El nombre del workspace no puede ser idéntico al de alguno existente y debe tener una cantidad de caracteres mínima y máxima.

2. El nombre del canal debe tener una cantidad de caracteres mínima y máxima.

Como detalle de diseño y accesibilidad para el usuario agregué un boton que tiene la figura de signo de pregunta para que pueda ver las condiciones de aceptabilidad de nombre. Cuando una de las condiciones es corregida, dejará de mostrarse como error y pasarán a verse dos, así hasta que se cumplan todas y se cree el workspace nuevo.

#### Workspace

Acá est












# *CONTINUARÁ...*
