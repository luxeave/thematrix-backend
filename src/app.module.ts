import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MatrixModule } from './matrix/matrix.module';

@Module({
  imports: [AuthModule, MatrixModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
