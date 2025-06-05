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
import { Pessoa } from '../../pessoas/entities/pessoa.entity';
import { GruposIten } from '../../grupos_itens/entities/grupos_iten.entity';

@Entity({ name: 'pessoas_gruposItens' })
export class PessoasGruposIten {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(() => Status, status => status.pessoasGruposItens, { nullable: false })
  @JoinColumn({ name: 'status_id' })
  status: Status
  @Column('int', { name:'status_id', nullable: false })
  statusId: number;

  @ManyToOne(() => Pessoa, pessoa => pessoa.pessoasGruposItens, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE', orphanedRowAction: 'delete' })
  @JoinColumn({ name: 'pessoa_id' })
  pessoas: Pessoa
  @Column('int', { name:'pessoa_id', nullable: false })
  pessoaId: number;

  @ManyToOne(() => GruposIten, tipoIten => tipoIten.pessoasGruposItens, { nullable: false })
  @JoinColumn({ name: 'grupoitem_id' })
  gruposItens: GruposIten
  @Column('int', { name:'grupoitem_id', nullable: false })
  grupoitemId: number;
  
  @Column('varchar', { nullable: true, length: 50 })
  observacoes: string;

  @CreateDateColumn({ name:'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name:'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name:'deleted_at' })
  deletedAt: Date;
}


