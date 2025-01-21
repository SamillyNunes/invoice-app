<template>
  <div class="home container">
    <!-- Header -->
    <CustomHeader />

    <!-- Invoices -->
    <div v-if="invoices.length">
      <Invoice
        v-for="invoice in invoices"
        :key="invoice.invoiceId"
        :invoice="invoice"
      />
    </div>
    <div v-else class="empty flex flex-column">
      <img src="../assets/illustration-empty.svg" alt="Desenho simbolizando lista de faturas vazia." />
      <h3>Não há nada aqui.</h3>
      <p>Crie uma nova fatura clicando no botão Nova Fatura e dê inicio!</p>
    </div>
  </div>
</template>

<script lang="ts">
import CustomHeader from "@/components/CustomHeader.vue";
import Invoice from "@/components/Invoice.vue";
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "HomeView",
  components: { CustomHeader, Invoice },
  computed: {
    ...mapState(["invoices"]),
  },
});
</script>

<style lang="scss" scoped>
.home {
  color: #fff;

  .empty{
    margin-top: 160px;
    align-items: center;

    img{
      width: 214px;
      height: 200px;
    }

    h3{
      font-size: 20px;
      margin-top: 40px;
    }

    p{
      text-align: center;
      max-width: 224px;
      font-size: 12px;
      font-weight: 300;
      margin-top: 16px;
    }
  }
}
</style>
