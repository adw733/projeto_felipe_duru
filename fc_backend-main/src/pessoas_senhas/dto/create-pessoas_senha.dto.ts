export class CreatePessoasSenhaDto {
    statusId: number;
    pessoaId: number;
    senha: string;
    data_troca?: string | null;
}
