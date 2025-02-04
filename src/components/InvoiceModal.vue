<template>
  <div @click="checkClick" class="invoice-wrap flex flex-column" ref="invoiceWrap">
    <form @submit.prevent="submitForm" class="invoice-content">

      <Loading v-show="loading" />

      <h1>{{ isEditingInvoice ? 'Editar Fatura' : 'Nova Fatura' }}</h1>

      <!-- Emitente da fatura -->
      <div class="bill-from flex-flex-column">
        <h4>Emitente da fatura / Empresa:</h4>
        <div class="input flex flex-column">
          <label for="billerStreetAddress">Endereço:</label>
          <input
            required
            type="text"
            id="billerStreetAddress"
            v-model="billerStreetAddress"
          />
        </div>

        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="billerCity">Cidade:</label>
            <input required type="text" id="billerCity" v-model="billerCity" />
          </div>
          <div class="input flex flex-column">
            <label for="billerZipCode">CEP:</label>
            <input
              required
              type="text"
              id="billerZipCode"
              v-model="billerZipCode"
            />
          </div>
          <div class="input flex flex-column">
            <label for="billerCountry">País:</label>
            <input
              required
              type="text"
              id="billerCountry"
              v-model="billerCountry"
            />
          </div>
        </div>
      </div>

      <!-- Bill To -->
      <div class="bill-to flex flex-column">
        <h4>Destinatário da fatura:</h4>

        <div class="input flex flex-column">
          <label for="clientName">Nome do Cliente:</label>
          <input required type="text" id="clientName" v-model="clientName" />
        </div>

        <div class="input flex flex-column">
          <label for="clientEmail">Email do Cliente:</label>
          <input required type="text" id="clientEmail" v-model="clientEmail" />
        </div>

        <div class="input flex flex-column">
          <label for="clientStreetAddress">Endereço do Cliente:</label>
          <input
            required
            type="text"
            id="clientStreetAddress"
            v-model="clientStreetAddress"
          />
        </div>

        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="clientCity">Cidade do Cliente:</label>
            <input required type="text" id="clientCity" v-model="clientCity" />
          </div>
          <div class="input flex flex-column">
            <label for="clientZipCode">CEP do Cliente:</label>
            <input
              required
              type="text"
              id="clientZipCode"
              v-model="clientZipCode"
            />
          </div>
          <div class="input flex flex-column">
            <label for="clientCountry">País do Cliente:</label>
            <input
              required
              type="text"
              id="clientCountry"
              v-model="clientCountry"
            />
          </div>
        </div>
      </div>

      <!-- Invoice Work Details -->
      <div class="invoice-work flex flex-column">
        <div class="payment flex">
          <div class="input flex flex-column">
            <label for="invoiceDate">Data da Fatura:</label>
            <input
              disabled
              required
              type="text"
              id="invoiceDate"
              v-model="invoiceDate"
            />
          </div>
          <div class="input flex flex-column">
            <label for="paymentDueDate">Data de vencimento:</label>
            <input
              disabled
              required
              type="text"
              id="paymentDueDate"
              v-model="paymentDueDate"
            />
          </div>
        </div>

        <div class="input flex flex-column">
          <label for="paymentTerms">Termos de Pagamento:</label>
          <select required id="paymentTerms" v-model="paymentTerms">
            <option value="30">30 dias</option>
            <option value="60">60 dias</option>
          </select>
        </div>
        <div class="input flex flex-column">
          <label for="productDescription">Descrição do produto:</label>
          <input
            required
            type="text"
            id="productDescription"
            v-model="productDescription"
          />
        </div>

        <div class="work-items">
          <h3>Lista de itens</h3>
          <table class="item-list">
            <thead>
              <tr class="table-heading flex">
                <th class="item-name">Nome do item</th>
                <th class="qty">Qtd</th>
                <th class="price">Preço</th>
                <th class="total">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-items flex"
                v-for="(item, index) in invoiceItemList"
                :key="index"
              >
                <td class="item-name">
                  <input type="text" v-model="item.name" />
                </td>
                <td class="qty">
                  <input type="text" v-model="item.quantity" />
                </td>
                <td class="price">
                  <input type="text" v-model="item.price" />
                </td>
                <td class="total flex">
                  R${{ (item.total = item.quantity * item.price) }}
                </td>
                <td @click="deleteInvoiceItem(item.id)">
                  <img src="../assets/icon-delete.svg" alt="Ícone de deletar" />
                </td>
              </tr>
            </tbody>
          </table>
          <div @click="addNewInvoiceItem" class="flex button">
            <img
              src="../assets/icon-plus.svg"
              alt="Ícone de adicionar novo item"
            />
            Adicionar novo item
          </div>
        </div>
      </div>

      <!-- Actions buttons -->
      <div class="save flex">
        <div class="left">
          <button @click="closeInvoice" type="button" class="red">
            Cancelar
          </button>
        </div>
        <div class="right">
          <button v-if="!isEditingInvoice" @click="saveDraft" type="submit" class="dark-purple">
            Salvar Rascunho
          </button>
          <button v-if="!isEditingInvoice" @click="publishInvoice" type="submit" class="purple">Criar Fatura</button>
          <button v-else @click="publishInvoice" type="submit" class="purple">Editar Fatura</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import InvoiceItem from "@/interfaces/InvoiceItem";
import { uid } from "uid";
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";
import { db } from "@/firebase/firebaseInit";
import { addDoc, collection } from "firebase/firestore";
import Loading from "./Loading.vue";

export default defineComponent({
  name: "InvoiceModal",
  components: { Loading },
  data() {
    return {
      loading: false,

      billerStreetAddress: "",
      billerCity: "",
      billerZipCode: "",
      billerCountry: "",
      clientName: "",
      clientEmail: "",
      clientStreetAddress: "",
      clientCity: "",
      clientZipCode: "",
      clientCountry: "",

      invoiceDateUnix: undefined as undefined | number,
      invoiceDate: "",
      dateOptions: {
        year: "numeric",
        month: "short",
        day: "numeric",
      } as Intl.DateTimeFormatOptions,

      paymentTerms: "",
      paymentDueDateUnix: null as null | number,
      paymentDueDate: "",

      productDescription: "",
      invoicePending: false,
      invoiceDraft: false,
      invoiceItemList: [] as Array<InvoiceItem>,
      invoiceTotal: 0,
    };
  },
  created() {
    // pega as datas atuais para os campos de data da fatura
    console.log("entrou no created!");
    this.invoiceDateUnix = Date.now();
    console.log(this.invoiceDateUnix.toString());
    this.invoiceDate = new Date(this.invoiceDateUnix).toLocaleDateString(
      "pt-br",
      this.dateOptions
    );
    console.log(this.invoiceDate);
  },
  methods: {
    ...mapMutations(["TOGGLE_INVOICE", 'TOGGLE_MODAL', 'TOGGLE_EDIT_INVOICE']),
    checkClick(e:any){
      if(e.target===this.$refs.invoiceWrap){
        this.TOGGLE_MODAL();
      }
    },
    closeInvoice() {
      this.TOGGLE_INVOICE();
      if(this.isEditingInvoice){
        this.TOGGLE_EDIT_INVOICE();
      }
    },
    addNewInvoiceItem() {
      this.invoiceItemList.push({
        id: uid(),
        name: "",
        quantity: 0,
        price: 0,
        total: 0,
      } as InvoiceItem);
    },
    deleteInvoiceItem(id: string) {
      this.invoiceItemList = this.invoiceItemList.filter((i) => i.id !== id);
    },
    calcInvoiceTotal() {
      // resetando pra zero para garantir que, ao calcular, nao incremente em um valor
      // anteriormente ja calculado
      this.invoiceTotal = 0;
      this.invoiceItemList.forEach((item) => {
        this.invoiceTotal += item.total;
      });
    },
    publishInvoice() {
      this.invoicePending = true;
    },
    saveDraft() {
      this.invoiceDraft = true;
    },
    async uploadInvoice() {
      if (this.invoiceItemList.length <= 0) {
        alert("Por favor insira itens na fatura.");
        return;
      }

      this.loading=true;

      this.calcInvoiceTotal();

      const docReference = collection(db, "invoices");
      await addDoc(docReference, {
        invoiceId: uid(6),
        billerStreetAddress: this.billerStreetAddress,
        billerCity: this.billerCity,
        billerZipCode: this.billerZipCode,
        billerCountry: this.billerCountry,
        clientName: this.clientName,
        clientEmail: this.clientEmail,
        clientStreetAddress: this.clientStreetAddress,
        clientCity: this.clientCity,
        clientZipCode: this.clientCity,
        clientCountry: this.clientCountry,

        invoiceDateUnix: this.invoiceDateUnix,
        invoiceDate: this.invoiceDate,

        paymentTerms: this.paymentTerms,
        paymentDueDateUnix: this.paymentDueDateUnix,
        paymentDueDate: this.paymentDueDate,

        productDescription: this.productDescription,
        invoiceItemList: this.invoiceItemList,
        invoicePending: this.invoicePending,
        invoiceDraft: this.invoiceDraft,
        invoiceTotal: this.invoiceTotal,
        invoicePaid: null,
      });

      this.loading=false;
      
      this.TOGGLE_INVOICE();

    },
    submitForm() {
      this.uploadInvoice();
    },
  },
  computed: {
    ...mapState(["isEditingInvoice"]),
  },
  watch: {
    // o nome tem que corresponder ao nome da var que se quer observar e reagir a mudancas
    paymentTerms() {
      const futureDate = new Date();
      const paymentTermsConverted = parseInt(this.paymentTerms);
      this.paymentDueDateUnix = futureDate.setDate(
        futureDate.getDate() + paymentTermsConverted
      );
      this.paymentDueDate = new Date(
        this.paymentDueDateUnix
      ).toLocaleDateString("pt-br", this.dateOptions);
    },
  },
});
</script>

<style lang="scss" scoped>
.invoice-wrap {
  position: fixed;
  top: 0;
  left: 0;
  background-color: transparent;
  width: 100%;
  height: 100vh;
  overflow: scroll;
  // o estilo abaixo fara com que nao apareca o scroll na animacao
  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 900px) {
    left: 90px;
  }

  .invoice-content {
    position: relative;
    padding: 56px;
    max-width: 700px;
    width: 100%;
    background-color: #141625;
    color: #fff;

    box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2),
      0 2px 4px -1px rgba(0, 0, 0, 0.6);

    h1 {
      margin-bottom: 48px;
      color: #fff;
    }

    h3 {
      margin-bottom: 16px;
      font-size: 18px;
      color: #777f98;
    }

    h4 {
      color: #7c5dfa;
      font-size: 12px;
      margin-bottom: 24px;
    }

    // Bill To / Bill From
    .bill-to,
    .bill-from {
      margin-bottom: 48px;

      .location-details {
        gap: 16px;

        div {
          // definido para que ocupem o mesmo espaco
          flex: 1;
        }
      }
    }

    // Invoice work:
    .invoice-work {
      .payment {
        gap: 24px;
        div {
          flex: 1;
        }
      }

      .work-items {
        .item-list {
          width: 100%;

          // Estilos dos itens da tabela
          .table-heading,
          .table-items {
            gap: 16px;
            font-size: 12px;

            .item-name {
              flex-basis: 50%;
            }

            .qty {
              flex-basis: 10%;
            }

            .price {
              flex-basis: 20%;
            }

            .total {
              flex-basis: 20%;
              align-self: center;
            }
          }

          .table-heading {
            margin-bottom: 16px;

            th {
              text-align: left;
            }
          }

          .table-items {
            position: relative;
            margin-bottom: 24px;

            img {
              position: absolute;
              top: 15px;
              right: 0;
              width: 12px;
              height: 16px;
            }
          }
        }

        .button {
          color: #fff;
          background-color: #252945;
          align-items: center;
          justify-content: center;
          width: 100%;

          img {
            margin-right: 4px;
          }
        }
      }
    }

    .save {
      margin-top: 60px;

      div {
        flex: 1;
      }

      .right {
        justify-content: flex-end;
      }
    }
  }

  .input {
    margin-bottom: 24px;
  }

  label {
    font-size: 12px;
    margin-bottom: 6px;
  }

  input,
  select {
    width: 100%;
    background-color: #1e2139;
    color: #fff;
    border-radius: 4px;
    padding: 12px 4px;
    border: none;

    &:focus {
      outline: none;
    }
  }
}
</style>
