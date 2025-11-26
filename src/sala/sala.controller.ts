import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { SalaDTO } from './dto/sala.dto';
import { SalaService } from './sala.service';

@Controller('sala')
export class SalaController {
  constructor(private readonly salaService: SalaService) { }

  @Post()
  async create(@Body() data: SalaDTO) {
    return await this.salaService.create(data);
  }

  @Get()
  async findAll() {
    return await this.salaService.findAll();
  }

  @Get(":id")
  async findOne(@Param() params: any) {
    return await this.salaService.findById(Number(params.id))
  }

  @Put(":id")
  async update(@Param("id") id: number, data: SalaDTO) {
    return await this.salaService.update(Number(id), data)
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.salaService.delete(Number(id));
  }
}
