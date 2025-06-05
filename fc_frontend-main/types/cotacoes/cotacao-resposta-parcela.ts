import { UUID } from "crypto";
import { CotacaoResposta } from "./cotacao-resposta";

export interface CotacaoRespostaParcela {
  id?: number | null;
  uuid?: UUID;
  resposta?: CotacaoResposta;
  respostaId: number | null;
  prazo: number;
  valor: number;
  observacoes?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
