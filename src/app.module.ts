import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalaModule } from './sala/sala.module';
import { TurmaModule } from './turma/turma.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ParticipanteModule } from './participante/participante.module';
import { AtividadeModule } from './atividade/atividade.module';
import { DataAtividadeModule } from './data-atividade/data-atividade.module';
import { DataAtividadeParticipanteModule } from './data-atividade-participante/data-atividade-participante.module';
import { EventoModule } from './evento/evento.module';
import { CertificadoModule } from './certificado/certificado.module';
import { EventoParticipanteModule } from './evento-participante/evento-participante.module';
import { PalestranteModule } from './palestrante/palestrante.module';
import { PalestranteAtividadeModule } from './palestrante-atividade/palestrante-atividade.module';
import { TurnoModule } from './turno/turno.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SalaModule,
    TurmaModule,
    UsuarioModule,
    ParticipanteModule,
    AtividadeModule,
    DataAtividadeModule,
    DataAtividadeParticipanteModule,
    EventoModule,
    CertificadoModule,
    EventoParticipanteModule,
    PalestranteModule,
    PalestranteAtividadeModule,
    TurnoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
