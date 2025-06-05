import { UUID } from "crypto";
import { Pessoa } from "types/pessoas/pessoa";
import { Cotacao } from "./cotacao";
import { Produto } from "types/produtos/produto";
import { CotacaoItemResposta } from "./cotacao-item-resposta";

export interface CotacaoItem {
    id?: number | null;
    uuid?: UUID;
    statusId: number;      
    cotacoes?: Cotacao;      
    cotacaoId: number;
    produtos?: Produto;      
    produtoId: number | null;
    finalidadeId: number | null;
    dataNecessidade: Date | null;
    quantidade: number;
    observacoes: string | null;
    respostaId?: number | null;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    cotacoesItensRespostas?: Array<CotacaoItemResposta>
  }
  