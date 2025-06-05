import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { SeederFactoryManager } from "typeorm-extension/dist/seeder";
import { Pessoa } from "../../src/pessoas/entities/pessoa.entity";
import { PessoasSite } from "../../src/pessoas_sites/entities/pessoas_site.entity";
import { CreatePessoasSiteDto } from "../../src/pessoas_sites/dto/create-pessoas_site.dto";

export class pessoasSitesSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repository = dataSource.getRepository(PessoasSite)

        const data: CreatePessoasSiteDto[] = [
            { pessoaId: 1, site: 'https://www.google.com' },
            { pessoaId: 2, site: 'https://www.microsoft.com' },
            { pessoaId: 3, site: 'https://www.youtube.com' },
            { pessoaId: 4, site: 'https://www.instagram.com' },
            { pessoaId: 5, site: 'https://www.facebook.com' },  
        ]

        const newData = repository.create(data) 

        // newData.forEach((oneData, i) => {
        //     const pessoas = new Pessoa()
        //     pessoas.id = data[i].pessoaId
        //     oneData.pessoas = pessoas;
        // })

        await repository.save(newData)
    }
}