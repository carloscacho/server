import { Injectable } from '@nestjs/common';
import { SalaDTO } from './dto/sala.dto';
import { PrismaService } from 'src/database/prisma.service';


@Injectable()
export class SalaService {
  constructor(private prisma: PrismaService) { }

  async create(data: SalaDTO) {
    const novaSala = await this.prisma.sala.create({
      data,
    });
    return novaSala;
  }

  async findAll() {
    return await this.prisma.sala.findMany();
  }

  async findById(id_sala: number) {
    return await this.prisma.sala.findFirst({
      where: {
        id_sala: Number(id_sala),
      },
    });
  }

  async update(id: number, sala: SalaDTO) {
    const salaExists = await this.findById(id);

    if (!salaExists) throw new Error('Sala não encontrada');

    return await this.prisma.sala.update({
      data: sala,
      where: {
        id_sala: id,
      },
    });
  }
  async delete(id: number) {
    const salaExists = await this.findById(id);

    if (!salaExists) throw new Error('Sala não encontrada');

    return await this.prisma.sala.delete({
      where: {
        id_sala: id,
      },
    });
  }
}
