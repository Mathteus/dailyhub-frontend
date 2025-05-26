'use client';
import type React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { NewsItem } from './types';
import Image from 'next/image';

const newsMockData: NewsItem[] = [
  {
    id: 1,
    title: 'Nova tecnologia revoluciona mercado',
    summary: 'Pesquisadores desenvolvem sistema que promete mudar completamente a forma como interagimos com dispositivos móveis.',
    content: 'Uma equipe de pesquisadores da Universidade de Stanford apresentou nesta semana um sistema que promete revolucionar a forma como interagimos com dispositivos móveis. A tecnologia, batizada de "NeuroSync", permite o controle de smartphones e tablets apenas com o pensamento, por meio de um pequeno sensor acoplado atrás da orelha. Segundo os cientistas, o dispositivo consegue captar sinais neurais e convertê-los em comandos digitais com uma precisão de 95%. Os primeiros testes com voluntários mostraram que, após um breve período de adaptação, é possível navegar entre aplicativos, digitar mensagens e até mesmo jogar com a mente. Especialistas da indústria já consideram que esta pode ser a maior revolução na interface homem-máquina desde a tela touchscreen. A expectativa é que os primeiros dispositivos comerciais com a tecnologia cheguem ao mercado em aproximadamente dois anos.',
    date: '2023-05-14',
    category: 'Tecnologia',
    image: 'https://images.unsplash.com/photo-1504610926078-a1611febcad3?q=80&w=1480&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Descoberta científica surpreende comunidade acadêmica',
    summary: 'Novo estudo revela conexões inesperadas entre alimentação e longevidade, contradizendo teorias anteriores.',
    content: 'Um estudo publicado na renomada revista Science está causando grande impacto na comunidade científica ao revelar conexões surpreendentes entre hábitos alimentares e longevidade. A pesquisa, que acompanhou mais de 100.000 pessoas por três décadas em diferentes países, contradiz várias teorias nutricionais consolidadas. Os dados mostraram que indivíduos que mantêm um padrão de alimentação irregular, mas com períodos regulares de jejum espontâneo, apresentaram telômeros significativamente mais longos – um marcador biológico associado ao envelhecimento saudável. "É como se o corpo humano tivesse sido programado evolutivamente para lidar com a incerteza alimentar, não com a regularidade que tanto pregamos nas últimas décadas", explica a Dra. Amanda Chen, principal autora do estudo. A descoberta desafia o consenso atual sobre a importância das refeições regulares e pode levar a uma completa revisão das diretrizes nutricionais globais.',
    date: '2023-05-13',
    category: 'Ciência',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Economia global mostra sinais de recuperação',
    summary: 'Relatórios indicam crescimento econômico em setores-chave, trazendo otimismo para investidores.',
    content: 'Os últimos relatórios econômicos globais trazem um sopro de otimismo para mercados que vinham enfrentando turbulências nos últimos anos. Dados divulgados simultaneamente pelos bancos centrais das maiores economias mundiais mostram uma recuperação consistente em setores-chave, especialmente tecnologia, energia renovável e saúde. O índice de confiança do consumidor subiu em todas as economias do G20, atingindo o maior patamar dos últimos cinco anos. "Estamos vendo uma confluência positiva de fatores: inflação controlada, estabilidade política em mercados-chave e investimentos substanciais em infraestrutura", analisa o economista-chefe do Banco Mundial, Robert Kiyosaki. O setor de energia verde é o que apresenta maior crescimento, impulsionado por políticas climáticas mais agressivas e avanços tecnológicos que reduziram drasticamente os custos de implementação. Investidores já começam a realocar seus portfólios, apostando em uma recuperação sustentada nos próximos trimestres.',
    date: '2023-05-12',
    category: 'Economia',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'Evento cultural atrai milhares de visitantes',
    summary: 'Festival de artes integradas celebra diversidade cultural com atrações internacionais e locais.',
    content: 'O Festival Internacional de Artes Integradas, realizado na última semana, atraiu um público recorde de mais de 150 mil pessoas, superando todas as expectativas dos organizadores. O evento, que ocupou diversos espaços públicos da cidade, contou com mais de 300 atrações entre espetáculos teatrais, exposições, shows musicais, performances de dança e intervenções urbanas. A curadoria do festival priorizou a diversidade cultural, trazendo artistas de 42 países diferentes que dialogaram com talentos locais em colaborações inéditas. "Conseguimos criar um ambiente onde tradições ancestrais encontraram expressões contemporâneas, gerando uma troca cultural genuína", celebra Maria Gonzalez, diretora artística do evento. O impacto econômico na cidade também foi significativo, com hotéis operando em capacidade máxima e um aumento de 60% no faturamento de restaurantes e comércio local. Diante do sucesso, a prefeitura já anunciou a ampliação do festival para o próximo ano, com duração estendida para duas semanas.',
    date: '2023-05-11',
    category: 'Cultura',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1374&auto=format&fit=crop'
  },
  {
    id: 5,
    title: 'Avanços na medicina trazem esperança para pacientes',
    summary: 'Novos tratamentos experimentais mostram resultados promissores em testes clínicos para doenças crônicas.',
    content: 'Uma série de avanços médicos anunciados esta semana está trazendo renovada esperança para pacientes com condições crônicas consideradas até então de difícil tratamento. Destaque para um novo medicamento que atua diretamente no sistema imunológico, mostrando eficácia sem precedentes no controle da esclerose múltipla. Em testes clínicos de fase 3, 72% dos pacientes apresentaram remissão completa dos sintomas após seis meses de tratamento. Em outra frente promissora, cientistas da Universidade de Tóquio relataram sucesso no desenvolvimento de um implante neural que restaurou parcialmente movimentos em pacientes com lesões na medula espinhal. "Estamos assistindo a uma convergência de tecnologias – bioengenharia, inteligência artificial e nanomedicina – que está acelerando dramaticamente nossa capacidade de enfrentar doenças antes consideradas intratáveis", afirma Dr. Hirofumi Takahashi, um dos pesquisadores responsáveis pelo avanço. Especialistas estimam que alguns desses tratamentos possam estar disponíveis para o público em geral dentro de dois a três anos, dependendo da agilidade dos processos regulatórios.',
    date: '2023-05-10',
    category: 'Saúde',
    image: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?q=80&w=1471&auto=format&fit=crop'
  }
];

export default function News() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  
  const handleNewsClick = (news: NewsItem) => {
    setSelectedNews(news);
  };
  
  const closeNewsModal = () => {
    setSelectedNews(null);
  };

  const FeaturedNews = () => {
    return (
      <Card 
        className="col-span-full cursor-pointer hover:shadow-lg transition-shadow" 
        onClick={() => handleNewsClick(newsMockData[0])}>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/3 h-64 md:h-auto">
            <Image 
              src={newsMockData[0].image} 
              alt={newsMockData[0].title}
              className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
              width={500}
              height={300}
            />
          </div>
          <div className="md:w-1/3 p-6">
            <div className="mb-2 text-sm font-medium text-blue-600">
              {newsMockData[0].category}
            </div>
            <h2 className="text-2xl font-bold mb-2">{newsMockData[0].title}</h2>
            <p className="text-gray-700 mb-4">{newsMockData[0].summary}</p>
            <div className="text-sm text-gray-500">{newsMockData[0].date}</div>
          </div>
        </div>
      </Card>
    );
  };

  const NewsGrid = () => {
    return (
      <>
        {newsMockData.slice(1).map((news) => (
          <Card 
            key={news.id}
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleNewsClick(news)}>
            <div className="h-48">
              <Image 
                src={news.image} 
                alt={news.title}
                className="w-full h-full object-cover"
                width={500}
                height={300}
              />
            </div>
            <CardHeader className="pb-2">
              <div className="text-sm font-medium text-blue-600 mb-1">
                {news.category}
              </div>
              <CardTitle className="text-xl">{news.title}</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <CardDescription>{news.summary}</CardDescription>
            </CardContent>
            <CardFooter className="text-sm text-gray-500">
              {news.date}
            </CardFooter>
          </Card>
        ))}
      </>
    );
  };

  const NewsModal = () => {
    return (
      <Dialog open={!!selectedNews} onOpenChange={closeNewsModal}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedNews && (
            <>
              <DialogHeader>
                <div className="text-sm font-medium text-blue-600 mb-1">
                  {selectedNews.category}
                </div>
                <DialogTitle className="text-2xl">
                  {selectedNews.title}
                </DialogTitle>
                <div className="text-sm text-gray-500 mt-1">{selectedNews.date}</div>
              </DialogHeader>
              
              <div className="my-4">
                <Image 
                  src={selectedNews.image} 
                  alt={selectedNews.title}
                  className="w-full h-64 object-cover rounded-md"
                  width={500}
                  height={300}
                />
              </div>

              <p className="text-gray-800 leading-relaxed">
                {selectedNews.content || selectedNews.summary}
              </p>
              
              <DialogFooter>
                <Button onClick={closeNewsModal}>Fechar</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    );
  };
  
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Últimas Notícias</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FeaturedNews />
        <NewsGrid />
        <NewsModal />
      </div>
    </>
  );
};