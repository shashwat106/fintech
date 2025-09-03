import { useState, useMemo } from "react";
import { BudgetPlanner, type BudgetItem } from "@/components/finance/BudgetPlanner";
import { AIInsights } from "@/components/finance/AIInsights";

export default function BudgetPage() {
  const [income, setIncome] = useState(5000);
  const [budget, setBudget] = useState<BudgetItem[]>([
    { name: "Rent", amount: 1500 },
    { name: "Food", amount: 600 },
    { name: "Transport", amount: 250 },
    { name: "Utilities", amount: 200 },
    { name: "Entertainment", amount: 200 },
    { name: "Other", amount: 150 },
  ]);

  const metrics = useMemo(() => ({
    income,
    totalBudget: budget.reduce((s, b) => s + (Number.isFinite(b.amount) ? b.amount : 0), 0),
    totalExpenses: 0,
    savingsGoal: { goal: 0, saved: 0 },
  }), [income, budget]);

  return (
    <section className="container py-12 grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold mb-4">Budget Planner</h1>
        <BudgetPlanner income={income} setIncome={setIncome} budget={budget} setBudget={setBudget} />
      </div>
      <AIInsights metrics={metrics} />
    </section>
  );
}
