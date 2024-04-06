import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { Model } from 'mongoose';
import { Order } from '../schemas/order.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('OrdersService', () => {
  let service: OrdersService;
  let orderModel: Model<Order>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getModelToken(Order.name),
          useValue: Model,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    orderModel = module.get<Model<Order>>(getModelToken(Order.name));
  });

  it('should defined service and orderModel', () => {
    expect(service).toBeDefined();
    expect(orderModel).toBeDefined();
  });

  describe('Package Price Calculation', () => {
    it('should return correct price', async () => {
      const packages1 = [
        {
          height: 50,
          length: 20,
          width: 10,
          weight: 50,
        },
        {
          height: 10,
          length: 10,
          width: 10,
          weight: 5,
        },
      ];

      const packages2 = [
        {
          height: 50,
          length: 20,
          width: 10,
          weight: 50,
        },
      ];

      const result1 = await service.calculatePrice(packages1 as any);
      const result2 = await service.calculatePrice(packages2 as any);
      expect(result1).toEqual(8.5);
      expect(result2).toEqual(7);
    });
  });

  describe('Order Status Update', () => {
    it('should check CREATED state to only accept PICKED_UP or CANCELLED', async () => {
      const testData = [
        {
          status: 'CREATED',
          expected: false,
        },
        {
          status: 'PICKED_UP',
          expected: true,
        },
        {
          status: 'CANCELLED',
          expected: true,
        },
        {
          status: 'DELIVERED',
          expected: false,
        },
        {
          status: 'RETURNED',
          expected: false,
        },
        {
          status: 'RETURNING',
          expected: false,
        },
      ];

      const mockSavedData = {
        status: 'CREATED',
      };

      testData.forEach(async (ts) => {
        const result = await service.stateMachine(
          mockSavedData.status,
          ts.status,
        );
        expect(result).toEqual(ts.expected);
      });
    });

    it('should check PICKED_UP state to only accept DELIVERED or RETURNING', async () => {
      const testData = [
        {
          status: 'CREATED',
          expected: false,
        },
        {
          status: 'PICKED_UP',
          expected: false,
        },
        {
          status: 'CANCELLED',
          expected: false,
        },
        {
          status: 'DELIVERED',
          expected: true,
        },
        {
          status: 'RETURNED',
          expected: false,
        },
        {
          status: 'RETURNING',
          expected: true,
        },
      ];

      const mockSavedData = {
        status: 'PICKED_UP',
      };

      testData.forEach(async (ts) => {
        const result = await service.stateMachine(
          mockSavedData.status,
          ts.status,
        );
        expect(result).toEqual(ts.expected);
      });
    });

    it('should check CANCELLED state should not be changed', async () => {
      const testData = [
        {
          status: 'CREATED',
          expected: false,
        },
        {
          status: 'PICKED_UP',
          expected: false,
        },
        {
          status: 'CANCELLED',
          expected: false,
        },
        {
          status: 'DELIVERED',
          expected: false,
        },
        {
          status: 'RETURNED',
          expected: false,
        },
        {
          status: 'RETURNING',
          expected: false,
        },
      ];

      const mockSavedData = {
        status: 'CANCELLED',
      };

      testData.forEach(async (ts) => {
        const result = await service.stateMachine(
          mockSavedData.status,
          ts.status,
        );
        expect(result).toEqual(ts.expected);
      });
    });

    it('should check DELIVERED state should not be changed', async () => {
      const testData = [
        {
          status: 'CREATED',
          expected: false,
        },
        {
          status: 'PICKED_UP',
          expected: false,
        },
        {
          status: 'CANCELLED',
          expected: false,
        },
        {
          status: 'DELIVERED',
          expected: false,
        },
        {
          status: 'RETURNED',
          expected: false,
        },
        {
          status: 'RETURNING',
          expected: false,
        },
      ];

      const mockSavedData = {
        status: 'DELIVERED',
      };

      testData.forEach(async (ts) => {
        const result = await service.stateMachine(
          mockSavedData.status,
          ts.status,
        );
        expect(result).toEqual(ts.expected);
      });
    });

    it('should check RETURNING state to only accept RETURNED', async () => {
      const testData = [
        {
          status: 'CREATED',
          expected: false,
        },
        {
          status: 'PICKED_UP',
          expected: false,
        },
        {
          status: 'CANCELLED',
          expected: false,
        },
        {
          status: 'DELIVERED',
          expected: false,
        },
        {
          status: 'RETURNED',
          expected: true,
        },
        {
          status: 'RETURNING',
          expected: false,
        },
      ];

      const mockSavedData = {
        status: 'RETURNING',
      };

      testData.forEach(async (ts) => {
        const result = await service.stateMachine(
          mockSavedData.status,
          ts.status,
        );
        expect(result).toEqual(ts.expected);
      });
    });

    it('should check RETURNED state should not be changed', async () => {
      const testData = [
        {
          status: 'CREATED',
          expected: false,
        },
        {
          status: 'PICKED_UP',
          expected: false,
        },
        {
          status: 'CANCELLED',
          expected: false,
        },
        {
          status: 'DELIVERED',
          expected: false,
        },
        {
          status: 'RETURNED',
          expected: false,
        },
        {
          status: 'RETURNING',
          expected: false,
        },
      ];

      const mockSavedData = {
        status: 'RETURNED',
      };

      testData.forEach(async (ts) => {
        const result = await service.stateMachine(
          mockSavedData.status,
          ts.status,
        );
        expect(result).toEqual(ts.expected);
      });
    });
  });
});
