import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { SeederFactoryManager } from "typeorm-extension/dist/seeder";
import { Status } from "../../src/status/entities/status.entity";
import { Pessoa } from "../../src/pessoas/entities/pessoa.entity";
import { PessoasEndereco } from "../../src/pessoas_enderecos/entities/pessoas_endereco.entity";
import { CreatePessoasEnderecoDto } from "../../src/pessoas_enderecos/dto/create-pessoas_endereco.dto";
import { Estado } from "../../src/estados/entities/estado.entity";
import { Cidade } from "../../src/cidades/entities/cidade.entity";

export class pessoasEnderecosSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repository = dataSource.getRepository(PessoasEndereco)

        const data: CreatePessoasEnderecoDto[] = [
            { statusId: 2, pessoaId: 1, estadoId: 22, cidadeId: 4347, cep: '08738310', pais: 'Brasil', bairro: 'vila brasileira', logradouro: 'Rua São José Operário', numero: '298', complemento: 'Antigo 67' },
            { statusId: 2, pessoaId: 2, estadoId: 23, cidadeId: 4468, cep: '08738310', pais: 'Brasil', bairro: 'vila brasileira', logradouro: 'Rua São José Operário', numero: '298', complemento: 'Antigo 67' },
            { statusId: 2, pessoaId: 3, estadoId: 24, cidadeId: 4996, cep: '08738310', pais: 'Brasil', bairro: 'vila brasileira', logradouro: 'Rua São José Operário', numero: '298', complemento: 'Antigo 67' },
            { statusId: 2, pessoaId: 4, estadoId: 24, cidadeId: 4748, cep: '08738310', pais: 'Brasil', bairro: 'vila brasileira', logradouro: 'Rua São José Operário', numero: '298', complemento: 'Antigo 67' },
            { statusId: 2, pessoaId: 5, estadoId: 25, cidadeId: 5357, cep: '08738310', pais: 'Brasil', bairro: 'vila brasileira', logradouro: 'Rua São José Operário', numero: '298', complemento: 'Antigo 67' },
        ]

        const newData = repository.create(data) 

        // newData.forEach((oneData, i) => {
        //     const status = new Status()
        //     status.id = data[i].statusId
        //     oneData.status = status;

        //     const pessoas = new Pessoa()
        //     pessoas.id = data[i].pessoaId
        //     oneData.pessoas = pessoas;

        //     const estados = new Estado()
        //     estados.id = data[i].estadoId
        //     oneData.estados = estados;          

        //     const cidades = new Cidade()
        //     cidades.id = data[i].cidade_id
        //     oneData.cidades = cidades;          
        // })

        await repository.save(newData)
    }
}