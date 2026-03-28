import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex  bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Topbar />
        <main className="flex-1 min-h-0 pt-16">{children}</main>
      </div>
    </div>
  );
}
