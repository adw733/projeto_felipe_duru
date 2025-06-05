import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { SeederFactoryManager } from "typeorm-extension/dist/seeder";
import { Status } from "../../src/status/entities/status.entity";
import { Pessoa } from "../../src/pessoas/entities/pessoa.entity";
import { PessoasPerfi } from "../../src/pessoas_perfis/entities/pessoas_perfi.entity";
import { CreatePessoasPerfiDto } from "../../src/pessoas_perfis/dto/create-pessoas_perfi.dto";
import { Perfi } from "../../src/perfis/entities/perfi.entity";

export class pessoasPerfisSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repository = dataSource.getRepository(PessoasPerfi)

        const data: CreatePessoasPerfiDto[] = [
            { statusId: 2, pessoaId: 1, perfilId: 1, observacoes: null },
            { statusId: 2, pessoaId: 2, perfilId: 1, observacoes: null },
            { statusId: 2, pessoaId: 3, perfilId: 1, observacoes: null },
            { statusId: 2, pessoaId: 4, perfilId: 1, observacoes: null },
            { statusId: 2, pessoaId: 5, perfilId: 1, observacoes: null },
            { statusId: 2, pessoaId: 6, perfilId: 2, observacoes: null },
            { statusId: 2, pessoaId: 7, perfilId: 3, observacoes: null },
            { statusId: 2, pessoaId: 8, perfilId: 4, observacoes: null },
            { statusId: 2, pessoaId: 9, perfilId: 3, observacoes: null },
            { statusId: 2, pessoaId: 9, perfilId: 5, observacoes: null },
            { statusId: 2, pessoaId: 10, perfilId: 6, observacoes: null },
        ]

        const newData = repository.create(data) 

        // newData.forEach((oneData, i) => {
        //     const status = new Status()
        //     status.id = data[i].statusId
        //     oneData.status = status;
            
        //     const pessoas = new Pessoa()
        //     pessoas.id = data[i].pessoaId
        //     oneData.pessoas = pessoas;

        //     const perfis = new Perfi()
        //     perfis.id = data[i].perfil_id
        //     oneData.perfis = perfis;   
        // })

        await repository.save(newData)
    }
}