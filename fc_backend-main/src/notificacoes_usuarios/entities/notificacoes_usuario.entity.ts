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
import { Notificacoe } from '../../notificacoes/entities/notificacoe.entity';
import { Pessoa } from '../../pessoas/entities/pessoa.entity';

@Entity({ name: 'notificacoes_usuarios' })
export class NotificacoesUsuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(
    () => Notificacoe,
    (notificacao) => notificacao.notificacoesUsuarios,
    {
      nullable: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      orphanedRowAction: 'delete',
    },
  )
  @JoinColumn({ name: 'notificacao_id' })
  notificacao: Notificacoe;
  @Column('int', { name: 'notificacao_id', nullable: false })
  notificacaoId: number;

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.notificacoesUsuarios, {
    nullable: false,
  })
  @JoinColumn({ name: 'pessoa_id' })
  pessoa: Pessoa;
  @Column('int', { name: 'pessoa_id', nullable: false })
  pessoaId: number;

  @Column('bool', { nullable: false, default: false })
  lida: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
