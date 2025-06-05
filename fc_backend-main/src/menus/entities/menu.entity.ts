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
import { Status } from '../../status/entities/status.entity';
import { MenusPerfi } from '../../menus_perfis/entities/menus_perfi.entity';
import { TiposIten } from '../../tipos_itens/entities/tipos_iten.entity';

@Entity({ name: 'menus' })
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(() => Status, status => status.menus, { nullable: false })
  @JoinColumn({ name: 'status_id' })
  status: Status
  @Column('int', { name:'status_id', nullable: false })
  statusId: number;

  @Column({ nullable: false, length: 60 })
  nome: string;

  @Column('int')
  ordem: number;

  @Column('varchar', { nullable: true, length: 100 })
  rota: string;

  @Column('varchar', { nullable: true, length: 100 })
  icone: string;
  
  @Column('varchar', { nullable: true, length: 100 })
  observacoes: string;
  
  @ManyToOne(() => TiposIten, tipoItem => tipoItem.menus, { nullable: true })
  @JoinColumn({ name: 'contexto_id' })
  tiposIten : TiposIten
  @Column('int', { name:'contexto_id', nullable: true })
  contextoId: number;

  @Column('jsonb', { nullable: true })
  options: {} | null;

  @CreateDateColumn({ name:'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name:'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name:'deleted_at' })
  deletedAt: Date;

  // relacionamentos
  @OneToMany(() => MenusPerfi, menu_perfil => menu_perfil.menus)
  menus_perfis: MenusPerfi[]
}

