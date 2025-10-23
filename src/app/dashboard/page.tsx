'use client';
import { Chatbot } from './forum/_components/chatbot';

export default function Dashboard() {
  return (
    <div className="flex-1 w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-headline text-3xl font-bold tracking-tight">
            Olá, Nathália!
          </h2>
          <p className="text-muted-foreground">
            Bem-vinda de volta à sua comunidade de fé e acolhimento.
          </p>
        </div>
      </div>
      <Chatbot />
    </div>
  );
}
