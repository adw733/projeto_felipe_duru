<template>
  <v-form ref="formCotacao">
    <v-container class="my-5" fluid>
      <v-row>
        <v-col cols="12" md="6">
          <div :class="mdAndUp ? 'v-sticky-bar' : ''">
            <v-card class="pa-4">
              <v-row>
                <v-col cols="6">
                  <span class="text-h6 font-weight-medium">
                    #{{ cotacao.id }}
                  </span>
                </v-col>
                <v-col v-if="cotacao.data" align="end" cols="6">
                  <span class="text-h6 font-weight-medium">
                    {{ dateFormat(cotacao.data, "dd/MM/yyyy") }}
                  </span>
                </v-col>
              </v-row>
              <v-row class="mt-n2">
                <v-col align="center">
                  <v-chip
                    v-if="controleStore.getModalidade"
                    class="text-body-1"
                    outlined
                    size="x-small"
                  >
                    {{
                      tipoItemStore.getBy(controleStore.getModalidade)?.codigo
                    }}
                  </v-chip>
                  <v-chip
                    v-if="cotacao.statusId"
                    :class="`text-body-1 ml-2`"
                    :color="statusStore.getBy(cotacao.statusId)?.options.cor"
                    dark
                    size="x-small"
                  >
                    {{ statusStore.getBy(cotacao.statusId)?.nome }}
                  </v-chip>
                  <v-chip
                    v-if="cotacao.prioridadeId"
                    class="text-body-1 ml-2"
                    :color="
                      tipoItemStore.getBy(cotacao.prioridadeId)?.options.cor
                    "
                    dark
                    size="x-small"
                  >
                    {{ tipoItemStore.getBy(cotacao.prioridadeId)?.codigo }}
                  </v-chip>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <span class="text-h5">
                    {{ cotacao.nome }}
                  </span>
                </v-col>
              </v-row>

              <v-row v-if="cotacao.tipoId" class="mt-n4">
                <v-col>
                  <span class="text-body-2 font-weight-bold">Tipo: </span>
                  <span class="text-body-2">
                    {{ tipoItemStore.getBy(cotacao.tipoId)?.codigo }}
                  </span>
                </v-col>
              </v-row>

              <v-row v-if="cotacao.enderecoEntrega" class="mt-n4">
                <v-col>
                  <span class="text-body-2 font-weight-bold"
                    >Endereço entrega:
                  </span>
                  <span class="text-body-2">
                    {{ cotacao.enderecoEntrega }}
                  </span>
                </v-col>
              </v-row>

              <v-row v-if="cotacao.enderecoCobranca" class="mt-n4">
                <v-col>
                  <span class="text-body-2 font-weight-bold"
                    >Endereço cobrança:
                  </span>
                  <span class="text-body-2">
                    {{ cotacao.enderecoCobranca }}
                  </span>
                </v-col>
              </v-row>

              <v-row v-if="cotacao.centroCusto" class="mt-n4">
                <v-col>
                  <span class="text-body-2 font-weight-bold"
                    >Centro de custo:
                  </span>
                  <span class="text-body-2">
                    {{ cotacao.centroCusto }}
                  </span>
                </v-col>
              </v-row>

              <v-row v-if="cotacao.empresaId && !isModoCompras" class="mt-n4">
                <v-col>
                  <span class="text-body-2 font-weight-bold">Cliente: </span>
                  <span class="text-body-2">
                    {{ cotacao.empresa?.nome }}
                  </span>
                </v-col>
              </v-row>

              <v-row v-if="cotacao.empresaId && !isModoCompras" class="mt-n5">
                <v-col>
                  <span class="text-body-2 font-weight-bold"
                    >Avaliação do cliente:
                  </span>
                  <v-btn variant="text">
                    <v-icon
                      :color="cotacao.empresa?.nota ? 'warning' : 'grey'"
                      class="ml-n4 mt-n1"
                    >
                      {{
                        cotacao.empresa?.nota ? "mdi-star" : "mdi-star-outline"
                      }}
                    </v-icon>
                    <span class="text-body-2 ml-1">
                      {{
                        parseFloat(
                          (cotacao.empresa?.nota || 0).toString()
                        ).toFixed(2)
                      }}
                      / 5
                    </span>
                  </v-btn>
                </v-col>
              </v-row>

              <v-row v-if="isModoCompras" class="mt-n4">
                <v-col>
                  <span class="text-body-2 font-weight-bold"
                    >Solicitante:
                  </span>
                  <span class="text-body-2">
                    {{
                      cotacao.solicitante?.nomeAlternativo ||
                      cotacao.solicitante?.nome
                    }}
                  </span>
                </v-col>
              </v-row>

              <v-row v-if="cotacao.compradorId && isModoCompras" class="mt-n4">
                <v-col>
                  <span class="text-body-2 font-weight-bold">Comprador: </span>
                  <span class="text-body-2">
                    {{
                      cotacao.comprador?.nomeAlternativo ||
                      cotacao.comprador?.nome
                    }}
                  </span>
                </v-col>
              </v-row>

              <v-row v-if="cotacao.regioes?.length" class="mt-n4">
                <v-col>
                  <span class="text-body-2 font-weight-bold"
                    >Regiões:
                    <v-chip
                      v-for="regiao in regioes.filter((regiao) =>
                        cotacao.regioes.includes(regiao.id)
                      )"
                      :key="regiao.id"
                      size="x-small"
                      class="ml-2 text-body-2"
                    >
                      {{ regiao.nome }}
                    </v-chip>
                  </span>
                </v-col>
              </v-row>

              <v-row v-if="isModoCompras && empresa.id === cotacao.empresaId">
                <v-col
                  v-if="
                    (isPessoaGerenteCompras ||
                      cotacao.compradorId === pessoa.id) &&
                    statusStore.getBy('Cadastro')?.id === cotacao.statusId
                  "
                >
                  <v-btn
                    block
                    theme="dark"
                    color="portalColor"
                    @click="encaminharCotacao()"
                  >
                    Encaminhar
                    <v-icon theme="dark" right class="ml-2"> mdi-send </v-icon>
                  </v-btn>
                </v-col>
                <v-col
                  v-else-if="
                    isPessoaGerenteCompras &&
                    statusStore.getBy('Ativo')?.id === cotacao.statusId
                  "
                >
                  <v-btn
                    block
                    theme="dark"
                    color="green"
                    @click="gerarPedido()"
                  >
                    Gerar pedido
                  </v-btn>
                </v-col>
                <v-col
                  v-else-if="
                    cotacao.compradorId === pessoa.id &&
                    statusStore.getBy('Ativo')?.id === cotacao.statusId
                  "
                >
                  <v-btn
                    block
                    theme="dark"
                    color="#005aFF"
                    @click="aprovacaoCotacao()"
                  >
                    Aprovação
                    <v-icon theme="dark" right> mdi-send </v-icon>
                  </v-btn>
                </v-col>
              </v-row>

              <v-row
                v-if="
                  isModoCompras &&
                  empresa.id === cotacao.empresaId &&
                  isPessoaGerenteCompras &&
                  statusStore.getBy('Em aprovação')?.id === cotacao.statusId
                "
              >
                <v-col cols="6">
                  <v-btn
                    block
                    theme="dark"
                    color="green"
                    @click="gerarPedido()"
                  >
                    Gerar pedido
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn
                    block
                    theme="dark"
                    color="red"
                    @click="reprovarCotacao()"
                  >
                    <!--  -->
                    Reprovar
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </div>
        </v-col>
        <v-col cols="12" md="6" :class="mdAndUp ? 'mt-n3' : 'px-0 '">
          <v-container class="py-0 mx-0 px-3">
            <v-expansion-panels multiple v-model="panels">
              <PaginasCotacoesPanelResposta
                v-if="!isModoCompras"
                v-model="cotacao.cotacoesRespostas"
                :cotacao="cotacao"
                :pageModeView="isView"
              />
              <PaginasCotacoesPanelItem
                v-model="cotacao.cotacoesItens"
                :cotacao="cotacao"
                :pageModeView="isView"
              />
              <PaginasCotacoesPanelMapacomparativo
                v-if="
                  tipoItemStore.getBy('modalidadeCompras')?.id ===
                  controleStore.getModalidade
                "
                v-model="cotacao.cotacoesItens"
                :cotacao="cotacao"
                :pageModeView="isView"
              />
            </v-expansion-panels>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-form>

  <PaginasBottomNavigation
    :pagina="`cotacoes/${uuid}`"
    :rota="uuid"
    :pageModeView="false"
    @salvar="clickSalvar"
  ></PaginasBottomNavigation>

  <BasesSnackbar
    v-if="showSnackbar"
    v-model="showSnackbar"
    @close="closeSnackBar()"
    @confirm="confirmSnackBar"
  />
</template>

<script setup lang="ts">
import { useControleStore } from "../../../stores/variaveis/controle";
import { useTipoItemStore } from "../../../stores/tipos/tipo-item";
import { useStatusStore } from "../../../stores/status/status";
import { useRegiaoStore } from "../../../stores/regioes/regiao";
import { useUserStore } from "../../../stores/users/user";
import { usePerfilStore } from "../../../stores/perfis/perfil";
import { useSnackbarStore } from "../../../stores/variaveis/snackbar";
import { Cotacao } from "../../../types/cotacoes/cotacao";
import { PessoaPerfil } from "../../../types/pessoas/pessoa-perfil";
import { Pessoa } from "types/pessoas/pessoa";
import { snackbarInterface } from "../../../types/variaveis/snackbar";

export interface Props {
  cotacaoProp: Cotacao;
  uuid?: string | string[];
  isView: boolean;
}
const props = defineProps<Props>();

/// EMIT
const emit = defineEmits(["salvar"]);

/// PINIA
const statusStore = useStatusStore();
const tipoItemStore = useTipoItemStore();
const controleStore = useControleStore();
const regiaoStore = useRegiaoStore();
const userStore = useUserStore();
const perfilStore = usePerfilStore();

/// EMPRESA
const empresa = userStore.getEmpresa;

/// PESSOA
const pessoa = userStore.getPessoa as Pessoa;

const pessoaPerfis = computed(() => {
  return pessoa.pessoasPerfis?.map(
    (pessoaPerfil: PessoaPerfil) => pessoaPerfil.perfilId
  );
});

const isPessoaGerenteCompras = computed(() => {
  return pessoaPerfis.value?.includes(
    perfilStore.getBy("Gerente compras")?.id as number
  );
});

/// COTACAO
const cotacao = ref<Cotacao>(props.cotacaoProp);

const encaminharCotacao = () => {
  snackbarSet({
    titulo: "ENCAMINHAR",
    mensagem: "Deseja encaminhar cotação?",
    color: "warningSnackbar",
    timeout: 3000,
    callback: "encaminhaCotacao",
    isConfirm: true,
  });
};

const encaminhaCotacao = async () => {
  try {
    cotacao.value.statusId = statusStore.getBy("Ativo")?.id as number;
    await put(`cotacoes/encaminhar/${cotacao.value.uuid}`, cotacao.value);
  } catch (err) {
    console.log(err);
  }
};

const gerarPedido = () => {
  snackbarSet({
    titulo: "APROVAR",
    mensagem: "Deseja aprovar cotação?",
    color: "warningSnackbar",
    timeout: 3000,
    callback: "geraPedido",
    isConfirm: true,
  });
};

const geraPedido = async () => {
  try {
    cotacao.value.statusId = statusStore.getBy("Finalizado")?.id as number;
    const res = await put(
      `cotacoes/gerarpedido/${cotacao.value.uuid}`,
      cotacao.value
    );

    const mensagem = `${res} ${
      res > 1 ? "pedidos gerados." : "pedido gerado."
    } Deseja visualizar a lista?`;

    snackbarSet({
      titulo: "PEDIDO",
      mensagem: mensagem,
      color: "warningSnackbar",
      timeout: 3000,
      callback: "listarPedido",
      isConfirm: true,
    });
  } catch (err) {
    console.log(err);
  }
};

const listarPedido = async () => {
  useRouter().push("/pedido");
};

const aprovacaoCotacao = () => {
  snackbarSet({
    titulo: "APROVAÇÃO",
    mensagem: "Deseja enviar cotação para aprovação?",
    color: "warningSnackbar",
    timeout: 3000,
    callback: "aprovaCotacao",
    isConfirm: true,
  });
};

const aprovaCotacao = async () => {
  try {
    cotacao.value.statusId = statusStore.getBy("Em aprovação")?.id as number;
    await put(`cotacoes/aprovacao/${cotacao.value.uuid}`, cotacao.value);
  } catch (err) {
    console.log(err);
  }
};

const reprovarCotacao = () => {
  snackbarSet({
    titulo: "REPROVAR",
    mensagem: "Deseja reprovar cotação?",
    color: "warningSnackbar",
    timeout: 3000,
    callback: "reprovaCotacao",
    isConfirm: true,
  });
};

const reprovaCotacao = async () => {
  try {
    cotacao.value.statusId = statusStore.getBy("Ativo")?.id as number;
    await put(`cotacoes/reprova/${cotacao.value.uuid}`, cotacao.value);
  } catch (err) {
    console.log(err);
  }
};

/// REGIAO
const regioes = computed(() => {
  return regiaoStore.getRegioes;
});

///PANEL
const panels = ref<Array<any>>([]);

/// MODO
const isModoCompras = computed(() => {
  return (
    tipoItemStore.getBy("modalidadeCompras")?.id === controleStore.getModalidade
  );
});

/// SALVAR
const clickSalvar = async () => {
  emit("salvar", cotacao.value);
};

/// SNACKBAR
const snackbarStore = useSnackbarStore();
const setSnackbar = snackbarStore.set;

const showSnackbar = ref<boolean>(false);

const snackbarSet = (object: snackbarInterface) => {
  showSnackbar.value = true;
  setSnackbar(object);
};

const closeSnackBar = () => {
  console.log("fechou");
};

const confirmSnackBar = (callback?: string) => {
  if (callback) {
    eval(callback)();
  }
};
</script>

<style scoped></style>
