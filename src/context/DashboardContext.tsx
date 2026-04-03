// src/context/DashboardContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
// 1. Import the new TabType
import { Transaction, Role, TabType } from '../types';
import { initialTransactions } from '../data/mockData';

interface DashboardContextType {
  transactions: Transaction[];
  role: Role;
  setRole: (role: Role) => void;
  addTransaction: (transaction: Transaction) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  // 2. Add Tab State Definitions
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [role, setRole] = useState<Role>('viewer');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // 3. Initialize the Active Tab state (default to 'overview')
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  return (
    <DashboardContext.Provider value={{ 
      transactions, role, setRole, addTransaction, 
      isMobileMenuOpen, setIsMobileMenuOpen,
      activeTab, setActiveTab // 4. Export the tab state
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};