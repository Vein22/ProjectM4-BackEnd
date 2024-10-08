import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./entities/product.entity";
import { ProductsRepository } from "./products.repository";

@Injectable()
export class ProductsService {
    constructor(private productsRepository: ProductsRepository){}
    
    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        return await this.productsRepository.createProduct(createProductDto);
    }

    async getProducts(page: number, limit: number): Promise<Product[]> {
    return await this.productsRepository.getProducts(page, limit);
    }

    async getProductsById(id: string): Promise<Product> {
    return await this.productsRepository.getProductsById(id);
    }

    async updateProductById(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productsRepository.updateProductById(id, updateProductDto);
    }

    async deleteProductById(id: string): Promise<{id:string}>  {
    return this.productsRepository.deleteProductById(id);
    }
}