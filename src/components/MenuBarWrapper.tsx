'use client';

import { usePathname } from 'next/navigation';
import MenuBar from './MenuBar';

export default function MenuBarWrapper() {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  if (isAuthPage) {
    return null;
  }

  return <MenuBar />;
} 