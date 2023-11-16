import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1700098330998 implements MigrationInterface {
  name = 'Migrations1700098330998';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recipes" DROP CONSTRAINT "FK_5be5ead33de507b1086b8e5678b"`,
    );
    await queryRunner.query(
      `CREATE TABLE "recipe_category" ("recipes_id" integer NOT NULL, "category_id" integer NOT NULL, CONSTRAINT "PK_d60541239216f6468b39c254026" PRIMARY KEY ("recipes_id", "category_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_05ba82ca098a72b9256651bd81" ON "recipe_category" ("recipes_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9f683b1e651da3285cba27aa68" ON "recipe_category" ("category_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "recipes" DROP CONSTRAINT "REL_5be5ead33de507b1086b8e5678"`,
    );
    await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "category_id"`);
    await queryRunner.query(
      `ALTER TABLE "recipe_category" ADD CONSTRAINT "FK_05ba82ca098a72b9256651bd818" FOREIGN KEY ("recipes_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_category" ADD CONSTRAINT "FK_9f683b1e651da3285cba27aa687" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recipe_category" DROP CONSTRAINT "FK_9f683b1e651da3285cba27aa687"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_category" DROP CONSTRAINT "FK_05ba82ca098a72b9256651bd818"`,
    );
    await queryRunner.query(`ALTER TABLE "recipes" ADD "category_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "recipes" ADD CONSTRAINT "REL_5be5ead33de507b1086b8e5678" UNIQUE ("category_id")`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9f683b1e651da3285cba27aa68"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_05ba82ca098a72b9256651bd81"`,
    );
    await queryRunner.query(`DROP TABLE "recipe_category"`);
    await queryRunner.query(
      `ALTER TABLE "recipes" ADD CONSTRAINT "FK_5be5ead33de507b1086b8e5678b" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
