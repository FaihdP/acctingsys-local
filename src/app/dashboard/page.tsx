'use client'

import get from "@lib/api/methods/get"
import post from "@lib/api/methods/post"
import { StartMigrationContext } from "@ui/startMigration/hooks/StartMigrationProvider"
import { useContext } from "react"

export default function Dashboard() {
  const { startMigration } = useContext(StartMigrationContext)

  const getLambda = async () => {
    console.log(await get("/"))
  }

  const postLambda = async () => {
    console.log(await post("/payments/create", {
      "PaymentID": "1",
      "date": "2025-01-31T23:49:14Z",
      "value": 7500,
      "type": "DIGITAL",
      "bank": "Bancolombia"
    }))
  }

  return (
    <>
      <button onClick={getLambda} className="bg-slate-600 py-2 px-5 rounded text-white">Get API Gateway</button>
      <button onClick={postLambda} className="bg-slate-600 py-2 px-5 rounded text-white ms-6">Post API Gateway</button>
      <button onClick={startMigration} className="bg-slate-600 py-2 px-5 rounded text-white ms-6">Init migration</button>
    </>
  )
}