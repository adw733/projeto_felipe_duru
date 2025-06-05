import { UUID } from "crypto";
import { Status } from "../../../src/status/entities/status.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Pessoa } from "../../../src/pessoas/entities/pessoa.entity";

@Entity({ name: 'convites' })
export class Convite {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(() => Status, status => status.convites, { nullable: false })
  @JoinColumn({ name: 'status_id' })
  status: Status
  @Column('int', { name:'status_id', nullable: false })
  statusId: number;

  @ManyToOne(() => Pessoa, pessoa => pessoa.convites, { nullable: false })
  @JoinColumn({ name: 'pessoa_id' })
  pessoas: Pessoa
  @Column('int', { name:'pessoa_id', nullable: false })
  pessoaId: number;

  @Column('varchar', { name: 'nome_empresa', nullable: false, length: 100 })
  nomeEmpresa: string;

  @Column('varchar', { name: 'documento_empresa', nullable: false, length: 30 })
  documentoEmpresa: string;

  @Column('varchar', { name: 'nome_contato', nullable: false, length: 60 })
  nomeContato: string;

  @Column('varchar', { name: 'email_contato', nullable: false, length: 100 })
  emailContato: string;

  @Column('varchar', { name: 'celular_contato', nullable: false, length: 11 })
  celularContato: string;

  @CreateDateColumn({ name:'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name:'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name:'deleted_at' })
  deletedAt: Date;
}
