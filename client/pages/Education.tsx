import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/components/auth/AuthContext";
import { LoginDialog } from "@/components/auth/LoginDialog";
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  CreditCard, 
  Home,
  Search,
  BookOpen,
  Lightbulb,
  Target
} from "lucide-react";

export default function EducationPage() {
  const { user } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(null);

  const educationalTopics = {
    taxes: {
      title: "Understanding Taxes",
      icon: Calculator,
      description: "Learn how taxes work and how to optimize your tax strategy",
      content: [
        {
          title: "Tax Basics",
          points: [
            "Income tax is calculated on your earnings from work, investments, and other sources",
            "Tax brackets mean you pay different rates on different portions of your income",
            "Deductions reduce your taxable income, credits directly reduce taxes owed",
            "Standard deduction vs itemized deductions - choose what's better for you"
          ]
        },
        {
          title: "Common Tax Deductions",
          points: [
            "Mortgage interest on your primary residence",
            "State and local taxes (SALT) up to $10,000",
            "Charitable donations to qualified organizations",
            "Medical expenses exceeding 7.5% of your income",
            "Business expenses if you're self-employed"
          ]
        },
        {
          title: "Tax-Advantaged Accounts",
          points: [
            "401(k): Pre-tax contributions, taxed on withdrawal",
            "Roth IRA: After-tax contributions, tax-free growth and withdrawals",
            "HSA: Triple tax advantage for healthcare expenses",
            "529 Plans: Tax-free growth for education expenses"
          ]
        },
        {
          title: "Tax Planning Tips",
          points: [
            "Contribute to retirement accounts to reduce current taxable income",
            "Harvest tax losses by selling losing investments",
            "Time your income and deductions strategically",
            "Keep detailed records of all tax-related expenses",
            "Consider hiring a tax professional for complex situations"
          ]
        }
      ]
    },
    loans: {
      title: "Mastering Loans",
      icon: CreditCard,
      description: "Navigate different types of loans and debt management strategies",
      content: [
        {
          title: "Types of Loans",
          points: [
            "Secured loans (mortgages, auto loans) use collateral, typically lower rates",
            "Unsecured loans (personal loans, credit cards) higher rates, no collateral",
            "Fixed-rate loans have consistent payments, variable rates can change",
            "Federal student loans often have better terms than private loans"
          ]
        },
        {
          title: "Understanding Interest",
          points: [
            "APR includes interest rate plus fees - use this to compare loans",
            "Simple interest calculated on principal only",
            "Compound interest calculated on principal plus accrued interest",
            "Lower credit scores typically mean higher interest rates"
          ]
        },
        {
          title: "Loan Shopping Tips",
          points: [
            "Shop around with multiple lenders within 14-45 days",
            "Pre-qualification gives you an idea without affecting credit",
            "Pre-approval is more serious and may involve a credit check",
            "Read all terms carefully, including prepayment penalties",
            "Consider total cost over the life of the loan, not just monthly payment"
          ]
        },
        {
          title: "Debt Management",
          points: [
            "Pay more than minimums to reduce interest costs",
            "Snowball method: Pay off smallest debts first for psychological wins",
            "Avalanche method: Pay off highest interest debts first to save money",
            "Consider consolidation if it lowers your overall interest rate",
            "Avoid taking on new debt while paying off existing debt"
          ]
        }
      ]
    },
    inflation: {
      title: "Inflation Impact",
      icon: TrendingUp,
      description: "How inflation affects your money and strategies to protect yourself",
      content: [
        {
          title: "What is Inflation?",
          points: [
            "General increase in prices over time, reducing purchasing power",
            "Measured by Consumer Price Index (CPI) and other indicators",
            "Federal Reserve targets 2% annual inflation rate",
            "Can be caused by increased demand, supply shortages, or monetary policy"
          ]
        },
        {
          title: "How Inflation Affects You",
          points: [
            "Your cash loses value if not earning interest above inflation rate",
            "Fixed-rate debts become easier to pay back with inflated dollars",
            "Wages may not keep up with inflation, reducing real income",
            "Essential goods (food, gas, housing) price increases hit hardest"
          ]
        },
        {
          title: "Inflation Protection Strategies",
          points: [
            "Invest in assets that historically beat inflation (stocks, real estate)",
            "Consider Treasury Inflation-Protected Securities (TIPS)",
            "Lock in fixed-rate debt while rates are low",
            "Diversify investments across different asset classes and geographies",
            "Build skills and education to increase earning potential"
          ]
        },
        {
          title: "During High Inflation Periods",
          points: [
            "Focus on essential spending, cut discretionary expenses",
            "Look for high-yield savings accounts and CDs",
            "Consider refinancing variable-rate debt to fixed",
            "Buy quality items that will last rather than cheap alternatives",
            "Negotiate salary increases to keep up with cost of living"
          ]
        }
      ]
    },
    budgeting: {
      title: "Smart Budgeting",
      icon: Target,
      description: "Create and stick to budgets that work for your lifestyle",
      content: [
        {
          title: "Budgeting Basics",
          points: [
            "Track all income and expenses for at least one month",
            "Categorize spending into needs, wants, and savings",
            "Use the 50/30/20 rule as a starting point (needs/wants/savings)",
            "Automate savings and bill payments to stay consistent"
          ]
        },
        {
          title: "Common Budgeting Methods",
          points: [
            "Zero-based budgeting: Every dollar has a purpose",
            "Envelope method: Cash for each spending category",
            "Pay yourself first: Save before spending on anything else",
            "Percentage-based: Allocate percentages to different categories"
          ]
        },
        {
          title: "Emergency Fund Strategy",
          points: [
            "Start with $1,000 emergency fund for beginners",
            "Build to 3-6 months of expenses for full emergency fund",
            "Keep emergency fund in high-yield savings account",
            "Only use for true emergencies, not planned expenses",
            "Replenish immediately after using emergency funds"
          ]
        }
      ]
    }
  };

  const filteredTopics = Object.entries(educationalTopics).filter(([key, topic]) =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) {
    return (
      <section className="container py-12">
        <div className="text-center max-w-md mx-auto">
          <BookOpen className="h-12 w-12 mx-auto text-primary mb-4" />
          <h1 className="text-3xl font-bold mb-4">Financial Education</h1>
          <p className="text-muted-foreground mb-6">
            Learn about taxes, loans, inflation, and more to make better financial decisions.
          </p>
          <Button onClick={() => setLoginOpen(true)}>
            Sign Up for Free Access
          </Button>
        </div>
        <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
      </section>
    );
  }

  return (
    <section className="container py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Financial Education Center</h1>
          <p className="text-muted-foreground mb-6">
            Master essential financial concepts to make smarter money decisions.
          </p>
          
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search topics..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {!selectedTopic ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTopics.map(([key, topic]) => (
              <Card 
                key={key} 
                className="rounded-xl hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedTopic({key, ...topic})}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <topic.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">{topic.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {topic.description}
                  </p>
                  <div className="mt-4">
                    <Badge variant="outline">
                      {topic.content.length} sections
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div>
            <button 
              onClick={() => setSelectedTopic(null)}
              className="text-primary hover:underline mb-6">
              ← Back to Topics
            </button>
            
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <selectedTopic.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{selectedTopic.title}</h2>
                  <p className="text-muted-foreground">{selectedTopic.description}</p>
                </div>
              </div>

              <div className="space-y-6">
                {selectedTopic.content.map((section, i) => (
                  <Card key={i} className="rounded-xl">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Lightbulb className="h-5 w-5 text-yellow-500" />
                        <h3 className="text-lg font-semibold">{section.title}</h3>
                      </div>
                      <ul className="space-y-2">
                        {section.points.map((point, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-gray-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                <h3 className="font-semibold text-blue-900 mb-2">💡 Pro Tips</h3>
                <div className="text-sm text-blue-800 space-y-1">
                  <p>• Apply these concepts gradually - don't try to change everything at once</p>
                  <p>• Use our Budget Simulator to test different scenarios</p>
                  <p>• Track your progress in the Expenses & Savings section</p>
                  <p>• Stay updated with economic news that might affect these topics</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}