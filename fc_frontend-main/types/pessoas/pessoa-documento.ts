import { UUID } from "crypto";

export interface PessoaDocumento {
  id?: number | null;
  uuid?: UUID;
  statusId: number;
  pessoaId: number;
  tipoId: number | null;
  numero: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  del?: boolean;
}
