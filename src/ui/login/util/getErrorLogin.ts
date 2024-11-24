import TOKEN_RESPONSE from "@lib/token/TokenResponse"
import LOGIN_STATUS from "../interfaces/loginStatus"

export default function getErrorLogin(statusLogin: LOGIN_STATUS | null, tokenError: string | null): string {
  switch (statusLogin) {
    case LOGIN_STATUS.VOID_CREDENTIALS: return "Es necesario llenar todos los campos del formulario 🙂"
    case LOGIN_STATUS.BAD_CREDENTIALS: return "Usuario o contraseña incorrectas 😑"
    case LOGIN_STATUS.ERROR: return "Tenemos un problema con nuestro servicio ⚠️"
  }
  if (tokenError === TOKEN_RESPONSE.EXPIRED) return "⌛ Tu sesión ha expirado, vuelve a ingresar"
  if (tokenError === TOKEN_RESPONSE.VOID) return "⚠️ Es necesario que inicies sesión  "
  return ""
}