import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1700096728183 implements MigrationInterface {
  name = 'Migrations1700096728183';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ingredients" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "image" character varying, "description" character varying, CONSTRAINT "UQ_a955029b22ff66ae9fef2e161f8" UNIQUE ("name"), CONSTRAINT "PK_9240185c8a5507251c9f15e0649" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "recipes" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "time" integer NOT NULL, "calorie" integer, "description" character varying(300) NOT NULL, "images" text NOT NULL, "spices" text NOT NULL, "guide" jsonb NOT NULL DEFAULT '{}', "category_id" integer, "uploader_id" integer, CONSTRAINT "REL_5be5ead33de507b1086b8e5678" UNIQUE ("category_id"), CONSTRAINT "REL_df9c12582d565107fdd89164bb" UNIQUE ("uploader_id"), CONSTRAINT "PK_8f09680a51bf3669c1598a21682" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "rating" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "point" integer NOT NULL, "user_id" integer, "recipe_id" integer, CONSTRAINT "REL_17618c8d69b7e2e287bf9f8fbb" UNIQUE ("user_id"), CONSTRAINT "REL_d67769406a2b88686672834e61" UNIQUE ("recipe_id"), CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "bookmarked_recipes" ("users_id" integer NOT NULL, "recipes_id" integer NOT NULL, CONSTRAINT "PK_425c321fec2e0f96f857655d18a" PRIMARY KEY ("users_id", "recipes_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_deec055d8f8a9f214940a5b7ed" ON "bookmarked_recipes" ("users_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fbae1f0d9f14fa19c6fd22f0bc" ON "bookmarked_recipes" ("recipes_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "recipe_ingredient" ("recipes_id" integer NOT NULL, "ingredients_id" integer NOT NULL, CONSTRAINT "PK_4113b7e9fddca757bdc0f24201f" PRIMARY KEY ("recipes_id", "ingredients_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4f99903f9a79c047d8c6bf33b3" ON "recipe_ingredient" ("recipes_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d74744600ffe9120b793a73d0b" ON "recipe_ingredient" ("ingredients_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "recipes" ADD CONSTRAINT "FK_5be5ead33de507b1086b8e5678b" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipes" ADD CONSTRAINT "FK_df9c12582d565107fdd89164bbf" FOREIGN KEY ("uploader_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "rating" ADD CONSTRAINT "FK_17618c8d69b7e2e287bf9f8fbb3" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "rating" ADD CONSTRAINT "FK_d67769406a2b88686672834e611" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarked_recipes" ADD CONSTRAINT "FK_deec055d8f8a9f214940a5b7ed7" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarked_recipes" ADD CONSTRAINT "FK_fbae1f0d9f14fa19c6fd22f0bc1" FOREIGN KEY ("recipes_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "FK_4f99903f9a79c047d8c6bf33b38" FOREIGN KEY ("recipes_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "FK_d74744600ffe9120b793a73d0bb" FOREIGN KEY ("ingredients_id") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recipe_ingredient" DROP CONSTRAINT "FK_d74744600ffe9120b793a73d0bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_ingredient" DROP CONSTRAINT "FK_4f99903f9a79c047d8c6bf33b38"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarked_recipes" DROP CONSTRAINT "FK_fbae1f0d9f14fa19c6fd22f0bc1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarked_recipes" DROP CONSTRAINT "FK_deec055d8f8a9f214940a5b7ed7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rating" DROP CONSTRAINT "FK_d67769406a2b88686672834e611"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rating" DROP CONSTRAINT "FK_17618c8d69b7e2e287bf9f8fbb3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipes" DROP CONSTRAINT "FK_df9c12582d565107fdd89164bbf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipes" DROP CONSTRAINT "FK_5be5ead33de507b1086b8e5678b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d74744600ffe9120b793a73d0b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4f99903f9a79c047d8c6bf33b3"`,
    );
    await queryRunner.query(`DROP TABLE "recipe_ingredient"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fbae1f0d9f14fa19c6fd22f0bc"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_deec055d8f8a9f214940a5b7ed"`,
    );
    await queryRunner.query(`DROP TABLE "bookmarked_recipes"`);
    await queryRunner.query(`DROP TABLE "rating"`);
    await queryRunner.query(`DROP TABLE "recipes"`);
    await queryRunner.query(`DROP TABLE "ingredients"`);
    await queryRunner.query(`DROP TABLE "category"`);
  }
}
