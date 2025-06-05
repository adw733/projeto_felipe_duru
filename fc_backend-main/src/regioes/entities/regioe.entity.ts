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
import { Estado } from '../../estados/entities/estado.entity';
import { Status } from '../../status/entities/status.entity';

@Entity({ name: 'regioes' })
export class Regioe {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(() => Status, status => status.regioes, { nullable: false })
  @JoinColumn({ name: 'status_id' })
  status: Status
  @Column('int', { name:'status_id', nullable: false })
  statusId: number;

  @Column('varchar', { nullable: false, length: 60 })
  nome: string;

  @Column('varchar', { name:'nome_alternativo', nullable: false, length: 5 })
  nomeAlternativo: string;

  @CreateDateColumn({ name:'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name:'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name:'deleted_at' })
  deletedAt: Date;

  // relacionamentos
  @OneToMany(() => Estado, estado => estado.regioes)
  estados: Estado[]
}
