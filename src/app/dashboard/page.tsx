'use client'

import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter()
  return <>
    <a onClick={() => router.push("dashboard/table-example")}>Ejemplo de tabla</a>
  </>
}