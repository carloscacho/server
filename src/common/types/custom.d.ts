import { Usuario } from '@prisma/client'; // Importe o tipo do Prisma, se disponível

declare global {
  namespace Express {
    interface Request {
      user?: {
        id_usuario: number;
        email: string;
        tipo: number;
      };
    }
  }
}
