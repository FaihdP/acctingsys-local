export default function handleError(error: unknown): String {
  console.error(error)
  return (error as Error).message
}