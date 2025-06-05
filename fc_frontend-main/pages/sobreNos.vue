<template>
  <PaginasTitulos title="Sobre nós"></PaginasTitulos>

  <v-row justify="center">
    <v-col align="center" cols="12">
      <iframe
        :width="mdAndUp ? '60%' : '100%'"
        :height="mdAndUp ? '290' : '200'"
        :class="`${mdAndUp ? '' : 'mb-5'} mr-7 video`"
        src="https://www.youtube.com/embed/z6_7TrUUdUE?si=zflikFjU8MBlrVQW"
        title="Sobre o portal fecom, seu portal de ferramenta de compras"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>

      <p class="sobrenos">
        <span class="text-body-1 font-weight-regular">
          Durante os 13 anos de experiência na área de engenharia e manutenção
          na indústria, atuando diretamente com o departamento de compras
          utilizando procedimentos tradicionais, percebemos algumas dificuldades
          no processo de aquisição de peças e contratação de serviços: atrasos
          de entrega, produtos fora de especificação, serviços sem definição
          clara do escopo de trabalho etc.
        </span>
      </p>
      <p class="sobrenos">
        <span class="text-body-1 font-weight-regular">
          Sabendo que poderíamos cooperar para solucionar esse problema,
          desenvolvemos o Portal Fecom especialmente para que compradores possam
          dar um passo adiante nas suas negociações e dedicar seu tempo na
          estratégia e tomada de decisão, buscando cada vez mais a assertividade
          na gestão dos ativos da empresa.
        </span>
      </p>
      <p class="sobrenos">
        <span class="text-body-1 font-weight-regular">
          Pensando no departamento solicitante, consumidor final do produto ou
          serviço, além do ganho de tempo no retorno das compras, desenvolvemos
          uma forma de apoiar na elaboração de contratos de prestação de
          serviços e disponibilizar informações úteis na elaboração do cadastro
          de produtos evitando retrabalhos, atrasos, aumento de custos, entre
          outros imprevistos.
        </span>
      </p>
      <p class="sobrenos">
        <span class="text-body-1 font-weight-regular">
          Simultaneamente, os fornecedores terão a oportunidade de aumentar suas
          vendas participando de todas as cotações emitidas pelos compradores
          que utilizam nossa plataforma como ferramenta de trabalho.
        </span>
      </p>
      <p class="sobrenos">
        <span class="text-body-1 font-weight-regular">
          Também apostamos na capacitação pessoal dos usuários do portal
          disponibilizando artigos com o objetivo de agregar valor intelectual
          para a empresa e para a vida das pessoas.
        </span>
      </p>
    </v-col>
  </v-row>
  <v-row class="mt-10">
    <v-col>
      <v-row>
        <v-col>
          <span :class="`text-h5 font-weight-bold text-uppercase`">
            Missão
          </span>
        </v-col>
      </v-row>
      <v-row class="mt-n5">
        <v-col>
          <span class="text-body-1 font-weight-regular">
            Democratizar o acesso a um portal de compras e negociações
            corporativas de qualidade com segurança, praticidade e
            transparência.
          </span>
        </v-col>
      </v-row>
      <v-row class="mt-7">
        <v-col>
          <span :class="`text-h5 font-weight-bold text-uppercase`">
            Visão
          </span>
        </v-col>
      </v-row>
      <v-row class="mt-n5">
        <v-col>
          <span class="text-body-1 font-weight-regular">
            Ser referência na geração de oportunidades de negócios a nível
            nacional e disseminar conhecimento prático para agregar efetivamente
            na vida profissional das pessoas.
          </span>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <v-row class="mt-7">
    <v-col>
      <v-row>
        <v-col>
          <span :class="`text-h5 font-weight-bold text-uppercase`">
            Valores
          </span>
        </v-col>
      </v-row>
      <v-row class="mt-n5">
        <v-col>
          <span class="text-body-1 font-weight-regular">
            Respeito mútuo, integridade moral e ética e acreditar no potencial
            do ser humano.
          </span>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">

/// PAGINA
definePageMeta({
  layout: "menu",
});

/// HEAD
useHead({
  title: "Portal Fecom | Sobre nós",
  meta: [{ name: "Eventos", content: "Sobre nós. Ferramentas de compras" }],
});
</script>

<style lang="scss" scoped>
.video {
  float: left;
}

.sobrenos {
  text-align: justify;
  padding-bottom: 10px;
}
</style>
