import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { SeederFactoryManager } from "typeorm-extension/dist/seeder";
import { Status } from "../../src/status/entities/status.entity";
import { Perfi } from "../../src/perfis/entities/perfi.entity";
import { CreatePerfiDto } from "../../src/perfis/dto/create-perfi.dto";

export class perfisSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repository = dataSource.getRepository(Perfi)

        const data: CreatePerfiDto[] = [
            { statusId: 2, nome: 'Empresa', options: {"podeCadastrar": [2, 3, 4, 5, 6, 7, 8], "podeAlterar": [2, 3, 4, 5, 6, 7, 8]} },
            { statusId: 2, nome: 'Gerente compras', options: {"podeCadastrar": [4, 6], "podeAlterar": [4, 6]} },
            { statusId: 2, nome: 'Gerente vendas', options: {"podeCadastrar": [5, 6], "podeAlterar": [5, 6]} },
            { statusId: 2, nome: 'Comprador', options: {"podeCadastrar": [6], "podeAlterar": [6]} },
            { statusId: 2, nome: 'Vendedor', options: {"podeCadastrar": [6], "podeAlterar": [6]} },
            { statusId: 2, nome: 'Solicitante', options: {"podeCadastrar": [], "podeAlterar": []} },
            { statusId: 2, nome: 'Recursos humanos', options: {"podeCadastrar": [2, 3, 4, 5, 6, 7, 8], "podeAlterar": [2, 3, 4, 5, 6, 7, 8]} },
            { statusId: 2, nome: 'Diretor', options: {"podeCadastrar": [2, 3, 4, 5, 6, 7, 8], "podeAlterar": [2, 3, 4, 5, 6, 7, 8]} },
]

        const newData = repository.create(data) 

        // newData.forEach((oneData, i) => {
        //     const status = new Status()
        //     status.id = data[i].statusId
        //     oneData.status = status;
        // })

        await repository.save(newData)
    }
}