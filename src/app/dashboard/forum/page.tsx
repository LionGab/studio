import { ForumClient } from './_components/forum-client';

export default function ForumPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-headline text-2xl font-bold">Fórum da Comunidade</h1>
      <ForumClient />
    </div>
  );
}
