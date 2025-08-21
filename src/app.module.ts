import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalaService } from './sala/sala.service';
import { SalaController } from './sala/sala.controller';
import { SalaModule } from './sala/sala.module';
import { TurmaModule } from './turma/turma.module';

@Module({
  imports: [SalaModule, TurmaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
