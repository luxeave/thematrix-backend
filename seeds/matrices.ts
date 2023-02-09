import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("matrices").del();

    // Inserts seed entries
    await knex("matrices").insert([
        { matrix_id: 1, row: 1, col: 1, value: 1 },
        { matrix_id: 1, row: 1, col: 2, value: 4 },
        { matrix_id: 1, row: 1, col: 3, value: 7 },
        { matrix_id: 1, row: 1, col: 4, value: 8 },
        { matrix_id: 1, row: 2, col: 1, value: 10 },
        { matrix_id: 1, row: 2, col: 2, value: 14 },
        { matrix_id: 1, row: 2, col: 3, value: 18 },
        { matrix_id: 1, row: 2, col: 4, value: 20 },
        { matrix_id: 1, row: 3, col: 1, value: 23 },
        { matrix_id: 1, row: 3, col: 2, value: 30 },
        { matrix_id: 1, row: 3, col: 3, value: 32 },
        { matrix_id: 1, row: 3, col: 4, value: 65 }
    ]);
};
