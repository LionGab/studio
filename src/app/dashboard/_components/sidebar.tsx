import Link from 'next/link';
import {
  Bell,
  Home,
  Users,
  ShoppingBag,
  Clapperboard,
  MessagesSquare,
  Gem,
} from 'lucide-react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/dashboard/matches', icon: Users, label: 'Matches' },
  { href: '/dashboard/marketplace', icon: ShoppingBag, label: 'Marketplace' },
  { href: '/dashboard/content', icon: Clapperboard, label: 'Conteúdo' },
  { href: '/dashboard/forum', icon: MessagesSquare, label: 'Fórum' },
];

const NavLink = ({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string; }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
        isActive && "bg-accent text-primary"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
};


export function Sidebar() {
  return (
    <div className="hidden border-r bg-card md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Icons.logo className="h-6 w-6 text-primary" />
            <span className="font-headline text-xl">MãeTech</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <div className="p-4 rounded-lg bg-accent/50 border border-primary/20">
            <div className="grid gap-1">
              <h3 className="font-headline font-semibold">Nossos Planos</h3>
              <p className="text-sm text-muted-foreground">
                Desbloqueie recursos premium e apoie a comunidade.
              </p>
            </div>
            <Button size="sm" className="mt-4 w-full" asChild>
                <Link href="/dashboard/pricing">
                    <Gem className="mr-2 h-4 w-4"/>
                    Ver Planos
                </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
