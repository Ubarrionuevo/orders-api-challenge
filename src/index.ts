import express from 'express';
import { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } from './controllers/orderController';

const app = express();
app.use(express.json());

// Routes
app.post('/orders', createOrder);
app.get('/orders', getOrders);
app.get('/orders/:id', getOrderById);
app.put('/orders/:id', updateOrder);
app.delete('/orders/:id', deleteOrder);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 