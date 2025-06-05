import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CommonService } from '../common/common/common.service';
import { Status } from '../status/entities/status.entity';
import { TiposIten } from '../tipos_itens/entities/tipos_iten.entity';
import { Pessoa } from '../pessoas/entities/pessoa.entity';
import { ProdutosGrupositensService } from '../produtos_grupositens/produtos_grupositens.service';
import { CreateProdutosGrupositenDto } from '../produtos_grupositens/dto/create-produtos_grupositen.dto';
import { UUID } from 'crypto';
import { UpdateGruposItenDto } from '../grupos_itens/dto/update-grupos_iten.dto';
import { AnexosService } from '../anexos/anexos.service';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto) private produtoRepository: Repository<Produto>,
    private readonly commonService: CommonService,
    private readonly produtoGrupoitemService: ProdutosGrupositensService,
    private readonly anexoService: AnexosService,
  ) {}

  async create(req: Request, createProdutoDto: CreateProdutoDto) {
    const empresaId = req['user'].empresaId;
    const newProduto: Produto = this.produtoRepository.create(createProdutoDto);
    newProduto.empresaId = empresaId;

    const produto = await this.produtoRepository.save(newProduto);

    return await this.findOne(produto.uuid);
  }

  async findAll(req: Request, params: any) {
    const empresaId = req['user'].empresaId;

    const [data, total] = await this.produtoRepository.findAndCount({
      relations: {
        produtosGrupositens: true,
      },
      where: [
        {
          id: params.idSearch,
          tipoId: params.tipoId,
          empresa: {
            id: empresaId,
          },
        },
        {
          produto: this.commonService.UIlike(params.search || ''),
          tipoId: params.tipoId,
          empresa: {
            id: empresaId,
          },
        },
        {
          marca: this.commonService.UIlike(params.search || ''),
          tipoId: params.tipoId,
          empresa: {
            id: empresaId,
          },
        },
        {
          modelo: this.commonService.UIlike(params.search || ''),
          tipoId: params.tipoId,
          empresa: {
            id: empresaId,
          },
        },
        {
          fabricante: this.commonService.UIlike(params.search || ''),
          tipoId: params.tipoId,
          empresa: {
            id: empresaId,
          },
        },
        {
          partNumber: this.commonService.UIlike(params.search || ''),
          tipoId: params.tipoId,
          empresa: {
            id: empresaId,
          },
        },
        {
          ncm: this.commonService.UIlike(params.search || ''),
          tipoId: params.tipoId,
          empresa: {
            id: empresaId,
          },
        },
        {
          produtosGrupositens: {
            grupos_itens_id: {
              nome: this.commonService.UIlike(params.search || ''),
            },
          },
          tipoId: params.tipoId,
          empresa: {
            id: empresaId,
          },
        },
      ],
      order: {
        id: 'ASC',
        produto: 'ASC',
      },
      take: params.take,
      skip: params.skip,
      withDeleted: false,
    });

    for (const produto of data) {
      produto.anexo = await this.anexoService.findOne(produto.id, 1305);
    }

    return { data, total };
  }

  async findOne(uuid: UUID) {
    const produto = await this.produtoRepository.findOneOrFail({
      select: {
        produtosGrupositens: true,
      },
      relations: {
        produtosGrupositens: true,
      },
      where: {
        uuid,
      },
    });

    produto.anexo = await this.anexoService.findOne(produto.id, 1305);

    return produto;
  }

  async update(req: Request, uuid: UUID, updateProdutoDto: UpdateProdutoDto) {
    const produto = await this.findOne(uuid);
    const empresaId = req['user'].empresaId;
    if (empresaId !== produto.empresaId) {
      throw new UnauthorizedException(
        'Você não tem permissão para alterar o produto de outra empresa',
      );
    }

    const newProduto: Produto = this.produtoRepository.create(updateProdutoDto);

    // const grupositens: CreateProdutosGrupositenDto[] = newProduto.produtosGrupositens;
    // delete newProduto.produtosGrupositens;
    await this.produtoRepository.save(newProduto);
    // await this.produtoGrupoitemService.update(produto.id, grupositens);

    return await this.findOne(uuid);
  }

  async findAutocomplete(req: Request, search: string, tipoId: number) {
    const empresaId = req['user'].empresaId;

    const data = await this.produtoRepository.find({
      relations: {
        produtosGrupositens: true,
      },
      where: [
        {
          produto: this.commonService.UIlike(search || ''),
          tipoId,
          empresa: {
            id: empresaId,
          },
        },
        {
          marca: this.commonService.UIlike(search || ''),
          tipoId,
          empresa: {
            id: empresaId,
          },
        },
        {
          modelo: this.commonService.UIlike(search || ''),
          tipoId,
          empresa: {
            id: empresaId,
          },
        },
        {
          fabricante: this.commonService.UIlike(search || ''),
          tipoId,
          empresa: {
            id: empresaId,
          },
        },
        {
          partNumber: this.commonService.UIlike(search || ''),
          tipoId,
          empresa: {
            id: empresaId,
          },
        },
        {
          ncm: this.commonService.UIlike(search || ''),
          tipoId,
          empresa: {
            id: empresaId,
          },
        },
        {
          produtosGrupositens: {
            grupos_itens_id: {
              nome: this.commonService.UIlike(search || ''),
            },
          },
          tipoId,
          empresa: {
            id: empresaId,
          },
        },
      ],
    });

    return data;
  }

  remove(id: number) {
    return `This action removes a #${id} produto`;
  }
}
