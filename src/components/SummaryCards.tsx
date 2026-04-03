// src/components/SummaryCards.tsx
'use client';

import { useDashboard } from '@/context/DashboardContext';
import { formatCurrency } from '@/utils/formatters'; // Fixes the formatCurrency error
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react'; // Fixes the Wallet error

export default function SummaryCards() {
  const { transactions } = useDashboard();

  // Calculate totals dynamically
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Balance Card */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Balance</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(totalBalance)}
            </h2>
          </div>
          <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
            <Wallet className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
      </div>

      {/* Total Income Card */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Income</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(totalIncome)}
            </h2>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl">
            <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Total Expenses Card */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Expenses</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(totalExpense)}
            </h2>
          </div>
          <div className="p-3 bg-rose-50 dark:bg-rose-900/30 rounded-xl">
            <TrendingDown className="w-6 h-6 text-rose-600 dark:text-rose-400" />
          </div>
        </div>
      </div>
    </div>
  );
}