import { UUID } from "crypto";
import { Anexo } from "../../types/anexos/anexo";

export interface Produto {
  id?: number;
  uuid?: UUID;
  statusId: number;
  tipoId: number;
  empresaId: number | null;
  unidadeMedidaId: number | null;
  produto: string | null;
  marca: string | null;
  modelo: string | null;
  fabricante: string | null;
  partNumber: string | null;
  ncm: string | null;
  observacoes: string | null;
  caracteristicas: string | null;
  custoUltimaCompra: number | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  anexo?: Anexo;
  produtoFormatado?: string;
  produtosGrupositens: Array<any>;
}
