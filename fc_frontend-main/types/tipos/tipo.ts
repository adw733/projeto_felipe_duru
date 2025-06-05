import { UUID } from "crypto";

export interface Tipo {
  id: number;
  uuid: UUID;
  statusId: number;
  nome: string;
  nomeAlternativo: string;
  observacoes: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
