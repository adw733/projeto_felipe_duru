import { UUID } from "crypto";

export interface Estado {
  id: number;
  uuid: UUID;
  statusId: number;
  regiaoId: number;
  nome: string;
  nomeAlternativo: string;
  createdAt: Object;
  updatedAt: Object;
  deletedAt: Object;
}
