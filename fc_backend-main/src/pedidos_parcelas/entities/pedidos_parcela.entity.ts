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
import { Pedido } from '../../pedidos/entities/pedido.entity';

@Entity({ name: 'pedidos_parcelas' })
export class PedidosParcela {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(() => Pedido, (pedido) => pedido.pedidosParcelas, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'pedido_id' })
  pedidos: Pedido;
  @Column('int', { name: 'pedido_id', nullable: false })
  pedidoId: number;

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
