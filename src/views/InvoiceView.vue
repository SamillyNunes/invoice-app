<template>
  <div v-if="currentInvoice" class="invoice-view container">
    <router-link class="nav-link flex" :to="{ name: 'home' }">
      <img
        src="../assets/icon-arrow-left.svg"
        alt="Ícone de voltar para tela inicial"
      />
      Voltar para Home
    </router-link>
    <!-- Header -->
    <div class="header flex">
      <div class="left flex">
        <span>Status</span>
        <div
          class="status-button flex"
          :class="{
            paid: currentInvoice.invoicePaid,
            draft: currentInvoice.invoiceDraft,
            pending: currentInvoice.invoicePending,
          }"
        >
          <span v-if="currentInvoice.invoicePaid">Pago</span>
          <span v-if="currentInvoice.invoiceDraft">Rascunho</span>
          <span v-if="currentInvoice.invoicePending">Pendente</span>
        </div>
      </div>
      <div class="right flex">
        <button class="dark-purple">Editar</button>
        <button class="red">Deletar</button>
        <button v-if="currentInvoice.invoicePending" class="green">
          Marcar como Pago
        </button>
        <button v-if="!currentInvoice.invoicePending" class="orange">
          Marcar como Pendente
        </button>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import Invoice from "@/interfaces/Invoice";
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";

export default defineComponent({
  name: "InvoiceView",
  data(vm) {
    return {
      currentInvoice: null as null | Invoice,
    };
  },
  created() {
    this.getCurrentInvoice();
  },
  methods: {
    ...mapMutations(["SET_CURRENT_INVOICE"]),
    getCurrentInvoice() {
      this.SET_CURRENT_INVOICE(this.$route.params?.invoiceId);
      this.currentInvoice = this.currentInvoiceArray[0];
    },
  },
  computed: {
    ...mapState(["currentInvoiceArray"]),
  },
});
</script>
