'use client'

import { ChangeEvent, FormEvent, useState } from "react"
import { useRouter } from "next/navigation";
import InputForm from "@ui/login/components/Input";
import { FormData } from "@lib/interfaces/loginFormData";
import { validateCredentials } from "@lib/auth/login";
import COLORS from "@ui/colors";
import acountCircleIcon from "@public/login/account_circle.svg"
import passwordIcon from "@public/login/password.svg"
import Button from "./components/Button";

enum LOGIN_STATUS {
  VOID_CREDENTIALS = "VOID_CREDENTIALS",
  BAD_CREDENTIALS = "BAD_CREDENTIALS",
  LOADING = "LOADING",
  OK = "OK",
}

export default function LoginForm() {
  const router = useRouter()

  const [formData, setFormData] = useState<FormData>({ userName: "", password: "" })
  const [statusLogin, setStatusLogin] = useState<LOGIN_STATUS | null>(null)

  const validateForm = async (): Promise<LOGIN_STATUS> => {
    if (!formData.userName || !formData.password) 
      return LOGIN_STATUS.VOID_CREDENTIALS
    
    if (!(await validateCredentials(formData))) 
      return LOGIN_STATUS.BAD_CREDENTIALS
    
    return LOGIN_STATUS.OK
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const hanldeSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatusLogin(LOGIN_STATUS.LOADING)
    
    try {
      const loginStatus = await validateForm()
      setStatusLogin(loginStatus)
      
      if (loginStatus === LOGIN_STATUS.OK) {
        setStatusLogin(loginStatus)
        router.push("/dashboard")
      }
    } catch (err) {}
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
          <span className="text-red-400 absolute mb-64 font-bold max-w-md">
            Es necesario llenar todos los campos del formulario 🙂 
          </span> } 
          
      { statusLogin === LOGIN_STATUS.BAD_CREDENTIALS &&
          <span className="text-red-400 absolute mb-64 font-bold max-w-md">
            Usuario o contraseña incorrectas 😑
          </span> } 

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
        <InputForm 
          type="text" 
          name="userName"
          onChange={handleInputChange} 
          image={{ src: acountCircleIcon.src, alt: "account_circle_icon", width: 26, height: 26 }} 
          className="mb-[37px]" 
          placeholder="Nombre de usuario"
          value={formData.userName}
        />
        <InputForm 
          type="password" 
          name="password"
          onChange={handleInputChange} 
          image={{ src: passwordIcon.src, alt: "password_icon", width: 24, height: 24 }} 
          className="mb-[48px]"
          placeholder="Contraseña"
          value={formData.password}
        />
        <Button loading={statusLogin === LOGIN_STATUS.LOADING} />
        <a href="#" className="text-white underline text-[18px] font-light">Registrarse</a>
      </form>
    </section>
  )
}
