import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { DataAtividadeService } from './data-atividade.service';
import { DataAtividadeDTO } from './dto/data-atividade.dto';

@Controller('data-atividade')
export class DataAtividadeController {
  constructor(private readonly dataAtividadeService: DataAtividadeService) {}

  @Post()
  create(@Body() data: DataAtividadeDTO) {
    return this.dataAtividadeService.create(data);
  }

  @Get()
  findAll() {
    return this.dataAtividadeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dataAtividadeService.findById(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: DataAtividadeDTO) {
    return this.dataAtividadeService.update(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.dataAtividadeService.delete(Number(id));
  }
}
