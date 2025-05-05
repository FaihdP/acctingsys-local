import Input from "@ui/core/components/Input";
import COLORS from "@ui/core/util/colors";
import { RegisterFormData } from "@ui/login/interfaces/RegisterFormData";
import AddUserIcon from "@public/login/add_user.svg"
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import saveUser from "@lib/services/user/saveUser";
import setToken from "@lib/token/setToken";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<RegisterFormData>({ 
    identification: "",
    user: "",
    names: "",
    lastnames: "",
    password: ""
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSaveUser = async () => {
    const user = await saveUser(formData)
    setToken(user)
    router.push("/dashboard/sales")
  }

  return (
    <>
      <span className="text-[40px] mt-[150px]">Crea tu usuario</span>
      <Input 
        name="identification" 
        type="text" 
        placeholder="*Identificación" 
        className="bg-[#F4F4F4] placeholder-[#7A7A7A] mt-[40px] w-[480px] shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]"
        value={formData.identification} 
        onChange={handleInputChange} 
      />
      <Input 
        name="user" 
        type="text" 
        placeholder="*Usuario" 
        className="bg-[#F4F4F4] placeholder-[#7A7A7A] mt-[35px] w-[480px] shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]"
        value={formData.user} 
        onChange={handleInputChange} 
      />
      <Input 
        name="names" 
        type="text" 
        placeholder="*Nombre/s" 
        className="bg-[#F4F4F4] placeholder-[#7A7A7A] mt-[35px] w-[480px] shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]"
        value={formData.names || ""} 
        onChange={handleInputChange} 
      />
      <Input 
        name="lastnames" 
        type="text" 
        placeholder="Apellido/s" 
        className="bg-[#F4F4F4] placeholder-[#7A7A7A] mt-[35px] w-[480px] shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]"
        value={formData.lastnames || ""} 
        onChange={handleInputChange} 
      />
      <Input 
        name="password" 
        type="password" 
        placeholder="*Contraseña" 
        className="bg-[#F4F4F4] placeholder-[#7A7A7A] mt-[35px] w-[480px] shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]"
        value={formData.password} 
        onChange={handleInputChange} 
      />
      <div className="flex flex-row mt-[60px] ">
        <button
          className="
            rounded-xl 
            py-[10px] 
            px-[24px] 
            text-[20px] 
            flex 
            items-center 
            me-4
            bg-[#F4F4F4]
            placeholder-[#7A7A7A]
            shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]
            border
          "
          onClick={() => router.push("/")}
        >
          Regresar
        </button>
        <button 
          style={{ backgroundColor: COLORS.GREEN }}
          className="rounded-xl py-[12px] px-[26px] text-[20px] flex items-center"
          onClick={handleSaveUser}
        >
          Registrarse
          <Image
            src={AddUserIcon}
            alt="Add user icon"
            width={24}
            height={24}
            className="inline-block ms-[10px]"
          />
        </button>
        
      </div>
    </>
  )
}