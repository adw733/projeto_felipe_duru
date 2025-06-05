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
import { PessoasPerfi } from '../../pessoas_perfis/entities/pessoas_perfi.entity';

@Entity({ name: 'perfis' })
export class Perfi {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(() => Status, (status) => status.perfis, { nullable: false })
  @JoinColumn({ name: 'status_id' })
  status: Status;
  @Column('int', { name:'status_id', nullable: false })
  statusId: number;

  @Column('varchar', { nullable: false, length: 60 })
  nome: string;

  @Column('jsonb', { nullable: true })
  options: {} | null;

  @CreateDateColumn({ name:'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name:'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name:'deleted_at' })
  deletedAt: Date;

  // relacionamentos
  @OneToMany(() => MenusPerfi, (menu_perfil) => menu_perfil.perfis)
  menus_perfis: MenusPerfi[];

  @OneToMany(() => PessoasPerfi, (pessoa_perfil) => pessoa_perfil.perfis)
  pessoasPerfis: PessoasPerfi[];
}
