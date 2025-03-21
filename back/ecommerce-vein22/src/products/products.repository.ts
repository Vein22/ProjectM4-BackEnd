import { Injectable } from "@nestjs/common/decorators";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Repository } from 'typeorm';
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";


@Injectable()
export class ProductsRepository {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
      ) {}

      async getProducts(page: number, limit: number): Promise<Product[]> {
        return await this.productRepository.find({
            take: limit,
            skip: (page - 1) * limit,
          });
        }

        async getProductsById(id: string): Promise<Product>{
         return await this.productRepository.findOneBy({id});    
        }

        async seedProducts(products: Partial<Product[]>): Promise<string> {
            const existingProducts = await this.productRepository.find();
            const names = existingProducts.map((prod) => prod.name.toLowerCase());
            const newProducts = products.filter((prod) => !names.includes(prod.name.toLowerCase()));
            if(newProducts.length > 0) {
                await this.productRepository.save(newProducts, { reload: true });
                return 'Products seeded successfully'
            }
            return `There's not new Products to load`;
        }

        async updateProductImage(createProductDto: CreateProductDto): Promise<Product> {
            const newProduct = this.productRepository.create(createProductDto);
            return await this.productRepository.save(newProduct);
        }
             
        async updateProductById(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
            await this.productRepository.update(id, updateProductDto);
            return this.getProductsById(id);
        }

        async deleteProductById(id: string): Promise<{id:string}> {
            await this.productRepository.delete(id);
            return { id };
        }
}