# SpringJwt - API de Gestión de Tareas con Autenticación JWT

## Descripción

SpringJwt es una aplicación de ejemplo desarrollada con Spring Boot que demuestra la implementación de una API REST para la gestión de usuarios y tareas, con autenticación y autorización basada en tokens JWT (JSON Web Tokens). Este proyecto sirve como portafolio para mostrar conocimientos en desarrollo backend con Java, Spring Framework, seguridad y persistencia de datos.

La aplicación permite a los usuarios registrarse, autenticarse y gestionar tareas personales, con roles de usuario para controlar permisos.

## Características

- **Autenticación JWT**: Implementación completa de login y registro con tokens JWT para sesiones seguras.
- **Gestión de Usuarios**: CRUD básico de usuarios con roles (USER, ADMIN).
- **Gestión de Tareas**: Crear, leer, actualizar y eliminar tareas asociadas a usuarios.
- **Seguridad**: Configuración de Spring Security con filtros personalizados y manejo de excepciones.
- **Persistencia**: Uso de JPA/Hibernate con base de datos H2 (en memoria para desarrollo).
- **Validación**: Validaciones de entrada con Bean Validation.
- **Documentación API**: Endpoints REST documentados (puedes agregar Swagger si lo deseas).

## Tecnologías Utilizadas

- **Java 17**
- **Spring Boot 3.3.0**
- **Spring Security**
- **Spring Data JPA**
- **JWT (io.jsonwebtoken)**
- **H2 Database** (para desarrollo)
- **Maven** (gestión de dependencias)
- **Lombok** (para reducir boilerplate code)

## Requisitos Previos

- JDK 17 o superior instalado.
- Maven 3.6+ instalado.
- IDE como IntelliJ IDEA, Eclipse o VS Code con extensiones para Java.

## Instalación y Ejecución

1. **Clona el repositorio**:
   ```
   git clone https://github.com/tu-usuario/springjwt.git
   cd springjwt
   ```

2. **Compila el proyecto**:
   ```
   mvn clean compile
   ```

3. **Ejecuta la aplicación**:
   ```
   mvn spring-boot:run
   ```
   La aplicación se ejecutará en `http://localhost:8080`.

4. **Accede a la base de datos H2** (opcional, para desarrollo):
   - URL: `http://localhost:8080/h2-console`
   - JDBC URL: `jdbc:h2:mem:testdb`
   - Usuario: `sa`
   - Contraseña: (vacía)

## Uso

### Endpoints Principales

#### Autenticación
- `POST /api/auth/signup`: Registro de nuevo usuario.
  - Body: `{"username": "string", "email": "string", "password": "string"}`
- `POST /api/auth/signin`: Login.
  - Body: `{"username": "string", "password": "string"}`
  - Respuesta: Token JWT.

#### Usuarios (requiere autenticación)
- `GET /api/users`: Lista todos los usuarios (ADMIN).
- `GET /api/users/{id}`: Obtiene usuario por ID.
- `PUT /api/users/{id}`: Actualiza usuario.
- `DELETE /api/users/{id}`: Elimina usuario.

#### Tareas (requiere autenticación)
- `GET /api/tasks`: Lista tareas del usuario autenticado.
- `POST /api/tasks`: Crea nueva tarea.
  - Body: `{"title": "string", "description": "string", "status": "PENDING|IN_PROGRESS|COMPLETED"}`
- `GET /api/tasks/{id}`: Obtiene tarea por ID.
- `PUT /api/tasks/{id}`: Actualiza tarea.
- `DELETE /api/tasks/{id}`: Elimina tarea.

Usa herramientas como Postman o curl para probar los endpoints. Incluye el token JWT en el header `Authorization: Bearer <token>` para rutas protegidas.

## Estructura del Proyecto

```
src/
├── main/
│   ├── java/com/example/SpringJwt/
│   │   ├── controller/     # Controladores REST
│   │   ├── dto/            # Objetos de Transferencia de Datos
│   │   ├── model/          # Entidades JPA
│   │   ├── repository/     # Interfaces de repositorio
│   │   ├── security/       # Configuración de seguridad y JWT
│   │   └── service/        # Lógica de negocio
│   └── resources/
│       └── application.properties  # Configuración
└── test/                  # Pruebas unitarias
```

## Mejoras Futuras

- Agregar pruebas unitarias e integración completas.
- Implementar paginación en endpoints de lista.
- Agregar logging avanzado.
- Integrar con base de datos externa (PostgreSQL, MySQL).
- Agregar documentación con Swagger/OpenAPI.
