import { UUID } from "crypto";

export interface PessoaEmpresa {
  id?: number | null;
  uuid?: UUID;
  statusId: number;
  pessoaId?: number | null;
  empresaId: number;
  observacoes?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
