import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: envs.productsMicroserviceHost || 'localhost',
          port: envs.ordersMicroservicePort || 3002
        }
      }
    ])
  ],
  controllers: [OrdersController],
})
export class OrdersModule { }
