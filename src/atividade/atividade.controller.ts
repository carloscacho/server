import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AtividadeService } from './atividade.service';
import { AtividadeDTO } from './dto/atividade.dto';

@Controller('atividade')
export class AtividadeController {
  constructor(private readonly atividadeService: AtividadeService) {}

  @Post()
  create(@Body() data: AtividadeDTO) {
    return this.atividadeService.create(data);
  }

  @Get()
  findAll() {
    return this.atividadeService.findAll();
  }

  @Get("/full/:id_evento")
  findAllFullInfosById(@Param('id_evento') id_evento: string) {
    return this.atividadeService.findAllFullInfosById(Number(id_evento));
  }

  @Get("/full")
  findAllFullInfos() {
    console.log("entrei na rota full")
    return this.atividadeService.findAllFullInfos();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log("entrei na rota id")
    if(id.includes('full'))
      return this.atividadeService.findAllFullInfos();
    return this.atividadeService.findById(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: AtividadeDTO) {
    return this.atividadeService.update(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.atividadeService.delete(Number(id));
  }
}
