export class CreateEventoDto {
    statusId: number;
    tipoId: number;
    titulo: string;
    palestrante: string;
    resumo: string;
    descricao: string;
    data: Date;
    hora: string;
    duracao: string;
    endereco: string;
    isPublicado: boolean;
}
