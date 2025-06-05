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
import { Pessoa } from '../../pessoas/entities/pessoa.entity';
import { ProdutosGrupositen } from '../../produtos_grupositens/entities/produtos_grupositen.entity';
import { Anexo } from '../../anexos/entities/anexo.entity';
import { CotacoesIten } from '../../cotacoes_itens/entities/cotacoes_iten.entity';
import { PedidosIten } from '../../pedidos_itens/entities/pedidos_iten.entity';

@Entity({ name: 'produtos' })
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ nullable: false })
  uuid: UUID;

  @ManyToOne(() => Status, (status) => status.produtos, { nullable: false })
  @JoinColumn({ name: 'status_id' })
  status: Status;
  @Column('int', { name:'status_id', nullable: false })
  statusId: number;

  @ManyToOne(() => TiposIten, (tipo) => tipo.produtos, { nullable: false })
  @JoinColumn({ name: 'tipo_id' })
  tiposIten: TiposIten;
  @Column('int', { name:'tipo_id', nullable: false })
  tipoId: number;

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.produtos, { nullable: false })
  @JoinColumn({ name: 'empresa_id' })
  empresa: Pessoa;
  @Column('int', { name:'empresa_id', nullable: false })
  empresaId: number;

  @ManyToOne(() => TiposIten, (tipo) => tipo.produtos_unidadeMedida, {
    nullable: false,
  })
  @JoinColumn({ name: 'unidade_medida_id' })
  unidadesMedidas: TiposIten;
  @Column('int', { name:'unidade_medida_id', nullable: false })
  unidadeMedidaId: number;

  @Column('varchar', { nullable: false, length: 250 })
  produto: string;

  @Column('varchar', { nullable: true, length: 50 })
  marca: string;

  @Column('varchar', { nullable: true, length: 50 })
  modelo: string;

  @Column('varchar', { nullable: true, length: 50 })
  fabricante: string;

  @Column('varchar', { name: 'part_number', nullable: true, length: 10 })
  partNumber: string;

  @Column('varchar', { nullable: true, length: 10 })
  ncm: string;

  @Column('text', { nullable: true })
  caracteristicas: string;

  @Column('numeric', {
    name: 'custo_ultima_compra',
    nullable: true,
    precision: 12,
    scale: 4,
  })
  custoUltimaCompra: number;

  @Column('varchar', { nullable: true, length: 500 })
  observacoes: string;

  @CreateDateColumn({ name:'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name:'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name:'deleted_at' })
  deletedAt: Date;

  anexo?: Anexo;

  produtoFormatado?: string;

  @OneToMany(
    () => ProdutosGrupositen,
    (produtoGrupoitem) => produtoGrupoitem.produtos,
    { cascade: true },
  )
  produtosGrupositens: ProdutosGrupositen[];

  @OneToMany(
    () => CotacoesIten,
    (cotacaoItem) => cotacaoItem.produtos,
    { cascade: true },
  )
  cotacoesItens: CotacoesIten[];

  @OneToMany(
    () => PedidosIten,
    (pedido) => pedido.produtos,
  )
  pedidosItens: PedidosIten[];
}
