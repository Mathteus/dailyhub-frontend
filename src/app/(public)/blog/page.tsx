'use client';
import type React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
// import { useAuth } from '@/contexts/auth-context';
import { toast } from 'sonner';
import type { Post } from './types';
import { formatDate } from '@/utility';

const initialPosts: Post[] = [
  {
    id: '1',
    content: 'Acabei de descobrir uma nova biblioteca para gerenciar estado em React! É muito eficiente e fácil de usar. Vou compartilhar mais detalhes em breve.',
    authorName: 'João Silva',
    authorUsername: 'joaodev',
    createdAt: '2023-05-14T10:30:00Z',
    likes: 15
  },
  {
    id: '2',
    content: 'Estou trabalhando em um projeto incrível usando machine learning para analisar sentimentos em comentários de produtos. Os resultados preliminares são muito interessantes! Quem estiver interessado em colaborar, é só me mandar uma mensagem.',
    authorName: 'Maria Oliveira',
    authorUsername: 'mariatech',
    createdAt: '2023-05-13T16:45:00Z',
    likes: 24
  },
  {
    id: '3',
    content: 'Dica para devs: invistam tempo aprendendo algorítmos e estruturas de dados. Isso faz toda a diferença quando você precisa otimizar seu código para escalar. Recomendo começar com ordenação e busca.',
    authorName: 'Carlos Mendes',
    authorUsername: 'carlosdev',
    createdAt: '2023-05-12T09:15:00Z',
    likes: 37
  },
  {
    id: '4',
    content: 'Acabei de completar o curso de design de UIs acessíveis. É impressionante como pequenas mudanças podem fazer toda a diferença para pessoas com necessidades especiais. Inclusive, vou compartilhar um guia sobre isso na semana que vem.',
    authorName: 'Ana Santos',
    authorUsername: 'anadesigner',
    createdAt: '2023-05-11T14:20:00Z',
    likes: 29
  }
];

export default function BlogPage() {
  // const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Toggle like on a post
  const handleLikePost = (postId: string) => {
    const user = true;
    if (!user) {
      toast.error('Faça login para curtir posts');
      return;
    }
    
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };
  
  // Submit new post
  const handleSubmitPost = () => {
    const user = true;
    if (!user) {
      toast.error('Faça login para publicar');
      return;
    }
    
    if (!newPostContent.trim()) {
      toast.error('O conteúdo não pode estar vazio');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      const newPost: Post = {
        id: Date.now().toString(),
        content: newPostContent,
        authorName: 'Convidado',
        authorUsername: 'Convidado',
        createdAt: new Date().toISOString(),
        likes: 0
      };
      
      setPosts([newPost, ...posts]);
      setNewPostContent('');
      setIsPostModalOpen(false);
      setIsSubmitting(false);
      toast.success('Post publicado com sucesso!');
    }, 1000);
  };

  const NewPost = () => {
    return (
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog</h1>
        <Button onClick={() => setIsPostModalOpen(true)}>
          Novo Post
        </Button>
      </div>
    );
  }

  const NewPostModal = () => {
    return (
      <Dialog open={isPostModalOpen} onOpenChange={setIsPostModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Novo Post</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <Textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="O que você está pensando?"
              className="min-h-[150px]"
            />
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsPostModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmitPost}
              disabled={!newPostContent.trim() || isSubmitting}
            >
              {isSubmitting ? 'Publicando...' : 'Publicar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  const Posts = () => {
    return (
      <div className="space-y-4">
        {posts.map(post => (
          <Card key={post.id}>
            <CardHeader className="flex flex-row items-start gap-4 pb-2">
              <Avatar className="w-10 h-10">
                <div className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">
                  {post.authorName.charAt(0)}
                </div>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{post.authorName}</CardTitle>
                <div className="text-sm text-gray-500">@{post.authorUsername}</div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="whitespace-pre-line">{post.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center pt-2 text-sm text-gray-500">
              <span>{formatDate(post.createdAt)}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleLikePost(post.id)}
                className="flex items-center gap-1"
              >
                <span>👍</span>
                <span>{post.likes}</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
  
  return (
    <>
      <NewPost />
      <Posts />
      <NewPostModal />
    </>
  );
};