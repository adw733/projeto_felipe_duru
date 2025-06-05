import { UUID } from "crypto";

export interface PessoaEndereco {
    id?: number | null;
    uuid?: UUID;
    statusId: number;
    pessoaId: number;
    estadoId: number;
    cidadeId: number;
    cep: string;
    pais: string;    
    bairro: string;
    logradouro: string;
    numero: string;
    complemento: string | null;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    del?: boolean
  }