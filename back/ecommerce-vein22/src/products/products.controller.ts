import { Controller, Get, Post, Delete, Put, Param, UseGuards, Body, HttpCode, NotFoundException, Query, ParseUUIDPipe  } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { AuthGuard } from "../auth/guard/auth.guard";
import { CreateProductDto } from "./dto/create-product.dto";
import { Roles } from "../decorators/roles.decorator";
import { Role } from "../auth/roles/roles.enum";
import { RolesGuard } from "../auth/guard/roles.guard";
import { UpdateProductDto } from "./dto/update-product.dto";
import { IsUUID } from "class-validator";



@Controller('products')
export class ProductsController {
    constructor(private readonly productsServices: ProductsService) {}
    

      @HttpCode(201)
      @Post("seeder")
      @UseGuards(AuthGuard) 
      async createProduct(@Body() createProductDto: CreateProductDto) {
          return this.productsServices.createProduct(createProductDto)
      }

      @HttpCode(200)
      @Get()
      async getProducts(@Query('page') page: number=1, @Query('limit') limit: number=5){
        return await this.productsServices.getProducts(page, limit);
      }

      @HttpCode(200)
      @Get(':id')
      async getProductsById(@Param('id', new ParseUUIDPipe()) id: string) {
        if(!IsUUID(4, {each: true})) throw new Error('Invalid UUID');
        return await this.productsServices.getProductsById(id);
      }
   
      @Put(":id")
      @Roles(Role.Admin)
      @UseGuards(AuthGuard, RolesGuard)
      async updateProductById(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productsServices.updateProductById(id, updateProductDto)
      }

      @Delete(':id')
      @UseGuards(AuthGuard) 
      async deleteProductById(@Param('id') id: string) {
        return await this.productsServices.deleteProductById(id);
      }
}