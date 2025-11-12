import { Module } from '@nestjs/common';
import { SalaService } from './sala.service';
import { PrismaService } from 'src/database/prisma.service';
import { SalaController } from './sala.controller';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SalaService, PrismaService],
  controllers: [SalaController]
})
export class SalaModule {}
