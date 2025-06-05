import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { SeederFactoryManager } from "typeorm-extension/dist/seeder";
import { Tipo } from "../../src/tipos/entities/tipo.entity";
import { CreateTipoDto } from "../../src/tipos/dto/create-tipo.dto";
import { Status } from "../../src/status/entities/status.entity";

export class tiposSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repository = dataSource.getRepository(Tipo)

        const data: CreateTipoDto[] = [
            { id: 100, statusId: 2, nome: 'pessoa', nomeAlternativo: 'Pessoa', observacoes: null },
            { id: 200, statusId: 2, nome: 'formatoJuridico', nomeAlternativo: 'Formato jurídico', observacoes: null },
            { id: 250, statusId: 2, nome: 'regimeTributario', nomeAlternativo: 'Regime tributário', observacoes: null },
            { id: 270, statusId: 2, nome: 'porteEmpresarial', nomeAlternativo: 'Porte empresarial', observacoes: null },
            { id: 300, statusId: 2, nome: 'documento', nomeAlternativo: 'Documento', observacoes: null },
            { id: 400, statusId: 2, nome: 'telefone', nomeAlternativo: 'Telefone', observacoes: null },
            { id: 500, statusId: 2, nome: 'prestacao', nomeAlternativo: 'Prestação', observacoes: 'Serviço ou Produto' },
            { id: 600, statusId: 2, nome: 'link', nomeAlternativo: 'Link', observacoes: 'Tipo de link caso precise de criptografia' },
            { id: 700, statusId: 2, nome: 'prioridade', nomeAlternativo: 'Prioridade', observacoes: 'Prioridade da Cotação' },
            { id: 800, statusId: 2, nome: 'frete', nomeAlternativo: 'Frete', observacoes: null },
            { id: 900, statusId: 2, nome: 'formaPagamento', nomeAlternativo: 'Forma de pagamento', observacoes: null },
            { id: 1000, statusId: 2, nome: 'unidadeMedida', nomeAlternativo: 'Unidade de medida', observacoes: null },
            { id: 1100, statusId: 2, nome: 'evento', nomeAlternativo: 'Evento', observacoes: null },
            { id: 1200, statusId: 2, nome: 'modalidade', nomeAlternativo: 'Modalidade', observacoes: null },
            { id: 1300, statusId: 2, nome: 'anexo', nomeAlternativo: 'Anexo', observacoes: null },
            { id: 1400, statusId: 2, nome: 'finalidade', nomeAlternativo: 'Finalidade', observacoes: null },
            { id: 1500, statusId: 2, nome: 'eventoLogs', nomeAlternativo: 'Eventos de Log', observacoes: null },
        ]

        const newData = repository.create(data) 

        // newData.forEach((oneData, i) => {
        //     const status = new Status()
        //     status.id = data[i].statusId
        //     oneData.status = status            
        // })

        await repository.save(newData)
    }
}