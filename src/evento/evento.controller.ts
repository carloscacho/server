import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { EventoService } from './evento.service';
import { EventoDTO } from './dto/evento.dto';

@Controller('evento')
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @Post()
  create(@Body() data: EventoDTO) {
    return this.eventoService.create(data);
  }

  @Get()
  findAll() {
    return this.eventoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventoService.findById(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: EventoDTO) {
    return this.eventoService.update(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.eventoService.delete(Number(id));
  }
}