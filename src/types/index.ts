export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string; // ISO format (YYYY-MM-DD) makes sorting easier
  amount: number;
  category: string;
  type: TransactionType;
  description: string;
}

export type Role = 'viewer' | 'admin';

export type TabType = 'overview' | 'transactions' | 'analytics' | 'budget' | 'goals' | 'settings';