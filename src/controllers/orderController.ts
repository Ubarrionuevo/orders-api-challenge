import { Request, Response } from 'express';
import { Order, OrderStatus } from '../types/order';
import { v4 as uuidv4 } from 'uuid';

let orders: Order[] = [];

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { customer_name, item, quantity, status } = req.body;
        const newOrder: Order = {
            id: uuidv4(),
            customer_name,
            item,
            quantity,
            status: status || 'pending',
            created_at: new Date()
        };
        orders.push(newOrder);
        return res.status(201).json(newOrder);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating order' });
    }
};

export const getOrders = async (_req: Request, res: Response) => {
    try {
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ message: 'Error getting orders' });
    }
};

export const getOrderById = async (req: Request, res: Response) => {
    try {
        const order = orders.find(o => o.id === req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({ message: 'Error getting order' });
    }
};

export const updateOrder = async (req: Request, res: Response) => {
    try {
        const orderIndex = orders.findIndex(o => o.id === req.params.id);
        if (orderIndex === -1) {
            return res.status(404).json({ message: 'Order not found' });
        }
        orders[orderIndex] = { ...orders[orderIndex], ...req.body };
        return res.status(200).json(orders[orderIndex]);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating order' });
    }
};

export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const orderIndex = orders.findIndex(o => o.id === req.params.id);
        if (orderIndex === -1) {
            return res.status(404).json({ message: 'Order not found' });
        }
        orders = orders.filter(o => o.id !== req.params.id);
        return res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting order' });
    }
}; 