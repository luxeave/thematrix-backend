import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class AuthService {
    constructor(
        @InjectKnex() private readonly knex: Knex,
      ) {}

    async validateLogin(loginDto: LoginDto): Promise<any> {

        const user = await this.knex('users').select('*').where({username: loginDto.username}).first();

        if (typeof user === 'undefined') {
            return {
                "statusCode": 400,
                "message": "No user found with this username",
            };
        }

        if (loginDto.username === user.username && loginDto.password === user.password) {
            return {
                "statusCode": 200,
                "message": "Authentication successful",
            };
        }

        return {
            "statusCode": 400,
            "message": "Unauthorized",
        };
    }
}
