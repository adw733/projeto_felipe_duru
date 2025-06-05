<template>
  <v-layout class="overflow-visible footer">
    <v-bottom-navigation :elevation="5" grow>
      <template v-if="pageModeView">
        <v-btn v-if="extraButtons?.hasBack" value="Edit" @click="clickVoltar()">
          <v-icon class="mb-1">mdi-arrow-left</v-icon>
          Voltar
        </v-btn>
        <v-btn v-if="extraButtons?.hasEdit" value="Edit" @click="clickEdit()">
          <v-icon class="mb-1">mdi-pencil</v-icon>
          Editar
        </v-btn>
        <v-btn
          v-if="extraButtons?.hasShare"
          value="Share"
          @click="clickShare()"
        >
          <v-icon class="mb-1">mdi-share</v-icon>
          Compartilhar
        </v-btn>
        <v-btn
          v-if="extraButtons?.hasIncluir"
          value="Adicionar"
          @click="clickAdicionar()"
        >
          <v-icon class="mb-1">mdi-plus</v-icon>
          Adicionar
        </v-btn>
      </template>
      <template v-else-if="!pageModeView">
        <v-btn color="green" value="Save" @click="clickSalvar()">
          <v-icon color="green" class="mb-1">mdi-check</v-icon>
          <span class="text-green"> Salvar </span>
        </v-btn>
        <v-btn color="red" value="Cancel" @click="clickView()">
          <v-icon color="red" class="mb-1">mdi-cancel</v-icon>
          <span class="text-red"> Cancelar </span>
        </v-btn>
      </template>
    </v-bottom-navigation>
  </v-layout>
</template>

<script setup lang="ts">
export interface Props {
  pagina: string;
  rota?: string | string[];
  pageModeView: boolean;
  extraButtons?: {
    hasShare?: boolean;
    hasBack?: boolean;
    hasIncluir?: boolean;
    hasEdit?: boolean;
  };
}

const props = withDefaults(defineProps<Props>(), {
  pageModeView: true,
});

/// EMIT
const emit = defineEmits(["salvar", "share"]);

/// CONTEUDO
const clickEdit = async () => {
  const rota = props.rota ? `/${props.rota}` : "";
  useRouter().replace(`/${props.pagina}${rota}/edit`);
};

const clickAdicionar = async () => {
  useRouter().push(`/${props.pagina}/insert`);
};

const clickSalvar = async () => {
  emit("salvar");
};

const clickShare = async () => {
  emit("share");
};

const clickView = async () => {
  const rota = props.rota ? `/${props.rota}` : "";
  useRouter().replace(`/${props.pagina}${rota}`);
};

const clickVoltar = async () => {
  useRouter().back();
};
</script>

<style scoped>
.footer {
  position: fixed !important;
  left: 0;  
  bottom: 0px;
  width: 100%;
  color: white;
  text-align: center;
}
</style>
