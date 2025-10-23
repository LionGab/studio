'use client';
import { usePathname } from 'next/navigation';
import { Header } from './_components/header';

const pageTitles: { [key: string]: string } = {
  '/dashboard': 'Início',
  '/dashboard/matches': 'Conexões de Fé',
  '/dashboard/marketplace': 'Marketplace da Comunidade',
  '/dashboard/content': 'Conteúdo Exclusivo',
  '/dashboard/forum': 'Fórum de Apoio',
  '/dashboard/pricing': 'Nossos Planos',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const title = pageTitles[pathname] || 'ClubNath';

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title={title} />
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
        {children}
      </main>
    </div>
  );
}
