import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.getCategories();
  }

  async seedCategories(categories: Partial<{ name: string }[]>): Promise<string> {
    return await this.categoryRepository.seedCategories(categories);
  }

  async deleteCategoryById(id: string): Promise<{id:string}>  {
    return this.categoryRepository.deleteCategoryById(id);
    }
}
