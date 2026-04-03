// src/components/DashboardCharts.tsx
'use client';

import { useDashboard } from '@/context/DashboardContext';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import { formatCurrency } from '@/utils/formatters';

export default function DashboardCharts() {
  const { transactions } = useDashboard();

  // 1. Group transactions by Date to make the charts clean
  const groupedByDate = transactions.reduce((acc, tx) => {
    // Format date nicely (e.g., "Mar 15")
    const dateStr = new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const timestamp = new Date(tx.date).getTime();

    if (!acc[dateStr]) {
      acc[dateStr] = { date: dateStr, income: 0, expense: 0, timestamp };
    }
    
    if (tx.type === 'income') acc[dateStr].income += tx.amount;
    else acc[dateStr].expense += tx.amount;
    
    return acc;
  }, {} as Record<string, { date: string, income: number, expense: number, timestamp: number }>);

  // Sort chronologically
  const sortedDailyData = Object.values(groupedByDate).sort((a, b) => a.timestamp - b.timestamp);

  // 2. Prepare Data for Line Chart (Running Balance)
  let runningBalance = 0;
  const trendData = sortedDailyData.map(day => {
    runningBalance += (day.income - day.expense);
    return { date: day.date, balance: runningBalance };
  });

  // 3. Prepare Data for Donut Chart (Expenses by Category)
  const expenses = transactions.filter(t => t.type === 'expense');
  const expensesByCategory = expenses.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(expensesByCategory)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value); // Sort largest to smallest

  // Colors for the pie chart
  const COLORS = ['#4f46e5', '#ec4899', '#f59e0b', '#10b981', '#6366f1', '#f43f5e', '#8b5cf6', '#14b8a6'];

  // Custom Tooltip component for better formatting
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-white mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm font-medium">
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      
      {/* NEW: Cash Flow Bar Chart (Income vs Expense) */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Cash Flow Over Time</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Compare your daily income against your spending.</p>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sortedDailyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-gray-800" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                tickFormatter={(value) => `₹${value}`}
              />
              <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar dataKey="expense" name="Expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Spending Breakdown Chart */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Spending by Category</h3>
          {pieData.length > 0 ? (
            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400">
              No expense data available.
            </div>
          )}
        </div>

        {/* Balance Trend Chart */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Total Balance Trend</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-gray-800" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  width={60}
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                  tickFormatter={(value) => `₹${value}`}
                />
                <RechartsTooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="balance" 
                  name="Balance"
                  stroke="#4f46e5" 
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#4f46e5', strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: '#4f46e5', stroke: '#c7d2fe', strokeWidth: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
}