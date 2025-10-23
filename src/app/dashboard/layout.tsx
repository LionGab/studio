'use client';
import { usePathname } from 'next/navigation';
import { Header } from './_components/header';
import { BottomNav } from './_components/bottom-nav';
import { Icons } from '@/components/icons';
import Link from 'next/link';

const pageTitles: { [key: string]: string } = {
  '/dashboard': 'Início',
  '/dashboard/matches': 'Conexões de Fé',
  '/dashboard/marketplace': 'Marketplace da Comunidade',
  '/dashboard/content': 'Conteúdo Exclusivo',
  '/dashboard/forum': 'Fórum de Apoio',
  '/dashboard/pricing': 'Nosso Plano',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const title = pageTitles[pathname] || 'ClubNath';

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header title={title} />
      <main className="flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 mb-20">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
