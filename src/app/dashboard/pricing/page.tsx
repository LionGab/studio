import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Free',
    price: 'R$0',
    frequency: '/mês',
    description: 'Para começar a se conectar.',
    features: [
      '3 matches por dia',
      'Postar 3x por semana no fórum',
      'Acesso ao marketplace (apenas compra)',
      'Acesso a conteúdos abertos',
    ],
    cta: 'Plano Atual',
    isCurrent: true,
  },
  {
    name: 'Premium',
    price: 'R$29,90',
    frequency: '/mês',
    description: 'Para mães que querem mais.',
    features: [
      'Matches ilimitados',
      'Postagens ilimitadas no fórum',
      'Vender no marketplace',
      'Acesso a vídeos exclusivos',
    ],
    cta: 'Fazer Upgrade',
    isPopular: true,
  },
  {
    name: 'VIP',
    price: 'R$79,90',
    frequency: '/mês',
    description: 'A experiência completa.',
    features: [
      'Todos os benefícios do Premium',
      '1 pergunta mensal para Nathália Valente',
      'Acesso a eventos presenciais',
      'Selo de perfil VIP',
    ],
    cta: 'Seja VIP',
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          Planos para cada fase da sua jornada
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Escolha o plano que melhor se adapta às suas necessidades e aproveite ao máximo nossa comunidade.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {tiers.map((tier) => (
          <Card key={tier.name} className={`flex flex-col ${tier.isPopular ? 'border-primary ring-2 ring-primary shadow-lg' : ''}`}>
            {tier.isPopular && (
              <div className="py-2 px-4 bg-primary text-primary-foreground text-center text-sm font-semibold rounded-t-lg">
                Mais Popular
              </div>
            )}
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-2xl">{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-center">
                <span className="text-4xl font-bold">{tier.price}</span>
                <span className="text-muted-foreground">{tier.frequency}</span>
              </div>
              <ul className="mt-8 space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={tier.isCurrent ? 'outline' : 'default'}
                disabled={tier.isCurrent}
              >
                {tier.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
