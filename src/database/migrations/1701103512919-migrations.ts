import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1701103512919 implements MigrationInterface {
  name = 'Migrations1701103512919';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recipes" ADD "is_draft" boolean NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "is_draft"`);
  }
}
