import COLORS from "@ui/core/util/colors";
import { ReactNode } from "react";

interface NavOptionProps {
  text?: string
  selected: boolean
  onClick: () => void
  icon: ReactNode
  color: string
  marginTopText?: string
}

export default function NavOption({ text, icon, selected, onClick, color, marginTopText }: NavOptionProps) {
  let styles
  if (selected) styles = { background: COLORS.GREEN }

  return (
    <a
      style={styles}
      onClick={(e) => onClick()}
      href="#"
      className={`
        px-[30px] 
        h-[70px] 
        flex 
        flex-col 
        justify-center 
        items-center 
        cursor-pointer
        ${ selected ? "text-black" : `text-[${ color }]`}
      `}
    >
      { icon }
      <span 
        style={{ marginTop: marginTopText ? marginTopText : "3px" }}
        className={`
          text-[12px]
        `}
      >
        { text }
      </span>
    </a>
  )
}
