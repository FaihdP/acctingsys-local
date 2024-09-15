'use client'

import { ChangeEvent, FormEvent, useState } from "react"
import { useRouter } from "next/navigation";
import { LoginFormData } from "@ui/core/interfaces/LoginFormData";
import { validateCredentials } from "@lib/services/auth/login";
import Input from "@ui/core/components/Input";
import COLORS from "@ui/core/util/colors";
import Button from "@ui/login/components/Button";
import acountCircleIcon from "@public/login/account_circle.svg"
import passwordIcon from "@public/login/password.svg"
import ErrorMessage from "../components/ErrorMessage";

enum LOGIN_STATUS {
  VOID_CREDENTIALS,
  BAD_CREDENTIALS,
  LOADING,
  OK,
  ERROR
}

export default function LoginForm() {
  const router = useRouter()

  const [formData, setFormData] = useState<LoginFormData>({ userName: "", password: "" })
  const [statusLogin, setStatusLogin] = useState<LOGIN_STATUS | null>(null)

  const validateForm = async (): Promise<LOGIN_STATUS> => {
    if (!formData.userName || !formData.password) 
      return LOGIN_STATUS.VOID_CREDENTIALS
    
    try {
      if (!(await validateCredentials(formData))) 
        return LOGIN_STATUS.BAD_CREDENTIALS
    } catch (err) {
      return LOGIN_STATUS.ERROR
    }
    
    return LOGIN_STATUS.OK
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const hanldeSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    try {
      setStatusLogin(LOGIN_STATUS.LOADING)
      const loginStatus = await validateForm()
      setStatusLogin(loginStatus)
      if (loginStatus === LOGIN_STATUS.OK) router.push("/dashboard")
    } catch (err) {
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
      { statusLogin === LOGIN_STATUS.VOID_CREDENTIALS && 
          <ErrorMessage message="Es necesario llenar todos los campos del formulario 🙂" /> } 
          
      { statusLogin === LOGIN_STATUS.BAD_CREDENTIALS &&
          <ErrorMessage message="Usuario o contraseña incorrectas 😑" /> }

      { statusLogin === LOGIN_STATUS.ERROR &&
          <ErrorMessage message="Tenemos un problema con nuestro servicio ⚠️" /> }

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
          name="userName"
          onChange={handleInputChange} 
          image={{ src: acountCircleIcon.src, alt: "account_circle_icon", width: 26, height: 26 }} 
          className="mb-[37px]" 
          placeholder="Nombre de usuario"
          value={formData.userName}
        />
        <Input
          type="password" 
          name="password"
          onChange={handleInputChange} 
          image={{ src: passwordIcon.src, alt: "password_icon", width: 24, height: 24 }} 
          className="mb-[48px]"
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
