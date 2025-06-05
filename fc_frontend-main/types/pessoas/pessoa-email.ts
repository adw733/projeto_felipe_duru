import { UUID } from "crypto";

export interface PessoaEmail {
  id?: number | null;
  uuid?: UUID;
  pessoaId: number | null;
  email: string;
  isAtivo: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  del?: boolean;
}
