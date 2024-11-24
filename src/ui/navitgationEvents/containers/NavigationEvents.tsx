'use client'

import validateToken from "@lib/token/validateToken"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"
import generateSearchParams from "../util/generateSearchParams"

export default function NavigationEvents() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(generateSearchParams, [searchParams])
 
  useEffect(() => {
    if (!validateToken()) router.push("/?" + createQueryString("err", "tokenExpired", searchParams))
  }, [pathname, searchParams, createQueryString, router])

  return <></>
}
