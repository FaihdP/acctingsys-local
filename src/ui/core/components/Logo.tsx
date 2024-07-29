export default function Logo({ size, classname }: { size: number, classname?: string }) {
  return (
    <div className={classname}>
      <span style={{fontSize: size + 'px' }}>acctingsys</span>
      <span style={{fontSize: size - 10 + 'px' }} className={`text-[#07F9A2] text-[${size - 10}px]`}> local</span>      
    </div>
  )
}
