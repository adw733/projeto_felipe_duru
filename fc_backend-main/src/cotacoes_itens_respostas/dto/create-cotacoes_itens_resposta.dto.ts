import { UUID } from "crypto";

export class CreateCotacoesItensRespostaDto {    
  id?: number;  
  uuid?: UUID;
  statusId: number;
  itemId: number;
  vendedorId: number;
  fornecedorId: number;
  largura: number;
  altura: number;
  comprimento: number;
  peso: number;
  ncm: string;
  prazoEntrega: number;
  garantia: string;
  pis: number;
  cofins: number;
  icms: number;
  ipi: number;
  iss: number;
  valorLiquido: number;
  valorBruto: number;
  desconto: number;
  observacoes: string;
  dataResposta: Date;
  isEscolhida: Boolean;  
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
