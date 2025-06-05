import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { SeederFactoryManager } from "typeorm-extension/dist/seeder";
import { Status } from '../../src/status/entities/status.entity'
import { CreateStatusDto } from '../../src/status/dto/create-status.dto'

export class statusSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repository = dataSource.getRepository(Status)

        const data: CreateStatusDto[] = [
            { id: 1, nome: 'Cadastro', nomeAlternativo: 'CA', options: { 'cor': '#9789FF', menus: ['Artigos', 'Eventos', 'Pessoa', 'Produtos/Serviços', 'Cotações', 'Integrantes', 'Convites'] } },
            { id: 2, nome: 'Ativo', nomeAlternativo: 'AT', options: { cor: '#58CCAE', menus: ['Artigos', 'Eventos', 'Pessoa', 'Produtos/Serviços', 'Cotações', 'Integrantes', 'Convites'] } },
            { id: 3, nome: 'Inativo', nomeAlternativo: 'IN', options: { cor: '#D7D7D7', menus: ['Artigos', 'Eventos', 'Pessoa', 'Produtos/Serviços', 'Cotações', 'Integrantes', 'Convites'] } },
            { id: 4, nome: 'Em aprovação', nomeAlternativo: 'AP', options: { cor: '#E0E282', menus: ['Cotações', 'Pedidos'] } },
            { id: 5, nome: 'Finalizado', nomeAlternativo: 'FI', options: { cor: '#5E5E5E', menus: ['Eventos', 'Cotações', 'Convites'] } },
            { id: 6, nome: 'Aprovado', nomeAlternativo: 'AP', options: { cor: '#58CCAE', menus: ['Pedidos'] } },
            { id: 7, nome: 'Reprovado', nomeAlternativo: 'RE', options: { cor: '#F69292', menus: ['Pedidos'] } },
            { id: 8, nome: 'Cancelado', nomeAlternativo: 'CA', options: { cor: '#D7D7D7', menus: ['Pedidos'] } },
            { id: 9, nome: 'Aguardando Fornecedor', nomeAlternativo: 'AF', options: { cor: '#FFC78F', menus: ['Pedidos'] } },
            { id: 10, nome: 'Em atendimento', nomeAlternativo: 'RE', options: { cor: '#9789FF', menus: ['Pedidos'] } },
            { id: 11, nome: 'Disponível', nomeAlternativo: 'DI', options: { cor: '#B2E5AD', menus: ['Pedidos'] } },
            { id: 12, nome: 'Entregue', nomeAlternativo: 'EN', options: { cor: '#5E5E5E', menus: ['Pedidos'] } },
        ]

        const newData = repository.create(data) 
        await repository.save(newData)
    }
}