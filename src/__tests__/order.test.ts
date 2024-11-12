import { Order, OrderStatus } from '../types/order';
import { 
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder
} from '../controllers/orderController';
import { Request, Response } from 'express';

interface ResponseObject extends Partial<Order> {
    message?: string;
    success?: boolean;
}

describe('Order Management System', () => {
    let testOrder: Order;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let responseObject: ResponseObject = {};

    beforeEach(() => {
        // Reiniciar el objeto de respuesta
        responseObject = {};
        
        // Crear una orden de prueba antes de cada test
        testOrder = {
            id: '1',
            customer_name: 'Juan Pérez',
            item: 'Laptop',
            quantity: 1,
            status: 'pending',
            created_at: new Date()
        };

        // Mock de Request y Response
        mockRequest = {
            body: testOrder,
            params: { id: '1' }
        };

        mockResponse = {
            json: jest.fn().mockImplementation((result: ResponseObject) => {
                responseObject = result;
                return mockResponse;
            }),
            status: jest.fn().mockReturnThis()
        };
    });

    describe('createOrder', () => {
        it('debería crear una nueva orden correctamente', async () => {
            await createOrder(
                mockRequest as Request, 
                mockResponse as Response
            );

            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(responseObject).toMatchObject({
                customer_name: 'Juan Pérez',
                item: 'Laptop',
                quantity: 1,
                status: 'pending'
            });
        });
    });

    describe('getOrderById', () => {
        it('debería obtener una orden existente por ID', async () => {
            // Primero creamos una orden
            await createOrder(
                mockRequest as Request, 
                mockResponse as Response
            );

            const createdOrderId = responseObject.id;
            if (!createdOrderId) throw new Error('No se creó el ID de la orden');

            // Luego intentamos obtenerla
            await getOrderById(
                { ...mockRequest, params: { id: createdOrderId } } as Request,
                mockResponse as Response
            );

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(responseObject).toMatchObject({
                customer_name: 'Juan Pérez',
                item: 'Laptop'
            });
        });

        it('debería retornar 404 para un ID inexistente', async () => {
            mockRequest.params = { id: 'id-inexistente' };
            
            await getOrderById(
                mockRequest as Request,
                mockResponse as Response
            );

            expect(mockResponse.status).toHaveBeenCalledWith(404);
        });
    });

    describe('updateOrder', () => {
        it('debería actualizar una orden correctamente', async () => {
            // Primero creamos una orden
            await createOrder(
                mockRequest as Request,
                mockResponse as Response
            );

            const createdOrderId = responseObject.id;
            if (!createdOrderId) throw new Error('No se creó el ID de la orden');

            const updateData = {
                ...testOrder,
                status: 'completed' as OrderStatus
            };

            mockRequest.params = { id: createdOrderId };
            mockRequest.body = updateData;

            await updateOrder(
                mockRequest as Request,
                mockResponse as Response
            );

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(responseObject).toMatchObject({
                status: 'completed'
            });
        });
    });

    describe('deleteOrder', () => {
        it('debería eliminar una orden existente', async () => {
            // Primero creamos una orden
            await createOrder(
                mockRequest as Request,
                mockResponse as Response
            );

            const createdOrderId = responseObject.id;
            if (!createdOrderId) throw new Error('No se creó el ID de la orden');

            mockRequest.params = { id: createdOrderId };

            await deleteOrder(
                mockRequest as Request,
                mockResponse as Response
            );

            expect(mockResponse.status).toHaveBeenCalledWith(200);

            // Verificar que la orden ya no existe
            await getOrderById(
                mockRequest as Request,
                mockResponse as Response
            );
            expect(mockResponse.status).toHaveBeenCalledWith(404);
        });

        it('debería retornar 404 al intentar eliminar una orden inexistente', async () => {
            mockRequest.params = { id: 'id-inexistente' };
            
            await deleteOrder(
                mockRequest as Request,
                mockResponse as Response
            );

            expect(mockResponse.status).toHaveBeenCalledWith(404);
        });
    });
}); 