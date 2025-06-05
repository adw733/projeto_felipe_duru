import { Anexo } from "../../types/anexos/anexo";

export interface Artigo {
  id?: number;
  uuid?: string;
  statusId: number | null | undefined;
  titulo: string;
  autor: string;
  resumo: string;
  texto: string;
  tags: string;
  dataPublicacao: Date | null;
  createdAt?: Object;
  updatedAt?: Object;
  deletedAt?: Object;
  anexo?: Anexo;
}
