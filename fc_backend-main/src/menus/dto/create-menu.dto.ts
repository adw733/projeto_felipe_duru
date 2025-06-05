export class CreateMenuDto {
    statusId: number;
    nome: string;
    ordem: number;
    rota: string;
    icone: string;
    observacoes: string;
    contextoId?: number;
    options: {} | null; 
}
