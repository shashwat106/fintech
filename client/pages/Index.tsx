import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Hero } from "@/components/finance/Hero";
import { PiggyBank, ChartPie, Target, TrendingUp, Star } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
} from "recharts";

const featureItems = [
  {
    icon: PiggyBank,
    title: "Smart Budgeting",
    text: "Track spending with AI.",
  },
  {
    icon: ChartPie,
    title: "Expense Tracking",
    text: "See where your money goes.",
  },
  {
    icon: Target,
    title: "Savings Goals",
    text: "Set & reach milestones.",
  },
  {
    icon: TrendingUp,
    title: "Stock Insights",
    text: "Follow markets easily.",
  },
];

const barData = [
  { name: "Rent", value: 1500 },
  { name: "Food", value: 600 },
  { name: "Trans", value: 250 },
  { name: "Util", value: 200 },
];
const pieData = [
  { name: "Needs", value: 65, color: "#27ae60" },
  { name: "Wants", value: 25, color: "#a7f3d0" },
  { name: "Savings", value: 10, color: "#16a34a" },
];
const radialData = [{ name: "Progress", value: 72, fill: "#27ae60" }];

const comparisonData = [
  { category: "Housing", user: 1500, average: 1800, color: "#27ae60" },
  { category: "Food", user: 600, average: 750, color: "#3b82f6" },
  { category: "Transportation", user: 250, average: 400, color: "#f59e0b" },
  { category: "Entertainment", user: 300, average: 350, color: "#8b5cf6" },
  { category: "Utilities", user: 200, average: 220, color: "#ef4444" },
];

export default function Index() {
  return (
    <div className="space-y-20">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Features */}
      <section className="container">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold">Powerful features</h2>
          <p className="text-muted-foreground mt-2">
            Everything you need to plan, track and grow your finances.
          </p>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featureItems.map((f, i) => (
            <Card key={i} className="rounded-xl shadow-sm">
              <CardContent className="p-6">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary grid place-items-center">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{f.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 3. Dashboard preview */}
      <section className="container">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold">
            Your Finances, All in One Place
          </h2>
          <p className="text-muted-foreground mt-2">
            From budgets to stocks—everything in a clean, modern dashboard.
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Card className="rounded-xl shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Monthly Expenses</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="#27ae60" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="rounded-xl shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Budget Allocation</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={40}
                    outerRadius={80}
                    stroke="#fff"
                    strokeWidth={2}
                  >
                    {pieData.map((p, i) => (
                      <Cell key={i} fill={p.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="rounded-xl shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Savings Goal</h3>
              <div className="flex items-center justify-center h-[200px]">
                <div className="relative w-32 h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      innerRadius="70%"
                      outerRadius="100%"
                      data={radialData}
                      startAngle={90}
                      endAngle={-270}
                    >
                      <RadialBar
                        minAngle={15}
                        background
                        dataKey="value"
                        cornerRadius={10}
                      />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 grid place-items-center text-lg font-semibold">
                    72%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 4. Expense Comparison */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold">How You Compare</h2>
            <p className="text-muted-foreground mt-2">
              See how your spending compares to the average person in your area.
            </p>
          </div>
          <div className="mt-10 max-w-4xl mx-auto">
            <Card className="rounded-xl shadow-sm">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {comparisonData.map((item, i) => {
                    const userPercentage = (item.user / item.average) * 100;
                    const isGood = item.user < item.average;
                    return (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{item.category}</h4>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-muted-foreground">
                              You: ${item.user}
                            </span>
                            <span className="text-muted-foreground">
                              Average: ${item.average}
                            </span>
                            <span className={`font-medium ${
                              isGood ? "text-green-600" : "text-orange-600"
                            }`}>
                              {isGood ? "✓ " : "⚠ "}
                              {userPercentage.toFixed(0)}% of avg
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="bg-green-500 transition-all duration-500"
                            style={{ width: `${Math.min((item.user / Math.max(item.user, item.average)) * 100, 100)}%` }}
                          />
                          <div 
                            className="bg-gray-300 transition-all duration-500"
                            style={{ width: `${Math.min((item.average / Math.max(item.user, item.average)) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900">Your Spending Summary</h4>
                  <p className="text-sm text-blue-800 mt-1">
                    You're spending ${comparisonData.reduce((sum, item) => sum + item.user, 0).toLocaleString()} monthly, 
                    which is ${comparisonData.reduce((sum, item) => sum + (item.average - item.user), 0).toLocaleString()} 
                    {comparisonData.reduce((sum, item) => sum + (item.average - item.user), 0) > 0 ? 'less' : 'more'} than the average person. 
                    {comparisonData.reduce((sum, item) => sum + (item.average - item.user), 0) > 0 ? 'Great job staying under budget!' : 'Consider reviewing your spending in some categories.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. How it works */}
      <section className="container">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold">How It Works</h2>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { title: "Sign Up", text: "Quick and easy onboarding." },
            {
              title: "Connect Accounts",
              text: "Import your expenses & income.",
            },
            { title: "Grow Smarter", text: "Get personalized AI insights." },
          ].map((s, i) => (
            <Card key={i} className="rounded-xl shadow-sm">
              <CardContent className="p-6">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary grid place-items-center font-bold">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{s.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center">What users say</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Aisha K.",
                text: "I finally stuck to a budget thanks to FinSight!",
              },
              {
                name: "Marco D.",
                text: "The clean dashboard makes money simple.",
              },
              {
                name: "Priya S.",
                text: "AI insights showed me where to save more.",
              },
            ].map((t, i) => (
              <Card key={i} className="rounded-xl shadow-sm">
                <CardContent className="p-6">
                  <div
                    className="flex gap-1 text-amber-400"
                    aria-label="5 star rating"
                  >
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed">“{t.text}”</p>
                  <div className="mt-3 text-sm font-medium">{t.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Newsletter */}
      <section className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold">Get weekly AI money tips</h3>
          <p className="text-muted-foreground mt-2">
            Join thousands of users learning to save smarter.
          </p>
          <form className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Input
              type="email"
              placeholder="you@example.com"
              required
              className="h-11 max-w-xs"
            />
            <Button type="submit" className="h-11 px-6">
              Subscribe
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-2">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
}
