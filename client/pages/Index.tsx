import { useMemo, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/finance/Hero";
import { BudgetPlanner, type BudgetItem } from "@/components/finance/BudgetPlanner";
import { ExpenseTracker, type Expense } from "@/components/finance/ExpenseTracker";
import { SavingsGoals } from "@/components/finance/SavingsGoals";
import { StockExplorer } from "@/components/finance/StockExplorer";
import { FinancialTips } from "@/components/finance/FinancialTips";
import { AIInsights } from "@/components/finance/AIInsights";

export default function Index() {
  const [income, setIncome] = useState(5000);
  const [budget, setBudget] = useState<BudgetItem[]>([
    { name: "Rent", amount: 1500 },
    { name: "Food", amount: 600 },
    { name: "Transport", amount: 250 },
    { name: "Utilities", amount: 200 },
    { name: "Entertainment", amount: 200 },
    { name: "Other", amount: 150 },
  ]);
  const [expenses, setExpenses] = useState<Expense[]>([
    { category: "Groceries", amount: 120 },
    { category: "Dining", amount: 80 },
    { category: "Fuel", amount: 60 },
  ]);
  const [goal, setGoal] = useState(10000);
  const [saved, setSaved] = useState(2500);

  const totals = useMemo(() => ({
    totalBudget: budget.reduce((s, b) => s + (Number.isFinite(b.amount) ? b.amount : 0), 0),
    totalExpenses: expenses.reduce((s, e) => s + (Number.isFinite(e.amount) ? e.amount : 0), 0),
    topExpenseCategory: (() => {
      const byCat: Record<string, number> = {};
      for (const e of expenses) byCat[e.category] = (byCat[e.category] || 0) + e.amount;
      const entry = Object.entries(byCat).sort((a, b) => b[1] - a[1])[0];
      return entry?.[0];
    })(),
  }), [budget, expenses]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-emerald-50/40">
      <Header />
      <main>
        <Hero />
        <section className="container pb-16">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <BudgetPlanner income={income} setIncome={setIncome} budget={budget} setBudget={setBudget} />
            <ExpenseTracker expenses={expenses} addExpense={(e) => setExpenses((prev) => [...prev, e])} />
            <SavingsGoals goal={goal} saved={saved} setGoal={setGoal} setSaved={setSaved} />
            <StockExplorer />
            <FinancialTips />
            <AIInsights metrics={{
              income,
              totalBudget: totals.totalBudget,
              totalExpenses: totals.totalExpenses,
              savingsGoal: { goal, saved },
              topExpenseCategory: totals.topExpenseCategory,
            }} />
          </div>
          <div id="about" className="mt-16 grid gap-10 md:grid-cols-3">
            <div>
              <h3 className="text-xl font-semibold">About</h3>
              <p className="text-sm text-muted-foreground mt-2">FinSight helps you plan, track, and grow your finances with clarity.</p>
            </div>
            <div id="contact">
              <h3 className="text-xl font-semibold">Contact</h3>
              <p className="text-sm text-muted-foreground mt-2">Questions or feedback? Reach out anytime.</p>
            </div>
            <div id="privacy">
              <h3 className="text-xl font-semibold">Privacy</h3>
              <p className="text-sm text-muted-foreground mt-2">Your data stays on your device in this demo.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
