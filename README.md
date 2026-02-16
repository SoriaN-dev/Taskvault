# TaskVault - Sistema de Gestión de Tareas

> Un proyecto full-stack completo para gestionar tareas de forma segura con autenticación JWT. 

## Descripción del Proyecto

**TaskVault** es una aplicación que permite a los usuarios:
- Registrarse e iniciar sesión de forma segura con autenticación JWT
- Crear, leer, actualizar y eliminar tareas personales
- Gestionar múltiples tareas con estados personalizados
- Interfaz moderna y responsive con React

![Login Page](./docs/images/demo.png)

### Características Principales

#### Backend
- API REST segura con autenticación JWT
- Autenticación y Autorización con Spring Security
- Base de datos PostgreSQL con JPA/Hibernate
- Arquitectura limpia (Controllers → Services → Repositories)
- DTOs y validaciones de datos
- Gestión de excepciones centralizada
- Documentación API con Swagger/OpenAPI
- Variables de entorno para configuración segura

#### Frontend
- React 19 con Vite
- React Router para navegación
- Axios para comunicación con API
- Tailwind CSS para estilos modernos
- Rutas protegidas (PrivateRoute)
- Local Storage para persistencia de token

---

## Stack Tecnológico

### Backend
```
Java 21 → Spring Boot 3.5.6 → Spring Security + JWT
         ↓
PostgreSQL (DB) + JPA/Hibernate + Flyway + Maven
```

### Frontend
```
React 19 → Vite → React Router v7 → Axios → Tailwind CSS v4
```

---

## Instalación y Configuración

### Requisitos Previos

```bash
# Backend
- JDK 21+
- Maven 3.9+
- PostgreSQL 12+

# Frontend  
- Node.js 18+ (npm o yarn)
```

### Paso 1: Configurar la Base de Datos PostgreSQL

```sql
-- En pgAdmin o terminal psql:
CREATE DATABASE taskvault_db;

-- Las tablas se crearán automáticamente con Flyway durante el primer arranque
```

> **Nota:** Se utiliza **Flyway** para gestionar las migraciones de base de datos. Los scripts SQL se encuentran en `src/main/resources/db/migration/`

### Paso 2: Configurar Variables de Entorno

1. Copia el archivo de ejemplo:
```bash
cd taskvault-api
cp .env.example .env
```

2. Edita `.env` con tus valores:
```env
DB_URL=jdbc:postgresql://localhost:5432/taskvault_db
DB_USERNAME=postgres
DB_PASSWORD=tu_contraseña_aquí

JWT_SECRET=2XZCFnmx0gac6Obn7LVsXtxpT36eCKJBGEbXg3luFuN2
JWT_EXPIRATION=3600000

SERVER_PORT=8081
FRONTEND_URL=http://localhost:5173
```


### Paso 3: Ejecutar el Backend

```bash
cd taskvault-api

# Compilar el proyecto
mvn clean compile

# Ejecutar
mvn spring-boot:run

# El servidor estará en: http://localhost:8081/taskApi/v1.1
# Swagger UI:          http://localhost:8081/taskApi/v1.1/swagger-ui.html
```

### Paso 4: Ejecutar el Frontend

```bash
cd taskvault-web

# Instalar dependencias
npm install

# Desarrollo con hot reload
npm run dev

# La app estará en: http://localhost:5173

---

## Capturas de Pantalla

### Login
![Login Page](./docs/images/login.png)

### Registro
![Register Page](./docs/images/register.png)

### Panel de Tareas
![Tasks Dashboard](./docs/images/tasks.png)

### Swagger API
![Swagger UI](./docs/images/swagger.png)

### Diagrama de Base de Datos
![Database ERD](./docs/images/database-erd.png)

---

## Estructura del Proyecto

### Backend: `taskvault-api/`

```
src/main/java/com/example/SpringJwt/
├── SpringJwtApplication.java          # App principal
├── config/
│   └── OpenApiConfig.java            # Configuración Swagger
├── controller/
│   ├── AuthenticationController.java   # Login & Registro
│   ├── TaskController.java            # CRUD Tareas
│   └── MainController.java
├── model/
│   ├── Users.java                     # Entidad Usuario
│   ├── Task.java                      # Entidad Tarea
│   ├── CustomUserDetails.java
│   ├── Role.java                      # Roles
│   └── enums/
│       ├── RoleName.java   (USER, ADMIN)
│       └── TaskStatus.java (PENDING, IN_PROGRESS, DONE)
├── service/
│   ├── IUserService.java             # Interface Usuarios
│   ├── UserServiceImpl.java
│   ├── ITaskService.java             # Interface Tareas
│   ├── TaskServiceImpl.java
│   └── CustomUserDetailsService.java
├── repository/
│   ├── IUserRepository.java
│   ├── ITaskRepository.java
│   └── IRoleRepository.java
├── security/
│   ├── JwtUtil.java                  # JWT Utilities
│   ├── AuthTokenFilter.java          # Filtro JWT
│   ├── AuthEntryPointJwt.java
│   └── WebSecurityConfig.java        # Configuración Seguridad
└── dto/
    ├── TaskDTO.java
    └── UserDTO.java                # Data Transfer Object

```

### Frontend: `taskvault-web/`

```
src/
├── main.jsx                    # Entry Point
├── App.jsx                     # Rutas Principales
├── PrivateRoute.jsx            # Protección de Rutas
├── pages/
    ├── HomePage.jsx          # Página Login
│   ├── LoginPage.jsx          # Página Login
│   ├── RegisterPage.jsx       # Página Registro
│   └── TasksPage.jsx          # Panel de Tareas
├── components/
│   ├── LoginForm.jsx          # Formulario Login
│   ├── RegisterForm.jsx       # Formulario Registro  
│   ├── TaskComponent.jsx      # Componente Tarea
│   └── TasksAccordion.jsx     # Acordeón Tareas
└── api/
    ├── axios.js               # Cliente HTTP
    ├── auth.js                # Endpoints Autenticación
    └── task.js                # Endpoints Tareas
```

---

## Endpoints de la API

### Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/auth/register` | Registrar nuevo usuario |
| `POST` | `/auth/login` | Iniciar sesión |

**Ejemplo Register:**
```bash
POST /taskApi/v1.1/auth/register
Content-Type: application/json

{
  "username": "juan@example.com",
  "password": "password123"
}
```

**Respuesta:**
```json
{
  "message": "User registered successfully"
}
```

**Ejemplo Login:**
```bash
POST /taskApi/v1.1/auth/login
Content-Type: application/json

{
  "username": "juan@example.com",
  "password": "password123"
}
```

**Respuesta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer"
}
```

### Tareas (requieren autenticación)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/tasks/all` | Obtener todas tus tareas |
| `POST` | `/tasks` | Crear nueva tarea |
| `PUT` | `/tasks/{id}` | Actualizar tarea |
| `DELETE` | `/tasks/{id}` | Eliminar tarea |

**Headers requeridos:**
```
Authorization: Bearer {tu_token_aqui}
Content-Type: application/json
```

**Ejemplo crear tarea:**
```bash
POST /taskApi/v1.1/tasks
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "title": "Completar proyecto",
  "description": "Terminar la aplicación TaskVault",
  "status": "PENDING"
}
```

---

## Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DB_URL` | URL de conexión PostgreSQL | `jdbc:postgresql://localhost:5432/taskvault_db` |
| `DB_USERNAME` | Usuario PostgreSQL | `postgres` |
| `DB_PASSWORD` | Contraseña PostgreSQL | `admin` |
| `JWT_SECRET` | Clave Secreta JWT (mínimo 32 caracteres) | `2XZCFnmx0gac6Obn7...` |
| `JWT_EXPIRATION` | Expiración Token en milisegundos | `3600000` (1 hora) |
| `SERVER_PORT` | Puerto del Servidor | `8081` |
| `SERVER_CONTEXT_PATH` | Ruta Base de la API | `/taskApi/v1.1` |
| `FRONTEND_URL` | URL del Frontend (CORS) | `http://localhost:5173` |

---


## Mejoras Futuras

- [ ] Agregar más validaciones y manejo de errores
- [ ] Implementar paginación en listado de tareas
- [ ] Agregar filtros (estado, fecha, prioridad)
- [ ] Autenticación con Google/GitHub
- [ ] Notificaciones por email
- [ ] Tests unitarios y de integración completos
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Caché con Redis
- [ ] Rate limiting

---


## Autor

**Nelson** - Desarrollador Full Stack

- LinkedIn: [tu-linkedin](https://www.linkedin.com/in/nelson-soria-9a801a3a6/)
- GitHub: [tu-github](https://github.com/SoriaN-dev)

---

