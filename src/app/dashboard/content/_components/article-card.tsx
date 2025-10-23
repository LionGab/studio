
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { ImagePlaceholder } from '@/lib/placeholder-images';

interface ArticleCardProps {
  item: {
    title: string;
    description: string;
    image: ImagePlaceholder;
    category: string;
  };
}

export function ArticleCard({ item }: ArticleCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg flex flex-col">
      <CardContent className="p-0">
        <div className="relative aspect-video">
          <Image
            src={item.image.imageUrl}
            alt={item.image.description}
            data-ai-hint={item.image.imageHint}
            fill
            className="object-cover"
          />
           <div className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded-full">
            {item.category}
          </div>
        </div>
        <div className="p-4 flex-grow">
          <h3 className="font-headline text-lg font-semibold leading-tight">{item.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
        </div>
         <div className="p-4 pt-0">
          <Button variant="link" className="p-0 h-auto text-primary" asChild>
            <Link href="#">
              Ler mais <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
