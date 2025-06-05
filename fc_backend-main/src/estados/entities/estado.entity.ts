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
import { Regioe } from '../../regioes/entities/regioe.entity';
import { Cidade } from '../../cidades/entities/cidade.entity';
import { PessoasEndereco } from '../../pessoas_enderecos/entities/pessoas_endereco.entity';

@Entity({ name: 'estados' })
export class Estado {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(() => Status, status => status.estados, { nullable: false })
  @JoinColumn({ name: 'status_id' })
  status: Status
  @Column('int', { name:'status_id', nullable: false })
  statusId: number;

  @ManyToOne(() => Regioe, regiao => regiao.estados, { nullable: false })
  @JoinColumn({ name: 'regiao_id' })
  regioes: Regioe
  @Column('int', { name:'regiao_id', nullable: false })
  regiaoId: number;

  @Column('varchar', { nullable: false, length: 60 })
  nome: string;

  @Column('varchar', { nullable: false, length: 2 })
  nomeAlternativo: string;

  @CreateDateColumn({ name:'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name:'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name:'deleted_at' })
  deletedAt: Date;

  // relacionamentos
  @OneToMany(() => Cidade, cidade => cidade.estados)
  cidades: Cidade[]

  @OneToMany(() => PessoasEndereco, pessoa_endereco => pessoa_endereco.estados)
  pessoasEnderecos: PessoasEndereco[]
}
