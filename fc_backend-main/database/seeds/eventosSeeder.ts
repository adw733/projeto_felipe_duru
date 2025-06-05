import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { SeederFactoryManager } from "typeorm-extension/dist/seeder";
import { Status } from "../../src/status/entities/status.entity";
import { Evento } from "../../src/eventos/entities/evento.entity";
import { CreateEventoDto } from "../../src/eventos/dto/create-evento.dto";
import { TiposIten } from "../../src/tipos_itens/entities/tipos_iten.entity";

export class eventosSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repository = dataSource.getRepository(Evento)

        const data: CreateEventoDto[] = [
            { statusId: 2, tipoId: 1101, titulo: 'Técnicas de abordagem', palestrante: 'Felipe Duru', resumo: 'Resumo da descrição para que o usuário tenha ideia do que se trata o evento. Mais detalhes na descriçao.', descricao: 'Qualquer Texto vai aqui', data: new Date(), hora: '10:00', duracao: '00:45', endereco: 'Rua Fulano de Tal, 290, Mogi das Cruzes - SP', isPublicado: true },
            { statusId: 2, tipoId: 1101, titulo: 'Marketing', palestrante: 'Felipe Duru', resumo: 'Resumo da descrição para que o usuário tenha ideia do que se trata o evento. Mais detalhes na descriçao.', descricao: 'Qualquer Texto vai aqui', data: new Date(), hora: '15:00', duracao: '04:00', endereco: 'Rua Fulano de Tal, 290, Mogi das Cruzes - SP', isPublicado: true },
            { statusId: 2, tipoId: 1101, titulo: 'Excel avançado', palestrante: 'Felipe Duru', resumo: 'Resumo da descrição para que o usuário tenha ideia do que se trata o evento. Mais detalhes na descriçao.', descricao: 'Qualquer Texto vai aqui', data: new Date(), hora: '01:45', duracao: '03:45', endereco: 'Rua Fulano de Tal, 290, Mogi das Cruzes - SP', isPublicado: true },
            { statusId: 2, tipoId: 1102, titulo: 'Empresa', palestrante: 'Felipe Duru', resumo: 'Resumo da descrição para que o usuário tenha ideia do que se trata o evento. Mais detalhes na descriçao.', descricao: 'Qualquer Texto vai aqui', data: new Date(), hora: '01:45', duracao: '04:45', endereco: 'https://www.youtube.com/watch?v=Fbu7z5dXcRs', isPublicado: true },
            { statusId: 1, tipoId: 1102, titulo: 'Outros', palestrante: 'Felipe Duru', resumo: 'Resumo da descrição para que o usuário tenha ideia do que se trata o evento. Mais detalhes na descriçao.', descricao: 'Qualquer Texto vai aqui', data: new Date(), hora: '01:45', duracao: '02:45', endereco: 'https://www.youtube.com/watch?v=uraRXlkknRo', isPublicado: true }
        ]

        const newData = repository.create(data) 

        // newData.forEach((oneData, i) => {
        //     const status = new Status()
        //     status.id = data[i].statusId
        //     oneData.status = status;

        //     const tipos = new TiposIten()
        //     tipos.id = data[i].tipoId
        //     oneData.tiposIten = tipos;
        // })

        await repository.save(newData)
    }
}