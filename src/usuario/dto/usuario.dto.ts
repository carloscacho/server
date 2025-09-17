import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsInt,
  IsOptional,
} from 'class-validator';

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
}

export class AlterarSenhaDTO {
  @IsNotEmpty()
  @MinLength(6)
  senha: string;

  @IsNotEmpty()
  @MinLength(6)
  confsenha: string;
}

export class TesteCpfDTO {
  @IsNotEmpty()
  @IsString()
  cpf: string;
}
