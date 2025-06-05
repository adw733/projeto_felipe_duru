import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager, runSeeder } from "typeorm-extension";
import { statusSeeder } from "./statusSeeder";
import { tiposSeeder } from "./tiposSeeder";
import { tiposItensSeeder } from "./tiposItensSeeder";
import { regioesSeeder } from "./regioesSeeder";
import { estadosSeeder } from "./estadosSeeder";
import { cidadesSeeder } from "./cidadesSeeder";
import { gruposSeeder } from "./gruposSeeder";
import { gruposItensSeeder } from "./gruposItensSeeder";
import { menusSeeder } from "./menusSeeder";
import { perfisSeeder } from "./perfisSeeder";
import { menusPerfisSeeder } from "./menusPerfisSeeder";
import { eventosSeeder } from "./eventosSeeder";
import { pessoasSeeder } from "./pessoasSeeder";
import { pessoasDocumentosSeeder } from "./pessoasDocumentosSeeder";
import { pessoasEnderecosSeeder } from "./pessoasEnderecosSeeder";
import { pessoasTelefonesSeeder } from "./pessoasTelefonesSeeder";
import { pessoasPerfisSeeder } from "./pessoasPerfisSeeder";
import { pessoasGruposItensSeeder } from "./pessoasGruposItensSeeder";
import { pessoasEmpresasSeeder } from "./pessoasEmpresasSeeder";
import { pessoasEmailsSeeder } from "./pessoasEmailsSeeder";
import { pessoasSitesSeeder } from "./pessoasSitesSeeder";
import { pessoasSenhasSeeder } from "./pessoasSenhasSeeder";

export class mainSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        await runSeeder(dataSource, statusSeeder)
        await runSeeder(dataSource, tiposSeeder)
        await runSeeder(dataSource, tiposItensSeeder)
        await runSeeder(dataSource, regioesSeeder)
        await runSeeder(dataSource, estadosSeeder)
        await runSeeder(dataSource, cidadesSeeder)
        await runSeeder(dataSource, gruposSeeder)
        await runSeeder(dataSource, gruposItensSeeder)
        await runSeeder(dataSource, menusSeeder)
        await runSeeder(dataSource, perfisSeeder)
        await runSeeder(dataSource, menusPerfisSeeder)
        await runSeeder(dataSource, eventosSeeder)
        await runSeeder(dataSource, pessoasSeeder)
        await runSeeder(dataSource, pessoasDocumentosSeeder)
        await runSeeder(dataSource, pessoasEnderecosSeeder)
        await runSeeder(dataSource, pessoasTelefonesSeeder)
        await runSeeder(dataSource, pessoasPerfisSeeder)
        await runSeeder(dataSource, pessoasGruposItensSeeder)
        await runSeeder(dataSource, pessoasEmpresasSeeder)
        await runSeeder(dataSource, pessoasEmailsSeeder)
        await runSeeder(dataSource, pessoasSitesSeeder)
        await runSeeder(dataSource, pessoasSenhasSeeder)
    }
}