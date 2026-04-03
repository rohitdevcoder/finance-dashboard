// src/components/SavingsGoals.tsx
'use client';

import { useState, useEffect } from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { formatCurrency } from '@/utils/formatters';
import { Plus, TrendingUp, X } from 'lucide-react';

interface Goal {
  id: string;
  name: string;
  target: number;
  icon: string;
}

const defaultGoals: Goal[] = [
  { id: '1', name: 'Emergency Fund', target: 500000, icon: '🏦' },
  { id: '2', name: 'New Laptop', target: 120000, icon: '💻' },
  { id: '3', name: 'Vacation', target: 75000, icon: '✈️' },
];

export default function SavingsGoals() {
  const { transactions, role } = useDashboard();
  
  const [goals, setGoals] = useState<Goal[]>(defaultGoals);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({ name: '', target: '', icon: '🎯' });
  const [isMounted, setIsMounted] = useState(false);

  // Load and Save from LocalStorage
  useEffect(() => {
    setIsMounted(true);
    const savedGoals = localStorage.getItem('finance_goals');
    if (savedGoals) setGoals(JSON.parse(savedGoals));
  }, []);

  useEffect(() => {
    if (isMounted) localStorage.setItem('finance_goals', JSON.stringify(goals));
  }, [goals, isMounted]);

  // Calculate total savings from transactions
  // Assuming 'Savings' category transactions are how money is saved
  const totalSaved = transactions
    .filter(t => t.category === 'Savings')
    .reduce((acc, tx) => acc + tx.amount, 0);

  // For visual purposes, we distribute the total saved across goals
  let remainingSavings = totalSaved;

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.name || !newGoal.target) return;
    
    setGoals([...goals, { 
      id: Date.now().toString(), 
      name: newGoal.name, 
      target: Number(newGoal.target), 
      icon: newGoal.icon 
    }]);
    setIsModalOpen(false);
    setNewGoal({ name: '', target: '', icon: '🎯' });
  };

  if (!isMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Savings Goals</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Track your progress toward major financial milestones.</p>
        </div>
        
        {role === 'admin' && (
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Add New Goal
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl">
            <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Savings Allocated</p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(totalSaved)}</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {goals.map((goal) => {
          // Distribute savings to goals (fill up the first ones first for demo purposes)
          const allocatedToThisGoal = Math.min(remainingSavings, goal.target);
          remainingSavings = Math.max(0, remainingSavings - goal.target);
          
          const percentage = Math.min((allocatedToThisGoal / goal.target) * 100, 100);
          const isComplete = percentage === 100;

          return (
            <div key={goal.id} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
              {isComplete && <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500 transform translate-x-8 -translate-y-8 rotate-45" />}
              
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{goal.icon}</span>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">{goal.name}</h3>
              </div>
              
              <div className="mb-2 flex justify-between items-end">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(allocatedToThisGoal)}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">of {formatCurrency(goal.target)}</span>
              </div>

              <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-2">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${isComplete ? 'bg-emerald-500' : 'bg-indigo-600'}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="text-xs font-medium text-right text-gray-500 dark:text-gray-400">
                {percentage.toFixed(1)}% Complete
              </p>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 dark:bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Create Savings Goal</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleAddGoal} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Goal Name</label>
                <input required type="text" value={newGoal.name} onChange={e => setNewGoal({...newGoal, name: e.target.value})} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl dark:text-white focus:ring-2 focus:ring-indigo-500/20" placeholder="e.g. New Car" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Amount (₹)</label>
                <input required type="number" min="1" value={newGoal.target} onChange={e => setNewGoal({...newGoal, target: e.target.value})} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl dark:text-white focus:ring-2 focus:ring-indigo-500/20" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Emoji Icon</label>
                <input required type="text" maxLength={2} value={newGoal.icon} onChange={e => setNewGoal({...newGoal, icon: e.target.value})} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl dark:text-white focus:ring-2 focus:ring-indigo-500/20" />
              </div>
              <button type="submit" className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors mt-4">Save Goal</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}