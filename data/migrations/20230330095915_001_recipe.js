/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  const all = knex.schema
    .createTable("recipe", (tlb) => {
      tlb.increments("tarif_id");
      tlb.string("tarif_adi").notNullable().unique();
      tlb.timestamp("kayit_tarihi").defaultTo(knex.fn.now());
    })
    .createTable("steps", (tlb) => {
      tlb.increments("adim_id");
      tlb.integer("adim_sirasi").unsigned().notNullable();
      tlb.string("adim_talimati").notNullable();
      tlb
        .integer("tarif_id")
        .unsigned()
        .notNullable()
        .references("tarif_id")
        .inTable("recipe");
    })
    .createTable("icindekiler", (tlb) => {
      tlb.increments("icindekiler_id");
      tlb.string("icindekiler_adi").notNullable();
      tlb.float("miktar").notNullable();
    })
    .createTable("içindeki_adimlar", (tlb) => {
      tlb.increments("içindeki_adimlar_id");
      tlb
        .integer("icindekiler_id")
        .references("icindekiler_id")
        .inTable("icindekiler");
      tlb.integer("adim_id").references("adim_id").inTable("steps");
    });
  return all;
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("içindeki_adimlar")
    .dropTableIfExists("icindekiler")
    .dropTableIfExists("steps")
    .dropTableIfExists("recipe");
};
