function formatNumber(number: number): string {
  return number >= 10 ? number.toString() : "0" + number
}

export function getDateTime(): string {
  const date = new Date()
  return `${formatNumber(date.getDate())}/${formatNumber(date.getMonth())}/${date.getFullYear()} ${formatNumber(date.getHours())}:${formatNumber(date.getMinutes())}:${formatNumber(date.getSeconds())}`
}