import { UUID } from 'crypto';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from '../../status/entities/status.entity';
import { TiposIten } from '../../tipos_itens/entities/tipos_iten.entity';
import { PessoasDocumento } from '../../pessoas_documentos/entities/pessoas_documento.entity';
import { PessoasEndereco } from '../../pessoas_enderecos/entities/pessoas_endereco.entity';
import { PessoasTelefone } from '../../pessoas_telefones/entities/pessoas_telefone.entity';
import { PessoasEmail } from '../../pessoas_emails/entities/pessoas_email.entity';
import { PessoasSite } from '../../pessoas_sites/entities/pessoas_site.entity';
import { PessoasPerfi } from '../../pessoas_perfis/entities/pessoas_perfi.entity';
import { PessoasGruposIten } from '../../pessoas_grupos-itens/entities/pessoas_grupos-iten.entity';
import { PessoasEmpresa } from '../../pessoas_empresas/entities/pessoas_empresa.entity';
import { PessoasSenha } from '../../pessoas_senhas/entities/pessoas_senha.entity';
import { Produto } from '../../produtos/entities/produto.entity';
import { Convite } from '../../convites/entities/convite.entity';
import { Anexo } from '../../anexos/entities/anexo.entity';
import { Cotacoe } from '../../cotacoes/entities/cotacoe.entity';
import { CotacoesResposta } from '../../cotacoes_respostas/entities/cotacoes_resposta.entity';
import { CotacoesItensResposta } from '../../cotacoes_itens_respostas/entities/cotacoes_itens_resposta.entity';
import { NotificacoesUsuario } from '../../notificacoes_usuarios/entities/notificacoes_usuario.entity';
import { Pedido } from '../../pedidos/entities/pedido.entity';

@Entity({ name: 'pessoas' })
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(() => Status, (status) => status.pessoas, { nullable: false })
  @JoinColumn({ name: 'status_id' })
  status: Status;
  @Column('int', { name:'status_id', nullable: false })
  statusId: number;

  @ManyToOne(() => TiposIten, (tipoIten) => tipoIten.tiposPessoa, {
    nullable: false,
  })
  @JoinColumn({ name: 'tipo_id' })
  tiposPessoa: TiposIten;
  @Column('int', { name:'tipo_id', nullable: false })
  tipoId: number;

  @ManyToOne(() => TiposIten, (tipoIten) => tipoIten.formatosJuridicos, {
    nullable: true,
  })
  @JoinColumn({ name: 'formato_juridico_id' })
  formatosJuridicos: TiposIten;
  @Column('int', { name:'formato_juridico_id', nullable: true })
  formatoJuridicoId: number

  @ManyToOne(() => TiposIten, (tipoIten) => tipoIten.regimesTributarios, {
    nullable: true,
  })
  @JoinColumn({ name: 'regime_tributario_id' })
  regimesTributarios: TiposIten;
  @Column('int', { name:'regime_tributario_id', nullable: true })
  regimeTributarioId: number

  @ManyToOne(() => TiposIten, (tipoIten) => tipoIten.portesEmpresa, {
    nullable: true,
  })
  @JoinColumn({ name: 'porte_id' })
  portesEmpresa: TiposIten;
  @Column('int', { name:'porte_id', nullable: true })
  porteId: number

  @Column('varchar', { nullable: false, length: 100 })
  nome: string;

  @Column('varchar', { name:'nome_alternativo', nullable: true, length: 50 })
  nomeAlternativo: string;

  @Column('date', { name:'data_nascimento', nullable: true })
  dataNascimento: string;

  @Column('boolean', { name:'is_fornecedor', nullable: true })
  isFornecedor: boolean;

  @Column('varchar', { name:'area_atuacao', nullable: true, length: 100 })
  areaAtuacao: string;

  @Column('decimal', { name:'valor_diretor_aprova', nullable: true })
  valorDiretorAprova: number;

  @CreateDateColumn({ name:'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name:'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name:'deleted_at' })
  deletedAt: Date;

  anexo?: Anexo;

  // relacionamentos
  @OneToMany(() => PessoasDocumento, (pessoa_documento) => pessoa_documento.pessoas, { cascade: true })
  pessoasDocumentos: PessoasDocumento[];

  @OneToMany(() => PessoasEndereco, (pessoa_endereco) => pessoa_endereco.pessoas, { cascade: true })
  pessoasEnderecos: PessoasEndereco[];

  @OneToMany(() => PessoasTelefone, (pessoa_telefone) => pessoa_telefone.pessoas, { cascade: true })
  pessoasTelefones: PessoasTelefone[];

  @OneToMany(() => PessoasEmail, (pessoa_email) => pessoa_email.pessoas, { cascade: true })
  pessoasEmails: PessoasEmail[];

  @OneToMany(() => PessoasSite, (pessoa_site) => pessoa_site.pessoas, { cascade: true })
  pessoasSites: PessoasSite[];

  @OneToMany(() => PessoasPerfi, (pessoa_perfil) => pessoa_perfil.pessoas, { cascade: true })
  pessoasPerfis: PessoasPerfi[];

  @OneToMany(() => PessoasGruposIten, (pessoa_grupoItem) => pessoa_grupoItem.pessoas, { cascade: true })
  pessoasGruposItens: PessoasGruposIten[];

  @OneToMany(() => PessoasEmpresa, (pessoa_empresa) => pessoa_empresa.pessoasColaboradores)
  pessoasColaboradores: PessoasEmpresa[];

  @OneToMany(() => PessoasEmpresa, (pessoa_empresa) => pessoa_empresa.pessoasEmpresas, { cascade: true })
  pessoasEmpresas: PessoasEmpresa[];

  @OneToMany(() => PessoasSenha, (pessoa_senha) => pessoa_senha.pessoasSenhas)
  pessoasSenhas: PessoasSenha[];

  @OneToMany(() => Produto, produto => produto.empresa)
  produtos: Produto[];

  @OneToMany(() => Convite, convite => convite.pessoas)
  convites: Convite[];

  @OneToMany(() => Cotacoe, cotacao => cotacao.empresa)
  empresa: Cotacoe[];

  @OneToMany(() => Cotacoe, cotacao => cotacao.comprador)
  comprador: Cotacoe[];

  @OneToMany(() => Cotacoe, cotacao => cotacao.solicitante)
  solicitante: Cotacoe[];

  @OneToMany(() => Cotacoe, cotacao => cotacao.aprovador)
  aprovador: Cotacoe[];

  @OneToMany(() => CotacoesResposta, cotacao => cotacao.vendedor)
  vendedor: CotacoesResposta[];

  @OneToMany(() => CotacoesResposta, cotacao => cotacao.fornecedor)
  fornecedor: CotacoesResposta[];

  @OneToMany(() => CotacoesItensResposta, cotacao => cotacao.vendedor)
  cotacoesItensRespostas_vendedor: CotacoesItensResposta[];

  @OneToMany(() => CotacoesItensResposta, cotacao => cotacao.fornecedor)
  cotacoesItensRespostas_fornecedor: CotacoesItensResposta[];

  @OneToMany(() => NotificacoesUsuario, notificacoesUsuario => notificacoesUsuario.pessoa)
  notificacoesUsuarios: NotificacoesUsuario[];

  @OneToMany(() => Pedido, pedido => pedido.clientes)
  pedidos_clientes: Pedido[];

  @OneToMany(() => Pedido, pedido => pedido.fornecedores)
  pedidos_fornecedores: Pedido[];

  @OneToMany(() => Pedido, pedido => pedido.vendedores)
  pedidos_vendedores: Pedido[];

  @OneToMany(() => Pedido, pedido => pedido.compradores)
  pedidos_compradores: Pedido[];

  @OneToMany(() => Pedido, pedido => pedido.gerentes)
  pedidos_gerentes: Pedido[];

  @OneToMany(() => Pedido, pedido => pedido.aprovadores)
  pedidos_aprovadores: Pedido[];
}
