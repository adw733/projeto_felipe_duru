import { UUID } from "crypto";
import { Pessoa } from "types/pessoas/pessoa";
import { Cotacao } from "./cotacao";
import { Produto } from "types/produtos/produto";
import { Status } from "types/status/status";
import { CotacaoItem } from "./cotacao-item";

export interface CotacaoItemResposta {
  id?: number | null;
  uuid?: UUID;
  status?: Status;
  statusId: number;
  item?: CotacaoItem;
  itemId: number;
  vendedor?: Pessoa;
  vendedorId: number;
  fornecedor?: Pessoa;
  fornecedorId: number;
  largura: number;
  altura: number;
  comprimento: number;
  peso: number;
  ncm: string | null;
  prazoEntrega: number | null;
  garantia: string | null;
  pis: number | null;
  cofins: number | null;
  icms: number | null;
  ipi: number | null;
  iss: number | null;
  valorLiquido: number;
  valorBruto: number;
  desconto: number | null;
  observacoes: string | null;
  dataResposta: Date | null;
  isEscolhida: Boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface CotacaoItemRespostaImposto {
  pis: number | null;
  cofins: number | null;
  icms: number | null;
  ipi: number | null;
  iss: number | null;
}