import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, first, firstValueFrom, pipe } from 'rxjs';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';
import { PRODUCT_SERVICE } from 'src/config/services';

@Controller('products')
export class ProductsController {

  constructor(@Inject(PRODUCT_SERVICE) private readonly productClient: ClientProxy) { }

  @Post()
  createProduct(@Body() CreateProductDto: CreateProductDto) {
    return this.productClient.send({ cmd: 'createProduct' }, CreateProductDto);
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
  deleteProduct(@Param() id: string) {
    return this.productClient.send({ cmd: 'deleteProduct' }, id)
    .pipe(
      catchError(err => {
        throw new RpcException(err.message);
      })
    );
  }

  @Patch(':id')
  updateProduct(@Body() updateProduct: UpdateProductDto, @Param('id', ParseIntPipe) id: string) {

    return this.productClient.send({ cmd: 'updateProduct' }, {
      id, ...updateProduct
    }).pipe(
      catchError(err => {
        throw new RpcException(err.message);
      })
    );
  }
}
