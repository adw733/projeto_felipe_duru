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
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Pessoa } from '../../pessoas/entities/pessoa.entity';
import { CotacoesIten } from '../../cotacoes_itens/entities/cotacoes_iten.entity';

@Entity({ name: 'cotacoes_itens_respostas' })
export class CotacoesItensResposta {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(() => Status, (status) => status.cotacoesItensRespostas, {
    nullable: false,
  })
  @JoinColumn({ name: 'status_id' })
  status: Status;
  @Column('int', { name: 'status_id', nullable: false })
  statusId: number;

  @ManyToOne(() => CotacoesIten, (cotacao) => cotacao.cotacoesItensRespostas, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'item_id' })
  item: CotacoesIten;
  @Column('int', { name: 'item_id', nullable: false })
  itemId: number;

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.cotacoesItensRespostas_vendedor, {
    nullable: false,
  })
  @JoinColumn({ name: 'vendedor_id' })
  vendedor: Pessoa;
  @Column('int', { name: 'vendedor_id', nullable: false })
  vendedorId: number;

  @ManyToOne(
    () => Pessoa,
    (pessoa) => pessoa.cotacoesItensRespostas_fornecedor,
    { nullable: false },
  )
  @JoinColumn({ name: 'fornecedor_id' })
  fornecedor: Pessoa;
  @Column('int', { name: 'fornecedor_id', nullable: false })
  fornecedorId: number;

  @Column('numeric', {
    name: 'largura',
    nullable: true,
    precision: 12,
    scale: 4,
  })
  largura: number;

  @Column('numeric', {
    name: 'altura',
    nullable: true,
    precision: 12,
    scale: 4,
  })
  altura: number;

  @Column('numeric', {
    name: 'comprimento',
    nullable: true,
    precision: 12,
    scale: 4,
  })
  comprimento: number;

  @Column('numeric', {
    name: 'peso',
    nullable: true,
    precision: 12,
    scale: 4,
  })
  peso: number;

  @Column('varchar', { name: 'ncm', length: 8, nullable: false })
  ncm: string;

  @Column('int', { name: 'prazo_entrega', nullable: false })
  prazoEntrega: number;

  @Column('varchar', { name: 'garantia', length: 30, nullable: true })
  garantia: string;

  @Column('numeric', {
    name: 'pis',
    nullable: true,
    precision: 5,
    scale: 2,
  })
  pis: number;

  @Column('numeric', {
    name: 'cofins',
    nullable: true,
    precision: 5,
    scale: 2,
  })
  cofins: number;

  @Column('numeric', {
    name: 'icms',
    nullable: true,
    precision: 5,
    scale: 2,
  })
  icms: number;

  @Column('numeric', {
    name: 'ipi',
    nullable: true,
    precision: 5,
    scale: 2,
  })
  ipi: number;

  @Column('numeric', {
    name: 'iss',
    nullable: true,
    precision: 5,
    scale: 2,
  })
  iss: number;

  @Column('numeric', {
    name: 'valor_liquido',
    nullable: false,
    precision: 12,
    scale: 4,
  })
  valorLiquido: number;

  @Column('numeric', {
    name: 'valor_bruto',
    nullable: false,
    precision: 12,
    scale: 4,
  })
  valorBruto: number;
  
  @Column('numeric', {
    name: 'desconto',
    nullable: true,
    precision: 5,
    scale: 2,
  })
  desconto: number;

  @Column('varchar', { name: 'observacoes', length: 500, nullable: true })
  observacoes: string;

  @Column('timestamptz', { name: 'data_resposta', nullable: true })
  dataResposta: Date;

  @Column('bool', { name: 'is_escolhida', nullable: true })
  isEscolhida: Boolean;  

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
