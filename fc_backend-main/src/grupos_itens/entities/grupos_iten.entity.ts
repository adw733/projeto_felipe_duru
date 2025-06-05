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
import { TiposIten } from '../../tipos_itens/entities/tipos_iten.entity';
import { Grupo } from '../../grupos/entities/grupo.entity';
import { PessoasGruposIten } from '../../pessoas_grupos-itens/entities/pessoas_grupos-iten.entity';
import { ProdutosGrupositen } from '../../produtos_grupositens/entities/produtos_grupositen.entity';

@Entity({ name: 'grupos_itens' })
export class GruposIten {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(() => Status, (status) => status.gruposItens, { nullable: false })
  @JoinColumn({ name: 'status_id' })
  status: Status;
  @Column('int', { name:'status_id', nullable: false })
  statusId: number;

  @ManyToOne(() => Grupo, (estado) => estado.gruposItens, { nullable: false })
  @JoinColumn({ name: 'grupo_id' })
  grupos: Grupo;
  @Column('int', { name:'grupo_id', nullable: false })
  grupoId: number;

  @ManyToOne(() => TiposIten, (estado) => estado.gruposItens, {
    nullable: false,
  })
  @JoinColumn({ name: 'unidade_medida_id' })
  unidadesMedidas: TiposIten;
  @Column('int', { name:'unidade_medida_id', nullable: false })
  unidadeMedidaId: number;

  @Column('varchar', { nullable: false, length: 100 })
  nome: string;

  @Column('jsonb', { nullable: true })
  options: {} | null;

  @CreateDateColumn({ name:'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name:'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name:'deleted_at' })
  deletedAt: Date;

  // relacionamentos
  @OneToMany(() => PessoasGruposIten, (pessoa_grupo_item) => pessoa_grupo_item.gruposItens)
  pessoasGruposItens: PessoasGruposIten[];

  @OneToMany(() => ProdutosGrupositen, (produtoGrupoitem) => produtoGrupoitem.grupos_itens_id)
  produtosGrupositens: ProdutosGrupositen[];
}
