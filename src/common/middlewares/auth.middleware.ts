import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware para verificar se o usuário está autenticado.
 * Ele não verifica o tipo de usuário, apenas a presença de um token JWT válido
 * que foi processado pelo JwtStrategy.
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // O `req.user` é preenchido pelo `JwtStrategy` após a validação do token JWT.
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException(
        'Acesso negado. É necessário estar autenticado.',
      );
    }

    next();
  }
}
