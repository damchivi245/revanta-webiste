import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminLayout() {
  return (
    <div className="bg-black font-montserrat">
      <SidebarProvider>
        <div className="flex size-full">
          {" "}
          <AppSidebar />
          <main className="flex-1 p-4">
            <SidebarTrigger />
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
      //{" "}
    </div>
  );
}
