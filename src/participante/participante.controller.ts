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
import { ParticipanteService } from './participante.service';
import { ParticipanteDTO } from './dto/participante.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(1)
@Controller('participante')
export class ParticipanteController {
  constructor(private readonly participanteService: ParticipanteService) {}

  @Post()
  create(@Body() data: ParticipanteDTO) {
    return this.participanteService.create(data);
  }

  @Get()
  findAll() {
    return this.participanteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.participanteService.findById(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: ParticipanteDTO) {
    return this.participanteService.update(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.participanteService.delete(Number(id));
  }
}
