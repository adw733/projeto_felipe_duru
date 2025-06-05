import { UUID } from "crypto";
import { PessoaDocumento } from "./pessoa-documento";
import { PessoaTelefone } from "./pessoa-telefone";
import { PessoaEndereco } from "./pessoa-endereco";
import { PessoaEmail } from "./pessoa-email";
import { PessoaSite } from "./pessoa-site";
import { PessoaPerfil } from "./pessoa-perfil";
import { PessoaGrupoitem } from "./pessoa-grupoitem";
import { PessoaEmpresa } from "./pessoa-empresa";
import { Anexo } from "../anexos/anexo";

export interface Pessoa {
  id?: number;
  uuid?: UUID;
  statusId: number;
  tipoId: number;
  formatoJuridicoId?: number;
  regimeTributarioId?: number;
  porteId?: number;
  nome: string;
  nomeAlternativo: string;
  dataNascimento: string;
  isFornecedor?: boolean;
  areaAtuacao?: string;
  valorDiretorAprova?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  anexo: Anexo;
  nota: number;
  pessoasDocumentos?: Array<PessoaDocumento>;
  pessoasTelefones?: Array<PessoaTelefone>;
  pessoasEnderecos?: Array<PessoaEndereco>;
  pessoasEmails?: Array<PessoaEmail>;
  pessoasSites?: Array<PessoaSite>;
  pessoasPerfis?: Array<PessoaPerfil>;
  pessoasGruposItens?: Array<PessoaGrupoitem>;
  pessoasEmpresas?: Array<PessoaEmpresa>;
}
