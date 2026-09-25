import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { EventoParticipanteService } from './evento-participante.service';
import { EventoParticipanteDTO } from './dto/evento-participante.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(1)
@Controller('evento-participante')
export class EventoParticipanteController {
  constructor(private readonly service: EventoParticipanteService) {}

  @Post()
  create(@Body() data: EventoParticipanteDTO) {
    return this.service.create(data);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':fk_evento/:fk_participante')
  findOne(
    @Param('fk_evento') fk_evento: string,
    @Param('fk_participante') fk_participante: string,
  ) {
    return this.service.findById(Number(fk_evento), Number(fk_participante));
  }

  @Delete(':fk_evento/:fk_participante')
  delete(
    @Param('fk_evento') fk_evento: string,
    @Param('fk_participante') fk_participante: string,
  ) {
    return this.service.delete(Number(fk_evento), Number(fk_participante));
  }
}
