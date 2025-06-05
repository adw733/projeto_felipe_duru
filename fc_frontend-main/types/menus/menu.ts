import { UUID } from "crypto";

export interface Menu {
  id: number;
  uuid: UUID;
  statusId: number;
  ordem: number;
  nome: string;
  rota: string;
  icone: string;
  observacoes: string;
  contextoId: number;
  options: any;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
