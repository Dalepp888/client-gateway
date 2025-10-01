import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {

  constructor() { }

  @Post()
  createProduct() {
    return 'Product created';
  }

  @Get()
  findAllProducts() {
    return 'List of products';
  }

  @Get(':id')
  findProductById(@Param('id') id: string) {
    return `Product details for ID: ${id}`;
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
