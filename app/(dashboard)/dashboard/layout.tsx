import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { SideBarNav } from '@/components/custom-ui/reuseables';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = await getServerSession(authOptions);
  console.log("Logged-in user", session?.user?.username);

  return (
    <div className="flex h-screen overflow-hidden">
      <SideBarNav session={session} />
      <main className="flex-1 overflow-y-auto transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
