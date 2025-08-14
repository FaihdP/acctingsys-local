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
import AccountCircleIcon from "@public/dashboard/nav/AccountCircleIcon"
import { useContext, useState } from "react"
import { SessionContext } from "@ui/session/hooks/SessionProvider"

export default function Nav() {
  const router = useRouter()
  const pathname = usePathname()
  const [isVisibleUserPopup, setIsVisibleUserPopup] = useState(true)
  const [isVisibleNotificationPopup, setIsVisibleNotificationPopup] = useState(false)
  const { user } = useContext(SessionContext)

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/")
  }

  const handleIsVisibleUserPopup = () => {
    setIsVisibleUserPopup(!isVisibleUserPopup)
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
        <Notification isOpen={isVisibleNotificationPopup} setIsOpen={setIsVisibleNotificationPopup} />

        {/* <div 
          className={`
            relative
            px-[20px] 
            h-[70px] 
            flex items-center
          `}
        >  
          <button className="flex flex-row items-center" onClick={handleIsVisibleUserPopup}>
            <AccountCircleIcon color={"#FFFFFF"} size={30}/>
            <span className="ms-4">{user.name + " " + user.lastname}</span>
          </button>  
          { 
            isVisibleUserPopup && 
              <div 
                style={{ fontSize: "12px" }}
                className="
                  z-10
                  absolute
                  right-0
                  top-[65px]
                  bg-white
                  !w-[200px]
                  min-h-[200px]
                  max-h-[100%]
                  overflow-auto
                  shadow-[0_0_30px_0px_rgba(0,0,0,0.2)]
                  rounded-lg
                  text-black
                "
              >
                <div className="absolute top-0 right-0">
                  <a onClick={() => {}} className="cursor-pointer text-[#7A7A7A] text-[18px] me-4 mt-1">⨉</a>
                </div>
                <div className="flex flex-col text-left text-[16px] p-4">
                  <span>Configuración</span>
                  <span className="mt-2">Usuarios</span>
                </div>
              </div>
          }
        </div> */}
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