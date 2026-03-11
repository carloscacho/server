import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RequestPasswordResetDto {
    @IsNotEmpty()
    @IsString()
    cpfOrEmail: string;

    @IsNotEmpty()
    @IsString()
    resetUrlPrefix: string;
}

export class ResetPasswordDto {
    @IsNotEmpty()
    @IsString()
    token: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    newPassword: string;
}
