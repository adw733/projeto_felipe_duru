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
import { Pedido } from '../../pedidos/entities/pedido.entity';
import { Produto } from '../../produtos/entities/produto.entity';

@Entity({ name: 'pedidos_itens' })
export class PedidosIten {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(() => Status, status => status.pedidosItens, { nullable: false })
  @JoinColumn({ name: 'status_id' })
  status: Status
  @Column('int', { name:'status_id', nullable: false })
  statusId: number;
  
  @ManyToOne(() => Pedido, pedido => pedido.pedidosItens, { nullable: false })
  @JoinColumn({ name: 'pedido_id' })
  pedidos: Pedido
  @Column('int', { name:'pedido_id', nullable: false })
  pedidoId: number;

  @ManyToOne(() => Produto, produto => produto.pedidosItens, { nullable: false })
  @JoinColumn({ name: 'produto_id' })
  produtos: Produto
  @Column('int', { name:'produto_id', nullable: false })
  produtoId: number;

  @ManyToOne(() => TiposIten, tipoItem => tipoItem.pedidosItens_finalidade, { nullable: false })
  @JoinColumn({ name: 'finalidade_id' })
  finalidades: TiposIten
  @Column('int', { name:'finalidade_id', nullable: false })
  finalidadeId: number;

  @Column('timestamptz', { name: 'data_necessidade', nullable: true })
  dataNecessidade: Date;

  @Column('decimal', { name: 'quantidade', nullable: false, scale: 12, precision: 4 })
  quantidade: number;

  @Column('decimal', { name: 'largura', nullable: true, scale: 12, precision: 4 })
  largura: number;

  @Column('decimal', { name: 'altura', nullable: true, scale: 12, precision: 4 })
  altura: number;

  @Column('decimal', { name: 'comprimento', nullable: true, scale: 12, precision: 4 })
  comprimento: number;

  @Column('decimal', { name: 'peso', nullable: true, scale: 12, precision: 4 })
  peso: number;

  @Column('varchar', { name: 'ncm', nullable: false, length: 8 })
  ncm: string;

  @Column('int', { name: 'prazo_entrega', nullable: false })
  prazoEntrega: number;

  @Column('varchar', { name: 'garantia', nullable: true, length: 30 })
  garantia: string;

  @Column('decimal', { name: 'pis', nullable: true, scale: 12, precision: 4 })
  pis: number;

  @Column('decimal', { name: 'cofins', nullable: true, scale: 12, precision: 4 })
  cofins: number;

  @Column('decimal', { name: 'icms', nullable: true, scale: 12, precision: 4 })
  icms: number;

  @Column('decimal', { name: 'ipi', nullable: true, scale: 12, precision: 4 })
  ipi: number;

  @Column('decimal', { name: 'iss', nullable: true, scale: 12, precision: 4 })
  iss: number;

  @Column('decimal', { name: 'valor_liquido', nullable: false, scale: 12, precision: 2 })
  valoLiquido: number;

  @Column('decimal', { name: 'valor_bruto', nullable: false, scale: 12, precision: 2 })
  valoBruto: number;

  @Column('decimal', { name: 'desconto', nullable: false, scale: 5, precision: 2 })
  desconto: number;

  @Column('varchar', { name: 'observacoes', nullable: true, length: 500 })
  observacoes: string;

  @CreateDateColumn({ name:'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name:'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name:'deleted_at' })
  deletedAt: Date;

  // relacionamentos
}

