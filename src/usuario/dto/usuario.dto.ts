import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsInt,
  IsOptional,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class UsuarioDTO {
  @IsOptional()
  @IsInt()
  id_usuario?: number;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  senha: string;

  @IsOptional()
  @IsInt()
  tipo?: number;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsOptional()
  @IsInt()
  ra?: number;

  @IsOptional()
  @IsString()
  comunidade?: string;

  @IsOptional()
  @IsString()
  instituicao?: string;

  @IsOptional()
  @IsString()
  siape?: string;
}

export class UpdateUsuarioDTO extends PartialType(UsuarioDTO) { }

export class AlterarSenhaDTO {
  @IsNotEmpty()
  @MinLength(6)
  senhaAtual: string;

  @IsNotEmpty()
  @MinLength(6)
  novaSenha: string;
}

export class TesteCpfDTO {
  @IsNotEmpty()
  @IsString()
  cpf: string;
}

export class RegisterAndSubscribeDTO {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsOptional()
  @MinLength(6)
  senha?: string;

  @IsOptional()
  @MinLength(6)
  senhaAtual?: string;

  @IsNotEmpty()
  @IsInt()
  tipo: number;

  @IsOptional()
  @IsInt()
  ra?: number;

  @IsOptional()
  @IsString()
  siape?: string;

  @IsOptional()
  @IsString()
  instituicao?: string;

  @IsNotEmpty()
  @IsInt()
  id_evento: number;
}
