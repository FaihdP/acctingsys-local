import Logo from "@ui/core/components/Logo";
import COLORS from "@ui/core/util/colors";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="
      flex 
      flex-col
      w-screen
      h-screen
      bg-[#E8EAED] 
    ">
      <nav 
        className="h-[70px] text-white" 
        style={{ background: COLORS.DARK_BLUE }}
      >
        <div className="mt-3 xl:ms-[47px] ms-[20px]">
          {/* TODO: make nav component */}
          <Logo size={25}/>
        </div>
      </nav>

      <main className="flex flex-col h-full">
        <div className="
          h-full
          m-[22px]  
          p-[25px]
          bg-white
          text-[#7A7A7A]
          rounded
          shadow-[0_0_30px_0px_rgba(0,0,0,0.2)]
        ">
          { children }
        </div>
      </main>
    </div>
  )
}