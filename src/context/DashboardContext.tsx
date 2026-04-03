// src/context/DashboardContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Transaction, Role, TabType } from '../types';
import { initialTransactions } from '../data/mockData';

interface DashboardContextType {
  transactions: Transaction[];
  role: Role;
  setRole: (role: Role) => void;
  // Full CRUD Operations
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, updatedTransaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  // UI States
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  // 1. Initialize state (start empty to prevent Next.js hydration mismatch)
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [role, setRole] = useState<Role>('viewer');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  
  // 2. Track if the component has mounted on the client
  const [isMounted, setIsMounted] = useState(false);

  // 3. ON MOUNT: Load data from LocalStorage (or fallback to mock data)
  useEffect(() => {
    setIsMounted(true);
    const savedTransactions = localStorage.getItem('finance_transactions');
    
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      setTransactions(initialTransactions);
    }
  }, []);

  // 4. ON CHANGE: Save to LocalStorage whenever transactions update
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('finance_transactions', JSON.stringify(transactions));
    }
  }, [transactions, isMounted]);

  // --- CRUD OPERATIONS ---
  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const updateTransaction = (id: string, updatedTransaction: Transaction) => {
    setTransactions((prev) => prev.map(tx => tx.id === id ? updatedTransaction : tx));
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter(tx => tx.id !== id));
  };

  // Prevent rendering children until we have loaded the local storage data to avoid UI flickering
  if (!isMounted) {
    return null; 
  }

  return (
    <DashboardContext.Provider value={{ 
      transactions, 
      role, 
      setRole, 
      addTransaction, 
      updateTransaction, 
      deleteTransaction,
      isMobileMenuOpen, 
      setIsMobileMenuOpen,
      activeTab, 
      setActiveTab
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