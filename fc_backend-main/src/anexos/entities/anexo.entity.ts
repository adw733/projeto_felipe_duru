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
import { TiposIten } from '../../tipos_itens/entities/tipos_iten.entity';

@Entity({ name: 'anexos' })
export class Anexo {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(() => TiposIten, tiposItens => tiposItens.anexos, { nullable: false })
  @JoinColumn({ name: 'tipo_id' })
  tiposIten: Status
  @Column('int', { name:'tipo_id', nullable: false })
  tipoId: number;

  @Column('int', { name: 'registro_id', nullable: false})
  registroId: number;

  @Column('varchar', { name: 'key', nullable: false, length: 800 })
  key: string;

  @Column('varchar', { name: 'mimetype', nullable: false, length: 50 })
  mimetype: string;

  @Column('varchar', { name: 'nome', nullable: false, length: 200 })
  nome: string;

  @Column('int', { name: 'size', nullable: false})
  size: number;

  @Column('varchar', { name: 'url', nullable: false, length: 300 })
  url: string;

  @CreateDateColumn({ name:'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name:'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name:'deleted_at' })
  deletedAt: Date;
}
