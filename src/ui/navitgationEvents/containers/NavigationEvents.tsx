'use client'

import validateToken from "@lib/token/validateToken"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"
import generateSearchParams from "../util/generateSearchParams"
import URL_PARAMS from "@ui/core/util/urlParams"
import TOKEN_RESPONSE from "@lib/token/TokenResponse"

export default function NavigationEvents() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(generateSearchParams, [searchParams])
 
  useEffect(() => {
    const tokenResponse = validateToken()
    if (tokenResponse !== TOKEN_RESPONSE.OK) 
      router.push("/?" + createQueryString(URL_PARAMS.TOKEN_ERROR, tokenResponse.toString(), searchParams))
  }, [pathname, searchParams, createQueryString, router])

  return <></>
}
