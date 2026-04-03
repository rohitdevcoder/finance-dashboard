// src/components/Settings.tsx
'use client';

import { useState } from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { User, Bell, Wallet, } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Settings() {
  const { role } = useDashboard();
  const { theme, setTheme } = useTheme();
  
  // Local state for toggle switches (mocking settings)
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your account preferences and dashboard configurations.</p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm divide-y divide-gray-100 dark:divide-gray-800">
        
        {/* Profile Section */}
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Profile</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Your personal information and role.</p>
          </div>
          <div className="md:w-2/3 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xl border-2 border-indigo-200 dark:border-indigo-800">
                JD
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">John Doe</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">john.doe@example.com</p>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 capitalize">
                  Role: {role}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Preferences</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Customize your dashboard experience.</p>
          </div>
          <div className="md:w-2/3 space-y-6">
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Toggle dark theme across the dashboard.</p>
              </div>
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`w-12 h-6 rounded-full transition-colors relative ${theme === 'dark' ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${theme === 'dark' ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">Default Currency</label>
              <select disabled className="w-full md:w-64 px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl dark:text-white opacity-70 cursor-not-allowed">
                <option>INR (₹) - Indian Rupee</option>
                <option>USD ($) - US Dollar</option>
              </select>
              <p className="text-xs text-gray-500 mt-2">Currency is locked to INR for this session.</p>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Notifications</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">How you receive alerts and reports.</p>
          </div>
          <div className="md:w-2/3 space-y-6">
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Email Alerts</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Get notified about large transactions.</p>
              </div>
              <button onClick={() => setEmailAlerts(!emailAlerts)} className={`w-12 h-6 rounded-full transition-colors relative ${emailAlerts ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}>
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${emailAlerts ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Weekly Reports</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive a weekly summary of spending.</p>
              </div>
              <button onClick={() => setWeeklyReports(!weeklyReports)} className={`w-12 h-6 rounded-full transition-colors relative ${weeklyReports ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}>
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${weeklyReports ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}