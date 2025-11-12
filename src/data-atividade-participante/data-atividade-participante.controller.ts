import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { DataAtividadeParticipanteService } from './data-atividade-participante.service';
import { DataAtividadeParticipanteDTO } from './dto/data-atividade-participante.dto';

@Controller('data-atividade-participante')
export class DataAtividadeParticipanteController {
  constructor(private readonly service: DataAtividadeParticipanteService) {}

  @Post()
  create(@Body() data: DataAtividadeParticipanteDTO) {
    return this.service.create(data);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':fk_data_atividade/:fk_participante')
  findOne(
    @Param('fk_data_atividade') fk_data_atividade: string,
    @Param('fk_participante') fk_participante: string,
  ) {
    return this.service.findById(
      Number(fk_data_atividade),
      Number(fk_participante),
    );
  }

  @Put(':fk_data_atividade/:fk_participante')
  update(
    @Param('fk_data_atividade') fk_data_atividade: string,
    @Param('fk_participante') fk_participante: string,
    @Body() data: DataAtividadeParticipanteDTO,
  ) {
    return this.service.update(
      Number(fk_data_atividade),
      Number(fk_participante),
      data,
    );
  }

  @Delete(':fk_data_atividade/:fk_participante')
  delete(
    @Param('fk_data_atividade') fk_data_atividade: string,
    @Param('fk_participante') fk_participante: string,
  ) {
    return this.service.delete(
      Number(fk_data_atividade),
      Number(fk_participante),
    );
  }
}
