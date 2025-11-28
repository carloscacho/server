import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { SalaDTO } from './dto/sala.dto';
import { SalaService } from './sala.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('sala')
export class SalaController {
  constructor(private readonly salaService: SalaService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  @Put(":id")
  async update(@Param("id") id: number, @Body() data: SalaDTO) {
    return await this.salaService.update(Number(id), data)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.salaService.delete(Number(id));
  }
}
