import { Injectable } from '@nestjs/common';
import { Raw } from 'typeorm';

@Injectable()
export class CommonService {
    adjustQueryParams(params: any) {
        params = params || {};

        params.search = params.search ? Array.isArray(params.search) ? params.search[0] : params.search : null;
        params.idSearch = (!params.search || isNaN(params.search)) ? 0 : parseInt(params.search);
        params.dataInicio = params.dataInicio ? Array.isArray(params.dataInicio) ? params.dataInicio[0] : params.dataInicio : null; 
        params.dataFim = params.dataFim ? Array.isArray(params.dataFim) ? params.dataFim[0] : params.dataFim : null;
        params.tipoId = params.contextoId ? Array.isArray(params.contextoId) ? params.contextoId[0] : params.contextoId : null;
        params.modalidadeId = params.modalidadeId ? Array.isArray(params.modalidadeId) ? params.modalidadeId[0] : params.modalidadeId : null;
        params.tipoGrupoId = params.tipoGrupoId ? Array.isArray(params.tipoGrupoId) ? params.tipoGrupoId[0] : params.tipoGrupoId : null;
        params.respondidas = params.respondidas ? Array.isArray(params.respondidas) ? eval(params.respondidas[0]) : eval(params.respondidas) : null;
        params.statusId = params.statusId ? Array.isArray(params.statusId) ? eval(params.statusId[0]) : eval(params.statusId) : null;
        params.prioridadesId = params.prioridadesId ? Array.isArray(params.prioridadesId) ? eval(params.prioridadesId[0]) : eval(params.prioridadesId) : null;
        params.estadosIds = params.estadosIds ? JSON.parse(params.estadosIds) : null;
        params.cidadesIds = params.cidadesIds ? JSON.parse(params.cidadesIds) : null;

        return params;
    }

    UIlike(search: string) {
        return Raw((alias) => `unaccent(${alias}) ILIKE unaccent(:field)`, { field: (`%${search}%`)});
    }

    adjustBody(body: any) {
        delete body.created_at;
        delete body.updated_at;
        delete body.deleted_at;
        
        return body
    }
}
