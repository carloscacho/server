import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EventoService } from './evento.service';
import { EventoDTO } from './dto/evento.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { multerConfig } from '../common/multer.config';

@Controller('evento')
export class EventoController {
  constructor(private readonly eventoService: EventoService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  @Post()
  @UseInterceptors(FileInterceptor('banner', multerConfig))
  create(@Body() data: EventoDTO, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      data.banner = `/uploads/${file.filename}`;
    }
    // Convert stringified numbers back to numbers if coming from FormData
    if (typeof data.ano === 'string') data.ano = parseInt(data.ano);

    return this.eventoService.create(data);
  }

  @Get()
  findAll() {
    return this.eventoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventoService.findById(Number(id));
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.eventoService.findBySlug(slug);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  @Put(':id')
  @UseInterceptors(FileInterceptor('banner', multerConfig))
  update(@Param('id') id: string, @Body() data: EventoDTO, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      data.banner = `/uploads/${file.filename}`;
    }
    // Convert stringified numbers back to numbers if coming from FormData
    if (typeof data.ano === 'string') data.ano = parseInt(data.ano);

    return this.eventoService.update(Number(id), data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.eventoService.delete(Number(id));
  }
}
