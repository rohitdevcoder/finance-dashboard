import { Transaction } from '../types';

export const initialTransactions: Transaction[] = [
  { id: '1', date: '2024-03-01', amount: 4500, category: 'Salary', type: 'income', description: 'Monthly Salary' },
  { id: '2', date: '2024-03-02', amount: 1500, category: 'Housing', type: 'expense', description: 'Rent Payment' },
  { id: '3', date: '2024-03-05', amount: 85.50, category: 'Utilities', type: 'expense', description: 'Electric Bill' },
  { id: '4', date: '2024-03-08', amount: 120, category: 'Food', type: 'expense', description: 'Groceries' },
  { id: '5', date: '2024-03-10', amount: 45, category: 'Transportation', type: 'expense', description: 'Gas' },
  { id: '6', date: '2024-03-12', amount: 300, category: 'Freelance', type: 'income', description: 'Web Dev Project' },
  { id: '7', date: '2024-03-15', amount: 65, category: 'Entertainment', type: 'expense', description: 'Movie Tickets' },
  { id: '8', date: '2024-03-18', amount: 210, category: 'Food', type: 'expense', description: 'Groceries & Snacks' },
  { id: '9', date: '2024-03-20', amount: 50, category: 'Subscriptions', type: 'expense', description: 'Software Licenses' },
  { id: '10', date: '2024-03-22', amount: 150, category: 'Savings', type: 'expense', description: 'Transfer to Savings' },
];

export const categories = [
  'Salary', 'Freelance', 'Housing', 'Utilities', 'Food', 
  'Transportation', 'Entertainment', 'Subscriptions', 'Savings', 'Other'
];