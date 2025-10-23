import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlayCircle } from 'lucide-react';
import type { ImagePlaceholder } from '@/lib/placeholder-images';

interface ContentCardProps {
  item: {
    title: string;
    description: string;
    image: ImagePlaceholder;
    isLive?: boolean;
    isVip?: boolean;
  };
}

export function ContentCard({ item }: ContentCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <CardContent className="p-0">
        <div className="relative aspect-video">
          <Image
            src={item.image.imageUrl}
            alt={item.image.description}
            data-ai-hint={item.image.imageHint}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <PlayCircle className="h-12 w-12 text-white/80 transition-transform hover:scale-110 hover:text-white" />
          </div>
          {item.isLive && (
            <div className="absolute top-2 left-2 flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-white text-xs font-bold">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                AO VIVO
            </div>
          )}
           {item.isVip && (
            <div className="absolute top-2 right-2 rounded-full bg-primary px-3 py-1 text-primary-foreground text-xs font-bold">
                VIP
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-headline text-lg font-semibold">{item.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
