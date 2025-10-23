
'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArticleCard } from './_components/article-card';
import { useToast } from '@/hooks/use-toast';

const articles = [
  {
    title: "Como lidar com a culpa materna: 5 dicas práticas",
    description: "Aprenda a reconhecer e a lidar com um dos sentimentos mais comuns na maternidade.",
    image: PlaceHolderImages.find(p => p.id === 'content-1')!,
    category: "Autoajuda"
  },
  {
    title: "A importância da rede de apoio no pós-parto",
    description: "Entenda por que ter pessoas por perto faz toda a diferença nessa fase.",
    image: PlaceHolderImages.find(p => p.id === 'feature-matches')!,
    category: "Comunidade"
  },
  {
    title: "Introdução Alimentar: mitos e verdades",
    description: "Navegue pela fase dos primeiros alimentos do seu bebê com mais segurança e tranquilidade.",
    image: PlaceHolderImages.find(p => p.id === 'content-3')!,
    category: "Criação de Filhos"
  },
    {
    title: "Encontrando a fé na jornada materna",
    description: "Como a espiritualidade pode ser uma fonte de força e paz durante os desafios da maternidade.",
    image: PlaceHolderImages.find(p => p.id === 'hero')!,
    category: "Fé"
  },
   {
    title: "Sono do bebê: dicas para noites mais tranquilas",
    description: "Estratégias para ajudar seu bebê (e você) a ter um sono de mais qualidade.",
    image: PlaceHolderImages.find(p => p.id === 'content-2')!,
    category: "Criação de Filhos"
  },
  {
    title: "O poder do autocuidado para mães",
    description: "Lembre-se: para cuidar bem, você precisa estar bem. Pequenos gestos que fazem a diferença.",
    image: PlaceHolderImages.find(p => p.id === 'avatar-2')!,
    category: "Bem-estar"
  }
];

export default function ContentPage() {
    const { toast } = useToast();

    const handleAction = () => {
        toast({
            title: 'Funcionalidade em desenvolvimento',
            description: 'Estamos trabalhando para trazer essa novidade para você em breve!',
        });
    }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-headline text-2xl font-bold">Notícias para Você</h2>
        <p className="text-muted-foreground">Artigos e dicas para sua jornada de mãe.</p>
        <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {articles.map((item) => (
            <ArticleCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
