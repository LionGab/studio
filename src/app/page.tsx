'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
    const { toast } = useToast();
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: 'Login em desenvolvimento',
            description: 'Funcionalidade de login com e-mail e senha em breve.',
        });
    }

    const handleGoogleLogin = () => {
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
          <CardTitle className="text-2xl font-headline">Bem-vinda de volta!</CardTitle>
          <CardDescription>Acesse sua conta para se conectar com a comunidade.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="mae@exemplo.com" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Esqueceu sua senha?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
            <Button variant="outline" type="button" className="w-full" onClick={handleGoogleLogin}>
              Entrar com Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Não tem uma conta?{' '}
            <Link href="/sign-up" className="underline">
              Cadastre-se
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
