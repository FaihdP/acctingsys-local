export default function Logo({ size }: { size: number }) {
  return (
    <>
      <span style={{fontSize: size + 'px' }}>acctingsys</span>
      <span style={{fontSize: size - 10 + 'px' }} className={`text-[#07F9A2] text-[${size - 10}px]`}> local</span>      
    </>
  )
}
