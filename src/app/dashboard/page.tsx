'use client'

import { get } from "@lib/api/lambda"
import { generateSalt } from "@lib/util/salt"
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
    <button onClick={generateSalt}>Get salt</button><hr />
    { state }
  </>
}