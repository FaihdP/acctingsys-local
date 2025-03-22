import handleDeleteBank from "@lib/controllers/bank/handleDeleteBank"
import handleSaveBank from "@lib/controllers/bank/handleSaveBank"
import handleUpdateBank from "@lib/controllers/bank/handleUpdateBank"
import Bank, { BankDocument } from "@lib/db/schemas/bank/Bank"
import getBanks from "@lib/services/bank/getBanks"
import { useEffect, useReducer, useState } from "react"

enum ACTION {
  CREATE,
  UPDATE,
  DELETE
}

export default function useBankPopup() {
  const [banks, setBanks] = useState<BankDocument[]>()
  const [bank, setBank] = useState<BankDocument | Bank>()
  const [error, setError] = useState<string>()

  const [render, forceRender] = useReducer(s => s + 1, 0)

  useEffect(() => {
    async function fetchBanks() {
      setBanks((await getBanks()).data)
    }
    fetchBanks()
  }, [render, setBanks])

  const handleChangeBank = (field: string, value: string) => {
    setBank((prevBank) => {
      return { ...prevBank, [field]: value } as BankDocument
    })
  }

  const handleCloseModal = () => setBank(undefined)

  const handleError = (name?: string) => {
    const nameBoolean = Boolean(name)
    setError(nameBoolean ? undefined : "Campo obligatorio") 

    console.log(nameBoolean)
    return nameBoolean
  }

  const handleAction = async (action: ACTION) => {
    if (!bank) return
    if (action !== ACTION.DELETE && !handleError(bank?.name)) return

    const actionHandlers = {
      [ACTION.CREATE]: () => handleSaveBank(bank),
      [ACTION.UPDATE]: () => handleUpdateBank(bank as BankDocument),
      [ACTION.DELETE]: () => handleDeleteBank((bank as BankDocument)._id.$oid),
    }

    try {
      await actionHandlers[action]()
      handleCloseModal()
      setError(undefined)
      forceRender()
    } catch (error) {
      console.error(error)
    }

  }

  const handleSaveOrUpdate = async () => {
    if ('_id' in (bank || {})) await handleAction(ACTION.UPDATE)
    else await handleAction(ACTION.CREATE)
  }

  const handleDelete = async () => {
    await handleAction(ACTION.DELETE)
  }

  return {
    banks, setBanks,
    bank, setBank,
    error, setError,
    render, forceRender,
    handleChangeBank,
    handleCloseModal,
    handleError,
    handleAction,
    handleSaveOrUpdate,
    handleDelete
  }
}