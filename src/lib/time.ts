export function getDateTime(): string {
  const date = new Date()
  return `${date.getDate() >= 10 ? date.getDate() : "0" + date.getDate()}/${date.getMonth() >= 10 ? date.getMonth() : "0" + date.getMonth()}/${date.getFullYear()} ${date.getHours()>= 10 ? date.getHours() : "0" + date.getHours()}:${date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes()}:${date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds()}`
}