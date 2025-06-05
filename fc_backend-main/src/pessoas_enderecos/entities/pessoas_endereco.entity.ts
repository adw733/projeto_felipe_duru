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
import { Estado } from '../../estados/entities/estado.entity';
import { Cidade } from '../../cidades/entities/cidade.entity';

@Entity({ name: 'pessoas_enderecos' })
export class PessoasEndereco {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(() => Status, status => status.pessoasEnderecos, { nullable: false })
  @JoinColumn({ name: 'status_id' })
  status: Status
  @Column('int', { name:'status_id', nullable: false })
  statusId: number;

  @ManyToOne(() => Pessoa, pessoa => pessoa.pessoasEnderecos, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE', orphanedRowAction: 'delete' })
  @JoinColumn({ name: 'pessoa_id' })
  pessoas: Pessoa
  @Column('int', { name:'pessoa_id', nullable: false })
  pessoaId: number;

  @ManyToOne(() => Estado, estado => estado.pessoasEnderecos, { nullable: false })
  @JoinColumn({ name: 'estado_id' })
  estados: Estado
  @Column('int', { name:'estado_id', nullable: false })
  estadoId: number;

  @ManyToOne(() => Cidade, cidade => cidade.pessoasEnderecos, { nullable: false })
  @JoinColumn({ name: 'cidade_id' })
  cidades: Cidade
  @Column('int', { name:'cidade_id', nullable: false })
  cidadeId: number;

  @Column('varchar', { nullable: false, length: 8 })
  cep: string;

  @Column('varchar', { nullable: false, length: 50 })
  pais: string;

  @Column('varchar', { nullable: false, length: 50 })
  bairro: string;

  @Column('varchar', { nullable: false, length: 50 })
  logradouro: string;

  @Column('varchar', { nullable: true, length: 10 })
  numero: string;

  @Column('varchar', { nullable: true, length: 50 })
  complemento: string;

  @CreateDateColumn({ name:'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name:'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name:'deleted_at' })
  deletedAt: Date;
}


