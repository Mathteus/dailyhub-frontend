'use client';

import { queryClient } from '@/lib/react-query';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Layout } from '@/components/layout'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<NextUIProvider>
			<TooltipProvider>
			<Toaster />
			<Sonner />
				<QueryClientProvider client={queryClient}>
					<Layout>
						{children}
					</Layout>
				</QueryClientProvider>
			</TooltipProvider>
		</NextUIProvider>
	);
}
