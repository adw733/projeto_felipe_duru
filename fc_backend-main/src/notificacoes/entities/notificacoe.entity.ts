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
import { NotificacoesUsuario } from '../../notificacoes_usuarios/entities/notificacoes_usuario.entity';

@Entity({ name: 'notificacoes' })
export class Notificacoe {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(() => Status, (status) => status.notificacoes, { nullable: false })
  @JoinColumn({ name: 'status_id' })
  status: Status;
  @Column('int', { name: 'status_id', nullable: false })
  statusId: number;

  @Column('varchar', { nullable: false, length: 100 })
  titulo: string;

  @Column({ nullable: false })
  mensagem: string;

  @Column('timestamptz', { name: 'data', nullable: false })
  data: Date;

  @Column('varchar', { nullable: false, length: 200 })
  link: string;

  @Column('varchar', { nullable: false, length: 200 })
  imagem: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  // relacionamentos
  @OneToMany(
    () => NotificacoesUsuario,
    (notificacaoUsuario) => notificacaoUsuario.notificacao,
    { cascade: true },
  )
  notificacoesUsuarios: NotificacoesUsuario[];
}
