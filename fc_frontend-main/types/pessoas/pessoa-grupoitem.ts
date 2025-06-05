import { UUID } from "crypto";

export interface PessoaGrupoitem {
  id?: number;
  uuid?: UUID;
  statusId: number;
  pessoaId: number;
  grupoitemId: number;
  observacoes?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
