import { UUID } from "crypto";

export interface Perfil {
  id: number;
  uuid: UUID;
  statusId: number;
  nome: string;
  options: any;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
