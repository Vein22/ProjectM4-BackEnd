🛍️ E-Commerce API con NestJS y TypeORM

Este proyecto es una API RESTful para un e-commerce, desarrollada con NestJS y TypeORM. Incluye funcionalidades como la gestión de productos, categorías y pedidos, con una base de datos relacional.



##Tecnologías Utilizadas

    NestJS (Framework backend en Node.js)
    TypeScript (Tipado estático para JavaScript)
    PostgreSQL (Base de datos relacional)
    TypeORM (ORM para manejar la base de datos)
    JWT (JSON Web Tokens) (Autenticación)
    Cloudinary (Almacenamiento de imágenes)
    Docker (Para desarrollo y despliegue)
    Render (Plataforma de hosting para backend y base de datos)
    Swagger (Documentación y vizualización API REST)



   ##Características

    Gestión de categorías: CRUD de categorías con precarga desde un archivo JSON.
    Gestión de productos: CRUD de productos asociados a categorías.
    Pedidos: Relación entre productos y pedidos con detalles de compra.
    Autenticación: Manejo de usuarios con JWT.
    Validación y saneamiento: Uso de DTOs y Pipes en las peticiones.
    Docker: Configuración con Docker y Docker Compose.



 ##📂 Estructura del Proyecto

      src/
       ├── categories/
       │    ├── category.module.ts
       │    ├── category.controller.ts
       │    ├── category.service.ts
       │    ├── category.repository.ts
       │    ├── entities/category.entity.ts
       ├── config/
       |    ├── cloudinary.ts
       |    ├── data-source.ts
       ├── products/
       │    ├── products.module.ts
       │    ├── products.controller.ts
       │    ├── products.service.ts
       │    ├── products.repository.ts
       │    ├── entities/product.entity.ts
       ├── users/
       ├── orders/
       ├── main.ts



##Instalación y Configuración
1️⃣ Clonar el repositorio

    git clone https://github.com/Vein22/ProjectM4-BackEnd.git
    cd ProjectM4-BackEnd

2️⃣ Instalar dependencias

    npm install

3️⃣ Configurar las variables de entorno

    Copia el archivo .env.example y renómbralo como .env, luego completa las variables:

# ------------ DATABASE CONFIG ------------

    DB_HOST = tu_db_host
    DB_PORT = tu_db_port
    DB_USER = tu_db_user
    DB_PASSWORD = tu_db_password
    DB_NAME = tu_db_name
    CLOUDINARY_CLOUD_NAME = tu_cloudinary_name
    CLOUDINARY_API_SECRET = tu_cloudinary_secret
    CLOUDINARY_API_KEY = tu_cloudinary_key

# ------------ SERVER CONFIG ------------

    PORT = 4000

# ------------ JWT CONFIG ------------

    JWT_SECRET=tu_jwt_secreto

4️⃣ Ejecutar el proyecto
Modo desarrollo

    npm run start:dev

Modo producción

    npm run build
    npm run start:prod

5️⃣ Ejecutar migraciones de la base de datos

    npm run typeorm migration:run



##🧪 Pruebas  
Para ejecutar las pruebas unitarias:  


    npm run test



##📖 Documentación API con Swagger  

Una vez que el servidor esté en ejecución, puedes acceder a la documentación interactiva en:  

    http://localhost:4000/api



##🔥 Seeders (Carga Inicial de Datos)

Para precargar categorías y productos, ejecuta:

    curl -X POST http://localhost:3000/categories/seeder
    curl -X POST http://localhost:3000/products/seeder



##🐳 Uso con Docker
Para ejecutar el proyecto en Docker, usa:

    docker compose up -d



##📌 Endpoints Principales
| Método | Endpoint               | Descripción               |
|--------|------------------------|---------------------------|
| POST   | `/Auth/signup`         | Registro de usuarios      |
| POST   | `/Auth/signin`         | Inicio de sesión          |
| GET    | `/categories`          | Listar categorías         |
| POST   | `/categories/seeder`   | Precargar categorías      |
| GET    | `/products`            | Listar productos          |
| POST   | `/products/seeder`     | Precargar productos       |



##📜 Licencia

    Este proyecto está bajo la MIT License.
