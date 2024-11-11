import express, { Request, Response, NextFunction } from 'express';
import { createOrder, getOrderById, updateOrder, deleteOrder, getOrders } from './controllers/orderController';

const app = express();
const PORT = 3000;

// Middlewares básicos
app.use(express.json());

// Log simple de requests
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Definimos un tipo para nuestros manejadores
type RequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void> | void;

// Rutas con tipos correctos
app.post('/orders', createOrder as RequestHandler);
app.get('/orders', getOrders as RequestHandler);
app.get('/orders/:id', getOrderById as RequestHandler);
app.put('/orders/:id', updateOrder as RequestHandler);
app.delete('/orders/:id', deleteOrder as RequestHandler);

// Manejo de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({ message: 'Error interno del servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
}); 