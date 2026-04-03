// src/components/BudgetPlanner.tsx
'use client';

import { useState, useEffect } from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { formatCurrency } from '@/utils/formatters';
import { PiggyBank, AlertTriangle, CheckCircle2, Settings2, X } from 'lucide-react';

// Default budget goals (used as a fallback)
const initialBudgets = {
  Housing: 25000,
  Food: 12000,
  Utilities: 5000,
  Transportation: 4000,
  Entertainment: 3000,
  Subscriptions: 1500,
};

export default function BudgetPlanner() {
  // 1. Pull the role from context so we can hide/show the admin button
  const { transactions, role } = useDashboard();
  
  // 2. State for budgets and the edit modal
  const [budgets, setBudgets] = useState<Record<string, number>>(initialBudgets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editBudgets, setEditBudgets] = useState<Record<string, number>>(initialBudgets);
  const [isMounted, setIsMounted] = useState(false);

  // 3. Load budgets from Local Storage on mount
  useEffect(() => {
    setIsMounted(true);
    const savedBudgets = localStorage.getItem('finance_budgets');
    if (savedBudgets) {
      setBudgets(JSON.parse(savedBudgets));
    }
  }, []);

  // 4. Save budgets to Local Storage whenever they change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('finance_budgets', JSON.stringify(budgets));
    }
  }, [budgets, isMounted]);

  // Calculate actual spending per category from our transactions
  const expenses = transactions.filter(t => t.type === 'expense');
  const spendingByCategory = expenses.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {} as Record<string, number>);

  // Calculate overall totals
  const totalBudget = Object.values(budgets).reduce((a, b) => a + b, 0);
  const totalSpent = Object.keys(budgets).reduce((sum, cat) => sum + (spendingByCategory[cat] || 0), 0);
  const totalPercentage = totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 100) : 0;

  // Handlers for the Modal
  const handleOpenModal = () => {
    setEditBudgets(budgets); // Populate form with current budgets
    setIsModalOpen(true);
  };

  const handleSaveBudgets = (e: React.FormEvent) => {
    e.preventDefault();
    setBudgets(editBudgets);
    setIsModalOpen(false);
  };

  if (!isMounted) return null; // Prevent hydration errors

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header & Overview Card */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Monthly Budget Planner</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Track your spending limits and manage your financial goals.</p>
        </div>
        
        {/* NEW: Edit Budgets Button - ONLY VISIBLE TO ADMIN */}
        {role === 'admin' && (
          <button 
            onClick={handleOpenModal}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
          >
            <Settings2 className="w-4 h-4" />
            Edit Budgets
          </button>
        )}
      </div>

      {/* Main Budget Summary */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
            <PiggyBank className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Total Budget Overview</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">All tracked categories</p>
          </div>
        </div>

        <div className="mb-4 flex justify-between items-end">
          <div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{formatCurrency(totalSpent)}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">spent of {formatCurrency(totalBudget)}</p>
          </div>
          <div className="text-right">
            <span className={`text-sm font-semibold px-2.5 py-1 rounded-md ${totalSpent > totalBudget ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'}`}>
              {totalPercentage.toFixed(1)}% Used
            </span>
          </div>
        </div>

        {/* Master Progress Bar */}
        <div className="w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${totalSpent > totalBudget ? 'bg-rose-500' : 'bg-indigo-600'}`}
            style={{ width: `${totalPercentage}%` }}
          />
        </div>
      </div>

      {/* Individual Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Object.entries(budgets).map(([category, budgetAmount]) => {
          const spent = spendingByCategory[category] || 0;
          const percentage = budgetAmount > 0 ? Math.min((spent / budgetAmount) * 100, 100) : (spent > 0 ? 100 : 0);
          const isOverBudget = spent > budgetAmount;

          return (
            <div key={category} className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">{category}</h3>
                {isOverBudget ? (
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                )}
              </div>
              
              <div className="mb-3 flex justify-between items-end">
                <span className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(spent)}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">/ {formatCurrency(budgetAmount)}</span>
              </div>

              {/* Category Progress Bar */}
              <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    isOverBudget ? 'bg-rose-500' : 
                    percentage > 85 ? 'bg-amber-500' : 
                    'bg-indigo-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-right">
                {isOverBudget ? 'Over budget' : `${formatCurrency(budgetAmount - spent)} left`}
              </p>
            </div>
          );
        })}
      </div>

      {/* NEW: Admin Edit Budget Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 dark:bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Edit Budget Limits</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSaveBudgets} className="p-6">
              {/* Scrollable list of inputs */}
              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                {Object.entries(editBudgets).map(([category, amount]) => (
                  <div key={category}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{category} (₹)</label>
                    <input 
                      required 
                      type="number" 
                      min="0" 
                      value={amount} 
                      onChange={(e) => setEditBudgets({...editBudgets, [category]: Number(e.target.value)})} 
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl dark:text-white focus:ring-2 focus:ring-indigo-500/20" 
                    />
                  </div>
                ))}
              </div>
              
              <div className="pt-6 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-sm">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}