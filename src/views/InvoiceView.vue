<template>
    <div>{{ currentInvoice?.clientName }}</div>
</template>

<script lang="ts">
import Invoice from '@/interfaces/Invoice';
import { defineComponent } from 'vue';
import { mapMutations, mapState } from 'vuex';


export default defineComponent({
    name: 'InvoiceView',
    data(vm) {
        return {
            currentInvoice: null as null | Invoice,
        }
    },
    created(){
        this.getCurrentInvoice();
    },
    methods:{
        ...mapMutations(['SET_CURRENT_INVOICE']),
        getCurrentInvoice(){
            this.SET_CURRENT_INVOICE(this.$route.params?.invoiceId);
            this.currentInvoice = this.currentInvoiceArray[0];
        }
    },
    computed: {
        ...mapState(['currentInvoiceArray']),
    }
});

</script>