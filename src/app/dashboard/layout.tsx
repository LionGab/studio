import { Header } from '@/app/dashboard/_components/header';
import { BottomNav } from '@/app/dashboard/_components/bottom-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header title="ClubNath" />
      <main className="flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 mb-20">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
