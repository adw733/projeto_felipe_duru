import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { SeederFactoryManager } from "typeorm-extension/dist/seeder";
import { Status } from "../../src/status/entities/status.entity";
import { TiposIten } from "../../src/tipos_itens/entities/tipos_iten.entity";
import { CreatePessoaDto } from "../../src/pessoas/dto/create-pessoa.dto";
import { Pessoa } from "../../src/pessoas/entities/pessoa.entity";

export class pessoasSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repository = dataSource.getRepository(Pessoa)

        const data: CreatePessoaDto[] = [
            { statusId: 2, tipoId: 101, formatoJuridicoId: 201, regimeTributarioId: 251, porteId: 274, nome: 'Razão social da empresa 1', fantasia: 'Nome fantasia 1', dataNascimento: '1955-08-12', isFornecedor: true, areaAtuacao: 'Venda de televisores' },
            { statusId: 2, tipoId: 101, formatoJuridicoId: 201, regimeTributarioId: 251, porteId: 274, nome: 'Razão social da empresa 2', fantasia: 'Nome fantasia 2', dataNascimento: '1955-08-12', isFornecedor: true, areaAtuacao: 'Venda de computadores' },
            { statusId: 2, tipoId: 101, formatoJuridicoId: 201, regimeTributarioId: 251, porteId: 274, nome: 'Razão social da empresa 3', fantasia: 'Nome fantasia 3', dataNascimento: '1955-08-12', isFornecedor: true, areaAtuacao: 'Venda de revistas' },
            { statusId: 2, tipoId: 101, formatoJuridicoId: 201, regimeTributarioId: 251, porteId: 274, nome: 'Razão social da empresa 4', fantasia: 'Nome fantasia 4', dataNascimento: '1955-08-12', isFornecedor: true, areaAtuacao: 'Venda de mouses' },
            { statusId: 2, tipoId: 101, formatoJuridicoId: 201, regimeTributarioId: 251, porteId: 274, nome: 'Razão social da empresa 5', fantasia: 'Nome fantasia 5', dataNascimento: '1955-08-12', isFornecedor: false, areaAtuacao: 'Venda de óculos' },

            { statusId: 2, tipoId: 102, formatoJuridicoId: null, regimeTributarioId: null, porteId: null, nome: 'Nome do Gerente Compras', fantasia: 'Colaborador Gerente Compras', dataNascimento: '1998-02-12', isFornecedor: null, areaAtuacao: null },
            { statusId: 2, tipoId: 102, formatoJuridicoId: null, regimeTributarioId: null, porteId: null, nome: 'Nome do Gerente Vendas', fantasia: 'Colaborador Gerente Vendas', dataNascimento: '1998-02-12', isFornecedor: null, areaAtuacao: null },
            { statusId: 2, tipoId: 102, formatoJuridicoId: null, regimeTributarioId: null, porteId: null, nome: 'Nome do Comprador', fantasia: 'Colaborador Comprador', dataNascimento: '1998-03-12', isFornecedor: null, areaAtuacao: null },
            { statusId: 2, tipoId: 102, formatoJuridicoId: null, regimeTributarioId: null, porteId: null, nome: 'Nome do Vendedor', fantasia: 'Colaborador Vendedor', dataNascimento: '1998-04-12', isFornecedor: null, areaAtuacao: null },
            { statusId: 2, tipoId: 102, formatoJuridicoId: null, regimeTributarioId: null, porteId: null, nome: 'Nome do Solicitante', fantasia: 'Colaborador Solicitante', dataNascimento: '1998-05-12', isFornecedor: null, areaAtuacao: null },
        ]

        const newData = repository.create(data) 

        // newData.forEach((oneData, i) => {
        //     const status = new Status()
        //     status.id = data[i].statusId
        //     oneData.status = status;

        //     const tiposPessoa = new TiposIten()
        //     tiposPessoa.id = data[i].tipoId
        //     oneData.tiposPessoa = tiposPessoa;

        //     const formatosJuridicos = new TiposIten()
        //     formatosJuridicos.id = data[i].formato_juridico_id
        //     oneData.formatosJuridicos = formatosJuridicos;

        //     const regimesTributarios = new TiposIten()
        //     regimesTributarios.id = data[i].regime_tributario_id
        //     oneData.regimesTributarios = regimesTributarios;

        //     const portesEmpresa = new TiposIten()
        //     portesEmpresa.id = data[i].porte_id
        //     oneData.portesEmpresa = portesEmpresa;
        // })

        await repository.save(newData)
    }
}