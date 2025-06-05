import { UUID } from "crypto";
import { Anexo } from "../../types/anexos/anexo";

export interface Evento {
  id?: number;
  uuid?: UUID;
  statusId: number | null | undefined;
  tipoId: number | null;
  titulo: string;
  resumo: string;
  palestrante: string;
  data: Date | null;
  descricao: string;
  duracao: string;
  endereco: string;
  hora: string;
  isPublicado?: boolean;
  createdAt?: Object;
  updatedAt?: Object;
  deletedAt?: Object;
  anexo?: Anexo | null;
}
