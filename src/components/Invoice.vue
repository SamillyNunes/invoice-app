<template>
  <router-link to="" class="invoice flex">
    <div class="left flex">
      <span class="tracking-number">#{{ invoice.invoiceId }}</span>
      <span class="due-date">{{ invoice.paymentDueDate }}</span>
      <span class="person">{{ invoice.clientName }}</span>
    </div>
    <div class="right flex">
      <span class="price">${{ invoice.invoiceTotal }}</span>
      <div
        class="status-button flex"
        :class="{
          paid: invoice.invoicePaid,
          draft: invoice.invoiceDraft,
          pending: invoice.invoicePending,
        }"
      >
        <span v-if="invoice.invoicePaid">Pago</span>
        <span v-if="invoice.invoiceDraft">Rascunho</span>
        <span v-if="invoice.invoicePending">Pendente</span>
      </div>
      <div class="icon">
        <img src="../assets/icon-arrow-right.svg" alt="Ícone de seguir a direita" />
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Invoice from "@/interfaces/Invoice";

export default defineComponent({
  name: "InvoiceComponent",
  props: {
    invoice: {
      type: Object as PropType<Invoice>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>

.invoice{
    text-decoration: none;
    cursor: pointer;
    gap: 16px;
    margin-bottom: 16px;
    color: #fff;
    background-color: #1e2139;
    border-radius: 20px;
    padding: 28px 32px;
    align-items: center;

    span{
        font-size: 13px;
    }

    .left{
        align-items: center;
        flex-basis: 60%;
        gap: 16px;

        span{
            flex: 1;
        }

        .tracking-number{
            text-transform: uppercase;
        }
    }

    .right{
        gap: 16px;
        flex-basis: 40%;
        align-items: center;

        .price{
            flex: 1;
            font-size: 16px;
            font-weight: 600;
        }
    }
}

</style>
