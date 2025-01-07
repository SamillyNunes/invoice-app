<template>
  <div class="header flex">
    <div class="left flex flex-column">
      <h1>Faturas</h1>
      <span>Há um total de 4 faturas aqui</span>
    </div>
    <div class="right flex">
      <div class="filter flex" @click="toggleFilterMenu">
        <span>Filtrar pelo status</span>
        <img
          src="../assets/icon-arrow-down.svg"
          alt="Ícone de seta para baixo"
        />
        <ul v-show="filterMenu" class="filter-menu">
          <li>Rascunho</li>
          <li>Pendente</li>
          <li>Pago</li>
          <li>Limpar filtro</li>
        </ul>
      </div>
      <div class="button flex" @click="newInvoice">
        <div class="inner-button flex">
          <img src="../assets/icon-plus.svg" alt="Ícone de adicionar" />
        </div>
        <span>Nova fatura</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CustomHeader",

  data() {
    return {
      filterMenu: false,
    };
  },
  methods: {
    toggleFilterMenu() {
      this.filterMenu = !this.filterMenu;
    },
  },
});
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 65px;

  .left,
  .right {
    flex: 1;
  }

  .right {
    justify-content: flex-end;
    align-items: center;

    .button,
    .filter {
      align-items: center;

      span {
        font-size: 12px;
      }
    }

    .filter {
      cursor: pointer;
      position: relative;
      margin-right: 40px;

      img {
        margin-left: 12px;
        width: 9px;
        height: 5px;
      }

      .filter-menu {
        width: 120px;
        position: absolute;
        top: 25px;
        list-style: none;
        background-color: #1e2139;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.6);

        li {
          cursor: pointer;
          font-size: 12px;
          padding: 10px 12px;

          &:hover {
            color: #1e2139;
            background-color: #fff;
          }
        }
      }
    }

    .button {
      padding: 8px 10px;
      background-color: #7c5dfa;
      border-radius: 40px;

      .inner-button {
        margin-right: 8px;
        border-radius: 50%;
        padding: 8px;
        align-items: center;
        justify-content: center;
        background-color: #fff;

        img {
          width: 10px;
          height: 10px;
        }
      }
    }
  }
}
</style>
