import { Chatbot } from './_components/chatbot';
import { ForumClient } from './_components/forum-client';

export default function ForumPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 space-y-6">
         <h1 className="font-headline text-2xl font-bold">Fórum da Comunidade</h1>
        <ForumClient />
      </div>
      <div className="lg:col-span-1 lg:sticky top-6">
        <Chatbot />
      </div>
    </div>
  );
}
