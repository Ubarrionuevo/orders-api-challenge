import { Request, Response } from 'express';
import { Order, OrderStatus } from '../types/order';
import { v4 as uuidv4 } from 'uuid';

// Base de datos en memoria
const orders: Order[] = [];

// Validación básica de campos requeridos
const validateOrderData = (data: any) => {
    const errors = [];
    if (!data.customer_name) errors.push('customer_name es requerido');
    if (!data.item) errors.push('item es requerido');
    if (!data.quantity || data.quantity < 1) errors.push('quantity debe ser mayor a 0');
    return errors;
};

// Crear orden
export const createOrder = (req: Request, res: Response) => {
    try {
        // Validar datos
        const errors = validateOrderData(req.body);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const newOrder: Order = {
            id: uuidv4(),
            customer_name: req.body.customer_name,
            item: req.body.item,
            quantity: req.body.quantity,
            status: 'pending',
            created_at: new Date()
        };

        orders.push(newOrder);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la orden' });
    }
};

// Obtener orden por ID
export const getOrderById = (req: Request, res: Response) => {
    try {
        const order = orders.find(o => o.id === req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la orden' });
    }
};

// Actualizar orden
export const updateOrder = (req: Request, res: Response) => {
    try {
        const index = orders.findIndex(o => o.id === req.params.id);
        if (index === -1) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        // Validar status si se proporciona
        if (req.body.status && !['pending', 'completed', 'cancelled'].includes(req.body.status)) {
            return res.status(400).json({ message: 'Status no válido' });
        }

        orders[index] = {
            ...orders[index],
            ...req.body,
            id: orders[index].id, // Mantenemos el ID original
            created_at: orders[index].created_at // Mantenemos la fecha original
        };

        res.json(orders[index]);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la orden' });
    }
};

// Eliminar orden
export const deleteOrder = (req: Request, res: Response) => {
    try {
        const index = orders.findIndex(o => o.id === req.params.id);
        if (index === -1) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        orders.splice(index, 1);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la orden' });
    }
};

// Listar órdenes
export const getOrders = (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.page_size) || 10;
        const status = req.query.status as OrderStatus;

        let result = [...orders];

        // Filtrar por status si se proporciona
        if (status) {
            result = result.filter(order => order.status === status);
        }

        // Paginación simple
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedOrders = result.slice(start, end);

        res.json({
            data: paginatedOrders,
            total: result.length,
            page,
            page_size: limit
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las órdenes' });
    }
}; 