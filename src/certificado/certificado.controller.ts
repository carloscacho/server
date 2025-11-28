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
import { CertificadoService } from './certificado.service';
import { CertificadoDTO } from './dto/certificado.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('certificado')
export class CertificadoController {
  constructor(private readonly certificadoService: CertificadoService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  @Post()
  create(@Body() data: CertificadoDTO) {
    return this.certificadoService.create(data);
  }

  @Get()
  findAll() {
    return this.certificadoService.findAll();
  }

  @Get(':fk_participante')
  findOne(@Param('fk_participante') fk_participante: string) {
    return this.certificadoService.findById(Number(fk_participante));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  @Put(':fk_participante')
  update(
    @Param('fk_participante') fk_participante: string,
    @Body() data: CertificadoDTO,
  ) {
    return this.certificadoService.update(Number(fk_participante), data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  @Delete(':fk_participante')
  delete(@Param('fk_participante') fk_participante: string) {
    return this.certificadoService.delete(Number(fk_participante));
  }
}
