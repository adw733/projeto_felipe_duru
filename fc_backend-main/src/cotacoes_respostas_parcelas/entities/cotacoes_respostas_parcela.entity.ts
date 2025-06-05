import { UUID } from 'crypto';
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
import { CotacoesResposta } from '../../cotacoes_respostas/entities/cotacoes_resposta.entity';

@Entity({ name: 'cotacoes_respostas_parcelas' })
export class CotacoesRespostasParcela {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(() => CotacoesResposta, (cotacaoResposta) => cotacaoResposta.cotacoesRespostasParcelas, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'resposta_id' })
  resposta: CotacoesResposta;
  @Column('int', { name: 'resposta_id', nullable: false })
  respostaId: number;

  @Column('int', { name: 'prazo', nullable: false })
  prazo: number;

  @Column('numeric', {
    name: 'valor',
    nullable: false,
    precision: 12,
    scale: 4,
  })
  valor: number;
  
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
