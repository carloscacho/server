import { Injectable, Inject } from '@nestjs/common';
import { IUseCase } from '../../../@core/application/use-case';
import { 
  IEventoRepository, 
  EVENTO_REPOSITORY 
} from '../../domain/repositories/evento.repository.interface';

export interface CreateEventoInput {
  nome: string;
  data_inicio: string;
  data_fim: string;
  ano: number;
  slug?: string;
  banner?: string;
  cor_primaria?: string;
  cor_secundaria?: string;
  base_url?: string;
}

export interface CreateEventoOutput {
  id: number;
  nome: string;
  slug: string | null;
}

@Injectable()
export class CreateEventoUseCase 
  implements IUseCase<CreateEventoInput, CreateEventoOutput> 
{
  constructor(
    @Inject(EVENTO_REPOSITORY)
    private readonly eventoRepository: IEventoRepository,
  ) {}

  async execute(input: CreateEventoInput): Promise<CreateEventoOutput> {
    const created = await this.eventoRepository.create({
      nome: input.nome,
      inicio: new Date(input.data_inicio),
      final: new Date(input.data_fim),
      ano: input.ano,
      slug: input.slug,
      banner: input.banner,
      cor_primaria: input.cor_primaria,
      cor_secundaria: input.cor_secundaria,
      base_url: input.base_url,
    });

    return {
      id: created.id,
      nome: created.nome,
      slug: created.slug,
    };
  }
}
