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
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from '../../status/entities/status.entity';
import { Tipo } from '../../tipos/entities/tipo.entity';
import { Grupo } from '../../grupos/entities/grupo.entity';
import { Evento } from '../../eventos/entities/evento.entity';
import { Pessoa } from '../../pessoas/entities/pessoa.entity';
import { PessoasDocumento } from '../../pessoas_documentos/entities/pessoas_documento.entity';
import { PessoasTelefone } from '../../pessoas_telefones/entities/pessoas_telefone.entity';
import { GruposIten } from '../../grupos_itens/entities/grupos_iten.entity';
import { Produto } from '../../produtos/entities/produto.entity';
import { Menu } from '../../menus/entities/menu.entity';
import { Anexo } from '../../anexos/entities/anexo.entity';
import { Cotacoe } from '../../cotacoes/entities/cotacoe.entity';
import { CotacoesIten } from '../../cotacoes_itens/entities/cotacoes_iten.entity';
import { CotacoesResposta } from '../../cotacoes_respostas/entities/cotacoes_resposta.entity';
import { Pedido } from '../../pedidos/entities/pedido.entity';
import { PedidosIten } from '../../pedidos_itens/entities/pedidos_iten.entity';

@Entity({ name: 'tipos_itens' })
export class TiposIten {
  @PrimaryColumn('int')
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(() => Status, status => status.tipos_itens, { nullable: false })
  @JoinColumn({ name: 'status_id' })
  status: Status
  @Column('int', { name:'status_id', nullable: false })
  statusId: number;

  @ManyToOne(() => Tipo, tipo => tipo.tipos_itens, { nullable: false })
  @JoinColumn({ name: 'tipo_id' })
  tipos: Tipo
  @Column('int', { name:'tipo_id', nullable: false })
  tipoId: number;

  @Column('varchar', { nullable: false, length: 60 })
  nome: string;

  @Column('varchar', { name:'nome_alternativo', nullable: false, length: 60 })
  nomeAlternativo: string;

  @Column('varchar', { nullable: true, length: 20 })
  codigo: string;

  @Column('jsonb', { nullable: true })
  options: {} | null;

  @Column('varchar', { nullable: true, length: 20 })
  observacao: string;

  @CreateDateColumn({ name:'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name:'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name:'deleted_at' })
  deletedAt: Date;

  // relacionamentos
  @OneToMany(() => Anexo, anexo => anexo.tiposIten)
  anexos: Anexo[]

  @OneToMany(() => Grupo, grupo => grupo.tiposIten)
  grupos: Grupo[]

  @OneToMany(() => GruposIten, grupo_item => grupo_item.unidadesMedidas)
  gruposItens: GruposIten[]
  
  @OneToMany(() => Menu, menu => menu.tiposIten)
  menus: Menu[]

  @OneToMany(() => Evento, evento => evento.tiposIten)
  eventos: Evento[]

  @OneToMany(() => Pessoa, pessoa => pessoa.tiposPessoa)
  tiposPessoa: Pessoa[]

  @OneToMany(() => Pessoa, pessoa => pessoa.formatosJuridicos)
  formatosJuridicos: Pessoa[]

  @OneToMany(() => Pessoa, pessoa => pessoa.regimesTributarios)
  regimesTributarios: Pessoa[]

  @OneToMany(() => Pessoa, pessoa => pessoa.portesEmpresa)
  portesEmpresa: Pessoa[]

  @OneToMany(() => PessoasDocumento, pessoa_documento => pessoa_documento.tiposDocumento)
  pessoasDocumentos: PessoasDocumento[]

  @OneToMany(() => PessoasTelefone, pessoa_telefone => pessoa_telefone.tiposTelefone)
  pessoasTelefones: PessoasTelefone[]

  @OneToMany(() => Produto, produto => produto.tiposIten)
  produtos: Produto[]

  @OneToMany(() => Produto, produto => produto.unidadesMedidas)
  produtos_unidadeMedida: Produto[]

  @OneToMany(() => Cotacoe, cotacao => cotacao.tiposIten)
  cotacoes: Cotacoe[]
  
  @OneToMany(() => Cotacoe, cotacao => cotacao.prioridade)
  cotacoes_prioridade: Cotacoe[]
  
  @OneToMany(() => CotacoesIten, cotacaoItem => cotacaoItem.finalidade)
  cotacoesItens_finalidade: CotacoesIten[]
  
  @OneToMany(() => CotacoesResposta, cotacaoItem => cotacaoItem.formaPagamento)
  cotacoesRespostas_formaPagamento: CotacoesResposta[]
  
  @OneToMany(() => CotacoesResposta, cotacaoItem => cotacaoItem.frete)
  cotacoesRespostas_frete: CotacoesResposta[]

  @OneToMany(() => Pedido, pedido => pedido.tiposIten)
  pedidos: Pedido[]

  @OneToMany(() => Pedido, pedido => pedido.prioridades)
  pedidos_prioridades: Pedido[]

  @OneToMany(() => Pedido, pedido => pedido.formaPagamentos)
  pedidos_formapagamentos: Pedido[]

  @OneToMany(() => Pedido, pedido => pedido.fretes)
  pedidos_fretes: Pedido[]

  @OneToMany(() => PedidosIten, pedidoItem => pedidoItem.finalidades)
  pedidosItens_finalidade: PedidosIten[]
}

