<template>
  <div class="modal flex">
    <div class="modal-content">
      <p>Você tem certeza que quer sair? Suas modificações não serão salvas.</p>
      <div class="actions flex">
        <button @click="closeModal" class="purple">Voltar</button>
        <button @click="closeInvoice" class="red">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";

export default defineComponent({
  name: "AppModal",
  methods: {
    ...mapMutations(["TOGGLE_MODAL", "TOGGLE_INVOICE", "TOGGLE_EDIT_INVOICE"]),
    closeModal() {
      this.TOGGLE_MODAL();
    },
    closeInvoice() {
      this.TOGGLE_MODAL();
      this.TOGGLE_INVOICE();
      if(this.isEditingInvoice){
        this.TOGGLE_EDIT_INVOICE();
      }
    },
  },
  computed: {
    ...mapState(["isEditingInvoice"]),
  },
});
</script>

<style lang="scss" scoped>
.modal {
  z-index: 100;
  position: fixed;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;

  .modal-content {
    color: #fff;
    background-color: #252945;
    border-radius: 20px;
    padding: 48px 32px;
    max-width: 450px;

    p {
      text-align: center;
    }

    .actions {
      margin-top: 24px;
      button {
        flex: 1;
      }
    }
  }
}
</style>
