import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { SeederFactoryManager } from "typeorm-extension/dist/seeder";
import { Status } from "../../src/status/entities/status.entity";
import { TiposIten } from "../../src/tipos_itens/entities/tipos_iten.entity";
import { Pessoa } from "../../src/pessoas/entities/pessoa.entity";
import { PessoasDocumento } from "../../src/pessoas_documentos/entities/pessoas_documento.entity";
import { CreatePessoasDocumentoDto } from "../../src/pessoas_documentos/dto/create-pessoas_documento.dto";

export class pessoasDocumentosSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repository = dataSource.getRepository(PessoasDocumento)

        const data: CreatePessoasDocumentoDto[] = [
            { statusId: 2, pessoaId: 1, tipoId: 301, numero: '40470184000178' },
            { statusId: 2, pessoaId: 1, tipoId: 302, numero: '250899444483' },
            { statusId: 2, pessoaId: 2, tipoId: 301, numero: '13570371000150' },
            { statusId: 2, pessoaId: 2, tipoId: 302, numero: '988183196985' },
            { statusId: 2, pessoaId: 3, tipoId: 301, numero: '79379429000191' },
            { statusId: 2, pessoaId: 3, tipoId: 302, numero: '427570619474' },
            { statusId: 2, pessoaId: 4, tipoId: 301, numero: '81627585000176' },
            { statusId: 2, pessoaId: 4, tipoId: 302, numero: '480019240527' },
            { statusId: 2, pessoaId: 5, tipoId: 301, numero: '42480083000103' },
            { statusId: 2, pessoaId: 5, tipoId: 302, numero: '762529340006' },
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
        //     oneData.tiposDocumento = tipos;          
        // })

        await repository.save(newData)
    }
}