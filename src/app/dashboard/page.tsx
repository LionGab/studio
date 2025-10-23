import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Heart, ShoppingBag, Clapperboard } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Dashboard() {
  const matches = PlaceHolderImages.filter(p => p.id.startsWith('avatar')).slice(1, 4);
  const products = PlaceHolderImages.filter(p => p.id.startsWith('product')).slice(0, 2);
  const content = PlaceHolderImages.find(p => p.id === 'content-1');

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h2 className="font-headline text-3xl font-bold tracking-tight">
              Olá, Nathália!
            </h2>
            <p className="text-muted-foreground">Bem-vinda de volta à sua comunidade.</p>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Novos Matches</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3+</div>
            <p className="text-xs text-muted-foreground">
              Mães com interesses em comum perto de você.
            </p>
          </CardContent>
          <CardFooter className="mt-auto">
            <Button className="w-full" asChild>
                <Link href="/dashboard/matches">
                    Ver Matches
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">No Marketplace</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12+</div>
            <p className="text-xs text-muted-foreground">
              Itens novos adicionados hoje.
            </p>
          </CardContent>
           <CardFooter className="mt-auto">
            <Button className="w-full" asChild>
                <Link href="/dashboard/marketplace">
                    Explorar Marketplace
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="flex flex-col md:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Conteúdo em Destaque</CardTitle>
            <Clapperboard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-bold">Sono do bebê</div>
            <p className="text-xs text-muted-foreground">
              Novo vídeo com dicas práticas.
            </p>
          </CardContent>
           <CardFooter className="mt-auto">
            <Button className="w-full" asChild>
                <Link href="/dashboard/content">
                    Assistir Agora
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
