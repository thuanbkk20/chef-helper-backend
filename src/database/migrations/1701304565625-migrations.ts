import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1701304565625 implements MigrationInterface {
  name = 'Migrations1701304565625';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "spices"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "recipes" ADD "spices" text NOT NULL`);
  }
}
