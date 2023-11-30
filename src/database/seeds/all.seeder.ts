// read from .env file
import * as dotenv from 'dotenv';
import type { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';
import type { SeederOptions } from 'typeorm-extension';
import { runSeeders } from 'typeorm-extension';

import { SnakeNamingStrategy } from '../../snake-naming.strategy';
import { CategoryEntity } from '../../modules/categories/domains/entities/category.entity';
import CategorySeeder from './category.seeder';

dotenv.config();

async function executeSeeding() {
  const options: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    namingStrategy: new SnakeNamingStrategy(),
    entities: [CategoryEntity],
    seeds: [CategorySeeder],
  };

  const dataSource = new DataSource(options);
  await dataSource.initialize();

  await runSeeders(dataSource);
}

executeSeeding().catch(console.error);
