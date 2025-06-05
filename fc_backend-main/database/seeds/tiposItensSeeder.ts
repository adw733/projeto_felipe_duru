import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { SeederFactoryManager } from "typeorm-extension/dist/seeder";
import { Tipo } from "../../src/tipos/entities/tipo.entity";
import { Status } from "../../src/status/entities/status.entity";
import { TiposIten } from "../../src/tipos_itens/entities/tipos_iten.entity";
import { CreateTiposItenDto } from "../../src/tipos_itens/dto/create-tipos_iten.dto";

export class tiposItensSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repository = dataSource.getRepository(TiposIten)

        const data: CreateTiposItenDto[] = [
            { id: 101, statusId: 2, tipoId: 100, nome: 'pessoaJuridica', nomeAlternativo: 'Pessoa jurídica', codigo: 'Jurídica', observacoes: null, options: null },
            { id: 102, statusId: 2, tipoId: 100, nome: 'pessoaFisica', nomeAlternativo: 'Pessoa física', codigo: 'Física', observacoes: null, options: null },
            { id: 201, statusId: 2, tipoId: 200, nome: 'ltda', nomeAlternativo: 'Sociedade limitada', codigo: 'LTDA', observacoes: null, options: null },
            { id: 202, statusId: 2, tipoId: 200, nome: 'eireli', nomeAlternativo: 'Empresa individual de responsabilidade limitada', codigo: 'Eireli', observacoes: null, options: null },
            { id: 203, statusId: 2, tipoId: 200, nome: 'empresaIndividual', nomeAlternativo: 'Empresa individual', codigo: 'EI', observacoes: null, options: null },
            { id: 204, statusId: 2, tipoId: 200, nome: 'sociedadeSimples', nomeAlternativo: 'Sociedade simples', codigo: 'SS', observacoes: null, options: null },
            { id: 205, statusId: 2, tipoId: 200, nome: 'sociedadeAnonima', nomeAlternativo: 'Sociedade anônima', codigo: 'SA', observacoes: null, options: null },
            { id: 206, statusId: 2, tipoId: 200, nome: 'sociedadeLimitadaUnipessoal', nomeAlternativo: 'Sociedade limitada unipessoal', codigo: 'SLU', observacoes: null, options: null },
            { id: 251, statusId: 2, tipoId: 250, nome: 'simplesNacional', nomeAlternativo: 'Simples nacional', codigo: 'Simples nacional', observacoes: null, options: null },
            { id: 252, statusId: 2, tipoId: 250, nome: 'lucroReal', nomeAlternativo: 'Lucro real', codigo: 'Lucro real', observacoes: null, options: null },
            { id: 253, statusId: 2, tipoId: 250, nome: 'lucroPresumido', nomeAlternativo: 'Lucro presumido', codigo: 'Lucro presumido', observacoes: null, options: null },
            { id: 271, statusId: 2, tipoId: 270, nome: 'microempreendedorIndividual', nomeAlternativo: 'Microempreendedor individual', codigo: 'MEI', observacoes: null, options: null },
            { id: 272, statusId: 2, tipoId: 270, nome: 'microempresa', nomeAlternativo: 'Microempresa', codigo: 'ME', observacoes: null, options: null },
            { id: 273, statusId: 2, tipoId: 270, nome: 'empresaPequenoPorte', nomeAlternativo: 'Empresa de pequeno porte', codigo: 'EPP', observacoes: null, options: null },
            { id: 274, statusId: 2, tipoId: 270, nome: 'mediaEmpresa', nomeAlternativo: 'Média empresa', codigo: null, observacoes: null, options: null },
            { id: 275, statusId: 2, tipoId: 270, nome: 'grandeEmpresa', nomeAlternativo: 'Grande empresa', codigo: null, observacoes: null, options: null },
            { id: 276, statusId: 2, tipoId: 270, nome: 'demais', nomeAlternativo: 'DEMAIS', codigo: null, observacoes: null, options: null },
            { id: 301, statusId: 2, tipoId: 300, nome: 'CNPJ', nomeAlternativo: 'Cadastro nacional de pessoa jurídica', codigo: 'CNPJ', observacoes: null, options: null },
            { id: 302, statusId: 2, tipoId: 300, nome: 'inscricaoEstadual', nomeAlternativo: 'Inscrição estadual', codigo: 'IE', observacoes: null, options: null },
            { id: 401, statusId: 2, tipoId: 400, nome: 'telefoneComercial', nomeAlternativo: 'Telfone comercial', codigo: 'Comercial', observacoes: null, options: null },
            { id: 402, statusId: 2, tipoId: 400, nome: 'telefoneCelular', nomeAlternativo: 'Telfone celular', codigo: 'Celular', observacoes: null, options: null },
            { id: 501, statusId: 2, tipoId: 500, nome: 'prestacaoProduto', nomeAlternativo: 'Prestação de produto', codigo: 'Produto', observacoes: null, options: { cor: 'yellow', explicacao: 'Cotação de produtos físicos' } },
            { id: 502, statusId: 2, tipoId: 500, nome: 'prestacaoServico', nomeAlternativo: 'Prestação de serviço', codigo: 'Serviço', observacoes: null, options: { cor: 'orange', explicacao: 'Cotação de prestação de serviços' } },
            { id: 601, statusId: 2, tipoId: 600, nome: 'linkSenha', nomeAlternativo: 'Senha', codigo: 'Senha', observacoes: null, options: null },
            { id: 701, statusId: 2, tipoId: 700, nome: 'prioridadeNormal', nomeAlternativo: 'Prioridade normal', codigo: 'Normal', observacoes: null, options: { cor: '#00B830' } },
            { id: 702, statusId: 2, tipoId: 700, nome: 'prioridadeMedia', nomeAlternativo: 'Prioridade média', codigo: 'Média', observacoes: null, options: { cor: '#E8BB00' } },
            { id: 703, statusId: 2, tipoId: 700, nome: 'prioridadeUrgente', nomeAlternativo: 'Prioridade urgente', codigo: 'Urgente', observacoes: null, options: { cor: '#FF6B6B' } },
            { id: 801, statusId: 2, tipoId: 800, nome: 'freteCIF', nomeAlternativo: 'Frete CIF', codigo: 'CIF', observacoes: null, options: null },
            { id: 802, statusId: 2, tipoId: 800, nome: 'freteFOB', nomeAlternativo: 'Frete FOB', codigo: 'FOB', observacoes: null, options: null },
            { id: 803, statusId: 2, tipoId: 800, nome: 'freteCombinar', nomeAlternativo: 'Frete à combinar', codigo: 'À combinar', observacoes: null, options: null },
            { id: 901, statusId: 2, tipoId: 900, nome: 'pagamentoBoletoBancario', nomeAlternativo: 'Pagamento boleto bancário', codigo: 'Boleto', observacoes: null, options: null },
            { id: 902, statusId: 2, tipoId: 900, nome: 'pagamentoCartao', nomeAlternativo: 'Pagamento cartão', codigo: 'Cartão', observacoes: null, options: null },
            { id: 903, statusId: 2, tipoId: 900, nome: 'pagamentoPixTransferencia', nomeAlternativo: 'Pagamento PIX / Transferência', codigo: 'PIX / Transferência', observacoes: null, options: null },
            { id: 904, statusId: 2, tipoId: 900, nome: 'pagamentoACombinar', nomeAlternativo: 'Pagamento à combinar', codigo: 'À combinar', observacoes: null, options: null },
            { id: 1001, statusId: 2, tipoId: 1000, nome: 'peca', nomeAlternativo: 'Peça', codigo: 'PÇ', observacoes: null, options: { precision: 0 } },
            { id: 1002, statusId: 2, tipoId: 1000, nome: 'unidade', nomeAlternativo: 'Unidade', codigo: 'UN', observacoes: null, options: { precision: 0 } },
            { id: 1003, statusId: 2, tipoId: 1000, nome: 'mililitro', nomeAlternativo: 'Mililitros', codigo: 'ML', observacoes: null, options: { precision: 4 } },
            { id: 1004, statusId: 2, tipoId: 1000, nome: 'litro', nomeAlternativo: 'Litros', codigo: 'L', observacoes: null, options: { precision: 4 } },
            { id: 1005, statusId: 2, tipoId: 1000, nome: 'grama', nomeAlternativo: 'Gramas', codigo: 'G', observacoes: null, options: { precision: 4 } },
            { id: 1006, statusId: 2, tipoId: 1000, nome: 'quiloGrama', nomeAlternativo: 'Quilogramas', codigo: 'KG', observacoes: null, options: { precision: 4 } },
            { id: 1007, statusId: 2, tipoId: 1000, nome: 'metro', nomeAlternativo: 'Metros', codigo: 'M', observacoes: null, options: { precision: 4 } },
            { id: 1008, statusId: 2, tipoId: 1000, nome: 'metroQuadrado', nomeAlternativo: 'Metros quadrados', codigo: 'M²', observacoes: null, options: { precision: 4 } },
            { id: 1009, statusId: 2, tipoId: 1000, nome: 'metroCubico', nomeAlternativo: 'Metros cúbicos', codigo: 'M³', observacoes: null, options: { precision: 4 } },
            { id: 1010, statusId: 2, tipoId: 1000, nome: 'conjunto', nomeAlternativo: 'Conjunto', codigo: 'CJ', observacoes: null, options: { precision: 0 } },
            { id: 1011, statusId: 2, tipoId: 1000, nome: 'servico', nomeAlternativo: 'Serviço', codigo: 'SV', observacoes: null, options: { precision: 0 } },
            { id: 1101, statusId: 2, tipoId: 1100, nome: 'eventoPresencial', nomeAlternativo: 'Evento presencial', codigo: 'Presencial', observacoes: null, options: { icon: 'mdi-map-marker-outline' } },
            { id: 1102, statusId: 2, tipoId: 1100, nome: 'eventoOnline', nomeAlternativo: 'Evento online', codigo: 'Online', observacoes: null, options: { icon: 'mdi-web' } },
            { id: 1201, statusId: 2, tipoId: 1200, nome: 'modalidadeCompras', nomeAlternativo: 'Modalidade compras', codigo: 'Compras', observacoes: null, options: { perfis_id: [1, 2, 3, 4, 5, 6] } },
            { id: 1202, statusId: 2, tipoId: 1200, nome: 'modalidadeVendas', nomeAlternativo: 'Modalidade vendas', codigo: 'Vendas', observacoes: null, options: { perfis_id: [1, 3, 5] } },  
            { id: 1301, statusId: 2, tipoId: 1300, nome: 'anexoFotoPerfil', nomeAlternativo: 'Foto de perfil', codigo: 'Perfil', observacoes: null, options: null },
            { id: 1302, statusId: 2, tipoId: 1300, nome: 'anexoFotoEvento', nomeAlternativo: 'Foto de evento', codigo: 'Evento', observacoes: null, options: null },
            { id: 1303, statusId: 2, tipoId: 1300, nome: 'anexoCapaArtigo', nomeAlternativo: 'Capa do artigo', codigo: 'Capa', observacoes: null, options: null },
            { id: 1304, statusId: 2, tipoId: 1300, nome: 'anexoItemCotacao', nomeAlternativo: 'Item da cotação', codigo: 'Item', observacoes: null, options: null },
            { id: 1305, statusId: 2, tipoId: 1300, nome: 'anexoFotoProduto', nomeAlternativo: 'Foto do produto', codigo: 'Produto', observacoes: null, options: null },
            { id: 1306, statusId: 2, tipoId: 1300, nome: 'anexoFotoNotaFiscalPedido', nomeAlternativo: 'Nota Fiscal do Pedido', codigo: 'Nota Fiscal', observacoes: null, options: null },
            { id: 1401, statusId: 2, tipoId: 1400, nome: 'finalidadeConsumo', nomeAlternativo: 'Consumo', codigo: 'Consumo', observacoes: null, options: null },
            { id: 1402, statusId: 2, tipoId: 1400, nome: 'finalidadeComercializacao', nomeAlternativo: 'Comercialização', codigo: 'Comercialização', observacoes: null, options: null },
            { id: 1501, statusId: 2, tipoId: 1500, nome: 'eventoInclusao', nomeAlternativo: 'Inclusão', codigo: 'Inclusão', observacoes: null, options: { icon: 'mdi-plus-circle-outline' } },
            { id: 1502, statusId: 2, tipoId: 1500, nome: 'eventoAlteracao', nomeAlternativo: 'Alteração', codigo: 'Alteração', observacoes: null, options: { icon: 'mdi-pencil-circle-outline' } },
            { id: 1503, statusId: 2, tipoId: 1500, nome: 'eventoExclusao', nomeAlternativo: 'Exclusão', codigo: 'Exclusão', observacoes: null, options: { icon: 'mdi-minus-circle-outline' } },
        ]

        const newData = repository.create(data) 

        // newData.forEach((oneData, i) => {
        //     const status = new Status()
        //     status.id = data[i].statusId
        //     oneData.status = status            

        //     const tipos = new Tipo()
        //     tipos.id = data[i].tipoId
        //     oneData.tipos = tipos            
        // })

        await repository.save(newData)
    }
}