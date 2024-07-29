export default function formatCurrency(number: number): string {
  const cop = Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 })
  return cop.format(number)
}