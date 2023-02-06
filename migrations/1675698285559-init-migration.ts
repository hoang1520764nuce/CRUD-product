import { MigrationInterface, QueryRunner } from "typeorm";

export class initMigration1675698285559 implements MigrationInterface {
    name = 'initMigration1675698285559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_detail" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "product_id" integer NOT NULL, "lang" "public"."product_detail_lang_enum" NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "short_description" character varying NOT NULL, "slug" character varying NOT NULL, CONSTRAINT "PK_12ea67a439667df5593ff68fc33" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category_detail" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "category_key" integer NOT NULL, "lang" character varying NOT NULL, "desc" character varying NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, CONSTRAINT "PK_f589a6cda0ea641492d260d81cd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "key" SERIAL NOT NULL, CONSTRAINT "PK_7c82c39b0dc8ef1ba334eb615a3" PRIMARY KEY ("key"))`);
        await queryRunner.query(`CREATE TABLE "product_category" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "product_id" integer NOT NULL, "category_key" integer NOT NULL, CONSTRAINT "PK_0dce9bc93c2d2c399982d04bef1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_attribute_term_detail" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "product_attribute_term_id" integer NOT NULL, "lang" "public"."product_attribute_term_detail_lang_enum" NOT NULL, "value" integer NOT NULL, CONSTRAINT "PK_86fad2d04181da133e3177ed45f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_attribute_detail" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "product_attribute_key" integer NOT NULL, "lang" "public"."product_attribute_detail_lang_enum" NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_cf7a092f1bf3555ac8992b1f828" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_attribute" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "key" SERIAL NOT NULL, "type" "public"."product_attribute_type_enum" NOT NULL, "has_achives" boolean NOT NULL, CONSTRAINT "PK_f5f697c8d27b8d76ac44b49537c" PRIMARY KEY ("key"))`);
        await queryRunner.query(`CREATE TABLE "product_attribute_term" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "product_attribute_key" integer NOT NULL, CONSTRAINT "PK_d5bfc530e50b405b7c42a505f06" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_to_attribute" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "product_variant_id" integer NOT NULL, "product_attribute_term_id" integer NOT NULL, CONSTRAINT "PK_ee336c3e221dc58822376e3b640" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "file" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "key" integer NOT NULL, "url" character varying, "type" "public"."file_type_enum" NOT NULL, "size" integer NOT NULL DEFAULT '0', "uploaderId" integer NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_variant_image" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" SERIAL NOT NULL, "file_id" integer NOT NULL, "product_variant_id" integer NOT NULL, CONSTRAINT "PK_e768b1a1fe30fe0aa9cc54b1a83" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_variant" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "price" integer NOT NULL, "sku" character varying NOT NULL, "quantity" integer NOT NULL, "sale_price" integer NOT NULL, "on_sale" boolean NOT NULL, CONSTRAINT "PK_1ab69c9935c61f7c70791ae0a9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_to_variant" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "product_id" integer NOT NULL, "product_variant_id" integer NOT NULL, CONSTRAINT "PK_68b79965ff636cd8cc5ca3367ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "type" "public"."product_type_enum" NOT NULL, "status" "public"."product_status_enum" NOT NULL, "is_featured" boolean NOT NULL DEFAULT true, "tax_status" "public"."product_tax_status_enum" NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, " user_id " integer NOT NULL, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart_line_item" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "cart_id" integer NOT NULL, "product_id" integer NOT NULL, CONSTRAINT "PK_142f827f57cd93341af6d468387" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_detail" ADD CONSTRAINT "FK_38145409fc923c67bffc76bdb68" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category_detail" ADD CONSTRAINT "FK_df565b4ba3b9112131be9e72b04" FOREIGN KEY ("category_key") REFERENCES "category"("key") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_category" ADD CONSTRAINT "FK_0374879a971928bc3f57eed0a59" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_category" ADD CONSTRAINT "FK_2e71fd8811a34d9feb662748848" FOREIGN KEY ("category_key") REFERENCES "category"("key") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_attribute_term_detail" ADD CONSTRAINT "FK_2cbd193597a04befa272215af40" FOREIGN KEY ("product_attribute_term_id") REFERENCES "product_attribute_term"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_attribute_detail" ADD CONSTRAINT "FK_214b97ee291688ef5865d020c6d" FOREIGN KEY ("product_attribute_key") REFERENCES "product_attribute"("key") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_attribute_term" ADD CONSTRAINT "FK_0571a8bbc62df943770c0f4f537" FOREIGN KEY ("product_attribute_key") REFERENCES "product_attribute"("key") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_to_attribute" ADD CONSTRAINT "FK_890b635dd00695e3bb0f9678d48" FOREIGN KEY ("product_attribute_term_id") REFERENCES "product_attribute_term"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_to_attribute" ADD CONSTRAINT "FK_f47a0e9989644afde4511626e39" FOREIGN KEY ("product_variant_id") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_variant_image" ADD CONSTRAINT "FK_69000ecf433a3a1f776b73fd187" FOREIGN KEY ("product_variant_id") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_variant_image" ADD CONSTRAINT "FK_e819261de98d158cb1e1eb11fd7" FOREIGN KEY ("file_id") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_to_variant" ADD CONSTRAINT "FK_ce02115809ccd28512b96408645" FOREIGN KEY ("product_variant_id") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_to_variant" ADD CONSTRAINT "FK_f8289748e4cd3b046724fc78627" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_line_item" ADD CONSTRAINT "FK_0611fdafd7dd702dcd8f0c79a82" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_line_item" ADD CONSTRAINT "FK_6e11aba6b92fd265d396fcb5022" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_line_item" DROP CONSTRAINT "FK_6e11aba6b92fd265d396fcb5022"`);
        await queryRunner.query(`ALTER TABLE "cart_line_item" DROP CONSTRAINT "FK_0611fdafd7dd702dcd8f0c79a82"`);
        await queryRunner.query(`ALTER TABLE "product_to_variant" DROP CONSTRAINT "FK_f8289748e4cd3b046724fc78627"`);
        await queryRunner.query(`ALTER TABLE "product_to_variant" DROP CONSTRAINT "FK_ce02115809ccd28512b96408645"`);
        await queryRunner.query(`ALTER TABLE "product_variant_image" DROP CONSTRAINT "FK_e819261de98d158cb1e1eb11fd7"`);
        await queryRunner.query(`ALTER TABLE "product_variant_image" DROP CONSTRAINT "FK_69000ecf433a3a1f776b73fd187"`);
        await queryRunner.query(`ALTER TABLE "product_to_attribute" DROP CONSTRAINT "FK_f47a0e9989644afde4511626e39"`);
        await queryRunner.query(`ALTER TABLE "product_to_attribute" DROP CONSTRAINT "FK_890b635dd00695e3bb0f9678d48"`);
        await queryRunner.query(`ALTER TABLE "product_attribute_term" DROP CONSTRAINT "FK_0571a8bbc62df943770c0f4f537"`);
        await queryRunner.query(`ALTER TABLE "product_attribute_detail" DROP CONSTRAINT "FK_214b97ee291688ef5865d020c6d"`);
        await queryRunner.query(`ALTER TABLE "product_attribute_term_detail" DROP CONSTRAINT "FK_2cbd193597a04befa272215af40"`);
        await queryRunner.query(`ALTER TABLE "product_category" DROP CONSTRAINT "FK_2e71fd8811a34d9feb662748848"`);
        await queryRunner.query(`ALTER TABLE "product_category" DROP CONSTRAINT "FK_0374879a971928bc3f57eed0a59"`);
        await queryRunner.query(`ALTER TABLE "category_detail" DROP CONSTRAINT "FK_df565b4ba3b9112131be9e72b04"`);
        await queryRunner.query(`ALTER TABLE "product_detail" DROP CONSTRAINT "FK_38145409fc923c67bffc76bdb68"`);
        await queryRunner.query(`DROP TABLE "cart_line_item"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "product_to_variant"`);
        await queryRunner.query(`DROP TABLE "product_variant"`);
        await queryRunner.query(`DROP TABLE "product_variant_image"`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`DROP TABLE "product_to_attribute"`);
        await queryRunner.query(`DROP TABLE "product_attribute_term"`);
        await queryRunner.query(`DROP TABLE "product_attribute"`);
        await queryRunner.query(`DROP TABLE "product_attribute_detail"`);
        await queryRunner.query(`DROP TABLE "product_attribute_term_detail"`);
        await queryRunner.query(`DROP TABLE "product_category"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "category_detail"`);
        await queryRunner.query(`DROP TABLE "product_detail"`);
    }

}
