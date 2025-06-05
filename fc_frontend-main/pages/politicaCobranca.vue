<template>
  <PaginasTitulos title="Politíca de cobrança"></PaginasTitulos>

  <v-row justify="center">
    <v-col cols="12">
      <p class="descricao">
        <span class="text-body-1 font-weight-regular">
          Nossa política de cobrança parte do princípio do merecimento.
          Entendemos que é justo receber apenas quando o portal levar resultado
          ao fornecedor que, ao ganhar a negociação do mapa comparativo, paga
          uma taxa justa e simbólica para manter a plataforma ativa e para que
          nos possibilite trazer novas funcionalidades. Dessa maneira atrairemos
          novos compradores para alavancar o número de negociações e
          consequentemente levar resultado aos fornecedores.
        </span>
      </p>
      <p class="descricao">
        <span class="text-body-1 font-weight-regular">
          Tanto para o comprador quanto para o fornecedor, nossa plataforma
          contempla gratuitamente desde a efetivação do cadastro até a
          utilização das demais ferramentas listadas abaixo:
        </span>
      </p>
      <p class="descricao">
        <v-list>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo"> mdi-chevron-right </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span class="text-body-1 font-weight-regular">
                Acesso ao dashboard com os seus principais indicadores;
              </span>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="mt-n4">
            <v-list-item-icon>
              <v-icon color="indigo"> mdi-chevron-right </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span class="text-body-1 font-weight-regular">
                Cadastro de produtos / serviços;
              </span>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="mt-n4">
            <v-list-item-icon>
              <v-icon color="indigo"> mdi-chevron-right </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span class="text-body-1 font-weight-regular">
                Criação e envio de cotações com sistema de aprovação interna
                respeitando o organograma do comprador;
              </span>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="mt-n4">
            <v-list-item-icon>
              <v-icon color="indigo"> mdi-chevron-right </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span class="text-body-1 font-weight-regular">
                Cadastro de integrantes;
              </span>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="mt-n4">
            <v-list-item-icon>
              <v-icon color="indigo"> mdi-chevron-right </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span class="text-body-1 font-weight-regular">
                Acesso aos relatórios de compras e/ou vendas;
              </span>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="mt-n4">
            <v-list-item-icon>
              <v-icon color="indigo"> mdi-chevron-right </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span class="text-body-1 font-weight-regular">
                Consulta da lista de fornecedores;
              </span>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="mt-n4">
            <v-list-item-icon>
              <v-icon color="indigo"> mdi-chevron-right </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span class="text-body-1 font-weight-regular">
                Consulta de artigos;
              </span>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="mt-n4">
            <v-list-item-icon>
              <v-icon color="indigo"> mdi-chevron-right </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span class="text-body-1 font-weight-regular">
                Consulta de eventos;
              </span>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="mt-n4">
            <v-list-item-icon>
              <v-icon color="indigo"> mdi-chevron-right </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span class="text-body-1 font-weight-regular">
                Envio de convite aos seus parceiros;
              </span>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="mt-n4">
            <v-list-item-icon>
              <v-icon color="indigo"> mdi-chevron-right </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span class="text-body-1 font-weight-regular">
                Suporte técnico da plataforma.
              </span>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </p>
      <p class="descricao">
        <span class="text-body-1 font-weight-regular">
          Obs.: A criação do pedido de compras a partir do mapa comparativo é
          uma funcionalidade gratuita apenas ao comprador.
        </span>
      </p>
      <p class="descricao">
        <span class="text-body-1 font-weight-regular">
          Caro comprador, para que sua experiência no portal seja a melhor
          possível e para garantir que sua conta permaneça ativa, solicitamos
          que elabore os processos de compras do início ao fim. Desde a
          solicitação, emissão e envio do pedido de compras até a avalição dos
          respectivos fornecedores após o recebimento do produto e/ou serviço.
        </span>
      </p>
      <p class="descricao">
        <span class="text-body-1 font-weight-regular">
          A metodologia de cobrança é por meio de uma taxa com percentual
          decrescente sobre fechamento mensal do total de negociações que o
          fornecedor ganhou conforme gráfico abaixo:
        </span>
      </p>
    </v-col>
  </v-row>

  <v-row justify="center">
    <v-col align="center">
      <apexchart
        type="area"
        height="370"
        :options="optionsChart"
        :series="seriesChart"
      />
    </v-col>
  </v-row>
</template>
<script setup lang="ts">

/// PAGINA
definePageMeta({
  layout: "menu",
});

/// CONTEUDO
const optionsChart = ref<any>({
  dataLabels: {
    enabled: true,
    textAnchor: "middle",
    style: {
      fontSize: "12px",
    },
    formatter: function (value: number) {
      return numberFormat(value / 100, {
        style: "percent",
        minimumFractionDigits: 2,
      });
    },
    offsetY: -10,
    dropShadow: {
      enabled: true,
    },
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: "bottom",
          offsetX: -10,
          offsetY: 0,
        },
      },
    },
  ],
  chart: {
    type: "area",
    height: 500,
    stacked: true,
    toolbar: {
      show: true,
    },
    zoom: {
      enabled: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 10,
      dataLabels: {
        position: "center",
        total: {
          enabled: mdAndUp,
          offsetX: !mdAndUp ? 13 : 0,
          style: {
            fontSize: "13px",
            fontWeight: 700,
          },
        },
      },
    },
  },
  xaxis: {
    categories: [
      "R$ 5.000,00",
      "R$ 50.000,00",
      "R$ 100.000,00",
      "R$ 125.000,00",
      "R$ 150.000,00",
      "R$ 175.000,00",
      "R$ 200.000,00",
      "R$ 300.000,00",
      "R$ 400.000,00",
      "R$ 500.000,00",
      "R$ 600.000,00",
      "R$ 700.000,00",
      "R$ 800.000,00",
      "R$ 900.000,00",
      "R$ 1.000.000,00",
    ],
    title: {
      text: "Fechamento mensal do fornecedor",
    },
  },
  yaxis: [
    {
      axisTicks: {
        show: true,
      },
      title: {
        text: "Taxa",
      },
    },
  ],
  legend: {
    position: "right",
    offsetY: 40,
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.9,
      opacityTo: 1,
      stops: [1, 95, 100],
    },
  },
});

const seriesChart = ref<Array<any>>([
  {
    name: "Taxa",
    data: [
      2.0, 1.5, 1.15, 1.08, 1.03, 1.0, 0.98, 0.92, 0.89, 0.87, 0.79, 0.74, 0.69,
      0.66, 0.64,
    ],
  },
]);

/// HEAD
useHead({
  title: "Portal Fecom | Política de preço",
  meta: [{ name: "Eventos", content: "preço, plano" }],
});
</script>

<style lang="scss" scoped>
.descricao {
  text-align: justify;
  padding-bottom: 10px;
}
</style>
