'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';


export default function SignUpPage() {
    const { toast } = useToast();
    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: 'Cadastro em desenvolvimento',
            description: 'Funcionalidade de cadastro em breve.',
        });
    }

     const handleGoogleSignUp = () => {
         toast({
            title: 'Login com Google em desenvolvimento',
            description: 'Estamos trabalhando para habilitar o login com Google!',
        });
    }

  return (
     <div className="flex items-center justify-center min-h-screen bg-background p-4">
        <Card className="mx-auto w-full max-w-sm">
        <CardHeader className="text-center">
             <div className="flex justify-center items-center mb-4">
                <Icons.logo className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl font-headline">Crie sua conta</CardTitle>
            <CardDescription>
            Junte-se à nossa comunidade de mães.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSignUp} className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="first-name">Nome</Label>
                <Input id="first-name" placeholder="Nathália" required />
            </div>
            
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                id="email"
                type="email"
                placeholder="mae@exemplo.com"
                required
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" />
            </div>
            <Button type="submit" className="w-full">
                Criar conta
            </Button>
            <Button variant="outline" className="w-full" type="button" onClick={handleGoogleSignUp}>
                Cadastrar com Google
            </Button>
            </form>
            <div className="mt-4 text-center text-sm">
            Já tem uma conta?{' '}
            <Link href="/" className="underline">
                Entrar
            </Link>
            </div>
        </CardContent>
        </Card>
    </div>
  );
}
