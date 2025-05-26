'use client';
import type React from 'react';
import { Sidebar } from './sidebar';
import { ScrollArea } from './ui/scroll-area';
import { usePathname } from 'next/navigation'
import styles from './layout.module.css';

interface LayoutProps {
 children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  
  // Determine active page from location
  const getActivePage = (): string => {
    const pathname = usePathname();
    console.log(pathname);
    if (pathname === '/') return '/news';
    return pathname.substring(1);
  };

  return (
    <main className={`top-0 left-0 absolute p-2 size-full bg-dashboard-background ${styles.gridMain}`}>
      {/* Sidebar - 22% width instead of 20% to reduce main content size */}
      <aside className="bg-transparent text-dashboard-foreground">
        <Sidebar activePage={getActivePage()} />
      </aside>
      
      {/* Main content - 78% width with vertical centering */}
      <main className="size-full content-area p-6 rounded-2xl overflow-scroll bg-white shadow-lg">
        {children}
      </main>
    </main>
  );
};
