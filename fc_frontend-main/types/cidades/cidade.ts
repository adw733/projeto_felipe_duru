import { UUID } from "crypto";

export interface Cidade {
  id: number;
  uuid: UUID;
  statusId: number;
  estadoId: number;
  nome: string;
  createdAt: Object;
  updatedAt: Object;
  deletedAt: Object;
}
