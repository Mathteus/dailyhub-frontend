import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { APP_NAME, APP_DEFAULT_TITLE, APP_TITLE_TEMPLATE, APP_DESCRIPTION } from '@/config/site';
import { montserrat } from '@/styles';
import { Providers } from '@/app/providers';

export const metadata: Metadata = {
	applicationName: APP_NAME,
	title: {
	  default: APP_DEFAULT_TITLE,
	  template: APP_TITLE_TEMPLATE,
	},
	description: APP_DESCRIPTION,
	manifest: "/manifest.json",
	appleWebApp: {
	  capable: true,
	  statusBarStyle: "default",
	  title: APP_DEFAULT_TITLE,
	  // startUpImage: [],
	},
	formatDetection: {
	  telephone: false,
	},
	openGraph: {
	  type: "website",
	  siteName: APP_NAME,
	  title: {
		default: APP_DEFAULT_TITLE,
		template: APP_TITLE_TEMPLATE,
	  },
	  description: APP_DESCRIPTION,
	},
	twitter: {
	  card: "summary",
	  title: {
		default: APP_DEFAULT_TITLE,
		template: APP_TITLE_TEMPLATE,
	  },
	  description: APP_DESCRIPTION,
	},
};
  
export const viewport: Viewport = {
	themeColor: "#fff",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='pt-BR'>
			<body className={`${montserrat.variable} antialiased dark`}>
				<Providers>
					{children}
				</Providers>
			</body>
		</html>
	);
}
