export default function ErrorMessage({ message }: { message: string }) {
  return (
    <span className="text-red-400 absolute mb-64 font-bold max-w-md">
      {message}
    </span>
  )
}