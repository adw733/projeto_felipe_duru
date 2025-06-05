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
import { Pessoa } from '../../pessoas/entities/pessoa.entity';
import { TiposIten } from '../../tipos_itens/entities/tipos_iten.entity';
import { Cotacoe } from '../../cotacoes/entities/cotacoe.entity';
import { CotacoesRespostasParcela } from '../../cotacoes_respostas_parcelas/entities/cotacoes_respostas_parcela.entity';

@Entity({ name: 'cotacoes_respostas' })
export class CotacoesResposta {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(() => Cotacoe, (cotacao) => cotacao.cotacoesRespostas, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE', orphanedRowAction: 'delete' })
  @JoinColumn({ name: 'cotacao_id' })
  cotacoes: Cotacoe;
  @Column('int', { name: 'cotacao_id', nullable: false })
  cotacaoId: number;

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.vendedor, { nullable: false })
  @JoinColumn({ name: 'vendedor_id' })
  vendedor: Pessoa;
  @Column('int', { name: 'vendedor_id', nullable: false })
  vendedorId: number;

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.fornecedor, { nullable: false })
  @JoinColumn({ name: 'fornecedor_id' })
  fornecedor: Pessoa;
  @Column('int', { name: 'fornecedor_id', nullable: false })
  fornecedorId: number;

  @ManyToOne(() => TiposIten, (tipoItem) => tipoItem.cotacoesRespostas_formaPagamento, {
    nullable: false,
  })
  @JoinColumn({ name: 'forma_pagamento_id' })
  formaPagamento: TiposIten;
  @Column('int', { name: 'forma_pagamento_id', nullable: false })
  formaPagamentoId: number;

  @ManyToOne(() => TiposIten, (tipoItem) => tipoItem.cotacoesRespostas_frete, {
    nullable: false,
  })
  @JoinColumn({ name: 'frete_id' })
  frete: TiposIten;
  @Column('int', { name: 'frete_id', nullable: false })
  freteId: number;

  @Column('numeric', {
    name: 'valor_frete',
    nullable: true,
    precision: 8,
    scale: 2,
  })
  valorFrete: number;

  @Column('int', { name: 'numero_parcelas', nullable: false })
  numeroParcelas: number;

  @Column('int', { name: 'prazo0', nullable: false })
  prazo0: number;

  @Column('int', { name: 'prazo_n', nullable: true })
  prazoN: number;

  @Column('varchar', { name: 'observacoes', length: 500, nullable: true })
  observacoes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
  
  @OneToMany(() => CotacoesRespostasParcela, cotacaoRespostaParcela => cotacaoRespostaParcela.resposta, {cascade: true})
  cotacoesRespostasParcelas: CotacoesRespostasParcela[]
}
