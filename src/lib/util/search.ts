import normalizeString from "./normalizeString";

export default function search(strings: string[], filter: string) {
  return strings.filter(str => {
    return (
      new RegExp(normalizeString(filter).split('').join('.*'))
        .test(normalizeString(str))
    )
  });
}