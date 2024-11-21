import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { SideBarNav } from '@/components/custom-ui/reuseables';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex h-screen overflow-hidden">
      <SideBarNav session={session} />
      <main className="flex-1 overflow-y-auto transition-all duration-300 pl-12 md:pl-16 lg:pl-64 ml-0">
        {children}
      </main>
    </div>
  );
}
