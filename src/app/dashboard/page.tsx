'use client'

import { get } from "@lib/api/lambda"
import { useState } from "react"

export default function Dashboard() {
  const [state, setState] = useState<any>()

  const handleClick = async () => {
    const result = await get('test2')
    setState(result)
  }

  return <>
    <button onClick={handleClick}>Get info</button><hr />
    { state }
  </>
}