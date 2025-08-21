import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CertificadoDTO } from './dto/certificado.dto';

@Injectable()
export class CertificadoService {
  constructor(private prisma: PrismaService) {}

  async create(data: CertificadoDTO) {
    return this.prisma.certificado.create({ data });
  }

  async findAll() {
    return this.prisma.certificado.findMany();
  }

  async findById(fk_participante: number) {
    return this.prisma.certificado.findUnique({ where: { fk_participante } });
  }

  async update(fk_participante: number, data: CertificadoDTO) {
    return this.prisma.certificado.update({ where: { fk_participante }, data });
  }

  async delete(fk_participante: number) {
    return this.prisma.certificado.delete({ where: { fk_participante } });
  }
}