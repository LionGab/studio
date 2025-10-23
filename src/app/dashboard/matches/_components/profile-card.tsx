'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Baby, Cross, Heart, MapPin } from 'lucide-react';

interface ProfileCardProps {
    match: {
        name: string;
        location: string;
        interests: string[];
        babyAge: string;
        avatar: string;
    };
}

export function ProfileCard({ match }: ProfileCardProps) {
  const { toast } = useToast();

  const handleAction = () => {
    toast({
      title: 'Funcionalidade em desenvolvimento',
      description: 'Estamos trabalhando para trazer essa novidade para você em breve!',
    });
  };
  return (
    <Card className="flex flex-col">
      <CardContent className="p-6 flex-1">
        <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 border-4 border-background ring-2 ring-primary">
                <AvatarImage src={match.avatar} alt={`Avatar de ${match.name}`} />
                <AvatarFallback>{match.name.substring(0,2)}</AvatarFallback>
            </Avatar>
            <h3 className="font-headline mt-4 text-xl font-semibold">{match.name}</h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
                <MapPin className="mr-1 h-4 w-4" />
                {match.location}
            </div>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Baby className="mr-1 h-4 w-4" />
                Bebê de {match.babyAge}
            </div>
        </div>
        <div className="mt-4 text-center">
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary" className="font-normal bg-accent text-accent-foreground"><Cross className="mr-1 h-3 w-3" />Fé</Badge>
            {match.interests.map((interest) => (
              <Badge key={interest} variant="secondary" className="font-normal">{interest}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 p-4 pt-0">
        <Button variant="outline" className="w-full" onClick={handleAction}>Ver Perfil</Button>
        <Button className="w-full" onClick={handleAction}>
            <Heart className="mr-2 h-4 w-4" /> Conectar
        </Button>
      </CardFooter>
    </Card>
  );
}
