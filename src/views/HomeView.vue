<template>
  <div class="home container">
    <!-- Header -->
    <CustomHeader />

    <!-- Invoices -->
    <div>
      <Invoice
        v-for="invoice in invoices"
        :key="invoice.invoiceId"
        :invoice="invoice"
      />
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
}
</style>
