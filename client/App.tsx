import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BudgetPage from "./pages/Budget";
import ExpensesPage from "./pages/Expenses";
import SavingsPage from "./pages/Savings";
import StocksPage from "./pages/Stocks";
import TipsPage from "./pages/Tips";
import NewsPage from "./pages/News";
import NotFound from "./pages/NotFound";
import { Layout } from "@/components/site/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/savings" element={<SavingsPage />} />
            <Route path="/stocks" element={<StocksPage />} />
            <Route path="/tips" element={<TipsPage />} />
            <Route path="/news" element={<NewsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
