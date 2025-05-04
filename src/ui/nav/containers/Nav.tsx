'use client'

import Logo from "@ui/core/components/Logo"
import COLORS from "@ui/core/util/colors"
import NavOption from "../components/NavOption"
import { usePathname, useRouter } from "next/navigation"
import SalesIcon from "@public/dashboard/nav/SalesIcon"
import PaymentsIcon from "@public/dashboard/nav/PaymentsIcon"
import BuysIcon from "@public/dashboard/nav/BuysIcon"
import PersonIcon from "@public/dashboard/nav/PersonIcon"
import InventoryIcon from "@public/dashboard/nav/InventoryIcon"
import MigrationIcon from "@public/dashboard/nav/MigrationIcon"
import ExpensesIcon from "@public/dashboard/nav/ExpensesIcon"
import Notification from "@ui/notification/containers/Notification"
import logoutIcon from "@public/login/login.svg"
import Image from "next/image"

export default function Nav() {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/")
  }
  
  const options = [
    { icon: <SalesIcon />, text: "Ventas", href: "sales" },
    { icon: <BuysIcon />, text: "Compras", href: "buys" },
    { icon: <PaymentsIcon />, text: "Pagos", href: "payments", marginTopText: "4px" },
    { icon: <PersonIcon />, text: "Clientes", href: "clients" },
    { icon: <PersonIcon />, text: "Proveedores", href: "providers" },
    { icon: <InventoryIcon />, text: "Inventario", href: "inventory" },
    { icon: <MigrationIcon />, text: "Migración", href: "migration", marginTopText: "4px" },
    { icon: <ExpensesIcon />, text: "Gastos", href: "expenses" },
  ]

  return (
    <nav 
      className="
        h-[70px] 
        text-white 
        w-full 
        flex 
        items-center 
        rounded-b-lg
        px-[20px]
      " 
      style={{ background: COLORS.DARK_BLUE }}
    >
      <Logo 
        size={25}
        classname="
          xl:ms-[47px] 
          me-[40px]
        " 
      />
      <div className="flex me-auto">
        {  
          options.map((option, index) => 
            <NavOption 
              key={index}
              text={option.text}
              selected={pathname.includes(option.href)}
              onClick={() => router.push("/dashboard/" + option.href)}
              icon={option.icon}
              color="#FFFFFF"
              marginTopText={option.marginTopText}
            />
          )
        }
      </div>
      <div className="flex flex-row">
        <Notification />
        <button 
          onClick={handleLogout}
          className={`
            relative
            px-[20px] 
            h-[70px] 
            flex items-center
          `}
          style={{ background: COLORS.GREEN }}
        >  
          <Image 
            src={logoutIcon.src} 
            alt="login_icon" 
            width={32} 
            height={32}
            className="cursor-pointer"
          />
        </button>
      </div>
    </nav>
  )
}