import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { SeederFactoryManager } from "typeorm-extension/dist/seeder";
import { CreateRegioeDto } from "../../src/regioes/dto/create-regioe.dto";
import { Regioe } from "../../src/regioes/entities/regioe.entity";
import { Status } from "../../src/status/entities/status.entity";

export class regioesSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repository = dataSource.getRepository(Regioe)

        const data: CreateRegioeDto[] = [
            { statusId: 2, nome: 'Norte', nomeAlternativo: 'N' },
            { statusId: 2, nome: 'Nordeste', nomeAlternativo: 'NE' },
            { statusId: 2, nome: 'Centro-Oeste', nomeAlternativo: 'CO' },
            { statusId: 2, nome: 'Sudeste', nomeAlternativo: 'SE' },
            { statusId: 2, nome: 'Sul', nomeAlternativo: 'S' },
        ]

        const newData = repository.create(data) 

        // newData.forEach((oneData, i) => {
        //     const status = new Status()
        //     status.id = data[i].statusId
        //     oneData.status = status                   
        // })

        await repository.save(newData)
    }
}