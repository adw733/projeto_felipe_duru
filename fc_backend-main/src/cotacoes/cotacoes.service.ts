import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  CreateCotacoeDto,
  VendedoresEncaminhar,
} from './dto/create-cotacoe.dto';
import { UpdateCotacoeDto } from './dto/update-cotacoe.dto';
import { CommonService } from '../common/common/common.service';
import {
  In,
  IsNull,
  LessThanOrEqual,
  MoreThanOrEqual,
  Not,
  Raw,
  Repository,
} from 'typeorm';
import { Cotacoe } from './entities/cotacoe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { TiposItensService } from '../tipos_itens/tipos_itens.service';
import { TiposIten } from '../tipos_itens/entities/tipos_iten.entity';
import dataSource from 'database/config';
import { PessoasEndereco } from '../pessoas_enderecos/entities/pessoas_endereco.entity';
import { PessoasEnderecosService } from '../pessoas_enderecos/pessoas_enderecos.service';
import { CotacoesItensService } from '../cotacoes_itens/cotacoes_itens.service';
import { CotacoesRespostasService } from '../cotacoes_respostas/cotacoes_respostas.service';
import { NotificacoesService } from '../notificacoes/notificacoes.service';
import { CreateNotificacoesUsuarioDto } from '../notificacoes_usuarios/dto/create-notificacoes_usuario.dto';

@Injectable()
export class CotacoesService {
  constructor(
    @InjectRepository(Cotacoe) private cotacaoRepository: Repository<Cotacoe>,
    private readonly commonService: CommonService,
    private tipoItemService: TiposItensService,
    private pessoaEnderecoService: PessoasEnderecosService,
    private cotacaoItemService: CotacoesItensService,
    private cotacaoRespostaService: CotacoesRespostasService,
    private notificacoesService: NotificacoesService,
  ) {}

  async create(req: Request, createCotacoeDto: CreateCotacoeDto) {
    const newCotacao: Cotacoe = this.cotacaoRepository.create(createCotacoeDto);

    const cotacao = await this.cotacaoRepository.save(newCotacao);
    return await this.findOne(req, cotacao.uuid);
  }

  async findAll(req: Request, params: any) {
    const empresaId = req['user'].empresaId;

    const tipo = await this.tipoItemService.findOneById(params.modalidadeId);

    let enderecoEmpresa: PessoasEndereco = {} as PessoasEndereco;
    let statusVendedor: Array<number> = [];
    if (tipo.nome === 'modalidadeVendas') {
      enderecoEmpresa = await this.pessoaEnderecoService.findOne(empresaId);
      statusVendedor = [2, 4, 5];
    }

    const empresaWhere =
      tipo.nome === 'modalidadeCompras'
        ? { empresaId: empresaId }
        : { empresaId: Not(empresaId) };

    const statusWhere = statusVendedor.length
      ? { statusId: In(statusVendedor) }
      : params.statusId
      ? { statusId: In(params.statusId) }
      : {};
    const prioridadesWhere = params.prioridadesId
      ? { prioridadeId: In(params.prioridadesId) }
      : {};
    const dataInicio = params.dataInicio
      ? { data: MoreThanOrEqual(params.dataInicio) }
      : {};
    const dataFim = params.dataFim
      ? { data: LessThanOrEqual(params.dataFim) }
      : {};

    const regioesWhere = enderecoEmpresa.id
      ? {
          regioes: Raw(
            (alias) =>
              `${alias} @> '${enderecoEmpresa.estados.regiaoId}' OR ${alias} ISNULL`,
          ),
        }
      : {};

    const [data, total] = await this.cotacaoRepository.findAndCount({
      relations: {
        solicitante: true,
        comprador: true,
        empresa: true,
        cotacoesItens: {
          cotacoesItensRespostas: true,
        },
      },
      where: [
        {
          id: params.idSearch,
          tipoId: params.tipoId,
          ...empresaWhere,
          ...statusWhere,
          ...prioridadesWhere,
          ...dataInicio,
          ...dataFim,
          ...regioesWhere,
        },
        {
          nome: this.commonService.UIlike(params.search || ''),
          tipoId: params.tipoId,
          ...empresaWhere,
          ...statusWhere,
          ...prioridadesWhere,
          ...dataInicio,
          ...dataFim,
          ...regioesWhere,
        },
        {
          centroCusto: this.commonService.UIlike(params.search || ''),
          tipoId: params.tipoId,
          ...empresaWhere,
          ...statusWhere,
          ...prioridadesWhere,
          ...dataInicio,
          ...dataFim,
          ...regioesWhere,
        },
        {
          solicitante: {
            nome: this.commonService.UIlike(params.search || ''),
          },
          tipoId: params.tipoId,
          ...empresaWhere,
          ...statusWhere,
          ...prioridadesWhere,
          ...dataInicio,
          ...dataFim,
          ...regioesWhere,
        },
        {
          solicitante: {
            nomeAlternativo: this.commonService.UIlike(params.search || ''),
          },
          tipoId: params.tipoId,
          ...empresaWhere,
          ...statusWhere,
          ...prioridadesWhere,
          ...dataInicio,
          ...dataFim,
          ...regioesWhere,
        },
        {
          comprador: {
            nome: this.commonService.UIlike(params.search || ''),
          },
          tipoId: params.tipoId,
          ...empresaWhere,
          ...statusWhere,
          ...prioridadesWhere,
          ...dataInicio,
          ...dataFim,
          ...regioesWhere,
        },
        {
          comprador: {
            nomeAlternativo: this.commonService.UIlike(params.search || ''),
          },
          tipoId: params.tipoId,
          ...empresaWhere,
          ...statusWhere,
          ...prioridadesWhere,
          ...dataInicio,
          ...dataFim,
        },
        {
          empresa: {
            nome: this.commonService.UIlike(params.search || ''),
          },
          tipoId: params.tipoId,
          ...empresaWhere,
          ...statusWhere,
          ...prioridadesWhere,
          ...dataInicio,
          ...dataFim,
          ...regioesWhere,
        },
        {
          empresa: {
            nomeAlternativo: this.commonService.UIlike(params.search || ''),
          },
          tipoId: params.tipoId,
          ...empresaWhere,
          ...statusWhere,
          ...prioridadesWhere,
          ...dataInicio,
          ...dataFim,
          ...regioesWhere,
        },
        {
          cotacoesItens: {
            produtos: {
              produto: this.commonService.UIlike(params.search || ''),
            },
          },
          tipoId: params.tipoId,
          ...empresaWhere,
          ...statusWhere,
          ...prioridadesWhere,
          ...dataInicio,
          ...dataFim,
          ...regioesWhere,
        },
        {
          cotacoesItens: {
            produtos: {
              marca: this.commonService.UIlike(params.search || ''),
            },
          },
          tipoId: params.tipoId,
          ...empresaWhere,
          ...statusWhere,
          ...prioridadesWhere,
          ...dataInicio,
          ...dataFim,
          ...regioesWhere,
        },
        {
          cotacoesItens: {
            produtos: {
              modelo: this.commonService.UIlike(params.search || ''),
            },
          },
          tipoId: params.tipoId,
          ...empresaWhere,
          ...statusWhere,
          ...prioridadesWhere,
          ...dataInicio,
          ...dataFim,
          ...regioesWhere,
        },
        {
          cotacoesItens: {
            produtos: {
              ncm: this.commonService.UIlike(params.search || ''),
            },
          },
          tipoId: params.tipoId,
          ...empresaWhere,
          ...statusWhere,
          ...prioridadesWhere,
          ...dataInicio,
          ...dataFim,
          ...regioesWhere,
        },
        {
          cotacoesItens: {
            produtos: {
              partNumber: this.commonService.UIlike(params.search || ''),
            },
          },
          tipoId: params.tipoId,
          ...empresaWhere,
          ...statusWhere,
          ...prioridadesWhere,
          ...dataInicio,
          ...dataFim,
          ...regioesWhere,
        },
      ],
      order: {
        id: 'ASC',
        data: 'ASC',
      },
      take: params.take,
      skip: params.skip,
      withDeleted: false,
    });

    for (const cotacao of data) {
      cotacao.quantidadeRespostas = 0;
    }

    return { data, total };
  }

  async findOne(req: Request, uuid: UUID, params?: any) {
    const empresaId = req['user'].empresaId;

    let tipo: TiposIten = {} as TiposIten;
    if (params?.modalidadeId) {
      tipo = await this.tipoItemService.findOneById(params.modalidadeId);
    }

    const isCompras =
      !params?.modalidadeId || tipo?.nome === 'modalidadeCompras';

    const cotacao = await this.cotacaoRepository.findOne({
      relations: {
        solicitante: true,
        comprador: true,
        empresa: true,
      },
      where: {
        uuid,
      },
      order: {
        id: 'ASC',
        data: 'ASC',
      },
      withDeleted: false,
    });

    cotacao.cotacoesItens = await this.cotacaoItemService.getByCotacao(
      cotacao.id,
      isCompras,
      empresaId,
    );
    cotacao.cotacoesRespostas = await this.cotacaoRespostaService.getByCotacao(
      cotacao.id,
      isCompras,
      empresaId,
    );

    cotacao.quantidadeRespostas = 0;

    return cotacao;
  }

  async update(req: Request, uuid: UUID, updateCotacoeDto: UpdateCotacoeDto) {
    const cotacao = await this.findOne(req, uuid);
    const empresaId = req['user'].empresaId;
    if (
      empresaId !== updateCotacoeDto.empresaId &&
      updateCotacoeDto.cotacoesRespostas.length
    ) {
      await this.cotacaoRespostaService.create(
        updateCotacoeDto.cotacoesRespostas,
      );
    } else {
      const newCotacao: Cotacoe =
        this.cotacaoRepository.create(updateCotacoeDto);
      await this.cotacaoRepository.save(newCotacao);
    }

    return await this.findOne(req, uuid);
  }

  async encaminhar(
    req: Request,
    uuid: UUID,
    updateCotacoeDto: UpdateCotacoeDto,
  ) {
    const cotacao = await this.findOne(req, uuid);
    cotacao.statusId = updateCotacoeDto.statusId;
    cotacao.dataEncaminhada = new Date();

    const empresaId = req['user'].empresaId;
    if (empresaId === updateCotacoeDto.empresaId) {
      const newCotacao: Cotacoe = this.cotacaoRepository.create(cotacao);
      await this.cotacaoRepository.save(newCotacao);
    }

    const vendedores: Array<VendedoresEncaminhar> = await this.cotacaoRepository
      .query(`
    SELECT distinct
    	b.nome, b.nome_alternativo as "nomeAlternativo", j.id as "vendedorId", j.nome as "vendedorNome", j.nome_alternativo as "vendedorNomeAlternativo", l.url, i.regiao_id as "regiaoId"
    	FROM cotacoes as a
    	INNER JOIN pessoas as b ON b.id = a.empresa_id
    	INNER JOIN cotacoes_itens as c ON c.cotacao_id = a.id
    	INNER JOIN produtos_grupositens as d ON d.produto_id = c.produto_id
    	INNER JOIN grupos_itens as e ON e.id = d.grupoitem_id
    	INNER JOIN "pessoas_gruposItens" as f ON f.grupoitem_id = e.id
    	INNER JOIN pessoas_empresas as g ON g.empresa_id = f.pessoa_id
    	INNER JOIN pessoas_enderecos as h ON h.pessoa_id = g.empresa_id
    	INNER JOIN estados as i ON i.id = h.estado_id
    	INNER JOIN pessoas as j ON j.id = g.pessoa_id
    	INNER JOIN pessoas_perfis as k ON k.pessoa_id = j.id
    	LEFT OUTER JOIN anexos as l ON b.id = l. registro_id AND l.tipo_id = 1301 AND l.deleted_at ISNULL
    WHERE f.pessoa_id <> ${cotacao.empresaId}
    AND a.id = ${cotacao.id}
    AND (a.regioes ISNULL OR (translate(a.regioes::jsonb::text, '[]', '{}')::int[]) @> ARRAY[i.regiao_id])
    AND k.perfil_id IN (3,5)
    `);

    if (vendedores.length) {
      const notificacaoUsuarios: Array<CreateNotificacoesUsuarioDto> =
        vendedores.map((vendedor: VendedoresEncaminhar) => {
          return {
            pessoaId: vendedor.vendedorId,
            lida: false,
          };
        });

      await this.notificacoesService.create(req, {
        statusId: 2,
        titulo: 'Nova Cotação',
        mensagem: `Uma nova cotação da empresa ${
          vendedores[0].nomeAlternativo || vendedores[0].nome
        }`,
        data: new Date(),
        link: `/cotacoes/${cotacao.uuid}`,
        imagem:
          vendedores[0].url ||
          'https://randomuser.me/api/portraits/women/85.jpg',
        notificacoesUsuarios: notificacaoUsuarios,
      });
    }

    return await this.findOne(req, uuid);
  }

  async aprovacao(
    req: Request,
    uuid: UUID,
    updateCotacoeDto: UpdateCotacoeDto,
  ) {
    const cotacao = await this.findOne(req, uuid);
    cotacao.statusId = updateCotacoeDto.statusId;

    const empresaId = req['user'].empresaId;
    if (empresaId === updateCotacoeDto.empresaId) {
      const newCotacao: Cotacoe = this.cotacaoRepository.create(cotacao);
      await this.cotacaoRepository.save(newCotacao);
    }

    return await this.findOne(req, uuid);
  }

  async reprova(req: Request, uuid: UUID, updateCotacoeDto: UpdateCotacoeDto) {
    const cotacao = await this.findOne(req, uuid);
    cotacao.statusId = updateCotacoeDto.statusId;

    const empresaId = req['user'].empresaId;
    if (empresaId === updateCotacoeDto.empresaId) {
      const newCotacao: Cotacoe = this.cotacaoRepository.create(cotacao);
      await this.cotacaoRepository.save(newCotacao);
    }

    return await this.findOne(req, uuid);
  }

  async gerarpedido(
    req: Request,
    uuid: UUID,
    updateCotacoeDto: UpdateCotacoeDto,
  ) {
    const cotacao = await this.findOne(req, uuid);
    const empresaId = req['user'].empresaId;
    if (
      empresaId !== updateCotacoeDto.empresaId &&
      updateCotacoeDto.cotacoesRespostas.length
    ) {
      await this.cotacaoRespostaService.create(
        updateCotacoeDto.cotacoesRespostas,
      );
    } else {
      const newCotacao: Cotacoe =
        this.cotacaoRepository.create(updateCotacoeDto);
      await this.cotacaoRepository.save(newCotacao);
    }

    return await this.findOne(req, uuid);
  }

  remove(id: number) {
    return `This action removes a #${id} cotacoe`;
  }
}
