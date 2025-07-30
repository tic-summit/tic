'use client';

import { usePathname } from 'next/navigation';
import Header2 from "../components/header/Header2";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const noHeaderRoutes = ['/auth/signup', '/auth/login'];
  const showHeader = !noHeaderRoutes.includes(pathname);

  return (
    <>
      {showHeader && <Header2 />}
      {children}
    </>
  );
}