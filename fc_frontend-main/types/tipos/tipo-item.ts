import { UUID } from "crypto";

export interface TipoItem {
  id: number;
  uuid: UUID;
  statusId: number;
  tipoId: number;
  nome: string;
  nomeAlternativo: string;
  codigo: string;
  options: any;
  observacoes: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
