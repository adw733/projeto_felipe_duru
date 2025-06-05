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
import { Status } from '../../status/entities/status.entity';
import { Anexo } from '../../anexos/entities/anexo.entity';

@Entity({ name: 'artigos' })
export class Artigo {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(() => Status, status => status.artigos, { nullable: false })
  @JoinColumn({ name: 'status_id' })
  status: Status
  @Column('int', { name:'status_id', nullable: false })
  statusId: number;

  @Column('varchar', { nullable: false, length: 50 })
  titulo: string;

  @Column('varchar', { nullable: false, length: 50 })
  autor: string;

  @Column('text', { nullable: false })
  texto: string;

  @Column('varchar', { nullable: false, length: 500 })
  resumo: string;

  @Column('varchar', { nullable: true, length: 200 })
  tags: string;

  @Column('date', { name:'data_publicacao', nullable: true })
  dataPublicacao: Date;

  @CreateDateColumn({ name:'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name:'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name:'deleted_at' })
  deletedAt: Date;

  anexo?: Anexo;
}
