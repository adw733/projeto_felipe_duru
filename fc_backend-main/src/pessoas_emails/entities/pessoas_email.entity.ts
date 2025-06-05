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
import { Pessoa } from '../../pessoas/entities/pessoa.entity';

@Entity({ name: 'pessoas_emails' })
export class PessoasEmail {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(() => Pessoa, pessoa => pessoa.pessoasEmails, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE', orphanedRowAction: 'delete' })
  @JoinColumn({ name: 'pessoa_id' })
  pessoas: Pessoa
  @Column('int', { name:'pessoa_id', nullable: false })
  pessoaId: number;

  @Column('varchar', { nullable: false, length: 80 })
  email: string;

  @Column('boolean', { name:'is_ativo', nullable: false })
  isAtivo: boolean;

  @CreateDateColumn({ name:'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name:'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name:'deleted_at' })
  deletedAt: Date;
}


