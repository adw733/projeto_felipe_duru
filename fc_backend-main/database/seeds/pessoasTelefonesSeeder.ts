import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { SeederFactoryManager } from "typeorm-extension/dist/seeder";
import { Status } from "../../src/status/entities/status.entity";
import { TiposIten } from "../../src/tipos_itens/entities/tipos_iten.entity";
import { Pessoa } from "../../src/pessoas/entities/pessoa.entity";
import { PessoasTelefone } from "../../src/pessoas_telefones/entities/pessoas_telefone.entity";
import { CreatePessoasTelefoneDto } from "../../src/pessoas_telefones/dto/create-pessoas_telefone.dto";

export class pessoasTelefonesSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repository = dataSource.getRepository(PessoasTelefone)

        const data: CreatePessoasTelefoneDto[] = [
            { statusId: 2, pessoaId: 1, tipoId: 401, numero: '1147945762' },
            { statusId: 2, pessoaId: 1, tipoId: 402, numero: '11975775215' },
            { statusId: 2, pessoaId: 2, tipoId: 401, numero: '1147945762' },
            { statusId: 2, pessoaId: 2, tipoId: 402, numero: '11975775215' },
            { statusId: 2, pessoaId: 3, tipoId: 401, numero: '1147945762' },
            { statusId: 2, pessoaId: 3, tipoId: 402, numero: '11975775215' },
            { statusId: 2, pessoaId: 4, tipoId: 401, numero: '1147945762' },
            { statusId: 2, pessoaId: 4, tipoId: 402, numero: '11975775215' },
            { statusId: 2, pessoaId: 5, tipoId: 401, numero: '1147945762' },
            { statusId: 2, pessoaId: 5, tipoId: 402, numero: '11975775215' },
            { statusId: 2, pessoaId: 6, tipoId: 402, numero: '11963975831' },
            { statusId: 2, pessoaId: 7, tipoId: 402, numero: '11963975831' },
            { statusId: 2, pessoaId: 8, tipoId: 402, numero: '11963975831' },
            { statusId: 2, pessoaId: 9, tipoId: 402, numero: '11963975831' },
            { statusId: 2, pessoaId: 10, tipoId: 402, numero: '11963975831' },
        ]

        const newData = repository.create(data) 

        // newData.forEach((oneData, i) => {
        //     const status = new Status()
        //     status.id = data[i].statusId
        //     oneData.status = status;
            
        //     const pessoas = new Pessoa()
        //     pessoas.id = data[i].pessoaId
        //     oneData.pessoas = pessoas;

        //     const tipos = new TiposIten()
        //     tipos.id = data[i].tipoId
        //     oneData.tiposTelefone = tipos;   
        // })

        await repository.save(newData)
    }
}