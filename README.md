
# Sistema de Gestión de Órdenes

## Descripción
Sistema de gestión de órdenes desarrollado con TypeScript y Express, que permite crear, consultar, actualizar y eliminar pedidos de manera eficiente y tipada.

## Tecnologías
- TypeScript 5.0.0
- Express 4.18.2
- Jest (Testing)
- UUID
- ts-node
- nodemon

## Requisitos Previos
- Node.js (v14 o superior)
- npm (v6 o superior)

## Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar en modo desarrollo:
```bash
npm run dev
```

4. Ejecutar tests:
```bash
npm test
```

## Estructura del Proyecto
```
src/
├── types/          # Definiciones de tipos
│   └── order.ts    # Tipos para órdenes
├── controllers/    # Controladores de la API
│   └── orderController.ts
├── __tests__/     # Tests automatizados
│   └── order.test.ts
└── index.ts       # Punto de entrada
```

## API Endpoints

### Crear Orden
```http
POST /orders
Content-Type: application/json

{
    "customer_name": "Juan Pérez",
    "item": "Laptop",
    "quantity": 1,
    "status": "pending"
}
```

### Obtener Órdenes
```http
GET /orders         # Listar todas las órdenes
GET /orders/:id    # Obtener una orden específica
```

### Actualizar Orden
```http
PUT /orders/:id
Content-Type: application/json

{
    "status": "completed"
}
```

### Eliminar Orden
```http
DELETE /orders/:id
```

## Testing
El proyecto incluye tests exhaustivos que cubren:
- Creación de órdenes
- Consulta de órdenes
- Actualización de estados
- Eliminación de registros
- Manejo de errores
- Validaciones

Para ejecutar los tests:
```bash
# Ejecutar tests una vez
npm test

# Ejecutar tests en modo watch
npm run test:watch
```

## Scripts Disponibles
```json
{
  "start": "ts-node src/index.ts",
  "dev": "nodemon --exec ts-node src/index.ts",
  "test": "jest",
  "test:watch": "jest --watchAll"
}
```

## Tipos de Datos

### Order
```typescript
type OrderStatus = 'pending' | 'completed' | 'cancelled';

interface Order {
    id: string;
    customer_name: string;
    item: string;
    quantity: number;
    status: OrderStatus;
    created_at: Date;
}
```

## Postman Collection
Se incluye una colección de Postman (`Order_Management_API.postman_collection.json`) con todos los endpoints configurados para pruebas.

Para usar la colección:
1. Abrir Postman
2. Importar el archivo `Order_Management_API.postman_collection.json`
3. Los endpoints estarán listos para usar

## Características
- ✅ API REST completa
- ✅ Tipado estático con TypeScript
- ✅ Tests automatizados
- ✅ Validaciones de datos
- ✅ Documentación completa
- ✅ Colección de Postman
- ✅ Hot reload en desarrollo

## Mantenimiento
- El código está completamente tipado
- Los tests cubren la funcionalidad principal
- La documentación se mantiene actualizada
- Se siguen las mejores prácticas de desarrollo

## Contribuir
1. Fork el repositorio
2. Crear una rama para la feature (`git checkout -b feature/AmazingFeature`)
3. Commit los cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## Contacto
Tu Nombre - [@tutwitter](https://twitter.com/tutwitter)
Link del proyecto: [https://github.com/tuusuario/orders-api](https://github.com/tuusuario/orders-api)

# Orders API Challenge

