import { UUID } from "crypto";
import { Pessoa } from "types/pessoas/pessoa";
import { CotacaoItem } from "./cotacao-item";
import { CotacaoResposta } from "./cotacao-resposta";

export interface Cotacao {
    id?: number;
    uuid?: UUID;
    statusId: number;
    tipoId: number;        
    prioridadeId?: number;          
    empresa?: Pessoa;      
    empresaId: number;         
    comprador?: Pessoa;      
    compradorId?: number;         
    solicitante?: Pessoa;      
    solicitanteId: number;
    aprovador?: Pessoa;      
    aprovadorId?: number;
    nome: string | null;   
    data: Date;
    enderecoEntrega?: string;
    enderecoCobranca?: string;
    centroCusto?: string;
    valorTotal?: number;
    regioes?: any;
    dataEncaminhada?: Date;
    emailEnviado?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;

    quantidadeRespostas?: number;

    cotacoesItens?: Array<CotacaoItem>;
    cotacoesRespostas?: Array<CotacaoResposta>;
  }
  