// TODO: Change date format in db

const AM = 'a.m.'
const PM = 'p.m.'

export function getDateTime(datetime?: string): string {
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
  
  const date = datetime ? new Date(datetime) : new Date()
 
  return new Intl.DateTimeFormat("es-ES", options).format(date).replace(",", "");
}

function getDateObjectFromString(datetime: string): Date {
  const [date, time] = datetime.split(" ")
  const [day, month, year] = date.split('/')
  const [hours, minutes, seconds] = time.split(':')

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
  const formatToTwoDigits = (num: number) => String(num).padStart(2, '0');
  let hours = date.getHours()
  const ampm = hours >= 12 ? PM : AM
  hours = hours % 12
  hours = hours ? hours : 12

  return `${formatToTwoDigits(date.getDate())}/${formatToTwoDigits(date.getMonth() + 1)}/${date.getFullYear()} ${formatToTwoDigits(hours)}:${formatToTwoDigits(date.getMinutes())}:${formatToTwoDigits(date.getSeconds())} ${ampm}`;
}

export function formatToDatetimeLocal(datetime: string): string {
  if (!datetime) return datetime
  const [date, time, period] = datetime.split(" ")
  const [day, month, year] = date.split("/")
  let [hours, minutes, seconds] = time.split(":")

  if (period.toLowerCase() === PM && hours !== "12") {
    hours = String(+hours + 12).padStart(2, '0')
  } else if (period.toLowerCase() === AM && hours === "12") {
    hours = "00"  
  }

  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hours}:${minutes}:${seconds}`
}