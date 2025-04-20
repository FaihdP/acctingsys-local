import ActiveMigrationProvider from "@ui/startMigration/hooks/StartMigrationProvider";
import Nav from "@ui/nav/containers/Nav";
import NavigationEvents from "@ui/navitgationEvents/containers/NavigationEvents";
import NotificationProvider from "@ui/notification/hooks/NotificationProvider";
import SessionProvider from "@ui/session/hooks/SessionProvider";
import { Suspense } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="
      flex 
      flex-col
      w-screen
      min-h-screen
      h-max
      bg-[#E8EAED] 
    ">
      <Suspense fallback={null}>
        <NavigationEvents />
      </Suspense>
      <SessionProvider>
        <NotificationProvider>
          <ActiveMigrationProvider>
            <Nav/>
            <main className="flex flex-col min-h-[calc(100vh-70px)] h-max">
              <div className="
                flex
                flex-col
                flex-grow
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
          </ActiveMigrationProvider>
        </NotificationProvider>
      </SessionProvider>
    </div>
  )
}