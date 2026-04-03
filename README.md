# 📈 Finance Dashboard

A modern, responsive, and interactive financial dashboard built as a Single Page Application (SPA) to demonstrate advanced frontend development skills, component architecture, and client-side state management.

🚀 **[View Live Demo](https://finance-dashboard-tet8k0dg.vercel.app/)** | 💻 **[GitHub Repository](https://github.com/rohitdevcoder/finance-dashboard)**

---

## ✨ Key Features

This project fulfills all core requirements and optional enhancements of the frontend evaluation prompt:

### 📊 Core Dashboard & Visualizations
- **Dynamic Summary Metrics:** Real-time calculation of Total Balance, Income, and Expenses.
- **Interactive Charts (Recharts):** - *Cash Flow Bar Chart:* Daily comparison of income vs. expenses.
  - *Balance Trend:* Line chart tracking overall net worth over time.
  - *Spending Breakdown:* Donut chart categorizing outgoings.
- **Automated Insights:** An intelligence panel that auto-calculates top spending categories and largest single expenses.

### 💸 Transaction Management
- **Smart Data Table:** Search, sort, and filter transactions by type (Income/Expense) and keyword.
- **CSV Export:** Native browser API integration allowing users to download their transaction history as a formatted `.csv` file.

### 🛡️ Role-Based Access Control (RBAC) & State
- Simulated frontend roles toggleable via the navigation bar.
  - **Viewer:** Read-only access to data and charts.
  - **Admin:** Granted UI access to "Add Transaction" and "Edit Budgets" modal forms.
- **Global State Management:** Powered by React Context API to ensure instant UI updates across all routed tabs without prop-drilling.
- **Data Persistence:** Transactions, Budgets, and Goals are synced with browser `localStorage` to survive page refreshes.

### 🗂️ Advanced Routing & Modules
- A fully functional Sidebar implementing a tabbed SPA architecture:
  - **Budget Planner:** Dynamic progress bars comparing actual spending against Admin-defined category limits.
  - **Savings Goals:** Visual tracking of money allocated toward specific financial milestones.
  - **Settings:** UI configurations including a persistent **Dark/Light Mode** toggle (via `next-themes`).

---

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (Strict typing for all data models and component props)
- **Styling:** Tailwind CSS (Responsive, mobile-first utility classes)
- **Icons:** Lucide React
- **Visualizations:** Recharts
- **Theme Management:** `next-themes` (Hydration-safe dark mode)
- **Typography:** Next/Font (Outfit)

---

## 🧠 Architecture & Technical Decisions

1. **State Management (Context API):** I opted for React's Context API (`DashboardContext`) over Redux or Zustand. Given the scoped complexity of this assignment, Context provides the perfect balance of global state accessibility (managing roles, transactions, budgets, and mobile menu toggles) without introducing unnecessary boilerplate.
2. **Derived State:** Metrics like "Total Balance" or "Category Percentages" are not stored in state. Instead, they are derived on-the-fly from the single source of truth (the transactions array) to prevent state-desync bugs.
3. **Hydration Safety:** `localStorage` reads are wrapped in `useEffect` hooks with mount checks to prevent Next.js server/client hydration mismatch errors.
4. **Component Modularity:** The UI is broken down into highly reusable components (`TransactionsTable`, `DashboardCharts`, `SummaryCards`) to keep the main layout clean and maintainable.
