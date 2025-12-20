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
import { PalestranteService } from './palestrante.service';
import { PalestranteDTO } from './dto/palestrante.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('palestrante')
export class PalestranteController {
  constructor(private readonly palestranteService: PalestranteService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  @Post()
  create(@Body() data: PalestranteDTO) {
    return this.palestranteService.create(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  @Post('batch')
  createBatch(@Body() data: { palestrantes: PalestranteDTO[], fk_evento: number }) {
    return this.palestranteService.createBatch(data.palestrantes, data.fk_evento);
  }

  @Get()
  findAll() {
    return this.palestranteService.findAll();
  }

  // This must come BEFORE :id to avoid routing conflict
  @Get('full/:id_evento')
  findByEventoId(@Param('id_evento') id_evento: string) {
    return this.palestranteService.findByEventoId(Number(id_evento));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.palestranteService.findById(Number(id));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  @Put(':id')
  update(@Param('id') id: string, @Body() data: PalestranteDTO) {
    return this.palestranteService.update(Number(id), data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.palestranteService.delete(Number(id));
  }
}
