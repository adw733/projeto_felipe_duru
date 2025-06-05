import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { SeederFactoryManager } from "typeorm-extension/dist/seeder";
import { Status } from "../../src/status/entities/status.entity";
import { Estado } from "../../src/estados/entities/estado.entity";
import { CreateEstadoDto } from "../../src/estados/dto/create-estado.dto";
import { Regioe } from "../../src/regioes/entities/regioe.entity";

export class estadosSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repository = dataSource.getRepository(Estado)

        const data: CreateEstadoDto[] = [
            { statusId: 2, regiaoId: 1, nome: 'Acre', nomeAlternativo: 'AC' },
            { statusId: 2, regiaoId: 2, nome: 'Alagoas', nomeAlternativo: 'AL' },
            { statusId: 2, regiaoId: 1, nome: 'Amapá', nomeAlternativo: 'AP' },
            { statusId: 2, regiaoId: 1, nome: 'Amazonas', nomeAlternativo: 'AM' },
            { statusId: 2, regiaoId: 2, nome: 'Bahia', nomeAlternativo: 'BA' },
            { statusId: 2, regiaoId: 2, nome: 'Ceará', nomeAlternativo: 'CE' },
            { statusId: 2, regiaoId: 4, nome: 'Espírito Santo', nomeAlternativo: 'ES' },
            { statusId: 2, regiaoId: 3, nome: 'Goiás / DF', nomeAlternativo: 'GO' },
            { statusId: 2, regiaoId: 2, nome: 'Maranhão', nomeAlternativo: 'MA' },
            { statusId: 2, regiaoId: 3, nome: 'Mato Grosso', nomeAlternativo: 'MT' },
            { statusId: 2, regiaoId: 3, nome: 'Mato Grosso do Sul', nomeAlternativo: 'MS' },
            { statusId: 2, regiaoId: 4, nome: 'Minas Gerais', nomeAlternativo: 'MG' },
            { statusId: 2, regiaoId: 1, nome: 'Pará', nomeAlternativo: 'PA' },
            { statusId: 2, regiaoId: 2, nome: 'Paraíba', nomeAlternativo: 'PB' },
            { statusId: 2, regiaoId: 5, nome: 'Paraná', nomeAlternativo: 'PR' },
            { statusId: 2, regiaoId: 2, nome: 'Pernambuco', nomeAlternativo: 'PE' },
            { statusId: 2, regiaoId: 2, nome: 'Piauí', nomeAlternativo: 'PI' },
            { statusId: 2, regiaoId: 4, nome: 'Rio de Janeiro', nomeAlternativo: 'RJ' },
            { statusId: 2, regiaoId: 2, nome: 'Rio Grande do Norte', nomeAlternativo: 'RN' },
            { statusId: 2, regiaoId: 5, nome: 'Rio Grande do Sul', nomeAlternativo: 'RS' },
            { statusId: 2, regiaoId: 1, nome: 'Rondônia', nomeAlternativo: 'RO' },
            { statusId: 2, regiaoId: 1, nome: 'Roraima', nomeAlternativo: 'RR' },
            { statusId: 2, regiaoId: 5, nome: 'Santa Catarina', nomeAlternativo: 'SC' },
            { statusId: 2, regiaoId: 4, nome: 'São Paulo', nomeAlternativo: 'SP' },
            { statusId: 2, regiaoId: 2, nome: 'Sergipe', nomeAlternativo: 'SE' },
            { statusId: 2, regiaoId: 1, nome: 'Tocantins', nomeAlternativo: 'TO' },
]

        const newData = repository.create(data) 

        // newData.forEach((oneData, i) => {
        //     const status = new Status()
        //     status.id = data[i].statusId
        //     oneData.status = status;

        //     const regioes = new Regioe()
        //     regioes.id = data[i].regiaoId
        //     oneData.regioes = regioes;
        // })

        await repository.save(newData)
    }
}