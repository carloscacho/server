import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TurnoService } from './turno.service';
import { TurnoDTO } from './dto/turno.dto';

@Controller('turno')
export class TurnoController {
  constructor(private readonly turnoService: TurnoService) {}

  @Post()
  create(@Body() data: TurnoDTO) {
    return this.turnoService.create(data);
  }

  @Get()
  findAll() {
    return this.turnoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.turnoService.findById(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: TurnoDTO) {
    return this.turnoService.update(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.turnoService.delete(Number(id));
  }
}