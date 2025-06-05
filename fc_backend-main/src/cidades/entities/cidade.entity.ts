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
import { Estado } from '../../estados/entities/estado.entity';
import { PessoasEndereco } from '../../pessoas_enderecos/entities/pessoas_endereco.entity';

@Entity({ name: 'cidades' })
export class Cidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(() => Status, status => status.cidades, { nullable: false })
  @JoinColumn({ name: 'status_id' })
  status: Status
  @Column('int', { name:'status_id', nullable: false })
  statusId: number;

  @ManyToOne(() => Estado, estado => estado.cidades, { nullable: false })
  @JoinColumn({ name: 'estado_id' })
  estados: Estado
  @Column('int', { name:'estado_id', nullable: false })
  estadoId: number;

  @Column('varchar', { nullable: false, length: 60 })
  nome: string;

  @CreateDateColumn({ name:'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name:'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name:'deleted_at' })
  deletedAt: Date;
  
  // relacionamentos
  @OneToMany(() => PessoasEndereco, pessoa_endereco => pessoa_endereco.cidades)
  pessoasEnderecos: PessoasEndereco[]
}
