import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AtividadeService } from './atividade.service';
import { AtividadeDTO } from './dto/atividade.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('atividade')
export class AtividadeController {
  constructor(private readonly atividadeService: AtividadeService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
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
    if (id.includes('full'))
      return this.atividadeService.findAllFullInfos();
    return this.atividadeService.findById(Number(id));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  @Put(':id')
  update(@Param('id') id: string, @Body() data: AtividadeDTO) {
    return this.atividadeService.update(Number(id), data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.atividadeService.delete(Number(id));
  }
}
