'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { Bot, Send, Loader2, Sparkles, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { answerCommonQuestions } from '@/ai/flows/answer-common-questions';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    startTransition(async () => {
        setMessages((prev) => [...prev, { role: 'assistant', content: '...' }]);
        try {
            const result = await answerCommonQuestions({ question: input });
            setMessages((prev) => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage.role === 'assistant') {
                    lastMessage.content = result.answer;
                }
                return newMessages;
            });
        } catch (error) {
             setMessages((prev) => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage.role === 'assistant') {
                    lastMessage.content = 'Desculpe, não consegui processar sua pergunta. Tente novamente.';
                }
                return newMessages;
            });
        }
    });
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div className="flex h-full max-h-[70vh] flex-col rounded-xl border bg-card">
      <div className="flex items-center gap-3 border-b p-4">
        <Sparkles className="h-6 w-6 text-primary" />
        <div>
            <h3 className="font-headline text-lg font-semibold">Assistente MãeTech</h3>
            <p className="text-sm text-muted-foreground">Tire suas dúvidas sobre puerpério e bebês</p>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.length === 0 && (
             <div className="flex items-start gap-4 text-sm">
                <Avatar className="h-8 w-8 border-2 border-primary">
                    <AvatarFallback><Bot size={16} /></AvatarFallback>
                </Avatar>
                <div className="grid gap-1 rounded-lg bg-background p-3">
                    <p>Olá! Sou sua assistente virtual. Como posso ajudar com suas dúvidas sobre maternidade?</p>
                </div>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-4 text-sm',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-8 w-8 border-2 border-primary">
                    <AvatarFallback><Bot size={16} /></AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'grid gap-1 rounded-lg p-3',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background'
                )}
              >
                {message.content === '...' ? <Loader2 className="animate-spin" /> : <p>{message.content}</p>}
              </div>
               {message.role === 'user' && (
                <Avatar className="h-8 w-8">
                    <AvatarFallback><User size={16}/></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua pergunta..."
            disabled={isPending}
            autoComplete="off"
          />
          <Button type="submit" size="icon" disabled={isPending || !input.trim()}>
            {isPending ? <Loader2 className="animate-spin" /> : <Send />}
            <span className="sr-only">Enviar</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
