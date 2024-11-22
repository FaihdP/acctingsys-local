export default function Backdrop({ onClick }: { onClick: () => void }) {
  return (
    <div  
      className="fixed w-[100vw] h-[100vh] top-0 left-0 cursor-default z-0" 
      onClick={onClick}
    />
  )
}
