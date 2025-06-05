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
import { TiposIten } from '../../tipos_itens/entities/tipos_iten.entity';
import { Produto } from '../../produtos/entities/produto.entity';
import { Cotacoe } from '../../cotacoes/entities/cotacoe.entity';
import { CotacoesItensResposta } from '../../cotacoes_itens_respostas/entities/cotacoes_itens_resposta.entity';

@Entity({ name: 'cotacoes_itens' })
export class CotacoesIten {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(() => Status, (status) => status.cotacoesItens, {
    nullable: false,
  })
  @JoinColumn({ name: 'status_id' })
  status: Status;
  @Column('int', { name: 'status_id', nullable: false })
  statusId: number;

  @ManyToOne(() => Cotacoe, (cotacao) => cotacao.cotacoesItens, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'cotacao_id' })
  cotacoes: Cotacoe;
  @Column('int', { name: 'cotacao_id', nullable: false })
  cotacaoId: number;

  @ManyToOne(() => Produto, (produto) => produto.cotacoesItens, {
    nullable: false,
  })
  @JoinColumn({ name: 'produto_id' })
  produtos: Produto;
  @Column('int', { name: 'produto_id', nullable: false })
  produtoId: number;

  @ManyToOne(() => TiposIten, (tipoItem) => tipoItem.cotacoesItens_finalidade, {
    nullable: false,
  })
  @JoinColumn({ name: 'finalidade_id' })
  finalidade: TiposIten;
  @Column('int', { name: 'finalidade_id', nullable: false })
  finalidadeId: number;

  @Column('date', { name: 'data_necessidade', nullable: true })
  dataNecessidade: Date;

  @Column('numeric', {
    name: 'quantidade',
    nullable: false,
    precision: 12,
    scale: 4,
  })
  quantidade: number;

  @Column('varchar', { name: 'observacoes', nullable: true })
  observacoes: any;

  @Column('int', { name: 'resposta_id', nullable: true })
  respostaId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @OneToMany(() => CotacoesItensResposta, (cotacaoItem) => cotacaoItem.item)
  cotacoesItensRespostas: CotacoesItensResposta[];
}
