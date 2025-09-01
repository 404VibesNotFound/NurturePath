import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    resolvedTheme,
    setTheme
  } = useTheme();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };
  return <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-[#4c146c] dark:text-[#b083f7]">
            HealthSync
          </span>
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-[#333333] dark:text-gray-200 hover:text-[#4c146c] dark:hover:text-[#b083f7] transition-colors">
            Home
          </Link>
          <Link to="/dashboard" className="text-[#333333] dark:text-gray-200 hover:text-[#4c146c] dark:hover:text-[#b083f7] transition-colors">
            Dashboard
          </Link>
          <Link to="/login" className="text-[#333333] dark:text-gray-200 hover:text-[#4c146c] dark:hover:text-[#b083f7] transition-colors">
            Login
          </Link>
          <Link to="/signup" className="bg-[#4c146c] text-white px-4 py-2 rounded-md hover:bg-[#b083f7] transition-colors">
            Sign Up
          </Link>
          <button onClick={toggleTheme} className="text-[#333333] dark:text-gray-200 hover:text-[#4c146c] dark:hover:text-[#b083f7] transition-colors" aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            {resolvedTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button onClick={toggleTheme} className="text-[#333333] dark:text-gray-200 hover:text-[#4c146c] dark:hover:text-[#b083f7] transition-colors" aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            {resolvedTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="text-[#4c146c] dark:text-[#b083f7]" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && <nav className="md:hidden bg-white dark:bg-gray-800 px-4 py-4 shadow-md">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-[#333333] dark:text-gray-200 hover:text-[#4c146c] dark:hover:text-[#b083f7] transition-colors" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/dashboard" className="text-[#333333] dark:text-gray-200 hover:text-[#4c146c] dark:hover:text-[#b083f7] transition-colors" onClick={() => setIsMenuOpen(false)}>
              Dashboard
            </Link>
            <Link to="/login" className="text-[#333333] dark:text-gray-200 hover:text-[#4c146c] dark:hover:text-[#b083f7] transition-colors" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
            <Link to="/signup" className="bg-[#4c146c] text-white px-4 py-2 rounded-md hover:bg-[#b083f7] transition-colors text-center" onClick={() => setIsMenuOpen(false)}>
              Sign Up
            </Link>
          </div>
        </nav>}
    </header>;
};
export default Header;