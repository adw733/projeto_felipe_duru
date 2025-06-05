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
import { Produto } from '../../produtos/entities/produto.entity';
import { GruposIten } from '../../grupos_itens/entities/grupos_iten.entity';

@Entity({ name: 'produtos_grupositens' })
export class ProdutosGrupositen {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(() => Produto, (produto) => produto.produtosGrupositens, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'produto_id' })
  produtos: Produto;
  @Column('int', { name:'produto_id', nullable: false })
  produtoId: number;

  @ManyToOne(() => GruposIten, (grupoItem) => grupoItem.produtosGrupositens, {
    nullable: false,
  })
  @JoinColumn({ name: 'grupoitem_id' })
  grupos_itens_id: GruposIten;
  @Column('int', { name:'grupoitem_id', nullable: false })
  grupoitemId: number;

  @CreateDateColumn({ name:'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name:'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name:'deleted_at' })
  deletedAt: Date;
}
