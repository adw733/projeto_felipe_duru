import { Injectable } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { In, Repository } from 'typeorm';
import { Status } from '../status/entities/status.entity';
import { UUID } from 'crypto';
import { TiposItensService } from '../tipos_itens/tipos_itens.service';
import { CommonService } from '../common/common/common.service';
import { AnexosService } from '../anexos/anexos.service';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa) private pessoasRepository: Repository<Pessoa>,
    private anexoService: AnexosService,
    private readonly commonService: CommonService,
  ) {}

  create(createPessoaDto: CreatePessoaDto) {
    return 'This action adds a new pessoa';
  }

  findAll() {
    return `This action returns all pessoas`;
  }

  async findAllFornecedores(req: Request, params: any) {
    const tipoGrupoId = params.tipoGrupoId
      ? {
          pessoasGruposItens: {
            gruposItens: {
              grupos: {
                tipoId: params.tipoGrupoId,
              },
            },
          },
        }
      : {};

    const estadosIds = params.estadosIds
      ? {
          pessoasEnderecos: {
            estadoId: In(params.estadosIds),
          },
        }
      : {};

    const cidadesIds = params.cidadesIds
      ? {
          pessoasEnderecos: {
            cidadeId: In(params.cidadesIds),
          },
        }
      : {};

    const [data, total] = await this.pessoasRepository.findAndCount({
      relations: {
        pessoasEnderecos: true,
        pessoasGruposItens: true,
        pessoasSites: true,
      },
      where: [
        {
          id: params.idSearch,
          tipoId: 101,
          isFornecedor: true,
          ...tipoGrupoId,
          ...estadosIds,
          ...cidadesIds,
        },
        {
          nome: this.commonService.UIlike(params.search || ''),
          tipoId: 101,
          isFornecedor: true,
          ...tipoGrupoId,
          ...estadosIds,
          ...cidadesIds,
        },
        {
          nomeAlternativo: this.commonService.UIlike(params.search || ''),
          tipoId: 101,
          isFornecedor: true,
          ...tipoGrupoId,
          ...estadosIds,
          ...cidadesIds,
        },
        {
          pessoasGruposItens: {
            gruposItens: {
              nome: this.commonService.UIlike(params.search || ''),
            },
          },
          tipoId: 101,
          isFornecedor: true,
          ...tipoGrupoId,
          ...estadosIds,
          ...cidadesIds,
        },
      ],
      order: {
        id: 'ASC',
        nome: 'ASC',
        nomeAlternativo: 'ASC',
      },
      take: params.take,
      skip: params.skip,
      withDeleted: false,
    });

    for(const fornecedor of data) {
      fornecedor.anexo = await this.anexoService.findOne(fornecedor.id, 1301);
    }

    return { data, total };
  }

  async findAllIntegrantes(req: Request, params: any) {
    const empresaId = req['user'].empresaId;

    const [data, total] = await this.pessoasRepository.findAndCount({
      relations: {
        pessoasEmpresas: true,
      },
      where: [
        {
          id: params.idSearch,
          tipoId: 102,
          pessoasEmpresas: {
            empresaId,
          },
        },
        {
          nome: this.commonService.UIlike(params.search || ''),
          tipoId: 102,
          pessoasEmpresas: {
            empresaId,
          },
        },
        {
          nomeAlternativo: this.commonService.UIlike(params.search || ''),
          tipoId: 102,
          pessoasEmpresas: {
            empresaId,
          },
        },
      ],
      order: {
        id: 'ASC',
        nome: 'ASC',
        nomeAlternativo: 'ASC',
      },
      take: params.take,
      skip: params.skip,
      withDeleted: false,
    });

    for(const integrante of data) {
      integrante.anexo = await this.anexoService.findOne(integrante.id, 1301);
    }

    return { data, total };
  }

  async findOneIntegrante(req: Request, uuid: UUID) {
    const empresaId = req['user'].empresaId;

    const data = await this.pessoasRepository.findOne({
      select: {
        pessoasEmpresas: {},
      },
      relations: {
        pessoasEmpresas: true,
        pessoasEmails: true,
        pessoasPerfis: true,
        pessoasTelefones: true,
      },
      where: {
        uuid,
        pessoasEmpresas: {
          empresaId,
        },
      },
    });

    return data;
  }

  findOne(id: number) {
    return this.pessoasRepository.findOneOrFail({
      where: { id },
    });
  }

  async findOneEmpresa(id: number) {
    return await this.pessoasRepository.findOne({
      select: {
        pessoasDocumentos: {
          id: true,
          numero: true,
          statusId: true,
          tipoId: true,
        },
        pessoasTelefones: {
          id: true,
          numero: true,
          statusId: true,
          tipoId: true,
        },
        pessoasEnderecos: {
          id: true,
          logradouro: true,
          numero: true,
          bairro: true,
          cep: true,
          complemento: true,
          pais: true,
          statusId: true,
          estadoId: true,
          cidadeId: true,
        },
        pessoasEmails: {
          id: true,
          email: true,
          isAtivo: true,
        },
        pessoasSites: {
          id: true,
          site: true,
        },
        pessoasPerfis: {
          id: true,
          perfilId: true,
        },
        pessoasGruposItens: {
          id: true,
          grupoitemId: true,
        },
        pessoasEmpresas: {
          empresaId: true,
        },
      },
      relations: {
        pessoasDocumentos: true,
        pessoasTelefones: true,
        pessoasEnderecos: true,
        pessoasEmails: true,
        pessoasSites: true,
        pessoasPerfis: true,
        pessoasGruposItens: true,
        pessoasEmpresas: true,
      },
      where: {
        id,
      },
    });
  }

  async findOnePerfil(id: number) {
    const pessoa = await this.pessoasRepository.findOne({
      relations: {
        pessoasDocumentos: true,
        pessoasTelefones: true,
        pessoasEnderecos: true,
        pessoasEmails: true,
        pessoasSites: true,
        pessoasPerfis: true,
        pessoasGruposItens: true,
        pessoasEmpresas: true,
      },
      where: {
        id,
      },
    });

    // const isPessoaFisica = pessoa.tipoId == tipoPessoaFisicaId.id;
    //? pegar anexo tipo dinamico
    const anexo = await this.anexoService.findOne(pessoa.id, 1301);
    if(anexo) {
      pessoa.anexo = anexo
    }

    let empresaId = pessoa.pessoasEmpresas[0]?.empresaId || null;
    let empresa = null;

    if (empresaId) {
      empresa = await this.findOneEmpresa(empresaId);
    }

    return { pessoa, empresa };
  }

  async update(updatePessoaDto: UpdatePessoaDto) {
    const pessoa: Pessoa = this.pessoasRepository.create(updatePessoaDto);

    await this.pessoasRepository.save(pessoa);
    return await this.findOnePerfil(pessoa.id);
  }

  async createIntegrante(req: Request, createPessoaDto: CreatePessoaDto) {
    const newPessoa: Pessoa = this.pessoasRepository.create(createPessoaDto);

    const pessoa = await this.pessoasRepository.save(newPessoa);
    return await this.findOneIntegrante(req, pessoa.uuid);
  }
  async updateIntegrante(req: Request, updatePessoaDto: UpdatePessoaDto) {
    const pessoa: Pessoa = this.pessoasRepository.create(updatePessoaDto);

    await this.pessoasRepository.save(pessoa);
    return await this.findOneIntegrante(req, pessoa.uuid);
  }

  remove(id: number) {
    return `This action removes a #${id} pessoa`;
  }
}
