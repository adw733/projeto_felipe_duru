import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { SeederFactoryManager } from "typeorm-extension/dist/seeder";
import { Status } from "../../src/status/entities/status.entity";
import { Menu } from "../../src/menus/entities/menu.entity";
import { CreateMenuDto } from "../../src/menus/dto/create-menu.dto";

export class menusSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repository = dataSource.getRepository(Menu)

        const data: CreateMenuDto[] = [
           /*01*/ { statusId: 2, ordem: 1, nome: 'Home', rota: '/', icone: 'mdi-home', observacoes: 'Home', options: {hasRelatorio: false} },
           /*02*/ { statusId: 2, ordem: 8, nome: 'Artigos', rota: '/artigos', icone: 'mdi-post', observacoes: 'Artigos', options: {hasRelatorio: false} },
           /*03*/ { statusId: 2, ordem: 9, nome: 'Eventos', rota: '/eventos', icone: 'mdi-calendar', observacoes: 'Eventos', options: {hasRelatorio: false} },
           /*04*/ { statusId: 2, ordem: 11, nome: 'Sobre nós', rota: '/sobrenos', icone: 'mdi-information', observacoes: 'Sobre nós', options: {hasRelatorio: false} },
           /*05*/ { statusId: 2, ordem: 12, nome: 'Política de cobrança', rota: '/politicacobranca', icone: 'mdi-currency-usd', observacoes: 'Política de cobrança', options: {hasRelatorio: false} },
           /*06*/ { statusId: 2, ordem: 13, nome: 'Contatos', rota: '/contatos', icone: 'mdi-phone', observacoes: 'Contatos', options: {hasRelatorio: false} },
                
           /*07*/ { statusId: 2, ordem: 1, nome: 'Pessoa', rota: '/perfil', icone: 'mdi-account', observacoes: 'Pessoa', options: {hasRelatorio: false} },
           /*08*/ { statusId: 2, ordem: 2, nome: 'Dashboard', rota: '/dashboard', icone: 'mdi-view-dashboard-outline', observacoes: 'Dashboard', options: {hasRelatorio: false} },
           /*09*/ { statusId: 2, ordem: 3, nome: 'Produtos/Serviços', rota: '/produtos', icone: 'mdi-package-variant-closed', observacoes: 'Produtos', contextoId: 501, options: {hasRelatorio: false} },
           /*10*/ { statusId: 2, ordem: 4, nome: 'Cotações', rota: '/cotacoes', icone: 'mdi-folder-outline', observacoes: 'Cotações', contextoId: 501, options: {hasRelatorio: true} },
           /*11*/ { statusId: 2, ordem: 5, nome: 'Pedidos', rota: '/pedidos', icone: 'mdi-file-document-check-outline', observacoes: 'Pedidos', options: {hasRelatorio: true} },
           /*12*/ { statusId: 2, ordem: 6, nome: 'Integrantes', rota: '/integrantes', icone: 'mdi-account-group', observacoes: 'Integrantes', options: {hasRelatorio: false} },
           /*13*/ { statusId: 2, ordem: 7, nome: 'Fornecedores', rota: '/fornecedores', icone: 'mdi-factory', observacoes: 'Fornecedores', options: {hasRelatorio: false} },
           /*14*/ { statusId: 2, ordem: 10, nome: 'Convites', rota: '/convites', icone: 'mdi-account-plus-outline', observacoes: 'Convites', options: {hasRelatorio: false} },
           /*15*/ { statusId: 2, ordem: 13, nome: 'Relatórios', rota: '/relatorios', icone: 'mdi-chart-box-outline', observacoes: 'Relatórios', options: {hasRelatorio: false} },
        ]

        const newData = repository.create(data) 

        // newData.forEach((oneData, i) => {
        //     const status = new Status()
        //     status.id = data[i].statusId
        //     oneData.status = status;
        // })

        await repository.save(newData)
    }
}