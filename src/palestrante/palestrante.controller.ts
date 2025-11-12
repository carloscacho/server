import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { PalestranteService } from './palestrante.service';
import { PalestranteDTO } from './dto/palestrante.dto';

@Controller('palestrante')
export class PalestranteController {
  constructor(private readonly palestranteService: PalestranteService) {}

  @Post()
  create(@Body() data: PalestranteDTO) {
    return this.palestranteService.create(data);
  }

  @Get()
  findAll() {
    return this.palestranteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.palestranteService.findById(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: PalestranteDTO) {
    return this.palestranteService.update(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.palestranteService.delete(Number(id));
  }
}
