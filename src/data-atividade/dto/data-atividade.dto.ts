import { IsString, IsOptional, IsNumber, IsDateString, IsNotEmpty } from 'class-validator';

export class DataAtividadeDTO {
  @IsOptional()
  @IsNumber()
  id_data_atividade?: number;

  @IsNotEmpty()
  @IsDateString()
  data: Date;

  @IsNotEmpty()
  @IsDateString() // Or IsString if it's a time string, but usually Date in Prisma implies DateTime object or string ISO. Let's use IsDateString for safety or IsString if it's just time. Prisma `DateTime @db.Time(0)` usually maps to Date object in JS but might come as string from JSON.
  hora: Date;

  @IsOptional()
  @IsDateString()
  duracao?: Date;

  @IsOptional()
  @IsDateString()
  intervalo?: Date;

  @IsNotEmpty()
  @IsNumber()
  fk_atividade: number;

  @IsOptional()
  @IsString()
  senha?: string;

  @IsOptional()
  @IsString()
  qrcode?: string;
}
