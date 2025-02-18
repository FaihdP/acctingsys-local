import { formatDate, getDateTime } from "@lib/util/time";
import Image from "next/image";

interface DatetimeInputProps {
  className?: string
  defaultValue: () => any
  onChange: (name: string, value: any) => void
  image?: {
    src: string
    alt: string
    width: number
    height: number
  }
}

export default function DatetimeInput({ 
  className, 
  image, 
  defaultValue,
  onChange,
}: DatetimeInputProps) {
  return (
    <label>
      <div className="relative" >
        { image &&
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3 select-none">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
              />
            </div>
        }
        <input 
          type="datetime-local" 
          defaultValue={defaultValue()}
          onChange={(e) => onChange("date", formatDate(getDateTime(e.target.value)))}
          className={`
            ${ image ? "ps-12": "px-3"} 
            pe-3
            rounded-lg
            py-[10px] 
            bg-[#F4F4F4]
            placeholder-[#7A7A7A]
            shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]
            ${className}
          `}
          // onChange={(e) => onChange(formatDate(getDateTime(e.target.value)))}
        />
      </div>
    </label>
  )
}
