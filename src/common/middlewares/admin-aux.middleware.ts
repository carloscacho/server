import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AdminAuxMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const user = req.user as { tipo: number }; // O `req.user` é preenchido pelo `JwtStrategy`

    if (!user) {
      throw new UnauthorizedException('Usuário não autenticado');
    }

    if (user.tipo !== 1 && user.tipo !== 3) {
      throw new ForbiddenException(
        
        'Acesso permitido apenas para administradores e auxiliares',
      );
    }

    next();
  }
}
