import { FinancialTips } from "@/components/finance/FinancialTips";

export default function TipsPage() {
  return (
    <section className="container py-12">
      <h1 className="text-3xl font-bold mb-4">Financial Tips</h1>
      <FinancialTips />
    </section>
  );
}
