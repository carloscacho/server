import { Module } from '@nestjs/common';
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
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly app: any) {
    const config = new DocumentBuilder()
      .setTitle('API CRUD IFMS EVENTOS')
      .setDescription('Documentação da API do IFMS EVENTOS')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
}
