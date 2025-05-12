# 🎯 SmartBuy.app

<div align="center">
  <img src="public/logo.png" alt="SmartBuy Logo" width="200"/>
</div>

## 📝 Descripción del Proyecto

SmartBuy.app es una aplicación web moderna diseñada para ayudarte a monitorear y gestionar tus deseos de compra. La plataforma te permite crear una lista de productos que deseas adquirir en el futuro, recibiendo notificaciones sobre disponibilidad de stock y alertas de precios cuando estos bajen, ayudándote a tomar decisiones de compra más inteligentes.

### Objetivos

- Facilitar el seguimiento de productos deseados
- Notificar sobre disponibilidad de stock
- Alertar sobre rebajas y cambios de precios
- Proporcionar una interfaz intuitiva y amigable
- Mantener un registro histórico de precios y disponibilidad

## 🛠️ Tecnologías Utilizadas

### Frontend

- **Next.js 15** - Framework de React para aplicaciones web
- **React 19** - Biblioteca para interfaces de usuario
- **TypeScript** - Superset tipado de JavaScript
- **TailwindCSS** - Framework de utilidades CSS
- **Radix UI** - Componentes de interfaz accesibles
- **Shadcn UI** - Componentes de UI modernos y personalizables

### Backend

- **Next.js API Routes** - API endpoints
- **Drizzle ORM** - ORM para base de datos
- **Neon Database** - Base de datos PostgreSQL serverless

### Autenticación y Seguridad

- **Clerk** - Gestión de autenticación y usuarios
- **Zod** - Validación de esquemas

### Herramientas de Desarrollo

- **ESLint** - Linting de código
- **Prettier** - Formateo de código
- **TypeScript** - Tipado estático

## 🚀 Cómo Levantar el Proyecto

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/tu-usuario/wishwatch.app.git
   cd wishwatch.app
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   # o
   bun install
   ```

3. **Configurar variables de entorno**

   ```bash
   cp .env.example .env.local
   ```

   Edita el archivo `.env.local` con tus credenciales.

4. **Iniciar la base de datos**

   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. **Iniciar el servidor de desarrollo**

   ```bash
   npm run dev
   # o
   yarn dev
   # o
   pnpm dev
   # o
   bun dev
   ```

6. **Abrir en el navegador**
   Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
