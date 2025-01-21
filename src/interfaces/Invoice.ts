import InvoiceItem from "./InvoiceItem"

export default interface Invoice{
    docId: string,
    invoiceId: string,
    billerStreetAddress: string,
    billerCity: string,
    billerZipCode: string,
    billerCountry: string,
    clientName: string,
    clientEmail: string,
    clientStreetAddress: string,
    clientCity: string,
    clientZipCode: string,
    clientCountry: string,

    invoiceDateUnix: undefined | number,
    invoiceDate: string,

    paymentTerms: string,
    paymentDueDateUnix: null | number,
    paymentDueDate: string,

    productDescription: string,
    invoicePending: boolean,
    invoiceDraft: boolean,
    invoicePaid: null | boolean,
    invoiceItemList: Array<InvoiceItem>,
    invoiceTotal: number,
}