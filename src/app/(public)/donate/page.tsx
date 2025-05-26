'use client';
import type React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const donators = [
  { name: 'Ana Silva', amount: 'R$ 25,00', date: '15/05/2023' },
  { name: 'João Oliveira', amount: 'R$ 50,00', date: '10/05/2023' },
  { name: 'Maria Santos', amount: 'R$ 15,00', date: '08/05/2023' },
  { name: 'Carlos Ferreira', amount: 'R$ 100,00', date: '01/05/2023' },
  { name: 'Fernanda Lima', amount: 'R$ 30,00', date: '28/04/2023' },
  { name: 'Roberto Alves', amount: 'R$ 45,00', date: '20/04/2023' },
  { name: 'Juliana Costa', amount: 'R$ 10,00', date: '15/04/2023' },
  { name: 'Pedro Mendes', amount: 'R$ 75,00', date: '10/04/2023' },
  { name: 'Luciana Barbosa', amount: 'R$ 20,00', date: '05/04/2023' },
  { name: 'Anônimo', amount: 'R$ 150,00', date: '01/04/2023' }
];

export default function DonatePage() {
  const CardQrCode = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Faça uma doação</CardTitle>
          <CardDescription>
            Ajude a manter este projeto ativo! Sua contribuição faz toda a diferença.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="bg-white p-4 rounded-lg mb-4">
            {/* QR code image - using a placeholder */}
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=link.mercadopago.com.br/dailyhub"
              alt="QR Code para doação"
              width={200}
              height={200}
            />
          </div>
          <p className="text-sm text-center max-w-md">
            Escaneie o código QR acima com seu aplicativo de pagamentos ou 
            <a 
              href="link.mercadopago.com.br/dailyhub" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline ml-1"
            >
              clique aqui
            </a> 
            para fazer sua doação.
          </p>
        </CardContent>
      </Card>
    )
  }

  const CardListDonators = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Doadores</CardTitle>
          <CardDescription>
            Agradecemos a todos que contribuíram com este projeto!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-y-auto max-h-80">
            <table className="w-full">
              <thead className="bg-muted sticky top-0">
                <tr>
                  <th className="text-left p-2">Nome</th>
                  <th className="text-right p-2">Valor</th>
                  <th className="text-right p-2">Data</th>
                </tr>
              </thead>
              <tbody>
                {donators.map((donator, index) => (
                  <tr key={`${donator.name}-${index}`} className="border-b last:border-b-0">
                    <td className="py-2">{donator.name}</td>
                    <td className="py-2 text-right">{donator.amount}</td>
                    <td className="py-2 text-right">{donator.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Seja o próximo a contribuir e ajude a manter este projeto vivo!
            </p>
          </div>
        </CardContent>
      </Card>
    )
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Pague-me um Café</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CardQrCode />
        <CardListDonators/>
      </div>
    </>
  );
};