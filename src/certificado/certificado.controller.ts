import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CertificadoService } from './certificado.service';
import { CertificadoDTO } from './dto/certificado.dto';

@Controller('certificado')
export class CertificadoController {
  constructor(private readonly certificadoService: CertificadoService) {}

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

  @Put(':fk_participante')
  update(
    @Param('fk_participante') fk_participante: string,
    @Body() data: CertificadoDTO,
  ) {
    return this.certificadoService.update(Number(fk_participante), data);
  }

  @Delete(':fk_participante')
  delete(@Param('fk_participante') fk_participante: string) {
    return this.certificadoService.delete(Number(fk_participante));
  }
}
