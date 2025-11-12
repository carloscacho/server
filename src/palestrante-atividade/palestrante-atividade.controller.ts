import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { PalestranteAtividadeService } from './palestrante-atividade.service';
import { PalestranteAtividadeDTO } from './dto/palestrante-atividade.dto';

@Controller('palestrante-atividade')
export class PalestranteAtividadeController {
  constructor(private readonly service: PalestranteAtividadeService) {}

  @Post()
  create(@Body() data: PalestranteAtividadeDTO) {
    return this.service.create(data);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':fk_palestrante/:fk_atividade')
  findOne(
    @Param('fk_palestrante') fk_palestrante: string,
    @Param('fk_atividade') fk_atividade: string,
  ) {
    return this.service.findById(Number(fk_palestrante), Number(fk_atividade));
  }

  @Delete(':fk_palestrante/:fk_atividade')
  delete(
    @Param('fk_palestrante') fk_palestrante: string,
    @Param('fk_atividade') fk_atividade: string,
  ) {
    return this.service.delete(Number(fk_palestrante), Number(fk_atividade));
  }
}
