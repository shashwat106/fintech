import { useMemo, useState } from "react";
import { SavingsGoals } from "@/components/finance/SavingsGoals";
import { AIInsights } from "@/components/finance/AIInsights";

export default function SavingsPage() {
  const [goal, setGoal] = useState(10000);
  const [saved, setSaved] = useState(2500);

  const metrics = useMemo(() => ({
    income: 0,
    totalBudget: 0,
    totalExpenses: 0,
    savingsGoal: { goal, saved },
  }), [goal, saved]);

  return (
    <section className="container py-12 grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold mb-4">Savings Goals</h1>
        <SavingsGoals goal={goal} saved={saved} setGoal={setGoal} setSaved={setSaved} />
      </div>
      <AIInsights metrics={metrics} />
    </section>
  );
}
