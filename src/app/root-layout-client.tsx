'use client';
import { usePathname } from 'next/navigation';
import { Header } from '@/app/dashboard/_components/header';
import { BottomNav } from '@/app/dashboard/_components/bottom-nav';

const pageTitles: { [key: string]: string } = {
  '/dashboard': 'NathIA',
  '/dashboard/matches': 'Conexões de Fé',
  '/dashboard/loja': 'Loja ClubNath',
  '/dashboard/content': 'Conteúdo Exclusivo',
  '/dashboard/forum': 'Fórum de Apoio',
  '/dashboard/pricing': 'Nosso Plano',
};

export function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');
  const title = pageTitles[pathname] || 'ClubNath';

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      {isDashboard && <Header title={title} />}
      <main className="flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 mb-20">
        {children}
      </main>
      {isDashboard && <BottomNav />}
    </div>
  );
}
