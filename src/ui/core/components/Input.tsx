import React, { ChangeEvent } from "react";
import Image from "next/image";

interface inputProps {
  type: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  value: string;
  styles?: any;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

export default function Input({
  type,
  name,
  onChange,
  className,
  placeholder,
  value,
  styles,
  image,
}: inputProps) {
  return (
    <div>
      <label>
        <div className="relative">
          <input
            maxLength={50}
            type={type}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            style={styles}
            autoComplete="off"
            className={`
              py-3 
              ${ image ? "ps-12": "ps-3"}
              block 
              border
              rounded-lg 
              text-sm
              w-[290px]
              h-[40px]
            ` + className
            }
          />
          { image &&
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                />
              </div>
          }
        </div>
      </label>
    </div>
  );
}
