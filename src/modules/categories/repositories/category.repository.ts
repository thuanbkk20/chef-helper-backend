import { DataSource, Repository } from 'typeorm';
import { CategoryEntity } from '../domains/entities/category.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryRepository extends Repository<CategoryEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CategoryEntity, dataSource.createEntityManager());
  }

  async getManyByIds(ids: number[]): Promise<CategoryEntity[]> {
    const query = this.createQueryBuilder('category').where('id IN (:...ids)', {
      ids: ids,
    });
    return query.getMany();
  }
}
