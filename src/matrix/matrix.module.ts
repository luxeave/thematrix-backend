import { Module } from '@nestjs/common';
import { KnexModule } from 'nestjs-knex';
import { MatrixController } from './matrix.controller';
import { MatrixService } from './matrix.service';

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
  controllers: [MatrixController],
  providers: [MatrixService]
})
export class MatrixModule {}
