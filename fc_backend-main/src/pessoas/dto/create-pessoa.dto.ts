import { CreatePessoasEmpresaDto } from "../../pessoas_empresas/dto/create-pessoas_empresa.dto";
import { CreatePessoasDocumentoDto } from "../../pessoas_documentos/dto/create-pessoas_documento.dto";
import { CreatePessoasEmailDto } from "../../pessoas_emails/dto/create-pessoas_email.dto";
import { CreatePessoasEnderecoDto } from "../../pessoas_enderecos/dto/create-pessoas_endereco.dto";
import { CreatePessoasGruposItenDto } from "../../pessoas_grupos-itens/dto/create-pessoas_grupos-iten.dto";
import { CreatePessoasPerfiDto } from "../../pessoas_perfis/dto/create-pessoas_perfi.dto";
import { CreatePessoasSiteDto } from "../../pessoas_sites/dto/create-pessoas_site.dto";
import { CreatePessoasTelefoneDto } from "../../pessoas_telefones/dto/create-pessoas_telefone.dto";
import { Anexo } from "../../anexos/entities/anexo.entity";

export class CreatePessoaDto {
    statusId: number;
    tipoId: number;
    formatoJuridicoId: number;
    regimeTributarioId: number;
    porteId: number;
    nome: string;
    fantasia: string;
    dataNascimento: string;
    isFornecedor?: boolean;
    areaAtuacao?: string;
    valorDiretorAprova?: number;
    anexo?: Anexo;
    pessoasDocumentos?: Array<CreatePessoasDocumentoDto>
    pessoasEnderecos?: Array<CreatePessoasEnderecoDto>
    pessoasTelefones?: Array<CreatePessoasTelefoneDto>
    pessoasEmails?: Array<CreatePessoasEmailDto>
    pessoasSites?: Array<CreatePessoasSiteDto>
    pessoasPerfis?: Array<CreatePessoasPerfiDto>
    pessoasGruposItens?: Array<CreatePessoasGruposItenDto>
    pessoasEmpresas?: Array<CreatePessoasEmpresaDto>
}
