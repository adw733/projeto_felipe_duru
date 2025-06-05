import { UUID } from "crypto";

export interface PessoaSite {
  id?: number | null;
  uuid?: UUID;
  statusId: number;
  pessoaId: number;
  site: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  del?: boolean;
}
