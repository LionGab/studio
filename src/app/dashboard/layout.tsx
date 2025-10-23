'use client';
import { usePathname } from 'next/navigation';
import { Sidebar } from './_components/sidebar';
import { Header } from './_components/header';

const pageTitles: { [key: string]: string } = {
  '/dashboard': 'Dashboard',
  '/dashboard/matches': 'Encontre novas conexões',
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
  const title = pageTitles[pathname] || 'MãeTech Conecta';

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header title={title} />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
