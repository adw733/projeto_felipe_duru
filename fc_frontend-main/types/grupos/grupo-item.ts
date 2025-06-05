import { UUID } from "crypto";

export interface GrupoItem {
  id: number;
  uuid: UUID;
  nome: string;
  statusId: number;
  grupoId: number;
  options: {} | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
