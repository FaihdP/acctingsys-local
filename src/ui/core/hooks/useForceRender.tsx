import { useReducer } from "react";

export default function useForceRender() {
  const [render, forceRender] = useReducer(s => s + 1, 0)

  return { render, forceRender }
}