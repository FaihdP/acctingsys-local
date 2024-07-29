export const setCookie = (name: string, value: string, expires: number) => {
  let expiresText = ''
  if (expires) {
    const date = new Date()
    date.setTime(date.getTime() + (expires * 1000))
    expiresText = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + (value || '') + expiresText + '; path=/'
}

export const getCookie = (name: string) => {
  const nameEqual = name + '='
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i]
    while (cookie.charAt(0) == ' ') 
      cookie = cookie.substring(1, cookie.length)
    if (cookie.indexOf(nameEqual) == 0) 
      return cookie.substring(nameEqual.length, cookie.length)
  }
  return null;
}