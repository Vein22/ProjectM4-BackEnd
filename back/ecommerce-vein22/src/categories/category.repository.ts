import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async seedCategories(categories: Partial<{ name: string }[]>): Promise<any> {
    const existingCategories = await this.getCategories();
    const names = existingCategories.map((cat) => cat.name.toLowerCase());
    const newCategories = categories.filter((cat) => !names.includes(cat.name.toLowerCase()));
    if (newCategories.length > 0) {
      await this.categoryRepository.save(newCategories);
      return 'Categories seeded successfully';
    }
      return `There's not new Categories to seed`;
  }

  async deleteCategoryById(id: string): Promise<{id:string}> {
    await this.categoryRepository.delete(id);
     return { id };
  }
}