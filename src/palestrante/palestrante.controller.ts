import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
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
  @Roles(1, 4)
  @Post()
  create(@Body() data: PalestranteDTO, @Req() req: any) {
    const userId = req.user.id_usuario;
    const userRole = req.user.tipo;
    return this.palestranteService.create(data, userId, userRole);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1, 4)
  @Post('batch')
  createBatch(@Body() data: { palestrantes: PalestranteDTO[], fk_evento: number }, @Req() req: any) {
    const userId = req.user.id_usuario;
    const userRole = req.user.tipo;
    return this.palestranteService.createBatch(data.palestrantes, data.fk_evento, userId, userRole);
  }

  @Get()
  findAll() {
    return this.palestranteService.findAll();
  }

  // This must come BEFORE :id to avoid routing conflict
  @Get('full/:id_evento')
  findByEventoId(@Param('id_evento') id_evento: string) {
    return this.palestranteService.findByEventoId(Number(id_evento));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.palestranteService.findById(Number(id));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1, 4)
  @Put(':id')
  update(@Param('id') id: string, @Body() data: PalestranteDTO, @Req() req: any) {
    const userId = req.user.id_usuario;
    const userRole = req.user.tipo;
    return this.palestranteService.update(Number(id), data, userId, userRole);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1, 4)
  @Delete(':id')
  delete(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id_usuario;
    const userRole = req.user.tipo;
    return this.palestranteService.delete(Number(id), userId, userRole);
  }
}
