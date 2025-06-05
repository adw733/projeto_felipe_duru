import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { SeederFactoryManager } from "typeorm-extension/dist/seeder";
import { Status } from "../../src/status/entities/status.entity";
import { Grupo } from "../../src/grupos/entities/grupo.entity";
import { CreateGrupoDto } from "../../src/grupos/dto/create-grupo.dto";
import { TiposIten } from "../../src/tipos_itens/entities/tipos_iten.entity";

export class gruposSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repository = dataSource.getRepository(Grupo)

        const data: CreateGrupoDto[] = [
            { id: 1, statusId: 2, tipoId: 501, nome: 'adesivosColasFitas', nomeAlternativo: 'ADESIVOS / COLAS / FITAS' },
            { id: 2, statusId: 2, tipoId: 501, nome: 'automotivos', nomeAlternativo: 'AUTOMOTIVOS' },
            { id: 3, statusId: 2, tipoId: 501, nome: 'bicicletas', nomeAlternativo: 'BICICLETAS' },
            { id: 4, statusId: 2, tipoId: 501, nome: 'borrachasPlasticos', nomeAlternativo: 'BORRACHAS / PLÁSTICOS' },
            { id: 5, statusId: 2, tipoId: 501, nome: 'combustiveis', nomeAlternativo: 'COMBUSTÍVEIS' },
            { id: 6, statusId: 2, tipoId: 501, nome: 'componentesFiltrosMangas', nomeAlternativo: 'COMPONENTES DE FILTROS DE MANGAS' },
            { id: 7, statusId: 2, tipoId: 501, nome: 'contrucaoCivilAcabamentos', nomeAlternativo: 'CONSTRUÇÃO CIVIL / ACABAMENTOS' },
            { id: 8, statusId: 2, tipoId: 501, nome: 'consumiveisAbrasivos', nomeAlternativo: 'CONSUMÍVEIS ABRASIVOS' },
            { id: 9, statusId: 2, tipoId: 501, nome: 'elementosApoio', nomeAlternativo: 'ELEMENTOS DE APOIO' },
            { id: 10, statusId: 2, tipoId: 501, nome: 'elementosFixacao', nomeAlternativo: 'ELEMENTOS DE FIXAÇÃO' },
            { id: 11, statusId: 2, tipoId: 501, nome: 'elementosTransmissaopotencia', nomeAlternativo: 'ELEMENTOS DE TRANSMISSÃO DE POTÊNCIA' },
            { id: 12, statusId: 2, tipoId: 501, nome: 'elementosElasticos', nomeAlternativo: 'ELEMENTOS ELÁSTICOS' },
            { id: 13, statusId: 2, tipoId: 501, nome: 'elevacaoMovimentacaoCarga', nomeAlternativo: 'ELEVAÇÃO / MOVIMENTAÇÃO DE CARGA' },
            { id: 14, statusId: 2, tipoId: 501, nome: 'elevadoresCacambas', nomeAlternativo: 'ELEVADORES DE CAÇAMBAS' },
            { id: 15, statusId: 2, tipoId: 501, nome: 'embalagensIdentificacoes', nomeAlternativo: 'EMBALAGENS / IDENTIFICAÇÕES' },
            { id: 16, statusId: 2, tipoId: 501, nome: 'ensacadeiras', nomeAlternativo: 'ENSACADEIRAS' },
            { id: 17, statusId: 2, tipoId: 501, nome: 'equipamentosFerramentaria', nomeAlternativo: 'EQUIPAMENTOS DE FERRAMENTARIA' },
            { id: 18, statusId: 2, tipoId: 501, nome: 'equipamentosInformatica', nomeAlternativo: 'EQUIPAMENTOS DE INFORMÁTICA' },
            { id: 19, statusId: 2, tipoId: 501, nome: 'equipamentosMateriaisAgricolas', nomeAlternativo: 'EQUIPAMENTOS E MATERIAIS AGRÍCOLAS' },
            { id: 20, statusId: 2, tipoId: 501, nome: 'equipamentosIndustriais', nomeAlternativo: 'EQUIPAMENTOS INDUSTRIAIS' },
            { id: 21, statusId: 2, tipoId: 501, nome: 'equipamentosLaboratios', nomeAlternativo: 'EQUIPAMENTOS PARA LABORATÓRIOS' },
            { id: 22, statusId: 2, tipoId: 501, nome: 'ferramentasConsumiveisSoldaOxiacetileno', nomeAlternativo: 'FERRAMENTAS / CONSUMÍVEIS DE SOLDA E OXIACETILENO' },
            { id: 23, statusId: 2, tipoId: 501, nome: 'ferramentasEletricas', nomeAlternativo: 'FERRAMENTAS ELÉTRICAS' },
            { id: 24, statusId: 2, tipoId: 501, nome: 'ferramentasHidraulicasPneumaticas', nomeAlternativo: 'FERRAMENTAS HIDRÁULICAS / PNEUMÁTICAS' },
            { id: 25, statusId: 2, tipoId: 501, nome: 'ferramentasManuais', nomeAlternativo: 'FERRAMENTAS MANUAIS' },
            { id: 26, statusId: 2, tipoId: 501, nome: 'ferramentasConstrucaoCivil', nomeAlternativo: 'FERRAMENTAS PARA CONSTRUÇÃO CIVIL' },
            { id: 27, statusId: 2, tipoId: 501, nome: 'filtroArOleo', nomeAlternativo: 'FILTROS DE AR / ÓLEO' },
            { id: 28, statusId: 2, tipoId: 501, nome: 'hidraulicaPneumatica', nomeAlternativo: 'HIDRÁULICA / PNEUMÁTICA' },
            { id: 29, statusId: 2, tipoId: 501, nome: 'iluminacao', nomeAlternativo: 'ILUMINAÇÃO' },
            { id: 30, statusId: 2, tipoId: 501, nome: 'instrumentosAutomacao', nomeAlternativo: 'INSTRUMENTAÇÃO / AUTOMAÇÃO' },
            { id: 31, statusId: 2, tipoId: 501, nome: 'instrumentosMedicao', nomeAlternativo: 'INSTRUMENTOS DE MEDIÇÃO' },
            { id: 32, statusId: 2, tipoId: 501, nome: 'juntasVedacoesProtecao', nomeAlternativo: 'JUNTAS / VEDAÇÕES / PROTEÇÃO' },
            { id: 33, statusId: 2, tipoId: 501, nome: 'lubrificantesLubrificacao', nomeAlternativo: 'LUBRIFICANTES / LUBRIFICAÇÃO' },
            { id: 34, statusId: 2, tipoId: 501, nome: 'mangueirasConexoesValvulas', nomeAlternativo: 'MANGUEIRAS / CONEXÕES / VÁLVULAS' },
            { id: 35, statusId: 2, tipoId: 501, nome: 'materiaisCeramica', nomeAlternativo: 'MATERIAIS DE CERÂMICA' },
            { id: 36, statusId: 2, tipoId: 501, nome: 'materiaisEscritorioResidencia', nomeAlternativo: 'MATERIAIS DE ESCRITÓRIO / RESIDENCIAIS' },
            { id: 37, statusId: 2, tipoId: 501, nome: 'materiaisEletricos', nomeAlternativo: 'MATERIAIS ELÉTRICOS' },
            { id: 38, statusId: 2, tipoId: 501, nome: 'materiaisEletronicos', nomeAlternativo: 'MATERIAIS ELETRÔNICOS' },
            { id: 39, statusId: 2, tipoId: 501, nome: 'materiaisIsolantesRefratarios', nomeAlternativo: 'MATERIAIS ISOLANTES / REFRATÁRIOS' },
            { id: 40, statusId: 2, tipoId: 501, nome: 'metaisLigasFundidas', nomeAlternativo: 'METAIS E LIGAS FUNDIDAS' },
            { id: 41, statusId: 2, tipoId: 501, nome: 'metaisPerfisTubosBarrasChapas', nomeAlternativo: 'METAL EM PERFIS / TUBOS / BARRAS / CHAPAS' },
            { id: 42, statusId: 2, tipoId: 501, nome: 'motocicletas', nomeAlternativo: 'MOTOCICLETAS' },
            { id: 43, statusId: 2, tipoId: 501, nome: 'motoresRedutoresBombasAcessorios', nomeAlternativo: 'MOTORES / REDUTORES / BOMBAS E ACESSÓRIOS' },
            { id: 44, statusId: 2, tipoId: 501, nome: 'pinturasTratamentosSuperficiais', nomeAlternativo: 'PINTURAS E TRATAMENTOS SUPERFICIAIS' },
            { id: 45, statusId: 2, tipoId: 501, nome: 'produtosQuimicos', nomeAlternativo: 'PRODUTOS QUÍMICOS' },
            { id: 46, statusId: 2, tipoId: 501, nome: 'segurancaTrabalho', nomeAlternativo: 'SEGURANÇA DO TRABALHO' },
            { id: 47, statusId: 2, tipoId: 501, nome: 'seguracaoProtecao', nomeAlternativo: 'SEGURANÇA E PROTEÇÃO' },
            { id: 48, statusId: 2, tipoId: 501, nome: 'transportadoresCorreia', nomeAlternativo: 'TRANSPORTADORES POR CORREIA' },
            { id: 500, statusId: 2, tipoId: 502, nome: 'servicosAutomotivos', nomeAlternativo: 'SERVIÇOS AUTOMOTIVOS' },
            { id: 501, statusId: 2, tipoId: 502, nome: 'servicosBicicleta', nomeAlternativo: 'SERVIÇOS EM BICICLETAS' },
            { id: 502, statusId: 2, tipoId: 502, nome: 'consultoria', nomeAlternativo: 'CONSULTORIAS' },
            { id: 503, statusId: 2, tipoId: 502, nome: 'cursosTreinamentos', nomeAlternativo: 'CURSOS E TREINAMENTOS' },
            { id: 504, statusId: 2, tipoId: 502, nome: 'servicosEmbalagensIdentificacoes', nomeAlternativo: 'SERVIÇOS DE EMBALAGENS / IDENTIFICAÇÕES' },
            { id: 505, statusId: 2, tipoId: 502, nome: 'locacoesFerramentasEquipamentos', nomeAlternativo: 'LOCAÇÕES DE FERRAMENTAS / EQUIPAMENTOS' },
            { id: 506, statusId: 2, tipoId: 502, nome: 'servicoesMotocicletas', nomeAlternativo: 'SERVIÇOS EM MOTOCICLETAS' },
            { id: 507, statusId: 2, tipoId: 502, nome: 'servicoesConstrucaoCivil', nomeAlternativo: 'SERVIÇOS DE CONSTRUÇÃO CIVIL / REFORMAS' },
            { id: 508, statusId: 2, tipoId: 502, nome: 'servicosInformatica', nomeAlternativo: 'SERVIÇOS DE INFORMÁTICA' },
            { id: 509, statusId: 2, tipoId: 502, nome: 'servicosRefratario', nomeAlternativo: 'SERVIÇOS DE REFRATÁRIOS' },
            { id: 510, statusId: 2, tipoId: 502, nome: 'servicosEletricosEletronicos', nomeAlternativo: 'SERVIÇOS ELÉTRICOS / ELETRÔNICOS' },
            { id: 511, statusId: 2, tipoId: 502, nome: 'servicosMecanicos', nomeAlternativo: 'SERVIÇOS MECÂNICOS' },
            { id: 512, statusId: 2, tipoId: 502, nome: 'servicosQuimicosLaboratoriais', nomeAlternativo: 'SERVIÇOS QUÍMICOS / LABORATORIAIS' }
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