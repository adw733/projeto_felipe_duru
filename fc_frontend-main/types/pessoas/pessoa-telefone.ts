import { UUID } from "crypto";

export interface PessoaTelefone {
  id?: number | null;
  uuid?: UUID;
  statusId: number;
  pessoaId: number | null;
  tipoId: number | null;
  numero: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  del?: boolean;
}
