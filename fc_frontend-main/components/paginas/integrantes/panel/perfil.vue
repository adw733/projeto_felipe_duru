<template>
  <v-expansion-panel :key="componentKey">
    <v-expansion-panel-title>
      <v-row>
        <v-col align="start" cols="10">
          <span class="text-h6 font-weight-medium"> Perfis </span>
        </v-col>
        <v-col v-if="perfis.length <= 0" cols="2">
          <v-icon large color="red"> mdi-circle-small </v-icon>
        </v-col>
      </v-row>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <div>
        <v-row justify="center" v-if="onlyView">
          <v-col align="center">
            <v-chip
              v-for="(perfil, i) in perfis"
              :key="i"
              class="ma-1"
              color="cyan"
              label
              text-color="white"
              size="small"
            >
              <v-icon start icon="mdi-label"></v-icon>
              {{ perfilStore.getBy(perfil.perfilId)?.nome }}
            </v-chip>
          </v-col>
        </v-row>
        <v-row justify="center" v-else>
          <v-col align="center">
            <v-select
              v-model="perfisId"
              :items="tipoPerfis"
              label="Perfis"
              density="compact"
              item-title="text"
              item-value="value"
              multiple
              variant="underlined"
            />
          </v-col>
        </v-row>
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { useUserStore } from "../../../../stores/users/user";
import { usePerfilStore } from "../../../../stores/perfis/perfil";
import { PessoaPerfil } from "../../../../types/pessoas/pessoa-perfil";
import { Pessoa } from "../../../../types/pessoas/pessoa";
import { Perfil } from "../../../../types/perfis/perfil";

const props = defineProps({
  pessoa: {
    type: Object as PropType<Pessoa>,
    required: true,
  },
  pageModeView: {
    type: Boolean,
    required: true,
  },
});

/// COMPONENTKEY
const componentKey = ref<number>(0);

const updateComponent = () => {
  componentKey.value += componentKey.value + 1;
};

/// USER
const userStore = useUserStore();
const pessoa = userStore.getPessoa;

/// PERFIL
const perfilStore = usePerfilStore();
const perfis = ref<Array<PessoaPerfil>>(
  props.pessoa.pessoasPerfis || new Array<PessoaPerfil>()
);
const perfisId = ref<Array<number>>(
  perfis.value.map((perfil: PessoaPerfil) => perfil.perfilId)
);

const podeCadastrar = computed(() => {
  const allowCadastrar: Array<number> = [];

  pessoa.pessoasPerfis.forEach((perfilUsuario: PessoaPerfil) => {
    perfilStore
      .getBy(perfilUsuario.perfilId)
      ?.options?.podeCadastrar.forEach((perfilId: number) => {
        allowCadastrar.push(perfilId);
      });
  });

  return [...new Set(allowCadastrar)];
});

const podeAlterar = computed(() => {
  const allowAlterar: Array<number> = [];

  pessoa.pessoasPerfis.forEach((perfilUsuario: PessoaPerfil) => {
    perfilStore
      .getBy(perfilUsuario.perfilId)
      ?.options?.podeCadastrar.forEach((perfilId: number) => {
        allowAlterar.push(perfilId);
      });
  });

  return [...new Set(allowAlterar)];
});

const tipoPerfis = computed(() => {
  const permissao = props.pessoa.id ? podeAlterar.value : podeCadastrar.value;

  return perfilStore.getAll
    .filter((perfil: Perfil) => permissao.includes(perfil.id))
    .map((perfil: Perfil) => {
      return {
        value: perfil.id,
        text: perfil.nome,
      };
    });
});

watch(perfisId, () => {
  if (perfisId.value.length > perfis.value.length) {
    console.log(perfis.value);
    perfis.value?.push({
      statusId: 2,
      pessoaId: props.pessoa.id || null,
      perfilId: perfisId.value[perfisId.value.length - 1],
    });
  } else {
    const ids = perfis.value.map((perfil: PessoaPerfil) => perfil.perfilId);

    const setIds = new Set(ids);
    const setPerfisId = new Set(perfisId.value);

    const difference = [...setIds].filter(
      (element) => !setPerfisId.has(element)
    );

    const index = perfis.value.findIndex((perfil: PessoaPerfil) =>
      difference.includes(perfil.perfilId)
    );

    perfis.value?.splice(index, 1);
  }
});

/// VIEW
const onlyView = computed(() => {
  return (
    (props.pessoa.id && !podeAlterar.value) ||
    (!props.pessoa.id && !podeCadastrar.value) ||
    props.pageModeView
  );
});

// EMIT
const emit = defineEmits(["update:modelValue"]);
</script>

<style scoped></style>
