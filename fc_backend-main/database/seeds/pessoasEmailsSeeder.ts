import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { SeederFactoryManager } from "typeorm-extension/dist/seeder";
import { Pessoa } from "../../src/pessoas/entities/pessoa.entity";
import { PessoasEmail } from "../../src/pessoas_emails/entities/pessoas_email.entity";
import { CreatePessoasEmailDto } from "../../src/pessoas_emails/dto/create-pessoas_email.dto";

export class pessoasEmailsSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repository = dataSource.getRepository(PessoasEmail)

        const data: CreatePessoasEmailDto[] = [
            { pessoaId: 1, email: 'empresa1@gmail.com.br', isAtivo: true },
            { pessoaId: 2, email: 'empresa2@gmail.com.br', isAtivo: true },
            { pessoaId: 3, email: 'empresa3@gmail.com.br', isAtivo: true },
            { pessoaId: 4, email: 'empresa4@gmail.com.br', isAtivo: true },
            { pessoaId: 5, email: 'empresa5@gmail.com.br', isAtivo: true },
            { pessoaId: 6, email: 'gerenteCompras@gmail.com.br', isAtivo: true },
            { pessoaId: 7, email: 'fernandoduru.santos@gmail.com', isAtivo: true },
            { pessoaId: 8, email: 'comprador@gmail.com.br', isAtivo: true },
            { pessoaId: 9, email: 'vendedor@gmail.com.br', isAtivo: true },
            { pessoaId: 10, email: 'solicitante@gmail.com.br', isAtivo: true },
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