// src/components/Sidebar.tsx
'use client';

import { useDashboard } from '@/context/DashboardContext';
import { LayoutDashboard, ArrowRightLeft, PieChart, Settings, Wallet, Target, PiggyBank, X } from 'lucide-react';
import { TabType } from '@/types';

export default function Sidebar() {
  // Pull activeTab and setActiveTab from context
  const { isMobileMenuOpen, setIsMobileMenuOpen, activeTab, setActiveTab } = useDashboard();

  // Define our extended finance tabs
  const navItems: { id: TabType; name: string; icon: any }[] = [
    { id: 'overview', name: 'Overview', icon: LayoutDashboard },
    { id: 'transactions', name: 'Transactions', icon: ArrowRightLeft },
    { id: 'analytics', name: 'Analytics', icon: PieChart },
    { id: 'budget', name: 'Budget Planner', icon: PiggyBank },
    { id: 'goals', name: 'Savings Goals', icon: Target },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  // Helper to handle tab clicks
  const handleTabClick = (tabId: TabType) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false); // Close sidebar on mobile after clicking
  };

  return (
    <>
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 dark:bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center shadow-sm text-white">
              <Wallet size={18} />
            </div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">FinanceFlow</span>
          </div>
          <button className="md:hidden p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Main Menu</p>
          
          {navItems.map((item) => {
            const Icon = item.icon;
            // Check if this item is the currently active tab
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-md transition-all ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon size={20} />
                {item.name}
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800 shrink-0">
          <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-bold">JD</div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}