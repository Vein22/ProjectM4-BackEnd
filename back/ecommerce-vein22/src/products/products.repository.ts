import { Injectable } from "@nestjs/common/decorators";

@Injectable()
export class ProductsRepository {
    private products = [
        {
            id:"number",

            name: "string",

            description: "string",

            price: "number",

            stock: "boolean",

            imgUrl: "string"
        }
    ];

    async getAllProducts() {
        return this.products;
    }
}