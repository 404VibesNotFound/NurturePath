import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useTheme } from '../../hooks/useTheme';
interface MainLayoutProps {
  children: React.ReactNode;
}
const MainLayout: React.FC<MainLayoutProps> = ({
  children
}) => {
  const {
    resolvedTheme
  } = useTheme();
  return <div className={`flex flex-col min-h-screen ${resolvedTheme === 'dark' ? 'bg-gray-900' : 'bg-[#f9f8fd]'}`}>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>;
};
export default MainLayout;