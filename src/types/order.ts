// Tipos básicos para nuestra aplicación
export type OrderStatus = 'pending' | 'completed' | 'cancelled';

export interface Order {
    id: string;
    customer_name: string;
    item: string;
    quantity: number;
    status: OrderStatus;
    created_at: Date;
} 