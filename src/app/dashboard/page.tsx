'use client'

import { get } from "@lib/api/lambda"
import { useState } from "react"

export default function Dashboard() {
  const [state, setState] = useState<any>()

  const handleClick = async () => {
    try {
      const result = await get('test2')
      setState(result)
    } catch (err) {
      console.error(err)
    }
  }

  return <>
    <button onClick={handleClick}>Get info</button><hr />
    { state }
  </>
}