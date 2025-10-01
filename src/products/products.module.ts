import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, PRODUCT_SERVICE } from 'src/config';

@Module({
  imports: [ClientsModule.register([
      {
        name: PRODUCT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.productsMicroserviceHost || 'localhost',
          port: envs.productsMicroservicePort || 3001
        }
      }
    ])
  ],
  controllers: [ProductsController],
  providers: []
})
export class ProductsModule { }
