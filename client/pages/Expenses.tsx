import { useMemo, useState } from "react";
import { ExpenseTracker, type Expense } from "@/components/finance/ExpenseTracker";
import { AIInsights } from "@/components/finance/AIInsights";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([
    { category: "Groceries", amount: 120 },
    { category: "Dining", amount: 80 },
    { category: "Fuel", amount: 60 },
  ]);

  const metrics = useMemo(() => ({
    income: 0,
    totalBudget: 0,
    totalExpenses: expenses.reduce((s, e) => s + e.amount, 0),
    savingsGoal: { goal: 0, saved: 0 },
    topExpenseCategory: (() => {
      const map: Record<string, number> = {};
      for (const e of expenses) map[e.category] = (map[e.category] || 0) + e.amount;
      const entry = Object.entries(map).sort((a, b) => b[1] - a[1])[0];
      return entry?.[0];
    })(),
  }), [expenses]);

  return (
    <section className="container py-12 grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold mb-4">Expense Tracker</h1>
        <ExpenseTracker expenses={expenses} addExpense={(e) => setExpenses((prev) => [...prev, e])} />
      </div>
      <AIInsights metrics={metrics} />
    </section>
  );
}
