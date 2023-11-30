import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { IngredientEntity } from '../domains/entities/ingredient.entity';

@Injectable()
export class IngredientRepository extends Repository<IngredientEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(IngredientEntity, dataSource.createEntityManager());
  }

  async getManyByIds(ids: number[]): Promise<IngredientEntity[]> {
    const query = this.createQueryBuilder('ingredient').where(
      'id IN (:...ids)',
      { ids: ids },
    );
    return query.getMany();
  }
}
