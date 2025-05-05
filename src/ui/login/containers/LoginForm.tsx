'use client'

import { ChangeEvent, FormEvent, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation";
import { LoginFormData } from "@ui/login/interfaces/LoginFormData";
import { validateCredentials } from "@lib/services/auth/validateCredentials";
import Input from "@ui/core/components/Input";
import COLORS from "@ui/core/util/colors";
import Button from "@ui/login/components/Button";
import acountCircleIcon from "@public/login/account_circle.svg"
import passwordIcon from "@public/login/password.svg"
import ErrorMessage from "../components/ErrorMessage";
import setToken from "@lib/token/setToken";
import URL_PARAMS from "@ui/core/util/urlParams";
import LOGIN_STATUS from "../interfaces/loginStatus";
import getErrorLogin from "../util/getErrorLogin";
import { UserDocument } from "@lib/db/schemas/user/User";
import getUserByUsername from "@lib/services/user/getUserByUsername";

export default function LoginForm() {
  const router = useRouter()
  const tokenError = useSearchParams().get(URL_PARAMS.TOKEN_ERROR)
  const [formData, setFormData] = useState<LoginFormData>({ username: "", password: "" })
  const [statusLogin, setStatusLogin] = useState<LOGIN_STATUS | null>(null)

  const validateForm = async (userData: UserDocument): Promise<LOGIN_STATUS> => {
    if (!formData.username || !formData.password) 
      return LOGIN_STATUS.VOID_CREDENTIALS
    
    if (!(await validateCredentials(formData, userData))) 
      return LOGIN_STATUS.BAD_CREDENTIALS
    
    return LOGIN_STATUS.OK
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const hanldeSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    try {
      const user = await getUserByUsername(formData.username) 
      setStatusLogin(LOGIN_STATUS.LOADING)
      const loginStatus = await validateForm(user)
      setStatusLogin(loginStatus)
      if (loginStatus === LOGIN_STATUS.OK) {
        setToken(user)
        router.push("/dashboard/sales")
      }
    } catch (err) {
      setStatusLogin(LOGIN_STATUS.ERROR)
      console.error((err as Error).message)
    }
  }

  const handleClickRegister = (e: FormEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    router.push("/register")
  }

  return (
    <section 
      className="
        max-w-lg 
        mx-auto 
        mt-[30px] 
        text-white 
        sm:rounded-lg
        items-center 
        justify-center 
        h-[400px] 
        shadow-[0_0_50px_0px_rgba(0,0,0,0.5)]
        flex 
        flex-col
      "
      style={{ backgroundColor: COLORS.DARK_BLUE }}
    >
      { 
        (statusLogin !== LOGIN_STATUS.LOADING || tokenError) && 
          <ErrorMessage message={getErrorLogin(statusLogin, tokenError)} /> 
      } 
          
      <form 
        onSubmit={hanldeSubmit} 
        className="
          text-black 
          flex 
          flex-col
          items-center
          mt-[70px]
        "
      >
        <Input
          type="text" 
          name="username"
          onChange={handleInputChange} 
          image={{ src: acountCircleIcon.src, alt: "account_circle_icon", width: 26, height: 26 }} 
          className="mb-[37px] h-[40px] w-[290px]" 
          placeholder="Nombre de usuario"
          value={formData.username}
        />
        <Input
          type="password" 
          name="password"
          onChange={handleInputChange} 
          image={{ src: passwordIcon.src, alt: "password_icon", width: 24, height: 24 }} 
          className="mb-[48px] h-[40px] w-[290px]"
          placeholder="Contraseña"
          value={formData.password}
        />
        <Button loading={statusLogin === LOGIN_STATUS.LOADING} />
        <a 
          href="#" 
          className="text-white underline text-[18px] font-light"
          onClick={handleClickRegister}
        >
          Registrarse
        </a>
      </form>
    </section>
  )
}
