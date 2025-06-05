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
import { Menu } from '../../menus/entities/menu.entity';
import { Perfi } from '../../perfis/entities/perfi.entity';

@Entity({ name: 'menus_perfis' })
export class MenusPerfi {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(() => Status, status => status.menus_perfis, { nullable: false })
  @JoinColumn({ name: 'status_id' })
  status: Status
  @Column('int', { name:'status_id', nullable: false })
  statusId: number;

  @ManyToOne(() => Menu, menus => menus.menus_perfis, { nullable: false })
  @JoinColumn({ name: 'menu_id' })
  menus: Menu
  @Column('int', { name:'menu_id', nullable: false })
  menuId: number;

  @ManyToOne(() => Perfi, perfis => perfis.menus_perfis, { nullable: true })
  @JoinColumn({ name: 'perfil_id' })
  perfis: Perfi
  @Column('int', { name:'perfil_id', nullable: true })
  perfilId: number;

  @Column('varchar', {  nullable: true, length: 100 })
  observacoes: string

  @CreateDateColumn({ name:'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name:'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name:'deleted_at' })
  deletedAt: Date;
}

