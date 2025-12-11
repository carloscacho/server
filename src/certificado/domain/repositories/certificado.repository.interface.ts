import { Certificado, CertificadoProps } from '../entities/certificado.entity';

export interface ICertificadoRepository {
    findById(fk_participante: number): Promise<Certificado | null>;
    findAll(): Promise<Certificado[]>;
    create(data: CertificadoProps): Promise<Certificado>;
    update(fk_participante: number, nome: string): Promise<Certificado>;
    delete(fk_participante: number): Promise<void>;
}

export const CERTIFICADO_REPOSITORY = Symbol('CERTIFICADO_REPOSITORY');
