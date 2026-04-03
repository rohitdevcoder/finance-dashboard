// src/components/DashboardInsights.tsx
'use client';

import { useDashboard } from '@/context/DashboardContext';
import { formatCurrency } from '@/utils/formatters';
import { Lightbulb, AlertCircle, TrendingUp } from 'lucide-react';

export default function DashboardInsights() {
  const { transactions } = useDashboard();

  // Find the category with the highest total spending
  const expenses = transactions.filter(t => t.type === 'expense');
  const expensesByCategory = expenses.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {} as Record<string, number>);

  let highestCategory = 'None';
  let highestAmount = 0;
  Object.entries(expensesByCategory).forEach(([category, amount]) => {
    if (amount > highestAmount) {
      highestAmount = amount;
      highestCategory = category;
    }
  });

  // Find the single largest expense
  const largestSingleExpense = expenses.length > 0 
    ? expenses.reduce((prev, current) => (prev.amount > current.amount) ? prev : current)
    : null;

  return (
    <div className="bg-indigo-800 rounded-xl p-6 text-white shadow-md">
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb className="w-5 h-5 text-indigo-200" />
        <h3 className="text-lg font-bold">Financial Insights</h3>
      </div>

      <div className="space-y-4">
        {/* Insight 1: Highest Category */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-indigo-200 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-indigo-100 font-medium">Top Spending Category</p>
              <p className="text-base font-semibold mt-1">
                You&apos;ve spent the most on <span className="text-white bg-white/20 px-2 py-0.5 rounded-md">{highestCategory}</span> at {formatCurrency(highestAmount)}.
              </p>
            </div>
          </div>
        </div>

        {/* Insight 2: Largest Transaction */}
        {largestSingleExpense && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-indigo-200 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-indigo-100 font-medium">Largest Single Expense</p>
                <p className="text-base font-semibold mt-1">
                  Your biggest outflow was {formatCurrency(largestSingleExpense.amount)} for {largestSingleExpense.description}.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}