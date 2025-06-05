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

@Entity({ name: 'pessoas_senhas' })
export class PessoasSenha {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(() => Status, status => status.pessoasSenhas, { nullable: false })
  @JoinColumn({ name: 'status_id' })
  status: Status
  @Column('int', { name:'status_id', nullable: false })
  statusId: number;

  @ManyToOne(() => Pessoa, pessoa => pessoa.pessoasSenhas, { nullable: false })
  @JoinColumn({ name: 'pessoa_id' })
  pessoasSenhas: Pessoa
  @Column('int', { name:'pessoa_id', nullable: false })
  pessoaId: number;

  @Column('varchar', { nullable: false })
  senha: string;

  @Column('timestamptz', { name:'data_troca', nullable: true })
  dataTroca: string;

  @CreateDateColumn({ name:'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name:'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name:'deleted_at' })
  deletedAt: Date;
}


