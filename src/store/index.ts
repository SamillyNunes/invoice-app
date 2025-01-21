import { createStore } from 'vuex';
import { db } from '@/firebase/firebaseInit';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import Invoice from '@/interfaces/Invoice';

export default createStore({
  state: {
    invoices: [] as Array<Invoice>,
    invoicesLoaded: false,
    invoiceModal: false,
    modalActive: false,
  },
  mutations: {
    TOGGLE_INVOICE(state){
      state.invoiceModal = !state.invoiceModal;
    },
    TOGGLE_MODAL(state){
      state.modalActive=!state.modalActive;
    },
    SET_INVOICE_DATA(state, payload){
      state.invoices.push(payload);
    },
    SET_INVOICES_LOADED(state){
      state.invoicesLoaded=true;
    }
  },
  actions: {
    async GET_INVOICES({commit, state}){
      const collectionRef = collection(db, 'invoices');
      const response = await getDocs(collectionRef);
      
      response.forEach(doc => {
        if(!state.invoices.some(i => i.docId === doc.id)){
          const newInvoice = {
            docId: doc.id,
            invoiceId: doc.data().invoiceId,
            billerStreetAddress: doc.data().billerStreetAddress,
            billerCity: doc.data().billerCity,
            billerZipCode: doc.data().billerZipCode,
            billerCountry: doc.data().billerCountry,
            clientName: doc.data().clientName,
            clientEmail: doc.data().clientEmail,
            clientStreetAddress: doc.data().clientStreetAddress,
            clientCity: doc.data().clientCity,
            clientZipCode: doc.data().clientZipCode,
            clientCountry: doc.data().clientCountry,
            invoiceDateUnix: doc.data().invoiceDateUnix,
            invoiceDate: doc.data().invoiceDate,
            paymentTerms: doc.data().paymentTerms,
            paymentDueDateUnix: doc.data().paymentDueDateUnix,
            paymentDueDate: doc.data().paymentDueDate,
            productDescription: doc.data().productDescription,
            invoiceItemList: doc.data().invoiceItemList,
            invoiceTotal: doc.data().invoiceTotal,
            invoicePending: doc.data().invoicePending,
            invoicePaid: doc.data().invoicePaid,
            invoiceDraft: doc.data().invoiceDraft,
          } as Invoice;

          commit('SET_INVOICE_DATA', newInvoice);
        }
      });

      commit('SET_INVOICES_LOADED', true);
      
    }
  },
  modules: {
  }
})
