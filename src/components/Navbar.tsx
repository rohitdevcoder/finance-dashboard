// src/components/Navbar.tsx
'use client';

import { useDashboard } from '@/context/DashboardContext';
import ThemeToggle from './ThemeToggle';
import { Menu } from 'lucide-react';

export default function Navbar() {
  // Added setIsMobileMenuOpen
  const { role, setRole, setIsMobileMenuOpen } = useDashboard();

  return (
    <header className="h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-6 flex justify-between items-center sticky top-0 z-10 transition-colors duration-300">
      
      {/* Mobile Menu Button - Now functional! */}
      <button 
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      >
        <Menu size={24} />
      </button>

      <div className="hidden md:block">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Overview</h2>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <ThemeToggle />

        <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2"></div>

        <span className="hidden sm:inline text-sm font-medium text-gray-500 dark:text-gray-400">Role:</span>
        <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg flex">
          <button
            onClick={() => setRole('viewer')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md cursor-pointer transition-all ${
              role === 'viewer' 
                ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            Viewer
          </button>
          <button
            onClick={() => setRole('admin')}
            // Changed from bg-blue-600 to bg-indigo-600
            className={`px-3 py-1.5 text-sm font-medium cursor-pointer rounded-md transition-all ${
              role === 'admin' 
                ? 'bg-indigo-600 shadow-sm text-white' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            Admin
          </button>
        </div>
      </div>
    </header>
  );
}