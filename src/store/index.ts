import { createStore } from 'vuex';
import { db } from '@/firebase/firebaseInit';
import { collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import Invoice from '@/interfaces/Invoice';

export default createStore({
  state: {
    invoices: [] as Array<Invoice>,
    invoicesLoaded: false,
    invoiceModal: false,
    modalActive: false,
    currentInvoiceArray: null as null | Array<Invoice>,
    isEditingInvoice: false,
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
    },
    SET_CURRENT_INVOICE(state, payload){
      state.currentInvoiceArray = state.invoices.filter(invoice => invoice.invoiceId === payload );
    },
    TOGGLE_EDIT_INVOICE(state){
      state.isEditingInvoice=!state.isEditingInvoice;
    },
    DELETE_INVOICE(state, payload){
      state.invoices = state.invoices?.filter(invoice => invoice.docId!==payload) ?? null;
    },
    UPDATE_STATUS_TO_PAID(state, payload){
      state.invoices.forEach(i => {
        if(i.docId===payload){
          i.invoicePaid = true;
          i.invoicePending=false;
        }
      });
    },
    UPDATE_STATUS_TO_PENDING(state, payload){
      state.invoices.forEach(i => {
        if(i.docId===payload){
          i.invoicePaid = false;
          i.invoicePending=true;
          i.invoiceDraft=false;
        }
      });
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
      
    },
    async UPDATE_INVOICE({commit, dispatch}, {docId, routeId}){
      commit('DELETE_INVOICE', docId);
      await dispatch('GET_INVOICES');
      commit('TOGGLE_INVOICE');
      commit('TOGGLE_EDIT_INVOICE');
      commit('SET_CURRENT_INVOICE', routeId);
    },
    async DELETE_INVOICE({commit}, docId){
      const invoiceDoc = doc(collection(db, 'invoices'), docId);
      await deleteDoc(invoiceDoc);
      commit('DELETE_INVOICE', docId);
      
    },
    async UPDATE_STATUS_TO_PAID({commit}, docId){
      const invoiceDoc = doc(collection(db, 'invoices'), docId);
      await updateDoc(invoiceDoc, {
        invoicePaid: true,
        invoicePending: false,
      });
      commit('UPDATE_STATUS_TO_PAID', docId);
    },
    async UPDATE_STATUS_TO_PENDING({commit}, docId){
      const invoiceDoc = doc(collection(db, 'invoices'), docId);
      await updateDoc(invoiceDoc, {
        invoicePaid: false,
        invoicePending: true,
        invoiceDraft: false,
      });
      commit('UPDATE_STATUS_TO_PAID', docId);
    }
  },
  modules: {
  }
})
