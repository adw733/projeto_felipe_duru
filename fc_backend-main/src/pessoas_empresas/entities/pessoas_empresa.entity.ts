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

@Entity({ name: 'pessoas_empresas' })
export class PessoasEmpresa {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(() => Status, status => status.pessoasEmpresas, { nullable: false })
  @JoinColumn({ name: 'status_id' })
  status: Status
  @Column('int', { name:'status_id', nullable: false })
  statusId: number;

  @ManyToOne(() => Pessoa, pessoa => pessoa.pessoasEmpresas, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE', orphanedRowAction: 'delete'  })
  @JoinColumn({ name: 'pessoa_id' })
  pessoasEmpresas: Pessoa
  @Column('int', { name:'pessoa_id', nullable: false })
  pessoaId: number;

  @ManyToOne(() => Pessoa, pessoa => pessoa.pessoasColaboradores, { nullable: false })
  @JoinColumn({ name: 'empresa_id' })
  pessoasColaboradores: Pessoa
  @Column('int', { name:'empresa_id', nullable: false })
  empresaId: number;
  
  @Column('varchar', { nullable: true, length: 50 })
  observacoes: string;

  @CreateDateColumn({ name:'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name:'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name:'deleted_at' })
  deletedAt: Date;
}


