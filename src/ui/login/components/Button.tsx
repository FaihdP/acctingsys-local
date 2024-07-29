import COLORS from '@ui/core/util/colors'
import Image from 'next/image'
import React from 'react'
import loginIcon from "@public/login/login.svg"
import Spin from '@ui/core/components/Spin'

export default function Button({ loading }: { loading?: boolean }) {
  return (
    <>
      <button 
        type="submit" 
        className={`
          text-[${loading ? "17" : "20"}px]
          w-[160px]
          h-[48px]
          rounded-lg 
          mb-[20px]
          ${loading ? "cursor-default" : ""}
        `}
        style={
          { 
            backgroundColor: loading ? COLORS.LIGTH_GREEN : COLORS.GREEN,
            transition: `
              font-size 100ms,
              background-color 500ms
              ease
            `
          }
        }
      >
        { loading
            ? 
              <span className="flex justify-center">
                <Spin />
                Cargando...
              </span>
            : 
              <>
                Ingresar
                <Image 
                  src={loginIcon.src} 
                  alt="login_icon" 
                  width={24} 
                  height={24}
                  className="inline-block ms-1"
                />
              </>
        }
      </button>
    </>
  )
}
