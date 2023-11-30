import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1701318953082 implements MigrationInterface {
  name = 'Migrations1701318953082';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "recipes" ADD "uploader_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "recipes" ADD CONSTRAINT "FK_df9c12582d565107fdd89164bbf" FOREIGN KEY ("uploader_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recipes" DROP CONSTRAINT "FK_df9c12582d565107fdd89164bbf"`,
    );
    await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "uploader_id"`);
  }
}
