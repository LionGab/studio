'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-background">
      <Card className="w-full max-w-md text-center shadow-2xl">
        <CardHeader>
          <div className="mx-auto bg-destructive/10 text-destructive rounded-full p-3 w-fit">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <CardTitle className="mt-4 font-headline text-2xl">Oops! Algo deu errado.</CardTitle>
          <CardDescription className="text-muted-foreground mt-2">
            Nossa equipe foi notificada. Enquanto isso, você pode tentar recarregar ou voltar para o início.
          </CardDescription>
        </CardHeader>
        <CardContent>
            {process.env.NODE_ENV === 'development' && (
                <div className="bg-muted text-left p-3 rounded-md text-xs text-muted-foreground overflow-auto max-h-32 mb-4">
                    <p className="font-mono">{error.stack}</p>
                </div>
            )}
            <div className="flex gap-4">
                <Button onClick={() => reset()} className="w-full">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Tentar Novamente
                </Button>
                <Button variant="outline" className="w-full" asChild>
                    <Link href="/dashboard">
                        <Home className="mr-2 h-4 w-4" />
                        Voltar ao Início
                    </Link>
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
