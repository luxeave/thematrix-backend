import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { KnexModule } from 'nestjs-knex';

@Module({
  imports: [
    KnexModule.forRootAsync({
        useFactory: () => ({
        config: {
            client: "sqlite3",
            useNullAsDefault: true,
            connection: './dev.sqlite3',
        },
        }),
    }),
    ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
