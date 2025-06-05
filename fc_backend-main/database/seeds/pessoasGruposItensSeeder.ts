import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { SeederFactoryManager } from "typeorm-extension/dist/seeder";
import { Status } from "../../src/status/entities/status.entity";
import { Pessoa } from "../../src/pessoas/entities/pessoa.entity";
import { PessoasGruposIten } from "../../src/pessoas_grupos-itens/entities/pessoas_grupos-iten.entity";
import { CreatePessoasGruposItenDto } from "../../src/pessoas_grupos-itens/dto/create-pessoas_grupos-iten.dto";
import { GruposIten } from "../../src/grupos_itens/entities/grupos_iten.entity";

export class pessoasGruposItensSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repository = dataSource.getRepository(PessoasGruposIten)

        const data: CreatePessoasGruposItenDto[] = [
            { statusId: 2, pessoaId: 1, grupoitemId: 1, observacoes: null },
            { statusId: 2, pessoaId: 1, grupoitemId: 114, observacoes: null },
            { statusId: 2, pessoaId: 2, grupoitemId: 1, observacoes: null },
            { statusId: 2, pessoaId: 2, grupoitemId: 2, observacoes: null },
            { statusId: 2, pessoaId: 2, grupoitemId: 3, observacoes: null },
            { statusId: 2, pessoaId: 2, grupoitemId: 1000, observacoes: null },
        ]

        const newData = repository.create(data) 

        // newData.forEach((oneData, i) => {
        //     const status = new Status()
        //     status.id = data[i].statusId
        //     oneData.status = status;
            
        //     const pessoas = new Pessoa()
        //     pessoas.id = data[i].pessoaId
        //     oneData.pessoas = pessoas;

        //     const itens = new GruposIten()
        //     itens.id = data[i].item_id
        //     oneData.gruposItens = itens;   
        // })

        await repository.save(newData)
    }
}