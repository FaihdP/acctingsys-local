const normalizeString = (string: string) => {
  return string.toLowerCase().replace(/\s+/g, '')
}

export default normalizeString