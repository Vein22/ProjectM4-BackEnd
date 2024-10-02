import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersRepository {
    private users = [
        {id:"number",

        email: "string",

        name: "string",

        password: "string",

        address: "string",

        phone: "string",

        country: "string" ,

        city: "string"
        }
    ];

    async getAllUsers() {
        return this.users;
    }
}
