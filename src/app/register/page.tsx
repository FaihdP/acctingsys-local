'use client'

import Logo from "@ui/core/components/Logo"
import COLORS from "@ui/core/util/colors"
import RegisterForm from "@ui/register/containers/RegisterForm"

export default function Register() {
  return (
    <>
      <main
        style={{ background: COLORS.LIGTH_GREEN }}
        className="
          flex
          flex-col
          items-center
        "
      >
        <section 
          className={`
            flex
            flex-col
            items-center
            bg-white
            container
            xl:w-[75%]
            w-[100%] 
            h-screen
            shadow-[0_0_30px_0px_rgba(0,0,0,0.2)]
          `}
        >
          <Logo size={30} classname={'mt-[48px]'}/>
          <RegisterForm/>
        </section>
      </main>
    </>
  )
}