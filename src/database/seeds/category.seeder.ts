import type { DataSource } from 'typeorm';
import type { Seeder } from 'typeorm-extension';
import { CategoryEntity } from '../../modules/categories/domains/entities/category.entity';

export default class CategorySeeder implements Seeder {
  public async run(dataSource: DataSource) {
    const categoryRepository = dataSource.getRepository(CategoryEntity);
    await categoryRepository.insert([
      {
        name: 'Healthy',
      },
      {
        name: 'Fastfood',
      },
      {
        name: 'Vegeterian',
      },
      {
        name: 'Dessert',
      },
      {
        name: 'Side-dish',
      },
      {
        name: 'Baked-goods',
      },
    ]);
  }
}
