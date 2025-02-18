import { createPortal } from "react-dom"

export default function Backdrop({ onClick, className }: { onClick: () => void, className?: string }) {
  return createPortal(
    <div  
      className={"fixed w-[100vw] h-[100vh] top-0 left-0 cursor-default z-0 " + (className || "")}
      onClick={onClick}
    />,
    document.body
  )
}
