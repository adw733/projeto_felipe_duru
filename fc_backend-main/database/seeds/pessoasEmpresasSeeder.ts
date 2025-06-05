import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { SeederFactoryManager } from "typeorm-extension/dist/seeder";
import { Status } from "../../src/status/entities/status.entity";
import { Pessoa } from "../../src/pessoas/entities/pessoa.entity";
import { PessoasEmpresa } from "../../src/pessoas_empresas/entities/pessoas_empresa.entity";
import { CreatePessoasEmpresaDto } from "../../src/pessoas_empresas/dto/create-pessoas_empresa.dto";

export class pessoasEmpresasSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repository = dataSource.getRepository(PessoasEmpresa)

        const data: CreatePessoasEmpresaDto[] = [
            { statusId: 2, pessoaId: 6, empresaId: 2, observacoes: null },
            { statusId: 2, pessoaId: 7, empresaId: 1, observacoes: null },
            { statusId: 2, pessoaId: 8, empresaId: 2, observacoes: null },
            { statusId: 2, pessoaId: 9, empresaId: 3, observacoes: null },
            { statusId: 2, pessoaId: 10, empresaId: 4, observacoes: null },
        ]

        const newData = repository.create(data) 

        // newData.forEach((oneData, i) => {
        //     const status = new Status()
        //     status.id = data[i].statusId
        //     oneData.status = status;
            
        //     const pessoasColaboradores = new Pessoa()
        //     pessoasColaboradores.id = data[i].pessoaId
        //     oneData.pessoasColaboradores = pessoasColaboradores;

        //     const pessoasEmpresas = new Pessoa()
        //     pessoasEmpresas.id = data[i].empresa_id
        //     oneData.pessoasEmpresas = pessoasEmpresas; 
        // })

        await repository.save(newData)
    }
}