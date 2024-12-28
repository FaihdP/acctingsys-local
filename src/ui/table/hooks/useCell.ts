import { useState } from "react";

export default function useCell(value: any, errorMessage?: string) {
  const [content, setContent] = useState(value)
  const [error, setError] = useState<string | undefined>(errorMessage)
  
  return { 
    content, 
    setContent, 
    error, 
    setError 
  }
}