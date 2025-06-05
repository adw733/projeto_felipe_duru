import { UUID } from "crypto";

export interface Status {
  id: number;
  uuid: UUID;
  nome: string;
  nomeAlternativo: string;
  options: {
    cor?: string;
    menus?: Array<string>;
  };
  observacoes: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
