import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ChangePasswordDto } from "./dto/changePassword.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { UsersRepository } from "./users.repository";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
    constructor(
        private usersRepository: UsersRepository){}
       
    async findByEmail(email: string): Promise<User> {
        return this.usersRepository.findByEmail(email);
      }

      async getUsers(page: number, limit: number): Promise<User[]> {
        return this.usersRepository.getUsers(page, limit);
    }
    
    async getUserById(id: string): Promise<User>  {
        return this.usersRepository.getUserById(id);
    }

    async updateUserById(id: string, updateUserDto: UpdateUserDto) {
        return this.usersRepository.updateUserById(id, updateUserDto);
    }
    
    async deleteUserById(id: string): Promise<{id:string}>  {
        return this.usersRepository.deleteUserById(id);
    }

    async changePassword(id: string, ChangePasswordDto:ChangePasswordDto): Promise<string> {
        const user = await this.usersRepository.findById(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        const isPasswordValid = await bcrypt.compare(ChangePasswordDto.currentPassword, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const hashedNewPassword = await bcrypt.hash(ChangePasswordDto.newPassword, 10);
        await this.usersRepository.updatePassword(id, hashedNewPassword);
        return 'Password changed successfully';
    }
}