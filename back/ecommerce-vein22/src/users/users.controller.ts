import { Controller, Get, Post, Put, Delete, HttpCode, HttpStatus, Patch, Param, Body, NotFoundException, Query, UseGuards, ParseUUIDPipe } from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";
import { RolesGuard } from "../auth/guard/roles.guard";
import { AuthGuard } from "../auth/guard/auth.guard";
import { Role } from "../auth/roles/roles.enum";
import { Roles } from "../decorators/roles.decorator";
import { IsUUID } from "class-validator";


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @HttpCode(200)
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @Get()
    async getUsers(@Query('page') page: number=1, @Query('limit') limit: number=5) {
        return this.usersService.getUsers(page, limit);
    }

    @HttpCode(200)
    @UseGuards(AuthGuard)
    @Get(":id")
    async getUserById(@Param("id", new ParseUUIDPipe()) id: string) {
      if(!IsUUID(4, {each: true})) throw new Error('Invalid UUID');
        return await this.usersService.getUserById(id);
    }

    @HttpCode(200)
    @UseGuards(AuthGuard)
    @Put(":id")
    async updateUserById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto){
        return this.usersService.updateUserById(id, updateUserDto);
  }

    @HttpCode(200)
    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteUserById(@Param('id') id: string) {
    return this.usersService.deleteUserById(id);
  }
}