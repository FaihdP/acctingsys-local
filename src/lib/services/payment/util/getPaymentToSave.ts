import Payment from "@lib/db/schemas/payment/Payment";

export default function getPaymentToSave(
  payments: Payment[]
): Payment[] {
  return payments.map((payment) => {
    const user: any = payment.user
    const userId = user.userId
    delete user.userId
    return {
      date: payment.date,
      isDeleted: false,
      migrated: false,
      type: payment.type,
      user: user,
      userId: userId,
      value: parseInt(payment.value.toString()),
      bank: payment.bank || undefined,
      bankId: payment.bankId || undefined,
      invoiceId: payment.invoiceId || undefined,
      personId: payment.personId || undefined,
      person: payment.person || undefined,
    }
  })
}
