export const setCookie = (name: string, value: string, expires: number) => {
  let expiresText = '';
  if (expires) {
    const date = new Date();
    date.setTime(date.getTime() + (expires * 1000));
    expiresText = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expiresText + '; path=/';
};

export const getCookie = (name: string) => {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};