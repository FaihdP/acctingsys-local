export default function handleError(error: unknown): string {
  console.error(error)
  return (error as Error).message
}