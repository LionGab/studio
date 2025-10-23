import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ContentCard } from './_components/content-card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Crown, Star } from 'lucide-react';

const videoContent = [
  {
    title: "Dicas para o Sono do Bebê",
    description: "Aprenda a criar uma rotina de sono saudável.",
    image: PlaceHolderImages.find(p => p.id === 'content-1')!,
  },
  {
    title: "Nutrição Pós-Parto",
    description: "O que comer para se recuperar e ter energia.",
    image: PlaceHolderImages.find(p => p.id === 'content-2')!,
  },
  {
    title: "Introdução Alimentar",
    description: "Os primeiros alimentos do seu bebê.",
    image: PlaceHolderImages.find(p => p.id === 'content-3')!,
  },
];

const liveContent = [
    {
        title: "Q&A sobre Amamentação",
        description: "Tire suas dúvidas ao vivo com uma especialista.",
        image: PlaceHolderImages.find(p => p.id === 'content-4')!,
        isLive: true,
    }
]

const vipImage = PlaceHolderImages.find(p => p.id === 'vip-content')!;

export default function ContentPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-headline text-2xl font-bold">Próximas Lives</h2>
        <p className="text-muted-foreground">Participe e interaja com nossos especialistas.</p>
        <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {liveContent.map((item) => (
            <ContentCard key={item.title} item={item} />
          ))}
        </div>
      </div>

      <Card className="bg-gradient-to-r from-primary/80 to-primary text-primary-foreground overflow-hidden">
        <div className="grid md:grid-cols-2 items-center">
            <div className="p-8">
                <CardHeader className="p-0">
                    <CardTitle className="font-headline text-3xl flex items-center gap-2">
                        <Crown/> Acesso VIP
                    </CardTitle>
                    <CardDescription className="text-primary-foreground/80 mt-2">
                        Pergunte diretamente para a Nathália Valente e tenha acesso a eventos exclusivos.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0 mt-6">
                    <p className="font-semibold mb-2">"Qual a melhor forma de lidar com a privação de sono?"</p>
                    <p className="text-sm text-primary-foreground/80">- Pergunta de uma mãe VIP este mês.</p>
                    <Button variant="secondary" className="mt-6" size="lg">Seja VIP</Button>
                </CardContent>
            </div>
            <div className="relative h-64 md:h-full min-h-[250px]">
                 <Image
                    src={vipImage.imageUrl}
                    alt={vipImage.description}
                    data-ai-hint={vipImage.imageHint}
                    fill
                    className="object-cover"
                 />
            </div>
        </div>
      </Card>
      
      <div>
        <h2 className="font-headline text-2xl font-bold">Nossa Biblioteca</h2>
        <p className="text-muted-foreground">Assista a qualquer momento.</p>
        <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {videoContent.map((item) => (
            <ContentCard key={item.title} item={item} />
          ))}
          {videoContent.map((item) => (
            <ContentCard key={item.title + '2'} item={{...item, image: PlaceHolderImages.find(p => p.id === 'feature-market')!}} />
          ))}
        </div>
      </div>
    </div>
  );
}
