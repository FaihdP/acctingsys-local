import Logo from "@ui/core/components/Logo";
import COLORS from "@ui/core/util/colors";
import LoginForm from "@ui/login/containers/LoginForm";

export default async function Home() {
  return (
    <main className="h-screen w-screen" style={{ background: COLORS.LIGTH_GREEN }}>
      <section 
        className={`
          flex
          flex-col
          h-screen
          xl:w-[50%]
          w-[100%]
          text-center
          ms-auto
          bg-white
          justify-center
          shadow-[0_0_30px_0px_rgba(0,0,0,0.2)]
        `}
      >
        <div>
          <Logo size={30}/>
          <LoginForm />
        </div>
        <footer className="mt-[30px]">
          © {(new Date()).getFullYear()} Todos los derechos reservados.
        </footer>
      </section>
      <section className="h-screen xl:h-0">
      </section>
    </main>
  );
}
