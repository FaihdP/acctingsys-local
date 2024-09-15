export default function getPagesNumberArray(pageSelected: number, pagesNumber: number): number[] {
  if (pageSelected <= 0 || pagesNumber <= 0) return []
    
  let minPage = Math.max(1, pageSelected - 2)
  if (pageSelected >= (pagesNumber - 2)) {
    const remainingPages = pagesNumber - pageSelected
    minPage = Math.max(1, pageSelected - (4 - remainingPages))
  }
    
  const maxPagesToShow = Math.min(5, pagesNumber - minPage + 1)
  return Array.from(
    { length: maxPagesToShow }, 
    (_, index) => minPage + index
  )
}