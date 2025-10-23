'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { ThumbsUp, MessageSquare, Loader2, AlertTriangle } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { moderateForumContent } from '@/ai/flows/moderate-forum-content';
import { Chatbot } from './chatbot';

interface Post {
    id: number;
    author: {
        name: string;
        avatar: string;
    };
    content: string;
    likes: number;
    comments: number;
    timestamp: string;
}

const initialPosts: Post[] = [
    {
        id: 1,
        author: { name: 'Ana', avatar: PlaceHolderImages.find(p => p.id === 'avatar-2')!.imageUrl },
        content: "Alguma dica para lidar com os saltos de desenvolvimento? O meu bebê de 4 meses está muito agitado!",
        likes: 15,
        comments: 7,
        timestamp: "2 horas atrás"
    },
    {
        id: 2,
        author: { name: 'Carla', avatar: PlaceHolderImages.find(p => p.id === 'avatar-3')!.imageUrl },
        content: "Meninas, qual cadeirinha de carro vocês recomendam? Estou em dúvida entre duas marcas.",
        likes: 8,
        comments: 12,
        timestamp: "5 horas atrás"
    },
     {
        id: 3,
        author: { name: 'Mariana', avatar: PlaceHolderImages.find(p => p.id === 'avatar-4')!.imageUrl },
        content: "Estou amando a fase de introdução alimentar! Muitas descobertas e um pouco de bagunça. 😂 Alguém tem receitas fáceis para compartilhar?",
        likes: 22,
        comments: 9,
        timestamp: "1 dia atrás"
    }
];

const userAvatar = PlaceHolderImages.find(p => p.id === 'avatar-1')!;

export function ForumClient() {
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [newPostContent, setNewPostContent] = useState('');
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handlePostSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPostContent.trim() || isPending) return;

        startTransition(async () => {
            const moderationResult = await moderateForumContent({ text: newPostContent });

            if (moderationResult.isFlagged) {
                toast({
                    variant: 'destructive',
                    title: 'Conteúdo impróprio detectado',
                    description: `Sua postagem foi bloqueada pelo seguinte motivo: ${moderationResult.reason}`,
                    duration: 5000,
                });
            } else {
                const newPost: Post = {
                    id: Date.now(),
                    author: { name: 'Nathália', avatar: userAvatar.imageUrl },
                    content: newPostContent,
                    likes: 0,
                    comments: 0,
                    timestamp: 'Agora mesmo'
                };
                setPosts(prevPosts => [newPost, ...prevPosts]);
                setNewPostContent('');
                toast({
                    title: 'Postagem criada!',
                    description: 'Sua mensagem foi compartilhada no fórum.',
                });
            }
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardContent className="p-4">
                        <form onSubmit={handlePostSubmit} className="flex flex-col gap-4">
                            <div className="flex items-start gap-4">
                                <Avatar>
                                    <AvatarImage src={userAvatar.imageUrl} />
                                    <AvatarFallback>NV</AvatarFallback>
                                </Avatar>
                                <Textarea
                                    placeholder="Compartilhe suas dúvidas e experiências..."
                                    value={newPostContent}
                                    onChange={(e) => setNewPostContent(e.target.value)}
                                    rows={3}
                                    disabled={isPending}
                                />
                            </div>
                            <Button type="submit" className="self-end" disabled={isPending || !newPostContent.trim()}>
                                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Publicar
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    {posts.map(post => (
                        <Card key={post.id}>
                            <CardContent className="p-4">
                                <div className="flex items-start gap-4">
                                    <Avatar>
                                        <AvatarImage src={post.author.avatar} />
                                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="w-full">
                                        <div className="flex items-center justify-between">
                                            <p className="font-semibold">{post.author.name}</p>
                                            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                                        </div>
                                        <p className="mt-2 text-sm">{post.content}</p>
                                        <div className="mt-4 flex items-center gap-4 text-muted-foreground">
                                            <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                                <ThumbsUp className="h-4 w-4" />
                                                {post.likes}
                                            </Button>
                                            <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                                <MessageSquare className="h-4 w-4" />
                                                {post.comments}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
            <div className="lg:col-span-1 lg:sticky top-6">
                <Chatbot />
            </div>
        </div>
    );
}
