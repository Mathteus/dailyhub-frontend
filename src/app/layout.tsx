import type { Metadata } from 'next';
import '@/styles/globals.css';
import { SiteConfig } from '@/config/site';
import { montserrat } from '@/styles';
import { Providers } from './providers';


export const metadata: Metadata = {
	title: SiteConfig.name,
	description: SiteConfig.description,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='pt-BR'>
			<body className={`${montserrat.variable} antialiased dark`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
