import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { SeederFactoryManager } from "typeorm-extension/dist/seeder";
import { Status } from "../../src/status/entities/status.entity";
import { Menu } from "../../src/menus/entities/menu.entity";
import { Perfi } from "../../src/perfis/entities/perfi.entity";
import { MenusPerfi } from "../../src/menus_perfis/entities/menus_perfi.entity";
import { CreateMenusPerfiDto } from "../../src/menus_perfis/dto/create-menus_perfi.dto";

export class menusPerfisSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repository = dataSource.getRepository(MenusPerfi)

        const data: CreateMenusPerfiDto[] = [
            { statusId: 2, menuId: 1, perfilId: null, observacoes: null },
            { statusId: 2, menuId: 2, perfilId: null, observacoes: null },
            { statusId: 2, menuId: 3, perfilId: null, observacoes: null },
            { statusId: 2, menuId: 4, perfilId: null, observacoes: null },
            { statusId: 2, menuId: 5, perfilId: null, observacoes: null },
            { statusId: 2, menuId: 6, perfilId: null, observacoes: null },
            { statusId: 2, menuId: 2, perfilId: 1, observacoes: null },
            { statusId: 2, menuId: 3, perfilId: 1, observacoes: null },
            { statusId: 2, menuId: 6, perfilId: 1, observacoes: null },
            { statusId: 2, menuId: 7, perfilId: 1, observacoes: null },
            { statusId: 2, menuId: 8, perfilId: 1, observacoes: null },
            { statusId: 2, menuId: 9, perfilId: 1, observacoes: null },
            { statusId: 2, menuId: 10, perfilId: 1, observacoes: null },
            { statusId: 2, menuId: 11, perfilId: 1, observacoes: null },
            { statusId: 2, menuId: 12, perfilId: 1, observacoes: null },
            { statusId: 2, menuId: 13, perfilId: 1, observacoes: null },
            { statusId: 2, menuId: 14, perfilId: 1, observacoes: null },
            { statusId: 2, menuId: 15, perfilId: 1, observacoes: null },
            { statusId: 2, menuId: 2, perfilId: 2, observacoes: null },
            { statusId: 2, menuId: 3, perfilId: 2, observacoes: null },
            { statusId: 2, menuId: 6, perfilId: 2, observacoes: null },
            { statusId: 2, menuId: 7, perfilId: 2, observacoes: null },
            { statusId: 2, menuId: 8, perfilId: 2, observacoes: null },
            { statusId: 2, menuId: 9, perfilId: 2, observacoes: null },
            { statusId: 2, menuId: 10, perfilId: 2, observacoes: null },
            { statusId: 2, menuId: 11, perfilId: 2, observacoes: null },
            { statusId: 2, menuId: 13, perfilId: 2, observacoes: null },
            { statusId: 2, menuId: 14, perfilId: 2, observacoes: null },
            { statusId: 2, menuId: 15, perfilId: 2, observacoes: null },
            { statusId: 2, menuId: 2, perfilId: 3, observacoes: null },
            { statusId: 2, menuId: 3, perfilId: 3, observacoes: null },
            { statusId: 2, menuId: 6, perfilId: 3, observacoes: null },
            { statusId: 2, menuId: 7, perfilId: 3, observacoes: null },
            { statusId: 2, menuId: 8, perfilId: 3, observacoes: null },
            { statusId: 2, menuId: 9, perfilId: 3, observacoes: null },
            { statusId: 2, menuId: 10, perfilId: 3, observacoes: null },
            { statusId: 2, menuId: 11, perfilId: 3, observacoes: null },
            { statusId: 2, menuId: 13, perfilId: 3, observacoes: null },
            { statusId: 2, menuId: 14, perfilId: 3, observacoes: null },
            { statusId: 2, menuId: 15, perfilId: 3, observacoes: null },
            { statusId: 2, menuId: 2, perfilId: 4, observacoes: null },
            { statusId: 2, menuId: 3, perfilId: 4, observacoes: null },
            { statusId: 2, menuId: 6, perfilId: 4, observacoes: null },
            { statusId: 2, menuId: 7, perfilId: 4, observacoes: null },
            { statusId: 2, menuId: 8, perfilId: 4, observacoes: null },
            { statusId: 2, menuId: 9, perfilId: 4, observacoes: null },
            { statusId: 2, menuId: 10, perfilId: 4, observacoes: null },
            { statusId: 2, menuId: 11, perfilId: 4, observacoes: null },
            { statusId: 2, menuId: 13, perfilId: 4, observacoes: null },
            { statusId: 2, menuId: 14, perfilId: 4, observacoes: null },
            { statusId: 2, menuId: 15, perfilId: 4, observacoes: null },
            { statusId: 2, menuId: 2, perfilId: 5, observacoes: null },
            { statusId: 2, menuId: 3, perfilId: 5, observacoes: null },
            { statusId: 2, menuId: 6, perfilId: 5, observacoes: null },
            { statusId: 2, menuId: 7, perfilId: 5, observacoes: null },
            { statusId: 2, menuId: 8, perfilId: 5, observacoes: null },
            { statusId: 2, menuId: 9, perfilId: 5, observacoes: null },
            { statusId: 2, menuId: 10, perfilId: 5, observacoes: null },
            { statusId: 2, menuId: 11, perfilId: 5, observacoes: null },
            { statusId: 2, menuId: 13, perfilId: 5, observacoes: null },
            { statusId: 2, menuId: 14, perfilId: 5, observacoes: null },
            { statusId: 2, menuId: 15, perfilId: 5, observacoes: null },
            { statusId: 2, menuId: 2, perfilId: 6, observacoes: null },
            { statusId: 2, menuId: 3, perfilId: 6, observacoes: null },
            { statusId: 2, menuId: 6, perfilId: 6, observacoes: null },
            { statusId: 2, menuId: 7, perfilId: 6, observacoes: null },
            { statusId: 2, menuId: 8, perfilId: 6, observacoes: null },
            { statusId: 2, menuId: 9, perfilId: 6, observacoes: null },
            { statusId: 2, menuId: 10, perfilId: 6, observacoes: null },
            { statusId: 2, menuId: 11, perfilId: 6, observacoes: null },
            { statusId: 2, menuId: 13, perfilId: 6, observacoes: null },
            { statusId: 2, menuId: 14, perfilId: 6, observacoes: null },
            { statusId: 2, menuId: 15, perfilId: 6, observacoes: null },
            { statusId: 2, menuId: 2, perfilId: 7, observacoes: null },
            { statusId: 2, menuId: 3, perfilId: 7, observacoes: null },
            { statusId: 2, menuId: 6, perfilId: 7, observacoes: null },
            { statusId: 2, menuId: 7, perfilId: 7, observacoes: null },
            { statusId: 2, menuId: 8, perfilId: 7, observacoes: null },
            { statusId: 2, menuId: 9, perfilId: 7, observacoes: null },
            { statusId: 2, menuId: 10, perfilId: 7, observacoes: null },
            { statusId: 2, menuId: 11, perfilId: 7, observacoes: null },
            { statusId: 2, menuId: 12, perfilId: 7, observacoes: null },
            { statusId: 2, menuId: 13, perfilId: 7, observacoes: null },
            { statusId: 2, menuId: 14, perfilId: 7, observacoes: null },
            { statusId: 2, menuId: 15, perfilId: 7, observacoes: null },
            { statusId: 2, menuId: 2, perfilId: 8, observacoes: null },
            { statusId: 2, menuId: 3, perfilId: 8, observacoes: null },
            { statusId: 2, menuId: 6, perfilId: 8, observacoes: null },
            { statusId: 2, menuId: 7, perfilId: 8, observacoes: null },
            { statusId: 2, menuId: 8, perfilId: 8, observacoes: null },
            { statusId: 2, menuId: 9, perfilId: 8, observacoes: null },
            { statusId: 2, menuId: 10, perfilId: 8, observacoes: null },
            { statusId: 2, menuId: 11, perfilId: 8, observacoes: null },
            { statusId: 2, menuId: 12, perfilId: 8, observacoes: null },
            { statusId: 2, menuId: 13, perfilId: 8, observacoes: null },
            { statusId: 2, menuId: 14, perfilId: 8, observacoes: null },
            { statusId: 2, menuId: 15, perfilId: 8, observacoes: null }
        ]

        const newData = repository.create(data) 

        // newData.forEach((oneData, i) => {
        //     const status = new Status()
        //     status.id = data[i].statusId
        //     oneData.status = status;

        //     const menus = new Menu()
        //     menus.id = data[i].menu_id
        //     oneData.menus = menus;

        //     const perfis = new Perfi()
        //     perfis.id = data[i].perfil_id
        //     oneData.perfis = perfis;
        // })

        await repository.save(newData)
    }
}