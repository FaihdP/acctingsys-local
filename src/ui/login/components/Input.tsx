import React, { ChangeEvent } from "react";
import Image from "next/image";

interface inputFormProps {
  type: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  value: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

export default function InputForm({
  type,
  name,
  onChange,
  className,
  placeholder,
  value,
  image,
}: inputFormProps) {
  return (
    <div>
      <label>
        <div className="relative">
          <input
            type={type}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            autoComplete="off"
            className={`
              py-3 
              px-4 
              ps-12
              block 
              border
              focus: 
              shadow-sm 
              rounded-lg 
              text-sm 
              focus:z-10 
              focus:border-blue-500 
              focus:ring-blue-500
              w-[290px]
              h-[40px]
            ` + className
            }
          />
          <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
            />
          </div>
        </div>
      </label>
    </div>
  );
}
