import { IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class DataAtividadeParticipanteDTO {
  @IsNumber()
  fk_data_atividade: number;

  @IsNumber()
  fk_participante: number;

  @IsOptional()
  @IsBoolean() // or IsNumber if it's 0/1 in DB but DTO usually handles JSON types. Prisma `Int? @db.TinyInt` suggests 0/1. Let's stick to what the frontend sends. If frontend sends boolean, IsBoolean. If number, IsNumber. Let's assume Number for TinyInt.
  presenca?: number; // Changed to number to match TinyInt
}
