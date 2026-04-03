// src/app/page.tsx
'use client';

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import SummaryCards from "@/components/SummaryCards";
import TransactionsTable from "@/components/TransactionsTable";
import DashboardCharts from "@/components/DashboardCharts";
import DashboardInsights from "@/components/DashboardInsights";
import BudgetPlanner from "@/components/BudgetPlanner"; 
// 1. Add the new imports
import SavingsGoals from "@/components/SavingsGoals";
import Settings from "@/components/Settings";
import { useDashboard } from "@/context/DashboardContext";

export default function Home() {
  const { activeTab } = useDashboard();

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SummaryCards />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2"><DashboardCharts /></div>
              <div className="xl:col-span-1"><DashboardInsights /></div>
            </div>
            <TransactionsTable />
          </div>
        );
      
      case 'transactions':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transaction History</h1>
            <TransactionsTable />
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Analytics</h1>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
              <div className="xl:col-span-1"><DashboardInsights /></div>
              <div className="xl:col-span-2"><DashboardCharts /></div>
            </div>
          </div>
        );

      case 'budget':
        return <BudgetPlanner />;

      // 2. Map the final routes!
      case 'goals':
        return <SavingsGoals />;

      case 'settings':
        return <Settings />;

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}