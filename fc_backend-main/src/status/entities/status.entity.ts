import { UUID } from 'crypto';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tipo } from '../../tipos/entities/tipo.entity';
import { TiposIten } from '../../tipos_itens/entities/tipos_iten.entity';
import { Regioe } from '../../regioes/entities/regioe.entity';
import { Estado } from '../../estados/entities/estado.entity';
import { Cidade } from '../../cidades/entities/cidade.entity';
import { Grupo } from '../../grupos/entities/grupo.entity';
import { Menu } from '../../menus/entities/menu.entity';
import { Perfi } from '../../perfis/entities/perfi.entity';
import { MenusPerfi } from '../../menus_perfis/entities/menus_perfi.entity';
import { Evento } from '../../eventos/entities/evento.entity';
import { Pessoa } from '../../pessoas/entities/pessoa.entity';
import { PessoasDocumento } from '../../pessoas_documentos/entities/pessoas_documento.entity';
import { PessoasEndereco } from '../../pessoas_enderecos/entities/pessoas_endereco.entity';
import { PessoasTelefone } from '../../pessoas_telefones/entities/pessoas_telefone.entity';
import { PessoasGruposIten } from '../../pessoas_grupos-itens/entities/pessoas_grupos-iten.entity';
import { GruposIten } from '../../grupos_itens/entities/grupos_iten.entity';
import { PessoasEmpresa } from '../../pessoas_empresas/entities/pessoas_empresa.entity';
import { PessoasSenha } from '../../pessoas_senhas/entities/pessoas_senha.entity';
import { PessoasPerfi } from '../../pessoas_perfis/entities/pessoas_perfi.entity';
import { Artigo } from '../../artigos/entities/artigo.entity';
import { Produto } from '../../produtos/entities/produto.entity';
import { Convite } from '../../convites/entities/convite.entity';
import { Cotacoe } from '../../cotacoes/entities/cotacoe.entity';
import { CotacoesIten } from '../../cotacoes_itens/entities/cotacoes_iten.entity';
import { CotacoesItensResposta } from '../../cotacoes_itens_respostas/entities/cotacoes_itens_resposta.entity';
import { Notificacoe } from '../../notificacoes/entities/notificacoe.entity';
import { Pedido } from '../../pedidos/entities/pedido.entity';
import { PedidosIten } from '../../pedidos_itens/entities/pedidos_iten.entity';

@Entity({ name: 'status' })
export class Status {
  @PrimaryColumn('int')
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @Column('varchar', { nullable: false, length: 30 })
  nome: string;

  @Column('varchar', { name:'nome_alternativo', nullable: false, length: 3 })
  nomeAlternativo: string;

  @Column('jsonb', { nullable: true })
  options: {} | null;

  @CreateDateColumn({ name:'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name:'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name:'deleted_at' })
  deletedAt: Date;

  // relacionamentos
  @OneToMany(() => Tipo, tipo => tipo.status)
  tipos: Tipo[]

  @OneToMany(() => TiposIten, tipo_item => tipo_item.status)
  tipos_itens: TiposIten[]

  @OneToMany(() => Regioe, regiao => regiao.status)
  regioes: Regioe[]

  @OneToMany(() => Estado, estado => estado.status)
  estados: Estado[]

  @OneToMany(() => Cidade, cidade => cidade.status)
  cidades: Cidade[]

  @OneToMany(() => Grupo, grupo => grupo.status)
  grupos: Grupo[]

  @OneToMany(() => GruposIten, grupo_item => grupo_item.status)
  gruposItens: GruposIten[]

  @OneToMany(() => Menu, menu => menu.status)
  menus: Menu[]

  @OneToMany(() => Perfi, perfil => perfil.status)
  perfis: Perfi[]

  @OneToMany(() => MenusPerfi, menu_perfil => menu_perfil.status)
  menus_perfis: MenusPerfi[]

  @OneToMany(() => Artigo, artigo => artigo.status)
  artigos: Artigo[]

  @OneToMany(() => Evento, evento => evento.status)
  eventos: Evento[]

  @OneToMany(() => Pessoa, pessoa => pessoa.status)
  pessoas: Pessoa[]

  @OneToMany(() => PessoasDocumento, pessoa_documento => pessoa_documento.status)
  pessoasDocumentos: PessoasDocumento[]

  @OneToMany(() => PessoasEndereco, pessoa_endereco => pessoa_endereco.status)
  pessoasEnderecos: PessoasEndereco[]

  @OneToMany(() => PessoasTelefone, pessoa_telefone => pessoa_telefone.status)
  pessoasTelefones: PessoasTelefone[]

  @OneToMany(() => PessoasPerfi, pessoa_perfil => pessoa_perfil.status)
  pessoasPerfis: PessoasPerfi[]

  @OneToMany(() => PessoasGruposIten, pessoa_grupoItem => pessoa_grupoItem.status)
  pessoasGruposItens: PessoasGruposIten[]

  @OneToMany(() => PessoasEmpresa, pessoa_empresa => pessoa_empresa.status)
  pessoasEmpresas: PessoasEmpresa[]

  @OneToMany(() => PessoasSenha, pessoa_senha => pessoa_senha.status)
  pessoasSenhas: PessoasSenha[]

  @OneToMany(() => Produto, produto => produto.status)
  produtos: Produto[]

  @OneToMany(() => Convite, convite => convite.status)
  convites: Convite[]

  @OneToMany(() => Cotacoe, cotacao => cotacao.status)
  cotacoes: Cotacoe[]

  @OneToMany(() => CotacoesIten, cotacaoItem => cotacaoItem.status)
  cotacoesItens: CotacoesIten[]

  @OneToMany(() => CotacoesItensResposta, cotacaoItem => cotacaoItem.status)
  cotacoesItensRespostas: CotacoesItensResposta[]

  @OneToMany(() => Notificacoe, notificacao => notificacao.status)
  notificacoes: Notificacoe[]

  @OneToMany(() => Pedido, pedido => pedido.status)
  pedidos: Pedido[]

  @OneToMany(() => PedidosIten, pedido => pedido.status)
  pedidosItens: PedidosIten[]
}
