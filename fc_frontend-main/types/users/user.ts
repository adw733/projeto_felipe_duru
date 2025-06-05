import { UUID } from "crypto";
import { PessoaDocumento } from "../pessoas/pessoa-documento";
import { PessoaEmail } from "../pessoas/pessoa-email";
import { PessoaEndereco } from "../pessoas/pessoa-endereco";
import { PessoaGrupoitem } from "../pessoas/pessoa-grupoitem";
import { PessoaPerfil } from "../pessoas/pessoa-perfil";
import { PessoaSite } from "../pessoas/pessoa-site";
import { PessoaTelefone } from "../pessoas/pessoa-telefone";
import { Anexo } from "../anexos/anexo";

export interface User {
  access_token: string;
  isLoggedIn: boolean;
  pessoa: {
    pessoa: {
      id: number;
      uuid: UUID;
      statusId: number;
      tipoId: number;
      formatoJuridicoId: number;
      regimeTributarioId: number;
      porteId: number;
      nome: string;
      nomeAlternativo?: string;
      dataNascimento?: string;
      isFornecedor?: boolean;
      areaAtuacao?: string;
      valorDiretorAprova?: number;
      anexo?: Anexo | null;
      pessoasDocumentos?: Array<PessoaDocumento>;
      pessoasTelefones?: Array<PessoaTelefone>;
      pessoasEnderecos?: Array<PessoaEndereco>;
      pessoasEmails?: Array<PessoaEmail>;
      pessoasSites?: Array<PessoaSite>;
      pessoasPerfis?: Array<PessoaPerfil>;
      pessoasGruposItens?: Array<PessoaGrupoitem>;
      pessoasEmpresas?: [
        {
          empresaId: number;
        }
      ];
    };
    empresa: {
      id: number;
      uuid: UUID;
      statusId: number;
      tipoId: number;
      formatoJuridicoId: number;
      regimeTributarioId: number;
      porteId: number;
      nome: string;
      nomeAlternativo?: string;
      dataNascimento?: string;
      isFornecedor?: boolean;
      areaAtuacao?: string;
      valorDiretorAprova?: number;
      anexo?: Anexo | null;
      pessoasDocumentos?: Array<PessoaDocumento>;
      pessoasTelefones?: Array<PessoaTelefone>;
      pessoasEnderecos?: Array<PessoaEndereco>;
      pessoasEmails?: Array<PessoaEmail>;
      pessoasSites?: Array<PessoaSite>;
      pessoasPerfis?: Array<PessoaPerfil>;
      pessoasGruposItens?: Array<PessoaGrupoitem>;
      pessoasEmpresas?: [
        {
          empresaId: number;
        }
      ];
    };
  };
}
