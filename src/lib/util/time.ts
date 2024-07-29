export function getDateTime(): string {
  const options: Intl.DateTimeFormatOptions = { 
    year: "numeric", 
    month: "2-digit", 
    day: "2-digit",
    hour: "2-digit", 
    minute: "2-digit", 
    second: "2-digit",
    timeZoneName: "short",
    hour12: false
  }
  
  return new Intl.DateTimeFormat("es-ES", options).format(new Date()).replace(",", "");
}

function getDateObjectFromString(datetime: string): Date {
  const [date, time] = datetime.split(" ")
  const [day, month, year] = date.split('/')
  const [hours, minutes, seconds] = time.split(':')
  console.log(day)
  console.log(month)
  console.log(year)
  console.log(hours)
  console.log(minutes)
  console.log(seconds)

  return new Date(
    parseInt(year), 
    parseInt(month) - 1, 
    parseInt(day), 
    parseInt(hours), 
    parseInt(minutes), 
    parseInt(seconds)
  )
}

export function formatDate(datetime: string): string {
  const date = getDateObjectFromString(datetime)
  console.log(date)
  let hours = date.getHours()
  const ampm = hours >= 12 ? 'p.m.' : 'a.m.';
  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${hours}:${date.getMinutes()}:${date.getSeconds()} ${ampm}`
}