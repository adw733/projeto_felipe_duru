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
import { MenusPerfi } from '../../menus_perfis/entities/menus_perfi.entity';
import { TiposIten } from '../../tipos_itens/entities/tipos_iten.entity';
import { NotificacoesUsuario } from '../../notificacoes_usuarios/entities/notificacoes_usuario.entity';
import { Cotacoe } from '../../cotacoes/entities/cotacoe.entity';
import { Pessoa } from '../../pessoas/entities/pessoa.entity';
import { PedidosIten } from '../../pedidos_itens/entities/pedidos_iten.entity';
import { PedidosParcela } from '../../pedidos_parcelas/entities/pedidos_parcela.entity';

@Entity({ name: 'pedidos' })
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(() => Status, status => status.pedidos, { nullable: false })
  @JoinColumn({ name: 'status_id' })
  status: Status
  @Column('int', { name:'status_id', nullable: false })
  statusId: number;

  @ManyToOne(() => TiposIten, tipoItem => tipoItem.pedidos, { nullable: false })
  @JoinColumn({ name: 'tipo_id' })
  tiposIten: TiposIten
  @Column('int', { name:'tipo_id', nullable: false })
  tipoId: number;

  @ManyToOne(() => Cotacoe, cotacao => cotacao.pedidos, { nullable: false })
  @JoinColumn({ name: 'cotacao_id' })
  cotacoes: Cotacoe
  @Column('int', { name:'cotacao_id', nullable: false })
  cotacaoId: number;

  @ManyToOne(() => TiposIten, tipoItem => tipoItem.pedidos_prioridades, { nullable: false })
  @JoinColumn({ name: 'prioridade_id' })
  prioridades: TiposIten
  @Column('int', { name:'prioridade_id', nullable: false })
  prioridadeId: number;

  @ManyToOne(() => Pessoa, pessoa => pessoa.pedidos_clientes, { nullable: false })
  @JoinColumn({ name: 'cliente_id' })
  clientes: Pessoa
  @Column('int', { name:'cliente_id', nullable: false })
  clienteId: number;

  @ManyToOne(() => Pessoa, pessoa => pessoa.pedidos_fornecedores, { nullable: false })
  @JoinColumn({ name: 'fornecedor_id' })
  fornecedores: Pessoa
  @Column('int', { name:'fornecedor_id', nullable: false })
  fornecedorId: number;

  @ManyToOne(() => Pessoa, pessoa => pessoa.pedidos_vendedores, { nullable: false })
  @JoinColumn({ name: 'vendedor_id' })
  vendedores: Pessoa
  @Column('int', { name:'vendedor_id', nullable: false })
  vendedorId: number;

  @ManyToOne(() => Pessoa, pessoa => pessoa.pedidos_compradores, { nullable: false })
  @JoinColumn({ name: 'comprador_id' })
  compradores: Pessoa
  @Column('int', { name:'comprador_id', nullable: false })
  compradorId: number;

  @ManyToOne(() => Pessoa, pessoa => pessoa.pedidos_gerentes, { nullable: false })
  @JoinColumn({ name: 'gerente_id' })
  gerentes: Pessoa
  @Column('int', { name:'gerente_id', nullable: false })
  gerenteId: number;

  @ManyToOne(() => Pessoa, pessoa => pessoa.pedidos_aprovadores, { nullable: false })
  @JoinColumn({ name: 'aprovador_id' })
  aprovadores: Pessoa
  @Column('int', { name:'aprovador_id', nullable: false })
  aprovadorId: number;

  @ManyToOne(() => TiposIten, tipoItem => tipoItem.pedidos_formapagamentos, { nullable: false })
  @JoinColumn({ name: 'forma_pagamento_id' })
  formaPagamentos: TiposIten
  @Column('int', { name:'forma_pagamento_id', nullable: false })
  formaPagamentoId: number;

  @ManyToOne(() => TiposIten, tipoItem => tipoItem.pedidos_fretes, { nullable: false })
  @JoinColumn({ name: 'frete_id' })
  fretes: TiposIten
  @Column('int', { name:'frete_id', nullable: false })
  freteId: number;

  @Column('decimal', { name: 'valor_frete', nullable: true, scale: 8, precision: 2 })
  valorFrete: number;

  @Column('int', { name: 'numero_parcela', nullable: true })
  numeroParcela: number;

  @Column('int', { name: 'prazo0', nullable: true })
  prazo0: number;

  @Column('int', { name: 'prazon', nullable: true })
  prazon: number;

  @Column('timestamptz', { name: 'data', nullable: false })
  data: Date;

  @Column('timestamptz', { name: 'data_envio', nullable: true })
  dataEnvio: Date;

  @Column('timestamptz', { name: 'data_atendimento', nullable: true })
  dataAtendimento: Date;

  @Column('varchar', { name: 'centro_custo', nullable: true, length: 30 })
  centroCusto: string;

  @Column('decimal', { name: 'valor_total', nullable: true, scale: 12, precision: 2 })
  valoTotal: number;

  @Column('varchar', { name: 'endereco_entrega', nullable: true, length: 150 })
  enderecoEntrega: string;

  @Column('varchar', { name: 'endereco_cobranca', nullable: true, length: 150 })
  enderecoCobranca: string;

  @Column('varchar', { name: 'observacoes', nullable: true, length: 500 })
  observacoes: string;

  @CreateDateColumn({ name:'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name:'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name:'deleted_at' })
  deletedAt: Date;

  // relacionamentos
  @OneToMany(() => PedidosIten, pedidoItem => pedidoItem.pedidos, {cascade: true})
  pedidosItens: PedidosIten[]

  @OneToMany(() => PedidosParcela, pedidoParcela => pedidoParcela.pedidos, {cascade: true})
  pedidosParcelas: PedidosParcela[]
}

