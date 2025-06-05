import { UUID } from 'crypto';
import { Status } from '../../../src/status/entities/status.entity';
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
import { Pessoa } from '../../pessoas/entities/pessoa.entity';
import { TiposIten } from '../../tipos_itens/entities/tipos_iten.entity';
import { CotacoesIten } from '../../cotacoes_itens/entities/cotacoes_iten.entity';
import { CotacoesResposta } from '../../cotacoes_respostas/entities/cotacoes_resposta.entity';
import { Pedido } from '../../pedidos/entities/pedido.entity';

@Entity({ name: 'cotacoes' })
export class Cotacoe {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(() => Status, (status) => status.cotacoes, { nullable: false })
  @JoinColumn({ name: 'status_id' })
  status: Status;
  @Column('int', { name: 'status_id', nullable: false })
  statusId: number;

  @ManyToOne(() => TiposIten, (tipoItem) => tipoItem.cotacoes, {
    nullable: false,
  })
  @JoinColumn({ name: 'tipo_id' })
  tiposIten: TiposIten;
  @Column('int', { name: 'tipo_id', nullable: false })
  tipoId: number;

  @ManyToOne(() => TiposIten, (tipoItem) => tipoItem.cotacoes_prioridade, {
    nullable: false,
  })
  @JoinColumn({ name: 'prioridade_id' })
  prioridade: TiposIten;
  @Column('int', { name: 'prioridade_id', nullable: false })
  prioridadeId: number;

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.empresa, { nullable: false })
  @JoinColumn({ name: 'empresa_id' })
  empresa: Pessoa;
  @Column('int', { name: 'empresa_id', nullable: false })
  empresaId: number;

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.comprador, { nullable: true })
  @JoinColumn({ name: 'comprador_id' })
  comprador: Pessoa;
  @Column('int', { name: 'comprador_id', nullable: true })
  compradorId: number;

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.solicitante, { nullable: false })
  @JoinColumn({ name: 'solicitante_id' })
  solicitante: Pessoa;
  @Column('int', { name: 'solicitante_id', nullable: false })
  solicitanteId: number;

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.aprovador, { nullable: true })
  @JoinColumn({ name: 'aprovador_id' })
  aprovador: Pessoa;
  @Column('int', { name: 'aprovador_id', nullable: true })
  aprovadorId: number;

  @Column('varchar', { name: 'nome', nullable: false, length: 30 })
  nome: string;

  @Column('date', { name: 'data', nullable: false })
  data: Date;

  @Column('varchar', { name: 'endereco_entrega', nullable: true, length: 300 })
  enderecoEntrega: string;

  @Column('varchar', { name: 'endereco_cobranca', nullable: true, length: 300 })
  enderecoCobranca: string;

  @Column('varchar', { name: 'centro_custo', nullable: false, length: 50 })
  centroCusto: string;

  @Column('numeric', {
    name: 'valor_total',
    nullable: true,
    precision: 12,
    scale: 4,
  })
  valorTotal: number;

  @Column('jsonb', { name: 'regioes', nullable: true })
  regioes: any;

  @Column('timestamptz', { name: 'data_encaminhada', nullable: true })
  dataEncaminhada: Date;

  @Column('boolean', { name: 'email_enviado', nullable: false, default: false })
  emailEnviado: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  quantidadeRespostas?: number;
    
  @OneToMany(() => CotacoesIten, cotacaoItem => cotacaoItem.cotacoes, {cascade: true})
  cotacoesItens: CotacoesIten[]
    
  @OneToMany(() => CotacoesResposta, cotacaoItem => cotacaoItem.cotacoes, {cascade: true})
  cotacoesRespostas: CotacoesResposta[]

  @OneToMany(() => Pedido, pedido => pedido.cotacoes)
  pedidos: Pedido[]
}
