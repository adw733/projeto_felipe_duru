import { UUID } from 'crypto';
import { CotacoesIten } from '../../cotacoes_itens/entities/cotacoes_iten.entity';
import { Pessoa } from '../../pessoas/entities/pessoa.entity';
import { Status } from '../../status/entities/status.entity';
import { TiposIten } from '../../tipos_itens/entities/tipos_iten.entity';
import { CotacoesResposta } from '../../cotacoes_respostas/entities/cotacoes_resposta.entity';

export class CreateCotacoeDto {
  id: number;
  uuid: UUID;
  status: Status;
  statusId: number;
  tiposIten: TiposIten;
  tipoId: number;
  prioridade: TiposIten;
  prioridadeId: number;
  empresa: Pessoa;
  empresaId: number;
  comprador: Pessoa;
  compradorId: number;
  solicitante: Pessoa;
  solicitanteId: number;
  aprovador: Pessoa;
  aprovadorId: number;
  nome: string;
  data: Date;
  enderecoEntrega: string;
  enderecoCobranca: string;
  centroCusto: string;
  valorTotal: number;
  regioes: any;
  dataEncaminhada: Date;
  emailEnviado: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  quantidadeRespostas?: number;
  cotacoesItens: CotacoesIten[];
  cotacoesRespostas: CotacoesResposta[];
}

export class VendedoresEncaminhar {
  nome: string;
  nomeAlternativo: string;
  vendedorId: number;
  vendedorNome: string;
  vendedorNomeAlternativo: string;
  url: string;
  regiaoId: string;
}
