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
import { Anexo } from '../../anexos/entities/anexo.entity';

@Entity({ name: 'eventos' })
export class Evento {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(() => Status, status => status.eventos, { nullable: false })
  @JoinColumn({ name: 'status_id' })
  status: Status
  @Column('int', { name:'status_id', nullable: false })
  statusId: number;

  @ManyToOne(() => TiposIten, estado => estado.eventos, { nullable: false })
  @JoinColumn({ name: 'tipo_id' })
  tiposIten: TiposIten
  @Column('int', { name:'tipo_id', nullable: false })
  tipoId: number;

  @Column('varchar', { nullable: false, length: 80 })
  titulo: string;

  @Column('varchar', { nullable: true, length: 80 })
  palestrante: string;

  @Column('varchar', { nullable: true, length: 250 })
  endereco: string;

  @Column('varchar', { nullable: false, length: 300 })
  resumo: string;

  @Column('text', { nullable: false })
  descricao: string;

  @Column('date', { nullable: true })
  data: Date | string;

  @Column('time', { nullable: true })
  hora: string;

  @Column('time', { nullable: true })
  duracao: string;

  @Column('boolean', { name:'is_publicado', nullable: false, default: false })
  isPublicado: boolean;

  @CreateDateColumn({ name:'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name:'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name:'deleted_at' })
  deletedAt: Date;
  
  anexo?: Anexo;
}
