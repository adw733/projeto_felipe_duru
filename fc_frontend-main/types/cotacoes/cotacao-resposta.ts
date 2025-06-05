import { UUID } from "crypto";
import { Pessoa } from "types/pessoas/pessoa";
import { Cotacao } from "./cotacao";
import { Produto } from "types/produtos/produto";
import { TipoItem } from "types/tipos/tipo-item";
import { CotacaoRespostaParcela } from "./cotacao-resposta-parcela";

export interface CotacaoResposta {
    id?: number | null;
    uuid?: UUID;        
    cotacoes?: Cotacao;    
    cotacaoId: number;          
    vendedor?: Pessoa;    
    vendedorId: number;          
    fornecedor?: Pessoa;    
    fornecedorId: number;      
    formaPagamento?: TipoItem;    
    formaPagamentoId: number | null;   
    frete?: TipoItem;    
    freteId: number | null;
    valorFrete: number;
    numeroParcelas: number | null;
    prazo0: number;
    prazoN: number;
    observacoes?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    cotacoesRespostasParcelas?: CotacaoRespostaParcela[]
  }
  