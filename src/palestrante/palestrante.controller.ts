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

  @Get()
  findAll() {
    return this.palestranteService.findAll();
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

  @Get('full/:id')
  findByEventoId(@Param('id') id: string) {
    return this.palestranteService.findByEventoId(Number(id));
  }
}
