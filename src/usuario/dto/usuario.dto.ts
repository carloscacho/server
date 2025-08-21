export class UsuarioDTO {
  id_usuario?: number;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  ra?: number;
  tipo?: number;
  modificado?: Date;
  comunidade?: string;
  instituicao?: string;
}
