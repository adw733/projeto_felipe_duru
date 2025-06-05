import { Anexo } from "../../anexos/entities/anexo.entity";
import { CreateProdutosGrupositenDto } from "../../produtos_grupositens/dto/create-produtos_grupositen.dto";

export class CreateProdutoDto {
    statusId: number;
    tipoId: number;
    empresaId: number;
    unidadeMedidaId: number;
    produto: string;
    marca: string;
    modelo: string;
    fabricante: string;
    partNumber: string;
    ncm: string;
    caracteristicas: string;
    custoUltimaCompra: number;
    anexo?: Anexo;
    produtosGrupositens: Array<CreateProdutosGrupositenDto>
}