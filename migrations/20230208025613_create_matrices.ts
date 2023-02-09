import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('matrices', (table) => {
        table.increments('id').primary();
        table.integer('matrix_id').notNullable();
        table.integer('row').notNullable();
        table.integer('col').notNullable();
        table.integer('value').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('matrices');
}

