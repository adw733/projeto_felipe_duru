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
import { TiposIten } from '../../tipos_itens/entities/tipos_iten.entity';

@Entity({ name: 'tipos' })
export class Tipo {
  @PrimaryColumn('int')
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(() => Status, status => status.tipos, { nullable: false })
  @JoinColumn({ name: 'status_id' })
  status: Status
  @Column('int', { name:'status_id', nullable: false })
  statusId: number;

  @Column('varchar', { nullable: false, length: 60 })
  nome: string;

  @Column('varchar', { name:'nome_alternativo', nullable: false, length: 60 })
  nomeAlternativo: string;

  @Column('varchar', { nullable: true, length: 100 })
  observacoes: string;

  @CreateDateColumn({ name:'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name:'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name:'deleted_at' })
  deletedAt: Date;

  // relacionamentos
  @OneToMany(() => TiposIten, tipo => tipo.tipos)
  tipos_itens: TiposIten[]
}
