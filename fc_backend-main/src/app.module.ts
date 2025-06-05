import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatusModule } from './status/status.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configOptions } from '../database/config';
import { TiposModule } from './tipos/tipos.module';
import { TiposItensModule } from './tipos_itens/tipos_itens.module';
import { CidadesModule } from './cidades/cidades.module';
import { EstadosModule } from './estados/estados.module';
import { RegioesModule } from './regioes/regioes.module';
import { GruposModule } from './grupos/grupos.module';
import { GruposItensModule } from './grupos_itens/grupos_itens.module';
import { MenusModule } from './menus/menus.module';
import { PerfisModule } from './perfis/perfis.module';
import { MenusPerfisModule } from './menus_perfis/menus_perfis.module';
import { EventosModule } from './eventos/eventos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { PessoasDocumentosModule } from './pessoas_documentos/pessoas_documentos.module';
import { PessoasEnderecosModule } from './pessoas_enderecos/pessoas_enderecos.module';
import { PessoasTelefonesModule } from './pessoas_telefones/pessoas_telefones.module';
import { PessoasEmailsModule } from './pessoas_emails/pessoas_emails.module';
import { PessoasSitesModule } from './pessoas_sites/pessoas_sites.module';
import { PessoasPerfisModule } from './pessoas_perfis/pessoas_perfis.module';
import { PessoasGruposItensModule } from './pessoas_grupos-itens/pessoas_grupos-itens.module';
import { PessoasEmpresasModule } from './pessoas_empresas/pessoas_empresas.module';
import { PessoasSenhasModule } from './pessoas_senhas/pessoas_senhas.module';
import { AuthModule } from './auth/auth.module';
import { CommonService } from './common/common/common.service';
import { CommonModule } from './common/common/common.module';
import { ArtigosModule } from './artigos/artigos.module';
import { ProdutosModule } from './produtos/produtos.module';
import { ProdutosGrupositensModule } from './produtos_grupositens/produtos_grupositens.module';
import { EmailModule } from './common/email/email.module';
import { ConfigModule } from '@nestjs/config';
import { ConvitesModule } from './convites/convites.module';
import { AnexosModule } from './anexos/anexos.module';
import { CotacoesModule } from './cotacoes/cotacoes.module';
import { CotacoesItensModule } from './cotacoes_itens/cotacoes_itens.module';
import { CotacoesRespostasModule } from './cotacoes_respostas/cotacoes_respostas.module';
import { CotacoesItensRespostasModule } from './cotacoes_itens_respostas/cotacoes_itens_respostas.module';
import { CotacoesRespostasParcelasModule } from './cotacoes_respostas_parcelas/cotacoes_respostas_parcelas.module';
import { NotificacoesModule } from './notificacoes/notificacoes.module';
import { NotificacoesUsuariosModule } from './notificacoes_usuarios/notificacoes_usuarios.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { PedidosItensModule } from './pedidos_itens/pedidos_itens.module';
import { PedidosParcelasModule } from './pedidos_parcelas/pedidos_parcelas.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configOptions),
    StatusModule,
    TiposModule,
    TiposItensModule,
    RegioesModule,
    EstadosModule,
    CidadesModule,
    GruposModule,
    GruposItensModule,
    MenusModule,
    PerfisModule,
    MenusPerfisModule,
    EventosModule,
    PessoasModule,
    PessoasDocumentosModule,
    PessoasEnderecosModule,
    PessoasTelefonesModule,
    PessoasEmailsModule,
    PessoasSitesModule,
    PessoasPerfisModule,
    PessoasGruposItensModule,
    PessoasEmpresasModule,
    PessoasSenhasModule,
    AuthModule,
    CommonModule,
    ArtigosModule,
    ProdutosModule,
    ProdutosGrupositensModule,
    EmailModule,
    ConvitesModule,
    AnexosModule,
    CotacoesModule,
    CotacoesItensModule,
    CotacoesRespostasModule,
    CotacoesItensRespostasModule,
    CotacoesRespostasParcelasModule,
    NotificacoesModule,
    NotificacoesUsuariosModule,
    PedidosModule,
    PedidosItensModule,
    PedidosParcelasModule,
  ],
  controllers: [AppController],
  providers: [AppService, CommonService],
})
export class AppModule {}
