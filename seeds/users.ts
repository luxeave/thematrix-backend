import * as dotenv from 'dotenv'
import { Knex } from 'knex'

dotenv.config()

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    await knex("users").del();

    const username = process.env.USERNAME
    const password = process.env.PASSWORD

    return knex('users').insert([
        {username, password},
    ])
}
