import { UUID } from "crypto";

export interface Grupo {
  id: number;
  uuid: UUID;
  nome: string;
  statusId: number;
  tipoId: number;
  nomeAlternativo: string;
  observacoes: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
