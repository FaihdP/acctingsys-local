import find from "@lib/db/repositories/find";
import { InvoiceDocument } from "@lib/db/schemas/invoice/Invoice";

export default async function getInvoices() {
  //return await find<InvoiceDocument>("invoices", {})
  //await new Promise(r => setTimeout(r, 1000))
  return [
    {
      _id: "23091849021",
      date: "14/01/2024 12:21:39 p.m.",
      value: 100000,
      person: {
        name: "Pepito",
        lastname: "Perez"
      },
      status: "Pagada",
      user: {
        name: "Faihd",
        lastname: "Pineda"
      },
      productOverview: [
        "Tomate",
        "Papa",
        "Mayonesa"
      ]
    },
    {
      _id: "230918490245",
      date: "14/01/2024 09:21:39 a.m.",
      value: 1500000,
      person: {
        name: "Juan",
        lastname: "Murillo"
      },
      status: "En deuda",
      user: {
        name: "Faihd",
        lastname: "Pineda"
      },
      productOverview: [
        "Tomate",
        "Zanahoria",
        "Alverja"
      ]
    },
  ]
}