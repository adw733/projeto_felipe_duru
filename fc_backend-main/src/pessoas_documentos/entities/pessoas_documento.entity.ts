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
import { Tipo } from '../../tipos/entities/tipo.entity';
import { Grupo } from '../../grupos/entities/grupo.entity';
import { Evento } from '../../eventos/entities/evento.entity';
import { TiposIten } from '../../tipos_itens/entities/tipos_iten.entity';
import { Pessoa } from '../../pessoas/entities/pessoa.entity';

@Entity({ name: 'pessoas_documentos' })
export class PessoasDocumento {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(() => Status, status => status.pessoasDocumentos, { nullable: false })
  @JoinColumn({ name: 'status_id' })
  status: Status
  @Column('int', { name:'status_id', nullable: false })
  statusId: number;

  @ManyToOne(() => Pessoa, pessoa => pessoa.pessoasDocumentos, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE', orphanedRowAction: 'delete' })
  @JoinColumn({ name: 'pessoa_id' })
  pessoas: Pessoa
  @Column('int', { name:'pessoa_id', nullable: false })
  pessoaId: number;

  @ManyToOne(() => TiposIten, tipoIten => tipoIten.pessoasDocumentos, { nullable: false })
  @JoinColumn({ name: 'tipo_id' })
  tiposDocumento: TiposIten
  @Column('int', { name:'tipo_id', nullable: false })
  tipoId: number;

  @Column('varchar', { nullable: false, length: 30 })
  numero: string;

  @CreateDateColumn({ name:'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name:'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name:'deleted_at' })
  deletedAt: Date;

  // relacionamentos
  @OneToMany(() => Grupo, grupo => grupo.tiposIten)
  grupos: Tipo[]

  @OneToMany(() => Evento, evento => evento.tiposIten)
  eventos: Tipo[]
}


