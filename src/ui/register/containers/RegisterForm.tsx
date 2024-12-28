import Input from "@ui/core/components/Input";
import { RegisterFormdata } from "@ui/login/interfaces/RegisterFormData";
import { ChangeEvent, useState } from "react";

export default function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormdata>({ 
    identification: "",
    user: "",
    names: "",
    lastnames: "",
    password: ""
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
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
        placeholder="Nombre/s" 
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
    </>
  )
}