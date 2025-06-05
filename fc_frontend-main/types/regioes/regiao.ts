import { UUID } from "crypto";

export interface Regiao {
  id: number;
  uuid: UUID;
  statusId: number;
  nome: string;
  nomeAlternativo: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
