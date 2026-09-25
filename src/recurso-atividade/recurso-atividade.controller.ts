import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { RecursoAtividadeService } from './recurso-atividade.service';
import { RecursoAtividadeDTO } from './dto/recurso-atividade.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('recurso-atividade')
export class RecursoAtividadeController {
  constructor(private readonly service: RecursoAtividadeService) {}

  // Apenas Admin (Role 1, 4) - Criar (Upload)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1, 4)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  uploadRecurso(@UploadedFile() file: Express.Multer.File, @Body() data: RecursoAtividadeDTO) {
    if (file) {
      data.url_arquivo = `/uploads/${file.filename}`;
      // Inferir formato pela extensão (opcional)
      if (!data.formato) data.formato = extname(file.originalname).substring(1).toUpperCase();
    }
    return this.service.create(data);
  }

  // Apenas Admin - Criar (Link)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1, 4)
  @Post('link')
  criarLink(@Body() data: RecursoAtividadeDTO) {
    return this.service.create(data);
  }

  // Apenas Admin - Listar todos da atividade (para o painel de edição)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1, 4)
  @Get('admin/:id_atividade')
  findByAtividadeAdmin(@Param('id_atividade', ParseIntPipe) id: number) {
    return this.service.findByAtividadeAdmin(id);
  }

  // Participante Logado - Listar recursos da atividade (Valida se tá inscrito)
  @UseGuards(JwtAuthGuard)
  @Get('participante/:id_atividade')
  findByAtividadeParticipante(
    @Param('id_atividade', ParseIntPipe) id: number,
    @Req() req: any,
  ) {
    return this.service.findByAtividadeParticipante(id, req.user.id_usuario);
  }

  // Apenas Admin - Deletar
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1, 4)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
