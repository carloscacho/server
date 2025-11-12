import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TurmaService } from './turma.service';
import { TurmaDTO } from './dto/turma.dto';

@Controller('turma')
export class TurmaController {
  constructor(private readonly turmaService: TurmaService) {}

  @Post()
  create(@Body() data: TurmaDTO) {
    return this.turmaService.create(data);
  }

  @Get()
  findAll() {
    return this.turmaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.turmaService.findById(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: TurmaDTO) {
    return this.turmaService.update(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.turmaService.delete(Number(id));
  }
}
