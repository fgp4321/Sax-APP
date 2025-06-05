# En proceso
## Aplicación web desarrollada para el Ayuntamiento de Sax (Alicante) que permite a los ciudadanos realizar diversas gestiones de forma sencilla y accesible. Entre las funcionalidades principales se incluyen:

### Registro de nuevos usuarios.

### Reserva de visitas guiadas al castillo.

### Envío de quejas y sugerencias mediante un sistema de tickets.

### Consulta interactiva de un mapa con la ubicación de los desfibriladores (DEA) del municipio.

## Registro

##### Crear Cuenta
Formulario de registro para ciudadanos, con validación de DNI, correo, teléfono y opción de registrarse con Google.

##### Requisitos 
DNI, Nombre, Apellidos, Correo Electrónico, Contraseña y Numero de teléfono.
También puedes registrarte directamente con Google.

[![register.png](https://i.postimg.cc/G2VMv4LH/register.png)](https://postimg.cc/phQYHXnH)

## Login
##### Iniciar Sesión
Permite a los ciudadanos acceder a la plataforma mediante correo y contraseña o autenticación con Google.

[![login.png](https://i.postimg.cc/CM9tqQ5m/login.png)](https://postimg.cc/fkjB45x9)

## Profile
##### Mi Perfil
Aquí puedes ver tu perfil y toda tu información registrada : Nombre y Apellidos, Correo electrónico, numero de teléfono, DNI, también veras el rol que tienes en la pagina.
También veras 2 Iconos : Ver mis tickets (Podrás ver todos tus tickets creados) y Nuevo Ticket (Puedes crear una nueva incidencia sobre algún problema en pueblo o algo ocurrido)

[![profile.png](https://i.postimg.cc/wMsssvMx/profile.png)](https://postimg.cc/CnSK3wb9)

## Home
##### Pagina de inicio
Página de inicio de la app ciudadana. Presenta acceso rápido a los servicios principales (incidencias, mapa de desfibriladores y reservas al castillo), junto con noticias y novedades del ayuntamiento.

[![home.png](https://i.postimg.cc/y80kHtg5/home.png)](https://postimg.cc/gxkYyMKq)

## Tickets
##### Mis Tickets 
Aquí podrás ver tus tickets creados en las siguientes categorías: 
- Quejas, Incidencias o Sugerencias.

[![tickets.png](https://i.postimg.cc/cLnbhMg0/tickets.png)](https://postimg.cc/mPTj29y5)

## Tickets-Detalles
Muestra la información detallada de un ticket registrado en el sistema del ayuntamiento: Categoría, Subcategoría, Fecha de creación y lugar en el mapa.

[![tickets-detalles.png](https://i.postimg.cc/8zyKHKwF/tickets-detalles.png)](https://postimg.cc/TKDJ2czG)

## Reserva Tu Visita al castillo
Permite a los ciudadanos reservar online su visita guiada al Castillo de Sax, seleccionando fecha, horario y número de asistentes.
Te pedirán los siguientes datos :
- Nombre 
- Apellidos
- Teléfono
- Email

[![reservas-castillo.png](https://i.postimg.cc/0jfFq8Gn/reservas-castillo.png)](https://postimg.cc/N2Kp6vz2)

## Mapa Desfibriladores
Aplicación web que muestra la ubicación de desfibriladores (DEA) en un mapa interactivo. Permite a los usuarios encontrar rápidamente el desfibrilador más cercano en caso de emergencia, así como consultar información adicional sobre cada dispositivo (dirección, accesibilidad, horario, etc.).

[![mapa-desfibriladores.png](https://i.postimg.cc/PJDfbVDY/mapa-desfibriladores.png)](https://postimg.cc/649Nt0Yp)

## Formulario de incidencias
Permite a los ciudadanos reportar incidencias al ayuntamiento indicando categoría, ubicación, descripción y archivos adjuntos.

[![formulario-incidencias.png](https://i.postimg.cc/Yqgfjpvq/formulario-incidencias.png)](https://postimg.cc/ZCbyMzP1)




# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh