import { Controller, Post, Body, Get, HttpCode, UseGuards, Delete, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist/decorators';
import { CategoriesService } from './category.service';
import { Category } from './entities/category.entity';
import { categoriesData } from './categories'
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiTags('Categories')
  @HttpCode(200)
  @Get()
  async getCategories(){
      return await this.categoriesService.getCategories();
  }

  @ApiTags('Categories')
  @Post('seeder')
  async seedCategories(): Promise<string> {
    return this.categoriesService.seedCategories(categoriesData);
  }

  @ApiTags('Categories')
  @ApiBearerAuth()
  @UseGuards(AuthGuard) 
  @Delete(':id')
  async deleteCategoryById(@Param('id') id: string) {
    return await this.categoriesService.deleteCategoryById(id);
  }
}
