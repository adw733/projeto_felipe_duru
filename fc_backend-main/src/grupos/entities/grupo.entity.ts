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
import { GruposIten } from '../../grupos_itens/entities/grupos_iten.entity';

@Entity({ name: 'grupos' })
export class Grupo {
  @PrimaryColumn('int')
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(() => Status, (status) => status.grupos, { nullable: false })
  @JoinColumn({ name: 'status_id' })
  status: Status;
  @Column('int', { name:'status_id', nullable: false })
  statusId: number;

  @ManyToOne(() => TiposIten, (estado) => estado.grupos, { nullable: false })
  @JoinColumn({ name: 'tipo_id' })
  tiposIten: TiposIten;
  @Column('int', { name:'tipo_id', nullable: false })
  tipoId: number;

  @Column('varchar', { nullable: false, length: 100 })
  nome: string;

  @Column('varchar', { name:'nome_alternativo', nullable: false, length: 100 })
  nomeAlternativo: string;

  @CreateDateColumn({ name:'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name:'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name:'deleted_at' })
  deletedAt: Date;

  // relacionamentos
  @OneToMany(() => GruposIten, (grupo_item) => grupo_item.grupos)
  gruposItens: GruposIten[];
}
