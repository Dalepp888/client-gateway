import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { first, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PRODUCT_SERVICE } from 'src/config/services';

@Controller('products')
export class ProductsController {

  constructor(@Inject(PRODUCT_SERVICE) private readonly productClient: ClientProxy) { }

  @Post()
  createProduct() {
    return 'Product created';
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productClient.send({ cmd: 'getProducts' }, paginationDto);
  }

  @Get(':id')
  async findProductById(@Param() id: string) {
    try {

      return await firstValueFrom(
        this.productClient.send({ cmd: 'getProductOne' }, id)
      );

    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return `Product with ID: ${id} deleted`;
  }

  @Patch(':id')
  updateProduct(@Body() body: any, @Param('id') id: string) {
    return `Product with ID: ${id} updated`;
  }
}
