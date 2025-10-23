import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star, Heart, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


export default function PricingPage() {

  return (
    <div className="flex flex-col items-center">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          Acesso completo à comunidade
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Desbloqueie todos os recursos e aprofunde sua conexão com a fé e a comunidade por um valor acessível.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 w-full max-w-md">
          <Card className="flex flex-col border-primary ring-2 ring-primary shadow-lg">
            <div className="py-2 px-4 bg-primary text-primary-foreground text-center text-sm font-semibold rounded-t-lg">
                Plano Premium
              </div>
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-2xl">ClubNath Premium</CardTitle>
              <CardDescription>A experiência completa para sua jornada.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-center">
                <span className="text-4xl font-bold">R$29,90</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <ul className="mt-8 space-y-4">
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-secondary mr-2 shrink-0" />
                    <span className="text-sm text-muted-foreground">Matching social ilimitado com IA</span>
                  </li>
                  <li className="flex items-start">
                    <Heart className="h-5 w-5 text-secondary mr-2 shrink-0" />
                    <span className="text-sm text-muted-foreground">Grupos temáticos (fitness, fé, rotina)</span>
                  </li>
                   <li className="flex items-start">
                    <Check className="h-5 w-5 text-secondary mr-2 shrink-0" />
                    <span className="text-sm text-muted-foreground">Diário pessoal para journaling</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-secondary mr-2 shrink-0" />
                    <span className="text-sm text-muted-foreground">Estudos bíblicos guiados</span>
                  </li>
                   <li className="flex items-start">
                    <Award className="h-5 w-5 text-secondary mr-2 shrink-0" />
                    <span className="text-sm text-muted-foreground">Conteúdo VIP e lives exclusivas</span>
                  </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                size="lg"
              >
                Assinar Agora
              </Button>
            </CardFooter>
          </Card>
      </div>
    </div>
  );
}
