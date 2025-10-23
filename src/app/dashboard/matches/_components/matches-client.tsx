'use client';

import { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2, Sparkles, Users } from 'lucide-react';
import { suggestRelevantMatches } from '@/ai/flows/suggest-relevant-matches';
import { ProfileCard } from './profile-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ProfileCardSkeleton } from './profile-card-skeleton';

const FormSchema = z.object({
  babyAgeMonths: z.coerce.number().min(0, "Idade inválida").max(60, "Idade máxima de 5 anos"),
  location: z.string().min(2, "Localização muito curta."),
  interests: z.string().min(3, "Interesse muito curto."),
});

type SuggestedMatch = {
  name: string;
  location: string;
  interests: string[];
  babyAge: string;
  avatar: string;
}

const initialMatches: SuggestedMatch[] = [
    { name: "Juliana S.", location: "São Paulo, SP", interests: ["Yoga", "Culinária"], babyAge: "8 meses", avatar: PlaceHolderImages.find(p => p.id === 'avatar-2')!.imageUrl },
    { name: "Beatriz M.", location: "São Paulo, SP", interests: ["Parques", "Fotografia"], babyAge: "6 meses", avatar: PlaceHolderImages.find(p => p.id === 'avatar-3')!.imageUrl },
    { name: "Fernanda L.", location: "São Paulo, SP", interests: ["Leitura", "Artesanato"], babyAge: "7 meses", avatar: PlaceHolderImages.find(p => p.id === 'avatar-4')!.imageUrl },
]

export function MatchesClient() {
  const [isPending, startTransition] = useTransition();
  const [suggestedMatches, setSuggestedMatches] = useState<SuggestedMatch[] | null>(initialMatches);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      babyAgeMonths: 6,
      location: 'São Paulo, SP',
      interests: 'Yoga, Parques, Culinária',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setSuggestedMatches(null); // Clear existing matches to show skeletons
    startTransition(async () => {
        const interestsArray = data.interests.split(',').map(i => i.trim());
        try {
            const result = await suggestRelevantMatches({
                babyAgeMonths: data.babyAgeMonths,
                location: data.location,
                interests: interestsArray,
            });

            // Mocking the result to create full profiles
            const newMatches = result.suggestedMatches.map((name, index) => ({
                name: name || `Nova Conexão ${index + 1}`,
                location: data.location,
                interests: interestsArray.slice(0, Math.floor(Math.random() * interestsArray.length) + 1),
                babyAge: `${data.babyAgeMonths + Math.floor(Math.random()*3 - 1)} meses`,
                avatar: PlaceHolderImages.find(p => p.id === `avatar-${(index % 4) + 2}`)!.imageUrl,
            }));
            setSuggestedMatches(newMatches);
        } catch (error) {
            console.error("Failed to fetch matches", error);
            // In case of an error, we can revert to initial matches or show an error state.
            setSuggestedMatches(initialMatches);
        }
    });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
      <div className="lg:col-span-1 lg:sticky top-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <CardTitle className="font-headline">Encontrar Conexões</CardTitle>
            </div>
            <CardDescription>Use a IA para encontrar mães com perfis e interesses em comum.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="babyAgeMonths"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Idade do bebê (meses)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sua localização</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: São Paulo, SP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seus interesses</FormLabel>
                      <FormControl>
                        <Input placeholder="Fé, Yoga, Culinária" {...field} />
                      </FormControl>
                      <FormDescription>Separe por vírgulas.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Users className="mr-2 h-4 w-4" />}
                  Sugerir Conexões
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-3">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {!suggestedMatches
            ? Array.from({ length: 3 }).map((_, index) => (
                <ProfileCardSkeleton key={index} />
              ))
            : suggestedMatches.map((match, index) => (
                <ProfileCard key={index} match={match} />
              ))}
        </div>
      </div>
    </div>
  );
}
