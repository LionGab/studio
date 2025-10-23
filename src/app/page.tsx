import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Heart, ShoppingBag, Users } from 'lucide-react';
import { Icons } from '@/components/icons';

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');
  const featureMatchesImage = PlaceHolderImages.find((img) => img.id === 'feature-matches');
  const featureMarketImage = PlaceHolderImages.find((img) => img.id === 'feature-market');
  const featureContentImage = PlaceHolderImages.find((img) => img.id === 'feature-content');

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo className="h-8 w-8 text-primary" />
          <span className="font-headline text-2xl font-bold">MãeTech Conecta</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Entrar</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Junte-se a nós</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="bg-card py-20 md:py-32">
          <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 md:grid-cols-2">
            <div className="space-y-6">
              <h1 className="font-headline text-4xl font-bold tracking-tight md:text-6xl">
                A comunidade que toda mãe precisa.
              </h1>
              <p className="text-lg text-muted-foreground">
                Conecte-se com outras mães, compre e venda itens de bebê e tenha acesso a conteúdos exclusivos para sua jornada.
              </p>
              <Button size="lg" asChild>
                <Link href="/dashboard">Comece agora</Link>
              </Button>
            </div>
            <div className="relative h-64 w-full overflow-hidden rounded-2xl shadow-xl md:h-[400px]">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  data-ai-hint={heroImage.imageHint}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-headline text-3xl font-bold md:text-4xl">Tudo em um só lugar</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Facilitamos a maternidade conectando você ao que mais importa.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent-foreground">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-headline mt-6 text-2xl font-semibold">Conexões Reais</h3>
                <p className="mt-2 text-muted-foreground">
                  Encontre mães com interesses e filhos na mesma fase que os seus.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent-foreground">
                  <ShoppingBag className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-headline mt-6 text-2xl font-semibold">Marketplace Seguro</h3>
                <p className="mt-2 text-muted-foreground">
                  Compre e venda itens de bebê com outras mães da sua região.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent-foreground">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-headline mt-6 text-2xl font-semibold">Comunidade de Apoio</h3>
                <p className="mt-2 text-muted-foreground">
                  Participe de fóruns, lives e Q&As para tirar dúvidas e compartilhar experiências.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-card py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} MãeTech Conecta. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
