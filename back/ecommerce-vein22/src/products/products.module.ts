import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsRepository } from "./products.repository";
import { ProductsService } from "./products.service";
import { TypeOrmModule } from "@nestjs/typeorm"
import { Product } from "./entities/product.entity";
import { CategoryRepository } from "src/categories/category.repository";
import { Category } from "src/categories/entities/category.entity";
import { CategoriesModule } from "src/categories/category.module";


@Module({
    imports: [TypeOrmModule.forFeature([Product]), CategoriesModule],
    providers: [ProductsService, ProductsRepository],
    controllers: [ProductsController],
    exports: [ProductsService, ProductsRepository],
})
export class ProductsModule {}