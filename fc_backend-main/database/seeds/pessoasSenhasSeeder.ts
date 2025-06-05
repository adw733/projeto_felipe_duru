import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { SeederFactoryManager } from "typeorm-extension/dist/seeder";
import { Pessoa } from "../../src/pessoas/entities/pessoa.entity";
import { PessoasSenha } from "../../src/pessoas_senhas/entities/pessoas_senha.entity";
import { CreatePessoasSenhaDto } from "../../src/pessoas_senhas/dto/create-pessoas_senha.dto";
import { Status } from "../../src/status/entities/status.entity";

export class pessoasSenhasSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repository = dataSource.getRepository(PessoasSenha)

        const data: CreatePessoasSenhaDto[] = [
            { statusId: 2, pessoaId: 1, senha: '$2a$10$PwP29xMQ4/fvVWe7NzCv5OTVuTObKD/8ZaYU8uHubfL6jTQVPCPw6' },
            { statusId: 2, pessoaId: 2, senha: '$2a$10$PwP29xMQ4/fvVWe7NzCv5OTVuTObKD/8ZaYU8uHubfL6jTQVPCPw6' },
            { statusId: 2, pessoaId: 3, senha: '$2a$10$PwP29xMQ4/fvVWe7NzCv5OTVuTObKD/8ZaYU8uHubfL6jTQVPCPw6' },
            { statusId: 2, pessoaId: 4, senha: '$2a$10$PwP29xMQ4/fvVWe7NzCv5OTVuTObKD/8ZaYU8uHubfL6jTQVPCPw6' },
            { statusId: 2, pessoaId: 5, senha: '$2a$10$PwP29xMQ4/fvVWe7NzCv5OTVuTObKD/8ZaYU8uHubfL6jTQVPCPw6' },
            { statusId: 2, pessoaId: 6, senha: '$2a$10$PwP29xMQ4/fvVWe7NzCv5OTVuTObKD/8ZaYU8uHubfL6jTQVPCPw6' },
            { statusId: 2, pessoaId: 7, senha: '$2a$10$PwP29xMQ4/fvVWe7NzCv5OTVuTObKD/8ZaYU8uHubfL6jTQVPCPw6' },
            { statusId: 2, pessoaId: 8, senha: '$2a$10$PwP29xMQ4/fvVWe7NzCv5OTVuTObKD/8ZaYU8uHubfL6jTQVPCPw6' },
            { statusId: 2, pessoaId: 9, senha: '$2a$10$PwP29xMQ4/fvVWe7NzCv5OTVuTObKD/8ZaYU8uHubfL6jTQVPCPw6' },
            { statusId: 2, pessoaId: 10, senha: '$2a$10$PwP29xMQ4/fvVWe7NzCv5OTVuTObKD/8ZaYU8uHubfL6jTQVPCPw6' },
        ]

        const newData = repository.create(data) 

        // newData.forEach((oneData, i) => {
        //     const status = new Status()
        //     status.id = data[i].statusId
        //     oneData.status = status;

        //     const pessoas = new Pessoa()
        //     pessoas.id = data[i].pessoaId
        //     oneData.pessoasSenhas = pessoas;
        // })

        await repository.save(newData)
    }
}