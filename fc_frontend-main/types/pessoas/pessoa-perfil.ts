import { UUID } from "crypto";

export interface PessoaPerfil {
  id?: number | null;
  uuid?: UUID;
  statusId: number;
  pessoaId?: number | null;
  perfilId: number;
  observacoes?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  del?: boolean;
}
